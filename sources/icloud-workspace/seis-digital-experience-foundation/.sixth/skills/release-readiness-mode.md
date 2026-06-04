# Release Readiness Mode

Purpose: evaluate whether a branch is ready for PR, preview, release, or rollback.

Allowed:

- inspect branch status
- inspect staged files
- run available read-only checks
- summarize release confidence
- recommend rollback steps

Forbidden:

- deploying production
- merging branches
- deleting branches
- force pushing
- hiding failed checks

Output:

- release confidence score
- deployment risk
- required checks
- rollback plan
- next safe action
