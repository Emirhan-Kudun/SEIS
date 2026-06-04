#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const TARGETS = [
  path.join(ROOT, "index.html"),
  path.join(ROOT, "script.js"),
  path.join(ROOT, "contact.php"),
  path.join(ROOT, "htaccess.txt")
];

const HIGH_PATTERNS = [
  { name: "eval", regex: /\beval\s*\(/g },
  { name: "new-function", regex: /new\s+Function\s*\(/g },
  { name: "document-write", regex: /document\.write\s*\(/g }
];

const MEDIUM_PATTERNS = [
  { name: "insert-adjacent-html", regex: /insertAdjacentHTML\s*\(/g },
  { name: "innerhtml-assign", regex: /\.innerHTML\s*=/g }
];

function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function countMatches(text, regex) {
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

function run() {
  const report = {
    generated_at: new Date().toISOString(),
    scope: TARGETS.map((p) => path.relative(ROOT, p)),
    findings: {
      high: [],
      medium: [],
      low: []
    }
  };

  for (const target of TARGETS) {
    if (!fs.existsSync(target)) {
      report.findings.high.push({
        file: path.relative(ROOT, target),
        issue: "missing-file"
      });
      continue;
    }

    const content = readUtf8(target);
    for (const pattern of HIGH_PATTERNS) {
      const count = countMatches(content, pattern.regex);
      if (count > 0) {
        report.findings.high.push({
          file: path.relative(ROOT, target),
          issue: pattern.name,
          count: count
        });
      }
    }
    for (const pattern of MEDIUM_PATTERNS) {
      const count = countMatches(content, pattern.regex);
      if (count > 0) {
        report.findings.medium.push({
          file: path.relative(ROOT, target),
          issue: pattern.name,
          count: count
        });
      }
    }
  }

  // Safe target=_blank check (only warn if rel noopener noreferrer missing)
  const indexPath = path.join(ROOT, "index.html");
  if (fs.existsSync(indexPath)) {
    const indexHtml = readUtf8(indexPath);
    const blankAnchors = indexHtml.match(/<a[^>]*target="_blank"[^>]*>/g) || [];
    const unsafe = blankAnchors.filter((tag) => !/rel="[^"]*noopener[^"]*noreferrer[^"]*"/.test(tag));
    if (unsafe.length > 0) {
      report.findings.medium.push({
        file: "index.html",
        issue: "target-blank-without-rel",
        count: unsafe.length
      });
    } else {
      report.findings.low.push({
        file: "index.html",
        issue: "target-blank-safe",
        count: blankAnchors.length
      });
    }
  }

  // Header hygiene check from contact.php/htaccess
  const headerSources = [path.join(ROOT, "contact.php"), path.join(ROOT, "htaccess.txt")];
  let hasNosniff = false;
  let hasCsp = false;
  let hasReferrerPolicy = false;
  for (const filePath of headerSources) {
    if (!fs.existsSync(filePath)) {
      continue;
    }
    const text = readUtf8(filePath);
    hasNosniff = hasNosniff || /X-Content-Type-Options/i.test(text);
    hasCsp = hasCsp || /Content-Security-Policy/i.test(text);
    hasReferrerPolicy = hasReferrerPolicy || /Referrer-Policy/i.test(text);
  }
  if (!hasNosniff) {
    report.findings.medium.push({ file: "contact.php|htaccess.txt", issue: "missing-nosniff" });
  }
  if (!hasCsp) {
    report.findings.medium.push({ file: "contact.php|htaccess.txt", issue: "missing-csp" });
  }
  if (!hasReferrerPolicy) {
    report.findings.medium.push({ file: "contact.php|htaccess.txt", issue: "missing-referrer-policy" });
  }

  process.stdout.write(JSON.stringify(report, null, 2) + "\n");

  if (report.findings.high.length > 0) {
    process.exit(1);
  }
}

run();
