# Operations

Use this page when maintaining the private personal plugin repo.

## Health Report

```bash
npm run doctor
npm run bridge:snapshot
```

The doctor command reads the existing plugin manifests, connection asset,
capability map, README, skill, and Git metadata. It does not call external
services, install dependencies, or write files.

The bridge snapshot command writes `assets/bridge-health-snapshot.json`. It is
deterministic and intentionally omits timestamps and local Git status so normal
checks do not create noisy diffs.

Use JSON output when another script needs to consume the report:

```bash
npm --silent run doctor:json
```

## What Doctor Checks

- manifest parity between `.codex-plugin/plugin.json` and root `plugin.json`
- private personal mode
- `UIXAppTTR` product repo binding
- GitHub Actions validation workflow
- safe install/update/remove documentation
- readiness of the eight capability lanes

## Operating Rhythm

1. Edit the plugin source.
2. Run `npm run validate`.
3. Run `npm run doctor`.
4. Run `npm run bridge:snapshot`.
5. Reinstall with `codex plugin add seis-trusted-marketplace@personal`.
6. Update the `UIXAppTTR` repo contract only when the bridge shape changes.
