# SEIS Command Center — User Flows

Date: 2026-06-19

Key operator flows for the Command Center (V16 §31). Each privileged step routes
through an approval gate and emits an audit event (V16 §29, §32).

## 1. Review repository & PR health
Open Repository panel → see canonical repo, branches, PR/CI status → drill into a
PR → (gated) recover safe work into a new branch. Never auto-merge.

## 2. Run an agent task
Agent Center → pick an agent (role, capabilities) → propose an `AgentTask` →
`ApprovalRequest` if privileged → run → inspect logs/outputs/provenance →
validate against `packages/evals` criteria.

## 3. Inspect AI routing
AI Center → view language versions + model-router default route and task-based
exceptions → follow to `ai-routing-policy.json` for the full policy. Routing
changes are governance changes, not hotfixes (V16 §12).

## 4. Trigger automation
Automation → choose a workflow → see destructive effects explicitly → confirm
(gated) → monitor run → cancel/retry if needed; kill-switch available.

## 5. Handle a security finding
Security panel → finding with evidence/severity/scope → follow
[incident response](../operations/incident-response.md) → remediate on an isolated
branch → never weaken a gate to pass CI.

## 6. Operate a remote workspace
Remote/SSH (Workspace) → verify host fingerprint → provision isolated workspace →
run scoped, audited commands (no open shell) → high-trust ops require approval
(V16 §20). See [`remote-access.md`](../deployment/remote-access.md).

## States every flow must handle
loading, empty, error, recovery, and unauthorized — clearly and accessibly
(V16 §27, §28).
