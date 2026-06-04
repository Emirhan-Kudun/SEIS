# Plugin Skill Capability Map

This map turns the available plugin and skill ecosystem into controlled UIXAppTTR capability families.
The goal is not to activate every integration at once.
The goal is to make every integration class accountable to one repo, one branch, one owner agent, and one output standard.

## Capability Families

| Capability | Registry Surface | Owner | Mode |
| --- | --- | --- | --- |
| Repository governance and GitHub operations | `github-governance-connector` | `release-agent` | guarded-active |
| Frontend design and browser quality | `frontend-design-skills` | `interface-agent` | active |
| Creative design and asset workflow | `frontend-design-skills` | `interface-agent` | task-fit |
| Motion, 3D, cinematic web, and video systems | `motion-3d-skills` | `motion-agent` | guarded |
| Cloud hosting, server upload, and deployment | `cloud-deployment-connectors` | `release-agent` | blocked-until-target |
| Security, compliance, dependency, and supply-chain checks | `security-compliance-skills` | `governance-agent` | guarded |
| AI workflow, knowledge, and documentation systems | `ai-workflow-skills` | `premium-local-foundation-agent` | active |
| Polyglot and cross-platform app lanes | `polyglot-language-skills` | `polyglot-agent` | active |
| Data, analytics, monitoring, and observability | `core-coding-skills` | `governance-agent` | task-fit |
| Backend, database, API, and integration foundations | `core-coding-skills` | `governance-agent` | guarded |

## Activation Standard

Before a plugin, connector, or skill is used for this repo, it should resolve to one of the capability families above.
That family then determines:

- the owner sub-agent
- the allowed repo surface
- the risk level
- the activation mode
- the expected output
- the guardrails

This keeps the ecosystem rich without becoming noisy.

## Guarded Defaults

High-risk areas stay guarded:

- cloud deployment
- live server upload
- database provisioning
- security scans with broad network access
- dependency changes
- generated media or heavy 3D workflows

Cloud deployment remains blocked until the server target is explicit.
GitHub publication can use connector markers while local `gh auth` is unavailable.

## Quality Gate

```bash
npm run check:plugin-skill-capability-map
```

The full quality gate includes the registry and capability map checks.
