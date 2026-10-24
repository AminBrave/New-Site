# Theming and site configuration

Three layers, each in one place. Change one layer without touching the others.

| Layer | Where | What it controls |
| --- | --- | --- |
| Content | `src/data/content.ts`, `src/data/resume.ts` | All text, projects, resume |
| Identity (theme) | `src/theme/` | Colors, fonts, type scale, radius, shadows, motion, layout widths, favicon |
| Structure | `src/config/site.config.ts` | Section order and visibility, layout variants, optional features |

Styles in `src/styles` contain **no raw colors, radii, font sizes or transition durations**. They only read CSS custom properties generated from the theme. `npm run lint:css` fails if someone adds one.

## Change the look in a minute

1. Pick a preset: edit `activePreset` in `src/theme/index.ts`, or build with `PORTFOLIO_THEME=sand npm run build`.
2. Or make your own: copy `src/theme/presets/ink.ts` to `mine.ts`, change values, import it in `src/theme/index.ts` and add it to `presets`.
3. Preview live: `npm run dev` shows a **Theme lab** panel (bottom corner) to switch presets, hero layout and work layout. It never ships to production.

### What a preset contains (`src/theme/schema.ts`)

- `colors.light` / `colors.dark`: paper, surface, ink, muted, line, accent, onAccent, mark, and the three discipline colors
- `overlay`: `glint` (shine over colored tiles) and `scrim` (modal backdrop)
- `typography.en` / `typography.fa`: display and body families, font files, line height, preload list. Persian and English are separate on purpose
- `fontSize`: a size scale plus three fluid headings
- `radius`, `shadow`, `motion` (a `scale` multiplier speeds everything up or down), `layout` (widths, gutters, section spacing, `density`)
- `brand.faviconPath`: the favicon glyph; its colors come from the palette

The generator (`src/theme/css.ts`) turns this into `:root` custom properties, `@font-face` rules, font preload tags, `theme-color` meta tags and the favicon. Nothing is duplicated in SCSS.

### Safety nets

- **Contrast check** (`src/theme/contrast.ts`): text pairs need 4.5:1, accent hues 3:1, in light and dark. A failing active theme stops `npm run build` with a readable message. `npm run check:theme` checks every preset without building.
- **Type safety**: a preset that misses a token, or names a font file that is not registered, does not compile.
- **Stylelint** (`.stylelintrc.json`): bans hex colors, `rgba()`, raw `border-radius`, `font-size` and `transition` values in SCSS. `base/_print.scss` is exempt because print is always light.
- CI runs `lint:css` and `check:theme` before the build.

### Adding a font

1. Put the `.woff2` in `src/assets/fonts`.
2. Add a key in `src/theme/font-keys.ts` and import the file in `src/theme/font-files.ts`.
3. Reference the key in a preset's `faces` (and in `preload` if it is needed for first paint).

## Structure: `src/config/site.config.ts`

- `sections`: order of sections. Remove an id to hide it; the menu, dots and dialogs follow. `top` must stay first.
- `variants.hero`: `split` or `centered`. `variants.work`: `grid` or `list`. These set `data-hero` / `data-work` on `<html>`; the CSS is in `src/styles/variants`. To add a variant, add a value to the type, a rule block under `[data-hero='name']`, and an `<option>` in `ThemeLab.astro`.
- `features`: `progressBar`, `sectionDots`, `themeToggle`.

To add a new section: create the component, add its id to `SectionId` in `src/data/types.ts`, give it an entry in the `registry` in `src/components/Page.astro`, and list it in `site.sections`.

## Rules of thumb

- Need a new color or size? Add it to the schema and presets first, then use `var(--token)` in SCSS.
- Per-project brand colors in `workShared` can stay hex; the placeholders use `var(--fill-ux)` etc. so they follow the theme. `--fill-*` are the light-palette hues in both modes, because white text sits on them.
- Micro-spacing (paddings inside a component) is intentionally not tokenized. Only layout rhythm is (`layout` in the theme).
