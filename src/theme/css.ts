/** Turns a Theme into the CSS the page needs: custom properties, @font-face rules, preload URLs, theme-color and favicon. */
import { fontFiles } from './font-files';
import type { Theme } from './schema';
import { themeRules, type Lang } from './vars';

export type { Lang };

export interface ThemeAssets {
  css: string;
  preload: string[];
  themeColor: { light: string; dark: string };
  favicon: string;
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
  rules.push(...themeRules(active, lang));
  for (const t of others) {
    rules.push(...themeRules(t, lang, `[data-preset='${t.name}']`));
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
