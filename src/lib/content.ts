// Utility di query sulle Content Collections (TASK_005).

/**
 * Filtra alle sole voci `published`; se in una collection non ce n'è ancora
 * nessuna (stato attuale: tutte `draft`), ritorna tutte le voci esistenti
 * invece di una lista vuota. Interpretazione conservativa annotata in
 * docs/CHANGELOG.md — da rimuovere quando esisteranno voci pubblicate.
 */
export function publishedOrAll<T extends { data: { status: 'draft' | 'published' } }>(entries: T[]): T[] {
  const published = entries.filter((entry) => entry.data.status === 'published');
  return published.length > 0 ? published : entries;
}
