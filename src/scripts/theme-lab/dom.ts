/** Tiny DOM helpers for the Theme lab (dev only). No framework: the site has none. */
type Child = Node | string | null | false | undefined;

export function h<K extends keyof HTMLElementTagNameMap>(tag: K, props: Record<string, unknown> = {}, ...children: Child[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) continue;
    if (key.startsWith('on') && typeof value === 'function') el.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
    else if (key === 'class') el.className = String(value);
    else if (key === 'for') el.setAttribute('for', String(value));
    else if (key.startsWith('aria-') || key.startsWith('data-') || key === 'role' || key === 'hidden' || key === 'title') el.setAttribute(key, value === true ? '' : String(value));
    else (el as unknown as Record<string, unknown>)[key] = value;
  }
  for (const child of children) if (child) el.append(child);
  return el;
}

export const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v)) as T;

/** JSON with sorted keys, so two themes compare equal whatever order their keys were written in. */
export function canon(v: unknown): string {
  return JSON.stringify(v, (_k, val: unknown) =>
    val && typeof val === 'object' && !Array.isArray(val)
      ? Object.fromEntries(Object.entries(val as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)))
      : val,
  );
}

export function getAt(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[k] : undefined), obj);
}
export function setAt(obj: unknown, path: string, value: unknown): void {
  const keys = path.split('.');
  const last = keys.pop() as string;
  const parent = keys.reduce<unknown>((o, k) => (o as Record<string, unknown>)[k], obj) as Record<string, unknown>;
  parent[last] = value;
}

export const round = (n: number): number => Math.round(n * 10000) / 10000;
