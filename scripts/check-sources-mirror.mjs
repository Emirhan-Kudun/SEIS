#!/usr/bin/env node
// Guards the read-only vendored mirror policy for `sources/` (see
// docs/decisions/sources-vendored-mirror-policy.md). It records a content digest
// per mirror in content/governance/sources-mirror.json and fails when the tree
// drifts from that record, so accidental local edits to a mirror are caught in
// CI. A legitimate mirror refresh re-runs this with `--write`.
//
// Usage:
//   node scripts/check-sources-mirror.mjs           # verify (CI mode)
//   node scripts/check-sources-mirror.mjs --write    # regenerate the manifest

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const ROOT = process.cwd();
const SOURCES = "sources";
const MANIFEST = "content/governance/sources-mirror.json";
const POLICY = "docs/decisions/sources-vendored-mirror-policy.md";
const writeMode = process.argv.includes("--write");

function trackedFiles(prefix) {
  const out = execFileSync("git", ["ls-files", "-z", "--", prefix], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return out.split("\0").filter(Boolean);
}

function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

// Discover mirrors = the top-level directories directly under sources/ (files at
// the sources/ root, like README.md, are the index, not a mirror).
function discoverMirrors() {
  const dirs = new Set();
  for (const file of trackedFiles(SOURCES)) {
    const rest = file.slice(SOURCES.length + 1);
    const slash = rest.indexOf("/");
    if (slash > 0) dirs.add(`${SOURCES}/${rest.slice(0, slash)}`);
  }
  return [...dirs].sort();
}

function mirrorDigest(dir) {
  const files = trackedFiles(dir).sort();
  const lines = files.map((f) => `${f}:${sha256(readFileSync(f))}`);
  return { files: files.length, digest: sha256(lines.join("\n")) };
}

const mirrors = {};
for (const dir of discoverMirrors()) mirrors[dir] = mirrorDigest(dir);

if (writeMode) {
  const payload = {
    policy: POLICY,
    note: "Read-only vendored mirror digests. Regenerate with: npm run check:sources-mirror -- --write",
    generated: new Date().toISOString(),
    mirrors,
  };
  writeFileSync(MANIFEST, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Wrote ${MANIFEST} (${Object.keys(mirrors).length} mirrors).`);
  process.exit(0);
}

if (!existsSync(MANIFEST)) {
  console.error(`sources-mirror check failed: missing ${MANIFEST}. Run: npm run check:sources-mirror -- --write`);
  process.exit(1);
}

const recorded = JSON.parse(readFileSync(MANIFEST, "utf8")).mirrors ?? {};
const failures = [];

for (const [dir, current] of Object.entries(mirrors)) {
  const prev = recorded[dir];
  if (!prev) {
    failures.push(`new mirror not recorded: ${dir} (run --write after confirming it is an intended mirror)`);
  } else if (prev.digest !== current.digest) {
    failures.push(
      `drift in ${dir}: files ${prev.files} -> ${current.files}, digest changed. ` +
        `sources/ is a read-only mirror — change upstream and refresh, then run --write.`,
    );
  }
}
for (const dir of Object.keys(recorded)) {
  if (!mirrors[dir]) failures.push(`recorded mirror missing on disk: ${dir}`);
}

if (failures.length > 0) {
  console.error("sources-mirror check failed (vendored mirror drift):");
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(
  `sources-mirror check passed (${Object.keys(mirrors).length} mirrors, all digests match ${MANIFEST}).`,
);
