import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', (err) => errors.push({ msg: err.message, stack: err.stack?.slice(0, 300) }));

await page.goto('http://127.0.0.1:4500/showcase.html', { waitUntil: 'load' });
await page.waitForTimeout(3500);

await page.screenshot({ path: 'qa/evidence/showcase-improved-desktop.png', fullPage: true });
console.log('Screenshot saved');
console.log('Errors:', JSON.stringify(errors.slice(0, 3), null, 2));

// Test mobile too
const ctxMobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
const pageM = await ctxMobile.newPage();
await pageM.goto('http://127.0.0.1:4500/showcase.html', { waitUntil: 'load' });
await pageM.waitForTimeout(3500);
await pageM.screenshot({ path: 'qa/evidence/showcase-improved-mobile.png', fullPage: true });

await browser.close();
