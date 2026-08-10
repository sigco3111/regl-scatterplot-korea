import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (err) => {
  errors.push({ kind: 'pageerror', msg: err.message, frame: page.frames().map((f) => f.url()) });
});
page.on('console', (msg) => {
  if (msg.type() === 'error') {
    errors.push({ kind: 'console-error', text: msg.text(), frame: page.frames().map((f) => f.url()) });
  }
});
page.on('framenavigated', (frame) => {
  errors.push({ kind: 'navigate', url: frame.url() });
});
await page.goto('http://127.0.0.1:3000/', { waitUntil: 'load' });
await page.waitForTimeout(3500);
console.log(JSON.stringify(errors, null, 2));
await browser.close();
