# SEIS Plugin Assisted Sprint Plan

- Generated: 2026-06-03
- Source queue plugins: 300
- Sprint plan plugins: 300
- Waves: 4
- Lane plans: 12
- Sprint phase records: 48
- Ready plugins: 20
- Queued until auth plugins: 280
- Live plugin invocation allowed plans: 0
- Live AI invocation allowed plans: 0
- Autonomous repo modification allowed plans: 0

## Waves

| wave | plugins | ready | queued | lanes | helpers |
| --- | ---: | ---: | ---: | ---: | --- |
| wave-1-foundation | 95 | 5 | 90 | 4 | claude, codex, cortex, gemini, human-review, local-skill-runtime, plugin-runtime-router |
| wave-2-product-experience | 75 | 6 | 69 | 3 | claude, codex, cortex, gemini, human-review, openai |
| wave-3-growth-intelligence | 78 | 2 | 76 | 3 | claude, codex, cortex, gemini, human-review, openai |
| wave-4-operations-research | 52 | 7 | 45 | 2 | claude, gemini, human-review, openai |

## Lane Plans

| wave | lane | plugins | ready | queued | objective |
| --- | --- | ---: | ---: | ---: | --- |
| wave-1-foundation | security-quality-and-governance | 19 | 0 | 19 | Tighten source gates, compliance checks, and review evidence before broader execution. |
| wave-1-foundation | backend-data-and-api | 31 | 0 | 31 | Strengthen backend, data, API, and schema readiness without live connector payload capture. |
| wave-1-foundation | cloud-devops-and-release | 31 | 5 | 26 | Prepare release, hosting, observability, and rollback paths with branch-safe gates. |
| wave-1-foundation | platform-native-and-polyglot | 14 | 0 | 14 | Keep full-stack language coverage and platform-native surfaces visible and validated. |
| wave-2-product-experience | builder-and-prototyping | 18 | 1 | 17 | Convert builder plugins into bounded prototype and product-surface candidates. |
| wave-2-product-experience | creative-production-and-design | 18 | 1 | 17 | Channel design and creative plugins into accessible, reviewable experience improvements. |
| wave-2-product-experience | ai-workflow-docs-and-knowledge | 39 | 4 | 35 | Turn AI workflow plugins into documentation, knowledge, and source-routing improvements. |
| wave-3-growth-intelligence | analytics-observability-and-growth | 30 | 2 | 28 | Prepare analytics and growth sources for metric-safe investigation workflows. |
| wave-3-growth-intelligence | sales-gtm-and-market-intelligence | 30 | 0 | 30 | Queue GTM intelligence plugins behind authenticated scope and PII-safe handoff gates. |
| wave-3-growth-intelligence | finance-investing-and-payments | 18 | 0 | 18 | Keep finance and payment work advisory, sourced, and review-gated. |
| wave-4-operations-research | collaboration-calendar-and-support | 35 | 3 | 32 | Route collaboration and support plugins into handoff, triage, and work-management plans. |
| wave-4-operations-research | specialized-domain-and-research | 17 | 4 | 13 | Queue research-domain plugins behind evidence, scope, and human review requirements. |

## Governance

- Sprint waves turn all connected plugin assistance into bounded development passes.
- Each lane plan carries quality commands, helper routes, rollback guidance, and blocker separation.
- Auth-blocked plugins stay planned and visible without live connector or AI invocation.
