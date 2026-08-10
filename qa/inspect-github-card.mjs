import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
const logs = [];
page.on('pageerror', (e) => errors.push({ msg: e.message, stack: e.stack?.slice(0, 300) }));
page.on('console', (m) => logs.push({ type: m.type(), text: m.text() }));

await page.goto('http://127.0.0.1:4500/showcase.html', { waitUntil: 'load' });
await page.waitForTimeout(3000);

const info = await page.evaluate(async () => {
  const card = document.querySelector('[data-demo-card="github"]');
  const canvas = card.querySelector('canvas');
  const status = document.querySelector('#github-status');

  // Use a fresh canvas to copy and read pixels (since getContext returns null)
  const off = document.createElement('canvas');
  off.width = canvas.width;
  off.height = canvas.height;
  const offCtx = off.getContext('2d');
  offCtx.drawImage(canvas, 0, 0);
  const data = offCtx.getImageData(0, 0, off.width, off.height).data;
  let drawnPixels = 0;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 0) drawnPixels++;
  }

  const resp = await fetch('./github-1000/data/github-repos.json');
  const payload = await resp.json();
  const repos = payload.repos || [];

  return {
    status: status?.textContent,
    canvasW: canvas.width,
    canvasH: canvas.height,
    drawnPixels,
    totalPixels: off.width * off.height,
    repoCount: repos.length,
    cardRect: card.getBoundingClientRect(),
    overlayPresent: !!card.querySelector('svg'),
  };
});
console.log(JSON.stringify(info, null, 2));

const ghBox = await page.locator('[data-demo-card="github"]').boundingBox();
await page.screenshot({ path: 'qa/evidence/github-card-debug.png', clip: ghBox });

console.log('\n=== Errors ===');
for (const e of errors) console.log(JSON.stringify(e));
console.log('\n=== Relevant logs ===');
for (const l of logs) {
  if (l.text.match(/github|showcase|scatter|FATAL/i)) {
    console.log(`[${l.type}] ${l.text.slice(0, 200)}`);
  }
}

await browser.close();
