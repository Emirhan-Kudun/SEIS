import type { Settings, ThemeMode, Wallpaper } from './types.js';
import type { Persistence } from './persistence.js';

const THEME_KEY = 'theme';
const ACCENT_KEY = 'accent';
const WALLPAPER_KEY = 'wallpaper';
const SCALE_KEY = 'scale';
const DEFAULT_ACCENT = '#5b8cff';

export const WALLPAPERS: Wallpaper[] = [
  { id: 'aurora', name: 'Aurora', css: 'radial-gradient(900px 600px at 78% -8%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 60%), radial-gradient(700px 500px at 8% 108%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 55%), linear-gradient(160deg, #0d1014, #090b0e)' },
  { id: 'ember', name: 'Ember', css: 'radial-gradient(800px 600px at 20% 10%, rgba(255,120,60,.30), transparent 55%), radial-gradient(700px 500px at 90% 90%, rgba(190,40,120,.28), transparent 55%), linear-gradient(160deg, #160d12, #0a0709)' },
  { id: 'tide', name: 'Tide', css: 'radial-gradient(820px 600px at 85% 12%, rgba(60,150,255,.30), transparent 58%), radial-gradient(700px 520px at 10% 95%, rgba(60,220,200,.22), transparent 55%), linear-gradient(160deg, #08121c, #060a0f)' },
  { id: 'violet', name: 'Violet', css: 'radial-gradient(820px 600px at 80% 0%, rgba(150,90,255,.32), transparent 58%), radial-gradient(700px 520px at 0% 100%, rgba(255,90,200,.20), transparent 55%), linear-gradient(160deg, #100a1c, #08060f)' },
  { id: 'mono', name: 'Graphite', css: 'radial-gradient(900px 640px at 70% 0%, rgba(120,140,170,.18), transparent 60%), linear-gradient(160deg, #14171c, #0a0c0f)' },
  { id: 'forest', name: 'Forest', css: 'radial-gradient(820px 600px at 80% 6%, rgba(70,210,150,.24), transparent 58%), radial-gradient(700px 520px at 6% 98%, rgba(40,140,110,.20), transparent 55%), linear-gradient(160deg, #0a1410, #06090b)' },
];

/** User preferences + theme. Applies theme to <html data-theme> and the --accent token. */
export class SettingsService implements Settings {
  private cache = new Map<string, unknown>();
  private observers = new Map<string, Set<(v: unknown) => void>>();
  private theme: ThemeMode = 'dark';
  private accent = DEFAULT_ACCENT;
  private wallpaper = 'aurora';
  private scale = 1;
  private mql: MediaQueryList | null = null;

  constructor(private store: Persistence) {}

  async init(): Promise<void> {
    this.theme = (await this.store.get<ThemeMode>('kv', THEME_KEY)) ?? 'dark';
    this.accent = (await this.store.get<string>('kv', ACCENT_KEY)) ?? DEFAULT_ACCENT;
    this.wallpaper = (await this.store.get<string>('kv', WALLPAPER_KEY)) ?? 'aurora';
    this.scale = (await this.store.get<number>('kv', SCALE_KEY)) ?? 1;
    if (typeof matchMedia !== 'undefined') {
      this.mql = matchMedia('(prefers-color-scheme: dark)');
      this.mql.addEventListener?.('change', () => {
        if (this.theme === 'auto') this.applyTheme();
      });
    }
    this.applyTheme();
    this.applyAccent();
    this.applyWallpaper();
    this.applyScale();
  }

  private applyWallpaper(): void {
    const wp = WALLPAPERS.find((w) => w.id === this.wallpaper) ?? WALLPAPERS[0];
    document.documentElement.style.setProperty('--wallpaper', wp.css);
  }
  private applyScale(): void {
    const root = document.getElementById('seis-root');
    if (root) (root.style as CSSStyleDeclaration & { zoom?: string }).zoom = String(this.scale);
  }
  getWallpaper(): string {
    return this.wallpaper;
  }
  async setWallpaper(id: string): Promise<void> {
    this.wallpaper = id;
    await this.store.set('kv', WALLPAPER_KEY, id);
    this.applyWallpaper();
    this.fire(WALLPAPER_KEY, id);
  }
  getScale(): number {
    return this.scale;
  }
  async setScale(scale: number): Promise<void> {
    this.scale = scale;
    await this.store.set('kv', SCALE_KEY, scale);
    this.applyScale();
    this.fire(SCALE_KEY, scale);
  }

  private resolvedTheme(): 'dark' | 'light' {
    if (this.theme === 'auto') return this.mql?.matches === false ? 'light' : 'dark';
    return this.theme;
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.resolvedTheme());
  }
  private applyAccent(): void {
    document.documentElement.style.setProperty('--accent', this.accent);
  }

  getTheme(): ThemeMode {
    return this.theme;
  }
  async setTheme(mode: ThemeMode): Promise<void> {
    this.theme = mode;
    await this.store.set('kv', THEME_KEY, mode);
    this.applyTheme();
    this.fire(THEME_KEY, mode);
  }

  getAccent(): string {
    return this.accent;
  }
  async setAccent(hex: string): Promise<void> {
    this.accent = hex;
    await this.store.set('kv', ACCENT_KEY, hex);
    this.applyAccent();
    this.fire(ACCENT_KEY, hex);
  }

  async get<T = unknown>(key: string, fallback: T): Promise<T> {
    if (this.cache.has(key)) return this.cache.get(key) as T;
    const value = (await this.store.get<T>('kv', key)) ?? fallback;
    this.cache.set(key, value);
    return value;
  }
  async set<T = unknown>(key: string, value: T): Promise<void> {
    this.cache.set(key, value);
    await this.store.set('kv', key, value);
    this.fire(key, value);
  }

  observe(key: string, handler: (value: unknown) => void): () => void {
    let set = this.observers.get(key);
    if (!set) this.observers.set(key, (set = new Set()));
    set.add(handler);
    return () => set!.delete(handler);
  }
  private fire(key: string, value: unknown): void {
    this.observers.get(key)?.forEach((h) => h(value));
  }
}
