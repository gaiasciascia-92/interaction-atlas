# TASK_008 — Ricerca

**Milestone:** M5 · **Dipende da:** TASK_004 (indice), TASK_003 (nav)

## Scope

Implementazione completa di `SEARCH.md`: generazione dell'indice JSON in build, `SearchBar` (Home) e `SearchOverlay` (⌘K, globale) sulla stessa logica condivisa in `src/lib/search.ts`, Fuse.js con i pesi dichiarati, raggruppamento risultati, stati vuoto/nessun-risultato/suggerimenti, riconoscimento dei termini DNA come filtri, accessibilità combobox completa.

## Criteri di accettazione

- [ ] Digitando "organic elegant" i risultati con entrambi i geni salgono in testa (test con i contenuti campione).
- [ ] Indice caricato lazy al primo focus; nessun impatto sul first load delle pagine.
- [ ] `⌘K` da ogni pagina, `esc` chiude e restituisce il focus, `↑↓ ↵ tab` come da spec.
- [ ] Screen reader: annuncio del numero risultati, `aria-activedescendant` corretto (verifica con VoiceOver o NVDA).
- [ ] Click su un tag DNA in qualunque pagina apre la ricerca con quel filtro attivo.
- [ ] Nessun risultato → suggerimenti DNA vicini, mai stato morto.
