// Preview "Magnetic Cursor" — kind: gsap. GSAP arriva per import() dinamico
// dentro il modulo, mai importato staticamente nel telaio
// (MOTION_PRINCIPLES.md §4); destroy()/pause() usano gsap.context().revert()
// per non lasciare tween o listener attivi (COMPONENT_RULES.md).
import type { PreviewModule } from '../types/preview';
import './magnetic-cursor.css';

const MAGNETIC_RADIUS = 110;
const PULL_STRENGTH = 0.4;

let stageEl: HTMLElement | null = null;
let buttonEl: HTMLDivElement | null = null;
let gsapContext: { revert(): void } | null = null;

async function attach(): Promise<void> {
  if (!stageEl || !buttonEl || gsapContext) return;
  const el = stageEl;
  const button = buttonEl;

  const { default: gsap } = await import('gsap');
  if (stageEl !== el) return; // destroy()/pause() già passati mentre GSAP caricava

  gsapContext = gsap.context(() => {
    const moveX = gsap.quickTo(button, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    const moveY = gsap.quickTo(button, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });

    const onMove = (event: PointerEvent) => {
      const bounds = button.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);
      if (distance < MAGNETIC_RADIUS) {
        moveX(dx * PULL_STRENGTH);
        moveY(dy * PULL_STRENGTH);
      } else {
        moveX(0);
        moveY(0);
      }
    };
    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, el);
}

function detach(): void {
  gsapContext?.revert();
  gsapContext = null;
  if (buttonEl) buttonEl.style.transform = '';
}

const magneticCursor: PreviewModule = {
  mount(el, opts) {
    stageEl = el;
    el.classList.add('magnetic-cursor-stage');

    buttonEl = document.createElement('div');
    buttonEl.className = 'magnetic-cursor-button text-body';
    buttonEl.textContent = 'Vedi il progetto';
    el.replaceChildren(buttonEl);

    if (opts?.reducedMotion) return; // bottone fermo al centro, nessun inseguimento (MOTION_PRINCIPLES.md §6)

    void attach();
  },

  destroy() {
    detach();
    stageEl?.classList.remove('magnetic-cursor-stage');
    stageEl?.replaceChildren();
    stageEl = null;
    buttonEl = null;
  },

  pause() {
    detach();
  },

  resume() {
    void attach();
  },
};

export default magneticCursor;
