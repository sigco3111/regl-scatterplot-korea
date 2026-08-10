import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

for (const d of ['index.html', 'axes.html', 'programmatic-lasso.html']) {
  const page = await ctx.newPage();
  await page.goto(`http://127.0.0.1:4500/${d}`, { waitUntil: 'load' });
  await page.waitForTimeout(3000);
  const canvas = page.locator('canvas').first();
  const box = await canvas.boundingBox();
  console.log(`${d}: canvas box=${JSON.stringify(box)}, url=${page.url()}`);
  await page.screenshot({ path: `qa/evidence/standalone-${d.replace('.html','')}.png` });
  await page.close();
}
await browser.close();
