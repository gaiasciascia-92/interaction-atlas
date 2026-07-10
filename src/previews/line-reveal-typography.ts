// Preview "Line Reveal Typography" — kind: css. Nessuna libreria: ogni riga
// è una maschera overflow:hidden con un IntersectionObserver condiviso come
// unico trigger (COMPONENT_RULES.md, contratto PreviewModule).
import type { PreviewModule } from '../types/preview';
import './line-reveal-typography.css';

const REVEALED_CLASS = 'is-revealed';
const LINES = ['Il titolo', 'si compone', 'riga dopo riga.'];

let stageEl: HTMLElement | null = null;
let observer: IntersectionObserver | null = null;

function observe(): void {
  if (!stageEl || observer) return;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        stageEl?.classList.toggle(REVEALED_CLASS, entry.isIntersecting);
      }
    },
    { threshold: 0.4 },
  );
  observer.observe(stageEl);
}

const lineRevealTypography: PreviewModule = {
  mount(el, opts) {
    stageEl = el;
    el.classList.add('line-reveal-typography-stage');

    const lines = LINES.map((line) => {
      const mask = document.createElement('span');
      mask.className = 'line-reveal-typography-mask';
      const inner = document.createElement('span');
      inner.className = 'line-reveal-typography-line text-h2';
      inner.textContent = line;
      mask.append(inner);
      return mask;
    });

    el.replaceChildren(...lines);

    if (opts?.reducedMotion) {
      // Primo frame (righe mascherate, non rivelate) — MOTION_PRINCIPLES.md
      // §6: l'avvio esplicito è responsabilità del contenitore (PreviewPane).
      return;
    }

    observe();
  },

  destroy() {
    observer?.disconnect();
    observer = null;
    stageEl?.classList.remove('line-reveal-typography-stage', REVEALED_CLASS);
    stageEl?.replaceChildren();
    stageEl = null;
  },

  pause() {
    observer?.disconnect();
    observer = null;
  },

  resume() {
    observe();
  },
};

export default lineRevealTypography;
