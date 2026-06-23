# SEIS OS

The AI-native creative operating system shell — **Phase 0: Kernel + Design System + Desktop**.

Implements the foundation defined in
[`docs/architecture/seis-os-architecture.md`](../../docs/architecture/seis-os-architecture.md):
a real windowing shell over a small service kernel. Stack ratified as **TypeScript + Vite + Lit**
(Web Components) per decisions D1/D2.

## What Phase 0 delivers

- **Kernel** (`src/kernel/`)
  - `bus` — typed pub/sub + request/response intent bus (the "one product" glue).
  - `window-manager` — the window/process model: open · close · focus · minimize ·
    maximize · tile, with cascade placement and **workspace persistence/restore**.
  - `registry` — the app registry the dock and launcher read from.
  - `persistence` — IndexedDB key/value store with an in-memory fallback, plus a
    virtual `fs`.
  - `settings` — preferences + dark-first theme (dark / light / auto) and the `--accent` token.
- **Design system** (`src/design/tokens.css`) — dark-first tokens (color, type, space,
  radius, elevation, motion) as CSS custom properties that inherit through Shadow DOM.
- **Shell** (`src/shell/seis-desktop.ts`) — wallpaper, menubar (clock, active app, tile,
  theme), the window layer, a macOS-style **dock**, a full-screen **launcher**, and a
  **notification** system.
- **Built-in apps** (`src/apps/`) — Welcome, Files (edits the virtual FS, persists),
  Settings (theme/accent/reset), System Monitor (live process list + load graph). Each
  implements the standard `SeisApp` contract and is lazy-mountable.

## Run

```bash
cd apps/seis-os
npm install
npm run dev        # Vite dev server
# or
npm run build      # tsc --noEmit && vite build  → dist/
npm run preview
```

Open the app, then: open apps from the **dock** or **launcher** (click ◈ SEIS); drag
windows by the title bar, resize from the bottom-right, use the traffic lights. Your
layout, files and theme persist to IndexedDB and **restore on reload**.

## Verified

- `tsc --noEmit` — clean.
- `vite build` — succeeds (~52 KB JS / 16.6 KB gzip, ~2 KB CSS — within the per-module budget).
- jsdom boot test — 12 checks passing (desktop mounts, dock + launcher, windows open/stack,
  theme persists, no uncaught errors).

## Next (per the roadmap)

Phase 1 — **SEIS Code**: adopt `apps/vscode-web` (Monaco + terminal + IndexedDB + the
local Claude REPL) as a module inside this shell.
