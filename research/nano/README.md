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

## Regression gate

A deterministic smoke test enforces the pipeline (loss decreases, checkpoint
round-trips losslessly, fixed-seed determinism):

```bash
npm run check:nano        # from repo root; skip-safe if python3 is absent
# or: python3 research/nano/smoke_test.py
```

## v1 features

- LR warmup + linear decay; temperature + top-k sampling
  (`gen --temp 0.7 --topk 5`); resumable training; a committed trained
  checkpoint at `checkpoints/seis-nano-v1.json`.

## Observed results (2026-06-21, CPU sandbox — seis-nano-v1)

- **Loss decreases:** `3.3113 → 0.6619` over 600 epochs (hidden 96) on the richer
  6-sentence SEIS corpus (vocab 27, 298 examples) — ~80% reduction in ~78s.
- **Learns structure, not verbatim:** greedy generation yields a plausible SEIS
  phrase; sampling (`--temp 0.7 --topk 5`) yields varied SEIS-flavoured text.
  This is honest — a 3-char-context nano does not memorise a varied corpus.
- **Checkpoint restore:** lossless round-trip; `resume` continues training.
- **Deterministic:** same seed → identical first/final loss.

Checkpoints under `runs/` are generated artifacts and are gitignored.

## Gate / next step

The Phase 4 gate passes. Per V16 §18/§19, **do not scale** to the `small` tier
until real training hardware is measured ([`../../docs/ai/COMPUTE_CAPACITY.md`](../../docs/ai/COMPUTE_CAPACITY.md))
and a tokenizer/data study completes ([`../../docs/ai/SEIS_DATA_GOVERNANCE.md`](../../docs/ai/SEIS_DATA_GOVERNANCE.md)).
Starting real training is human-approved (V16 §32).
