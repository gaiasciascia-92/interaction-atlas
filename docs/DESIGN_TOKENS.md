# DESIGN_TOKENS — Interaction Atlas

Fonte unica di verità: `src/styles/tokens.css`. Questo documento è la specifica; il file CSS deve corrispondere 1:1. Nessun valore hard-coded nei componenti: se serve un valore, o esiste un token o si propone un token.

---

## 1. Colore

```css
:root {
  /* Palette base */
  --color-bg:        #F7F6F3;  /* Warm White — unico fondo di pagina */
  --color-bg-tint:   #F1EFEA;  /* Warm White più profondo — bande di "carta" (TASK_013) */
  --color-ink:       #1E1B1C;  /* Black — testo primario */
  --color-primary:   #5C5D8D;  /* Purple — interazione */
  --color-warm:      #FFA630;  /* Orange — evidenziazione non testuale */
  --color-accent:    #34B3A9;  /* Green — accento raro */

  /* Derivati (sempre per opacità del Black, mai grigi esterni) */
  --color-ink-80:    rgb(30 27 28 / 0.80);  /* testo secondario     */
  --color-ink-60:    rgb(30 27 28 / 0.60);  /* testo attenuato      */
  --color-ink-40:    rgb(30 27 28 / 0.40);  /* disabilitato, hint   */
  --color-divider:   rgb(30 27 28 / 0.10);  /* divider 1px          */
  --color-hairline:  rgb(30 27 28 / 0.06);  /* divider secondario   */

  /* Interazione */
  --color-primary-soft: rgb(92 93 141 / 0.08);  /* fondo selezione   */
  --color-warm-soft:    rgb(255 166 48 / 0.14); /* velo Orange — sottolineature/marker grafici (TASK_013) */
  --color-focus:        var(--color-primary);
}
```

### Vincoli di contrasto (verificati, WCAG 2.1)
| Coppia | Rapporto | Uso consentito |
|---|---|---|
| Ink / Bg | 14.9:1 | Tutto |
| Ink-60 / Bg | ~7.4:1 | Testo secondario, anche piccolo |
| Primary / Bg | 4.6:1 | Testo ≥ 16 px o ≥ 14 px semibold (AA) |
| Warm / Bg | 1.9:1 | **Mai testo.** Solo marker, riempimenti grafici, sottolineature |
| Accent / Bg | 2.5:1 | **Mai testo.** Solo indicatori puntuali ≥ 3 px di spessore |

`--color-bg-tint` (TASK_013) è una variante più profonda di Bg, riservata alle bande di "carta" (`DESIGN_SYSTEM.md` §3). Verificato: la luminanza relativa scende di meno del 7% rispetto a Bg, quindi ogni coppia della tabella sopra resta nello stesso ordine di grandezza su Bg-tint (Ink e Ink-60 restano ampiamente leggibili; Primary resta sopra soglia AA per testo ≥14px semibold; Warm e Accent restano non testuali per costruzione, quindi il calo non è rilevante).

## 2. Spaziatura (base 8 px)

```css
:root {
  --space-05: 4px;    /* solo micro-allineamenti interni */
  --space-1:  8px;
  --space-2:  16px;
  --space-3:  24px;
  --space-4:  32px;
  --space-6:  48px;
  --space-8:  64px;
  --space-12: 96px;
  --space-16: 128px;  /* respiro tra macro-sezioni editoriali */
}
```

## 3. Tipografia

```css
:root {
  --font-sans: "Geist", system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;

  /* Scala — desktop (mobile fra parentesi, applicata sotto --bp-md) */
  --text-display: 64px;  /* (40px)  line-height 1.05, -0.02em, peso 550 */
  --text-h1:      44px;  /* (32px)  line-height 1.1,  -0.02em, peso 550 */
  --text-h2:      30px;  /* (24px)  line-height 1.2,  -0.01em, peso 550 */
  --text-h3:      21px;  /* (19px)  line-height 1.3,   0,      peso 550 */
  --text-body:    16px;  /*         line-height 1.6                     */
  --text-small:   14px;  /*         line-height 1.5                     */
  --text-caption: 12px;  /*         line-height 1.4                     */
  --text-label:   12px;  /* maiuscoletto, +0.08em, peso 500 — etichette di sezione */

  --measure: 68ch;       /* larghezza massima del testo corrente */
}
```

Geist variabile self-hosted (`public/fonts/`), subset latino, `font-display: swap`. Pesi usati: 400, 500, 550/600. Nessun 700+.

## 4. Raggi, bordi, elevazione

```css
:root {
  --radius-0: 0;        /* elementi editoriali */
  --radius-s: 6px;      /* controlli */
  --radius-m: 10px;     /* contenitore preview */
  --radius-pill: 999px; /* solo tag DNA */

  --border-thin: 1px solid var(--color-divider);

  /* Unica ombra ammessa — elementi flottanti */
  --shadow-soft: 0 8px 32px rgb(30 27 28 / 0.10);

  /* Unico glow ammesso — preview attiva */
  --glow-subtle: 0 0 48px rgb(92 93 141 / 0.10);
}
```

## 5. Motion (dettaglio d'uso in MOTION_PRINCIPLES.md)

```css
:root {
  --duration-instant: 120ms;   /* feedback: hover, focus */
  --duration-fast:    200ms;   /* micro-transizioni UI */
  --duration-base:    320ms;   /* transizioni standard */
  --duration-page:    440ms;   /* voltapagina della preview (atlas) */

  --ease-out:    cubic-bezier(0.22, 1, 0.36, 1);    /* uscite, entrate UI */
  --ease-inout:  cubic-bezier(0.65, 0, 0.35, 1);    /* voltapagina */
  --ease-linear: linear;                             /* solo progress/loop */
}
```

Equivalenti GSAP: `--ease-out` → `expo.out` (approssimazione dichiarata), `--ease-inout` → `power2.inOut`. Le preview degli *effetti* sono libere di usare qualunque easing: questi token governano solo il telaio dell'app.

## 6. Z-index

```css
:root {
  --z-base: 0;
  --z-preview: 10;
  --z-nav: 100;
  --z-search: 200;   /* command palette / overlay ricerca */
  --z-toast: 300;
}
```

Cinque livelli. Se ne serve un sesto, il design è sbagliato.

## 7. Breakpoint e layout

```css
:root {
  --bp-sm: 480px;    /* mobile large */
  --bp-md: 768px;    /* tablet — sotto: nav compatta, split-pane impilato */
  --bp-lg: 1024px;   /* laptop — da qui: split-pane attivo */
  --bp-xl: 1280px;
  --max-width: 1500px;

  --grid-columns: 12;
  --grid-gutter: 24px;
  --page-margin: 48px;   /* 24px ≤ lg, 16px ≤ sm */
}
```

## 8. Regole di governo

1. Un componente che ha bisogno di un valore non tokenizzato non lo inventa: si propone il token in `CHANGELOG.md` e si attende approvazione.
2. I token di colore non si combinano in modi nuovi senza verifica di contrasto.
3. `tokens.css` è l'unico file dove compaiono valori esadecimali o millisecondi.
