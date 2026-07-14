// Preview "Depth Parallax" — kind: gsap. GSAP arriva per import() dinamico
// dentro il modulo, mai importato staticamente nel telaio
// (MOTION_PRINCIPLES.md §4). `gsap.context()` raccoglie i tween per una
// `revert()` unica in destroy()/pause(); un `wantActive` protegge dalla
// corsa in cui destroy()/pause() arrivano mentre GSAP sta ancora caricando
// (stesso pattern di magnetic-cursor.ts).
import type { PreviewModule } from '../types/preview';
import './depth-parallax.css';

// Moltiplicatore per strato: più vicino allo spettatore, più si sposta.
const LAYERS: { selector: string; strength: number }[] = [
  { selector: '.depth-parallax-back', strength: 0.03 },
  { selector: '.depth-parallax-mid', strength: 0.07 },
  { selector: '.depth-parallax-front', strength: 0.15 },
];

let stageEl: HTMLElement | null = null;
let ctx: { revert(): void } | null = null;
let wantActive = false;

async function attach(): Promise<void> {
  if (!stageEl || ctx) return;
  wantActive = true;
  const el = stageEl;

  const { default: gsap } = await import('gsap');
  if (!wantActive || stageEl !== el) return; // destroy()/pause() già passati mentre GSAP caricava

  const context = gsap.context(() => {
    const movers = LAYERS.map(({ selector, strength }) => ({
      quickX: gsap.quickTo(selector, 'x', { duration: 0.6, ease: 'power3.out' }),
      quickY: gsap.quickTo(selector, 'y', { duration: 0.6, ease: 'power3.out' }),
      strength,
    }));

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      for (const mover of movers) {
        mover.quickX(offsetX * mover.strength);
        mover.quickY(offsetY * mover.strength);
      }
    };

    const onLeave = () => {
      for (const mover of movers) {
        mover.quickX(0);
        mover.quickY(0);
      }
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, el);

  ctx = context;
}

function detach(): void {
  wantActive = false;
  ctx?.revert();
  ctx = null;
}

const depthParallax: PreviewModule = {
  mount(el, opts) {
    stageEl = el;
    el.classList.add('depth-parallax-stage');

    const back = document.createElement('div');
    back.className = 'depth-parallax-layer depth-parallax-back';
    const mid = document.createElement('div');
    mid.className = 'depth-parallax-layer depth-parallax-mid';
    const front = document.createElement('p');
    front.className = 'depth-parallax-layer depth-parallax-front text-display';
    front.textContent = 'Depth';

    el.replaceChildren(back, mid, front);

    if (opts?.reducedMotion) return; // strati fermi al centro, nessun inseguimento (MOTION_PRINCIPLES.md §6)

    void attach();
  },

  destroy() {
    detach();
    stageEl?.classList.remove('depth-parallax-stage');
    stageEl?.replaceChildren();
    stageEl = null;
  },

  pause() {
    detach();
  },

  resume() {
    void attach();
  },
};

export default depthParallax;
