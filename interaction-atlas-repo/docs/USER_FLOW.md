# USER_FLOW — Interaction Atlas

I flussi sono ordinati per frequenza d'uso attesa. Il vincolo di prodotto (PROJECT_SPEC §2) si applica al flusso 1: **≤ 3 interazioni da Home a una preview pertinente.**

---

## Flusso 1 — Ricerca per intenzione (il flusso primario)

> «Sto costruendo un portfolio di ritratti, voglio qualcosa di calmo ed elegante per le immagini.»

```
Home (o ⌘K da qualunque pagina)
  → digita "calm elegant"                        [interazione 1]
  → risultati istantanei raggruppati per tipo
  → ↵ sul risultato                              [interazione 2]
  → Effect Page: preview live + Insight
```

Due interazioni. La ricerca indicizza i termini DNA con peso alto: è qui che il Visual DNA paga.

Esito negativo: nessun risultato → la ricerca mostra i termini DNA più vicini come suggerimenti cliccabili («Prova: Calm · Soft · Refined»). Mai una pagina vuota.

## Flusso 2 — Esplorazione di categoria (sfogliare l'atlante)

> «Fammi vedere cosa c'è per lo scroll.»

```
Home → riga "Motion"                             [1]
  → Category Page: primo effetto già selezionato, preview live attiva
  → ↓ ↓ ↓ (o click) per scorrere le voci         [2…n]
      ogni cambio = voltapagina orizzontale della preview
  → "Apri scheda →"                              [n+1]
  → Effect Page
```

Nota di design: il primo effetto è **preselezionato** — la Category Page non si apre mai con il pannello vuoto. Criterio di preselezione: l'ultima voce aggiunta della categoria.

## Flusso 3 — Studio di un effetto

```
Effect Page
  → Preview (replay, fullscreen)
  → Overview: capisce il contesto (Best for / Avoid)
  → Build: valuta costo e fattibilità (difficulty, performance)
  → Knowledge: origine e risorse per approfondire
  → Explore: demo esterna / codice / video
  → Insight: il parere del curatore
  → [fine pagina] effetto successivo → (resta nel flusso, non torna indietro)
```

La pagina è pensata per essere letta dall'alto in basso come decisione progressiva: *mi piace? → posso permettermelo? → da dove viene? → dove lo vedo vivo? → cosa ne pensa chi cura l'atlante?*

## Flusso 4 — Rientro da link condiviso

```
URL /e/magnetic-cursor (o /interactions?e=magnetic-cursor)
  → Effect Page / Category con selezione già attiva
  → breadcrumb "← Interactions" per risalire
```

Ogni stato utile ha un URL. Il back del browser funziona sempre (Silent UI, regola 7).

## Flusso 5 — Confronto (V2)

```
Effect Page → "Confronta con…"                   [1]
  → ricerca inline del secondo effetto           [2]
  → Quick Compare: Preview | Preview
                   DNA comune / divergente
                   Build affiancato
                   Insight affiancati
  → scelta → Effect Page del vincitore
```

Regola performance: la preview attiva è una sola; l'altra mostra uno snapshot e si attiva su hover/focus.

## Flusso 6 — Playground (V3)

```
Playground → carica fotografia (locale, mai in rete)
  → scegli effetto (dal catalogo, filtrato per "parametrizzabile")
  → regola intensità / velocità
  → confronta con originale (press-and-hold o slider)
  → [eventuale] apri la Effect Page dell'effetto scelto
```

## Mappa di navigazione persistente

```
        ┌────────── nav (sempre presente) ──────────┐
        │  ← Atlas · categoria corrente · Cerca ⌘K  │
        └───────────────────────────────────────────┘
Home ⇄ Category ⇄ Effect      (⌘K da ovunque, esc chiude)
                └→ effetto correlato → Effect (stessa pagina, voltapagina)
```

Scorciatoie tastiera (V1): `⌘K / Ctrl+K` ricerca · `↑↓` selezione in lista · `←→` effetto precedente/successivo · `esc` chiude overlay · `f` fullscreen preview (decisione H, approvata).
