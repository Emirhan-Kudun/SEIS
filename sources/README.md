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

## Full History Branches

In addition to the snapshots above, every branch of every origin repository
has been pushed into SEIS with its complete commit history under the
`sources/<repo>/<branch>` branch namespace. Nothing is lost if the origin
repositories are archived or deleted.

| SEIS branch | Origin |
| --- | --- |
| `sources/docs/main` | `emirhankudun-ux/docs` @ `main` |
| `sources/docs/claude/seis-repo-consolidation-upe4x4` | `emirhankudun-ux/docs` |
| `sources/emirhan-kudun-portfolio/codex/seis-ux-cinematic-premium-foundation` | `emirhankudun-ux/emirhan-kudun-portfolio` (default branch) |
| `sources/emirhan-kudun-portfolio/codex/website-portfolio-refresh` | `emirhankudun-ux/emirhan-kudun-portfolio` |
| `sources/emirhan-kudun-portfolio/feature/seis-ecosystem-integration` | `emirhankudun-ux/emirhan-kudun-portfolio` |
| `sources/emirhan-kudun-portfolio/seis-concept` | `emirhankudun-ux/emirhan-kudun-portfolio` |
| `sources/emirhan-kudun-portfolio/claude/portfolio-website-Tb8Jg` | `emirhankudun-ux/emirhan-kudun-portfolio` |
| `sources/emirhan-kudun-portfolio/claude/test-improvements-8u81C` | `emirhankudun-ux/emirhan-kudun-portfolio` |
| `sources/emirhan-kudun-portfolio/claude/seis-repo-consolidation-upe4x4` | `emirhankudun-ux/emirhan-kudun-portfolio` |
| `sources/github-unified-source/main` | `emirhankudun-ux/github-unified-source` @ `main` |
| `sources/github-unified-source/full-icloud-archive-20260604` | `emirhankudun-ux/github-unified-source` |
| `sources/github-unified-source/claude/seis-repo-consolidation-upe4x4` | `emirhankudun-ux/github-unified-source` |
| `sources/memories/main` | `emirhankudun-ux/memories` @ `main` |
| `sources/memories/claude/seis-repo-consolidation-upe4x4` | `emirhankudun-ux/memories` |
| `sources/seis-trusted-marketplace-plugin/main` | `emirhankudun-ux/seis-trusted-marketplace-plugin` @ `main` |
| `sources/seis-trusted-marketplace-plugin/claude/seis-repo-consolidation-upe4x4` | `emirhankudun-ux/seis-trusted-marketplace-plugin` |

The origin tag `icloud-github-zip-20260604` (from `github-unified-source`)
points at commit `0bf24a61e5b5e8f3c24f34d18776f9ae128798ef`, which is
reachable from `sources/github-unified-source/full-icloud-archive-20260604`.
Tag pushes are blocked in this environment, so the tag itself was not
mirrored; recreate it from that commit if needed.

## Notes

- Each snapshot contains only the files tracked by Git in the origin
  repository at the listed commit (`git archive` export). Untracked local
  files, build output, and `.git` history are not included.
- Full commit history is preserved inside SEIS through the
  `sources/<repo>/<branch>` branches listed above, so the origin
  repositories can be archived or deleted without losing history.
- The audit and plan behind this layout live in
  `docs/github-branch-migration-audit.md` and
  `sources/github-unified-source/docs/single-repository-migration-plan.md`.
