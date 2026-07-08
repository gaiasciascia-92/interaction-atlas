# SILENT_UI — Manifesto operativo

«Silent UI» non è un'estetica: è una disciplina. L'interfaccia di Interaction Atlas ospita contenuti che si muovono, brillano e distorcono — e proprio per questo il telaio deve essere immobile e muto. Se telaio e contenuto competono, il prodotto fallisce nel suo scopo: far *valutare* un'interazione.

## Principio unico

> L'interfaccia non parla mai per prima. Risponde, e a bassa voce.

## Le sette regole

1. **Il telaio non si anima da solo.** Nessuna animazione decorativa, nessun elemento che si muove senza un input dell'utente. Le uniche animazioni del telaio sono *risposte*: hover, selezione, cambio pagina.
2. **Un evento visivo alla volta.** Se la preview è attiva, il resto dell'interfaccia è a riposo. Mai due elementi che chiedono attenzione simultaneamente.
3. **La gerarchia si costruisce con tipografia e spazio,** non con colore, riquadri o ombre. Il colore interattivo (Purple) appare solo dove si può agire.
4. **Niente rumore di stato.** Toast, badge, contatori, notifiche: quasi sempre rumore. In V1 l'unico messaggio di sistema ammesso è l'errore bloccante e lo stato di caricamento testuale.
5. **Il vuoto è progettato.** Lo spazio bianco non è assenza: è ciò che fa sembrare curato il contenuto. In dubbio tra aggiungere un elemento o aggiungere spazio, si aggiunge spazio.
6. **Le parole prima delle icone.** Un'azione primaria ha sempre un'etichetta. Le icone sole sono ammesse solo per azioni universali e secondarie (chiudi, cerca).
7. **Nessuna sorpresa meccanica.** Scroll nativo, back del browser funzionante, link veri, testo selezionabile. L'utente non deve mai chiedersi «cosa è successo?». (Questa regola è il motivo per cui lo scroll orizzontale forzato è stato sostituito dal linguaggio ibrido — vedi `PROJECT_SPEC.md` §6.2.)

## Applicazioni concrete

- **Home:** le categorie sono righe di testo. All'hover non si illuminano né si sollevano: appare la preview a destra. La riga risponde solo con il passaggio di opacità 60% → 100%.
- **Liste:** la selezione è un marker tipografico e il colore Purple. Niente fondi pieni ampi, niente bordi che appaiono.
- **Preview:** il glow leggero attorno alla preview attiva è l'unico "alone" concesso in tutta l'app, perché segnala l'unico protagonista.
- **Errori:** testo in riga, tono neutro («La preview non è disponibile offline.»). Mai rosso allarmistico — non esiste rosso nella palette, ed è una scelta.
- **Caricamenti:** testo attenuato, eventualmente con i tre puntini animati a bassissima frequenza. Niente skeleton lampeggianti, niente spinner.

## Checklist di revisione (da usare su ogni PR di UI)

- [ ] C'è qualcosa che si muove senza input dell'utente? → rimuovere.
- [ ] Ci sono due segnali visivi simultanei? → toglierne uno.
- [ ] Ho aggiunto un colore dove bastava peso o corpo tipografico? → tornare alla tipografia.
- [ ] Ho aggiunto un contenitore (card, riquadro) dove bastava un divider o dello spazio? → toglierlo.
- [ ] L'azione primaria ha un'etichetta testuale? → se no, aggiungerla.
- [ ] Scroll, back, selezione testo e zoom funzionano nativamente? → se no, è un bug di design.
- [ ] Con `prefers-reduced-motion` la pagina è completamente utilizzabile e sensata? → obbligatorio.
