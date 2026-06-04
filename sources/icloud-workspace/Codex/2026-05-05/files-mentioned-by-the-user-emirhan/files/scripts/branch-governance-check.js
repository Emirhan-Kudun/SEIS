#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const cp = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const POLICY_PATH = path.join(ROOT, "config", "branch-governance-policy.json");

function run(cmd, args) {
  const res = cp.spawnSync(cmd, args, { cwd: ROOT, encoding: "utf8" });
  if (res.status !== 0) {
    throw new Error((res.stderr || res.stdout || "command failed").trim());
  }
  return String(res.stdout || "");
}

function readPolicy() {
  return JSON.parse(fs.readFileSync(POLICY_PATH, "utf8"));
}

function getBranch() {
  return run("git", ["rev-parse", "--abbrev-ref", "HEAD"]).trim();
}

function getPorcelainLines() {
  return run("git", ["status", "--porcelain"]).split(/\r?\n/).filter(Boolean);
}

function parseChangedFiles(lines) {
  const out = [];
  for (const line of lines) {
    const status = line.slice(0, 2).trim() || "??";
    const rawPath = line.slice(3).trim();
    const pathPart = rawPath.includes(" -> ") ? rawPath.split(" -> ").pop() : rawPath;
    out.push({ status, file: pathPart });
  }
  return out;
}

function classifyFile(file) {
  const f = file.toLowerCase();
  const cats = new Set();

  if (f === "index.html" || f.endsWith(".html") || f.endsWith(".css") || f.endsWith(".scss") || f.endsWith(".js") || f.endsWith(".ts")) {
    cats.add("ui");
  }
  if (f.includes("responsive") || f.includes("mobile") || f.includes("overflow")) {
    cats.add("responsive");
  }
  if (f.includes("meta") || f.includes("sitemap") || f.includes("robots") || f.includes("seo")) {
    cats.add("seo");
  }
  if (f.includes("anim") || f.includes("motion")) {
    cats.add("animation");
  }
  if (f.includes("perf") || f.includes("optimi") || f.includes("lazy")) {
    cats.add("performance");
  }
  if (f.startsWith("images/") || f.includes("assets") || f.includes("drawings")) {
    cats.add("assets");
  }
  if (f.startsWith("config/") || f.endsWith(".toml") || f.endsWith(".yml") || f.endsWith(".yaml") || f.includes("config") || f === ".gitignore") {
    cats.add("config");
  }
  if (f.includes("package.json") || f.includes("package-lock.json")) {
    cats.add("dependency");
  }
  if (f.startsWith("contracts/") || f.startsWith("scripts/") || f.includes("refactor")) {
    cats.add("refactor");
  }
  if (f.includes("style") || f.includes("typography") || f.includes("spacing") || f.includes("visual")) {
    cats.add("design");
  }
  if (!cats.size) {
    cats.add("misc");
  }

  return Array.from(cats);
}

function hasCriticalFileChange(files, policy) {
  const critical = new Set(policy.criticalFiles.map((x) => x.toLowerCase()));
  const matched = [];
  for (const item of files) {
    const file = item.file.toLowerCase();
    if (critical.has(file)) {
      matched.push(item.file);
    }
  }
  return matched;
}

function validateBranchName(branch, policy) {
  const rules = (policy.branchNaming && policy.branchNaming.allowedPatterns) || [];
  return rules.some((rule) => new RegExp(rule).test(branch));
}

function detectForbiddenMixes(categorySet, policy) {
  const mixes = (policy.forbiddenMixes || []);
  const found = [];
  for (const pair of mixes) {
    if (pair.length !== 2) {
      continue;
    }
    if (categorySet.has(pair[0]) && categorySet.has(pair[1])) {
      found.push(pair.slice());
    }
  }
  return found;
}

function inferRecommendedBranch(categorySet) {
  if (categorySet.has("seo") && categorySet.size === 1) {
    return "seo/semantic-html";
  }
  if (categorySet.has("performance") && categorySet.size === 1) {
    return "perf/css-reduction";
  }
  if (categorySet.has("design") && categorySet.size === 1) {
    return "style/visual-polish";
  }
  if (categorySet.has("ui") && categorySet.size === 1) {
    return "feature/ui-improvements";
  }
  if (categorySet.has("config") || categorySet.has("refactor")) {
    return "chore/project-structure";
  }
  return "codex/polish-website";
}

function inferPurpose(categorySet) {
  const parts = [];
  if (categorySet.has("ui")) parts.push("UI/UX iyilestirme");
  if (categorySet.has("seo")) parts.push("SEO duzenleme");
  if (categorySet.has("performance")) parts.push("performans duzenleme");
  if (categorySet.has("config")) parts.push("config guvenligi");
  if (categorySet.has("refactor")) parts.push("kod duzeni");
  if (parts.length === 0) return "genel stabilizasyon";
  return parts.join(" + ");
}

function computeRisk(issues) {
  if (issues.some((x) => x.level === "high")) {
    return "yuksek";
  }
  if (issues.some((x) => x.level === "medium")) {
    return "orta";
  }
  return "dusuk";
}

function buildResult() {
  const policy = readPolicy();
  const branch = getBranch();
  const files = parseChangedFiles(getPorcelainLines());
  const categorySet = new Set();
  const fileCategories = [];

  for (const item of files) {
    const cats = classifyFile(item.file);
    fileCategories.push({ file: item.file, categories: cats });
    for (const cat of cats) {
      categorySet.add(cat);
    }
  }

  const issues = [];
  const protectedBranches = new Set((policy.mainProtection && policy.mainProtection.protectedBranches) || ["main", "master"]);
  if (protectedBranches.has(branch)) {
    issues.push({ level: "high", code: "protected-branch-edit", message: "Protected branch üzerinde gelistirme yapiliyor." });
  }

  const branchNameOk = validateBranchName(branch, policy);
  if (!branchNameOk) {
    issues.push({ level: "medium", code: "invalid-branch-name", message: "Branch adi policy kalibina uymuyor." });
  }

  const criticalHits = hasCriticalFileChange(files, policy);
  if (criticalHits.length) {
    issues.push({ level: "high", code: "critical-file-change", message: "Kritik dosya degisikligi var.", files: criticalHits });
  }

  if (categorySet.has("dependency")) {
    issues.push({ level: "high", code: "dependency-change", message: "Dependency degisikligi algilandi." });
  }

  const forbiddenMixes = detectForbiddenMixes(categorySet, policy);
  if (forbiddenMixes.length) {
    issues.push({ level: "medium", code: "mixed-scope-change", message: "Ayni branchte karismamasi gereken kategori kombinasyonlari var.", mixes: forbiddenMixes });
  }

  const risk = computeRisk(issues);
  const recommendedBranch = inferRecommendedBranch(categorySet);

  const criticalTouched = criticalHits.length ? "var" : "yok";
  const dependencyNeed = categorySet.has("dependency") ? "gerekli olabilir (justification gerekli)" : "yok";
  const splitNeeded = forbiddenMixes.length > 0 ? "evet" : (categorySet.size > 2 ? "evet" : "hayir");

  return {
    policy_version: policy.version,
    branch,
    branch_name_valid: branchNameOk,
    protected_branch: protectedBranches.has(branch),
    changed_files: files.map((x) => x.file),
    changed_file_count: files.length,
    categories: Array.from(categorySet).sort(),
    issues,
    risk,
    recommended_branch: recommendedBranch,
    inferred_purpose: inferPurpose(categorySet),
    critical_file_change: criticalTouched,
    dependency_need: dependencyNeed,
    split_needed: splitNeeded,
    file_categories: fileCategories,
    forbidden_mixes: forbiddenMixes
  };
}

function printHuman(result) {
  console.log("BRANCH GOVERNANCE CHECK");
  console.log("- Current branch:", result.branch);
  console.log("- Branch name valid:", result.branch_name_valid ? "yes" : "no");
  console.log("- Protected branch:", result.protected_branch ? "yes" : "no");
  console.log("- Risk:", result.risk);
  console.log("- Changed files:", result.changed_file_count);
  console.log("- Categories:", result.categories.join(", ") || "none");

  if (result.issues.length) {
    console.log("- Issues:");
    for (const issue of result.issues) {
      console.log("  * [" + issue.level + "] " + issue.code + " - " + issue.message);
    }
  } else {
    console.log("- Issues: none");
  }
}

function printTemplate(result) {
  console.log("BRANCH PLANI");
  console.log("- Onerilen branch:", result.recommended_branch);
  console.log("- Amac:", result.inferred_purpose);
  console.log("- Risk seviyesi:", result.risk);
  console.log("- Etkilenecek dosyalar:", result.changed_files.length ? result.changed_files.join(", ") : "henuz degisiklik yok");
  console.log("- Kritik dosya degisikligi:", result.critical_file_change);
  console.log("- Dependency ihtiyaci:", result.dependency_need);
  console.log("- Is parcalara bolunecek mi?:", result.split_needed);
  console.log("");
  console.log("UYGULAMA PLANI");
  console.log("1. Branch guvenlik ve kapsam kontrolu yapilir.");
  console.log("2. Sadece hedef goreve ait dosyalar degistirilir.");
  console.log("3. Responsive, performans ve SEO kontrolunden sonra merge ozetine gecilir.");
  console.log("");
  console.log("COMMIT ONERILERI");
  console.log("- chore: enforce branch governance policy and safety checks");
  console.log("- docs: add merge readiness checklist and rollback notes");
  console.log("");
  console.log("MERGE ONCESI KONTROL");
  console.log("- Responsive: kontrol edildi / beklemede");
  console.log("- Performans: kontrol edildi / beklemede");
  console.log("- SEO: kontrol edildi / beklemede");
  console.log("- Tasarim dili: korundu / beklemede");
  console.log("- Main guvenligi: dogrudan commit yok");
}

function main() {
  const args = new Set(process.argv.slice(2));
  const result = buildResult();

  if (args.has("--json")) {
    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
  } else if (args.has("--template")) {
    printTemplate(result);
  } else {
    printHuman(result);
  }

  const hasBlocking = result.issues.some((x) => x.level === "high");
  process.exit(hasBlocking ? 1 : 0);
}

main();
