# SEIS Universe — nano research model

Phase 4 proof-of-pipeline (V16 §18). An **original, from-scratch, stdlib-only**
char-level next-character model. It proves the full training loop works
end-to-end on the observed CPU sandbox before anything is scaled.

> This is **not** a SEIS foundation model and has no real capability (V16 §16).
> It exists only to satisfy the Phase 4 gate honestly. No external data, no
> network, no dependencies, no GPU.

## What it proves (V16 §18 Phase 4 gate)

| Criterion | How |
|---|---|
| tokenizer | char-level vocab built from `corpus.txt` |
| forward / loss | MLP forward + cross-entropy |
| backprop / optimizer | manual gradients + SGD |
| checkpoint save & restore | JSON in `runs/` (gitignored) |
| deterministic mode | fixed `--seed` → identical loss |
| evaluation | reported loss over the corpus |
| generation | greedy/sampled char generation |
| resumable training | `resume` continues from a checkpoint |

## Run

```bash
cd research/nano
python3 nano_model.py train  --epochs 400 --out runs/ckpt.json
python3 nano_model.py resume --epochs 200 --out runs/ckpt.json
python3 nano_model.py gen    --out runs/ckpt.json --length 90
```

## Observed results (2026-06-19, CPU sandbox)

- **Loss decreases:** `2.9571 → 0.0490` over 400 epochs; `resume` continued to
  `0.0410` (training is resumable).
- **Overfit on tiny set succeeds:** loss approaches 0 (vocab 19, 46 examples).
- **Checkpoint restore + generation:** `gen` from the saved checkpoint reproduces
  the corpus (`seis ai core stays calm, modular, and honest.` …).
- **Deterministic:** two runs with the same seed produced identical
  `first_loss 2.9842` and `final_loss 0.1980`.
- **Fast:** ~4 seconds for 400 epochs.

Checkpoints under `runs/` are generated artifacts and are gitignored.

## Gate / next step

The Phase 4 gate passes. Per V16 §18/§19, **do not scale** to the `small` tier
until real training hardware is measured ([`../../docs/ai/COMPUTE_CAPACITY.md`](../../docs/ai/COMPUTE_CAPACITY.md))
and a tokenizer/data study completes ([`../../docs/ai/SEIS_DATA_GOVERNANCE.md`](../../docs/ai/SEIS_DATA_GOVERNANCE.md)).
Starting real training is human-approved (V16 §32).
