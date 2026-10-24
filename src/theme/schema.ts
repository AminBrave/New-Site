/**
 * The theme contract. Every preset in ./presets must satisfy `Theme`, so a missing token is a type error,
 * and the generator in ./css.ts turns the whole object into CSS custom properties.
 * Colors are written as hex so the contrast check can read them.
 */
import type { FontFileKey } from './font-keys';

export type Hex = `#${string}`;

/** Colors that change between light and dark mode. */
export interface ModeColors {
  paper: Hex; // page background
  surface: Hex; // cards, dialogs, inputs
  ink: Hex; // primary text
  muted: Hex; // secondary text
  line: Hex; // borders and dividers
  accent: Hex; // brand color: links, buttons, focus ring
  onAccent: Hex; // text on top of `accent`
  mark: Hex; // highlighter behind hero words
  ux: Hex; // discipline colors (UI/UX, WooCommerce, content)
  woo: Hex;
  content: Hex;
}

export interface FontFace {
  file: FontFileKey;
  /** CSS font-weight, or a range for variable fonts, e.g. '200 800'. */
  weight: string;
  /** CSS unicode-range for this file's subset. */
  range: string;
}
export interface FontFamily {
  family: string;
  /** Font files to self-host. Empty for system fonts. */
  faces: FontFace[];
  /** Generic fallbacks appended to the stack. */
  fallback: string[];
}
/** Fonts for one writing system. English and Persian pages each get their own set. */
export interface ScriptTypography {
  display: FontFamily;
  body: FontFamily;
  /** Body line-height. Persian needs more room than Latin. */
  leading: number;
  /** Font files to preload for first paint. */
  preload: FontFileKey[];
}

export interface Theme {
  /** Used in docs, the dev switcher and `data-preset`. */
  name: string;
  label: string;
  colors: { light: ModeColors; dark: ModeColors };
  /** Overlay colors. `glint` is the light shine drawn over colored tiles and gradients. */
  overlay: { glint: Hex; scrim: string };
  typography: { en: ScriptTypography; fa: ScriptTypography };
  /** Font sizes (rem). Names are sizes, not roles, so components pick what fits. */
  fontSize: {
    '2xs': string; xs: string; sm: string; md: string; base: string; lead: string; lg: string; xl: string; '2xl': string; '3xl': string;
    /** Fluid headings: clamp(min, preferred, max). */
    display: string; h2: string; h3: string;
  };
  radius: { xxs: string; xs: string; sm: string; md: string; lg: string; xl: string; pill: string };
  shadow: {
    dialog: string;
    /** The menu drawer slides in from the start edge; the shadow falls toward the page. */
    drawerStart: string;
    drawerEnd: string;
    /** Card hover lift and the active timeline dot. These follow --accent. */
    lift: string;
    dot: string;
  };
  motion: {
    /** Multiplies every duration. 1 = as designed, 0.5 = twice as fast. */
    scale: number;
    ease: string;
    /** Base durations in seconds, before `scale`. */
    duration: { fast: number; base: number; mid: number; slow: number; slower: number; slowest: number };
  };
  layout: {
    wrapMax: number; // px, content width
    gutter: number; // px, page side padding
    gutterWide: number; // px, side padding at 1180px and up
    gutterEnd: number; // px, extra room at the end edge for the section dots
    sectionY: number; // px, vertical padding of a section
    sectionYSmall: number; // px, same on phones
    cardGap: number; // px, gap between work cards
    dialogMax: number; // px, dialog width
    /** compact scales vertical rhythm (section padding and card gap) by 0.85. */
    density: 'comfortable' | 'compact';
  };
  brand: {
    /** Favicon: a rounded square in `accent` with the monogram path in `onAccent`. */
    faviconPath: string;
  };
}
