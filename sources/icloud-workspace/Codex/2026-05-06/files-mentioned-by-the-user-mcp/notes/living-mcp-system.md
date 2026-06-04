# Living MCP System

This is the operating rhythm for our MCP setup. The goal is not to collect tools. The goal is to keep a small, useful, trusted tool ecosystem that evolves with the work.

Companion guides:

- `notes/mcp-candidate-pool.md`
- `notes/ai-helpers-pool.md`
- `notes/mcpservers-org-review.md`

## North Star

- Keep the active MCP set useful, boring, and trustworthy.
- Use official MCP servers only.
- Prefer major vendor, product-owner, or strongly verified maintainer MCPs for all future additions.
- Prefer API-key-free MCPs for the base set.
- Prefer plugins/connectors for account-based services.
- Keep the local base around 10-12; allow selected permanent official remote MCPs when they clearly improve the frontend/design/productivity workflow.
- Rotate tools based on actual use, not curiosity alone.

## Frontend / Design macOS Profile

This environment is optimized for a lightweight, professional AI-assisted frontend and design workflow on macOS.

Prioritize MCPs that improve:

- HTML/CSS/JS workflow
- Dreamweaver-style project editing
- frontend development
- UI/UX and design systems
- Figma/design-to-code support
- responsive and browser testing
- accessibility and SEO structure
- documentation/context retrieval
- Git/GitHub workflow
- project file management
- image and asset organization
- typography, Unicode, and localization support
- lightweight local automation

Avoid MCPs that add:

- experimental behavior
- abandoned or unknown community code
- unrestricted shell/terminal access
- crypto/wallet features
- duplicate functionality
- heavy background services or high idle RAM use
- hype without practical workflow value

Before connecting an external service:

1. Explain its purpose.
2. Verify it is official, verified, actively maintained, and relevant.
3. Check requested permissions.
4. Minimize access, prefer read-only or scoped modes.
5. Avoid redundant integrations.
6. Keep the configuration reversible and modular.

Language/localization MCPs are allowed only when they are official or verified, lightweight, actively maintained, and useful for multilingual frontend/design work in English, French, Turkish, and European-language typography.

## Current Active Count

- Local base target: 10-12 active MCP servers
- Current: 41 active MCP servers
- Remote official additions: 16
- Approved pending additions: 5 official Cloudinary MCP servers, blocked by config write permission in the current sandbox
- Overflow rule: only add beyond the base when the MCP has clear long-term frontend, design, documentation, testing, API, database, or productivity value.

## System Layers

### Active Layer

These are installed and available now. They should earn their place by being useful in real work.

- context7
- adobe-express-developer
- alice_mcp
- canva
- chrome-devtools
- claude-code
- cloudflare-api
- eslint
- exa
- fetch
- figma
- flowbite
- git-tools
- github
- hostinger-dns
- hostinger-domains
- hostinger-hosting
- linear
- memory
- mdn
- microsoft-learn
- neon
- netlify
- next-devtools
- notion
- official-filesystem
- openai-docs
- perplexity
- playwright
- postman
- semgrep
- sentry
- shadcn
- sequential-thinking
- sqlite
- supabase
- cloudflare-docs
- aws-knowledge
- atlassian
- vercel
- xcodebuildmcp

### Candidate Layer

These live in `notes/mcp-candidate-pool.md`. They are not installed by default. They become active only when a real task needs them.

### Approved Pending Layer

These passed the workflow/value filter, but are not active yet because writing to `~/.codex/config.toml` was blocked in the current sandbox.

- cloudinary-asset-management: official Cloudinary remote MCP for media upload, search, organization, folders, tags, and transformations.
- cloudinary-environment-config: official Cloudinary remote MCP for upload presets, named transformations, upload mappings, webhooks, and streaming profiles.
- cloudinary-structured-metadata: official Cloudinary remote MCP for structured metadata fields, values, and rules.
- cloudinary-analysis: official Cloudinary remote MCP for AI tagging, moderation, safety checks, object detection, and content analysis.
- cloudinary-mediaflows: official Cloudinary remote MCP for visual media workflow automations.

Use these only when portfolio/media/asset workflow needs them. They require Cloudinary login/OAuth or credentials at connection time; do not store API keys in this repo.

### Plugin Layer

Services that need OAuth, login, or API keys should usually be handled through Codex plugins/connectors first. Ask before using or connecting them.

Examples:

- GitHub
- Figma
- Notion
- Slack
- Supabase
- Neon
- Sentry
- Linear
- Google Drive / Docs

### Local AI Layer

API-key-free AI means local runtimes like Ollama or LM Studio. Do not install unofficial AI MCPs just to have an AI tool.

Detailed decision guide: `notes/ai-helpers-pool.md`

## Rotation Signals

### Keep

Keep an MCP if it was useful in the last few tasks, fills a unique role, or reduces repeated manual work.

### Watch

Watch an MCP if it overlaps with another tool, has not been used recently, or only helps rare tasks.

### Remove

Remove or replace an MCP if:

- It has not helped across 2-3 relevant tasks.
- It duplicates another better tool.
- It adds risk without clear value.
- It needs credentials we do not have.
- It is not official.

## First Swap-Out Candidates

- memory: keep only if MCP memory becomes genuinely useful
- sqlite: keep only if local DB work appears
- fetch: keep only if MCP-level fetch is useful beyond other browsing tools

## Add Decision Checklist

Before adding a new MCP:

1. Is it official from the product/vendor/protocol owner?
2. Does it avoid API keys or broad account access?
3. Does a current plugin already cover the need?
4. Does it solve a real task we have now?
5. Can it run without shell wrappers?
6. Can we pin a version?
7. Can access be scoped to the workspace or local/dev data?
8. Which active MCP will it replace if we are at 12?

## Review Rhythm

### Quick Review

Do this when a new project starts or a tool feels noisy:

- Check active MCP count.
- Identify duplicates.
- Remove obvious dead weight.
- Add only task-relevant candidates.

### Monthly Review

Do this occasionally:

- Recheck versions of active MCPs.
- Recheck official status.
- Review security posture.
- Update candidate pool.
- Prune anything stale.

### Three-Month Expansion Review

Around 2026-08-06, reconsider increasing the permanent active set with official or verified MCPs if the work has become harder and the added tools clearly reduce friction.

Review order:

- Keep the current 12 as the stable baseline.
- Prefer large-company, official vendor, product-owner, or protocol-owner MCPs first.
- Accept smaller verified/community MCPs only when maintainer identity, source, package, permissions, and real workflow value are clear.
- Add only tools that can run cleanly with available local software or credentials.
- Document every new permanent addition in this file.

### Long-Term Vendor Rule

After the current trial period, new permanent MCP additions should come only from large established companies, official product vendors, protocol owners, or clearly first-party maintainers.

Community or small-vendor MCPs can remain in the candidate pool, but should not become permanent unless they are narrow, well-maintained, low-risk, and repeatedly useful in real work.

## Use Log

Use this lightweight log when a tool meaningfully helps or gets in the way.

| Date | MCP | Event | Decision |
| --- | --- | --- | --- |
| 2026-05-06 | all | Initial living system created | Keep 12 active, use candidate rotation |
| 2026-05-06 | all | Policy tightened from official/verified to official-only | Keep current official/vendor-owned servers; reject unofficial candidates |
| 2026-05-06 | chrome-devtools, eslint | Added official high-value coding MCPs | Replaced puppeteer and time, pinned versions, keep active count at 12 |
| 2026-05-06 | temp-puppeteer, temp-time | Added temporary official overflow MCPs | Active count became 14; prune back toward 12 after short trial if unused |
| 2026-05-06 | temp-everything | Added temporary official reference MCP | Active count is 15; use for MCP diagnostics/testing, remove first if noisy |
| 2026-05-06 | temp-* | Removed temporary overflow MCPs | Back to 12 active; revisit permanent official/verified expansion after three months |
| 2026-05-06 | github, sentry, figma | Added permanent official remote MCPs | Active count is 15; GitHub uses read-only endpoint; Sentry/Figma may require OAuth/login when used |
| 2026-05-06 | neon, supabase, postman, cloudflare-docs | Added permanent official remote MCPs | Active count is 19; Supabase is read-only database/docs; Postman uses minimal mode; Cloudflare is docs-only |
| 2026-05-06 | aws-knowledge, atlassian | Added permanent official remote MCPs | Active count is 21; AWS Knowledge is docs/no-auth; Atlassian is OAuth and should be used only for Jira/Confluence/Compass work |
| 2026-05-06 | microsoft-learn, vercel, netlify | Added official technology/coding MCPs | Active count is 24; Microsoft Learn is docs/no-auth; Vercel is OAuth; Netlify is pinned local package for deployment workflow |
| 2026-05-06 | adobe-express-developer | Added official Adobe Express Developer MCP | Active count is 25; use for Adobe Express add-on/docs/TypeScript context, not general Photoshop editing |
| 2026-05-06 | canva | Added official Canva remote MCP | Active count is 26; OAuth not logged in yet, use only for real design/asset/export workflow |
| 2026-05-06 | cloudinary-* | Approved 5 official Cloudinary MCPs for future addition | Not active yet; config write was blocked by current sandbox/usage-limit approval, keep as pending official design/media set |
| 2026-05-07 | cloudflare-api | Found active in Codex MCP config | Count updated; OAuth endpoint, use only for real Cloudflare account/API tasks |
| 2026-05-07 | hostinger-hosting, hostinger-dns, hostinger-domains | Added official scoped Hostinger MCPs | Active count is 30; no API token stored, use only when Hostinger hosting/domain/DNS work is needed |
| 2026-05-07 | flowbite | Added official Flowbite MCP | Active count is 31; useful for Tailwind/Flowbite UI, themes, and design-to-code context |
| 2026-05-07 | perplexity | Added official Perplexity MCP package | Active count is 32; no API key stored, use only after explicit approval and `PERPLEXITY_API_KEY` is available |
| 2026-05-07 | linear, notion, mdn | Added useful official remote MCPs | Active count is 35; Linear is not logged in, Notion is OAuth, MDN is no-auth but experimental so avoid private queries |
| 2026-05-07 | openai-docs | Added official OpenAI developer docs MCP | Active count is 36; no-auth read-only docs for OpenAI API, ChatGPT Apps SDK, Codex, and related developer docs |
| 2026-05-08 | exa, shadcn | Added trusted non-core frontend/research MCPs | Active count is 38; Exa is no-auth search/code research, shadcn is pinned component registry MCP |
| 2026-05-13 | claude-code, google_mcp | Repaired Claude Code MCP and removed broken Google repo entry | Active count is 41; Claude Code now uses official `claude mcp serve`; Google Developer Knowledge remains candidate because it needs `X-Goog-Api-Key` header/API key |
| 2026-05-13 | xcodebuildmcp, alice_mcp | Found additional active config entries | Track with review-needed status; xcodebuildmcp is Apple-platform task-based, alice_mcp should be reviewed against big-vendor policy |

## Principle

The system should feel alive, not crowded. Add when there is pull from the work. Remove when the tool stops earning its place.
