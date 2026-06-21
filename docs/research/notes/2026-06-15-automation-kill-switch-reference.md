# Automation Kill-Switch Reference Note

Date: 2026-06-15
Decision link: `docs/decisions/automation-kill-switch-decision-record.md`

## Question

What contract satisfies the `automation_expansion` gate's two remaining
conditions — state-model write coverage and a documented kill switch — for
SEIS's repo-local generators, without adding a runtime or misrepresenting a
generic gate flip as per-automation coverage?

## Sources Consulted

- `docs/security/security-quality-gate.md` — `automation_expansion` requires the
  deployment gate open (now met), state-model write coverage, and a kill switch.
- `apps/fullstack/state-model.json` — entities already carry `sync_rule`
  definitions; `governance_gates` even requires a decision record before edits,
  so the coverage model exists and only needs an explicit registry mapping.
- `data/security-gate-status.json` — gate states the registry guard updates.
- `package.json` — the `automation:*` scripts are the write surface to register;
  each has a paired `check:*` verifier, giving a read-only fallback.
- `content/development/seis-evolution-model.json` — rollback policy (smallest
  commit revert; restore the JSON/doc pair) the ultimate-disable path mirrors.

## Conclusion

A registry (`data/automation-registry.json`) mapping each automation to a
state-model entity, its sync rule, and a disable path — plus a global
`SEIS_AUTOMATION_DISABLED` kill switch and a `check:automation-registry`
validator — satisfies both conditions with no new runtime. The registered
automations are repo-local generators today; the gate opening permits future
write-capable automation only when it registers under this contract. With this,
`automation_expansion` opens and the full security gate set is resolved.

## Open Follow-ups

- When the Convex backend is provisioned, register any server-side write path
  here before enabling it.
- Consider a runtime assertion of `SEIS_AUTOMATION_DISABLED` inside generators if
  scheduled execution is ever introduced.
