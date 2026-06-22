# SEIS Model Specification

Date: 2026-06-19
Phase: SEIS Universe Phase 1 (V16 §18). Concrete targets for the first SEIS model
family, governed by the [constitution](./SEIS_MODEL_CONSTITUTION.md).

> These are **target specifications for a future research effort**, not measured
> results. No weights exist (V16 §16). All numbers are revisited once real
> training hardware is measured (see [`COMPUTE_CAPACITY.md`](./COMPUTE_CAPACITY.md)).

## Capability targets

| Dimension | Target |
|---|---|
| Languages | Turkish + English (first-class), with code as a primary "language" |
| Modalities (initial) | text + code only (multimodal deferred, V16 §18 Phase 9) |
| Reasoning | instruction following, math/logic, repository-level engineering |
| Design | UI/UX + visual-communication reasoning (text form first) |
| Safety | refusal + calibrated uncertainty as core behaviours |

## Technical targets (tiered, revisited per hardware)

| Tier | Intent | Indicative params | Where it runs |
|---|---|---|---|
| `nano` | prove the full pipeline end-to-end | tiny (CPU-trainable) | observed sandbox (V16 §18 Phase 4) |
| `small` | first useful model | TBD after capacity audit | single accelerator |
| `base` | first production candidate | TBD | distributed training |

Other targets (all `TBD` until measured): context length, tokenizer vocab size,
latency budget, memory footprint, deployment targets (local / cloud / Apple-MLX),
supported devices.

## Tokenizer requirements (V16 §18 Phase 3)

Evaluate, do not assume: vocabulary size; Turkish / English / code / math
efficiency; Unicode + byte fallback; compression ratio and token fertility;
unknown-token behaviour. Do not pick a tokenizer merely because another model
uses it.

## Frameworks (V16 §19, §24)

- **PyTorch** for portable, scalable training (default).
- **MLX** for Apple-compatible experiments/inference where appropriate.
- **JAX** only where a verified distributed/research advantage exists.
- Lower-level (Metal/CUDA/C++/Rust) only where profiling proves value.

## Measurable success criteria

A version is only meaningful when it passes the evaluation gates in
[`SEIS_MODEL_ROADMAP.md`](./SEIS_MODEL_ROADMAP.md) Phase 7 (language quality,
TR/EN fluency, coding correctness, reasoning, instruction following, long-context,
hallucination rate, calibration, bias/safety, latency, memory, cost) against
contamination-resistant held-out sets — never leaderboard scores alone.
