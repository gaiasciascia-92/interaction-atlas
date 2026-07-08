# COLLECTIONS — Spec V2

Una Collection non è una playlist: è una **ricetta progettuale**. Risponde alla domanda «che linguaggio d'interazione do a questo progetto?» componendo voci del catalogo e — soprattutto — spiegando *perché funzionano insieme*. Senza la narrativa del perché, una Collection è solo una cartella di preferiti: la narrativa è il prodotto.

## Modello dati

```ts
interface Collection {
  id: string;
  title: string;              // es. "Editorial"
  intent: string;             // una frase: per che tipo di progetto è la ricetta
  dna: string[];              // DNA aggregato (4–8 termini dal vocabolario)
  steps: {
    ref: string;              // id di effetto o catalog-component
    role: string;             // che ruolo gioca nella ricetta ("struttura", "ritmo"…)
    why: string;              // 1–2 frasi: perché QUI, perché INSIEME agli altri
  }[];                        // 4–7 passi, ordinati
  synergy: string;            // markdown: la narrativa complessiva della ricetta
  antiPattern?: string;       // cosa rompe la ricetta (es. "aggiungere parallax…")
  insight: string;            // nota curatoriale, come per gli effetti
  addedAt: string;
  status: "draft" | "published";
}
```

Vincoli di coerenza (validati in build):
- ogni `ref` deve esistere ed essere `published`;
- le voci referenziate devono condividere ≥ 50% del DNA aggregato della Collection (regola `VISUAL_DNA.md`); la violazione produce un warning in build — segnala una ricetta incoerente o un DNA sbagliato;
- 4–7 passi: sotto i 4 non è una ricetta, sopra i 7 è un tema, non una scelta.

## Esempio canonico

```
Editorial
intent: "Portfolio fotografico dal registro di rivista."
dna: [Editorial, Airy, Calm, Refined, Rhythmic]

1. Magazine Grid        (struttura)   — la griglia asimmetrica dà il registro da rivista
2. Large Typography     (voce)        — i titoli fanno da contrappunto alle immagini
3. Horizontal Scroll    (ritmo)       — usato SOLO nelle gallerie, mai sulla pagina
4. Blur Reveal          (materia)     — le immagini emergono, non appaiono
5. Soft Motion          (temperatura) — easing lenti tengono tutto sottovoce

synergy: la griglia dà la struttura, la tipografia la voce, lo scroll il ritmo,
il reveal la materia, il motion la temperatura. Nessun passo è decorativo:
toglierne uno indebolisce gli altri quattro.

antiPattern: aggiungere un cursore custom giocoso — rompe il registro Calm/Refined.
```

## Presentazione

- La pagina Collection è un **flusso verticale editoriale**: intent in apertura (corpo display), poi i passi come sezioni numerate, ognuna con preview Lite della voce, ruolo, e il suo `why`. In chiusura `synergy`, `antiPattern` e l'Insight firmato.
- I passi si presentano nella sequenza a discesa del brief (A ↓ B ↓ C): la verticalità qui è narrativa, non un limite.
- Ogni passo linka alla Effect Page della voce. Dal passo si torna alla Collection con il back nativo.
- L'indice delle Collections in Home si attiva in V2 (in V1 la riga esiste, non attiva — vedi WIREFRAMES §1).

## Regole editoriali

- Una Collection si pubblica solo completa di `synergy` e `insight` revisionati dal curatore.
- Obiettivo al lancio V2: **3 Collections** (proposte: Editorial, Cinematic, Playful) — poche e difendibili battono molte e tiepide.
- Le Collections non si generano automaticamente dal DNA: la sovrapposizione di DNA è un controllo di coerenza, non un motore di curatela.
