# Repository Civilization Architecture

This document defines a scalable SEIS repository map without forcing a structural migration.

## Current Anchors

- `index.html`, `style.css`, `script.js`: static production-compatible surface.
- `apps/seis-nextjs-foundation`: modern Next.js application foundation.
- `docs`: architecture, design, governance, and operating documentation.
- `seis/creative-intelligence-os`: machine-readable creative governance artifacts.
- `scripts`: local automation, branch checks, quality gates, reports, and export tools.
- `reports/ecosystem`: generated audit and orchestration outputs.
- `exports`: generated bundles and merge artifacts.

## Target Structure

Future structure should evolve in small approved migrations:

```text
apps/
  seis-nextjs-foundation/
    app/
    components/
    lib/
    content/
    public/
docs/
  architecture/
  creative-intelligence/
  governance/
  observability/
  runbooks/
seis/
  creative-intelligence-os/
  connector-orchestration/
  release-governance/
  observability/
packages/
  design-system/
  motion-system/
  content-model/
reports/
  ecosystem/
  accessibility/
  performance/
  release/
```

## Migration Rule

Do not move existing files just to match the target map. A structural migration requires:

- explicit approval
- a dedicated branch or clearly scoped commit
- before and after file inventory
- local quality gate
- rollback note

## Naming Conventions

- Documentation files use lowercase kebab-case.
- Machine-readable governance files use lowercase kebab-case plus `.json`, `.yaml`, or `.cjs`.
- UI components use PascalCase.
- Utility modules use lowercase kebab-case unless the existing local pattern differs.
- Branch names remain lowercase and purpose-oriented.

## Documentation System

Documentation should be split by operational use:

- `doctrine`: durable principles and design laws.
- `architecture`: system structure and dependencies.
- `runbook`: commands, recovery steps, and release procedures.
- `checklist`: repeatable review criteria.
- `manifest`: machine-readable policy or routing data.
- `report`: generated output from a dated run.

## Quality Boundary

Repository growth should remain reversible:

- prefer additive docs and manifests before runtime code
- keep generated exports out of human-authored architecture decisions
- avoid duplicate source-of-truth files
- preserve TR/EN/FR/IT/DE i18n contracts
- keep large experiments isolated under `experiment`, `prototype`, or `research` paths

## Future Package Candidates

Create packages only when repeated runtime code justifies it:

- `packages/design-system`: tokens, primitives, typography, spacing.
- `packages/motion-system`: motion presets, reduced-motion helpers.
- `packages/content-model`: MDX schemas, metadata, collection helpers.
- `packages/observability`: budget definitions and report parsers.

Until then, keep the code close to the app that uses it.
