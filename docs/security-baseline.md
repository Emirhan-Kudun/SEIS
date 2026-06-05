# Security Baseline

This is the lightweight security baseline for the portfolio and future web system. It is not a full Codex Security repository scan.

## Full Scan Gate

The Codex Security repository-wide scan workflow requires explicit authorization for subagents before substantive scan work starts. Ask for that authorization before running the full scan.

## Public Website

- Keep static assets local or from trusted CDNs.
- Add security headers when deployed:
  - `Content-Security-Policy`
  - `X-Content-Type-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`
- Avoid inline third-party scripts unless they are needed and reviewed.
- Do not expose private email automation tokens in frontend code.

## Contact Flow

- Static `mailto:` behavior is safe for the current version.
- If a server-backed contact form is added:
  - validate all inputs server-side
  - rate-limit submissions
  - add bot protection
  - store events in `contacts` and `integration_events`
  - never log full secrets or auth headers

## Data Layer

- Use Row-Level Security for private tables.
- Give public read access only to published portfolio content.
- Separate public project content from private briefs and contacts.
- Index foreign keys and frequently filtered columns.
- Log integration writes.

## Connector Safety

- OAuth tokens stay outside the repo.
- Connector writes need an audit event.
- Production deploys need a release event.
- High-risk connectors should start read-only.
- Mobile-visible data must have an explicit visibility rule.

## Release Gates

- Browser smoke test on desktop and mobile.
- Code review through CodeRabbit once auth is connected.
- Dependency review once Node tooling exists.
- Full security scan after explicit authorization.
