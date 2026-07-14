// Preview "Magazine Grid" — kind: css. Solo markup + CSS Grid con span
// disomogenei; nessun JavaScript nel meccanismo, solo :hover dichiarativo
// (COMPONENT_RULES.md, contratto PreviewModule). pause()/resume() omessi:
// non c'è nulla da avviare o fermare (stesso trattamento di
// link-underline-reveal.ts).
import type { PreviewModule } from '../types/preview';
import './magazine-grid.css';

// span: colonne/righe occupate sulla griglia 4x2 dello stage.
const TILES: { span: string }[] = [
  { span: 'is-wide is-tall' },
  { span: '' },
  { span: '' },
  { span: 'is-tall' },
  { span: 'is-wide' },
  { span: '' },
];

let stageEl: HTMLElement | null = null;

const magazineGrid: PreviewModule = {
  mount(el) {
    stageEl = el;
    el.classList.add('magazine-grid-stage');

    const tiles = TILES.map(({ span }) => {
      const tile = document.createElement('div');
      tile.className = `magazine-grid-tile ${span}`.trim();
      return tile;
    });

    el.replaceChildren(...tiles);
  },

  destroy() {
    stageEl?.classList.remove('magazine-grid-stage');
    stageEl?.replaceChildren();
    stageEl = null;
  },
};

export default magazineGrid;
