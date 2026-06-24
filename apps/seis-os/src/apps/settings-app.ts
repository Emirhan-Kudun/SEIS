import type { SeisApp, ThemeMode } from '../kernel/types.js';
import { WALLPAPERS } from '../kernel/settings.js';

const SECTIONS = ['Appearance', 'Display', 'Sound', 'About'] as const;
type Section = (typeof SECTIONS)[number];

export const settingsApp: SeisApp = {
  id: 'settings',
  title: 'Settings',
  icon: '⚙',
  tint: '#8a93a0',
  description: 'System preferences',
  category: 'System',
  singleton: true,
  pinned: true,
  capabilities: ['settings'],
  defaultSize: { w: 640, h: 480 },
  mount(host, ctx) {
    let section: Section = 'Appearance';
    host.innerHTML = `
      <style>
        .set { display: grid; grid-template-columns: 180px 1fr; height: 100%; font-family: var(--font-sans); }
        .set .nav { border-right: 1px solid var(--border); padding: 10px; background: color-mix(in srgb, var(--surface-2) 50%, transparent); }
        .set .nav button { display: block; width: 100%; text-align: left; background: none; border: none; color: var(--text-dim); cursor: pointer; padding: 9px 11px; border-radius: var(--radius-1); font-size: 13.5px; }
        .set .nav button.on { background: var(--accent-weak); color: var(--text); }
        .set .pane { padding: 22px 26px; overflow: auto; }
        .set h2 { font-size: 19px; margin: 0 0 18px; }
        .set .row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border); }
        .set .label .s { display: block; color: var(--text-mute); font-size: 11.5px; }
        .set .seg { display: inline-flex; background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--radius-2); overflow: hidden; }
        .set .seg button { padding: 7px 13px; background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 13px; }
        .set .seg button.on { background: var(--accent); color: #fff; }
        .set input[type=color] { width: 40px; height: 28px; border: 1px solid var(--border); border-radius: 7px; background: none; }
        .set .accents { display: flex; gap: 8px; }
        .set .accents button { width: 24px; height: 24px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; }
        .set .accents button.on { border-color: var(--text); }
        .set .walls { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 6px; }
        .set .wall { height: 64px; border-radius: var(--radius-2); border: 2px solid var(--border); cursor: pointer; }
        .set .wall.on { border-color: var(--accent); }
        .set .danger { margin-top: 22px; padding: 10px 16px; border: 1px solid var(--danger); color: var(--danger); background: none; border-radius: var(--radius-2); cursor: pointer; }
        .set .danger:hover { background: color-mix(in srgb, var(--danger) 14%, transparent); }
        .set .about b { font-size: 15px; } .set .about .grid { display: grid; grid-template-columns: 120px 1fr; gap: 8px 14px; margin-top: 14px; font-size: 13px; }
        .set .about .k { color: var(--text-mute); }
      </style>
      <div class="set">
        <div class="nav">${SECTIONS.map((s) => `<button data-s="${s}" class="${s === section ? 'on' : ''}">${s}</button>`).join('')}</div>
        <div class="pane"></div>
      </div>`;

    const pane = host.querySelector('.pane') as HTMLElement;
    const accents = ['#5b8cff', '#7c6cff', '#c08cff', '#ff5d9e', '#ff5d5d', '#ffb84d', '#46d39a', '#3ad1c8', '#8a93a0'];

    function render() {
      host.querySelectorAll<HTMLButtonElement>('.nav button').forEach((b) => b.classList.toggle('on', b.dataset.s === section));
      if (section === 'Appearance') {
        const theme = ctx.settings.getTheme();
        const accent = ctx.settings.getAccent();
        pane.innerHTML = `<h2>Appearance</h2>
          <div class="row"><div class="label">Theme <span class="s">Dark-first, with auto</span></div>
            <div class="seg" id="theme">${(['dark', 'light', 'auto'] as ThemeMode[]).map((m) => `<button data-m="${m}" class="${m === theme ? 'on' : ''}">${m[0].toUpperCase() + m.slice(1)}</button>`).join('')}</div></div>
          <div class="row"><div class="label">Accent color</div><div class="accents">${accents.map((a) => `<button data-a="${a}" style="background:${a}" class="${a.toLowerCase() === accent.toLowerCase() ? 'on' : ''}"></button>`).join('')}<input type="color" id="custom" value="${accent}"></div></div>`;
        pane.querySelectorAll<HTMLButtonElement>('#theme button').forEach((b) => b.addEventListener('click', () => { void ctx.settings.setTheme(b.dataset.m as ThemeMode); render(); }));
        pane.querySelectorAll<HTMLButtonElement>('.accents button[data-a]').forEach((b) => b.addEventListener('click', () => { void ctx.settings.setAccent(b.dataset.a!); render(); }));
        (pane.querySelector('#custom') as HTMLInputElement).addEventListener('input', (e) => void ctx.settings.setAccent((e.target as HTMLInputElement).value));
      } else if (section === 'Display') {
        const scale = ctx.settings.getScale();
        const wp = ctx.settings.getWallpaper();
        pane.innerHTML = `<h2>Display</h2>
          <div class="row"><div class="label">Interface scaling</div>
            <div class="seg" id="scale">${[1, 1.25, 1.5].map((s) => `<button data-v="${s}" class="${s === scale ? 'on' : ''}">${s * 100}%</button>`).join('')}</div></div>
          <div class="label" style="margin-top:16px">Wallpaper</div>
          <div class="walls">${WALLPAPERS.map((w) => `<div class="wall ${w.id === wp ? 'on' : ''}" data-w="${w.id}" style="background:${w.css};background-size:cover" title="${w.name}"></div>`).join('')}</div>`;
        pane.querySelectorAll<HTMLButtonElement>('#scale button').forEach((b) => b.addEventListener('click', () => { void ctx.settings.setScale(+b.dataset.v!); render(); }));
        pane.querySelectorAll<HTMLElement>('.wall').forEach((w) => w.addEventListener('click', () => { void ctx.settings.setWallpaper(w.dataset.w!); render(); }));
      } else if (section === 'Sound') {
        pane.innerHTML = `<h2>Sound</h2>
          <div class="row"><div class="label">Output volume</div><input type="range" min="0" max="100" value="70" id="vol"></div>
          <div class="row"><div class="label">System sounds <span class="s">Cosmetic in this build</span></div><div class="seg"><button class="on">On</button><button>Off</button></div></div>`;
        (pane.querySelector('#vol') as HTMLInputElement).addEventListener('change', (e) => ctx.notify('info', 'Volume: ' + (e.target as HTMLInputElement).value + '%'));
      } else {
        pane.innerHTML = `<h2>About</h2>
          <div class="about"><b>◈ SEIS OS</b>
          <div class="grid">
            <span class="k">Version</span><span>0.1.0 · Phase 1</span>
            <span class="k">Kernel</span><span>bus · windows · fs · settings</span>
            <span class="k">Renderer</span><span>Lit + Vite (TypeScript)</span>
            <span class="k">Storage</span><span>IndexedDB (local-first)</span>
            <span class="k">User agent</span><span style="word-break:break-all">${navigator.userAgent.slice(0, 60)}…</span>
          </div>
          <button class="danger" id="reset">Reset SEIS OS…</button></div>`;
        pane.querySelector('#reset')!.addEventListener('click', () => {
          if (!confirm('Reset SEIS OS? This clears all local data and reloads.')) return;
          try { indexedDB.deleteDatabase('seis-os'); } catch { /* ignore */ }
          ctx.notify('warn', 'Resetting — reloading…');
          setTimeout(() => location.reload(), 600);
        });
      }
    }

    host.querySelectorAll<HTMLButtonElement>('.nav button').forEach((b) => b.addEventListener('click', () => { section = b.dataset.s as Section; render(); }));
    render();
  },
};
