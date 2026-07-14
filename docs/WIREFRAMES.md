# WIREFRAMES — Interaction Atlas (V1)

Wireframe testuali, desktop first (≥ 1024 px), griglia a 12 colonne, max-width 1500 px. Le varianti mobile sono descritte in coda a ogni pagina. Nessun elemento oltre quelli disegnati: se non è nel wireframe, non è in V1.

Legenda: `┄` divider 1 px · `[ ]` area interattiva · `▸` marker di selezione

---

## 1. Home

```
┌─────────────────────────────────────────────────────────────────────┐
│  Interaction Atlas                                    [Cerca ⌘K]   │  nav, 64px — su carta
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  cover Purple, piena
│ ░░                                                                ░│  larghezza (TASK_016) —
│ ░░  Un atlante di interazioni                                     ░│  display, hero-esemplare,
│ ░░  per portfolio contemporanei.                        col 1–8   ░│  testo on-cover (Bg pieno)
│ ░░  ↳ Magnetic Cursor — dal catalogo              text-meta       ░│  freccia in Warm (grafica)
│ ░░                                                                ░│
│ ░░  Cataloga, confronta e scegli l'interazione                    ░│  sottotitolo, on-cover
│ ░░  giusta nel minor tempo possibile.                             ░│
│ ░░                                                                ░│
│ ░░  [ Cerca un effetto, un componente, una sensazione… ]  col 1–7 ░│  search: campo su Bg,
│ ░░                                                                ░│  testo Ink (non on-cover)
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← stacco netto, no gradiente
│                                          ┌──────────────────────┐   │  carta tinta (bg-tint)
│  INDICE                                  │                      │   │
│                                          │                      │   │
│  [ Interactions              24 ]        │    preview Lite      │   │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄        │    della categoria   │   │
│  [ Motion                    18 ]        │    in hover          │   │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄        │                      │   │
│  [ Visual Effects            15 ]        │    col 8–12          │   │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄        │    sticky            │   │
│  [ Components                12 ]        │                      │   │
│                                          └──────────────────────┘   │
│                                              righe: col 1–7         │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
│                                                                     │
│  AGGIUNTI DI RECENTE                                                │
│                                                                     │
│  [ Blur Reveal          Visual Effects      Blurred · Calm  ]       │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄        │
│  [ Magnetic Cursor      Interactions        Playful · Snappy ]      │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄        │
│  [ Magazine Grid        Components          Editorial · Airy ]      │
│                                                                     │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
│  footer minimo: nome, anno, contatto                                │
└─────────────────────────────────────────────────────────────────────┘
```

Comportamenti:
- **Cover Purple (approvata dal curatore, TASK_016).** Solo sulla Home: titolo, sottotitolo, didascalia dell'esemplare e barra di ricerca poggiano su un blocco a piena larghezza in `--color-primary` — l'unico punto di tutto il prodotto dove il Purple è una superficie estesa, non un accento (`DESIGN_SYSTEM.md` §3). Sopra il Purple il testo è sempre `--color-on-cover` pieno, mai in opacità ridotta; la freccia `↳` resta in Warm (elemento grafico, non testo). Il campo di ricerca ha un fondo `--color-bg` solido con testo Ink — un rettangolo chiaro appoggiato sul Purple, non un campo trasparente. La nav resta sulla carta, sopra la cover; la cover finisce con uno stacco netto (transizione secca, nessun gradiente) sulla carta tinta sottostante. Nessuna nuova animazione: l'unico movimento resta l'esemplare Magnetic Cursor già esistente sul titolo, di cui cambia solo il colore del testo.
- **Hero-esemplare (approvato dal curatore, 2026-07-08).** Il titolo display non è telaio inerte: è il primo esemplare dell'atlante, esposto ed etichettato come tale. Al passaggio del mouse reagisce con l'effetto Magnetic Cursor del catalogo (attrazione leggera, raggio contenuto — riusa la logica condivisa di `src/previews/magnetic-cursor.ts`, mai una riscrittura), sempre leggibile e selezionabile. Sotto il titolo, la micro-didascalia `↳ Magnetic Cursor — dal catalogo` (`--text-meta`) linka a `/e/magnetic-cursor`: è la dichiarazione esplicita che rende l'eccezione "documentata" e non un'incoerenza silenziosa (vedi `MOTION_PRINCIPLES.md` §1). Reagisce solo su hover reale (media query `(hover: hover)`, mai animazione autonoma); `prefers-reduced-motion` → nessun movimento; touch/mobile → titolo statico, GSAP mai caricato.
- Hover su una riga categoria → la preview Lite (CSS-only, mai GSAP/WebGL) compare a destra con fade `--duration-fast`. Uscita hover → resta l'ultima preview, attenuata al 60% (evita lampeggi). Ogni preview Lite è una micro-demo rappresentativa della categoria (loop lento, discreto, in pausa con `prefers-reduced-motion`): default provvisori del curatore in attesa degli "effetti vetrina" definitivi (`CHANGELOG.md`).
- Le righe categoria mostrano il conteggio voci in Geist Mono `--text-caption`.
- Collections e Playground **non compaiono** finché la rispettiva fase non è rilasciata (decisione F: si mostra solo ciò che è finito). L'indice V1 elenca quindi quattro righe: Interactions, Motion, Visual Effects, Components.
- "Aggiunti di recente": le ultime 3–5 voci `published` per `addedAt`.

Mobile (< 768): preview hover assente (niente hover su touch); le righe categoria mostrano una thumbnail statica 64×40 a destra. Search sotto il sottotitolo, full-width. La cover Purple resta anche su mobile, piena larghezza, con lo stesso stacco netto sulla carta tinta.

---

## 2. Category Page (split-pane ibrido)

```
┌─────────────────────────────────────────────────────────────────────┐
│  ← Atlas        Interactions                          [Cerca ⌘K]   │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
│                              │                                      │
│  Interactions           24   │   ┌──────────────────────────────┐   │
│  Hover, scroll, cursore…     │   │                              │   │
│                              │   │                              │   │
│  ▸ Magnetic Cursor           │   │      PREVIEW LIVE            │   │
│    Playful · Snappy          │   │      dell'effetto            │   │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄        │   │      selezionato             │   │
│    Link Underline Reveal     │   │                              │   │
│    Editorial · Subtle        │   │      (glow leggero)          │   │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄        │   │                              │   │
│    Image Trail               │   └──────────────────────────────┘   │
│    Kinetic · Playful         │                                      │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄        │   Magnetic Cursor                    │
│    Scroll-Linked Zoom        │   Il cursore attrae gli elementi…    │
│    Cinematic · Slow          │                                      │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄        │   [ Apri scheda → ]                  │
│    …                         │                                      │
│                              │   ← precedente        successivo →   │
│         col 1–5              │              col 6–12, sticky        │
│      scroll verticale        │                                      │
└─────────────────────────────────────────────────────────────────────┘
```

Comportamenti:
- La lista (sinistra) scorre **verticalmente, nativa**. Il pannello preview è sticky.
- Selezione: click, oppure ↑/↓ dalla lista, oppure ←/→ da qualunque punto della pagina. Il cambio innesca il **voltapagina orizzontale** della preview (`MOTION_PRINCIPLES.md` §3): è qui che vive la sensazione di sfogliare l'atlante.
- Ogni riga: titolo + 2 termini DNA principali. Niente thumbnail nella lista: la preview è una sola, a destra (regola un-protagonista).
- Hover su una riga ≠ selezione: l'hover alza solo l'opacità. La preview cambia al click/tastiera — cambiarla all'hover renderebbe il pannello isterico.
- `Apri scheda →` e click sul titolo portano alla Effect Page. URL: la selezione aggiorna `?e=slug` (deep-link condivisibile senza ricaricare).
- Preview Live montata on-demand; la precedente viene distrutta a voltapagina concluso.

Mobile (< 1024): layout impilato — la preview diventa un blocco sticky in alto (altezza 40vh), la lista scorre sotto. Il voltapagina orizzontale resta, attivato dal tap sulle righe e dallo swipe orizzontale sulla preview.

---

## 3. Effect Page

```
┌─────────────────────────────────────────────────────────────────────┐
│  ← Interactions      Magnetic Cursor                  [Cerca ⌘K]   │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
│                                                                     │
│  Magnetic Cursor                                        h1          │
│  Playful · Snappy · Organic · Subtle                    tag DNA     │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                                                               │  │
│  │                    PREVIEW  (full-bleed interno,              │  │
│  │                     16:9, glow leggero)                       │  │
│  │                                            [ ⟳ ] [ ⤢ ]       │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  OVERVIEW                                              col 1–8      │
│  Descrizione…                                                       │
│  Best for   ·  ritratti, portfolio giocosi, hero                   │
│  Avoid      ·  contenuti densi, e-commerce, testi lunghi           │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
│  BUILD                                                              │
│  Technology  ·  JS + GSAP          Difficulty  ·  ●●○○○            │
│  Libraries   ·  gsap               Performance ·  light            │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
│  KNOWLEDGE                                                          │
│  Origin · Popularized by · Alternatives · Learning Resources        │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
│  EXPLORE                                                            │
│  Demo ↗ · Source ↗ · Video ↗ · Article ↗                            │
│  Related: Image Trail, Cursor Follower · Components: Cursor         │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
│  INSIGHT                                                            │
│  «Una sola nota curatoriale, in corpo grande,                       │
│   tipograficamente distinta — è la voce del curatore.»              │
│                                                                     │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
│  ← effetto precedente                        effetto successivo →   │
└─────────────────────────────────────────────────────────────────────┘
```

Comportamenti:
- Le sei sezioni sono un flusso verticale unico separato da divider — **non** tab, non accordion. La pagina si legge come un articolo di rivista.
- Le etichette di sezione usano `--text-label` (maiuscoletto attenuato).
- Preview: controlli minimi — replay `⟳` e fullscreen `⤢`. Con `prefers-reduced-motion`, primo frame + «Avvia preview».
- Difficulty: 5 punti, pieni in Orange (uso non testuale conforme ai vincoli di contrasto).
- INSIGHT è tipograficamente distinto: corpo `--text-h3`, rientro, un filetto verticale Purple a sinistra. È l'unico blocco "firmato".
- Navigazione precedente/successivo in coda: prosegue l'atlante dentro la categoria.
- In V2 il toggle Study aggiunge i blocchi estesi *dentro* le stesse sezioni; in V2 compare anche «Confronta con…» accanto al titolo.

Mobile: identico, a colonna singola; preview 4:3.

---

## 4. Search (overlay)

```
┌─────────────────────────────────────────────┐
│  [ cerca: "organic"                    ✕ ]  │   overlay centrato, ⌘K
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
│  EFFETTI                                    │
│  ▸ Magnetic Cursor      Playful · Organic   │
│    Image Trail          Kinetic · Organic   │
│  COMPONENTS                                 │
│    Gallery              Editorial · Airy    │
│┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
│  ↑↓ naviga · ↵ apri · esc chiudi            │
└─────────────────────────────────────────────┘
```

Unico elemento flottante dell'app (usa `--shadow-soft`). Dettagli funzionali in `SEARCH.md`. La search in Home è la stessa componente, incassata nella pagina invece che flottante.
