// Preview "Blur Reveal" — kind: css. Nessuna libreria: solo CSS transition
// e IntersectionObserver per il trigger (COMPONENT_RULES.md, contratto PreviewModule).
import type { PreviewModule } from '../types/preview';
import './blur-reveal.css';

const REVEALED_CLASS = 'isRevealed';

let frameEl: HTMLElement | null = null;
let observer: IntersectionObserver | null = null;

function observe(): void {
  if (!frameEl || observer) return;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        frameEl?.classList.toggle(REVEALED_CLASS, entry.isIntersecting);
      }
    },
    { threshold: 0.4 },
  );
  observer.observe(frameEl);
}

const blurReveal: PreviewModule = {
  mount(el, opts) {
    frameEl = el;
    el.classList.add('frame');
    el.replaceChildren(Object.assign(document.createElement('div'), { className: 'photo' }));

    if (opts?.reducedMotion) {
      // Primo frame (sfocato), nessun reveal automatico — MOTION_PRINCIPLES.md §6:
      // l'avvio esplicito è responsabilità del contenitore (PreviewPane), non del modulo.
      return;
    }

    observe();
  },

  destroy() {
    observer?.disconnect();
    observer = null;
    frameEl?.classList.remove('frame', REVEALED_CLASS);
    frameEl?.replaceChildren();
    frameEl = null;
  },

  pause() {
    observer?.disconnect();
    observer = null;
  },

  resume() {
    observe();
  },
};

export default blurReveal;
