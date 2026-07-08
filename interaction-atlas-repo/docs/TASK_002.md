# TASK_002 — Design token e base tipografica

**Milestone:** M1 · **Dipende da:** TASK_001 · **Blocca:** TASK_003+

## Scope

- `src/styles/tokens.css`: trascrizione 1:1 di `DESIGN_TOKENS.md` (colore, spaziatura, tipografia, raggi, ombra/glow, motion, z-index, breakpoint).
- `src/styles/base.css`: reset minimale, fondo `--color-bg`, colore testo, selezione testo, focus-visible globale (outline Purple 2 px / offset 2 px), `::selection` in `--color-primary-soft`.
- `src/styles/typography.css`: classi/custom properties per la scala (display→caption, label maiuscoletto), `--measure`, trattamento link.
- Pagina interna `/styleguide` **[solo sviluppo, esclusa da build di produzione]** che mostra scala tipografica, colori con i rapporti di contrasto, spaziature, stati interattivi. È lo strumento di verifica visiva per tutte le PR successive.

## Criteri di accettazione

- [ ] Nessun valore esadecimale/px/ms fuori da `tokens.css` (grep in CI come guardia).
- [ ] `/styleguide` riproduce fedelmente `DESIGN_TOKENS.md`; verifica manuale dei contrasti dichiarati.
- [ ] Con `prefers-reduced-motion` le custom property di durata collassano a valori ≤ 160 ms (media query nel token file).
- [ ] Mobile: la scala tipografica scala correttamente sotto `--bp-md`.
