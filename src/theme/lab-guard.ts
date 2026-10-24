/**
 * Validates a theme that arrives over the dev-only save endpoint. The payload is untrusted: it is rebuilt key by key
 * from the shape of the `ink` preset (extra keys are rejected, never copied), and every string is checked against a
 * strict pattern because the result is written to disk as source code and later pasted into the page's CSS.
 */
import { fontKeys } from './font-keys';
import ink from './presets/ink';
import type { Theme } from './schema';

export const SLUG = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
export const MAX_SLUG = 32;
const LABEL = /^[\p{L}\p{N} ()._,'’&+/-]{1,60}$/u;
const HEX = /^#[0-9a-fA-F]{6}$/;
const CSS_VALUE = /^[^;{}<>\\\r\n\u2028\u2029]{1,400}$/;
const CSS_BANNED = /url\s*\(|@import|\/\*|expression\s*\(/i;
const FAMILY = /^[A-Za-z0-9 ._-]{1,60}$/;
const FALLBACK = /^[\w '"-]{1,60}$/;
const WEIGHT = /^\d{3}( \d{3})?$/;
const UNICODE_RANGE = /^U\+[0-9A-Fa-f?]{1,6}(-[0-9A-Fa-f]{1,6})?(,U\+[0-9A-Fa-f?]{1,6}(-[0-9A-Fa-f]{1,6})?)*$/;
const FAVICON_PATH = /^[MmLlHhVvCcSsQqTtAaZz0-9 .,eE-]{1,300}$/;

export type GuardResult = { ok: true; theme: Theme } | { ok: false; problems: string[] };

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

function numberRange(path: string): [number, number] {
  if (path === 'motion.scale') return [0.05, 5];
  if (path.startsWith('motion.duration.')) return [0, 10];
  if (path.endsWith('.leading')) return [0.8, 3];
  return [0, 4000]; // layout.*
}

export function parseIncomingTheme(input: unknown): GuardResult {
  const problems: string[] = [];
  const bad = (path: string, why: string): void => void problems.push(`${path}: ${why}`);

  const text = (path: string, v: unknown, re: RegExp, why: string, banned = false): string => {
    if (typeof v !== 'string' || !re.test(v) || (banned && CSS_BANNED.test(v))) {
      bad(path, why);
      return '';
    }
    return v;
  };

  const stringFor = (path: string, v: unknown): string => {
    if (/^colors\.(light|dark)\./.test(path) || path === 'overlay.glint') return text(path, v, HEX, 'expected a #rrggbb color');
    if (path === 'brand.faviconPath') return text(path, v, FAVICON_PATH, 'expected an SVG path');
    if (/^typography\.(en|fa)\.(display|body)\.family$/.test(path)) return text(path, v, FAMILY, 'unexpected characters in font family');
    if (path === 'layout.density') {
      if (v === 'comfortable' || v === 'compact') return v;
      bad(path, 'expected "comfortable" or "compact"');
      return 'comfortable';
    }
    return text(path, v, CSS_VALUE, 'expected a plain CSS value (no ; { } < > \\ or url())', true);
  };

  const arrayFor = (path: string, v: unknown): unknown[] => {
    const last = path.split('.').pop();
    if (!Array.isArray(v) || v.length > 32) {
      bad(path, 'expected a short list');
      return [];
    }
    if (last === 'fallback') return v.map((x, i) => text(`${path}[${i}]`, x, FALLBACK, 'unexpected font fallback', false));
    if (last === 'preload') {
      return v.map((x, i) => {
        if (typeof x === 'string' && (fontKeys as readonly string[]).includes(x)) return x;
        bad(`${path}[${i}]`, 'not a registered font file');
        return '';
      });
    }
    if (last === 'faces') {
      return v.map((x, i) => {
        const p = `${path}[${i}]`;
        if (!isObject(x)) {
          bad(p, 'expected an object');
          return {};
        }
        const file = x.file;
        if (typeof file !== 'string' || !(fontKeys as readonly string[]).includes(file)) bad(`${p}.file`, 'not a registered font file');
        return {
          file: typeof file === 'string' ? file : '',
          weight: text(`${p}.weight`, x.weight, WEIGHT, 'expected e.g. "400" or "200 800"'),
          range: text(`${p}.range`, x.range, UNICODE_RANGE, 'expected a unicode-range'),
        };
      });
    }
    bad(path, 'unexpected list');
    return [];
  };

  const walk = (template: unknown, value: unknown, path: string): unknown => {
    if (Array.isArray(template)) return arrayFor(path, value);
    if (isObject(template)) {
      if (!isObject(value)) {
        bad(path, 'expected an object');
        return {};
      }
      const out: Record<string, unknown> = {};
      for (const k of Object.keys(value)) if (!(k in template)) bad(`${path}.${k}`, 'unknown key');
      for (const k of Object.keys(template)) {
        const p = path ? `${path}.${k}` : k;
        if (!Object.prototype.hasOwnProperty.call(value, k)) {
          bad(p, 'missing');
          continue;
        }
        out[k] = walk(template[k], value[k], p);
      }
      return out;
    }
    if (typeof template === 'number') {
      const [lo, hi] = numberRange(path);
      if (typeof value !== 'number' || !Number.isFinite(value) || value < lo || value > hi) {
        bad(path, `expected a number from ${lo} to ${hi}`);
        return lo;
      }
      return value;
    }
    return stringFor(path, value);
  };

  if (!isObject(input)) return { ok: false, problems: ['theme: expected an object'] };
  const { name, label, ...rest } = input;
  const slug = typeof name === 'string' ? name : '';
  if (!SLUG.test(slug) || slug.length > MAX_SLUG) bad('name', `use lowercase letters, digits and single hyphens, up to ${MAX_SLUG} characters`);
  if (typeof label !== 'string' || !LABEL.test(label)) bad('label', 'use 1 to 60 letters, digits, spaces or ( ) . _ , \' & + / -');

  const { name: _n, label: _l, ...templateRest } = ink;
  const body = walk(templateRest, rest, '') as Omit<Theme, 'name' | 'label'>;
  if (problems.length) return { ok: false, problems };
  return { ok: true, theme: { name: slug, label: label as string, ...body } };
}
