// @ts-check
import { defineConfig } from 'astro/config';
import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';

/**
 * TASK_002 — /styleguide è uno strumento di sviluppo:
 * viene rimossa dall'output di produzione dopo la build.
 * @returns {import('astro').AstroIntegration}
 */
function excludeStyleguide() {
  return {
    name: 'exclude-styleguide',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        await rm(new URL('./styleguide', dir), { recursive: true, force: true });
        console.log('[exclude-styleguide] /styleguide rimossa dalla build di produzione');
      },
    },
  };
}

/**
 * TASK_004 — rimuove dalla build di produzione la pagina di validazione
 * dei riferimenti (vedi src/pages/validate-content.astro): esiste solo per
 * far fallire `astro build` con un errore leggibile quando
 * explore.relatedEffects/relatedComponents puntano a un id inesistente —
 * `reference()` di Astro valida solo la forma della stringa, non
 * l'esistenza, quindi il controllo va fatto esplicitamente.
 * @returns {import('astro').AstroIntegration}
 */
function excludeValidateContent() {
  return {
    name: 'exclude-validate-content',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        await rm(new URL('./validate-content', dir), { recursive: true, force: true });
      },
    },
  };
}

export default defineConfig({
  // Dominio definitivo da impostare al rilascio (TASK_010)
  site: 'https://interaction-atlas.vercel.app',
  output: 'static',
  integrations: [excludeStyleguide(), mdx(), excludeValidateContent()],
  devToolbar: { enabled: false },
});
