/** `npm run presets:sync`: regenerate src/theme/presets/_registry.ts from the files in that folder. `--check` only reports. */
import { fileURLToPath } from 'node:url';
import { syncRegistry } from '../src/theme/registry-sync';

const dir = fileURLToPath(new URL('../src/theme/presets/', import.meta.url));
const check = process.argv.includes('--check');
const changed = syncRegistry(dir, check);
console.log(changed ? (check ? 'Registry is out of date: run npm run presets:sync' : 'Registry updated') : 'Registry is up to date');
process.exit(check && changed ? 1 : 0);
