# Google Open Source Foundation

This document defines how SEIS keeps Google-origin and open-source tooling under
`codex/premium-local-foundation` without turning it into a competing main branch.

## Position

`codex/premium-local-foundation` is the parent branch. Google Open Source
Copilot is a subordinate agent and connector lane inside that branch. Its
branches are logical work lanes unless a temporary Git branch is explicitly
created, reviewed, and folded back into the parent branch.

The default posture is registry-first:

- local validation can stay lightweight;
- official docs lookup is on-demand;
- cloud and account-scoped actions are approval-gated;
- new dependencies require a concrete feature reason.

## Sub-Agent Binding

- Agent card: `.claude/agents/google-open-source-copilot.md`
- Manifest: `seis/google-open-source-foundation/manifest.json`
- Connector group:
  `seis/connector-orchestration/groups/google-open-source-foundation.json`
- Check script: `scripts/google-open-source-foundation-check.cjs`

## Branch Topology

- Parent branch: `codex/premium-local-foundation`
- Sub-agent: `google-open-source-copilot`
- Branch lanes:
  - `google-official-docs`
  - `chrome-web-quality`
  - `firebase-cloud-run`
  - `material-design-system`
  - `google-ai-agent-systems`
- Git rule: these lanes are not long-lived Git branches by default.

## Core Bindings

- `chrome-devtools`: local browser and performance validation.
- `google-developer-knowledge`: official Google documentation lookup.
- `google-design-mcp`: Material Symbols and design reference lookup.
- `firebase`: Firebase planning and optional initialization after approval.
- `google-cloud-run`: Cloud Run deployment planning after approval.
- `google-firestore`: Firestore rules and schema planning after approval.
- `context7`: current open-source library documentation when a dependency is
  already in scope.

## Adoption Lanes

- `web-quality`: Lighthouse, web-vitals, Chrome DevTools, web.dev guidance.
- `design-system`: Material Symbols, Material Web, icon governance.
- `app-backend`: Firebase, Firestore, Cloud Run, storage and hosting planning.
- `ai-agent-systems`: ADK, Gemini/Antigravity transition review, Gemini APIs.
- `language-runtime`: Go, Flutter/Dart, TensorFlow, Bazel, Angular only when
  they match the feature architecture.

## Current Guardrail

Gemini CLI is not a default SEIS dependency. Google AI terminal tooling stays
on migration-watch until the current official CLI and ADK path is verified for
the specific task.

## Commands

```bash
node scripts/google-open-source-foundation-check.cjs
node seis/connector-orchestration/runner.cjs --dry-run --group google-open-source-foundation --format markdown
```

## Coding Rule

Do not begin implementation by installing a Google SDK. Begin by selecting the
smallest adoption lane, validating official sources, and confirming rollback.
