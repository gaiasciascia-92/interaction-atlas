# TASK_004 — Modello dati e contenuti campione

**Milestone:** M3 · **Dipende da:** TASK_001 · **Blocca:** TASK_005–009

## Scope

- Content Collections Astro per `effects` e `catalog-components` con schema Zod che rispecchia `PROJECT_SPEC.md` §8 (incluso il vincolo 4–8 termini DNA dal vocabolario di `VISUAL_DNA.md`, validato in build contro una lista esportata da `src/lib/dna.ts`).
- Tipi condivisi in `src/types/` (incluso `PreviewModule` da `COMPONENT_RULES.md`).
- **3 effetti campione completi** (contenuto reale, non lorem ipsum) che coprono i tre livelli di preview: uno `css`, uno `gsap`, uno `webgl`. Bozze Claude, Insight marcati `[DA REVISIONARE — curatore]`.
- 3 moduli preview corrispondenti in `src/previews/` conformi al contratto (mount/destroy/pause/resume).

## Criteri di accettazione

- [ ] Una voce con DNA fuori vocabolario, coppia oppositiva violata o `ref` inesistente **fa fallire la build** con messaggio chiaro.
- [ ] I 3 moduli preview montano, smontano e non lasciano raf/tween/listener attivi dopo `destroy()` (verifica con performance panel).
- [ ] GSAP e Three.js compaiono solo nei chunk dei rispettivi moduli, mai nel bundle comune.
