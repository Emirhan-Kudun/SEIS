# SEIS V14 Constitution — Repository Audit

**Date:** 2026-06-17
**Scope:** `Emirhan-Kudun/SEIS` (core repository) audited against
[`seis-master-prompt-v14.md`](./seis-master-prompt-v14.md).
**Method:** Static inspection of repository structure, governance docs,
validation scripts (`npm run check:*`), `.github/`, and existing strategy/ADR
records. No code was executed; no behavior was runtime-validated.

This audit is descriptive. It does **not** change strategy. Divergences that
require a maintainer decision are surfaced, not resolved.

---

## Summary scorecard

| V14 area | State | Notes |
| --- | --- | --- |
| §0 Single master source | 🟡 Partial → 🟢 | Constitution now persisted here and linked from `AGENTS.md` / `README.md`. |
| §2 Open-source identity | 🔴 Divergence | Repo is **closed-code by default** and OpenAI/Codex-first; V14 says "open-source oriented" + model-agnostic. Tracked in adoption ADR. |
| §10 AI orchestration (model-agnostic) | 🔴 Divergence | `AGENTS.md` + `openai-first-plugin-policy.md` make Codex/OpenAI the primary writer; V14 says "use the best system for the task". Intentional; tracked. |
| §12–13 Workflow / decision framework | 🟢 Strong | Sense→Shape→Ship→Publish loop + ADRs already match. |
| §14 Repository files | 🟡 Partial | Strong `docs/`, `scripts/`, `.github/`, issue templates, ADRs. Missing PR template (added here), `SECURITY.md`, `CHANGELOG.md`. |
| §17–18 Documentation / knowledge | 🟢 Strong | Deep `docs/` tree, decision records, machine-readable JSON sources. |
| §19 Security | 🟢 Strong | Secret-scan check, security quality gate, closed-code governance workflow, remote-access hardening docs. No top-level `SECURITY.md` (disclosure entry point). |
| §20 Cloud strategy | 🟢 Strong | SSH cloud + VPN remote-access plan, runbook, hardened server kit (#11–#13). |
| §25 Validation | 🟢 Strong | ~45 `check:*` scripts + CI workflows. |
| §31 Product layers / §32 maturity | 🟡 Partial | V14 maturity ladder vs `seis-evolution-model.md` ladder — coherent but two vocabularies. Cross-linked here. |
| §36 Branch/commit/PR standard | 🟡 Partial | Conventional commits in history; branch contract documented (`BRANCHES.md`); PR template added here. |
| §9 Language balance | 🟡 Informational | `polyglot/` + `check-polyglot.mjs` track presence; balance is a long-term target, not enforced. |
| §29–30 Open-source / community | 🔴 Deferred | `CONTRIBUTING.md` / `CODE_OF_CONDUCT.md` intentionally absent under closed-code posture. |

Legend: 🟢 aligned · 🟡 partial / informational · 🔴 divergence or deferred (maintainer decision).

---

## What is already strong (no action needed)

- **Documentation as infrastructure (§17).** `docs/` spans architecture,
  decisions, deployment, governance, security, strategy, quality, research, and
  more, with machine-readable JSON sources for several models.
- **Decision records (§18, §26).** `docs/decisions/` holds real ADRs
  (3D rendering, auth/JWT, backend state, framework) in a consistent format.
- **Validation discipline (§25).** ~45 `npm run check:*` scripts plus
  `.github/workflows/` (CI, foundation check, closed-code governance) enforce
  contracts rather than relying on prose.
- **Security & cloud (§19, §20).** Secret-scan check, security quality gate,
  closed-code governance workflow, and SSH-cloud + VPN remote-access hardening
  (runbook + server kit) are in place and CI-validated.
- **Evolution model (§32).** `docs/strategy/seis-evolution-model.md` already
  encodes a humane, traceable maturity ladder with an activation queue.

## Gaps addressed in this change set (safe, strategy-neutral)

1. **Constitution persisted (§0).** V14 now lives at
   `docs/governance/seis-master-prompt-v14.md` and is discoverable from
   `AGENTS.md` and `README.md` (Start Here).
2. **Adoption recorded (§18, §26).** ADR
   `docs/decisions/seis-master-prompt-v14-adoption.md` records the decision and,
   critically, the divergences below.
3. **Pull-request template (§36).** `.github/pull_request_template.md` now mirrors
   V14's PR structure (Summary, Motivation, Changes, Validation, Risks, Rollback,
   Related, Next steps), matching the existing issue-template convention.

## Divergences — resolution status

Resolved 2026-06-18 via
[`seis-hybrid-governance-resolution.md`](../decisions/seis-hybrid-governance-resolution.md),
through the documented resolution gate (no silent strategy flip, per V14 §26).

1. **Open-source vs closed-code (§2, §29, §30) — RESOLVED (hybrid).** Closed core
   by default; selected modules opt into open source via their own `LICENSE`.
   Community files `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` added, scoped to open
   modules. Closed-code controls unchanged.
2. **Model-agnostic vs OpenAI-first (§7, §10) — RESOLVED (hybrid).** OpenAI/Codex
   remains the operational default; task-based routing exceptions
   (capability/privacy/cost/availability) are allowed and must state their reason.
   See [`docs/platform/hybrid-ai-routing-policy.md`](../platform/hybrid-ai-routing-policy.md).
3. **Maturity vocabulary (§31, §32) — RESOLVED (mapping).** A canonical mapping
   declares V14 stages as the strategic horizon and the evolution-model Levels 1–4
   as the instrumentation of Stages 1–3; Stages 4–5 are uninstrumented horizon.
   See [`docs/decisions/seis-maturity-model-unification.md`](../decisions/seis-maturity-model-unification.md).
   The operational model and its CI check are unchanged.

All three V14 divergences are now resolved (two hybrid, one mapping). No
closed-code control was removed and no operational CI contract was weakened.

## Suggested next steps — status update (2026-08-26)

All four items below were still marked "not executed" here even though the
"Divergences — resolution status" section above already recorded them as
resolved (and the underlying files/ADRs exist in the repo). That was a stale,
self-contradictory audit doc — not a claim anyone acted on falsely, just this
section never getting updated when the work landed elsewhere. Corrected:

1. ~~Resolve divergence #1 (open vs closed)~~ — **done.** See "Divergences —
   resolution status" #1 above and
   [`seis-hybrid-governance-resolution.md`](../decisions/seis-hybrid-governance-resolution.md);
   `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` exist at the repo root.
2. ~~Add a top-level `SECURITY.md` disclosure entry point~~ — **done.**
   [`SECURITY.md`](../../SECURITY.md) exists at the repo root and names a real
   disclosure contact.
3. ~~Start a `CHANGELOG.md`~~ — **done.** [`CHANGELOG.md`](../../CHANGELOG.md)
   exists at the repo root and is kept current (Keep a Changelog format,
   `[Unreleased]` section maintained per change).
4. ~~Unify the two maturity vocabularies (§31/§32)~~ — **done.** See
   "Divergences — resolution status" #3 above and
   [`seis-maturity-model-unification.md`](../decisions/seis-maturity-model-unification.md).

No open items remain from this audit's original suggestions. A future audit
pass should re-run against the current repo state rather than assume this
one's suggestions are still pending.

## Validation performed for this audit

- Static inspection only (file/dir listing, doc reads, `package.json` script
  scan, git log/branch inspection).
- No `check:*` script was run as part of producing this audit; no runtime
  behavior was verified. Maintainers should run the relevant `npm run check:*`
  suite before merge.
