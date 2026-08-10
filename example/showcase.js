import createScatterplot from '../src';
import { scaleLinear } from 'd3-scale';
import { checkSupport } from './utils';

const rng = (() => {
  let seed = 0x9e3779b9;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0xffffffff;
  };
})();

const gaussianRandom = () => {
  const u = Math.max(rng(), 1e-9);
  const v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

const points = (n, fill) => {
  const out = { x: new Float32Array(n), y: new Float32Array(n) };
  for (let i = 0; i < n; i++) {
    const v = fill(i, n);
    out.x[i] = v.x;
    out.y[i] = v.y;
  }
  return out;
};

const pointsWithCategory = (n, fill, clusters) => {
  const out = points(n, fill);
  out.z = new Float32Array(n);
  for (let i = 0; i < n; i++) out.z[i] = clusters[Math.floor(rng() * clusters.length)];
  return out;
};

const pointsWithValue = (n, fill) => {
  const out = points(n, fill);
  out.w = new Float32Array(n);
  for (let i = 0; i < n; i++) out.w[i] = rng();
  return out;
};

const COLORS_CAT = ['#3a78aa', '#aa3a99'];
const COLORS_SCALE = [
  '#002072', '#162b79', '#233680', '#2e4186', '#394d8d', '#425894',
  '#4b649a', '#5570a1', '#5e7ca7', '#6789ae', '#7195b4', '#7ba2ba',
  '#85aec0', '#90bbc6', '#9cc7cc', '#a9d4d2', '#b8e0d7', '#c8ecdc',
  '#ddf7df', '#ffffe0',
];

const setupCanvas = (id, options) => {
  const canvas = document.querySelector(id);
  const rect = canvas.getBoundingClientRect();
  return createScatterplot({
    canvas,
    width: Math.max(320, Math.floor(rect.width)),
    height: Math.max(240, Math.floor(rect.height)),
    pointSize: 2,
    opacity: 0.55,
    showReticle: false,
    backgroundColor: '#000000',
    ...options,
  });
};

const cardCanvasesReady = async () => {
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const cards = Array.from(document.querySelectorAll('[data-demo-card]'));
  await Promise.all(
    cards.map(
      (card) =>
        new Promise((r) => {
          if (card.getBoundingClientRect().width > 0) r();
          else setTimeout(r, 50);
        })
    )
  );
};

async function initColor() {
  const sp = setupCanvas('#canvas-color');
  checkSupport(sp);
  const data = pointsWithCategory(80000, () => ({ x: -1 + rng() * 2, y: -1 + rng() * 2 }), [0, 1]);
  sp.set({ colorBy: 'category', pointColor: COLORS_CAT });
  sp.draw(data);
  return sp;
}

async function initAxes() {
  const sp = setupCanvas('#canvas-axes');
  const data = points(40000, () => ({ x: -1 + rng() * 2, y: -1 + rng() * 2 }));
  sp.draw(data);
  const xScale = scaleLinear().domain([-1, 1]).range([0, 1]);
  const yScale = scaleLinear().domain([-1, 1]).range([0, 1]);
  sp.set({ xScale, yScale });
  return sp;
}

async function initLabels() {
  const sp = setupCanvas('#canvas-labels');
  const data = points(120, (i) => ({ x: -1 + rng() * 2, y: -1 + rng() * 2 }));
  data.label = Array.from({ length: 120 }, (_, i) => `점 ${i + 1}`);
  sp.draw(data);
  sp.set({ showLabelsOnHover: true });
  return sp;
}

async function initConnections() {
  const sp = setupCanvas('#canvas-connect');
  const N = 12000;
  const data = points(N, () => ({ x: -1 + rng() * 2, y: -1 + rng() * 2 }));
  sp.draw(data);
  sp.set({
    pointConnectionColor: '#34bbff',
    pointConnectionColorActive: '#ffcc66',
    pointConnectionWidth: 0.5,
    pointConnectionWidthActive: 1.5,
    pointConnectionsOpacity: 0.4,
    pointConnectionsOpacityActive: 0.8,
  });
  return sp;
}

async function initOpacity() {
  const sp = setupCanvas('#canvas-opacity');
  const data = points(60000, () => ({ x: -1 + rng() * 2, y: -1 + rng() * 2 }));
  sp.draw(data);
  sp.set({ opacityBy: 'density' });
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
  const sp = setupCanvas('#canvas-github');
  const status = document.querySelector('#github-status');
  try {
    const resp = await fetch('./github-130k/data/github-repos.json');
    const payload = await resp.json();
    const repos = payload.repos || [];
    if (status) status.textContent = `${repos.length.toLocaleString()}개`;
    const pointsData = repos.map((r) => {
      const colorHex = LANG_COLORS[r.lang] || COLOR_DEFAULT;
      return {
        x: Math.log10(Math.max(r.x, 1)),
        y: Math.log10(Math.max(r.y, 1)),
        color: [parseInt(colorHex.slice(1), 16)],
        label: r.full_name,
      };
    });
    sp.set({
      pointSize: 2,
      pointColor: (i) => pointsData[i].color,
      pointColorHover: [0xff, 0xff, 0xff],
      pointSizeSelected: 4,
      opacity: 0.7,
    });
    sp.draw(pointsData);
    return sp;
  } catch (e) {
    if (status) status.textContent = '로드 실패';
    console.error('[github] failed to load', e);
    const fallback = points(2000, () => ({ x: rng() * 6, y: rng() * 5 }));
    sp.draw(fallback);
    return sp;
  }
}

async function main() {
  await cardCanvasesReady();
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
