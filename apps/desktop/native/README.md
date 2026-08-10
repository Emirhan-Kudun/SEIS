# Windows/Linux native shell (scaffold)

This is the source-level scaffold for the Windows and Linux lanes described in
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

This is a scaffold, not a built or distributed app: no `Cargo.lock`, no CI
build step, no installer. It is a real, structurally valid Tauri project
(`src-tauri/Cargo.toml`, `src-tauri/tauri.conf.json`,
`src-tauri/src/main.rs`) that points its webview at `apps/web/cockpit.html`,
matching the same views and entities as the macOS reference implementation.
Compiling it requires the Rust/Tauri toolchain, which this repo does not
assume is installed.

## Layout

```
native/
└── src-tauri/
    ├── Cargo.toml        # Rust package + Tauri dependency
    ├── tauri.conf.json    # points distDir/devPath at apps/web
    └── src/main.rs        # minimal Tauri entrypoint, no custom UI code
```

## Next steps

1. Install the Tauri CLI and Rust toolchain, run `cargo tauri dev` against
   this scaffold to confirm `apps/web/cockpit.html` renders inside it.
2. Wire a build into CI once the toolchain is available there
   (`cargo tauri build` produces `.msi`/`.exe` on Windows and
   `.deb`/`.AppImage` on Linux from this same source tree).
3. Update `platforms.windows.status` / `platforms.linux.status` in
   `../shell-contract.json` from `shell_scaffolded_build_pending` to
   `reference_implementation` once a real build has been produced and
   verified on each OS.
