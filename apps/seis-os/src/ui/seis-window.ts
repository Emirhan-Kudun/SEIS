import { LitElement, html, css } from 'lit';
import type { WindowState } from '../kernel/types.js';

type Geometry = Pick<WindowState, 'x' | 'y' | 'w' | 'h'> & Partial<WindowState>;

/** Window chrome: title bar with traffic lights, drag, resize, focus.
 *  Geometry lives here; the WindowManager listens to the events it emits. */
export class SeisWindow extends LitElement {
  static override properties = {
    winTitle: { type: String },
    icon: { type: String },
    x: { type: Number },
    y: { type: Number },
    w: { type: Number },
    h: { type: Number },
    z: { type: Number },
    active: { type: Boolean, reflect: true },
    minimized: { type: Boolean, reflect: true },
    maximized: { type: Boolean, reflect: true },
  };

  winId = '';
  winTitle = 'Untitled';
  icon = '◻';
  x = 80;
  y = 70;
  w = 720;
  h = 480;
  z = 10;
  active = false;
  minimized = false;
  maximized = false;

  private dragging = false;
  private resizing = false;
  private sx = 0;
  private sy = 0;
  private ox = 0;
  private oy = 0;
  private ow = 0;
  private oh = 0;

  static override styles = css`
    :host {
      position: absolute;
      display: flex;
      border-radius: var(--radius-3);
      overflow: hidden;
      background: var(--elev);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-2);
      backdrop-filter: blur(22px) saturate(1.4);
      -webkit-backdrop-filter: blur(22px) saturate(1.4);
      opacity: 0;
      transform: scale(0.98);
      animation: in var(--dur-2) var(--ease) forwards;
      transition: box-shadow var(--dur-2) var(--ease), border-color var(--dur-2) var(--ease);
    }
    @keyframes in { to { opacity: 1; transform: scale(1); } }
    :host([active]) {
      box-shadow: var(--shadow-3);
      border-color: var(--border-strong);
    }
    .frame { display: flex; flex-direction: column; width: 100%; height: 100%; }
    .titlebar {
      height: 38px;
      flex: none;
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: 0 var(--space-3);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent);
      border-bottom: 1px solid var(--border);
      cursor: grab;
      user-select: none;
    }
    .titlebar:active { cursor: grabbing; }
    .lights { display: flex; gap: 8px; }
    .light {
      width: 12px; height: 12px; border-radius: 50%; border: none; padding: 0; cursor: pointer;
      transition: filter var(--dur-1) var(--ease);
    }
    .light:hover { filter: brightness(1.2); }
    .red { background: #ff5f57; }
    .yellow { background: #febc2e; }
    .green { background: #28c840; }
    .title {
      font-size: 12.5px; color: var(--text-dim); font-weight: 500;
      display: flex; align-items: center; gap: 7px; pointer-events: none;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    :host([active]) .title { color: var(--text); }
    .ic { font-size: 14px; }
    .spacer { flex: 1; }
    .body { flex: 1; min-height: 0; overflow: auto; background: var(--surface); color: var(--text); }
    .resize {
      position: absolute; right: 0; bottom: 0; width: 18px; height: 18px;
      cursor: nwse-resize; touch-action: none;
    }
    .resize::after {
      content: ''; position: absolute; right: 3px; bottom: 3px; width: 7px; height: 7px;
      border-right: 2px solid var(--text-mute); border-bottom: 2px solid var(--text-mute); opacity: 0.6;
    }
  `;

  setGeometry(g: Geometry): void {
    this.x = g.x;
    this.y = g.y;
    this.w = g.w;
    this.h = g.h;
    if (g.z != null) this.z = g.z;
    if (g.minimized != null) this.minimized = g.minimized;
    if (g.maximized != null) this.maximized = g.maximized;
  }

  protected override updated(): void {
    this.applyHostStyle();
  }
  protected override firstUpdated(): void {
    this.applyHostStyle();
  }

  private applyHostStyle(): void {
    const s = this.style;
    if (this.maximized) {
      s.left = 'calc(var(--rail-w, 0px) + 8px)';
      s.top = 'calc(var(--menubar-h) + 8px)';
      s.width = 'calc(100% - var(--rail-w, 0px) - 16px)';
      s.height = 'calc(100% - var(--menubar-h) - var(--dock-h) - 24px)';
    } else {
      s.left = this.x + 'px';
      s.top = this.y + 'px';
      s.width = this.w + 'px';
      s.height = this.h + 'px';
    }
    s.zIndex = String(this.z);
    s.display = this.minimized ? 'none' : 'flex';
  }

  private emit(name: string): void {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }
  private emitGeom(): void {
    this.dispatchEvent(
      new CustomEvent('win-geom', {
        bubbles: true,
        composed: true,
        detail: { x: this.x, y: this.y, w: this.w, h: this.h },
      }),
    );
  }

  private onTitleDown = (e: PointerEvent): void => {
    if (this.maximized) return;
    this.emit('win-focus');
    this.dragging = true;
    this.sx = e.clientX;
    this.sy = e.clientY;
    this.ox = this.x;
    this.oy = this.y;
    window.addEventListener('pointermove', this.onMove);
    window.addEventListener('pointerup', this.onUp);
  };

  private onResizeDown = (e: PointerEvent): void => {
    e.stopPropagation();
    this.emit('win-focus');
    this.resizing = true;
    this.sx = e.clientX;
    this.sy = e.clientY;
    this.ow = this.w;
    this.oh = this.h;
    window.addEventListener('pointermove', this.onMove);
    window.addEventListener('pointerup', this.onUp);
  };

  private onMove = (e: PointerEvent): void => {
    if (this.dragging) {
      this.x = this.ox + (e.clientX - this.sx);
      this.y = Math.max(32, this.oy + (e.clientY - this.sy));
      this.applyHostStyle();
    } else if (this.resizing) {
      this.w = Math.max(300, this.ow + (e.clientX - this.sx));
      this.h = Math.max(180, this.oh + (e.clientY - this.sy));
      this.applyHostStyle();
    }
  };

  private onUp = (): void => {
    if (this.dragging || this.resizing) {
      this.dragging = false;
      this.resizing = false;
      this.emitGeom();
    }
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerup', this.onUp);
  };

  private stop(e: Event): void {
    e.stopPropagation();
  }

  protected override render(): unknown {
    return html`
      <div class="frame" @pointerdown=${() => this.emit('win-focus')}>
        <div class="titlebar" @pointerdown=${this.onTitleDown} @dblclick=${() => this.emit('win-max')}>
          <div class="lights">
            <button class="light red" title="Close"
              @pointerdown=${(e: Event) => this.stop(e)} @click=${() => this.emit('win-close')}></button>
            <button class="light yellow" title="Minimize"
              @pointerdown=${(e: Event) => this.stop(e)} @click=${() => this.emit('win-min')}></button>
            <button class="light green" title="Maximize"
              @pointerdown=${(e: Event) => this.stop(e)} @click=${() => this.emit('win-max')}></button>
          </div>
          <div class="title"><span class="ic">${this.icon}</span>${this.winTitle}</div>
          <div class="spacer"></div>
        </div>
        <div class="body"><slot></slot></div>
        <div class="resize" @pointerdown=${this.onResizeDown}></div>
      </div>
    `;
  }
}

customElements.define('seis-window', SeisWindow);
