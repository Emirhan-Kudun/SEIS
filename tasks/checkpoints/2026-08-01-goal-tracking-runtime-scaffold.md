# Checkpoint: goal-tracking-runtime-scaffold

## Objective

Inspect the SEIS repository from a cold start, confirm it has no existing
goal-tracking/checkpoint convention, and — since inspection surfaced no other
actionable, real defect within the scope of one bounded work package —
install the Universal Goal-Tracking Runtime (v2.0.0) governance doc and the
`tasks/checkpoints/` contract as this repository's first tracked checkpoint,
per the runtime's own §3.4 rule that the scaffold itself is a legitimate goal
when nothing else surfaces.

## Repository inspection (evidence)

- `git log --oneline -20` on `main` at clone time showed a single commit:
  `71ec2d2 feat: sources upstream-drift tracking + cockpit-local boundary (#24)`.
- `find docs -maxdepth 3` and `find tasks` confirmed `docs/` is extensive
  (governance, decisions, platform, deployment, design, etc.) but `tasks/`
  did not exist at all.
- `grep -rli "goal.tracking\|goal tracking"` and `grep -rli "checkpoint"`
  across `*.md` found no existing goal-tracking convention; the only
  "checkpoint" hit was `docs/governance/development-automation.md`, which
  describes a weekly efficiency *report* (`dist/weekly-efficiency-report.json`,
  git-ignored), not a per-work-package, append-only checkpoint contract like
  this one. No duplication.
- `package.json` has 60+ `check:*` scripts, no `test`, `lint`, or `typecheck`
  script; the aggregate quality gate is `npm run quality`, and the governance
  subset is `node scripts/check-governance.mjs`.
- Verified (via `node -e` reading `package.json` and `fs.existsSync`) that
  every `scripts/*.mjs`/`.cjs` file referenced by an npm script actually
  exists on disk — no broken script wiring found.
- Checked GitHub for an existing PR on `claude/goal-tracking-runtime-uyu622`
  (`list_pull_requests` with `head=Emirhan-Kudun:claude/goal-tracking-runtime-uyu622`,
  `state=all`) — none found.

## Completed work

- Created `docs/governance/goal-tracking-runtime.md` — the full 15-section
  Universal Goal-Tracking Runtime Prompt v2.0.0.
- Created `tasks/checkpoints/README.md` — the checkpoint file-naming and
  required-fields contract for this new directory.
- Linked the new governance doc from `docs/governance/README.md`'s
  "Operating docs (concrete rules)" list, matching the existing index
  convention.
- Wrote this checkpoint, exercising the contract it documents.

## Files changed

- `docs/governance/goal-tracking-runtime.md` (new)
- `tasks/checkpoints/README.md` (new)
- `tasks/checkpoints/2026-08-01-goal-tracking-runtime-scaffold.md` (new, this
  file)
- `docs/governance/README.md` (edited — one list entry added)

## Tests executed + results

- `node scripts/check-governance.mjs` — **pass** (constitution, ai-routing-policy,
  open-modules, doc-links, design-system all `[pass]`; "Governance aggregate:
  all 5 checks passed."). This is the check that validates relative markdown
  links under `docs/governance/` (and `README.md`/`AGENTS.md`/etc.) resolve to
  real files, so it directly covers the new doc and the new link into it.
- `node scripts/check-governance.mjs` re-run after adding all four files —
  **pass**, same result.

## Unresolved issues

- None specific to this work package. Broader repo-wide items (the many other
  `check:*` scripts, `npm run quality` end-to-end, non-JS `polyglot/` lanes if
  this repo has any) were not run — out of scope for this bounded package and
  not needed to validate it.

## Decisions

- Did not invent a synthetic "bug fix" goal. Repository inspection found no
  broken script wiring, no failing existing check, and no undocumented but
  clearly-implied missing step beyond the absence of a goal-tracking
  convention itself — so per the runtime's own rule (§3.4 / task framing),
  the scaffold installation is the legitimate work package, not a
  workaround.
- Placed the runtime doc under `docs/governance/` (not a new top-level
  location) because that is this repo's existing home for operating-rule
  docs, and linked it from the governance index so `check:doc-links`
  actually covers it instead of leaving it an orphaned file.
- Kept the checkpoint contract in `tasks/checkpoints/README.md` rather than
  folding it into the governance doc, so the directory is self-explanatory
  to a reader who lands there directly (e.g. via a file browser) without
  first finding the governance doc.

## Risks

- This is documentation/scaffolding only — no runtime code paths, build
  output, or app behavior changed. Blast radius is limited to two new docs,
  one new directory, and one added link line.
- `npm run quality` (the full aggregate gate) was not run in this session;
  only the governance subset directly relevant to the changed files was
  run. If `quality` has checks that scan `tasks/` or new top-level
  directories for unrelated conventions, they were not verified here.

## Rollback

`git revert` the commit that introduces these four file changes, or
`git rm docs/governance/goal-tracking-runtime.md tasks/checkpoints/README.md tasks/checkpoints/2026-08-01-goal-tracking-runtime-scaffold.md`
plus reverting the one added block in `docs/governance/README.md`. No other
files or generated artifacts depend on these paths yet.

## Continuation instructions

A future run can rely on `docs/governance/goal-tracking-runtime.md` +
`tasks/checkpoints/README.md` existing and being linked from the governance
index. The next real work package should be selected by re-running the
inspection process in this runtime's §3 against the repository state *at
that time* (not assumed from this checkpoint) — this checkpoint documents
what was true on 2026-08-01, not what remains true indefinitely.

## Next safe action

Open a draft PR from `claude/goal-tracking-runtime-uyu622` against `main`
for human review of the new governance doc and checkpoint contract; no
further local changes are needed for this work package.
