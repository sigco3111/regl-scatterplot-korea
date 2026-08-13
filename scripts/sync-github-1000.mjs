#!/usr/bin/env node
// Dev-only sync for the GitHub 1000 demo. Vite serves `public/` statically, so
// we copy the static demo + dataset into `public/github-1000/` so the showcase
// iframe can load it in dev mode. The Pages build path copies the same
// assets into `docs/github-1000/`.
import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.cwd());
const src = resolve(root, 'examples/github-1000');
const data = resolve(root, 'data/github-repos.json');
const dst = resolve(root, 'public/github-1000');

if (!existsSync(src)) {
  console.error(`[sync-github-1000] missing source: ${src}`);
  process.exit(1);
}
if (!existsSync(data)) {
  console.error(`[sync-github-1000] missing dataset: ${data}`);
  process.exit(1);
}

mkdirSync(dst, { recursive: true });
mkdirSync(resolve(dst, 'data'), { recursive: true });
cpSync(src, dst, { recursive: true });
cpSync(data, resolve(dst, 'data/github-repos.json'));

console.log(`[sync-github-1000] copied demo → ${dst}`);
