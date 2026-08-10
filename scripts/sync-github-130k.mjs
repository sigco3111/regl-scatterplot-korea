#!/usr/bin/env node
// Dev-only sync for the GitHub 130k demo. Vite serves `public/` statically, so
// we copy the static demo + dataset into `public/github-130k/` so the showcase
// iframe can load it in dev mode. The Vercel build path copies the same
// assets into `docs/github-130k/`.
import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.cwd());
const src = resolve(root, 'examples/github-130k');
const data = resolve(root, 'data/github-repos.json');
const dst = resolve(root, 'public/github-130k');

if (!existsSync(src)) {
  console.error(`[sync-github-130k] missing source: ${src}`);
  process.exit(1);
}
if (!existsSync(data)) {
  console.error(`[sync-github-130k] missing dataset: ${data}`);
  process.exit(1);
}

mkdirSync(dst, { recursive: true });
mkdirSync(resolve(dst, 'data'), { recursive: true });
cpSync(src, dst, { recursive: true });
cpSync(data, resolve(dst, 'data/github-repos.json'));

console.log(`[sync-github-130k] copied demo → ${dst}`);
