#!/usr/bin/env node
// Builds apps/desktop/native/dist-stage/: a small staging directory that lets
// the Tauri shell's distDir satisfy cockpit.html's own asset paths.
//
// cockpit.html loads "../../packages/design-tokens/seis.tokens.css" and
// "../../packages/ui/seis.ui.css" (relative to its real location,
// apps/web/cockpit.html, those two dots-up land on the repo root's
// packages/ directory). A browser clamps ".." at the document root instead
// of erroring, so as long as packages/design-tokens and packages/ui exist
// as top-level siblings of the copied apps/web contents, the same relative
// path resolves correctly regardless of nesting depth. This script does
// exactly that — no build step, no bundler, just three cpSync calls.
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../..");
const stageDir = join(here, "dist-stage");

rmSync(stageDir, { recursive: true, force: true });
mkdirSync(stageDir, { recursive: true });

copy(join(root, "apps/web"), stageDir);
copy(join(root, "packages/design-tokens"), join(stageDir, "packages/design-tokens"));
copy(join(root, "packages/ui"), join(stageDir, "packages/ui"));

console.log(`Staged ${stageDir} for the Tauri shell's distDir.`);

function copy(source, target) {
  if (!existsSync(source)) {
    throw new Error(`Missing source: ${source}`);
  }
  cpSync(source, target, { recursive: true, force: true });
}
