# Prompt Versioning

Prompts are versioned so behaviour changes are traceable, like the rest of SEIS
AI Core (see [SEIS Language Versions](../../docs/platform/seis-language-versions.md)).

## Rules

- Each template carries an `id` (stable) and a `version` (integer).
- Bump `version` when instructions or output shape change behaviour; trivial
  copy edits do not bump.
- Never silently change a prompt's meaning under the same version.
- Significant template sets map to a SEIS Prompt Engine language version
  (currently `seis-prompt-engine-v0.1`).
- Record notable changes in [`CHANGELOG.md`](../../CHANGELOG.md).
