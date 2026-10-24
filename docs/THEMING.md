# Theming and site configuration

Three layers, each in one place. Change one layer without touching the others.

| Layer | Where | What it controls |
| --- | --- | --- |
| Content | `src/data/content.ts`, `src/data/resume.ts` | All text, projects, resume |
| Identity (theme) | `src/theme/` | Colors, fonts, type scale, radius, shadows, motion, layout widths, favicon |
| Structure | `src/config/site.config.ts` | Section order and visibility, layout variants, optional features |

Styles in `src/styles` contain **no raw colors, radii, font sizes or transition durations**. They only read CSS custom properties generated from the theme. `npm run lint:css` fails if someone adds one.

## Change the look in a minute

1. Pick a preset: change `DEFAULT_PRESET` in `src/theme/index.ts`, or build with `PORTFOLIO_THEME=sand npm run build`.
2. Or make your own: open the **Theme lab** (below) and save one, or copy `src/theme/presets/ink.ts` to `mine.ts`, change values and run `npm run presets:sync`. The sync regenerates `src/theme/presets/_registry.ts`, which is what the site reads.
3. Preview live: `npm run dev` shows the **Theme lab** (bottom corner). It never ships to production.

## Theme lab (development only)

A panel for editing the theme on the real page and saving the result as a preset file. It is the `<theme-lab>` element in `src/scripts/theme-lab/`, loaded by `Base.astro` only when `import.meta.env.DEV` is true.

**Using it**

- Pick a preset, then work through the tabs: **Colors** (light or dark, following the page mode), **Type** (fonts, line height, size scale), **Shape** (radius, shadows), **Motion** (speed, easing with a preview, durations), **Layout** (spacing, widths, density, plus hero and work variants for preview).
- Each color shows a contrast ratio against the colors it is used with. **Fix** moves its lightness to the nearest value where every rule passes. **Tune** exposes OKLCH lightness, chroma and hue.
- Type edits apply to the language of the page you are on (English at `/`, Persian at `/fa/`). Open the other page to edit the other.
- **Undo / Redo** (coalesced while you drag), **Compare** (hold to see the saved preset), **Reset**. A draft is kept in `localStorage` and survives reloads until you save or reset.
- Keyboard: tabs move with arrow keys, Esc closes the panel, every control has a visible label and focus ring. Buttons and fields are 32 px tall and sliders 24 px, which meets the WCAG 2.2 AA target-size minimum.
- **Save as preset…** opens a small form.
  - Built-in presets (`ink`, `sand`) cannot be overwritten, so edits are saved as a **new** preset.
  - Presets you saved earlier offer **Update** or **New preset**.
  - A preset that fails contrast cannot be saved; the form says how many checks fail.
  - **Copy code** puts the preset source on the clipboard (or in a text box) if saving is not possible.
- Hero and work variants are page settings, not theme values. They are for preview; set the real default in `site.config.ts`.

**How saving works**

1. The panel renders your draft with the same generator the build uses (`src/theme/vars.ts`), so what you see is what the build emits.
2. Save sends the draft to `POST /__theme-lab/save`, registered by `src/integrations/theme-lab.ts` only during `astro dev`.
3. The server rebuilds the object from the shape of `ink` (unknown keys are rejected), checks every string against strict patterns, runs the contrast check, writes `src/theme/presets/<name>.ts` through `src/theme/serialize.ts`, and regenerates `_registry.ts`.
4. The page reloads into the new preset. Review and commit the new file like any other change.

**Limits and safety**

- Saving works only from the machine running the dev server: the endpoint rejects non-loopback clients, non-local `Host` headers, foreign or missing `Origin`, and requests without `X-Theme-Lab: 1`. `astro dev --host` lets other devices view the page but not save.
- Fonts can only be chosen from the files registered in `font-keys.ts` (see "Adding a font").
- Saved presets are flat snapshots, so they do not change when another preset changes.
- Tests for the guard, serializer, endpoint and color math run with `npm test`.

### What a preset contains (`src/theme/schema.ts`)

- `colors.light` / `colors.dark`: paper, surface, ink, muted, line, accent, onAccent, mark, and the three discipline colors
- `overlay`: `glint` (shine over colored tiles) and `scrim` (modal backdrop)
- `typography.en` / `typography.fa`: display and body families, font files, line height, preload list. Persian and English are separate on purpose
- `fontSize`: a size scale plus three fluid headings
- `radius`, `shadow`, `motion` (a `scale` multiplier speeds everything up or down), `layout` (widths, gutters, section spacing, `density`)
- `brand.faviconPath`: the favicon glyph; its colors come from the palette

The generator turns this into `:root` custom properties (`src/theme/vars.ts`, pure and shared with the Theme lab), `@font-face` rules, font preload tags, `theme-color` meta tags and the favicon (`src/theme/css.ts`). Nothing is duplicated in SCSS.

### Safety nets

- **Contrast check** (`src/theme/contrast.ts`): text pairs need 4.5:1, accent hues 3:1, in light and dark. A failing active theme stops `npm run build` with a readable message. `npm run check:theme` checks every preset without building.
- **Type safety**: a preset that misses a token, or names a font file that is not registered, does not compile.
- **Stylelint** (`.stylelintrc.json`): bans hex colors, `rgba()`, raw `border-radius`, `font-size` and `transition` values in SCSS. `base/_print.scss` is exempt because print is always light.
- `npm run check:theme` also checks that each preset's `name` matches its file name and that `_registry.ts` is up to date.
- CI runs `lint:css`, `check:theme` and `npm test` before the build.

### Adding a font

1. Put the `.woff2` in `src/assets/fonts`.
2. Add a key in `src/theme/font-keys.ts` and import the file in `src/theme/font-files.ts`.
3. Reference the key in a preset's `faces` (and in `preload` if it is needed for first paint).

## Structure: `src/config/site.config.ts`

- `sections`: order of sections. Remove an id to hide it; the menu, dots and dialogs follow. `top` must stay first.
- `variants.hero`: `split` or `centered`. `variants.work`: `grid` or `list`. These set `data-hero` / `data-work` on `<html>`; the CSS is in `src/styles/variants`. To add a variant, add a value to the type, a rule block under `[data-hero='name']`, and an option in `layoutTab()` in `src/scripts/theme-lab/element.ts` so it can be previewed.
- `features`: `progressBar`, `sectionDots`, `themeToggle`.

To add a new section: create the component, add its id to `SectionId` in `src/data/types.ts`, give it an entry in the `registry` in `src/components/Page.astro`, and list it in `site.sections`.

## Rules of thumb

- Need a new color or size? Add it to the schema and presets first, then use `var(--token)` in SCSS.
- Per-project brand colors in `workShared` can stay hex; the placeholders use `var(--fill-ux)` etc. so they follow the theme. `--fill-*` are the light-palette hues in both modes, because white text sits on them.
- Micro-spacing (paddings inside a component) is intentionally not tokenized. Only layout rhythm is (`layout` in the theme).
