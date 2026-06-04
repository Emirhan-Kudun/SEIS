# SEIS Mission Lifecycle

Status: active  
Owner: Governance Agent  
Related directive: `docs/governance/seis-supreme-operating-directive.md`

SEIS uses a single active mission model. A mission is a bounded unit of work with a clear purpose, owner agents, validation path, documentation outcome, and rollback strategy.

## Lifecycle

1. Research
   - Identify the source material, repo area, user intent, and constraints.
   - Avoid broad knowledge loading.

2. Analysis
   - Compare current state against the mission objective.
   - Identify risks, dependencies, blockers, and rollback needs.

3. Planning
   - Define scope, non-scope, affected files, owner agents, and validation commands.

4. Architecture
   - Decide where the system should live and how it connects to existing structures.
   - Prefer registries and documentation over hidden behavior.

5. Implementation
   - Make small, reversible changes.
   - Avoid dependency bloat and unrelated rewrites.

6. Validation
   - Run the narrowest meaningful checks first.
   - Record blockers when tools or credentials are unavailable.

7. Documentation
   - Update the relevant directive, registry, decision, or runbook.
   - Do not create documentation without operational purpose.

8. Commit
   - Commit only relevant files.
   - Use clear, scoped commit messages.

9. Completion
   - Summarize local state, shipped state, blockers, and next mission.

## Mission States

- `proposed`: candidate mission exists but has not started.
- `active`: the only implementation mission currently being executed.
- `blocked`: mission cannot proceed without external action.
- `validated`: implementation is complete and checks passed.
- `committed`: local commit exists.
- `published`: remote publication is confirmed.
- `completed`: documentation, validation, and commit or publish status are reported.

## Required Mission Record

Each mission should define:

- id
- title
- owner agent
- support agents
- domains
- status
- purpose
- scope
- non-scope
- validation
- documentation outputs
- rollback path

## Current Blockers

GitHub publication requires authenticated GitHub CLI access.

Shell validation may be blocked if local plugin hooks are missing or misconfigured. When this happens, the mission should continue only with safe file edits and clearly report the blocker.
