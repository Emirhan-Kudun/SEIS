import type { SeisApp } from './types.js';

/** Holds every installed app (first-party + plugins). Launcher/dock read from here. */
export class AppRegistry {
  private apps = new Map<string, SeisApp>();
  private listeners = new Set<() => void>();

  register(app: SeisApp): void {
    this.apps.set(app.id, app);
    this.listeners.forEach((l) => l());
  }
  unregister(id: string): void {
    this.apps.delete(id);
    this.listeners.forEach((l) => l());
  }
  get(id: string): SeisApp | undefined {
    return this.apps.get(id);
  }
  list(): SeisApp[] {
    return [...this.apps.values()];
  }
  pinned(): SeisApp[] {
    return this.list().filter((a) => a.pinned);
  }
  onChange(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}
