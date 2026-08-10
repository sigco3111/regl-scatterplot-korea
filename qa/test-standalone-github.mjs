import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (m.type() === 'error' || m.text().includes('FATAL') || m.text().includes('github')) {
    console.log(`[${m.type()}] ${m.text().slice(0, 200)}`);
  }
});

await page.goto('http://127.0.0.1:4500/github-130k/index.html', { waitUntil: 'load' });
await page.waitForTimeout(4000);

const info = await page.evaluate(() => {
  const canvas = document.querySelector('canvas');
  if (!canvas) return { error: 'no canvas' };
  const off = document.createElement('canvas');
  off.width = canvas.width;
  off.height = canvas.height;
  off.getContext('2d').drawImage(canvas, 0, 0);
  const data = off.getContext('2d').getImageData(0, 0, off.width, off.height).data;
  let nonBlack = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] > 5 || data[i+1] > 5 || data[i+2] > 5) nonBlack++;
  }
  return {
    nonBlack,
    total: off.width * off.height,
    canvasW: canvas.width,
    canvasH: canvas.height,
    status: document.querySelector('#stats')?.textContent,
  };
});
console.log('Result:', JSON.stringify(info, null, 2));
console.log('Errors:', errors);

await page.screenshot({ path: 'qa/evidence/standalone-github-fixed.png', fullPage: false });
await browser.close();
