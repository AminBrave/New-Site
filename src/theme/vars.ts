/**
 * Theme -> CSS custom properties. Pure functions with no asset imports, so the same code runs at build time
 * (css.ts) and in the browser (the dev-only Theme lab). One generator means the live preview cannot drift
 * from what the build emits.
 */
import type { FontFamily, ModeColors, ScriptTypography, Theme } from './schema';

export type Lang = 'en' | 'fa';
export type Vars = Array<[string, string]>;

const stack = (f: FontFamily): string => [`'${f.family}'`, ...f.fallback].join(', ');
const rgbTriplet = (hex: string): string => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};
const round = (n: number): number => Math.round(n * 1000) / 1000;
const decl = (vars: Vars): string => vars.map(([k, v]) => `${k}:${v}`).join(';');

export const colorVars = (c: ModeColors): Vars => [
  ['--paper', c.paper], ['--surface', c.surface], ['--ink', c.ink], ['--muted', c.muted], ['--line', c.line],
  ['--accent', c.accent], ['--on-accent', c.onAccent], ['--mark', c.mark],
  ['--c-ux', c.ux], ['--c-woo', c.woo], ['--c-content', c.content],
];

/** Everything that does not change between light and dark mode. */
export function sharedVars(t: Theme, lang: Lang): Vars {
  const ty: ScriptTypography = t.typography[lang];
  const compact = t.layout.density === 'compact' ? 0.85 : 1;
  const px = (n: number): string => `${round(n)}px`;
  const dur = (s: number): string => `${round(s * t.motion.scale)}s`;
  const vars: Vars = [
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

/**
 * The two rules that apply a theme: light values (plus everything shared) and the dark colors.
 * `scope` is '' for the page default, or an attribute selector such as `[data-preset='sand']`.
 */
export function themeRules(t: Theme, lang: Lang, scope = ''): [string, string] {
  const root = `:root${scope}`;
  return [
    `${root}{${decl(sharedVars(t, lang))};${decl(colorVars(t.colors.light))};color-scheme:light}`,
    `${root}[data-theme='dark']{${decl(colorVars(t.colors.dark))};color-scheme:dark}`,
  ];
}
