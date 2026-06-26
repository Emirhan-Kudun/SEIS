import type { AppContext, SeisApp } from '../kernel/types.js';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const esc = (s: string) => s.replace(/[&<>]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[m] as string);

interface Agent {
  id: string;
  name: string;
  icon: string;
  blurb: string;
}
const AGENTS: Agent[] = [
  { id: 'architect', name: 'Architecture', icon: '◈', blurb: 'Designs systems & plans phases.' },
  { id: 'code', name: 'Code', icon: '⌘', blurb: 'Writes & refactors code in the fs.' },
  { id: 'design', name: 'Design', icon: '✦', blurb: 'Generates UI, tokens & components.' },
  { id: 'research', name: 'Research', icon: '⌕', blurb: 'Gathers & synthesises context.' },
  { id: 'devops', name: 'DevOps', icon: '⚙', blurb: 'Builds, deploys & monitors.' },
  { id: 'security', name: 'Security', icon: '🛡', blurb: 'Audits & hardens.' },
  { id: 'automation', name: 'Automation', icon: '⚡', blurb: 'Wires up repeatable workflows.' },
];

export const aiApp: SeisApp = {
  id: 'ai',
  title: 'SEIS AI',
  icon: '✳',
  tint: '#c08cff',
  description: 'Multi-agent console',
  category: 'Dev Tools',
  pinned: true,
  capabilities: ['ai', 'fs'],
  defaultSize: { w: 860, h: 580 },
  mount(host, ctx) {
    let active = AGENTS[1];
    let busy = false;

    host.innerHTML = `
      <style>
        .ai { display: grid; grid-template-columns: 210px 1fr; height: 100%; font-family: var(--font-sans); }
        .ai .agents { border-right: 1px solid var(--border); overflow: auto; padding: 10px; background: color-mix(in srgb, var(--surface-2) 50%, transparent); }
        .ai .agents .h { font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: var(--text-mute); padding: 4px 8px 8px; }
        .ai .agent { display: flex; gap: 10px; padding: 9px 10px; border-radius: var(--radius-2); cursor: pointer; }
        .ai .agent:hover { background: var(--surface-2); }
        .ai .agent.on { background: var(--accent-weak); }
        .ai .agent .ic { width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; font-size: 16px; background: color-mix(in srgb, var(--accent) 24%, var(--surface-2)); flex: none; }
        .ai .agent .nm { font-size: 13px; font-weight: 600; } .ai .agent .bl { font-size: 11px; color: var(--text-mute); }
        .ai .main { display: flex; flex-direction: column; min-width: 0; }
        .ai .stream { flex: 1; overflow: auto; padding: 18px 20px; display: flex; flex-direction: column; gap: 12px; }
        .ai .msg { max-width: 80%; padding: 10px 13px; border-radius: var(--radius-2); font-size: 13.5px; line-height: 1.6; }
        .ai .msg.user { align-self: flex-end; background: var(--accent); color: #fff; }
        .ai .msg.bot { align-self: flex-start; background: var(--surface-2); border: 1px solid var(--border); white-space: pre-wrap; }
        .ai .tool { align-self: flex-start; font-family: var(--font-mono); font-size: 12px; color: var(--text-dim); border: 1px solid var(--border); border-radius: var(--radius-1); padding: 6px 9px; background: rgba(255,255,255,.03); }
        .ai .tool .ok { color: var(--ok); }
        .ai .greet { margin: auto; text-align: center; color: var(--text-mute); }
        .ai .greet .big { font-size: 30px; color: var(--text); font-weight: 300; margin-bottom: 6px; }
        .ai .composer { flex: none; display: flex; gap: 8px; padding: 12px; border-top: 1px solid var(--border); }
        .ai .composer input { flex: 1; padding: 11px 14px; border-radius: var(--radius-2); border: 1px solid var(--border); background: var(--surface-2); color: var(--text); outline: none; }
        .ai .composer input:focus { border-color: var(--accent); }
        .ai .composer button { padding: 0 18px; border: none; border-radius: var(--radius-2); background: var(--accent); color: #fff; cursor: pointer; font-weight: 600; }
        .ai .chips { display: flex; gap: 6px; padding: 0 12px 10px; flex-wrap: wrap; }
        .ai .chip { font-size: 12px; color: var(--text-dim); border: 1px solid var(--border); border-radius: 16px; padding: 5px 11px; cursor: pointer; background: none; }
        .ai .chip:hover { border-color: var(--accent); color: var(--text); }
      </style>
      <div class="ai">
        <div class="agents"><div class="h">Agents</div></div>
        <div class="main">
          <div class="stream"><div class="greet"><div class="big">✳ SEIS AI</div>Multi-agent console · running locally. Pick an agent and describe a task.</div></div>
          <div class="chips">
            <button class="chip" data-q="Create a file hello.js that prints a greeting">Create hello.js</button>
            <button class="chip" data-q="Review /app.js">Review /app.js</button>
            <button class="chip" data-q="List the files in the workspace">List files</button>
          </div>
          <div class="composer"><input placeholder="Ask the ${active.name} agent…" /><button>Send</button></div>
        </div>
      </div>`;

    const agentsEl = host.querySelector<HTMLElement>('.agents')!;
    const streamEl = host.querySelector<HTMLElement>('.stream')!;
    const input = host.querySelector<HTMLInputElement>('.composer input')!;

    AGENTS.forEach((a) => {
      const row = document.createElement('div');
      row.className = 'agent' + (a.id === active.id ? ' on' : '');
      row.innerHTML = `<div class="ic">${a.icon}</div><div><div class="nm">${a.name}</div><div class="bl">${a.blurb}</div></div>`;
      row.addEventListener('click', () => {
        active = a;
        agentsEl.querySelectorAll('.agent').forEach((n, i) => n.classList.toggle('on', AGENTS[i].id === a.id));
        input.placeholder = `Ask the ${a.name} agent…`;
      });
      agentsEl.appendChild(row);
    });

    function add(cls: string, html: string): HTMLElement {
      const greet = streamEl.querySelector('.greet');
      if (greet) greet.remove();
      const el = document.createElement('div');
      el.className = 'msg ' + cls;
      el.innerHTML = html;
      streamEl.appendChild(el);
      streamEl.scrollTop = streamEl.scrollHeight;
      return el;
    }
    async function streamInto(el: HTMLElement, text: string): Promise<void> {
      for (const tok of text.split(/(\s+)/)) {
        el.innerHTML += esc(tok);
        streamEl.scrollTop = streamEl.scrollHeight;
        await wait(10 + Math.random() * 20);
      }
    }
    async function tool(name: string, arg: string, fn: () => Promise<void>): Promise<void> {
      const greet = streamEl.querySelector('.greet');
      if (greet) greet.remove();
      const el = document.createElement('div');
      el.className = 'tool';
      el.innerHTML = `⛏ ${name}(${esc(arg)}) …`;
      streamEl.appendChild(el);
      streamEl.scrollTop = streamEl.scrollHeight;
      await wait(320);
      try {
        await fn();
      } catch {
        /* ignore */
      }
      el.innerHTML = `⛏ ${name}(${esc(arg)}) <span class="ok">✓</span>`;
    }

    async function send(text: string): Promise<void> {
      if (busy || !text.trim()) return;
      busy = true;
      add('user', esc(text));
      input.value = '';
      await respond(ctx, active, text, { add, streamInto, tool });
      busy = false;
    }

    host.querySelector('.composer button')!.addEventListener('click', () => void send(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') void send(input.value);
    });
    host.querySelectorAll<HTMLButtonElement>('.chip').forEach((c) =>
      c.addEventListener('click', () => void send(c.dataset.q!)),
    );
  },
};

interface Sink {
  add(cls: string, html: string): HTMLElement;
  streamInto(el: HTMLElement, text: string): Promise<void>;
  tool(name: string, arg: string, fn: () => Promise<void>): Promise<void>;
}

async function respond(ctx: AppContext, agent: Agent, prompt: string, sink: Sink): Promise<void> {
  const bot = sink.add('bot', '');
  await sink.streamInto(bot, `(${agent.name}) `);
  const p = prompt.toLowerCase();

  let m = prompt.match(/\b(?:create|make|add)\s+(?:a\s+)?(?:file\s+)?["']?([\w./-]+\.\w+)["']?/i);
  if (m) {
    const path = m[1].startsWith('/') ? m[1] : '/' + m[1];
    await sink.streamInto(bot, `I'll create ${path}.`);
    await sink.tool('Write', path, async () => {
      await ctx.fs.write(path, `// ${path} — scaffolded by the ${agent.name} agent\nconsole.log('hello from ${path}');\n`);
      ctx.openApp('code');
    });
    const done = sink.add('bot', '');
    await sink.streamInto(done, 'Done — open in SEIS Code. Want tests next?');
    return;
  }
  m = prompt.match(/\b(?:read|review|open|show)\s+["']?([\w./-]+)["']?/i);
  if (m) {
    const path = m[1].startsWith('/') ? m[1] : '/' + m[1];
    const content = await ctx.fs.read(path);
    if (content === undefined) {
      await sink.streamInto(bot, `I couldn't find ${path}. Try "list files".`);
      return;
    }
    await sink.streamInto(bot, `Reviewing ${path}…`);
    await sink.tool('Read', path, async () => ctx.openApp('code'));
    const notes: string[] = [];
    if (/\bvar\s/.test(content)) notes.push('prefer const/let over var');
    if (/TODO|FIXME/.test(content)) notes.push('unresolved TODO/FIXME');
    const done = sink.add('bot', '');
    await sink.streamInto(done, notes.length ? 'Notes: ' + notes.join('; ') + '.' : 'Looks clean — no blocking issues.');
    return;
  }
  if (/\b(list|files|workspace)\b/.test(p)) {
    await sink.streamInto(bot, 'Listing the workspace.');
    await sink.tool('Bash', 'ls', async () => {
      const files = await ctx.fs.list('/');
      sink.add('bot', esc(files.join('\n') || '(empty)'));
    });
    return;
  }
  await sink.streamInto(
    bot,
    `As the ${agent.name} agent I can act on this workspace through tool calls. Try "create a file app.js", "review /app.js", or "list files" — every action is real and touches the file system.`,
  );
}
