import { existsSync, readFileSync } from "node:fs";

const failures = [];

const files = {
  html: "apps/web/index.html",
  css: "apps/web/styles.css",
  js: "apps/web/app.js",
  capabilityMap: "content/development/plugin-skill-capability-map.json",
  gaps: "data/gap-closure-register.json",
  cinematicEngine: "content/lab/cinematic-engine.json",
  qualityConsole: "content/lab/quality-console.json"
};

for (const file of Object.values(files)) {
  if (!existsSync(file)) {
    failures.push(`missing required cinematic engine file: ${file}`);
  }
}

const html = read(files.html);
const css = read(files.css);
const js = read(files.js);
const capabilityMap = readJson(files.capabilityMap);
const gaps = readJson(files.gaps);
const cinematicEngine = readJson(files.cinematicEngine);
const qualityConsole = readJson(files.qualityConsole);

const htmlRequirements = [
  ["data-cinematic-field", "cinematic canvas field"],
  ["id=\"capability-board\"", "capability board"],
  ["id=\"command-board\"", "command board"],
  ["id=\"quality-board\"", "quality board"],
  ["id=\"threshold-board\"", "threshold board"],
  ["data-capability-filter=\"guarded\"", "guarded capability filter"],
  ["data-capability-filter=\"blocked\"", "blocked capability filter"],
  ["class=\"asset-strip\"", "curated asset strip"],
  ["class=\"intro-loader\"", "loading intro"],
  ["id=\"motion-mode\"", "motion mode toggle"],
  ["id=\"gap-board\"", "gap board"]
];

for (const [needle, label] of htmlRequirements) {
  if (!html.includes(needle)) {
    failures.push(`index.html must include ${label}`);
  }
}

const cssRequirements = [
  ["prefers-reduced-motion", "reduced-motion media query"],
  ["data-motion-mode=\"cinematic\"", "cinematic mode selector"],
  ["data-motion-mode=\"balanced\"", "balanced mode selector"],
  ["data-motion-mode=\"reduced\"", "reduced mode selector"],
  ["@media (max-width: 900px)", "tablet/mobile breakpoint"],
  ["grid-template-columns: 1fr", "single-column mobile collapse"],
  ["min-height: 44px", "touch target floor"],
  ["backdrop-filter", "glass depth treatment"]
];

for (const [needle, label] of cssRequirements) {
  if (!css.includes(needle)) {
    failures.push(`styles.css must include ${label}`);
  }
}

const jsRequirements = [
  ["prefers-reduced-motion", "reduced-motion query"],
  ["requestAnimationFrame", "animation-frame bounded motion"],
  ["setupCinematicField", "cinematic canvas initializer"],
  ["setupCapabilityFilters", "capability filter initializer"],
  ["loadCapabilities", "capability map loader"],
  ["loadCinematicEngine", "cinematic engine loader"],
  ["renderCommands", "command deck renderer"],
  ["loadQualityConsole", "quality console loader"],
  ["renderQualityConsole", "quality console renderer"],
  ["fallbackCapabilities", "capability fallback data"],
  ["Promise.allSettled", "resilient parallel content loading"],
  ["document.visibilityState", "visibility-aware animation pause"]
];

for (const [needle, label] of jsRequirements) {
  if (!js.includes(needle)) {
    failures.push(`app.js must include ${label}`);
  }
}

if (!Array.isArray(capabilityMap?.capabilities) || capabilityMap.capabilities.length < 10) {
  failures.push("capability map must provide at least ten capability families for the website engine");
}

if (!Array.isArray(gaps?.gaps) || gaps.gaps.length < 6) {
  failures.push("gap register must provide at least six gap records for the website engine");
}

if (!Array.isArray(cinematicEngine?.commandDeck) || cinematicEngine.commandDeck.length < 4) {
  failures.push("cinematic engine data must provide at least four command deck records");
}

if (cinematicEngine?.branch !== "UIXAppTTR") {
  failures.push("cinematic engine data must remain attached to UIXAppTTR");
}

if (!Array.isArray(qualityConsole?.signals) || qualityConsole.signals.length < 4) {
  failures.push("quality console must provide at least four quality signals");
}

if (!Array.isArray(qualityConsole?.thresholds) || qualityConsole.thresholds.length < 3) {
  failures.push("quality console must provide at least three thresholds");
}

if (qualityConsole?.branch !== "UIXAppTTR") {
  failures.push("quality console data must remain attached to UIXAppTTR");
}

if (css.includes("letter-spacing: -")) {
  failures.push("cinematic engine must not use negative letter spacing");
}

if (css.includes("100vw")) {
  failures.push("cinematic engine must avoid 100vw overflow-prone surfaces");
}

if (failures.length > 0) {
  console.error("Cinematic website engine check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  capabilityFamilies: capabilityMap.capabilities.length,
  gaps: gaps.gaps.length,
  commandDeck: cinematicEngine.commandDeck.length,
  qualitySignals: qualityConsole.signals.length,
  surfaces: ["hero", "engine", "command", "quality", "capabilities", "assets", "gaps", "principles"]
}, null, 2));

function read(file) {
  if (!existsSync(file)) return "";
  return readFileSync(file, "utf8");
}

function readJson(file) {
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8"));
}
