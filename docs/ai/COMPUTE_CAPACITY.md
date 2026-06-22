# Compute Capacity

Date: 2026-06-19
Phase: SEIS Universe Phase 0 (V16 §18, §19 hardware-aware execution).

This records **only** capacity that has actually been observed. Unobserved
hardware is marked as a placeholder — never invented (V16 §6, §40).

## Observed: ephemeral CI/dev sandbox

The only environment observed in this session is the disposable Claude Code
container that ran the audit. It is **not** a training environment.

| Resource | Observed value |
|---|---|
| CPU | 4 cores |
| RAM | ~15 GiB |
| Disk | 252 GB total (~30 GB free) |
| GPU / accelerator | none detected |
| OS / kernel | Linux 6.18.5 |

Suitable for: docs, code, lints, small unit tests, and a **nano** CPU-only
overfitting smoke test (V16 §18 Phase 4). **Not** suitable for any real
pretraining or fine-tuning.

## Unobserved (placeholders — fill in with real audits before any training)

| Resource | Value |
|---|---|
| Production / training GPUs | `<UNKNOWN — to be measured>` |
| Cloud accelerator quota | `<UNKNOWN>` |
| Apple-silicon (MLX) dev machine | `<UNKNOWN>` |
| Sustained storage for datasets/checkpoints | `<UNKNOWN>` |
| Network egress budget for data ingestion | `<UNKNOWN>` |

## Rule

Per V16 §19: do not choose model size or start any training job until real
training hardware is measured and documented here. Use staged experiments with
measurable promotion gates; never begin an unbounded training run.
