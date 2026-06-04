# SEIS Plugin Assisted Review Matrix

- Generated: 2026-06-03
- Review matrix plugins: 300
- Wave review records: 4
- Lane review records: 12
- Review items: 300
- Ready review items: 20
- Auth-blocked review items: 280
- Review gate records: 2400
- Auto approval allowed items: 0
- Auto merge allowed items: 0
- Auto deploy allowed items: 0
- Live plugin invocation allowed review items: 0
- Live AI invocation allowed review items: 0

## Gates

| gate | label |
| --- | --- |
| explicit_task_scope | Explicit task scope |
| human_review | Human review |
| generated_checks | Generated checks |
| pull_request | Pull request |
| code_scanning | Code scanning |
| verified_signature | Verified signature |
| deployment_status | Deployment status |
| rollback_owner | Rollback owner |

## Waves

| wave | reviews | ready | auth-blocked | gates | next review action |
| --- | ---: | ---: | ---: | ---: | --- |
| wave-1-foundation | 95 | 5 | 90 | 760 | prepare_review_packet_then_resolve_branch_protection_gates |
| wave-2-product-experience | 75 | 6 | 69 | 600 | prepare_review_packet_then_resolve_branch_protection_gates |
| wave-3-growth-intelligence | 78 | 2 | 76 | 624 | prepare_review_packet_then_resolve_branch_protection_gates |
| wave-4-operations-research | 52 | 7 | 45 | 416 | prepare_review_packet_then_resolve_branch_protection_gates |

## Lanes

| wave | lane | reviews | ready | auth-blocked | gates | next review action |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| wave-1-foundation | security-quality-and-governance | 19 | 0 | 19 | 152 | keep_review_items_blocked_until_authentication_and_task_scope_exist |
| wave-1-foundation | backend-data-and-api | 31 | 0 | 31 | 248 | keep_review_items_blocked_until_authentication_and_task_scope_exist |
| wave-1-foundation | cloud-devops-and-release | 31 | 5 | 26 | 248 | prepare_one_ready_review_packet_with_generated_checks |
| wave-1-foundation | platform-native-and-polyglot | 14 | 0 | 14 | 112 | keep_review_items_blocked_until_authentication_and_task_scope_exist |
| wave-2-product-experience | builder-and-prototyping | 18 | 1 | 17 | 144 | prepare_one_ready_review_packet_with_generated_checks |
| wave-2-product-experience | creative-production-and-design | 18 | 1 | 17 | 144 | prepare_one_ready_review_packet_with_generated_checks |
| wave-2-product-experience | ai-workflow-docs-and-knowledge | 39 | 4 | 35 | 312 | prepare_one_ready_review_packet_with_generated_checks |
| wave-3-growth-intelligence | analytics-observability-and-growth | 30 | 2 | 28 | 240 | prepare_one_ready_review_packet_with_generated_checks |
| wave-3-growth-intelligence | sales-gtm-and-market-intelligence | 30 | 0 | 30 | 240 | keep_review_items_blocked_until_authentication_and_task_scope_exist |
| wave-3-growth-intelligence | finance-investing-and-payments | 18 | 0 | 18 | 144 | keep_review_items_blocked_until_authentication_and_task_scope_exist |
| wave-4-operations-research | collaboration-calendar-and-support | 35 | 3 | 32 | 280 | prepare_one_ready_review_packet_with_generated_checks |
| wave-4-operations-research | specialized-domain-and-research | 17 | 4 | 13 | 136 | prepare_one_ready_review_packet_with_generated_checks |

## Governance

- Review matrix translates action cards into publish and branch-protection review gates.
- Every plugin review item requires task scope, human review, generated checks, pull request review, code scanning, verified signatures, deployment status, and rollback ownership.
- Ready review items remain local-bounded candidates; auth-blocked review items stay blocked until explicit authenticated task scope exists.
