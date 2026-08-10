import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (err) => errors.push({ kind: 'pageerror', msg: err.message, stack: err.stack }));
page.on('console', (msg) => {
  if (msg.type() === 'error' || msg.type() === 'warning') {
    errors.push({ kind: msg.type(), text: msg.text() });
  }
});
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'load' });
await page.waitForTimeout(3500);
console.log(JSON.stringify(errors, null, 2));
await browser.close();
