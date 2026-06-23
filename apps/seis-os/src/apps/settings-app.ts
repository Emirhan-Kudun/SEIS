import type { SeisApp, ThemeMode } from '../kernel/types.js';

export const settingsApp: SeisApp = {
  id: 'settings',
  title: 'Settings',
  icon: '⚙',
  tint: '#8a93a0',
  singleton: true,
  pinned: true,
  capabilities: ['settings'],
  defaultSize: { w: 520, h: 460 },
  mount(host, ctx) {
    const theme = ctx.settings.getTheme();
    const accent = ctx.settings.getAccent();
    host.innerHTML = `
      <style>
        .set { padding: 24px 26px; font-family: var(--font-sans); }
        .set h2 { font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: var(--text-mute); margin: 22px 0 10px; }
        .set h2:first-child { margin-top: 0; }
        .row { display: flex; align-items: center; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid var(--border); }
        .seg { display: inline-flex; background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--radius-2); overflow: hidden; }
        .seg button { padding: 7px 14px; background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 13px; }
        .seg button.on { background: var(--accent); color: #fff; }
        input[type=color] { width: 42px; height: 30px; border: 1px solid var(--border); border-radius: 8px; background: none; cursor: pointer; }
        .danger { margin-top: 26px; padding: 11px 16px; border-radius: var(--radius-2); border: 1px solid var(--danger);
          background: transparent; color: var(--danger); cursor: pointer; font-size: 13px; }
        .danger:hover { background: color-mix(in srgb, var(--danger) 14%, transparent); }
        .label .s { display: block; color: var(--text-mute); font-size: 11.5px; }
      </style>
      <div class="set">
        <h2>Appearance</h2>
        <div class="row">
          <div class="label">Theme <span class="s">Dark-first, with auto</span></div>
          <div class="seg" id="theme">
            <button data-m="dark">Dark</button><button data-m="light">Light</button><button data-m="auto">Auto</button>
          </div>
        </div>
        <div class="row">
          <div class="label">Accent <span class="s">Drives the --accent token</span></div>
          <input type="color" id="accent" value="${accent}">
        </div>
        <h2>Workspace</h2>
        <div class="row">
          <div class="label">Reset SEIS OS <span class="s">Clears files, layout & settings (IndexedDB)</span></div>
        </div>
        <button class="danger" id="reset">Reset workspace…</button>
      </div>`;

    const seg = host.querySelector('#theme')!;
    const paint = (m: ThemeMode) =>
      seg.querySelectorAll<HTMLButtonElement>('button').forEach((b) => b.classList.toggle('on', b.dataset.m === m));
    paint(theme);
    seg.querySelectorAll<HTMLButtonElement>('button').forEach((b) =>
      b.addEventListener('click', () => {
        const m = b.dataset.m as ThemeMode;
        void ctx.settings.setTheme(m);
        paint(m);
        ctx.notify('success', `Theme set to ${m}`);
      }),
    );
    const color = host.querySelector<HTMLInputElement>('#accent')!;
    color.addEventListener('input', () => void ctx.settings.setAccent(color.value));
    host.querySelector('#reset')!.addEventListener('click', () => {
      if (!confirm('Reset SEIS OS? This clears all local data and reloads.')) return;
      try {
        indexedDB.deleteDatabase('seis-os');
      } catch {
        /* ignore */
      }
      ctx.notify('warn', 'Workspace reset — reloading…');
      setTimeout(() => location.reload(), 600);
    });
  },
};
