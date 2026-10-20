# Bootstrap 5.3 migration contract

This branch starts at main commit `6797a0635a69f7d744ac24a112c5c0ea44bcc7e4`. Do not merge until the complete migration passes visual, accessibility and build checks.

## Decisions
- Astro remains the static site framework; Bootstrap 5.3.x stable is a selectively adopted styling system, not a replacement for Astro components.
- Keep the existing native `<dialog>` and its controller. Do not load Bootstrap's modal, collapse, tooltip or dropdown JavaScript over existing controllers.
- Preserve both `/` and `/fa/`, logical CSS properties, semantic markup, local fonts, theme initialization, canonical/hreflang, GitHub Pages base-path handling and cPanel deployment.
- Adapt existing semantic tokens to Bootstrap `--bs-*` variables before changing individual components; scope component CSS rather than bulk replacing the existing 42 KB stylesheet.
- Bootstrap 5.3.8 is pinned exactly in `package.json` and represented in lockfile v3 with the registry tarball and integrity hash. CSS is imported from the package and bundled by Astro; no runtime CDN dependency is intended.
- Bootstrap CSS is imported before the portfolio stylesheet so the existing component design wins where class names overlap. The semantic token bridge loads after both stylesheets.
- Bootstrap JavaScript is intentionally omitted: the project keeps its native `<dialog>` and existing controllers for menu, theme, scroll and modal behavior.
- Bootstrap utilities are adopted selectively for spacing and flex layout; bespoke visual components remain semantic Astro components with their existing scoped design.

## Validation gates
1. `npm ci`, `npm run check`, `npm run build` (run in GitHub Actions after these commits).
2. Both locale routes and correct `dir`, hreflang, canonical and asset base paths.
3. Keyboard, focus, escape, history/back, menu and dialog behavior.
4. Light/dark contrast, reduced motion and supported browsers.
5. Compare layout before/after at mobile, tablet and desktop sizes.

## Current migration status
- Framework CSS is a local, pinned npm dependency and should be included in the Astro build rather than fetched from a CDN.
- Responsive layout and spacing utilities are introduced selectively to avoid replacing the established portfolio art direction with generic Bootstrap component styles.
- Automated build checks are not a substitute for browser-based visual and keyboard testing. Review both locales in light/dark mode before merging.

## Branch safety
Historical branches with commits absent from main were independently preserved under `archive/pre-bootstrap-2026-10-20/` with the original branch suffix. The behind-only `refactor/phase-5d-copy-controller` needs no unique archive. The GitHub connector available in this session does not expose branch deletion, so original branches must not be represented as deleted.
