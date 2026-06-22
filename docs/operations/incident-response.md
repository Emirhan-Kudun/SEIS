# Incident Response

Date: 2026-06-19

How SEIS responds to security and operational incidents (V16 §31). Concise by
design; it ties together existing security and recovery docs rather than
duplicating them.

## Severity

| Level | Examples |
|---|---|
| SEV1 | exposed live secret/key, prod compromise, data loss |
| SEV2 | failing security gate, unauthorized access attempt, broken deploy |
| SEV3 | degraded service, non-critical regression, flaky automation |

## Response flow

1. **Detect & record** — open an AuditEvent; note actor/action/target/time.
2. **Contain** — for an exposed secret: **do not print/copy it**; rotate the
   credential first (V16 §23), then revoke access as needed.
3. **Assess** — scope, affected assets, severity; consult the
   [threat model](../security/threat-model.md).
4. **Report** — privately to **emirhankudun@gmail.com**; do not open a public
   issue for security reports ([`SECURITY.md`](../../SECURITY.md)).
5. **Remediate** — fix on an isolated branch through the protected workflow; never
   force-push or weaken a gate as a shortcut.
6. **Recover** — restore from backups per
   [`release-backup-plan.md`](../deployment/release-backup-plan.md); verify before
   resuming.
7. **Review** — record a short post-incident note (cause, fix, prevention) under
   `docs/reviews/`.

## Secret exposure (fast path)

```text
rotate → revoke → scan (npm run security:secret-scan) → update .gitignore →
report → document
```

Never commit the secret to "track" it; never log its value.

## Approvals

Destructive or production-affecting remediation (key rotation, service shutdown,
history rewrite, firewall/auth changes) requires explicit human approval and a
rollback plan (V16 §32).
