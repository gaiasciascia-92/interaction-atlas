# TASK_006 — Category Page (split-pane ibrido)

**Milestone:** M4 · **Dipende da:** TASK_003, TASK_004 · **Il task più delicato della V1**

## Scope

Category Page come da `WIREFRAMES.md` §2: lista verticale (col 1–5), `PreviewPane` sticky (col 6–12), voltapagina orizzontale come da `MOTION_PRINCIPLES.md` §3.

- `EntryList` (isola): selezione via click, ↑/↓, ←/→ globali; sync con `?e=slug` (history replace, deep-link funzionante).
- `PreviewPane` (isola): montaggio on-demand dei moduli, distruzione della preview uscente a voltapagina concluso, coda di input rapidi che salta all'ultimo richiesto, glow sulla preview attiva, pause/resume su visibilità.
- Primo effetto preselezionato (ultima voce aggiunta della categoria).
- Mobile: layout impilato, preview sticky 40vh, swipe orizzontale sulla preview.

## Criteri di accettazione

- [ ] Scroll di pagina 100% nativo; nessun listener wheel/touch che alteri lo scroll.
- [ ] Voltapagina con direzione semantica corretta (successivo da destra, precedente da sinistra), 60 fps.
- [ ] Input a raffica (↓ tenuto premuto): nessuna coda di animazioni, si atterra sull'ultimo; nessun leak delle preview intermedie (mai montate o distrutte pulite).
- [ ] `?e=slug` apre la pagina con la selezione giusta; back del browser coerente.
- [ ] `prefers-reduced-motion`: voltapagina → cross-fade 160 ms; preview ferma al primo frame con «Avvia preview».
- [ ] Una sola preview Live montata in ogni istante (assert in dev mode).
