# Routing Policy

The router's decisions are driven by data, not code branches. The canonical
policy is [`ai-routing-policy.json`](../../content/governance/ai-routing-policy.json),
governed by the [Hybrid AI Routing Policy](../../docs/platform/hybrid-ai-routing-policy.md)
and validated by `npm run check:ai-routing-policy`.

## Resolution order

1. **Default route.** Start from the policy `default` (currently `codex`).
2. **Hint categories** (static): match task text against route `hints` for
   `capability` and `privacy` categories.
3. **Runtime categories**: apply `cost` and `availability` signals — e.g. fall
   back when the default provider is unavailable or rate-limited.
4. **State the reason.** Any non-default route records its category and tool, per
   the hybrid policy ("unexplained routing is not allowed").

## Task types

`coding`, `writing`, `architecture`, `review`, `security`, `design`. The router
maps a task type to a provider + [model profile](./model-profiles.md); it never
hardcodes a provider in app code.

## Constraints

- One writer at a time (consistent with `AGENTS.md`).
- No secret material in policy files — hints and categories only.
- Policy is additive; changing routes is a governance change, not a code hotfix.
