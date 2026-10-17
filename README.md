# Portfolio

Bilingual (English `/` and Persian `/fa/`) static portfolio built with [Astro](https://astro.build). All content lives in `src/data/content.js`.

## Requirements
Node.js 22.22 or newer (Astro 7).

## Run locally
```
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Deploy to GitHub Pages
Push to `main`. In the repo, open Settings, then Pages, and set Source to **GitHub Actions**.
The workflow in `.github/workflows/deploy.yml` builds and publishes the site.

## Deploy to cPanel
Run `npm run build` (without ASTRO_BASE set), then upload the contents of `dist/` to `public_html`
(or a subdomain folder).

## Before publishing
Replace every `TODO` in `src/data/content.js`: name, email, links, projects, experience.

## Case studies and images
Each project in `src/data/content.js` (`work`, per language) has fields for overview, challenge, goals, process,
solution, results, tools, and a testimonial. Fields left empty are hidden. Images and links shared by both
languages live in `workShared` (logo, cover, gallery, url). Put image files in `public/images/projects/`.

## Bold text
Wrap any text in `**double asterisks**` inside `src/data/content.js` to make it bold (used for AI and focus areas).

## Fonts
Fonts are bundled in `src/assets/fonts` (declared in `src/styles/fonts-en.css` and `fonts-fa.css`): Bricolage Grotesque and IBM Plex Sans for English, Vazirmatn for Persian. No external font requests and no font packages to install.

## Browser support and performance
**Supported baseline:** Chrome/Edge 87+, Firefox 78+, Safari/iOS 14+, Samsung Internet 14+. Everything works on the
latest two versions of each; older browsers in the baseline get graceful fallbacks, never a broken page.

| Situation | What happens |
|---|---|
| No `color-mix()` (Chrome < 111, Safari < 16.2, Firefox < 113) | Solid-color fallbacks replace the tinted backgrounds, borders and glows |
| No `<dialog>.showModal()` (Safari < 15.4, Firefox < 98) | Modals open as a fixed overlay with a backdrop, Esc and focus handling |
| No `IntersectionObserver` or module scripts | Reveal animations are skipped and all content is visible; section tracking falls back to scroll position |
| Main script fails or is blocked | After 4 seconds the page removes its animation gates, so nothing stays hidden |
| No JavaScript | Content and the dot navigation links still work |

**Adaptive effects (`data-perf` on `<html>`):** chosen automatically, without reading the user-agent string.
1. Before first paint: capability signals (`deviceMemory`, `hardwareConcurrency`, Save-Data, slow connection, reduced data).
2. After load: a ~1 second frame-rate probe can downgrade the tier on a slow device. The result is kept for the session.

| Tier | Effects |
|---|---|
| high | Everything: blur, looping icon shine, floating hero cards |
| medium | No background blur, hero cards do not float |
| low | No animations, transitions or glow. Layout and content are identical |

`prefers-reduced-motion` and `prefers-color-scheme` are always respected.

**cPanel:** `public/.htaccess` turns on compression, one-year caching for hashed files and basic security headers.
GitHub Pages ignores it. Fonts are preloaded, CSS is inlined, and the page script is about 6 KB.
