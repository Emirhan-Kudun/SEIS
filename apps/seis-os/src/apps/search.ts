import type { SeisApp } from '../kernel/types.js';

interface AppRef {
  id: string;
  title: string;
  icon: string;
}
const PROVIDERS: Array<{ name: string; icon: string; url: string }> = [
  { name: 'GitHub', icon: '', url: 'https://github.com/search?q=' },
  { name: 'YouTube', icon: '▶', url: 'https://www.youtube.com/results?search_query=' },
  { name: 'Google', icon: '🔎', url: 'https://www.google.com/search?q=' },
  { name: 'Wikipedia', icon: 'W', url: 'https://en.wikipedia.org/w/index.php?search=' },
  { name: 'npm', icon: '📦', url: 'https://www.npmjs.com/search?q=' },
];

export const searchApp: SeisApp = {
  id: 'search',
  title: 'SEIS Search',
  icon: '⌕',
  tint: '#5b8cff',
  description: 'Unified search',
  category: 'Internet',
  pinned: true,
  capabilities: ['search', 'fs'],
  defaultSize: { w: 760, h: 560 },
  mount(host, ctx) {
    host.innerHTML = `
      <style>
        .se { height: 100%; display: flex; flex-direction: column; align-items: center; font-family: var(--font-sans); padding: 48px 28px 24px; overflow: auto; }
        .se .logo { font-size: 46px; font-weight: 700; letter-spacing: .18em; background: linear-gradient(180deg, var(--text), var(--text-dim)); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .se .tag { color: var(--text-mute); letter-spacing: .24em; text-transform: uppercase; font-size: 11px; margin-top: 6px; }
        .se .box { margin-top: 26px; width: min(560px, 92%); display: flex; gap: 8px; }
        .se .box input { flex: 1; padding: 13px 18px; border-radius: 30px; border: 1px solid var(--border); background: var(--surface-2); color: var(--text); outline: none; font-size: 15px; }
        .se .box input:focus { border-color: var(--accent); }
        .se .prov { display: flex; gap: 10px; margin-top: 18px; flex-wrap: wrap; justify-content: center; }
        .se .prov button { display: flex; align-items: center; gap: 7px; padding: 8px 14px; border-radius: 22px; border: 1px solid var(--border); background: var(--surface); color: var(--text-dim); cursor: pointer; font-size: 13px; }
        .se .prov button:hover { border-color: var(--accent); color: var(--text); }
        .se .results { width: min(560px, 92%); margin-top: 22px; display: flex; flex-direction: column; gap: 6px; }
        .se .r { display: flex; align-items: center; gap: 11px; padding: 10px 12px; border-radius: var(--radius-2); border: 1px solid var(--border); background: var(--surface); cursor: pointer; }
        .se .r:hover { border-color: var(--accent); }
        .se .r .ic { width: 30px; height: 30px; border-radius: 8px; display: grid; place-items: center; background: var(--surface-2); flex: none; }
        .se .r .t { font-size: 13.5px; } .se .r .s { font-size: 11.5px; color: var(--text-mute); }
        .se .r .k { margin-left: auto; font-size: 10px; letter-spacing: .12em; color: var(--text-mute); text-transform: uppercase; }
      </style>
      <div class="se">
        <div class="logo">SEIS</div>
        <div class="tag">Vibes. Code. Ship.</div>
        <div class="box"><input placeholder="Search apps, files, the web…" autofocus /></div>
        <div class="prov"></div>
        <div class="results"></div>
      </div>`;

    const input = host.querySelector<HTMLInputElement>('input')!;
    const provEl = host.querySelector<HTMLElement>('.prov')!;
    const resEl = host.querySelector<HTMLElement>('.results')!;

    PROVIDERS.forEach((p) => {
      const b = document.createElement('button');
      b.innerHTML = `<span>${p.icon || '🔗'}</span>${p.name}`;
      b.addEventListener('click', () => window.open(p.url + encodeURIComponent(input.value || 'SEIS'), '_blank'));
      provEl.appendChild(b);
    });

    function row(icon: string, title: string, sub: string, kind: string, onClick: () => void): void {
      const r = document.createElement('div');
      r.className = 'r';
      r.innerHTML = `<div class="ic">${icon}</div><div><div class="t">${title}</div><div class="s">${sub}</div></div><div class="k">${kind}</div>`;
      r.addEventListener('click', onClick);
      resEl.appendChild(r);
    }

    async function run(q: string): Promise<void> {
      resEl.innerHTML = '';
      q = q.trim();
      if (!q) return;
      const apps = (await ctx.bus.request<undefined, AppRef[]>('apps.list').catch(() => [] as AppRef[])).filter((a) =>
        a.title.toLowerCase().includes(q.toLowerCase()),
      );
      apps.slice(0, 4).forEach((a) => row(a.icon, a.title, 'Open application', 'App', () => ctx.openApp(a.id)));
      const files = (await ctx.fs.list('/')).filter((f) => f.toLowerCase().includes(q.toLowerCase()));
      files.slice(0, 4).forEach((f) => row('📄', f, 'Open in SEIS Code', 'File', () => ctx.openApp('code')));
      row('✳', `Ask SEIS AI: “${q}”`, 'Multi-agent console', 'AI', () => ctx.openApp('ai'));
      row('🔎', `Search the web for “${q}”`, 'Opens Google', 'Web', () => window.open('https://www.google.com/search?q=' + encodeURIComponent(q), '_blank'));
    }
    input.addEventListener('input', () => void run(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) window.open('https://www.google.com/search?q=' + encodeURIComponent(input.value), '_blank');
    });
  },
};
