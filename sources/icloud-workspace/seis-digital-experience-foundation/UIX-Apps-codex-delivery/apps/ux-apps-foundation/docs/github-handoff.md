# GitHub Handoff Record

This record links the iCloud Drive UX Apps repository to the cleaned SEIS GitHub delivery package and the current conversation handoff.

## Source Package

- Source checkout: `/Users/emirhan/Documents/Github a gönderilecekler/New project`
- Source archive: `/Users/emirhan/Downloads/Github a gönderilecekler.zip`
- Source branch: `codex/premium-local-foundation`
- Source commit: `4e8fb380 chore(repo): prepare ux apps github handoff`
- Source remote: `https://github.com/emirhankudun-ux/emirhan-kudun-portfolio.git`

## Integration Intent

The source package prepares a larger repository that includes:

- static portfolio compatibility surface
- Next.js SEIS UX apps foundation
- governance docs and scripts
- dependency-security baseline for `next@15.5.18`
- source hygiene rules for GitHub delivery

This iCloud UX Apps repo remains the lightweight foundation. Future integration should happen through scoped source review, not raw folder mirroring.

## Long-Term Intake Program

The zip archive may be used as a long-term design and source reservoir. Each automation run may inspect a bounded slice of the archive with lightweight commands such as `zipinfo` or `unzip -p`, then promote only one small reviewed improvement into the repo.

Priority intake lanes:

- UI/UX interaction patterns
- cinematic motion and reduced-motion variants
- 3D or spatial interface concepts
- data manifests and API contracts
- governance, handoff, and quality documentation
- reusable static assets that are small, inspectable, and source-appropriate

## Current UX Apps Local State

- Local repo: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Uı/UX Apps`
- Active branch: `codex/ux-apps-foundation`
- Latest local commits:
  - `fe0b9ca chore: wire ux apps validation gate`
  - `08518a8 feat(app): add low-power UX Apps runtime`
  - `c787646 feat(app): add UX Apps static foundation`
- Online GitHub push status: blocked until a remote and GitHub authentication are configured.

The folder has already received the lightweight full-stack UX Apps foundation locally. The missing step is only remote publishing to GitHub.com.

## Excluded From Direct Import

Do not import generated or local-only artifacts:

- `node_modules/`
- `.next/`
- `.runtime/`
- `runtime/`
- `.playwright-mcp/`
- `__MACOSX/`
- `.DS_Store`
- real `.env` files or credentials

## Review Gate

Before merging any SEIS source package into this repo:

```bash
git status --short --branch
npm run quality
```

If a framework runtime is introduced later, add a dependency budget note first and preserve the current native Node/static app as a rollback-safe baseline.

## Zip Intake Rule

Do not extract the whole archive into this repo. Use the archive as reference material and adapt the selected source into this foundation intentionally.

## Remote Publishing Blocker

At handoff time:

- `git remote -v` returned no remote.
- `gh auth status -h github.com` reported no GitHub login.
- `GH_TOKEN` and `GITHUB_TOKEN` were not present.

Use one of these paths:

```bash
gh auth login
gh repo create ux-apps --source=. --public --remote=origin --push
```

or, for an existing repository:

```bash
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin codex/ux-apps-foundation
```
