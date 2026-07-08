# Interaction Atlas

**Uno strumento professionale per scegliere l'interazione giusta nel minor tempo possibile.**

Interaction Atlas è una Progressive Web App pensata come atlante editoriale di interazioni, motion, effetti visivi e componenti per lo sviluppo di portfolio fotografici e siti web contemporanei.

Non è una raccolta di effetti. È uno strumento decisionale: cataloga, contestualizza, confronta e permette di sperimentare — perché il valore non sta nell'avere mille effetti, ma nel capire in pochi secondi quale usare, quando usarlo e quando evitarlo.

Non è una dashboard. È una rivista interattiva.

---

## Principi non negoziabili

1. **La preview è il protagonista.** L'interfaccia non compete mai con il contenuto.
2. **Silent UI.** L'interfaccia non sorprende, non interrompe, non decora. Vedi `SILENT_UI.md`.
3. **Editoriale, non gestionale.** Tipografia grande, righe e divider sottili, niente card pesanti, niente ombre gratuite.
4. **Velocità di scelta.** Ogni schermata deve ridurre il tempo tra domanda ("che interazione uso qui?") e risposta.
5. **Curatela, non accumulo.** Ogni voce ha un solo Insight curatoriale, scritto da una persona con un'opinione.

## Riferimenti estetici

Fusione tra Apple, Read.cv, Linear, Raycast, Notion (solo per la semplicità) e Awwwards (senza gli eccessi).

## Stack tecnologico

| Livello | Tecnologia |
|---|---|
| Framework | Astro (static-first, isole interattive) |
| Linguaggio | TypeScript (strict) |
| Stili | CSS Modules + design token in CSS custom properties |
| Motion | GSAP (caricato per-preview, mai globale) |
| 3D / WebGL | Three.js (lazy-load solo negli effetti che lo richiedono) |
| Build | Vite (via Astro) |
| Icone | Lucide |
| Deploy | Vercel |
| PWA | vite-plugin-pwa (fase V3) |

## Fasi di sviluppo

| Fase | Contenuto | Stato |
|---|---|---|
| **V1 — Catalogo** | Home, Category Page, Effect Page, Search, 15–20 effetti curati | In documentazione |
| **V2 — Studio** | Collections, Quick Compare, modalità Study | Specificata |
| **V3 — Laboratorio** | Playground, PWA completa (offline, install) | Specificata |

Il dettaglio è in `ROADMAP.md`. Ogni fase è un prodotto completo e rilasciabile, non un cantiere aperto.

## Lingua

Contenuti e interfaccia in **italiano**. I nomi delle sezioni dell'Atlas (Interactions, Motion, Visual Effects, Components, Collections, Playground) e i nomi delle sezioni della scheda effetto (Preview, Overview, Build, Knowledge, Explore, Insight) restano in **inglese**, come termini propri del prodotto — coerenti con il registro editoriale dei riferimenti (Read.cv, Linear).

## Indice della documentazione

| Documento | Contenuto |
|---|---|
| `PROJECT_SPEC.md` | Obiettivi, non-obiettivi, architettura dell'informazione, modello dati, criteri di accettazione |
| `DESIGN_SYSTEM.md` | Griglia, tipografia, colore, superfici, regole visive |
| `DESIGN_TOKENS.md` | Token definitivi (colore, spaziatura, tipografia, motion, breakpoint) |
| `WIREFRAMES.md` | Wireframe testuali di tutte le pagine V1 |
| `USER_FLOW.md` | Flussi utente principali |
| `COMPONENT_RULES.md` | Regole e inventario dei componenti UI dell'applicazione |
| `VISUAL_DNA.md` | Vocabolario controllato del Visual DNA e regole d'uso |
| `MOTION_PRINCIPLES.md` | Principi, durate, easing, regole GSAP, reduced-motion |
| `SILENT_UI.md` | Manifesto operativo della Silent UI, con checklist |
| `SEARCH.md` | Comportamento della ricerca |
| `COLLECTIONS.md` | Spec V2: le Collections come ricette progettuali |
| `PLAYGROUND.md` | Spec V3: il Playground |
| `ROADMAP.md` | Fasi, milestone, piano contenuti |
| `CHANGELOG.md` | Storico delle modifiche |
| `TASK_001.md` … `TASK_010.md` | Task operativi della fase V1 |

## Struttura della repository (proposta)

```
interaction-atlas/
├── docs/                    # questa documentazione
├── public/
│   └── fonts/               # Geist, Geist Mono (self-hosted, woff2)
├── src/
│   ├── content/             # Astro Content Collections
│   │   ├── effects/         # una voce .mdx per effetto
│   │   ├── catalog-components/  # voci della sezione Components
│   │   └── collections/     # ricette (V2)
│   ├── pages/
│   │   ├── index.astro              # Home
│   │   ├── [category]/index.astro   # Category Page
│   │   └── e/[slug].astro           # Effect Page
│   ├── layouts/
│   ├── ui/                  # componenti UI dell'app (vedi nota naming)
│   ├── previews/            # un modulo per preview live (lazy)
│   ├── styles/              # tokens.css, base.css, typography.css
│   ├── lib/                 # search, utilities
│   └── types/
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

**Nota sul naming.** "Components" è sia una sezione del catalogo (Hero, Gallery, Lightbox…) sia il nome tecnico dei componenti dell'interfaccia. Per evitare ambiguità permanente: i componenti dell'app vivono in `src/ui/`, le voci di catalogo in `src/content/catalog-components/`. Nei documenti, "componenti UI" indica sempre l'app, "Components" (maiuscolo, inglese) sempre la sezione del catalogo.

## Regole di lavoro

- Nessuna decisione di design autonoma durante lo sviluppo: le proposte di modifica vengono argomentate e attendono approvazione.
- Ogni deviazione dai documenti va registrata in `CHANGELOG.md`.
- Le proposte oltre il brief originale (A–H) sono state decise dal curatore il 2026-07-08: esiti in `PROJECT_SPEC.md` §12. Le proposte future ancora aperte restano marcate **[PROPOSTA]** (ne resta una, V3: fotografia demo pre-caricata nel Playground).
