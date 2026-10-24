/**
 * <theme-lab>: the dev-only panel for editing the active theme live and saving it as a preset file.
 * It edits a draft copy of a preset, renders it through the same generator the build uses (vars.ts), checks
 * contrast on every change, and saves through the dev server's /__theme-lab/save endpoint.
 */
import { autoFix, hexToOklch, isHex, oklchToHex, pairsFor, type PairResult } from '../../theme/color';
import { checkTheme, contrast } from '../../theme/contrast';
import { MAX_SLUG, SLUG, isValidLabel, parseIncomingTheme } from '../../theme/lab-guard';
import type { FontFamily, Hex, ModeColors, Theme } from '../../theme/schema';
import { serializePreset } from '../../theme/serialize';
import { themeRules, type Lang } from '../../theme/vars';
import { canon, clone, getAt, h, round, setAt } from './dom';
import { labCss } from './styles';

interface LabConfig { presets: Theme[]; active: string; builtin: string[]; lang: Lang }
type TabId = 'colors' | 'type' | 'shape' | 'motion' | 'layout';

const TABS: Array<[TabId, string]> = [['colors', 'Colors'], ['type', 'Type'], ['shape', 'Shape'], ['motion', 'Motion'], ['layout', 'Layout']];
const COLOR_ROWS: Array<[keyof ModeColors, string, string]> = [
  ['paper', 'Page background', ''], ['surface', 'Cards and dialogs', ''], ['ink', 'Text', ''], ['muted', 'Secondary text', ''],
  ['line', 'Borders', ''], ['accent', 'Brand color', 'Links, buttons, focus ring'], ['onAccent', 'Text on brand color', ''],
  ['mark', 'Highlighter', ''], ['ux', 'UI/UX color', ''], ['woo', 'WooCommerce color', ''], ['content', 'Content color', ''],
];
const EASINGS: Array<[string, string]> = [
  ['Smooth', 'cubic-bezier(.3, .6, .2, 1)'], ['Standard', 'cubic-bezier(.2, .7, .2, 1)'], ['Snappy', 'cubic-bezier(.4, 0, .2, 1)'],
  ['Ease out', 'ease-out'], ['Linear', 'linear'],
];
const store = {
  get: (k: string): string | null => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string | null): void => { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch { /* storage blocked */ } },
};
const slugify = (label: string): string => {
  const s = label.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, MAX_SLUG).replace(/-+$/, '');
  return /^[a-z]/.test(s) ? s : s ? `p-${s}`.slice(0, MAX_SLUG) : '';
};
const cssOk = (prop: string, v: string): boolean =>
  v.length > 0 && v.length <= 400 && !/[;{}<>\\]/.test(v) && !/url\s*\(|@import|\/\*/i.test(v) && CSS.supports(prop, v);

class ThemeLabElement extends HTMLElement {
  private cfg!: LabConfig;
  private base!: Theme;
  private baseKey = '';
  private draft!: Theme;
  private hist: string[] = [];
  private at = 0;
  private lastKey = '';
  private lastAt = 0;
  private tab: TabId = 'colors';
  private syncs: Array<() => void> = [];
  private comparing = false;
  private ids = 0;
  private fonts: Record<Lang, Record<'display' | 'body', FontFamily[]>> = { en: { display: [], body: [] }, fa: { display: [], body: [] } };
  private liveStyle!: HTMLStyleElement;
  private ui = {} as {
    pill: HTMLButtonElement; panel: HTMLElement; presets: HTMLSelectElement; badge: HTMLElement; tabs: HTMLElement; body: HTMLElement;
    status: HTMLElement; announce: HTMLElement; undo: HTMLButtonElement; redo: HTMLButtonElement; reset: HTMLButtonElement; save: HTMLElement; saveBtn: HTMLButtonElement;
  };

  connectedCallback(): void {
    if (this.shadowRoot) return;
    const raw = document.getElementById('theme-lab-data')?.textContent;
    if (!raw) return;
    this.cfg = JSON.parse(raw) as LabConfig;
    this.collectFonts();
    this.liveStyle = (document.getElementById('theme-lab-live') as HTMLStyleElement | null) ?? h('style', { id: 'theme-lab-live' });
    if (!this.liveStyle.isConnected) document.head.append(this.liveStyle);

    const stored = store.get('lab-preset');
    this.setBase(this.cfg.presets.find((p) => p.name === stored) ?? this.cfg.presets.find((p) => p.name === this.cfg.active) ?? this.cfg.presets[0]!);
    this.restoreDraft();
    this.setAttribute('data-dock', store.get('lab-dock') === 'end' ? 'end' : 'start');

    const root = this.attachShadow({ mode: 'open' });
    root.append(h('style', {}, labCss), this.build());
    this.apply();
    this.renderTab();
    this.refresh();
    new MutationObserver(() => { if (this.tab === 'colors') this.renderTab(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  // ---- state ---------------------------------------------------------------------------------------------------

  private get mode(): 'light' | 'dark' { return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
  private get dirty(): boolean { return canon(this.draft) !== this.baseKey; }
  private get isBuiltin(): boolean { return this.cfg.builtin.includes(this.base.name); }
  private uid(): string { return `l${++this.ids}`; }

  private collectFonts(): void {
    for (const lang of ['en', 'fa'] as const) {
      for (const slot of ['display', 'body'] as const) {
        const byName = new Map<string, FontFamily>();
        for (const p of this.cfg.presets) {
          const f = p.typography[lang][slot];
          const have = byName.get(f.family);
          if (!have || f.faces.length > have.faces.length) byName.set(f.family, clone(f));
        }
        this.fonts[lang][slot] = [...byName.values()];
      }
    }
  }

  private setBase(theme: Theme): void {
    this.base = clone(theme);
    this.baseKey = canon(this.base);
    this.draft = clone(this.base);
    this.hist = [this.baseKey];
    this.at = 0;
    store.set('lab-preset', theme.name);
  }

  private restoreDraft(): void {
    const raw = store.get('lab-draft');
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as { base?: string; theme?: unknown };
      const parsed = saved.base === this.base.name ? parseIncomingTheme(saved.theme) : null;
      if (parsed?.ok) {
        this.draft = { ...parsed.theme, name: this.base.name, label: this.base.label };
        this.hist = [this.baseKey, canon(this.draft)];
        this.at = 1;
      } else store.set('lab-draft', null);
    } catch { store.set('lab-draft', null); }
  }

  private commit(key = ''): void {
    const snap = canon(this.draft);
    if (snap === this.hist[this.at]) return;
    const now = Date.now();
    if (key && key === this.lastKey && now - this.lastAt < 700 && this.at > 0 && this.at === this.hist.length - 1) this.hist[this.at] = snap;
    else {
      this.hist.splice(this.at + 1);
      this.hist.push(snap);
      if (this.hist.length > 100) this.hist.shift();
      this.at = this.hist.length - 1;
    }
    this.lastKey = key;
    this.lastAt = now;
  }

  private change(path: string, value: unknown, key = path): void {
    setAt(this.draft, path, value);
    this.commit(key);
    this.apply();
    this.refresh();
  }

  private travel(step: number): void {
    const next = this.at + step;
    if (next < 0 || next >= this.hist.length) return;
    this.at = next;
    this.draft = JSON.parse(this.hist[next]!) as Theme;
    this.apply();
    this.refresh();
    this.say(step < 0 ? 'Undone' : 'Redone');
  }

  /** Renders the draft on the page. A doubled attribute selector keeps it above every preset rule, whatever the source order. */
  private apply(): void {
    const root = document.documentElement;
    root.setAttribute('data-preset', this.base.name);
    if (this.dirty && !this.comparing) {
      const css = themeRules(this.draft, this.cfg.lang, '[data-lab-live][data-lab-live]').join('\n');
      this.liveStyle.textContent = css;
      root.setAttribute('data-lab-live', '');
      store.set('lab-live-css', css);
    } else {
      this.liveStyle.textContent = '';
      root.removeAttribute('data-lab-live');
      if (!this.comparing) store.set('lab-live-css', null);
    }
    if (!this.comparing) store.set('lab-draft', this.dirty ? JSON.stringify({ base: this.base.name, theme: this.draft }) : null);
  }

  private say(msg: string): void {
    this.ui.announce.textContent = '';
    setTimeout(() => { this.ui.announce.textContent = msg; }, 30);
  }

  /** Re-reads the draft into every visible control and the footer. */
  private refresh(): void {
    this.syncs.forEach((fn) => fn());
    const fails = checkTheme(this.draft);
    const { ui } = this;
    ui.undo.disabled = this.at === 0;
    ui.redo.disabled = this.at >= this.hist.length - 1;
    ui.reset.disabled = !this.dirty;
    ui.badge.toggleAttribute('data-on', this.dirty);
    ui.badge.textContent = this.dirty ? 'Modified' : 'Saved';
    ui.pill.toggleAttribute('data-dirty', this.dirty);
    ui.status.toggleAttribute('data-bad', fails.length > 0);
    ui.status.textContent = fails.length ? `${fails.length} contrast ${fails.length === 1 ? 'check fails' : 'checks fail'} (both modes)` : 'All contrast checks pass';
    ui.saveBtn.textContent = this.dirty ? 'Save as preset…' : 'Save preset…';
    if (!ui.save.hidden) this.updateSaveForm();
  }

  // ---- shell ---------------------------------------------------------------------------------------------------

  private build(): HTMLElement {
    const ui = this.ui;
    ui.pill = h('button', { type: 'button', class: 'pill', 'aria-expanded': 'false', 'aria-controls': 'panel', onClick: () => this.toggle(true) }, h('span', { class: 'mark', 'aria-hidden': 'true' }), 'Theme lab');
    ui.presets = h('select', { id: 'preset', onChange: () => this.switchPreset(ui.presets.value) },
      ...this.cfg.presets.map((p) => h('option', { value: p.name, selected: p.name === this.base.name }, p.label)));
    ui.badge = h('span', { class: 'badge' }, 'Saved');
    ui.tabs = h('div', { class: 'tabs', role: 'tablist', 'aria-label': 'Variable groups', onKeydown: (e: KeyboardEvent) => this.tabKeys(e) },
      ...TABS.map(([id, label]) => h('button', { type: 'button', class: 'tab', role: 'tab', id: `tab-${id}`, 'aria-controls': 'body', 'aria-selected': String(id === this.tab), tabIndex: id === this.tab ? 0 : -1, onClick: () => this.selectTab(id) }, label)));
    ui.body = h('div', { class: 'body', id: 'body', role: 'tabpanel', 'aria-labelledby': `tab-${this.tab}`, tabIndex: 0 });
    ui.status = h('div', { class: 'status' });
    ui.announce = h('div', { class: 'sr', role: 'status', 'aria-live': 'polite' });
    ui.undo = h('button', { type: 'button', class: 'mini', onClick: () => this.travel(-1) }, 'Undo');
    ui.redo = h('button', { type: 'button', class: 'mini', onClick: () => this.travel(1) }, 'Redo');
    const compare = h('button', { type: 'button', class: 'mini', title: 'Hold to show the saved preset', 'aria-describedby': 'cmp-hint' }, 'Compare');
    const hold = (on: boolean): void => { this.comparing = on; this.apply(); compare.setAttribute('aria-pressed', String(on)); };
    compare.addEventListener('pointerdown', () => hold(true));
    for (const ev of ['pointerup', 'pointerleave', 'blur'] as const) compare.addEventListener(ev, () => this.comparing && hold(false));
    compare.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); hold(true); } });
    compare.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') hold(false); });
    ui.reset = h('button', { type: 'button', class: 'mini', onClick: () => { this.draft = clone(this.base); this.commit(); this.apply(); this.refresh(); this.say('Reset to the saved preset'); } }, 'Reset');
    ui.saveBtn = h('button', { type: 'button', class: 'mini primary grow', 'aria-expanded': 'false', onClick: () => this.toggleSave() }, 'Save preset…');
    ui.save = this.buildSave();

    ui.panel = h('section', { class: 'panel', id: 'panel', role: 'region', 'aria-label': 'Theme lab', hidden: true, onKeydown: (e: KeyboardEvent) => { if (e.key === 'Escape') this.toggle(false); } },
      h('div', { class: 'bar' }, h('h2', {}, 'Theme lab'),
        h('button', { type: 'button', class: 'icon', 'aria-label': 'Move panel to the other side', title: 'Move panel', onClick: () => { const end = this.getAttribute('data-dock') !== 'end'; this.setAttribute('data-dock', end ? 'end' : 'start'); store.set('lab-dock', end ? 'end' : 'start'); } }, '⇄'),
        h('button', { type: 'button', class: 'icon', 'aria-label': 'Close Theme lab', onClick: () => this.toggle(false) }, '✕')),
      h('div', { class: 'presetbar' }, h('label', { class: 'field', for: 'preset' }, h('span', {}, 'Preset'), ui.presets), ui.badge),
      ui.tabs, ui.body, ui.status,
      h('div', { class: 'foot' }, ui.undo, ui.redo, compare, ui.reset, ui.saveBtn, h('span', { id: 'cmp-hint', class: 'sr' }, 'Hold to show the saved preset without your changes')),
      ui.save, ui.announce);
    return h('div', { class: 'wrap' }, ui.panel, ui.pill);
  }

  private toggle(open: boolean): void {
    this.ui.panel.hidden = !open;
    this.ui.pill.hidden = open;
    this.ui.pill.setAttribute('aria-expanded', String(open));
    if (open) (this.ui.tabs.querySelector('[aria-selected=true]') as HTMLElement).focus();
    else this.ui.pill.focus();
  }

  private switchPreset(name: string): void {
    const next = this.cfg.presets.find((p) => p.name === name);
    if (!next) return;
    if (this.dirty && !confirm('Discard your unsaved changes and switch preset?')) { this.ui.presets.value = this.base.name; return; }
    this.setBase(next);
    this.apply();
    this.ui.save.hidden = true;
    this.renderTab();
    this.refresh();
    this.say(`Showing ${next.label}`);
  }

  private selectTab(id: TabId): void {
    this.tab = id;
    this.ui.tabs.querySelectorAll<HTMLElement>('[role=tab]').forEach((t) => {
      const on = t.id === `tab-${id}`;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    this.ui.body.setAttribute('aria-labelledby', `tab-${id}`);
    this.renderTab();
  }

  private tabKeys(e: KeyboardEvent): void {
    const i = TABS.findIndex(([id]) => id === this.tab);
    const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? TABS.length - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    const id = TABS[(next + TABS.length) % TABS.length]![0];
    this.selectTab(id);
    (this.ui.tabs.querySelector(`#tab-${id}`) as HTMLElement).focus();
  }

  private renderTab(): void {
    this.syncs = [];
    const body = this.ui.body;
    body.replaceChildren(...({ colors: () => this.colorsTab(), type: () => this.typeTab(), shape: () => this.shapeTab(), motion: () => this.motionTab(), layout: () => this.layoutTab() })[this.tab]());
    this.refresh();
  }

  // ---- controls ------------------------------------------------------------------------------------------------

  private skipIfFocused(el: HTMLElement): boolean { return this.shadowRoot?.activeElement === el; }

  private group(title: string, ...rows: Array<Node | null>): HTMLElement {
    return h('fieldset', { class: 'group' }, h('legend', {}, title), ...rows);
  }

  private range(o: { path: string; label: string; min: number; max: number; step: number; unit?: 'px' | 'rem' | 's' | '' }): HTMLElement {
    const id = this.uid();
    const unit = o.unit ?? '';
    const read = (): number => { const v = getAt(this.draft, o.path); return typeof v === 'number' ? v : parseFloat(String(v)); };
    // Radius and font sizes are CSS strings ("6px"); layout and motion values are plain numbers. Keep each as the schema has it.
    const store$ = (n: number): unknown => (typeof getAt(this.draft, o.path) === 'string' ? `${round(n)}${unit}` : round(n));
    const slider = h('input', { type: 'range', id, min: String(o.min), max: String(o.max), step: String(o.step) });
    const num = h('input', { type: 'number', min: String(o.min), max: String(o.max), step: String(o.step), 'aria-label': `${o.label}, exact value${unit ? ` in ${unit}` : ''}` });
    const set = (n: number): void => { if (Number.isFinite(n)) this.change(o.path, store$(Math.min(o.max, Math.max(o.min, n)))); };
    slider.addEventListener('input', () => set(slider.valueAsNumber));
    num.addEventListener('change', () => set(num.valueAsNumber));
    this.syncs.push(() => {
      const v = read();
      slider.setAttribute('aria-valuetext', `${round(v)}${unit}`);
      if (!this.skipIfFocused(slider)) slider.value = String(v);
      if (!this.skipIfFocused(num)) num.value = String(round(v));
    });
    return h('div', { class: 'row' }, h('div', { class: 'rowhead' }, h('label', { for: id }, o.label), unit ? h('span', { class: 'note' }, unit) : null), h('div', { class: 'range' }, slider, num));
  }

  private text(o: { path: string; label: string; prop: string; mono?: boolean }): HTMLElement {
    const id = this.uid();
    const errId = `${id}-e`;
    const input = h('input', { type: 'text', id, class: o.mono === false ? '' : 'mono', spellcheck: false, autocomplete: 'off', 'aria-describedby': errId });
    const err = h('p', { class: 'err', id: errId, hidden: true }, `Not a valid ${o.prop} value.`);
    input.addEventListener('input', () => {
      const ok = cssOk(o.prop, input.value.trim());
      input.setAttribute('aria-invalid', String(!ok));
      err.hidden = ok;
      if (ok) this.change(o.path, input.value.trim());
    });
    input.addEventListener('blur', () => { input.removeAttribute('aria-invalid'); err.hidden = true; input.value = String(getAt(this.draft, o.path)); });
    this.syncs.push(() => { if (!this.skipIfFocused(input)) input.value = String(getAt(this.draft, o.path)); });
    return h('div', { class: 'row' }, h('label', { for: id }, o.label), input, err);
  }

  private segmented(o: { label: string; options: Array<[string, string]>; get: () => string; set: (v: string) => void }): HTMLElement {
    const name = this.uid();
    const inputs = o.options.map(([value, label]) => ({ value, el: h('input', { type: 'radio', name, value, onChange: () => o.set(value) }), label }));
    this.syncs.push(() => inputs.forEach((i) => { i.el.checked = i.value === o.get(); }));
    return h('fieldset', { class: 'seg' }, h('legend', {}, o.label), ...inputs.map((i) => h('label', {}, i.el, h('span', {}, i.label))));
  }

  private colorRow(o: { path: string; label: string; hint?: string; pairs: () => PairResult[]; fix?: () => Hex | null; tune?: boolean }): HTMLElement {
    const id = this.uid();
    const chip = h('span', { class: 'chip', id: `${id}-c` });
    const picker = h('input', { type: 'color', 'aria-label': `${o.label}, color picker` });
    const hex = h('input', { type: 'text', id, class: 'hex', maxLength: 7, spellcheck: false, autocomplete: 'off', 'aria-describedby': `${id}-c` });
    const fixBtn = h('button', { type: 'button', class: 'mini', hidden: true, title: 'Adjust lightness until every contrast rule passes' }, 'Fix');
    const tuneBtn = h('button', { type: 'button', class: 'mini', 'aria-expanded': 'false', 'aria-controls': `${id}-t` }, 'Tune');
    const sliders: Array<{ k: 'l' | 'c' | 'h'; el: HTMLInputElement; short: string }> = (['l', 'c', 'h'] as const).map((k) => {
      const spec = { l: [0, 1, 0.005, 'Lightness'], c: [0, 0.37, 0.002, 'Chroma'], h: [0, 360, 1, 'Hue'] }[k] as [number, number, number, string];
      const el = h('input', { type: 'range', min: String(spec[0]), max: String(spec[1]), step: String(spec[2]), 'aria-label': `${o.label}: ${spec[3]}` });
      el.addEventListener('input', () => {
        const [l, c, hue] = sliders.map((s) => s.el.valueAsNumber) as [number, number, number];
        this.change(o.path, oklchToHex({ l, c, h: hue }));
      });
      return { k, el, short: spec[3].slice(0, 1) };
    });
    const tune = h('div', { class: 'tune', id: `${id}-t`, hidden: true }, ...sliders.map((s) => h('div', { class: 'range' }, h('span', { class: 'note', 'aria-hidden': 'true' }, s.short), s.el, h('span', { class: 'note', 'aria-hidden': 'true' }))));
    tuneBtn.addEventListener('click', () => { tune.hidden = !tune.hidden; tuneBtn.setAttribute('aria-expanded', String(!tune.hidden)); });
    picker.addEventListener('input', () => this.change(o.path, picker.value));
    hex.addEventListener('input', () => {
      const v = `#${hex.value.replace('#', '').toLowerCase()}`;
      const ok = isHex(v);
      hex.setAttribute('aria-invalid', String(!ok));
      if (ok) this.change(o.path, v);
    });
    hex.addEventListener('blur', () => { hex.removeAttribute('aria-invalid'); hex.value = String(getAt(this.draft, o.path)); });
    fixBtn.addEventListener('click', () => { const f = o.fix?.(); if (f) { this.change(o.path, f, `${o.path}-fix`); this.say(`${o.label} adjusted to ${f}`); } });
    this.syncs.push(() => {
      const value = String(getAt(this.draft, o.path)) as Hex;
      if (!this.skipIfFocused(hex)) hex.value = value;
      picker.value = isHex(value) ? value : '#000000';
      const lch = hexToOklch(value);
      sliders.forEach((s) => { if (!this.skipIfFocused(s.el)) s.el.value = String(lch[s.k]); });
      const pairs = o.pairs();
      if (!pairs.length) { chip.hidden = true; fixBtn.hidden = true; return; }
      const worst = pairs.reduce((a, p) => (p.ratio / p.min < a.ratio / a.min ? p : a));
      chip.hidden = false;
      chip.dataset.pass = String(worst.pass);
      chip.textContent = `${worst.pass ? 'Pass' : 'Fail'} ${worst.ratio}:1`;
      chip.title = pairs.map((p) => `${p.role === 'fg' ? `this on ${p.other}` : `${p.other} on this`}: ${p.ratio}:1, needs ${p.min}:1 (${p.why})`).join('\n');
      fixBtn.hidden = worst.pass || !o.fix || o.fix() === null;
    });
    return h('div', { class: 'row' }, h('div', { class: 'rowhead' }, h('label', { for: id }, o.label), chip),
      o.hint ? h('p', { class: 'note' }, o.hint) : null,
      h('div', { class: 'inputs' }, picker, hex, fixBtn, o.tune === false ? null : tuneBtn), o.tune === false ? null : tune);
  }

  // ---- tabs ----------------------------------------------------------------------------------------------------

  private colorsTab(): Node[] {
    const mode = this.mode;
    const colors = (): ModeColors => this.draft.colors[mode];
    const problems = h('details', { class: 'problems' });
    const sum = h('summary', {});
    const list = h('ul', {});
    problems.append(sum, list);
    this.syncs.push(() => {
      const fails = checkTheme(this.draft);
      sum.textContent = fails.length ? `${fails.length} failing contrast ${fails.length === 1 ? 'check' : 'checks'}` : 'Contrast checks: all pass';
      list.replaceChildren(...fails.map((f) => h('li', {}, `${f.mode}: ${f.pair} is ${f.ratio}:1, needs ${f.min}:1`)));
      problems.toggleAttribute('data-ok', !fails.length);
      list.hidden = !fails.length;
    });
    const modeToggle = this.segmented({
      label: 'Mode being edited (also switches the page)',
      options: [['light', 'Light'], ['dark', 'Dark']],
      get: () => this.mode,
      set: (v) => {
        document.documentElement.setAttribute('data-theme', v);
        store.set('theme', v);
        document.querySelector('[data-theme-toggle]')?.setAttribute('aria-checked', String(v === 'dark'));
      },
    });
    const glintPairs = (): PairResult[] => (['ux', 'woo', 'content'] as const).map((k) => {
      const ratio = Math.round(contrast(this.draft.overlay.glint, this.draft.colors.light[k]) * 100) / 100;
      return { other: k, role: 'fg' as const, ratio, min: 3, pass: ratio >= 3, why: 'white text on colored tiles' };
    });
    return [
      modeToggle, problems,
      this.group(`${mode === 'dark' ? 'Dark' : 'Light'} palette`, ...COLOR_ROWS.map(([key, label, hint]) =>
        this.colorRow({ path: `colors.${mode}.${key}`, label, hint, pairs: () => pairsFor(colors(), key), fix: () => autoFix(colors(), key) }))),
      this.group('Overlay (both modes)',
        this.colorRow({ path: 'overlay.glint', label: 'Shine over colored tiles', pairs: glintPairs, tune: false }),
        this.text({ path: 'overlay.scrim', label: 'Dialog backdrop', prop: 'background-color' })),
    ];
  }

  private typeTab(): Node[] {
    const lang = this.cfg.lang;
    const base = `typography.${lang}`;
    const fontSelect = (slot: 'display' | 'body', label: string): HTMLElement => {
      const id = this.uid();
      const opts = this.fonts[lang][slot];
      const sel = h('select', { id }, ...opts.map((f) => h('option', { value: f.family }, f.family)));
      sel.addEventListener('change', () => {
        const pick = clone(opts.find((f) => f.family === sel.value)!);
        const ty = this.draft.typography[lang];
        const next = { ...ty, [slot]: pick };
        const files = [...next.display.faces, ...next.body.faces].map((f) => f.file);
        let preload = ty.preload.filter((f) => files.includes(f));
        if (!preload.length) preload = [next.display.faces[0]?.file, next.body.faces[0]?.file].filter((f): f is NonNullable<typeof f> => Boolean(f));
        this.change(base, { ...next, preload }, `${base}.${slot}`);
      });
      this.syncs.push(() => {
        const current = String(getAt(this.draft, `${base}.${slot}.family`));
        if (![...sel.options].some((o) => o.value === current)) sel.append(h('option', { value: current }, `${current} (custom)`));
        sel.value = current;
      });
      return h('div', { class: 'row' }, h('label', { for: id }, label), sel);
    };
    const sizes = Object.keys(this.draft.fontSize).map((k) => {
      const raw = String(this.draft.fontSize[k as keyof Theme['fontSize']]);
      return /^[\d.]+rem$/.test(raw)
        ? this.range({ path: `fontSize.${k}`, label: k, min: 0.5, max: 3.5, step: 0.0125, unit: 'rem' })
        : this.text({ path: `fontSize.${k}`, label: `${k} (fluid)`, prop: 'font-size' });
    });
    return [
      h('p', { class: 'note' }, `Editing ${lang === 'fa' ? 'Persian' : 'English'} typography. Open the ${lang === 'fa' ? 'English' : 'Persian'} page to edit the other.`),
      this.group('Fonts', fontSelect('display', 'Headings'), fontSelect('body', 'Body text'),
        this.range({ path: `${base}.leading`, label: 'Body line height', min: 1, max: 2.4, step: 0.05 })),
      this.group('Font sizes', ...sizes),
    ];
  }

  private shapeTab(): Node[] {
    const radii = Object.keys(this.draft.radius).filter((k) => /^[\d.]+px$/.test(String(this.draft.radius[k as keyof Theme['radius']])));
    return [
      this.group('Corner radius', ...radii.map((k) => this.range({ path: `radius.${k}`, label: k, min: 0, max: 48, step: 1, unit: 'px' }))),
      this.group('Shadows', ...(['dialog', 'drawerStart', 'drawerEnd', 'lift', 'dot'] as const).map((k) => this.text({ path: `shadow.${k}`, label: k, prop: 'box-shadow' }))),
    ];
  }

  private motionTab(): Node[] {
    const id = this.uid();
    const preset = h('select', { id }, ...EASINGS.map(([n, v]) => h('option', { value: v }, n)), h('option', { value: '' }, 'Custom'));
    preset.addEventListener('change', () => { if (preset.value) this.change('motion.ease', preset.value); });
    this.syncs.push(() => { const cur = this.draft.motion.ease; preset.value = EASINGS.some(([, v]) => v === cur) ? cur : ''; });
    const dot = h('i', {});
    const play = h('button', { type: 'button', class: 'mini' }, 'Play preview');
    play.addEventListener('click', () => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { this.say('Reduced motion is on, so the preview is skipped'); return; }
      const ms = Math.max(120, this.draft.motion.duration.slow * this.draft.motion.scale * 1000);
      try { dot.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(300px)' }], { duration: ms, easing: this.draft.motion.ease, fill: 'both', direction: 'alternate', iterations: 2 }); } catch { this.say('That easing is not valid'); }
    });
    return [
      this.group('Speed', this.range({ path: 'motion.scale', label: 'Speed multiplier (lower is faster)', min: 0.1, max: 3, step: 0.05 })),
      this.group('Easing', h('div', { class: 'row' }, h('label', { for: id }, 'Curve'), preset), this.text({ path: 'motion.ease', label: 'Easing value', prop: 'transition-timing-function' }), h('div', { class: 'track', 'aria-hidden': 'true' }, dot), play),
      this.group('Durations (seconds, before the multiplier)', ...(Object.keys(this.draft.motion.duration)).map((k) => this.range({ path: `motion.duration.${k}`, label: k, min: 0, max: 3, step: 0.01, unit: 's' }))),
    ];
  }

  private layoutTab(): Node[] {
    const L = (path: string, label: string, min: number, max: number, step = 1): HTMLElement => this.range({ path: `layout.${path}`, label, min, max, step, unit: 'px' });
    const attr = (name: 'hero' | 'work') => ({
      get: () => document.documentElement.getAttribute(`data-${name}`) ?? '',
      set: (v: string) => { document.documentElement.setAttribute(`data-${name}`, v); store.set(`lab-${name}`, v); this.say(`${name} layout: ${v}`); },
    });
    const heroOptions: Array<[string, string]> = [['split', 'Split'], ['centered', 'Centered']];
    const workOptions: Array<[string, string]> = [['grid', 'Grid'], ['list', 'List']];
    return [
      this.group('Spacing',
        this.segmented({ label: 'Density', options: [['comfortable', 'Comfortable'], ['compact', 'Compact']], get: () => this.draft.layout.density, set: (v) => this.change('layout.density', v) }),
        L('sectionY', 'Section padding', 16, 160), L('sectionYSmall', 'Section padding on phones', 16, 120), L('cardGap', 'Card gap', 8, 64)),
      this.group('Width', L('wrapMax', 'Content width', 640, 1600, 10), L('dialogMax', 'Dialog width', 480, 1400, 10), L('gutter', 'Page side padding', 8, 64), L('gutterWide', 'Side padding, wide screens', 8, 96), L('gutterEnd', 'Extra room beside the section dots', 0, 120)),
      this.group('Page variants (for preview; set the default in site.config.ts)',
        this.segmented({ label: 'Hero', options: heroOptions, ...attr('hero') }), this.segmented({ label: 'Work section', options: workOptions, ...attr('work') })),
    ];
  }

  // ---- saving --------------------------------------------------------------------------------------------------

  private buildSave(): HTMLElement {
    const s = this.saveEls;
    const form = h('form', { class: 'save', hidden: true, noValidate: true, 'aria-label': 'Save preset', onSubmit: (e: Event) => { e.preventDefault(); void this.submitSave(); } });
    s.label = h('input', { type: 'text', id: 'save-label', maxLength: 60, autocomplete: 'off', 'aria-describedby': 'save-file save-err', onInput: () => this.updateSaveForm() });
    s.file = h('p', { class: 'note mono', id: 'save-file' });
    s.mode = h('fieldset', { class: 'seg' });
    s.err = h('p', { class: 'err', id: 'save-err', role: 'alert' });
    s.code = h('textarea', { readOnly: true, hidden: true, 'aria-label': 'Preset source code' });
    s.go = h('button', { type: 'submit', class: 'mini primary' }, 'Save');
    s.copy = h('button', { type: 'button', class: 'mini', onClick: () => void this.copyCode() }, 'Copy code');
    s.cancel = h('button', { type: 'button', class: 'mini', onClick: () => this.toggleSave(false) }, 'Cancel');
    form.append(h('label', { class: 'field', for: 'save-label' }, h('span', {}, 'Preset name'), s.label), s.file, s.mode, s.err, s.code, h('div', { class: 'inputs' }, s.go, s.copy, s.cancel));
    return form;
  }

  private saveEls: Record<string, HTMLElement> = {};
  private saveMode: 'create' | 'update' = 'create';

  private toggleSave(open = this.ui.save.hidden): void {
    this.ui.save.hidden = !open;
    this.ui.saveBtn.setAttribute('aria-expanded', String(open));
    if (!open) { this.ui.saveBtn.focus(); return; }
    const e = this.saveEls;
    const label = e.label as HTMLInputElement;
    this.saveMode = this.isBuiltin ? 'create' : this.saveMode;
    label.value = this.isBuiltin ? `${this.base.label.replace(/\s*\(.*\)\s*$/, '')} custom`.slice(0, 60) : this.base.label;
    (e.code as HTMLTextAreaElement).hidden = true;
    this.buildModeChoices();
    this.updateSaveForm();
    label.focus();
    label.select();
  }

  private buildModeChoices(): void {
    const e = this.saveEls;
    const name = this.uid();
    const choices: Array<['create' | 'update', string]> = this.isBuiltin ? [['create', 'New preset']] : [['update', `Update "${this.base.name}"`], ['create', 'New preset']];
    if (!choices.some(([v]) => v === this.saveMode)) this.saveMode = 'create';
    e.mode.replaceChildren(h('legend', {}, 'Save as'), ...choices.map(([value, label]) => h('label', {}, h('input', { type: 'radio', name, value, checked: value === this.saveMode, onChange: () => { this.saveMode = value; this.updateSaveForm(); } }), h('span', {}, label))));
    e.mode.hidden = choices.length < 2;
  }

  private target(): { name: string; label: string; error: string } {
    const label = (this.saveEls.label as HTMLInputElement).value.trim();
    if (this.saveMode === 'update') return { name: this.base.name, label: this.base.label, error: '' };
    const name = slugify(label);
    let error = '';
    if (!label || !name) error = 'Give the preset a name using letters or digits.';
    else if (!SLUG.test(name)) error = 'Use letters, digits and hyphens.';
    else if (this.cfg.presets.some((p) => p.name === name)) error = `A preset named "${name}" already exists. Choose another name${this.isBuiltin ? '' : ' or update it'}.`;
    else if (!isValidLabel(label)) error = "Use letters, digits, spaces and ( ) . , ' & + / - only.";
    return { name, label, error };
  }

  private updateSaveForm(): void {
    const e = this.saveEls;
    const t = this.target();
    const fails = checkTheme(this.draft).length;
    const valid = parseIncomingTheme({ ...this.draft, name: t.name || 'preset', label: t.label || 'Preset' });
    const err = t.error || (!valid.ok ? `A value is out of range: ${valid.problems[0]}` : '') || (fails ? `Fix ${fails} contrast ${fails === 1 ? 'failure' : 'failures'} first (Colors tab), then save.` : '');
    e.file.textContent = `src/theme/presets/${t.name || '…'}.ts`;
    (e.label as HTMLInputElement).disabled = this.saveMode === 'update';
    e.err.textContent = err;
    (e.go as HTMLButtonElement).disabled = Boolean(err) || (this.saveMode === 'update' && !this.dirty);
    (e.go as HTMLButtonElement).textContent = this.saveMode === 'update' ? 'Update preset' : 'Save new preset';
  }

  private async copyCode(): Promise<void> {
    const t = this.target();
    const code = serializePreset({ ...this.draft, name: t.name || 'my-preset', label: t.label || 'My preset' }, new Date().toISOString().slice(0, 10));
    const area = this.saveEls.code as HTMLTextAreaElement;
    try { await navigator.clipboard.writeText(code); this.say(`Copied. Save it as src/theme/presets/${t.name || 'my-preset'}.ts, then run npm run presets:sync`); }
    catch { area.value = code; area.hidden = false; area.focus(); area.select(); }
  }

  private async submitSave(): Promise<void> {
    const t = this.target();
    const e = this.saveEls;
    if (t.error) return;
    (e.go as HTMLButtonElement).disabled = true;
    try {
      const res = await fetch('/__theme-lab/save', { method: 'POST', headers: { 'content-type': 'application/json', 'x-theme-lab': '1' }, body: JSON.stringify({ mode: this.saveMode, theme: { ...this.draft, name: t.name, label: t.label } }) });
      const out = (await res.json()) as { ok: boolean; error?: string; problems?: string[] };
      if (!out.ok) { e.err.textContent = [out.error, ...(out.problems ?? [])].filter(Boolean).join(' '); (e.go as HTMLButtonElement).disabled = false; return; }
      store.set('lab-preset', t.name);
      store.set('lab-draft', null);
      store.set('lab-live-css', null);
      this.say(`Saved ${t.name}. Reloading.`);
      setTimeout(() => location.reload(), 250);
    } catch {
      e.err.textContent = 'Could not reach the dev server. Use "Copy code" instead.';
      (e.go as HTMLButtonElement).disabled = false;
    }
  }
}

if (!customElements.get('theme-lab')) customElements.define('theme-lab', ThemeLabElement);
