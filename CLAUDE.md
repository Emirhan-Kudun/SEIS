# SEIS Portfolio — Claude Code Operating Instructions

## Identity

This is the premium portfolio runtime for the SEIS ecosystem. It renders Emirhan Kudun's work as a cinematic, minimal, accessible digital surface.

Tech stack: **Next.js** (`apps/site-next`) + **Vite/React** (`apps/site-vite`) + static fallback (`apps/static-fallback`). Shared content lives in `packages/content`, shared runtime utilities in `packages/runtime`.

Operate with calm, modular, high-efficiency principles — cinematic design, premium UI/UX, cognitive sustainability, and humane interaction.

---

## Core Priorities

- Clarity, maintainability, accessibility, rollback safety, compositional quality
- Humane UX, calm technology, cognitive sustainability, emotional balance
- Performance efficiency, modular architecture
- Proportional orchestration: small tasks stay lightweight, large tasks become phased updates

---

## Design & Motion Philosophy

- Cinematic minimalism, editorial hierarchy, restrained elegance, whitespace intelligence
- Calm interaction pacing, premium typography, spatial harmony, emotionally sustainable interfaces
- Always support `prefers-reduced-motion` — never animate without a reduced-motion fallback
- Avoid excessive animation, GPU-expensive effects on mobile, psychological overstimulation

---

## Repository Structure

```
emirhan-kudun-portfolio/
├── apps/
│   ├── site-next/        # Next.js app (primary)
│   ├── site-vite/        # Vite/React app
│   └── static-fallback/  # Static HTML fallback
├── packages/
│   ├── content/          # Shared content schema and data
│   └── runtime/          # Shared utilities and runtime helpers
├── scripts/              # Build, deploy, and check scripts
└── sources/              # Source materials
```

---

## Development Commands

```bash
# Dev servers
npm run dev:next    # Next.js dev server
npm run dev:vite    # Vite dev server

# Build
npm run build

# Type checking (run this before committing)
npm run typecheck

# Linting
npm run lint

# Content validation
npm run check:content
npm run check:runtime
npm run check:source-boundaries
```

---

## Test Improvement Areas

The current setup only has `typecheck` and `lint`. There are no automated tests. The following areas need dedicated testing.

### 1. Test Runner — Not Configured

**Problem:** No test script exists. `npm test` does nothing.

**Priority action:**
- Add Vitest to the workspace: `npm install -D vitest @vitejs/plugin-react`
- Add a root `"test": "vitest run"` script in `package.json`
- Add `"test:watch": "vitest"` for development

### 2. Content Schema Tests — Not Covered

**Problem:** `packages/content` defines content schemas and data, but nothing validates that the data matches the schema at test time.

**Priority action:**
- Add [zod](https://zod.dev) validation tests in `packages/content`
- Write a test that imports every content file and validates it against its schema
- This catches broken content before deploy

### 3. Runtime Utility Tests — Not Covered

**Problem:** `packages/runtime` has shared utilities with no tests.

**Priority action:**
- Add Vitest unit tests for each utility function in `packages/runtime/src/`
- Tests live next to source: `packages/runtime/src/formatDate.test.ts`

### 4. Accessibility Tests — Not Covered

**Problem:** Accessibility is a core value but has zero automated enforcement.

**Priority action:**
- Add [Playwright](https://playwright.dev) with `@axe-core/playwright`
- Run axe assertions on the homepage and key portfolio sections
- Assert zero critical accessibility violations in CI

### 5. Reduced-Motion Behavior Tests — Not Covered

**Problem:** The site must support `prefers-reduced-motion` but this is never verified automatically.

**Priority action:**
- Add Playwright tests that simulate `prefers-reduced-motion: reduce`
- Assert that CSS animation classes are toggled correctly in both modes

### 6. Route/Page Render Tests — Not Covered

**Problem:** Neither the Next.js app nor the Vite app has render tests.

**Priority action:**
- Add Playwright e2e tests that verify each page loads, renders a headline, and passes axe
- Add snapshot tests for critical UI sections using Vitest + `@testing-library/react`

### 7. CI Pipeline — No Test Stage

**Problem:** No GitHub Actions workflow runs tests on push or PR.

**Priority action:**
- Add a workflow that runs `npm run typecheck && npm run lint && npm test` on every push and PR
- Block merges to `main` if any check fails

---

## Adding Tests — Rules for This Repo

1. **Test behavior, not implementation.** Assert rendered content and DOM state.
2. **Accessibility always.** Every page must have an axe assertion in the e2e suite.
3. **Reduced-motion always.** Every animated component must be tested in both motion modes.
4. **Use Vitest for units, Playwright for e2e.** Do not mix test frameworks.
5. **Tests live next to source.** Unit and integration tests should live next to the source files (not in a top-level `__tests__/` folder). E2E tests should live in a dedicated `e2e/` directory within each app.
6. **Content tests are not optional.** Broken content data must fail CI before deploy.

---

## Git Workflow

- Main branch is sacred — never push directly to `main` without a PR.
- Run `npm run typecheck && npm run lint` before every commit.
- Run `npm run github:preflight` before pushing to remote to run all preflight validations locally.
- Once tests exist: run `npm test` before every commit.
- Prefer small, scoped commits: content update, style fix, and feature work stay separate.
- Experimental or risky work must use isolated branches.

---

## Security

- No API keys, tokens, credentials, or `.env` contents in commits or generated files.
- Validate external inputs at system boundaries.
- Do not embed personal data in static output.
