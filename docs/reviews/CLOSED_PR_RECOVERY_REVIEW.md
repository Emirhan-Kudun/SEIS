# Closed PR & Folder Recovery Review

Date: 2026-06-19
Scope: SEIS ecosystem repositories under the V16 master constitution
(§22 PR rescue, §35 recovery report). This is a point-in-time audit, not an
instruction set.

## Repository condition

`Emirhan-Kudun/SEIS` is the canonical single repository and source of truth. The
five satellite repositories are consolidated: each carries a `MOVED_TO_SEIS.md`
marker and is mirrored read-only under [`sources/`](../../sources/README.md) with
a drift guard (`npm run check:sources-mirror`).

Official source-of-truth files all present: `AGENTS.md`, `README.md`,
`ARCHITECTURE.md`, `ROADMAP.md`, `SECURITY.md`, `CONTRIBUTING.md`,
`CHANGELOG.md`, `LICENSE`, `.gitignore`, `.github/`, `docs/`.

## Pull request status

25 pull requests total. PRs #1–#24 are **all merged** — there is no abandoned or
closed-unmerged work to rescue; the history is clean. Non-merged PRs:

| PR | State | Classification | Recommended action |
|---|---|---|---|
| #10 — cockpit roadmap panel + visual refresh; resolve 5 security gates | open, draft | open-needs-cleanup; likely partially superseded (base `8a54181`, pre-V14; cockpit/design-system reworked since in #19–#24) | rebase onto `main`, assess novel vs. shipped; **do not auto-merge or close** |
| #25 — feat(ai-core): SEIS AI Core foundation | open, draft, CI green | active foundation work | review / merge through protected workflow |

No PRs were unsafe, duplicate-needing-deletion, or unrecoverable.

### PR #10 rebase assessment (2026-06-19)

#10 is **14 commits behind `main`** (base `8a54181`). A local rebase/merge dry-run
(`git merge-tree`, no push) shows it is **recoverable**:

- **Real conflicts (2):** `apps/web/src/styles/cockpit.css` (its visual refresh is
  largely **superseded** by the design-system rework in #19–#24 — reconcile or
  drop, do not force-apply) and `data/secret-scan-results.json` (trivial data
  conflict — take `main`'s current scan).
- **Auto-mergeable overlap (3):** `apps/web/cockpit.html`,
  `apps/web/src/scripts/cockpit.js`, `package.json`.
- **Net-new, non-conflicting value (14 files):** roadmap panel
  (`data/roadmap-status.json`), automation kill-switch
  (`data/automation-registry.json` + `scripts/check-automation-registry.mjs`),
  three decision records (error-tracking/rollback-contract/automation-kill-switch),
  three research notes, and Convex schema/queries + generators
  (`apps/fullstack/convex/*`).

**Recommendation:** recover the 14 net-new files + the decision records onto a
fresh branch off current `main`; reconcile cockpit.html/js against the shipped
design system; drop the superseded cockpit.css refresh; take `main`'s
secret-scan-results. **Do not** force-push #10's branch without explicit
authorization (V16 §4); **do not** auto-merge or close #10.

## Closed PR rescue plan

- **Safe work to recover:** none outstanding — all useful closed PRs already
  merged.
- **Leave open, do not merge automatically:** #10 (needs rebase + human review),
  #25 (awaiting review).
- **Reopen:** none.
- **Replace with a clean PR:** only if #10's rebase produces heavy conflicts;
  then recover the still-novel delta into a fresh branch.
- **Unrecoverable:** none.

## Folder classification

| Path | Classification | Action |
|---|---|---|
| `SEIS/` (root + official files) | core | keep as source of truth |
| `SEIS/sources/*` | useful mirror | keep (drift-guarded) |
| `SEIS/packages/*` | core / open-module mix | keep; openness per `open-modules.json` |
| `SEIS/apps/web` | core (cockpit / Command Center) | keep |
| satellite repos (docs, portfolio, github-unified-source, memories, marketplace-plugin) | consolidated | leave as-is; SEIS is canonical |

## Security findings (categories only)

Clean. Only `.env.example` templates are tracked (safe). No real `.env`, private
keys, `*.pem`/`*.key`, credentials, or service-account files. No nested `.git`
inside repos. Zero tracked dependency/build folders across all repositories. No
secret content was read, printed, or copied during this audit.

## Duplicates and outdated material

No duplicate prompt/doc chaos requiring consolidation was found in the canonical
repo. The only outdated artifact is PR #10's branch state relative to `main`.

## Decision

- Safe to commit (this review doc): yes.
- Safe to open PR: yes.
- Safe to merge: only via the protected workflow with human approval (V16 §32).
