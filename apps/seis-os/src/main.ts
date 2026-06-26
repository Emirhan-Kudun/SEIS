import './design/tokens.css';
import './design/global.css';
import { Kernel } from './kernel/kernel.js';
import { SeisDesktop } from './shell/seis-desktop.js';

/** Boot SEIS OS: bring up the kernel, then mount the desktop shell. */
async function boot(): Promise<void> {
  const kernel = new Kernel();
  await kernel.init();

  const desktop = new SeisDesktop();
  desktop.kernel = kernel;

  const root = document.getElementById('seis-root');
  if (!root) throw new Error('SEIS root element missing');
  root.appendChild(desktop);
}

void boot();
