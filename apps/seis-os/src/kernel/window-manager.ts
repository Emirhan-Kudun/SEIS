import type { AppContext, NotifyLevel, SeisApp, WindowState } from './types.js';
import type { AppRegistry } from './registry.js';
import type { Persistence } from './persistence.js';
import type { EventBus } from './bus.js';
import type { SettingsService } from './settings.js';
import type { VirtualFS } from './persistence.js';
import { SeisWindow } from '../ui/seis-window.js';

const WORKSPACE_KEY = 'default';

interface Process {
  state: WindowState;
  el: SeisWindow;
  disposers: Array<() => void>;
}

interface WMDeps {
  registry: AppRegistry;
  store: Persistence;
  fs: VirtualFS;
  bus: EventBus;
  settings: SettingsService;
  notify: (level: NotifyLevel, message: string) => void;
  onActiveChange: (appId: string | null) => void;
  onProcessesChange: () => void;
}

let counter = 0;
const uid = () => `win_${Date.now().toString(36)}_${(counter++).toString(36)}`;

/** Owns the window/process lifecycle: open · close · focus · tile, plus
 *  workspace (layout) persistence and restore. */
export class WindowManager {
  private procs = new Map<string, Process>();
  private host!: HTMLElement;
  private topZ = 10;
  private activeId: string | null = null;
  private saveTimer: number | null = null;

  constructor(private deps: WMDeps) {}

  attach(host: HTMLElement): void {
    this.host = host;
  }

  list(): WindowState[] {
    return [...this.procs.values()].map((p) => p.state);
  }

  /** Open an app — or focus its existing window if it is a singleton. */
  open(appId: string, opts: { geometry?: Partial<WindowState> } = {}): string | null {
    const app = this.deps.registry.get(appId);
    if (!app) {
      this.deps.notify('error', `App not found: ${appId}`);
      return null;
    }
    if (app.singleton) {
      const existing = [...this.procs.values()].find((p) => p.state.appId === appId);
      if (existing) {
        this.focus(existing.state.id);
        return existing.state.id;
      }
    }
    const id = uid();
    const size = app.defaultSize ?? { w: 720, h: 480 };
    const cascade = this.procs.size * 28;
    const vw = this.host?.clientWidth || 1200;
    const vh = this.host?.clientHeight || 800;
    const state: WindowState = {
      id,
      appId,
      title: app.title,
      x: clamp(opts.geometry?.x ?? 80 + cascade, 0, Math.max(0, vw - 200)),
      y: clamp(opts.geometry?.y ?? 70 + cascade, 0, Math.max(0, vh - 120)),
      w: opts.geometry?.w ?? size.w,
      h: opts.geometry?.h ?? size.h,
      z: ++this.topZ,
      minimized: opts.geometry?.minimized ?? false,
      maximized: opts.geometry?.maximized ?? false,
    };
    this.spawn(app, state);
    this.persist();
    this.deps.onProcessesChange();
    return id;
  }

  /** Focus the topmost window of an app, or open one if none exist (dock click). */
  activate(appId: string): string | null {
    const existing = [...this.procs.values()]
      .filter((p) => p.state.appId === appId)
      .sort((a, b) => b.state.z - a.state.z)[0];
    if (existing) {
      this.focus(existing.state.id);
      return existing.state.id;
    }
    return this.open(appId);
  }

  private spawn(app: SeisApp, state: WindowState): void {
    const el = new SeisWindow();
    el.winId = state.id;
    el.winTitle = state.title;
    el.icon = app.icon;
    el.setGeometry(state);
    el.active = true;

    const content = document.createElement('div');
    content.style.height = '100%';
    el.appendChild(content);
    this.host.appendChild(el);

    const disposers: Array<() => void> = [];
    const proc: Process = { state, el, disposers };
    this.procs.set(state.id, proc);

    // Wire window chrome events → manager
    el.addEventListener('win-focus', () => this.focus(state.id));
    el.addEventListener('win-close', () => this.close(state.id));
    el.addEventListener('win-min', () => this.minimize(state.id));
    el.addEventListener('win-max', () => this.toggleMaximize(state.id));
    el.addEventListener('win-geom', (e) => {
      const g = (e as CustomEvent<Partial<WindowState>>).detail;
      Object.assign(state, g);
      this.persist();
    });

    // Build the scoped app context and mount.
    const ctx = this.makeContext(state, proc);
    try {
      app.mount(content, ctx);
    } catch (err) {
      console.error(`[wm] app "${app.id}" failed to mount`, err);
      content.innerHTML = `<div style="padding:24px;color:var(--danger)">This app failed to start.</div>`;
    }
    this.focus(state.id);
  }

  private makeContext(state: WindowState, proc: Process): AppContext {
    return {
      processId: state.id,
      bus: this.deps.bus,
      fs: this.deps.fs,
      settings: this.deps.settings,
      notify: (level, message) => this.deps.notify(level, message),
      openApp: (appId) => this.open(appId),
      setTitle: (title) => {
        state.title = title;
        proc.el.winTitle = title;
        if (this.activeId === state.id) this.deps.onActiveChange(state.appId);
        this.persist();
      },
      close: () => this.close(state.id),
      onDispose: (fn) => proc.disposers.push(fn),
    };
  }

  focus(id: string): void {
    const proc = this.procs.get(id);
    if (!proc) return;
    if (proc.state.minimized) {
      proc.state.minimized = false;
      proc.el.minimized = false;
    }
    proc.state.z = ++this.topZ;
    proc.el.z = proc.state.z;
    this.activeId = id;
    for (const p of this.procs.values()) p.el.active = p.state.id === id;
    this.deps.onActiveChange(proc.state.appId);
    this.deps.onProcessesChange();
  }

  close(id: string): void {
    const proc = this.procs.get(id);
    if (!proc) return;
    proc.disposers.forEach((d) => {
      try {
        d();
      } catch {
        /* ignore */
      }
    });
    proc.el.remove();
    this.procs.delete(id);
    if (this.activeId === id) {
      const next = [...this.procs.values()].sort((a, b) => b.state.z - a.state.z)[0];
      this.activeId = next?.state.id ?? null;
      if (next) this.focus(next.state.id);
      else this.deps.onActiveChange(null);
    }
    this.persist();
    this.deps.onProcessesChange();
  }

  minimize(id: string): void {
    const proc = this.procs.get(id);
    if (!proc) return;
    proc.state.minimized = true;
    proc.el.minimized = true;
    if (this.activeId === id) {
      this.activeId = null;
      this.deps.onActiveChange(null);
    }
    this.persist();
    this.deps.onProcessesChange();
  }

  toggleMaximize(id: string): void {
    const proc = this.procs.get(id);
    if (!proc) return;
    proc.state.maximized = !proc.state.maximized;
    proc.el.maximized = proc.state.maximized;
    this.focus(id);
    this.persist();
  }

  /** Arrange all visible windows in a tidy grid. */
  tile(): void {
    const visible = [...this.procs.values()].filter((p) => !p.state.minimized);
    if (!visible.length) return;
    const cols = Math.ceil(Math.sqrt(visible.length));
    const rows = Math.ceil(visible.length / cols);
    const pad = 12;
    const top = 40;
    const vw = this.host.clientWidth;
    const vh = this.host.clientHeight - top - 86; // leave room for dock
    const cw = (vw - pad * (cols + 1)) / cols;
    const ch = (vh - pad * (rows + 1)) / rows;
    visible.forEach((p, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      p.state.maximized = false;
      p.el.maximized = false;
      Object.assign(p.state, {
        x: pad + c * (cw + pad),
        y: top + pad + r * (ch + pad),
        w: cw,
        h: ch,
      });
      p.el.setGeometry(p.state);
    });
    this.persist();
  }

  closeAll(): void {
    [...this.procs.keys()].forEach((id) => this.close(id));
  }

  // ---- workspace persistence ----
  private persist(): void {
    if (this.saveTimer) clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => {
      const layout = this.list().map(({ ...s }) => s);
      void this.deps.store.set('workspaces', WORKSPACE_KEY, layout);
    }, 200) as unknown as number;
  }

  async restore(): Promise<void> {
    const layout = await this.deps.store.get<WindowState[]>('workspaces', WORKSPACE_KEY);
    if (!layout || !layout.length) return;
    for (const s of layout.sort((a, b) => a.z - b.z)) {
      if (!this.deps.registry.get(s.appId)) continue;
      this.open(s.appId, { geometry: s });
    }
  }
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}
