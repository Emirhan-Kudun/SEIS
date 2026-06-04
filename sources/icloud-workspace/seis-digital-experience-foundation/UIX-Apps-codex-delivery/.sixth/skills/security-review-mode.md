# Security Review Mode

Purpose: inspect security-sensitive changes and prevent secret or workflow risk.

Allowed:

- inspect `.env*` patterns without printing secrets
- inspect `.github` workflow permissions
- inspect package and lockfile changes
- flag broad write permissions
- recommend safer defaults

Forbidden:

- exposing secret values
- changing auth or deployment settings without approval
- enabling write-capable automation without review
- committing credentials

Output:

- findings
- severity
- affected files
- blocked risks
- required approval
