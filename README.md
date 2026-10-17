# Portfolio

Bilingual (English `/` and Persian `/fa/`) static portfolio built with [Astro](https://astro.build). All content lives in `src/data/content.js`.

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
Replace every `TODO` in `src/data/content.js`: name, email, links, projects, experience, and resume file.
