#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const INDEX_PATH = path.join(ROOT, "index.html");
const SCRIPT_PATH = path.join(ROOT, "script.js");
const CONTACT_PATH = path.join(ROOT, "contact.html");
const SITE_CONFIG_PATH = path.join(ROOT, "site-config.json");

const EXPECTED_BEHANCE_IDS = [
  "245560201", "205108621", "178412361", "181320969", "178216053", "178126385",
  "178124789", "177929985", "177929453", "177929021", "177846565", "177639103",
  "177636517", "175803925", "173235081", "170228809", "162309345", "162306979",
  "156155557", "154324861", "154252891", "153415565", "153428237", "153357569",
  "153045431", "152808473", "152806257", "152551909", "151925471", "151788235",
  "151096891", "151089007", "151088757", "151085695", "151085469", "151023563",
  "150083227"
];

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

function assertBehanceOrder(html) {
  const ids = [...html.matchAll(/(?:src|data-src)="https:\/\/www\.behance\.net\/embed\/project\/(\d+)\?ilo0=1"/g)].map((match) => match[1]);
  if (ids.length !== EXPECTED_BEHANCE_IDS.length) {
    fail("Behance project count mismatch. Expected " + EXPECTED_BEHANCE_IDS.length + ", got " + ids.length + ".");
    return;
  }
  for (let i = 0; i < EXPECTED_BEHANCE_IDS.length; i += 1) {
    if (ids[i] !== EXPECTED_BEHANCE_IDS[i]) {
      fail("Behance order mismatch at index " + i + ": expected " + EXPECTED_BEHANCE_IDS[i] + ", got " + ids[i] + ".");
      return;
    }
  }
  pass("Behance order baseline preserved.");
}

function assertHashAlias(script) {
  if (!/if\s*\(hash\s*===\s*"#tech-stack"\)\s*{\s*return\s*"#drawings";\s*}/.test(script)) {
    fail("Missing #tech-stack -> #drawings hash alias.");
  } else {
    pass("Hash alias check passed.");
  }
}

function assertSubmitFallback(script) {
  const resolverExists = /function\s+resolveSubmitEndpoint\(\)\s*{[\s\S]*window\.__CONTACT_ENDPOINT__[\s\S]*form\.getAttribute\("data-endpoint"\)[\s\S]*"contact\.php"[\s\S]*}/.test(script);
  const guardExists = /if\s*\(!submitEndpoint\)\s*{[\s\S]*fm\.server\.noendpoint/.test(script);
  if (!resolverExists || !guardExists) {
    fail("Static contact endpoint resolution/guard contract is missing.");
  } else {
    pass("Static contact endpoint resolution/guard contract is present.");
  }
}

function assertSiteConfigExists() {
  if (!fs.existsSync(SITE_CONFIG_PATH)) {
    fail("site-config.json is missing.");
    return;
  }
  try {
    const data = JSON.parse(readUtf8(SITE_CONFIG_PATH));
    if (typeof data !== "object" || data === null) {
      fail("site-config.json must be a JSON object.");
      return;
    }
    pass("site-config.json exists and is valid JSON.");
  } catch (error) {
    fail("site-config.json is not valid JSON.");
  }
}

function assertContactRedirect(contactHtml) {
  if (!/window\.location\.replace\('index\.html#contact'\)/.test(contactHtml)) {
    fail("contact.html redirect fallback to index.html#contact is missing.");
  } else {
    pass("contact.html redirect fallback is present.");
  }
}

function main() {
  const html = readUtf8(INDEX_PATH);
  const script = readUtf8(SCRIPT_PATH);
  const contactHtml = readUtf8(CONTACT_PATH);

  assertBehanceOrder(html);
  assertHashAlias(script);
  assertSubmitFallback(script);
  assertContactRedirect(contactHtml);
  assertSiteConfigExists();

  if (failures > 0) {
    console.error("\nRegression smoke failed with", failures, "issue(s).");
    process.exit(1);
  }
  console.log("\nRegression smoke passed.");
}

main();
