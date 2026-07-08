# CHANGELOG — Interaction Atlas

Formato: [Keep a Changelog](https://keepachangelog.com/it/1.1.0/). Versioni: [SemVer](https://semver.org/lang/it/) a partire dal primo rilascio pubblico.

Questo file registra anche le **decisioni di design**: ogni deviazione dai documenti di progetto va annotata qui con data e motivazione.

---

## [Unreleased]

### Aggiunto
- 2026-07-08 — Documentazione completa di progetto (README, PROJECT_SPEC, DESIGN_SYSTEM, DESIGN_TOKENS, WIREFRAMES, USER_FLOW, COMPONENT_RULES, VISUAL_DNA, MOTION_PRINCIPLES, SILENT_UI, SEARCH, PLAYGROUND, COLLECTIONS, ROADMAP, TASK_001–010).

### Decisioni
- 2026-07-08 — **Scroll ibrido sulla Category Page** al posto dello scroll orizzontale obbligatorio del brief: lista verticale nativa + linguaggio orizzontale nelle transizioni della preview. Motivazione: velocità di scansione, coerenza con Silent UI, accessibilità (approvato dal curatore).
- 2026-07-08 — **Roadmap fasata** V1 Catalogo → V2 Studio → V3 Laboratorio. Motivazione: il collo di bottiglia è il contenuto curato, non il codice (approvato dal curatore).
- 2026-07-08 — **Contenuti e UI in italiano**; bozze delle schede prodotte da Claude, Insight revisionati dal curatore (approvato dal curatore).
- 2026-07-08 — **Gerarchia preview Lite/Live/Heavy** con regola una-sola-preview-live-per-pagina. Motivazione: performance su hardware medio.
- 2026-07-08 — **Decisioni A–H chiuse dal curatore** (PROJECT_SPEC §12): approvate A (⌘K), B (Geist Mono per metadati), C (navigazione in inglese), D (rotte brevi `/e/[slug]`), E (niente dark mode fino a dopo V3), G (termini DNA come filtri di ricerca), H (`f` fullscreen + og-image tipografica). Respinta F: in Home si mostra solo ciò che è rilasciato — niente righe Collections/Playground prima delle rispettive fasi.
