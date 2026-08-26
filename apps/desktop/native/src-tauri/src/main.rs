// SEIS desktop shell (Windows/Linux): a thin Tauri wrapper around
// apps/web/cockpit.html (see apps/desktop/shell-contract.json). Same four
// views and entities as the macOS reference implementation; this file adds
// no new UI of its own, it only hosts the existing web cockpit natively.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running the SEIS Inspector shell");
}
