# MOTION_PRINCIPLES — Interaction Atlas

Distinzione fondativa: esistono **due regimi di movimento** e non vanno mai confusi.

1. **Il motion del telaio** (l'interfaccia dell'app): governato da questo documento, sobrio, quasi invisibile.
2. **Il motion del contenuto** (le preview degli effetti): libero per definizione — è l'oggetto di studio, non l'interfaccia.

Un effetto spettacolare dentro la preview è il prodotto. Lo stesso effetto applicato al telaio è un errore.

---

## 1. Principi del telaio

- **Il movimento è informazione.** Ogni transizione deve rispondere a una domanda dell'utente («dove sono finito?», «cosa è cambiato?»). Se non risponde a niente, si elimina.
- **Breve, deciso, senza rimbalzi.** Niente bounce, niente elastic, niente overshoot nel telaio. Sono vocaboli del contenuto, non della segnaletica.
- **Opacità e traslazione, quasi mai scala.** Le transizioni del telaio usano fade e slide ≤ 16 px. La scala è riservata al voltapagina della preview.
- **Il testo non si anima lettera per lettera** nel telaio. Gli split-text sono materia da catalogo.

## 2. Token (definiti in DESIGN_TOKENS.md §5)

| Token | Valore | Uso |
|---|---|---|
| `--duration-instant` | 120 ms | hover, focus, feedback immediato |
| `--duration-fast` | 200 ms | comparsa/scomparsa di elementi piccoli |
| `--duration-base` | 320 ms | transizioni di pagina e di sezione |
| `--duration-page` | 560 ms | voltapagina della preview (linguaggio atlas) |
| `--ease-out` | cubic-bezier(0.22,1,0.36,1) | quasi tutto |
| `--ease-inout` | cubic-bezier(0.65,0,0.35,1) | voltapagina |

## 3. Il voltapagina — linguaggio atlas (decisione approvata)

È la firma di motion del prodotto e vive **solo nel pannello preview** della Category Page (e nelle transizioni tra effetti correlati nella Effect Page).

Specifica:

1. L'utente cambia effetto (click su riga, ↑/↓ nella lista, ←/→ ovunque nella pagina).
2. La preview corrente esce lateralmente (traslazione −6%, fade a 0, 200 ms, `--ease-out`).
3. La preview entrante arriva dal lato opposto (traslazione da +6% a 0, fade da 0, 360 ms, `--ease-inout`), con un ritardo di 80 ms. Budget complessivo della sequenza: 200 + 80 + 360 = 560 ms = `--duration-page`.
4. Direzione semantica: effetto *successivo* → entra da destra; *precedente* → entra da sinistra. Come sfogliare un atlante, senza toccare lo scroll.

Vincoli: mai più di un voltapagina in coda (input rapidi ⇒ si salta all'ultimo richiesto); durante il voltapagina la lista non si blocca.

## 4. Regole GSAP

- GSAP non è mai importato nel bundle del telaio. Il telaio usa transizioni CSS.
- Ogni preview è un modulo in `src/previews/` con interfaccia `mount(el, opts)` / `destroy()`. GSAP arriva per `import()` dinamico dentro il modulo.
- `destroy()` deve uccidere tutti i tween/ScrollTrigger/ticker creati (`gsap.context()` obbligatorio). Una preview smontata non lascia nulla in esecuzione — verificabile: nessun frame richiesto dopo il destroy.
- Three.js: stessa interfaccia, più `renderer.dispose()` e rilascio del contesto WebGL. Un solo contesto WebGL attivo per pagina (vincolo `PROJECT_SPEC.md` §7).
- Le preview partono solo quando visibili (IntersectionObserver) e si mettono in pausa quando escono dal viewport o la tab perde il focus.

## 5. Budget di performance

- Solo `transform` e `opacity` nelle animazioni del telaio. Mai proprietà che causano layout.
- 60 fps sul telaio, sempre; se una preview non tiene 60 fps, degrada la preview, mai il telaio.
- Nessuna animazione su `scroll` legata al telaio in V1 (niente parallax strutturale, niente header che si trasforma).

## 6. Reduced motion (obbligatorio, non negoziabile)

Con `prefers-reduced-motion: reduce`:

- il voltapagina diventa un cross-fade di 160 ms;
- le transizioni del telaio si riducono a fade ≤ 160 ms;
- le preview **non partono automaticamente**: mostrano il primo frame con un'azione esplicita "Avvia preview" (le si può comunque avviare: l'utente sta studiando motion, la scelta resta sua);
- nessun loop infinito parte senza consenso.
