/**
 * Site structure: which sections exist and in what order, which layout variants are active, and which optional
 * features are on. Look and feel (colors, type, radius, motion) lives in src/theme; text lives in src/data.
 */
import type { SectionId } from '../data/types';

export type HeroVariant = 'split' | 'centered';
export type WorkVariant = 'grid' | 'list';

export interface SiteConfig {
  /** Order of sections on the page. Remove an id to hide that section; nav, dots and dialogs follow. 'top' must stay first. */
  sections: SectionId[];
  /** Layout variants. They only switch a `data-*` attribute on <html>; the CSS lives in src/styles/variants. */
  variants: { hero: HeroVariant; work: WorkVariant };
  features: {
    progressBar: boolean; // reading progress under the header
    sectionDots: boolean; // vertical dots on the page edge
    themeToggle: boolean; // light/dark switch in the menu
  };
}

export const site: SiteConfig = {
  sections: ['top', 'skills', 'process', 'work', 'resume', 'contact'],
  variants: { hero: 'split', work: 'grid' },
  features: { progressBar: true, sectionDots: true, themeToggle: true },
};

if (site.sections[0] !== 'top') throw new Error("site.config: the first section must be 'top' (the header logo links to it).");
if (new Set(site.sections).size !== site.sections.length) throw new Error('site.config: a section id is listed twice.');
