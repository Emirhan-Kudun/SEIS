---
name: seis-hub
description: Use SEIS as the canonical GitHub and Codex development hub for repository consolidation, plugin iteration, migration safety, and SEIS-centered project work.
---

# SEIS Hub

Use this skill whenever the user wants to work on SEIS, consolidate repositories under SEIS, create or update a SEIS-connected Codex plugin, or make decisions about deleting old source repositories.

## Canonical Context

- Canonical GitHub repository: `emirhankudun-ux/SEIS`
- Canonical default branch: `UIXAppTTR`
- Local workspace root: `/Users/emirhankudun/Library/Mobile Documents/com~apple~CloudDocs/Github`
- Local plugin root: `/Users/emirhankudun/plugins/seis`
- Personal marketplace: `/Users/emirhankudun/.agents/plugins/marketplace.json`

SEIS is the general center for repository discovery, branch consolidation, source repository migration records, governance, plugin coordination, and deletion decisions.

## Operating Rules

1. Inspect SEIS context before changing behavior.
2. Prefer existing SEIS docs, scripts, and manifests over inventing parallel records.
3. Keep repository deletion separate from migration.
4. Do not delete source repositories until `sources/<repo>/<branch>` refs and `repositories/<repo>` snapshots are verified in SEIS.
5. For plugin changes, validate the plugin before reporting completion.
6. For marketplace-backed plugin updates, use the cachebuster/reinstall flow instead of hand-editing marketplace entries.

## Development Workflow

1. Classify the request:
   - repository consolidation
   - plugin development
   - SEIS docs/governance
   - migration verification
   - GitHub publishing
2. Gather local and GitHub state:
   - run `scripts/seis-status.sh` from this plugin when local status is useful
   - run `scripts/seis-zip-audit.sh` before importing a large workspace zip
   - run `scripts/seis-repo-visibility-audit.sh` when old repositories seem missing
   - run `scripts/seis-main-branch-sync.sh` before making `main` mirror the canonical branch
   - run `scripts/seis-installed-plugin-audit.sh` when plugin availability matters
   - inspect SEIS files such as `README.md`, `PROJECTS.md`, `BRANCHES.md`, and `docs/repository-depot-migration-status.md`
3. Make the smallest useful change.
4. Validate:
   - plugin manifest with `plugin-creator/scripts/validate_plugin.py`
   - shell scripts with `bash -n`
   - SEIS repo scripts with dry-run defaults first
5. Summarize what changed, what was verified, and what still needs authentication or user confirmation.

## Important Commands

```bash
/Users/emirhankudun/plugins/seis/scripts/seis-status.sh
/Users/emirhankudun/plugins/seis/scripts/seis-zip-audit.sh
/Users/emirhankudun/plugins/seis/scripts/seis-repo-visibility-audit.sh
/Users/emirhankudun/plugins/seis/scripts/seis-main-branch-sync.sh
/Users/emirhankudun/plugins/seis/scripts/seis-installed-plugin-audit.sh
python3 /Users/emirhankudun/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py /Users/emirhankudun/plugins/seis
python3 /Users/emirhankudun/.codex/skills/.system/plugin-creator/scripts/update_plugin_cachebuster.py /Users/emirhankudun/plugins/seis
python3 /Users/emirhankudun/.codex/skills/.system/plugin-creator/scripts/read_marketplace_name.py
```

## Zip Import Rule

Do not commit large workspace zip files directly into SEIS. Audit them first, then import only curated source snapshots or use Git LFS/object storage for binary archives. A zip that contains `.git`, `__MACOSX`, virtual environments, SDKs, or build caches should be treated as a source archive, not normal repo source.

## Main Branch Rule

When source repositories are missing or branch visibility is confusing, make `main` mirror the canonical SEIS branch so GitHub visitors land on the same content. Keep `sources/<repo>/<branch>` refs visible as recovery/index refs; do not delete them as part of the main-branch sync.

## Installed Plugin Rule

Use installed and enabled plugins first. Record plugin availability in SEIS instead of assuming every mentioned plugin URI is installed. Keep platform lanes mapped to real installed plugins under `data/installed-codex-plugins-2026-06-05.json` and `docs/platform/installed-plugin-operating-model.md`.

## Deletion Gate

Old repositories can be deleted only after authenticated import succeeds and SEIS contains verified branch refs plus file snapshots. The intended final command is:

```bash
DRY_RUN=0 DELETE_SOURCE_REPOS=1 scripts/migrate-repositories-to-seis-depot.sh
```

Never treat a marker file such as `MOVED_TO_SEIS.md` as sufficient proof for deletion.
