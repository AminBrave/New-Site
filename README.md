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
Replace every `TODO` in `src/data/content.js`: name, email, links, projects, experience.

## Case studies and images
Each project in `src/data/content.js` (`work`, per language) has fields for overview, challenge, goals, process,
solution, results, tools, and a testimonial. Fields left empty are hidden. Images and links shared by both
languages live in `workShared` (logo, cover, gallery, url). Put image files in `public/images/projects/`.

## Bold text
Wrap any text in `**double asterisks**` inside `src/data/content.js` to make it bold (used for AI and focus areas).

## Fonts
Fonts are bundled in `src/assets/fonts` (declared in `src/styles/fonts-en.css` and `fonts-fa.css`): Bricolage Grotesque and IBM Plex Sans for English, Vazirmatn for Persian. No external font requests and no font packages to install.
