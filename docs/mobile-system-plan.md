# Mobile System Plan

The mobile surface should start with Expo and stay lightweight until the data model is real.

## Expo Strategy

- Start with Expo Go.
- Use a custom Expo dev client only when custom native code is required.
- Do not introduce native modules just to make the first version feel bigger.
- Wait for Node/npm or another package runner before bootstrapping the app.

## First Mobile Screens

- Home: profile, availability, featured work.
- Projects: portfolio projects and case studies from the shared data model.
- Contact: form, direct links, and request status.
- Briefs: private intake briefs and next actions.
- Integrations: visible connected services and sync status.
- Dashboard: project counts, contact activity, asset readiness, and deploy state.

## Data Strategy

- Mobile reads through an API or typed client, not directly from random productivity connectors.
- Public portfolio data can be cached aggressively.
- Private briefs, contacts, and integration events require auth and RLS.
- Offline support can start as read-only cache.

## Activation Milestones

1. Create Expo app once package tooling is available.
2. Add shared design tokens from the web portfolio.
3. Connect to Postgres-backed API.
4. Add auth.
5. Add integration status screen.
6. Add push notifications only after real workflow need.
