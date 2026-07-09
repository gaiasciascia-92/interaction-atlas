// Indice di ricerca — TASK_008, SEARCH.md §2. Generato in build come JSON
// statico, caricato lazy dal client al primo focus della ricerca (mai
// scaricato al caricamento della pagina). Un solo endpoint, riusato da
// SearchBar e SearchOverlay tramite src/lib/search.ts.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { publishedOrAll } from '../lib/content';
import { CATEGORY_META } from '../lib/categories';
import type { SearchIndexEntry } from '../lib/search';

export const prerender = true;

// SEARCH.md §3 chiede il match anche in italiano ("effetti visivi" →
// visual-effects) mentre le etichette di navigazione restano in inglese
// (decisione C, PROJECT_SPEC.md §12) — questa mappa serve solo a rendere il
// campo interrogabile, non è testo mostrato in UI. Annotato in CHANGELOG.md.
const CATEGORY_SEARCH_SYNONYMS: Record<string, string> = {
  interactions: 'interazioni interazione',
  motion: 'movimento moto',
  'visual-effects': 'effetti visivi effetto visivo',
  components: 'componenti componente',
};

export const GET: APIRoute = async () => {
  const effects = publishedOrAll(await getCollection('effects'));
  const components = publishedOrAll(await getCollection('catalog-components'));

  const toEntry = (entry: (typeof effects)[number] | (typeof components)[number], type: 'effect' | 'component'): SearchIndexEntry => {
    const meta = CATEGORY_META[entry.data.category];
    return {
      id: entry.id,
      type,
      title: entry.data.title,
      href: `/e/${entry.id}`,
      category: entry.data.category,
      categoryLabel: meta.label,
      categorySearchText: [entry.data.category, meta.label, CATEGORY_SEARCH_SYNONYMS[entry.data.category] ?? '']
        .join(' '),
      dna: entry.data.dna,
      summary: entry.data.summary,
      technology: [...new Set([...entry.data.build.technology, ...entry.data.build.libraries.map((l) => l.name)])],
      popularizedBy: entry.data.knowledge.popularizedBy,
      addedAt: entry.data.addedAt,
    };
  };

  const index: SearchIndexEntry[] = [
    ...effects.map((e) => toEntry(e, 'effect')),
    ...components.map((e) => toEntry(e, 'component')),
  ];

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
