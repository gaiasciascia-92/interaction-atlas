// Logica di ricerca condivisa — TASK_008, SEARCH.md. Un solo modulo usato
// sia da SearchBar (Home) sia da SearchOverlay (⌘K, globale): stessa
// funzione di ricerca, stesso indice, stesso comportamento ovunque.
import Fuse, { type IFuseOptions } from 'fuse.js';
import { DNA_TERMS } from './dna';
import type { CategorySlug } from './categories';

export interface SearchIndexEntry {
  id: string;
  type: 'effect' | 'component';
  title: string;
  href: string;
  category: CategorySlug;
  categoryLabel: string;
  categorySearchText: string;
  dna: string[];
  summary: string;
  technology: string[];
  popularizedBy: string[];
  addedAt: string;
}

export interface SearchResultGroup {
  type: 'effect' | 'component';
  label: string;
  items: SearchIndexEntry[];
}

export interface SearchOutcome {
  groups: SearchResultGroup[];
  totalCount: number;
  activeFilters: string[];
  freeText: string;
}

const MAX_PER_GROUP = 7;

// Pesi dei campi indicizzati — SEARCH.md §3, vincolante 1:1.
const FUSE_OPTIONS: IFuseOptions<SearchIndexEntry> = {
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.4,
  minMatchCharLength: 2,
  keys: [
    { name: 'title', weight: 1.0 },
    { name: 'dna', weight: 0.9 },
    { name: 'summary', weight: 0.6 },
    { name: 'categorySearchText', weight: 0.5 },
    { name: 'technology', weight: 0.4 },
    { name: 'popularizedBy', weight: 0.3 },
  ],
};

// --- Caricamento lazy dell'indice (SEARCH.md §2: al primo focus, mai al
// caricamento della pagina) — cache in-memory, un solo fetch per sessione. ---
let indexPromise: Promise<SearchIndexEntry[]> | null = null;

export function loadSearchIndex(): Promise<SearchIndexEntry[]> {
  if (!indexPromise) {
    indexPromise = fetch('/search-index.json').then((res) => {
      if (!res.ok) throw new Error(`Impossibile caricare l'indice di ricerca: ${res.status}`);
      return res.json() as Promise<SearchIndexEntry[]>;
    });
  }
  return indexPromise;
}

// --- Riconoscimento dei termini DNA come filtri (decisione G) ---------------

const DNA_TERMS_LOWER = new Map(DNA_TERMS.map((term) => [term.toLowerCase(), term]));

/**
 * Estrae dalla query libera i token che corrispondono al vocabolario DNA
 * (case-insensitive), li rimuove dal testo libero e li ritorna nella forma
 * canonica (es. "organic" → "Organic"). L'ordine dei filtri riflette
 * l'ordine di comparsa nella query.
 */
export function extractDnaFilters(rawQuery: string): { filters: string[]; freeText: string } {
  const tokens = rawQuery.split(/\s+/).filter(Boolean);
  const filters: string[] = [];
  const freeTokens: string[] = [];
  for (const token of tokens) {
    const canonical = DNA_TERMS_LOWER.get(token.toLowerCase());
    if (canonical) {
      filters.push(canonical);
    } else {
      freeTokens.push(token);
    }
  }
  return { filters, freeText: freeTokens.join(' ') };
}

// --- Ricerca principale -------------------------------------------------

/**
 * I termini DNA riconosciuti restano chip separate nell'input (rimovibili
 * con ✕, decisione G) ma continuano a contribuire alla query effettiva: non
 * sono un filtro booleano rigido che esclude le voci con una corrispondenza
 * parziale. Motivazione (annotata in CHANGELOG.md, ambiguità tra SEARCH.md
 * §4 — "AND morbido" per le query multi-termine — e la parola "filtro" nello
 * stesso paragrafo): con un catalogo di poche decine di voci un filtro
 * booleano rigido produrrebbe spesso zero risultati per due termini DNA
 * plausibili ma mai co-occorsi in una scheda, mentre il criterio di
 * accettazione di TASK_008.md descrive esplicitamente un *ranking* — "le
 * voci con entrambi i geni salgono in testa" (le altre restano, più in
 * basso) — verificato con i contenuti campione ("editorial calm": Blur
 * Reveal, che ha entrambi i termini, sale sopra Hover Image Reveal, che ne
 * ha solo uno, mai escluso).
 */
export function runSearch(
  allEntries: SearchIndexEntry[],
  activeFilters: string[],
  freeText: string,
): SearchOutcome {
  const effectiveQuery = [...activeFilters, freeText.trim()].filter(Boolean).join(' ');

  let ranked: SearchIndexEntry[];
  if (effectiveQuery.length > 0) {
    const fuse = new Fuse(allEntries, FUSE_OPTIONS);
    ranked = fuse
      .search(effectiveQuery)
      .slice()
      .sort((a, b) => (a.score ?? 0) - (b.score ?? 0) || b.item.addedAt.localeCompare(a.item.addedAt))
      .map((result) => result.item);
  } else {
    ranked = allEntries.slice().sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  }

  return {
    groups: groupResults(ranked),
    totalCount: ranked.length,
    activeFilters,
    freeText: freeText.trim(),
  };
}

// SEARCH.md §4: "risultati raggruppati per tipo (Effetti / Components…)" —
// etichette copiate testualmente dal documento (Effetti in italiano,
// Components resta il nome proprio della sezione, README.md).
function groupResults(ranked: SearchIndexEntry[]): SearchResultGroup[] {
  const groups: SearchResultGroup[] = [];
  const effects = ranked.filter((entry) => entry.type === 'effect').slice(0, MAX_PER_GROUP);
  const components = ranked.filter((entry) => entry.type === 'component').slice(0, MAX_PER_GROUP);
  if (effects.length > 0) groups.push({ type: 'effect', label: 'Effetti', items: effects });
  if (components.length > 0) groups.push({ type: 'component', label: 'Components', items: components });
  return groups;
}

// --- Stati vuoto / nessun risultato — SEARCH.md §5 ------------------------

/** "5 termini DNA frequenti" per lo stato vuoto: frequenza reale nell'indice corrente. */
export function getFrequentDnaTerms(entries: SearchIndexEntry[], count = 5): string[] {
  const frequency = new Map<string, number>();
  for (const entry of entries) {
    for (const term of entry.dna) {
      frequency.set(term, (frequency.get(term) ?? 0) + 1);
    }
  }
  return [...frequency.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, count)
    .map(([term]) => term);
}

/** "3 voci recenti" per lo stato vuoto. */
export function getRecentEntries(entries: SearchIndexEntry[], count = 3): SearchIndexEntry[] {
  return entries.slice().sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, count);
}

/** "Termini DNA più vicini" per lo stato nessun-risultato: fuzzy match della
 * query contro il solo vocabolario DNA (36 termini). */
export function getNearestDnaTerms(query: string, count = 3): string[] {
  if (!query.trim()) return [];
  const fuse = new Fuse(DNA_TERMS as string[], { includeScore: true, threshold: 0.6 });
  return fuse
    .search(query.trim())
    .slice(0, count)
    .map((result) => result.item);
}
