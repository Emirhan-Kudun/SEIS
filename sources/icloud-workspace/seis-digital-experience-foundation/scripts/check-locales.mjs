import { readFileSync } from "node:fs";
import { supportedLocales, translations } from "../apps/web/src/i18n/locales.js";

const failures = [];
const defaultLocale = "tr";
const defaultKeys = Object.keys(translations[defaultLocale] || {}).sort();
const indexHtml = readFileSync("apps/web/index.html", "utf8");
const localesSource = readFileSync("apps/web/src/i18n/locales.js", "utf8");
const usedKeys = Array.from(indexHtml.matchAll(/data-i18n="([^"]+)"/g)).map(match => match[1]).sort();

for (const locale of supportedLocales) {
  const dictionary = translations[locale];
  if (!dictionary) {
    failures.push(`missing dictionary: ${locale}`);
    continue;
  }

  const keys = Object.keys(dictionary).sort();
  const missing = defaultKeys.filter(key => !keys.includes(key));
  const empty = keys.filter(key => String(dictionary[key] || "").trim().length === 0);

  if (missing.length > 0) {
    failures.push(`${locale} missing keys: ${missing.join(", ")}`);
  }
  if (empty.length > 0) {
    failures.push(`${locale} empty keys: ${empty.join(", ")}`);
  }
}

for (const [locale, duplicateKeys] of findDuplicateKeysByLocale(localesSource)) {
  failures.push(`${locale} duplicate keys in locales source: ${duplicateKeys.join(", ")}`);
}

const missingFromDefault = usedKeys.filter(key => !defaultKeys.includes(key));
if (missingFromDefault.length > 0) {
  failures.push(`index references missing i18n keys: ${missingFromDefault.join(", ")}`);
}

if (!supportedLocales.includes("ar")) {
  failures.push("rtl readiness requires ar locale");
}

if (failures.length > 0) {
  console.error("SEIS locale check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`SEIS locale check passed for ${supportedLocales.length} locales and ${defaultKeys.length} keys.`);

function findDuplicateKeysByLocale(source) {
  const localeHeader = /^\s{2}([a-z]{2}):\s*\{$/gm;
  const localeBlocks = [];

  for (const match of source.matchAll(localeHeader)) {
    localeBlocks.push({ locale: match[1], index: match.index });
  }

  return localeBlocks
    .map((entry, index) => {
      const blockEnd = index + 1 < localeBlocks.length
        ? localeBlocks[index + 1].index
        : source.indexOf("\n};", entry.index);
      const block = source.slice(entry.index, blockEnd);
      const keyCounts = new Map();

      for (const match of block.matchAll(/"([^"]+)":/g)) {
        const key = match[1];
        keyCounts.set(key, (keyCounts.get(key) || 0) + 1);
      }

      return [
        entry.locale,
        [...keyCounts.entries()]
          .filter(([, count]) => count > 1)
          .map(([key]) => key)
          .sort()
      ];
    })
    .filter(([, duplicateKeys]) => duplicateKeys.length > 0);
}
