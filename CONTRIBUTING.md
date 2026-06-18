# Contributing to SEIS

SEIS uses a **hybrid governance model** (see
[`docs/decisions/seis-hybrid-governance-resolution.md`](./docs/decisions/seis-hybrid-governance-resolution.md)).
Read this before contributing — what you may do depends on whether you are
touching the **closed core** or an **open module**.

## Two zones

### Closed core (default)

Everything is closed-code by default under the
[SEIS CLOSED CODE LICENSE](./LICENSE). The core is **invite-only**: contributions
come from the maintainer and authorized collaborators through the internal
workflow. External pull requests against core paths will be declined unless
pre-arranged with the maintainer (emirhankudun@gmail.com).

### Open modules (opt-in)

A module is open **only if it carries its own explicit open-source `LICENSE`**
(e.g. MIT or Apache-2.0) in its own directory and is listed in the open-modules
registry below. For those modules, external contributions are welcome under the
terms of that module's license and this guide.

> Open-modules registry (machine-readable:
> [`content/governance/open-modules.json`](./content/governance/open-modules.json),
> enforced by `npm run check:open-modules`):
>
> | Path | License | Maintainer |
> | --- | --- | --- |
> | [`packages/design-tokens`](./packages/design-tokens) | MIT | emirhankudun-ux |

If a path is not listed as an open module, treat it as closed core.

## How to contribute to an open module

1. Open an issue describing the change first; wait for maintainer acknowledgement.
2. Branch with a V14-style name: `feature/…`, `fix/…`, `docs/…`, etc.
3. Keep changes focused and reviewable. Follow the
   [SEIS Operating Charter](./docs/governance/seis-operating-charter.md).
4. Run the relevant checks locally: `npm run check:foundation`,
   `npm run check:constitution`, and any module-specific `npm run check:*`.
5. Never commit secrets. Run `npm run security:secret-scan` before pushing.
6. Open a pull request using the template; fill in Validation, Risks, and
   Rollback honestly. Never claim validation you did not perform.

## Commit & PR conventions

- Commit prefixes: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`,
  `security:`, `perf:`, `design:`, `ci:`, `build:`, `agent:`, `infra:`.
- Pull requests follow [`.github/pull_request_template.md`](./.github/pull_request_template.md).

## Code of Conduct

All participation is governed by [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

## Security

Do not file security issues publicly. Follow [`SECURITY.md`](./SECURITY.md).
