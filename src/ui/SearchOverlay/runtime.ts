// Runtime di SearchOverlay — caricato via import() dinamico solo alla prima
// interazione (vedi lo script bootstrap in SearchOverlay.astro): qui vive
// Fuse.js e tutta la logica di rendering, così il bundle pesante non tocca
// il first load di nessuna pagina (TASK_008, criterio "nessun impatto sul
// first load"; stesso pattern di import() già usato per i moduli preview in
// src/previews/, MOTION_PRINCIPLES.md §4).
import {
  loadSearchIndex,
  extractDnaFilters,
  runSearch,
  getFrequentDnaTerms,
  getRecentEntries,
  getNearestDnaTerms,
  type SearchIndexEntry,
  type SearchOutcome,
} from '../../lib/search';

export function initSearchOverlay(pending?: { dnaTerm?: string }): void {
  const backdrop = document.querySelector<HTMLElement>('[data-search-backdrop]');
  const panel = document.querySelector<HTMLElement>('[data-search-panel]');
  const input = document.querySelector<HTMLInputElement>('[data-search-input]');
  const chipsEl = document.querySelector<HTMLElement>('[data-search-chips]');
  const listboxEl = document.querySelector<HTMLUListElement>('[data-search-listbox]');
  const announceEl = document.querySelector<HTMLElement>('[data-search-announce]');
  const closeButton = document.querySelector<HTMLButtonElement>('[data-search-close]');

  // Le funzioni qui sotto sono const/arrow (non `function` con hoisting):
  // solo così TypeScript conserva il narrowing di questo if su tutte le
  // closure che seguono, invece di ritrattare ogni riferimento a "possibly
  // null" (le dichiarazioni `function` sono hoisted e TS non può provare che
  // vengano chiamate solo dopo il controllo).
  if (!backdrop || !panel || !input || !chipsEl || !listboxEl || !announceEl || !closeButton) return;

  let allEntries: SearchIndexEntry[] | null = null;
  let indexLoading: Promise<SearchIndexEntry[]> | null = null;
  let activeFilters: string[] = [];
  let lastFocusedElement: HTMLElement | null = null;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  // Elenco piatto delle opzioni correntemente renderizzate (per ↑↓ ↵) e
  // indice del gruppo di ciascuna, per il comportamento "tab passa di
  // gruppo" (SEARCH.md §4).
  let flatOptions: { entry: SearchIndexEntry; groupIndex: number }[] = [];
  let groupStartIndexes: number[] = [];
  let highlightedIndex = -1;

  const ESCAPE_MAP: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch] ?? ch);

  const ensureIndexLoaded = (): Promise<SearchIndexEntry[]> => {
    if (allEntries) return Promise.resolve(allEntries);
    if (!indexLoading) {
      indexLoading = loadSearchIndex().then((entries) => {
        allEntries = entries;
        return entries;
      });
    }
    return indexLoading;
  };

  const renderChips = () => {
    chipsEl.replaceChildren();
    for (const term of activeFilters) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'search-chip';
      chip.dataset.removeFilter = term;
      chip.setAttribute('aria-label', `Rimuovi filtro DNA: ${term}`);
      chip.textContent = `DNA: ${term} `;
      const cross = document.createElement('span');
      cross.setAttribute('aria-hidden', 'true');
      cross.textContent = '✕';
      chip.appendChild(cross);
      chipsEl.appendChild(chip);
    }
  };

  const setExpanded = (expanded: boolean) => {
    input.setAttribute('aria-expanded', String(expanded));
  };

  const announce = (count: number, isEmpty: boolean, isNoResults: boolean) => {
    if (isEmpty) {
      announceEl.textContent = 'Suggerimenti.';
    } else if (isNoResults) {
      announceEl.textContent = 'Nessun risultato.';
    } else {
      announceEl.textContent = count === 1 ? '1 risultato.' : `${count} risultati.`;
    }
  };

  const setHighlighted = (index: number) => {
    const prev = listboxEl.querySelector('[aria-selected="true"]');
    prev?.setAttribute('aria-selected', 'false');
    prev?.classList.remove('is-active');
    highlightedIndex = index;
    if (index < 0 || index >= flatOptions.length) {
      input.removeAttribute('aria-activedescendant');
      return;
    }
    const el = document.getElementById(`search-option-${index}`);
    el?.setAttribute('aria-selected', 'true');
    el?.classList.add('is-active');
    el?.scrollIntoView({ block: 'nearest' });
    input.setAttribute('aria-activedescendant', `search-option-${index}`);
  };

  const renderOptionRow = (entry: SearchIndexEntry, flatIndex: number): HTMLLIElement => {
    const li = document.createElement('li');
    li.id = `search-option-${flatIndex}`;
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', 'false');
    li.className = 'search-option';
    li.dataset.href = entry.href;
    const dna = entry.dna.slice(0, 2).join(' · ');
    li.innerHTML = `
      <span class="search-option-title">${escapeHtml(entry.title)}</span>
      <span class="search-option-meta">${escapeHtml(entry.categoryLabel)}${dna ? ' · ' + escapeHtml(dna) : ''}</span>
    `;
    return li;
  };

  const renderGroupHeading = (label: string): HTMLLIElement => {
    const li = document.createElement('li');
    li.setAttribute('role', 'presentation');
    li.className = 'search-group-heading';
    li.textContent = label;
    return li;
  };

  const renderSuggestionPill = (term: string): HTMLButtonElement => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'search-suggestion-pill';
    btn.dataset.addFilter = term;
    btn.textContent = term;
    return btn;
  };

  const renderEmptyState = () => {
    listboxEl.replaceChildren();
    flatOptions = [];
    groupStartIndexes = [];

    const wrap = document.createElement('li');
    wrap.setAttribute('role', 'presentation');
    wrap.className = 'search-state-block';

    const suggestLabel = document.createElement('p');
    suggestLabel.className = 'search-group-heading';
    suggestLabel.textContent = 'Termini DNA frequenti';
    wrap.appendChild(suggestLabel);

    const pillRow = document.createElement('div');
    pillRow.className = 'search-pill-row';
    for (const term of getFrequentDnaTerms(allEntries ?? [])) {
      pillRow.appendChild(renderSuggestionPill(term));
    }
    wrap.appendChild(pillRow);

    listboxEl.appendChild(wrap);

    const recent = getRecentEntries(allEntries ?? []);
    if (recent.length > 0) {
      const recentHeading = renderGroupHeading('Aggiunti di recente');
      listboxEl.appendChild(recentHeading);
      recent.forEach((entry, i) => {
        const li = renderOptionRow(entry, i);
        listboxEl.appendChild(li);
        flatOptions.push({ entry, groupIndex: 0 });
      });
      groupStartIndexes = [0];
    }

    setExpanded(true);
    announce(0, true, false);
    setHighlighted(flatOptions.length > 0 ? 0 : -1);
  };

  const renderNoResultsState = (displayQuery: string) => {
    listboxEl.replaceChildren();
    flatOptions = [];
    groupStartIndexes = [];

    const wrap = document.createElement('li');
    wrap.setAttribute('role', 'presentation');
    wrap.className = 'search-state-block';

    const message = document.createElement('p');
    message.className = 'search-no-results-message';
    message.textContent = `Nessuna voce per "${displayQuery}".`;
    wrap.appendChild(message);

    const nearest = getNearestDnaTerms(displayQuery);
    if (nearest.length > 0) {
      const label = document.createElement('p');
      label.className = 'search-group-heading';
      label.textContent = 'Termini DNA più vicini';
      wrap.appendChild(label);

      const pillRow = document.createElement('div');
      pillRow.className = 'search-pill-row';
      for (const term of nearest) pillRow.appendChild(renderSuggestionPill(term));
      wrap.appendChild(pillRow);
    }

    listboxEl.appendChild(wrap);
    setExpanded(true);
    announce(0, false, true);
    setHighlighted(-1);
  };

  const renderResultsState = (outcome: SearchOutcome) => {
    listboxEl.replaceChildren();
    flatOptions = [];
    groupStartIndexes = [];
    let flatIndex = 0;
    for (const group of outcome.groups) {
      groupStartIndexes.push(flatIndex);
      listboxEl.appendChild(renderGroupHeading(group.label));
      for (const entry of group.items) {
        const li = renderOptionRow(entry, flatIndex);
        listboxEl.appendChild(li);
        flatOptions.push({ entry, groupIndex: groupStartIndexes.length - 1 });
        flatIndex++;
      }
    }
    setExpanded(true);
    announce(outcome.totalCount, false, false);
    setHighlighted(flatOptions.length > 0 ? 0 : -1);
  };

  const runAndRender = async () => {
    const freeText = input.value;
    const displayQuery = [...activeFilters, freeText.trim()].filter(Boolean).join(' ');

    if (activeFilters.length === 0 && freeText.trim().length === 0) {
      await ensureIndexLoaded();
      renderEmptyState();
      return;
    }

    const entries = await ensureIndexLoaded();
    const outcome = runSearch(entries, activeFilters, freeText);
    if (outcome.totalCount === 0) {
      renderNoResultsState(displayQuery);
    } else {
      renderResultsState(outcome);
    }
  };

  // Un termine DNA diventa chip solo a parola "completata" (spazio dopo),
  // non lettera per lettera: convertirlo mentre l'utente sta ancora
  // scrivendo (es. "organic" dentro "organically") cancellerebbe testo
  // sotto le sue dita — sorpresa meccanica non ammessa (SILENT_UI regola 7).
  const handleInputChange = () => {
    const raw = input.value;
    const endsWithSpace = /\s$/.test(raw);
    const tokens = raw.trim().split(/\s+/).filter(Boolean);
    const pendingToken = endsWithSpace ? '' : (tokens.pop() ?? '');
    const committedText = tokens.join(' ');

    const { filters: newFilters, freeText: committedFreeText } = extractDnaFilters(committedText);
    if (newFilters.length > 0) {
      for (const term of newFilters) {
        if (!activeFilters.includes(term)) activeFilters.push(term);
      }
      input.value = [committedFreeText, pendingToken].filter(Boolean).join(' ');
      renderChips();
    }

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      void runAndRender();
    }, 80);
  };

  const addFilter = (term: string) => {
    if (!activeFilters.includes(term)) activeFilters.push(term);
    input.value = '';
    renderChips();
    void runAndRender();
    input.focus();
  };

  const removeFilter = (term: string) => {
    activeFilters = activeFilters.filter((f) => f !== term);
    renderChips();
    void runAndRender();
    input.focus();
  };

  const resetState = () => {
    activeFilters = [];
    input.value = '';
    renderChips();
    listboxEl.replaceChildren();
    flatOptions = [];
    groupStartIndexes = [];
    highlightedIndex = -1;
    setExpanded(false);
    announceEl.textContent = '';
  };

  // Il trigger che ha aperto l'overlay (bottone Cerca, tag DNA, SearchBar)
  // ha spesso esso stesso `data-search-trigger`: restituirgli il focus alla
  // chiusura genera un nuovo `focusin` su quello stesso elemento, che senza
  // questa guardia riaprirebbe l'overlay nello stesso istante (il focus è
  // sincrono). Vera fino al termine della chiamata a `.focus()`.
  let suppressReopen = false;

  const openOverlay = (opts?: { dnaTerm?: string }) => {
    // click e focusin possono scattare entrambi per la stessa interazione
    // (un click sposta anche il focus): cattura l'origine solo alla
    // transizione chiuso→aperto, altrimenti la seconda chiamata
    // sovrascriverebbe lastFocusedElement con l'input di ricerca stesso.
    if (backdrop.hidden) {
      lastFocusedElement = (document.activeElement as HTMLElement) ?? null;
    }
    backdrop.hidden = false;
    if (opts?.dnaTerm && !activeFilters.includes(opts.dnaTerm)) {
      activeFilters.push(opts.dnaTerm);
      renderChips();
    }
    void ensureIndexLoaded().then(() => {
      void runAndRender();
    });
    input.focus();
  };

  const closeOverlay = () => {
    if (backdrop.hidden) return;
    backdrop.hidden = true;
    resetState();
    suppressReopen = true;
    lastFocusedElement?.focus();
    suppressReopen = false;
    lastFocusedElement = null;
  };

  const isOpen = (): boolean => !backdrop.hidden;

  document.addEventListener('click', (event) => {
    if (suppressReopen) return;
    const trigger = (event.target as HTMLElement).closest<HTMLElement>('[data-search-trigger]');
    if (trigger) openOverlay({ dnaTerm: trigger.dataset.dnaTerm });
  });
  document.addEventListener('focusin', (event) => {
    if (suppressReopen) return;
    const trigger = (event.target as HTMLElement).closest<HTMLElement>('[data-search-trigger]');
    if (trigger) openOverlay({ dnaTerm: trigger.dataset.dnaTerm });
  });

  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (isOpen()) closeOverlay();
      else openOverlay();
    }
  });

  backdrop.addEventListener('mousedown', (event) => {
    if (event.target === backdrop) closeOverlay();
  });

  closeButton.addEventListener('click', () => closeOverlay());

  chipsEl.addEventListener('click', (event) => {
    const btn = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-remove-filter]');
    if (btn?.dataset.removeFilter) removeFilter(btn.dataset.removeFilter);
  });

  listboxEl.addEventListener('click', (event) => {
    const pill = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-add-filter]');
    if (pill?.dataset.addFilter) {
      addFilter(pill.dataset.addFilter);
      return;
    }
    const option = (event.target as HTMLElement).closest<HTMLLIElement>('[role="option"]');
    if (option?.dataset.href) {
      window.location.href = option.dataset.href;
    }
  });

  input.addEventListener('input', handleInputChange);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeOverlay();
      return;
    }

    if (event.key === 'Backspace' && input.value === '' && activeFilters.length > 0) {
      event.preventDefault();
      removeFilter(activeFilters[activeFilters.length - 1]!);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (flatOptions.length > 0) setHighlighted(Math.min(highlightedIndex + 1, flatOptions.length - 1));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (flatOptions.length > 0) setHighlighted(Math.max(highlightedIndex - 1, 0));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const current = flatOptions[highlightedIndex];
      if (current) window.location.href = current.entry.href;
      return;
    }

    if (event.key === 'Tab' && !event.shiftKey && groupStartIndexes.length > 1) {
      event.preventDefault();
      const currentGroup = flatOptions[highlightedIndex]?.groupIndex ?? -1;
      const nextGroup = (currentGroup + 1) % groupStartIndexes.length;
      setHighlighted(groupStartIndexes[nextGroup]!);
      return;
    }

    if (event.key === 'Tab' && event.shiftKey && groupStartIndexes.length > 1) {
      event.preventDefault();
      const currentGroup = flatOptions[highlightedIndex]?.groupIndex ?? 0;
      const prevGroup = (currentGroup - 1 + groupStartIndexes.length) % groupStartIndexes.length;
      setHighlighted(groupStartIndexes[prevGroup]!);
      return;
    }
  });

  // Focus trap semplice: Tab/Shift+Tab tra i soli elementi focalizzabili
  // del pannello (input, ✕ dei filtri, chiudi) quando non intercettato
  // sopra per il salto di gruppo (SEARCH.md §6, "focus trap nell'overlay").
  panel.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || event.defaultPrevented) return;
    const focusable = panel.querySelectorAll<HTMLElement>('input, button:not([hidden])');
    if (focusable.length === 0) return;
    const list = Array.from(focusable);
    const first = list[0]!;
    const last = list[list.length - 1]!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  // L'evento che ha fatto scattare il caricamento lazy di questo modulo va
  // "riprodotto": senza questo, il primo click/focus dell'utente
  // scomparirebbe nell'attesa del import() dinamico.
  if (pending) openOverlay(pending);
}
