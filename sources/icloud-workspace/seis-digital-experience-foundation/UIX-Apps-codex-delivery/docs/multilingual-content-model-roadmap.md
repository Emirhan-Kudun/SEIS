# Multilingual Content Model Roadmap

This roadmap defines the content model needed for a full stack SEIS website.

## Content Types

### Site Copy

Purpose:

- navigation
- buttons
- accessibility labels
- form labels
- toast messages
- legal and operational microcopy

Current source:

- `translations.json`

Future source:

- typed dictionaries in the Next.js app
- export bridge back to static runtime until migration is complete

### Project

Fields:

- `id`
- `slug`
- `locale`
- `title`
- `summary`
- `discipline`
- `year`
- `role`
- `coverImage`
- `gallery`
- `challenge`
- `process`
- `solution`
- `outcome`
- `seoTitle`
- `seoDescription`

### Service

Fields:

- `id`
- `locale`
- `name`
- `shortDescription`
- `deliverables`
- `processSteps`
- `faq`
- `ctaLabel`

### Insight

Fields:

- `id`
- `slug`
- `locale`
- `title`
- `dek`
- `body`
- `tags`
- `publishedAt`
- `updatedAt`
- `seoTitle`
- `seoDescription`

### Submission

Fields:

- `id`
- `createdAt`
- `locale`
- `name`
- `email`
- `service`
- `message`
- `status`
- `source`

Do not commit submission records. Runtime storage belongs under ignored runtime paths or a future database.

## Locale Coverage Matrix

Each content record should define:

- `sourceLocale`
- `translatedLocales`
- `needsReviewLocales`
- `missingLocales`
- `lastReviewedAt`

Minimum publish rule:

- public navigation and core pages require all five locales
- project details may launch with `tr` and `en` only if fallback behavior is explicit
- contact and accessibility copy must always cover all five locales

## Translation Workflow

1. Draft source content in `tr`.
2. Create `en` adaptation for international clarity.
3. Produce `fr`, `it`, and `de` versions from approved source meaning.
4. Review long labels for mobile overflow.
5. Review tone for calm, premium, and non-hype language.
6. Run missing key and fallback checks.
7. Promote only after SEO metadata exists for every published locale.

## SEO Model

Every localized page needs:

- localized title
- localized description
- canonical URL
- hreflang alternates
- Open Graph title and description
- stable slug policy

Slug policy:

- keep simple ASCII slugs for maintainability
- avoid changing slugs after publishing
- record redirects when a slug changes

## Planning Risks

- duplicated translation sources
- long German labels breaking mobile UI
- French and Italian copy becoming too formal for the brand tone
- static and Next locale behavior diverging
- SEO metadata missing for non-default locales

## First Implementation Candidates

Recommended first code candidates after approval:

- typed locale registry
- i18n coverage checker
- content schema for projects
- localized SEO helper
- static to Next translation key map
