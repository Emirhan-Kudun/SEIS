#!/usr/bin/env node
// Enforces the SEIS icon system: every registered icon is a real SVG
// pictogram (never text standing in for a logo/icon), matches its declared
// viewBox, carries an accessible name, and only uses canonical --seis-*
// token colors. See packages/design-tokens/icons/README.md.
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const tokensCss = readFileSync(
  resolve(root, "packages/design-tokens/seis.tokens.css"),
  "utf8",
);
const allowedHex = new Set(
  [...tokensCss.matchAll(/#[0-9a-fA-F]{3,8}/g)].map((m) => m[0].toLowerCase()),
);
const allowedKeywords = new Set(["none", "transparent", "currentcolor"]);

const manifestPath = "packages/design-tokens/icons/icon-manifest.json";
const manifest = JSON.parse(readFileSync(resolve(root, manifestPath), "utf8"));

if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) {
  errors.push(`${manifestPath}: icons must be a non-empty array`);
}

for (const icon of manifest.icons ?? []) {
  const { id, file, viewBox } = icon;
  if (!id || !file || !viewBox) {
    errors.push(`${manifestPath}: icon entry missing id/file/viewBox`);
    continue;
  }
  const iconPath = resolve(root, file);
  if (!existsSync(iconPath)) {
    errors.push(`${id}: file not found: ${file}`);
    continue;
  }
  const svg = readFileSync(iconPath, "utf8");

  if (!/^\s*<svg[\s>]/.test(svg)) {
    errors.push(`${id}: ${file} is not an SVG document`);
    continue;
  }
  if (/<text[\s>]/i.test(svg)) {
    errors.push(`${id}: ${file} contains <text> — icons/logos must be visual, not text`);
  }
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
  if (!viewBoxMatch) {
    errors.push(`${id}: ${file} missing viewBox`);
  } else if (viewBoxMatch[1] !== viewBox) {
    errors.push(`${id}: ${file} viewBox "${viewBoxMatch[1]}" does not match manifest "${viewBox}"`);
  }
  const hasAccessibleName = /role="img"/.test(svg) && (/<title>/.test(svg) || /aria-label="[^"]+"/.test(svg));
  if (!hasAccessibleName) {
    errors.push(`${id}: ${file} needs role="img" and a <title> or aria-label`);
  }
  for (const match of svg.matchAll(/#[0-9a-fA-F]{3,8}/g)) {
    const hex = match[0].toLowerCase();
    if (!allowedHex.has(hex)) {
      errors.push(`${id}: ${file} uses non-canonical color ${hex} (not in seis.tokens.css)`);
    }
  }
  for (const match of svg.matchAll(/(?:fill|stroke)="([^"]+)"/g)) {
    const value = match[1].toLowerCase();
    if (value.startsWith("#") || allowedKeywords.has(value)) continue;
    errors.push(`${id}: ${file} uses non-token color value "${match[1]}"`);
  }
}

if (errors.length > 0) {
  console.error("Icon system check failed:");
  for (const error of [...new Set(errors)]) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`Icon system check passed (${manifest.icons.length} icons, all visual, all token-consistent).`);
