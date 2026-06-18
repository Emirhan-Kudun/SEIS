# SEIS Maturity Model Unification

## Status

Accepted — 2026-06-18. Resolves the third (and final) open divergence recorded in
[`seis-master-prompt-v14-adoption.md`](./seis-master-prompt-v14-adoption.md),
through the resolution gate (follow-up ADR; no silent edit of either side).

## Problem

Two maturity ladders coexisted:

- **Strategic (V14 §32):** Stage 0 Seed · 1 Foundation · 2 System · 3 Platform ·
  4 Ecosystem · 5 Civilization System.
- **Operational (`docs/strategy/seis-evolution-model.md` +
  `content/development/seis-evolution-model.json`):** Level 1 Foundation
  Integrity · 2 Calm Experience System · 3 Governed Automation · 4 Platform
  Readiness — CI-validated by `check:seis-evolution-model`.

They were never contradictory, just two vocabularies with no declared
relationship.

## Decision

Keep **both**, with one declared, canonical relationship: **V14 stages are the
strategic horizon; the evolution-model levels are the operational instrumentation
of the stages SEIS is actually building now.** Neither ladder is renamed or
removed (the operational ladder stays exactly as its CI check expects).

### Canonical mapping

| V14 stage | Evolution-model level(s) | Meaning |
| --- | --- | --- |
| 0 — Seed | _(pre-Level 1)_ | Idea/spike; not yet instrumented. |
| 1 — Foundation | Level 1 — Foundation Integrity | Stable operating spine. |
| 2 — System | Level 2 — Calm Experience System · Level 3 — Governed Automation | Coherent, governed, calm system. |
| 3 — Platform | Level 4 — Platform Readiness | Grows across deploy/plugins/integrations without losing clarity. |
| 4 — Ecosystem | _(horizon — not yet instrumented)_ | Multi-repo/agent/product coherence. |
| 5 — Civilization System | _(horizon — not yet instrumented)_ | Long-term aspiration. |

**Current honest position:** SEIS is operating within V14 Stages 1–3 (the four
evolution-model levels). Stages 4–5 are strategic horizon and are deliberately
**not** instrumented yet — claiming them would be fake maturity (V14 §32, §44).

## Consequences

- `content/governance/seis-master-prompt-v14.json` gains a `maturityMapping` and
  the third divergence moves to `status: resolved` (`resolution: mapping`).
- `check:constitution` validates the mapping covers all six V14 stages and points
  at real evolution-model level ids.
- The V14 doc §32 note and the audit's divergence section are updated to
  "resolved (mapping)".
- The operational `seis-evolution-model.json` and its CI check are **unchanged**.

## Validation

`npm run check:constitution`, `npm run check:seis-evolution-model`,
`npm run check:foundation`, and `npm run check:secret-scan` must pass after this
change.
