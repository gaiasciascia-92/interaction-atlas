// Preview "Hover Image Reveal" — kind: gsap. GSAP arriva per import()
// dinamico dentro il modulo, mai importato staticamente nel telaio
// (MOTION_PRINCIPLES.md §4); destroy()/pause() usano gsap.context().revert()
// per non lasciare tween o listener attivi (COMPONENT_RULES.md).
import type { PreviewModule } from '../types/preview';
import './hover-image-reveal.css';

const ROWS = [
  'Riga uno — un progetto editoriale',
  'Riga due — un case study',
  'Riga tre — un portfolio fotografico',
];

let stageEl: HTMLElement | null = null;
let floaterEl: HTMLDivElement | null = null;
let rowEls: HTMLLIElement[] = [];
let gsapContext: { revert(): void } | null = null;

async function attach(): Promise<void> {
  if (!stageEl || !floaterEl || gsapContext) return;
  const el = stageEl;
  const floater = floaterEl;
  const rows = rowEls;

  const { default: gsap } = await import('gsap');
  if (stageEl !== el) return; // destroy()/pause() già passati mentre GSAP caricava

  gsapContext = gsap.context(() => {
    const moveX = gsap.quickTo(floater, 'x', { duration: 0.4, ease: 'power3' });
    const moveY = gsap.quickTo(floater, 'y', { duration: 0.4, ease: 'power3' });

    const onMove = (event: PointerEvent) => {
      const bounds = el.getBoundingClientRect();
      moveX(event.clientX - bounds.left - 80);
      moveY(event.clientY - bounds.top - 55);
    };
    const onEnter = () => gsap.to(floater, { opacity: 1, duration: 0.2 });
    const onLeave = () => gsap.to(floater, { opacity: 0, duration: 0.2 });

    el.addEventListener('pointermove', onMove);
    for (const row of rows) {
      row.addEventListener('pointerenter', onEnter);
      row.addEventListener('pointerleave', onLeave);
    }

    return () => {
      el.removeEventListener('pointermove', onMove);
      for (const row of rows) {
        row.removeEventListener('pointerenter', onEnter);
        row.removeEventListener('pointerleave', onLeave);
      }
    };
  }, el);
}

function detach(): void {
  gsapContext?.revert();
  gsapContext = null;
}

const hoverImageReveal: PreviewModule = {
  mount(el, opts) {
    stageEl = el;
    el.classList.add('stage');

    const rowsList = document.createElement('ul');
    rowsList.className = 'rows';
    rowEls = ROWS.map((label) => {
      const li = document.createElement('li');
      li.className = 'row text-body';
      li.textContent = label;
      rowsList.appendChild(li);
      return li;
    });

    floaterEl = document.createElement('div');
    floaterEl.className = 'floater';

    el.replaceChildren(rowsList, floaterEl);

    if (opts?.reducedMotion) return; // niente inseguimento del cursore (MOTION_PRINCIPLES.md §6)

    void attach();
  },

  destroy() {
    detach();
    stageEl?.classList.remove('stage');
    stageEl?.replaceChildren();
    stageEl = null;
    floaterEl = null;
    rowEls = [];
  },

  pause() {
    detach();
  },

  resume() {
    void attach();
  },
};

export default hoverImageReveal;
