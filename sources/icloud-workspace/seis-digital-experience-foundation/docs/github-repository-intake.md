# GitHub Repository Intake

This registry keeps the iCloud Drive `Github` folder visible inside the
canonical `UIX-Apps` workstream without copying external repositories into the
runtime surface.

## Canonical Rule

`UIX-Apps` remains the only active target repository for promoted UX Apps and
SEIS work.

Other repositories can inform the work, but they must enter through reviewed
source-intake, documentation, config, scripts, or module-level changes. They
must not be copied wholesale into the repository.

Do not copy another repository wholesale into `UIX-Apps`; promote only reviewed,
small, reversible improvements.

## Analysis Summary

- Public GitHub repos observed: 6.
- Local iCloud repos observed: 9.
- New public repos found in this pass: none.
- New local repos found in this pass: none.
- Canonical target: `UIX-Apps` on `UIXAppTTR`.

## Current Public GitHub Repos

The public `emirhankudun-ux` repos observed in low-power mode are:

- `UIX-Apps`
- `docs`
- `claude-code`
- `gemini-cli`
- `DeepSeek-Coder`
- `awesome-deepseek-agent`

## Current Local iCloud Repos

The iCloud Drive `Github` folder also contains local review sources:

- `UIX-Apps`
- `docs`
- `claude-code`
- `gemini-cli`
- `DeepSeek-Coder`
- `awesome-deepseek-agent`
- `UX`
- `Codex`
- `seis-digital-experience-foundation`

These are review-only or archive/foundation references until a clean promotion
scope is chosen.

## Promotion Queue

- `docs`: review documentation IA and API reference structure for `docs/`.
- `UX`: review cinematic portfolio layout and metadata ideas for `apps/ux-apps-foundation/`.
- `claude-code`: review agent workflow notes for `docs/agents/`.
- `gemini-cli`: review CLI orchestration and workflow ideas for `docs/agents/`.
- `DeepSeek-Coder`: watch for human-reviewed AI coding reference patterns.
- `awesome-deepseek-agent`: watch for attributed agent taxonomy notes.
- `seis-digital-experience-foundation`: review branch model and polyglot governance ideas.

## Validation

```bash
npm run check:repository-intake
```

This check validates `config/github-repository-intake.json`, confirms the
canonical `UIX-Apps` target, verifies the observed public repo list, and blocks
unsafe promotion patterns such as `.git`, `node_modules`, archives, and local
machine metadata.
