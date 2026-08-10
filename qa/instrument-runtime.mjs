import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', (err) => errors.push({ msg: err.message, stack: err.stack }));
page.on('console', (m) => {
  if (m.type() === 'error' || m.text().includes('scatter') || m.text().includes('points')) {
    console.log('CONSOLE', m.type(), ':', m.text().slice(0, 200));
  }
});

await page.goto('http://127.0.0.1:4500/index.html', { waitUntil: 'load' });
await page.waitForTimeout(2000);

// Inspect scatterplot state
const inspect = await page.evaluate(() => {
  const canvas = document.querySelector('#canvas');
  const gl = canvas?.getContext('webgl2') || canvas?.getContext('webgl');
  return {
    canvasExists: !!canvas,
    canvasSize: canvas ? { w: canvas.width, h: canvas.height, clientW: canvas.clientWidth, clientH: canvas.clientHeight } : null,
    glAvailable: !!gl,
    hasScatterplot: !!window.scatterplot,
    bodyChildren: document.body.children.length,
    controlsExists: !!document.querySelector('#controls'),
    canvasParentId: canvas?.parentElement?.id,
  };
});
console.log('Inspect:', JSON.stringify(inspect, null, 2));

// Subscribe to draw event after a delay
const drawResult = await page.evaluate(async () => {
  // Wait for scatterplot instance to be available
  let sp = null;
  for (let i = 0; i < 50; i++) {
    sp = window.scatterplot;
    if (sp) break;
    await new Promise(r => setTimeout(r, 100));
  }
  if (!sp) return 'no scatterplot on window';
  return {
    version: sp.get('version'),
    points: sp.get('points')?.length,
    width: sp.get('width'),
    height: sp.get('height'),
    isDestroyed: sp.get('isDestroyed'),
    isDrawing: sp.get('isDrawing'),
  };
});
console.log('Scatterplot state:', JSON.stringify(drawResult, null, 2));

console.log('Errors:', JSON.stringify(errors, null, 2));
await browser.close();
