# SEIS Deployment Topology

Date: 2026-06-19

Where SEIS surfaces run and how they connect (V16 §25, §31). This is an overview;
operational detail lives in the existing deployment docs and is referenced, not
duplicated.

## Surfaces

| Surface | Today | Target |
|---|---|---|
| Cockpit (`apps/web`) | static HTML/CSS/ESM from local records | static hosting (GitHub Pages-style), then a Phase 2 app |
| API / backend | not deployed | Convex-first backend (existing decision); authenticated APIs |
| Mobile (`apps/android`) | Expo shell consuming the shared status bundle | companion app (monitor/approve) |
| Desktop (`apps/macos`) | inspector contract | native SwiftUI operator app (Phase 3) |
| Remote / SSH | access model documented | VPN-ready, key-only, scoped/audited (V16 §20) |

## Flow

```
GitHub (source of truth)
   → CI gates (test · governance · check)
   → build/static artifact
   → hosting  +  (Phase 2) Convex backend
   → operator surfaces (web / mobile / desktop)
remote hosts reached only via verified, key-only, scoped SSH (private network preferred)
```

## Rules (V16 §4, §32)

- GitHub is the source of truth; `main` is protected; no direct pushes/auto-merge.
- Deployment is **manual and gated**; rollback is required and understood.
- Secrets come from environment/secret stores, never the client or repo.

## References (not duplicated here)

- [`deploy/server-targets.json`](../../deploy/server-targets.json),
  [`server-target-selection.md`](../deployment/server-target-selection.md)
- [`remote-access.md`](../deployment/remote-access.md),
  [`remote-access-runbook.md`](../deployment/remote-access-runbook.md)
- [`release-backup-plan.md`](../deployment/release-backup-plan.md),
  [`full-efficiency-shipment.md`](../deployment/full-efficiency-shipment.md)
