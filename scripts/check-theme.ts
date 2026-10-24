/** `npm run check:theme`: contrast and font-key checks for every preset, plus registry sync, without building the site. */
import { fileURLToPath } from 'node:url';
import { presets } from '../src/theme';
import { syncRegistry } from '../src/theme/registry-sync';
import { themeProblems } from '../src/theme/validate';

let failed = 0;
for (const [key, theme] of Object.entries(presets)) {
  const problems = themeProblems(theme);
  if (theme.name !== key) problems.push(`name "${theme.name}" must match its file name "${key}"`);
  console.log(`${problems.length ? 'FAIL' : 'ok  '} ${theme.name}`);
  problems.forEach((p) => console.log(`       ${p}`));
  failed += problems.length;
}
if (syncRegistry(fileURLToPath(new URL('../src/theme/presets/', import.meta.url)), true)) {
  console.log('FAIL presets/_registry.ts is out of date: run `npm run presets:sync`');
  failed += 1;
}
process.exit(failed ? 1 : 0);
