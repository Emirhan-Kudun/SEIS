# Task Completion

- Run the touched generator first, then regenerate dependent source evidence/index/environment files.
- Run targeted checks for the new layer plus `check:plugin-source-compliance-evidence`, `check:environment-source-index`, `check:plugin-environment-sources`, `check:cloud-environment`, and `check:workspace`.
- Run `git diff --check`; after staging, run `git diff --cached --check`.
- Commit small reversible changes. Push the active feature branch when local checks pass. Report `automation:publish-readiness` blockers separately if it fails due branch/dirty worktree/protected ref state.
- Serena memories can be sanity-checked with `serena memories check` from the project root.