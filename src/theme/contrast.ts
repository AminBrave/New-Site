/** WCAG 2.x contrast helpers and the pairs every theme must pass. Pure functions, no imports, safe to run in Node. */
import type { ModeColors, Theme } from './schema';

const channel = (v: number): number => {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
export function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full.slice(0, 6), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

type ColorKey = keyof ModeColors;
interface Rule { fg: ColorKey; bg: ColorKey; min: number; why: string }

/** 4.5 for text, 3 for graphics and large UI (WCAG 1.4.3 and 1.4.11). Accent hues are used for icons and chips, so 3. */
export const rules: Rule[] = [
  { fg: 'ink', bg: 'paper', min: 4.5, why: 'body text on the page' },
  { fg: 'ink', bg: 'surface', min: 4.5, why: 'text on cards and dialogs' },
  { fg: 'muted', bg: 'paper', min: 4.5, why: 'secondary text on the page' },
  { fg: 'muted', bg: 'surface', min: 4.5, why: 'secondary text on cards' },
  { fg: 'accent', bg: 'paper', min: 4.5, why: 'links and focus ring' },
  { fg: 'accent', bg: 'surface', min: 4.5, why: 'links on cards' },
  { fg: 'onAccent', bg: 'accent', min: 4.5, why: 'text on primary buttons' },
  { fg: 'ux', bg: 'paper', min: 3, why: 'UI/UX discipline color' },
  { fg: 'woo', bg: 'paper', min: 3, why: 'WooCommerce discipline color' },
  { fg: 'content', bg: 'paper', min: 3, why: 'content discipline color' },
  { fg: 'line', bg: 'paper', min: 1.2, why: 'borders stay visible but quiet' },
];

export interface Failure { theme: string; mode: 'light' | 'dark'; pair: string; ratio: number; min: number; why: string }

export function checkTheme(theme: Theme): Failure[] {
  const out: Failure[] = [];
  // Tiles and dialog covers use --fill-* (the light palette) with overlay.glint on top, in both modes.
  for (const k of ['ux', 'woo', 'content'] as const) {
    const ratio = contrast(theme.overlay.glint, theme.colors.light[k]);
    if (ratio < 3) out.push({ theme: theme.name, mode: 'light', pair: `glint on ${k} fill`, ratio: Math.round(ratio * 100) / 100, min: 3, why: 'white text on colored tiles' });
  }
  for (const mode of ['light', 'dark'] as const) {
    const c = theme.colors[mode];
    for (const r of rules) {
      const ratio = contrast(c[r.fg], c[r.bg]);
      if (ratio < r.min) out.push({ theme: theme.name, mode, pair: `${r.fg} on ${r.bg}`, ratio: Math.round(ratio * 100) / 100, min: r.min, why: r.why });
    }
  }
  return out;
}
