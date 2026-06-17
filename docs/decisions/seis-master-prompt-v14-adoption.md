# SEIS Master Prompt V14 Adoption

## Decision

Adopt the **SEIS Supreme Unified Master Prompt V14** as the canonical
meta-constitution (philosophy + intent layer) for the SEIS ecosystem.

1. Persist V14 verbatim at
   [`docs/governance/seis-master-prompt-v14.md`](../governance/seis-master-prompt-v14.md).
2. Treat it as the highest-level *direction* layer that sits **above** — not in
   place of — the existing operating docs and `npm run check:*` contracts.
3. Where V14 and current repository strategy conflict, the existing strategy +
   ADRs remain authoritative for that decision until the maintainer resolves the
   divergence. The constitution does not authorize silent strategy rewrites
   (per V14 §26).

## Why

- SEIS lacked a single, persisted statement of its operating philosophy; it lived
  only in chat/prompt history. V14 §0/§18 require institutional memory to be
  written down, not held in ephemeral context.
- Persisting it makes the philosophy auditable and lets future agents align to one
  source instead of re-deriving intent each session.

## Scope of this change

Strategy-neutral, additive, reversible:

- Add the constitution, an audit, and this ADR (docs only).
- Add a pull-request template that mirrors V14 §36.
- Link the constitution from `AGENTS.md` and `README.md`.

No code, dependencies, validation contracts, or existing strategy docs were
changed. No `check:*` script was modified.

## Recorded divergences (open — maintainer decision)

These intentional conflicts are documented rather than resolved (see the
[audit](../governance/seis-master-prompt-v14-audit.md) for options):

1. **Open-source orientation (V14 §2/§29/§30) vs closed-code default**
   (`SEIS_CLOSED_CODE.md`, `check-seis-closed-code.mjs`). Because of this,
   `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` are deferred, not added.
2. **Model-agnostic orchestration (V14 §7/§10) vs OpenAI/Codex-first**
   (`AGENTS.md`, `docs/platform/openai-first-plugin-policy.md`).
3. **Maturity vocabulary** — V14 Stage 0–5 (§31/§32) vs the operational ladder in
   `docs/strategy/seis-evolution-model.md` (Levels 1–4). Cross-linked pending
   unification.

## Future gate

Promote a divergence from "documented" to "resolved" only via a follow-up ADR
that either (a) updates V14 wording, or (b) updates the operating strategy — never
by silently editing one to match the other.

## Validation

- Static inspection of repository structure, governance docs, and `package.json`
  scripts. No `check:*` script was executed as part of this decision record.
- Maintainers should run the relevant `npm run check:*` suite before merge.
