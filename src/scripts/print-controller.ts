/**
 * Print / "Save as PDF" for the resume dialog.
 * While the dialog is open, printing (button or Ctrl/Cmd+P) outputs only the CV, always in light colors,
 * and the page title is swapped so the saved PDF gets a sensible file name.
 */
export function initPrintController(): void {
  const root = document.documentElement;
  const cv = document.getElementById('cv');
  if (!cv) return;
  let savedTitle: string | null = null;

  addEventListener('beforeprint', () => {
    if (!cv.hasAttribute('open')) return;
    root.classList.add('printing-cv');
    savedTitle = document.title;
    document.title = cv.dataset.printTitle || savedTitle;
  });
  addEventListener('afterprint', () => {
    root.classList.remove('printing-cv');
    if (savedTitle !== null) document.title = savedTitle;
    savedTitle = null;
  });

  document.querySelectorAll<HTMLElement>('[data-print]').forEach((button) =>
    button.addEventListener('click', () => {
      // A button that also opens the dialog: let the dialog render before the print dialog appears.
      const delay = button.dataset.open ? 150 : 0;
      window.setTimeout(() => window.print(), delay);
    }),
  );
}
