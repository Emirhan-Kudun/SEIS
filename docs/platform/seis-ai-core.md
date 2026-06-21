# SEIS AI Core

Date: 2026-06-19

SEIS AI Core is the AI-native application layer of the SEIS ecosystem. It is an
*original, provider-agnostic* layer that connects to external model providers,
routes tasks, coordinates agents, manages prompts, evaluates outputs, and
presents everything through the SEIS cockpit / Command Center.

This document is the canonical identity of that layer. It builds on — and does
not replace — the existing
[Hybrid AI Routing Policy](./hybrid-ai-routing-policy.md), the
[OpenAI-first plugin policy](./openai-first-plugin-policy.md), and the
[SEIS V16 constitution](../governance/seis-master-prompt-v16.md).

## What SEIS AI Core is

- An application layer: shell, model router, agent runtime, prompt engine,
  evaluation layer, and a safe knowledge boundary.
- Provider-agnostic: it defines interfaces and routing policy, not provider
  internals.
- Versioned: behaviour is captured as **SEIS language versions** (see
  [SEIS Language Versions](./seis-language-versions.md)).
- Governed: closed-code by default (V14), with each module's openness decided
  explicitly in [`open-modules.json`](../../content/governance/open-modules.json).

## What SEIS AI Core is NOT

- It is **not** a frontier model. SEIS has not trained, and does not claim to
  have trained, a ChatGPT-, Claude-, or Gemini-class base model. No model
  weights, datasets, or training pipelines exist in this layer.
- It is **not** a clone of any proprietary product. It does not copy private
  prompts, leaked system prompts, hidden behaviour, or protected implementation
  details. See [Clean-room rules](#clean-room-rules).
- It is **not** a place for secrets. Provider credentials live only in
  environment variables, never in code, manifests, prompts, logs, or docs.

## Honest naming

A "SEIS language version" is a versioned bundle of **application-layer**
behaviour — system prompts, routing policy, agent rules, evaluation criteria,
safety rules, and product intelligence. It is never a claim about base-model
capability. Use honest names: `SEIS Model Router v0.1`, not "SEIS GPT".

## The AI Core subsystems

| Subsystem | Package | Responsibility |
|---|---|---|
| Model Router | [`packages/model-router`](../../packages/model-router/README.md) | Classify a task and route it to a provider/profile via policy. |
| Agent Runtime | [`packages/agent-runtime`](../../packages/agent-runtime/README.md) | Define agent roles, allowed/forbidden actions, I/O contracts. |
| Prompt Engine | [`packages/prompt-engine`](../../packages/prompt-engine/README.md) | Version and template system/task/agent prompts. |
| Evaluation | [`packages/evals`](../../packages/evals/README.md) | Score outputs for quality, safety, and task completion. |
| Core contracts | [`packages/core`](../../packages/core/README.md) | Shared business rules and platform types. |

The router is the executable centre. It is already grounded by the machine-
readable [`ai-routing-policy.json`](../../content/governance/ai-routing-policy.json)
and its validator (`npm run check:ai-routing-policy`); the `model-router` package
documents the application-layer interface that consumes that policy.

## Relationship to SEIS

SEIS AI Core lives inside the single SEIS repository, not in a separate monorepo.
It reuses the existing structure (`packages/*`, `apps/web` cockpit, `docs/*`,
`content/governance/*`, `scripts/check-*`) rather than introducing a parallel
one. The Command Center is the SEIS cockpit (`apps/web`); AI Core modules surface
through it over time.

## Security boundary

- Never commit API keys, tokens, `.env*`, private keys, or credentials.
- The router reads provider keys from environment variables only.
- Logs may record safe metadata (task type, chosen tool, latency) but never
  prompt contents, secrets, or private user data.
- Follow [`SECURITY.md`](../../SECURITY.md) for handling and rotation.

## Clean-room rules

Allowed: original architecture, original prompt system, original agent rules,
provider-agnostic interfaces, public best practices.

Forbidden: copying proprietary source or prompts, reconstructing protected
provider logic, preserving private file/class/API names, or committing leaked
material. SEIS AI Core must remain original and lawful.

## Build phases

1. **Foundation (this document set)** — identity, language-version concept,
   model-router / agent-runtime / prompt-engine / evals specifications.
2. **Core packages** — minimal scaffolding consuming routing policy.
3. **Command Center modules** — cockpit surfaces for router, agents, prompts.
4. **Provider integration** — env-based provider adapters, no hardcoded keys.
5. **Evaluation layer** — quality/safety/completion scoring.

Do not overbuild. Each phase must leave the repository cleaner, safer, and more
documented than before.

## Validation

The AI Core foundation is validated by `npm run check:ai-core`, which checks the
[language-versions manifest](../../content/governance/seis-language-versions.json)
and the presence of the subsystem specifications listed above.
