import { LitElement, html, css } from 'lit';
import type { Kernel } from '../kernel/kernel.js';
import { WindowManager } from '../kernel/window-manager.js';
import type { NotifyLevel, ThemeMode, WindowState, AppCategory } from '../kernel/types.js';
import { registerBuiltins, SEED_FILES } from '../apps/builtins.js';

interface Toast {
  id: number;
  level: NotifyLevel;
  message: string;
}

const RAIL: Array<{ app?: string; action?: 'launcher'; icon: string; label: string }> = [
  { action: 'launcher', icon: '▦', label: 'Apps' },
  { app: 'files', icon: '🗂', label: 'Files' },
  { app: 'terminal', icon: '⌥', label: 'Terminal' },
  { app: 'code', icon: '⌘', label: 'Code' },
  { app: 'ai', icon: '✳', label: 'AI' },
  { app: 'search', icon: '⌕', label: 'Search' },
  { app: 'settings', icon: '⚙', label: 'Settings' },
];
const CATS: Array<'All' | AppCategory> = ['All', 'System', 'Productivity', 'Internet', 'Media', 'Dev Tools', 'Creative', 'Utilities'];

/** SEIS OS shell — boot → lock → desktop, with activity rail, status bar,
 *  wallpaper, dock, categorized launcher and notifications. */
export class SeisDesktop extends LitElement {
  static override properties = {
    phase: { state: true },
    activeApp: { state: true },
    launcherOpen: { state: true },
    launcherCat: { state: true },
    launcherQuery: { state: true },
    clock: { state: true },
    dateStr: { state: true },
    running: { state: true },
    toasts: { state: true },
    theme: { state: true },
    authError: { state: true },
  };

  kernel!: Kernel;
  private wm!: WindowManager;
  phase: 'boot' | 'lock' | 'desktop' = 'boot';
  private entered = false;
  private wmAttached = false;
  activeApp = '';
  launcherOpen = false;
  launcherCat: 'All' | AppCategory = 'All';
  launcherQuery = '';
  clock = '';
  dateStr = '';
  running: string[] = [];
  toasts: Toast[] = [];
  theme: ThemeMode = 'dark';
  authError = '';

  static override styles = css`
    :host { position: absolute; inset: 0; overflow: hidden; display: block; --rail-w: 76px; }
    .wallpaper { position: absolute; inset: 0; background: var(--wallpaper); background-size: cover; }
    .wallpaper::after {
      content: ''; position: absolute; inset: 0; opacity: 0.025; mix-blend-mode: overlay;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    /* boot */
    .boot, .lock { position: absolute; inset: 0; z-index: 9800; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 22px; }
    .boot .mark, .lock .mark { font-size: 34px; letter-spacing: .3em; font-weight: 600; }
    .boot .bar { width: 180px; height: 3px; background: var(--border); border-radius: 3px; overflow: hidden; }
    .boot .bar i { display: block; height: 100%; width: 40%; background: var(--accent); border-radius: 3px; animation: load 1s var(--ease) forwards; }
    @keyframes load { from { width: 0; } to { width: 100%; } }

    /* lock */
    .lock .clock-xl { font-size: 64px; font-weight: 200; font-variant-numeric: tabular-nums; }
    .lock .date-xl { color: var(--text-dim); margin-top: -10px; letter-spacing: .08em; }
    .lock .card { margin-top: 18px; width: 320px; background: color-mix(in srgb, var(--elev) 80%, transparent);
      border: 1px solid var(--border); border-radius: var(--radius-3); padding: 26px; text-align: center;
      backdrop-filter: blur(24px); box-shadow: var(--shadow-3); }
    .lock .avatar { width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 12px; display: grid; place-items: center;
      font-size: 26px; background: color-mix(in srgb, var(--accent) 30%, var(--surface-2)); }
    .lock .who { font-weight: 600; font-size: 17px; margin-bottom: 14px; }
    .lock input { width: 100%; padding: 10px 12px; border-radius: var(--radius-2); border: 1px solid var(--border);
      background: var(--surface-2); color: var(--text); outline: none; text-align: center; }
    .lock input:focus { border-color: var(--accent); }
    .lock .unlock { width: 100%; margin-top: 10px; padding: 10px; border: none; border-radius: var(--radius-2);
      background: var(--accent); color: #fff; cursor: pointer; font-weight: 600; }
    .lock .guest { margin-top: 12px; background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 13px; }
    .lock .guest:hover { color: var(--text); }

    /* top bar */
    .topbar { position: absolute; top: 0; left: 0; right: 0; height: var(--menubar-h); z-index: 9000;
      display: flex; align-items: center; padding: 0 12px; gap: 12px; font-size: 12.5px;
      background: color-mix(in srgb, var(--elev) 66%, transparent); backdrop-filter: blur(20px) saturate(1.4);
      border-bottom: 1px solid var(--border); }
    .topbar .brand { font-weight: 600; letter-spacing: .05em; }
    .topbar .center { position: absolute; left: 50%; transform: translateX(-50%); color: var(--text-dim); display: flex; gap: 10px; }
    .topbar .center b { color: var(--text); font-weight: 500; font-variant-numeric: tabular-nums; }
    .topbar .right { margin-left: auto; display: flex; align-items: center; gap: 4px; }
    .topbar .si { background: none; border: none; color: var(--text-dim); cursor: pointer; padding: 4px 6px; border-radius: 6px; font-size: 13px; }
    .topbar .si:hover { background: var(--surface-2); color: var(--text); }

    /* activity rail */
    .rail { position: absolute; left: 0; top: var(--menubar-h); bottom: 0; width: var(--rail-w); z-index: 8500;
      display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 12px 0;
      background: color-mix(in srgb, var(--elev) 56%, transparent); backdrop-filter: blur(20px); border-right: 1px solid var(--border); }
    .rail button { width: 60px; background: none; border: none; color: var(--text-dim); cursor: pointer;
      display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 0; border-radius: var(--radius-2); }
    .rail button:hover { background: var(--surface-2); color: var(--text); }
    .rail button.on { color: var(--text); background: var(--accent-weak); }
    .rail button .i { font-size: 19px; } .rail button .l { font-size: 10px; }

    .windows { position: absolute; inset: 0; }

    /* dock */
    .dock { position: absolute; left: calc(var(--rail-w) + (100% - var(--rail-w)) / 2); bottom: 14px; transform: translateX(-50%); z-index: 9000;
      display: flex; gap: 8px; padding: 9px 12px; border-radius: var(--radius-4); max-width: calc(100% - var(--rail-w) - 28px); overflow-x: auto;
      background: color-mix(in srgb, var(--elev) 72%, transparent); border: 1px solid var(--border);
      backdrop-filter: blur(24px) saturate(1.5); box-shadow: var(--shadow-3); }
    .dock .tile { width: 44px; height: 44px; border: none; border-radius: 12px; cursor: pointer; position: relative;
      display: grid; place-items: center; font-size: 22px; transition: transform var(--dur-2) var(--ease); flex: none;
      background: color-mix(in srgb, var(--tint, var(--accent)) 22%, var(--surface-2)); }
    .dock .tile:hover { transform: translateY(-8px) scale(1.06); }
    .dock .tile .run { position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; border-radius: 50%; background: var(--text); opacity: 0; }
    .dock .tile.on .run { opacity: .9; }

    /* launcher */
    .launcher { position: absolute; inset: 0; z-index: 9500; display: flex; flex-direction: column; align-items: center;
      gap: 18px; padding: 40px 40px 30px; background: color-mix(in srgb, var(--bg) 50%, transparent);
      backdrop-filter: blur(34px) saturate(1.3); animation: fade var(--dur-2) var(--ease); }
    @keyframes fade { from { opacity: 0; } }
    .launcher .search { width: min(520px, 80%); padding: 11px 16px; border-radius: 30px; border: 1px solid var(--border);
      background: var(--surface-2); color: var(--text); outline: none; text-align: center; }
    .launcher .cats { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
    .launcher .cat { padding: 6px 14px; border-radius: 20px; border: 1px solid var(--border); background: transparent;
      color: var(--text-dim); cursor: pointer; font-size: 12.5px; }
    .launcher .cat.on { color: var(--text); border-color: var(--accent); background: var(--accent-weak); }
    .launcher .grid { display: grid; grid-template-columns: repeat(auto-fill, 104px); gap: 14px; justify-content: center;
      overflow: auto; padding: 6px; max-width: 920px; width: 100%; align-content: start; }
    .launcher .app { background: none; border: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--text); }
    .launcher .app .ico { width: 60px; height: 60px; border-radius: 16px; display: grid; place-items: center; font-size: 28px;
      background: color-mix(in srgb, var(--tint, var(--accent)) 22%, var(--surface-2)); border: 1px solid var(--border); transition: transform var(--dur-2) var(--ease); }
    .launcher .app:hover .ico { transform: scale(1.08); }
    .launcher .app .nm { font-size: 12px; text-align: center; }
    .launcher .count { color: var(--text-mute); font-size: 11.5px; letter-spacing: .1em; }

    .toasts { position: absolute; top: 38px; right: 14px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
    .toast { min-width: 220px; max-width: 320px; padding: 11px 14px; border-radius: var(--radius-2); background: var(--elev);
      border: 1px solid var(--border); border-left: 3px solid var(--accent); box-shadow: var(--shadow-2); font-size: 12.5px;
      animation: slidein var(--dur-2) var(--ease); backdrop-filter: blur(18px); }
    @keyframes slidein { from { opacity: 0; transform: translateX(16px); } }
    .toast.success { border-left-color: var(--ok); } .toast.warn { border-left-color: var(--warn); } .toast.error { border-left-color: var(--danger); }
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

    registerBuiltins(this.kernel.registry);
    this.kernel.registry.onChange(() => this.requestUpdate());
    this.kernel.bus.on<string>('app.open', (id) => this.wm.activate(id));
    this.kernel.bus.on('os.launcher', () => (this.launcherOpen = !this.launcherOpen));
    this.kernel.bus.on('os.tile', () => this.wm.tile());
    this.kernel.bus.on('os.lock', () => (this.phase = 'lock'));
    this.kernel.bus.on<{ level: NotifyLevel; message: string }>('notify', (p) => this.pushToast(p.level, p.message));
    this.kernel.bus.handle<undefined, WindowState[]>('os.processes', () => this.wm.list());
    this.kernel.bus.handle<undefined, Array<{ id: string; title: string; icon: string }>>('apps.list', () =>
      this.kernel.registry.list().map((a) => ({ id: a.id, title: a.title, icon: a.icon })),
    );

    this.theme = this.kernel.settings.getTheme();
    this.kernel.settings.observe('theme', () => (this.theme = this.kernel.settings.getTheme()));

    const tick = () => {
      const d = new Date();
      this.clock = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.dateStr = d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    };
    tick();
    setInterval(tick, 15000);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.launcherOpen = false;
    });

    setTimeout(() => {
      this.phase = this.kernel.cloud.getSession().user ? 'desktop' : 'lock';
    }, 1100);
  }

  private async cloudAuth(mode: 'in' | 'up'): Promise<void> {
    const email = (this.renderRoot.querySelector('#lk-email') as HTMLInputElement | null)?.value ?? '';
    const pass = (this.renderRoot.querySelector('#lk-pass') as HTMLInputElement | null)?.value ?? '';
    const res = mode === 'in' ? await this.kernel.cloud.signIn(email, pass) : await this.kernel.cloud.signUp(email, pass);
    if (res.error) {
      this.authError = res.error;
      return;
    }
    this.authError = '';
    this.phase = 'desktop';
  }

  protected override updated(): void {
    // wm attaches to the windows layer once the desktop is rendered
    if (this.phase === 'desktop' && this.wm && !this.wmAttached) {
      const layer = this.renderRoot.querySelector('.windows') as HTMLElement;
      if (layer) {
        this.wm.attach(layer);
        this.wmAttached = true;
        void this.enterDesktop();
      }
    }
  }

  private async enterDesktop(): Promise<void> {
    if (this.entered) return;
    this.entered = true;
    await this.kernel.fs.seed(SEED_FILES);
    await this.wm.restore();
    if (!this.wm.list().length) this.wm.open('welcome');
  }

  private pushToast(level: NotifyLevel, message: string): void {
    const id = Date.now() + Math.random();
    this.toasts = [...this.toasts, { id, level, message }];
    setTimeout(() => (this.toasts = this.toasts.filter((t) => t.id !== id)), 3200);
  }
  private cycleTheme(): void {
    const order: ThemeMode[] = ['dark', 'light', 'auto'];
    void this.kernel.settings.setTheme(order[(order.indexOf(this.theme) + 1) % order.length]);
  }
  private themeGlyph(): string {
    return this.theme === 'dark' ? '🌙' : this.theme === 'light' ? '☀️' : '◐';
  }
  private railClick(item: (typeof RAIL)[number]): void {
    if (item.action === 'launcher') this.launcherOpen = !this.launcherOpen;
    else if (item.app) this.wm.activate(item.app);
  }

  protected override render(): unknown {
    if (this.phase === 'boot') {
      return html`<div class="wallpaper"></div>
        <div class="boot"><div class="mark">◈ SEIS</div><div class="bar"><i></i></div></div>`;
    }
    if (this.phase === 'lock') {
      const cloud = this.kernel.cloud.isConfigured();
      return html`<div class="wallpaper"></div>
        <div class="lock">
          <div class="clock-xl">${this.clock}</div>
          <div class="date-xl">${this.dateStr}</div>
          <div class="card">
            <div class="avatar">🦊</div>
            <div class="who">${cloud ? 'Sign in to SEIS Cloud' : 'Emirhan'}</div>
            ${cloud
              ? html`
                  <input id="lk-email" type="email" placeholder="Email" />
                  <input id="lk-pass" type="password" placeholder="Password" style="margin-top:8px"
                    @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') void this.cloudAuth('in'); }} />
                  ${this.authError ? html`<div style="color:var(--danger);font-size:12px;margin-top:8px">${this.authError}</div>` : ''}
                  <button class="unlock" @click=${() => void this.cloudAuth('in')}>Sign in</button>
                  <button class="guest" @click=${() => void this.cloudAuth('up')}>Create account</button>`
              : html`
                  <input type="password" placeholder="Password" @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') this.phase = 'desktop'; }} />
                  <button class="unlock" @click=${() => (this.phase = 'desktop')}>Unlock</button>
                  <button class="guest" @click=${() => (this.phase = 'desktop')}>Guest Session</button>`}
          </div>
        </div>`;
    }

    const apps = this.kernel.registry.list();
    const pinned = this.kernel.registry.pinned();
    const runningSet = new Set(this.running);
    const q = this.launcherQuery.toLowerCase();
    const launcherApps = apps.filter(
      (a) =>
        (this.launcherCat === 'All' || a.category === this.launcherCat) &&
        (!q || (a.title + (a.description ?? '')).toLowerCase().includes(q)),
    );

    return html`
      <div class="wallpaper"></div>

      <div class="topbar">
        <span class="brand">◈ SEIS OS</span>
        <span style="color:var(--text-dim)">${this.activeApp}</span>
        <div class="center"><b>${this.clock}</b><span>${this.dateStr}</span></div>
        <div class="right">
          <button class="si" title="Tile windows" @click=${() => this.wm.tile()}>⊞</button>
          <button class="si" title="Theme: ${this.theme}" @click=${() => this.cycleTheme()}>${this.themeGlyph()}</button>
          <button class="si" title="Sound" @click=${() => this.pushToast('info', 'Volume: 70%')}>🔊</button>
          <button class="si" title="Network" @click=${() => this.pushToast('info', 'Wi-Fi: SEIS-Net (connected)')}>📶</button>
          <button class="si" title="Battery" @click=${() => this.pushToast('info', 'Battery: 100%')}>🔋</button>
          <button class="si" title="Lock" @click=${() => (this.phase = 'lock')}>⏻</button>
        </div>
      </div>

      <div class="rail">
        ${RAIL.map(
          (it) => html`<button class="${it.app && runningSet.has(it.app) ? 'on' : ''}" title=${it.label} @click=${() => this.railClick(it)}>
            <span class="i">${it.icon}</span><span class="l">${it.label}</span>
          </button>`,
        )}
      </div>

      <div class="windows"></div>

      <div class="dock">
        ${pinned.map(
          (a) => html`<button class="tile ${runningSet.has(a.id) ? 'on' : ''}" style=${`--tint:${a.tint ?? 'var(--accent)'}`} title=${a.title} @click=${() => this.wm.activate(a.id)}>
            ${a.icon}<span class="run"></span>
          </button>`,
        )}
      </div>

      ${this.launcherOpen
        ? html`<div class="launcher" @click=${(e: Event) => { if (e.target === e.currentTarget) this.launcherOpen = false; }}>
            <input class="search" placeholder="Search applications…" .value=${this.launcherQuery}
              @input=${(e: Event) => (this.launcherQuery = (e.target as HTMLInputElement).value)} />
            <div class="cats">
              ${CATS.map((c) => html`<button class="cat ${c === this.launcherCat ? 'on' : ''}" @click=${() => (this.launcherCat = c)}>${c}</button>`)}
            </div>
            <div class="count">${launcherApps.length} apps</div>
            <div class="grid">
              ${launcherApps.map(
                (a) => html`<button class="app" @click=${() => { this.launcherOpen = false; this.wm.activate(a.id); }}>
                  <span class="ico" style=${`--tint:${a.tint ?? 'var(--accent)'}`}>${a.icon}</span>
                  <span class="nm">${a.title}</span>
                </button>`,
              )}
            </div>
          </div>`
        : ''}

      <div class="toasts">${this.toasts.map((t) => html`<div class="toast ${t.level}">${t.message}</div>`)}</div>
    `;
  }
}

customElements.define('seis-desktop', SeisDesktop);
