# SEIS — Claude Code Operating Instructions

## Identity

SEIS (Software Engineering Intelligence System) is a humane digital ecosystem focused on cinematic design, premium UI/UX, modular software engineering, scalable repository governance, calm technology, humane interaction systems, cognitive sustainability, emotionally intelligent interfaces, and sustainable digital environments.

Operate as a calm, modular, high-efficiency AI-native creative-engineering civilization system.

---

## Core Priorities

- Clarity, maintainability, accessibility, scalability, rollback safety, compositional quality
- Humane UX, cognitive sustainability, emotional balance, calm technology
- Performance efficiency, modular architecture, observability awareness
- Proportional orchestration: small tasks stay lightweight, large tasks become phased architecture-aware updates
- High-efficiency / low-power mode: avoid unnecessary indexing, heavy validation loops, broad tool activation, dependency bloat

---

## Design Philosophy

- Cinematic minimalism, editorial hierarchy, restrained elegance
- Whitespace intelligence, atmospheric clarity, calm interaction pacing
- Premium typography and spatial harmony
- Emotionally sustainable interfaces

## Motion Philosophy

- Restrained cinematic movement, smooth transitions, subtle depth, calm pacing
- Always support `prefers-reduced-motion` and an explicit low-motion mode
- Avoid excessive animation, visual chaos, psychological overstimulation, and GPU-expensive effects on mobile

## Engineering Philosophy

- Keep systems maintainable, explainable, accessible, observable, and rollback-safe
- Main branch is sacred; risky work belongs on isolated branches
- Legacy files must be analyzed before migration — never copy them directly into the clean app surface
- Documentation is part of system integrity

---

## Repository Structure

```
SEIS/
├── apps/
│   ├── web/          # Vanilla JS/HTML/CSS — primary delivery surface
│   ├── fullstack/    # Full-stack app surface
│   ├── android/      # Android surface
│   └── macos/        # macOS surface
├── packages/
│   ├── core/         # Shared logic and utilities
│   ├── ui/           # Shared UI components
│   ├── data/         # Data layer
│   ├── design-tokens/
│   └── asset-registry/
├── scripts/          # Governance and quality check scripts
├── content/          # JSON registry files (marketplace, plugins, etc.)
├── data/             # Gap closure register and runtime data
├── docs/             # Governance documentation
└── .claude/          # Claude commands and skills
```

---

## Development Commands

```bash
# Quality gate (run before every commit)
npm run quality

# Individual checks
npm run check:workspace
npm run check:foundation
npm run check:release-sync
npm run check:cloud-environment
npm run check:motion-evidence
npm run check:mobile-ergonomics
npm run check:software-languages
npm run check:server-target
npm run check:monthly-branch-hardening
npm run check:trusted-marketplace-intake
npm run check:seis-trusted-marketplace-plugin
npm run check:connector-activation-report
npm run check:server-cloud-report
npm run check:seis-evolution-model
npm run check:github-remote-configuration
npm run check:publish-gate-contract
```

---

## Test Improvement Areas

The current `check:*` scripts verify structural integrity and governance (files exist, JSON schemas are valid, release sync is current). They are not behavioral tests. The following areas need dedicated testing.

### 1. Unit Test Framework — Not Yet Added

**Problem:** `packages/core` and `packages/ui` have zero tests. No test runner (Jest, Vitest) is configured anywhere.

**Priority action:**
- Add [Vitest](https://vitest.dev) to `packages/core` and `packages/ui`
- Write unit tests for any utility functions exported from `packages/core`
- Write component-level tests for anything exported from `packages/ui`
- Add a root-level `test` script: `"test": "vitest run --reporter=verbose"`

### 2. Reduced-Motion Behavior Tests — Partially Covered

**Problem:** `check:motion-evidence` only checks that the keyword `prefers-reduced-motion` appears in source files. It does not verify that the behavior is correct at runtime.

**Priority action:**
- Add Playwright tests that simulate `prefers-reduced-motion: reduce` and assert that animations are disabled/skipped
- Test that the manual `#motion-mode` toggle in `apps/web/index.html` correctly applies low-motion classes

### 3. Accessibility Tests — Not Covered

**Problem:** Accessibility is a stated core value but has zero automated enforcement.

**Priority action:**
- Install `@axe-core/playwright` alongside Playwright
- Run axe on every primary page/route as part of the e2e suite
- Assert zero critical accessibility violations in CI

### 4. Marketplace & Plugin Data Integrity Tests — Partially Covered

**Problem:** `check:trusted-marketplace-intake` verifies JSON structure but does not test rendering or data-driven behavior in `apps/web/app.js`.

**Priority action:**
- Add Playwright tests that load `apps/web/index.html` (or the served app) and assert:
  - `#plugins` section renders at least one plugin card
  - `#marketplace` section renders channel and source data
  - `renderMarketplace` and `renderPublishGate` produce non-empty DOM

### 5. Content Schema Validation Tests — Not Covered

**Problem:** JSON files in `content/development/` have no automated schema validation beyond what check scripts perform.

**Priority action:**
- Use [zod](https://zod.dev) or [ajv](https://ajv.js.org) to validate JSON against declared schemas
- Add a `test:schema` script that validates all registry files before deploy

### 6. CI Pipeline — No Test Stage

**Problem:** `.github/` workflows do not include a dedicated test stage.

**Priority action:**
- Add a GitHub Actions workflow that runs `npm run quality && npm test` on every push to `main` and on every PR
- Block merges if quality or tests fail

---

## Adding Tests — Rules for This Repo

When writing tests for SEIS, follow these rules:

1. **Test behavior, not implementation.** Assert outputs and DOM state, not internal function calls.
2. **Keep tests calm.** No flaky timeouts, no network calls in unit tests, no large fixture files.
3. **Accessibility always.** Every new page or component must have a corresponding axe assertion.
4. **Reduced-motion always.** Any animation-related component must have a test in both motion modes.
5. **Use Vitest for units, Playwright for e2e.** Do not mix test frameworks.
6. **Tests live next to source.** `packages/core/src/utils.test.ts`, not a top-level `__tests__/` folder.

---

## Contributors & AI Partners

SEIS is built with a multi-firm AI-native workflow. Each assistant has a defined role.

| Firm / Tool | Product | Role in SEIS |
|---|---|---|
| **Anthropic** | Claude Code, Claude API | Deep code reasoning, refactors, architecture review, bug analysis, test writing, high-risk implementation review |
| **OpenAI** | Codex, GPT-4o, ChatGPT | Primary language and reasoning layer for local repo work, terminal tasks, Git flow, Turkish/English synthesis, durable planning |
| **Google** | Gemini CLI, Gemini Code Assist | Broad-context reading, documentation synthesis, research-heavy tasks, Google ecosystem workflows |
| **GitHub / Microsoft** | Copilot, Actions, MCP | Inline suggestions, CI/CD orchestration, repository automation |
| **OpenCode / Aider** | Aider, OpenCode | Scoped implementation partner, fast patch generator, second opinion |
| **Qwen / Alibaba** | Qwen Code | Supplementary code generation, polyglot support |
| **Meta / Community** | Llama / Ollama | Offline drafts, private local notes, lightweight summaries, experiments — never canonical |

**Collaboration rules:**
- Keep exactly one assistant in **writer mode** at a time. Others operate as reviewers, researchers, or planners.
- Before switching writer role between assistants, inspect `git status`, summarize active changes, and preserve unrelated work.
- Do not let assistants overwrite each other's edits without a human-readable handoff note or a clean Git diff review.
- Never place API keys, tokens, private credentials, or `.env` contents into prompts, commits, or agent handoff files.

## AI Handoff Workflow

1. Start with a short objective, affected paths, expected output, and acceptance checks.
2. Let one assistant implement, then ask a different assistant to review only the resulting diff.
3. Validate with the lightest reliable checks first, then scale testing only when the blast radius justifies it.
4. Record durable operating decisions in `docs/` instead of leaving them only in chat history.
5. When uncertain, name the uncertainty, gather local evidence, and avoid broad speculative rewrites.

---

## Git Workflow

- Main branch is sacred — never push directly to `main` without a PR review.
- Prefer small commits with clear scope: install/setup, governance-doc, feature, fix — keep these separate.
- Risky work (broad refactors, generated assets, dependency changes, experiments) must use isolated branches.
- Run `npm run quality` before every commit.

## iCloud Workspace

- Treat `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github` as the canonical SEIS workspace root.
- Before merging root workspace material, follow `docs/governance/icloud-github-workspace-ingestion.md`.
- Do not bulk-import archives, personal media, `.DS_Store`, nested `.git` directories, or symlink mirrors.

---

## Security

- No API keys, tokens, credentials, or `.env` contents in commits, logs, generated docs, or agent handoff files.
- Validate all external inputs at system boundaries.
- Follow OWASP Top 10 for any server-side code.
