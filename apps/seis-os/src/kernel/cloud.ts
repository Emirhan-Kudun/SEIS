// SEIS OS — Cloud service: real backend (Supabase: auth + Postgres file sync)
// with a local-first fallback so the OS builds and runs with no backend configured.

export interface CloudUser {
  id: string;
  email?: string;
}
export interface Session {
  user: CloudUser | null;
}

export interface Cloud {
  readonly mode: 'local' | 'supabase';
  isConfigured(): boolean;
  init(): Promise<void>;
  getSession(): Session;
  signIn(email: string, password: string): Promise<{ error?: string }>;
  signUp(email: string, password: string): Promise<{ error?: string }>;
  signOut(): Promise<void>;
  onAuth(cb: (s: Session) => void): () => void;
  /** Pull the user's files from the backend (path → content), or null if none/local. */
  pullFiles(): Promise<Record<string, string> | null>;
  /** Push a single file change to the backend (no-op when local). */
  pushFile(path: string, content: string): Promise<void>;
}

function readEnv(): Record<string, string | undefined> {
  try {
    return (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
  } catch {
    return {};
  }
}

/** Local-first fallback — no network, no auth. The OS works fully offline. */
class LocalCloud implements Cloud {
  readonly mode = 'local' as const;
  private session: Session = { user: null };
  private subs = new Set<(s: Session) => void>();
  isConfigured(): boolean {
    return false;
  }
  async init(): Promise<void> {}
  getSession(): Session {
    return this.session;
  }
  async signIn(email: string): Promise<{ error?: string }> {
    this.session = { user: { id: 'local', email } };
    this.subs.forEach((c) => c(this.session));
    return {};
  }
  async signUp(email: string): Promise<{ error?: string }> {
    return this.signIn(email);
  }
  async signOut(): Promise<void> {
    this.session = { user: null };
    this.subs.forEach((c) => c(this.session));
  }
  onAuth(cb: (s: Session) => void): () => void {
    this.subs.add(cb);
    return () => this.subs.delete(cb);
  }
  async pullFiles(): Promise<Record<string, string> | null> {
    return null;
  }
  async pushFile(): Promise<void> {}
}

/** Supabase-backed cloud: real email/password auth + per-user file sync (Postgres).
 *  The client is lazy-loaded so it never weighs down the base bundle. */
class SupabaseCloud implements Cloud {
  readonly mode = 'supabase' as const;
  private client: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
  private session: Session = { user: null };
  private subs = new Set<(s: Session) => void>();

  constructor(private url: string, private anonKey: string) {}

  isConfigured(): boolean {
    return true;
  }

  async init(): Promise<void> {
    const { createClient } = await import('@supabase/supabase-js');
    this.client = createClient(this.url, this.anonKey);
    const { data } = await this.client.auth.getSession();
    this.session = { user: data.session?.user ? { id: data.session.user.id, email: data.session.user.email } : null };
    this.client.auth.onAuthStateChange((_e: string, s: { user?: { id: string; email?: string } } | null) => {
      this.session = { user: s?.user ? { id: s.user.id, email: s.user.email } : null };
      this.subs.forEach((c) => c(this.session));
    });
  }

  getSession(): Session {
    return this.session;
  }

  async signIn(email: string, password: string): Promise<{ error?: string }> {
    const { error } = await this.client.auth.signInWithPassword({ email, password });
    return error ? { error: error.message } : {};
  }
  async signUp(email: string, password: string): Promise<{ error?: string }> {
    const { error } = await this.client.auth.signUp({ email, password });
    return error ? { error: error.message } : {};
  }
  async signOut(): Promise<void> {
    await this.client.auth.signOut();
  }
  onAuth(cb: (s: Session) => void): () => void {
    this.subs.add(cb);
    return () => this.subs.delete(cb);
  }

  async pullFiles(): Promise<Record<string, string> | null> {
    const uid = this.session.user?.id;
    if (!uid) return null;
    const { data, error } = await this.client.from('files').select('path,content').eq('user_id', uid);
    if (error || !data) return null;
    const out: Record<string, string> = {};
    for (const row of data as Array<{ path: string; content: string }>) out[row.path] = row.content;
    return out;
  }
  async pushFile(path: string, content: string): Promise<void> {
    const uid = this.session.user?.id;
    if (!uid) return;
    await this.client.from('files').upsert({ user_id: uid, path, content, updated_at: new Date().toISOString() }, { onConflict: 'user_id,path' });
  }
}

/** Pick the backend from build-time env; falls back to local-first. */
export function createCloud(): Cloud {
  const env = readEnv();
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_ANON_KEY;
  if (url && key) return new SupabaseCloud(url, key);
  return new LocalCloud();
}
