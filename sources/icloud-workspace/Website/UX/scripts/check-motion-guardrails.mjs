import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

const motionFiles = [
  "apps/site-next/components/cinematic-hero-scene.tsx",
  "apps/site-next/components/cinematic-showcase-scene.tsx",
  "apps/site-next/components/motion-language-stage.tsx"
];

const baseRequirements = [
  { test: /prefers-reduced-motion:\s*reduce/, message: "must honor reduced-motion preference" },
  { test: /powerPreference:\s*"low-power"/, message: "must request low-power WebGL preference" },
  { test: /IntersectionObserver/, message: "must pause/resume work by viewport visibility" },
  { test: /requestAnimationFrame/, message: "must use requestAnimationFrame loop" },
  { test: /cancelAnimationFrame/, message: "must cancel animation frame on cleanup" },
  { test: /renderer\.dispose\(\)/, message: "must dispose renderer on cleanup" }
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

for (const file of motionFiles) {
  const source = read(file);
  for (const requirement of baseRequirements) {
    if (!requirement.test.test(source)) {
      errors.push(`${file} ${requirement.message}.`);
    }
  }

  if (!/setPixelRatio\(\s*Math\.min\(/.test(source)) {
    errors.push(`${file} must cap DPR with Math.min for thermal safety.`);
  }

  if (!/observer\.disconnect\(\)/.test(source)) {
    errors.push(`${file} must disconnect IntersectionObserver during cleanup.`);
  }
}

const heroSource = read("apps/site-next/components/cinematic-hero-scene.tsx");
if (!/max-width:\s*720px/.test(heroSource)) {
  errors.push("CinematicHeroScene must keep the mobile-motion media guard.");
}
if (!/mobileMotionQuery/.test(heroSource)) {
  errors.push("CinematicHeroScene must keep explicit mobile motion query handling.");
}

const budgetSource = read("packages/content/src/motion-budgets.ts");
for (const requiredSnippet of ["dpr-cap", "active-scenes", "mobile-fallback", "idle-pause", "1.25 max desktop / 1.0 mobile", "Viewport-active only"]) {
  if (!budgetSource.includes(requiredSnippet)) {
    errors.push(`Motion runtime budget contract missing: ${requiredSnippet}`);
  }
}

const sceneModeSource = read("packages/content/src/motion-scene-modes.ts");
for (const requiredSnippet of ["motionModeCalmLabel", "motionModeEditorialLabel", "motionModeCinematicLabel", "motionModeExperimentalLabel", "motionModeCinematicConstraint", "motionModeExperimentalConstraint"]) {
  if (!sceneModeSource.includes(requiredSnippet)) {
    errors.push(`Motion scene mode contract missing: ${requiredSnippet}`);
  }
}

const motionPageSource = read("apps/site-next/app/motion/page.tsx");
for (const requiredSnippet of ["motionSceneModes", "motion-mode-grid", "dict.motionModesTitle", "dict[mode.labelKey]", "dict[mode.constraintKey]", "motionRuntimeBudgets", "motion-budget-grid", "dict.motionBudgetTitle", "dict.motionBudgetLead"]) {
  if (!motionPageSource.includes(requiredSnippet)) {
    errors.push(`Motion page must expose runtime budget evidence: ${requiredSnippet}`);
  }
}
if (motionPageSource.includes("WebGL Runtime Budget")) {
  errors.push("Motion page must not hardcode runtime budget title text.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Motion guardrails check passed: low-power, scene modes, reduced-motion, viewport pause, cleanup and runtime budgets are complete.");
