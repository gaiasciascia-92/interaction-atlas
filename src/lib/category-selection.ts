// Stato di selezione condiviso tra EntryList e PreviewPane (TASK_006).
// Sono due isole separate (COMPONENT_RULES.md); questo modulo è l'unico
// punto in comune tra le due, un semplice pub/sub senza dipendenze —
// nessuna delle due "possiede" l'altra, entrambe si limitano ad
// osservare/richiedere cambi di selezione.

export interface SelectionChange {
  slug: string;
  index: number;
  direction: 'next' | 'prev' | null; // null solo per il giro di notifica iniziale
}

type Listener = (change: SelectionChange) => void;

class SelectionController {
  private slugs: string[];
  private index: number;
  private listeners = new Set<Listener>();

  constructor(slugs: string[], initialSlug: string) {
    this.slugs = slugs;
    const found = slugs.indexOf(initialSlug);
    this.index = found === -1 ? 0 : found;
  }

  get current(): string | undefined {
    return this.slugs[this.index];
  }

  select(slug: string): void {
    const nextIndex = this.slugs.indexOf(slug);
    if (nextIndex === -1 || nextIndex === this.index) return;
    this.moveTo(nextIndex);
  }

  next(): void {
    if (this.index < this.slugs.length - 1) this.moveTo(this.index + 1);
  }

  prev(): void {
    if (this.index > 0) this.moveTo(this.index - 1);
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private moveTo(nextIndex: number): void {
    const direction: SelectionChange['direction'] = nextIndex > this.index ? 'next' : 'prev';
    this.index = nextIndex;
    const change: SelectionChange = { slug: this.slugs[this.index]!, index: this.index, direction };
    for (const listener of this.listeners) listener(change);
  }
}

const registry = new Map<string, SelectionController>();

/**
 * Ritorna il controller condiviso per una data pagina categoria (chiave
 * arbitraria, tipicamente lo slug categoria). Il primo chiamante lo crea,
 * i successivi ricevono la stessa istanza — indipendentemente da quale
 * delle due isole idrata per prima.
 */
export function getSelectionController(
  key: string,
  slugs: string[],
  initialSlug: string,
): SelectionController {
  let controller = registry.get(key);
  if (!controller) {
    controller = new SelectionController(slugs, initialSlug);
    registry.set(key, controller);
  }
  return controller;
}
