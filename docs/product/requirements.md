# SEIS Command Center — Product Requirements

Date: 2026-06-19

What the SEIS Command Center must do for its operator (V16 §8–§9, §31). Scope is
the operating interface; AI Core and Universe have their own docs.

## Primary user

A single trusted operator (the maintainer) who supervises repositories, agents,
automation, security, and remote infrastructure — and approves privileged actions.

## Functional requirements

- **Visibility:** repository/PR/CI status, agent status, automation status,
  security findings, remote-workspace status, model-router/prompt/eval status —
  all evidence-backed, never fabricated.
- **Control (gated):** propose agent tasks, trigger/cancel automation, recover PR
  work, run scoped remote commands — privileged actions produce an
  `ApprovalRequest` and an `AuditEvent` (V16 §32, §29).
- **Navigation:** persistent compact nav, global search, command palette,
  environment + connection indicators.
- **Honesty:** every control is real, deliberately disabled, or clearly marked a
  prototype (V16 §8).

## Non-functional requirements

- **Accessibility:** WCAG 2.2 AA — keyboard nav, visible focus, reduced motion,
  contrast, non-color status (V16 §28).
- **Performance:** fast startup, responsive nav, deterministic loading/empty/
  error/recovery states (V16 §27).
- **Security:** no secrets in the client; least privilege; fail-closed (V16 §26).
- **Calm:** information-rich without clutter; no manipulative urgency (V16 §28).

## Acceptance (Phase 1)

- Cockpit renders repository, plugins, build, workspace, security, **AI Center**,
  and research panels from local records.
- AI Center surfaces language versions + model-router policy honestly.
- All governance/foundation/design-system checks pass.

See [`user-flows.md`](./user-flows.md), the
[Command Center spec](../architecture/seis-command-center.md), and the
[data model](../architecture/data-model.md).
