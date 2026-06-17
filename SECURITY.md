# Security Policy

Security is non-negotiable in SEIS (constitution
[§19](docs/governance/seis-master-prompt-v14.md)). This file is the disclosure
entry point. SEIS is **closed-code by default**
([`SEIS_CLOSED_CODE.md`](./SEIS_CLOSED_CODE.md)); this policy applies to anyone
with authorized access to the repository or its deployed surfaces.

## Reporting a vulnerability

- **Do not** open a public issue for security reports.
- Email the maintainer privately: **emirhankudun@gmail.com**.
- Include: affected component/path, impact, reproduction steps, and any
  proof-of-concept. Do not include live secrets in the report body.

You can expect an acknowledgement and a triage assessment. Coordinated, private
disclosure is preferred before any public mention.

## What is in scope

- This repository's code, scripts, automation, and configuration.
- Deployed SEIS surfaces and the cloud/SSH/VPN access model described in
  [`docs/deployment/remote-access.md`](./docs/deployment/remote-access.md).

## Secrets and credentials

Never commit secrets, private keys, tokens, `.env` contents, or personal data.
The repository runs an automated secret scan:

```bash
npm run security:secret-scan     # regenerate + gate (fails on any finding)
npm run check:secret-scan        # verify the recorded scan is clean and current
```

If you discover an exposed secret, treat it as a live incident: rotate the
credential first, then report.

## Hardening references

- Security quality gate: [`docs/security/security-quality-gate.md`](./docs/security/security-quality-gate.md)
- Remote access (SSH cloud + VPN): [`docs/deployment/remote-access.md`](./docs/deployment/remote-access.md)
- Closed-code governance: [`SEIS_CLOSED_CODE.md`](./SEIS_CLOSED_CODE.md)
