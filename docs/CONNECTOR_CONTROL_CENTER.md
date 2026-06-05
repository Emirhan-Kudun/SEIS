# Connector Control Center

This file defines how the Emirhan Web System should treat plugins and connectors. The right-side UI may show only a small number of downloaded or active plugins, but that is not the system boundary. The real boundary is:

1. Is the bundle available?
2. Is a tool callable in this session?
3. Is auth connected?
4. Is the provider wired into a production workflow?

## Current Truth

- GitHub is the strongest active connection: the system branch and PR were created, and the quality workflow succeeded.
- Google Drive is usable for source inspection.
- Browser is usable for local QA.
- Vercel is visible but needs a project or CLI/Git integration before deploy.
- CodeRabbit is installed but not authenticated.
- Codex Security is available, but a full repo scan needs explicit subagent authorization.
- Supabase or Neon should become the first real data host after provider choice.
- Expo should wait until package tooling is available.

## Why This Matters

If every plugin is treated as simply installed or not installed, the system will lie to us. A provider can be cached but not authenticated, authenticated but not wired into production, or callable but read-only. The control center records those differences.

## Operating Levels

- `bundle_detected`: local plugin/app/runtime bundle exists.
- `tool_callable`: callable MCP/tool surface is available in this session.
- `auth_connected`: OAuth/session/token is usable.
- `production_wired`: the provider is part of a real repo, deploy, data, monitoring, review, or workflow path.

## Immediate Setup Queue

1. CodeRabbit auth for PR review.
2. Vercel Git integration or CLI auth for deploy previews.
3. Supabase or Neon as first Postgres host.
4. Figma, Canva, and Cloudinary for design and asset workflow.
5. PostHog, Sentry, or Datadog for analytics and monitoring.
6. Codex Security full scan after explicit subagent authorization.

## Dashboard Data

The control data is mirrored in `packages/runtime/connector-control.json`. The static dashboard page is `apps/static-fallback/connector-control.html`.
