# CHANGELOG — Interaction Atlas

Formato: [Keep a Changelog](https://keepachangelog.com/it/1.1.0/). Versioni: [SemVer](https://semver.org/lang/it/) a partire dal primo rilascio pubblico.

Questo file registra anche le **decisioni di design**: ogni deviazione dai documenti di progetto va annotata qui con data e motivazione.

---

## [Unreleased]

### Aggiunto
- 2026-07-08 — Documentazione completa di progetto (README, PROJECT_SPEC, DESIGN_SYSTEM, DESIGN_TOKENS, WIREFRAMES, USER_FLOW, COMPONENT_RULES, VISUAL_DNA, MOTION_PRINCIPLES, SILENT_UI, SEARCH, PLAYGROUND, COLLECTIONS, ROADMAP, TASK_001–010).
- 2026-07-08 — TASK_003: telaio completo. `PageShell`, `AppNav`, `AppFooter`, `SectionLabel`, `Divider`, `SkipLink` in `src/ui/`; `BaseLayout.astro` ora monta SkipLink → AppNav → `<main id="main-content">` → AppFooter con head SEO minimo e favicon. Pagina placeholder aggiornata per usare il telaio. Verificato: zero JS spedito sulle pagine statiche (nessuno script nel build output), tab order completo con skip-link funzionante, 360/768/1024/1500/1920 px (screenshot Playwright), nessuna animazione autonoma del telaio.

### Decisioni
- 2026-07-08 — **AppNav, variante mobile senza isola JS.** TASK_003 ammette un'isola nav mobile solo "se necessaria"; in V1 la nav non contiene un elenco di link da collassare (le sezioni si raggiungono dalla Home, non dalla nav — vedi WIREFRAMES.md), quindi la variante compatta è risolta interamente con CSS responsive. Zero JS sulle pagine statiche, criterio di accettazione soddisfatto nella forma più conservativa. Da rivedere se una futura versione della nav introduce un elenco di link da collassare.
- 2026-07-08 — **Affordance di ricerca `[Cerca ⌘K]` come `<button disabled>`.** Non funzionante finché TASK_008: reso letteralmente non interattivo (stato "disabilitato" di DESIGN_SYSTEM.md §6, opacità 40%, escluso dal tab order) invece di un link morto o di un elemento solo visivamente disattivato. Nessun adattamento del tasto modificatore (⌘ vs Ctrl) per OS: rimandato a TASK_008, quando la feature diventa un'isola interattiva.
- 2026-07-08 — **Favicon placeholder.** Nessun documento di progetto (VISUAL_DNA.md, DESIGN_SYSTEM.md) specifica un logomark. `public/favicon.svg` usa solo i due colori non negoziabili (`--color-bg`, `--color-ink`) e la lettera "A", senza forma o icona inventata. Da sostituire quando un mark reale sarà approvato dal curatore.
- 2026-07-08 — **AppFooter, contatto non valorizzato.** COMPONENT_RULES.md e WIREFRAMES.md richiedono "nome, anno, contatto" nel footer ma nessun documento specifica un contatto reale (email, profilo). Il componente espone `contactLabel`/`contactHref` opzionali; non renderizza nulla finché il curatore non fornisce il dato, per non spedire un'informazione inventata.
- 2026-07-08 — **Dimensione testo di navigazione/footer.** DESIGN_TOKENS.md §3 non definisce un token dedicato per la nav; scelto `--text-small` (14px, esistente) come lettura più quieta e coerente con il registro Silent UI, invece di `--text-body`. Proponibile come token `--text-nav` dedicato se in futuro serve un valore diverso.
- 2026-07-08 — **AppNav persistente via `position: sticky`.** PROJECT_SPEC.md §5 richiede che ogni sezione sia raggiungibile "in un'interazione da qualunque punto dell'app"; implementato con sticky positioning nativo (nessuna trasformazione o animazione allo scroll, coerente col divieto di "header che si trasforma" in MOTION_PRINCIPLES.md §5).
- 2026-07-08 — **Scroll ibrido sulla Category Page** al posto dello scroll orizzontale obbligatorio del brief: lista verticale nativa + linguaggio orizzontale nelle transizioni della preview. Motivazione: velocità di scansione, coerenza con Silent UI, accessibilità (approvato dal curatore).
- 2026-07-08 — **Roadmap fasata** V1 Catalogo → V2 Studio → V3 Laboratorio. Motivazione: il collo di bottiglia è il contenuto curato, non il codice (approvato dal curatore).
- 2026-07-08 — **Contenuti e UI in italiano**; bozze delle schede prodotte da Claude, Insight revisionati dal curatore (approvato dal curatore).
- 2026-07-08 — **Gerarchia preview Lite/Live/Heavy** con regola una-sola-preview-live-per-pagina. Motivazione: performance su hardware medio.
- 2026-07-08 — **Decisioni A–H chiuse dal curatore** (PROJECT_SPEC §12): approvate A (⌘K), B (Geist Mono per metadati), C (navigazione in inglese), D (rotte brevi `/e/[slug]`), E (niente dark mode fino a dopo V3), G (termini DNA come filtri di ricerca), H (`f` fullscreen + og-image tipografica). Respinta F: in Home si mostra solo ciò che è rilasciato — niente righe Collections/Playground prima delle rispettive fasi.
