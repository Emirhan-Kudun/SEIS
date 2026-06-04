# GitHub Plugin Skill Registry Status - 2026-05-27

Repository: `emirhankudun-ux/UIX-Apps`
Branch: `UIXAppTTR`
Local iCloud repository: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/seis-digital-experience-foundation`
Local iCloud commit: `65b2cc4 feat: add plugin skill registry`

## What Changed

The UIXAppTTR plugin and skill governance surface is now represented as an additive server-side registry:

- `content/development/plugin-skill-registry.json`
- `scripts/check-plugin-skill-registry.mjs`
- `docs/development/plugin-skill-registry.md`

The registry keeps all plugin, connector, skill, AI workflow, polyglot, motion, GitHub, and deployment surfaces inside one branch: `UIXAppTTR`.
Each surface maps to an existing sub-agent owner.

## Local Verification

Local iCloud quality checks passed before publication marker creation:

```bash
node --check scripts/check-plugin-skill-registry.mjs
npm run check:plugin-skill-registry
npm run quality
git diff --check
```

## Server-Side Safety Note

The GitHub branch already has a larger server-oriented `package.json` than the local iCloud workspace.
To avoid overwriting active server structure, this sync used additive GitHub connector commits instead of replacing existing remote files.

Direct local `git push` remains blocked until local GitHub CLI/auth is fixed.
Use this marker as the server-side continuity record for the plugin/skill registry work.
