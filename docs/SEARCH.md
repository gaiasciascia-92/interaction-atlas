# SEARCH — Interaction Atlas

La ricerca è il percorso primario del prodotto (USER_FLOW, flusso 1). Requisito: **istantanea, per intenzione, senza pagina dei risultati.** I risultati compaiono mentre si digita; non esiste una rotta `/search`.

## 1. Accesso

- **Home:** barra sempre visibile, incassata nella pagina (componente `SearchBar`).
- **Ovunque:** `⌘K / Ctrl+K` apre `SearchOverlay` (decisione aperta A); in nav è sempre presente l'affordance `[Cerca ⌘K]` cliccabile — la scorciatoia è un acceleratore, mai l'unico accesso.
- `esc` chiude, il focus torna dov'era.

## 2. Tecnologia

Indice client-side pre-costruito in build da Astro: un JSON statico (`/search-index.json`) con i campi indicizzati, caricato al primo focus della ricerca (lazy, ~decine di KB per centinaia di voci). Matching con Fuse.js (fuzzy leggero).

Motivazione: contenuto interamente statico e in numero contenuto (50–100 voci a V3) — un servizio esterno o Pagefind sarebbero sovradimensionati; l'indice JSON mantiene la ricerca offline-compatibile per la PWA (V3) e a latenza zero.

## 3. Campi indicizzati e pesi

| Campo | Peso | Nota |
|---|---|---|
| `title` | 1.0 | |
| `dna` | 0.9 | il cuore della ricerca per intenzione |
| `summary` | 0.6 | |
| `category` | 0.5 | anche in italiano ("effetti visivi" → visual-effects) |
| `build.technology` / `libraries` | 0.4 | "gsap", "webgl", "css" |
| `knowledge.popularizedBy` | 0.3 | |

Non indicizzati deliberatamente: `description` completa (rumore), `insight` (è un parere, non un criterio di ricerca), URL.

## 4. Comportamento

- Debounce 80 ms; risultati raggruppati per tipo (Effetti / Components / — in V2 — Collections), massimo 7 visibili per gruppo.
- Ranking: score Fuse × peso campo; a parità, `addedAt` più recente prima.
- `↑↓` naviga, `↵` apre, `tab` passa di gruppo. Il primo risultato è preselezionato.
- Ogni risultato mostra: titolo, categoria, 2 termini DNA. Niente thumbnail: la riga resta testo (Silent UI).
- Query multi-termine: AND morbido (i risultati che contengono tutti i termini salgono, gli altri restano sotto).
- I termini che corrispondono a voci del vocabolario DNA vengono riconosciuti e mostrati come filtro attivo («DNA: Organic ✕») (decisione G, approvata) — trasforma la ricerca libera in ricerca strutturata senza UI aggiuntiva.

## 5. Stati

| Stato | Trattamento |
|---|---|
| Vuoto (nessuna query) | Suggerimenti: 5 termini DNA frequenti + 3 voci recenti. Mai overlay vuoto |
| Nessun risultato | «Nessuna voce per "x".» + termini DNA più vicini come link. Mai vicolo cieco |
| Indice non caricato | Input attivo subito, risultati appena pronto (il caricamento parte al focus, non al primo carattere) |

## 6. Accessibilità

`role="combobox"` + `aria-expanded` sull'input, `role="listbox"`/`option` sui risultati, `aria-activedescendant` per la selezione; annuncio dei risultati via `aria-live="polite"` («7 risultati»). Focus trap nell'overlay, ritorno del focus alla chiusura.

## 7. Cosa la ricerca non fa (V1)

Niente cronologia delle ricerche, niente analytics, niente sinonimi automatici, niente ricerca full-text nelle descrizioni. Ognuna di queste è rumore o costo finché il catalogo è sotto le 100 voci.
