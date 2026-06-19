# Agent Contract

Shared rules every SEIS AI Core agent inherits. Role files in
[`roles/`](./roles) specialise this contract; they never relax it.

## Universal rules

- **One writer at a time.** Only one agent holds the writer role; others review,
  research, or plan (consistent with [`AGENTS.md`](../../AGENTS.md)).
- **Scoped edits.** Make small, related changes; avoid unrelated rewrites.
- **No secrets.** Never read, print, copy, or commit credentials or `.env*`.
- **State uncertainty.** Name what is unknown; gather local evidence before
  broad changes.
- **Document durable decisions** in repo docs, not only in chat.

## Contract template

```yaml
role: <name>
responsibility: <one sentence>
allowed: [<action>, ...]
forbidden: [<action>, ...]
input: <required input>
output: <expected output>
validation: <how output is checked>
docs: <what must be recorded>
```

## Handoff

Start with a short objective, affected paths, expected output, and acceptance
checks. Hand off via a clean Git diff or a written note — never overwrite
another agent's work silently.
