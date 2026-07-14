// Preview "Editorial Footer" — kind: css. Markup statico, nessuna
// interattività oltre a :hover dichiarativo (COMPONENT_RULES.md). Il
// "contatto" è uno <span> stilizzato come link, non un vero <a>: un modulo
// preview non deve mai poter navigare fuori da se stesso. pause()/resume()
// omessi: non c'è nulla da avviare o fermare.
import type { PreviewModule } from '../types/preview';
import './editorial-footer.css';

let stageEl: HTMLElement | null = null;

const editorialFooter: PreviewModule = {
  mount(el) {
    stageEl = el;
    el.classList.add('editorial-footer-stage');

    const divider = document.createElement('div');
    divider.className = 'editorial-footer-divider';

    const row = document.createElement('div');
    row.className = 'editorial-footer-row';

    const meta = document.createElement('p');
    meta.className = 'editorial-footer-meta text-small';
    meta.textContent = 'Nome Studio · 2026';

    const contact = document.createElement('span');
    contact.className = 'editorial-footer-contact text-small';
    contact.textContent = 'www.esempio.com';

    row.append(meta, contact);
    el.replaceChildren(divider, row);
  },

  destroy() {
    stageEl?.classList.remove('editorial-footer-stage');
    stageEl?.replaceChildren();
    stageEl = null;
  },
};

export default editorialFooter;
