import type { Settings, ThemeMode } from './types.js';
import type { Persistence } from './persistence.js';

const THEME_KEY = 'theme';
const ACCENT_KEY = 'accent';
const DEFAULT_ACCENT = '#5b8cff';

/** User preferences + theme. Applies theme to <html data-theme> and the --accent token. */
export class SettingsService implements Settings {
  private cache = new Map<string, unknown>();
  private observers = new Map<string, Set<(v: unknown) => void>>();
  private theme: ThemeMode = 'dark';
  private accent = DEFAULT_ACCENT;
  private mql: MediaQueryList | null = null;

  constructor(private store: Persistence) {}

  async init(): Promise<void> {
    this.theme = (await this.store.get<ThemeMode>('kv', THEME_KEY)) ?? 'dark';
    this.accent = (await this.store.get<string>('kv', ACCENT_KEY)) ?? DEFAULT_ACCENT;
    if (typeof matchMedia !== 'undefined') {
      this.mql = matchMedia('(prefers-color-scheme: dark)');
      this.mql.addEventListener?.('change', () => {
        if (this.theme === 'auto') this.applyTheme();
      });
    }
    this.applyTheme();
    this.applyAccent();
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
