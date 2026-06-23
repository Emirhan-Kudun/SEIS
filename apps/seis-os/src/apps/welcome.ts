import type { SeisApp } from '../kernel/types.js';

export const welcomeApp: SeisApp = {
  id: 'welcome',
  title: 'Welcome to SEIS',
  icon: '✦',
  tint: '#5b8cff',
  description: 'Start here',
  singleton: true,
  pinned: true,
  defaultSize: { w: 560, h: 440 },
  mount(host, ctx) {
    host.innerHTML = `
      <style>
        .wc { padding: 30px 30px 26px; font-family: var(--font-sans); height: 100%; display: flex; flex-direction: column; }
        .wc h1 { font-size: 30px; font-weight: 300; letter-spacing: .02em; margin: 0; }
        .wc h1 b { font-weight: 600; }
        .wc .v { color: var(--text-mute); font-size: 12px; letter-spacing: .14em; text-transform: uppercase; margin-top: 6px; }
        .wc p { color: var(--text-dim); line-height: 1.7; font-size: 13.5px; margin: 18px 0 0; }
        .wc .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: auto; }
        .wc button { text-align: left; padding: 13px 14px; border-radius: var(--radius-2); border: 1px solid var(--border);
          background: var(--surface-2); color: var(--text); cursor: pointer; transition: all var(--dur-2) var(--ease); }
        .wc button:hover { border-color: var(--accent); transform: translateY(-2px); }
        .wc button .t { font-weight: 600; font-size: 13.5px; display: block; }
        .wc button .s { color: var(--text-mute); font-size: 11.5px; }
      </style>
      <div class="wc">
        <h1>SEIS&nbsp;<b>OS</b></h1>
        <div class="v">Phase 0 · Kernel + Desktop</div>
        <p>An AI-native creative operating system, in your browser. This is the foundation
           layer: a real windowing shell over a service kernel. Open an app to begin.</p>
        <div class="grid">
          <button data-act="launcher"><span class="t">App Launcher</span><span class="s">Browse all apps</span></button>
          <button data-app="files"><span class="t">Files</span><span class="s">Virtual file system</span></button>
          <button data-app="settings"><span class="t">Settings</span><span class="s">Theme &amp; accent</span></button>
          <button data-app="monitor"><span class="t">System Monitor</span><span class="s">Live processes</span></button>
        </div>
      </div>`;
    host.querySelectorAll<HTMLButtonElement>('button[data-app]').forEach((b) =>
      b.addEventListener('click', () => ctx.openApp(b.dataset.app!)),
    );
    host.querySelector('button[data-act="launcher"]')!.addEventListener('click', () =>
      ctx.bus.emit('os.launcher'),
    );
  },
};
