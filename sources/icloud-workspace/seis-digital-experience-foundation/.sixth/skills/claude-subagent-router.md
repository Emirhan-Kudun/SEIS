# Claude Subagent Router

Purpose: choose the smallest useful Claude project subagent set for a task.

Default route:

- structural change: Architecture Guardian, Branch Governor
- UI polish: Premium UI Guardian, Design System Keeper, Mobile Responsive Guardian
- localization: I18n Localization Guardian, Content Brand Strategist
- SEO: SEO Strategist, Accessibility Inspector
- performance: Performance Auditor, Dependency Inspector
- release or rollback: Release Rollback Guardian, Incident Response Guardian
- connector planning: MCP Integration Manager, AI Safety Inspector
- large AI task: Token Budget Coordinator, Multi-Agent Orchestrator
- CI/CD: CI/CD Guardian, Build Stability Guardian
- secrets: Environment Secrets Guardian, Security Threat Modeler
- backend: Fullstack API Guardian, Database Schema Guardian
- product: Product Strategy Owner, UX Journey Mapper
- portfolio: Portfolio Case Study Architect, Content Brand Strategist
- repository hygiene: Repository Cleanliness Curator, Archive Backup Guardian
- observability: Observability Guardian, Analytics Growth Guardian
- platform expansion: Platform Expansion Guardian, Cloud Deployment Guardian
- connector orchestration: Connector Orchestration Governor, Plugin Permission Auditor, Connector Report Scribe

Rules:

- load one to three agents first
- avoid loading every agent by default
- keep long manifestos compressed into registry references
- do not grant write/deploy/secret access through routing

Output:

- selected agents
- skipped agents
- reason for each selection
- risk score
- next safe action
