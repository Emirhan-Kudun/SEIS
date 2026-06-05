# Emirhan Web System

Date: 2026-06-05

This portfolio starts as a public portfolio, but the architecture should be ready for a larger mobile, data, automation, and integration system. The goal is not to randomly invoke every available plugin. The goal is to give every useful plugin family a defined place in the system so it can be activated when the product needs it.

## System Intent

- Public surface: portfolio website, case studies, contact entry points.
- Mobile surface: Expo app for profile, work, messages, briefs, and data views.
- Data layer: Postgres-first model for contacts, projects, assets, briefs, connector events, automations, and security findings.
- Integration layer: plugin registry with category, role, auth status, data safety, and activation phase.
- Delivery layer: GitHub, Vercel/Netlify/Cloudflare, CodeRabbit, CI, monitoring.
- Growth layer: design, research, productivity, GTM, finance, media, and AI connectors can be added without changing the core model.

## What "Use Almost All Plugins" Means

Use all relevant plugin families as capabilities, not as noise.

- Inventory every available plugin bundle.
- Group each bundle by role: design, developer tool, productivity, research, security, data/backend, mobile/native, media/video, GTM, finance, commerce, docs, communication, deployment, analytics, or local runtime.
- Add auth status and activation phase.
- Store plugin events in the database when a connector reads, writes, deploys, syncs, reviews, or monitors something.
- Keep secrets and OAuth tokens outside the repo.

## Architecture

### Web App

- Current local refresh: static HTML/CSS/JS portfolio.
- Existing remote repo: Next.js monorepo with a static fallback surface.
- Future direction: keep the Next app as production candidate and use static fallback for low-dependency rollback.

### Mobile App

- Start with Expo Go first.
- Use a custom Expo dev client only when custom native modules, App Clips, widgets, extensions, or non-Expo-Go native dependencies are required.

### Data Layer

- Postgres-first schema for contacts, projects, assets, briefs, integrations, and events.
- Supabase or Neon can host the main Postgres database.
- Airtable, Notion, Google Sheets, and Drive can remain productivity data sources, not the core transactional database.

### Integration Registry

- Source of truth: runtime registry data in `packages/runtime`.
- Tracks bundle inventory, categories, strategic roles, launch phases, and auth readiness.

### Auth And Operations

- OAuth should happen through official connector flows first.
- Safari can be used for browser auth fallback when the user is already signed in there.
- Never commit OAuth tokens, API keys, browser cookies, or service account files.

### Security

- Full Codex Security repository scans require explicit subagent authorization before repository-wide scan work starts.
- Start with a lightweight security baseline and release checklist before deep scanning.

## Initial Phases

### Phase 0: Foundation

- Static portfolio refresh exists locally.
- Local SVG assets exist.
- Plugin registry and architecture docs are added.
- Data schema draft is added.
- Mobile and security plans are added.

### Phase 1: Auth And Delivery

- Re-authenticate CodeRabbit and run a real review.
- Use the GitHub connector or local git auth for branch/PR updates.
- Enable Vercel, Netlify, or Cloudflare preview deployment.
- Confirm Google Drive source folder access.
- Pick the first database host: Supabase or Neon.

### Phase 2: Data Core

- Create Postgres database.
- Apply the draft schema.
- Add contacts, projects, assets, briefs, integrations, and event logging.
- Add RLS policies before private user data enters the system.

### Phase 3: Mobile Shell

- Create an Expo app once Node/npm or an equivalent package runner is available.
- Start with Expo Go.
- Add portfolio, projects, contact, briefs, integrations, and dashboard screens.

### Phase 4: Connector Activation

- Design workflow: Figma, Canva, Product Design, Cloudinary, Shutterstock, Fal.
- Dev workflow: GitHub, Vercel, CodeRabbit, Sentry, Datadog, PostHog.
- Productivity workflow: Google Drive, Notion, Slack, Gmail, Calendar.
- Data workflow: Supabase, Neon, Airtable, MotherDuck, Deepnote, Metabase.
- Research workflow: Zotero, Life Science Research, Hugging Face, Factiva, Quartr, Scite.

### Phase 5: Security And Scale

- Run a full Codex Security scan with explicit subagent authorization.
- Add monitoring and release gates.
- Add plugin event audit logs.
- Split public, private, and admin mobile/web surfaces.

## Operating Rule

Every new integration should answer five questions before it writes or syncs data:

1. What user workflow does it support?
2. What data can it read?
3. What data can it write?
4. Where is auth stored?
5. Which table records its event history?
