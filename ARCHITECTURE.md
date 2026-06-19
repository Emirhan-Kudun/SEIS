# SEIS Architecture

This file is a stable entry point. The architecture lives in the documents below;
this page only points to them so the canonical `ARCHITECTURE.md` path resolves
without duplicating content.

## Canonical architecture

- Platform shape and repository boundaries:
  [`docs/platform/seis-closed-code-architecture.md`](./docs/platform/seis-closed-code-architecture.md)
- AI Core application layer (model router, agent runtime, prompt engine, evals):
  [`docs/platform/seis-ai-core.md`](./docs/platform/seis-ai-core.md)
- Command Center operating interface (cockpit module map + evolution):
  [`docs/architecture/seis-command-center.md`](./docs/architecture/seis-command-center.md)
- Core data model (conceptual entities):
  [`docs/architecture/data-model.md`](./docs/architecture/data-model.md)
- API & provider-adapter design:
  [`docs/architecture/api-design.md`](./docs/architecture/api-design.md)
- Component map (module relationships):
  [`docs/architecture/component-map.md`](./docs/architecture/component-map.md)
- Deployment topology:
  [`docs/architecture/deployment-topology.md`](./docs/architecture/deployment-topology.md)
- Web and mobile foundation:
  [`docs/architecture/web-mobile-foundation.md`](./docs/architecture/web-mobile-foundation.md)
- Animation system:
  [`docs/architecture/animation-system-plan.md`](./docs/architecture/animation-system-plan.md)
- Case-study detail route:
  [`docs/architecture/case-study-detail-route-proposal.md`](./docs/architecture/case-study-detail-route-proposal.md)

## Decisions

Architecture decisions are recorded as ADRs in
[`docs/decisions`](./docs/decisions). Highest-level direction lives in the
[SEIS V14 constitution](./docs/governance/seis-master-prompt-v14.md); concrete
current rules live in [`AGENTS.md`](./AGENTS.md).
