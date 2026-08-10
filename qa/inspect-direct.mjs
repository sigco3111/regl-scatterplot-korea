import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (err) => errors.push({ url: page.url(), msg: err.message }));
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push({ url: page.url(), text: msg.text() });
});
await page.goto('http://127.0.0.1:3000/index.html', { waitUntil: 'load' });
await page.waitForTimeout(3000);
console.log('INDEX DIRECT:', JSON.stringify(errors, null, 2));
await browser.close();
