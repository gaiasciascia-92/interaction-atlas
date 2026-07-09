// Logica condivisa dell'attrazione magnetica — usata sia dal modulo preview
// del catalogo (src/previews/magnetic-cursor.ts) sia dall'eccezione
// documentata dell'hero Home (MOTION_PRINCIPLES.md §1, TASK_011: "non è
// telaio, è un esemplare esposto"). GSAP arriva sempre per import()
// dinamico dentro il chiamante, mai statico nel telaio (MOTION_PRINCIPLES.md §4).
export interface MagneticPullOptions {
  /** Raggio in px entro cui il puntatore esercita attrazione. */
  radius: number;
  /** Frazione della distanza puntatore→centro applicata come spostamento. */
  strength: number;
}

export interface MagneticPullHandle {
  /** Ferma l'ascolto e riporta l'elemento a (0, 0): nessun tween residuo. */
  destroy(): void;
}

/**
 * Applica l'attrazione magnetica di `moveEl` verso il puntatore quando
 * questo è entro `opts.radius` dal suo centro, ascoltando `pointermove` su
 * `listenEl` (può coincidere con `moveEl` o essere un'area più ampia).
 * Il chiamante è responsabile di non invocarla sotto `prefers-reduced-motion`
 * e di gestire l'eventuale race tra `import()` e uno `destroy()` nel
 * frattempo (il gsap.context() ritornato è comunque sicuro da revertire
 * anche se mai stato "attivo" visivamente).
 */
export async function attachMagneticPull(
  listenEl: HTMLElement,
  moveEl: HTMLElement,
  opts: MagneticPullOptions,
): Promise<MagneticPullHandle> {
  const { default: gsap } = await import('gsap');

  const gsapContext = gsap.context(() => {
    const moveX = gsap.quickTo(moveEl, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    const moveY = gsap.quickTo(moveEl, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });

    const onMove = (event: PointerEvent) => {
      const bounds = moveEl.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);
      if (distance < opts.radius) {
        moveX(dx * opts.strength);
        moveY(dy * opts.strength);
      } else {
        moveX(0);
        moveY(0);
      }
    };
    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    listenEl.addEventListener('pointermove', onMove);
    listenEl.addEventListener('pointerleave', onLeave);

    return () => {
      listenEl.removeEventListener('pointermove', onMove);
      listenEl.removeEventListener('pointerleave', onLeave);
    };
  }, listenEl);

  return {
    destroy() {
      gsapContext.revert();
      moveEl.style.transform = '';
    },
  };
}
