# SEIS Model Baseline

Date: 2026-06-19
Phase: SEIS Universe Phase 0 — Repository & Capacity Audit (V16 §18).

This is an honest baseline of what AI-related capability exists in SEIS **today**.
It deliberately makes no claim of an original trained model.

## What exists today

| Area | Status | Evidence |
|---|---|---|
| AI **application layer** | present (specification) | [`docs/platform/seis-ai-core.md`](../platform/seis-ai-core.md), `packages/model-router`, `packages/agent-runtime`, `packages/prompt-engine`, `packages/evals` |
| Model **routing policy** | present, CI-validated | [`content/governance/ai-routing-policy.json`](../../content/governance/ai-routing-policy.json), `npm run check:ai-routing-policy` |
| Language **versions** | present (manifest) | [`content/governance/seis-language-versions.json`](../../content/governance/seis-language-versions.json), `npm run check:ai-core` |
| Original model **architecture** | **none** | no model definition in repo |
| Tokenizer | **none** | no tokenizer artifact |
| Training pipeline | **none** | no training code |
| Datasets | **none owned** | no dataset registry or data files |
| Checkpoints | **none** | no weights of any kind |
| Evaluation harness (executable) | **none** | `packages/evals` is criteria docs only |
| Inference runtime | **none** | routing connects to external providers only |

## Honest classification

SEIS currently operates an **application layer over external LLM providers**. There
is no SEIS-owned base model, no weights, no training, and no datasets. Per V16 §16,
nothing in this repository may be presented as an independently trained SEIS
foundation model.

## Implication

A genuine "SEIS Universe" model is a **future, staged research effort** (V16 §18
Phases 1–9), gated on measurable evidence and real hardware. See
[`MODEL_GAP_ANALYSIS.md`](./MODEL_GAP_ANALYSIS.md) for the gap and
[`COMPUTE_CAPACITY.md`](./COMPUTE_CAPACITY.md) for what can realistically run.
