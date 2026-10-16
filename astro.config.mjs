import { defineConfig } from 'astro/config';

// ASTRO_SITE / ASTRO_BASE are set by the GitHub Pages workflow.
// For cPanel or a custom domain, build without them (base "/").
export default defineConfig({
  site: process.env.ASTRO_SITE,
  base: process.env.ASTRO_BASE || '/',
});
