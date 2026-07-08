// Modello dati — PROJECT_SPEC.md §8. Le voci della sezione Components
// (src/content/catalog-components/) usano lo stesso schema con
// category: "components" (vedi README.md, nota sul naming).

export type Category = 'interactions' | 'motion' | 'visual-effects' | 'components';

// V3 (PLAYGROUND.md): dichiara il supporto di un effetto ai due soli
// parametri del Playground (intensità, velocità), con la semantica
// documentata per-effetto. Non popolato in V1 — nessuna voce campione
// dichiara preview.params finché il Playground non è in sviluppo (TASK_004
// è fuori scope per V3).
export interface PlaygroundParams {
  intensity: { label: string };
  speed: { label: string };
}

export interface Effect {
  id: string; // slug
  title: string;
  category: Category;
  dna: string[]; // 4–8 termini dal vocabolario VISUAL_DNA.md
  summary: string; // una frase, usata in liste e ricerca

  overview: {
    description: string; // markdown
    bestFor: string[];
    avoid: string[];
  };

  build: {
    technology: string[]; // es. ["CSS", "GSAP"]
    libraries: { name: string; url: string }[];
    difficulty: 1 | 2 | 3 | 4 | 5;
    performance: 'light' | 'moderate' | 'heavy';
    notes?: string;
  };

  knowledge: {
    origin: string;
    popularizedBy: string[];
    alternatives: string[]; // id di altri effetti o testo libero
    resources: { title: string; url: string; type: 'article' | 'video' | 'doc' | 'demo' }[];
  };

  explore: {
    demo?: string; // URL
    source?: string;
    video?: string;
    article?: string;
    relatedEffects: string[]; // id
    relatedComponents: string[]; // id di catalog-components
  };

  insight: string; // UNA nota curatoriale. Voce del curatore.

  study?: {
    // V2 — contenuti estesi per modalità Study
    deepDive?: string; // markdown
    caseStudies?: { title: string; url: string; comment: string }[];
  };

  preview: {
    kind: 'css' | 'gsap' | 'webgl';
    lite: string; // path a video/poster o id di preview CSS
    module: string; // path del modulo in src/previews/
    params?: PlaygroundParams; // V3
  };

  addedAt: string; // ISO date
  status: 'draft' | 'published';
}
