import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', (err) => errors.push(err.message));

await page.goto('http://127.0.0.1:4500/showcase.html', { waitUntil: 'load' });
await page.waitForTimeout(3000);

const info = await page.evaluate(async () => {
  const card = document.querySelector('[data-demo-card="github"]');
  const canvas = card.querySelector('canvas');
  const status = document.querySelector('#github-status');
  const resp = await fetch('./github-130k/data/github-repos.json');
  const payload = await resp.json();
  const repos = payload.repos || [];
  const xs = repos.map(r => Math.log10(Math.max(r.x, 1)));
  const ys = repos.map(r => Math.log10(Math.max(r.y, 1)));
  return {
    status: status?.textContent,
    repoCount: repos.length,
    xRange: [Math.min(...xs), Math.max(...xs)],
    yRange: [Math.min(...ys), Math.max(...ys)],
    canvasW: canvas.width,
    canvasH: canvas.height,
  };
});
console.log(JSON.stringify(info, null, 2));
console.log('Errors:', errors);

await browser.close();
