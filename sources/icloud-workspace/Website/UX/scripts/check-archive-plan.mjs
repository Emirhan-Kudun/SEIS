import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

const plan = read("docs/archive-automation-plan.md");
const packageJson = JSON.parse(read("package.json"));
const shareScript = read("scripts/share-icloud-github.mjs");

for (const requiredPhrase of [
  "daily at 20:30 Europe/Istanbul",
  "npm run share:icloud-github",
  "GitHub push is allowed only when `gh auth status -h github.com` is configured",
  "Missing GitHub auth is a clean blocker, not a retry loop",
  "dirty worktree is recorded"
]) {
  if (!plan.includes(requiredPhrase)) {
    errors.push(`Archive automation plan missing: ${requiredPhrase}`);
  }
}

if (packageJson.scripts?.["share:icloud-github"] !== "node scripts/share-icloud-github.mjs") {
  errors.push("package.json must expose share:icloud-github as the archive command.");
}

for (const requiredSnippet of ["clean_worktree", "GitHub CLI auth missing. Push skipped.", "git\", [\"bundle\", \"create\""]) {
  if (!shareScript.includes(requiredSnippet)) {
    errors.push(`share:icloud-github script missing archive safety snippet: ${requiredSnippet}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Archive automation plan check passed: cadence, export command and auth-safe sharing are documented.");
