# SEIS Nano Model (Phase 4)

Date: 2026-06-21 · Model: **seis-nano-v1** (trained checkpoint committed at
[`research/nano/checkpoints/seis-nano-v1.json`](../../research/nano/checkpoints/seis-nano-v1.json))
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

## v1 features

- **LR schedule** — linear warmup then linear decay to 10% of base lr.
- **Sampling** — temperature + top-k generation (`gen --temp 0.7 --topk 5`),
  greedy by default.
- **Resumable** — `resume` continues training from a checkpoint.
- **Committed trained checkpoint** — `seis-nano-v1.json` (a real, version-
  controlled trained model artifact).

## Result — gate PASSED (2026-06-21, CPU sandbox)

Trained on a **richer 6-sentence SEIS corpus** (vocab 27, 298 examples). The
model now learns *structure*, not verbatim memorisation — this is the honest
Phase-4 truth, not a capable model (V16 §16).

| Gate criterion | Observed (seis-nano-v1) |
|---|---|
| loss decreases | `3.3113 → 0.6619` (600 epochs, hidden 96) — ~80% reduction |
| checkpoint save/restore | lossless round-trip (smoke test) |
| evaluation pipeline runs | `eval.py` → final_loss `1.1185`, char_accuracy `0.0983` (partial, expected for a 3-char-context model on a varied corpus) |
| generation | greedy → plausible SEIS phrase; `--temp 0.7 --topk 5` → varied SEIS-flavoured text |
| training resumes | `resume` continues from the checkpoint |
| deterministic | same seed → identical first/final loss |

Reproduce: see [`research/nano/README.md`](../../research/nano/README.md).

## Hard stop (V16 §18, §19, §32)

Do **not** scale to the `small`/`base` tiers until:

1. real training hardware is measured ([`COMPUTE_CAPACITY.md`](./COMPUTE_CAPACITY.md));
2. the [data governance](./SEIS_DATA_GOVERNANCE.md) +
   [tokenizer study](./SEIS_TOKENIZER_STUDY.md) produce reproducible artifacts;
3. a human approves starting real training.

The ephemeral CI sandbox is for the nano proof only — never for real
pretraining.
