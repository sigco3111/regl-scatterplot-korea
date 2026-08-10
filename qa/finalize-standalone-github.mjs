// Comprehensive finalization test for /github-1000/index.html
// Asserts 8 success criteria in one run. Prints PASS/FAIL per criterion, exits non-zero on any failure.
// Channel: chromium against http://127.0.0.1:4173/github-1000/index.html (set URL_BASE to override).
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const URL_BASE = process.env.URL_BASE || 'http://127.0.0.1:4173';
const TARGET = `${URL_BASE}/github-1000/index.html`;
const SHOWCASE = `${URL_BASE}/`;
const EVIDENCE = process.env.EVIDENCE_DIR || 'qa/evidence/finalize';
mkdirSync(EVIDENCE, { recursive: true });

const PY_RGBA = [0x35, 0x72, 0xa5]; // Python
const JS_RGBA = [0xf1, 0xe0, 0x5a]; // JavaScript

const results = {};
const errors = [];

function near(a, b, tol = 30) {
  return Math.abs(a - b) <= tol;
}
function colorDist(a, b) {
  return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2);
}

async function sampleCanvasNonBlack(page) {
  return await page.evaluate(() => {
    const c = document.querySelector('canvas');
    if (!c) return { error: 'no canvas' };
    const off = document.createElement('canvas');
    off.width = c.width; off.height = c.height;
    off.getContext('2d').drawImage(c, 0, 0);
    const d = off.getContext('2d').getImageData(0, 0, off.width, off.height).data;
    let nb = 0;
    for (let i = 0; i < d.length; i += 4) if (d[i] > 5 || d[i+1] > 5 || d[i+2] > 5) nb++;
    return { nonBlack: nb, total: c.width * c.height, canvasW: c.width, canvasH: c.height };
  });
}

async function histogramColors(page) {
  return await page.evaluate(() => {
    const c = document.querySelector('canvas');
    const off = document.createElement('canvas');
    off.width = c.width; off.height = c.height;
    off.getContext('2d').drawImage(c, 0, 0);
    const d = off.getContext('2d').getImageData(0, 0, off.width, off.height).data;
    const buckets = {};
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] > 5 || d[i+1] > 5 || d[i+2] > 5) {
        const key = `${d[i]>>5<<5},${d[i+1]>>5<<5},${d[i+2]>>5<<5}`;
        buckets[key] = (buckets[key] || 0) + 1;
      }
    }
    return buckets;
  });
}

function topColors(hist, n = 5) {
  return Object.entries(hist).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => {
    const [r, g, b] = k.split(',').map(Number);
    return { r, g, b, count: v };
  });
}

async function run() {
  const browser = await chromium.launch();
  try {
    // ---- Criterion 1: render fidelity (desktop) ----
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      const pageErrors = [];
      page.on('pageerror', (e) => pageErrors.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error') pageErrors.push(`[console] ${m.text()}`); });
      await page.goto(TARGET, { waitUntil: 'load' });
      await page.waitForTimeout(2500);
      const render = await sampleCanvasNonBlack(page);
      const status = await page.locator('#stats').textContent();
      const ndc = await page.evaluate(() => {
        const g = window.__g130k;
        if (!g) return { error: 'no __g130k hook' };
        const pts = g.points;
        const inV = pts.filter(p => p[0] >= -1 && p[0] <= 1 && p[1] >= -1 && p[1] <= 1).length;
        return { total: pts.length, inViewport: inV, repos: g.repos.length };
      });
      results.c1_render = {
        nonBlack: render.nonBlack,
        pct: ((render.nonBlack / render.total) * 100).toFixed(2),
        status,
        ndc,
        pageErrors,
        pass:
          render.nonBlack >= 700 &&
          ndc.error === undefined &&
          ndc.inViewport / ndc.total >= 0.95 &&
          pageErrors.length === 0,
      };
      await page.screenshot({ path: resolve(EVIDENCE, 'c1-render-desktop.png'), fullPage: false });
      writeFileSync(resolve(EVIDENCE, 'c1-render-dom.html'), await page.content());
      await ctx.close();
    }

    // ---- Criterion 2: hover tooltip ----
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      const pageErrors = [];
      page.on('pageerror', (e) => pageErrors.push(e.message));
      await page.goto(TARGET, { waitUntil: 'load' });
      await page.waitForTimeout(2500);
      const hoverResult = await page.evaluate(async () => {
        const g = window.__g130k;
        if (!g) return { error: 'no __g130k hook' };
        const canvas = g.scatter.get('canvas');
        const rect = canvas.getBoundingClientRect();
        const points = g.points;
        // Pick a point clearly in the middle of the canvas (not too close to edges)
        let targetIdx = -1;
        for (let i = 0; i < points.length; i++) {
          if (points[i][0] > -0.7 && points[i][0] < 0.7 && points[i][1] > -0.7 && points[i][1] < 0.7) {
            targetIdx = i;
            break;
          }
        }
        if (targetIdx < 0) return { error: 'no in-viewport point' };
        // Use scatter's getScreenPosition which handles aspect ratio correctly
        const [spx, spy] = g.scatter.getScreenPosition(targetIdx);
        return {
          targetIdx,
          sx: rect.left + spx,
          sy: rect.top + spy,
          expected: g.repos[targetIdx].full_name,
        };
      });
      if (hoverResult.error) {
        results.c2_tooltip = { error: hoverResult.error, pass: false };
      } else {
        const { sx, sy, expected, targetIdx } = hoverResult;
        // Move mouse to a far position first to clear hover state, then to target
        await page.mouse.move(10, 10);
        await page.waitForTimeout(200);
        await page.mouse.move(sx, sy, { steps: 5 });
        await page.waitForTimeout(600);
        const tooltip = await page.evaluate(() => {
          const t = document.querySelector('.tooltip');
          if (!t) return null;
          return {
            display: t.style.display,
            name: t.querySelector('.tooltip-name')?.textContent,
            html: t.innerHTML,
            text: t.textContent.replace(/\s+/g, ' ').trim(),
          };
        });
        results.c2_tooltip = {
          hoverPos: { sx, sy },
          targetIdx,
          expected,
          tooltip,
          pass: !!tooltip && tooltip.name === expected,
        };
        await page.screenshot({ path: resolve(EVIDENCE, 'c2-tooltip.png'), fullPage: false });
      }
      results.c2_tooltip = { ...results.c2_tooltip, pageErrors };
      await ctx.close();
    }

    // ---- Criterion 3: click-to-open-repo ----
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      const pageErrors = [];
      page.on('pageerror', (e) => pageErrors.push(e.message));
      await page.goto(TARGET, { waitUntil: 'load' });
      await page.waitForTimeout(2500);
      const clickResult = await page.evaluate(async () => {
        const g = window.__g130k;
        if (!g) return { error: 'no __g130k hook' };
        const canvas = g.scatter.get('canvas');
        const rect = canvas.getBoundingClientRect();
        const points = g.points;
        let targetIdx = -1;
        for (let i = 0; i < points.length; i++) {
          if (points[i][0] > -0.7 && points[i][0] < 0.7 && points[i][1] > -0.7 && points[i][1] < 0.7) {
            targetIdx = i;
            break;
          }
        }
        if (targetIdx < 0) return { error: 'no point' };
        const [spx, spy] = g.scatter.getScreenPosition(targetIdx);
        return {
          targetIdx,
          sx: rect.left + spx,
          sy: rect.top + spy,
          expectedUrl: `https://github.com/${g.repos[targetIdx].full_name}`,
        };
      });
      if (clickResult.error) {
        results.c3_click = { error: clickResult.error, pass: false };
      } else {
        const newPagePromise = ctx.waitForEvent('page', { timeout: 4000 }).catch(() => null);
        await page.mouse.move(clickResult.sx, clickResult.sy, { steps: 5 });
        await page.waitForTimeout(200);
        await page.mouse.down();
        await page.waitForTimeout(50);
        await page.mouse.up();
        const newPage = await newPagePromise;
        let openedUrl = null;
        if (newPage) {
          openedUrl = newPage.url();
          await newPage.close();
        }
        results.c3_click = {
          clickPos: { sx: clickResult.sx, sy: clickResult.sy },
          targetIdx: clickResult.targetIdx,
          expectedUrl: clickResult.expectedUrl,
          openedUrl,
          pass: openedUrl === clickResult.expectedUrl,
        };
        await page.screenshot({ path: resolve(EVIDENCE, 'c3-click.png'), fullPage: false });
      }
      results.c3_click = { ...results.c3_click, pageErrors };
      await ctx.close();
    }

    // ---- Criterion 4: legend filter ----
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      const pageErrors = [];
      page.on('pageerror', (e) => pageErrors.push(e.message));
      await page.goto(TARGET, { waitUntil: 'load' });
      await page.waitForTimeout(2500);
      const histBefore = await histogramColors(page);
      const beforeTop = topColors(histBefore, 3);
      const totalBefore = Object.values(histBefore).reduce((a, b) => a + b, 0);
      const pyBefore = Object.entries(histBefore).reduce((acc, [k, v]) => {
        const [r, g, b] = k.split(',').map(Number);
        return acc + (colorDist([r, g, b], PY_RGBA) < 30 ? v : 0);
      }, 0);
      const pyRatioBefore = totalBefore ? pyBefore / totalBefore : 0;
      // Click the Python legend item (it must have data-lang="Python")
      const langToClick = 'Python';
      const legendItem = page.locator(`.legend-item[data-lang="${langToClick}"]`);
      const exists = await legendItem.count();
      if (exists === 0) {
        results.c4_legend = { error: `no .legend-item[data-lang="${langToClick}"]`, pass: false };
      } else {
        await legendItem.first().click();
        await page.waitForTimeout(800);
        const histAfter = await histogramColors(page);
        const afterTop = topColors(histAfter, 3);
        // The filter is correct if: dim color (40,40,50) becomes the dominant bucket
        // AND Python blue is the next-most-common, AND Python ratio increases.
        const dimCount = Object.entries(histAfter).reduce((acc, [k, v]) => {
          const [r, g, b] = k.split(',').map(Number);
          return acc + (r < 64 && g < 64 && b < 80 ? v : 0);
        }, 0);
        const pyCount = Object.entries(histAfter).reduce((acc, [k, v]) => {
          const [r, g, b] = k.split(',').map(Number);
          return acc + (colorDist([r, g, b], PY_RGBA) < 30 ? v : 0);
        }, 0);
        const totalAfter = Object.values(histAfter).reduce((a, b) => a + b, 0) || 1;
        const pyRatioAfter = pyCount / totalAfter;
        const dimRatio = dimCount / totalAfter;
        results.c4_legend = {
          beforeTop,
          afterTop,
          pyRatioBefore: pyRatioBefore.toFixed(3),
          pyRatioAfter: pyRatioAfter.toFixed(3),
          dimRatio: dimRatio.toFixed(3),
          totalAfter,
          // After filter: dim color (40,40,50) dominates AND Python blue is still visible above noise
          pass: dimRatio > 0.5 && pyRatioAfter > 0.05,
        };
        await page.screenshot({ path: resolve(EVIDENCE, 'c4-legend.png'), fullPage: false });
      }
      results.c4_legend = { ...results.c4_legend, pageErrors };
      await ctx.close();
    }

    // ---- Criterion 5: axis labels ----
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      const pageErrors = [];
      page.on('pageerror', (e) => pageErrors.push(e.message));
      await page.goto(TARGET, { waitUntil: 'load' });
      await page.waitForTimeout(2500);
      const axisInfo = await page.evaluate(() => {
        // Tick labels have class 'axis-label axis-x' or 'axis-label axis-y'
        const xTickLabels = Array.from(document.querySelectorAll('.axis-label.axis-x'));
        const yTickLabels = Array.from(document.querySelectorAll('.axis-label.axis-y'));
        const xTitle = document.querySelector('.axis-title-x');
        const yTitle = document.querySelector('.axis-title-y');
        const allTexts = Array.from(document.querySelectorAll('svg text')).map((t) => t.textContent);
        return {
          xTickLabelCount: xTickLabels.length,
          yTickLabelCount: yTickLabels.length,
          xTickTexts: xTickLabels.map((t) => t.textContent),
          yTickTexts: yTickLabels.map((t) => t.textContent),
          xTitle: xTitle?.textContent || null,
          yTitle: yTitle?.textContent || null,
          svgTextCount: allTexts.length,
          allTexts,
        };
      });
      results.c5_axes = {
        ...axisInfo,
        pass:
          axisInfo.xTickLabelCount >= 2 &&
          axisInfo.yTickLabelCount >= 2 &&
          !!axisInfo.xTitle &&
          !!axisInfo.yTitle &&
          /log|stars|forks/i.test(axisInfo.xTitle + axisInfo.yTitle + axisInfo.allTexts.join(' ')),
      };
      await page.screenshot({ path: resolve(EVIDENCE, 'c5-axes.png'), fullPage: false });
      results.c5_axes = { ...results.c5_axes, pageErrors };
      await ctx.close();
    }

    // ---- Criterion 6: mobile layout ----
    {
      const ctx = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      });
      const page = await ctx.newPage();
      const pageErrors = [];
      page.on('pageerror', (e) => pageErrors.push(e.message));
      await page.goto(TARGET, { waitUntil: 'load' });
      await page.waitForTimeout(2500);
      const mobileInfo = await page.evaluate(() => {
        const scrollW = document.documentElement.scrollWidth;
        const canvas = document.querySelector('canvas');
        const cRect = canvas?.getBoundingClientRect();
        const headerH = document.querySelector('.header')?.getBoundingClientRect().height;
        const legendToggle = document.querySelector('.legend-toggle, [data-legend-toggle], #legend-toggle');
        const legendVisible = document.querySelector('.legend')?.getBoundingClientRect();
        return {
          scrollW,
          canvasH: cRect?.height,
          canvasW: cRect?.width,
          headerH,
          hasLegendToggle: !!legendToggle,
          legendVisible: legendVisible ? { h: legendVisible.height, w: legendVisible.width } : null,
        };
      });
      results.c6_mobile = {
        ...mobileInfo,
        pass: mobileInfo.scrollW <= 390 && (mobileInfo.canvasH >= 400) && (mobileInfo.hasLegendToggle || (mobileInfo.legendVisible && mobileInfo.legendVisible.h < 200)),
      };
      await page.screenshot({ path: resolve(EVIDENCE, 'c6-mobile.png'), fullPage: false });
      results.c6_mobile = { ...results.c6_mobile, pageErrors };
      await ctx.close();
    }

    // ---- Criterion 7: regression - showcase still works ----
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      const pageErrors = [];
      page.on('pageerror', (e) => pageErrors.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error') pageErrors.push(`[console] ${m.text()}`); });
      await page.goto(SHOWCASE, { waitUntil: 'load' });
      await page.waitForTimeout(2500);
      const cards = await page.locator('[data-demo-card]').count();
      const canvases = await page.locator('[data-demo-card] canvas').count();
      results.c7_regression = {
        cards,
        canvases,
        pageErrors,
        pass: cards === 6 && canvases === 6 && pageErrors.length === 0,
      };
      await page.screenshot({ path: resolve(EVIDENCE, 'c7-regression.png'), fullPage: false });
      await ctx.close();
    }

    // ---- Criterion 8: adversarial - empty data (route 503) ----
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      const pageErrors = [];
      page.on('pageerror', (e) => pageErrors.push(e.message));
      await ctx.route('**/data/github-repos.json', (route) => {
        route.fulfill({ status: 503, contentType: 'application/json', body: '{"repos":[]}' });
      });
      await page.goto(TARGET, { waitUntil: 'load' });
      await page.waitForTimeout(2500);
      const empty = await page.evaluate(() => {
        const emptyEl = document.querySelector('.empty-state, [data-empty-state]');
        const status = document.querySelector('#stats')?.textContent;
        const retry = document.querySelector('.retry-btn, button[data-retry], [data-retry]');
        return {
          hasEmptyState: !!emptyEl,
          emptyText: emptyEl?.textContent || null,
          status,
          hasRetry: !!retry,
          bodyText: document.body.textContent.slice(0, 500),
        };
      });
      results.c8_empty = {
        ...empty,
        pageErrors,
        pass: empty.hasEmptyState && empty.hasRetry && pageErrors.length === 0,
      };
      await page.screenshot({ path: resolve(EVIDENCE, 'c8-empty.png'), fullPage: false });
      await ctx.close();
    }
  } finally {
    await browser.close();
  }

  // Print + exit
  const allPass = Object.values(results).every((r) => r.pass);
  const summary = { allPass, results };
  writeFileSync(resolve(EVIDENCE, 'summary.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  if (!allPass) {
    console.error('FAIL');
    process.exit(1);
  } else {
    console.log('PASS');
  }
}

run().catch((e) => {
  console.error('FATAL', e);
  process.exit(2);
});
