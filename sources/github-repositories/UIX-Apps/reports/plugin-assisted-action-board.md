# SEIS Plugin Assisted Action Board

- Generated: 2026-06-03
- Action board plugins: 300
- Wave columns: 4
- Lane columns: 12
- Action cards: 300
- Ready action cards: 20
- Auth-blocked action cards: 280
- Gate records: 1500
- Live plugin invocation allowed cards: 0
- Live AI invocation allowed cards: 0
- Autonomous repo modification allowed cards: 0

## Waves

| wave | cards | ready | auth-blocked | gates | next action |
| --- | ---: | ---: | ---: | ---: | --- |
| wave-1-foundation | 95 | 5 | 90 | 475 | run_one_lane_local_bounded_change_with_generated_checks |
| wave-2-product-experience | 75 | 6 | 69 | 375 | run_one_lane_local_bounded_change_with_generated_checks |
| wave-3-growth-intelligence | 78 | 2 | 76 | 390 | run_one_lane_local_bounded_change_with_generated_checks |
| wave-4-operations-research | 52 | 7 | 45 | 260 | run_one_lane_local_bounded_change_with_generated_checks |

## Lanes

| wave | lane | cards | ready | auth-blocked | next action |
| --- | --- | ---: | ---: | ---: | --- |
| wave-1-foundation | security-quality-and-governance | 19 | 0 | 19 | keep_queued_until_authentication_and_task_scope_exist |
| wave-1-foundation | backend-data-and-api | 31 | 0 | 31 | keep_queued_until_authentication_and_task_scope_exist |
| wave-1-foundation | cloud-devops-and-release | 31 | 5 | 26 | select_one_ready_plugin_and_apply_reversible_repo_change |
| wave-1-foundation | platform-native-and-polyglot | 14 | 0 | 14 | keep_queued_until_authentication_and_task_scope_exist |
| wave-2-product-experience | builder-and-prototyping | 18 | 1 | 17 | select_one_ready_plugin_and_apply_reversible_repo_change |
| wave-2-product-experience | creative-production-and-design | 18 | 1 | 17 | select_one_ready_plugin_and_apply_reversible_repo_change |
| wave-2-product-experience | ai-workflow-docs-and-knowledge | 39 | 4 | 35 | select_one_ready_plugin_and_apply_reversible_repo_change |
| wave-3-growth-intelligence | analytics-observability-and-growth | 30 | 2 | 28 | select_one_ready_plugin_and_apply_reversible_repo_change |
| wave-3-growth-intelligence | sales-gtm-and-market-intelligence | 30 | 0 | 30 | keep_queued_until_authentication_and_task_scope_exist |
| wave-3-growth-intelligence | finance-investing-and-payments | 18 | 0 | 18 | keep_queued_until_authentication_and_task_scope_exist |
| wave-4-operations-research | collaboration-calendar-and-support | 35 | 3 | 32 | select_one_ready_plugin_and_apply_reversible_repo_change |
| wave-4-operations-research | specialized-domain-and-research | 17 | 4 | 13 | select_one_ready_plugin_and_apply_reversible_repo_change |

## Governance

- Action cards translate the execution ledger into reviewable next steps.
- Ready cards are scoped to one local bounded repository improvement with generated checks.
- Auth-blocked cards stay visible and explicitly blocked until authenticated task scope exists.
