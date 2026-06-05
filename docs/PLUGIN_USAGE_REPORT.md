# Plugin Usage Report

Generated: 2026-06-05 17:28:27 +03

This report is strict on purpose: a plugin is marked as used only when a real
tool call was made. Screenshot visibility or installed status is not counted as
usage by itself.

## Used In This System Pass

- GitHub: used successfully for PR/repository work, comments, and branch files.
- Vercel: team/project lookup worked; no project exists yet for deployment.
- Canva: template search was attempted; blocked by paid-plan requirement.
- Figma: account check was attempted for a FigJam architecture diagram; blocked by reauthentication.
- Supabase: project list was checked; organization access needs reauthentication.
- Airtable: bases were checked; workspace listing needs extra scopes.
- Cloudinary: usage, folders, and media resources were read successfully.
- Linear: project/issue/documentation calls were attempted; blocked by reauthentication.
- Notion: team and authenticated user context were checked successfully.
- Vantage: dashboard/budget calls were attempted; blocked by invalid token.
- Common Room: catalog access was attempted; blocked by reauthentication.
- tool_search: used to expose callable tools for the connector pass.

## Not Run On Purpose

- Codex Security: full scan needs explicit security-scan authorization.
- Jam: needs a Jam recording link or id.
- HeyGen: avatar consent workflow needs a real avatar/video context.
- Happenstance: exposed action starts a paid checkout session.
- KeyBid Puls: needs a real estate/property URL or screenshot.
- Asana: needs a selected workspace/project/task-list context.
- Cloudflare: no callable action was exposed in this pass.
- PostHog: no callable action was exposed in this pass.
- Sentry: no callable action was exposed in this pass.
- Neon Postgres: no callable action was exposed in this pass.
- Expo: mobile shell was planned, not initialized in this pass.
- Remotion: no video script/render target was selected.

## Immediate Auth Queue

1. Figma reauthentication
2. Linear reauthentication
3. Common Room reauthentication
4. Vantage token refresh
5. Canva paid-plan access or alternate free workflow
6. Supabase organization auth refresh
7. Airtable workspace scopes

## System Rule

The web system will track four different states:

- Bundle detected
- Tool callable
- Auth connected
- Production wired

Only the last two states should be trusted for production decisions.
