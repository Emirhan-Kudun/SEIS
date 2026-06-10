# Consolidated Source Repositories

SEIS is the single canonical repository. Every other repository in the
ecosystem has been imported here as a snapshot of its tracked files, so all
future development happens in SEIS only.

| Directory | Origin repository | Imported commit | Import date |
| --- | --- | --- | --- |
| `sources/docs/` | `emirhankudun-ux/docs` | `603c2299e19b8a3c82d45ece995e14ce9698753a` | 2026-06-10 |
| `sources/emirhan-kudun-portfolio/` | `emirhankudun-ux/emirhan-kudun-portfolio` | `5497b581b5e23cdb1ca4a55ba1eac373fbb0ae08` | 2026-06-10 |
| `sources/github-unified-source/` | `emirhankudun-ux/github-unified-source` | `8eaa5b11a6bce929782052f7a6fbb1dba95dc386` | 2026-06-10 |
| `sources/memories/` | `emirhankudun-ux/memories` | `548be481dc5188e5334ccf9cfe8a86533656df41` | 2026-06-10 |
| `sources/seis-trusted-marketplace-plugin/` | `emirhankudun-ux/seis-trusted-marketplace-plugin` | `7768d349e2d2c7e8bd41da8d848f5d6dad43251c` | 2026-06-10 |

## Notes

- Each snapshot contains only the files tracked by Git in the origin
  repository at the listed commit (`git archive` export). Untracked local
  files, build output, and `.git` history are not included.
- Full commit history remains available in the origin repositories until
  they are archived. Per the migration plan, origin repositories should be
  archived (not deleted) only after these snapshots are verified.
- The audit and plan behind this layout live in
  `docs/github-branch-migration-audit.md` and
  `sources/github-unified-source/docs/single-repository-migration-plan.md`.
