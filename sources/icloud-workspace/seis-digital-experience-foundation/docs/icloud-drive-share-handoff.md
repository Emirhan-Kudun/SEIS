# iCloud Drive Share Handoff

Date: 2026-05-26 16:56 +03

## Location

- iCloud path: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/UIX-Apps`
- Branch: `UIXAppTTR`
- Local app: `http://127.0.0.1:3000`

## Current Development State

- Local HEAD: `80e672f`
- Local subject: `chore: guard active development mode`
- Origin HEAD: `10453e2`
- Origin subject: `feat: add audit report language lanes`
- Local branch is ahead of `origin/UIXAppTTR` by 3 commits.

## Share Notes

- The working repository already lives inside iCloud Drive.
- The active development branch is `UIXAppTTR`.
- Main should remain protected.
- The local development server can be started with:

```bash
npm run ux:dev
```

- The focused quality gate can be run with:

```bash
npm run ux:quality
```

- GitHub publication still requires authentication before push:

```bash
gh auth login -h github.com
npm run publish:preflight
git push origin UIXAppTTR
```

## Share Boundary

This handoff records the iCloud Drive state only. It does not imply that the GitHub server has received the latest local commits until `git push origin UIXAppTTR` succeeds.
