# SEIS Hybrid Governance Resolution

## Status

Accepted — 2026-06-18. Resolves the two open divergences recorded in
[`seis-master-prompt-v14-adoption.md`](./seis-master-prompt-v14-adoption.md)
via the resolution gate defined there (a divergence may move from *open* to
*resolved* only through a follow-up ADR — never by silently editing one side to
match the other).

## Decision

Both divergences are resolved as **hybrid** models.

### 1. Open-source vs closed-code → Hybrid (closed core, selected open modules)

- The repository **core stays closed-code by default** (`SEIS_CLOSED_CODE.md`,
  `LICENSE`, `check:security-gate`, the closed-code governance workflow remain in
  force).
- **Selected modules may be opted into open source** on a per-module basis. The
  existing `LICENSE` already permits this: contents are proprietary *"unless a
  specific file says otherwise in writing."* An open module MUST carry its own
  explicit open-source `LICENSE` (e.g. MIT/Apache-2.0) in its own directory and
  be listed in the open-modules registry (see CONTRIBUTING).
- Because public contribution now applies to open modules, community files are
  added: [`CONTRIBUTING.md`](../../CONTRIBUTING.md) and
  [`CODE_OF_CONDUCT.md`](../../CODE_OF_CONDUCT.md). They explicitly scope external
  contribution to open modules and keep the core invite-only.

### 2. Model-agnostic vs OpenAI/Codex-first → Hybrid (OpenAI default + task routing)

- **OpenAI/Codex remains the operational default writer/runtime**
  (`AGENTS.md`, `docs/platform/openai-first-plugin-policy.md` stay authoritative
  for the default path).
- A **task-based routing layer** is added on top: when a task has a clear
  capability/privacy/cost reason, the best system for that task may be selected
  (Claude, Gemini, Qwen, local models), per V14 §10. The default remains
  OpenAI/Codex when no such reason applies. See
  [`docs/platform/hybrid-ai-routing-policy.md`](../platform/hybrid-ai-routing-policy.md).

## Why hybrid

- Preserves the deliberate, CI-enforced closed-code + OpenAI-first foundation
  (no destructive strategy flip, V14 §26).
- Unlocks V14's open-source and model-agnostic intent where it adds real value,
  with explicit, auditable opt-in rather than a blanket change.
- Both sides stay honest: the default is unchanged; the exception is documented
  and gated.

## Consequences

- `content/governance/seis-master-prompt-v14.json` divergence statuses move to
  `resolved` with `resolution: hybrid` and a pointer to this ADR.
- The V14 audit's "open divergences" become "resolved (hybrid)".
- New governance surfaces: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`,
  `docs/platform/hybrid-ai-routing-policy.md`.

## Validation

- `npm run check:constitution`, `npm run check:foundation`,
  `npm run check:security-gate`, closed-code governance check, and
  `npm run check:secret-scan` must pass after this change. No existing closed-code
  contract was removed.
