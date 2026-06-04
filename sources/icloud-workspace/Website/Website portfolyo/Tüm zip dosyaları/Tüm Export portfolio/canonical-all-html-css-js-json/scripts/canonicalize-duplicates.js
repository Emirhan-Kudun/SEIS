#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const cp = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const REPORT_PATH = path.join(ROOT, "reports", "ecosystem", "duplicate-conflict-report.json");

function walk(dir, out) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules") continue;
      walk(abs, out);
      continue;
    }
    out.push(abs);
  }
}

function sha1(filePath) {
  const res = cp.spawnSync("shasum", [filePath], { encoding: "utf8" });
  if (res.status !== 0) return "";
  return String(res.stdout || "").trim().split(/\s+/)[0] || "";
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function main() {
  const files = [];
  walk(ROOT, files);

  const candidates = files.filter((file) => / 2\.(html|css|js|json)$/.test(file));
  const removed = [];
  const conflicts = [];
  const missingCanonical = [];

  for (const dup of candidates) {
    const canonical = dup.replace(/ 2\.(html|css|js|json)$/, ".$1");
    const relDup = path.relative(ROOT, dup);
    const relCanonical = path.relative(ROOT, canonical);

    if (!fs.existsSync(canonical)) {
      missingCanonical.push({ duplicate: relDup, canonical: relCanonical, action: "manual_review" });
      continue;
    }

    const a = fs.readFileSync(dup);
    const b = fs.readFileSync(canonical);
    const same = a.length === b.length && a.equals(b);

    if (same) {
      fs.unlinkSync(dup);
      removed.push({ duplicate: relDup, canonical: relCanonical, reason: "same_content_removed" });
    } else {
      conflicts.push({
        duplicate: relDup,
        canonical: relCanonical,
        duplicate_sha1: sha1(dup),
        canonical_sha1: sha1(canonical),
        action: "canonical_kept_manual_merge_required"
      });
    }
  }

  const report = {
    run_id: "run-" + new Date().toISOString().replace(/[:.]/g, "-") + "-duplicate-canonicalization",
    timestamp: new Date().toISOString(),
    timezone: "Europe/Istanbul",
    mode: "duplicate-canonicalization",
    summary: {
      scanned_candidates: candidates.length,
      removed_duplicates: removed.length,
      conflicts: conflicts.length,
      missing_canonical: missingCanonical.length
    },
    removed,
    conflicts,
    missing_canonical: missingCanonical,
    suggested_actions: conflicts.map((item) => ({
      status: "suggested",
      title: "Resolve duplicate conflict for " + item.canonical,
      problem: "Canonical and duplicate contents differ.",
      proposed_change: "Manually merge duplicate content into canonical source and remove duplicate file.",
      labels: ["ops", "canonicalization"],
      source_link: "reports/ecosystem/duplicate-conflict-report.json"
    }))
  };

  ensureDir(REPORT_PATH);
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + "\n", "utf8");
  process.stdout.write("Duplicate canonicalization report: " + REPORT_PATH + "\n");

  if (conflicts.length > 0 || missingCanonical.length > 0) {
    process.exit(1);
  }
}

main();
