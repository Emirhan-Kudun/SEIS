#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function run(cmd, trim = true) {
  const out = execSync(cmd, { encoding: "utf8" });
  return trim ? out.trim() : out;
}

function safeRun(cmd) {
  try {
    return run(cmd);
  } catch {
    return "";
  }
}

function safeRunRaw(cmd) {
  try {
    return run(cmd, false);
  } catch {
    return "";
  }
}

function parseArgs(argv) {
  const args = new Set(argv.slice(2));
  return {
    json: args.has("--json"),
    template: args.has("--template"),
    stagedOnly: args.has("--staged-only")
  };
}

function loadPolicy(repoRoot) {
  const policyPath = path.join(repoRoot, "config", "branch-governance-policy.json");
  if (!fs.existsSync(policyPath)) {
    throw new Error(`Policy not found: ${policyPath}`);
  }
  return JSON.parse(fs.readFileSync(policyPath, "utf8"));
}

function parseStatusLines(raw) {
  if (!raw) return [];
  return raw
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const status = line.slice(0, 2).trim();
      const payload = line.slice(3).trim();
      const filePath = payload.includes(" -> ") ? payload.split(" -> ")[1] : payload;
      return { status, filePath };
    });
}

function isCriticalFile(filePath, policy) {
  const normalized = filePath.replace(/\\/g, "/");
  const basename = path.basename(normalized);
  return policy.critical_files.some((item) => item === normalized || item === basename);
}

function classifyChange(filePath) {
  const normalized = filePath.toLowerCase();
  const ext = path.extname(normalized);
  const categories = new Set();

  if (
    normalized === "package.json" ||
    normalized === "package-lock.json" ||
    normalized === "pnpm-lock.yaml" ||
    normalized === "yarn.lock"
  ) {
    categories.add("dependency");
  }

  if (normalized.startsWith("config/") || normalized.includes("config")) {
    categories.add("config");
  }

  if (normalized.endsWith(".md")) {
    categories.add("docs");
  }

  if (normalized.startsWith("scripts/")) {
    categories.add("chore");
  }

  if (
    normalized.includes("seo") ||
    normalized.includes("schema") ||
    normalized.endsWith("robots.txt") ||
    normalized.endsWith("sitemap.xml")
  ) {
    categories.add("seo");
  }

  if (normalized.includes("responsive") || normalized.includes("mobile") || normalized.includes("breakpoint")) {
    categories.add("responsive");
  }

  if (normalized.includes("assets/") || [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"].includes(ext)) {
    categories.add("asset");
  }

  if ([".html", ".css", ".scss", ".js", ".ts", ".jsx", ".tsx"].includes(ext)) {
    categories.add("ui");
  }

  if (normalized.startsWith(".github/")) {
    categories.add("config");
  }

  return Array.from(categories);
}

function branchMatchesPolicy(branch, policy) {
  return policy.allowed_branch_patterns.some((pattern) => new RegExp(pattern).test(branch));
}

function inferRecommendedBranch(categories) {
  if (categories.has("seo")) return "seo/metadata-polish";
  if (categories.has("responsive")) return "fix/mobile-overflow";
  if (categories.has("ui")) return "style/visual-polish";
  if (categories.has("asset")) return "chore/assets-cleanup";
  if (categories.has("config")) return "chore/project-structure";
  if (categories.has("dependency")) return "perf/css-reduction";
  return "codex/dev-maintenance";
}

function inferPurpose(categories) {
  if (categories.has("seo")) return "SEO ve semantik kaliteyi iyilestirmek";
  if (categories.has("responsive")) return "mobil tasma ve responsive kaliteyi iyilestirmek";
  if (categories.has("ui")) return "tasarim dili bozulmadan UI duzen iyilestirmeleri";
  if (categories.has("asset")) return "asset organizasyonu ve optimizasyonu";
  if (categories.has("config")) return "proje workflow guvenligi ve bakimi";
  if (categories.has("dependency")) return "dependency/perf tarafinda kontrollu iyilestirme";
  return "kucuk ve geri alinabilir bakim adimlari";
}

function buildTemplate(report) {
  const files = report.changed_files.length ? report.changed_files.join(", ") : "Degisiklik yok";
  const critical = report.critical_files.length ? report.critical_files.join(", ") : "Yok";
  const dependencyNeed = report.categories.includes("dependency")
    ? "Var (gerekce + risk notu zorunlu)"
    : "Yok";
  const split = report.mix_warnings.length > 0 || report.changed_files.length > 8 ? "Evet" : "Hayir";
  const primaryBranchLine =
    report.single_branch_mode && report.primary_work_branch
      ? `- Ana calisma branch'i: ${report.primary_work_branch} (${report.on_primary_work_branch ? "aktif" : "aktif degil"})`
      : null;

  const lines = [
    "BRANCH PLANI",
    `- Onerilen branch: ${report.recommended_branch}`,
    `- Amac: ${report.purpose}`,
    `- Risk seviyesi: ${report.risk_level}`,
    `- Etkilenecek dosyalar: ${files}`,
    `- Kritik dosya degisikligi: ${critical}`,
    `- Dependency ihtiyaci: ${dependencyNeed}`,
    `- Is parcalara bolunecek mi?: ${split}`,
    "",
    "UYGULAMA PLANI",
    "1. Main disinda tek amacli branch uzerinde ilerle.",
    "2. Degisiklikleri kucuk ve geri alinabilir commitlere bol.",
    "3. Merge oncesi responsive/perf/seo/tasarim dili kontrolunu tamamla.",
    "",
    "COMMIT ONERILERI",
    `- ${report.commit_suggestions[0]}`,
    `- ${report.commit_suggestions[1]}`,
    "",
    "MERGE ONCESI KONTROL",
    `- Responsive: ${report.checklist.responsive}`,
    `- Performans: ${report.checklist.performance}`,
    `- SEO: ${report.checklist.seo}`,
    `- Tasarim dili: ${report.checklist.design_language}`,
    `- Main guvenligi: ${report.checklist.main_safety}`
  ];

  if (primaryBranchLine) lines.splice(8, 0, primaryBranchLine);
  return lines.join("\n");
}

function inferCommitSuggestions(categories) {
  const base = [];
  if (categories.has("seo")) base.push("seo: improve metadata and semantic structure");
  if (categories.has("ui")) base.push("style: refine layout spacing and typography hierarchy");
  if (categories.has("responsive")) base.push("fix: resolve mobile overflow and breakpoint issues");
  if (categories.has("asset")) base.push("chore: organize and optimize portfolio assets");
  if (categories.has("config")) base.push("chore: strengthen branch governance workflow");
  if (categories.has("dependency")) base.push("perf: optimize dependency usage with minimal footprint");
  if (base.length === 0) base.push("chore: apply controlled maintenance updates");
  if (base.length === 1) base.push("docs: add merge pre-check summary");
  return base.slice(0, 2);
}

function main() {
  const args = parseArgs(process.argv);
  const repoRoot = safeRun("git rev-parse --show-toplevel") || process.cwd();
  const policy = loadPolicy(repoRoot);
  const primaryWorkBranch =
    typeof policy.primary_work_branch === "string" ? policy.primary_work_branch.trim() : "";
  const singleBranchMode = policy.single_branch_mode === true;
  const singleBranchExceptions = Array.isArray(policy.single_branch_exceptions)
    ? policy.single_branch_exceptions
        .filter((item) => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const currentBranch = safeRun("git branch --show-current");
  const statusCmd = args.stagedOnly ? "git diff --name-only --cached" : "git status --porcelain";
  const rawStatus = args.stagedOnly ? safeRun(statusCmd) : safeRunRaw(statusCmd);

  const changes = args.stagedOnly
    ? rawStatus
        .split("\n")
        .filter(Boolean)
        .map((filePath) => ({ status: "M", filePath }))
    : parseStatusLines(rawStatus);

  const changedFiles = changes.map((x) => x.filePath);
  const categories = new Set();
  const criticalFiles = [];

  for (const filePath of changedFiles) {
    for (const c of classifyChange(filePath)) categories.add(c);
    if (isCriticalFile(filePath, policy)) criticalFiles.push(filePath);
  }

  const mixWarnings = [];
  for (const pair of policy.forbidden_scope_mixes) {
    const [a, b] = pair;
    if (categories.has(a) && categories.has(b)) {
      mixWarnings.push(`${a} + ${b}`);
    }
  }

  const violations = [];
  const onProtectedBranch = policy.protected_branches.includes(currentBranch);
  const branchNameValid = branchMatchesPolicy(currentBranch, policy);
  const onPrimaryBranch = primaryWorkBranch ? currentBranch === primaryWorkBranch : false;
  const isSingleBranchException = singleBranchExceptions.includes(currentBranch);
  const singleBranchViolation =
    singleBranchMode &&
    primaryWorkBranch &&
    changedFiles.length > 0 &&
    !onPrimaryBranch &&
    !isSingleBranchException;

  if (onProtectedBranch && changedFiles.length > 0) {
    violations.push("Protected branch uzerinde degisiklik var. Main/master dogrudan gelistirme alani degil.");
  }
  if (!branchNameValid) {
    violations.push("Branch ismi policy ile uyumlu degil.");
  }
  if (singleBranchViolation) {
    violations.push(
      `Single-branch mode aktif. Degisiklikler '${primaryWorkBranch}' branch'inde yapilmalidir.`
    );
  }

  let riskLevel = "low";
  if (violations.length > 0 || criticalFiles.length > 0) {
    riskLevel = "high";
  } else if (mixWarnings.length > 0 || changedFiles.length > 8) {
    riskLevel = "medium";
  }

  const recommendedBranch = inferRecommendedBranch(categories);
  const purpose = inferPurpose(categories);
  const commitSuggestions = inferCommitSuggestions(categories);

  const checklist = {
    responsive: categories.has("ui") || categories.has("responsive") ? "Kontrol edilmeli" : "Etkisiz",
    performance: categories.has("dependency") || categories.has("asset") || categories.has("ui") ? "Kontrol edilmeli" : "Etkisiz",
    seo: categories.has("seo") || categories.has("ui") ? "Kontrol edilmeli" : "Etkisiz",
    design_language: categories.has("ui") || categories.has("style") ? "Koruma dogrulanmali" : "Korundu",
    main_safety: onProtectedBranch ? "Riskli" : "Guvende (main disi branch)"
  };

  const report = {
    timestamp: new Date().toISOString(),
    current_branch: currentBranch,
    branch_name_valid: branchNameValid,
    on_protected_branch: onProtectedBranch,
    primary_work_branch: primaryWorkBranch || null,
    on_primary_work_branch: onPrimaryBranch,
    single_branch_mode: singleBranchMode,
    single_branch_exceptions: singleBranchExceptions,
    single_branch_exception_match: isSingleBranchException,
    risk_level: riskLevel,
    changed_files: changedFiles,
    categories: Array.from(categories),
    critical_files: criticalFiles,
    mix_warnings: mixWarnings,
    violations,
    recommended_branch: recommendedBranch,
    purpose,
    commit_suggestions: commitSuggestions,
    checklist
  };

  if (args.json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (args.template) {
    process.stdout.write(`${buildTemplate(report)}\n`);
  } else {
    process.stdout.write("Branch Governance Check\n");
    process.stdout.write(`- Current branch: ${report.current_branch || "(unknown)"}\n`);
    process.stdout.write(`- Risk level: ${report.risk_level}\n`);
    process.stdout.write(`- Changed files: ${report.changed_files.length}\n`);
    process.stdout.write(`- Branch name valid: ${report.branch_name_valid ? "yes" : "no"}\n`);
    process.stdout.write(`- Protected branch: ${report.on_protected_branch ? "yes" : "no"}\n`);
    if (report.single_branch_mode && report.primary_work_branch) {
      process.stdout.write(`- Primary work branch: ${report.primary_work_branch}\n`);
      process.stdout.write(`- On primary branch: ${report.on_primary_work_branch ? "yes" : "no"}\n`);
      process.stdout.write(`- Single-branch exception: ${report.single_branch_exception_match ? "yes" : "no"}\n`);
    }
    if (report.critical_files.length) {
      process.stdout.write(`- Critical files touched: ${report.critical_files.join(", ")}\n`);
    }
    if (report.mix_warnings.length) {
      process.stdout.write(`- Scope mix warnings: ${report.mix_warnings.join("; ")}\n`);
    }
    if (report.violations.length) {
      process.stdout.write(`- Violations:\n  - ${report.violations.join("\n  - ")}\n`);
    }
  }

  const shouldBlock =
    (onProtectedBranch && changedFiles.length > 0) || !branchNameValid || singleBranchViolation;
  process.exit(shouldBlock ? 1 : 0);
}

main();
