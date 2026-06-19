# Source Basis & Provenance

Date: 2026-06-19

How SEIS work is sourced and why it is lawful and original (V16 §17, §21, §31).
This is the standing provenance record for the foundation; clean-room operations
add their own entries here.

## Implementation source priority (V16 §21 Phase 3)

When sources conflict, higher wins:

1. Official documentation
2. Official specifications & standards
3. Official API references
4. Official sample code (within its license)
5. Existing SEIS-owned code
6. SEIS requirements & architecture decisions
7. Clearly licensed open-source software
8. Independent first-principles engineering

## Basis of the current foundation

| Area | Basis |
|---|---|
| AI Core layer (router/agents/prompts/evals) | original SEIS design over a provider-agnostic interface; builds on existing `ai-routing-policy.json` |
| Language versions | original SEIS concept; honest naming (not base-model claims) |
| Command Center spec | original mapping onto existing `apps/web` cockpit; Apple/Linear/etc. used only as quality references, never copied |
| Universe Phase 0 docs | first-principles + honest audit of observed state; no copied research |
| Data model / API design | first-principles + public REST/auth best practices; no proprietary schemas |
| Threat model | public security best practices (least privilege, defense in depth) |

No proprietary, leaked, or private third-party material was used as an
implementation source. Incidental similarity from public standards/idioms is not
a violation (V16 §21 Phase 3), but each major decision has an independent basis.

## Clean-room log

No clean-room (restricted-reference) analysis has been required to date. When it
is, follow V16 §21:

1. Isolated analysis → only `REFERENCE_REQUIREMENTS.md` (WHAT, never HOW).
2. Complete separation → new thread/branch, reference access removed.
3. Official-documentation-first build by an isolated agent.
4. Independent validation (secret/dependency/license scan, leakage review).

Record each clean-room operation as a dated entry below.

| Date | Operation | Reference class | Deliverable | Reviewer verdict |
|---|---|---|---|---|
| — | (none yet) | — | — | — |

## Honesty guarantees (V16 §16, §40)

- No SEIS-owned base model, weights, datasets, or training exist yet; nothing is
  presented as such.
- External-provider capability is never labelled as learned SEIS-model
  intelligence.
- No credentials, hosts, test results, deployments, or training results are
  invented.
