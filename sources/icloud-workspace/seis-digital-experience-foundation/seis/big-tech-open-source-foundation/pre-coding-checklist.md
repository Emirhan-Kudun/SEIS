# Big Tech Open Source Pre-Coding Checklist

Use this before adopting a major-firm open-source project or official platform
SDK in SEIS.

## 1. Vendor Fit

- Choose the smallest firm/project lane that fits the task.
- Confirm the project is official, actively maintained, and useful for the
  current architecture.
- Prefer tools that improve accessibility, performance, maintainability,
  observability, or rollback safety.

## 2. Architecture Fit

- Do not add a second framework beside the current app stack without a migration
  plan.
- Do not add cloud-specific code before the deployment target is approved.
- Avoid broad SDK imports when a small API client or local check is enough.

## 3. Risk Gates

- Run:

```bash
node scripts/big-tech-open-source-foundation-check.cjs
node seis/connector-orchestration/runner.cjs --dry-run --group big-tech-open-source-foundation --format markdown
```

- Keep account reads, provisioning, deployments, database mutation, AI model
  calls, and secret access blocked until explicitly approved.

## 4. Selection Order

1. Current repo pattern.
2. Local validation tool.
3. Official docs.
4. Official open-source package.
5. Cloud or account-scoped connector.

## 5. Coding Entry

Start coding only after:

- the selected vendor and project are named;
- a rollback path exists;
- dependency impact is known;
- quality gates pass locally.
