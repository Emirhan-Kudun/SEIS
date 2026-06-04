# SEIS Product Engineering Operating Model

Mission: `SEIS-M013`

This document converts the SEIS Supreme AI-Native Product Engineering Master Prompt into a durable operating model for repository governance, product engineering, AI-assisted workflows, design quality, and long-term maintenance.

## Machine Contract

```text
data/seis/product-engineering-operating-model.json
```

Runtime endpoint:

```text
/api/seis-product-engineering-model
```

Validation command:

```bash
npm run check:seis-product-engineering-model
```

## Operating Sequence

SEIS work must follow:

```text
analyze -> plan -> design -> implement -> validate -> document
```

This keeps aggressive implementation from skipping architecture, quality, security, or documentation.

## Repository Governance

- `main` and `master` remain protected production branches.
- `UIXAppTTR` remains the active SEIS branch for this workspace.
- Commits follow `type(scope): description`.
- Unrelated changes stay out of the mission diff.
- Secrets, tokens, private keys, and server environment values are never committed.
- Rollback must remain possible.

## Product Surfaces

The operating model allows SEIS to evolve into websites, SaaS products, mobile applications, design systems, internal tools, automation systems, AI agents, MCP integrations, GitHub repositories, cloud infrastructure, and documentation systems.

## Quality Gates

Before a mission is complete, verify:

- build passes
- no unrelated files changed
- accessibility preserved
- performance preserved
- security preserved
- documentation updated
- architecture remains clean
- rollback remains possible

## Technology Direction

The model supports HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, serverless APIs, Supabase, PostgreSQL, Vercel, GitHub Actions, OpenAI, Claude, Gemini, Codex, GitHub Copilot, and the MCP ecosystem.

Technology remains mission-routed: SEIS may support many stacks, but it should activate only the stack that improves maintainability, scalability, security, accessibility, or product quality.

## Design Direction

The experience should remain premium, modern, minimal, elegant, structured, design-first, accessible, responsive, and typography-led.

Avoid clutter, visual noise, inconsistent systems, dependency bloat, and irreversible architecture.

## Automation Direction

Automation should improve developer workflow, documentation, testing, deployment, research, and design operations without creating noisy orchestration or unsafe remote writes.
