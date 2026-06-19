# Model Gap Analysis

Date: 2026-06-19
Phase: SEIS Universe Phase 0 (V16 §18).

Gap between SEIS **today** (an application layer over external providers, see
[`SEIS_MODEL_BASELINE.md`](./SEIS_MODEL_BASELINE.md)) and an **independently
owned, trainable SEIS model** (V16 §16 ownership rule).

## Ownership checklist (V16 §16)

A SEIS foundation model must independently control all of the following. None
exist yet:

| Requirement | Present? | First step to close |
|---|---|---|
| Architecture specification | no | ADRs under `docs/adr/ai/` comparing families (Phase 2) |
| Tokenizer / tokenization strategy | no | tokenizer research + TR/EN/code efficiency study (Phase 3) |
| Model configuration | no | model spec doc (Phase 1) |
| Training pipeline | no | nano training loop, CPU-runnable (Phase 4) |
| Data pipeline | no | provenance-tracked ingestion + manifests (Phase 3) |
| Checkpoint format | no | save/restore in nano model (Phase 4) |
| Evaluation suite | no | executable harness from `packages/evals` criteria (Phase 7) |
| Inference system | no | minimal inference interface (Phase 4) |
| Model documentation / cards | no | model card template (Phase 1) |
| Safety framework | no | safety boundaries in model constitution (Phase 1) |
| Release governance | no | promotion gates (Phase 7) |

## Sequenced gap-closure (no training until hardware is measured)

1. **Phase 1 — Model constitution & spec** (docs only): purpose, languages,
   modalities, context target, success criteria, non-goals →
   `docs/ai/SEIS_MODEL_CONSTITUTION.md`, `SEIS_MODEL_SPECIFICATION.md`.
2. **Phase 2 — Architecture ADRs** comparing decoder-only / MoE / SSM / hybrid
   with evidence → `docs/decisions/` (started:
   [`ai-model-architecture-family.md`](../decisions/ai-model-architecture-family.md)).
3. **Phase 3 — Data & tokenizer governance** (manifests, provenance, licensing).
4. **Phase 4 — Original nano model**: prove the full loop end-to-end on the
   observed CPU sandbox before any scaling.

## Risks / honesty notes

- No GPU/training hardware has been observed (see
  [`COMPUTE_CAPACITY.md`](./COMPUTE_CAPACITY.md)); only a nano CPU smoke test is
  feasible now.
- Do not present external-provider capability or RAG/prompt behaviour as learned
  SEIS-model intelligence (V16 §16).
- This is a multi-quarter research direction, not a near-term deliverable.
