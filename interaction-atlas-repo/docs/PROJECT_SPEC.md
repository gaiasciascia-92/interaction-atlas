# PROJECT_SPEC — Interaction Atlas

## 1. Problema

Un creativo che costruisce un portfolio fotografico o un sito contemporaneo perde ore a cercare riferimenti di interazione sparsi tra Awwwards, Codrops, CodePen, Twitter e memoria personale. Il materiale esiste, ma è disperso, non confrontabile, e privo di giudizio: nessuno dice *quando* un effetto è appropriato e quando è una moda dannosa.

## 2. Obiettivo

Ridurre al minimo il tempo tra la domanda «che interazione uso qui?» e una decisione informata. Metriche di successo qualitative per la V1:

- da Home a una preview live pertinente: **≤ 3 interazioni** (una ricerca o due click);
- ogni effetto risponde sempre a: *cos'è, come si costruisce, da dove viene, quando evitarlo, cosa ne pensa il curatore*;
- l'interfaccia non richiede mai apprendimento: chi ha usato Linear o Read.cv si orienta in 10 secondi.

## 3. Non-obiettivi

- Non è una libreria di snippet copia-incolla (il codice è referenziato, non ospitato come prodotto).
- Non è un social network: nessun account, nessun commento, nessun voto (V1–V3).
- Non è una demo di bravura: gli effetti vivono nelle preview, mai nel telaio dell'interfaccia.
- Non è un CMS multi-autore: un solo curatore.

## 4. Utente

Primario: il curatore stesso (fotografa/o e web designer) come strumento di lavoro quotidiano.
Secondario: creativi e sviluppatori che ricevono il link — l'Atlas funge anche da pezzo di posizionamento professionale.

Implicazione: la V1 può permettersi scorciatoie da power-user (tastiera, ricerca istantanea) perché l'utente primario la usa ogni giorno.

## 5. Architettura dell'informazione

```
Home
├── Interactions      (hover, scroll, cursor, drag…)
├── Motion            (transizioni, reveal, easing patterns…)
├── Visual Effects    (grain, blur, distortion, WebGL…)
├── Components        (Hero, Gallery, Lightbox, Navigation, Cursor,
│                      Magazine Grid, Timeline, Cards, Carousel, Footer)
├── Collections       (V2 — ricette progettuali)
└── Playground        (V3 — sperimentazione su fotografie proprie)
```

Ogni sezione è raggiungibile in un'interazione da qualunque punto dell'app (navigazione persistente + ricerca globale).

### Modalità Browse / Study (V2)

- **Browse** (default): contenuto essenziale, orientato alla decisione rapida.
- **Study**: la stessa struttura mostra i campi estesi (`study.*` nello schema dati): storia approfondita, analisi tecnica, casi d'uso commentati. Un toggle globale, persistito in sessione. Nessuna pagina duplicata: stessa rotta, densità diversa.

## 6. Pagine (V1)

### 6.1 Home
Titolo, sottotitolo, ricerca sempre visibile, elenco categorie come **righe tipografiche** (non card) con preview al passaggio del mouse nella zona destra, ultimi elementi aggiunti. Dettagli in `WIREFRAMES.md`.

### 6.2 Category Page — layout ibrido (decisione approvata)
Split-pane. Sinistra: lista verticale degli effetti (scansione rapida). Destra: preview live dell'effetto selezionato, sticky.

La metafora dell'atlante vive nel **linguaggio orizzontale della preview**: cambiando effetto (click, frecce ↑↓ o ←→), la preview entra lateralmente come una pagina sfogliata. Lo scroll di pagina resta verticale e nativo — nessun hijacking della rotella. Motivazione: la scansione verticale è più veloce (obiettivo §2), l'hijacking contraddice la Silent UI e crea problemi di accessibilità e di comportamento trackpad/rotella.

### 6.3 Effect Page
Sei sezioni, nessuna in più: **Preview, Overview, Build, Knowledge, Explore, Insight.** Contenuti per sezione definiti dallo schema dati (§8). Layout in `WIREFRAMES.md`.

### 6.4 Search
Sempre visibile in Home; ovunque via barra persistente e scorciatoia `⌘K / Ctrl+K` (decisione A, approvata). Comportamento completo in `SEARCH.md`.

## 7. Gerarchia delle preview (vincolo di performance)

Tre livelli, non negoziabili:

| Livello | Dove | Tecnica | Costo |
|---|---|---|---|
| **Lite** | hover in Home, righe di lista | CSS puro o video ≤ 1 MB in loop | Trascurabile |
| **Live** | Category Page (pannello destro), Effect Page | Modulo GSAP/Canvas montato on-demand, smontato all'uscita | Medio |
| **Heavy** | Solo Effect Page, solo effetti WebGL | Three.js lazy-load, avvio manuale o su viewport, un solo contesto WebGL attivo per pagina | Alto |

Regola: **mai più di una preview Live/Heavy attiva contemporaneamente.** Quick Compare (V2) usa questa stessa regola con time-sharing o snapshot (vedi §9).

## 8. Modello dati

Astro Content Collections, una voce `.mdx` per effetto, schema validato con Zod.

```ts
// src/types/effect.ts
type Category = "interactions" | "motion" | "visual-effects" | "components";

interface Effect {
  id: string;                    // slug
  title: string;
  category: Category;
  dna: string[];                 // 4–8 termini dal vocabolario VISUAL_DNA.md
  summary: string;               // una frase, usata in liste e ricerca

  overview: {
    description: string;         // markdown
    bestFor: string[];
    avoid: string[];
  };

  build: {
    technology: string[];        // es. ["CSS", "GSAP"]
    libraries: { name: string; url: string }[];
    difficulty: 1 | 2 | 3 | 4 | 5;
    performance: "light" | "moderate" | "heavy";
    notes?: string;
  };

  knowledge: {
    origin: string;
    popularizedBy: string[];
    alternatives: string[];      // id di altri effetti o testo libero
    resources: { title: string; url: string; type: "article" | "video" | "doc" | "demo" }[];
  };

  explore: {
    demo?: string;               // URL
    source?: string;
    video?: string;
    article?: string;
    relatedEffects: string[];    // id
    relatedComponents: string[]; // id di catalog-components
  };

  insight: string;               // UNA nota curatoriale. Voce del curatore.

  study?: {                      // V2 — contenuti estesi per modalità Study
    deepDive?: string;           // markdown
    caseStudies?: { title: string; url: string; comment: string }[];
  };

  preview: {
    kind: "css" | "gsap" | "webgl";
    lite: string;                // path a video/poster o id di preview CSS
    module: string;              // path del modulo in src/previews/
    params?: PlaygroundParams;   // V3
  };

  addedAt: string;               // ISO date
  status: "draft" | "published";
}
```

Le voci della sezione Components usano lo stesso schema (categoria `components`); le Collections hanno schema proprio in `COLLECTIONS.md`.

## 9. Feature V2 (specificate, non sviluppate in V1)

- **Collections** — `COLLECTIONS.md`.
- **Quick Compare** — due effetti affiancati: Preview, Visual DNA, Build, Insight. Vincolo §7: una sola preview live alla volta; l'altra mostra l'ultimo frame come snapshot finché non riceve hover/focus. Confronto raggiungibile da ogni Effect Page («Confronta con…»).
- **Study Mode** — §5.

## 10. Feature V3

- **Playground** — `PLAYGROUND.md`.
- **PWA completa** — installabilità, offline per contenuti testuali e preview Lite; le preview Heavy restano online-only. La PWA è deliberatamente in V3: prima il valore, poi il packaging.

## 11. Vincoli tecnici trasversali

- Lighthouse Performance ≥ 90 su Home e Category Page (mobile).
- Zero JavaScript sul telaio delle pagine statiche: JS solo nelle isole (preview, search, nav mobile).
- `prefers-reduced-motion` rispettato ovunque (vedi `MOTION_PRINCIPLES.md` §6).
- Contrasto testo: AA minimo. Orange `#FFA630` mai come colore di testo su Warm White (1.9:1). Vedi `DESIGN_TOKENS.md`.
- Font self-hosted (`woff2`), `font-display: swap`, subset latino.

## 12. Decisioni — approvate dal curatore il 2026-07-08

| # | Proposta | Esito |
|---|---|---|
| A | Command palette `⌘K` per la ricerca globale (con bottone Cerca sempre visibile) | ✅ Approvata |
| B | Geist Mono solo per metadati tecnici (Build, tag DNA) | ✅ Approvata |
| C | Etichette di navigazione in inglese, tutto il resto in italiano | ✅ Approvata |
| D | Rotta breve `/e/[slug]` per gli effetti | ✅ Approvata |
| E | Dark mode rimandata a dopo V3 | ✅ Approvata |
| F | Righe Collections/Playground visibili in Home prima del rilascio | ❌ Respinta — **si mostra solo ciò che è finito**: le righe compaiono solo al rilascio della rispettiva fase |
| G | Termini DNA riconosciuti nella ricerca come filtri attivi («DNA: Organic ✕») | ✅ Approvata |
| H | Scorciatoia `f` per fullscreen preview + og-image tipografica per la condivisione | ✅ Approvate entrambe |

Nessuna decisione di design resta aperta per la V1. Ogni nuova proposta segue lo stesso processo: motivazione scritta, approvazione, registrazione in `CHANGELOG.md`.
