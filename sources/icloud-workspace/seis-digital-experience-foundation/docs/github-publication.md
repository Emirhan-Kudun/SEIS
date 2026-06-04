# GitHub Publication Contract

This repo writes locally into the canonical iCloud Drive checkout first:

```text
/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/seis-digital-experience-foundation
```

The older local checkout suffix `Github/UIX-Apps` remains an accepted iCloud
alias for automation history, but this active workspace uses
`Github/seis-digital-experience-foundation`.

The remote publication target is:

```text
https://github.com/emirhankudun-ux/UIX-Apps.git
branch: UIXAppTTR
```

Runtime visibility endpoint:

```text
GET /api/github-publication
```

Quality gate:

```bash
npm run check:github-publication
```

After a push or shipment loop, verify that iCloud local HEAD and GitHub server HEAD match:

```bash
npm run check:github-server-sync
```

## Rule

Local commits are allowed when checks pass. Remote push is allowed only after `npm run publish:preflight` is clean and GitHub CLI authentication is available. If the local branch is already mirrored to `origin/UIXAppTTR`, the shipment loop exits without requiring GitHub auth because no push is needed.

The only allowed publish command is:

```bash
GIT_TERMINAL_PROMPT=0 git push origin UIXAppTTR
```

Do not broaden this into all-branch, tag, force, interactive, or default-remote push commands.
