# SEIS Foundation Architect Pack (2026-06-01)

This document is the architecture-first delivery for SEIS as an AI-assisted Creative Technology Operating System.

## 1) Repository Audit

### Current topology

- Monorepo with `apps/*` and `packages/*` workspaces.
- Production surfaces:
  - `apps/site-next` (primary runtime and API routes)
  - `apps/site-vite` (secondary runtime)
  - `apps/static-fallback` (rollback-safe static surface)
- Knowledge/runtime cores:
  - `packages/content` (content model, capability mesh, domain maps)
  - `packages/runtime` (connector registry, deployment targets, cloud contracts, MCP readiness)
- Governance and automation:
  - `.github/workflows/portfolio-quality.yml`
  - `scripts/check-*.mjs`, `scripts/*preflight*.mjs`, guarded publish/deploy scripts
  - `docs/*` runbooks and release evidence

### Workflow and quality posture

- CI validates lint + typecheck + full checks + both app builds + budget artifact.
- Node 24 baseline is already enforced in CI.
- Runtime includes explicit guarded flows for:
  - GitHub push preflight/publish
  - Cloud environment preflight
  - Deploy preflight and static deploy dry/live split
  - MCP readiness snapshot generation

### Dependencies and risks

- Dependency surface is lean and app-focused (Next.js, React, Three.js, Vite, TypeScript).
- Risks currently visible from live preflight:
  - cloud credentials missing (watch status)
  - deploy credentials missing (watch status)
  - publish flow blocked when worktree is dirty or remote target mismatches governance contract

### GitHub configuration audit

- Active branch: `codex/seis-ux-cinematic-premium-foundation`
- Current `origin`: `https://github.com/emirhankudun-ux/UIX-Apps.git`
- Governance docs target: `git@github.com:emirhankudun/emirhan-kudun-portfolio.git`
- Publish status: current branch publishes to `origin` successfully; live cloud/server deploy remains blocked until credentials and target are explicit.

## 2) Architecture Blueprint

### Foundation layers

1. Experience Layer
   - Cinematic UI, portfolio surfaces, domain pages, fallback UX.
2. Knowledge Layer
   - Structured content model (`packages/content`) for domains, capabilities, routes, policy language.
3. Runtime Governance Layer
   - Activation policy, connector registry, deployment targets, cloud activation plan.
4. Execution and Validation Layer
   - Scripted quality gates, preflight checks, CI pipeline, release evidence.
5. Distribution Layer
   - GitHub branch flow, iCloud archive/export, Vercel/custom server pathways.

### Architectural rules

- Single Active Mission: one implementation track from research to completion.
- Model Independence: agent roles are stable; model providers are replaceable executors.
- GitHub Living Repository: source of truth stays in repo; archive systems stay secondary.

## 3) Domain Map

### Active domains (already represented)

- UI/UX systems, motion/3D, content architecture, API surfaces, connector readiness, governance docs, deployment contracts, accessibility and SEO checks.

### Expanded domains now staged in foundation

- Multi-language engineering examples include:
  - TypeScript, JavaScript, HTML, CSS, JSON, Shell
  - Swift, Kotlin/Android, Python, Go, Rust, PHP, C#, Java, SQL, C++
  - Docker, Terraform, Vue, Astro, Svelte
- These are staged as low-risk polyglot examples and planned runtime adapters, not forced production dependencies.

## 4) Agent Map

- Chief Architect Agent: architecture direction, mission sequencing, tradeoff arbitration.
- Design Director Agent: cinematic language, visual system, motion restraint, accessibility harmony.
- Research Agent: domain discovery, references, comparative framing.
- Product Agent: outcomes, roadmap, release criteria, user value.
- Data Agent: schema readiness, telemetry contracts, preflight evidence quality.
- Security Agent: secret boundaries, auth posture, connector risk controls.
- Governance Agent: branch discipline, CI policy, rollback readiness.
- Documentation Agent: runbooks, contracts, release notes, architecture memory.
- Automation Agent: recurring low-power development loops and mission cadence.
- Engineering Language Agent: polyglot adapter strategy and language surface governance.

## 5) Workflow Map

### Mission lifecycle (enforced)

Research -> Analysis -> Planning -> Architecture -> Implementation -> Validation -> Documentation -> Commit -> Completion

### Operational workflow routing

1. Intent detection
2. Domain detection
3. Context routing (relevant files only)
4. Scoped execution
5. Preflight + quality gates
6. Bounded publish/deploy attempts
7. Evidence capture in `docs/releases`

### Guarded automation workflow

- Existing automation: `seis-code-continuation`
- Cadence: hourly
- Mode: high reasoning, low-machine-pressure, scoped reversible edits
- Constraint: side-effectful connectors/deploys require explicit target and credentials

## 6) Roadmap

### Phase A - Foundation Hardening (now)

- Keep runtime contracts authoritative (`packages/runtime/src/*.json`).
- Keep publish/deploy scripts bounded and evidence-first.
- Maintain small reversible commits with CI parity.

### Phase B - Mission Router + Agent Role Contracts

- Add machine-readable mission registry and role-to-domain routing table.
- Add explicit mission status artifact (single active mission state).

### Phase C - Multi-language Adapter Expansion

- Promote staged polyglot examples into optional adapter packages only when product missions require them.
- Keep non-critical languages outside production bundle by default.

### Phase D - Cloud Activation and Deployment Readiness

- Resolve target remote contract.
- Supply credential set through platform secret managers.
- Pass full gates before first live deploy.

### Phase E - Long-term Evolution System

- Quarterly architecture audit cadence.
- Domain expansion protocol with rollback templates.
- Agent capability reviews tied to repository governance.
