/** Styles for the Theme lab. They live in the component's shadow root, so editing the site's tokens never restyles the panel. */
export const labCss = /* css */ `
:host { all: initial; position: fixed; z-index: 2147483000; inset-block-end: 12px; inset-inline: 12px; display: flex; pointer-events: none; font: 13px/1.4 system-ui, -apple-system, 'Segoe UI', sans-serif; color-scheme: dark;
  --bg: #14161b; --raised: #1c1f26; --field: #0e1014; --rule: #323744; --edge: #6b758c; --text: #eceff4; --muted: #a3acbb; --accent: #8fb4ff; --accent-ink: #0c1220; --bad: #ff9b8f; --good: #85e3b0; }
:host([data-dock='end']) { justify-content: flex-end; }
* { box-sizing: border-box; }
.wrap { pointer-events: auto; display: grid; gap: 8px; max-width: 100%; align-items: end; }
[hidden] { display: none !important; }
button, input, select, textarea { font: inherit; color: inherit; }
button { cursor: pointer; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

.pill { justify-self: start; display: inline-flex; gap: 8px; align-items: center; min-height: 36px; padding: 0 14px; border: 1px solid var(--edge); border-radius: 999px; background: var(--bg); color: var(--text); box-shadow: 0 8px 24px #0008; }
:host([data-dock='end']) .pill { justify-self: end; }
.pill .mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
.pill[data-dirty] .mark { background: var(--good); outline: 2px solid var(--bg); box-shadow: 0 0 0 4px var(--good); }

.panel { width: min(380px, 100%); max-height: min(78vh, 720px); display: flex; flex-direction: column; border: 1px solid var(--edge); border-radius: 14px; background: var(--bg); color: var(--text); box-shadow: 0 24px 60px #000a; overflow: hidden; }
:host([data-dock='end']) .panel { justify-self: end; }
.bar, .presetbar, .tabs, .status, .foot, .save { flex: none; }
.bar { display: flex; align-items: center; gap: 6px; padding: 10px 12px 6px; }
.bar h2 { margin: 0 auto 0 0; font-size: 14px; font-weight: 650; }
.icon { min-width: 32px; min-height: 32px; padding: 0 8px; border: 1px solid transparent; border-radius: 8px; background: transparent; color: var(--muted); }
.icon:hover { background: var(--raised); color: var(--text); }
.presetbar { display: grid; grid-template-columns: 1fr auto; gap: 8px; align-items: end; padding: 4px 12px 10px; }
.field { display: grid; gap: 4px; min-width: 0; }
.field > span, .row label, legend { color: var(--muted); font-size: 12px; }
select, input[type=text], input[type=number], textarea { min-height: 32px; width: 100%; padding: 4px 8px; border: 1px solid var(--edge); border-radius: 8px; background: var(--field); color: var(--text); }
textarea { min-height: 120px; font: 12px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; }
input[aria-invalid='true'] { border-color: var(--bad); }
.badge { align-self: center; padding: 3px 9px; border: 1px solid var(--rule); border-radius: 999px; color: var(--muted); font-size: 12px; white-space: nowrap; }
.badge[data-on] { border-color: var(--good); color: var(--good); }

.tabs { display: flex; gap: 2px; padding: 0 8px; border-bottom: 1px solid var(--rule); overflow-x: auto; }
.tab { min-height: 34px; padding: 0 10px; border: 0; border-bottom: 2px solid transparent; background: none; color: var(--muted); white-space: nowrap; }
.tab[aria-selected='true'] { color: var(--text); border-bottom-color: var(--accent); }
.body { flex: 1; min-height: 120px; overflow-y: auto; padding: 10px 12px 14px; display: grid; gap: 12px; align-content: start; }
.group { display: grid; gap: 10px; margin: 0; padding: 0; border: 0; }
.group > legend { padding: 0; margin-bottom: 2px; color: var(--text); font-weight: 600; font-size: 12px; }
.note { margin: 0; color: var(--muted); font-size: 12px; }
.row { display: grid; gap: 4px; }
.rowhead { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.range { display: grid; grid-template-columns: 1fr 72px; gap: 8px; align-items: center; }
input[type=range] { width: 100%; min-height: 24px; accent-color: var(--accent); }
input[type=color] { width: 40px; min-width: 40px; height: 32px; padding: 2px; border: 1px solid var(--edge); border-radius: 8px; background: var(--field); }
.inputs { display: flex; gap: 6px; align-items: center; }
.inputs .hex { font: 12px ui-monospace, SFMono-Regular, Menlo, monospace; }
.mono { font: 12px ui-monospace, SFMono-Regular, Menlo, monospace; }
.mini { min-height: 32px; padding: 0 10px; border: 1px solid var(--edge); border-radius: 8px; background: var(--raised); white-space: nowrap; }
.mini:hover:not(:disabled) { border-color: var(--accent); }
.tune { display: grid; gap: 6px; padding: 8px; border: 1px solid var(--rule); border-radius: 10px; background: var(--raised); }
.tune .range { grid-template-columns: 22px 1fr 56px; }
.chip { padding: 2px 8px; border-radius: 999px; border: 1px solid var(--rule); font-size: 11px; font-variant-numeric: tabular-nums; white-space: nowrap; }
.chip[data-pass='true'] { color: var(--good); border-color: var(--good); }
.chip[data-pass='false'] { color: var(--bad); border-color: var(--bad); }
.problems { border: 1px solid var(--rule); border-radius: 10px; background: var(--raised); }
.problems summary { min-height: 32px; padding: 6px 10px; cursor: pointer; }
.problems ul { margin: 0; padding: 0 10px 10px 26px; color: var(--bad); font-size: 12px; }
.seg { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; border: 0; }
.seg label { position: relative; color: var(--text); font-size: 13px; }
.seg input { position: absolute; opacity: 0; inset: 0; }
.seg span { display: inline-flex; align-items: center; min-height: 32px; padding: 0 12px; border: 1px solid var(--edge); border-radius: 8px; background: var(--raised); }
.seg input:checked + span { border-color: var(--accent); background: var(--accent); color: var(--accent-ink); font-weight: 600; }
.seg input:focus-visible + span { outline: 2px solid var(--accent); outline-offset: 2px; }
.err { margin: 0; color: var(--bad); font-size: 12px; }
.track { position: relative; height: 28px; border: 1px solid var(--rule); border-radius: 8px; background: var(--field); overflow: hidden; }
.track i { position: absolute; inset-block: 6px; inset-inline-start: 8px; width: 14px; border-radius: 50%; background: var(--accent); }

.status { padding: 6px 12px; border-top: 1px solid var(--rule); color: var(--muted); font-size: 12px; min-height: 30px; }
.status[data-bad] { color: var(--bad); }
.foot { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 12px 12px; border-top: 1px solid var(--rule); }
.foot .grow { margin-inline-start: auto; }
.primary { border-color: var(--accent); background: var(--accent); color: var(--accent-ink); font-weight: 600; }
.mini:disabled { opacity: .55; cursor: not-allowed; }
.save { display: grid; gap: 10px; padding: 10px 12px 12px; border-top: 1px solid var(--rule); background: var(--raised); }
.save .seg span { font-size: 12px; }

@media (max-width: 480px) { .panel { width: 100%; max-height: 72vh; } }
@media (prefers-reduced-motion: no-preference) { .pill, .mini, .icon { transition: border-color .12s, background-color .12s; } }
@media print { :host { display: none; } }
@media (forced-colors: active) { .seg input:checked + span { outline: 2px solid Highlight; } }
`;
