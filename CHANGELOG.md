# Changelog

All notable changes to SEIS are recorded here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); SEIS uses date-stamped
entries rather than semantic versions while the ecosystem is pre-1.0.

## [Unreleased]

### Added

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
