# Environment Security Mode

Purpose: inspect environment variable and secret-handling patterns.

Allowed:

- review `.env` naming patterns without printing values
- inspect ignore rules
- recommend example variables
- flag unsafe client/server boundaries

Forbidden:

- printing secret values
- editing real `.env` files without approval
- committing credentials
- changing auth systems

Output:

- secret exposure risk
- affected files
- required approvals
- safe fix plan
