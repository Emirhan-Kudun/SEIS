# SEIS API & Provider-Adapter Design

Date: 2026-06-19

Access contracts for the SEIS Command Center backend and the provider-adapter
boundary (V16 §25). This is a design baseline for the Phase 2 application; Phase 1
uses local/mock data adapters behind the same contracts.

## API principles

Every API surface must provide (V16 §25):

- **authentication** and **authorization** (capability/role-based, fail-closed)
- **input validation** with stable, typed **error contracts**
- **pagination**, **filtering**, and **trace IDs** on list/read endpoints
- **idempotency keys** for retryable mutations
- **rate limits** where appropriate and a **versioning strategy**
- an explicit **permission check** + **AuditEvent** on every privileged mutation

Errors use one shape: `{ error: { code, message, traceId, details? } }`. No
secret values ever appear in responses, errors, or logs.

## Resource surface (conceptual)

Maps to the [data model](./data-model.md). Examples:

| Domain | Read | Mutation (gated) |
|---|---|---|
| Repositories | list/get repos, branches, PRs, CI status | recover PR work (→ branch), never auto-merge |
| Agents | list agents, runs, logs | create AgentTask, cancel run (approval per capability) |
| AI routing | get routes, profiles, language versions | propose route change (governance change) |
| Goals | list goals/milestones/blockers | update progress (evidence required) |
| Automation | list workflows/runs | trigger/cancel (destructive effects explicit) |
| Security | list findings, audit events | acknowledge/remediate |
| Remote/SSH | list hosts, profiles, command runs | run scoped command (approval for high-trust) |

Privileged operations return an **ApprovalRequest** rather than executing when
human approval is required (V16 §32).

## Provider-adapter boundary

The model router (see [`packages/model-router`](../../packages/model-router/README.md))
talks only to the [provider interface](../../packages/model-router/provider-interface.md):

```
app code → ModelRouter → ProviderInterface → {OpenAI|Anthropic|Gemini|Qwen|Ollama|local} adapter
```

- Credentials come **only** from environment variables, server-side. The web
  client never receives provider keys or raw SSH private keys.
- Adapters are replaceable; no provider-specific logic leaks into product code
  (V16 §12, §25 ports/adapters).
- Adapters expose generic, public concepts only — no copied/private provider
  internals (clean-room, V16 §21).

## GitHub & remote integration

- GitHub access uses **official APIs** and documented auth (V16 §9B). Read freely;
  write/merge/deploy go through the protected workflow with approval.
- Remote command execution is **scoped and audited** (identity, host, workspace,
  capability check, timeout, output limits, secret redaction, exit status,
  AuditEvent) — not an open shell (V16 §20). See
  [`docs/deployment/remote-access.md`](../deployment/remote-access.md).
