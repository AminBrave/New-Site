/** Build-time guard: a preset that fails contrast or references a missing font file stops the production build. */
import { checkTheme } from './contrast';
import { fontKeys } from './font-keys';
import type { Theme } from './schema';

export function themeProblems(theme: Theme): string[] {
  const problems = checkTheme(theme).map((f) => `[${f.theme}/${f.mode}] ${f.pair} = ${f.ratio}:1, needs ${f.min}:1 (${f.why})`);
  for (const lang of ['en', 'fa'] as const) {
    const ty = theme.typography[lang];
    for (const key of [...ty.preload, ...ty.display.faces.map((f) => f.file), ...ty.body.faces.map((f) => f.file)]) {
      if (!(fontKeys as readonly string[]).includes(key)) problems.push(`[${theme.name}/${lang}] font file "${key}" is not registered in src/theme/font-keys.ts`);
    }
  }
  return problems;
}

/** Throws in production builds; warns in dev so you can still experiment with a failing palette. */
export function assertThemes(themes: Theme[], strict: boolean): void {
  const problems = themes.flatMap(themeProblems);
  if (!problems.length) return;
  const msg = `Theme check failed:\n  - ${problems.join('\n  - ')}`;
  if (strict) throw new Error(msg);
  console.warn(`[theme] ${msg}`);
}
