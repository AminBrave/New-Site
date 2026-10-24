/** Turns a Theme into the CSS the page needs: custom properties, @font-face rules, preload URLs, theme-color and favicon. */
import { fontFiles } from './font-files';
import type { FontFamily, ModeColors, ScriptTypography, Theme } from './schema';

export type Lang = 'en' | 'fa';

export interface ThemeAssets {
  css: string;
  preload: string[];
  themeColor: { light: string; dark: string };
  favicon: string;
}

const stack = (f: FontFamily): string => [`'${f.family}'`, ...f.fallback].join(', ');
const rgbTriplet = (hex: string): string => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};
const round = (n: number): number => Math.round(n * 1000) / 1000;
const decl = (vars: Array<[string, string]>): string => vars.map(([k, v]) => `${k}:${v}`).join(';');

const colorVars = (c: ModeColors): Array<[string, string]> => [
  ['--paper', c.paper], ['--surface', c.surface], ['--ink', c.ink], ['--muted', c.muted], ['--line', c.line],
  ['--accent', c.accent], ['--on-accent', c.onAccent], ['--mark', c.mark],
  ['--c-ux', c.ux], ['--c-woo', c.woo], ['--c-content', c.content],
];

/** Everything that does not change between light and dark mode. */
function sharedVars(t: Theme, lang: Lang): Array<[string, string]> {
  const ty: ScriptTypography = t.typography[lang];
  const compact = t.layout.density === 'compact' ? 0.85 : 1;
  const px = (n: number): string => `${round(n)}px`;
  const dur = (s: number): string => `${round(s * t.motion.scale)}s`;
  const vars: Array<[string, string]> = [
    ['--display', stack(ty.display)], ['--body', stack(ty.body)], ['--leading', String(ty.leading)],
    ['--glint', t.overlay.glint], ['--glint-rgb', rgbTriplet(t.overlay.glint)], ['--scrim', t.overlay.scrim],
    ['--ease', t.motion.ease],
    // Solid brand fills that carry white text: the same in light and dark mode.
    ['--fill-ux', t.colors.light.ux], ['--fill-woo', t.colors.light.woo], ['--fill-content', t.colors.light.content],
  ];
  for (const [k, v] of Object.entries(t.fontSize)) vars.push([`--fs-${k}`, v]);
  for (const [k, v] of Object.entries(t.radius)) vars.push([`--radius-${k}`, v]);
  vars.push(['--shadow-dialog', t.shadow.dialog], ['--shadow-drawer-start', t.shadow.drawerStart], ['--shadow-drawer-end', t.shadow.drawerEnd], ['--shadow-lift', t.shadow.lift], ['--shadow-dot', t.shadow.dot]);
  for (const [k, v] of Object.entries(t.motion.duration)) vars.push([`--dur-${k}`, dur(v)]);
  const l = t.layout;
  vars.push(
    ['--wrap-max', px(l.wrapMax)], ['--gutter', px(l.gutter)], ['--gutter-wide', px(l.gutterWide)], ['--gutter-end', px(l.gutterEnd)],
    ['--section-y', px(l.sectionY * compact)], ['--section-y-sm', px(l.sectionYSmall * compact)], ['--gap-cards', px(l.cardGap * compact)], ['--dialog-max', px(l.dialogMax)],
  );
  return vars;
}

function faces(t: Theme, lang: Lang): string[] {
  const ty = t.typography[lang];
  const out: string[] = [];
  for (const fam of [ty.display, ty.body]) {
    for (const f of fam.faces) {
      out.push(`@font-face{font-family:'${fam.family}';font-style:normal;font-display:swap;font-weight:${f.weight};src:url(${fontFiles[f.file]}) format('woff2');unicode-range:${f.range}}`);
    }
  }
  return out;
}

/** CSS for the active theme at :root; in dev, every other preset is added under [data-preset="name"] for live switching. */
export function buildThemeAssets(active: Theme, lang: Lang, others: Theme[] = []): ThemeAssets {
  const rules: string[] = [];
  const fontRules = new Set<string>(faces(active, lang));
  rules.push(`:root{${decl(sharedVars(active, lang))};${decl(colorVars(active.colors.light))};color-scheme:light}`);
  rules.push(`:root[data-theme='dark']{${decl(colorVars(active.colors.dark))};color-scheme:dark}`);
  for (const t of others) {
    const sel = `:root[data-preset='${t.name}']`;
    rules.push(`${sel}{${decl(sharedVars(t, lang))};${decl(colorVars(t.colors.light))};color-scheme:light}`);
    rules.push(`${sel}[data-theme='dark']{${decl(colorVars(t.colors.dark))};color-scheme:dark}`);
    faces(t, lang).forEach((r) => fontRules.add(r));
  }
  const preload = active.typography[lang].preload.map((k) => fontFiles[k]);
  const e = encodeURIComponent;
  const favicon = `data:image/svg+xml,${e("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>")}${e(`<rect width='32' height='32' rx='7' fill='${active.colors.light.accent}'/><path d='${active.brand.faviconPath}' fill='none' stroke='${active.colors.light.onAccent}' stroke-width='3'/></svg>`)}`;
  return {
    css: [...fontRules, ...rules].join('\n'),
    preload,
    themeColor: { light: active.colors.light.paper, dark: active.colors.dark.paper },
    favicon,
  };
}
