import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "AGENTS.md",
  "README.md",
  "apps/web/index.html",
  "apps/web/manifest.webmanifest",
  "apps/web/src/scripts/motion-system.js",
  "apps/web/src/scripts/gallery-system.js",
  "apps/web/src/scripts/efficiency-system.js",
  "apps/web/src/scripts/i18n-system.js",
  "apps/web/src/scripts/pwa-system.js",
  "apps/web/service-worker.js",
  "apps/web/src/i18n/locales.js",
  "apps/web/src/content/artworks.js",
  "content/lab/operating-system.json",
  "content/lab/efficiency-mode.json",
  "content/development/sprint-zero.json",
  "content/development/backlog.json",
  "content/development/decision-log.json",
  "content/development/mobile-path-matrix.json",
  "content/development/uixappttr-branch.json",
  "content/development/branch-consolidation.json",
  "content/development/premium-local-foundation-subagent.json",
  "content/development/sub-agent-runs.json",
  "content/development/long-term-program.json",
  "packages/design-tokens/seis.tokens.css",
  "packages/asset-registry/legacy-assets.json",
  "docs/reports/zip-analysis-2026-05-24.md",
  "docs/architecture/web-mobile-foundation.md",
  "docs/architecture/animation-system-plan.md",
  "docs/quality/responsive-performance-accessibility.md",
  "docs/quality/experience-budget.md",
  "docs/strategy/ui-ux-digital-lab-operating-system.md",
  "docs/development/sprint-zero.md",
  "docs/development/development-summary.md",
  "docs/development/mobile-path-decision.md",
  "docs/development/uixappttr-branch-model.md",
  "docs/development/uixapps-repository-model.md",
  "docs/development/premium-local-foundation-agent.md",
  "docs/development/agents/README.md",
  "docs/development/long-term-development-program.md",
  "docs/polyglot/software-language-atlas.md",
  "docs/plans/first-commit-plan.md"
];

const requiredTextChecks = [
  ["apps/web/index.html", "UI-UX Digital Lab"],
  ["package.json", "\"name\": \"uixapps\""],
  ["README.md", "Repository: UIXApps"],
  ["content/lab/operating-system.json", "experienceModes"],
  ["content/lab/efficiency-mode.json", "full-efficiency-low-pressure"],
  ["content/development/sprint-zero.json", "polyglot-growth"],
  ["content/development/backlog.json", "SEIS-003"],
  ["content/development/decision-log.json", "ADR-001"],
  ["content/development/mobile-path-matrix.json", "pwa-first"],
  ["content/development/uixappttr-branch.json", "subAgents"],
  ["content/development/uixappttr-branch.json", "UIXApps"],
  ["content/development/uixappttr-branch.json", "premium-local-foundation-agent"],
  ["content/development/branch-consolidation.json", "single-branch-local-development"],
  ["content/development/branch-consolidation.json", "codex/premium-local-foundation"],
  ["content/development/premium-local-foundation-subagent.json", "absorbed_as_sub_agent"],
  ["content/development/sub-agent-runs.json", "sprint-zero-agent-pass-001"],
  ["content/development/sub-agent-runs.json", "premium-local-foundation-agent"],
  ["content/development/long-term-program.json", "phase-06-observability-governance"],
  ["polyglot/manifest.json", "Objective-C"],
  ["polyglot/contracts/seis-experience-contract.json", "polyglotAtlas"],
  ["docs/strategy/ui-ux-digital-lab-operating-system.md", "Experience Modes"],
  ["docs/development/sprint-zero.md", "Sprint Zero"],
  ["docs/development/development-summary.md", "Backlog Health"],
  ["docs/development/mobile-path-decision.md", "Start PWA-first"],
  ["docs/development/uixappttr-branch-model.md", "single active development branch"],
  ["docs/development/uixapps-repository-model.md", "Repository name: `UIXApps`"],
  ["docs/development/premium-local-foundation-agent.md", "`codex/premium-local-foundation`"],
  ["docs/development/agents/README.md", "UIXAppTTR Sub-Agent Briefs"],
  ["docs/development/long-term-development-program.md", "Phase Plan"],
  ["docs/polyglot/software-language-atlas.md", "80 language and configuration surfaces"],
  ["docs/quality/experience-budget.md", "Promotion Rule"],
  ["apps/web/index.html", "data-cinematic-field"],
  ["apps/web/index.html", "data-artwork-grid"],
  ["apps/web/index.html", "data-locale-switcher"],
  ["apps/web/index.html", "data-agent-operations"],
  ["apps/web/index.html", "data-quality-budget"],
  ["apps/web/index.html", "data-efficiency-system"],
  ["apps/web/index.html", "data-long-term-program"],
  ["apps/web/index.html", "data-polyglot-atlas"],
  ["apps/web/service-worker.js", "CACHE_NAME"],
  ["apps/web/src/i18n/locales.js", "supportedLocales"],
  ["apps/web/src/i18n/locales.js", "ar"],
  ["apps/web/src/styles/motion.css", "prefers-reduced-motion"],
  ["apps/web/src/scripts/motion-system.js", "requestAnimationFrame"],
  ["apps/web/src/scripts/motion-system.js", "initEfficiencySystem"],
  ["docs/reports/zip-analysis-2026-05-24.md", "Valuable Assets"]
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    failures.push(`missing required file: ${file}`);
  }
}

for (const [file, needle] of requiredTextChecks) {
  if (!existsSync(file)) {
    continue;
  }
  const contents = readFileSync(file, "utf8");
  if (!contents.includes(needle)) {
    failures.push(`missing "${needle}" in ${file}`);
  }
}

const drawingDir = "apps/web/public/media/drawings";
if (!existsSync(drawingDir)) {
  failures.push(`missing drawing directory: ${drawingDir}`);
} else {
  const drawings = readdirSync(drawingDir).filter(name => name.endsWith(".jpg"));
  const bytes = drawings.reduce((total, name) => total + statSync(join(drawingDir, name)).size, 0);
  if (drawings.length !== 20) {
    failures.push(`expected 20 curated drawing assets, found ${drawings.length}`);
  }
  if (bytes > 7_000_000) {
    failures.push(`curated drawing assets exceed lightweight budget: ${bytes} bytes`);
  }
}

if (failures.length > 0) {
  console.error("SEIS foundation check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("SEIS foundation check passed.");
