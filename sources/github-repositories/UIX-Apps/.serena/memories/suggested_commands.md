# Suggested Commands

- Start every local task: `git status --short --branch` from the UIX-Apps root.
- Lightweight source-chain checks: `npm run check:plugin-environment-sources`, `npm run check:environment-source-index`, `npm run check:plugin-source-compliance-evidence`, `npm run check:cloud-environment`.
- Workspace health: `npm run check:workspace`.
- Publish gate: `npm run automation:publish-readiness`; treat branch/dirty-worktree findings as blockers, not build success.
- Syntax/diff hygiene: `node --check <script>`, `git diff --check`, `git diff --cached --check`.