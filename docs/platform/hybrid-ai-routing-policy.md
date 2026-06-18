# Hybrid AI Routing Policy

Date: 2026-06-18
Resolves divergence #2 from
[`docs/decisions/seis-hybrid-governance-resolution.md`](../decisions/seis-hybrid-governance-resolution.md).

SEIS reconciles two true statements: the operational default is OpenAI/Codex-first
(see [`openai-first-plugin-policy.md`](./openai-first-plugin-policy.md)), and V14
§10 says "use the best system for the task." The reconciliation is a **default +
exceptions** model.

## The rule

1. **Default route — OpenAI/Codex.** For core build work, terminal/Git flow,
   plugin coordination, and final integration, OpenAI/Codex is the default writer
   and runtime. No justification needed.
2. **Task-based exception.** Select a different system for a specific task **only
   when there is a clear, statable reason** in one of these categories:
   - **Capability** — another model is materially better for the task (e.g. very
     long-context reading, deep refactor review, specialized reasoning).
   - **Privacy** — the data must stay local → prefer a local/Ollama model.
   - **Cost** — the task is high-volume/low-value and a cheaper model suffices.
   - **Availability** — the default route is unavailable or rate-limited.
3. **One writer at a time.** Keep exactly one assistant in writer mode; others act
   as reviewers/researchers (consistent with `AGENTS.md`).
4. **State the reason.** When taking an exception, record the category and model
   in the task notes or PR description. Unexplained routing is not allowed.

## Suggested mapping (non-binding defaults)

| Task type | Default | Typical exception |
|---|---|---|
| Core build, Git, integration | OpenAI/Codex | — |
| Deep refactor / architecture review | OpenAI/Codex | Claude (capability) |
| Long-context doc synthesis | OpenAI/Codex | Gemini (capability) |
| Offline/private notes | OpenAI/Codex | Local/Ollama (privacy) |
| High-volume low-value drafts | OpenAI/Codex | Cheapest adequate (cost) |

These are defaults, not mandates. The maintainer may override per task.

## Executable form

This policy is not just prose — it is encoded in
[`scripts/ai-routing-policy.cjs`](../../scripts/ai-routing-policy.cjs):

- `chooseAutoTool(intent)` returns the routed tool (default `codex`).
- `explainRoute(intent)` returns `{ tool, category, reason }` so the
  "state the reason" rule is satisfied automatically.
- Hint-based routes carry the intent-inferable categories (`capability`,
  `privacy`); `cost` and `availability` are runtime operator overrides.

A machine-readable record of the same policy lives at
[`content/governance/ai-routing-policy.json`](../../content/governance/ai-routing-policy.json).

It is validated in CI by `npm run check:ai-routing-policy` (tools-free coherence:
OpenAI/Codex default preserved, every route categorized, doc lists all four
categories, **and the JSON record matches the executable module exactly**).
`npm run check:ai-stack` additionally probes local tool presence.

## Guardrails (unchanged)

- No secrets in prompts, logs, commits, or handoffs.
- No assistant overwrites another's work without a clean diff review or handoff
  note.
- Branch isolation for risky/broad work.
- This policy adds an exception path; it does **not** weaken the OpenAI-first
  default or any closed-code control.
