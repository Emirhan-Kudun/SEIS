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
- **Constitution check** (`npm run check:constitution`) validating the doc, JSON
  source, audit, ADR, PR template, and discoverability wiring; added to the
  foundation CI workflow.
- **Pull-request template** (`.github/pull_request_template.md`) mirroring
  constitution §36.
- **Governance index** (`docs/governance/README.md`).
- **Security policy** (`SECURITY.md`) as the disclosure entry point.
- This changelog.

### Notes

- No existing strategy was changed. Closed-code default and OpenAI/Codex-first
  routing remain authoritative; divergences with V14 are documented, not
  resolved.
