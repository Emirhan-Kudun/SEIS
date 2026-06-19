# SEIS Evaluation Lab (Phase 7)

Date: 2026-06-19
Phase: SEIS Universe Phase 7 — evaluation-first development (V16 §18, §30).
Pairs the criteria in [`packages/evals`](../../packages/evals/README.md) with a
runnable harness.

> Evaluation must be **measured, not asserted** (V16 §16). Today only a toy nano
> harness exists; it proves the evaluation pipeline works, not model capability.

## What exists now

- **Criteria** (doc): [`packages/evals`](../../packages/evals/README.md) — quality,
  safety, architecture alignment, documentation, code quality, task completion.
- **Runnable harness**: [`research/nano/eval.py`](../../research/nano/eval.py) —
  trains the nano model deterministically and reports `final_loss`,
  `char_accuracy`, and `exact_match` (writes `research/nano/runs/eval.json`).

```bash
npm run eval:nano        # or: python3 research/nano/eval.py
```

Observed (2026-06-19): `final_loss 0.0826`, `char_accuracy 1.0`,
`exact_match true` — expected for a tiny overfit corpus; this confirms the
harness *measures* an output, not that the model is capable.

## Target evaluation suite (V16 §18 Phase 7)

Measured against contamination-resistant held-out sets, never leaderboards alone:
language quality, TR/EN fluency, factual accuracy, coding correctness,
repository-level engineering, math reasoning, instruction following, long-context,
tool-use accuracy, design reasoning, hallucination rate, calibration, bias/safety,
latency, memory, throughput, energy/compute cost.

## Promotion gates

A model version is promoted only when it passes explicit quality, safety,
performance, and regression gates (V16 §18 Phase 7). The nano regression gate
(`npm run check:nano`) is the first such gate; capability gates require real data,
a real tokenizer, and measured hardware (V16 §19) — and are human-approved
(§32).

## Rules

- Never optimise solely for a leaderboard score.
- Never claim a score that was not produced by a run (V16 §30, §40).
- Keep held-out sets uncontaminated (see [data governance](./SEIS_DATA_GOVERNANCE.md)).
