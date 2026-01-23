// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://shiozaki-new.github.io/shinchoku2026',
  base: '/shinchoku2026',   // ← スラッシュなし
  build: {
    inlineStylesheets: 'always'
  },
  integrations: [
    react(),
    tailwind({
      config: './tailwind.config.mjs'
    })
  ],
  compressHTML: false
});
