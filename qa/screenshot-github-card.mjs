import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto('http://127.0.0.1:4500/showcase.html', { waitUntil: 'load' });
await page.waitForTimeout(4000);
await page.evaluate(() => document.querySelector('[data-demo-card="github"]').scrollIntoView({ block: 'center' }));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'qa/evidence/github-card-v2.png' });

const info = await page.evaluate(() => {
  const canvas = document.querySelector('[data-demo-card="github"] canvas');
  const off = document.createElement('canvas');
  off.width = canvas.width;
  off.height = canvas.height;
  off.getContext('2d').drawImage(canvas, 0, 0);
  const data = off.getContext('2d').getImageData(0, 0, off.width, off.height).data;
  let nonBlack = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] > 5 || data[i+1] > 5 || data[i+2] > 5) nonBlack++;
  }
  return { nonBlack, status: document.querySelector('#github-status')?.textContent };
});
console.log('Info:', JSON.stringify(info));
await browser.close();
