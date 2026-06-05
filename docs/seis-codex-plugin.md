# SEIS Codex Plugin

Date: 2026-06-05

The local `seis` Codex plugin connects Codex work back to the canonical SEIS repository and gives future SEIS development a stable plugin workflow.

## Local Plugin

| Field | Value |
|---|---|
| Plugin name | `seis` |
| Local plugin root | `/Users/emirhankudun/plugins/seis` |
| SEIS source mirror | `plugins/seis` |
| Personal marketplace | `/Users/emirhankudun/.agents/plugins/marketplace.json` |
| Installed plugin | `seis@personal` |
| Installed cache root | `/Users/emirhankudun/.codex/plugins/cache/personal/seis/0.1.0+codex.20260605124712` |

## Current Components

- `.codex-plugin/plugin.json` defines the plugin manifest.
- `skills/seis-hub/SKILL.md` defines the SEIS-centered Codex workflow.
- `scripts/seis-status.sh` reports local SEIS/plugin/GitHub auth status.
- `scripts/seis-zip-audit.sh` audits large workspace zip files before import.
- `README.md` documents local validation and status commands.

## Validate

```bash
python3 /Users/emirhankudun/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py /Users/emirhankudun/plugins/seis
python3 /Users/emirhankudun/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/emirhankudun/plugins/seis/skills/seis-hub
bash -n /Users/emirhankudun/plugins/seis/scripts/seis-status.sh
bash -n /Users/emirhankudun/plugins/seis/scripts/seis-zip-audit.sh
```

If the system Python does not have `PyYAML`, use a temporary validation venv.

## Install Or Refresh

Initial install:

```bash
/Applications/Codex.app/Contents/Resources/codex plugin add seis@personal
```

For later edits, update the plugin cachebuster before reinstalling:

```bash
python3 /Users/emirhankudun/.codex/skills/.system/plugin-creator/scripts/update_plugin_cachebuster.py /Users/emirhankudun/plugins/seis
/Applications/Codex.app/Contents/Resources/codex plugin add seis@personal
```

Start a new Codex thread after reinstalling so new skills and tools are picked up.

## Source Sync

Develop locally in `/Users/emirhankudun/plugins/seis`, then mirror stable plugin source into SEIS under `plugins/seis` so the canonical repository keeps the plugin history.

## Zip Audit

```bash
COMPUTE_HASH=1 /Users/emirhankudun/plugins/seis/scripts/seis-zip-audit.sh
```

For `Github.zip`, SEIS stores the audit at:

- [`data/github-zip-import-inventory.json`](../data/github-zip-import-inventory.json)
- [`docs/github-zip-import-decision.md`](./github-zip-import-decision.md)

## Next Development Targets

- add SEIS migration verification helpers
- add GitHub auth readiness checks
- add a repo snapshot integrity report
- add optional MCP tooling once the command shape is stable

## Safety Rule

The plugin must preserve the SEIS deletion gate: old repositories are not deleted until branch refs and repository snapshots are verified inside SEIS.
