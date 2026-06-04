# Full Stack Website Feature Roadmap

This roadmap turns future SEIS website ideas into controlled implementation tracks.

## Track 1: Multilingual Foundation

Status: `planned`

Locale scope:

- `tr`
- `en`
- `fr`
- `it`
- `de`

Goals:

- unify locale IDs across static and Next
- create translation key coverage checks
- define route and canonical mapping
- protect all current TR/EN/FR/IT/DE copy

Acceptance:

- missing translation report returns zero missing required keys
- every public page has locale metadata
- mobile nav labels do not overflow

## Track 2: Content And Case Study System

Status: `planned`

Goals:

- move selected works into structured content
- support localized project pages
- preserve editorial tone and visual restraint

Acceptance:

- project schema exists
- at least one project has `tr` and `en` content
- fallback behavior is documented for partial locales

## Track 3: Contact And Submission Operations

Status: `planned`

Goals:

- keep the current contact form stable
- add a private review flow for submissions
- keep storage out of git

Acceptance:

- contact endpoint remains rate-limited
- submission status model is documented
- no secrets are required for local development

## Track 4: Admin Planning Surface

Status: `deferred`

Goals:

- provide draft editing for localized content
- show translation coverage
- preview pages before publish

Reason for defer:

- admin authentication and permissions should not be added before data ownership is clear

## Track 5: Observability And Quality Reports

Status: `planned`

Goals:

- track i18n coverage
- track accessibility continuity
- track branch and release readiness
- avoid alert fatigue

Acceptance:

- report output is concise and actionable
- no visitor-level behavioral tracking is required
- local checks remain lightweight

## Track 6: Cinematic Enhancement Layer

Status: `deferred`

Goals:

- add restrained motion and possible 3D only after content parity
- keep reduced-motion and mobile performance budgets

Reason for defer:

- full stack content and locale stability are higher priority than visual expansion

## Promotion Rule

A planned track becomes approved only when:

- scope is small enough for one reversible diff
- data and i18n risks are known
- local quality gate can run without heavy machine load
- rollback plan is explicit
