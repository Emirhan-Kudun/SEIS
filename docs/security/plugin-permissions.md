# Plugin Permissions

Date: 2026-06-19

The permission model for SEIS plugins and extensions (V16 §9D, §26, §31).
Complements the [threat model](./threat-model.md).

## Principle

A plugin receives **nothing by default**. It must declare a capability/permission
manifest, and capabilities are granted explicitly, least-privilege, and revocably.
A plugin does **not** automatically get repository, shell, network, credential, or
deployment access (V16 §9D).

## Capabilities (declared, granted per-plugin)

| Capability | Risk | Default |
|---|---|---|
| read repository metadata | low | off |
| read files | medium | off |
| write files | high | off (approval) |
| network access | high | off (approval) |
| shell / command execution | critical | off (approval) |
| credential / secret access | critical | off (approval) |
| deployment | critical | off (approval) |

## Lifecycle (gated)

Install → review manifest → grant minimal capabilities (approval) → monitor health
→ update (approval; re-review manifest) → **quarantine/disable** on anomaly. Every
grant, escalation, and update produces an `AuditEvent` (V16 §29) and requires
explicit approval (V16 §32).

## Rules

- Treat all plugin output as **untrusted data**; never execute plugin-proposed
  commands automatically (V16 §23).
- Permission escalation is never automatic and never self-granted.
- Supply-chain hygiene: pinned versions, dependency + license review (V16 §26).
- A plugin that requests secrets/keys in its manifest is high-risk; grant only a
  `SecretReference`, never raw values.

See the trusted-marketplace intake under
[`docs/development`](../development/trusted-marketplace-intake.md) for plugin
sourcing governance.
