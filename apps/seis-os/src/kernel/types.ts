// SEIS OS — shared kernel types.
// These are the contracts every module/app is built against (the "syscall" surface).

export type Capability =
  | 'fs' | 'ai' | 'search' | 'cloud' | 'market'
  | 'notify' | 'settings' | 'windows' | 'bus';

export type NotifyLevel = 'info' | 'success' | 'warn' | 'error';

export type ThemeMode = 'dark' | 'light' | 'auto';

/** Pub/sub + request/response event bus. The "one product" glue: cross-module
 *  actions are intents, never direct imports. */
export interface Bus {
  on<T = unknown>(intent: string, handler: (payload: T) => void): () => void;
  emit<T = unknown>(intent: string, payload?: T): void;
  /** Register the single responder for a request intent. */
  handle<Req = unknown, Res = unknown>(intent: string, responder: (payload: Req) => Res | Promise<Res>): () => void;
  /** Call a request intent and await its responder. */
  request<Req = unknown, Res = unknown>(intent: string, payload?: Req): Promise<Res>;
}

/** Virtual, persisted file system (IndexedDB-backed, Cloud-syncable later). */
export interface FileSystem {
  read(path: string): Promise<string | undefined>;
  write(path: string, content: string): Promise<void>;
  remove(path: string): Promise<void>;
  exists(path: string): Promise<boolean>;
  list(prefix?: string): Promise<string[]>;
}

export interface Settings {
  get<T = unknown>(key: string, fallback: T): Promise<T>;
  set<T = unknown>(key: string, value: T): Promise<void>;
  observe(key: string, handler: (value: unknown) => void): () => void;
  getTheme(): ThemeMode;
  setTheme(mode: ThemeMode): Promise<void>;
  getAccent(): string;
  setAccent(hex: string): Promise<void>;
}

/** A window/process: one running instance of an app. */
export interface WindowState {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
}

/** Scoped services handed to an app when it mounts. */
export interface AppContext {
  processId: string;
  bus: Bus;
  fs: FileSystem;
  settings: Settings;
  notify(level: NotifyLevel, message: string): void;
  /** Launch (or focus, if singleton) another app by id. */
  openApp(appId: string): void;
  /** Update this window's title bar. */
  setTitle(title: string): void;
  /** Close this window. */
  close(): void;
  /** Register a teardown callback fired when the window closes. */
  onDispose(fn: () => void): void;
}

/** The standard shape of every SEIS application (first-party or plugin). */
export interface SeisApp {
  id: string;
  title: string;
  /** Emoji or short glyph used in dock/launcher. */
  icon: string;
  description?: string;
  /** Accent color for the app's icon tile. */
  tint?: string;
  /** Only one instance may exist at a time. */
  singleton?: boolean;
  /** Show in the dock by default. */
  pinned?: boolean;
  capabilities?: Capability[];
  defaultSize?: { w: number; h: number };
  /** Render the app into the provided content host. */
  mount(host: HTMLElement, ctx: AppContext): void;
}
