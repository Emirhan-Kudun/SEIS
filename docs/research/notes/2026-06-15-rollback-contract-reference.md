# Rollback Contract Reference Note

Date: 2026-06-15
Decision link: `docs/decisions/rollback-contract-decision-record.md`

## Question

What rollback contract satisfies the last open condition of the `deployment`
gate for the static SEIS surface without introducing automatic deploy or a new
tool, and how does opening the gate interact with `automation_expansion`?

## Sources Consulted

- `docs/security/security-quality-gate.md` — the `deployment` gate lists the
  rollback contract as its final unmet condition (secret scan and error tracking
  already met).
- `docs/deployment/release-backup-plan.md` — defines retained
  `releases/<timestamp>/` packages, `releases/latest.json`, the SHA-256 server
  rule, and the restore commands the contract builds on.
- `deploy/server-targets.json` — confirmation flow with the `rollback-owner`
  question and `activeTarget: null` safe default, giving the named-owner and
  manual-confirmation requirements.
- `scripts/check-deploy-readiness.mjs` — enforces checksum match and
  user-confirmation gating, so the contract's integrity rule is already
  machine-checked.
- `content/development/seis-evolution-model.json` — rollback policy (smallest
  commit revert; blocks automatic deploy without confirmed target), which the
  source-rollback path mirrors.

## Conclusion

The lowest-new-surface contract reuses the existing release tooling: pin uploads
to the manifest checksum, keep timestamped predecessors so rollback is a
re-publish of the prior release rather than a rebuild, fall back to a
smallest-commit revert for source regressions, and require a named human owner
plus target confirmation for both publish and rollback. With this contract the
`deployment` gate's three conditions are met and it opens; `automation_expansion`
stays blocked on state-model coverage and a kill switch.

## Open Follow-ups

- `automation_expansion`: define state-model write coverage and a documented kill
  switch before any write-capable automation.
- Re-confirm the rollback owner whenever the active deploy target changes.
