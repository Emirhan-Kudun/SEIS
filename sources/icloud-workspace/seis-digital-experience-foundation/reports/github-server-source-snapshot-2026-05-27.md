# SEIS Digital Experience Foundation Source Snapshot - 2026-05-27

Canonical iCloud checkout: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/seis-digital-experience-foundation`

Branch: `UIXAppTTR`

This snapshot mirrors the current low-pressure workspace loop for GitHub server visibility while local git push waits for GitHub CLI authentication.

## README.md

```md
# UI-UX Digital Lab Workspace

This workspace is the operational core for a low-pressure, high-efficiency UI/UX
development loop.

## What Is Included

- governance-first automation scripts
- a lightweight cinematic web foundation
- a gap closure register
- release refresh support without dependency bloat

## Quick Start

` ` `bash
npm run automation:develop
` ` `

## Core Commands

` ` `bash
npm run check:workspace
npm run check:release-sync
npm run automation:refresh-release
npm run automation:publish-readiness
` ` `

## Safety Rules

- no automatic push
- no automatic deploy
- no heavy local process by default
- reduced-motion support is mandatory

```

## package.json

```json
{
  "name": "ui-ux-digital-lab-workspace",
  "version": "0.1.0",
  "private": true,
  "description": "Low-pressure AI-native creative engineering workspace.",
  "scripts": {
    "check:workspace": "node scripts/check-workspace.cjs",
    "check:release-sync": "node scripts/check-release-sync.cjs",
    "check:motion-evidence": "node scripts/check-motion-evidence.cjs",
    "check:mobile-ergonomics": "node scripts/check-mobile-ergonomics.cjs",
    "automation:develop": "node scripts/automation-develop.cjs",
    "automation:gap-sync": "node scripts/automation-gap-sync.cjs",
    "automation:refresh-release": "node scripts/automation-refresh-release.cjs",
    "automation:publish-readiness": "node scripts/automation-publish-readiness.cjs",
    "quality": "npm run check:workspace && npm run check:release-sync && npm run check:motion-evidence && npm run check:mobile-ergonomics"
  },
  "engines": {
    "node": ">=18"
  }
}

```

## data/gap-closure-register.json

```json
{
  "summary": {
    "gaps": 6,
    "ready": 5,
    "watch": 0,
    "blocked": 1,
    "mode": "small-reversible-slices"
  },
  "gaps": [
    {
      "id": "workspace-git-init",
      "label": "Workspace git foundation",
      "status": "ready",
      "priority": "P1",
      "surface": "governance",
      "impact": "Branch-aware checks are now available because the workspace is a git repository on UIXAppTTR.",
      "nextAction": "Keep branch policy visible and preserve non-destructive publish flow.",
      "closureMetric": "Publish readiness reports the expected UIXAppTTR branch.",
      "qualityCommands": [
        "npm run automation:publish-readiness"
      ],
      "rollback": "Keep source edits local and avoid remote operations."
    },
    {
      "id": "publish-auth",
      "label": "GitHub publication authentication",
      "status": "blocked",
      "priority": "P0",
      "surface": "shipment",
      "impact": "Remote publication remains unsafe while authentication and remote mapping are unresolved.",
      "nextAction": "Run gh auth login -h github.com and rerun publish readiness.",
      "closureMetric": "Publish readiness reports clean branch, remote visibility, and GitHub CLI authentication without auth blockers.",
      "qualityCommands": [
        "npm run automation:publish-readiness"
      ],
      "rollback": "Keep iCloud/local copy as source of truth until auth is valid."
    },
    {
      "id": "motion-evidence",
      "label": "Visual runtime evidence",
      "status": "ready",
      "priority": "P2",
      "surface": "motion",
      "impact": "Cinematic layering exists but needs repeatable review criteria.",
      "nextAction": "Keep motion evidence checks active before adding heavier cinematic layers.",
      "closureMetric": "Static motion evidence verifies reduced-motion, balanced, and cinematic hooks.",
      "qualityCommands": [
        "npm run check:motion-evidence"
      ],
      "rollback": "Lock to reduced motion defaults if instability appears."
    },
    {
      "id": "mobile-ergonomics",
      "label": "Mobile ergonomics",
      "status": "ready",
      "priority": "P1",
      "surface": "mobile",
      "impact": "Touch and layout stability still need periodic checks as sections grow.",
      "nextAction": "Keep mobile ergonomics checks active before adding denser sections.",
      "closureMetric": "Static mobile ergonomics verifies breakpoint, wrapping, touch sizing, and overflow guards.",
      "qualityCommands": [
        "npm run check:mobile-ergonomics"
      ],
      "rollback": "Reduce section density before adding new motion."
    },
    {
      "id": "accessibility-coverage",
      "label": "Accessibility and reduced motion coverage",
      "status": "ready",
      "priority": "P1",
      "surface": "accessibility",
      "impact": "The base experience can stay premium while preserving cognitive comfort.",
      "nextAction": "Keep reduced-motion checks active in every workspace quality pass.",
      "closureMetric": "check-workspace validates prefers-reduced-motion support in CSS and JS.",
      "qualityCommands": [
        "npm run check:workspace"
      ],
      "rollback": "Disable nonessential transitions and parallax."
    },
    {
      "id": "release-refresh",
      "label": "Release artifact freshness",
      "status": "ready",
      "priority": "P1",
      "surface": "release",
      "impact": "A stale release package creates drift between source and shipment.",
      "nextAction": "Refresh release folder only after source changes.",
      "closureMetric": "release/web contains current index, style, and script files.",
      "qualityCommands": [
        "npm run automation:refresh-release"
      ],
      "rollback": "Pause release refresh when source checks are failing."
    }
  ],
  "rules": [
    "Each gap must include priority, closureMetric, and at least one quality command.",
    "Blocked gaps must stop before remote push or deployment.",
    "Ready gaps can be implemented in one reversible slice.",
    "Watch gaps require periodic review and evidence logging."
  ]
}

```

## apps/web/index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="UI-UX Digital Lab is a calm SEIS workspace foundation for premium UI/UX systems, accessible motion, and low-pressure creative engineering.">
    <meta name="theme-color" content="#f3efe7">
    <meta name="color-scheme" content="light">
    <meta property="og:title" content="UI-UX Digital Lab">
    <meta property="og:description" content="A calm SEIS workspace foundation for premium UI/UX systems, accessible motion, and low-pressure creative engineering.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://emirhankudun-ux.github.io/UIX-Apps/">
    <meta name="twitter:card" content="summary">
    <title>UI-UX Digital Lab</title>
    <link rel="canonical" href="https://emirhankudun-ux.github.io/UIX-Apps/">
    <link rel="manifest" href="./manifest.webmanifest">
    <link rel="apple-touch-icon" href="./public/icons/apple-touch-icon.svg">
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="brand">UI-UX Digital Lab</div>
      <nav aria-label="Primary">
        <a href="#modes">Modes</a>
        <a href="#gaps">Gaps</a>
        <a href="#principles">Principles</a>
      </nav>
      <button id="motion-mode" class="mode-button" type="button" aria-pressed="true">
        Cinematic
      </button>
    </header>

    <main id="main">
      <section class="hero section-reveal is-visible" id="top">
        <div class="hero-copy">
          <p class="eyebrow">AI-native creative engineering</p>
          <h1>Calm systems with cinematic clarity.</h1>
          <p>
            A lightweight workspace for premium UI/UX production that protects accessibility,
            performance, and long-term maintainability.
          </p>
        </div>
        <div class="hero-panel">
          <h2>Operating Mode</h2>
          <p id="mode-label">Cinematic</p>
          <p id="mode-detail">Layered motion with reduced-motion fallback.</p>
        </div>
      </section>

      <section id="modes" class="section-reveal">
        <h2>Experience Modes</h2>
        <div class="mode-grid">
          <article>
            <h3>Minimal</h3>
            <p>Typography-first and low motion.</p>
          </article>
          <article>
            <h3>Balanced</h3>
            <p>Measured transitions and practical polish.</p>
          </article>
          <article>
            <h3>Cinematic</h3>
            <p>Layered reveals, depth, and optional intensity.</p>
          </article>
        </div>
      </section>

      <section id="gaps" class="section-reveal">
        <h2>Gap Closure Register</h2>
        <div id="gap-board" class="gap-grid" aria-live="polite"></div>
      </section>

      <section id="principles" class="section-reveal">
        <h2>Non-Negotiables</h2>
        <ul class="principle-list">
          <li>Accessibility before spectacle.</li>
          <li>Small reversible changes.</li>
          <li>Low machine pressure by default.</li>
          <li>Clear branch and publish governance.</li>
        </ul>
      </section>
    </main>

    <script src="./app.js" type="module"></script>
  </body>
</html>

```

## apps/web/styles.css

```css
:root {
  --bg: #f3efe7;
  --bg-soft: #ece5d8;
  --text: #17212a;
  --muted: #48505a;
  --line: rgba(23, 33, 42, 0.22);
  --teal: #2f6f73;
  --amber: #9a6a2f;
  --card: rgba(255, 255, 255, 0.64);
  --shadow: 0 14px 36px rgba(23, 33, 42, 0.12);
  --radius: 10px;
  --ease: cubic-bezier(0.23, 1, 0.32, 1);
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Avenir Next", "Satoshi", "Futura", "Trebuchet MS", sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at 8% 10%, rgba(47, 111, 115, 0.2), transparent 42%),
    radial-gradient(circle at 90% 0%, rgba(154, 106, 47, 0.2), transparent 36%),
    linear-gradient(140deg, var(--bg), var(--bg-soft));
  line-height: 1.55;
}

.skip-link {
  position: absolute;
  top: -200px;
  left: 0.75rem;
  z-index: 30;
  padding: 0.55rem 0.8rem;
  border-radius: 6px;
  color: #fff;
  background: #111;
}

.skip-link:focus {
  top: 0.75rem;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 15;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 0.95rem clamp(1rem, 4vw, 3rem);
  border-bottom: 1px solid var(--line);
  background: rgba(243, 239, 231, 0.86);
  backdrop-filter: blur(10px);
}

.brand {
  font-size: 0.96rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

nav a {
  color: var(--muted);
  text-decoration: none;
  font-weight: 600;
}

nav a:focus-visible,
.mode-button:focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 3px;
}

nav a:hover,
nav a:focus-visible {
  color: var(--text);
}

.mode-button {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  color: var(--text);
  padding: 0.45rem 0.85rem;
  min-height: 2.2rem;
  cursor: pointer;
}

main {
  padding: clamp(1rem, 3vw, 2rem) clamp(1rem, 5vw, 4rem) 4rem;
}

.hero {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: clamp(1rem, 3vw, 2rem);
  margin-bottom: 1.25rem;
}

.hero-copy h1 {
  margin: 0.3rem 0 0.8rem;
  font-family: "Bodoni Moda", "Didot", "Times New Roman", serif;
  font-size: clamp(2rem, 6vw, 4rem);
  line-height: 1.03;
}

.eyebrow {
  margin: 0;
  color: var(--teal);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.73rem;
  font-weight: 700;
}

.hero-panel,
.mode-grid article,
.gap-card,
.principle-list {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--card);
  box-shadow: var(--shadow);
}

.hero-panel {
  padding: 1.2rem;
}

section {
  margin-top: 1.2rem;
}

h2 {
  font-size: clamp(1.2rem, 3vw, 2rem);
  margin: 0 0 0.8rem;
}

.mode-grid,
.gap-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
}

.mode-grid article,
.gap-card {
  padding: 1rem;
}

.gap-card h3 {
  margin: 0.1rem 0 0.45rem;
  font-size: 1.1rem;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.chip {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  padding: 0.2rem 0.55rem;
  font-size: 0.72rem;
  color: var(--muted);
}

.status-ready {
  border-color: rgba(47, 111, 115, 0.45);
}

.status-watch {
  border-color: rgba(154, 106, 47, 0.55);
}

.status-blocked {
  border-color: rgba(133, 61, 37, 0.58);
}

.principle-list {
  margin: 0;
  padding: 1rem 1.1rem;
}

.principle-list li + li {
  margin-top: 0.4rem;
}

.section-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 560ms var(--ease),
    transform 560ms var(--ease);
}

.section-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

html[data-motion-mode="balanced"] .hero {
  transform: translateY(calc(var(--hero-shift, 0px) * 0.45));
}

html[data-motion-mode="cinematic"] .hero {
  transform: translateY(var(--hero-shift, 0px));
}

@media (max-width: 900px) {
  .site-header {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .hero,
  .mode-grid,
  .gap-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }

  .section-reveal {
    opacity: 1;
    transform: none;
  }
}

```

## apps/web/app.js

```js
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const state = { mode: "cinematic", gaps: [] };

function el(selector) {
  return document.querySelector(selector);
}

function create(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function getDefaultMode() {
  if (motionPreference.matches) return "reduced";
  return window.innerWidth < 900 ? "balanced" : "cinematic";
}

function applyMode(mode) {
  state.mode = motionPreference.matches ? "reduced" : mode;
  document.documentElement.dataset.motionMode = state.mode;

  const button = el("#motion-mode");
  const modeLabel = el("#mode-label");
  const modeDetail = el("#mode-detail");

  if (button) {
    const cinematic = state.mode === "cinematic";
    button.textContent = state.mode === "reduced" ? "Reduced" : cinematic ? "Cinematic" : "Balanced";
    button.setAttribute("aria-pressed", cinematic ? "true" : "false");
  }

  if (modeLabel) modeLabel.textContent = state.mode[0].toUpperCase() + state.mode.slice(1);
  if (modeDetail) {
    modeDetail.textContent =
      state.mode === "cinematic"
        ? "Layered motion with reduced-motion fallback."
        : state.mode === "balanced"
          ? "Calm transitions with lighter motion weight."
          : "Motion minimized for accessibility preference.";
  }
}

function setupParallax() {
  if (motionPreference.matches) return;

  let ticking = false;
  const update = () => {
    const shift = Math.min(window.scrollY * 0.065, 38);
    document.documentElement.style.setProperty("--hero-shift", `${-shift}px`);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    },
    { passive: true }
  );
}

function setupReveals() {
  const sections = Array.from(document.querySelectorAll(".section-reveal"));
  if (motionPreference.matches || !("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function renderGapBoard() {
  const board = el("#gap-board");
  if (!board) return;
  board.replaceChildren();

  state.gaps.forEach((gap) => {
    const card = create("article", `gap-card status-${gap.status}`);
    const chips = create("div", "chip-row");
    chips.append(
      create("span", "chip", gap.status),
      create("span", "chip", gap.priority),
      create("span", "chip", gap.surface)
    );

    const title = create("h3", "", gap.label);
    const impact = create("p", "", gap.impact);
    const action = create("p", "", `Next: ${gap.nextAction}`);
    card.append(chips, title, impact, action);
    board.append(card);
  });
}

async function loadGaps() {
  const response = await fetch("../../data/gap-closure-register.json");
  if (!response.ok) throw new Error(`gap register fetch failed: ${response.status}`);
  const payload = await response.json();
  state.gaps = payload.gaps || [];
}

function setupModeToggle() {
  const button = el("#motion-mode");
  if (!button) return;

  button.addEventListener("click", () => {
    const next = state.mode === "cinematic" ? "balanced" : "cinematic";
    applyMode(next);
  });
}

async function init() {
  applyMode(getDefaultMode());
  setupModeToggle();
  setupParallax();
  setupReveals();
  await loadGaps();
  renderGapBoard();
}

init().catch((error) => {
  const board = el("#gap-board");
  if (board) {
    board.replaceChildren(create("p", "", `Gap register unavailable: ${error.message}`));
  }
});

```

## scripts/check-workspace.cjs

```js
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = process.cwd();
const failures = [];

const requiredFiles = [
  "README.md",
  "package.json",
  "docs/governance/ui-ux-digital-lab-master-directive.md",
  "docs/governance/ui-ux-digital-lab-automation-brief.md",
  "docs/governance/full-efficiency-low-pressure-mode.md",
  "data/gap-closure-register.json",
  "apps/web/index.html",
  "apps/web/styles.css",
  "apps/web/app.js",
  "scripts/automation-develop.cjs",
  "scripts/automation-gap-sync.cjs",
  "scripts/automation-refresh-release.cjs",
  "scripts/automation-publish-readiness.cjs",
  "scripts/check-release-sync.cjs",
  "scripts/check-motion-evidence.cjs",
  "scripts/check-mobile-ergonomics.cjs"
];

function readText(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function ensure(condition, message) {
  if (!condition) failures.push(message);
}

for (const file of requiredFiles) {
  ensure(fs.existsSync(path.join(ROOT, file)), `Missing required file: ${file}`);
}

if (failures.length > 0) {
  console.error("Workspace check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

const data = JSON.parse(readText("data/gap-closure-register.json"));
const css = readText("apps/web/styles.css");
const js = readText("apps/web/app.js");
const html = readText("apps/web/index.html");

ensure(Array.isArray(data.gaps), "gap-closure-register must define gaps array.");
ensure(data.summary.gaps === data.gaps.length, "Gap summary count must match gap records.");
ensure(
  data.gaps.every(
    (gap) =>
      gap.id &&
      gap.status &&
      gap.priority &&
      gap.nextAction &&
      gap.closureMetric &&
      Array.isArray(gap.qualityCommands) &&
      gap.qualityCommands.length > 0
  ),
  "Every gap must include id, status, priority, nextAction, closureMetric, and qualityCommands."
);
ensure(css.includes("prefers-reduced-motion"), "styles.css must include reduced motion support.");
ensure(js.includes("prefers-reduced-motion"), "app.js must include reduced motion behavior.");
ensure(html.includes("id=\"motion-mode\""), "index.html must include motion mode control.");
ensure(html.includes("id=\"gap-board\""), "index.html must include gap board.");

const releaseSync = spawnSync("node", ["scripts/check-release-sync.cjs"], {
  cwd: ROOT,
  encoding: "utf8"
});
ensure(releaseSync.status === 0, "release/web must stay synchronized with apps/web (run npm run automation:refresh-release).");

const motionEvidence = spawnSync("node", ["scripts/check-motion-evidence.cjs"], {
  cwd: ROOT,
  encoding: "utf8"
});
ensure(motionEvidence.status === 0, "motion evidence checks must pass.");

const mobileErgonomics = spawnSync("node", ["scripts/check-mobile-ergonomics.cjs"], {
  cwd: ROOT,
  encoding: "utf8"
});
ensure(mobileErgonomics.status === 0, "mobile ergonomics checks must pass.");

if (failures.length > 0) {
  console.error("Workspace check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Workspace check passed.");

```

## scripts/check-release-sync.cjs

```js
const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const pairs = [
  ["apps/web/index.html", "release/web/index.html"],
  ["apps/web/styles.css", "release/web/styles.css"],
  ["apps/web/app.js", "release/web/app.js"]
];

const failures = [];

function abs(file) {
  return path.join(ROOT, file);
}

for (const [sourceRel, releaseRel] of pairs) {
  const source = abs(sourceRel);
  const release = abs(releaseRel);

  if (!fs.existsSync(source)) {
    failures.push(`Missing source file: ${sourceRel}`);
    continue;
  }

  if (!fs.existsSync(release)) {
    failures.push(`Missing release file: ${releaseRel}`);
    continue;
  }

  const sourceText = fs.readFileSync(source, "utf8");
  const releaseText = fs.readFileSync(release, "utf8");

  if (sourceText !== releaseText) {
    failures.push(`Release drift detected: ${releaseRel} is out of sync with ${sourceRel}`);
  }
}

if (failures.length > 0) {
  console.error("Release sync check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  console.error("- action: run npm run automation:refresh-release");
  process.exit(1);
}

console.log("Release sync check passed.");

```

## scripts/check-motion-evidence.cjs

```js
const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const failures = [];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function ensure(condition, message) {
  if (!condition) failures.push(message);
}

const html = read("apps/web/index.html");
const css = read("apps/web/styles.css");
const js = read("apps/web/app.js");

ensure(html.includes("id=\"motion-mode\""), "motion mode control must be present.");
ensure(html.includes("section-reveal"), "sections must use reveal hooks.");
ensure(css.includes("prefers-reduced-motion"), "CSS must include reduced-motion fallback.");
ensure(css.includes("data-motion-mode=\"cinematic\""), "CSS must include cinematic mode selector.");
ensure(css.includes("data-motion-mode=\"balanced\""), "CSS must include balanced mode selector.");
ensure(css.includes("transition:"), "CSS must define controlled transitions.");
ensure(js.includes("prefers-reduced-motion"), "JS must read reduced-motion preference.");
ensure(js.includes("getDefaultMode"), "JS must choose a device-aware default mode.");
ensure(js.includes("setupReveals"), "JS must wire section reveal behavior.");
ensure(js.includes("setupParallax"), "JS must wire bounded parallax behavior.");
ensure(js.includes("requestAnimationFrame"), "JS motion updates must be animation-frame bounded.");

if (failures.length > 0) {
  console.error("Motion evidence check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Motion evidence check passed.");

```

## scripts/check-mobile-ergonomics.cjs

```js
const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const failures = [];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function ensure(condition, message) {
  if (!condition) failures.push(message);
}

const html = read("apps/web/index.html");
const css = read("apps/web/styles.css");

ensure(html.includes("name=\"viewport\""), "HTML must define a responsive viewport.");
ensure(css.includes("@media (max-width: 900px)"), "CSS must include the mobile breakpoint.");
ensure(css.includes("grid-template-columns: 1fr"), "Mobile layout must collapse multi-column grids.");
ensure(css.includes("min-height: 2.2rem"), "Touch controls must keep a stable minimum height.");
ensure(css.includes("flex-wrap: wrap"), "Navigation and metadata chips must be allowed to wrap.");
ensure(css.includes("box-sizing: border-box"), "Layout sizing must stay predictable.");
ensure(!css.includes("letter-spacing: -"), "Negative letter spacing is not allowed in this foundation.");
ensure(!css.includes("100vw"), "Avoid 100vw surfaces that can create horizontal overflow.");

if (failures.length > 0) {
  console.error("Mobile ergonomics check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Mobile ergonomics check passed.");

```

## scripts/automation-gap-sync.cjs

```js
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = process.cwd();
const GAP_FILE = path.join(ROOT, "data", "gap-closure-register.json");

function run(command, args) {
  return spawnSync(command, args, {
    cwd: ROOT,
    encoding: "utf8"
  });
}

function isOk(result) {
  return result && result.status === 0;
}

function trimmed(stdout) {
  return String(stdout || "").trim();
}

function updateGap(gap, state) {
  const next = { ...gap };

  if (gap.id === "workspace-git-init") {
    next.status = state.gitInside ? "ready" : "blocked";
    next.nextAction = state.gitInside
      ? "Keep branch policy visible and preserve non-destructive publish flow."
      : "Initialize or attach this workspace to the intended repository root.";
    return next;
  }

  if (gap.id === "publish-auth") {
    next.status = state.publishReady ? "ready" : "blocked";
    next.nextAction = state.publishReady
      ? "Run bounded publish preflight and push only intended changes."
      : state.publishNextAction;
    return next;
  }

  if (gap.id === "accessibility-coverage") {
    next.status = state.workspaceCheckOk ? "ready" : "watch";
    next.nextAction = state.workspaceCheckOk
      ? "Keep reduced-motion checks active in every workspace quality pass."
      : "Fix workspace check failures before adding motion-heavy changes.";
    return next;
  }

  if (gap.id === "release-refresh") {
    next.status = state.releaseSyncOk ? "ready" : "watch";
    next.nextAction = state.releaseSyncOk
      ? "Refresh release folder only after source changes."
      : "Run npm run automation:refresh-release to remove source/release drift.";
    return next;
  }

  if (gap.id === "motion-evidence") {
    next.status = state.motionEvidenceOk ? "ready" : "watch";
    next.nextAction = state.motionEvidenceOk
      ? "Keep motion evidence checks active before adding heavier cinematic layers."
      : "Fix motion evidence check failures before expanding cinematic behavior.";
    next.closureMetric = "Static motion evidence verifies reduced-motion, balanced, and cinematic hooks.";
    next.qualityCommands = ["npm run check:motion-evidence"];
    return next;
  }

  if (gap.id === "mobile-ergonomics") {
    next.status = state.mobileErgonomicsOk ? "ready" : "watch";
    next.nextAction = state.mobileErgonomicsOk
      ? "Keep mobile ergonomics checks active before adding denser sections."
      : "Fix mobile ergonomics check failures before adding new controls.";
    next.closureMetric = "Static mobile ergonomics verifies breakpoint, wrapping, touch sizing, and overflow guards.";
    next.qualityCommands = ["npm run check:mobile-ergonomics"];
    return next;
  }

  return next;
}

function summarize(gaps, prevSummary) {
  const counts = { ready: 0, watch: 0, blocked: 0 };
  for (const gap of gaps) {
    if (gap.status in counts) counts[gap.status] += 1;
  }
  return {
    ...prevSummary,
    gaps: gaps.length,
    ready: counts.ready,
    watch: counts.watch,
    blocked: counts.blocked
  };
}

if (!fs.existsSync(GAP_FILE)) {
  console.error(`Gap register missing: ${GAP_FILE}`);
  process.exit(1);
}

const gitInside = isOk(run("git", ["rev-parse", "--is-inside-work-tree"]));
const branchName = gitInside ? trimmed(run("git", ["branch", "--show-current"]).stdout) : "";
const hasRemote = gitInside && trimmed(run("git", ["remote", "-v"]).stdout).length > 0;
const expectedBranch = branchName === "UIXAppTTR";
const ghResult = run("gh", ["auth", "status", "-h", "github.com"]);
const ghAvailable = !ghResult.error;
const ghAuth = hasRemote && ghAvailable && isOk(ghResult);

let publishNextAction = "Initialize or attach this workspace to the intended repository root.";
if (gitInside && !hasRemote) {
  publishNextAction = "Configure remote origin for the intended repository and rerun publish readiness.";
} else if (gitInside && hasRemote && !expectedBranch) {
  publishNextAction = "Switch to branch UIXAppTTR before publish preflight.";
} else if (gitInside && hasRemote && expectedBranch && !ghAvailable) {
  publishNextAction = "Install GitHub CLI in this environment and rerun publish readiness.";
} else if (gitInside && hasRemote && expectedBranch && !ghAuth) {
  publishNextAction = "Run gh auth login -h github.com and rerun publish readiness.";
}

const publishReady = gitInside && hasRemote && expectedBranch && ghAuth;
const workspaceCheckOk = isOk(run("node", ["scripts/check-workspace.cjs"]));
const releaseSyncOk = isOk(run("node", ["scripts/check-release-sync.cjs"]));
const motionEvidenceOk = isOk(run("node", ["scripts/check-motion-evidence.cjs"]));
const mobileErgonomicsOk = isOk(run("node", ["scripts/check-mobile-ergonomics.cjs"]));

const state = {
  gitInside,
  publishReady,
  publishNextAction,
  workspaceCheckOk,
  releaseSyncOk,
  motionEvidenceOk,
  mobileErgonomicsOk
};

const payload = JSON.parse(fs.readFileSync(GAP_FILE, "utf8"));
const nextGaps = payload.gaps.map((gap) => updateGap(gap, state));
const nextSummary = summarize(nextGaps, payload.summary || {});
const nextPayload = { ...payload, summary: nextSummary, gaps: nextGaps };

fs.writeFileSync(GAP_FILE, `${JSON.stringify(nextPayload, null, 2)}\n`);

console.log("Gap register synchronized.");
console.log(
  `- summary: ready=${nextSummary.ready}, watch=${nextSummary.watch}, blocked=${nextSummary.blocked}`
);
console.log(`- git: ${gitInside ? "connected" : "missing"}`);
console.log(`- publish: ${publishReady ? "ready" : "blocked"}`);

```

## scripts/automation-develop.cjs

```js
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports");
const REPORT_FILE = path.join(REPORT_DIR, "latest-development-report.md");
const GAP_FILE = path.join(ROOT, "data", "gap-closure-register.json");

function runNode(scriptPath) {
  return spawnSync("node", [scriptPath], {
    cwd: ROOT,
    encoding: "utf8"
  });
}

function runCheck() {
  return runNode("scripts/check-workspace.cjs");
}

function runGapSync() {
  return runNode("scripts/automation-gap-sync.cjs");
}

function runPublishReadiness() {
  return runNode("scripts/automation-publish-readiness.cjs");
}

function toTableRow(columns) {
  return `| ${columns.join(" | ")} |`;
}

function renderGapRows(gaps) {
  return gaps
    .map((gap) =>
      toTableRow([
        gap.id,
        gap.status,
        gap.priority,
        gap.surface,
        String(gap.nextAction).replace(/\|/g, "/")
      ])
    )
    .join("\n");
}

function codeFence(text) {
  const output = String(text || "").trim();
  return output.length > 0 ? output : "no output";
}

const gapSync = runGapSync();
const check = runCheck();
const publishReadiness = runPublishReadiness();
const gapRegister = JSON.parse(fs.readFileSync(GAP_FILE, "utf8"));
fs.mkdirSync(REPORT_DIR, { recursive: true });

const report = [
  "# UI-UX Digital Lab Development Report",
  "",
  `- Timestamp: ${new Date().toISOString()}`,
  `- Workspace: \`${ROOT}\``,
  `- Gap sync: ${gapSync.status === 0 ? "pass" : "fail"}`,
  `- Check status: ${check.status === 0 ? "pass" : "fail"}`,
  `- Publish readiness: ${publishReadiness.status === 0 ? "ready" : "blocked"}`,
  "",
  "## Gap Snapshot",
  "",
  toTableRow(["id", "status", "priority", "surface", "nextAction"]),
  toTableRow(["---", "---", "---", "---", "---"]),
  renderGapRows(gapRegister.gaps),
  "",
  "## Publish Preflight Output",
  "",
  "` ` `text",
  codeFence(publishReadiness.stdout),
  "` ` `",
  "",
  "## Gap Sync Output",
  "",
  "` ` `text",
  codeFence(gapSync.stdout),
  "` ` `",
  "",
  "## Guardrail Reminder",
  "",
  "- Keep changes small and reversible.",
  "- Separate auth/server blockers from source quality.",
  "- Avoid heavy local processes unless explicitly needed.",
  ""
].join("\n");

fs.writeFileSync(REPORT_FILE, report);

if (gapSync.status !== 0 || check.status !== 0) {
  process.stdout.write(gapSync.stdout || "");
  process.stderr.write(gapSync.stderr || "");
  process.stdout.write(check.stdout || "");
  process.stderr.write(check.stderr || "");
  console.error(`Report written: ${REPORT_FILE}`);
  process.exit(1);
}

console.log(`Development report written: ${REPORT_FILE}`);

```

## scripts/automation-refresh-release.cjs

```js
const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const sourceDir = path.join(ROOT, "apps", "web");
const releaseDir = path.join(ROOT, "release", "web");
const files = ["index.html", "styles.css", "app.js"];

if (!fs.existsSync(sourceDir)) {
  console.error("Source web directory is missing.");
  process.exit(1);
}

fs.mkdirSync(releaseDir, { recursive: true });

for (const file of files) {
  const source = path.join(sourceDir, file);
  const target = path.join(releaseDir, file);

  if (!fs.existsSync(source)) {
    console.error(`Missing source file: ${source}`);
    process.exit(1);
  }

  fs.copyFileSync(source, target);
}

console.log(`Release refreshed at ${releaseDir}`);

```

## scripts/automation-publish-readiness.cjs

```js
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const ROOT = process.cwd();

function git(args) {
  return spawnSync("git", args, {
    cwd: ROOT,
    encoding: "utf8"
  });
}

function print(line) {
  console.log(line);
}

const inside = git(["rev-parse", "--is-inside-work-tree"]);
if (inside.status !== 0) {
  print("Publish readiness: blocked");
  print("- reason: workspace is not a git working tree");
  print("- action: initialize or attach this directory to the intended repository");
  process.exit(1);
}

const branch = git(["branch", "--show-current"]);
const status = git(["status", "--short", "--branch"]);
const remote = git(["remote", "-v"]);

const branchName = (branch.stdout || "").trim();
const statusLine = (status.stdout || "").split("\n")[0] || "";
const hasRemote = Boolean((remote.stdout || "").trim());
const isExpectedBranch = branchName === "UIXAppTTR";
const ghAuth = spawnSync("gh", ["auth", "status", "-h", "github.com"], {
  cwd: ROOT,
  encoding: "utf8"
});
const ghAvailable = !ghAuth.error;
const authReady = hasRemote && ghAvailable && ghAuth.status === 0;

print("Publish readiness: report");
print(`- branch: ${branchName || "unknown"}`);
print(`- branch status: ${statusLine || "unknown"}`);
print(`- remote configured: ${hasRemote ? "yes" : "no"}`);
print(`- expected branch (UIXAppTTR): ${isExpectedBranch ? "yes" : "no"}`);
print(`- gh cli available: ${ghAvailable ? "yes" : "no"}`);
print(`- github auth: ${authReady ? "ready" : "missing"}`);

if (!hasRemote) {
  print("- blocker: git remote is not configured");
  process.exit(1);
}

if (!isExpectedBranch) {
  print("- blocker: active branch is not UIXAppTTR");
  process.exit(1);
}

if (!ghAvailable) {
  print("- blocker: GitHub CLI is not available in this environment");
  process.exit(1);
}

if (!authReady) {
  print("- blocker: GitHub CLI auth is missing");
  print("- action: run gh auth login -h github.com");
  process.exit(1);
}

print("- result: ready for bounded publish preflight");

```

## reports/latest-development-report.md

```md
# UI-UX Digital Lab Development Report

- Timestamp: 2026-05-27T17:28:54.244Z
- Workspace: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/seis-digital-experience-foundation`
- Gap sync: pass
- Check status: pass
- Publish readiness: blocked

## Gap Snapshot

| id | status | priority | surface | nextAction |
| --- | --- | --- | --- | --- |
| workspace-git-init | ready | P1 | governance | Keep branch policy visible and preserve non-destructive publish flow. |
| publish-auth | blocked | P0 | shipment | Run gh auth login -h github.com and rerun publish readiness. |
| motion-evidence | ready | P2 | motion | Keep motion evidence checks active before adding heavier cinematic layers. |
| mobile-ergonomics | ready | P1 | mobile | Keep mobile ergonomics checks active before adding denser sections. |
| accessibility-coverage | ready | P1 | accessibility | Keep reduced-motion checks active in every workspace quality pass. |
| release-refresh | ready | P1 | release | Refresh release folder only after source changes. |

## Publish Preflight Output

` ` `text
Publish readiness: report
- branch: UIXAppTTR
- branch status: ## UIXAppTTR
- remote configured: yes
- expected branch (UIXAppTTR): yes
- gh cli available: yes
- github auth: missing
- blocker: GitHub CLI auth is missing
- action: run gh auth login -h github.com
` ` `

## Gap Sync Output

` ` `text
Gap register synchronized.
- summary: ready=5, watch=0, blocked=1
- git: connected
- publish: blocked
` ` `

## Guardrail Reminder

- Keep changes small and reversible.
- Separate auth/server blockers from source quality.
- Avoid heavy local processes unless explicitly needed.

```

