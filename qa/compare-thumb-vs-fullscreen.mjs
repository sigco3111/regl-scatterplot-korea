import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto('http://127.0.0.1:4500/showcase.html', { waitUntil: 'load' });
await page.waitForTimeout(3000);

const cardBox = await page.locator('[data-demo-card="axes"]').boundingBox();
await page.screenshot({
  path: 'qa/evidence/compare-axes-thumb.png',
  clip: cardBox,
});

await page.goto('http://127.0.0.1:4500/axes.html', { waitUntil: 'load' });
await page.waitForTimeout(3000);
await page.screenshot({
  path: 'qa/evidence/compare-axes-fullscreen.png',
  clip: { x: 0, y: 0, width: 1100, height: 700 },
});

const card2 = await page.locator('[data-demo-card="connect"]');
await page.goto('http://127.0.0.1:4500/showcase.html', { waitUntil: 'load' });
await page.waitForTimeout(3000);
const cb = await card2.boundingBox();
await page.screenshot({
  path: 'qa/evidence/compare-connect-thumb.png',
  clip: cb,
});

await page.goto('http://127.0.0.1:4500/connected-points.html', { waitUntil: 'load' });
await page.waitForTimeout(3000);
await page.screenshot({
  path: 'qa/evidence/compare-connect-fullscreen.png',
  clip: { x: 0, y: 0, width: 1100, height: 700 },
});

await browser.close();
console.log('OK');
