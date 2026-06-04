import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

const roots = [
  "apps/site-next/app",
  "apps/site-next/components"
];

const allowedPrefixes = [
  "/api/",
  "/_next/",
  "/favicon",
  "/manifest",
  "/robots",
  "/sitemap"
];

const filePattern = /\.(tsx|ts)$/;
const rawHrefPattern = /href\s*=\s*(?:"\/|{'\/|{"\/|`\/|{\s*`\/|'\s*\/)/;

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walk(fullPath, files);
      continue;
    }
    if (filePattern.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

for (const relativeRoot of roots) {
  const absoluteRoot = path.join(root, relativeRoot);
  if (!fs.existsSync(absoluteRoot)) continue;
  const files = walk(absoluteRoot);

  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    const lines = source.split("\n");
    lines.forEach((line, index) => {
      if (!rawHrefPattern.test(line)) return;

      const safe = allowedPrefixes.some((prefix) => line.includes(`"${prefix}`) || line.includes(`'${prefix}`) || line.includes(`\`${prefix}`));
      if (safe) return;

      const relative = path.relative(root, file);
      errors.push(`${relative}:${index + 1} uses a raw internal href. Use withLocalePath(...) instead.`);
    });
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Localized links check passed: internal navigation avoids raw locale-less href values.");
