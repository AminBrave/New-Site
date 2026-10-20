# Bootstrap 5.3 migration contract

This branch starts at main commit `6797a0635a69f7d744ac24a112c5c0ea44bcc7e4`. Do not merge until the complete migration passes visual, accessibility and build checks.

## Decisions
- Astro remains the static site framework; Bootstrap 5.3.x stable is a selectively adopted styling system, not a replacement for Astro components.
- Keep the existing native `<dialog>` and its controller. Do not load Bootstrap's modal, collapse, tooltip or dropdown JavaScript over existing controllers.
- Preserve both `/` and `/fa/`, logical CSS properties, semantic markup, local fonts, theme initialization, canonical/hreflang, GitHub Pages base-path handling and cPanel deployment.
- Adapt existing semantic tokens to Bootstrap `--bs-*` variables before changing individual components; scope component CSS rather than bulk replacing the existing 42 KB stylesheet.
- Introduce Bootstrap dependency and regenerate `package-lock.json` together using `npm install bootstrap@5.3.8 --save-exact` in an environment with npm registry access. Do not hand-edit integrity hashes or leave `npm ci` broken.
- Import only the required Bootstrap CSS/Sass modules, after auditing reset/reboot conflicts. Avoid a second interactive component controller.
- Migrate one UI primitive or section at a time with English/Persian light/dark and responsive screenshots.

## Validation gates
1. `npm ci`, `npm run check`, `npm run build`.
2. Both locale routes and correct `dir`, hreflang, canonical and asset base paths.
3. Keyboard, focus, escape, history/back, menu and dialog behavior.
4. Light/dark contrast, reduced motion and supported browsers.
5. Compare layout before/after at mobile, tablet and desktop sizes.

## Branch safety
Historical branches with commits absent from main were independently preserved under `archive/pre-bootstrap-2026-10-20/` with the original branch suffix. The behind-only `refactor/phase-5d-copy-controller` needs no unique archive. The GitHub connector available in this session does not expose branch deletion, so original branches must not be represented as deleted.
