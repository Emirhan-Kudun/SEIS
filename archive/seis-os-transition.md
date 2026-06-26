# SEIS OS transition — archival plan

This note records the (reversible) transition of SEIS from an ecosystem‑governance
repository into the **SEIS OS product** repository. It follows the archive policy in
[`README.md`](./README.md): a note, not a dump — nothing is deleted, history stays in git.

## Done
- The root [`README`](../README.md) now **leads with the product** (SEIS OS + the app suite).
- A product [`site/`](../site/) landing page is the public front door.
- The product lives under [`apps/seis-os/`](../apps/seis-os/) (kernel · desktop · 25 apps)
  plus the standalone apps (`vscode-web`, `shanhaijing-gacha`, `video-hero`).

## Intentionally left in place (CI‑guarded)
The governance CI validates `docs/`, `sources/`, `packages/`, the legacy demo apps and the
closed‑code files in their current locations. They are **not** moved yet, because doing so
would turn those PR checks red. See the table in the product README / this folder.

## To complete the archive (explicit go‑ahead required)
Move the governance **workflows** out of `.github/workflows/` (foundation‑check,
seis‑closed‑code) together with their docs/scripts into `archive/legacy/`, and replace CI
with a **product** workflow (Vite build of `apps/seis-os` + the jsdom smoke tests). This is
deliberate and larger, so it is gated on an explicit instruction.
