// Preview "Page Transition Cover" — kind: gsap. GSAP arriva per import()
// dinamico dentro il modulo, mai importato staticamente nel telaio
// (MOTION_PRINCIPLES.md §4). `gsap.context()` raccoglie timeline/tween per
// una `revert()` unica in destroy()/pause(); un `wantActive` protegge dalla
// corsa in cui destroy()/pause() arrivano mentre GSAP sta ancora caricando
// (stesso pattern di magnetic-cursor.ts).
import type { PreviewModule } from '../types/preview';
import './page-transition-cover.css';

const PAGES = ['01', '02', '03'];

let stageEl: HTMLElement | null = null;
let panelEl: HTMLDivElement | null = null;
let numberEl: HTMLDivElement | null = null;
let ctx: { revert(): void } | null = null;
let wantActive = false;
let pageIndex = 0;

async function attach(): Promise<void> {
  if (!stageEl || !panelEl || !numberEl || ctx) return;
  wantActive = true;
  const el = stageEl;
  const panel = panelEl;
  const number = numberEl;

  const { default: gsap } = await import('gsap');
  if (!wantActive || stageEl !== el) return; // destroy()/pause() già passati mentre GSAP caricava

  const context = gsap.context(() => {
    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1.1 });
    timeline
      .set(panel, { yPercent: 100 })
      .to(panel, { yPercent: 0, duration: 0.5, ease: 'power3.inOut' })
      .call(() => {
        pageIndex = (pageIndex + 1) % PAGES.length;
        number.textContent = PAGES[pageIndex] ?? PAGES[0] ?? '';
      })
      .to({}, { duration: 0.25 })
      .to(panel, { yPercent: -100, duration: 0.5, ease: 'power3.inOut' })
      .set(panel, { yPercent: 100 });
  }, el);

  ctx = context;
}

function detach(): void {
  wantActive = false;
  ctx?.revert();
  ctx = null;
}

const pageTransitionCover: PreviewModule = {
  mount(el, opts) {
    stageEl = el;
    el.classList.add('page-transition-cover-stage');

    numberEl = document.createElement('div');
    numberEl.className = 'page-transition-cover-number text-h1';
    numberEl.textContent = PAGES[0] ?? '';
    pageIndex = 0;

    panelEl = document.createElement('div');
    panelEl.className = 'page-transition-cover-panel';

    el.replaceChildren(numberEl, panelEl);

    if (opts?.reducedMotion) {
      // Primo frame (pannello fuori scena, numero fermo su "01"), nessun
      // loop automatico — MOTION_PRINCIPLES.md §6.
      return;
    }

    void attach();
  },

  destroy() {
    detach();
    stageEl?.classList.remove('page-transition-cover-stage');
    stageEl?.replaceChildren();
    stageEl = null;
    panelEl = null;
    numberEl = null;
  },

  pause() {
    detach();
  },

  resume() {
    void attach();
  },
};

export default pageTransitionCover;
