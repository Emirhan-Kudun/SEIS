import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([".git", "node_modules", ".next", "dist"]);
const bannedDirectoryNames = new Set(["__MACOSX"]);
const bannedFileNames = new Set([".DS_Store", "encryption_key.txt", "credentials.key"]);
const bannedExtensions = new Set([".zip", ".enc"]);
const errors = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    const relativePath = path.relative(root, fullPath);

    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) continue;
      if (bannedDirectoryNames.has(entry.name)) {
        errors.push(`Banned archive directory found: ${relativePath}`);
        continue;
      }
      walk(fullPath);
      continue;
    }

    if (bannedFileNames.has(entry.name)) {
      errors.push(`Banned source artifact found: ${relativePath}`);
    }

    if (bannedExtensions.has(path.extname(entry.name))) {
      errors.push(`Banned archive/secret extension found: ${relativePath}`);
    }
  }
}

walk(root);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Source boundary check passed.");
