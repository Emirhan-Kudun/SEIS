# SEIS Threat Model

Date: 2026-06-19

A working threat model for the SEIS ecosystem (V16 §26). It is intentionally
concise and maintained alongside the system; it complements, and does not
replace, [`security-quality-gate.md`](./security-quality-gate.md) and
[`remote-access.md`](../deployment/remote-access.md).

## Assets to protect

- Source of truth (GitHub repos, `main` integrity, history).
- Secrets and credentials (provider keys, SSH private keys, tokens).
- Remote hosts / SEIS Cloud and their access paths.
- User and project data; the knowledge layer.
- The CI/governance gates themselves (must not be silently weakened).

## Trust boundaries

Browser client ↔ API ↔ {GitHub, model providers, MCP tools, SSH hosts,
automation, plugins}. **All** of repository content, model output, plugin output,
and remote command output are treated as **untrusted data** (V16 §23). The web
client is the least-trusted tier and never holds raw secrets.

## Surface-by-surface risks & mitigations

| Surface | Primary risks | Mitigations |
|---|---|---|
| Browser client | XSS, CSRF, leaked secrets in bundle | no secrets client-side; output encoding; CSRF tokens; CSP |
| API / backend | authz bypass, IDOR, injection, SSRF | fail-closed authz, per-object checks, input validation, allowlists |
| GitHub integration | over-broad tokens, unreviewed merges | official APIs, least-scope tokens, protected `main`, approval-gated merge |
| Model providers | key leakage, prompt injection across tools | env-only keys, server-side calls, treat model output as untrusted |
| MCP / tools | unauthorized tool use, capability creep | capability-based permissions; agents cannot self-escalate (V16 §13) |
| Plugins | supply-chain compromise, permission escalation | permission manifests, quarantine, approval for install/escalation |
| Remote SSH | open shell, host-key spoofing, key theft | scoped/audited commands, fingerprint verification, key-only auth, private key stays with user (V16 §20) |
| Automation | destructive/unbounded runs | idempotency, kill-switch, explicit destructive effects, approval |
| Secrets/logging | secret logging, exfiltration | SecretReference only; redaction in logs/output; secret scan in CI |
| Dependencies | malicious/compromised deps | dependency + license review; no random additions (V16 §32) |
| Research (future) | dataset poisoning, model contamination | provenance tracking, contamination checks (V16 §18 Phase 3/7) |
| Prompt injection | cross-boundary instruction hijack | never execute model-proposed commands automatically (V16 §23) |

## Standing rules

- **Fail closed**, least privilege, defense in depth, secure defaults (V16 §26).
- Never disable or weaken a failing security/governance check to make CI green
  (V16 §4).
- Privileged actions require an `ApprovalRequest` and produce an `AuditEvent`
  (V16 §29, §32).
- On any suspected exposed secret: do not print/copy it, rotate first, then report
  to **emirhankudun@gmail.com** (see [`SECURITY.md`](../../SECURITY.md)).

## Out of scope / open items

- Formal pen-test and SBOM generation are future work (V16 §30).
- Provider-side retention is outside SEIS's technical control; use strictest
  available settings (V16 §21).
