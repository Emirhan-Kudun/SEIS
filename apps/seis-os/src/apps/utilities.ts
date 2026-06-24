import type { SeisApp } from '../kernel/types.js';

// Small shared style for utility apps.
const P = (css: string) =>
  `<style>.u{height:100%;padding:16px 18px;font-family:var(--font-sans);color:var(--text);overflow:auto}
   .u h3{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--text-mute);margin:0 0 10px}
   .u input,.u textarea,.u select{background:var(--surface-2);border:1px solid var(--border);color:var(--text);border-radius:var(--radius-1);padding:8px 10px;outline:none;font-family:inherit}
   .u input:focus,.u textarea:focus{border-color:var(--accent)}
   .u button{background:var(--surface-2);border:1px solid var(--border);color:var(--text);border-radius:var(--radius-1);padding:8px 12px;cursor:pointer}
   .u button:hover{border-color:var(--accent)}
   .u .row{display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap}
   .u .big{font-size:34px;font-variant-numeric:tabular-nums}
   .u .mono{font-family:var(--font-mono)}
   ${css}</style>`;

const calculator: SeisApp = {
  id: 'calculator', title: 'Calculator', icon: '🧮', tint: '#ffb84d', category: 'Utilities', singleton: true, defaultSize: { w: 280, h: 400 },
  mount(host) {
    host.innerHTML = P(`.calc{display:flex;flex-direction:column;height:100%}.disp{text-align:right;font-size:34px;padding:14px 8px;min-height:60px;word-break:break-all}
      .keys{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;flex:1}.keys button{font-size:18px;border-radius:var(--radius-2)}
      .keys .op{background:color-mix(in srgb,var(--accent) 24%,var(--surface-2))}.keys .eq{background:var(--accent);color:#fff}`) +
      `<div class="u"><div class="calc"><div class="disp">0</div><div class="keys"></div></div></div>`;
    const disp = host.querySelector('.disp') as HTMLElement;
    const keys = host.querySelector('.keys') as HTMLElement;
    let expr = '';
    const upd = () => (disp.textContent = expr || '0');
    const layout = ['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '0', '.', '='];
    const ops = new Set(['÷', '×', '−', '+']);
    layout.forEach((k) => {
      const b = document.createElement('button');
      b.textContent = k;
      if (ops.has(k)) b.className = 'op';
      if (k === '=') b.className = 'eq';
      b.addEventListener('click', () => {
        if (k === 'C') expr = '';
        else if (k === '±') expr = expr.startsWith('-') ? expr.slice(1) : '-' + expr;
        else if (k === '=') {
          try {
            const e = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/%/g, '/100');
            if (/[^0-9.+\-*/() ]/.test(e)) throw new Error('bad');
            const v = Function('return (' + e + ')')() as number;
            expr = String(Math.round(v * 1e10) / 1e10);
          } catch {
            expr = 'Error';
          }
        } else {
          if (expr === 'Error') expr = '';
          expr += k;
        }
        upd();
      });
      keys.appendChild(b);
    });
  },
};

const notes: SeisApp = {
  id: 'notes', title: 'Notes', icon: '📝', tint: '#46d39a', category: 'Productivity', singleton: true, capabilities: ['fs'], defaultSize: { w: 480, h: 420 },
  mount(host, ctx) {
    host.innerHTML = P(`.note{width:100%;height:calc(100% - 30px);resize:none}`) +
      `<div class="u"><div class="row"><span style="color:var(--text-mute);font-size:12px">Saved to /notes.txt</span><button id="s" style="margin-left:auto">Save</button></div><textarea class="note mono" placeholder="Quick notes…"></textarea></div>`;
    const ta = host.querySelector('.note') as HTMLTextAreaElement;
    void ctx.fs.read('/notes.txt').then((c) => (ta.value = c ?? ''));
    const save = async () => { await ctx.fs.write('/notes.txt', ta.value); ctx.notify('success', 'Notes saved'); };
    host.querySelector('#s')!.addEventListener('click', () => void save());
    ta.addEventListener('keydown', (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); void save(); } });
  },
};

const clock: SeisApp = {
  id: 'clock', title: 'Clock', icon: '🕐', tint: '#5b8cff', category: 'Utilities', singleton: true, defaultSize: { w: 360, h: 240 },
  mount(host, ctx) {
    host.innerHTML = P(`.c{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:6px}
      .c .t{font-size:54px;font-weight:200;font-variant-numeric:tabular-nums}.c .d{color:var(--text-dim);letter-spacing:.1em}`) +
      `<div class="u"><div class="c"><div class="t">--:--:--</div><div class="d"></div></div></div>`;
    const t = host.querySelector('.t') as HTMLElement;
    const d = host.querySelector('.d') as HTMLElement;
    const tick = () => { const n = new Date(); t.textContent = n.toLocaleTimeString(); d.textContent = n.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); };
    tick(); const id = setInterval(tick, 1000); ctx.onDispose(() => clearInterval(id));
  },
};

const calendar: SeisApp = {
  id: 'calendar', title: 'Calendar', icon: '📅', tint: '#c08cff', category: 'Productivity', singleton: true, defaultSize: { w: 420, h: 420 },
  mount(host) {
    host.innerHTML = P(`.cal .grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center}
      .cal .dow{color:var(--text-mute);font-size:11px;padding:4px 0}.cal .cell{padding:8px 0;border-radius:8px}
      .cal .cell.today{background:var(--accent);color:#fff}.cal .cell.muted{color:var(--text-mute);opacity:.4}
      .cal .hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}`) +
      `<div class="u"><div class="cal"><div class="hd"><button id="prev">‹</button><b id="lbl"></b><button id="next">›</button></div><div class="grid" id="g"></div></div></div>`;
    let view = new Date(); view.setDate(1);
    const g = host.querySelector('#g') as HTMLElement;
    const lbl = host.querySelector('#lbl') as HTMLElement;
    const today = new Date();
    function render() {
      lbl.textContent = view.toLocaleDateString([], { month: 'long', year: 'numeric' });
      g.innerHTML = '';
      ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach((d) => { const e = document.createElement('div'); e.className = 'dow'; e.textContent = d; g.appendChild(e); });
      const start = view.getDay(); const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
      for (let i = 0; i < start; i++) g.appendChild(document.createElement('div'));
      for (let d = 1; d <= days; d++) {
        const c = document.createElement('div'); c.className = 'cell'; c.textContent = String(d);
        if (d === today.getDate() && view.getMonth() === today.getMonth() && view.getFullYear() === today.getFullYear()) c.classList.add('today');
        g.appendChild(c);
      }
    }
    host.querySelector('#prev')!.addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); render(); });
    host.querySelector('#next')!.addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); render(); });
    render();
  },
};

const colorPicker: SeisApp = {
  id: 'color', title: 'Color Picker', icon: '🎨', tint: '#ff5d5d', category: 'Creative', singleton: true, defaultSize: { w: 340, h: 320 },
  mount(host, ctx) {
    host.innerHTML = P(`.sw{width:100%;height:90px;border-radius:var(--radius-2);border:1px solid var(--border)}`) +
      `<div class="u"><div class="sw" id="sw"></div><div class="row" style="margin-top:12px"><input type="color" id="c" value="#5b8cff"></div>
      <div class="row mono" id="out"></div></div>`;
    const c = host.querySelector('#c') as HTMLInputElement;
    const sw = host.querySelector('#sw') as HTMLElement;
    const out = host.querySelector('#out') as HTMLElement;
    function upd() {
      const hex = c.value; sw.style.background = hex;
      const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
      out.innerHTML = '';
      [['HEX', hex], ['RGB', `${r}, ${g}, ${b}`]].forEach(([k, v]) => {
        const btn = document.createElement('button'); btn.textContent = `${k}: ${v}`;
        btn.addEventListener('click', () => { void navigator.clipboard?.writeText(String(v)); ctx.notify('success', `Copied ${k}`); });
        out.appendChild(btn);
      });
    }
    c.addEventListener('input', upd); upd();
  },
};

const stopwatch: SeisApp = {
  id: 'stopwatch', title: 'Stopwatch', icon: '⏱', tint: '#46d39a', category: 'Utilities', singleton: true, defaultSize: { w: 340, h: 300 },
  mount(host, ctx) {
    host.innerHTML = P(`.sw2{display:flex;flex-direction:column;align-items:center;gap:14px;justify-content:center;height:100%}`) +
      `<div class="u"><div class="sw2"><div class="big mono" id="t">0.0s</div><div class="row"><button id="se">Start</button><button id="r">Reset</button></div></div></div>`;
    const t = host.querySelector('#t') as HTMLElement;
    let started = 0, acc = 0, id: number | null = null;
    const fmt = (ms: number) => (ms / 1000).toFixed(1) + 's';
    const render = () => (t.textContent = fmt(acc + (started ? Date.now() - started : 0)));
    const se = host.querySelector('#se') as HTMLButtonElement;
    se.addEventListener('click', () => {
      if (started) { acc += Date.now() - started; started = 0; if (id) clearInterval(id); se.textContent = 'Start'; }
      else { started = Date.now(); id = setInterval(render, 100) as unknown as number; se.textContent = 'Stop'; }
    });
    host.querySelector('#r')!.addEventListener('click', () => { acc = 0; started = 0; if (id) clearInterval(id); se.textContent = 'Start'; render(); });
    ctx.onDispose(() => { if (id) clearInterval(id); });
    render();
  },
};

const converter: SeisApp = {
  id: 'converter', title: 'Unit Converter', icon: '📐', tint: '#5b8cff', category: 'Utilities', singleton: true, defaultSize: { w: 380, h: 280 },
  mount(host) {
    const units: Record<string, Record<string, number>> = {
      Length: { m: 1, km: 1000, cm: 0.01, mi: 1609.34, ft: 0.3048 },
      Mass: { g: 1, kg: 1000, lb: 453.592, oz: 28.3495 },
    };
    host.innerHTML = P('') + `<div class="u"><div class="row"><select id="cat"></select></div>
      <div class="row"><input id="v" type="number" value="1" style="width:90px"><select id="from"></select><span>→</span><select id="to"></select></div>
      <div class="big mono" id="res">—</div></div>`;
    const cat = host.querySelector('#cat') as HTMLSelectElement;
    const from = host.querySelector('#from') as HTMLSelectElement;
    const to = host.querySelector('#to') as HTMLSelectElement;
    const v = host.querySelector('#v') as HTMLInputElement;
    const res = host.querySelector('#res') as HTMLElement;
    Object.keys(units).forEach((k) => cat.add(new Option(k, k)));
    function fill() {
      const u = units[cat.value]; from.innerHTML = ''; to.innerHTML = '';
      Object.keys(u).forEach((k) => { from.add(new Option(k, k)); to.add(new Option(k, k)); });
      to.selectedIndex = 1; calc();
    }
    function calc() {
      const u = units[cat.value]; res.textContent = (parseFloat(v.value || '0') * u[from.value] / u[to.value]).toLocaleString(undefined, { maximumFractionDigits: 6 }) + ' ' + to.value;
    }
    cat.addEventListener('change', fill); [from, to, v].forEach((e) => e.addEventListener('input', calc));
    fill();
  },
};

const jsonTool: SeisApp = {
  id: 'json', title: 'JSON Formatter', icon: '{}', tint: '#ffb84d', category: 'Dev Tools', singleton: true, defaultSize: { w: 520, h: 460 },
  mount(host) {
    host.innerHTML = P(`textarea{width:100%;height:calc(100% - 50px)}`) +
      `<div class="u"><div class="row"><button id="f">Format</button><button id="m">Minify</button><span id="st" style="color:var(--text-mute);font-size:12px"></span></div><textarea class="mono" id="t">{"seis":"os","apps":[1,2,3]}</textarea></div>`;
    const t = host.querySelector('#t') as HTMLTextAreaElement;
    const st = host.querySelector('#st') as HTMLElement;
    const go = (min: boolean) => { try { const o = JSON.parse(t.value); t.value = JSON.stringify(o, null, min ? 0 : 2); st.textContent = 'Valid ✓'; st.style.color = 'var(--ok)'; } catch (e) { st.textContent = (e as Error).message; st.style.color = 'var(--danger)'; } };
    host.querySelector('#f')!.addEventListener('click', () => go(false));
    host.querySelector('#m')!.addEventListener('click', () => go(true));
  },
};

const base64Tool: SeisApp = {
  id: 'base64', title: 'Base64', icon: '⠿', tint: '#46d39a', category: 'Dev Tools', singleton: true, defaultSize: { w: 460, h: 380 },
  mount(host) {
    host.innerHTML = P(`textarea{width:100%;height:120px}`) +
      `<div class="u"><h3>Text</h3><textarea class="mono" id="a">Hello SEIS</textarea><div class="row" style="margin:10px 0"><button id="e">Encode ↓</button><button id="d">Decode ↑</button></div><h3>Base64</h3><textarea class="mono" id="b"></textarea></div>`;
    const a = host.querySelector('#a') as HTMLTextAreaElement;
    const b = host.querySelector('#b') as HTMLTextAreaElement;
    host.querySelector('#e')!.addEventListener('click', () => { try { b.value = btoa(unescape(encodeURIComponent(a.value))); } catch { b.value = 'error'; } });
    host.querySelector('#d')!.addEventListener('click', () => { try { a.value = decodeURIComponent(escape(atob(b.value))); } catch { a.value = 'error'; } });
  },
};

const hashTool: SeisApp = {
  id: 'hash', title: 'Hash (SHA-256)', icon: '#', tint: '#c08cff', category: 'Dev Tools', singleton: true, defaultSize: { w: 460, h: 240 },
  mount(host) {
    host.innerHTML = P(`textarea{width:100%;height:70px}.out{word-break:break-all;font-size:12px;margin-top:10px}`) +
      `<div class="u"><textarea class="mono" id="i">SEIS</textarea><div class="row" style="margin-top:8px"><button id="g">Hash</button></div><div class="out mono" id="o"></div></div>`;
    const i = host.querySelector('#i') as HTMLTextAreaElement;
    const o = host.querySelector('#o') as HTMLElement;
    host.querySelector('#g')!.addEventListener('click', async () => {
      if (!crypto?.subtle) { o.textContent = 'crypto.subtle unavailable'; return; }
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(i.value));
      o.textContent = [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, '0')).join('');
    });
  },
};

const uuidTool: SeisApp = {
  id: 'uuid', title: 'UUID', icon: '🆔', tint: '#5b8cff', category: 'Dev Tools', singleton: true, defaultSize: { w: 420, h: 240 },
  mount(host, ctx) {
    host.innerHTML = P(`.list{display:flex;flex-direction:column;gap:6px;margin-top:10px}.list b{font-size:13px}`) +
      `<div class="u"><div class="row"><button id="g">Generate ×5</button></div><div class="list mono" id="l"></div></div>`;
    const l = host.querySelector('#l') as HTMLElement;
    const uuid = () => (crypto?.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16); }));
    const gen = () => { l.innerHTML = ''; for (let i = 0; i < 5; i++) { const id = uuid(); const b = document.createElement('button'); b.textContent = id; b.addEventListener('click', () => { void navigator.clipboard?.writeText(id); ctx.notify('success', 'Copied'); }); l.appendChild(b); } };
    host.querySelector('#g')!.addEventListener('click', gen); gen();
  },
};

const passwordTool: SeisApp = {
  id: 'password', title: 'Password Gen', icon: '🔑', tint: '#ffb84d', category: 'Utilities', singleton: true, defaultSize: { w: 400, h: 260 },
  mount(host, ctx) {
    host.innerHTML = P(`.pw{font-size:18px;word-break:break-all;margin:10px 0}`) +
      `<div class="u"><div class="row">Length <input id="len" type="range" min="8" max="48" value="20"><span id="ln">20</span></div>
      <div class="pw mono" id="pw"></div><div class="row"><button id="g">Generate</button><button id="c">Copy</button></div></div>`;
    const len = host.querySelector('#len') as HTMLInputElement;
    const ln = host.querySelector('#ln') as HTMLElement;
    const pw = host.querySelector('#pw') as HTMLElement;
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*';
    const gen = () => { let s = ''; const n = +len.value; for (let i = 0; i < n; i++) s += chars[Math.floor(Math.random() * chars.length)]; pw.textContent = s; };
    len.addEventListener('input', () => { ln.textContent = len.value; gen(); });
    host.querySelector('#g')!.addEventListener('click', gen);
    host.querySelector('#c')!.addEventListener('click', () => { void navigator.clipboard?.writeText(pw.textContent || ''); ctx.notify('success', 'Copied'); });
    gen();
  },
};

const counter: SeisApp = {
  id: 'counter', title: 'Word Count', icon: '🔢', tint: '#46d39a', category: 'Productivity', singleton: true, defaultSize: { w: 440, h: 360 },
  mount(host) {
    host.innerHTML = P(`textarea{width:100%;height:160px}.stats{display:flex;gap:20px;margin-top:12px}.stats b{display:block;font-size:24px}`) +
      `<div class="u"><textarea id="t" placeholder="Type or paste…"></textarea><div class="stats mono"><div><b id="w">0</b>words</div><div><b id="c">0</b>chars</div><div><b id="l">0</b>lines</div></div></div>`;
    const t = host.querySelector('#t') as HTMLTextAreaElement;
    const upd = () => { const v = t.value; (host.querySelector('#w') as HTMLElement).textContent = String(v.trim() ? v.trim().split(/\s+/).length : 0); (host.querySelector('#c') as HTMLElement).textContent = String(v.length); (host.querySelector('#l') as HTMLElement).textContent = String(v ? v.split('\n').length : 0); };
    t.addEventListener('input', upd); upd();
  },
};

const dice: SeisApp = {
  id: 'dice', title: 'Dice', icon: '🎲', tint: '#ff5d5d', category: 'Media', singleton: true, defaultSize: { w: 320, h: 280 },
  mount(host) {
    host.innerHTML = P(`.r{font-size:60px;text-align:center;margin:10px 0}`) +
      `<div class="u"><div class="row"><select id="d"><option>4</option><option selected>6</option><option>8</option><option>12</option><option>20</option></select><button id="roll">Roll</button></div><div class="r" id="out">—</div></div>`;
    const d = host.querySelector('#d') as HTMLSelectElement;
    const out = host.querySelector('#out') as HTMLElement;
    host.querySelector('#roll')!.addEventListener('click', () => {
      let n = 0; const t = setInterval(() => { out.textContent = String(1 + Math.floor(Math.random() * +d.value)); if (++n > 8) clearInterval(t); }, 60);
    });
  },
};

const markdown: SeisApp = {
  id: 'markdown', title: 'Markdown', icon: '⬇', tint: '#5b8cff', category: 'Dev Tools', singleton: true, defaultSize: { w: 640, h: 480 },
  mount(host) {
    host.innerHTML = P(`.md{display:grid;grid-template-columns:1fr 1fr;gap:12px;height:100%}textarea{width:100%;height:100%}
      .prev{overflow:auto;border:1px solid var(--border);border-radius:var(--radius-1);padding:10px 14px}.prev h1{font-size:22px}.prev h2{font-size:18px}.prev code{background:var(--surface-2);padding:1px 5px;border-radius:4px}`) +
      `<div class="u"><div class="md"><textarea class="mono" id="t"># Hello SEIS\n\nType **markdown** here.\n\n- lists\n- \`code\`\n\n> quotes</textarea><div class="prev" id="p"></div></div></div>`;
    const t = host.querySelector('#t') as HTMLTextAreaElement;
    const p = host.querySelector('#p') as HTMLElement;
    const esc = (s: string) => s.replace(/[&<>]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[m] as string);
    const render = () => {
      p.innerHTML = esc(t.value)
        .replace(/^### (.*)$/gm, '<h3>$1</h3>').replace(/^## (.*)$/gm, '<h2>$1</h2>').replace(/^# (.*)$/gm, '<h1>$1</h1>')
        .replace(/^&gt; (.*)$/gm, '<blockquote style="border-left:3px solid var(--border);padding-left:10px;color:var(--text-dim)">$1</blockquote>')
        .replace(/^[-*] (.*)$/gm, '<li>$1</li>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>')
        .replace(/`(.+?)`/g, '<code>$1</code>').replace(/\n/g, '<br>');
    };
    t.addEventListener('input', render); render();
  },
};

const paint: SeisApp = {
  id: 'paint', title: 'Paint', icon: '🖌', tint: '#c08cff', category: 'Creative', singleton: true, defaultSize: { w: 520, h: 460 },
  mount(host, ctx) {
    host.innerHTML = P(`canvas{border:1px solid var(--border);border-radius:var(--radius-1);background:#fff;touch-action:none;cursor:crosshair;width:100%}`) +
      `<div class="u"><div class="row"><input type="color" id="c" value="#5b8cff"><input type="range" id="s" min="1" max="30" value="4"><button id="clr">Clear</button></div><canvas id="cv" width="460" height="320"></canvas></div>`;
    const cv = host.querySelector('#cv') as HTMLCanvasElement;
    const g = cv.getContext('2d')!;
    const color = host.querySelector('#c') as HTMLInputElement;
    const size = host.querySelector('#s') as HTMLInputElement;
    let drawing = false;
    const pos = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * (cv.width / r.width), y: (e.clientY - r.top) * (cv.height / r.height) }; };
    cv.addEventListener('pointerdown', (e) => { drawing = true; const { x, y } = pos(e); g.beginPath(); g.moveTo(x, y); });
    cv.addEventListener('pointermove', (e) => { if (!drawing) return; const { x, y } = pos(e); g.strokeStyle = color.value; g.lineWidth = +size.value; g.lineCap = 'round'; g.lineTo(x, y); g.stroke(); });
    const stop = () => (drawing = false);
    cv.addEventListener('pointerup', stop); cv.addEventListener('pointerleave', stop);
    host.querySelector('#clr')!.addEventListener('click', () => g.clearRect(0, 0, cv.width, cv.height));
    ctx.onDispose(stop);
  },
};

const browser: SeisApp = {
  id: 'browser', title: 'Web', icon: '🌐', tint: '#5b8cff', category: 'Internet', singleton: true, defaultSize: { w: 720, h: 520 },
  mount(host) {
    const marks = [['GitHub', 'https://github.com'], ['YouTube', 'https://youtube.com'], ['Wikipedia', 'https://wikipedia.org'], ['Hacker News', 'https://news.ycombinator.com'], ['MDN', 'https://developer.mozilla.org'], ['npm', 'https://npmjs.com']];
    host.innerHTML = P(`.addr{display:flex;gap:8px;margin-bottom:16px}.addr input{flex:1;border-radius:20px}
      .start{display:flex;flex-direction:column;align-items:center;gap:18px;padding-top:30px}.start .lg{font-size:40px;letter-spacing:.2em;font-weight:700}
      .bm{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;width:min(420px,90%)}
      .bm a{display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px;border:1px solid var(--border);border-radius:var(--radius-2);color:var(--text);text-decoration:none}
      .bm a:hover{border-color:var(--accent)}.bm .i{font-size:22px}`) +
      `<div class="u"><div class="addr"><input id="a" placeholder="Search or enter URL…"><button id="go">Go</button></div>
      <div class="start"><div class="lg">SEIS Web</div><div style="color:var(--text-mute);font-size:12px">Links open in a new tab</div>
      <div class="bm">${marks.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener"><span class="i">🔖</span>${n}</a>`).join('')}</div></div></div>`;
    const a = host.querySelector('#a') as HTMLInputElement;
    const go = () => { const v = a.value.trim(); if (!v) return; const url = /^https?:\/\//.test(v) ? v : v.includes('.') && !v.includes(' ') ? 'https://' + v : 'https://www.google.com/search?q=' + encodeURIComponent(v); window.open(url, '_blank'); };
    host.querySelector('#go')!.addEventListener('click', go);
    a.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
  },
};

export const utilityApps: SeisApp[] = [
  calculator, notes, clock, calendar, colorPicker, stopwatch, converter, jsonTool,
  base64Tool, hashTool, uuidTool, passwordTool, counter, dice, markdown, paint, browser,
];
