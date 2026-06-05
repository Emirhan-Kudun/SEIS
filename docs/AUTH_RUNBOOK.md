# Auth Runbook

This file tracks authentication work needed before the wider web system can use connected services safely.

## Current Known State

- Google Drive: usable enough to inspect the portfolio source folder from this session.
- GitHub: connector can see the private repository and can write branch content.
- Local git over HTTPS: not authenticated in the current shell.
- Vercel: team is visible through the connector, but no local Vercel CLI is available in the current shell.
- CodeRabbit: CLI is installed at `/Users/emirhankudun/.local/bin/coderabbit`, but auth is not complete.
- Node/npm/npx: not available in the current shell, so Expo/Vite bootstrapping is blocked until a Node runtime is available.

## Browser Choice

Use official connector OAuth first. If a service needs browser auth and the user is already signed in with Safari, use Safari as the fallback browser:

```bash
open -a Safari "<fresh-auth-url>"
```

Do not reuse old auth URLs. Restart the auth command and open the fresh URL.

## Priority Order

1. GitHub write path
   - Needed for pushing branches and opening PRs.
   - Current best path: GitHub connector writes.
   - Local options later: `gh auth login` or git credential helper.

2. Vercel or Netlify deploy path
   - Needed for preview and production links.
   - Options: connector deployment, CLI auth, or GitHub-linked project.

3. CodeRabbit
   - Needed for automated review.
   - Restart auth with:

```bash
/Users/emirhankudun/.local/bin/coderabbit auth login --agent
```

4. Database host
   - Pick Supabase or Neon as first Postgres host.
   - Neon MCP uses OAuth.
   - Supabase should use official project credentials and RLS.

5. Design/media sources
   - Figma, Canva, Cloudinary, Shutterstock, Fal, and HeyGen should be activated when there is a concrete asset workflow.

## Secret Rules

- No secrets in `.env` committed to git.
- No OAuth token text in docs.
- No copied browser cookies.
- No service account JSON in the repo.
- Use platform secret storage for deployment.
- Use local untracked env files only when needed.

## Auth Evidence

Record only safe metadata:

- provider
- auth status
- workspace/account name if non-sensitive
- connected date
- scopes requested
- next action

Never record access tokens, refresh tokens, private keys, or session cookies.
