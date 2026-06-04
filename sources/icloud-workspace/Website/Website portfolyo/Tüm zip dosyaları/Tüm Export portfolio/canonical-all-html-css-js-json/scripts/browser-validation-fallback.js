#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const INDEX_PATH = path.join(ROOT, "index.html");
const SCRIPT_PATH = path.join(ROOT, "script.js");
const EXPECTED_EAGER_COUNT = 9;

let failures = 0;
const checks = [];

function addCheck(ok, name, details) {
  checks.push({
    name: name,
    status: ok ? "pass" : "fail",
    details: details
  });
  if (!ok) {
    failures += 1;
  }
}

function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function getBehanceIframes(indexHtml) {
  const iframeTags = indexHtml.match(/<iframe\b[^>]*>/gi) || [];
  return iframeTags.filter((tag) => /behance\.net\/embed\/project/i.test(tag));
}

function main() {
  const started = Date.now();
  const indexHtml = readUtf8(INDEX_PATH);
  const scriptJs = readUtf8(SCRIPT_PATH);
  const behanceIframes = getBehanceIframes(indexHtml);

  addCheck(/<section id="work">/.test(indexHtml), "work-section", "Work section must exist.");
  addCheck(/id="behance-grid"/.test(indexHtml), "behance-grid", "Behance grid root must exist.");
  addCheck(/id="behance-load-all"/.test(indexHtml), "load-all-button", "Load-all button must exist.");
  addCheck(/class="behance-note/.test(indexHtml), "behance-note", "Behance hint note should exist.");

  addCheck(
    behanceIframes.length === 37,
    "behance-count",
    "Expected 37 Behance embeds, got " + behanceIframes.length + "."
  );

  const firstEager = behanceIframes.slice(0, EXPECTED_EAGER_COUNT).every((tag) => {
    return /\ssrc=/.test(tag) && /loading="eager"/.test(tag);
  });
  addCheck(
    firstEager,
    "behance-eager-first-nine",
    "First " + EXPECTED_EAGER_COUNT + " embeds must use src + loading=eager."
  );

  const restLazy = behanceIframes.slice(EXPECTED_EAGER_COUNT).every((tag) => {
    return /data-src=/.test(tag) && /loading="lazy"/.test(tag);
  });
  addCheck(
    restLazy,
    "behance-lazy-rest",
    "Embeds after first " + EXPECTED_EAGER_COUNT + " must use data-src + loading=lazy."
  );

  addCheck(
    /function\s+loadPendingIframes\(/.test(scriptJs),
    "load-pending-helper",
    "JS should include loadPendingIframes helper."
  );
  addCheck(
    /sectionWarmup/.test(scriptJs),
    "section-warmup",
    "JS should include section warmup observer for #work."
  );
  addCheck(
    /wk\.embed\.slow/.test(scriptJs),
    "slow-state-copy",
    "JS should include delayed loading state for user clarity."
  );

  const result = {
    check: "browser-validation-fallback",
    duration_ms: Date.now() - started,
    ok: failures === 0,
    checks: checks
  };

  process.stdout.write(JSON.stringify(result, null, 2) + "\n");
  if (failures > 0) {
    process.exit(1);
  }
}

main();
