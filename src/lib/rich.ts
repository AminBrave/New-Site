const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escapes text, then turns **bold** markers into <strong>. Use with `set:html`. */
export const rich = (value: string | null | undefined): string =>
  escapeHtml(value ?? '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
