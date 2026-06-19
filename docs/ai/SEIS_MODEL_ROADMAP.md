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
| 3 — Data & tokenizer | provenance/license-tracked data pipeline + tokenizer study | reproducible dataset manifests + tokenizer report | not started |
| 4 — Nano model | original small model trained from scratch | loss ↓, checkpoint restore, tiny-set overfit, eval runs, resumable | not started |
| 5 — Training platform | scalable, resumable, tracked training | distributed run reproducible | not started |
| 6 — Capabilities | measurable curricula (TR/EN, code, repo, math, design, tools, safety) | per-stage eval gates | not started |
| 7 — Evaluation lab | permanent eval suite + promotion gates | contamination-resistant gates green | not started |
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

Phase 3: data-governance + tokenizer study (provenance/license-tracked). The
first Phase 2 architecture ADR is recorded at
[`docs/decisions/ai-model-architecture-family.md`](../decisions/ai-model-architecture-family.md)
(decoder-only nano start) — docs/reasoning only, no code, no training.
