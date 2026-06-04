# Full Stack Multilingual Planning System

This document defines how SEIS should plan the multilingual full stack website before runtime implementation.

## Position

The current static website remains the stable public surface. The Next.js foundation is the future full stack surface. This layer is for planning, governance, content modeling, and implementation readiness.

## Planning Principle

No multilingual full stack feature moves into production until it has:

- a clear user purpose
- a locale impact review for `tr`, `en`, `fr`, `it`, and `de`
- accessibility acceptance criteria
- SEO and hreflang notes
- data ownership notes
- rollback path
- local performance budget

## Status Model

Every proposed feature should use one of these states:

- `planned`: documented idea, not approved for code.
- `approved`: ready for scoped implementation.
- `implemented`: exists in runtime code and passed checks.
- `deferred`: useful later, not part of the current delivery path.
- `rejected`: conflicts with calm, accessible, maintainable SEIS principles.

## Full Stack Direction

Planned platform layers:

- `public website`: cinematic editorial portfolio and service surface.
- `content system`: localized pages, project entries, case studies, and insights.
- `admin surface`: private content editing and submission review.
- `api layer`: contact, content preview, health, integrations, and lightweight reporting.
- `data layer`: content metadata, contact submissions, localization status, release notes.
- `observability layer`: uptime, i18n coverage, accessibility continuity, performance budgets.

## Locale Strategy

Primary locale remains `tr`. Secondary locales are `en`, `fr`, `it`, and `de`.

Locale rules:

- Keep locale IDs stable across static and Next runtimes.
- Do not invent a new translation key format without migration plan.
- Treat `translations.json` as the current static source of truth.
- Treat Next dictionaries as the future app-level source of truth.
- Before migration, every key must be mapped between static and Next.
- Use fallback order: active locale -> `tr` -> hardcoded safe fallback.

## Planned Routing Model

Static runtime:

- current contract: `?lang=tr|en|fr|it|de`
- preserve until Next parity is proven

Next runtime:

- planned public routes: `/tr`, `/en`, `/fr`, `/it`, `/de`
- planned content routes: `/{locale}/works/{slug}`
- planned insights routes: `/{locale}/insights/{slug}`
- planned services routes: `/{locale}/services`

Route migration requires redirect and canonical mapping.

## Backend Planning

Backend features should stay small:

- contact submissions
- localized content preview
- admin-only draft storage
- release health endpoint
- i18n coverage endpoint

Avoid:

- account systems before a real need exists
- heavy CMS migration without content model approval
- analytics that tracks manipulative behavioral patterns
- background jobs that create local machine pressure

## Acceptance Checklist

Before any planned item becomes code:

- all five locales have content ownership defined
- mobile layout risk is reviewed
- reduced motion behavior is defined
- keyboard behavior is defined
- SEO metadata is planned
- data storage is explicit
- rollback is possible without data loss
