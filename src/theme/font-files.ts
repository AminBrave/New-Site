/**
 * Registry of self-hosted font files. Presets refer to a file by key; Vite turns each import into a hashed URL.
 * To add a font: drop the .woff2 in src/assets/fonts, import it here, and add its key.
 */
import type { FontFileKey } from './font-keys';
import bricolage from '../assets/fonts/bricolage-grotesque-latin-wght-normal.woff2?url';
import plex400 from '../assets/fonts/ibm-plex-sans-latin-400-normal.woff2?url';
import plex500 from '../assets/fonts/ibm-plex-sans-latin-500-normal.woff2?url';
import vazirArabic400 from '../assets/fonts/vazirmatn-arabic-400-normal.woff2?url';
import vazirArabic500 from '../assets/fonts/vazirmatn-arabic-500-normal.woff2?url';
import vazirArabic700 from '../assets/fonts/vazirmatn-arabic-700-normal.woff2?url';
import vazirLatin400 from '../assets/fonts/vazirmatn-latin-400-normal.woff2?url';
import vazirLatin500 from '../assets/fonts/vazirmatn-latin-500-normal.woff2?url';
import vazirLatin700 from '../assets/fonts/vazirmatn-latin-700-normal.woff2?url';

export const fontFiles: Record<FontFileKey, string> = {
  'bricolage-latin-wght': bricolage,
  'plex-latin-400': plex400,
  'plex-latin-500': plex500,
  'vazir-arabic-400': vazirArabic400,
  'vazir-arabic-500': vazirArabic500,
  'vazir-arabic-700': vazirArabic700,
  'vazir-latin-400': vazirLatin400,
  'vazir-latin-500': vazirLatin500,
  'vazir-latin-700': vazirLatin700,
};
