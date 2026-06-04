# Long-Term Development Program

This program turns UX Apps into a fuller UI/UX, full-stack, cinematic, and 3D-capable product system without abandoning the low-power foundation.

## Operating Model

- Work in small, reversible commits.
- Keep `npm run quality` green.
- Use the zip archive as reference material, not as a raw import target.
- Promote one coherent improvement per automation run when possible.
- Preserve the native Node/static app as the rollback-safe baseline.

## Source Reservoir

Primary external source:

- `/Users/emirhan/Downloads/Github a gönderilecekler.zip`

Canonical prepared SEIS source:

- `/Users/emirhan/Documents/Github a gönderilecekler/New project`
- commit `4e8fb380 chore(repo): prepare ux apps github handoff`

The archive contains useful UI, UX, Next.js, governance, and design-system material, but it also contains generated/private artifacts. Inspect it with bounded commands such as `zipinfo` and `unzip -p`; do not extract the entire archive into this repo.

## Development Lanes

1. UI/UX product maturity
   - Improve hierarchy, navigation, empty states, content clarity, and task flow.
   - Keep semantic HTML and accessible controls first.

2. Full-stack app depth
   - Expand API-backed app modules, local data contracts, validation, and observability.
   - Add durable examples for UX audits, journey maps, accessibility reviews, and product decisions.

3. Cinematic motion system
   - Add restrained transitions, atmosphere, pacing, and state changes.
   - Every motion feature needs reduced-motion behavior.

4. 3D and spatial interface layer
   - Add depth only when it improves comprehension or product feel.
   - Prefer lightweight Canvas/CSS/WebGL-native experiments before any dependency.
   - Add a dependency budget note before proposing Three.js or another 3D library.

5. Governance and handoff
   - Keep integration notes in `docs/github-handoff.md`.
   - Keep roadmap changes in `docs/ux-apps-roadmap.md`.
   - Keep source boundaries explicit in governance data.

## Intake Checklist

Before promoting anything from the zip:

- Identify the source path and why it matters.
- Confirm it is source, not generated output.
- Remove archive metadata and private/local artifacts.
- Adapt naming, styling, and data contracts to this repo.
- Preserve dependency discipline.
- Run `npm run quality`.
- Commit only intentional files.

## Current Promotions

- `data/cinematic-program.json` promotes the cinematic 3D budget, motion depth, and product lane ideas without adding a 3D dependency.
- `data/archive-insights.json` promotes archive analysis into a source-to-feature map, noise policy, next feature candidates, and composition scorecard inputs.
- `/api/archive-insights` exposes the promoted archive signals to the full-stack surface so future UX work can be planned from evidence instead of raw folder copying.
- `data/zip-promotion-lab.json` promotes design lab, quality lab, accessibility lab, branch maturity, and publish-readiness ideas into a reviewed import queue.
- `/api/zip-promotion-lab` keeps ready, deferred, and blocked candidates visible before any heavier framework import is considered.

## Success Criteria

- The app feels calm, premium, cinematic, and useful.
- UI and UX improvements are visible without cognitive overload.
- 3D and animation support accessibility rather than spectacle.
- API and data layers remain understandable.
- Rollback remains straightforward.
- The repo can keep improving for months without becoming noisy or fragile.
