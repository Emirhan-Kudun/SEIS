# Google Open Source Foundation Pre-Coding Checklist

Use this checklist before adding Google-origin, Google Cloud, Firebase, or
open-source framework code to SEIS.

## 1. Branch Placement

- Keep implementation work on `UIXAppTTR`.
- Treat Google Open Source Copilot lanes as logical child lanes, not competing
  long-lived Git branches.
- If a temporary branch is unavoidable, fold the reviewed result back into
  `UIXAppTTR`.

## 2. Scope

- Define the feature lane: `web-quality`, `design-system`, `app-backend`,
  `ai-agent-systems`, `language-runtime`, or `observability`.
- Confirm that the selected tool solves a real implementation need.
- Prefer local repo checks and public documentation before account-scoped tools.

## 3. Source Trust

- Prefer official Google docs, Google-owned GitHub organizations, or
  project-owned docs.
- If a tool has a migration notice, keep it on `migration-watch`.
- Do not use third-party mirrors for install commands.

## 4. Connector Safety

- Run:

```bash
node seis/connector-orchestration/runner.cjs --dry-run --group google-open-source-foundation --format markdown
```

- Treat external Google Cloud, Firebase, Gemini, Gmail, Drive, and Maps actions
  as on-demand.
- Record unavailable or auth-blocked tools as `skipped_with_reason`.

## 5. Dependency Safety

- Do not add a package until the feature needs it.
- Check bundle, render, and accessibility impact before adoption.
- Prefer small, tree-shakeable packages over broad SDK imports.

## 6. AI Tooling Safety

- Do not make Gemini CLI core by default.
- Verify the current Google AI terminal tooling and ADK path from official
  Google sources before adding Google AI coding-agent workflows.
- Block agent shell automation unless the task explicitly approves it.

## 7. Handoff

- Run:

```bash
node scripts/google-open-source-foundation-check.cjs
node scripts/branch-governance-check.js
node scripts/local-quality-gate.js
```

- Start coding only after the selected lane, connector scope, and rollback path
  are clear.
