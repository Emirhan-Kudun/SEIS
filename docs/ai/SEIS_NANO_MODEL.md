# SEIS Nano Model (Phase 4)

Date: 2026-06-19
Phase: SEIS Universe Phase 4 (V16 §18). Implementation lives in
[`research/nano/`](../../research/nano/README.md); governed by the
[constitution](./SEIS_MODEL_CONSTITUTION.md) and the decoder-family
[ADR](../decisions/ai-model-architecture-family.md).

> The nano model is a **proof of the pipeline**, not a capable model (V16 §16).
> It is original, stdlib-only, CPU-trained on a tiny SEIS-owned corpus, with no
> external data, network, or dependencies.

## Purpose

Prove that the complete training system works before any scaling: tokenizer →
forward → loss → backprop → optimizer → checkpoint → deterministic eval →
generation → resumable training (V16 §18 Phase 4).

## Result — gate PASSED (2026-06-19, CPU sandbox)

| Gate criterion | Observed |
|---|---|
| loss decreases | `2.9571 → 0.0490` (400 epochs) |
| checkpoint recovery works | `gen` from saved checkpoint reproduces the corpus |
| tiny-set overfit succeeds | loss → ~0 (vocab 19, 46 examples) |
| evaluation pipeline runs | corpus loss reported each run |
| generation changes meaningfully | random → memorised corpus |
| training resumes after interruption | `resume` continued `0.0490 → 0.0410` |
| deterministic | same seed → identical `first/final loss` |

Reproduce: see [`research/nano/README.md`](../../research/nano/README.md).

## Hard stop (V16 §18, §19, §32)

Do **not** scale to the `small`/`base` tiers until:

1. real training hardware is measured ([`COMPUTE_CAPACITY.md`](./COMPUTE_CAPACITY.md));
2. the [data governance](./SEIS_DATA_GOVERNANCE.md) +
   [tokenizer study](./SEIS_TOKENIZER_STUDY.md) produce reproducible artifacts;
3. a human approves starting real training.

The ephemeral CI sandbox is for the nano proof only — never for real
pretraining.
