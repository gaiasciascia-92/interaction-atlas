# TASK_010 — Qualità e rilascio V1

**Milestone:** M7 · **Dipende da:** TASK_005–009

## Scope

Il passaggio da "funziona" a "prodotto professionale". Nessuna feature nuova.

- **Accessibilità:** audit completo con tastiera sola e screen reader su tutti i flussi di `USER_FLOW.md`; contrasti verificati sul prodotto reale; `prefers-reduced-motion` provato pagina per pagina.
- **Performance:** Lighthouse mobile su Home, Category, Effect (target ≥ 90 Performance); bundle audit (GSAP/Three solo nei chunk preview); immagini/video Lite ottimizzati (poster, `loading=lazy`, dimensioni esplicite).
- **Robustezza:** 404 curata (in tono Silent UI), stati errore delle preview, test manuale su Safari/Firefox/Chrome + iOS/Android reali.
- **SEO/condivisione:** meta per pagina, og-image tipografica generata per gli effetti (decisione H, approvata), sitemap.
- **Rilascio:** dominio su Vercel, `CHANGELOG.md` aggiornato a `1.0.0`, tag git.

## Criteri di accettazione

- [ ] Tutti i flussi 1–4 di `USER_FLOW.md` completabili da sola tastiera.
- [ ] Lighthouse ≥ 90 Performance / ≥ 95 Accessibility su Home, Category, Effect (mobile).
- [ ] Nessun errore console su nessuna pagina, tre browser.
- [ ] Checklist `SILENT_UI.md` passata su ogni pagina.
- [ ] `1.0.0` pubblicata sul dominio definitivo.
