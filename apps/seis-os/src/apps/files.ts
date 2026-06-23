import type { SeisApp } from '../kernel/types.js';

export const filesApp: SeisApp = {
  id: 'files',
  title: 'Files',
  icon: '🗂',
  tint: '#46d39a',
  pinned: true,
  capabilities: ['fs'],
  defaultSize: { w: 760, h: 500 },
  mount(host, ctx) {
    host.innerHTML = `
      <style>
        .fm { display: grid; grid-template-columns: 220px 1fr; height: 100%; font-family: var(--font-sans); }
        .fm .side { border-right: 1px solid var(--border); overflow: auto; padding: 8px; }
        .fm .side .new { width: 100%; padding: 8px; border-radius: var(--radius-1); border: 1px dashed var(--border-strong);
          background: none; color: var(--text-dim); cursor: pointer; font-size: 12.5px; margin-bottom: 8px; }
        .fm .side .new:hover { border-color: var(--accent); color: var(--text); }
        .fm .item { display: flex; align-items: center; gap: 8px; padding: 7px 9px; border-radius: var(--radius-1);
          cursor: pointer; font-size: 13px; color: var(--text-dim); }
        .fm .item:hover { background: var(--surface-2); }
        .fm .item.on { background: var(--accent-weak); color: var(--text); }
        .fm .item .x { margin-left: auto; opacity: 0; color: var(--text-mute); }
        .fm .item:hover .x { opacity: 1; }
        .fm .main { display: flex; flex-direction: column; min-width: 0; }
        .fm .bar { height: 36px; display: flex; align-items: center; gap: 10px; padding: 0 14px;
          border-bottom: 1px solid var(--border); font-size: 12.5px; color: var(--text-mute); }
        .fm .bar .save { margin-left: auto; padding: 6px 14px; border-radius: var(--radius-1); border: none;
          background: var(--accent); color: #fff; cursor: pointer; font-size: 12.5px; }
        .fm textarea { flex: 1; border: none; outline: none; resize: none; background: transparent; color: var(--text);
          font-family: var(--font-mono); font-size: 13px; line-height: 1.6; padding: 14px; tab-size: 2; }
        .fm .empty { margin: auto; color: var(--text-mute); font-size: 13px; }
      </style>
      <div class="fm">
        <div class="side"><button class="new">+ New file</button><div class="list"></div></div>
        <div class="main">
          <div class="bar"><span class="path">No file open</span><button class="save" hidden>Save</button></div>
          <textarea spellcheck="false" hidden></textarea>
          <div class="empty">Select a file to edit, or create one.</div>
        </div>
      </div>`;

    const listEl = host.querySelector<HTMLElement>('.list')!;
    const ta = host.querySelector<HTMLTextAreaElement>('textarea')!;
    const pathEl = host.querySelector<HTMLElement>('.path')!;
    const saveBtn = host.querySelector<HTMLButtonElement>('.save')!;
    const emptyEl = host.querySelector<HTMLElement>('.empty')!;
    let current = '';

    async function refresh(): Promise<void> {
      const files = await ctx.fs.list('/');
      listEl.innerHTML = '';
      files.forEach((p) => {
        const row = document.createElement('div');
        row.className = 'item' + (p === current ? ' on' : '');
        row.innerHTML = `<span>📄</span><span>${p}</span><span class="x" title="Delete">✕</span>`;
        row.addEventListener('click', (e) => {
          if ((e.target as HTMLElement).classList.contains('x')) {
            void del(p);
            return;
          }
          void openFile(p);
        });
        listEl.appendChild(row);
      });
    }
    async function openFile(p: string): Promise<void> {
      current = p;
      ta.value = (await ctx.fs.read(p)) ?? '';
      ta.hidden = false;
      emptyEl.hidden = true;
      saveBtn.hidden = false;
      pathEl.textContent = p;
      void refresh();
    }
    async function del(p: string): Promise<void> {
      await ctx.fs.remove(p);
      if (current === p) {
        current = '';
        ta.hidden = true;
        emptyEl.hidden = false;
        saveBtn.hidden = true;
        pathEl.textContent = 'No file open';
      }
      ctx.notify('info', `Deleted ${p}`);
      void refresh();
    }
    saveBtn.addEventListener('click', async () => {
      if (!current) return;
      await ctx.fs.write(current, ta.value);
      ctx.notify('success', `Saved ${current}`);
    });
    host.querySelector('.new')!.addEventListener('click', async () => {
      const name = prompt('New file path:', '/untitled.txt');
      if (!name) return;
      const p = name.startsWith('/') ? name : '/' + name;
      await ctx.fs.write(p, '');
      await openFile(p);
    });

    void refresh();
  },
};
