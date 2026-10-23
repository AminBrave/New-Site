# Portfolio

Bilingual (English `/` and Persian `/fa/`) static portfolio built with [Astro](https://astro.build) and TypeScript.

## Requirements

- Node.js 22.22 or newer
- npm (use the committed `package-lock.json` for reproducible installs)

## Run locally

```sh
npm ci
npm run dev       # http://localhost:4321
npm run check     # Astro and TypeScript diagnostics
npm run build     # production build and portfolio content relationship validation
npm run preview   # preview the production build locally
```

The content validator runs when Astro imports `src/data/content.ts` during the production build. It checks duplicate project IDs, English/Persian project parity, missing or orphaned `workShared` records, duplicate discipline IDs, and invalid related-project references. Placeholder copy is intentionally allowed so incomplete personal content does not block structural development.

## Content source of truth

- `src/data/content.ts` is the canonical source for English and Persian site copy, services, process, experience, and case studies.
- `src/data/types.ts` defines the TypeScript contracts for this content.
- `workShared` in `src/data/content.ts` stores project assets and links shared between languages.
- `public/images/projects/` is the location for project images. Use paths relative to `public` in the content data, for example `images/projects/example.webp`.
- `src/components/Page.astro` renders both locales from the shared content model.

See [the content launch checklist](docs/content-launch-checklist.md) before publishing. Keep placeholders until the real details are available; do not publish invented client names, testimonials, credentials, or metrics.

### Case studies and images

Each locale's `work` entries share stable project IDs. Keep the same project IDs in English and Persian, and ensure each ID has exactly one `workShared` record. Case-study content includes overview, challenge, goals, process, solution, results, tools, and testimonial fields. Empty shared image/link values are allowed when assets or URLs are not available yet.

Wrap text in `**double asterisks**` in `src/data/content.ts` to render it bold in fields processed by the rich-text helper.

## Deploy to GitHub Pages

Push to `main`. In repository Settings → Pages, set the source to **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and publishes the site.

## Deploy to cPanel

Run `npm run build` without the GitHub Pages `ASTRO_BASE` setting, then upload the contents of `dist/` to `public_html` (or the appropriate subdomain directory). Check `astro.config.mjs` and the deployment workflow if your hosting base path or custom domain changes.

## Fonts

Fonts are bundled in `src/assets/fonts` and declared in `src/styles/fonts-en.scss` and `src/styles/fonts-fa.scss`: Bricolage Grotesque and IBM Plex Sans for English, Vazirmatn for Persian. No external font requests or font packages are required.

## Browser support and performance

**Supported baseline:** Chrome/Edge 87+, Firefox 78+, Safari/iOS 14+, Samsung Internet 14+. The site includes fallbacks for browsers missing some newer features.

| Situation | What happens |
|---|---|
| No `color-mix()` | Solid-color fallbacks replace tinted backgrounds, borders, and glows |
| No `<dialog>.showModal()` | Modals use a fixed-overlay fallback |
| No `IntersectionObserver` or module scripts | Reveal animations are skipped and section tracking falls back to scroll position |
| Main script fails or is blocked | After 4 seconds the page removes its animation gates so content remains visible |
| No JavaScript | Content and dot-navigation links remain available |

Adaptive effects (`data-perf` on `<html>`) use browser capability signals and a short frame-rate probe to reduce effects on slower devices. `prefers-reduced-motion` and `prefers-color-scheme` are respected.

**cPanel:** `public/.htaccess` enables compression, long caching for hashed files, and basic security headers. GitHub Pages ignores this file. Fonts are preloaded and CSS is inlined.

## Styles (SCSS)

Styles live in `src/styles` and are compiled by Astro/Vite (`sass` is a dev dependency). `main.scss` is the single entry point and lists the partials in cascade order:

- `abstracts/` mixins: media queries (`m.min()`, `m.max()`, `m.hover`, `m.reduced-motion`, `m.forced-colors`) and `fonts.face()` for `@font-face`
- `base/` tokens (CSS custom properties for light/dark), reset, accessibility, fallbacks, device tiers, print
- `layout/` header, section wrappers, responsive overrides
- `components/` menu, dots, buttons, tiles, dialogs, effects
- `sections/` hero, skills, process, work, resume, contact

Rules are written as a tree: states, pseudo-elements, modifiers, descendants and RTL/theme contexts are nested under their block with `&` (for example `[dir='rtl'] &`). Rules are only nested when this cannot change which declaration wins in the cascade, so partials keep unrelated rules flat and `@media` blocks stay at the end of the rules they override.

Theming stays on CSS custom properties (`--accent`, `--paper`, ...), so the dark mode switch works at runtime. Add a partial, then `@use` it in `main.scss` at the right place in the order.
