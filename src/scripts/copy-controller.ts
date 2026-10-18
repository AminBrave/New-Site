/** Initialize copy-to-clipboard buttons with a manual-selection fallback. */
export function initCopyController(): void {
  const selectText = (el: Element): void => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  document.querySelectorAll<HTMLElement>('[data-copy]').forEach((button) => {
    const label = button.querySelector<HTMLElement>('.txt');
    if (!label) return;
    const original = label.textContent ?? '';
    let timer: number | undefined;

    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy ?? '');
      } catch {
        const mail = document.querySelector<HTMLElement>('.mail');
        if (mail) selectText(mail);
      }
      button.classList.add('done');
      label.textContent = button.dataset.done ?? original;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        button.classList.remove('done');
        label.textContent = original;
      }, 1800);
    });
  });
}