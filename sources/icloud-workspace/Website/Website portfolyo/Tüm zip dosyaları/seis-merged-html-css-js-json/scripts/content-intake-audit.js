#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function repoRoot() {
  try {
    return execSync("git rev-parse --show-toplevel", { encoding: "utf8" }).trim();
  } catch {
    return process.cwd();
  }
}

function loadPolicy(root) {
  return JSON.parse(fs.readFileSync(path.join(root, "config", "quality-gate-policy.json"), "utf8"));
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(abs));
    else out.push(abs);
  }
  return out;
}

function candidateFiles(root, policy) {
  const content = policy.content_policy || {};
  const exts = new Set(content.scan_extensions || [".html", ".json", ".js"]);
  const files = [];

  for (const rel of content.intake_scan_paths || []) {
    const abs = path.join(root, rel);
    if (!fs.existsSync(abs)) continue;
    if (fs.statSync(abs).isDirectory()) {
      files.push(...walk(abs).filter((file) => exts.has(path.extname(file).toLowerCase())));
    } else if (exts.has(path.extname(abs).toLowerCase())) {
      files.push(abs);
    }
  }

  return files;
}

function extractBehanceEmbeds(text) {
  const embeds = [];
  const re = /https:\/\/www\.behance\.net\/embed\/project\/([0-9]+)/g;
  let match;
  while ((match = re.exec(text))) {
    embeds.push(match[1]);
  }
  return embeds;
}

function auditFile(root, file, policy) {
  const rel = path.relative(root, file);
  const text = fs.readFileSync(file, "utf8");
  const lowerLines = text.split(/\r?\n/).map((line) => line.toLowerCase());
  const content = policy.content_policy || {};
  const blockedTerms = content.blocked_terms || [];
  const allowedContextTerms = content.allowed_context_terms || [];
  const findings = [];

  lowerLines.forEach((line, index) => {
    for (const term of blockedTerms) {
      if (!line.includes(term.toLowerCase())) continue;
      const allowed = allowedContextTerms.some((allowedTerm) => line.includes(allowedTerm.toLowerCase()));
      findings.push({
        line: index + 1,
        term,
        status: allowed ? "review" : "blocked"
      });
    }
  });

  return {
    file: rel,
    behance_embeds: extractBehanceEmbeds(text),
    findings
  };
}

function main() {
  const root = repoRoot();
  const policy = loadPolicy(root);
  const reports = candidateFiles(root, policy).map((file) => auditFile(root, file, policy));
  const embedIds = reports.flatMap((report) => report.behance_embeds);
  const duplicateEmbeds = embedIds.filter((id, index) => embedIds.indexOf(id) !== index);
  const blocked = reports.flatMap((report) =>
    report.findings.filter((finding) => finding.status === "blocked").map((finding) => ({ ...finding, file: report.file }))
  );
  const review = reports.flatMap((report) =>
    report.findings.filter((finding) => finding.status === "review").map((finding) => ({ ...finding, file: report.file }))
  );

  process.stdout.write("Content Intake Audit\n");
  process.stdout.write(`- Files scanned: ${reports.length}\n`);
  process.stdout.write(`- Behance embeds: ${embedIds.length}\n`);
  process.stdout.write(`- Duplicate embed IDs: ${new Set(duplicateEmbeds).size}\n`);
  process.stdout.write(`- Blocked findings: ${blocked.length}\n`);
  process.stdout.write(`- Review findings: ${review.length}\n`);

  if (blocked.length) {
    process.stdout.write("- Blocked details:\n");
    for (const item of blocked.slice(0, 25)) {
      process.stdout.write(`  - ${item.file}:${item.line} term=${item.term}\n`);
    }
  }

  if (review.length) {
    process.stdout.write("- Review details:\n");
    for (const item of review.slice(0, 25)) {
      process.stdout.write(`  - ${item.file}:${item.line} term=${item.term}\n`);
    }
  }
}

main();
