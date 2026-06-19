# Changelog

All notable changes to SEIS are recorded here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); SEIS uses date-stamped
entries rather than semantic versions while the ecosystem is pre-1.0.

## [Unreleased]

### Added

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

### Changed

- **Cockpit status badges use the `@seis/ui` primitive.** `cockpit.js` now emits
  `.seis-badge` (with `--ok`/`--warn`/`--accent` modifiers) instead of a bespoke
  `.badge`; the cockpit loads `seis.ui.css` and only tightens density. Added the
  missing `.seis-badge--accent` variant to the design system. NOTE: badge colors
  shift to the design-system palette (e.g. positive = teal); not rendered in this
  environment — review a preview before relying on it.
- **Cockpit consumes the design system.** `apps/web/src/styles/cockpit.css` now
  sources its `--ck-*` palette from `--seis-*` design tokens (prior hex values
  kept as fallbacks for visual stability), `cockpit.html` loads the tokens, and
  the static build vendors `@seis/design-tokens` + `@seis/ui` and rewrites the
  cockpit's references for deploy. `check:design-system` now also verifies this
  pipeline. NOTE: the visual result was not rendered in this environment and the
  macOS-only `build-static.mjs` was not executed — review a preview before merge.

### Added

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
