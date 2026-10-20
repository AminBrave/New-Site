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

Fonts are bundled in `src/assets/fonts` and declared in `src/styles/fonts-en.css` and `src/styles/fonts-fa.css`: Bricolage Grotesque and IBM Plex Sans for English, Vazirmatn for Persian. No external font requests or font packages are required.

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


## UI foundation: Astro + Bootstrap

This project uses **Astro** for routing, static rendering, page composition, and build output, with **Bootstrap 5.3.8** as a selectively adopted layout toolkit.

### Integration boundary

- Bootstrap is installed as a pinned npm dependency and built locally through Vite; no runtime CDN dependency is introduced.
- Only Bootstrap's responsive grid and utility styles are imported from `src/styles/bootstrap.css`.
- Bootstrap's Reboot, global component styles, and JavaScript bundle are intentionally not imported. The portfolio's custom design tokens, typography, components, RTL behavior, theme switching, dialogs, and interaction controllers remain the source of truth.
- Use Bootstrap grid classes such as `row`, `col-12`, `col-md-6`, and `col-xl-4` where responsive layout benefits from a standard grid. Keep bespoke visual components in the existing component-scoped class system.
- Prefer Astro components and typed data in `src/components` and `src/data`; add client JavaScript only for genuinely interactive behavior.

### Development checks

```sh
npm ci
npm run check
npm run build
```

When adopting additional Bootstrap features, import only the required styles and verify light/dark themes, Persian RTL layout, keyboard focus, reduced motion, and mobile breakpoints. Avoid importing a second global reset or adding Bootstrap JavaScript unless a concrete interaction requires it.
