import type { Bus } from './types.js';

/** In-memory event/intent bus with pub/sub and single-responder request/response. */
export class EventBus implements Bus {
  private listeners = new Map<string, Set<(payload: unknown) => void>>();
  private responders = new Map<string, (payload: unknown) => unknown>();

  on<T = unknown>(intent: string, handler: (payload: T) => void): () => void {
    let set = this.listeners.get(intent);
    if (!set) this.listeners.set(intent, (set = new Set()));
    set.add(handler as (p: unknown) => void);
    return () => set!.delete(handler as (p: unknown) => void);
  }

  emit<T = unknown>(intent: string, payload?: T): void {
    const set = this.listeners.get(intent);
    if (!set) return;
    for (const handler of [...set]) {
      try {
        handler(payload);
      } catch (err) {
        console.error(`[bus] listener for "${intent}" threw`, err);
      }
    }
  }

  handle<Req = unknown, Res = unknown>(
    intent: string,
    responder: (payload: Req) => Res | Promise<Res>,
  ): () => void {
    this.responders.set(intent, responder as (p: unknown) => unknown);
    return () => {
      if (this.responders.get(intent) === (responder as unknown)) this.responders.delete(intent);
    };
  }

  async request<Req = unknown, Res = unknown>(intent: string, payload?: Req): Promise<Res> {
    const responder = this.responders.get(intent);
    if (!responder) throw new Error(`[bus] no responder registered for "${intent}"`);
    return (await responder(payload)) as Res;
  }
}
