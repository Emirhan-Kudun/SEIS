#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const INDEX_PATH = path.join(ROOT, "index.html");

let failures = 0;

function pass(msg) {
  console.log("OK:", msg);
}

function fail(msg) {
  failures += 1;
  console.error("FAIL:", msg);
}

function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function getMatches(regex, text) {
  return text.match(regex) || [];
}

function hasMeta(html, matcher) {
  return matcher.test(html);
}

function main() {
  const html = readUtf8(INDEX_PATH);

  if (!/<html[^>]*\slang=/.test(html)) {
    fail("html lang attribute missing.");
  } else {
    pass("html lang attribute present.");
  }

  if (!/<main\b[^>]*>/.test(html)) {
    fail("main landmark missing.");
  } else {
    pass("main landmark present.");
  }

  const h1Count = getMatches(/<h1\b/gi, html).length;
  if (h1Count !== 1) {
    fail("Exactly one h1 is required, found " + h1Count + ".");
  } else {
    pass("Single h1 heading structure is valid.");
  }

  if (!hasMeta(html, /<meta\s+name="description"\s+content="[^"]+"/i)) {
    fail("Meta description missing or empty.");
  } else {
    pass("Meta description present.");
  }

  if (!hasMeta(html, /<link\s+rel="canonical"\s+href="[^"]+"/i)) {
    fail("Canonical link missing.");
  } else {
    pass("Canonical link present.");
  }

  const socialTags = [
    { key: "og:title", regex: /<meta\s+property="og:title"\s+content="[^"]+"/i },
    { key: "og:description", regex: /<meta\s+property="og:description"\s+content="[^"]+"/i },
    { key: "twitter:title", regex: /<meta\s+name="twitter:title"\s+content="[^"]+"/i },
    { key: "twitter:description", regex: /<meta\s+name="twitter:description"\s+content="[^"]+"/i }
  ];
  socialTags.forEach((item) => {
    if (!item.regex.test(html)) {
      fail(item.key + " tag missing or empty.");
    } else {
      pass(item.key + " tag present.");
    }
  });

  const sectionIds = Array.from(html.matchAll(/<section\s+id="([^"]+)"/gi)).map((m) => m[1]);
  const sectionSet = new Set(sectionIds);
  if (sectionIds.length !== sectionSet.size) {
    fail("Duplicate section ids detected.");
  } else {
    pass("Section ids are unique.");
  }

  const navAnchors = Array.from(html.matchAll(/<a\s+href="#([^"]+)"/gi)).map((m) => m[1]);
  const missingAnchors = navAnchors.filter((id) => id !== "" && !sectionSet.has(id) && id !== "main");
  if (missingAnchors.length > 0) {
    fail("Nav anchors reference missing section ids: " + Array.from(new Set(missingAnchors)).join(", "));
  } else {
    pass("Hash anchors map to existing sections.");
  }

  if (failures > 0) {
    console.error("\nSemantic/SEO check failed with", failures, "issue(s).");
    process.exit(1);
  }
  console.log("\nSemantic/SEO check passed.");
}

main();
