# COMPONENT_RULES — Componenti UI dell'applicazione

Questo documento riguarda i componenti **dell'interfaccia** (in `src/ui/`), non la sezione "Components" del catalogo (che è contenuto, in `src/content/catalog-components/`). Vedi la nota sul naming in `README.md`.

## Regole generali

1. **Un componente non porta stile di pagina.** Margini esterni e posizionamento sono del layout che lo ospita; il componente definisce solo il proprio interno. (Niente `margin` esterni nei CSS Module dei componenti.)
2. **Solo token.** Nessun valore esadecimale, px arbitrario o ms nei componenti: tutto da `tokens.css` (`DESIGN_TOKENS.md` §8).
3. **Statico di default.** Un componente è HTML+CSS finché non è dimostrato che serve JS. Le isole Astro (`client:*`) sono l'eccezione documentata, non la norma.
4. **Accessibile per costruzione:** ruoli ARIA corretti, focus visibile, navigabilità da tastiera. Un componente non accessibile non viene mergiato.
5. **Nomi in inglese, PascalCase**, un componente per cartella con il suo `.module.css` accanto.

## Inventario V1

| Componente | Tipo | JS | Note |
|---|---|---|---|
| `AppNav` | telaio | isola (solo mobile) | nav superiore persistente; su mobile diventa menu compatto |
| `AppFooter` | telaio | no | nome, anno, contatto |
| `PageShell` | layout | no | max-width, margini, griglia |
| `SectionLabel` | editoriale | no | etichette maiuscoletto (OVERVIEW, BUILD…) |
| `Divider` | editoriale | no | 1 px, `--color-divider` |
| `CategoryRow` | Home | no | riga categoria: nome, conteggio, stato hover |
| `EntryRow` | liste | no | riga effetto: titolo + 2 termini DNA |
| `EntryList` | Category | isola | gestione selezione, tastiera, deep-link `?e=` |
| `PreviewPane` | Category/Effect | isola | monta/smonta i moduli preview, voltapagina, glow |
| `PreviewLite` | Home/liste | no | video loop o CSS puro; nessuna dipendenza |
| `DnaTags` | trasversale | no | pill Geist Mono; click → ricerca filtrata |
| `MetaField` | Effect/Build | no | coppia etichetta·valore in Geist Mono |
| `DifficultyDots` | Effect/Build | no | 5 punti, pieni in Orange, con testo alternativo |
| `InsightBlock` | Effect | no | corpo h3, filetto Purple, blocco firmato |
| `ExternalLink` | Explore | no | link con ↗, `rel` corretti |
| `SearchBar` | Home | isola | variante incassata della ricerca |
| `SearchOverlay` | globale | isola | command palette ⌘K; unico elemento con `--shadow-soft` |
| `PrevNextNav` | Effect | no | effetto precedente/successivo |
| `SkipLink` | a11y | no | "salta al contenuto", primo elemento focusabile |

Componenti V2/V3 (`CompareView`, `StudyToggle`, `PlaygroundCanvas`, `CollectionFlow`) sono specificati nei rispettivi documenti e **non** vanno predisposti "per il futuro" in V1: niente astrazioni anticipate.

## Contratto delle preview (il confine più importante dell'architettura)

I moduli in `src/previews/` non sono componenti UI: sono contenuto eseguibile. Il confine è un contratto TypeScript unico:

```ts
// src/types/preview.ts
export interface PreviewModule {
  mount(el: HTMLElement, opts?: { reducedMotion?: boolean }): void;
  destroy(): void;           // obbligatorio: nessun tween/raf/contesto residuo
  pause?(): void;            // chiamato quando esce dal viewport / tab nascosta
  resume?(): void;
}
```

- `PreviewPane` è l'**unico** componente autorizzato a importare moduli preview (via `import()` dinamico).
- Un modulo preview non tocca mai il DOM fuori dal proprio `el`, non registra listener globali senza rimuoverli in `destroy()`, non importa nulla da `src/ui/`.
- GSAP/Three.js vivono solo dentro i moduli preview (regole in `MOTION_PRINCIPLES.md` §4).

## Stati obbligatori

Ogni componente interattivo definisce nel proprio CSS Module: default, hover, focus-visible, active/selected, disabled. Ogni componente che carica dati o moduli definisce: loading (testuale) ed error (testuale, in riga). I trattamenti sono quelli di `DESIGN_SYSTEM.md` §6 — un componente non inventa i propri stati.

## Definition of Done (per ogni componente)

- [ ] Solo token; zero valori magici.
- [ ] Nessun margine esterno.
- [ ] Navigabile e azionabile da sola tastiera.
- [ ] Focus visibile conforme (outline Purple 2 px).
- [ ] Verificato con `prefers-reduced-motion: reduce`.
- [ ] Verificato a 360 px, 768 px, 1024 px, 1500 px+.
- [ ] Se isola: si idrata solo quando serve (`client:visible` o `client:idle`, mai `client:load` senza motivazione scritta).
