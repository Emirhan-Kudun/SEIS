#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function parseArgs(argv) {
  const outIndex = argv.indexOf("--out");
  const outPath = outIndex > -1 ? argv[outIndex + 1] : "";
  return { outPath };
}

function runJsonCheck() {
  const raw = execSync("node scripts/branch-governance-check.js --json", {
    encoding: "utf8"
  });
  return JSON.parse(raw);
}

function runQualityGate() {
  const raw = execSync("node scripts/local-quality-gate.js --json", {
    encoding: "utf8"
  });
  return JSON.parse(raw);
}

function buildReport(data, quality) {
  const files = data.changed_files.length ? data.changed_files.join(", ") : "Degisiklik yok";
  const critical = data.critical_files.length ? data.critical_files.join(", ") : "Yok";
  const dependencyNeed = data.categories.includes("dependency") ? "Var" : "Yok";
  const split = data.mix_warnings.length > 0 || data.changed_files.length > 8 ? "Evet" : "Hayir";
  const c1 = data.commit_suggestions[0] || "chore: controlled maintenance update";
  const c2 = data.commit_suggestions[1] || "docs: add merge validation notes";

  return [
    "BRANCH PLANI",
    `- Onerilen branch: ${data.recommended_branch}`,
    `- Amac: ${data.purpose}`,
    `- Risk seviyesi: ${data.risk_level}`,
    `- Etkilenecek dosyalar: ${files}`,
    `- Kritik dosya degisikligi: ${critical}`,
    `- Dependency ihtiyaci: ${dependencyNeed}`,
    `- Is parcalara bolunecek mi?: ${split}`,
    "",
    "UYGULAMA PLANI",
    "1. Main disinda tek amacli branch'te kal.",
    "2. Degisiklikleri kucuk/geri alinabilir commitlere bol.",
    "3. Merge oncesi responsive/perf/seo/tasarim dili/main guvenligi kontrolu yap.",
    "",
    "COMMIT ONERILERI",
    `- ${c1}`,
    `- ${c2}`,
    "",
    "MERGE ONCESI KONTROL",
    `- Responsive: ${data.checklist.responsive}`,
    `- Performans: ${data.checklist.performance}`,
    `- SEO: ${data.checklist.seo}`,
    `- Tasarim dili: ${data.checklist.design_language}`,
    `- Main guvenligi: ${data.checklist.main_safety}`,
    "",
    "QUALITY GATE",
    `- Status: ${quality.status}`,
    `- Score: ${quality.score}/${quality.minimum_score}`,
    `- Fail sayisi: ${quality.checks.filter((check) => check.status === "fail").length}`,
    `- Warn sayisi: ${quality.checks.filter((check) => check.status === "warn").length}`
  ].join("\n");
}

function main() {
  const { outPath } = parseArgs(process.argv.slice(2));
  const data = runJsonCheck();
  const quality = runQualityGate();
  const report = buildReport(data, quality);

  if (outPath) {
    const abs = path.resolve(process.cwd(), outPath);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, `${report}\n`, "utf8");
    process.stdout.write(`Report written: ${abs}\n`);
    return;
  }

  process.stdout.write(`${report}\n`);
}

main();
