# Plugin Connector Orchestration

This branch now treats plugins and MCP connectors as a controlled capability
registry rather than one giant always-on tool surface.

## Principle

Use one run to create a plan, not one run to mutate every external system.

## Control Plane

- Registry: `seis/connector-orchestration/groups/*.json`
- Alias map: `seis/connector-orchestration/aliases.json`
- Risk matrix: `seis/connector-orchestration/risk-matrix.json`
- Source policy: `seis/connector-orchestration/source-policy.json`
- Runner: `seis/connector-orchestration/runner.cjs`
- Permission model: `seis/connector-orchestration/permission-model.md`
- Runbook: `seis/connector-orchestration/runbook.md`

## Branch Topology

- Parent branch: `UIXAppTTR`.
- Google Open Source Copilot is a sub-agent, not a competing main branch.
- Google branch lanes stay logical until a temporary branch is explicitly
  approved and folded back into the parent branch.

## Connector Families

- `core-dev-security`: GitHub, Codex, browser, CI, code review, security, Sentry.
- `google-open-source-foundation`: Google Open Source Copilot, official docs, Chrome validation, Firebase, Cloud Run, Material, ADK, and Google-origin open-source candidates.
- `big-tech-open-source-foundation`: Google, Microsoft, Meta, AWS, Apple, Cloudflare, Vercel, and OpenAI official/open-source candidate review.
- `pazar-pay-intelligence`: market-share, competitor visibility, ecommerce demand, brand intelligence, and capital-market signal planning.
- `cloud-deploy-data`: Vercel, Netlify, Render, Cloudflare, Supabase, Neon, AWS, Azure, databases.
- `design-media-content`: Figma, Canva, Adobe, Cloudinary, HeyGen, HyperFrames, Remotion, documents.
- `knowledge-meetings-ops`: Zoom, Asana, Linear, Atlassian, Notion, Slack, Gmail, Drive, meetings.
- `gtm-crm-market`: HubSpot, Attio, Semrush, Conductor, Brand24, finance and market intelligence.
- `vertical-specialists`: OpenAI, Twilio, Stripe, legal, science, satellite, mobile, domains.
- `enterprise-security-observability`: Aikido, Semgrep, SonarQube, Datadog, PostHog, PagerDuty, Auth0.
- `ai-agent-frameworks`: Claude Code setup, MCP server dev, plugin dev, agent SDK, code modernization.
- `cloud-sdk-languages`: Azure SDK language skills, AWS families, Terraform, Railway, Fastly.
- `business-apps-extended`: Airtable, Amplitude, Apollo, Atlan, Intercom, Miro, Coupler, Omni.
- `specialized-creative-learning`: frontend design, learning styles, Liquid, Qt, Quarkus, SAP UI5, Microsoft docs.

## Safety Rules

- Dry-run is default.
- Write-capable actions require explicit approval.
- Auth-scoped connectors stay on-demand.
- Unavailable connectors are reported as `skipped_with_reason`.
- No production deploy, purchase, message send, CRM mutation, database mutation, or secret access happens automatically.
- Single-branch mode stays centered on `UIXAppTTR`.

## Recommended First Run

```bash
node seis/connector-orchestration/runner.cjs --dry-run --format markdown
```

## Useful Filters

```bash
node seis/connector-orchestration/runner.cjs --dry-run --source claude-plugins-official --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --group google-open-source-foundation --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --group big-tech-open-source-foundation --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --group pazar-pay-intelligence --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --source openai-curated --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --mode registry-only --format markdown
node seis/connector-orchestration/runner.cjs --list-groups
```
