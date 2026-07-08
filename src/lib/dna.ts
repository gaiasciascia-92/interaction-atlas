// Vocabolario controllato del Visual DNA — docs/VISUAL_DNA.md.
// Fonte unica di verità per la validazione build-time nello schema
// delle Content Collections (src/content.config.ts).

export const DNA_CATEGORIES = {
  carattere: ['Minimal', 'Editorial', 'Elegant', 'Bold', 'Playful', 'Brutal', 'Refined', 'Raw'],
  movimento: ['Fluid', 'Organic', 'Mechanical', 'Snappy', 'Slow', 'Floating', 'Kinetic', 'Rhythmic'],
  materia: ['Grainy', 'Glassy', 'Blurred', 'Sharp', 'Layered', 'Flat', 'Dimensional', 'Soft'],
  energia: ['Calm', 'Quiet', 'Subtle', 'Dramatic', 'Vivid', 'Cinematic'],
  struttura: ['Geometric', 'Modular', 'Asymmetric', 'Dense', 'Airy', 'Monumental'],
} as const;

export type DnaCategory = keyof typeof DNA_CATEGORIES;

// I 36 termini del vocabolario v1 (VISUAL_DNA.md §Vocabolario).
export const DNA_TERMS: readonly string[] = Object.values(DNA_CATEGORIES).flat();

// Le sette coppie oppositive (VISUAL_DNA.md regola 3).
export const DNA_OPPOSITE_PAIRS: readonly [string, string][] = [
  ['Calm', 'Dramatic'],
  ['Quiet', 'Vivid'],
  ['Snappy', 'Slow'],
  ['Sharp', 'Blurred'],
  ['Dense', 'Airy'],
  ['Flat', 'Dimensional'],
  ['Minimal', 'Brutal'],
];

/**
 * Valida un array di termini DNA contro VISUAL_DNA.md: 4–8 termini, tutti nel
 * vocabolario, almeno uno da Carattere e uno da Energia (regola 2), nessuna
 * coppia oppositiva violata (regola 3). Ritorna la lista di errori (vuota se
 * valido) — usata sia dallo schema Zod delle Content Collections sia da
 * eventuali test.
 */
export function validateDna(terms: string[]): string[] {
  const errors: string[] = [];

  if (terms.length < 4 || terms.length > 8) {
    errors.push(
      `dna deve avere da 4 a 8 termini (VISUAL_DNA.md regola 1), trovati ${terms.length}: [${terms.join(', ')}].`,
    );
  }

  const unknown = terms.filter((term) => !DNA_TERMS.includes(term));
  if (unknown.length > 0) {
    errors.push(
      `dna contiene termini fuori dal vocabolario di VISUAL_DNA.md: [${unknown.join(', ')}]. Vocabolario ammesso: [${DNA_TERMS.join(', ')}].`,
    );
  }

  const hasCarattere = terms.some((term) => (DNA_CATEGORIES.carattere as readonly string[]).includes(term));
  if (!hasCarattere) {
    errors.push(
      `dna deve includere almeno un termine da Carattere (VISUAL_DNA.md regola 2): [${DNA_CATEGORIES.carattere.join(', ')}].`,
    );
  }

  const hasEnergia = terms.some((term) => (DNA_CATEGORIES.energia as readonly string[]).includes(term));
  if (!hasEnergia) {
    errors.push(
      `dna deve includere almeno un termine da Energia (VISUAL_DNA.md regola 2): [${DNA_CATEGORIES.energia.join(', ')}].`,
    );
  }

  for (const [a, b] of DNA_OPPOSITE_PAIRS) {
    if (terms.includes(a) && terms.includes(b)) {
      errors.push(`dna viola la coppia oppositiva ${a} ↔ ${b} (VISUAL_DNA.md regola 3).`);
    }
  }

  return errors;
}
