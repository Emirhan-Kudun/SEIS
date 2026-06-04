# GitHub Branch Governance

The active development branch is `codex/seis-ux-cinematic-premium-foundation`.

## Repository Target

- GitHub repository: `emirhankudun/emirhan-kudun-portfolio`
- Preferred origin URL: `git@github.com:emirhankudun/emirhan-kudun-portfolio.git`
- Main branch stays protected by convention; publish and review work happens from the Codex branch.

## Branch Policy

- Use the single active branch for the current foundation work.
- Keep changes in small reversible commits.
- Future phase branches may use:
  - `codex/3d-*` for motion and WebGL work.
  - `codex/content-*` for Behance, drawings, copy and localization.
  - `codex/deploy-*` for GitHub, Vercel or server publishing.
- Do not merge to `main` until the branch has passed local checks and GitHub Actions.

## Push Preflight

Run this before pushing:

```bash
npm run github:preflight
```

If `origin` is missing:

```bash
git remote add origin git@github.com:emirhankudun/emirhan-kudun-portfolio.git
```

If GitHub CLI auth is missing:

```bash
gh auth login -h github.com
gh auth status -h github.com
```

Only after preflight passes:

```bash
npm run github:publish
```

`github:publish` runs the preflight first, disables interactive terminal prompts, and performs one push attempt. If GitHub auth is missing, it stops before pushing.

## Review Gates

- `npm run check:content`
- `npm run lint`
- `npm run typecheck`
- `npm run check:runtime`
- `npm run check:source-boundaries`
- `npm run build --workspace apps/site-next`
- `npm run build --workspace apps/site-vite`

GitHub Actions runs the same validation on `main`, `codex/**`, and pull requests.
