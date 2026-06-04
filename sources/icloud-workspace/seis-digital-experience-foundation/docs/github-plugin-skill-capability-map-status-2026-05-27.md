# GitHub Plugin Skill Capability Map Status - 2026-05-27

Repository: `emirhankudun-ux/UIX-Apps`
Branch: `UIXAppTTR`
Local iCloud repository: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/seis-digital-experience-foundation`
Local iCloud commit: `fe0edfd feat: map plugin skill capabilities`

## What Changed

The UIXAppTTR plugin and skill layer now has a capability-family map in addition to the registry.
This lets the repo use many plugins and skills without turning them into uncontrolled branches or noisy integrations.

Server-side additive files created:

- `content/development/plugin-skill-capability-map.json`
- `scripts/check-plugin-skill-capability-map.mjs`
- `docs/development/plugin-skill-capability-map.md`

The map currently covers 10 capability families, all 8 plugin registry surfaces, and 55 plugin or skill examples.

## Capability Families

- repository governance and GitHub operations
- frontend design and browser validation
- creative design and asset workflow
- motion, 3D, cinematic web, and video
- cloud hosting, server upload, and deployment
- security, compliance, dependency, and supply chain
- AI workflow, knowledge, and documentation
- polyglot and cross-platform app lanes
- data, analytics, monitoring, and observability
- backend, database, API, and integration foundations

## Local Verification

Local iCloud quality checks passed before publication marker creation:

```bash
node --check scripts/check-plugin-skill-capability-map.mjs
npm run check:plugin-skill-capability-map
npm run quality
git diff --check
```

## Safety Note

Cloud deployment remains blocked until the server target is explicit.
Direct local `git push` still depends on local GitHub auth, so this server update was written through the GitHub connector as additive files.
