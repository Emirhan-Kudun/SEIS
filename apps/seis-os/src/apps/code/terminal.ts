import type { AppContext } from '../../kernel/types.js';
import { langOf } from './editor.js';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const esc = (s: string) => s.replace(/[&<>]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[m] as string);

/** Styles for the Terminal widget (used by SEIS Code and the standalone Terminal app). */
export const TERM_CSS = `
.term-out .tline{white-space:pre-wrap;word-break:break-word}
.term-line{display:flex}.term-prompt{white-space:pre}
.term-input{flex:1;background:none;border:none;outline:none;color:var(--text);font-family:var(--font-mono);font-size:12.5px}
.t-dim{color:var(--text-mute)}.t-err{color:var(--danger)}.t-ok{color:var(--ok)}
.t-acc{color:var(--accent)}.t-cmd{color:var(--text)}.t-tool{color:var(--ok)}
.p-user{color:var(--ok)}.p-path{color:var(--accent)}.p-claude{color:#c08cff}
.claude-box{border:1px solid var(--border-strong);border-radius:6px;padding:7px 9px;margin:4px 0;background:rgba(255,255,255,.03)}
`;

/** A working terminal over the kernel virtual fs, with a built-in Claude Code
 *  REPL (local mode): streaming replies, tool calls that touch the real fs,
 *  and slash commands. */
export class Terminal {
  private out!: HTMLElement;
  private input!: HTMLInputElement;
  private promptEl!: HTMLElement;
  private history: string[] = [];
  private hIdx = 0;
  private mode: 'shell' | 'claude' = 'shell';
  private model = 'claude-opus-4-8';
  private busy = false;

  constructor(
    private root: HTMLElement,
    private ctx: AppContext,
    private openFile: (path: string) => void,
    private runFile: (path: string) => void | Promise<void>,
  ) {
    this.build();
  }

  private build(): void {
    this.root.innerHTML = `
      <div class="term-out"></div>
      <div class="term-line"><span class="term-prompt"></span><input class="term-input" autocomplete="off" autocapitalize="off" spellcheck="false"></div>`;
    this.out = this.root.querySelector('.term-out')!;
    this.input = this.root.querySelector('.term-input')!;
    this.promptEl = this.root.querySelector('.term-prompt')!;
    this.root.addEventListener('click', () => this.input.focus());
    this.input.addEventListener('keydown', (e) => this.onKey(e));
    this.print('SEIS Code terminal — "help" for commands, "claude" for the AI pair programmer.', 't-dim');
    this.newPrompt();
  }

  private onKey(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      const v = this.input.value;
      this.input.value = '';
      void this.submit(v);
    } else if (e.key === 'ArrowUp' && this.mode === 'shell') {
      e.preventDefault();
      if (this.hIdx > 0) this.input.value = this.history[--this.hIdx] || '';
    } else if (e.key === 'ArrowDown' && this.mode === 'shell') {
      e.preventDefault();
      if (this.hIdx < this.history.length) this.input.value = this.history[++this.hIdx] || '';
    }
  }

  focus(): void {
    this.input.focus();
  }

  private promptHTML(): string {
    return this.mode === 'claude'
      ? '<span class="p-claude">claude ›</span> '
      : '<span class="p-user">seis</span>:<span class="p-path">~</span>$ ';
  }
  private newPrompt(): void {
    this.promptEl.innerHTML = this.promptHTML();
    this.scroll();
    this.input.focus();
  }
  private print(html: string, cls = ''): HTMLElement {
    const d = document.createElement('div');
    d.className = 'tline ' + cls;
    d.innerHTML = html === '' ? '&nbsp;' : html;
    this.out.appendChild(d);
    this.scroll();
    return d;
  }
  private scroll(): void {
    this.root.scrollTop = this.root.scrollHeight;
  }
  clear(): void {
    this.out.innerHTML = '';
    this.newPrompt();
  }

  /** Public: append a plain output line (used by Run). */
  log(text: string, cls = ''): void {
    const d = document.createElement('div');
    d.className = 'tline ' + cls;
    d.textContent = text;
    this.out.appendChild(d);
    this.scroll();
  }

  private async submit(line: string): Promise<void> {
    this.print(this.promptHTML() + '<span class="t-cmd">' + esc(line) + '</span>');
    if (line.trim()) {
      this.history.push(line);
      this.hIdx = this.history.length;
    }
    if (this.mode === 'claude') return this.claude(line.trim());
    await this.exec(line.trim());
  }

  // ---- shell ----
  private async exec(raw: string): Promise<void> {
    if (!raw) return this.newPrompt();
    let redirect: string | null = null;
    let cmdline = raw;
    const rm = raw.match(/^(.*?)\s*>\s*(\S+)\s*$/);
    if (rm) {
      cmdline = rm[1];
      redirect = rm[2];
    }
    const [cmd, ...args] = cmdline.trim().split(/\s+/);
    const fs = this.ctx.fs;
    const p = (a?: string) => (!a ? '/' : a.startsWith('/') ? a : '/' + a);
    let result = '';
    try {
      switch (cmd) {
        case 'help':
          result = [
            'Commands:',
            '  help · ls · cat <f> · echo <t> [> f] · touch <f> · rm <f>',
            '  open <f> · run <f.js> · pwd · date · clear',
            '  claude   — enter the Claude Code REPL (AI pair programmer)',
          ].join('\n');
          break;
        case 'ls': {
          const files = await fs.list('/');
          result = files.length ? files.join('\n') : '(empty)';
          break;
        }
        case 'cat': {
          if (!args[0]) { result = '\x01usage: cat <file>'; break; }
          const c = await fs.read(p(args[0]));
          result = c === undefined ? '\x01cat: no such file: ' + args[0] : c;
          break;
        }
        case 'echo':
          result = args.join(' ').replace(/^["']|["']$/g, '');
          break;
        case 'touch':
          if (!args[0]) { result = '\x01usage: touch <file>'; break; }
          if (!(await fs.exists(p(args[0])))) await fs.write(p(args[0]), '');
          break;
        case 'rm':
          if (!args[0]) { result = '\x01usage: rm <file>'; break; }
          if (!(await fs.exists(p(args[0])))) { result = '\x01rm: no such file'; break; }
          await fs.remove(p(args[0]));
          break;
        case 'open':
          if (!args[0] || !(await fs.exists(p(args[0])))) { result = '\x01open: no such file'; break; }
          this.openFile(p(args[0]));
          result = 'Opened ' + p(args[0]);
          break;
        case 'run':
          if (!args[0] || !(await fs.exists(p(args[0])))) { result = '\x01run: no such file'; break; }
          await this.runFile(p(args[0]));
          this.newPrompt();
          return;
        case 'pwd':
          result = '/';
          break;
        case 'date':
          result = new Date().toString();
          break;
        case 'clear':
          this.clear();
          return;
        case 'claude':
          this.enterClaude();
          return;
        case '':
          break;
        default:
          result = '\x01command not found: ' + cmd + ' — try "help"';
      }
    } catch (err) {
      result = '\x01' + (err as Error).message;
    }
    if (redirect) {
      await fs.write(p(redirect), result.replace(/^\x01/, ''));
      return this.newPrompt();
    }
    if (result === '') return this.newPrompt();
    if (result.startsWith('\x01')) this.print(esc(result.slice(1)), 't-err');
    else this.print(esc(result));
    this.newPrompt();
  }

  // ---- Claude Code REPL (local mode) ----
  private enterClaude(): void {
    this.mode = 'claude';
    const box = document.createElement('div');
    box.className = 'claude-box';
    box.innerHTML =
      '<div class="t-acc">✳ Claude Code</div>' +
      '<div class="t-dim">AI pair programmer · running locally · model ' +
      this.model +
      '</div><div class="t-dim">/help for commands · type <b>exit</b> to leave.</div>';
    this.out.appendChild(box);
    this.newPrompt();
  }
  private leaveClaude(): void {
    this.mode = 'shell';
    this.print('Left Claude Code.', 't-dim');
    this.newPrompt();
  }

  private claude(line: string): void {
    if (this.busy) return;
    if (line === 'exit' || line === 'quit' || line === '/exit') return this.leaveClaude();
    if (line.startsWith('/')) return this.slash(line);
    if (!line) return this.newPrompt();
    void this.respond(line);
  }

  private slash(line: string): void {
    const cmd = line.slice(1).split(/\s+/)[0];
    if (cmd === 'help') {
      this.print(
        ['Slash commands:', '  /help  /clear  /model [name]  /review  /exit'].join('\n'),
        't-dim',
      );
    } else if (cmd === 'clear') {
      this.out.innerHTML = '';
      this.print('Conversation cleared.', 't-dim');
    } else if (cmd === 'model') {
      const n = line.split(/\s+/)[1];
      if (n) {
        this.model = n;
        this.print('Model → ' + n, 't-ok');
      } else this.print('Model: ' + this.model, 't-dim');
    } else if (cmd === 'review') {
      void this.respond('review');
      return;
    } else if (cmd === 'exit') {
      return this.leaveClaude();
    } else {
      this.print('Unknown command: /' + cmd, 't-err');
    }
    this.newPrompt();
  }

  private async respond(prompt: string): Promise<void> {
    this.busy = true;
    const lower = prompt.toLowerCase();
    const thinking = this.print('<span class="t-dim">✳ thinking…</span>');
    await wait(380);
    thinking.remove();

    let m = prompt.match(/\b(?:create|make|new|add)\s+(?:a\s+)?(?:file\s+)?["']?([\w./-]+\.\w+)["']?/i);
    if (m) {
      const path = m[1].startsWith('/') ? m[1] : '/' + m[1];
      await this.stream("I'll create `" + path + '` for you.');
      await this.tool('Write', path, async () => {
        await this.ctx.fs.write(path, scaffold(path));
        this.openFile(path);
      });
      await this.stream('Done — it’s open in the editor. Want tests or wiring next?');
      return this.done();
    }
    m = prompt.match(/\b(?:read|show|open|cat|view)\s+["']?([\w./-]+)["']?/i);
    if (m) {
      const path = m[1].startsWith('/') ? m[1] : '/' + m[1];
      const content = await this.ctx.fs.read(path);
      if (content !== undefined) {
        await this.stream("Here's `" + path + '`:');
        await this.tool('Read', path, async () => {
          this.openFile(path);
          const pre = document.createElement('div');
          pre.className = 'tline t-dim';
          pre.textContent = content.split('\n').slice(0, 14).map((l, i) => String(i + 1).padStart(3) + '  ' + l).join('\n');
          this.out.appendChild(pre);
        });
        await this.stream('Opened in a tab — I can refactor or explain any part.');
      } else {
        await this.stream("I couldn't find `" + m[1] + '`. Try `list` to see the files.');
      }
      return this.done();
    }
    if (/\b(list|ls|files)\b/.test(lower)) {
      await this.stream('Let me look at the workspace.');
      await this.tool('Bash', 'ls', async () => {
        const files = await this.ctx.fs.list('/');
        const pre = document.createElement('div');
        pre.className = 'tline t-dim';
        pre.textContent = files.join('\n') || '(empty)';
        this.out.appendChild(pre);
      });
      await this.stream('Tell me which file to work on.');
      return this.done();
    }
    if (/\breview\b/.test(lower)) {
      const path = this.openPath || '/app.js';
      const c = (await this.ctx.fs.read(path)) || '';
      await this.stream('Reviewing `' + path + '` for clarity, bugs and style.');
      await this.tool('Read', path, async () => {});
      const notes: string[] = [];
      if (/\bvar\s/.test(c)) notes.push('prefer `const`/`let` over `var`');
      if (/[^=!<>]==[^=]/.test(c)) notes.push('use strict equality `===`');
      if (/TODO|FIXME/.test(c)) notes.push('unresolved TODO/FIXME present');
      await this.stream(notes.length ? 'A few notes:\n• ' + notes.join('\n• ') : 'Looks clean — no blocking issues.');
      return this.done();
    }
    await this.stream(generic(prompt));
    return this.done();
  }

  openPath: string | null = null;

  private done(): void {
    this.busy = false;
    this.newPrompt();
  }

  private async stream(text: string): Promise<void> {
    const line = document.createElement('div');
    line.className = 'tline';
    this.out.appendChild(line);
    for (const tok of text.split(/(\s+)/)) {
      line.innerHTML += esc(tok).replace(/`([^`]+)`/g, '<span class="t-acc">$1</span>');
      this.scroll();
      await wait(12 + Math.random() * 22);
    }
  }

  private async tool(name: string, arg: string, effect: () => Promise<void>): Promise<void> {
    const box = document.createElement('div');
    box.className = 'claude-box';
    box.innerHTML = '<span class="t-tool">⛏ ' + name + '</span>(<span class="t-dim">' + esc(arg) + '</span>) <span class="t-dim">…</span>';
    this.out.appendChild(box);
    this.scroll();
    await wait(320);
    try {
      await effect();
    } catch {
      /* ignore */
    }
    box.querySelector('.t-dim:last-child')!.innerHTML = '<span class="t-ok">✓</span>';
  }
}

function scaffold(path: string): string {
  const lang = langOf(path);
  if (lang === 'javascript') return '// ' + path + "\nexport function main() {\n  console.log('hello from " + path.split('/').pop() + "');\n}\n\nmain();\n";
  if (lang === 'python') return "def main():\n    print('hello')\n\nif __name__ == '__main__':\n    main()\n";
  if (lang === 'markdown') return '# ' + (path.split('/').pop() || '').replace(/\.md$/, '') + '\n\nWritten by Claude Code.\n';
  if (lang === 'html') return '<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>\n';
  return '// ' + path + '\n';
}

function generic(prompt: string): string {
  if (/hello|hi|hey/.test(prompt.toLowerCase()))
    return "Hi! I'm Claude Code, your in-editor pair programmer. Ask me to create, read, list, run or review a file — or /help for slash commands.";
  return "I can create, read, list, run and review files in this workspace — every action shows the tool call and touches the real file system. Try `create a file utils.js` or `read /readme.md`.";
}
