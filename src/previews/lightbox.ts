// Preview "Lightbox" — kind: css. Overlay assoluto confinato dentro il
// proprio stage (mai position:fixed sul viewport reale — COMPONENT_RULES.md:
// "un modulo preview non tocca mai il DOM fuori dal proprio el"). Focus
// trap minimale: il focus si sposta al bottone di chiusura all'apertura e
// torna sulla miniatura che ha aperto l'overlay alla chiusura.
import type { PreviewModule } from '../types/preview';
import './lightbox.css';

const THUMB_COUNT = 3;

let stageEl: HTMLElement | null = null;
let overlayEl: HTMLDivElement | null = null;
let closeBtn: HTMLButtonElement | null = null;
let lastTrigger: HTMLElement | null = null;
const cleanups: Array<() => void> = [];

function open(trigger: HTMLElement): void {
  if (!overlayEl || !closeBtn) return;
  lastTrigger = trigger;
  overlayEl.classList.add('is-open');
  closeBtn.focus();
}

function close(): void {
  if (!overlayEl) return;
  overlayEl.classList.remove('is-open');
  lastTrigger?.focus();
  lastTrigger = null;
}

const lightbox: PreviewModule = {
  mount(el) {
    stageEl = el;
    el.classList.add('lightbox-stage');

    const grid = document.createElement('div');
    grid.className = 'lightbox-grid';

    for (let i = 0; i < THUMB_COUNT; i += 1) {
      const thumb = document.createElement('div');
      thumb.className = 'lightbox-thumb';
      thumb.tabIndex = 0;
      thumb.setAttribute('role', 'button');
      thumb.setAttribute('aria-label', `Apri immagine ${i + 1}`);

      const onActivate = () => open(thumb);
      const onKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onActivate();
        }
      };

      thumb.addEventListener('click', onActivate);
      thumb.addEventListener('keydown', onKeydown);
      cleanups.push(() => {
        thumb.removeEventListener('click', onActivate);
        thumb.removeEventListener('keydown', onKeydown);
      });

      grid.append(thumb);
    }

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    const frame = document.createElement('div');
    frame.className = 'lightbox-frame';

    const close_ = document.createElement('button');
    close_.type = 'button';
    close_.className = 'lightbox-close';
    close_.setAttribute('aria-label', 'Chiudi');
    close_.textContent = '✕';

    const onBackdropClick = (event: MouseEvent) => {
      if (event.target === overlay) close();
    };
    const onCloseClick = () => close();
    const onOverlayKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    overlay.addEventListener('click', onBackdropClick);
    close_.addEventListener('click', onCloseClick);
    overlay.addEventListener('keydown', onOverlayKeydown);
    cleanups.push(() => {
      overlay.removeEventListener('click', onBackdropClick);
      close_.removeEventListener('click', onCloseClick);
      overlay.removeEventListener('keydown', onOverlayKeydown);
    });

    overlay.append(frame, close_);
    overlayEl = overlay;
    closeBtn = close_;

    el.replaceChildren(grid, overlay);
  },

  destroy() {
    for (const cleanup of cleanups.splice(0)) cleanup();
    stageEl?.classList.remove('lightbox-stage');
    stageEl?.replaceChildren();
    stageEl = null;
    overlayEl = null;
    closeBtn = null;
    lastTrigger = null;
  },
};

export default lightbox;
