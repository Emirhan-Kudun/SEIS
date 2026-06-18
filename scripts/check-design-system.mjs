#!/usr/bin/env node
// Binds the apps/web surface to the open SEIS Design System: every --seis-*
// token referenced in apps/web CSS must be DEFINED in the canonical
// packages/design-tokens/seis.tokens.css. This makes the design tokens the
// single source of truth for the surface and catches drift in CI — without
// requiring a bundler. (Design system: docs/design/seis-design-system.md)
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const tokensFile = "packages/design-tokens/seis.tokens.css";
const surfaceRoot = "apps/web";
const failures = [];

if (!existsSync(tokensFile)) {
  console.error(`Design system check failed: missing ${tokensFile}`);
  process.exit(1);
}

// Tokens DEFINED in the canonical file: "--seis-foo:".
const tokensCss = readFileSync(tokensFile, "utf8");
const defined = new Set(
  [...tokensCss.matchAll(/(--seis-[a-z0-9-]+)\s*:/g)].map((m) => m[1]),
);
if (defined.size < 10) {
  failures.push(`canonical token set looks too small (${defined.size} tokens)`);
}

// Collect every CSS file under the surface.
const cssFiles = [];
function walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (full.endsWith(".css")) cssFiles.push(full);
  }
}
walk(surfaceRoot);

// Every referenced token "var(--seis-foo" must be defined.
let referencedCount = 0;
for (const file of cssFiles) {
  const css = readFileSync(file, "utf8");
  for (const match of css.matchAll(/var\(\s*(--seis-[a-z0-9-]+)/g)) {
    const token = match[1];
    referencedCount += 1;
    if (!defined.has(token)) {
      failures.push(`${file}: uses undefined design token ${token}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Design system check failed (surface ↔ tokens drift):");
  for (const failure of [...new Set(failures)]) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  `Design system check passed (${defined.size} tokens defined; ${referencedCount} surface references, all resolve).`,
);
