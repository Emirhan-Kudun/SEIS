# Changelog

All notable changes to SEIS are recorded here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); SEIS uses date-stamped
entries rather than semantic versions while the ecosystem is pre-1.0.

## [Unreleased]

### Added

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
