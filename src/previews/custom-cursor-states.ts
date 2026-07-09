// Preview "Custom Cursor States" — kind: css. Il cursore nativo è nascosto
// SOLO dentro lo stage (`cursor: none` scoped al contenitore, mai al
// documento): fuori da quest'area il visitatore vede sempre il proprio
// cursore reale, invariato (contratto PreviewModule, COMPONENT_RULES.md).
import type { PreviewModule } from '../types/preview';
import './custom-cursor-states.css';

const ZONES: { zone: string; label: string }[] = [
  { zone: 'view', label: 'Immagine' },
  { zone: 'drag', label: 'Trascina' },
];

let stageEl: HTMLElement | null = null;
let cursorEl: HTMLDivElement | null = null;
let zoneEls: HTMLDivElement[] = [];
let attached = false;

function onMove(event: PointerEvent): void {
  if (!stageEl || !cursorEl) return;
  const bounds = stageEl.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;
  cursorEl.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
}

function onZoneEnter(this: HTMLDivElement): void {
  const zone = this.dataset.zone;
  const label = this.dataset.label ?? '';
  cursorEl?.classList.add(`is-${zone}`);
  if (cursorEl) cursorEl.textContent = label;
}

function onZoneLeave(this: HTMLDivElement): void {
  const zone = this.dataset.zone;
  cursorEl?.classList.remove(`is-${zone}`);
  if (cursorEl) cursorEl.textContent = '';
}

function attach(): void {
  if (!stageEl || attached) return;
  attached = true;
  stageEl.addEventListener('pointermove', onMove);
  for (const zone of zoneEls) {
    zone.addEventListener('pointerenter', onZoneEnter);
    zone.addEventListener('pointerleave', onZoneLeave);
  }
}

function detach(): void {
  if (!stageEl || !attached) return;
  attached = false;
  stageEl.removeEventListener('pointermove', onMove);
  for (const zone of zoneEls) {
    zone.removeEventListener('pointerenter', onZoneEnter);
    zone.removeEventListener('pointerleave', onZoneLeave);
  }
}

const customCursorStates: PreviewModule = {
  mount(el, opts) {
    stageEl = el;
    el.classList.add('custom-cursor-states-stage');

    zoneEls = ZONES.map(({ zone, label }) => {
      const div = document.createElement('div');
      div.className = 'custom-cursor-states-zone text-small';
      div.dataset.zone = zone;
      div.dataset.label = label;
      div.textContent = label;
      return div;
    });

    cursorEl = document.createElement('div');
    cursorEl.className = 'custom-cursor-states-cursor text-meta';

    el.replaceChildren(...zoneEls, cursorEl);

    if (opts?.reducedMotion) return; // cursore custom fermo, nessun inseguimento (MOTION_PRINCIPLES.md §6)

    attach();
  },

  destroy() {
    detach();
    stageEl?.classList.remove('custom-cursor-states-stage');
    stageEl?.replaceChildren();
    stageEl = null;
    cursorEl = null;
    zoneEls = [];
  },

  pause() {
    detach();
  },

  resume() {
    attach();
  },
};

export default customCursorStates;
