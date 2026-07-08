# TASK_007 — Effect Page

**Milestone:** M4 · **Dipende da:** TASK_003, TASK_004

## Scope

Effect Page come da `WIREFRAMES.md` §3: flusso verticale unico con le sei sezioni (Preview, Overview, Build, Knowledge, Explore, Insight), nessuna in più.

- Rotta `/e/[slug]` (decisione aperta D; fallback `/[category]/[slug]` se non approvata).
- Preview full-bleed interna 16:9 con replay e fullscreen; `PreviewPane` riusato.
- `DnaTags` (click → ricerca filtrata, attivo dopo TASK_008), `MetaField`, `DifficultyDots` (Orange, con testo alternativo «Difficoltà 2 su 5»), `ExternalLink`, `InsightBlock`, `PrevNextNav` (ordine interno alla categoria).
- Sezioni renderizzate solo se il contenuto esiste (un effetto senza `video` non mostra la voce Video).

## Criteri di accettazione

- [ ] Le sei sezioni sono flusso, non tab/accordion; etichette in `--text-label`.
- [ ] JS solo per la preview (unica isola); il resto è statico.
- [ ] `InsightBlock` tipograficamente distinto come da wireframe (h3, filetto Purple).
- [ ] Fullscreen accessibile da tastiera e con `esc` coerente.
- [ ] Prev/next mantiene il contesto categoria e non ricarica l'intera preview pane senza transizione.
