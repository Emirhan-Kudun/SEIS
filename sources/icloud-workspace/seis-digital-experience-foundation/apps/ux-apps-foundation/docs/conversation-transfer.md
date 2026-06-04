# Conversation Transfer

This document preserves the working decisions from the SEIS / UX Apps conversation inside the iCloud Drive Git repository.

## User Intent Captured

- Build a full-stack website/application foundation.
- Continue from the iCloud Drive GitHub folder, specifically the UX Apps repository.
- Keep the machine load low: avoid unnecessary heavy builds, dependency bloat, broad scans, or GPU-heavy validation.
- Preserve a premium, calm, cinematic, editorial, humane design direction.
- Include animation and 3D/cinematic feeling, but keep it efficient and reduced-motion aware.
- Prepare infrastructure for future expansion rather than only a static landing page.
- Commit local repository changes and prepare for GitHub publishing.

## Design Direction Captured

The desired experience should feel:

- calm
- premium
- cinematic
- editorial
- breathable
- immersive without noise
- accessible
- psychologically sustainable
- modular
- maintainable

Avoid:

- noisy dashboards
- manipulative UX
- excessive animation
- uncontrolled dependency growth
- generic portfolio/template feel
- overstimulation

## Technical Direction Captured

The original SEIS plan preferred Next.js, React, TypeScript, Tailwind, shadcn/ui, Framer Motion, GSAP, React Three Fiber, MDX, Contentlayer, and Vercel.

For this iCloud UX Apps repository, the implemented first release intentionally uses a lower-power foundation:

- native Node.js HTTP server
- static HTML/CSS/JavaScript frontend
- local JSON data manifests
- dependency-free runtime
- `node:test` API tests
- local quality gates

This keeps the repository stable and light while leaving a future migration path to Next.js or heavier 3D tooling.

## Implemented Local Foundation

Added or preserved:

- root static UX catalog for fallback/GitHub Pages style serving
- `public/` full-stack UI served by native Node
- `/api/health`
- `/api/apps`
- `/api/manifest`
- `/api/governance`
- `/api/observability`
- `/api/contact`
- low-power canvas atmosphere
- reduced-motion support
- contact validation and local submission storage
- app registry data
- governance manifest
- observability manifest
- architecture docs
- governance docs
- GitHub Actions quality workflow
- `npm run quality`

## Repository Commit State

The iCloud Drive UX Apps folder has local Git commits:

- `fe0b9ca chore: wire ux apps validation gate`
- `08518a8 feat(app): add low-power UX Apps runtime`
- `c787646 feat(app): add UX Apps static foundation`

These are local commits in:

`/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Uı/UX Apps`

## GitHub.com Status

Local transfer is complete. Remote publishing is blocked until GitHub authentication and a remote repository are configured.

Observed blocker:

- no `origin` remote
- `gh auth status -h github.com` not logged in
- no `GH_TOKEN` / `GITHUB_TOKEN`

## Future Roadmap

Next useful additions:

- add app detail routes or panels for each UX tool
- add a local storage-backed notes workspace
- add accessibility audit checklist module
- add journey map builder prototype
- add decision dashboard prototype
- add motion token preview panel
- add API-backed governance report page
- add optional Next.js migration branch only after a dependency budget note

## Operating Rule

Keep the current native Node/static system as the rollback-safe baseline. Add heavier frameworks only on a scoped branch and only when the quality gate and rollback path are clear.
