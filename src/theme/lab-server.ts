/**
 * The dev-only "save preset" endpoint, written as a plain function so it can be tested without a server.
 * The page that calls it is served by `astro dev --host`, which is reachable from the local network, and this
 * endpoint writes source files, so it refuses anything that is not a same-origin request from this machine.
 */
import fs from 'node:fs';
import path from 'node:path';
import { isBuiltin } from './builtin';
import { parseIncomingTheme } from './lab-guard';
import { syncRegistry } from './registry-sync';
import { serializePreset } from './serialize';
import { themeProblems } from './validate';

export const SAVE_PATH = '/__theme-lab/save';
export const MAX_BODY = 64 * 1024;

export interface SaveRequest {
  method: string;
  headers: Record<string, string | string[] | undefined>;
  remoteAddress: string | undefined;
  body: string;
}
export interface SaveResponse { status: number; json: { ok: boolean; name?: string; file?: string; error?: string; problems?: string[] } }

const LOOPBACK = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1']);
const LOCAL_HOST = /^(localhost|127\.0\.0\.1|\[::1\])(:\d{1,5})?$/;
const header = (h: SaveRequest['headers'], k: string): string => {
  const v = h[k];
  return (Array.isArray(v) ? v[0] : v) ?? '';
};
const fail = (status: number, error: string, problems?: string[]): SaveResponse => ({ status, json: { ok: false, error, ...(problems ? { problems } : {}) } });

export function handleSave(req: SaveRequest, presetsDir: string, today = new Date().toISOString().slice(0, 10)): SaveResponse {
  if (req.method !== 'POST') return fail(405, 'Use POST.');
  if (!req.remoteAddress || !LOOPBACK.has(req.remoteAddress)) return fail(403, 'Saving works only from the machine running the dev server. Use "Copy code" instead.');
  const host = header(req.headers, 'host');
  if (!LOCAL_HOST.test(host)) return fail(403, 'Open the site as localhost to save presets.');
  const origin = header(req.headers, 'origin');
  let originHost = '';
  try {
    originHost = new URL(origin).host;
  } catch {
    /* missing or malformed origin */
  }
  if (!originHost || originHost !== host) return fail(403, 'Cross-origin request refused.');
  if (header(req.headers, 'x-theme-lab') !== '1') return fail(403, 'Missing X-Theme-Lab header.');
  if (!header(req.headers, 'content-type').startsWith('application/json')) return fail(415, 'Send JSON.');
  if (req.body.length > MAX_BODY) return fail(413, 'Payload too large.');

  let payload: unknown;
  try {
    payload = JSON.parse(req.body);
  } catch {
    return fail(400, 'Body is not valid JSON.');
  }
  const { mode, theme: incoming } = (payload ?? {}) as { mode?: unknown; theme?: unknown };
  if (mode !== 'create' && mode !== 'update') return fail(400, 'mode must be "create" or "update".');

  const parsed = parseIncomingTheme(incoming);
  if (!parsed.ok) return fail(400, 'The preset has invalid values.', parsed.problems);
  const { theme } = parsed;
  if (isBuiltin(theme.name)) return fail(403, `"${theme.name}" is built in and read-only. Save under a new name.`);

  const file = path.join(presetsDir, `${theme.name}.ts`);
  const exists = fs.existsSync(file);
  if (mode === 'create' && exists) return fail(409, `A preset named "${theme.name}" already exists.`);
  if (mode === 'update' && !exists) return fail(404, `There is no preset named "${theme.name}" to update.`);

  const problems = themeProblems(theme);
  if (problems.length) return fail(422, 'The preset fails the accessibility checks.', problems);

  // Write next to the target and rename, so a crash never leaves half a preset behind.
  const tmp = path.join(presetsDir, `.${theme.name}.ts.tmp`);
  fs.writeFileSync(tmp, serializePreset(theme, today));
  fs.renameSync(tmp, file);
  syncRegistry(presetsDir);
  return { status: 200, json: { ok: true, name: theme.name, file: `src/theme/presets/${theme.name}.ts` } };
}
