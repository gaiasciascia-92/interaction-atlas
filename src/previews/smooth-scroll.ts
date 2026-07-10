// Preview "Smooth Scroll" — kind: css (nessuna libreria: lerp manuale via
// requestAnimationFrame). Lo scroll simulato vive interamente dentro il
// proprio stage: nessun listener su document/window, nessuna chiamata a
// window.scrollTo() — mai lo scroll reale della pagina (COMPONENT_RULES.md,
// contratto PreviewModule).
import type { PreviewModule } from '../types/preview';
import './smooth-scroll.css';

const ITEMS = ['01 — Cover', '02 — Serie', '03 — Dettagli', '04 — Ritratti', '05 — Note', '06 — Indice'];
const LERP_FACTOR = 0.09;
const SETTLE_EPSILON = 0.05;

let stageEl: HTMLElement | null = null;
let trackEl: HTMLDivElement | null = null;
let current = 0;
let target = 0;
let minY = 0;
let rafId: number | null = null;
let attached = false;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function tick(): void {
  rafId = null;
  if (!trackEl) return;
  current += (target - current) * LERP_FACTOR;
  if (Math.abs(target - current) < SETTLE_EPSILON) {
    current = target;
    trackEl.style.transform = `translateY(${current}px)`;
    return;
  }
  trackEl.style.transform = `translateY(${current}px)`;
  rafId = requestAnimationFrame(tick);
}

function ensureLoop(): void {
  if (rafId === null) rafId = requestAnimationFrame(tick);
}

function onWheel(event: WheelEvent): void {
  event.preventDefault(); // resta dentro lo stage: mai propagato allo scroll reale della pagina
  target = clamp(target - event.deltaY * 0.6, minY, 0);
  ensureLoop();
}

function measure(): void {
  if (!stageEl || !trackEl) return;
  minY = Math.min(0, stageEl.clientHeight - trackEl.scrollHeight);
  target = clamp(target, minY, 0);
  current = clamp(current, minY, 0);
}

function attach(): void {
  if (!stageEl || attached) return;
  attached = true;
  measure();
  stageEl.addEventListener('wheel', onWheel, { passive: false });
}

function detach(): void {
  attached = false;
  stageEl?.removeEventListener('wheel', onWheel);
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

const smoothScroll: PreviewModule = {
  mount(el, opts) {
    stageEl = el;
    el.classList.add('smooth-scroll-stage');

    trackEl = document.createElement('div');
    trackEl.className = 'smooth-scroll-track';
    trackEl.append(
      ...ITEMS.map((label) => {
        const item = document.createElement('div');
        item.className = 'smooth-scroll-item text-meta';
        item.textContent = label;
        return item;
      }),
    );

    const hint = document.createElement('span');
    hint.className = 'smooth-scroll-hint text-caption';
    hint.textContent = 'Scorri qui';

    current = 0;
    target = 0;
    el.replaceChildren(trackEl, hint);

    if (opts?.reducedMotion) {
      // Primo frame (elenco fermo in cima), nessun ascolto della rotellina
      // — MOTION_PRINCIPLES.md §6.
      return;
    }

    attach();
  },

  destroy() {
    detach();
    stageEl?.classList.remove('smooth-scroll-stage');
    stageEl?.replaceChildren();
    stageEl = null;
    trackEl = null;
  },

  pause() {
    detach();
  },

  resume() {
    attach();
  },
};

export default smoothScroll;
