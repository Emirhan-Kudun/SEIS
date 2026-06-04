# SEIS UX Execution Plan v2 Release Notes

## Scope

- Surface: `apps/site-next`
- Phase 1: UX/IA stabilization, mobile drawer navigation, hero CTA alignment, reduced-motion/mobile motion guard, critical image migration.
- Phase 2: Supabase dual-write preparation, local fallback preservation, intake abuse protection, CV route.
- Phase 3: Locale prefix migration, legacy `?lang=` redirect grace, canonical/hreflang link-map check, technical noindex surfaces.

## Cutover Playbook

- T-30: run final preflight and sample locale drift check.
- T0: enable primary write path by setting `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_BRIEFS_TABLE`.
- T+15: check success rate, local fallback mismatch, Supabase write errors, and `/api/cleanup` health.

## Go/No-Go

- Go: `0 critical` issues, locale link-map passes, content placeholder parity passes, intake fallback works.
- No-Go: failed build, broken public images, critical accessibility issue, Supabase write failure without local fallback.

## Evidence Log

- Command: `npm run lint`
- Result: passed
- Timestamp: 2026-05-26T14:55:21Z

- Command: `npm run checks`
- Result: passed
- Timestamp: 2026-05-26T14:55:21Z

- Command: `npm run typecheck`
- Result: passed
- Timestamp: 2026-05-26T14:55:21Z

- Command: `npm run build --workspace apps/site-next`
- Result: passed
- Timestamp: 2026-05-26T14:55:21Z

## Rollback

- Revert only the affected phase changes.
- Supabase activation is config-driven; unset Supabase env vars to return to local JSONL fallback.
- Locale migration can be reversed by removing proxy routing and canonical path changes while keeping content intact.
