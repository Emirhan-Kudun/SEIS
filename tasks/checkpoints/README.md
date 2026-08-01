# Checkpoints

This directory did not exist before it was created to hold the checkpoint
records defined by the
[Universal Goal-Tracking Runtime](../../docs/governance/goal-tracking-runtime.md#11-checkpoint-contract-taskscheckpoints)
(§11). It is the repository-durable continuity mechanism for long-running,
multi-session AI-assisted work in SEIS: a future run — with no memory of any
prior conversation — should be able to read the latest checkpoint here plus
current repository state and know exactly where things stand.

## What goes here

One markdown file per checkpoint, written at the end of a work package or
before a run's context window runs low. Checkpoints are **append-only**:
never edit or overwrite a historical checkpoint to reflect new information —
write a new one. The sequence of checkpoints is itself evidence of how the
project actually progressed, including what turned out to be wrong.

## File naming

```
tasks/checkpoints/YYYY-MM-DD-<slug>.md
```

- `YYYY-MM-DD` — the date the checkpoint was written.
- `<slug>` — a short, kebab-case description of the work package
  (e.g. `goal-tracking-runtime-scaffold`).
- If more than one checkpoint is written on the same date for different work
  packages, the slug disambiguates them; do not append numeric suffixes to
  the same slug — pick a more specific slug instead.

## Required fields

Every checkpoint file must contain each of the following sections, filled
with real content or an explicit `none` — never silently omitted:

- **Objective** — what this checkpoint's work was trying to achieve.
- **Completed work** — what was actually done, factually.
- **Files changed** — the concrete list, matching the actual diff.
- **Tests executed + results** — exact commands run and their exact
  outcomes, including any failures or skips. Do not omit a failing or
  skipped check to make the checkpoint look cleaner.
- **Unresolved issues** — anything left open, named specifically.
- **Decisions** — choices made and why.
- **Risks** — what could go wrong, or what wasn't verified.
- **Rollback notes** — how to undo this checkpoint's changes safely.
- **Continuation instructions** — how the next run should pick this up.
- **Next safe action** — one concrete, unambiguous action.

See
[`docs/governance/goal-tracking-runtime.md`](../../docs/governance/goal-tracking-runtime.md)
for the full runtime this contract is part of, including the status
taxonomy and evidence classes checkpoints should reference.
