import { defineConfig } from 'astro/config';
import themeLab from './src/integrations/theme-lab.ts';

// ASTRO_SITE / ASTRO_BASE are set by the GitHub Pages workflow.
// For cPanel or a custom domain, build without them (base "/").
export default defineConfig({
  site: process.env.ASTRO_SITE,
  base: process.env.ASTRO_BASE || '/',
  // Dev only: lets the Theme lab save presets to src/theme/presets. Does nothing in build or preview.
  integrations: [themeLab()],
  compressHTML: true,
  build: {
    // One small page: inlining the CSS saves a render-blocking request on slow networks.
    inlineStylesheets: 'always',
  },
  vite: {
    build: {
      // Supported baseline (see README): JS and CSS are emitted for these browsers.
      target: ['chrome87', 'safari14', 'firefox78'],
      cssTarget: ['chrome87', 'safari14', 'firefox78'],
    },
  },
});
