# Large File Routing

Date: 2026-06-04

This document routes large iCloud workspace files to Git, Git LFS, GitHub
Release assets, or external storage.

## Current GitHub Constraints

GitHub's current repository guidance says regular Git files over 50 MiB produce
a warning, and regular Git rejects files at 100 MiB. GitHub also recommends
keeping push size under the enforced 2 GB limit.

Git LFS is the right path for many large binary files, but its per-file limit
depends on the GitHub plan. GitHub Free and Pro support up to 2 GB per LFS file,
Team supports up to 4 GB, and Enterprise Cloud supports up to 5 GB.

## Large Files Found

| Path | Size | Category | Route |
| --- | ---: | --- | --- |
| `Tüm zip dosyaları.zip` | 5.6 GB | archive | External storage or split archive; do not commit to Git or LFS as-is |
| `Website/Website portfolyo/Tüm zip dosyaları/Tüm Export portfolio.zip` | 1.8 GB | archive | GitHub Release asset or LFS after review |
| `Website/Website portfolyo/Tüm zip dosyaları/Emirhan-Kudun-website 2.zip` | 536 MB | archive | GitHub Release asset or LFS after review |
| `Website/Website portfolyo/Tüm zip dosyaları/Emirhan-Kudun-website 2 2.zip` | 536 MB | archive | GitHub Release asset or LFS after review |
| `Website/Website portfolyo/Tüm zip dosyaları/Tüm Export portfolio/Emirhan-Kudun-website 2.zip` | 536 MB | archive | GitHub Release asset or LFS after review |
| `Website/Website portfolyo/Tüm zip dosyaları/Emirhan-Kudun-website.zip` | 536 MB | archive | GitHub Release asset or LFS after review |
| `Website/Website portfolyo/Tüm zip dosyaları/Tüm Export portfolio/Emirhan-Kudun-website.zip` | 536 MB | archive | GitHub Release asset or LFS after review |
| `Codex/2026-05-06/files-mentioned-by-the-user-mcp/.venvs/coding-tools/lib/python3.12/site-packages/semgrep/bin/semgrep-core` | 155 MB | tool binary | Exclude; reproducible dependency/tool artifact |
| `Codex/oracleJdk-26.jdk/Contents/Home/lib/modules` | 139 MB | runtime binary | Exclude; installable runtime artifact |
| `VSCODE/Microsoft.NET.UpgradeAssistant.vsix` | 102 MB | extension binary | Release asset only if intentionally preserved |
| `Swift/swift-build-tool-plugin/.build/index-build/x86_64-apple-macosx/debug/index/db/v13/p6381--5da4dd/data.mdb` | 64 MB | build index | Exclude; build artifact |
| `VSCODE/VisualStudio.GitHub.Copilot.vsix` | 55 MB | extension binary | Release asset only if intentionally preserved |
| `gemini-cli/memory-tests/large-chat-session.json` | 54 MB | test data | Exclude from normal Git; LFS only if needed |
| `_SEIS_WORKSPACE/github-unified-source/_generated/github-code-bundle.txt` | 52 MB | generated text bundle | Already committed; future versions should be split or moved to LFS |

## Routing Decision

For this migration pass:

- Safe code and markdown/text files are imported to normal Git.
- Large archive/media/tool/runtime/build artifacts are not committed.
- No release asset upload is attempted yet because the largest zip exceeds
  common Git LFS plan limits and should be split or moved to external storage.
- Old repositories are archived only after the unified hub commit is pushed.

## Follow-Up Options

1. Split `Tüm zip dosyaları.zip` into smaller reviewed archives.
2. Create a private release named `icloud-large-assets-2026-06-04`.
3. Upload reviewed archives under 2 GB as release assets.
4. Track selected design/media assets with Git LFS only after checking account
   storage/bandwidth limits.
5. Keep rebuildable tool/runtime/build artifacts out of the repo entirely.
