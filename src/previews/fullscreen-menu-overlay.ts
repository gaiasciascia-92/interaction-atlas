// Preview "Fullscreen Menu Overlay" — kind: css. La demo è in scala dentro
// lo stage (position:absolute, non fixed sul viewport reale — "mai overlay
// reale sulla pagina", istruzione del curatore + COMPONENT_RULES.md: un
// modulo preview non tocca mai il DOM fuori dal proprio el). Focus trap
// minimale: il focus entra sul bottone di chiusura all'apertura e torna sul
// toggle alla chiusura.
import type { PreviewModule } from '../types/preview';
import './fullscreen-menu-overlay.css';

const LINKS = ['Work', 'Studio', 'Journal', 'Contact'];

let stageEl: HTMLElement | null = null;
let overlayEl: HTMLDivElement | null = null;
let toggleBtn: HTMLButtonElement | null = null;
const cleanups: Array<() => void> = [];

function setOpen(open: boolean): void {
  if (!overlayEl || !toggleBtn) return;
  overlayEl.classList.toggle('is-open', open);
  toggleBtn.setAttribute('aria-expanded', String(open));
  if (open) {
    overlayEl.querySelector<HTMLElement>('.fullscreen-menu-overlay-close')?.focus();
  } else {
    toggleBtn.focus();
  }
}

const fullscreenMenuOverlay: PreviewModule = {
  mount(el) {
    stageEl = el;
    el.classList.add('fullscreen-menu-overlay-stage');

    const page = document.createElement('div');
    page.className = 'fullscreen-menu-overlay-page';

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'fullscreen-menu-overlay-toggle text-small';
    toggle.textContent = 'Menu';
    toggle.setAttribute('aria-expanded', 'false');

    const line1 = document.createElement('div');
    line1.className = 'fullscreen-menu-overlay-line';
    const line2 = document.createElement('div');
    line2.className = 'fullscreen-menu-overlay-line is-short';
    page.append(toggle, line1, line2);

    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-menu-overlay-panel';

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'fullscreen-menu-overlay-close';
    close.setAttribute('aria-label', 'Chiudi il menu');
    close.textContent = '✕';

    const nav = document.createElement('nav');
    nav.className = 'fullscreen-menu-overlay-nav';
    nav.setAttribute('aria-label', 'Menu di esempio');
    for (const label of LINKS) {
      const item = document.createElement('div');
      item.className = 'fullscreen-menu-overlay-link text-h3';
      item.textContent = label;
      nav.append(item);
    }

    overlay.append(close, nav);

    const onToggleClick = () => setOpen(!overlay.classList.contains('is-open'));
    const onCloseClick = () => setOpen(false);
    const onOverlayKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    toggle.addEventListener('click', onToggleClick);
    close.addEventListener('click', onCloseClick);
    overlay.addEventListener('keydown', onOverlayKeydown);
    cleanups.push(() => {
      toggle.removeEventListener('click', onToggleClick);
      close.removeEventListener('click', onCloseClick);
      overlay.removeEventListener('keydown', onOverlayKeydown);
    });

    overlayEl = overlay;
    toggleBtn = toggle;
    el.replaceChildren(page, overlay);
  },

  destroy() {
    for (const cleanup of cleanups.splice(0)) cleanup();
    stageEl?.classList.remove('fullscreen-menu-overlay-stage');
    stageEl?.replaceChildren();
    stageEl = null;
    overlayEl = null;
    toggleBtn = null;
  },
};

export default fullscreenMenuOverlay;
