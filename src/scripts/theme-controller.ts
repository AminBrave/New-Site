/** Initialize the theme toggle and follow system color-scheme changes when no preference is saved. */
export function initThemeController(): void {
  const root = document.documentElement;
  const themeSwitch = document.querySelector<HTMLElement>('[data-theme-toggle]');
  const syncSwitch = (): void => themeSwitch?.setAttribute('aria-checked', String(root.dataset.theme === 'dark'));

  syncSwitch();
  themeSwitch?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable */
    }
    syncSwitch();
  });

  const scheme = matchMedia('(prefers-color-scheme: dark)');
  if (typeof scheme.addEventListener === 'function') {
    scheme.addEventListener('change', (event) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem('theme');
      } catch {
        /* storage unavailable */
      }
      if (stored) return;
      root.dataset.theme = event.matches ? 'dark' : 'light';
      syncSwitch();
    });
  }
}
