# Tech Stack

- Node.js project with `package.json` scripts; package manager commands use `npm run ...`.
- `type: module`, but governance generators and checkers are mostly `.cjs`; some release/static scripts are `.mjs`.
- Generated source artifacts use JSON under `content/development/` and Markdown/JSON reports under `reports/`.
- Main environment projection is `deploy/cloud-environment.json`; many checks assert source keys and summary counts remain synchronized.