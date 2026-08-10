import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

const page = await ctx.newPage();

// Capture ALL errors with full context
const errors = [];
const consoleMsgs = [];

page.on('pageerror', (err) => {
  errors.push({
    message: err.message,
    stack: err.stack,
    name: err.name,
    lineNumber: err.lineNumber,
    columnNumber: err.columnNumber,
    fileName: err.fileName || err.stack?.split('\n')[0],
  });
});

page.on('console', (msg) => {
  consoleMsgs.push({ type: msg.type(), text: msg.text() });
});

// Listen for unhandled promise rejections
page.on('crash', () => console.log('PAGE CRASHED'));

// Capture network requests that fail
page.on('requestfailed', (req) => console.log('FAILED REQ:', req.url(), req.failure()?.errorText));

await page.goto('http://127.0.0.1:4500/index.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(4000);

console.log('=== PAGE ERRORS ===');
console.log(JSON.stringify(errors, null, 2));
console.log('=== CONSOLE ERRORS ===');
const errMsgs = consoleMsgs.filter(m => m.type === 'error');
console.log(JSON.stringify(errMsgs, null, 2));
console.log('=== CONSOLE WARNINGS (first 3) ===');
console.log(JSON.stringify(consoleMsgs.filter(m => m.type === 'warning').slice(0, 3), null, 2));

await browser.close();
