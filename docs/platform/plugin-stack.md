# SEIS Plugin Stack

SEIS uses installed and enabled Codex plugins as the operating layer for the closed-code platform. The current audited registry is `data/installed-codex-plugins-2026-06-05.json`, with the reader-facing operating model in `docs/platform/installed-plugin-operating-model.md`.

## Audit Snapshot

| Metric | Value |
|---|---:|
| Audit date | 2026-06-05 |
| Installed and enabled plugins | 143 |
| Not installed plugins in local Codex listing | 36 |
| Local SEIS plugin | `seis@personal` |

## Platform Lanes

| Lane | Installed plugins |
|---|---|
| Repository and governance | `seis@personal`, `github@openai-curated`, `coderabbit@openai-curated`, `circleci@openai-curated`, `codex-security@openai-curated`, `superpowers@openai-curated` |
| Android and iOS mobile | `expo@openai-curated`, `test-android-apps@openai-curated`, `build-ios-apps@openai-curated` |
| Web and design | `build-web-apps@openai-curated`, `browser@openai-bundled`, `chrome@openai-bundled`, `figma@openai-curated`, `canva@openai-curated`, `magicpath@openai-curated` |
| macOS desktop | `build-macos-apps@openai-curated` |
| Full-stack, backend, deploy | `convex@openai-curated`, `supabase@openai-curated`, `neon-postgres@openai-curated`, `vercel@openai-curated`, `netlify@openai-curated`, `cloudflare@openai-curated`, `render@openai-curated`, `temporal@openai-curated` |
| Data analytics and visualization | `build-web-data-visualization@openai-curated`, `deepnote@openai-curated`, `spreadsheets@openai-primary-runtime`, `motherduck@openai-curated`, `metabase@openai-curated`, `mixpanel@openai-curated`, `mixpanel-headless@openai-curated`, `thoughtspot@openai-curated`, `posthog@openai-curated` |
| Workspace and communications | `google-drive@openai-curated`, `google-calendar@openai-curated`, `gmail@openai-curated`, `slack@openai-curated`, `notion@openai-curated`, `box@openai-curated`, `documents@openai-primary-runtime`, `presentations@openai-primary-runtime`, `linear@openai-curated`, `atlassian-rovo@openai-curated`, `asana@openai-curated`, `calendly@openai-curated`, `zoom@openai-curated` |
| Observability, quality, security | `sentry@openai-curated`, `datadog@openai-curated`, `codex-security@openai-curated`, `coderabbit@openai-curated`, `jam@openai-curated`, `semrush@openai-curated`, `conductor@openai-curated`, `statsig@openai-curated` |
| AI, media, research | `hugging-face@openai-curated`, `life-science-research@openai-curated`, `zotero@openai-curated`, `remotion@openai-curated`, `game-studio@openai-curated`, `fal@openai-curated`, `heygen@openai-curated`, `hyperframes@openai-curated`, `nvidia@openai-curated`, `shutterstock@openai-curated`, `cloudinary@openai-curated`, `latex@openai-bundled` |
| Business, GTM, operations | `airtable@openai-curated`, `hubspot@openai-curated`, `apollo@openai-curated`, `clay@openai-curated`, `common-room@openai-curated`, `zoominfo@openai-curated`, `close@openai-curated`, `outreach@openai-curated`, `pipedrive@openai-curated`, `shopify@openai-curated`, `stripe@openai-curated`, `quickbooks@openai-curated` |

## Google Workspace Links

- Operating plan: https://docs.google.com/document/d/1EvyhGA4ulJHsEB2DCzZAYxDrUv1X6dGj0PFa0splrps
- Platform backlog: https://docs.google.com/spreadsheets/d/1sxnxOz9ZRzwZAz2FmHt_3YzAhQjKL2sQbYR1uWdGsaQ
- Installed plugin operating model: https://docs.google.com/document/d/10A-Ld9TBu6HSsB0W1dJ3p6Y14Hqr3VMLeMgYJ89mX64

## Rules

- Use installed and enabled plugins first.
- Keep SEIS repo docs as source of truth after external tool actions.
- Do not treat a mentioned plugin URI as installed unless it appears in the audited registry.
- Keep Google Workspace artifacts mirrored in `integrations/google-workspace.json`.
- Avoid deleting old repositories or refs from plugin workflows unless SEIS import gates pass.
