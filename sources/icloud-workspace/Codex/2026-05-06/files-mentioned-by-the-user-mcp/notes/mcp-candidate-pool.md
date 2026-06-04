# MCP Candidate Pool

Purpose: Keep a small reserve list of API-key-free MCP servers we can swap in when an active MCP is no longer useful. Do not install these automatically. Use official MCP servers only. Avoid verified-but-unofficial community servers, shell-execution servers, and broad system-control tools unless they come from the product owner and there is a clear task need.

Companion operating guide: `notes/living-mcp-system.md`

Catalog review: `notes/mcpservers-org-review.md`

## Active Limit

- Target active MCP count: 10-12
- Current policy: keep local base near 10-12, but allow selected permanent official remote MCPs when they clearly help the frontend/design/productivity workflow
- Current active MCP count: 41
- Approved pending MCP count: 5 official Cloudinary remote MCPs, not active yet
- Next expansion review: around 2026-08-06
- Prefer replacing a low-use active MCP over adding beyond the limit

## Selection Filter

Add or keep an MCP only if it clearly improves at least one of these workflows:

- frontend/web development
- HTML/CSS/JS quality
- Dreamweaver-style site editing
- UI/UX and design systems
- portfolio development
- responsive/browser testing
- accessibility and SEO checks
- documentation/context retrieval
- Git/GitHub organization
- asset/image organization
- multilingual content structure
- typography and Unicode compatibility
- lightweight productivity automation

Reject or defer MCPs that are experimental, abandoned, unsafe, redundant, resource-heavy, unrelated to the portfolio/frontend/design workflow, or require broad permissions without a current need.

Future vendor rule: prefer large, established companies or product-owner MCPs first. Smaller/community MCPs can stay in the radar only when they are strongly verified, narrow in scope, actively maintained, and clearly better than the current active set.

After the current trial period, promote only large-company, official vendor, product-owner, protocol-owner, or clearly first-party MCPs into the permanent active set. Treat smaller/community tools as temporary or candidate-only unless they prove repeated real value.

## Current Active Set

- context7
- adobe-express-developer
- alice_mcp
- canva
- atlassian
- aws-knowledge
- chrome-devtools
- claude-code
- cloudflare-api
- cloudflare-docs
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
- vercel
- xcodebuildmcp

## Swap-Out Candidates First

Remove these first if a better MCP is needed:

- memory: only keep if we actively use MCP memory
- sqlite: only keep if local DB work appears
- fetch: only keep if MCP-level page fetch is useful beyond built-in browsing

## API-Key-Free Candidate Pool

### Official / Reference

- everything: official modelcontextprotocol reference/test server; useful only for testing MCP behavior, not daily work
- filesystem: official modelcontextprotocol filesystem server; keep only one filesystem MCP active and restrict to workspace
- git: official modelcontextprotocol Git server; already active as git-tools
- memory: official modelcontextprotocol memory server; already active
- fetch: official modelcontextprotocol fetch server; already active
- time: official modelcontextprotocol time server; candidate because local time is usually easy to get without MCP
- sequential-thinking: official modelcontextprotocol server; already active

### Official Vendor Coding Tools

- chrome-devtools-mcp: official Chrome DevTools team server; already active; useful for browser debugging, console/network inspection, screenshots, and performance traces
- eslint: official ESLint MCP server; already active; useful when a JS/TS project has ESLint and we want lint explanations/fixes through MCP
- playwright: official Microsoft Playwright MCP; already active
- context7: official Upstash Context7 MCP; already active
- next-devtools: official Vercel/Next.js MCP; already active
- semgrep: official Semgrep MCP; already active

### Permanent Official Remote MCPs

- GitHub: active with read-only endpoint for repo, PR, issue, and workflow context.
- AWS Knowledge: active as official no-auth docs/knowledge endpoint for AWS documentation and best practices.
- Atlassian Rovo: active as official OAuth endpoint for Jira, Confluence, and Compass; use only when project organization/docs work needs it.
- Microsoft Learn: active as official no-auth docs endpoint for Microsoft, web, Azure, TypeScript, accessibility, and platform documentation.
- Adobe Express Developer: active as official Adobe MCP for Express add-on docs and TypeScript definitions; useful if Adobe/photo/design workflow grows.
- Canva: active as official remote MCP for design creation/editing, asset and brand workflows, export, comments, and design search. OAuth is not logged in yet.
- Vercel: active as official OAuth endpoint for frontend deployment/project workflow.
- Netlify: active as official pinned local MCP package for deployment workflow and portfolio hosting tasks.
- Figma: active for design-to-code and UI/UX workflow.
- Sentry: active for production/frontend error debugging when needed.
- Neon: active for Neon Postgres project/database work; use only for development/test context.
- Supabase: active with `read_only=true` and `features=database,docs`.
- Postman: active in minimal mode for API workflow without full tool bloat.
- Cloudflare Docs: active as docs-only endpoint for Cloudflare/frontend platform documentation.
- Cloudflare API: active as official OAuth endpoint for Cloudflare account/API work; use only when Workers, DNS, R2, D1, logs, or deployment tasks require it.
- Hostinger Hosting: active as official scoped MCP for Hostinger hosting work; no API token stored, use only when publishing/managing Hostinger sites.
- Hostinger DNS: active as official scoped MCP for DNS records/snapshots; no API token stored, use only for domain/DNS tasks.
- Hostinger Domains: active as official scoped MCP for domain management; no API token stored, use only when domain tasks require it.
- Flowbite: active as official Flowbite MCP for Tailwind/Flowbite UI components, theme generation, and optional Figma-to-code context. No Figma token stored.
- Linear: active official remote MCP for issue/project/task workflow; not logged in yet, connect only when project organization needs it.
- Notion: active official remote MCP for docs, notes, databases, content planning, and project knowledge; OAuth is connected, use only with approved workspace content.
- MDN: active official Mozilla MCP for HTML/CSS/JS, Web APIs, accessibility, and browser compatibility. It is experimental and no-auth; avoid sending private content in queries.
- OpenAI Docs: active official OpenAI developer documentation MCP at `https://developers.openai.com/mcp`; no-auth, read-only, useful for OpenAI API, ChatGPT Apps SDK, Codex, and related docs.
- Exa: active trusted vendor MCP at `https://mcp.exa.ai/mcp`; no API key required, useful for web/code research and source discovery. Treat as external web search; do not send secrets.
- shadcn: active official shadcn/ui MCP via pinned `shadcn@4.7.0 mcp`; no API key required for the public registry, useful for React/Tailwind component discovery and installation. Use project-aware changes only.
- Claude Code: active via official local `claude mcp serve`; use as an on-demand second-opinion/tool bridge, not as the default coding path.
- XcodeBuildMCP: active task-based Apple-platform MCP; use only for real Xcode/iOS/macOS build/test workflows because it can trigger local build/simulator actions.
- alice_mcp: active but review-needed. Recheck maintainer, purpose, permissions, and whether it fits the large-vendor policy before using.

### Requested AI / Cloud / Website Candidates

Added now:

- AWS Knowledge: official, no auth, documentation-focused, lightweight remote endpoint.
- Atlassian Rovo: official, OAuth-based, useful for Jira/Confluence/Compass workflow organization.
- NextJS: already active as `next-devtools`.
- Microsoft Learn: official, no auth, documentation-focused, useful for web/platform references.
- Vercel: official, OAuth-based, useful for modern frontend hosting/deployment workflow.
- Netlify: official, local-on-demand, useful for portfolio deployment workflow.
- Adobe Express Developer: official, local-on-demand, documentation/type-definition focused; not a general Photoshop/Firefly editing MCP.

Do not add until credentials or real project need exists:

- APPSAI: official/verified signals exist, but it exposes many tools, requires API key/billing, and includes broad full-stack/deploy/AWS/MongoDB capabilities.
- Azure MCP: official Microsoft, but requires Azure auth and broad Azure resource access; add only when Azure hosting/project work starts.
- Docker MCP: official Docker path exists, but Docker is not installed locally; add when container work starts.
- CloudBase AI: Tencent/CloudBase platform, requires CloudBase environment/API setup; add only if that platform becomes part of the project.
- DeepResearch: not added because no single official/verified lightweight candidate has been selected yet.
- ElevenLabs: official MCP exists, but requires API key/credits and is useful only if voice/audio production becomes part of the portfolio workflow.
- Gemini: wait for Gemini CLI/Google auth/API key; avoid community wrappers.
- Google Cloud / Gemini Cloud Assist: add only for Google Cloud work with explicit auth and scope.
- Claude: wait for Claude Code/Claude Desktop or Anthropic credentials; avoid unofficial Claude wrappers.
- OpenAI model/API access: use existing Codex/OpenAI environment and official docs MCP; do not add unofficial OpenAI model wrappers.
- Hostinger: scoped official MCPs are active for hosting, DNS, and domains, but no API token is stored. Billing, VPS, Reach, and the broad all-tools server remain excluded until explicitly needed.
- Perplexity: active official MCP package, but no API key is stored. Use only after explicit approval and `PERPLEXITY_API_KEY` is available.
- Generic "AI" MCPs: do not add just because they include AI in the name. Add only if official/verified, lightweight, maintained, scoped, and clearly useful.

### Future-Ready Design / Web Candidates

Do not install these yet, but keep them close for the next growth step:

- MDN MCP: active official Mozilla/MDN server for HTML, CSS, JavaScript, Web APIs, accessibility, and browser compatibility data. MDN labels it experimental, so use it for public web-platform questions and avoid private content.
- Cloudinary MCP servers: official Cloudinary remote MCPs for image/video asset management, transformations, metadata, analysis, and MediaFlows. Approved as a future-ready design/media set, but not active yet because config write permission was blocked. They require OAuth/API credentials at connection time. Prefer Context7/Cloudinary docs first unless we need real asset management.
- Canva MCP: active official remote server, but use only when design/asset/export workflow needs it.
- Adobe Photoshop / Firefly / Dreamweaver MCP: no clean official general-purpose MCP selected in the current review. Keep watching Adobe's official developer docs.

### Long-Term Candidate Radar

These are not active. Keep them as a future pool only. Promote one only when a real project need appears, the current maintainer/source is rechecked, and permissions are scoped.

#### Coding / Developer Workflow

- FastMCP: useful when we build our own private MCP server or prototype internal MCP tools. Do not add for daily work; use when custom MCP development starts.
- OpenSpec: candidate for spec-driven development when projects become large enough to need formal feature specs before implementation.
- Serena: candidate for semantic code navigation/editing. Powerful, but overlaps with filesystem, git, semgrep, and Codex reasoning; add only after a codebase becomes large enough to justify semantic indexing.
- Beads: candidate for lightweight issue/task memory. Add only if GitHub, Linear, Notion, and local notes feel too heavy or too scattered.
- MCP Toolbox for Databases / GenAI Toolbox: official Google database toolbox; add only with a concrete local/dev database and scoped credentials.
- Periphery: candidate for Swift/iOS/macOS unused-code analysis. Add only when a real Swift/Xcode project exists.
- XcodeBuild: candidate for iOS/macOS build, test, simulator, and Xcode workflows. Higher permission surface; add only for real Apple-platform development.

#### Frontend / Design

- Penpot: candidate for open-source design/prototyping workflow if we decide to use Penpot alongside or instead of Figma/Canva.
- Storybook MCP: candidate when we have a component library or design system that is actually maintained in Storybook.
- Cloudinary: already approved pending as the media/asset workflow set. Connect only when portfolio image/video asset management becomes real work.
- 21st.dev Magic: candidate for AI-assisted UI/component generation. Requires API key or account access; keep on-demand.
- Browserbase: candidate for cloud browser automation. Requires account/API key and overlaps with Playwright/Chrome DevTools; use only when local browser automation is not enough.
- Firecrawl: candidate for SEO/content crawling and structured extraction. Requires API key and web scraping judgment; use only for approved public-site research.

#### Docs / Research

- Apple Doc / Cupertino: candidates for Apple Developer documentation. Not Apple-owned; add only if Apple/iOS/macOS development starts and recheck source first.
- Google Cloud developer knowledge/docs MCPs: candidates only for Google Cloud work with explicit auth/scope. Keep `aws-knowledge`, `microsoft-learn`, `mdn`, `openai-docs`, `context7`, and `exa` as the current docs/research base.
- Google Developer Knowledge MCP: official Google docs MCP at `https://developerknowledge.googleapis.com/mcp`, but it requires a Google Cloud project and `X-Goog-Api-Key` header. Do not add as plain `--url`; use only after a restricted key exists.
- Oracle MCP servers: official Oracle MCPs exist for SQLcl/Oracle Database, MySQL HeatWave, OCI, and online documentation. Add only when Oracle DB/OCI work exists and required local tooling/credentials are available.

#### Automation / Workflow

- Trigger.dev: candidate for long-running workflows and durable background jobs when real app automation appears.
- N8n: powerful workflow automation candidate, but broad integration surface. Add only when a specific automation workflow justifies it.
- Task Master: candidate for task breakdown and AI-assisted planning, but Claude-oriented and potentially redundant with Linear/Notion/GitHub.

#### AI / Memory

- Graphiti: candidate for temporal knowledge graph workflows. Add only if project memory becomes structured and long-lived enough to justify a graph layer.
- Cognee: candidate for AI memory/data layer. Add only after we have a clear private knowledge-base plan.
- Supermemory: candidate for memory layer, but account/data privacy must be reviewed carefully before use.
- GPT Researcher: candidate for research reports with citations. Add only when a real research/report task is worth the agentic overhead.

#### Explicitly Not Active Yet

- Do not install any of the above only because they are popular.
- Recheck official/verified status before installing.
- Prefer no-auth/read-only first.
- Avoid tools with shell/system-control, broad filesystem, private account data, or unbounded automation unless the task truly needs them.

### Approved Pending Install Set

Add these when config write permission is available and a Cloudinary/design-media workflow is worth connecting:

- cloudinary-asset-management: `https://asset-management.mcp.cloudinary.com/sse`
- cloudinary-environment-config: `https://environment-config.mcp.cloudinary.com/sse`
- cloudinary-structured-metadata: `https://structured-metadata.mcp.cloudinary.com/sse`
- cloudinary-analysis: `https://analysis.mcp.cloudinary.com/sse`
- cloudinary-mediaflows: `https://mediaflows.mcp.cloudinary.com/v2/mcp`

Expected value:

- portfolio asset organization
- responsive image/video optimization
- image transformation planning
- alt text and content analysis workflows
- metadata for accessibility, SEO, and multilingual asset structure
- reusable media automation pipelines

Permission rule: connect only with Cloudinary OAuth or scoped credentials when needed. Do not commit Cloudinary API keys.

Typography/localization note:

- No official lightweight typography/localization MCP has been selected yet.
- Prefer project-level libraries, Unicode-aware HTML/CSS structure, `lang`/`dir` attributes, font fallback stacks, and browser testing before adding external language MCPs.

### Dreamweaver Workflow

- No official Adobe Dreamweaver MCP was found in the current review.
- Support Dreamweaver-style work through filesystem, browser testing, documentation retrieval, HTML/CSS/JS tools, responsive checks, and asset organization.
- Do not add unofficial Dreamweaver wrappers unless Adobe or a clearly verified maintainer publishes a secure, lightweight MCP.

### Local Data / Dev Environment Candidates

- postgres: official/reference MCP server for PostgreSQL; no API key, but requires a local/dev database connection string and should only be used with non-production DBs
- local sqlite variants: only if official and the current sqlite MCP is not enough; prefer scoped workspace DB files

### Browser Debugging Alternatives

- chrome-devtools-mcp: official Chrome DevTools team server; already active; useful for console/network/performance debugging and configured with an isolated browser profile
- puppeteer: official modelcontextprotocol reference server; candidate because it overlaps with Playwright and Chrome DevTools
- playwright: official Microsoft server; already active and preferred for most browser automation

## Language Families

Use this section as a lookup guide, not an install list. Prefer normal project CLIs first. Add an MCP only when it improves the workflow and has an official maintainer.

### AI Second Opinion By Language Family

Keep Codex as the primary assistant. Bring Claude/Gemini/Perplexity in only when access exists and the task is worth a second model pass.

User trust rule: do not add or use China-based AI helpers such as DeepSeek. Prefer US/EU trusted vendors and official/verified routes.

- JavaScript / TypeScript / Web: Claude for refactor/code review, Gemini for long-context UI/docs review, Perplexity for current framework research.
- Python: Claude for design/refactor review, Gemini for long-context review, Perplexity for library/version research.
- Go: Claude for concurrency/API design review, Gemini for long-context review, Perplexity for current tooling/docs.
- Rust: Claude for ownership/lifetime/refactor reasoning, Gemini for long-context review, Perplexity for ecosystem updates.
- Java / Kotlin / JVM: Claude for architecture/refactor review, Gemini for long documents/specs, Perplexity for framework/current docs.
- Swift / Apple Platforms: Claude for SwiftUI/AppKit reasoning, Gemini for UI/multimodal review, Perplexity for Apple-platform research.
- SQL / Databases: Claude for schema/query review, Gemini for long schema/docs context, Perplexity for current provider docs.
- DevOps / Infrastructure: Claude for plan review, Perplexity for current vendor docs, Gemini Cloud Assist only for Google Cloud work with auth.

### JavaScript / TypeScript / Web

- Active: context7, next-devtools, playwright, chrome-devtools, eslint, semgrep, flowbite, shadcn
- Candidates: puppeteer only if Playwright/Chrome DevTools are insufficient for a specific official MCP workflow
- Prefer CLI fallback: npm/pnpm scripts, eslint, prettier, tsc, vitest/jest, playwright test

### API Specs / OpenAPI

- Active: postman minimal mode for API workflow.
- Candidate: generic OpenAPI MCP remains on-demand only. No official or clearly verified generic OpenAPI server was selected for always-on use.
- Reason: most OpenAPI MCP servers need a specific OpenAPI spec URL, API base URL, tags, and auth settings. Add a project-specific OpenAPI MCP only when a real API spec exists, so the config is scoped and not broken.

### Python

- Active: semgrep
- Candidates: ruff/mypy/pytest-oriented MCP only if official
- Prefer CLI fallback: pytest, ruff, mypy, pyright, pip/uv

### Go

- Active: semgrep
- Candidates: gopls/staticcheck/go-test MCP only if official
- Prefer CLI fallback: go test, go vet, gofmt, staticcheck, gopls

### Rust

- Active: semgrep
- Candidates: rust-analyzer/clippy/cargo MCP only if official
- Prefer CLI fallback: cargo test, cargo clippy, cargo fmt, rust-analyzer

### Java / Kotlin / JVM

- Active: semgrep
- Candidates: Maven/Gradle/JDTLS MCP only if official
- Prefer CLI fallback: mvn test, gradle test, ktlint, detekt, jdtls

### Swift / Apple Platforms

- Active: xcodebuildmcp, use only for real Xcode/iOS/macOS build and test tasks.
- Candidates: only official or strongly verified Xcode/Swift MCPs
- Prefer CLI fallback: xcodebuild, swift test, swiftformat, swiftlint

### SQL / Databases

- Active: sqlite
- Candidates: postgres for local/dev database only
- Prefer CLI fallback: sqlite3, psql, migration tool already used by the project

### DevOps / Infrastructure

- Active: none
- Candidates: docker, kubernetes only with clear need and scoped local/dev context
- Prefer CLI fallback: docker compose, kubectl, helm, project scripts

### Local AI / Offline Models

Use these only if a local model runtime is installed. Do not install community MCPs just to get AI access.

- Ollama: no API key, local models only; currently not installed on this machine
- LM Studio: no API key, local models only; currently not detected on this machine
- Official MCP rule: only add an Ollama/LM Studio MCP if it is published by the product owner
- Prefer direct local runtime usage first: `ollama run`, LM Studio local server, or project-specific local AI tooling
- Good use cases: second opinion on code, offline summaries, small refactor suggestions, private local analysis
- Not good for: current web research, cloud model quality, large multi-file reasoning unless the local model is strong

### Use Only With Clear Need

- docker MCP: useful for container-heavy projects, but higher system-control risk
- kubernetes MCP: useful for cluster work, but high privilege/risk and usually needs kubeconfig
- local database MCP variants: only if official and scoped to a project DB file

## Official / Verified MCP Radar

These are official/vendor-owned or strongly verified MCPs worth remembering, but not all should be active by default.

### Good Active-Set Candidates

- Chrome DevTools MCP: official Chrome DevTools team server; active.
- ESLint MCP: official ESLint server; active.
- Playwright MCP: official Microsoft Playwright server; active.
- Everything MCP: official modelcontextprotocol reference server; candidate for MCP diagnostics/testing.
- Puppeteer MCP: official modelcontextprotocol reference server; candidate for special browser automation/debug cases.
- Time MCP: official modelcontextprotocol reference server; candidate for timezone-heavy workflows.
- Google MCP Toolbox for Databases: official Google database MCP toolbox; candidate only, use with local/dev database credentials.

### Use Through Plugin / Connector First

- GitHub MCP: official GitHub server; use only when GitHub access is needed and credentials are available.
- Notion MCP: official Notion hosted/open-source MCP; use only when workspace access is needed.
- Linear MCP: official Linear server; use only when issue/project access is needed.
- Google Cloud MCPs: official Google MCP collection; use only for cloud tasks with explicit credentials.
- Docker MCP Toolkit/Gateway: official Docker MCP layer; add when Docker Desktop/CLI is installed.
- Kubernetes MCP Server: verified containers project; add when kubectl/kubeconfig exists and cluster work appears.
- Postgres MCP: official/reference MCP; add when a local/dev database connection string exists.

### Zip Review: MCP TOOLS.zip

Checked locally on 2026-05-06. Do not install from the zip by default.

Looks usable / already covered:

- `next-devtools-mcp-main`: Vercel/Next.js source; already active through pinned package.
- `modelcontextprotocol-main`: Perplexity official package appears present; now configured as `perplexity`, but no API key is stored.
- `gemini-cloud-assist-mcp-main`: Google Cloud Platform source appears present, but it needs Google Cloud SDK/auth and cloud scope; keep for later.

Do not add now:

- Gemini wrappers such as `mcp-server-gemini-main`, `gemini-mcp-main`, `gemini-mcp-server-main`, and image Gemini variants: API key needed and not clearly official Google-owned.
- DeepSeek wrappers: excluded by user trust preference and not product-owner official in this zip snapshot.
- Grok wrappers: API key needed and not product-owner official in this zip snapshot.
- Filesystem/file-edit/file-convert/json variants: duplicates existing official filesystem/fetch/git/sqlite tools or come from community sources.
- Anything with shell, broad filesystem, SSH, or unclear maintainer identity.

Three-month rule:

- Revisit this zip around 2026-08-06 only if we need more capability.
- Promote a candidate only after checking current upstream source, maintainer identity, version, permissions, and credential needs.

### Official But Task-Based

- Docker MCP: keep as an official candidate for container-heavy projects.
- Kubernetes MCP: keep as an official candidate for cluster/infrastructure work.
- Database MCPs: keep as official candidates for database work when credentials and scope are clear.

## Plugin / Connector First

For services that require API keys, OAuth, or account access, do not keep MCP candidates here. Prefer existing Codex plugins/connectors and ask before using them when the task needs it. Examples:

- GitHub: use GitHub plugin/connector when needed
- Supabase / Neon / PostgreSQL: use installed database plugins/connectors when needed
- Figma: use Figma plugin when needed
- Google Drive / Docs, Slack, Notion, Sentry, Linear: use plugins/connectors when available
- Perplexity: configured but requires explicit approval and `PERPLEXITY_API_KEY` before use
- Gemini / Claude: configure only through official runtime/API access when the user provides credentials and explicitly wants them

## Rotation Rule

When a new MCP is needed:

1. Check whether an existing plugin already covers the need.
2. If not, pick an MCP from this pool.
3. Remove the least useful active MCP first if active count would exceed 12.
4. Prefer pinned versions over latest.
5. Prefer direct command invocation over shell wrappers.
6. After 2-3 tasks, remove MCPs that were not useful.

## Sources To Recheck Before Installing

- Official reference servers: https://github.com/modelcontextprotocol/servers
- ESLint MCP docs: https://eslint.org/docs/latest/use/mcp
- Chrome DevTools MCP: https://developer.chrome.com/blog/chrome-devtools-mcp
- Playwright MCP: https://github.com/microsoft/playwright-mcp
