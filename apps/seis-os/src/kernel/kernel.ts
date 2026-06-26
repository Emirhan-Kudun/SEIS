import { Persistence, VirtualFS } from './persistence.js';
import { EventBus } from './bus.js';
import { AppRegistry } from './registry.js';
import { SettingsService } from './settings.js';
import { createCloud, type Cloud } from './cloud.js';

/**
 * The SEIS kernel: a small service container booted once at startup.
 * It owns persistence, the event/intent bus, the app registry, the virtual
 * file system, settings/theme and the cloud backend. The shell builds the
 * WindowManager on top.
 */
export class Kernel {
  readonly store = new Persistence();
  readonly bus = new EventBus();
  readonly registry = new AppRegistry();
  fs!: VirtualFS;
  settings!: SettingsService;
  cloud!: Cloud;

  async init(): Promise<void> {
    await this.store.open();
    this.fs = new VirtualFS(this.store);
    this.settings = new SettingsService(this.store);
    await this.settings.init();

    this.cloud = createCloud();
    try {
      await this.cloud.init();
    } catch (err) {
      console.warn('[kernel] cloud init failed; staying local-first', err);
    }
    if (this.cloud.getSession().user) await this.hydrateFromCloud();
    // Mirror local file changes to the cloud when signed in.
    this.fs.onWrite = (path, content) => {
      if (this.cloud.getSession().user) void this.cloud.pushFile(path, content);
    };
    this.cloud.onAuth((s) => {
      if (s.user) void this.hydrateFromCloud();
    });

    this.registerCoreIntents();
  }

  /** Pull the signed-in user's files from the cloud into the local fs. */
  async hydrateFromCloud(): Promise<void> {
    try {
      const files = await this.cloud.pullFiles();
      if (files && Object.keys(files).length) await this.fs.hydrate(files);
    } catch (err) {
      console.warn('[kernel] cloud hydrate failed', err);
    }
  }

  /** Expose a few kernel capabilities over the bus as request intents. */
  private registerCoreIntents(): void {
    this.bus.handle<string, string | undefined>('fs.read', (path) => this.fs.read(path));
    this.bus.handle<{ path: string; content: string }, void>('fs.write', ({ path, content }) =>
      this.fs.write(path, content),
    );
    this.bus.handle<string | undefined, string[]>('fs.list', (prefix) => this.fs.list(prefix));
  }
}
