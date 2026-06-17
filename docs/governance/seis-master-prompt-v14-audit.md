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

## Open divergences — maintainer decision required (not changed here)

These are genuine, *intentional* conflicts between V14's aspirational wording and
the repository's current, deliberately-chosen strategy. They are **not** bugs and
were **not** silently "fixed" (per V14 §26: no major architectural shift in
silence).

1. **Open-source vs closed-code (§2, §29, §30).** V14 calls SEIS "open-source
   oriented"; the repo is closed-code by default (`SEIS_CLOSED_CODE.md`,
   `check-seis-closed-code.mjs`, closed-code governance workflow). Until resolved,
   `CONTRIBUTING.md` / `CODE_OF_CONDUCT.md` are intentionally deferred.
   - *Options:* (a) keep closed-code and soften V14 §2/§29/§30 wording to
     "open-source *capable*"; (b) adopt a public-contribution posture and add the
     community files; (c) split — closed core, selected open modules.
2. **Model-agnostic vs OpenAI-first (§7, §10).** V14 says "use the best system for
   the task"; `AGENTS.md` + `openai-first-plugin-policy.md` set Codex/OpenAI as
   the primary writer/runtime. 
   - *Options:* (a) keep OpenAI-first as the *operational default* and read V14
     §10 as the *capability* statement (they can coexist); (b) rebalance toward
     true task-based routing.
3. **Maturity vocabulary (§31, §32).** Two ladders coexist (V14 Stage 0–5 vs the
   evolution-model Levels 1–4). Cross-linked for now; consider unifying.

## Suggested next steps (prioritized, not executed)

1. Resolve divergence #1 (open vs closed) — it gates the §14/§29 community files.
2. Decide whether to add a top-level `SECURITY.md` disclosure entry point even
   under closed-code (recommended; security is non-negotiable per §19).
3. Decide whether to start a `CHANGELOG.md` (§14) now that releases exist
   (`releases/`, `release/`).
4. Unify the two maturity vocabularies (§31/§32) into one canonical ladder.

## Validation performed for this audit

- Static inspection only (file/dir listing, doc reads, `package.json` script
  scan, git log/branch inspection).
- No `check:*` script was run as part of producing this audit; no runtime
  behavior was verified. Maintainers should run the relevant `npm run check:*`
  suite before merge.
