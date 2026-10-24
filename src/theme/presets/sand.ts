/** "Sand": a warm editorial identity. Paper tones, terracotta accent, serif display, sharper corners, slightly calmer motion. */
import type { Theme } from '../schema';
import ink from './ink';

const sand: Theme = {
  name: 'sand',
  label: 'Sand (terracotta, serif)',
  colors: {
    light: {
      paper: '#f7f1e8', surface: '#fffcf6', ink: '#2a2118', muted: '#66594b', line: '#ddd0bd',
      accent: '#a93d1c', onAccent: '#ffffff', mark: '#f0c36d',
      ux: '#a93d1c', woo: '#74459f', content: '#2a7a67',
    },
    dark: {
      paper: '#1c1712', surface: '#26201a', ink: '#f4ebdd', muted: '#b9ab98', line: '#3c342b',
      accent: '#f0916f', onAccent: '#1c1712', mark: '#6a5320',
      ux: '#f0916f', woo: '#c3a1ee', content: '#6fd0b5',
    },
  },
  overlay: { glint: '#fffaf0', scrim: 'rgb(28 23 18 / .66)' },
  typography: {
    en: {
      display: { family: 'Iowan Old Style', faces: [], fallback: ["'Palatino Linotype'", "'Book Antiqua'", 'Georgia', 'serif'] },
      body: ink.typography.en.body,
      leading: 1.7,
      preload: ['plex-latin-400'],
    },
    fa: ink.typography.fa,
  },
  fontSize: { ...ink.fontSize, display: 'clamp(2.4rem, 7vw, 4rem)', h2: 'clamp(1.8rem, 4.6vw, 2.6rem)' },
  radius: { xxs: '2px', xs: '3px', sm: '4px', md: '6px', lg: '8px', xl: '10px', pill: '999px' },
  shadow: {
    dialog: '0 24px 60px -24px rgb(42 33 24 / .4)',
    drawerStart: '-24px 0 60px -28px rgb(42 33 24 / .4)',
    drawerEnd: '24px 0 60px -28px rgb(42 33 24 / .4)',
    lift: '0 10px 24px -16px color-mix(in srgb, var(--accent) 60%, transparent)',
    dot: '0 0 8px -3px var(--accent)',
  },
  motion: { scale: 0.85, ease: 'cubic-bezier(.3, .6, .2, 1)', duration: ink.motion.duration },
  layout: { ...ink.layout, wrapMax: 980, sectionY: 72, sectionYSmall: 52, cardGap: 24, density: 'comfortable' },
  brand: { faviconPath: 'M10 22V10l6 8 6-8v12' },
};
export default sand;
