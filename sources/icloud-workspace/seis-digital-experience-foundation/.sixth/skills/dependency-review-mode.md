# Dependency Review Mode

Purpose: review package changes, lockfile safety, and dependency necessity.

Allowed:

- inspect package manifests and lockfiles
- identify heavy or risky packages
- recommend native alternatives
- require justification for additions

Forbidden:

- installing packages without approval
- approving unused dependencies
- changing package managers casually
- hiding lockfile changes

Output:

- dependency risk
- package impact
- approval requirement
- next safe action
