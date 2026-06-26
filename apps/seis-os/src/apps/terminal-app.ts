import type { SeisApp } from '../kernel/types.js';
import { Terminal, TERM_CSS } from './code/terminal.js';

export const terminalApp: SeisApp = {
  id: 'terminal',
  title: 'Terminal',
  icon: '⌥',
  tint: '#46d39a',
  category: 'System',
  pinned: true,
  capabilities: ['fs'],
  defaultSize: { w: 700, h: 440 },
  mount(host, ctx) {
    host.innerHTML = `<style>
      .tw { height: 100%; overflow: auto; background: #0c0e11; font-family: var(--font-mono); font-size: 12.5px; line-height: 1.5; padding: 8px 10px; cursor: text; }
      ${TERM_CSS}
    </style><div class="tw"></div>`;
    const root = host.querySelector<HTMLElement>('.tw')!;
    new Terminal(
      root,
      ctx,
      () => ctx.openApp('code'),
      () => ctx.notify('info', 'Use SEIS Code to run files in a sandbox'),
    );
  },
};
