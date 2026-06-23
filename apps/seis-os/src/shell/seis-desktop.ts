import { LitElement, html, css } from 'lit';
import type { Kernel } from '../kernel/kernel.js';
import { WindowManager } from '../kernel/window-manager.js';
import type { NotifyLevel, ThemeMode, WindowState } from '../kernel/types.js';
import { registerBuiltins, SEED_FILES } from '../apps/builtins.js';

interface Toast {
  id: number;
  level: NotifyLevel;
  message: string;
}

/** The SEIS OS shell: wallpaper, menubar, dock, launcher and notifications,
 *  hosting the WindowManager's window layer. */
export class SeisDesktop extends LitElement {
  static override properties = {
    activeApp: { state: true },
    launcherOpen: { state: true },
    clock: { state: true },
    running: { state: true },
    toasts: { state: true },
    theme: { state: true },
  };

  kernel!: Kernel;
  private wm!: WindowManager;
  activeApp = '';
  launcherOpen = false;
  clock = '';
  running: string[] = [];
  toasts: Toast[] = [];
  theme: ThemeMode = 'dark';

  static override styles = css`
    :host { position: absolute; inset: 0; overflow: hidden; display: block; }
    .wallpaper {
      position: absolute; inset: 0;
      background:
        radial-gradient(900px 600px at 78% -8%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 60%),
        radial-gradient(700px 500px at 8% 108%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 55%),
        linear-gradient(160deg, var(--bg-grad-1), var(--bg-grad-2));
    }
    .wallpaper::after {
      content: ''; position: absolute; inset: 0; opacity: 0.025; mix-blend-mode: overlay;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
    .menubar {
      position: absolute; top: 0; left: 0; right: 0; height: var(--menubar-h); z-index: 9000;
      display: flex; align-items: center; gap: 14px; padding: 0 12px;
      background: color-mix(in srgb, var(--elev) 70%, transparent);
      backdrop-filter: blur(20px) saturate(1.4); -webkit-backdrop-filter: blur(20px) saturate(1.4);
      border-bottom: 1px solid var(--border); font-size: 12.5px;
    }
    .logo { background: none; border: none; color: var(--text); font-weight: 600; cursor: pointer; letter-spacing: .04em; display: flex; align-items: center; gap: 7px; }
    .logo:hover { color: var(--accent); }
    .active { color: var(--text-dim); }
    .spacer { flex: 1; }
    .mb-btn { background: none; border: none; color: var(--text-dim); cursor: pointer; padding: 4px 7px; border-radius: 6px; font-size: 14px; }
    .mb-btn:hover { background: var(--surface-2); color: var(--text); }
    .clock { color: var(--text-dim); font-variant-numeric: tabular-nums; min-width: 52px; text-align: right; }
    .windows { position: absolute; inset: 0; }

    .dock {
      position: absolute; left: 50%; bottom: 14px; transform: translateX(-50%); z-index: 9000;
      display: flex; gap: 8px; padding: 9px 12px; border-radius: var(--radius-4);
      background: color-mix(in srgb, var(--elev) 72%, transparent); border: 1px solid var(--border);
      backdrop-filter: blur(24px) saturate(1.5); -webkit-backdrop-filter: blur(24px) saturate(1.5);
      box-shadow: var(--shadow-3); max-width: calc(100% - 28px);
    }
    .dock .tile {
      width: 46px; height: 46px; border: none; border-radius: 13px; cursor: pointer; position: relative;
      display: grid; place-items: center; font-size: 23px; transition: transform var(--dur-2) var(--ease);
      background: color-mix(in srgb, var(--tint, var(--accent)) 22%, var(--surface-2));
    }
    .dock .tile:hover { transform: translateY(-8px) scale(1.06); }
    .dock .tile .run { position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; border-radius: 50%; background: var(--text); opacity: 0; }
    .dock .tile.on .run { opacity: 0.9; }

    .launcher {
      position: absolute; inset: 0; z-index: 9500; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 30px; padding: 60px;
      background: color-mix(in srgb, var(--bg) 55%, transparent);
      backdrop-filter: blur(34px) saturate(1.3); -webkit-backdrop-filter: blur(34px) saturate(1.3);
      animation: fade var(--dur-2) var(--ease);
    }
    @keyframes fade { from { opacity: 0; } }
    .launcher .grid { display: grid; grid-template-columns: repeat(auto-fit, 132px); gap: 18px; justify-content: center; max-width: 760px; }
    .launcher .app { background: none; border: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 10px; color: var(--text); }
    .launcher .app .ico { width: 78px; height: 78px; border-radius: 20px; display: grid; place-items: center; font-size: 38px;
      background: color-mix(in srgb, var(--tint, var(--accent)) 24%, var(--surface-2)); border: 1px solid var(--border); transition: transform var(--dur-2) var(--ease); }
    .launcher .app:hover .ico { transform: scale(1.08); }
    .launcher .app .nm { font-size: 13px; }
    .launcher .app .ds { font-size: 11px; color: var(--text-mute); }
    .launcher .hint { color: var(--text-mute); font-size: 12px; letter-spacing: .1em; }

    .toasts { position: absolute; top: 40px; right: 14px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
    .toast {
      min-width: 220px; max-width: 320px; padding: 11px 14px; border-radius: var(--radius-2);
      background: var(--elev); border: 1px solid var(--border); border-left: 3px solid var(--accent);
      box-shadow: var(--shadow-2); font-size: 12.5px; animation: slidein var(--dur-2) var(--ease);
      backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
    }
    @keyframes slidein { from { opacity: 0; transform: translateX(16px); } }
    .toast.success { border-left-color: var(--ok); }
    .toast.warn { border-left-color: var(--warn); }
    .toast.error { border-left-color: var(--danger); }
  `;

  protected override firstUpdated(): void {
    const layer = this.renderRoot.querySelector('.windows') as HTMLElement;
    this.wm = new WindowManager({
      registry: this.kernel.registry,
      store: this.kernel.store,
      fs: this.kernel.fs,
      bus: this.kernel.bus,
      settings: this.kernel.settings,
      notify: (level, message) => this.pushToast(level, message),
      onActiveChange: (appId) => {
        this.activeApp = appId ? this.kernel.registry.get(appId)?.title ?? '' : '';
      },
      onProcessesChange: () => {
        this.running = this.wm.list().map((w) => w.appId);
      },
    });
    this.wm.attach(layer);

    registerBuiltins(this.kernel.registry);
    this.kernel.registry.onChange(() => this.requestUpdate());

    // Bus intents (the shell's "syscalls")
    this.kernel.bus.on<string>('app.open', (id) => this.wm.activate(id));
    this.kernel.bus.on('os.launcher', () => (this.launcherOpen = !this.launcherOpen));
    this.kernel.bus.on('os.tile', () => this.wm.tile());
    this.kernel.bus.on<{ level: NotifyLevel; message: string }>('notify', (p) => this.pushToast(p.level, p.message));
    this.kernel.bus.handle<undefined, WindowState[]>('os.processes', () => this.wm.list());

    this.theme = this.kernel.settings.getTheme();
    this.kernel.settings.observe('theme', () => (this.theme = this.kernel.settings.getTheme()));

    const updateClock = () =>
      (this.clock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    updateClock();
    setInterval(updateClock, 15000);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.launcherOpen = false;
    });

    // Seed FS, then restore last workspace (or open Welcome on a fresh boot).
    void this.kernel.fs
      .seed(SEED_FILES)
      .then(() => this.wm.restore())
      .then(() => {
        if (!this.wm.list().length) this.wm.open('welcome');
      });
  }

  private pushToast(level: NotifyLevel, message: string): void {
    const id = Date.now() + Math.random();
    this.toasts = [...this.toasts, { id, level, message }];
    setTimeout(() => (this.toasts = this.toasts.filter((t) => t.id !== id)), 3200);
  }

  private cycleTheme(): void {
    const order: ThemeMode[] = ['dark', 'light', 'auto'];
    const next = order[(order.indexOf(this.theme) + 1) % order.length];
    void this.kernel.settings.setTheme(next);
  }

  private themeGlyph(): string {
    return this.theme === 'dark' ? '🌙' : this.theme === 'light' ? '☀️' : '◐';
  }

  protected override render(): unknown {
    const apps = this.kernel?.registry.list() ?? [];
    const pinned = this.kernel?.registry.pinned() ?? [];
    const runningSet = new Set(this.running);
    return html`
      <div class="wallpaper"></div>

      <div class="menubar">
        <button class="logo" @click=${() => (this.launcherOpen = !this.launcherOpen)}>◈ SEIS</button>
        <span class="active">${this.activeApp}</span>
        <div class="spacer"></div>
        <button class="mb-btn" title="Tile windows" @click=${() => this.wm.tile()}>⊞</button>
        <button class="mb-btn" title="Theme: ${this.theme}" @click=${() => this.cycleTheme()}>${this.themeGlyph()}</button>
        <span class="clock">${this.clock}</span>
      </div>

      <div class="windows"></div>

      <div class="dock">
        ${pinned.map(
          (a) => html`
            <button
              class="tile ${runningSet.has(a.id) ? 'on' : ''}"
              style=${`--tint:${a.tint ?? 'var(--accent)'}`}
              title=${a.title}
              @click=${() => this.wm.activate(a.id)}
            >
              ${a.icon}<span class="run"></span>
            </button>
          `,
        )}
      </div>

      ${this.launcherOpen
        ? html`
            <div class="launcher" @click=${(e: Event) => { if (e.target === e.currentTarget) this.launcherOpen = false; }}>
              <div class="grid">
                ${apps.map(
                  (a) => html`
                    <button class="app" @click=${() => { this.launcherOpen = false; this.wm.activate(a.id); }}>
                      <span class="ico" style=${`--tint:${a.tint ?? 'var(--accent)'}`}>${a.icon}</span>
                      <span class="nm">${a.title}</span>
                      <span class="ds">${a.description ?? ''}</span>
                    </button>
                  `,
                )}
              </div>
              <div class="hint">Press Esc to close</div>
            </div>
          `
        : ''}

      <div class="toasts">
        ${this.toasts.map((t) => html`<div class="toast ${t.level}">${t.message}</div>`)}
      </div>
    `;
  }
}

customElements.define('seis-desktop', SeisDesktop);
