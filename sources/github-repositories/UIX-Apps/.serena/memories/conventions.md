# Conventions

- Prefer generator scripts over hand-editing generated JSON/MD reports.
- Add new source-chain layers as: generator script, `content/development/*.json`, `reports/*.json`, `reports/*.md`, package check/automation scripts, environment/source sync wiring, compliance evidence wiring, cloud-environment assertions.
- Keep plugin requests auditable: count all submitted plugins, expose ready/auth-blocked states, and keep live plugin/AI invocation, credential recording, payload recording, and autonomous repo modification at zero unless explicitly scoped.
- Stage only intended files; never restore or stage unrelated user deletions.