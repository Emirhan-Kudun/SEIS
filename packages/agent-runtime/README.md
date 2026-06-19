# @seis/agent-runtime

Role definitions and behaviour contracts for SEIS AI Core agents.

Status: **specification** (SEIS Agent Runtime v0.1). Closed-code by default; see
[`open-modules.json`](../../content/governance/open-modules.json).

This package defines *what each agent is allowed to do*, not a heavy orchestration
engine. Start with clear contracts; add coordination later only when needed.

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
