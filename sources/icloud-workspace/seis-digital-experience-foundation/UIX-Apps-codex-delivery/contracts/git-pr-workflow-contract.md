# Git and PR Workflow Contract (Professional Branch Governance)

This contract keeps `main/master` clean, stable, testable, secure, and rollback-ready.

## Main Branch Protection

- Never develop directly on `main` or `master`.
- `main/master` must only receive:
  - tested,
  - stable,
  - small,
  - rollback-safe,
  - deploy-ready changes.
- Experimental AI edits, large UI redesigns, broad refactors, dependency changes, config trials, and deploy/build trials are forbidden on protected branches.

## Branch Strategy

- Preferred workflow: branch-based (single-purpose branches).
- Branch names must be lowercase, readable, and task-oriented.
- Allowed patterns:
  - `codex/<task>`
  - `feature/<task>`
  - `fix/<task>`
  - `refactor/<task>`
  - `style/<task>`
  - `chore/<task>`
  - `seo/<task>`
  - `perf/<task>`
  - `codex-dev`
  - `portfolio-v2`

## Change Scope Rules

- One branch, one main purpose.
- Do not mix unrelated scopes in the same branch, especially:
  - SEO + large UI change
  - refactor + new feature
  - config change + visual redesign
  - responsive fix + asset cleanup
  - dependency change + design revision

## Commit Standards

- Commits must be small, reversible, and single-purpose.
- Allowed prefixes:
  - `feat`, `fix`, `style`, `refactor`, `chore`, `seo`, `perf`, `docs`, `config`, `test`
- Forbidden commit style:
  - vague messages (`update files`, `fix stuff`, `final changes`, etc.)

## Critical File Safety

Before changing critical files (config/build/deploy/dependency/env/gitignore):
- explain what changes,
- explain why necessary,
- specify risk level,
- assess impact on current system,
- define rollback plan.

Critical examples:
- `config.xml`
- `package.json`, `package-lock.json`
- `vite.config.*`, `webpack.config.*`, `tsconfig.json`
- deploy configs (`vercel.json`, `netlify.toml`, etc.)
- `.env*`, `.gitignore`, hosting/build scripts

## Merge Readiness Checklist

Before proposing merge to `main/master`, provide:

- Branch metadata:
  - branch name,
  - purpose,
  - risk level
- Change summary:
  - what changed,
  - why,
  - impacted files
- Quality checks:
  - responsive verified,
  - no mobile overflow,
  - design language preserved,
  - performance impact reviewed,
  - SEO impact reviewed,
  - dependency change reviewed,
  - config change reviewed,
  - rollback path confirmed
- Final decision:
  - merge-safe or needs additional checks

## Required AI Pre-Development Output

Before implementation, use this format:

- `BRANCH PLANI`
- `UYGULAMA PLANI`
- `COMMIT ÖNERİLERİ`
- `MERGE ÖNCESİ KONTROL`

Use `node scripts/branch-governance-check.js --template` for a standardized draft.
