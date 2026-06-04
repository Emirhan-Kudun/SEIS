# Sprint Operating System

## Calendar (10 Sprint)

- Sprint 1: 2026-05-06 -> 2026-05-12
- Sprint 2: 2026-05-13 -> 2026-05-19
- Sprint 3: 2026-05-20 -> 2026-05-26
- Sprint 4: 2026-05-27 -> 2026-06-02
- Sprint 5: 2026-06-03 -> 2026-06-09
- Sprint 6: 2026-06-10 -> 2026-06-16
- Sprint 7: 2026-06-17 -> 2026-06-23
- Sprint 8: 2026-06-24 -> 2026-06-30
- Sprint 9: 2026-07-01 -> 2026-07-07
- Sprint 10: 2026-07-08 -> 2026-07-14

## Workflow

1. Run core orchestration (`browser -> local QA -> security -> logs/actions`).
2. Keep integration mode as `always-on core + on-demand registry`.
3. Generate guarded-write output (`suggested -> approved -> implemented`).
4. Apply incremental diff implementation only after approval gates.
5. Run quality checks and regression checks.
6. Report KPI + DoD + connector-step audit.
7. Request sprint sign-off.

## Required Core Run Output

Each run must include connector step rows with:

- `connector`
- `status` (`invoked|skipped`)
- `reason`
- `duration_ms`
- `next_action`

## Sprint-End Checkpoint Template

### KPI Result

- Goal:
- Baseline:
- Outcome:
- Status (`pass|partial|fail`):

### Definition of Done

- [ ] Functional tests passed
- [ ] Regression checks passed
- [ ] i18n parity passed (`tr/en/fr/it/de`)
- [ ] Accessibility quick pass done
- [ ] Security check status recorded (high findings = 0)
- [ ] Connector-step audit attached

### Risks and Follow-ups

- Risk:
- Mitigation:
- Owner:
