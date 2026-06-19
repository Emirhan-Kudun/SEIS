# @seis/model-router

Application-layer model routing for SEIS AI Core. Classifies a task and selects a
provider + model profile using a declarative policy — without hardcoding secrets.

Status: **specification** (SEIS Model Router v0.1). Closed-code by default; see
[`open-modules.json`](../../content/governance/open-modules.json).

## Why it exists

SEIS already ships a machine-readable
[`ai-routing-policy.json`](../../content/governance/ai-routing-policy.json) and a
validator (`npm run check:ai-routing-policy`). This package documents the
*application interface* that consumes that policy at runtime, so routing stays
one source of truth instead of being re-implemented per app.

## Responsibilities

- Classify task type (coding, writing, architecture, review, security, design).
- Resolve a provider and model profile from policy hints + runtime signals.
- Return a structured result; never leak keys or prompt contents.
- Log safe metadata only (task type, chosen tool, latency).

## Design docs

- [Provider interface](./provider-interface.md)
- [Routing policy](./routing-policy.md)
- [Model profiles](./model-profiles.md)

## Non-goals

- No provider SDK internals or proprietary behaviour reconstruction.
- No secret storage — providers read credentials from environment variables.
- No orchestration engine yet; start with a pure routing decision.
