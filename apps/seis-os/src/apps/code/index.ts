import type { SeisApp } from '../../kernel/types.js';
import { EditorHost, langOf } from './editor.js';
import { Terminal } from './terminal.js';

const SAMPLE = `// Click ▶ Run (or type "run /app.js" in the terminal) to execute.
function fib(n) { return n < 2 ? n : fib(n - 1) + fib(n - 2); }
for (let i = 0; i < 8; i++) console.log('fib', i, '=', fib(i));
console.log('done ✓');
`;

export const codeApp: SeisApp = {
  id: 'code',
  title: 'SEIS Code',
  icon: '⌘',
  tint: '#5b8cff',
  description: 'Editor · terminal · AI',
  pinned: true,
  capabilities: ['fs', 'ai'],
  defaultSize: { w: 920, h: 600 },
  mount(host, ctx) {
    host.innerHTML = `
      <style>
        .ide { display: grid; grid-template-columns: 190px 1fr; height: 100%; font-family: var(--font-sans); color: var(--text); }
        .ide .ex { border-right: 1px solid var(--border); display: flex; flex-direction: column; min-height: 0; background: color-mix(in srgb, var(--surface-2) 60%, transparent); }
        .ide .ex .h { padding: 9px 12px; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-mute); display: flex; justify-content: space-between; }
        .ide .ex .h button { background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 14px; }
        .ide .ex .h button:hover { color: var(--accent); }
        .ide .ex .list { overflow: auto; flex: 1; }
        .ide .ex .f { display: flex; gap: 7px; padding: 5px 12px; font-size: 13px; color: var(--text-dim); cursor: pointer; white-space: nowrap; }
        .ide .ex .f:hover { background: var(--surface-2); }
        .ide .ex .f.on { background: var(--accent-weak); color: var(--text); }
        .ide .main { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
        .ide .bar { height: 34px; flex: none; display: flex; align-items: center; gap: 6px; padding: 0 10px; border-bottom: 1px solid var(--border); }
        .ide .bar button { background: none; border: 1px solid var(--border); color: var(--text-dim); cursor: pointer; font-size: 12px; padding: 4px 10px; border-radius: 6px; }
        .ide .bar button:hover { border-color: var(--accent); color: var(--text); }
        .ide .bar .sp { flex: 1; }
        .ide .tabs { height: 33px; flex: none; display: flex; overflow-x: auto; border-bottom: 1px solid var(--border); }
        .ide .tab { display: flex; align-items: center; gap: 7px; padding: 0 11px; font-size: 12.5px; color: var(--text-dim);
          border-right: 1px solid var(--border); cursor: pointer; white-space: nowrap; }
        .ide .tab.on { background: var(--surface); color: var(--text); }
        .ide .tab .x { opacity: .6; }
        .ide .tab .x:hover { opacity: 1; color: var(--danger); }
        .ide .tab .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--text); }
        .ide .ed { flex: 1; min-height: 0; position: relative; }
        .ide .ed .code-fallback { position: absolute; inset: 0; width: 100%; height: 100%; border: none; outline: none; resize: none;
          background: #1e1e1e; color: #ddd; font-family: var(--font-mono); font-size: 13px; line-height: 1.6; padding: 10px 14px; tab-size: 2; }
        .ide .term { height: 220px; flex: none; border-top: 1px solid var(--border); background: #0c0e11; overflow: auto;
          font-family: var(--font-mono); font-size: 12.5px; line-height: 1.5; padding: 8px 10px; }
        .ide .term[hidden] { display: none; }
        .ide .term-out .tline { white-space: pre-wrap; word-break: break-word; }
        .ide .term-line { display: flex; }
        .ide .term-input { flex: 1; background: none; border: none; outline: none; color: var(--text); font-family: var(--font-mono); font-size: 12.5px; }
        .ide .empty { margin: auto; color: var(--text-mute); font-size: 13px; text-align: center; padding-top: 60px; }
        .t-dim { color: var(--text-mute); } .t-err { color: var(--danger); } .t-ok { color: var(--ok); }
        .t-acc { color: var(--accent); } .t-cmd { color: var(--text); } .t-tool { color: var(--ok); }
        .p-user { color: var(--ok); } .p-path { color: var(--accent); } .p-claude { color: #c08cff; }
        .claude-box { border: 1px solid var(--border-strong); border-radius: 6px; padding: 7px 9px; margin: 4px 0; background: rgba(255,255,255,.03); }
      </style>
      <div class="ide">
        <div class="ex">
          <div class="h"><span>Explorer</span><button class="new" title="New file">＋</button></div>
          <div class="list"></div>
        </div>
        <div class="main">
          <div class="bar">
            <button class="save">⌘S Save</button>
            <button class="run">▶ Run</button>
            <button class="ai">✳ AI</button>
            <div class="sp"></div>
            <button class="toggle">⌃\` Terminal</button>
          </div>
          <div class="tabs"></div>
          <div class="ed"><div class="empty">Open a file from the Explorer, or ✳ AI → “create a file app.js”.</div></div>
          <div class="term"></div>
        </div>
      </div>`;

    const exList = host.querySelector<HTMLElement>('.list')!;
    const tabsEl = host.querySelector<HTMLElement>('.tabs')!;
    const edEl = host.querySelector<HTMLElement>('.ed')!;
    const emptyEl = host.querySelector<HTMLElement>('.empty')!;
    const termEl = host.querySelector<HTMLElement>('.term')!;

    const open: string[] = [];
    let current: string | null = null;
    const dirty = new Set<string>();

    const themeName = (): 'dark' | 'light' =>
      document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

    const editor = new EditorHost(edEl);
    editor.onChange = (path) => {
      if (!dirty.has(path)) {
        dirty.add(path);
        renderTabs();
      }
    };

    const runFile = async (path: string): Promise<void> => {
      setTerminal(true);
      term.log('$ node ' + path, 't-cmd');
      const code = open.includes(path) ? editor.value(path) : (await ctx.fs.read(path)) ?? '';
      if (!/\.(js|mjs)$/.test(path)) {
        term.log('Only .js runs in this phase — showing source:', 't-dim');
        term.log(code);
        return;
      }
      const logs: string[] = [];
      const fmt = (v: unknown): string => {
        try {
          return typeof v === 'object' ? JSON.stringify(v) : String(v);
        } catch {
          return String(v);
        }
      };
      const shim = {
        log: (...a: unknown[]) => logs.push(a.map(fmt).join(' ')),
        error: (...a: unknown[]) => logs.push('⛔ ' + a.map(fmt).join(' ')),
        warn: (...a: unknown[]) => logs.push('⚠ ' + a.map(fmt).join(' ')),
        info: (...a: unknown[]) => logs.push(a.map(fmt).join(' ')),
      };
      let err: unknown = null;
      try {
        new Function('console', code)(shim);
      } catch (e) {
        err = e;
      }
      logs.forEach((l) => term.log(l));
      if (err) term.log(String(err), 't-err');
      term.log('[process exited with code ' + (err ? 1 : 0) + ']', 't-dim');
    };

    const term = new Terminal(termEl, ctx, openTab, runFile);

    async function refreshExplorer(): Promise<void> {
      const files = await ctx.fs.list('/');
      exList.innerHTML = '';
      files.forEach((p) => {
        const row = document.createElement('div');
        row.className = 'f' + (p === current ? ' on' : '');
        row.innerHTML = `<span>📄</span><span>${p.replace(/^\//, '')}</span>`;
        row.addEventListener('click', () => void openTab(p));
        exList.appendChild(row);
      });
    }

    function renderTabs(): void {
      tabsEl.innerHTML = '';
      open.forEach((p) => {
        const tab = document.createElement('div');
        tab.className = 'tab' + (p === current ? ' on' : '');
        const name = p.split('/').pop() || p;
        tab.innerHTML = `<span>${name}</span>`;
        const close = document.createElement('span');
        close.className = dirty.has(p) ? 'dot' : 'x';
        close.textContent = dirty.has(p) ? '' : '✕';
        close.addEventListener('click', (e) => {
          e.stopPropagation();
          closeTab(p);
        });
        tab.appendChild(close);
        tab.addEventListener('click', () => void openTab(p));
        tabsEl.appendChild(tab);
      });
    }

    async function openTab(path: string): Promise<void> {
      if (!(await ctx.fs.exists(path))) return;
      if (!open.includes(path)) open.push(path);
      current = path;
      term.openPath = path;
      emptyEl.style.display = 'none';
      const content = (await ctx.fs.read(path)) ?? '';
      editor.open(path, content, langOf(path));
      renderTabs();
      void refreshExplorer();
    }

    function closeTab(path: string): void {
      const i = open.indexOf(path);
      if (i < 0) return;
      open.splice(i, 1);
      dirty.delete(path);
      editor.close(path);
      if (current === path) {
        current = open[Math.max(0, i - 1)] || null;
        if (current) editor.show(current);
        else emptyEl.style.display = '';
      }
      renderTabs();
    }

    async function save(): Promise<void> {
      if (!current) return;
      await ctx.fs.write(current, editor.value(current));
      dirty.delete(current);
      renderTabs();
      void refreshExplorer();
      ctx.notify('success', 'Saved ' + current);
    }

    let termVisible = true;
    function setTerminal(v: boolean): void {
      termVisible = v;
      termEl.hidden = !v;
      if (v) term.focus();
    }

    // toolbar
    host.querySelector('.save')!.addEventListener('click', () => void save());
    host.querySelector('.run')!.addEventListener('click', () => current && void runFile(current));
    host.querySelector('.toggle')!.addEventListener('click', () => setTerminal(!termVisible));
    host.querySelector('.ai')!.addEventListener('click', () => {
      setTerminal(true);
      ctx.notify('info', 'Type a request to Claude, e.g. “create a file app.js”');
      term.focus();
    });
    host.querySelector('.new')!.addEventListener('click', async () => {
      const name = prompt('New file path:', '/untitled.js');
      if (!name) return;
      const p = name.startsWith('/') ? name : '/' + name;
      await ctx.fs.write(p, '');
      await openTab(p);
    });

    // Cmd/Ctrl+S to save (capture so it beats the browser dialog)
    const onKey = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        void save();
      }
    };
    host.addEventListener('keydown', onKey, true);
    ctx.onDispose(() => host.removeEventListener('keydown', onKey, true));

    // theme follows the OS
    const unsub = ctx.settings.observe('theme', () => editor.setTheme(themeName()));
    ctx.onDispose(unsub);
    ctx.onDispose(() => editor.dispose());

    // boot: ensure a runnable sample exists, then open editor + explorer
    void (async () => {
      await editor.init(themeName());
      if (!(await ctx.fs.exists('/app.js'))) await ctx.fs.write('/app.js', SAMPLE);
      await refreshExplorer();
      await openTab('/app.js');
      setTerminal(true);
    })();
  },
};
