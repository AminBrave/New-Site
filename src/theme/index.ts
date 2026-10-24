/**
 * THE one switch. Pick the active identity here, or at build time:  PORTFOLIO_THEME=sand npm run build
 * To add an identity: copy presets/ink.ts, change values, import it below, add it to `presets`.
 */
import type { Theme } from './schema';
import ink from './presets/ink';
import sand from './presets/sand';

export const presets = { ink, sand } satisfies Record<string, Theme>;
export type PresetName = keyof typeof presets;

export const DEFAULT_PRESET: PresetName = 'ink';

const requested = typeof process !== 'undefined' ? process.env?.PORTFOLIO_THEME : undefined;
export const activePresetName: PresetName = requested && requested in presets ? (requested as PresetName) : DEFAULT_PRESET;
export const theme: Theme = presets[activePresetName];
