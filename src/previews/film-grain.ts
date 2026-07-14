// Preview "Film Grain" — kind: css (PROJECT_SPEC.md §7, livello Live: nessuna
// libreria, nessun canvas). Il rumore è un filtro SVG (feTurbulence) usato
// come background-image, animato con una singola @keyframes a scatti — zero
// JavaScript nell'animazione stessa: pause()/resume() si limitano a
// aggiungere/rimuovere la classe che attiva la @keyframes via CSS.
import type { PreviewModule } from '../types/preview';
import './film-grain.css';

let stageEl: HTMLElement | null = null;

const filmGrain: PreviewModule = {
  mount(el, opts) {
    stageEl = el;
    el.classList.add('film-grain-stage');

    const photo = document.createElement('div');
    photo.className = 'film-grain-photo';
    const noise = document.createElement('div');
    noise.className = 'film-grain-noise';

    el.replaceChildren(photo, noise);

    if (opts?.reducedMotion) {
      // Primo frame (grana ferma, nessun tremolio) — MOTION_PRINCIPLES.md §6.
      return;
    }

    el.classList.add('is-live');
  },

  destroy() {
    stageEl?.classList.remove('film-grain-stage', 'is-live');
    stageEl?.replaceChildren();
    stageEl = null;
  },

  pause() {
    stageEl?.classList.remove('is-live');
  },

  resume() {
    stageEl?.classList.add('is-live');
  },
};

export default filmGrain;
