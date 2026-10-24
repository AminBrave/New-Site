/** "Ink": the original identity. Cool paper, electric blue accent, Bricolage Grotesque + IBM Plex Sans. */
import type { Theme } from '../schema';
import { arabic, latin } from '../font-ranges';

const vazir = (file: 'arabic' | 'latin') =>
  ([400, 500, 700] as const).map((w) => ({ file: `vazir-${file}-${w}` as const, weight: String(w), range: file === 'arabic' ? arabic : latin }));

const ink: Theme = {
  name: 'ink',
  label: 'Ink (blue, grotesque)',
  colors: {
    light: {
      paper: '#f4f6f8', surface: '#ffffff', ink: '#111a22', muted: '#56626d', line: '#d0d7dd',
      accent: '#2447f5', onAccent: '#ffffff', mark: '#f7e463',
      ux: '#2447f5', woo: '#6d33e0', content: '#0b8a7b',
    },
    dark: {
      paper: '#0f161c', surface: '#16202a', ink: '#eef2f5', muted: '#a4afb9', line: '#2a3640',
      accent: '#8aa0ff', onAccent: '#0f161c', mark: '#5a5018',
      ux: '#8aa0ff', woo: '#b49cff', content: '#52d6c4',
    },
  },
  overlay: { glint: '#ffffff', scrim: 'rgb(8 12 16 / .62)' },
  typography: {
    en: {
      display: { family: 'Bricolage Grotesque Variable', faces: [{ file: 'bricolage-latin-wght', weight: '200 800', range: latin }], fallback: ["'Segoe UI'", 'system-ui', 'sans-serif'] },
      body: {
        family: 'IBM Plex Sans',
        faces: [{ file: 'plex-latin-400', weight: '400', range: latin }, { file: 'plex-latin-500', weight: '500', range: latin }],
        fallback: ['system-ui', '-apple-system', "'Segoe UI'", 'sans-serif'],
      },
      leading: 1.65,
      preload: ['bricolage-latin-wght', 'plex-latin-400'],
    },
    fa: {
      display: { family: 'Vazirmatn', faces: [...vazir('arabic'), ...vazir('latin')], fallback: ['Tahoma', 'system-ui', 'sans-serif'] },
      body: { family: 'Vazirmatn', faces: [], fallback: ['Tahoma', 'system-ui', 'sans-serif'] },
      leading: 1.9,
      preload: ['vazir-arabic-400', 'vazir-arabic-700'],
    },
  },
  fontSize: {
    '2xs': '.8rem', xs: '.85rem', sm: '.9rem', md: '.95rem', base: '1rem', lead: '1.0625rem', lg: '1.1rem', xl: '1.2rem', '2xl': '1.5rem', '3xl': '1.9rem',
    display: 'clamp(2.3rem, 7.2vw, 4.2rem)', h2: 'clamp(1.7rem, 5vw, 2.5rem)', h3: 'clamp(1.15rem, 3.6vw, 1.45rem)',
  },
  radius: { xxs: '4px', xs: '6px', sm: '8px', md: '12px', lg: '16px', xl: '20px', pill: '999px' },
  shadow: {
    dialog: '0 30px 80px -20px rgb(0 0 0 / .5)',
    drawerStart: '-30px 0 80px -30px rgb(0 0 0 / .5)',
    drawerEnd: '30px 0 80px -30px rgb(0 0 0 / .5)',
    lift: '0 14px 32px -18px color-mix(in srgb, var(--accent) 55%, transparent)',
    dot: '0 0 10px -4px var(--accent)',
  },
  motion: { scale: 1, ease: 'cubic-bezier(.2, .7, .2, 1)', duration: { fast: 0.2, base: 0.25, mid: 0.3, slow: 0.4, slower: 0.5, slowest: 0.9 } },
  layout: { wrapMax: 1040, gutter: 20, gutterWide: 24, gutterEnd: 44, sectionY: 64, sectionYSmall: 48, cardGap: 20, dialogMax: 940, density: 'comfortable' },
  brand: { faviconPath: 'M9 22V10h7a4 4 0 010 8h-7' },
};
export default ink;
