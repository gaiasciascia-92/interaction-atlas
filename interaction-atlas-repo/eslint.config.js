// Configurazione minimale condivisa — TASK_001
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default tseslint.config(
  { ignores: ['dist/', '.astro/', 'node_modules/', '.vercel/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      // La documentazione vieta gli any impliciti; quelli espliciti richiedono motivazione
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
);
