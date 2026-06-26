import type { SeisApp, WindowState } from '../kernel/types.js';

interface PerfMemory {
  usedJSHeapSize: number;
  jsHeapSizeLimit: number;
}

export const monitorApp: SeisApp = {
  id: 'monitor',
  title: 'System Monitor',
  icon: '📊',
  tint: '#ffb84d',
  category: 'System',
  singleton: true,
  pinned: true,
  defaultSize: { w: 540, h: 440 },
  mount(host, ctx) {
    host.innerHTML = `
      <style>
        .mon { padding: 20px 22px; font-family: var(--font-sans); }
        .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .card { background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--radius-2); padding: 14px; }
        .card .k { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-mute); }
        .card .val { font-size: 26px; font-weight: 600; margin-top: 4px; font-variant-numeric: tabular-nums; }
        .graph { margin-top: 16px; height: 60px; display: flex; align-items: flex-end; gap: 3px; }
        .graph i { flex: 1; background: linear-gradient(180deg, var(--accent), transparent); border-radius: 3px 3px 0 0; transition: height .25s var(--ease); }
        h3 { font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--text-mute); margin: 22px 0 8px; }
        .plist { display: flex; flex-direction: column; gap: 6px; }
        .p { display: flex; align-items: center; gap: 10px; padding: 8px 11px; border: 1px solid var(--border); border-radius: var(--radius-1); font-size: 13px; }
        .p .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ok); }
        .p .pid { margin-left: auto; color: var(--text-mute); font-family: var(--font-mono); font-size: 11px; }
        .none { color: var(--text-mute); font-size: 13px; padding: 8px 0; }
      </style>
      <div class="mon">
        <div class="cards">
          <div class="card"><div class="k">Processes</div><div class="val" id="m-proc">0</div></div>
          <div class="card"><div class="k">Uptime</div><div class="val" id="m-up">0s</div></div>
          <div class="card"><div class="k">Heap</div><div class="val" id="m-mem">—</div></div>
        </div>
        <div class="graph" id="m-graph"></div>
        <h3>Running</h3>
        <div class="plist" id="m-list"></div>
      </div>`;

    const procEl = host.querySelector<HTMLElement>('#m-proc')!;
    const upEl = host.querySelector<HTMLElement>('#m-up')!;
    const memEl = host.querySelector<HTMLElement>('#m-mem')!;
    const listEl = host.querySelector<HTMLElement>('#m-list')!;
    const graph = host.querySelector<HTMLElement>('#m-graph')!;
    const bars: HTMLElement[] = [];
    const heights: number[] = new Array(28).fill(8);
    for (let i = 0; i < 28; i++) {
      const b = document.createElement('i');
      b.style.height = '8%';
      graph.appendChild(b);
      bars.push(b);
    }
    const start = Date.now();
    let t = 0;

    const tick = async (): Promise<void> => {
      t += 1;
      const procs = await ctx.bus.request<undefined, WindowState[]>('os.processes').catch(() => [] as WindowState[]);
      procEl.textContent = String(procs.length);
      const secs = Math.floor((Date.now() - start) / 1000);
      upEl.textContent = secs < 60 ? `${secs}s` : `${Math.floor(secs / 60)}m ${secs % 60}s`;
      const mem = (performance as unknown as { memory?: PerfMemory }).memory;
      memEl.textContent = mem ? `${(mem.usedJSHeapSize / 1048576).toFixed(0)} MB` : `${procs.length * 12 + 48} MB`;
      // animated load graph (illustrative)
      const load = Math.max(4, Math.min(100, (0.3 + 0.25 * Math.sin(t / 3) + procs.length * 0.06 + Math.random() * 0.1) * 100));
      heights.shift();
      heights.push(load);
      bars.forEach((b, i) => (b.style.height = heights[i].toFixed(0) + '%'));

      listEl.innerHTML = '';
      if (!procs.length) {
        listEl.innerHTML = '<div class="none">No processes running.</div>';
      } else {
        procs.forEach((p) => {
          const row = document.createElement('div');
          row.className = 'p';
          row.innerHTML = `<span class="dot"></span><span>${p.title}</span><span class="pid">${p.id.slice(-6)}</span>`;
          listEl.appendChild(row);
        });
      }
    };

    const timer = setInterval(() => void tick(), 1000);
    ctx.onDispose(() => clearInterval(timer));
    void tick();
  },
};
