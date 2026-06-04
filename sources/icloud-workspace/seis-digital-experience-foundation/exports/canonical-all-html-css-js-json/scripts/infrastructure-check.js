#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const INDEX_PATH = path.join(ROOT, "index.html");
const SCRIPT_PATH = path.join(ROOT, "script.js");
const CONTACT_PHP_PATH = path.join(ROOT, "contact.php");
const CONTACT_HTML_PATH = path.join(ROOT, "contact.html");
const SITE_CONFIG_PATH = path.join(ROOT, "site-config.json");
const QUALITY_GATE_PATH = path.join(ROOT, "scripts", "quality-gate.js");
const SECURITY_STATIC_CHECK_PATH = path.join(ROOT, "scripts", "security-static-check.js");
const SEMANTIC_SEO_CHECK_PATH = path.join(ROOT, "scripts", "semantic-seo-check.js");
const CORE_ORCHESTRATION_PATH = path.join(ROOT, "scripts", "run-core-orchestration.js");
const BROWSER_VALIDATION_FALLBACK_PATH = path.join(ROOT, "scripts", "browser-validation-fallback.js");
const AUTOMATION_CONTRACT_PATH = path.join(ROOT, "contracts", "automation-orchestration-contract.md");
const ECOSYSTEM_TEMPLATE_PATH = path.join(ROOT, "reports", "ecosystem", "template-run.json");
const KPI_BOARD_PATH = path.join(ROOT, "sprint-kpi-board.csv");
const INTEGRATION_TARGETS_PATH = path.join(ROOT, "config", "integration-targets.json");

const EXPECTED_BEHANCE_EAGER_COUNT = 9;

let failures = 0;

function fail(message) {
  failures += 1;
  console.error("FAIL:", message);
}

function pass(message) {
  console.log("OK:", message);
}

function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function assertRequiredFiles() {
  [INDEX_PATH, SCRIPT_PATH, CONTACT_PHP_PATH, CONTACT_HTML_PATH, SITE_CONFIG_PATH, QUALITY_GATE_PATH, SECURITY_STATIC_CHECK_PATH, SEMANTIC_SEO_CHECK_PATH, CORE_ORCHESTRATION_PATH, BROWSER_VALIDATION_FALLBACK_PATH, AUTOMATION_CONTRACT_PATH, ECOSYSTEM_TEMPLATE_PATH, KPI_BOARD_PATH, INTEGRATION_TARGETS_PATH].forEach((filePath) => {
    if (!fs.existsSync(filePath)) {
      fail("Missing required file: " + path.relative(ROOT, filePath));
    }
  });
  if (failures === 0) {
    pass("Required infrastructure files exist.");
  }
}

function assertSiteConfig() {
  let payload;
  try {
    payload = JSON.parse(readUtf8(SITE_CONFIG_PATH));
  } catch (err) {
    fail("site-config.json is not valid JSON.");
    return;
  }
  if (!payload || typeof payload !== "object") {
    fail("site-config.json must be an object.");
    return;
  }
  const endpoint = String(payload.contactEndpoint || "").trim();
  if (endpoint === "#" || endpoint === "#contact") {
    fail("site-config.json contactEndpoint cannot be # or #contact.");
  }
  const email = String(payload.contactEmail || "").trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fail("site-config.json contactEmail is not a valid email.");
  } else {
    pass("site-config.json contract is valid.");
  }
}

function assertFrontendContract(indexHtml, scriptJs) {
  if (/translations-data\.js/.test(indexHtml)) {
    fail("index.html still references translations-data.js. translations.json must be single source.");
  } else {
    pass("index.html does not include translations-data.js.");
  }
  if (!/fetch\("translations\.json"/.test(scriptJs)) {
    fail("script.js must load translations.json.");
  } else {
    pass("script.js loads translations.json.");
  }
  if (!/var\s+DEFAULT_LANG\s*=\s*"en";/.test(scriptJs)) {
    fail("DEFAULT_LANG must be en.");
  } else {
    pass("DEFAULT_LANG is en.");
  }
}

function assertBehanceLoadingContract(scriptJs, qualityGateJs) {
  const eagerMatch = scriptJs.match(/var\s+BEHANCE_EAGER_COUNT\s*=\s*(\d+)\s*;/);
  const eagerCount = eagerMatch ? Number(eagerMatch[1]) : NaN;
  if (!Number.isFinite(eagerCount)) {
    fail("BEHANCE_EAGER_COUNT is missing in script.js.");
    return;
  }
  if (eagerCount !== EXPECTED_BEHANCE_EAGER_COUNT) {
    fail(
      "BEHANCE_EAGER_COUNT mismatch. Expected " +
        EXPECTED_BEHANCE_EAGER_COUNT +
        ", got " +
        eagerCount +
        "."
    );
  } else {
    pass("BEHANCE_EAGER_COUNT matches expected value (" + EXPECTED_BEHANCE_EAGER_COUNT + ").");
  }
  if (!/index\s*<\s*9/.test(qualityGateJs)) {
    fail("quality-gate.js must assert first 9 Behance iframes as eager.");
  } else {
    pass("quality-gate.js eager/lazy assertion matches first 9 rule.");
  }
}

function assertBackendContract(contactPhp, scriptJs, contactHtml) {
  if (!/getenv\('CONTACT_TO'\)/.test(contactPhp)) {
    fail("contact.php must support CONTACT_TO environment override.");
  } else {
    pass("contact.php supports CONTACT_TO environment override.");
  }
  if (!/window\.location\.replace\('index\.html#contact'\)/.test(contactHtml)) {
    fail("contact.html redirect fallback missing.");
  } else {
    pass("contact.html redirect fallback exists.");
  }
  if (!/function\s+resolveSubmitEndpoint\(\)\s*{[\s\S]*"contact\.php"[\s\S]*}/.test(scriptJs)) {
    fail("script.js resolveSubmitEndpoint must fallback to contact.php.");
  } else {
    pass("script.js submit resolver includes contact.php fallback.");
  }
}

function assertSprintKpiBoard() {
  const raw = readUtf8(KPI_BOARD_PATH).trim();
  const lines = raw.split("\n").filter(Boolean);
  if (lines.length < 14) {
    fail("sprint-kpi-board.csv must contain header + 12 sprint rows + Rolling Quarter.");
    return;
  }
  const joined = lines.join("\n");
  const requiredSprints = Array.from({ length: 12 }, (_, i) => "Sprint " + String(i + 1));
  const missing = requiredSprints.filter((name) => !joined.includes(name + ","));
  if (missing.length) {
    fail("sprint-kpi-board.csv missing rows: " + missing.join(", "));
    return;
  }
  if (!joined.includes("Rolling Quarter,")) {
    fail("sprint-kpi-board.csv must include Rolling Quarter row.");
    return;
  }
  pass("sprint-kpi-board.csv contains 12 sprints + Rolling Quarter row.");
}

function assertIntegrationTargets() {
  let payload;
  try {
    payload = JSON.parse(readUtf8(INTEGRATION_TARGETS_PATH));
  } catch (err) {
    fail("config/integration-targets.json must be valid JSON.");
    return;
  }
  ["notion", "linear", "github", "slack"].forEach((key) => {
    if (!payload || typeof payload[key] !== "object") {
      fail("integration-targets.json missing connector object: " + key);
    }
  });
  if (failures === 0) {
    pass("integration-targets.json connector scaffold is valid.");
  }
}

function main() {
  assertRequiredFiles();
  if (failures > 0) {
    console.error("\nInfrastructure check failed early with", failures, "issue(s).");
    process.exit(1);
  }

  const indexHtml = readUtf8(INDEX_PATH);
  const scriptJs = readUtf8(SCRIPT_PATH);
  const contactPhp = readUtf8(CONTACT_PHP_PATH);
  const contactHtml = readUtf8(CONTACT_HTML_PATH);
  const qualityGateJs = readUtf8(QUALITY_GATE_PATH);

  assertSiteConfig();
  assertFrontendContract(indexHtml, scriptJs);
  assertBehanceLoadingContract(scriptJs, qualityGateJs);
  assertBackendContract(contactPhp, scriptJs, contactHtml);
  assertSprintKpiBoard();
  assertIntegrationTargets();

  if (failures > 0) {
    console.error("\nInfrastructure check failed with", failures, "issue(s).");
    process.exit(1);
  }
  console.log("\nInfrastructure check passed.");
}

main();
