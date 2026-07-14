// Preview "Glass Blur Layers" — kind: css. Nessuna libreria: backdrop-filter
// nativo su più pannelli impilati, sfondo animato con una singola
// @keyframes in loop — zero JavaScript nell'animazione (stesso principio di
// film-grain.ts); pause()/resume() aggiungono/rimuovono la sola classe che
// attiva la @keyframes.
import type { PreviewModule } from '../types/preview';
import './glass-blur-layers.css';

let stageEl: HTMLElement | null = null;

const glassBlurLayers: PreviewModule = {
  mount(el, opts) {
    stageEl = el;
    el.classList.add('glass-blur-layers-stage');

    const backdrop = document.createElement('div');
    backdrop.className = 'glass-blur-layers-backdrop';
    const panelFar = document.createElement('div');
    panelFar.className = 'glass-blur-layers-panel glass-blur-layers-panel-far';
    const panelNear = document.createElement('div');
    panelNear.className = 'glass-blur-layers-panel glass-blur-layers-panel-near';

    el.replaceChildren(backdrop, panelFar, panelNear);

    if (opts?.reducedMotion) {
      // Primo frame (sfondo fermo, vetri già composti) — MOTION_PRINCIPLES.md §6.
      return;
    }

    el.classList.add('is-live');
  },

  destroy() {
    stageEl?.classList.remove('glass-blur-layers-stage', 'is-live');
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

export default glassBlurLayers;
