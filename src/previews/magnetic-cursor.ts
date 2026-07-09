// Preview "Magnetic Cursor" — kind: gsap. Logica di attrazione condivisa
// con l'eccezione documentata dell'hero Home (src/lib/magnetic-pull.ts,
// TASK_011); GSAP arriva comunque per import() dinamico dentro quel modulo,
// mai importato staticamente nel telaio (MOTION_PRINCIPLES.md §4).
// destroy()/pause() chiamano handle.destroy() (gsap.context().revert()
// internamente) per non lasciare tween o listener attivi (COMPONENT_RULES.md).
import type { PreviewModule } from '../types/preview';
import { attachMagneticPull, type MagneticPullHandle } from '../lib/magnetic-pull';
import './magnetic-cursor.css';

const MAGNETIC_RADIUS = 110;
const PULL_STRENGTH = 0.4;

let stageEl: HTMLElement | null = null;
let buttonEl: HTMLDivElement | null = null;
let handle: MagneticPullHandle | null = null;
let wantActive = false;

async function attach(): Promise<void> {
  if (!stageEl || !buttonEl || handle) return;
  wantActive = true;
  const el = stageEl;
  const button = buttonEl;

  const newHandle = await attachMagneticPull(el, button, { radius: MAGNETIC_RADIUS, strength: PULL_STRENGTH });
  if (!wantActive || stageEl !== el) {
    newHandle.destroy(); // destroy()/pause() già passati mentre GSAP caricava
    return;
  }
  handle = newHandle;
}

function detach(): void {
  wantActive = false;
  handle?.destroy();
  handle = null;
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
