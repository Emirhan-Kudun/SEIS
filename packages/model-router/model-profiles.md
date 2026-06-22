# Model Profiles

A **profile** is a named, provider-agnostic intent — not a specific model id.
The router resolves a profile to a concrete model per provider at runtime, so
swapping providers does not require changing call sites.

## Initial profiles

| Profile | Intent | Typical use |
|---|---|---|
| `reasoning` | Deep, durable reasoning | architecture, planning, integration |
| `fast` | Low-latency, low-cost | quick patches, summaries, drafts |
| `long-context` | Large-window reading | doc synthesis, repo scans |
| `local` | On-device / private | offline notes, private data (privacy route) |

## Rules

- Profiles describe intent; concrete model selection lives in each provider
  adapter and is resolved from environment/runtime config.
- Profiles never encode secrets or proprietary model internals.
- Add a profile only when a genuinely distinct intent exists — avoid profile
  sprawl.
