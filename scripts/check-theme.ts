/** `npm run check:theme`: contrast and font-key checks for every preset, without building the site. */
import { presets } from '../src/theme';
import { themeProblems } from '../src/theme/validate';

let failed = 0;
for (const theme of Object.values(presets)) {
  const problems = themeProblems(theme);
  console.log(`${problems.length ? 'FAIL' : 'ok  '} ${theme.name}`);
  problems.forEach((p) => console.log(`       ${p}`));
  failed += problems.length;
}
process.exit(failed ? 1 : 0);
