# SEIS Component Map

Date: 2026-06-19

How SEIS's modules relate (V16 §25, §31). Derived from declared structure, not
guessed relationships. Pairs with the [data model](./data-model.md),
[API design](./api-design.md), and [Command Center spec](./seis-command-center.md).

## Layers

```
Interfaces      apps/web (cockpit / Command Center)  ·  apps/android  ·  apps/macos
                                  |
Application     packages/ai-core surface · model-router · agent-runtime ·
                prompt-engine · evals
                                  |
Contracts       packages/core (business rules/types) · shared types
                                  |
Foundations     packages/design-tokens · packages/ui (open modules)
                                  |
Governance      content/governance/*.json + scripts/check-* (CI gates)
                                  |
External (via adapters)   GitHub · model providers · SSH hosts · MCP tools
```

## Module responsibilities

| Module | Role | Boundary |
|---|---|---|
| `apps/web` | cockpit / Command Center UI | renders from local records + (future) API |
| `packages/model-router` | task → provider/profile routing | consumes `ai-routing-policy.json`; no secrets |
| `packages/agent-runtime` | agent role contracts | capability-based; human-supervised |
| `packages/prompt-engine` | versioned prompts/templates | no secrets/proprietary prompts |
| `packages/evals` | output evaluation criteria | quality/safety/completion |
| `packages/core` | business rules + platform types | closed-code |
| `packages/design-tokens`, `packages/ui` | design system | open modules (MIT) |
| `content/governance` + `scripts/check-*` | machine-readable policy + gates | enforced in CI |
| `research/nano` | Phase 4 proof-of-pipeline | research only; no capability |
| `sources/*` | read-only satellite mirrors | drift-guarded |

## Rules

- External systems sit behind adapters — providers/hosts are replaceable
  (V16 §25).
- New cross-module behaviour is recorded as an ADR in `docs/decisions/`.
- Openness of any package is explicit in
  [`open-modules.json`](../../content/governance/open-modules.json).
