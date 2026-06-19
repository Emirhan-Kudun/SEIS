# SEIS Model Constitution

Date: 2026-06-19
Phase: SEIS Universe Phase 1 (V16 §18). Follows the Phase 0
[baseline](./SEIS_MODEL_BASELINE.md) / [capacity](./COMPUTE_CAPACITY.md) /
[gap analysis](./MODEL_GAP_ANALYSIS.md).

The constitution states **why** a SEIS-owned model would exist and the
non-negotiable boundaries around it. Concrete numbers live in
[`SEIS_MODEL_SPECIFICATION.md`](./SEIS_MODEL_SPECIFICATION.md); the staged plan
lives in [`SEIS_MODEL_ROADMAP.md`](./SEIS_MODEL_ROADMAP.md).

> Honesty first (V16 §16, §40): no SEIS-owned model, weights, tokenizer,
> datasets, or training exist today. This document is a forward charter, not a
> claim of capability.

## Purpose

A SEIS-owned model family would give the ecosystem an independently controlled,
measurable intelligence specialised for SEIS work — primarily Turkish/English
language, software engineering, repository understanding, reasoning, and design
communication — rather than depending solely on external providers.

## Principles

- **Honest naming.** Application-layer behaviour (routing, prompts, RAG, tools)
  is never presented as learned model intelligence.
- **Evidence over claims.** No claim of quality, safety, originality, or AGI
  without measurable, reproducible evidence (V16 §15).
- **Ownership (V16 §16).** A genuine SEIS model must independently control
  architecture, tokenizer, config, training + data pipelines, checkpoint format,
  evaluation suite, inference, documentation, safety, and release governance. A
  third-party checkpoint / adapter / fine-tune / API integration is labelled as
  such and never renamed a SEIS foundation model.
- **Clean-room (V16 §21).** Built from official docs, standards, licensed
  research/data, and SEIS-owned work — never from proprietary/leaked material.
- **Hardware-aware (V16 §19).** Size and training strategy follow measured
  capacity; no unbounded training jobs.
- **Safety by design.** Refusal, uncertainty communication, and bias/safety
  evaluation are first-class capabilities, not afterthoughts.

## Safety boundaries

- The model must be able to refuse unsafe requests and express uncertainty.
- Data must be provenance- and license-tracked; no poisoning, no contamination
  of held-out evaluation sets.
- Promotion of any version requires passing explicit quality, safety, and
  regression gates (V16 §18 Phase 7).
- Training, checkpoint publishing, and dataset-policy changes are human-approved
  (V16 §32).

## Non-goals (initial)

- No claim of a frontier / ChatGPT- or Claude-class base model.
- No multimodal training before the text+code foundation is stable (V16 §18
  Phase 9).
- No production training in the ephemeral CI sandbox.
- No leaderboard-only optimisation (V16 §18 Phase 7).
