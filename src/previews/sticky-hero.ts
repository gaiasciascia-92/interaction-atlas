// Preview "Sticky Hero" — kind: css. Nessun JavaScript: `position: sticky`
// nativo dentro uno scroller interno (`overflow-y: auto`) confinato allo
// stage — mai lo scroll reale della pagina, stesso principio di
// horizontal-gallery.ts/smooth-scroll.ts. `overscroll-behavior` impedisce
// lo scroll-chaining verso la pagina una volta raggiunto il fondo dello
// scroller. pause()/resume() omessi: nulla da avviare o fermare.
import type { PreviewModule } from '../types/preview';
import './sticky-hero.css';

let stageEl: HTMLElement | null = null;

const stickyHero: PreviewModule = {
  mount(el) {
    stageEl = el;
    el.classList.add('sticky-hero-stage');

    const scroller = document.createElement('div');
    scroller.className = 'sticky-hero-scroller';

    const track = document.createElement('div');
    track.className = 'sticky-hero-track';

    const media = document.createElement('div');
    media.className = 'sticky-hero-media';

    const content = document.createElement('div');
    content.className = 'sticky-hero-content';
    const heading = document.createElement('p');
    heading.className = 'sticky-hero-heading text-h3';
    heading.textContent = 'Studio, 2026';
    const body = document.createElement('p');
    body.className = 'sticky-hero-body text-small';
    body.textContent = 'Il testo scorre sopra l’immagine ferma.';
    content.append(heading, body);

    track.append(media, content);
    scroller.append(track);
    el.replaceChildren(scroller);
  },

  destroy() {
    stageEl?.classList.remove('sticky-hero-stage');
    stageEl?.replaceChildren();
    stageEl = null;
  },
};

export default stickyHero;
