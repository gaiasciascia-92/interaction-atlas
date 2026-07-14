// Preview "Horizontal Gallery" — kind: css. Nessun JavaScript nel
// meccanismo di scorrimento: `overflow-x: auto` + `scroll-snap` nativi,
// interamente contenuti nel proprio elemento (mai un listener su
// document/window, mai window.scrollTo() — lo scorrimento vive dentro il
// contenitore, come per smooth-scroll.ts). pause()/resume() omessi: lo
// scroll nativo non richiede avvio/arresto (COMPONENT_RULES.md).
import type { PreviewModule } from '../types/preview';
import './horizontal-gallery.css';

const ITEM_COUNT = 6;

let stageEl: HTMLElement | null = null;

const horizontalGallery: PreviewModule = {
  mount(el) {
    stageEl = el;
    el.classList.add('horizontal-gallery-stage');

    const track = document.createElement('div');
    track.className = 'horizontal-gallery-track';

    for (let i = 0; i < ITEM_COUNT; i += 1) {
      const item = document.createElement('div');
      item.className = 'horizontal-gallery-item';
      track.append(item);
    }

    el.replaceChildren(track);
  },

  destroy() {
    stageEl?.classList.remove('horizontal-gallery-stage');
    stageEl?.replaceChildren();
    stageEl = null;
  },
};

export default horizontalGallery;
