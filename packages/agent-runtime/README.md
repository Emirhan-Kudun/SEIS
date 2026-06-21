# @seis/agent-runtime

Role definitions and behaviour contracts for SEIS AI Core agents.

Status: **executable** (SEIS Agent Runtime v0.1). Closed-code by default; see
[`open-modules.json`](../../content/governance/open-modules.json).

This package defines *what each agent is allowed to do*, not a heavy orchestration
engine. Start with clear contracts; add coordination later only when needed.

## Use it

```js
const { listAgents, can } = require("./packages/agent-runtime/index.cjs"); // @seis/agent-runtime alias planned
can("security", "review diffs for secrets"); // → { allowed: true, reason: ... }
```

CLI: `npm run agents` (list) · `npm run agents -- can <role> "<action>"`.
Capability checks are least-privilege: a forbidden action is denied, and any
action not explicitly allowed is denied by default (V16 §13, §26). Role files
stay the source of truth; validated by `npm run check:agent-runtime`
(in `check:governance`).

## Each agent declares

- **role** and **responsibility**
- **allowed actions** / **forbidden actions**
- **required input** and **expected output**
- **validation rules** and **documentation rules**

## Roles

- [Architect Agent](./roles/architect-agent.md)
- [AI Systems Agent](./roles/ai-systems-agent.md)
- [Documentation Agent](./roles/documentation-agent.md)
- [Security Agent](./roles/security-agent.md)
- [DevOps Agent](./roles/devops-agent.md)
- [QA Agent](./roles/qa-agent.md)

See [`agents.md`](./agents.md) for the shared contract all roles inherit, and
the repo-wide assistant model in [`AGENTS.md`](../../AGENTS.md).
