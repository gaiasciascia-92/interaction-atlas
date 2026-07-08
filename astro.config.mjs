// @ts-check
import { defineConfig } from 'astro/config';
import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

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

export default defineConfig({
  // Dominio definitivo da impostare al rilascio (TASK_010)
  site: 'https://interaction-atlas.vercel.app',
  output: 'static',
  integrations: [excludeStyleguide()],
  devToolbar: { enabled: false },
});
