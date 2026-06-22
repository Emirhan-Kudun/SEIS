# SEIS Model Roadmap

Date: 2026-06-19
Phase: SEIS Universe Phase 1 (V16 §18, §31). The staged, gated path from "no
model" to an owned SEIS model family. Each phase has an explicit exit gate; no
phase starts before the prior gate passes.

> Status is honest: only Phase 0 is complete. Nothing is trained (V16 §16).

## Phases & gates

| Phase | Outcome | Exit gate | Status |
|---|---|---|---|
| 0 — Audit | baseline, capacity, gap analysis | docs exist; capacity measured | **done** |
| 1 — Constitution | charter, spec, this roadmap | docs reviewed | **in progress** |
| 2 — Architecture | ADRs comparing families (decoder-only / MoE / SSM / hybrid / retrieval / multimodal) with evidence | ADRs under `docs/decisions/` | **in progress** |
| 3 — Data & tokenizer | provenance/license-tracked data pipeline + tokenizer study | reproducible dataset manifests + tokenizer report | **in progress** (governance + study docs landed) |
| 4 — Nano model | original small model trained from scratch | loss ↓, checkpoint restore, tiny-set overfit, eval runs, resumable | **done** ([`SEIS_NANO_MODEL.md`](./SEIS_NANO_MODEL.md), [`research/nano/`](../../research/nano/README.md)) |
| 5 — Training platform | scalable, resumable, tracked training | distributed run reproducible | not started |
| 6 — Capabilities | measurable curricula (TR/EN, code, repo, math, design, tools, safety) | per-stage eval gates | not started |
| 7 — Evaluation lab | permanent eval suite + promotion gates | contamination-resistant gates green | **bootstrapped** (runnable harness + nano regression gate; see [`SEIS_EVALUATION.md`](./SEIS_EVALUATION.md)) |
| 8 — Universe system | registry, router, inference, tools, observability | end-to-end serving | not started |
| 9 — Multimodal | text→docs→image→audio→video, incrementally | per-modality gate + safety | not started |

## Hard rules (carried from V16)

- **Do not scale past the nano model** until its exit gate passes (Phase 4).
- **No training** until real hardware is measured and recorded
  ([`COMPUTE_CAPACITY.md`](./COMPUTE_CAPACITY.md)); no unbounded jobs (§19).
- Each training stage declares base checkpoint, dataset version, objective,
  hyperparameters, compute used, eval results, limitations, rollback point (§18
  Phase 6).
- Starting expensive training, promoting a version, publishing a checkpoint, and
  changing dataset policy are **human-approved** (§32).

## Next concrete step

Phase 3 governance is documented in
[`SEIS_DATA_GOVERNANCE.md`](./SEIS_DATA_GOVERNANCE.md) +
[`SEIS_TOKENIZER_STUDY.md`](./SEIS_TOKENIZER_STUDY.md); the Phase 2 architecture
ADR is at
[`docs/decisions/ai-model-architecture-family.md`](../decisions/ai-model-architecture-family.md).
Remaining Phase 3 work (a tokenizer comparison report + recommendation ADR)
requires representative corpora and is **not** runnable in the CI sandbox. The
**Phase 4 nano model** is implemented and its gate passed
([`SEIS_NANO_MODEL.md`](./SEIS_NANO_MODEL.md)). Phase 5+ (scalable training)
requires real, measured hardware and human approval to start training (§19, §32)
— not feasible in the ephemeral CI sandbox.
