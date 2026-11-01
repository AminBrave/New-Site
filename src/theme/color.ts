/**
 * Color math for the Theme lab: OKLCH <-> hex (Björn Ottosson's OKLab) and an auto-fix that moves a color's
 * lightness until every contrast rule it takes part in passes. Pure functions, safe to run in Node and in the browser.
 */
import { contrast, rules } from './contrast';
import type { Hex, ModeColors } from './schema';

export interface Oklch { l: number; c: number; h: number }

const clamp01 = (n: number): number => Math.min(1, Math.max(0, n));
const toLinear = (v: number): number => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const fromLinear = (v: number): number => (v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055);

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h.slice(0, 6);
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
export const rgbToHex = (r: number, g: number, b: number): Hex =>
  `#${[r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('')}`;

export function hexToOklch(hex: string): Oklch {
  const [r, g, b] = hexToRgb(hex).map((v) => toLinear(v / 255)) as [number, number, number];
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const c = Math.hypot(a, bb);
  // Hue is meaningless for greys; keep it at 0 so sliders do not jump.
  const h = c < 1e-4 ? 0 : ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360;
  return { l: L, c, h };
}

function oklchToLinear({ l: L, c, h }: Oklch): [number, number, number] {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}
const inGamut = (rgb: number[]): boolean => rgb.every((v) => v >= -0.0005 && v <= 1.0005);

/** OKLCH to hex. Colors outside sRGB lose chroma (not hue), so a slider never changes the color's character. */
export function oklchToHex(color: Oklch): Hex {
  const l = clamp01(color.l);
  let lo = 0;
  let hi = Math.max(0, color.c);
  let rgb = oklchToLinear({ l, c: hi, h: color.h });
  if (!inGamut(rgb)) {
    for (let i = 0; i < 18; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklchToLinear({ l, c: mid, h: color.h }))) lo = mid;
      else hi = mid;
    }
    rgb = oklchToLinear({ l, c: lo, h: color.h });
  }
  const [r, g, b] = rgb.map((v) => fromLinear(clamp01(v)) * 255) as [number, number, number];
  return rgbToHex(r, g, b);
}

export const isHex = (v: string): v is Hex => /^#[0-9a-fA-F]{6}$/.test(v);

/** Every contrast rule a color takes part in, with the ratio it reaches today. */
export interface PairResult { other: keyof ModeColors; role: 'fg' | 'bg'; ratio: number; min: number; pass: boolean; why: string }
export function pairsFor(colors: ModeColors, key: keyof ModeColors): PairResult[] {
  const out: PairResult[] = [];
  for (const r of rules) {
    if (r.fg !== key && r.bg !== key) continue;
    const ratio = Math.round(contrast(colors[r.fg], colors[r.bg]) * 100) / 100;
    out.push({ other: r.fg === key ? r.bg : r.fg, role: r.fg === key ? 'fg' : 'bg', ratio, min: r.min, pass: ratio >= r.min, why: r.why });
  }
  return out;
}

/**
 * Nearest lightness (same chroma and hue) at which every rule for `key` passes, or null when the color already passes
 * or no lightness works against the other colors.
 */
export function autoFix(colors: ModeColors, key: keyof ModeColors): Hex | null {
  if (pairsFor(colors, key).every((p) => p.pass)) return null;
  const start = hexToOklch(colors[key]);
  for (let step = 1; step <= 200; step++) {
    for (const sign of [1, -1]) {
      const l = start.l + sign * step * 0.005;
      if (l < 0 || l > 1) continue;
      const hex = oklchToHex({ ...start, l });
      if (pairsFor({ ...colors, [key]: hex }, key).every((p) => p.pass)) return hex;
    }
  }
  return null;
}
