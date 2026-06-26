import type { FileSystem } from './types.js';

const DB_NAME = 'seis-os';
const DB_VERSION = 1;
export const STORES = ['kv', 'fs', 'workspaces'] as const;
export type StoreName = (typeof STORES)[number];

/**
 * IndexedDB-backed key/value persistence with an in-memory fallback
 * (private-mode browsers, SSR, tests). All kernel state flows through here.
 */
export class Persistence {
  private db: IDBDatabase | null = null;
  private memory = new Map<string, Map<string, unknown>>();

  async open(): Promise<void> {
    if (typeof indexedDB === 'undefined') return;
    await new Promise<void>((resolve) => {
      let req: IDBOpenDBRequest;
      try {
        req = indexedDB.open(DB_NAME, DB_VERSION);
      } catch {
        resolve();
        return;
      }
      req.onupgradeneeded = () => {
        const db = req.result;
        for (const store of STORES) {
          if (!db.objectStoreNames.contains(store)) db.createObjectStore(store);
        }
      };
      req.onsuccess = () => {
        this.db = req.result;
        resolve();
      };
      req.onerror = () => resolve(); // fall back to memory
    });
  }

  private mem(store: StoreName): Map<string, unknown> {
    let m = this.memory.get(store);
    if (!m) this.memory.set(store, (m = new Map()));
    return m;
  }

  get<T = unknown>(store: StoreName, key: string): Promise<T | undefined> {
    if (!this.db) return Promise.resolve(this.mem(store).get(key) as T | undefined);
    return new Promise((resolve) => {
      const req = this.db!.transaction(store, 'readonly').objectStore(store).get(key);
      req.onsuccess = () => resolve(req.result as T | undefined);
      req.onerror = () => resolve(undefined);
    });
  }

  set<T = unknown>(store: StoreName, key: string, value: T): Promise<void> {
    if (!this.db) {
      this.mem(store).set(key, value);
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const req = this.db!.transaction(store, 'readwrite').objectStore(store).put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  }

  delete(store: StoreName, key: string): Promise<void> {
    if (!this.db) {
      this.mem(store).delete(key);
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const req = this.db!.transaction(store, 'readwrite').objectStore(store).delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  }

  entries<T = unknown>(store: StoreName): Promise<Array<[string, T]>> {
    if (!this.db) return Promise.resolve([...this.mem(store).entries()] as Array<[string, T]>);
    return new Promise((resolve) => {
      const out: Array<[string, T]> = [];
      const req = this.db!.transaction(store, 'readonly').objectStore(store).openCursor();
      req.onsuccess = () => {
        const cur = req.result;
        if (cur) {
          out.push([String(cur.key), cur.value as T]);
          cur.continue();
        } else resolve(out);
      };
      req.onerror = () => resolve(out);
    });
  }
}

/** Virtual file system over the persistence 'fs' store. */
export class VirtualFS implements FileSystem {
  /** Optional hook fired after every write (used to sync to the cloud). */
  onWrite: ((path: string, content: string) => void) | null = null;

  constructor(private store: Persistence) {}

  async read(path: string): Promise<string | undefined> {
    return this.store.get<string>('fs', normalize(path));
  }
  async write(path: string, content: string): Promise<void> {
    const p = normalize(path);
    await this.store.set('fs', p, content);
    this.onWrite?.(p, content);
  }
  /** Write many files without firing onWrite (used when hydrating from the cloud). */
  async hydrate(files: Record<string, string>): Promise<void> {
    for (const [path, content] of Object.entries(files)) {
      await this.store.set('fs', normalize(path), content);
    }
  }
  async remove(path: string): Promise<void> {
    return this.store.delete('fs', normalize(path));
  }
  async exists(path: string): Promise<boolean> {
    return (await this.store.get('fs', normalize(path))) !== undefined;
  }
  async list(prefix = '/'): Promise<string[]> {
    const all = await this.store.entries<string>('fs');
    return all
      .map(([k]) => k)
      .filter((k) => k.startsWith(prefix))
      .sort();
  }

  /** Seed default files only if the FS is empty. */
  async seed(files: Record<string, string>): Promise<void> {
    const existing = await this.store.entries('fs');
    if (existing.length > 0) return;
    for (const [path, content] of Object.entries(files)) {
      await this.write(path, content);
    }
  }
}

function normalize(path: string): string {
  if (!path.startsWith('/')) path = '/' + path;
  return path.replace(/\/{2,}/g, '/');
}
