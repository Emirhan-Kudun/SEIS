import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const releaseNotesPath = path.join(root, "docs/releases/seis-deficiency-closure-2026-05-27.md");
const releaseNotes = fs.readFileSync(releaseNotesPath, "utf8");
const errors = [];

const stalePhrases = [
  "## Remaining Backlog",
  "Add PNG app icons for stricter iOS home-screen polish when visual assets are finalized.",
  "Add bundle/image budget reporting to release evidence without running heavy loops by default.",
  "- Command: `pending`",
  "pending validation"
];

for (const phrase of stalePhrases) {
  if (releaseNotes.includes(phrase)) {
    errors.push(`Release notes contain stale closure evidence: ${phrase}`);
  }
}

for (const requiredPhrase of [
  "## Backlog Resolution",
  "Resolved: PNG app icons",
  "Resolved: bundle/image budget reporting",
  "Future: add browser-based accessibility snapshots",
  "## Closure Pack 11",
  "motionSceneModes",
  "localized scene mode cards",
  "check:content"
]) {
  if (!releaseNotes.includes(requiredPhrase)) {
    errors.push(`Release notes missing closure evidence: ${requiredPhrase}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Release notes check passed: backlog state and latest closure evidence are current.");
