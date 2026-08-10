import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const demos = [
  'index.html', 'size-encoding.html', 'dynamic-opacity.html', 'axes.html',
  'text-labels.html', 'annotations.html', 'programmatic-lasso.html',
  'multiple-instances.html', 'transition.html', 'connected-points.html',
  'connected-points-by-segments.html', 'texture-background.html',
  'performance-mode.html', 'embedded.html',
];

const results = [];
for (const d of demos) {
  const errors = [];
  const handler = (err) => errors.push(err.message);
  page.on('pageerror', handler);
  try {
    await page.goto(`http://127.0.0.1:4500/${d}`, { waitUntil: 'load', timeout: 10000 });
    await page.waitForTimeout(2000);
    const finalUrl = page.url();
    const hasCanvas = await page.locator('canvas').count();
    const controlsText = await page.locator('#controls').count() > 0
      ? (await page.locator('#controls').first().innerText()).slice(0, 100)
      : '';
    results.push({
      demo: d,
      finalUrl,
      hasCanvas,
      controlsTextPreview: controlsText,
      pageErrors: errors.length,
      errorMessages: errors.slice(0, 2),
    });
  } catch (e) {
    results.push({ demo: d, error: e.message });
  } finally {
    page.off('pageerror', handler);
  }
}
console.log(JSON.stringify(results, null, 2));
await browser.close();
