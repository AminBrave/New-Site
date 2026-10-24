/**
 * THE one switch. Pick the active identity here, or at build time:  PORTFOLIO_THEME=sand npm run build
 * To add an identity: save one from the dev-only Theme lab, or copy presets/ink.ts, change values and run
 * `npm run presets:sync` (it regenerates presets/_registry.ts).
 */
import { presets } from './presets/_registry';

export { presets };
export { builtinPresets, isBuiltin } from './builtin';
export type PresetName = keyof typeof presets;

export const DEFAULT_PRESET: PresetName = 'ink';

const requested = typeof process !== 'undefined' ? process.env?.PORTFOLIO_THEME : undefined;
export const activePresetName: PresetName = requested && requested in presets ? (requested as PresetName) : DEFAULT_PRESET;
export const theme = presets[activePresetName];
