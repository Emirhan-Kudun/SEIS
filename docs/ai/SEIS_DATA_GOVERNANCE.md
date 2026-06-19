# SEIS Data Governance

Date: 2026-06-19
Phase: SEIS Universe Phase 3 (V16 §18). Governed by the
[model constitution](./SEIS_MODEL_CONSTITUTION.md); sequenced in the
[roadmap](./SEIS_MODEL_ROADMAP.md).

> No datasets exist yet (V16 §16). This defines the **reproducible, provenance-
> tracked** pipeline that any future SEIS training data must pass through. No data
> is ingested until the source authority below is satisfied.

## Allowed data sources (V16 §17D)

In priority order: SEIS-owned data → explicitly authorized data → public-domain →
clearly licensed datasets → properly attributed open datasets → validated
synthetic data → human-reviewed SEIS-generated data. Anything else is excluded.

## Per-dataset manifest (required fields, V16 §18 Phase 3)

Every dataset version carries a manifest tracking:

```jsonc
{
  "id": "<dataset-id>",
  "version": "<semver-or-date>",
  "origin": "<where it came from>",
  "license": "<SPDX or explicit grant>",
  "consent": "<authorization/consent status>",
  "language": ["tr", "en", "code", "math"],
  "domain": "<e.g. software, design, general>",
  "qualityScore": "<0-1 + method>",
  "dedup": "<exact + near-duplicate status>",
  "filtering": "<quality/safety filters applied>",
  "safetyClass": "<sensitive-data + secret-scan result>",
  "inclusionReason": "<why included>",
  "transformations": ["<ordered history>"],
  "splits": { "train": "...", "validation": "...", "test": "..." }
}
```

No manifest → no inclusion. Manifests are versioned and reproducible.

## Pipeline stages

1. **Ingestion** — record origin + license + consent up front.
2. **Normalization** — encoding, whitespace, structure.
3. **Language detection** — tag tr / en / code / math.
4. **Quality filtering** — drop low-quality/boilerplate.
5. **Deduplication** — exact + near-duplicate removal.
6. **Sensitive-data + secret detection** — never ingest secrets or personal data
   (V16 §23); use the existing secret-scan posture.
7. **Contamination checks** — keep evaluation held-out sets uncontaminated.
8. **Split** — deterministic train / validation / test separation.
9. **Manifest + versioning** — emit the manifest; pin a reproducible version.

## Rules

- Provenance and license are recorded **before** any processing (V16 §17, §21).
- Held-out evaluation sets must remain contamination-resistant (V16 §18 Phase 7).
- Dataset-inclusion-policy changes are **human-approved** (V16 §32).
- No proprietary/leaked/unlicensed material, ever (V16 §21, §40).
- Provider-side retention is out of SEIS control; use strictest settings (§21).

See the tokenizer study: [`SEIS_TOKENIZER_STUDY.md`](./SEIS_TOKENIZER_STUDY.md).
