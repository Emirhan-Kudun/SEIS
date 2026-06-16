# Automation Kill-Switch Decision Record

Date: 2026-06-15

SEIS adopts an **automation registry with a global kill switch** as the contract
that governs write-capable automation. This meets the two remaining conditions of
the `automation_expansion` gate in `docs/security/security-quality-gate.md`
(state-model write coverage and a documented kill switch); with the `deployment`
gate already open, `automation_expansion` moves to **open**.

## Current Decision

Status: decided.

- **Registry.** Every persistent-record automation is listed in
  `data/automation-registry.json`, mapped to the state-model entity it writes
  (`apps/fullstack/state-model.json`) and that entity's sync rule.
- **Coverage rule.** Any new write-capable automation (scheduled job, bot, or
  external/server-side write) must be registered, mapped to a state-model entity
  with a sync rule, and given a disable path **before** it runs. This is enforced
  by `npm run check:automation-registry`.
- **Global kill switch.** The `SEIS_AUTOMATION_DISABLED` flag halts registered
  automations before they write; only read-only `--check` verification is allowed
  while it is set. The ultimate disable is removing the npm script or CI step, or
  reverting the automation commit — state-model records restore from their
  `seed_sources`.
- **Scope today.** The registered automations are repo-local generators (they
  write tracked files reproducible from sources, reviewable in the Git diff).
  There is no external-write or scheduled automation yet; the gate opening means
  such automation is *permitted under this contract*, not that any exists.

## Why This Shape

| Need | Choice | Reason |
| --- | --- | --- |
| Coverage | Registry mapped to state-model entities | Reuses the existing entity/sync-rule model instead of a parallel scheme. |
| Auditability | `check:automation-registry` in the quality gate | Each automation's entity, sync rule, and disable path are machine-checked. |
| Reversibility | Global flag + ultimate disable | A run can be stopped fast, and records rebuild from seed sources. |
| Safety | Permitted-but-governed gate | Mirrors the deployment gate: open does not mean automatic. |

## Effect On The Gates

- `automation_expansion`: deployment gate open (met), state-model write coverage
  registered and checked (met), kill switch documented (met) → **open**.
- This completes the security gate set: `closed_code` and `no_large_binaries`
  enforced; `source_deletion`, `deployment`, and `automation_expansion` open.

## Rollback Path

Restore the prior `automation_expansion` guard text and re-block the gate; delete
the registry and check script. No automation runtime exists, so nothing stops.
