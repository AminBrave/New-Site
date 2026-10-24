/** Names of the self-hosted font files. Keep in sync with font-files.ts (the type there enforces it). */
export const fontKeys = [
  'bricolage-latin-wght',
  'plex-latin-400', 'plex-latin-500',
  'vazir-arabic-400', 'vazir-arabic-500', 'vazir-arabic-700',
  'vazir-latin-400', 'vazir-latin-500', 'vazir-latin-700',
] as const;
export type FontFileKey = (typeof fontKeys)[number];
