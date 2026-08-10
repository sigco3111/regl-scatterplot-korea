// Playwright assertions for the unified showcase — matches binding objective.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const url = process.env.SHOWCASE_URL || 'http://127.0.0.1:4173/';
const tag = process.env.SHOWCASE_TAG || 'check';
const outDir = process.env.EVIDENCE_DIR || 'qa/evidence';
mkdirSync(outDir, { recursive: true });

const desktopShot = resolve(outDir, `${tag}-desktop.png`);
const mobileShot = resolve(outDir, `${tag}-mobile.png`);
const desktopDom = resolve(outDir, `${tag}-desktop.dom.txt`);
const mobileDom = resolve(outDir, `${tag}-mobile.dom.txt`);

const results = { url, tag, desktop: {}, mobile: {}, assertions: {} };

async function run() {
  const browser = await chromium.launch();
  try {
    const ctxDesktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctxDesktop.newPage();
    const consoleEvents = [];
    page.on('console', (msg) => consoleEvents.push({ type: msg.type(), text: msg.text() }));
    page.on('pageerror', (err) => consoleEvents.push({ type: 'pageerror', text: err.message }));
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(2500);
    results.desktop.cards = await page.locator('[data-demo-card]').count();
    results.desktop.cardCanvases = await page.locator('[data-demo-card] canvas').count();
    results.desktop.cardCanvasBoxes = await page.$$eval('[data-demo-card] canvas', (els) =>
      els.map((el) => {
        const r = el.getBoundingClientRect();
        return { w: r.width, h: r.height };
      })
    );
    results.desktop.scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    results.desktop.title = await page.title();
    results.desktop.pageErrors = consoleEvents.filter((e) => e.type === 'pageerror').length;
    results.desktop.consoleErrors = consoleEvents.filter((e) => e.type === 'error').length;
    writeFileSync(desktopDom, await page.content());
    await page.screenshot({ path: desktopShot, fullPage: true });
    await ctxDesktop.close();

    const ctxMobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await ctxMobile.newPage();
    await mobilePage.goto(url, { waitUntil: 'load', timeout: 30000 });
    await mobilePage.waitForTimeout(2500);
    results.mobile.cards = await mobilePage.locator('[data-demo-card]').count();
    results.mobile.scrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    results.mobile.cardBoxes = await mobilePage.$$eval('[data-demo-card]', (els) =>
      els.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height };
      })
    );
    writeFileSync(mobileDom, await mobilePage.content());
    await mobilePage.screenshot({ path: mobileShot, fullPage: true });
    await ctxMobile.close();
  } finally {
    await browser.close();
  }

  // Hard assertions matching binding objective
  results.assertions.criterion1_cardsEq6 = results.desktop.cards === 6;
  results.assertions.criterion2_canvasesEq6 = results.desktop.cardCanvases === 6;
  results.assertions.criterion2_pageErrorZero = results.desktop.pageErrors === 0;
  results.assertions.criterion2_canvasesHaveSize = results.desktop.cardCanvasBoxes.every(
    (b) => b.w > 0 && b.h > 0
  );
  results.assertions.criterion3_mobileCardsEq6 = results.mobile.cards === 6;
  results.assertions.criterion3_mobileScrollWidth = results.mobile.scrollWidth <= 390;

  console.log(JSON.stringify(results, null, 2));
}

run().catch((e) => {
  console.error('FAIL', e);
  process.exit(1);
});
