# Sources Are a Read-Only Vendored Mirror

Date: 2026-06-19

## Status

Accepted.

## Context

The `sources/` tree (the largest folder in the repository) holds copies of other
SEIS ecosystem repositories — `emirhan-kudun-portfolio`,
`seis-trusted-marketplace-plugin`, `github-unified-source`, and `memories` — see
[`sources/README.md`](../../sources/README.md). Without a stated policy it is
unclear whether these are the source of truth or a mirror, which invites drift
and accidental edits in the wrong place.

## Decision

`sources/` is a **read-only vendored mirror** for unified search, review, and
offline analysis. It is **not** the source of truth for those projects.

- The canonical home of each project is its own upstream repository.
- Do not develop features against `sources/`; make changes upstream, then refresh
  the mirror.
- Treat mirrored content as historical/reference per the constitution's handling
  of archive material.

## Consequences

- Reviews and searches can stay in one repository without granting write intent.
- Drift between a mirror and its upstream is expected; the upstream wins.

## Follow-up (not in this change)

A lightweight `check:sources-mirror` script could record each mirror's source
commit and warn on drift. Deferred until there is a concrete refresh workflow to
gate.
