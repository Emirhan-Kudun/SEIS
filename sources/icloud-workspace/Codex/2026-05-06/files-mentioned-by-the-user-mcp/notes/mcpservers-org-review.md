# mcpservers.org Review

Date: 2026-05-06

Purpose: Keep a practical review of which MCPs from `mcpservers.org` can be added later and which should stay out.

Profile: lightweight professional frontend, portfolio, UI/UX, multilingual, documentation, browser testing, accessibility, SEO, typography, and productivity workflow on macOS.

## Current Decision

- Keep the local coding/debug base stable, but allow selected permanent official remote MCPs.
- Do not install random new MCPs from `mcpservers.org` immediately.
- Revisit around 2026-08-06 if work gets harder or we need account/cloud/project integrations.
- Prefer official vendor/protocol MCPs.
- Accept verified non-official MCPs only after checking maintainer identity, current source, package, permissions, and credential needs.

## Add / Do Not Add Decision

Current answer: add the official remote MCPs that clearly help long-term work, then leave credential/local-runtime blocked servers for later.

Keep active because they help real work:

- Chrome DevTools MCP
- Playwright MCP
- ESLint MCP
- Context7
- Semgrep
- Next DevTools MCP
- official filesystem / git / fetch / sqlite / memory / sequential-thinking
- GitHub official MCP: added permanently with read-only remote endpoint.
- AWS Knowledge MCP: added permanently; official no-auth docs/knowledge endpoint.
- Atlassian Rovo MCP: added permanently; official OAuth endpoint for Jira/Confluence/Compass.
- Microsoft Learn MCP: added permanently; official no-auth docs endpoint.
- Adobe Express Developer MCP: added permanently; official Adobe package for Express add-on docs and TypeScript definitions.
- Canva MCP: added permanently; official remote design MCP at `https://mcp.canva.com/mcp`, OAuth not logged in yet.
- Vercel MCP: added permanently; official OAuth endpoint for frontend hosting/deployment.
- Netlify MCP: added permanently; official pinned local package for frontend/portfolio deployment workflow.
- Sentry official MCP: added permanently; login/OAuth may be needed when used.
- Figma official MCP: added permanently; login/OAuth may be needed when used.
- Neon official MCP: added permanently; use for development/test database work only.
- Supabase official MCP: added permanently with `read_only=true` and `features=database,docs`.
- Postman official MCP: added permanently in minimal mode at `https://mcp.postman.com/minimal`.
- Cloudflare official docs MCP: added permanently at `https://docs.mcp.cloudflare.com/mcp`.
- Cloudflare official API MCP: active at `https://mcp.cloudflare.com/mcp`; OAuth endpoint, use only for real Cloudflare account/API tasks.
- Hostinger official scoped MCPs: active as `hostinger-hosting`, `hostinger-dns`, and `hostinger-domains` using `hostinger-api-mcp@0.1.40`. No API token is stored; connect only when Hostinger hosting/domain/DNS work is needed.
- Flowbite MCP: active as official `flowbite-mcp@1.1.5`; useful for Tailwind/Flowbite UI components, theme generation, and optional Figma-to-code context.
- Linear MCP: active official remote server at `https://mcp.linear.app/mcp`; OAuth/login not completed, use when issues/projects/roadmap workflow needs it.
- Notion MCP: active official remote server at `https://mcp.notion.com/mcp`; OAuth connected, use for approved docs/content/project knowledge only.
- MDN MCP: active official Mozilla server at `https://mcp.mdn.mozilla.net/`; no API key, useful for web-platform docs and compatibility, but experimental so avoid private queries.
- OpenAI Docs MCP: active official OpenAI server at `https://developers.openai.com/mcp`; no API key, read-only docs for OpenAI API, ChatGPT Apps SDK, Codex, and related developer docs.
- Exa MCP: active trusted vendor server at `https://mcp.exa.ai/mcp`; no API key required, useful for web/code research and source discovery. Use like external search and avoid secrets.
- shadcn MCP: active official shadcn/ui server through pinned `shadcn@4.7.0 mcp`; no API key required for public registry, useful for React/Tailwind component discovery and installation.
- Claude Code MCP: active through official local `claude mcp serve`; replaced an invalid GitHub URL config entry.
- Google repo MCP entry: removed because `https://github.com/google/mcp.git` is a repository/catalog, not a direct MCP endpoint.

Approved but not active yet because this session cannot write to the global Codex MCP config:

- Cloudinary Asset Management MCP: official Cloudinary remote server for uploads, search, organization, folders, tags, and transformations.
- Cloudinary Environment Config MCP: official Cloudinary remote server for upload presets, mappings, named transformations, webhooks, and streaming profiles.
- Cloudinary Structured Metadata MCP: official Cloudinary remote server for asset metadata fields, values, and conditional rules.
- Cloudinary Analysis MCP: official Cloudinary remote server for AI tagging, moderation, safety checks, object detection, and content analysis.
- Cloudinary MediaFlows MCP: official Cloudinary remote server for visual media workflow automations.

Planned only if a real account/project need appears:

- Local Postgres MCP: add only with a local/dev connection string.
- Generic OpenAPI MCP: add only when a concrete OpenAPI spec URL/file and API base URL exist. Do not keep a generic OpenAPI bridge always-on without a scoped project API.
- Claude/Gemini model MCPs: do not add unofficial wrappers. Add only when Claude Code/Claude Desktop, Gemini CLI, or official API credentials are available and the route is official/verified.
- AWS full account/API MCPs: do not add until AWS credentials/profile and a real cloud task exist. Keep `aws-knowledge` for no-auth documentation.
- Google Developer Knowledge: official Google MCP endpoint is `https://developerknowledge.googleapis.com/mcp`, but it requires a Google Cloud project and restricted API key through `X-Goog-Api-Key`. Keep candidate-only until credentials exist.
- Oracle: official Oracle MCPs exist, but SQLcl/Oracle Database, MySQL HeatWave, and OCI variants require local tooling or credentials. Keep candidate-only until Oracle work exists.
- Firecrawl, Browserbase, and 21st.dev Magic: useful and popular, but require API keys or broader hosted automation. Keep on-demand until a real task justifies login/key setup.
- Dreamweaver MCP: none added; no official Adobe Dreamweaver MCP was found in the current review.
- APPSAI, Azure, CloudBase AI, Docker, ElevenLabs, Gemini, Google Cloud Assist, Perplexity, DeepSeek, and generic AI-labeled MCPs remain credential/project-needed candidates rather than always-on additions.
- Hostinger Billing, VPS, Reach, and broad all-tools MCP remain excluded until explicitly needed.
- Future Adobe creative MCPs remain design/frontend growth candidates. Cloudinary is approved as a pending official media/design set, but should be connected only when a real asset workflow needs it.
- Photoshop, Firefly, and Dreamweaver: no clean official Adobe MCP was selected in this review. Do not add unofficial wrappers.

Add when the related work appears or credentials are ready:

- Supabase or Neon MCP: use for real project/database work with clear scope.
- Notion official MCP: add when project docs/tasks live in Notion.
- Postman official MCP: use for API collection/testing work.
- Cloudflare API MCP: use for Workers/R2/D1/logs/DNS work only when Cloudflare account access is needed.
- Atlassian Rovo MCP: add when Jira/Confluence context is needed.
- Docker/Kubernetes MCPs: add only after Docker/kubectl are installed and the project needs them.
- Postgres / Google MCP Toolbox for Databases: add only after a local/dev database connection is available.

Do not add:

- Tools that duplicate active MCPs without a better workflow.
- Account-backed MCPs before login/API credentials exist.
- Docker/Kubernetes/database MCPs before the local software or connection exists.
- Shell/SSH/broad filesystem servers.
- AI wrappers that are not official product-owner MCPs.
- Finance, sales, scraping, blockchain, CRM, media, or marketing MCPs unless a project directly needs them.

## 2026-08-06 Review Plan

When the three-month review starts, split candidates into three groups:

- Add now: useful for real work, official or strongly verified, stable, scoped, and runnable with available credentials/tools.
- Keep for later: useful but blocked by credentials, missing local software, or no current project need.
- Do not add: duplicate, unclear maintainer, unsafe permissions, shell/SSH-heavy, stale, or only nice-looking.

Use this scoring before adding:

| Factor | Good Signal | Bad Signal |
| --- | --- | --- |
| Ownership | Vendor/protocol official | Unknown fork or personal wrapper |
| Maintenance | Recent releases/docs | Stale or unclear package |
| Value | Helps coding/debug/docs/database/project work | Niche or curiosity-only |
| Credentials | No key or existing plugin can handle auth | New secret needed without need |
| Permissions | Scoped/read-only/local/dev | Broad filesystem, shell, admin, production write |
| Overlap | Fills a gap | Duplicates an active MCP |

Add only if it passes the review and has a clear role. Otherwise keep it in the radar.

## MCP Market Long-Term Radar

Reviewed MCP Market developer/tools categories on 2026-05-08 and added non-active useful candidates to `notes/mcp-candidate-pool.md`.

Long-term rule: after the current trial period, permanent additions should be limited to large companies, official product vendors, protocol owners, or clearly first-party maintainers. Smaller/community MCPs can stay as candidate-only unless they repeatedly prove real workflow value and remain low-risk.

Best future checks:

- Custom MCP development: FastMCP.
- Spec/work planning: OpenSpec, Task Master.
- Semantic codebase help: Serena, Beads.
- Database/GenAI data access: MCP Toolbox for Databases / GenAI Toolbox.
- Apple-platform work: XcodeBuild, Periphery, Apple Doc / Cupertino.
- Design/frontend growth: Penpot, Storybook MCP, Cloudinary, 21st.dev Magic.
- Browser/crawl/research expansion: Browserbase, Firecrawl, GPT Researcher.
- Automation/memory: Trigger.dev, N8n, Graphiti, Cognee, Supermemory.

Do not add these by default. Recheck maintainer, current docs, API key/OAuth needs, permission scope, and overlap with the active MCP set before installing.

## Lightweight Rule

Prefer MCPs that are remote-on-demand or local-on-demand. Avoid always-running background services unless they provide clear day-to-day value. For local MCPs, prefer pinned versions, scoped filesystem access, and tools that launch only when called.

For connected services, prefer:

- read-only endpoints
- minimal tool modes
- docs-only endpoints
- OAuth scopes that match the task
- reversible config

Do not add a language, typography, accessibility, SEO, or translation MCP unless it is official/verified, lightweight, actively maintained, and better than using existing documentation, browser tools, or normal project libraries.

## Already Active / Good

- Chrome DevTools MCP: official Google/Chrome DevTools server; active.
- Playwright MCP: official Microsoft server; active.
- ESLint MCP: official ESLint server; active.
- Context7: active; useful for current docs.
- Semgrep: active; useful for static/security review.
- Next DevTools MCP: active; useful for Next.js docs and upgrades.

## Can Be Added Later

### Account / Project Work

- GitHub official MCP: add when repo/PR/issues/Actions work needs GitHub access. Prefer read-only or scoped toolsets first.
- Sentry official MCP: add when production errors, traces, and issue debugging matter.
- Supabase official/community MCP: add when a Supabase project exists. Prefer `read_only=true`, `project_ref`, and limited feature groups.
- Neon official MCP: add when Neon Postgres work exists. Prefer read-only or scoped OAuth/project access.
- Notion official MCP: add when workspace docs/tasks need direct access. Prefer official Notion remote/OAuth.
- Figma official MCP: add when design-to-code work needs Figma file context.
- Atlassian Rovo official MCP: add when Jira/Confluence/Compass context is needed.
- Postman official MCP: add when API collections/testing/documentation become part of the workflow.
- Cloudflare official MCPs: add when Workers, R2, D1, logs, DNS, or Cloudflare docs are part of a project.

### Local / Infrastructure Work

- Postgres official/reference MCP: add only when a local/dev connection string exists.
- Google MCP Toolbox for Databases: add only when database credentials and target scope are clear.
- Docker official/toolkit path: add only after Docker Desktop/CLI is installed and a container-heavy project exists.
- Kubernetes verified/official-ish candidates: add only after `kubectl` and kubeconfig exist; prefer read-only inspection servers first.

## Do Not Add Now

- Random GitHub/Notion/Figma/Docker/Kubernetes clones when an official/vendor option exists.
- Anything requiring shell execution, SSH, broad filesystem access, or remote daemon control without a concrete task.
- AI model wrappers for Gemini, DeepSeek, Grok, MiniMax, etc. unless they are product-owner official and credentials exist.
- Finance, payment, booking, marketing, CRM, blockchain, sales, or scraping MCPs unless the project explicitly needs them.
- Browser MCP variants that use the user's logged-in browser profile by default; prefer Chrome DevTools/Playwright unless login-state automation is explicitly needed.
- Docker/Kubernetes MCPs with write/admin control for production or shared infrastructure.

## Practical Ranking

Best future additions:

1. GitHub official MCP
2. Sentry official MCP
3. Figma official MCP
4. Supabase or Neon official MCP
5. Notion official MCP
6. Postman official MCP
7. Cloudflare official MCPs
8. Atlassian Rovo official MCP

Wait until needed:

- Docker
- Kubernetes
- Postgres / database toolbox
- Stripe
- MiniMax / other media AI APIs
- Claude / Perplexity / Gemini / DeepSeek

### Claude Note

- Claude Code can connect to MCP servers as a client.
- Claude Code can also expose itself as an MCP server with `claude mcp serve`.
- Do not add Claude-dependent MCP config until Claude Code or Claude Desktop is installed and the user wants that bridge.
- Treat Claude as an AI helper, not as a normal always-on MCP tool.

## Notes

- `mcpservers.org/official` listed 436 official servers at review time.
- `mcpservers.org/category/development` listed 2475 development servers.
- `mcpservers.org/category/database` listed 800 database servers.
- `mcpservers.org/category/version-control` listed 107 version-control servers.

The catalog is useful as a radar, but not as a direct install list. Each candidate still needs source verification before config changes.
