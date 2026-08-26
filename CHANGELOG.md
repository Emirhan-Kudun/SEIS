# Changelog

All notable changes to SEIS are recorded here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); SEIS uses date-stamped
entries rather than semantic versions while the ecosystem is pre-1.0.

## [Unreleased]

### Added

- **Technology registry surfaced as a real cockpit panel.** Following up on
  the technology-registry addition below: `apps/web/cockpit.html` gains a
  seventh panel, "Technology registry," rendering the same seven real
  entries from `apps/fullstack/technology-registry.json` (name, domain,
  maturity badge) plus its honesty disclaimer (4 of 16 domains covered,
  and why). `scripts/create-cockpit-status.mjs` now also reads the
  technology registry and includes it in the generated
  `apps/web/src/data/cockpit-status.js` / `apps/android/SEISMobile/src/data/status.json`
  bundles. Screenshot-verified with a real headless Chromium render (not
  just log output): the panel renders correctly, matches the existing
  panels' visual style, and produced zero console errors.

- **Technology registry — scoped honestly to what actually exists.** A
  product brief circulated proposing SEIS as a "Full Technology Edition"
  spanning a game engine, Digital Human engine, robotics, aerospace, and
  quantum computing, organized under a canonical Technology/Capability/Tool
  Registry. None of those subsystems exist in this repository. Rather than
  fabricate placeholder entries for them, adopted the registry *pattern*
  scoped to what's real today: new `apps/fullstack/technology-registry.json`
  catalogs SEIS's seven actual internal components (both desktop shells,
  the web cockpit, the icon-governance system, the app-shell-contract
  validator, the plugin-capability catalog, the backend state model), each
  with the brief's requested fields (domain, maturity, implementation
  class, provenance, tests, rollback, etc.), filled honestly — several
  `tests`/`benchmarks` fields say "None yet" because that's true. New
  `scripts/check-technology-registry.mjs` (wired into `npm run
  check:technology-registry` and `check:governance`) enforces required
  fields, enum membership, real provenance paths, and — the key
  anti-fabrication gate — that the registry's `domains_with_no_entries`
  disclaimer stays exactly in sync with which of the 16 canonical domains
  actually have zero real entries (currently 12 of 16). See
  `docs/decisions/technology-registry-adoption.md` for the full reasoning;
  this does not commit SEIS to building any of the brief's aspirational
  subsystems.

- **Desktop shell view taxonomy reconciled with the cockpit's six panels.**
  `apps/desktop/shell-contract.json` and `apps/macos/inspector-contract.json`
  had four abstract views (`branch_status`/`plugin_status`/`zip_audit`/
  `workspace_links`) that didn't map 1:1 onto `apps/web/cockpit.html`'s six
  real panels — a gap both contracts' docs explicitly flagged as
  "pre-existing, not resolved here." Added two new views, `build_workbench`
  and `research_memory`, backed by two new entities of the same names in
  `apps/fullstack/state-model.json`, seeded from data that already flows
  through `scripts/create-cockpit-status.mjs`
  (`data/openai-curated-build-workbench-2026-06-05.json` and
  `docs/research/README.md`) — no new data invented, just registered as
  formal entities. Two new icons, `packages/design-tokens/icons/{build-
  workbench,research-memory}.svg`, follow the existing four icons'
  ring-plus-glyph visual pattern and pass `check:icon-system`.
  `ContentView.swift` gained matching nav rows (still placeholder detail
  panes, no new data binding claimed on macOS). `npm run
  check:app-shell-contracts` / `check:icon-system` / `check:governance` all
  still pass. This is a contract-and-icon change only — it does not
  re-verify the Linux Tauri build against the two new views; the earlier
  screenshot already showed `cockpit.html` rendering their underlying data
  before this taxonomy gap was closed.

- **Linux desktop shell build wired into CI.** New
  `.github/workflows/desktop-shell-linux-build.yml`: on any push/PR touching
  `apps/desktop/`, `apps/web/`, `packages/design-tokens/`, or `packages/ui/`,
  installs the Rust toolchain and GTK/WebKit dev packages, applies the
  documented webkit2gtk-4.0→4.1 pkg-config/`.so` symlink workaround, runs
  `stage-assets.mjs`, builds with `cargo build --locked`, and headlessly
  smoke-tests the resulting binary under `xvfb-run` (treats a clean exit or
  a timeout-while-still-running as success; any other exit code fails the
  job). This is real regression coverage for the shell verified manually
  earlier — closes the "wire a Linux build into CI" item both
  `apps/desktop/README.md` and `apps/desktop/native/README.md` listed as an
  open next step.

- **SEIS icon system (visual only, never text).** New
  `packages/design-tokens/icons/` (part of the existing open `@seis/design-tokens`
  module): the canonical brand mark plus four module glyphs (branch status,
  plugin status, zip audit, workspace links), each a real SVG pictogram with
  an accessible name. `icon-manifest.json` registers every icon (including
  `apps/web/favicon.svg` and `apps/web/public/icons/apple-touch-icon.svg`) and
  the new `check:icon-system` enforces, in CI via `check:governance`, that
  every icon's `viewBox` matches its manifest entry, every color is a
  canonical `--seis-*` token, and none contains a `<text>` element — a
  permanent, automated guarantee that a SEIS logo or icon can never regress
  into a text glyph. Design background:
  `docs/design/icon-system-research.md`.
- **Shared desktop shell contract (macOS + Windows + Linux).** Added
  `apps/desktop/shell-contract.json` as the one shared contract the three
  desktop platforms implement, instead of `apps/macos` being its own island:
  macOS (`apps/macos/SEISInspector`) is recorded as the
  `reference_implementation`; Windows and Linux are honestly recorded as
  `contract_defined_implementation_pending` with a plan (wrap the existing
  `apps/web` cockpit rather than rewrite per OS) — no Windows/Linux app is
  claimed to exist. `apps/macos/inspector-contract.json` gained per-view
  `icon` fields (from the new icon system) and a pointer at the shared
  contract; its previously-required fields are unchanged. See
  `docs/architecture/desktop-shell-unification.md`.
- **`check:app-shell-contracts` wired into CI for the first time.** The
  script already validated the Android and macOS contracts but was not run
  anywhere automatically; it now also validates the new desktop contract and
  (new) that every view's `icon`, where declared, is a real, visual,
  non-`<text>` SVG. Added to the `check:governance` aggregate.
- **Windows/Linux desktop shell, scaffolded.** Added
  `apps/desktop/native/src-tauri` — a source-level Tauri project that loads
  `apps/web/cockpit.html` instead of a new UI, per the plan already recorded
  in `apps/desktop/README.md`. `shell-contract.json`'s
  `platforms.windows`/`platforms.linux` now point at this scaffold and record
  `shell_scaffolded_build_pending` (real source exists; not yet compiled or
  shipped on either OS). `check:app-shell-contracts` now also validates every
  `platforms.*.scaffold` path and requires a `status` per platform.
- **Linux desktop shell, build-verified.** `apps/desktop/native/src-tauri`
  now actually compiles (`cargo build`) and runs: launched headlessly under
  `xvfb-run` on Ubuntu 24.04, the shell opens a real WebKitGTK window and
  renders `apps/web/cockpit.html`'s markup and styles. This needed three
  real fixes the prior scaffold-only commit was missing: a `build.rs`
  calling `tauri_build::build()` (required by `tauri::generate_context!()`
  but never added), real app icon PNGs rasterized from
  `packages/design-tokens/icons/mark.svg` (Tauri's codegen hardcodes a
  lookup for `icons/icon.png` regardless of bundler config), and
  `Cargo.lock` (now committed, standard for an application). Also
  discovered and documented: Tauri v1's `webkit2gtk` crate only looks for
  the `webkit2gtk-4.0`/`javascriptcoregtk-4.0` pkg-config names, which
  Ubuntu 24.04 no longer ships (only 4.1) — building it there needs
  pkg-config/`.so` symlinks aliasing 4.0 to 4.1, documented in
  `apps/desktop/native/README.md`. `shell-contract.json`'s
  `platforms.linux.status` is now `build_verified_data_wiring_pending`,
  distinct from `platforms.windows.status` (`shell_scaffolded_build_pending`,
  still unverified) — verified that the shell chrome renders, but several
  JSON-backed panels don't yet load data inside the shell (a documented,
  understood relative-path gap, not yet fixed). Not claiming
  `reference_implementation` on either platform.
- **Correction: the previous entry verified the wrong page.** The shell had
  no `tauri.windows[0].url` set, so it was silently loading
  `apps/web/index.html` (the marketing/portfolio page) instead of
  `cockpit.html` (the page `shell-contract.json` is actually about) — the
  "JSON-backed panels don't load" gap above belongs to `index.html`'s
  `app.js`, not to the cockpit. `cockpit.html` itself has no such fetch
  calls at all; its only external dependency is two CSS links
  (`../../packages/design-tokens/seis.tokens.css`,
  `../../packages/ui/seis.ui.css`). Fixed both: `tauri.windows[0].url` now
  points at `cockpit.html`, and new `apps/desktop/native/stage-assets.mjs`
  stages `packages/design-tokens`/`packages/ui` alongside `apps/web/` (a
  ~5MB copy, not `data/`/`content/`, which the cockpit never needs) so
  those two links resolve. Re-verified with an actual screenshot (`xwd` +
  ImageMagick under `xvfb-run`): the shell renders `cockpit.html` fully
  styled, with all six panels showing real embedded data — arguably more
  functionally complete than the macOS reference implementation (a nav
  list plus a static placeholder pane). `shell-contract.json`'s
  `platforms.linux.status` is now `reference_implementation`; Windows is
  unaffected (`shell_scaffolded_build_pending`, still unverified).

### Changed

- **Cockpit consumes the design system.** `apps/web/src/styles/cockpit.css` now
  sources its `--ck-*` palette from `--seis-*` design tokens (prior hex values
  kept as fallbacks for visual stability), `cockpit.html` loads the tokens, and
  the static build vendors `@seis/design-tokens` + `@seis/ui` and rewrites the
  cockpit's references for deploy. `check:design-system` now also verifies this
  pipeline. NOTE: the visual result was not rendered in this environment and the
  macOS-only `build-static.mjs` was not executed — review a preview before merge.
- **Cockpit status badges use the `@seis/ui` primitive.** `cockpit.js` now emits
  `.seis-badge` (with `--ok`/`--warn`/`--accent` modifiers) instead of a bespoke
  `.badge`; the cockpit loads `seis.ui.css` and only tightens density. Added the
  missing `.seis-badge--accent` variant to the design system. NOTE: badge colors
  shift to the design-system palette (e.g. positive = teal); not rendered in this
  environment — review a preview before relying on it.
- **Remaining cockpit helpers documented as deliberately local.** `.mono`,
  `.lane-list`, `.link-list`, `.note`, `.count` are recorded (in `cockpit.css` and
  the design-system doc) as intentional single-surface utilities, not candidates
  for `@seis/ui` primitives — closing the cockpit ↔ design-system boundary.

### Added

- **`sources/` upstream-drift tracking.** `sources-mirror.json` now records each
  mirror's upstream import provenance (repo, branch, commit, date) parsed from
  `sources/README.md`; `check:sources-mirror` asserts manifest ↔ README stay in
  sync, and an opt-in `--remote` mode compares the imported commit against the
  live upstream HEAD to report staleness (not wired into CI).
- **Cockpit panels & tables wear `@seis/ui` primitives.** `cockpit.html` panels
  now use `.seis-card` and `cockpit.js` status tables use the new `.seis-table`
  primitive (added to `packages/ui/seis.ui.css`); cockpit CSS keeps only density
  tweaks. The bespoke `.panel`/`.status-table` base rules were removed.
- **`sources/` mirror drift guard.** Added `check:sources-mirror`
  (`scripts/check-sources-mirror.mjs` + `content/governance/sources-mirror.json`)
  which records a content digest per vendored mirror and fails on drift, enforcing
  the read-only mirror ADR. Wired into the foundation-check workflow.
- **Foundation path alignment (V14 scan, Phase 1).** Added root `ARCHITECTURE.md`
  and `ROADMAP.md` as thin pointers to the canonical docs (no content duplicated),
  and brought both under the `check:doc-links` gate.
- **Release artifacts policy (Phase 2).** Documented in
  `docs/deployment/release-artifacts-policy.md` that `releases/*.zip` are
  intentionally tracked and load-bearing for restore/deploy — not to be deleted.
- **Sources mirror ADR (Phase 3).** `docs/decisions/sources-vendored-mirror-policy.md`
  classifies `sources/` as a read-only vendored mirror, not the source of truth.
- **Closed-code check alias (Phase 4).** Added the `check:seis-closed-code` npm
  alias for the boundary check already enforced by the
  `seis-closed-code-governance` workflow.
- **Governance aggregate + surface binding.** Added `npm run check:governance`
  (one entry point running constitution + ai-routing-policy + open-modules +
  doc-links + design-system; foundation CI now calls it). Added
  `npm run check:design-system` binding `apps/web` to the design tokens (every
  `--seis-*` token used must be defined canonically — drift caught in CI).
  Evaluated `packages/asset-registry`, `core`, `data` and recorded them as
  **kept-closed** with reasons in `open-modules.json` (asset-registry holds
  personal source paths; core/data are proprietary).
- **SEIS Design System (open area).** Opened `packages/ui` as the second open
  module (MIT) with real, dependency-free, accessible CSS primitives
  (`seis.ui.css`: button, field, badge, card, link) built on the open
  `@seis/design-tokens`. Added `docs/design/seis-design-system.md` unifying tokens
  + primitives into one token-driven, accessible, CI-guarded design system. The
  product core stays closed.
- **First open module (hybrid model in practice).** Opened
  `packages/design-tokens` as the first open-source module (its own MIT
  `LICENSE` + README), recorded it in the machine-readable
  `content/governance/open-modules.json` and the `CONTRIBUTING.md` registry, and
  added `npm run check:open-modules` (every registered module must exist, carry
  its own LICENSE, and be listed in CONTRIBUTING). Core stays closed.
- **Documentation link integrity.** Added `npm run check:doc-links` — verifies
  relative Markdown links in the governance document set resolve. Both checks
  wired into the foundation CI.
- **Machine-readable AI routing record.** Added
  `content/governance/ai-routing-policy.json` as the documented record of the
  routing policy; `check:ai-routing-policy` now asserts the JSON, the executable
  module, and the doc stay in sync (single source of truth: doc + JSON + code).
- **Executable AI routing policy.** Tagged each route in
  `scripts/ai-routing-policy.cjs` with its hybrid-policy category
  (`capability`/`privacy`), added `explainRoute()` (returns tool + category +
  reason), and added `npm run check:ai-routing-policy` — a tools-free CI check
  that the OpenAI/Codex default is preserved and the router stays coherent with
  `docs/platform/hybrid-ai-routing-policy.md`. Wired into the foundation CI.
- **SEIS V14 constitution subsystem.** Persisted the Supreme Unified Master
  Prompt V14 as the canonical meta-constitution
  (`docs/governance/seis-master-prompt-v14.md`) with a machine-readable source
  (`content/governance/seis-master-prompt-v14.json`), a repository audit, and an
  adoption ADR recording the open divergences (open-source vs closed-code,
  model-agnostic vs OpenAI-first, maturity vocabulary).
- **Operating charter** (`docs/governance/seis-operating-charter.md`) — a
  condensed, bilingual (EN/TR) one-page companion to V14 for fast reference;
  authoritative source remains V14, no new strategy introduced.
- **Constitution check** (`npm run check:constitution`) validating the doc, JSON
  source, condensed charter, audit, ADR, PR template, and discoverability wiring;
  added to the foundation CI workflow.
- **Pull-request template** (`.github/pull_request_template.md`) mirroring
  constitution §36.
- **Governance index** (`docs/governance/README.md`).
- **Security policy** (`SECURITY.md`) as the disclosure entry point.
- This changelog.

### Resolved

- **Hybrid governance resolution** (`docs/decisions/seis-hybrid-governance-resolution.md`)
  resolves two of the three V14 divergences via the documented resolution gate:
  - *Open-source vs closed-code* → **hybrid**: closed core by default, selected
    modules opt into open source via their own `LICENSE`. Added `CONTRIBUTING.md`
    and `CODE_OF_CONDUCT.md` scoped to open modules.
  - *Model-agnostic vs OpenAI-first* → **hybrid**: OpenAI/Codex stays the default,
    with task-based routing exceptions. Added
    `docs/platform/hybrid-ai-routing-policy.md`.
  - *Maturity vocabulary* → **mapping** (`docs/decisions/seis-maturity-model-unification.md`):
    V14 Stages are the strategic horizon; evolution-model Levels 1–4 instrument
    Stages 1–3; Stages 4–5 are uninstrumented horizon. The operational model and
    its CI check are unchanged. All three V14 divergences are now resolved.

### Notes

- No closed-code control was removed; the OpenAI-first default is unchanged. The
  hybrid model adds explicit, auditable opt-in paths rather than flipping
  strategy.
