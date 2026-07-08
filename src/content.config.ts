// Content Collections — TASK_004. Schema Zod fedele a PROJECT_SPEC.md §8.
import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { validateDna } from './lib/dna';

const dnaSchema = z
  .array(z.string())
  .superRefine((terms, ctx) => {
    for (const message of validateDna(terms)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message });
    }
  });

const librarySchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

const resourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  type: z.enum(['article', 'video', 'doc', 'demo']),
});

// Fattorizza lo schema condiviso da `effects` e `catalog-components`
// (README.md, nota sul naming): stessa struttura, `category` vincolata
// diversamente per collection.
function effectSchema<C extends z.ZodTypeAny>(category: C) {
  return z.object({
    title: z.string(),
    category,
    dna: dnaSchema,
    summary: z.string(),

    overview: z.object({
      description: z.string(),
      bestFor: z.array(z.string()),
      avoid: z.array(z.string()),
    }),

    build: z.object({
      technology: z.array(z.string()),
      libraries: z.array(librarySchema),
      difficulty: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
      performance: z.enum(['light', 'moderate', 'heavy']),
      notes: z.string().optional(),
    }),

    knowledge: z.object({
      origin: z.string(),
      popularizedBy: z.array(z.string()),
      alternatives: z.array(z.string()), // id di altri effetti o testo libero — mai un reference() stretto
      resources: z.array(resourceSchema),
    }),

    explore: z.object({
      demo: z.string().url().optional(),
      source: z.string().url().optional(),
      video: z.string().url().optional(),
      article: z.string().url().optional(),
      relatedEffects: z.array(reference('effects')),
      relatedComponents: z.array(reference('catalog-components')),
    }),

    insight: z.string(),

    study: z
      .object({
        deepDive: z.string().optional(),
        caseStudies: z
          .array(z.object({ title: z.string(), url: z.string().url(), comment: z.string() }))
          .optional(),
      })
      .optional(),

    preview: z.object({
      kind: z.enum(['css', 'gsap', 'webgl']),
      lite: z.string(),
      module: z.string(),
      params: z
        .object({
          intensity: z.object({ label: z.string() }),
          speed: z.object({ label: z.string() }),
        })
        .optional(),
    }),

    addedAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'addedAt deve essere una data ISO nel formato YYYY-MM-DD.'),
    status: z.enum(['draft', 'published']),
  });
}

const effects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/effects' }),
  schema: effectSchema(z.enum(['interactions', 'motion', 'visual-effects'])),
});

const catalogComponents = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/catalog-components' }),
  schema: effectSchema(z.literal('components')),
});

export const collections = {
  effects,
  'catalog-components': catalogComponents,
};
