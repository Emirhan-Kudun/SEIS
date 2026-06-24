import type { AppRegistry } from '../kernel/registry.js';
import { welcomeApp } from './welcome.js';
import { codeApp } from './code/index.js';
import { terminalApp } from './terminal-app.js';
import { filesApp } from './files.js';
import { aiApp } from './ai.js';
import { searchApp } from './search.js';
import { settingsApp } from './settings-app.js';
import { monitorApp } from './monitor.js';
import { utilityApps } from './utilities.js';

/** Files seeded into the virtual FS on first boot. */
export const SEED_FILES: Record<string, string> = {
  '/readme.md':
    '# SEIS OS\n\nA windowing shell over a service kernel.\n\n- Drag windows by their title bar; resize from the bottom-right.\n- Open apps from the dock, the left rail, or the Apps launcher.\n- Layout, files and theme persist to IndexedDB and restore on reload.\n',
  '/notes.txt': 'Scratch file — edit me in Notes, Files or SEIS Code and press Save.\n',
  '/app.js': "// Run me from SEIS Code (▶ Run).\nfor (let i = 1; i <= 5; i++) console.log('SEIS', i);\nconsole.log('done ✓');\n",
};

/** Register all first-party apps with the kernel registry. */
export function registerBuiltins(registry: AppRegistry): void {
  [welcomeApp, codeApp, terminalApp, filesApp, aiApp, searchApp, settingsApp, monitorApp, ...utilityApps].forEach(
    (app) => registry.register(app),
  );
}
