# SEIS Tokenizer Study

Date: 2026-06-19
Phase: SEIS Universe Phase 3 (V16 §18). Pairs with
[`SEIS_DATA_GOVERNANCE.md`](./SEIS_DATA_GOVERNANCE.md); governed by the
[specification](./SEIS_MODEL_SPECIFICATION.md).

> No tokenizer exists yet (V16 §16). This defines **how** a SEIS tokenizer is
> chosen — by measurement, not by copying another model's choice.

## Evaluation criteria (V16 §18 Phase 3)

Measure each candidate on:

| Criterion | What to measure |
|---|---|
| Vocabulary size | size vs. coverage trade-off |
| Turkish efficiency | tokens/char on representative TR text |
| English efficiency | tokens/char on representative EN text |
| Code efficiency | tokens on common languages SEIS uses |
| Math notation | handling of symbols/expressions |
| Design terminology | UI/UX + design vocabulary coverage |
| Unicode handling | scripts, emoji, combining marks |
| Byte fallback | graceful handling of unseen bytes |
| Compression ratio | overall corpus compression |
| Token fertility | average tokens per word (lower is better, in balance) |
| Unknown-token behaviour | no information loss |

## Candidate approaches (compare, do not assume)

- Byte-level BPE
- Unigram / SentencePiece
- Byte-fallback BPE variants

Each is scored on the criteria above against SEIS-representative TR/EN/code/math
corpora drawn through the [data governance](./SEIS_DATA_GOVERNANCE.md) pipeline.

## Rules

- **Do not** pick a tokenizer merely because an existing model uses it
  (V16 §18 Phase 3).
- Turkish efficiency is a first-class requirement, not an afterthought.
- The chosen tokenizer is recorded as an ADR under `docs/decisions/` with its
  measured evidence, then versioned alongside model versions.
- Tokenizer artifacts are SEIS-owned (V16 §16); no proprietary vocab is copied.

## Output

A tokenizer comparison report + a recommendation ADR (`docs/decisions/`). Until
then, no tokenizer is selected and no training proceeds (V16 §18 Phase 4 gate).
