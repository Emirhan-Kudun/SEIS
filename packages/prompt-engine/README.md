# @seis/prompt-engine

Structured, versioned prompts for SEIS AI Core.

Status: **executable** (SEIS Prompt Engine v0.1). Closed-code by default; see
[`open-modules.json`](../../content/governance/open-modules.json).

## Use it

```js
const { listTemplates, render } = require("./packages/prompt-engine/index.cjs"); // @seis/prompt-engine alias planned
render("pr-review", { pr_diff: "...", pr_context: "..." }); // → { text, missing, version }
```

CLI:

```bash
npm run prompt                                   # list templates
npm run prompt -- repository-scan                # render (unfilled placeholders kept)
npm run prompt -- pr-review pr_diff=... pr_context=...
```

Templates stay the source of truth ([`prompt-format.md`](./prompt-format.md)); the
loader substitutes `{{placeholders}}` and reports any left unfilled. Validated by
`npm run check:prompt-engine` (in `check:governance`).

## Manages

- system, task, and agent prompts
- review prompts (PR review, repository scan, security review)
- coding and documentation prompts
- safety prompts
- prompt versioning

## Design docs

- [Prompt format](./prompt-format.md)
- [Prompt versioning](./prompt-versioning.md)

## Templates

- [Repository scan](./templates/repository-scan.md)
- [PR review](./templates/pr-review.md)
- [Implementation plan](./templates/implementation-plan.md)
- [Security review](./templates/security-review.md)
- [Documentation update](./templates/documentation-update.md)

Templates are reusable and structured — never vague, never carrying secrets, and
never copied from proprietary or leaked system prompts.
