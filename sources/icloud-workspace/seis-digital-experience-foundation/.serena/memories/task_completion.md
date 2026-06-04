# Task Completion

Default low-power finish for coding tasks:
- Run focused syntax checks for touched JS/MJS files: `node --check <file>`.
- Run the narrow relevant check script when available.
- For static-site packaging changes, run `npm run build:static` only if dist output must be updated.
- Run `npm run check:workspace` for routing/process sanity.
- Avoid `npm run release:ready`, Playwright/browser validation, Docker, or deploy scripts unless the user asks or the change requires it.
- Mention if the project location is not a git repo and therefore git status/commit/push were not available.