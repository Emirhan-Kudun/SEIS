// SEIS Code — editor host. Loads Monaco from CDN with a textarea fallback so
// editing always works (offline / private-mode / CDN blocked).

declare global {
  interface Window {
    monaco?: MonacoApi;
    require?: MonacoRequire;
    MonacoEnvironment?: unknown;
  }
}

interface MonacoRequire {
  (deps: string[], onOk: () => void, onErr?: (e: unknown) => void): void;
  config(opts: { paths: Record<string, string> }): void;
}
// Monaco's surface is large; we only need a sliver, typed loosely.
type MonacoApi = any; // eslint-disable-line @typescript-eslint/no-explicit-any

const MONACO_BASE = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs';
let monacoLoading: Promise<MonacoApi> | null = null;

function loadMonaco(): Promise<MonacoApi> {
  if (window.monaco) return Promise.resolve(window.monaco);
  if (monacoLoading) return monacoLoading;
  monacoLoading = new Promise<MonacoApi>((resolve, reject) => {
    const loader = document.createElement('script');
    loader.src = MONACO_BASE + '/loader.js';
    loader.onload = () => {
      const req = window.require;
      if (!req) return reject(new Error('monaco loader missing'));
      req.config({ paths: { vs: MONACO_BASE } });
      window.MonacoEnvironment = {
        getWorkerUrl: () =>
          'data:text/javascript;charset=utf-8,' +
          encodeURIComponent(
            "self.MonacoEnvironment={baseUrl:'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/'};" +
              "importScripts('" +
              MONACO_BASE +
              "/base/worker/workerMain.js');",
          ),
      };
      req(['vs/editor/editor.main'], () => resolve(window.monaco), reject);
    };
    loader.onerror = () => reject(new Error('monaco failed to load'));
    document.head.appendChild(loader);
  });
  return monacoLoading;
}

const EXT_LANG: Record<string, string> = {
  js: 'javascript', mjs: 'javascript', ts: 'typescript', tsx: 'typescript', jsx: 'javascript',
  json: 'json', html: 'html', css: 'css', scss: 'scss', md: 'markdown', py: 'python', rs: 'rust',
  go: 'go', java: 'java', c: 'c', cpp: 'cpp', sh: 'shell', yml: 'yaml', yaml: 'yaml', sql: 'sql',
  rb: 'ruby', php: 'php', toml: 'ini', xml: 'xml', txt: 'plaintext',
};
export const langOf = (path: string): string =>
  EXT_LANG[(path.split('.').pop() || '').toLowerCase()] || 'plaintext';

interface Model {
  monacoModel?: unknown;
  value: string;
  lang: string;
}

/** Editor abstraction over Monaco (preferred) or a textarea (fallback). */
export class EditorHost {
  mode: 'loading' | 'monaco' | 'textarea' = 'loading';
  onChange: (path: string) => void = () => {};
  current: string | null = null;
  private monaco: MonacoApi = null;
  private editor: MonacoApi = null;
  private ta: HTMLTextAreaElement | null = null;
  private models = new Map<string, Model>();

  constructor(private container: HTMLElement) {}

  async init(theme: 'dark' | 'light'): Promise<void> {
    try {
      this.monaco = await loadMonaco();
      this.mode = 'monaco';
      this.editor = this.monaco.editor.create(this.container, {
        value: '',
        language: 'plaintext',
        theme: theme === 'light' ? 'vs' : 'vs-dark',
        automaticLayout: true,
        fontSize: 13,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        padding: { top: 8 },
      });
      this.editor.onDidChangeModelContent(() => {
        if (this.current) this.onChange(this.current);
      });
    } catch {
      this.startTextarea();
    }
  }

  private startTextarea(): void {
    this.mode = 'textarea';
    const ta = document.createElement('textarea');
    ta.spellcheck = false;
    ta.className = 'code-fallback';
    this.container.appendChild(ta);
    ta.addEventListener('input', () => {
      if (this.current) {
        this.models.get(this.current)!.value = ta.value;
        this.onChange(this.current);
      }
    });
    this.ta = ta;
  }

  setTheme(theme: 'dark' | 'light'): void {
    if (this.mode === 'monaco' && this.monaco) {
      this.monaco.editor.setTheme(theme === 'light' ? 'vs' : 'vs-dark');
    }
  }

  open(path: string, content: string, lang = langOf(path)): void {
    if (!this.models.has(path)) {
      const rec: Model = { value: content, lang };
      if (this.mode === 'monaco') {
        rec.monacoModel = this.monaco.editor.createModel(content, lang);
      }
      this.models.set(path, rec);
    }
    this.show(path);
  }

  show(path: string): void {
    const rec = this.models.get(path);
    if (!rec) return;
    this.current = path;
    if (this.mode === 'monaco') {
      this.editor.setModel(rec.monacoModel);
      this.editor.focus();
    } else if (this.ta) {
      this.ta.value = rec.value;
      this.ta.focus();
    }
  }

  value(path: string): string {
    const rec = this.models.get(path);
    if (!rec) return '';
    if (this.mode === 'monaco' && rec.monacoModel) {
      return (rec.monacoModel as { getValue(): string }).getValue();
    }
    return rec.value;
  }

  close(path: string): void {
    const rec = this.models.get(path);
    if (rec?.monacoModel) (rec.monacoModel as { dispose(): void }).dispose();
    this.models.delete(path);
    if (this.current === path) this.current = null;
  }

  dispose(): void {
    if (this.editor) this.editor.dispose();
  }
}
