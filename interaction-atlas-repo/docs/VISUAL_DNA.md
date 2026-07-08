# VISUAL_DNA — Vocabolario controllato

Il Visual DNA è il sistema di classificazione semantica dell'Atlas: da 4 a 8 parole chiave per ogni voce, che descrivono il **carattere percettivo** dell'effetto — non la tecnologia, non la categoria.

È l'asset più differenziante del prodotto: permette di cercare per *intenzione* («voglio qualcosa di organico ed elegante per un portfolio di ritratti») invece che per implementazione. Perché funzioni, il vocabolario deve essere **chiuso e controllato**: se ogni voce inventa i propri aggettivi, il DNA smette di essere confrontabile e la ricerca per intenzione muore.

## Regole

1. Ogni voce ha **da 4 a 8 termini**, scelti esclusivamente dal vocabolario sotto.
2. Almeno un termine da **Carattere** e uno da **Energia** (garantiscono confrontabilità minima tra due voci qualsiasi).
3. Mai due termini della stessa coppia oppositiva (es. `Calm` + `Dramatic`).
4. I termini sono in inglese (coerenza con le etichette di prodotto — decisione aperta C) e si scrivono capitalizzati: `Fluid`, non `fluid`.
5. Aggiungere un termine al vocabolario è una modifica di prodotto: si propone qui, si motiva, si registra in `CHANGELOG.md`. Un termine usato da una sola voce dopo 6 mesi è un candidato alla rimozione.
6. Il DNA descrive **come l'effetto si sente**, non cosa fa. «Horizontal» non è DNA (è meccanica); «Cinematic» sì.

## Vocabolario (v1 — 36 termini)

### Carattere
`Minimal` `Editorial` `Elegant` `Bold` `Playful` `Brutal` `Refined` `Raw`

### Movimento
`Fluid` `Organic` `Mechanical` `Snappy` `Slow` `Floating` `Kinetic` `Rhythmic`

### Materia
`Grainy` `Glassy` `Blurred` `Sharp` `Layered` `Flat` `Dimensional` `Soft`

### Energia
`Calm` `Quiet` `Subtle` `Dramatic` `Vivid` `Cinematic`

### Struttura
`Geometric` `Modular` `Asymmetric` `Dense` `Airy` `Monumental`

### Coppie oppositive (regola 3)
`Calm ↔ Dramatic` · `Quiet ↔ Vivid` · `Snappy ↔ Slow` · `Sharp ↔ Blurred` · `Dense ↔ Airy` · `Flat ↔ Dimensional` · `Minimal ↔ Brutal`

## Esempio

Effetto: *Image reveal con blur progressivo allo scroll*

```
dna: ["Blurred", "Editorial", "Calm", "Fluid", "Soft"]
```

Cinque termini: carattere (`Editorial`), energia (`Calm`), movimento (`Fluid`), materia (`Blurred`, `Soft`). Nessuna coppia oppositiva violata.

## Usi nel prodotto

- **Ricerca:** i termini DNA sono indicizzati con peso alto (`SEARCH.md` §4). Cercare "organic elegant" restituisce le voci che condividono quei geni.
- **Effetti correlati:** il fallback automatico per `explore.relatedEffects` è la sovrapposizione di DNA (≥ 3 termini in comune), ma la curatela manuale ha sempre precedenza.
- **Quick Compare (V2):** il confronto evidenzia i geni comuni e quelli divergenti — è la parte più leggibile del confronto.
- **Collections (V2):** una Collection dichiara il proprio DNA aggregato; le voci che vi appartengono dovrebbero condividerne almeno la metà. Se non accade, o la Collection è incoerente o il DNA delle voci è sbagliato: in entrambi i casi è un segnale utile.

## Presentazione

I tag DNA si presentano in Geist Mono, `--text-caption`, pill sottile con bordo `--color-divider`, testo `--color-ink-60`. Nessun colore per categoria di termine: il DNA si legge, non si decodifica a colori. All'hover il tag passa a `--color-ink`; al click porta alla ricerca filtrata per quel termine.
