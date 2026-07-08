// Contratto dei moduli preview — COMPONENT_RULES.md.
export interface PreviewModule {
  mount(el: HTMLElement, opts?: { reducedMotion?: boolean }): void;
  destroy(): void; // obbligatorio: nessun tween/raf/contesto residuo
  pause?(): void; // chiamato quando esce dal viewport / tab nascosta
  resume?(): void;
}
