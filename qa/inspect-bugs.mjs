import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const issues = {};

// 1) Color encoding card's "전체 화면" link — click it from /showcase.html
await page.goto('http://127.0.0.1:4500/showcase.html', { waitUntil: 'load' });
await page.waitForTimeout(1500);
const colorCardLink = page.locator('[data-demo-card="color"] footer a');
const colorHref = await colorCardLink.getAttribute('href');
const colorText = await colorCardLink.textContent();
issues.colorLinkHref = colorHref;
issues.colorLinkText = colorText?.trim();

const popupPromise = ctx.waitForEvent('page', { timeout: 5000 }).catch(() => null);
await colorCardLink.click();
const popup = await popupPromise;
if (popup) {
  await popup.waitForLoadState();
  issues.popupFinalUrl = popup.url();
  issues.popupTitle = await popup.title();
  issues.popupBodyStart = (await popup.content()).slice(0, 500);
} else {
  issues.popupFinalUrl = 'no popup opened';
}

// 2) Standalone axes.html menu rendering
await page.goto('http://127.0.0.1:4500/axes.html', { waitUntil: 'load' });
await page.waitForTimeout(2500);
const menu = page.locator('#controls .tp-rotv').first();
const examplesFolder = page.locator('#controls').locator('text=/Examples|예제 목록/').first();
issues.axesHasControls = await page.locator('#controls').count() > 0;
issues.axesExamplesVisible = await examplesFolder.count();
const allLinkTexts = await page.$$eval('.tp-lblv_l', (els) =>
  els.map((el) => el.textContent.trim()).filter(Boolean)
);
issues.axesLinkLabels = allLinkTexts;
const allTPLinks = await page.$$eval('.tp-link a, a.tp-lblv_a', (els) =>
  els.map((el) => ({ href: el.getAttribute('href'), text: el.textContent.trim() }))
);
issues.axesAnchorTexts = allTPLinks;

// 3) Standalone color encoding at /index.html
await page.goto('http://127.0.0.1:4500/index.html', { waitUntil: 'load' });
await page.waitForTimeout(2500);
issues.indexFinalUrl = page.url();
issues.indexTitle = await page.title();
issues.indexBodyStart = (await page.content()).slice(0, 200);

console.log(JSON.stringify(issues, null, 2));
await browser.close();
