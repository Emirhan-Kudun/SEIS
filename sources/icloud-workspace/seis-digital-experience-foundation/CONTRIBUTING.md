# Contributing To UIX-Apps

UIX-Apps uses a calm, low-power contribution model. Keep changes small,
reviewable, and reversible.

## Working Branch

- Primary branch: `UIXAppTTR`.
- Keep `main` protected and clean.
- Run `npm run publish:preflight` before any push attempt.
- If preflight reports missing GitHub auth, stop until auth or an explicit
  credential-helper path is verified.

## Local Checks

Prefer focused checks before broad quality gates:

```bash
npm run check:repository-intake
npm run check:development-program
npm run check:software-languages
npm run check:polyglot-foundation
npm run check:server-handoff
npm run check:source-intake
```

Use the full gate only when the changed surface warrants it:

```bash
npm run quality
```

## Repository Intake

External repositories in the iCloud Drive `Github` folder are review inputs,
not code to copy wholesale.

Promote only:

- reviewed documentation patterns
- small source-intake records
- scoped UX Apps module changes
- governance notes
- dependency-light scripts or config

Never promote:

- `.git`
- `node_modules`
- build output
- archives
- secrets
- local machine metadata

## Commit Style

Use concise Conventional Commit messages:

```text
feat: add repository intake promotion queue
fix: respect reduced motion for scroll top
chore: tighten low power ci
docs: document branch sync guard
```

## Review Mindset

- Preserve accessibility and reduced-motion support.
- Avoid dependency bloat.
- Avoid visual or orchestration noise.
- Keep docs and checks aligned with any new governance surface.
- Keep each commit scoped to one reason.
