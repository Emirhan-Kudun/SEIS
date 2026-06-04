# Claude Subagents Registry

This registry documents the project-level Claude subagents under `.claude/agents/`.
They are compact, on-demand role cards designed to reduce repeated long prompts.

## Operating Rule

Use the minimum useful set of agents for the task. Do not load the whole registry
when one focused reviewer is enough.

## Core Safety Agents

- `branch-governor`: branch, staging, merge, and rollback-safe Git flow.
- `ai-safety-inspector`: AI hallucination, secret, dependency, and unsafe edit risk.
- `architecture-guardian`: project structure, boundaries, and architecture drift.
- `dependency-inspector`: package additions, lockfile safety, and dependency bloat.
- `release-rollback-guardian`: release readiness, rollback path, and deployment risk.
- `security-threat-modeler`: attack surfaces, trust boundaries, and mitigation plans.
- `environment-secrets-guardian`: env variables, `.env` safety, and secret boundaries.
- `ci-cd-guardian`: workflow checks, status gates, and deployment permissions.
- `build-stability-guardian`: build scripts, runtime assumptions, and cloud/local parity.

## Product Quality Agents

- `premium-ui-guardian`: premium minimalist UI quality and visual rhythm.
- `design-system-keeper`: tokens, colors, typography, spacing, and motion consistency.
- `mobile-responsive-guardian`: mobile-first layout and touch behavior.
- `accessibility-inspector`: semantic HTML, keyboard, contrast, ARIA, and reduced motion.
- `seo-strategist`: metadata, headings, Open Graph, and discoverability.
- `performance-auditor`: assets, rendering cost, animation cost, and script bloat.
- `visual-regression-reviewer`: visual drift, broken states, and UI regression checks.
- `motion-systems-director`: animation choreography, easing, and reduced-motion safety.
- `asset-optimization-librarian`: images, icons, fonts, videos, and public assets.
- `design-research-curator`: reference synthesis, originality, and non-cloning guardrails.
- `figma-handoff-guardian`: Figma-to-code token and component parity.

## Workflow Agents

- `documentation-agent`: documentation freshness and decision clarity.
- `cloud-sync-guardian`: local/cloud handoff, source-of-truth, and recovery safety.
- `worktree-governor`: one worktree per branch and stale worktree hygiene.
- `mcp-integration-manager`: connector scope, maintenance value, and permission safety.
- `token-budget-coordinator`: compact context loading and skill-card routing.
- `multi-agent-orchestrator`: minimal agent selection and conflict resolution.
- `github-pr-governor`: commit scope, PR readiness, and review checklist quality.
- `repository-cleanliness-curator`: source-control hygiene and generated artifact control.
- `archive-backup-guardian`: archive boundaries, export handling, and recovery organization.
- `technical-debt-curator`: debt severity, cleanup sequencing, and refactor safety.
- `ai-memory-scribe`: concise AI decision logs and future-agent handoff notes.
- `testing-qa-strategist`: test coverage, smoke checks, and validation confidence.
- `observability-guardian`: monitoring, logs, Sentry readiness, and telemetry safety.
- `cloud-deployment-guardian`: preview, staging, production, and rollback readiness.
- `connector-orchestration-governor`: one-run plugin/MCP planning with dry-run default.
- `plugin-permission-auditor`: connector permission scope, billing risk, and external data safety.
- `connector-report-scribe`: connector run reports, skipped reasons, approvals, and next actions.
- `google-open-source-copilot`: Google-origin open-source planning under `UIXAppTTR`.
- `premium-local-foundation-agent`: former `codex/premium-local-foundation` scope absorbed as a logical lane inside `UIXAppTTR`.

## Content Agents

- `i18n-localization-guardian`: TR/EN/FR/IT/DE coverage and localized UI safety.
- `content-brand-strategist`: premium copy, CTA clarity, and brand voice.
- `product-strategy-owner`: product value, scope discipline, and roadmap fit.
- `ux-journey-mapper`: navigation, friction, state coverage, and CTA clarity.
- `portfolio-case-study-architect`: project storytelling, proof points, and case-study depth.
- `analytics-growth-guardian`: privacy-safe events, conversion signals, and growth loops.

## Fullstack Agents

- `nextjs-foundation-guardian`: Next.js routing, metadata, hydration, and server/client boundaries.
- `tailwind-shadcn-radix-keeper`: Tailwind, shadcn/ui, Radix consistency, and component reuse.
- `fullstack-api-guardian`: API routes, server actions, validation, auth, and webhooks.
- `database-schema-guardian`: database migrations, policies, rollback, and data integrity.
- `auth-payments-guardian`: auth, authorization, Stripe/payment flows, and trust-sensitive journeys.
- `platform-expansion-guardian`: future Flutter, Firebase, Supabase, OpenAI, Gemini, Claude, and mobile plans.

## Recommended Routing

| Task | Start With | Add If Needed |
| --- | --- | --- |
| Small code fix | `branch-governor`, `ai-safety-inspector` | `architecture-guardian` |
| UI polish | `premium-ui-guardian`, `design-system-keeper` | `mobile-responsive-guardian`, `visual-regression-reviewer` |
| SEO change | `seo-strategist` | `accessibility-inspector`, `content-brand-strategist` |
| Performance work | `performance-auditor` | `dependency-inspector`, `mobile-responsive-guardian` |
| Release prep | `release-rollback-guardian` | `incident-response-guardian`, `branch-governor` |
| Connector/MCP plan | `mcp-integration-manager` | `ai-safety-inspector`, `token-budget-coordinator` |
| CI/CD change | `ci-cd-guardian` | `build-stability-guardian`, `environment-secrets-guardian` |
| Backend change | `fullstack-api-guardian` | `security-threat-modeler`, `database-schema-guardian` |
| Portfolio case study | `portfolio-case-study-architect` | `content-brand-strategist`, `seo-strategist` |
| Motion change | `motion-systems-director` | `performance-auditor`, `accessibility-inspector` |
| Repo cleanup | `repository-cleanliness-curator` | `archive-backup-guardian`, `branch-governor` |
| Product planning | `product-strategy-owner` | `ux-journey-mapper`, `analytics-growth-guardian` |
| Multi-connector plan | `connector-orchestration-governor` | `plugin-permission-auditor`, `connector-report-scribe` |
| Google open-source planning | `google-open-source-copilot` | `mcp-integration-manager`, `platform-expansion-guardian` |
| Absorbed local foundation work | `premium-local-foundation-agent` | `branch-governor`, `cloud-sync-guardian` |

## Notes

- These files do not install dependencies or expose secrets.
- They are project-scoped and safe to version.
- External plugins, MCP servers, and write-capable workflows still require review.
