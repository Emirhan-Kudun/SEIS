# Windows/Linux native shell

This is the source-level project for the Windows and Linux lanes described in
[`../shell-contract.json`](../shell-contract.json) and
[`../README.md`](../README.md): a thin [Tauri](https://tauri.app) shell that
loads the existing [`apps/web/cockpit.html`](../../web/cockpit.html) instead
of reimplementing its four views in a new UI framework.

Tauri was chosen over Electron because it ships a small native binary (no
bundled Chromium runtime), which fits this repo's no-large-binaries /
`check:secret-scan` governance posture, and because one Tauri project
naturally targets both Windows and Linux from the same source tree — so
`platforms.windows.scaffold` and `platforms.linux.scaffold` in
`shell-contract.json` both point at this directory.

## Status, honestly

**Linux: build-verified.** This project has actually been compiled and run
— not just written — on Ubuntu 24.04: `cargo build` produces a real ELF
binary at `src-tauri/target/debug/seis-desktop-shell`, and running it under
`xvfb-run` opens a native WebKitGTK window that renders
`apps/web/cockpit.html`'s markup, styles, and JS. `Cargo.lock` is committed,
as is standard for a Tauri application (not a library).

**Known gap (not yet reference-implementation parity):** several of the
cockpit's data-driven panels come up empty. `apps/web/app.js` fetches data
with paths like `../../data/gap-closure-register.json`, which only resolve
correctly when the page is served from two directories below a root that
also contains `data/` and `content/` (the layout `apps/web/` has inside the
full SEIS checkout). This scaffold's `distDir` bundles only `apps/web/` in
isolation, so those relative fetches 404 and fall back to `index.html`. The
shell chrome, navigation, and styling all render correctly; the JSON-backed
panel content does not yet. Fixing this needs either a small Rust-side
custom asset handler that also serves `data/` and `content/` at the right
relative paths, or a build step that stages `apps/web/` alongside copies of
those two directories (similar to what `scripts/build-static.mjs` already
does for the static-hosting deploy target) before pointing `distDir` at the
staged output. Neither is done here — this scaffold intentionally stayed a
single-directory `distDir` for now.

**Windows: unscaffolded further than the shared source.** The same
`src-tauri` project targets Windows from this one source tree (Tauri v1's
Windows backend uses WebView2 instead of WebKitGTK, selected automatically
by the target triple), but no Windows build has been attempted or verified
— this repo's tooling only runs on Linux.

## Building it yourself (Linux)

Tauri v1's `webkit2gtk` Rust crate (`v0.18.2`, pulled in transitively via
`tauri` `v1.8.3`) hardcodes pkg-config lookups for `webkit2gtk-4.0` /
`javascriptcoregtk-4.0`. Ubuntu 24.04 only ships the 4.1 API
(`libwebkit2gtk-4.1-dev` / `libjavascriptcoregtk-4.1-dev`) — WebKitGTK
dropped the 4.0 ABI upstream. Tauri v1 has not been updated for this, so on
Ubuntu 24.04+ (and other distros that dropped webkit2gtk-4.0) the build
needs symlinks aliasing the 4.0 names to the installed 4.1 files:

```bash
sudo apt install libwebkit2gtk-4.1-dev libsoup2.4-dev build-essential \
  libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev pkg-config

# webkit2gtk-sys 0.18.0 only looks for the *-4.0 pkg-config files and *.so names.
sudo ln -sf /usr/lib/x86_64-linux-gnu/pkgconfig/webkit2gtk-4.1.pc \
            /usr/lib/x86_64-linux-gnu/pkgconfig/webkit2gtk-4.0.pc
sudo ln -sf /usr/lib/x86_64-linux-gnu/pkgconfig/javascriptcoregtk-4.1.pc \
            /usr/lib/x86_64-linux-gnu/pkgconfig/javascriptcoregtk-4.0.pc
sudo ln -sf /usr/lib/x86_64-linux-gnu/libwebkit2gtk-4.1.so \
            /usr/lib/x86_64-linux-gnu/libwebkit2gtk-4.0.so
sudo ln -sf /usr/lib/x86_64-linux-gnu/libjavascriptcoregtk-4.1.so \
            /usr/lib/x86_64-linux-gnu/libjavascriptcoregtk-4.0.so
sudo ldconfig

cd apps/desktop/native/src-tauri
cargo build
xvfb-run -a ./target/debug/seis-desktop-shell   # headless smoke test
```

This is a real, if inelegant, workaround, not something to paper over: it's
recorded here so the next person (or CI) doesn't have to rediscover it. On a
real desktop (not headless CI), drop `xvfb-run -a` and the window opens
normally against your own X/Wayland session.

## Layout

```
native/
└── src-tauri/
    ├── Cargo.toml          # Rust package + Tauri dependency
    ├── Cargo.lock          # committed: this is an application, not a library
    ├── build.rs            # required by tauri::generate_context!() — calls tauri_build::build()
    ├── tauri.conf.json     # points distDir/devPath at apps/web; bundle.icon set
    ├── icons/               # real PNGs rasterized from packages/design-tokens/icons/mark.svg
    └── src/main.rs          # minimal Tauri entrypoint, no custom UI code
```

## Next steps

1. Solve the `data/` / `content/` relative-path gap above so the cockpit's
   panels show real data inside the shell, not just its chrome — that's the
   real bar for calling this a `reference_implementation`, not just
   "compiles and opens a window."
2. Attempt and verify a Windows build (WebView2 backend) — currently
   entirely unverified.
3. Wire a Linux build into CI once step 1 is solved (`cargo build` /
   `cargo tauri build` produces `.deb`/`.AppImage` from this same source
   tree); document the pkg-config workaround above in that CI step too,
   since GitHub's `ubuntu-latest` runners hit the same webkit2gtk-4.1-only
   gap.
