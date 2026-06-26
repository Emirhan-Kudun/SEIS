#!/usr/bin/env node
/**
 * Assembles the deployable static site into `public/`:
 *   /            → the SEIS OS landing page (site/index.html, link-rewritten)
 *   /apps/seis-os/  → the built SEIS OS (Vite production build)
 *   /apps/<app>/    → the standalone static apps (vscode-web, gacha, video-hero)
 *
 * Used as the Vercel buildCommand. Run locally with: node scripts/build-deploy.mjs
 */
import { execSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';

const root = process.cwd();
const out = `${root}/public`;
const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit' });

rmSync(out, { recursive: true, force: true });
mkdirSync(`${out}/apps`, { recursive: true });

// 1. Build the SEIS OS Vite app
run('npm install --no-audit --no-fund', `${root}/apps/seis-os`);
run('npm run build', `${root}/apps/seis-os`);
cpSync(`${root}/apps/seis-os/dist`, `${out}/apps/seis-os`, { recursive: true });

// 2. Copy the standalone static apps (excluding any node_modules)
for (const app of ['vscode-web', 'shanhaijing-gacha', 'video-hero']) {
  cpSync(`${root}/apps/${app}`, `${out}/apps/${app}`, {
    recursive: true,
    filter: (src) => !src.includes('node_modules'),
  });
}

// 3. Landing page at root, with links rewritten for the deployed layout
const landing = readFileSync(`${root}/site/index.html`, 'utf8')
  .replace(/\.\.\/apps\//g, 'apps/')
  .replace(/\.\.\/docs\/[^"')\s]*/g, 'https://github.com/Emirhan-Kudun/SEIS/tree/main/docs');
writeFileSync(`${out}/index.html`, landing);

console.log('✓ built public/ (landing + seis-os + standalone apps)');
