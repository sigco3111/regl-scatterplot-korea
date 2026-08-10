import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

const demoErrors = {};
for (const d of ['performance-mode.html', 'embedded.html', 'axes.html', 'index.html']) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push({ msg: e.message, stack: e.stack?.slice(0, 400) }));
  page.on('console', (m) => { if (m.type() === 'error') errors.push({ text: m.text().slice(0, 300) }); });
  await page.goto(`http://127.0.0.1:4500/${d}`, { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  demoErrors[d] = errors.slice(0, 3);
  await page.close();
}
console.log(JSON.stringify(demoErrors, null, 2));
await browser.close();
