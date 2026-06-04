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

for (const token of ['id="ambient-canvas"', 'id="app-grid"', 'id="signal-grid"', 'id="contact-form"']) {
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

check(publicCss.includes("prefers-reduced-motion"), "full-stack frontend respects reduced motion");
check(publicCss.includes("spatial-drift"), "full-stack frontend includes cinematic spatial depth");
check(publicCss.includes("archive-card"), "full-stack frontend includes archive intelligence cards");
check(publicCss.includes("promotion-card"), "full-stack frontend includes zip promotion cards");
check(publicJs.includes("/api/apps"), "full-stack frontend loads app API");
check(publicJs.includes("/api/cinematic-program"), "full-stack frontend loads cinematic program API");
check(publicJs.includes("/api/archive-insights"), "full-stack frontend loads archive insights API");
check(publicJs.includes("/api/zip-promotion-lab"), "full-stack frontend loads zip promotion lab API");
check(publicJs.includes("/api/contact"), "full-stack frontend posts contact API");

for (const route of [
  "/api/health",
  "/api/apps",
  "/api/manifest",
  "/api/governance",
  "/api/cinematic-program",
  "/api/archive-insights",
  "/api/zip-promotion-lab",
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
