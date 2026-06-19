# SEIS Language Versions

Date: 2026-06-19

A **SEIS language version** is a versioned bundle of AI *application-layer*
behaviour. It is not a base model and not model weights. See
[SEIS AI Core](./seis-ai-core.md) for the honest-naming rule.

Each version captures a controlled snapshot of:

- system prompts and response-style rules
- model-routing policy and task classification
- agent behaviour rules (roles, allowed / forbidden actions)
- evaluation criteria and safety rules
- project-memory boundaries and documentation standards

The canonical, machine-readable record is
[`content/governance/seis-language-versions.json`](../../content/governance/seis-language-versions.json),
validated by `npm run check:ai-core`.

## The v0.1 set

| Version | Scope |
|---|---|
| **SEIS Language v0.1** | Umbrella: uses external LLM providers, applies SEIS prompt policy, routes through the model router, uses agent-runtime roles, validates with evals. |
| **SEIS Model Router v0.1** | Task classification + provider/profile selection, grounded in [`ai-routing-policy.json`](../../content/governance/ai-routing-policy.json). |
| **SEIS Agent Runtime v0.1** | Agent role definitions and I/O contracts in [`packages/agent-runtime`](../../packages/agent-runtime/README.md). |
| **SEIS Prompt Engine v0.1** | Prompt format, versioning, and templates in [`packages/prompt-engine`](../../packages/prompt-engine/README.md). |
| **SEIS Command Intelligence v0.1** | Cockpit-facing product intelligence: how AI Core surfaces in `apps/web`. |

## Versioning rules

- A new version is cut only when application-layer behaviour changes in a way
  worth tracking (new routing rules, new agent roles, changed safety rules).
- Versions are additive and honest: never rename a capability to imply a
  base-model claim.
- Each version entry records its `id`, `status` (`draft` | `active` |
  `superseded`), a one-line `scope`, and the artifacts it governs.
- Future versions (v0.2+) may add better routing, task memory, local-model
  support, and agent coordination — recorded the same way.
