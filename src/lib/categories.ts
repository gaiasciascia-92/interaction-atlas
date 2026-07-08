// Metadati delle 4 categorie fisse (decisione F, PROJECT_SPEC.md §12): fonte
// unica per Home e Category Page. Descrizioni approvate dal curatore
// (2026-07-08, vedi docs/CHANGELOG.md), mostrate nell'intestazione della
// lista come da WIREFRAMES.md §2.

export const CATEGORY_META = {
  interactions: {
    label: 'Interactions',
    description: 'Hover, cursore, scroll, drag: come il sito risponde alla mano di chi guarda.',
    href: '/interactions',
  },
  motion: {
    label: 'Motion',
    description: 'Transizioni, reveal, ritmo: come le cose entrano, escono e respirano.',
    href: '/motion',
  },
  'visual-effects': {
    label: 'Visual Effects',
    description: 'Grana, blur, distorsione, WebGL: la materia visiva dell’immagine.',
    href: '/visual-effects',
  },
  components: {
    label: 'Components',
    description: 'Blocchi riutilizzabili: hero, gallerie, griglie, navigazioni, footer.',
    href: '/components',
  },
} as const;

export type CategorySlug = keyof typeof CATEGORY_META;

export const CATEGORY_SLUGS = Object.keys(CATEGORY_META) as CategorySlug[];
