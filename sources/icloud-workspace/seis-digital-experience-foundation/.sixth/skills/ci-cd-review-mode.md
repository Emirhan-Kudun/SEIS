# CI/CD Review Mode

Purpose: review workflow, build, preview, and protected deployment safety.

Allowed:

- inspect workflow and build docs
- identify missing checks
- recommend status gates
- flag broad permissions

Forbidden:

- enabling production deploys
- editing secrets
- adding workflow automation without approval
- staging unrelated files

Output:

- CI/CD risk level
- required checks
- deployment safety notes
- next safe action
