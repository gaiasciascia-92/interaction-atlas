# DESIGN_SYSTEM — Interaction Atlas

Il sistema serve un solo scopo: far sparire l'interfaccia perché la preview e il testo curatoriale siano le uniche cose che l'occhio incontra. Ogni regola qui sotto discende da questo.

I valori numerici definitivi vivono in `DESIGN_TOKENS.md`. Questo documento definisce *come si usano*.

---

## 1. Layout

- Griglia a **12 colonne**, gutter 24 px, margini 48 px desktop / 24 px tablet / 16 px mobile.
- **Max-width 1500 px**, centrata. Oltre, solo Warm White — eccezione: le bande di "carta" (`--color-bg-tint`, §3) sono le uniche superfici autorizzate a estendersi fino al bordo del viewport (TASK_013).
- Sistema di spaziatura a base **8 px** (mezzo passo 4 px consentito solo per allineamenti ottici interni ai componenti).
- Desktop first; breakpoint in `DESIGN_TOKENS.md` §7.
- Le pagine sono costruite come **flussi editoriali verticali**, sezionati da divider sottili — mai come dashboard a pannelli.

### Layout ricorrenti
| Pattern | Uso | Colonne (desktop) |
|---|---|---|
| Editoriale | Home, sezioni testuali della Effect Page | contenuto 1–8, aria 9–12 |
| Split-pane | Category Page | lista 1–5, preview sticky 6–12 |
| Full-bleed interno | Preview della Effect Page | 1–12 dentro la max-width |

## 2. Tipografia

Famiglia unica: **Geist**. Geist Mono per metadati tecnici (tag DNA, campi Build, scorciatoie) — decisione aperta B in `PROJECT_SPEC.md` §12.

- La tipografia è il principale strumento di gerarchia: prima si prova a risolvere con corpo, peso e spazio; il colore è l'ultima risorsa.
- Display e titoli: tracking leggermente negativo (−0.02em), pesi 500–600. Mai bold 700+ su corpi grandi: diventa pubblicitario, non editoriale.
- Testo corrente: 16 px / 1.6, larghezza di misura 60–75 caratteri.
- Etichette di sezione (OVERVIEW, BUILD…): 12 px, maiuscoletto largo (+0.08em), colore attenuato. Sono la segnaletica silenziosa dell'app.
- Scala completa in `DESIGN_TOKENS.md` §3.

## 3. Colore

Palette fissa, cinque valori, con **ruoli semantici vincolanti**:

| Colore | Hex | Ruolo | Vincoli |
|---|---|---|---|
| Warm White | `#F7F6F3` | Fondo unico dell'app | Nessun altro fondo di pagina |
| Black | `#1E1B1C` | Testo, elementi strutturali | Le varianti attenuate si ottengono per opacità, mai con altri grigi |
| Purple | `#5C5D8D` | Colore interattivo: link, selezione, focus, stati attivi | Per testo solo ≥ 16 px o peso ≥ 500 (contrasto 4.6:1, al limite AA) |
| Orange | `#FFA630` | Evidenziazione non testuale: marker, indicatori di difficoltà, sottolineature grafiche | **Mai come colore di testo su Warm White** (1.9:1). Mai su superfici estese |
| Green | `#34B3A9` | Solo accento puntuale: indicatore "live", badge "nuovo" | Massimo un'occorrenza per viewport. Mai testo su fondo chiaro |

Regola generale: a riposo, il colore vive nella carta (bg-tint), nella segnaletica puntuale e negli esemplari; mai su superfici interattive estese né come decorazione del telaio.

`--color-bg-tint` (`DESIGN_TOKENS.md` §1) è la carta: una variante di Warm White leggermente più profonda, riservata a bande editoriali a piena larghezza (Home Indice/Aggiunti di recente, `AppFooter`) — mai su superfici interattive (bottoni, righe selezionabili, contenitori preview). La transizione tra una banda di carta e il resto della pagina è sempre netta, marcata da un divider — mai un gradiente. `--color-warm-soft` è il velo Orange per sottolineature e marker grafici, alla stessa condizione di Warm: mai testo.

Il Purple come superficie estesa è ammesso in un solo luogo, la cover della Home; sopra di esso il testo è sempre `--color-on-cover` pieno, mai in opacità (TASK_016).

Questa è l'unica eccezione alla regola generale qui sopra: non introduce un secondo fondo di pagina (resta un blocco interno, non sostituisce Warm White) e non è ripetibile altrove senza una nuova approvazione — un secondo uso del Purple come superficie estesa non è "coerenza", è la regola che smette di valere.

## 4. Superfici, profondità, bordi

- **Nessuna card pesante.** I raggruppamenti si fanno con spazio bianco e divider da 1 px in `--color-divider`, non con contenitori.
- **Ombre:** una sola, `--shadow-soft`, riservata agli elementi flottanti (command palette, preview staccata dal flusso). Mai su elementi nel flusso della pagina.
- **Glow:** leggerissimo (`--glow-subtle`), solo attorno alla preview attiva come segnale di "vivo". È l'unico effetto luminoso dell'interfaccia.
- Raggi: 0 per gli elementi editoriali (righe, divider), `--radius-s` (6 px) per controlli interattivi, `--radius-m` (10 px) per il contenitore preview. Niente pill se non nei tag DNA.

## 5. Iconografia

Lucide, stroke 1.5 px, dimensioni 16/20 px. Le icone accompagnano, non sostituiscono: ogni azione primaria ha un'etichetta testuale. Un'interfaccia di sole icone è una dashboard — vietato.

## 6. Stati interattivi

| Stato | Trattamento |
|---|---|
| Hover | Cambio di opacità del testo (60% → 100%) o comparsa della preview. Mai cambi di scala su elementi testuali |
| Selezione | Testo in Purple + marker tipografico (— o ●) a sinistra della riga |
| Focus tastiera | Outline 2 px Purple, offset 2 px, sempre visibile. Mai `outline: none` senza sostituto |
| Disabilitato | Opacità 40%, cursore default |
| Loading | Testo attenuato pulsante ("Caricamento preview…"), niente spinner grafici |

## 7. Che cosa questo sistema vieta

Ombre multiple o colorate; gradienti decorativi; card con bordo+ombra+raggio; badge colorati ovunque; icone senza etichetta nelle azioni primarie; grigi estranei alla scala di opacità del Black; più di un accento Green per viewport; qualunque animazione del telaio non prevista da `MOTION_PRINCIPLES.md`.
