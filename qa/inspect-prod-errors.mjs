import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

const results = {};
for (const demo of ['index.html', 'axes.html', 'programmatic-lasso.html', 'text-labels.html', 'connected-points.html', 'dynamic-opacity.html']) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (err) => errors.push({ kind: 'pageerror', msg: err.message, stack: err.stack?.slice(0, 500) }));
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') {
      errors.push({ kind: m.type(), text: m.text().slice(0, 400) });
    }
  });
  await page.goto(`http://127.0.0.1:4500/${demo}`, { waitUntil: 'load' });
  await page.waitForTimeout(3000);
  results[demo] = {
    finalUrl: page.url(),
    pageErrors: errors.filter((e) => e.kind === 'pageerror').length,
    consoleErrors: errors.filter((e) => e.kind === 'error').length,
    sample: errors.slice(0, 4),
  };
  await page.close();
}
console.log(JSON.stringify(results, null, 2));
await browser.close();
