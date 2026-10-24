/** `npm test`: the Theme lab's pure logic (color math, serializer, input guard, save endpoint, registry). */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { autoFix, hexToOklch, oklchToHex, pairsFor } from '../src/theme/color';
import { handleSave, type SaveRequest } from '../src/theme/lab-server';
import { parseIncomingTheme } from '../src/theme/lab-guard';
import ink from '../src/theme/presets/ink';
import sand from '../src/theme/presets/sand';
import { presetNames, renderRegistry, syncRegistry } from '../src/theme/registry-sync';
import type { Theme } from '../src/theme/schema';
import { serializePreset } from '../src/theme/serialize';

const presetsDir = fileURLToPath(new URL('../src/theme/presets/', import.meta.url));
const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v)) as T;
const draft = (name = 'lab-test'): Theme => ({ ...clone(ink), name, label: 'Lab test' });

test('oklch round-trips hex values', () => {
  for (const hex of ['#2447f5', '#f4f6f8', '#0b8a7b', '#ffffff', '#000000', '#a93d1c']) {
    const back = oklchToHex(hexToOklch(hex));
    const diff = [1, 3, 5].map((i) => Math.abs(parseInt(hex.slice(i, i + 2), 16) - parseInt(back.slice(i, i + 2), 16)));
    assert.ok(Math.max(...diff) <= 1, `${hex} -> ${back}`);
  }
});

test('autoFix moves a failing color to a passing one and leaves passing colors alone', () => {
  const colors = clone(ink.colors.light);
  assert.equal(autoFix(colors, 'ink'), null);
  colors.muted = '#b0b8c0'; // too pale on the paper
  assert.ok(pairsFor(colors, 'muted').some((p) => !p.pass));
  const fixed = autoFix(colors, 'muted');
  assert.ok(fixed);
  assert.ok(pairsFor({ ...colors, muted: fixed }, 'muted').every((p) => p.pass));
});

test('serializer output reads back as the same theme', async () => {
  for (const preset of [ink, sand]) {
    const file = path.join(presetsDir, `_roundtrip-${preset.name}.ts`);
    fs.writeFileSync(file, serializePreset(preset, '2026-01-01'));
    try {
      const mod = (await import(pathToFileURL(file).href)) as { default: Theme };
      assert.deepEqual(mod.default, preset);
    } finally {
      fs.rmSync(file, { force: true });
    }
  }
});

test('serializer escapes quotes and backslashes in strings', () => {
  const t = draft();
  t.fontSize.base = "1rem /* it's */";
  const out = serializePreset(t, '2026-01-01');
  assert.ok(out.includes("it\\'s"));
});

test('guard accepts a valid theme and rebuilds it without extra keys', () => {
  const res = parseIncomingTheme(draft());
  assert.ok(res.ok);
});

test('guard rejects unknown keys, bad colors, css injection and bad names', () => {
  const cases: Array<[string, (t: Record<string, any>) => void]> = [
    ['unknown key', (t) => { t.extra = 1; }],
    ['bad hex', (t) => { t.colors.light.accent = 'red'; }],
    ['css break-out', (t) => { t.radius.md = '1px}body{display:none'; }],
    ['url()', (t) => { t.shadow.dialog = 'url(http://x)'; }],
    ['font file', (t) => { t.typography.en.preload = ['nope']; }],
    ['family', (t) => { t.typography.en.display.family = "x'};alert(1);//"; }],
    ['slug', (t) => { t.name = '../evil'; }],
    ['label comment end', (t) => { t.label = 'x */ import fs'; }],
    ['number range', (t) => { t.motion.scale = 999; }],
    ['density', (t) => { t.layout.density = 'tight'; }],
    ['missing key', (t) => { delete t.layout.gutter; }],
  ];
  for (const [what, mutate] of cases) {
    const t = clone(draft()) as Record<string, any>;
    mutate(t);
    assert.equal(parseIncomingTheme(t).ok, false, what);
  }
  assert.equal(parseIncomingTheme(JSON.parse('{"__proto__":{"x":1}}')).ok, false);
  assert.equal(parseIncomingTheme(null).ok, false);
});

function request(over: Partial<SaveRequest> & { theme?: Theme; mode?: string } = {}): SaveRequest {
  return {
    method: 'POST',
    remoteAddress: '127.0.0.1',
    headers: { host: 'localhost:4321', origin: 'http://localhost:4321', 'x-theme-lab': '1', 'content-type': 'application/json' },
    body: JSON.stringify({ mode: over.mode ?? 'create', theme: over.theme ?? draft() }),
    ...over,
  };
}
const withDir = (fn: (dir: string) => void): void => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'presets-'));
  fs.copyFileSync(path.join(presetsDir, 'ink.ts'), path.join(dir, 'ink.ts'));
  fs.copyFileSync(path.join(presetsDir, 'sand.ts'), path.join(dir, 'sand.ts'));
  try {
    fn(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

test('save endpoint creates, updates, and refuses duplicates and built-ins', () => {
  withDir((dir) => {
    assert.equal(handleSave(request(), dir, '2026-01-01').status, 200);
    assert.ok(fs.existsSync(path.join(dir, 'lab-test.ts')));
    assert.ok(fs.readFileSync(path.join(dir, '_registry.ts'), 'utf8').includes("'lab-test': p_lab_test"));
    assert.equal(handleSave(request(), dir).status, 409);
    assert.equal(handleSave(request({ mode: 'update' }), dir).status, 200);
    assert.equal(handleSave(request({ mode: 'update', theme: draft('nothing') }), dir).status, 404);
    assert.equal(handleSave(request({ theme: draft('ink') }), dir).status, 403);
    assert.equal(handleSave(request({ mode: 'update', theme: draft('sand') }), dir).status, 403);
  });
});

test('save endpoint refuses remote, cross-origin, and header-less requests', () => {
  withDir((dir) => {
    assert.equal(handleSave(request({ remoteAddress: '192.168.1.20' }), dir).status, 403);
    assert.equal(handleSave(request({ headers: { host: 'evil.test', origin: 'http://evil.test', 'x-theme-lab': '1', 'content-type': 'application/json' } }), dir).status, 403);
    assert.equal(handleSave(request({ headers: { host: 'localhost:4321', origin: 'http://evil.test', 'x-theme-lab': '1', 'content-type': 'application/json' } }), dir).status, 403);
    assert.equal(handleSave(request({ headers: { host: 'localhost:4321', 'x-theme-lab': '1', 'content-type': 'application/json' } }), dir).status, 403);
    assert.equal(handleSave(request({ headers: { host: 'localhost:4321', origin: 'http://localhost:4321', 'content-type': 'application/json' } }), dir).status, 403);
    assert.equal(handleSave(request({ method: 'GET' }), dir).status, 405);
    assert.equal(fs.readdirSync(dir).some((f) => f.includes('lab-test')), false);
  });
});

test('save endpoint refuses a preset that fails contrast', () => {
  withDir((dir) => {
    const t = draft();
    t.colors.light.ink = '#f4f6f8';
    const res = handleSave(request({ theme: t }), dir);
    assert.equal(res.status, 422);
    assert.ok(res.json.problems?.length);
    assert.equal(fs.existsSync(path.join(dir, 'lab-test.ts')), false);
  });
});

test('registry lists built-ins first and the committed registry is in sync', () => {
  assert.deepEqual(presetNames(presetsDir).slice(0, 2), ['ink', 'sand']);
  assert.ok(renderRegistry(['ink', 'sand', 'a-b']).includes("'a-b': p_a_b"));
  assert.equal(syncRegistry(presetsDir, true), false, 'run npm run presets:sync');
});
