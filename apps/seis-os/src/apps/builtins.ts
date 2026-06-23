import type { AppRegistry } from '../kernel/registry.js';
import { welcomeApp } from './welcome.js';
import { filesApp } from './files.js';
import { settingsApp } from './settings-app.js';
import { monitorApp } from './monitor.js';

/** Files seeded into the virtual FS on first boot. */
export const SEED_FILES: Record<string, string> = {
  '/readme.md':
    '# SEIS OS\n\nThis is the Phase 0 foundation: a real windowing shell over a service kernel.\n\n- Drag windows by their title bar; resize from the bottom-right.\n- The traffic lights close / minimize / maximize.\n- Your layout, files and theme persist to IndexedDB and restore on reload.\n',
  '/notes.txt':
    'Scratch file. Edit me in the Files app and press Save — reload the page and I will still be here.\n',
  '/roadmap.md':
    '# Next phases\n\n1. SEIS Code (Monaco + terminal + AI pair)\n2. SEIS AI (multi-agent runtime)\n3. Search + Hub\n4. Design + Marketplace\n5. Cloud (backend)\n',
};

/** Register all first-party Phase 0 apps with the kernel registry. */
export function registerBuiltins(registry: AppRegistry): void {
  [welcomeApp, filesApp, settingsApp, monitorApp].forEach((app) => registry.register(app));
}
