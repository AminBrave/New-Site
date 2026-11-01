/**
 * Theme -> source text of a preset file. Only literals are emitted: strings are escaped, keys come from the
 * schema (checked by lab-guard.ts), and the one identifier-valued field (font `range`) is limited to the known
 * constants in font-ranges.ts. A flat snapshot keeps every saved preset independent of the preset it started from.
 */
import { arabic, latin } from './font-ranges';
import type { Theme } from './schema';

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const RANGE_IDENTS = new Map<string, string>([[latin, 'latin'], [arabic, 'arabic']]);
const IDENT = /^[A-Za-z_$][\w$]*$/;
const WIDTH = 100;

const quote = (s: string): string =>
  `'${s.replace(/[\\']/g, '\\$&').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')}'`;

export function serializePreset(theme: Theme, savedOn: string): string {
  const usedRanges = new Set<string>();

  const leaf = (v: string | number | boolean | null): string => {
    if (typeof v !== 'string') return String(v);
    const ident = RANGE_IDENTS.get(v);
    if (ident) {
      usedRanges.add(ident);
      return ident;
    }
    return quote(v);
  };
  const key = (k: string): string => (IDENT.test(k) ? k : quote(k));

  const inline = (v: Json): string => {
    if (v === null || typeof v !== 'object') return leaf(v);
    if (Array.isArray(v)) return `[${v.map(inline).join(', ')}]`;
    const entries = Object.entries(v);
    return entries.length ? `{ ${entries.map(([k, x]) => `${key(k)}: ${inline(x)}`).join(', ')} }` : '{}';
  };

  const render = (v: Json, indent: number): string => {
    const flat = inline(v);
    if (v === null || typeof v !== 'object' || indent * 2 + flat.length <= WIDTH) return flat;
    const pad = '  '.repeat(indent + 1);
    const end = '  '.repeat(indent);
    if (Array.isArray(v)) return `[\n${v.map((x) => `${pad}${render(x, indent + 1)},`).join('\n')}\n${end}]`;
    return `{\n${Object.entries(v).map(([k, x]) => `${pad}${key(k)}: ${render(x, indent + 1)},`).join('\n')}\n${end}}`;
  };

  const body = render(theme as unknown as Json, 0);
  const imports = [`import type { Theme } from '../schema';`];
  if (usedRanges.size) imports.push(`import { ${[...usedRanges].sort().join(', ')} } from '../font-ranges';`);
  return [
    `/** "${theme.label}": saved from the Theme lab on ${savedOn}. Edit freely; \`npm run check:theme\` validates it. */`,
    ...imports,
    '',
    `const preset: Theme = ${body};`,
    'export default preset;',
    '',
  ].join('\n');
}
