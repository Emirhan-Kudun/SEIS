import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentPath = path.join(root, "packages/content/src/data.json");
const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const requiredLocales = ["tr", "en", "fr", "it", "de"];

const errors = [];

for (const locale of requiredLocales) {
  if (!content.locales.includes(locale)) {
    errors.push(`Missing locale: ${locale}`);
  }
  if (!content.dictionary[locale]) {
    errors.push(`Missing dictionary: ${locale}`);
  }
}

for (const drawing of content.drawings) {
  const rel = drawing.src.replace(/^\//, "");
  const nextAsset = path.join(root, "apps/site-next/public", rel);
  const viteAsset = path.join(root, "apps/site-vite/public", rel);
  if (!fs.existsSync(nextAsset)) errors.push(`Missing Next drawing asset: ${drawing.src}`);
  if (!fs.existsSync(viteAsset)) errors.push(`Missing Vite drawing asset: ${drawing.src}`);
}

if (content.works.length < 3) errors.push("Expected at least 3 works.");
if (content.services.length < 3) errors.push("Expected at least 3 services.");
if (!content.site.email.includes("@")) errors.push("Invalid contact email.");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Content check passed: ${content.locales.length} locales, ${content.works.length} works, ${content.drawings.length} drawings.`);
