// Escapes text and turns **bold** markers into <strong>. Use with set:html.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const rich = (s) => esc(s ?? '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
