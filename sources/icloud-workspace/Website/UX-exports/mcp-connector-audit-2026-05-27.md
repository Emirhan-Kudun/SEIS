# MCP Connector Audit - 2026-05-27

- Generated: 2026-05-27T18:01:08.084Z
- Workspace: /Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Website/UX
- Total configured MCP servers: 214
- Status counts: {"true":214}
- Auth counts: {"unsupported":159,"o_auth":16,"not_logged_in":39}

## Relevant Highlights

- aws-documentation: status=true; auth=unsupported; command=[object Object]
- github: status=true; auth=unsupported; command=[object Object]
- google-drive-mcp: status=true; auth=unsupported; command=[object Object]
- linear: status=true; auth=o_auth; command=[object Object]
- mdn: status=true; auth=unsupported; command=[object Object]
- microsoft-clarity: status=true; auth=unsupported; command=[object Object]
- microsoft-fabric-rti: status=true; auth=unsupported; command=[object Object]
- microsoft-learn: status=true; auth=unsupported; command=[object Object]
- microsoft-powerbi-modeling: status=true; auth=unsupported; command=[object Object]
- microsoft-workiq: status=true; auth=unsupported; command=[object Object]
- notion: status=true; auth=o_auth; command=[object Object]
- openai-docs: status=true; auth=unsupported; command=[object Object]
- posthog: status=true; auth=o_auth; command=[object Object]
- sentry: status=true; auth=o_auth; command=[object Object]
- slack: status=true; auth=not_logged_in; command=[object Object]
- supabase: status=true; auth=unsupported; command=[object Object]
- vercel: status=true; auth=o_auth; command=[object Object]

## Policy

- Use relevant MCPs and skills proportionally; do not trigger every connector blindly.
- GitHub publication remains blocked until SSH or GitHub CLI auth is fixed.
- Vercel CLI is not installed; Vercel MCP shows OAuth but CLI-based deploy/env/log commands require installation.
- Rootly plugin has no API token configured, so incident tooling is not actionable yet.
