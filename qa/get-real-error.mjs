import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// Catch error before it gets re-thrown by error handler
await page.addInitScript(() => {
  window.__realErrors = [];
  window.addEventListener('error', (e) => {
    window.__realErrors.push({
      msg: e.message,
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno,
      stack: e.error?.stack,
      type: 'error',
    });
    e.preventDefault();
  }, true);
  window.addEventListener('unhandledrejection', (e) => {
    window.__realErrors.push({
      msg: 'unhandledrejection: ' + (e.reason?.message || String(e.reason)),
      stack: e.reason?.stack,
      type: 'unhandledrejection',
    });
  });
});

await page.goto('http://127.0.0.1:4500/index.html', { waitUntil: 'load' });
await page.waitForTimeout(3000);

const errors = await page.evaluate(() => window.__realErrors);
console.log(JSON.stringify(errors, null, 2));
await browser.close();
