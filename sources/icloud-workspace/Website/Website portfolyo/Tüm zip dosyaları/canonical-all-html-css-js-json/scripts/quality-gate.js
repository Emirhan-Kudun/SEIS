#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const INDEX_PATH = path.join(ROOT, "index.html");
const TRANSLATIONS_PATH = path.join(ROOT, "translations.json");
const SUPPORTED_LANGS = ["tr", "en", "fr", "it", "de"];

let errorCount = 0;

function fail(message) {
  errorCount += 1;
  console.error("FAIL:", message);
}

function pass(message) {
  console.log("OK:", message);
}

function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function collectI18nKeys(html) {
  const keys = new Set();
  const patterns = [
    /data-i18n="([^"]+)"/g,
    /data-i18n-placeholder="([^"]+)"/g,
    /data-i18n-aria-label="([^"]+)"/g,
    /data-i18n-alt="([^"]+)"/g
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html))) {
      if (match[1]) {
        keys.add(match[1]);
      }
    }
  }
  return [...keys];
}

function assertI18nCompleteness(html, translations) {
  const keys = collectI18nKeys(html);
  if (keys.length === 0) {
    fail("No i18n keys were detected in index.html.");
    return;
  }
  pass("Detected " + keys.length + " required i18n keys.");

  for (const lang of SUPPORTED_LANGS) {
    if (!translations[lang] || typeof translations[lang] !== "object") {
      fail("Missing language dictionary: " + lang);
      continue;
    }
    const missing = keys.filter((key) => !Object.prototype.hasOwnProperty.call(translations[lang], key));
    if (missing.length > 0) {
      fail("Language " + lang + " is missing keys: " + missing.join(", "));
    } else {
      pass("Language " + lang + " has all required keys.");
    }
  }
}

function assertDrawingsCounts(html) {
  const categories = [...html.matchAll(/class="drawing-card"[^>]*data-category="([^"]+)"/g)].map((match) => match[1]);
  const karakalemCount = categories.filter((category) => category === "karakalem").length;
  const kuruBoyaCount = categories.filter((category) => category === "kuru-boya").length;
  if (karakalemCount !== 9) {
    fail("Expected 9 karakalem cards, found " + karakalemCount + ".");
  } else {
    pass("Karakalem card count matches (9).");
  }
  if (kuruBoyaCount !== 10) {
    fail("Expected 10 kuru-boya cards, found " + kuruBoyaCount + ".");
  } else {
    pass("Kuru-boya card count matches (10).");
  }
}

function assertBehanceIntegrity(html) {
  const urls = [...html.matchAll(/<iframe[^>]+(?:src|data-src)="(https:\/\/www\.behance\.net\/embed\/project\/\d+\?ilo0=1)"/g)].map((match) => match[1]);
  const expectedCount = 37;
  if (urls.length !== expectedCount) {
    fail("Expected " + expectedCount + " Behance embeds, found " + urls.length + ".");
  } else {
    pass("Behance embed count matches (" + expectedCount + ").");
  }
  const uniqueCount = new Set(urls).size;
  if (uniqueCount !== urls.length) {
    fail("Duplicate Behance embed URLs detected.");
  } else {
    pass("No duplicate Behance embed URLs.");
  }
}

function assertBehanceLoadingStrategy(html) {
  const iframes = [...html.matchAll(/<iframe[^>]+>/g)].map((match) => match[0]);
  const behanceIframes = iframes.filter((tag) => /behance\.net\/embed\/project/.test(tag));
  if (!behanceIframes.length) {
    fail("No Behance iframes found for loading strategy check.");
    return;
  }
  behanceIframes.forEach((tag, index) => {
    if (index < 9) {
      if (!/src="https:\/\/www\.behance\.net\/embed\/project\/\d+\?ilo0=1"/.test(tag) || !/loading="eager"/.test(tag)) {
        fail("Behance iframe " + (index + 1) + " must use src + loading=\"eager\".");
      }
      return;
    }
    if (!/data-src="https:\/\/www\.behance\.net\/embed\/project\/\d+\?ilo0=1"/.test(tag) || !/loading="lazy"/.test(tag)) {
      fail("Behance iframe " + (index + 1) + " must use data-src + loading=\"lazy\".");
    }
  });
  pass("Behance loading strategy matches (first 9 eager, rest lazy).");
}

function assertContactContract(html) {
  if (!/id="contact-form"/.test(html)) {
    fail("Contact form is missing.");
    return;
  }
  if (!/id="contact-form"[^>]*action="#contact"/.test(html)) {
    fail("Contact form action must be #contact in static mode.");
    return;
  }
  if (!/id="contact-form"[^>]*data-endpoint="[^"]*"/.test(html)) {
    fail("Contact form must include a data-endpoint attribute.");
  } else {
    pass("Contact form static contract is valid (#contact + data-endpoint).");
  }
}

function main() {
  const html = readUtf8(INDEX_PATH);
  const translations = JSON.parse(readUtf8(TRANSLATIONS_PATH));

  assertI18nCompleteness(html, translations);
  assertDrawingsCounts(html);
  assertBehanceIntegrity(html);
  assertBehanceLoadingStrategy(html);
  assertContactContract(html);

  if (errorCount > 0) {
    console.error("\nQuality gate failed with", errorCount, "issue(s).");
    process.exit(1);
  }

  console.log("\nNo i18n contract violations or critical content mismatches found.");
}

main();
