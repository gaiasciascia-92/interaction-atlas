// Preview "Link Underline Reveal" — kind: css. Nessuna libreria, nessun
// listener: il reveal è interamente :hover + transition (COMPONENT_RULES.md,
// contratto PreviewModule). `pause`/`resume` non servono: non c'è nulla in
// esecuzione da fermare, coerente con il contratto (entrambi opzionali).
import type { PreviewModule } from '../types/preview';
import './link-underline-reveal.css';

const LINKS = ['Editorial portfolio', 'Case study fotografico', 'Serie in bianco e nero'];

let stageEl: HTMLElement | null = null;

const linkUnderlineReveal: PreviewModule = {
  mount(el) {
    stageEl = el;
    el.classList.add('link-underline-reveal-stage');

    const list = document.createElement('ul');
    list.className = 'link-underline-reveal-list';
    for (const label of LINKS) {
      const li = document.createElement('li');
      const link = document.createElement('span');
      link.className = 'link-underline-reveal-link text-body';
      link.textContent = label;
      li.appendChild(link);
      list.appendChild(li);
    }
    el.replaceChildren(list);
  },

  destroy() {
    stageEl?.classList.remove('link-underline-reveal-stage');
    stageEl?.replaceChildren();
    stageEl = null;
  },
};

export default linkUnderlineReveal;
