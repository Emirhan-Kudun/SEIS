# Full Efficiency Without Local Strain

This repo can run in a token-heavy, machine-light mode:

- spend more reasoning on architecture and review
- run broad static checks in parallel
- keep local CPU/GPU work bounded
- avoid dev servers, Docker, production builds, and browser automation unless the next decision needs live rendering evidence
- keep every change small, reversible, and on `UIXAppTTR`

The source contract lives in:

```text
config/efficiency-mode.json
```

Runtime visibility endpoint:

```text
GET /api/efficiency-mode
```

Quality gate:

```bash
npm run check:efficiency-mode
```

## Shipment Loop

Use the guarded shipment loop when local work should be mirrored to GitHub:

```bash
npm run shipment:full-efficiency
```

The loop runs configured machine-light checks first, then `npm run publish:preflight`, then a single `git push origin UIXAppTTR` only when the preflight is clean and local commits are ahead of origin. If the branch is already mirrored to GitHub, it exits cleanly without asking for GitHub auth. It does not retry when GitHub auth, network, or remote state blocks shipment.

## Weekly Usage Stewardship

When there is remaining weekly model usage, spend it on durable repo value: small reversible implementation slices, targeted static checks, documentation/checker hardening, and decision records that reduce future prompt repetition.

Do not use the mode for empty token burn, repeated broad scans after a clean signal, dev servers started only to consume usage, or remote pushes without auth preflight.

## Delivery Lanes

The mode separates work into three lanes:

- `local-staging`: continue small UI, UX, content, governance, and static contract work while publishing is blocked.
- `github-shipment`: commit and push only from the real `UIXAppTTR` Git checkout after auth and preflight are clean.
- `server-preservation`: prepare upload bundles, but avoid live deployment until target, path, rollback owner, and dry run are confirmed.

## Practical Rule

Use the model hard; use the laptop gently.

That means more careful analysis, more complete static validation, and fewer heat-heavy loops.
