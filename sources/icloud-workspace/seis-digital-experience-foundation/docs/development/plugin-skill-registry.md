# Plugin And Skill Registry

The plugin and skill surface for UIXApps is governed as a single-branch system.
All plugin, connector, skill, and AI workflow work lands through `UIXAppTTR` and is routed to an existing sub-agent.

## Operating Model

| Rule | Contract |
| --- | --- |
| Repository | `UIXApps` |
| Branch | `UIXAppTTR` |
| Mode | `single-branch-sub-agent-surface` |
| Execution | low-power static-first |
| Branching | no new long-lived branches |
| Dependency policy | no dependency without product route, rollback path, and quality gates |

## Surface Groups

| Surface | Owner | Status | Purpose |
| --- | --- | --- | --- |
| `core-coding-skills` | `governance-agent` | active | Keeps repo edits scoped, reversible, and branch-safe. |
| `frontend-design-skills` | `interface-agent` | active | Guides premium UI rhythm, responsive polish, and accessibility. |
| `motion-3d-skills` | `motion-agent` | guarded | Governs cinematic motion, reduced motion, depth, and future 3D readiness. |
| `github-governance-connector` | `release-agent` | active | Records server-side status markers while local GitHub auth is incomplete. |
| `cloud-deployment-connectors` | `release-agent` | blocked until target | Prepares server and cloud handoff after target details are explicit. |
| `polyglot-language-skills` | `polyglot-agent` | active | Keeps many-language lanes lightweight and contract-first. |
| `ai-workflow-skills` | `premium-local-foundation-agent` | active | Converts large AI-native prompts into scoped implementation and governance work. |
| `security-compliance-skills` | `governance-agent` | guarded | Protects secret safety, dependency restraint, and publish readiness. |

## Activation Rules

Use the registry before activating any plugin, connector, or skill surface.
If a tool does not map to an existing surface, add a small registry entry first, assign an owner sub-agent, and keep the change inside `UIXAppTTR`.

GitHub server writes may use connector status markers while local `gh auth` is unavailable.
Direct `git push` should wait until local authentication is confirmed.

Cloud, server, and live deployment connectors remain blocked until these details are known:

- production server target
- document root
- deployment method
- rollback path
- access method

## Quality Gate

Run this check before committing plugin or skill governance changes:

```bash
npm run check:plugin-skill-registry
```

The full workspace gate also includes this registry check:

```bash
npm run quality
```

## Capability Map

The registry is paired with a capability-family map:

- Map: `content/development/plugin-skill-capability-map.json`
- Guide: `docs/development/plugin-skill-capability-map.md`
- Gate: `npm run check:plugin-skill-capability-map`

The map groups plugins and skills into operational families such as GitHub governance, frontend design, creative assets, motion and 3D, cloud deployment, security, AI workflow, polyglot platforms, analytics, and backend foundations.
Each family must resolve to a registry surface and an existing UIXAppTTR sub-agent.
