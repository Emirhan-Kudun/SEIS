import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "package.json",
  "README.md",
  "src/server/server.mjs",
  "public/index.html",
  "public/styles.css",
  "public/app.js",
  "data/apps.json",
  "data/manifest.json",
  "data/cinematic-program.json",
  "data/archive-insights.json",
  "data/zip-promotion-lab.json",
  "data/decision-queue.json",
  "data/motion-tokens.json",
  "data/accessibility-affordances.json",
  "data/experience-scorecard.json",
  "data/gap-closure-register.json",
  "data/development-mode.json",
  "data/weekly-usage-stewardship.json",
  "data/governance.json",
  "data/long-term-program.json",
  "docs/architecture.md",
  "docs/governance.md",
  "docs/github-handoff.md",
  "docs/long-term-development-program.md"
];

const failures = [];
const DECISION_STATUSES = ["ready", "needs-evidence", "blocked"];

async function read(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

for (const file of requiredFiles) {
  try {
    await stat(path.join(root, file));
  } catch (error) {
    failures.push(`Missing required file: ${file}`);
  }
}

const packageJson = JSON.parse(await read("package.json"));
if (Object.keys(packageJson.dependencies || {}).length > 0) {
  failures.push("Runtime dependencies must stay at zero for the foundation release.");
}

const apps = JSON.parse(await read("data/apps.json"));
const cinematicProgram = JSON.parse(await read("data/cinematic-program.json"));
const archiveInsights = JSON.parse(await read("data/archive-insights.json"));
const zipPromotionLab = JSON.parse(await read("data/zip-promotion-lab.json"));
const decisionQueue = JSON.parse(await read("data/decision-queue.json"));
const motionTokens = JSON.parse(await read("data/motion-tokens.json"));
const accessibilityAffordances = JSON.parse(await read("data/accessibility-affordances.json"));
const experienceScorecard = JSON.parse(await read("data/experience-scorecard.json"));
const gapClosureRegister = JSON.parse(await read("data/gap-closure-register.json"));
const developmentMode = JSON.parse(await read("data/development-mode.json"));
const weeklyUsageStewardship = JSON.parse(await read("data/weekly-usage-stewardship.json"));
const longTermProgram = JSON.parse(await read("data/long-term-program.json"));
if (!Array.isArray(apps.apps) || apps.apps.length < 5) {
  failures.push("data/apps.json must define at least five UX app modules.");
}

if (
  !apps.apps.every(
    (app) =>
      app.id &&
      app.title &&
      app.name &&
      app.category &&
      app.summary &&
      Array.isArray(app.tags) &&
      Array.isArray(app.capabilities)
  )
) {
  failures.push("data/apps.json must stay compatible with both root static and full-stack frontend schemas.");
}

const server = await read("src/server/server.mjs");
for (const route of [
  "/api/health",
  "/api/apps",
  "/api/manifest",
  "/api/governance",
  "/api/cinematic-program",
  "/api/archive-insights",
  "/api/zip-promotion-lab",
  "/api/decision-queue",
  "/api/motion-tokens",
  "/api/accessibility-affordances",
  "/api/experience-scorecard",
  "/api/gap-closure-register",
  "/api/development-mode",
  "/api/weekly-usage-stewardship",
  "/api/observability",
  "/api/contact"
]) {
  if (!server.includes(route)) {
    failures.push(`Server is missing route ${route}`);
  }
}

const styles = await read("public/styles.css");
if (!styles.includes("prefers-reduced-motion")) {
  failures.push("CSS must include prefers-reduced-motion support.");
}

if (!styles.includes("spatial-drift")) {
  failures.push("CSS must include the cinematic spatial drift layer.");
}

if (!styles.includes("data-motion-intensity") || !styles.includes("cinematic-sweep") || !styles.includes("section-reveal")) {
  failures.push("CSS must include the heavy cinematic intensity, sweep, and section reveal layers.");
}

if (!longTermProgram.constraints?.includes("no-raw-zip-mirroring")) {
  failures.push("Long-term program must keep the no-raw-zip-mirroring constraint.");
}

if (!longTermProgram.lanes?.includes("cinematic-motion-system") || !longTermProgram.lanes?.includes("3d-spatial-interface-layer")) {
  failures.push("Long-term program must include cinematic motion and 3D/spatial lanes.");
}

const client = await read("public/app.js");
if (!client.includes("navigator.hardwareConcurrency") || !client.includes("navigator.deviceMemory")) {
  failures.push("Client canvas must remain device-aware for low-power mode.");
}

if (
  !client.includes("setupMotionIntensityControl") ||
  !client.includes("setupSectionReveals") ||
  !client.includes("setupCinematicParallax") ||
  !client.includes("setupAmbientCanvas")
) {
  failures.push("Client must wire heavy cinematic intensity, reveal, parallax, and ambient canvas systems.");
}

for (const forbiddenPattern of ["innerHTML", "insertAdjacentHTML", "document.write", "eval("]) {
  if (client.includes(forbiddenPattern)) {
    failures.push(`Client renderer must avoid ${forbiddenPattern} in the full-stack frontend.`);
  }
}

if (!client.includes("replaceChildren") || !client.includes("textContent")) {
  failures.push("Client renderer must use DOM-safe replacement and text assignment.");
}

if (!client.includes("/api/cinematic-program") || !client.includes("renderCinematicProgram")) {
  failures.push("Client must render the cinematic program API.");
}

if (!client.includes("/api/archive-insights") || !client.includes("renderArchiveInsights")) {
  failures.push("Client must render archive insight findings from the zip analysis.");
}

if (!client.includes("/api/zip-promotion-lab") || !client.includes("renderZipPromotionLab")) {
  failures.push("Client must render the zip promotion lab API.");
}

if (!client.includes("/api/decision-queue") || !client.includes("renderDecisionQueue")) {
  failures.push("Client must render the decision queue API.");
}

if (!client.includes("/api/motion-tokens") || !client.includes("renderMotionTokens")) {
  failures.push("Client must render the motion tokens API.");
}

if (!client.includes("/api/accessibility-affordances") || !client.includes("renderAccessibilityAffordances")) {
  failures.push("Client must render the accessibility affordances API.");
}

if (!client.includes("/api/experience-scorecard") || !client.includes("renderExperienceScorecard")) {
  failures.push("Client must render the experience scorecard API.");
}

if (!client.includes("/api/gap-closure-register") || !client.includes("renderGapClosureRegister")) {
  failures.push("Client must render the gap closure register API.");
}

if (!client.includes("/api/development-mode") || !client.includes("renderDevelopmentMode")) {
  failures.push("Client must render the development mode API.");
}

if (!client.includes("/api/weekly-usage-stewardship") || !client.includes("renderWeeklyUsageStewardship")) {
  failures.push("Client must render weekly usage stewardship.");
}

if (
  !client.includes("setupDevelopmentCommandCopy") ||
  !client.includes("navigator.clipboard.writeText") ||
  !client.includes("#development-checks")
) {
  failures.push("Client must support copying development commands from command lists and gate cards without extra dependencies.");
}

if (!client.includes("runtime?.ahead") || !server.includes("getDevelopmentRuntime")) {
  failures.push("Development mode must expose lightweight runtime git status.");
}

if (!client.includes("runtime.changes") || !server.includes("countStatusEntries")) {
  failures.push("Development mode must expose tracked and untracked change counts.");
}

if (!client.includes("runtime?.checkedAt") || !server.includes("checkedAt")) {
  failures.push("Development mode must expose a checkedAt timestamp for refresh clarity.");
}

if (!client.includes("runtime?.localHead") || !server.includes("localSubject")) {
  failures.push("Development mode must expose the local head and latest commit subject.");
}

if (!client.includes("runtime?.originHead") || !server.includes("originSubject")) {
  failures.push("Development mode must expose the origin head and latest origin commit subject.");
}

if (!client.includes("gate?.state") || !server.includes("getPublishGate")) {
  failures.push("Development mode must expose a publish gate with next action guidance.");
}

if (!client.includes("gate?.command") || !server.includes("reason:")) {
  failures.push("Development mode publish gate must expose reason and command guidance.");
}

if (!client.includes("Publish gate") || !client.includes("developmentChecks")) {
  failures.push("Development mode must render the runtime publish gate as a dynamic check card.");
}

if (!client.includes("createCommandButton") || !client.includes("Copy command")) {
  failures.push("Development mode publish gate must expose a copyable gate command.");
}

if (!client.includes("createCommandActions") || !server.includes("secondaryCommands")) {
  failures.push("Development mode publish gate must expose copyable secondary commands.");
}

if (!client.includes("command-action") || !client.includes("Copy step")) {
  failures.push("Development mode secondary commands must render labeled copy actions.");
}

if (!client.includes("Copy all") || !client.includes("join(\"\\n\")")) {
  failures.push("Development mode gate commands must support copying the full command sequence.");
}

if (!client.includes("developmentGate") || !server.includes("developmentRuntime.gate.state")) {
  failures.push("Observability must surface the current development publish gate.");
}

if (!client.includes("developmentCheckedAt") || !server.includes("developmentRuntime.checkedAt")) {
  failures.push("Observability must surface when the development publish gate was checked.");
}

if (!client.includes("gapClosureBlocked") || !server.includes("gapClosureBlocked")) {
  failures.push("Observability must surface blocked gap closure count.");
}

if (!client.includes("weeklyUsageCadence") || !server.includes("weeklyUsageCadence")) {
  failures.push("Observability must surface weekly usage stewardship cadence.");
}

if (!client.includes("refreshDevelopmentMode") || !client.includes("setupDevelopmentRefresh")) {
  failures.push("Development mode must support refreshing runtime status without a full page reload.");
}

if (developmentMode.summary?.branch !== "UIXAppTTR") {
  failures.push("Development mode must keep UIXAppTTR as the active implementation branch.");
}

if (!developmentMode.checks?.some((check) => check.status === "blocked-by-auth")) {
  failures.push("Development mode must disclose the GitHub auth publication blocker.");
}

if (!developmentMode.commands?.some((command) => command.command === "npm run publish:preflight")) {
  failures.push("Development mode must include the publish preflight command.");
}

if (weeklyUsageStewardship.summary?.cadence !== "weekly-budget-aware") {
  failures.push("Weekly usage stewardship must stay weekly-budget-aware.");
}

if (!String(weeklyUsageStewardship.intent || "").includes("durable UX Apps source improvements")) {
  failures.push("Weekly usage stewardship must focus on durable UX Apps source improvements.");
}

if (!weeklyUsageStewardship.preferredSpend?.some((item) => item.id === "implementation-slices")) {
  failures.push("Weekly usage stewardship must prefer small reversible implementation slices.");
}

if (!weeklyUsageStewardship.blockedSpend?.includes("empty token burn")) {
  failures.push("Weekly usage stewardship must block empty token burn.");
}

if (!weeklyUsageStewardship.rules?.some((rule) => rule.includes("UIXAppTTR"))) {
  failures.push("Weekly usage stewardship must keep UIXAppTTR visible.");
}

if (weeklyUsageStewardship.summary?.nextPlanningTheme !== "animation-and-3d") {
  failures.push("Weekly usage stewardship must reserve animation and 3D for the next planning pass.");
}

if (!Array.isArray(cinematicProgram.qualityPresets) || cinematicProgram.qualityPresets.length < 3) {
  failures.push("data/cinematic-program.json must define low, medium, and future 3D quality presets.");
}

if (!cinematicProgram.motionDepths?.some((depth) => depth.id === "cinematic")) {
  failures.push("data/cinematic-program.json must define a cinematic motion depth.");
}

if (!Array.isArray(archiveInsights.conversionMap) || archiveInsights.conversionMap.length < 5) {
  failures.push("data/archive-insights.json must include at least five source-to-feature conversion signals.");
}

if (!archiveInsights.noisePolicy?.excluded?.includes("node_modules") || !archiveInsights.noisePolicy?.excluded?.includes(".git")) {
  failures.push("Archive insights must explicitly filter dependency and git metadata noise.");
}

if (!archiveInsights.nextFeatures?.some((feature) => feature.id === "composition-score-panel")) {
  failures.push("Archive insights must promote the composition score panel candidate.");
}

if (!Array.isArray(zipPromotionLab.lanes) || zipPromotionLab.lanes.length < 5) {
  failures.push("data/zip-promotion-lab.json must include at least five promotion lanes.");
}

if (zipPromotionLab.summary?.lanes !== zipPromotionLab.lanes.length) {
  failures.push("Zip promotion lab summary lane count must match the lane registry.");
}

if (!zipPromotionLab.lanes.some((lane) => lane.status === "blocked")) {
  failures.push("Zip promotion lab must keep unsafe wholesale imports blocked.");
}

if (!zipPromotionLab.blockedImports?.includes("node_modules") || !zipPromotionLab.blockedImports?.includes(".git")) {
  failures.push("Zip promotion lab must explicitly block dependency and git metadata imports.");
}

if (!Array.isArray(decisionQueue.decisions) || decisionQueue.decisions.length < 5) {
  failures.push("data/decision-queue.json must include at least five decision records.");
}

if (decisionQueue.summary?.decisions !== decisionQueue.decisions.length) {
  failures.push("Decision queue summary count must match the decision registry.");
}

const decisionStatusCounts = decisionQueue.decisions.reduce((counts, decision) => {
  counts[decision.status] = (counts[decision.status] || 0) + 1;
  return counts;
}, {});

for (const status of DECISION_STATUSES) {
  if (!Object.prototype.hasOwnProperty.call(decisionStatusCounts, status)) {
    failures.push(`Decision queue must include at least one ${status} decision.`);
  }
}

if (decisionQueue.summary?.ready !== decisionStatusCounts.ready) {
  failures.push("Decision queue ready summary must match ready decisions.");
}

if (decisionQueue.summary?.needsEvidence !== decisionStatusCounts["needs-evidence"]) {
  failures.push("Decision queue needsEvidence summary must match needs-evidence decisions.");
}

if (decisionQueue.summary?.blocked !== decisionStatusCounts.blocked) {
  failures.push("Decision queue blocked summary must match blocked decisions.");
}

if (!decisionQueue.decisions.every((decision) => DECISION_STATUSES.includes(decision.status))) {
  failures.push("Decision queue statuses must stay within ready, needs-evidence, or blocked.");
}

if (!decisionQueue.decisions.some((decision) => decision.status === "blocked")) {
  failures.push("Decision queue must keep at least one unsafe path blocked.");
}

if (!decisionQueue.decisions.every((decision) => decision.owner && decision.evidence && decision.nextAction && decision.rollback)) {
  failures.push("Every decision queue item must include owner, evidence, nextAction, and rollback.");
}

if (!Array.isArray(motionTokens.tokens) || motionTokens.tokens.length < 6) {
  failures.push("data/motion-tokens.json must include at least six motion tokens.");
}

if (motionTokens.summary?.tokens !== motionTokens.tokens.length) {
  failures.push("Motion token summary count must match the token registry.");
}

if (motionTokens.summary?.reducedMotion !== "instant-state-change") {
  failures.push("Motion tokens must define an instant-state-change reduced-motion fallback.");
}

if (motionTokens.summary?.maxContinuousAnimationMs > 22000) {
  failures.push("Motion tokens must keep continuous animation below the low-power maximum.");
}

if (!motionTokens.tokens.every((token) => token.id && token.durationMs && token.easing && token.pressure && token.fallback)) {
  failures.push("Every motion token must include id, durationMs, easing, pressure, and fallback.");
}

if (!motionTokens.tokens.some((token) => token.pressure === "guarded")) {
  failures.push("Motion tokens must keep future 3D motion behind a guarded pressure state.");
}

if (!motionTokens.tokens.some((token) => token.id === "heavy-cinematic" && token.pressure === "guarded")) {
  failures.push("Motion tokens must define the guarded heavy-cinematic token.");
}

if (!Array.isArray(accessibilityAffordances.affordances) || accessibilityAffordances.affordances.length < 6) {
  failures.push("data/accessibility-affordances.json must include at least six affordance records.");
}

if (accessibilityAffordances.summary?.affordances !== accessibilityAffordances.affordances.length) {
  failures.push("Accessibility affordance summary count must match the affordance registry.");
}

if (accessibilityAffordances.summary?.mobileReady < 3) {
  failures.push("Accessibility affordances must keep at least three mobile-ready affordances.");
}

if (accessibilityAffordances.summary?.reducedMotionAware < 4) {
  failures.push("Accessibility affordances must keep at least four reduced-motion-aware affordances.");
}

if (!accessibilityAffordances.blockedPatterns?.includes("hover-only disclosure")) {
  failures.push("Accessibility affordances must block hover-only disclosure.");
}

if (
  !accessibilityAffordances.affordances.every(
    (item) => item.id && item.label && item.surface && item.status && item.evidence && item.fallback
  )
) {
  failures.push("Every accessibility affordance must include id, label, surface, status, evidence, and fallback.");
}

if (!Array.isArray(experienceScorecard.dimensions) || experienceScorecard.dimensions.length < 6) {
  failures.push("data/experience-scorecard.json must include at least six score dimensions.");
}

if (experienceScorecard.summary?.dimensions !== experienceScorecard.dimensions.length) {
  failures.push("Experience scorecard dimension count must match the dimension registry.");
}

if (experienceScorecard.summary?.score < experienceScorecard.summary?.minimumReleaseScore) {
  failures.push("Experience scorecard must remain above the minimum release score.");
}

if (!experienceScorecard.dimensions.every((dimension) => dimension.id && dimension.label && dimension.score && dimension.status && dimension.signal && dimension.nextAction)) {
  failures.push("Every experience score dimension must include id, label, score, status, signal, and nextAction.");
}

if (!experienceScorecard.watchItems?.some((item) => String(item).includes("GitHub CLI auth"))) {
  failures.push("Experience scorecard must keep GitHub CLI auth visible as a publish watch item.");
}

if (!Array.isArray(gapClosureRegister.gaps) || gapClosureRegister.gaps.length < 6) {
  failures.push("data/gap-closure-register.json must include at least six gap records.");
}

if (gapClosureRegister.summary?.gaps !== gapClosureRegister.gaps.length) {
  failures.push("Gap closure summary count must match the gap registry.");
}

const gapStatusCounts = gapClosureRegister.gaps.reduce((counts, gap) => {
  counts[gap.status] = (counts[gap.status] || 0) + 1;
  return counts;
}, {});

for (const status of ["ready", "watch", "blocked"]) {
  if (!Object.prototype.hasOwnProperty.call(gapStatusCounts, status)) {
    failures.push(`Gap closure register must include at least one ${status} gap.`);
  }
}

if (gapClosureRegister.summary?.ready !== gapStatusCounts.ready) {
  failures.push("Gap closure ready summary must match ready gaps.");
}

if (gapClosureRegister.summary?.watch !== gapStatusCounts.watch) {
  failures.push("Gap closure watch summary must match watch gaps.");
}

if (gapClosureRegister.summary?.blocked !== gapStatusCounts.blocked) {
  failures.push("Gap closure blocked summary must match blocked gaps.");
}

if (!gapClosureRegister.gaps.every((gap) => ["ready", "watch", "blocked"].includes(gap.status))) {
  failures.push("Gap closure statuses must stay within ready, watch, or blocked.");
}

if (
  !gapClosureRegister.gaps.every(
    (gap) =>
      gap.id &&
      gap.label &&
      gap.status &&
      gap.priority &&
      gap.surface &&
      gap.impact &&
      gap.nextAction &&
      gap.closureMetric &&
      Array.isArray(gap.qualityCommands) &&
      gap.qualityCommands.length > 0 &&
      gap.rollback
  )
) {
  failures.push("Every gap closure item must include id, label, status, priority, surface, impact, nextAction, closureMetric, qualityCommands, and rollback.");
}

if (!gapClosureRegister.gaps.some((gap) => gap.status === "blocked" && String(gap.impact).includes("GitHub"))) {
  failures.push("Gap closure register must keep GitHub publication blocker visible.");
}

if (!gapClosureRegister.gaps.some((gap) => gap.id === "server-target-credentials" && gap.qualityCommands.includes("npm run server-upload:dry-run"))) {
  failures.push("Gap closure register must keep server upload dry-run as the server closure command.");
}

if (!gapClosureRegister.gaps.some((gap) => gap.id === "polyglot-lane-drift" && gap.qualityCommands.includes("npm run check:polyglot-foundation"))) {
  failures.push("Gap closure register must keep polyglot foundation check visible.");
}

if (!gapClosureRegister.rules?.some((rule) => rule.includes("remote pushes"))) {
  failures.push("Gap closure rules must stop blocked gaps before remote pushes.");
}

for (const file of ["public/index.html", "public/styles.css", "public/app.js"]) {
  const info = await stat(path.join(root, file));
  if (info.size > 180_000) {
    failures.push(`${file} exceeds the 180KB foundation budget.`);
  }
}

if (failures.length > 0) {
  console.error("UX Apps quality gate failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("UX Apps quality gate passed.");
