import fs from "node:fs";

const requiredFiles = [
  "index.html",
  "style.css",
  "script.js",
  "data/apps-data.js",
  "public/index.html",
  "public/styles.css",
  "public/app.js",
  "src/server/server.mjs",
  "data/apps.json",
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
  "README.md"
];

let failures = 0;

function check(condition, message) {
  if (condition) {
    console.log(`OK: ${message}`);
    return;
  }
  failures += 1;
  console.error(`FAIL: ${message}`);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

for (const file of requiredFiles) {
  check(fs.existsSync(file), `${file} exists`);
}

const rootHtml = read("index.html");
const rootCss = read("style.css");
const rootJs = read("script.js");
const publicHtml = read("public/index.html");
const publicCss = read("public/styles.css");
const publicJs = read("public/app.js");
const server = read("src/server/server.mjs");
const data = JSON.parse(read("data/apps.json"));

for (const token of ['id="workspace"', 'id="apps"', 'id="matrix"', 'id="notes"', 'id="searchInput"']) {
  check(rootHtml.includes(token), `root catalog includes ${token}`);
}

check(rootHtml.includes("data/apps-data.js"), "root catalog loads data/apps-data.js");
check(rootHtml.includes("script.js"), "root catalog loads script.js");
check(rootCss.includes("@media (max-width: 640px)"), "root catalog has mobile breakpoint");
check(rootCss.includes("prefers-reduced-motion"), "root catalog respects reduced motion");
check(rootJs.includes("matchesQuery"), "root catalog supports search");
check(rootJs.includes("renderDetails"), "root catalog supports detail panel");

for (const token of ['id="ambient-canvas"', 'id="motion-intensity-toggle"', 'id="intro-curtain"', 'id="app-grid"', 'id="signal-grid"', 'id="contact-form"']) {
  check(publicHtml.includes(token), `full-stack frontend includes ${token}`);
}

for (const token of ['id="cinematic"', 'id="cinematic-program-grid"', 'id="cinematic-budget-list"']) {
  check(publicHtml.includes(token), `cinematic frontend includes ${token}`);
}

for (const token of ['id="archive"', 'id="archive-summary"', 'id="archive-map"', 'id="archive-next-list"']) {
  check(publicHtml.includes(token), `archive intelligence frontend includes ${token}`);
}

for (const token of ['id="promotion"', 'id="promotion-summary"', 'id="promotion-board"', 'id="promotion-readiness-list"']) {
  check(publicHtml.includes(token), `zip promotion lab frontend includes ${token}`);
}

for (const token of ['id="decisions"', 'id="decision-summary"', 'id="decision-board"', 'id="decision-principles-list"']) {
  check(publicHtml.includes(token), `decision queue frontend includes ${token}`);
}

for (const token of ['id="motion"', 'id="motion-summary"', 'id="motion-token-grid"', 'id="motion-rules-list"']) {
  check(publicHtml.includes(token), `motion token frontend includes ${token}`);
}

for (const token of ['id="accessibility"', 'id="accessibility-summary"', 'id="accessibility-grid"', 'id="accessibility-rules-list"', 'id="accessibility-blocked-list"']) {
  check(publicHtml.includes(token), `accessibility affordance frontend includes ${token}`);
}

for (const token of ['id="experience"', 'id="experience-summary"', 'id="experience-grid"', 'id="experience-watch-list"', 'id="experience-release-rule"']) {
  check(publicHtml.includes(token), `experience scorecard frontend includes ${token}`);
}

for (const token of ['id="gaps"', 'id="gap-summary"', 'id="gap-board"', 'id="gap-rules-list"']) {
  check(publicHtml.includes(token), `gap closure frontend includes ${token}`);
}

for (const token of ['id="development"', 'id="development-refresh"', 'id="development-summary"', 'id="development-checks"', 'id="development-command-list"', 'id="development-copy-status"', 'id="development-rule-list"']) {
  check(publicHtml.includes(token), `development mode frontend includes ${token}`);
}

for (const token of ['id="stewardship"', 'id="stewardship-summary"', 'id="stewardship-preferred-list"', 'id="stewardship-blocked-list"', 'id="stewardship-rules-list"', 'id="stewardship-stop-condition"']) {
  check(publicHtml.includes(token), `weekly usage stewardship frontend includes ${token}`);
}

check(publicCss.includes("prefers-reduced-motion"), "full-stack frontend respects reduced motion");
check(publicCss.includes("spatial-drift"), "full-stack frontend includes cinematic spatial depth");
check(publicCss.includes("data-motion-intensity"), "full-stack frontend includes heavy motion intensity mode");
check(publicCss.includes("cinematic-sweep"), "full-stack frontend includes heavy cinematic sweep");
check(publicCss.includes("section-reveal"), "full-stack frontend includes section reveal motion");
check(publicCss.includes("archive-card"), "full-stack frontend includes archive intelligence cards");
check(publicCss.includes("promotion-card"), "full-stack frontend includes zip promotion cards");
check(publicCss.includes("decision-card"), "full-stack frontend includes decision queue cards");
check(publicCss.includes("motion-token-card"), "full-stack frontend includes motion token cards");
check(publicCss.includes("accessibility-card"), "full-stack frontend includes accessibility affordance cards");
check(publicCss.includes("experience-card"), "full-stack frontend includes experience scorecard cards");
check(publicCss.includes("gap-card"), "full-stack frontend includes gap closure cards");
check(publicCss.includes("development-card"), "full-stack frontend includes development mode cards");
check(publicCss.includes("stewardship-card"), "full-stack frontend includes weekly usage stewardship cards");
check(publicCss.includes("copy-command-button"), "full-stack frontend includes command copy controls");
check(publicCss.includes("refresh-status-button"), "full-stack frontend includes status refresh controls");
check(publicJs.includes("/api/apps"), "full-stack frontend loads app API");
check(publicJs.includes("setupMotionIntensityControl"), "full-stack frontend supports motion intensity control");
check(publicJs.includes("setupSectionReveals"), "full-stack frontend supports section reveal motion");
check(publicJs.includes("setupCinematicParallax"), "full-stack frontend supports cinematic parallax");
check(publicJs.includes("/api/cinematic-program"), "full-stack frontend loads cinematic program API");
check(publicJs.includes("/api/archive-insights"), "full-stack frontend loads archive insights API");
check(publicJs.includes("/api/zip-promotion-lab"), "full-stack frontend loads zip promotion lab API");
check(publicJs.includes("/api/decision-queue"), "full-stack frontend loads decision queue API");
check(publicJs.includes("/api/motion-tokens"), "full-stack frontend loads motion token API");
check(publicJs.includes("/api/accessibility-affordances"), "full-stack frontend loads accessibility affordance API");
check(publicJs.includes("/api/experience-scorecard"), "full-stack frontend loads experience scorecard API");
check(publicJs.includes("/api/gap-closure-register"), "full-stack frontend loads gap closure API");
check(publicJs.includes("/api/development-mode"), "full-stack frontend loads development mode API");
check(publicJs.includes("/api/weekly-usage-stewardship"), "full-stack frontend loads weekly usage stewardship API");
check(publicJs.includes("setupDevelopmentCommandCopy"), "full-stack frontend supports development command copy");
check(publicJs.includes("setupDevelopmentRefresh"), "full-stack frontend supports development status refresh");
check(publicJs.includes("/api/contact"), "full-stack frontend posts contact API");

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
  check(server.includes(route), `server includes ${route}`);
}

check(Array.isArray(data.apps) && data.apps.length >= 5, "app registry has at least five apps");
check(
  data.apps.every((app) => app.id && app.title && app.name && app.category && app.summary),
  "app records keep root and full-stack compatibility fields"
);

if (failures > 0) {
  process.exit(1);
}
