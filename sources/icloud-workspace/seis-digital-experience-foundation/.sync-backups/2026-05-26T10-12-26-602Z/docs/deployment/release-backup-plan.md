# Release Backup Plan

## Goal

Keep every deployable SEIS package recoverable even before a live server target is confirmed.

## Commands

```bash
npm run check:release
npm run backup:release
npm run plan:upload
npm run handoff:server
npm run check:history
```

The backup command writes:

```text
releases/<timestamp>/seis-static.zip
releases/<timestamp>/server-upload-manifest.json
releases/latest.json
deploy/upload-plan.json
handoff/server/
```

## Server Rule

Only upload a package whose SHA-256 matches `server-upload-manifest.json`.

## Restore Rule

If the active `dist/` package is deleted or overwritten, run:

```bash
npm run restore:latest
```

Then verify the restored checksum before any upload:

```bash
npm run check:release
```
