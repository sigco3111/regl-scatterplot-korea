import createScatterplot from '../src';
import { axisBottom, axisRight } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

const rng = (() => {
  let seed = 0x9e3779b9;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0xffffffff;
  };
})();

const makePoints = (n, fill) => {
  const out = new Array(n);
  for (let i = 0; i < n; i++) out[i] = fill(i, n);
  return out;
};

const COLORS_CAT = ['#3a78aa', '#aa3a99'];
const COLORS_SCALE = [
  '#002072', '#162b79', '#233680', '#2e4186', '#394d8d', '#425894',
  '#4b649a', '#5570a1', '#5e7ca7', '#6789ae', '#7195b4', '#7ba2ba',
  '#85aec0', '#90bbc6', '#9cc7cc', '#a9d4d2', '#b8e0d7', '#c8ecdc',
  '#ddf7df', '#ffffe0',
];
const COLORS_AXES = [
  '#d192b7', '#6fb2e4', '#eecb62', '#56bf92', '#dca237', '#3a84cc', '#c76526',
];

const setupCanvas = (id, baseOptions) => {
  const canvas = document.querySelector(id);
  const rect = canvas.getBoundingClientRect();
  return createScatterplot({
    canvas,
    width: Math.max(320, Math.floor(rect.width)),
    height: Math.max(240, Math.floor(rect.height)),
    pointSize: 2,
    showReticle: true,
    backgroundColor: '#000000',
    ...baseOptions,
  });
};

const cardReady = (selector) =>
  new Promise((resolve) => {
    const el = document.querySelector(selector);
    if (el && el.getBoundingClientRect().width > 0) resolve();
    else setTimeout(() => resolve(), 50);
  });

async function initColor() {
  await cardReady('[data-demo-card="color"]');
  const sp = setupCanvas('#canvas-color', { opacity: 0.33, lassoType: 'brush' });
  const numPoints = 100000;
  const data = {
    x: new Float32Array(numPoints),
    y: new Float32Array(numPoints),
    z: new Float32Array(numPoints),
    w: new Float32Array(numPoints),
  };
  for (let i = 0; i < numPoints; i++) {
    data.x[i] = -1 + rng() * 2;
    data.y[i] = -1 + rng() * 2;
    data.z[i] = Math.round(rng());
    data.w[i] = rng();
  }
  sp.set({ colorBy: 'value', pointColor: COLORS_SCALE });
  sp.draw(data);
  return sp;
}

async function initAxes() {
  await cardReady('[data-demo-card="axes"]');
  const card = document.querySelector('[data-demo-card="axes"]');
  const canvas = card.querySelector('canvas');
  const sp = setupCanvas('#canvas-axes', {
    opacity: 0.5,
    xScale: scaleLinear().domain([0, 42]).range([0, 1]),
    yScale: scaleLinear().domain([0, 4.2]).range([0, 1]),
  });

  const frameEl = canvas.parentElement;
  const frameRect = frameEl.getBoundingClientRect();
  const overlay = select(frameEl).append('svg');
  overlay
    .attr('class', 'demo-axes-overlay')
    .style('position', 'absolute')
    .style('top', 0)
    .style('left', 0)
    .style('width', '100%')
    .style('height', '100%')
    .style('pointer-events', 'none');

  const xAxisPadding = 14;
  const yAxisPadding = 28;
  const innerW = frameRect.width - yAxisPadding;
  const innerH = frameRect.height - xAxisPadding;
  const xScale = scaleLinear().domain([0, 42]).range([0, innerW]);
  const yScale = scaleLinear().domain([0, 4.2]).range([innerH, 0]);
  const xAxis = axisBottom(xScale).ticks(5).tickSizeInner(-innerH);
  const yAxis = axisRight(yScale).ticks(4).tickSizeInner(-innerW);
  const xAxisG = overlay.append('g').attr('transform', `translate(0, ${innerH})`).call(xAxis);
  const yAxisG = overlay.append('g').attr('transform', `translate(${innerW}, 0)`).call(yAxis);
  overlay.selectAll('.tick line').attr('stroke', 'rgba(120, 160, 220, 0.18)');
  overlay.selectAll('path.domain').attr('stroke', 'rgba(120, 160, 220, 0.35)');
  overlay.selectAll('.tick text').attr('fill', 'rgba(180, 200, 230, 0.7)').style('font-size', '9px');

  const numPoints = 40000;
  const data = {
    x: new Float32Array(numPoints),
    y: new Float32Array(numPoints),
    z: new Float32Array(numPoints),
  };
  for (let i = 0; i < numPoints; i++) {
    data.x[i] = rng() * 42;
    data.y[i] = rng() * 4.2;
    data.z[i] = Math.round(rng() * 9) % COLORS_AXES.length;
  }
  sp.set({ colorBy: 'category', pointColor: COLORS_AXES });
  sp.draw(data);

  sp.subscribe('view', (event) => {
    if (event && event.xScale) xAxisG.call(xAxis.scale(event.xScale));
    if (event && event.yScale) yAxisG.call(yAxis.scale(event.yScale));
  });
  return sp;
}

async function initLabels() {
  await cardReady('[data-demo-card="labels"]');
  const sp = setupCanvas('#canvas-labels', { opacity: 1.0 });
  const numPoints = 10000;
  const data = new Array(numPoints);
  for (let i = 0; i < numPoints; i++) {
    data[i] = [
      -1 + rng() * 2,
      -1 + rng() * 2,
      Math.round(rng() * 9),
      rng(),
    ];
  }
  data.label = data.map((_, i) => `P${i + 1}`);
  sp.set({
    showLabelsOnHover: true,
    pointSizeSelected: 4,
  });
  sp.draw(data);
  return sp;
}

async function initConnections() {
  await cardReady('[data-demo-card="connect"]');
  const sp = setupCanvas('#canvas-connect', {
    opacity: 0.33,
    pointConnectionSize: 2,
    pointConnectionColor: [1, 1, 1, 0.18],
    pointConnectionColorActive: [0, 0.55, 1, 1],
    pointConnectionWidth: 0.6,
    pointConnectionOpacity: 0.6,
  });
  const numPoints = 9000;
  const numPerGroup = Math.round(numPoints / 3);
  const numPerStep = Math.round(numPerGroup / 5);
  const data = new Array(numPoints);
  let i = 0;
  for (let g = 0; g < 3; g++) {
    for (let s = 0; s < 5; s++) {
      const cx = -1 + g * 1.0 + rng() * 0.4;
      const cy = -1 + s * 0.5 + rng() * 0.3;
      for (let p = 0; p < numPerStep; p++) {
        const a = (p / numPerStep) * Math.PI * 2;
        const r = 0.05 + rng() * 0.15;
        data[i++] = [
          cx + Math.cos(a) * r,
          cy + Math.sin(a) * r,
          g,
          rng(),
        ];
      }
    }
  }
  sp.set({
    colorBy: 'category',
    pointColor: COLORS_AXES,
    pointConnectionColorBy: 'category',
  });
  sp.draw(data);
  return sp;
}

async function initOpacity() {
  await cardReady('[data-demo-card="opacity"]');
  const sp = setupCanvas('#canvas-opacity', { opacity: 1.0, opacityBy: 'density' });
  const numPoints = 100000;
  const data = new Array(numPoints);
  for (let i = 0; i < numPoints; i++) {
    data[i] = [rng() * 2 - 1, rng() * 2 - 1];
  }
  sp.draw(data);
  return sp;
}

const LANG_COLORS = {
  Python: '#3572A5', TypeScript: '#3178c6', JavaScript: '#f1e05a',
  Rust: '#dea584', Go: '#00ADD8', C: '#555555', 'C++': '#f34b7d',
  Java: '#b07219', Shell: '#89e051', HTML: '#e34c26', CSS: '#563d7c',
  Ruby: '#701516', PHP: '#4F5D95', Swift: '#F05138', Kotlin: '#A97BFF',
  'C#': '#178600', Lua: '#000080', Dart: '#00B4AB', Unknown: '#6e7681',
};
const COLOR_DEFAULT = '#6e7681';

async function initGitHub() {
  await cardReady('[data-demo-card="github"]');
  const status = document.querySelector('#github-status');
  if (status) status.textContent = '로딩 중…';

  const langKeys = Object.keys(LANG_COLORS);
  const langCount = langKeys.length;

  let repos = [];
  try {
    const resp = await fetch('./github-130k/data/github-repos.json');
    if (resp.ok) {
      const payload = await resp.json();
      repos = payload.repos || [];
    }
  } catch (_) {}

  if (status) status.textContent = repos.length > 0
    ? `${repos.length.toLocaleString()}개`
    : '샘플 데이터';

  const sp = setupCanvas('#canvas-github', {
    pointSize: 3,
    pointColorHover: [0xff, 0xff, 0xff],
    pointSizeSelected: 4,
    opacity: 0.85,
  });

  let data;
  if (repos.length > 0) {
    const rawX = repos.map((r) => Math.log10(Math.max(r.x, 1)));
    const rawY = repos.map((r) => Math.log10(Math.max(r.y, 1)));
    const xMin = Math.min(...rawX);
    const xMax = Math.max(...rawX);
    const yMin = Math.min(...rawY);
    const yMax = Math.max(...rawY);
    const xPad = (xMax - xMin) * 0.05 || 0.1;
    const yPad = (yMax - yMin) * 0.05 || 0.1;
    data = repos.map((r, i) => [
      ((rawX[i] - (xMin - xPad)) / (xMax + xPad - (xMin - xPad))) * 2 - 1,
      ((rawY[i] - (yMin - yPad)) / (yMax + yPad - (yMin - yPad))) * 2 - 1,
      langKeys.indexOf(r.lang) === -1 ? 0 : langKeys.indexOf(r.lang),
    ]);
  } else {
    data = new Array(120);
    for (let i = 0; i < 120; i++) {
      const t = i / 120;
      data[i] = [
        Math.cos(t * Math.PI * 2) * (0.7 - t * 0.3) + (rng() - 0.5) * 0.15,
        Math.sin(t * Math.PI * 2) * (0.7 - t * 0.3) + (rng() - 0.5) * 0.15,
        i % langCount,
      ];
    }
  }

  const colors = data.map((_, i) => {
    const hex = LANG_COLORS[langKeys[i % langCount]] || COLOR_DEFAULT;
    const v = parseInt(hex.slice(1), 16);
    return [(v >> 16) & 0xff, (v >> 8) & 0xff, v & 0xff, 255];
  });
  sp.set({ pointColor: colors });
  sp.draw(data);
  return sp;
}

async function main() {
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const sps = [];
  sps.push(await initColor());
  sps.push(await initAxes());
  sps.push(await initLabels());
  sps.push(await initConnections());
  sps.push(await initOpacity());
  sps.push(await initGitHub());
  const ref = sps[0];
  if (ref) console.log(`[showcase] mounted ${sps.length} scatterplots (v${ref.get('version')})`);
}

main().catch((e) => {
  console.error('[showcase] FATAL', e);
});
