# Plugin Orchestration

This system can grow across many OpenAI-built plugins and connectors, but each one needs a precise role. The portfolio should not become a pile of disconnected auth flows. It should become an integration-aware product.

## Plugin Roles

- Source: reads files, records, issues, messages, meetings, docs, assets, or analytics.
- Builder: creates code, UI, mobile apps, decks, videos, dashboards, or data artifacts.
- Data host: stores transactional or analytical data.
- Deploy: publishes web, mobile, worker, or backend releases.
- Review: checks code, security, quality, performance, or design fidelity.
- Monitor: watches telemetry, errors, product analytics, infra, or spend.
- Automate: sends messages, creates tickets, schedules work, or triggers flows.

## Category Map

- Design: Figma, Canva, Product Design, Creative Production, Cloudinary, Shutterstock, Fal, Picsart, MagicPath.
- Developer tools: Build Web Apps, Build iOS Apps, Build macOS Apps, Expo, GitHub, CodeRabbit, CircleCI, Sentry, Datadog, Jam, Superpowers.
- Deployment and infra: Vercel, Netlify, Cloudflare, Render, Replit, Hostinger, Wix, Base44, Lovable.
- Data and backend: Supabase, Neon Postgres, Convex, Airtable, MotherDuck, Deepnote, Metabase, Omni Analytics, ThoughtSpot, PostHog, Mixpanel.
- Productivity: Google Drive, Notion, Gmail, Outlook, Slack, Teams, Google Calendar, Zoom, Granola, Read AI, Fireflies, Otter.ai.
- Research: Zotero, Life Science Research, Hugging Face, Factiva, Quartr, Scite, CB Insights, PitchBook, Alpha/data research tools.
- Security and compliance: Codex Security, Sentry, Datadog, Vantage, Docusign, SignNow, Box, Egnyte, SharePoint.
- Business and GTM: Apollo, ZoomInfo, HubSpot, CRM tools, Common Room, Demandbase, Clay, Intercom, Pipedrive, Outreach, Close.
- Commerce and payments: Stripe, Shopify, QuickBooks, Razorpay, Brex.
- Media and video: Remotion, HeyGen, HyperFrames, Fal, Cloudinary, Shutterstock.

## Integration Record

Every activated plugin should have a database record:

- `provider_key`: stable slug, such as `github` or `google-drive`.
- `category`: design, dev_tool, productivity, research, security, data_backend, mobile_native, deploy, analytics, commerce, media, or local_runtime.
- `role`: source, builder, data_host, deploy, review, monitor, automate.
- `auth_status`: pending, connected, expired, blocked, or not_required.
- `read_scope`: what it may read.
- `write_scope`: what it may write.
- `mobile_surface`: whether the mobile app can show its data.
- `last_sync_at`: latest successful sync.
- `risk_level`: low, medium, high, or restricted.

## Workflow Examples

### Contact Lead

1. Visitor submits contact form.
2. Contact is stored in Postgres.
3. Slack or Gmail can notify.
4. HubSpot or Airtable can sync later.
5. Integration event is logged.

### Portfolio Content

1. Google Drive, Notion, or Airtable provides source content.
2. Cloudinary stores assets.
3. Website renders public content.
4. Mobile app reads the same content through the API.

### Design Iteration

1. Figma or Canva provides design source.
2. Build Web Apps implements the web surface.
3. Browser verifies desktop/mobile behavior.
4. CodeRabbit reviews code when auth is connected.

### Deployment

1. GitHub stores source.
2. Vercel, Netlify, or Cloudflare deploys.
3. Sentry, Datadog, or PostHog monitors.
4. Security findings and release events are logged.

## Activation Policy

- Use the smallest useful plugin set for the current workflow.
- Never store OAuth tokens, API keys, or session cookies in the repo.
- Never let a productivity connector become the main source for sensitive transactional data without a data owner and access policy.
- Log writes and deploys.
- Treat mobile-visible data as public or user-permitted unless RLS says otherwise.
