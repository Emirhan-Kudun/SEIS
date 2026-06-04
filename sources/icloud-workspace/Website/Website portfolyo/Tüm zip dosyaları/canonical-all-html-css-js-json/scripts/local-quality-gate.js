#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function parseArgs(argv) {
  const args = new Set(argv.slice(2));
  return {
    json: args.has("--json"),
    strict: args.has("--strict"),
    includeIntake: args.has("--include-intake")
  };
}

function repoRoot() {
  try {
    return execSync("git rev-parse --show-toplevel", { encoding: "utf8" }).trim();
  } catch {
    return process.cwd();
  }
}

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function addCheck(checks, id, status, message, impact = 0) {
  checks.push({ id, status, message, impact });
}

function hasMeta(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const metaName = new RegExp(`<meta\\s+[^>]*(name|property)=["']${escaped}["'][^>]*>`, "i");
  return metaName.test(html);
}

function collectAttrValues(html, attrName) {
  const values = [];
  const re = new RegExp(`\\b${attrName}=["']([^"']+)["']`, "gi");
  let match;
  while ((match = re.exec(html))) values.push(match[1]);
  return values;
}

function isExternalRef(value) {
  return (
    value.startsWith("#") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("//") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("data:") ||
    value.startsWith("javascript:")
  );
}

function cleanLocalRef(value) {
  return value.split("#")[0].split("?")[0];
}

function getHtmlFiles(root, policy, includeIntake) {
  const files = new Set(policy.entry_html || []);
  if (includeIntake) {
    for (const item of policy.content_policy.intake_scan_paths || []) {
      const abs = path.join(root, item);
      if (!fs.existsSync(abs)) continue;
      if (fs.statSync(abs).isDirectory()) {
        for (const file of walk(abs)) {
          if (path.extname(file).toLowerCase() === ".html") {
            files.add(path.relative(root, file));
          }
        }
      } else if (path.extname(abs).toLowerCase() === ".html") {
        files.add(item);
      }
    }
  }
  return Array.from(files);
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

function scanContentPolicy(root, policy, includeIntake) {
  const contentPolicy = policy.content_policy || {};
  const paths = includeIntake
    ? [...(contentPolicy.production_scan_paths || []), ...(contentPolicy.intake_scan_paths || [])]
    : contentPolicy.production_scan_paths || [];
  const extensions = new Set(contentPolicy.scan_extensions || [".html", ".json", ".js"]);
  const blockedTerms = contentPolicy.blocked_terms || [];
  const allowedContextTerms = contentPolicy.allowed_context_terms || [];
  const findings = [];

  function candidateFiles(item) {
    const abs = path.join(root, item);
    if (!fs.existsSync(abs)) return [];
    if (fs.statSync(abs).isDirectory()) {
      return walk(abs).filter((file) => extensions.has(path.extname(file).toLowerCase()));
    }
    return extensions.has(path.extname(abs).toLowerCase()) ? [abs] : [];
  }

  for (const item of paths) {
    for (const file of candidateFiles(item)) {
      const rel = path.relative(root, file);
      const lines = readIfExists(file).split(/\r?\n/);
      lines.forEach((line, index) => {
        const lower = line.toLowerCase();
        for (const term of blockedTerms) {
          if (!lower.includes(term.toLowerCase())) continue;
          const allowed = allowedContextTerms.some((allowedTerm) => lower.includes(allowedTerm.toLowerCase()));
          findings.push({
            file: rel,
            line: index + 1,
            term,
            status: allowed ? "review" : "blocked"
          });
        }
      });
    }
  }

  return findings;
}

function buildReport(root, policy, args) {
  const checks = [];

  for (const rel of policy.production_files || []) {
    const exists = fs.existsSync(path.join(root, rel));
    addCheck(checks, `file:${rel}`, exists ? "pass" : "fail", exists ? `${rel} mevcut` : `${rel} eksik`, exists ? 0 : 12);
  }

  for (const rel of policy.entry_html || []) {
    const abs = path.join(root, rel);
    const html = readIfExists(abs);
    if (!html) continue;

    const sizeLimit = policy.max_file_size_bytes && policy.max_file_size_bytes[rel];
    if (sizeLimit) {
      const size = fs.statSync(abs).size;
      addCheck(
        checks,
        `size:${rel}`,
        size <= sizeLimit ? "pass" : "warn",
        `${rel} boyutu ${size} byte`,
        size <= sizeLimit ? 0 : 4
      );
    }

    const htmlLang = /<html\s+[^>]*lang=["'][^"']+["']/i.test(html);
    addCheck(checks, `html-lang:${rel}`, htmlLang ? "pass" : "fail", "<html lang> kontrolu", htmlLang ? 0 : 8);

    const h1Count = (html.match(/<h1\b/gi) || []).length;
    addCheck(checks, `h1:${rel}`, h1Count === 1 ? "pass" : "warn", `H1 sayisi: ${h1Count}`, h1Count === 1 ? 0 : 4);

    for (const meta of policy.required_meta || []) {
      const ok = hasMeta(html, meta);
      addCheck(checks, `meta:${meta}`, ok ? "pass" : "fail", `${meta} meta kontrolu`, ok ? 0 : 6);
    }

    const imgTags = html.match(/<img\b[^>]*>/gi) || [];
    const missingAlt = imgTags.filter((tag) => !/\salt=["'][^"']*["']/i.test(tag)).length;
    addCheck(
      checks,
      `img-alt:${rel}`,
      missingAlt === 0 ? "pass" : "fail",
      `Alt eksik img sayisi: ${missingAlt}`,
      missingAlt === 0 ? 0 : Math.min(12, missingAlt * 3)
    );

    const iframeTags = html.match(/<iframe\b[^>]*>/gi) || [];
    const missingTitle = iframeTags.filter((tag) => !/\stitle=["'][^"']+["']/i.test(tag)).length;
    addCheck(
      checks,
      `iframe-title:${rel}`,
      missingTitle === 0 ? "pass" : "fail",
      `Title eksik iframe sayisi: ${missingTitle}`,
      missingTitle === 0 ? 0 : Math.min(12, missingTitle * 3)
    );

    const refs = [...collectAttrValues(html, "href"), ...collectAttrValues(html, "src")];
    const brokenRefs = refs
      .filter((value) => value && !isExternalRef(value))
      .map(cleanLocalRef)
      .filter(Boolean)
      .filter((value) => !fs.existsSync(path.resolve(path.dirname(abs), value)));

    addCheck(
      checks,
      `local-links:${rel}`,
      brokenRefs.length === 0 ? "pass" : "fail",
      brokenRefs.length === 0 ? "Local linkler temiz" : `Kirik local link: ${brokenRefs.join(", ")}`,
      brokenRefs.length === 0 ? 0 : Math.min(15, brokenRefs.length * 5)
    );

    const linkedCss = collectAttrValues(html, "href")
      .filter((value) => value && !isExternalRef(value))
      .map(cleanLocalRef)
      .filter((value) => value.toLowerCase().endsWith(".css"))
      .map((value) => path.resolve(path.dirname(abs), value))
      .filter((cssPath) => fs.existsSync(cssPath))
      .map((cssPath) => readIfExists(cssPath))
      .join("\n");
    const cssHasResponsive = /@media\b|@container\b/i.test(html + "\n" + linkedCss);
    addCheck(
      checks,
      `responsive-css:${rel}`,
      cssHasResponsive ? "pass" : "warn",
      cssHasResponsive ? "Responsive CSS sinyali var" : "Responsive CSS sinyali gorulmedi",
      cssHasResponsive ? 0 : 4
    );
  }

  const i18nCandidates = ["exports/i18n.json", "index.html"];
  const i18nSource = i18nCandidates.map((rel) => readIfExists(path.join(root, rel))).join("\n");
  for (const locale of policy.required_i18n_locales || []) {
    const ok = new RegExp(`\\b${locale}\\s*[:{]`).test(i18nSource) || new RegExp(`["']${locale}["']\\s*:`).test(i18nSource);
    addCheck(checks, `i18n:${locale}`, ok ? "pass" : "fail", `${locale} locale kontrolu`, ok ? 0 : 6);
  }

  const contentFindings = scanContentPolicy(root, policy, args.includeIntake);
  const blocked = contentFindings.filter((x) => x.status === "blocked");
  const review = contentFindings.filter((x) => x.status === "review");
  if (blocked.length) {
    addCheck(checks, "content-policy", "fail", `${blocked.length} bloklu icerik terimi bulundu`, Math.min(20, blocked.length * 5));
  } else if (review.length) {
    addCheck(checks, "content-policy", "warn", `${review.length} icerik terimi onayli baglamda bulundu`, Math.min(6, review.length));
  } else {
    addCheck(checks, "content-policy", "pass", "Icerik policy temiz");
  }

  const score = Math.max(0, 100 - checks.reduce((total, check) => total + check.impact, 0));
  const status = score >= policy.minimum_score && blocked.length === 0 ? "pass" : "fail";

  return {
    timestamp: new Date().toISOString(),
    score,
    minimum_score: policy.minimum_score,
    status,
    include_intake: args.includeIntake,
    checks,
    content_findings: contentFindings
  };
}

function printHuman(report) {
  process.stdout.write("Local Quality Gate\n");
  process.stdout.write(`- Status: ${report.status}\n`);
  process.stdout.write(`- Score: ${report.score}/${report.minimum_score}\n`);
  process.stdout.write(`- Intake included: ${report.include_intake ? "yes" : "no"}\n`);

  const grouped = {
    fail: report.checks.filter((x) => x.status === "fail"),
    warn: report.checks.filter((x) => x.status === "warn"),
    pass: report.checks.filter((x) => x.status === "pass")
  };

  for (const level of ["fail", "warn"]) {
    if (!grouped[level].length) continue;
    process.stdout.write(`- ${level.toUpperCase()}:\n`);
    for (const item of grouped[level]) {
      process.stdout.write(`  - ${item.id}: ${item.message}\n`);
    }
  }
}

function main() {
  const args = parseArgs(process.argv);
  const root = repoRoot();
  const policy = loadJson(path.join(root, "config", "quality-gate-policy.json"));
  const report = buildReport(root, policy, args);

  if (args.json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    printHuman(report);
  }

  if (args.strict && report.status !== "pass") {
    process.exit(1);
  }
}

main();
