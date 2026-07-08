# PLAYGROUND — Spec V3

Il Playground chiude il cerchio del prodotto: dopo aver *scelto* un effetto (V1) e *ragionato* sulla composizione (V2), l'utente lo *prova sulla propria fotografia* prima di scrivere una riga di codice. È la feature più costosa dell'Atlas e per questo è ultima: senza catalogo curato sotto, sarebbe un giocattolo.

## Principi

1. **Privacy assoluta:** la fotografia non lascia mai il dispositivo. Nessun upload a server, nessuna rete: `FileReader` → canvas/texture locale. Va dichiarato nell'interfaccia («La tua immagine resta sul tuo dispositivo») perché è un valore, non un dettaglio.
2. **Parametri pochi e onesti:** intensità e velocità, come da brief. Niente pannelli da VJ software: due slider fanno capire il carattere di un effetto meglio di venti.
3. **Il confronto è il punto.** Il Playground non serve a "vedere l'effetto": serve a decidere *se l'effetto serve alla propria immagine*. Il confronto con l'originale è quindi un gesto primario, non un'opzione.

## Funzionamento

```
1. Carica fotografia        drag & drop o file picker (JPEG/PNG/WebP, max 20 MP,
                            downscale automatico a 2048px lato lungo per la texture)
2. Scegli effetto           dal sottoinsieme del catalogo con preview.params
                            (effetti "parametrizzabili"), stessa lista/ricerca dell'app
3. Regola                   intensità 0–100, velocità 0.25×–2×
4. Confronta                press-and-hold sull'immagine → mostra l'originale
                            (+ variante slider a tendina per confronto statico)
5. Decidi                   link alla Effect Page dell'effetto attivo
```

## Architettura

- Rotta `/playground`, isola unica (`PlaygroundCanvas`), caricata solo su quella pagina.
- Riusa il contratto `PreviewModule` esteso:

```ts
interface PlaygroundModule extends PreviewModule {
  setSource(img: ImageBitmap): void;
  setParams(p: { intensity: number; speed: number }): void;  // 0–1, 0.25–2
}
```

- Gli effetti dichiarano il supporto nel proprio schema (`preview.params`): il Playground mostra **solo** quelli. Obiettivo al lancio: 8 effetti parametrizzati (criterio ROADMAP V3).
- Pipeline: effetti CSS/GSAP → compositing su DOM; effetti WebGL → texture Three.js. Un solo contesto WebGL, come ovunque.
- `intensity` e `speed` hanno semantica definita **dal modulo** (per un blur, intensity = raggio; per un grain, intensity = opacità): la scala è normalizzata, il significato è locale. Documentato per-effetto nella scheda.

## Interfaccia

Layout a due zone: canvas dominante (col 1–9), controlli a destra (col 10–12) come colonna tipografica — etichette maiuscoletto, slider sottili, valori in Geist Mono. Nessun pannello scuro da editor video: il Playground resta dentro la Silent UI, su Warm White.

Stati: vuoto (invito al drag & drop, con una fotografia demo pre-caricata **[PROPOSTA]** per provare senza cercare un file), elaborazione (testuale), errore file (in riga, tono neutro).

## Vincoli

- 60 fps su hardware medio con immagine 2048px; se il device non regge, downscale della texture, mai frame-drop del telaio.
- `prefers-reduced-motion`: la velocità parte a 0 (fermo immagine del primo frame), l'utente può alzarla manualmente.
- Touch: gli slider e il press-and-hold funzionano su mobile; il drag & drop degrada in file picker.
- Nessun salvataggio/export in V3.0 (l'export dell'immagine processata o di un "brief di interazione" è annotato in ROADMAP oltre-V3).
