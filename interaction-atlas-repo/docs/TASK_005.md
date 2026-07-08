# TASK_005 — Home

**Milestone:** M4 · **Dipende da:** TASK_003, TASK_004

## Scope

Home come da `WIREFRAMES.md` §1: titolo, sottotitolo, search visibile (input presente, funzionalità arriva con TASK_008), righe categoria con conteggi reali dalle collections, preview Lite in hover (`PreviewLite`, solo CSS/video), "Aggiunti di recente" (3–5 voci `published` per `addedAt`).

Componenti: `CategoryRow`, `PreviewLite`, riuso `EntryRow` per i recenti.

## Criteri di accettazione

- [ ] Hover su categoria → preview Lite con fade `--duration-fast`; uscita → ultima preview attenuata al 60% (nessun lampeggio).
- [ ] Zero GSAP/Three.js sulla Home (verifica bundle).
- [ ] Mobile: hover assente, thumbnail statiche, search full-width.
- [ ] Lighthouse Performance ≥ 90 mobile già in questa fase.
- [ ] Righe Collections/Playground **assenti** (decisione F: si mostra solo ciò che è rilasciato).
