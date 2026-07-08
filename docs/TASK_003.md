# TASK_003 — Telaio: layout, navigazione, footer

**Milestone:** M2 · **Dipende da:** TASK_002

## Scope

- `PageShell` (max-width 1500, griglia 12 col, margini responsive).
- `AppNav`: logo/nome a sinistra, contesto corrente, affordance `[Cerca ⌘K]` (non funzionante finché TASK_008); mobile: variante compatta (isola solo se necessaria).
- `AppFooter`, `Divider`, `SectionLabel`, `SkipLink`.
- Layout Astro di base (`BaseLayout.astro`) con head SEO minimo, og-tags, favicon.

## Criteri di accettazione

- [ ] Zero JS spedito sulle pagine statiche (verifica sul build output) salvo l'eventuale isola nav mobile.
- [ ] Navigazione completa da tastiera con skip-link funzionante.
- [ ] Il telaio non contiene alcuna animazione autonoma (checklist `SILENT_UI.md`).
- [ ] Verificato a 360/768/1024/1500+ px.
