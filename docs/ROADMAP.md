# ROADMAP — Interaction Atlas

Principio: **ogni fase è un prodotto completo e rilasciabile.** Nessuna fase inizia se la precedente non è pubblicata e con contenuto reale. Il collo di bottiglia dichiarato del progetto non è il codice: è il contenuto curato. La roadmap è costruita attorno a questo.

---

## V1 — Catalogo (fase corrente)

**Promessa:** dall'apertura dell'app a una preview live pertinente in ≤ 3 interazioni.

### Sviluppo
| Milestone | Contenuto | Task |
|---|---|---|
| M1 — Fondazioni | Repo, Astro + TS + CSS Modules, token, base tipografica | TASK_001, TASK_002 |
| M2 — Telaio | Layout, navigazione, griglia, footer | TASK_003 |
| M3 — Dati | Content Collections, schema Zod, 3 effetti campione | TASK_004 |
| M4 — Pagine | Home, Category Page (ibrido), Effect Page | TASK_005–007 |
| M5 — Ricerca | Indice client-side, barra persistente | TASK_008 |
| M6 — Contenuto | 15–20 effetti completi (bozze Claude → revisione curatore) | TASK_009 |
| M7 — Qualità | Accessibilità, performance, QA cross-device, deploy Vercel | TASK_010 |

### Piano contenuti V1 (15–20 voci)
Distribuzione proposta: 6 Interactions, 4 Motion, 4 Visual Effects, 4–6 Components. Criterio di selezione: effetti realmente usabili in portfolio fotografici, non curiosità tecniche. Ogni voce esce solo con Insight revisionato dal curatore — **una voce senza Insight personale non si pubblica.**

### Criteri di uscita V1
- Lighthouse ≥ 90 (Performance, mobile) su Home e Category.
- AA su tutti i testi; `prefers-reduced-motion` verificato a mano.
- 15 effetti `published` minimo.
- Nessuna preview Live montata fuori viewport.

---

## V2 — Studio

**Promessa:** dall'effetto singolo al ragionamento progettuale.

- **Collections** — ricette progettuali con narrativa del "perché funziona insieme" (`COLLECTIONS.md`). Richiede: 3 Collections curate al lancio.
- **Quick Compare** — confronto a due colonne (Preview, DNA, Build, Insight) con regola una-sola-preview-live.
- **Study Mode** — toggle globale; richiede la scrittura dei campi `study.*` per almeno metà del catalogo. Costo editoriale rilevante: pianificare prima di iniziare lo sviluppo.
- Estensione catalogo: obiettivo 35–40 voci.

### Criteri di uscita V2
- 3 Collections pubblicate con narrativa completa.
- Compare funzionante senza degradare le performance della Effect Page.
- Study Mode con contenuto reale (non struttura vuota) su ≥ 50% del catalogo.

---

## V3 — Laboratorio

**Promessa:** provare un effetto sulla *propria* fotografia prima di scrivere una riga di codice.

- **Playground** (`PLAYGROUND.md`) — upload locale, applicazione effetto, intensità/velocità, confronto con originale. Tutto client-side: nessuna immagine lascia il dispositivo.
- **PWA completa** — vite-plugin-pwa: manifest, installabilità, offline per contenuti testuali e preview Lite. Preview Heavy online-only.
- Estensione catalogo: obiettivo 50+ voci.

### Criteri di uscita V3
- Playground fluido (60 fps su hardware medio) con almeno 8 effetti parametrizzati.
- App installabile; catalogo consultabile offline.

---

## Oltre V3 (non pianificato, solo annotato)

Dark mode (decisione aperta E), esportazione "brief di interazione" in PDF per clienti, versione inglese dei contenuti, RSS/newsletter degli ultimi effetti aggiunti. Nessuna di queste voci è promessa.
