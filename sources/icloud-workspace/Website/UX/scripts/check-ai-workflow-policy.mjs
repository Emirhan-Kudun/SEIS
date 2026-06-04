import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const scanRoots = [
  "apps/site-next",
  "packages/content/src",
  "scripts",
  "docs"
];
const textExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".yml", ".yaml", ".txt"]);
const ignoredDirectories = new Set(["node_modules", ".git", ".next", "dist", ".cache", ".turbo", ".vercel"]);
const ignoredFiles = new Set(["scripts/check-ai-workflow-policy.mjs"]);
const blockedPatterns = [
  { regex: /\bWiz MCP\b/i, reason: "Suspended MCP references are not allowed in this workflow." },
  { regex: /app:\/\/wiz/i, reason: "Suspended connector links are not allowed in this repository workflow." },
  { regex: /\bwiz\b/i, reason: "Suspended prototype-builder references are disallowed; use Lovable as preferred prototype builder." }
];

function collectFiles(relativeRoot, files = []) {
  const absoluteRoot = path.join(root, relativeRoot);
  if (!fs.existsSync(absoluteRoot)) return files;

  for (const entry of fs.readdirSync(absoluteRoot, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue;

    const absolutePath = path.join(absoluteRoot, entry.name);
    if (entry.isDirectory()) {
      collectFiles(path.relative(root, absolutePath), files);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (textExtensions.has(extension)) {
      files.push(absolutePath);
    }
  }

  return files;
}

const files = scanRoots.flatMap((scanRoot) => collectFiles(scanRoot)).sort();
for (const file of files) {
  const relativeFile = path.relative(root, file);
  if (ignoredFiles.has(relativeFile)) continue;

  const source = fs.readFileSync(file, "utf8");

  for (const pattern of blockedPatterns) {
    if (pattern.regex.test(source)) {
      errors.push(`${relativeFile}: ${pattern.reason}`);
      break;
    }
  }
}

const digitalLabApiPath = "apps/site-next/app/api/digital-lab/route.ts";
const digitalLabApiSource = fs.readFileSync(path.join(root, digitalLabApiPath), "utf8");
for (const requiredSnippet of ['preferredPrototypeBuilder', '"Lovable"']) {
  if (!digitalLabApiSource.includes(requiredSnippet)) {
    errors.push(`${digitalLabApiPath}: missing required AI-native prototype snippet ${requiredSnippet}.`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`AI workflow policy check passed: ${files.length - ignoredFiles.size} files scanned, Lovable preference guarded and suspended references absent.`);
