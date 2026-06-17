# SEIS Governance

Governance for SEIS is layered: a high-level constitution sets direction, and
focused operating docs + `npm run check:*` contracts enforce concrete rules.

## Constitution (direction)

- [SEIS Master Prompt V14](./seis-master-prompt-v14.md) — canonical
  meta-constitution (philosophy + intent).
- [V14 repository audit](./seis-master-prompt-v14-audit.md) — how the repo
  currently aligns, gaps, and open divergences.
- [V14 adoption ADR](../decisions/seis-master-prompt-v14-adoption.md) — the
  decision and the recorded divergences.
- Machine-readable source:
  [`content/governance/seis-master-prompt-v14.json`](../../content/governance/seis-master-prompt-v14.json)
  (validated by `npm run check:constitution`).

## Operating docs (concrete rules)

- [Branch policy](./branch-policy.md)
- [Development process](./development-process.md)
- [Development automation](./development-automation.md)
- [Full-efficiency / low-pressure mode](./full-efficiency-low-pressure-mode.md)
- [iCloud ↔ GitHub workspace ingestion](./icloud-github-workspace-ingestion.md)
- [UI/UX digital lab master directive](./ui-ux-digital-lab-master-directive.md)
- [UI/UX digital lab automation brief](./ui-ux-digital-lab-automation-brief.md)

## Precedence

Where the constitution and an operating doc disagree on a concrete decision, the
operating doc + its ADR win **for that decision** until a follow-up ADR resolves
the divergence. Direction does not override deliberate, recorded strategy
silently (V14 §26).
