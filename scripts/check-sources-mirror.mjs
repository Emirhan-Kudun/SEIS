#!/usr/bin/env node
// Guards the read-only vendored mirror policy for `sources/` (see
// docs/decisions/sources-vendored-mirror-policy.md).
//
// Offline (default / CI) it does two things:
//   1. records a content digest per mirror and fails when a mirror's tree drifts
//      from content/governance/sources-mirror.json (accidental local edits), and
//   2. asserts each mirror's recorded upstream import commit matches the
//      provenance table in sources/README.md (manifest <-> README stay in sync).
//
// Optional `--remote` (needs network + GITHUB_TOKEN) compares each mirror's
// imported commit against the live upstream HEAD and reports upstream drift
// (commits landed upstream since the import). It never edits anything and is not
// wired into CI.
//
// Usage:
//   node scripts/check-sources-mirror.mjs            # offline verify (CI mode)
//   node scripts/check-sources-mirror.mjs --write     # regenerate the manifest
//   node scripts/check-sources-mirror.mjs --remote    # also check live upstream

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const ROOT = process.cwd();
const SOURCES = "sources";
const MANIFEST = "content/governance/sources-mirror.json";
const README = "sources/README.md";
const POLICY = "docs/decisions/sources-vendored-mirror-policy.md";
const writeMode = process.argv.includes("--write");
const remoteMode = process.argv.includes("--remote");

// Upstream default branches (sources/README.md documents the portfolio default as
// a codex branch; the rest track main).
const BRANCH = {
  "emirhankudun-ux/emirhan-kudun-portfolio": "codex/seis-ux-cinematic-premium-foundation",
};
const defaultBranch = (repo) => BRANCH[repo] ?? "main";

function trackedFiles(prefix) {
  const out = execFileSync("git", ["ls-files", "-z", "--", prefix], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return out.split("\0").filter(Boolean);
}

const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");

// Parse the provenance table in sources/README.md -> { "sources/<dir>": {repo, importedCommit, importedDate} }
function parseProvenance() {
  const text = readFileSync(README, "utf8");
  const row = /\|\s*`sources\/([^/`]+)\/?`\s*\|\s*`([^`]+)`\s*\|\s*`([0-9a-f]{7,40})`\s*\|\s*([0-9-]+)\s*\|/g;
  const map = {};
  let m;
  while ((m = row.exec(text)) !== null) {
    map[`${SOURCES}/${m[1]}`] = { repo: m[2], importedCommit: m[3], importedDate: m[4] };
  }
  return map;
}

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

const provenance = parseProvenance();
const mirrors = {};
for (const dir of discoverMirrors()) {
  const { files, digest } = mirrorDigest(dir);
  const prov = provenance[dir];
  mirrors[dir] = {
    files,
    digest,
    upstream: prov
      ? { repo: prov.repo, branch: defaultBranch(prov.repo), importedCommit: prov.importedCommit, importedDate: prov.importedDate }
      : null,
  };
}

if (writeMode) {
  const payload = {
    policy: POLICY,
    note: "Read-only vendored mirror digests + import provenance (from sources/README.md). Regenerate with: npm run check:sources-mirror -- --write",
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
    continue;
  }
  if (prev.digest !== current.digest) {
    failures.push(
      `drift in ${dir}: files ${prev.files} -> ${current.files}, digest changed. ` +
        `sources/ is a read-only mirror — change upstream and refresh, then run --write.`,
    );
  }
  // manifest <-> README provenance consistency
  const recCommit = prev.upstream?.importedCommit ?? null;
  const provCommit = current.upstream?.importedCommit ?? null;
  if (recCommit !== provCommit) {
    failures.push(
      `provenance mismatch for ${dir}: manifest=${recCommit ?? "none"}, sources/README.md=${provCommit ?? "none"}. ` +
        `Keep them in sync — run --write after editing the README provenance table.`,
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
  `sources-mirror check passed (${Object.keys(mirrors).length} mirrors; digests match, provenance in sync with ${README}).`,
);

if (remoteMode) {
  await checkRemote(mirrors);
}

async function checkRemote(mirrorsToCheck) {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) {
    console.warn("\n--remote: skipped (no GITHUB_TOKEN/GH_TOKEN in env).");
    return;
  }
  console.log("\nUpstream drift (imported vs live HEAD):");
  for (const [dir, info] of Object.entries(mirrorsToCheck)) {
    const u = info.upstream;
    if (!u) {
      console.log(`  - ${dir}: no provenance recorded`);
      continue;
    }
    try {
      const res = await fetch(`https://api.github.com/repos/${u.repo}/commits/${encodeURIComponent(u.branch)}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "seis-sources-mirror" },
      });
      if (!res.ok) {
        console.log(`  - ${dir}: upstream query failed (${res.status} for ${u.repo}@${u.branch})`);
        continue;
      }
      const live = (await res.json()).sha;
      const inSync = live === u.importedCommit;
      console.log(
        `  - ${dir}: ${inSync ? "in sync" : "STALE"} (imported ${u.importedCommit.slice(0, 8)}, live ${String(live).slice(0, 8)} on ${u.repo}@${u.branch})`,
      );
    } catch (err) {
      console.log(`  - ${dir}: upstream query error (${err.message})`);
    }
  }
}
