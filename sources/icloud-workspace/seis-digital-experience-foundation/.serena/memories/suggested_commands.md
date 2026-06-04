# Suggested Commands

Low-power commands:
- `npm run check:workspace`
- `npm run check:foundation` when broader validation is needed, but it chains many checks.
- `npm run build:static` to regenerate static package when source changes require dist update.
- `node --check <file>` for focused JS/MJS syntax checks.
- `python3 server/python/verify_release.py` only as part of release validation.

Release commands, heavier:
- `npm run check:release`
- `npm run release:ready`
- `npm run deploy:server`

Darwin/project note:
- Path contains spaces and resolves to iCloud; quote paths in shell commands when needed.
- Avoid broad `.playwright-mcp` reads; it contains screenshots/logs and is not needed for normal coding.