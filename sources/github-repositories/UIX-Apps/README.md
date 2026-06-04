# UI-UX Digital Lab Workspace

This workspace is the operational core for a low-pressure, high-efficiency UI/UX
development loop.

## What Is Included

- governance-first automation scripts
- a lightweight cinematic web foundation
- a gap closure register
- provider-neutral cloud environment contracts
- connector and MCP capability registry
- release refresh support without dependency bloat

## Quick Start

```bash
npm run automation:develop
```

## Core Commands

```bash
npm run check:workspace
npm run check:release-sync
npm run check:ai-stack
npm run check:cloud-environment
npm run automation:code-plan
npm run automation:server-cloud-report
npm run automation:refresh-release
npm run automation:publish-readiness
```

Cloud and connector contracts live in `deploy/cloud-environment.json` and
`content/development/connector-capability-registry.json`. They keep GitHub,
server upload, cloud provider selection, MCP/connector usage, and rollback rules
explicit before any credentialed remote action.

## AI CLI Router

Use one workspace command to switch between installed AI tools:

```bash
npm run ai -- list
npm run ai -- auto "local coding assistant"
npm run ai -- auto "local coding assistant" :: --version
npm run ai -- codex
npm run ai -- claude
npm run ai -- gemini
npm run ai -- ollama
npm run ai -- kimi
npm run ai -- aider
npm run ai -- interpreter
```

Reference: `docs/development/ai-cli-stack.md` and `scripts/ai-routing-policy.cjs`

## Safety Rules

- no automatic push
- no automatic deploy
- no heavy local process by default
- reduced-motion support is mandatory
