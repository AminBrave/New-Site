/** Presets that ship with the site. The Theme lab never overwrites these; edits are saved as a new preset. */
export const builtinPresets = ['ink', 'sand'] as const;
export const isBuiltin = (name: string): boolean => (builtinPresets as readonly string[]).includes(name);
