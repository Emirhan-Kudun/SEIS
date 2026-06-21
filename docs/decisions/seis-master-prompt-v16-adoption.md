# Adopt the SEIS V16 Unified Master Constitution

## Decision

Adopt [V16](../governance/seis-master-prompt-v16.md) as the canonical governing
constitution for the SEIS ecosystem. V16 unifies Command Center, AI Core, SEIS
Universe, clean-room engineering, remote SSH, GitHub PR rescue, and agent
collaboration into one master operating prompt. It **extends** the
[V14 constitution](../governance/seis-master-prompt-v14.md); where they differ,
V16 governs.

## Why

The AI Core and SEIS Universe foundation (added on
`claude/seis-ai-core-foundation-entra9`) is written against V16's section
structure (e.g. §16 ownership, §18 phases, §19 hardware, §32 approval, §40
forbidden). Those citations must resolve to a real, persisted document. Before
this ADR the repository only contained V14, whose section numbers differ, so the
citations pointed at a non-existent document — a documentation-integrity gap
(V16 §31). Persisting V16 closes that gap.

## Consequences

- V16 is the highest-level direction; V14 remains a historical, still-valid base
  whose concrete checks (`check:constitution`) are unchanged.
- `docs/platform/seis-ai-core.md` and the AI/architecture/security docs cite V16.
- No closed-code, security, or OpenAI-first default is weakened by this adoption.
