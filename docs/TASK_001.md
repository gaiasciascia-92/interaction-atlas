# TASK_001 — Fondazioni della repository

**Milestone:** M1 · **Dipende da:** approvazione della documentazione · **Blocca:** tutti

## Scope

Inizializzare la repository e la toolchain, senza alcuna UI.

- Astro + TypeScript `strict`, CSS Modules abilitati.
- Struttura cartelle come da `README.md` (inclusi `src/ui/`, `src/previews/`, `src/content/`, `src/styles/`, `src/lib/`, `src/types/`).
- ESLint + Prettier con configurazione minimale condivisa; `astro check` in CI.
- Font Geist e Geist Mono self-hosted in `public/fonts/` (woff2, subset latino, licenza verificata).
- Deploy preview su Vercel collegato al repo (branch main → production, PR → preview).
- `docs/` committata così com'è.

## Fuori scope

vite-plugin-pwa (V3), qualunque componente UI, qualunque contenuto.

## Criteri di accettazione

- [ ] `npm run dev`, `build`, `preview`, `check`, `lint` funzionano da checkout pulito.
- [ ] Una pagina placeholder viene servita su Vercel preview.
- [ ] `tsconfig` strict senza errori; nessun `any` implicito.
- [ ] I font si caricano self-hosted con `font-display: swap` (verifica: nessuna richiesta a CDN esterni).
