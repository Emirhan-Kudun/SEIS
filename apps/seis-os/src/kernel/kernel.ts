import { Persistence, VirtualFS } from './persistence.js';
import { EventBus } from './bus.js';
import { AppRegistry } from './registry.js';
import { SettingsService } from './settings.js';

/**
 * The SEIS kernel: a small service container booted once at startup.
 * It owns persistence, the event/intent bus, the app registry, the virtual
 * file system and settings/theme. The shell builds the WindowManager on top.
 */
export class Kernel {
  readonly store = new Persistence();
  readonly bus = new EventBus();
  readonly registry = new AppRegistry();
  fs!: VirtualFS;
  settings!: SettingsService;

  async init(): Promise<void> {
    await this.store.open();
    this.fs = new VirtualFS(this.store);
    this.settings = new SettingsService(this.store);
    await this.settings.init();
    this.registerCoreIntents();
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
