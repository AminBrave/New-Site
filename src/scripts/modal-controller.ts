import { activateSection } from './scroll-tracking';

/** Initialize native dialogs, menu navigation, and history synchronization. */
export function initModalController(): void {
  function $<T extends HTMLElement = HTMLElement>(selector: string, scope: ParentNode = document): T | null {
    return scope.querySelector<T>(selector);
  }
  function $$<T extends HTMLElement = HTMLElement>(selector: string, scope: ParentNode = document): T[] {
    return Array.from(scope.querySelectorAll<T>(selector));
  }
  const getDialog = (id: string): HTMLDialogElement | null => {
    const el = document.getElementById(id);
    return el && el.localName === 'dialog' ? (el as HTMLDialogElement) : null;
  };
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  /** Keep modal initialization isolated from other client-side features. */
  function run(name: string, init: () => void): void {
    try {
      init();
    } catch (error) {
      console.warn(`[portfolio] ${name} failed`, error);
    }
  }
  const dots = Array.from(document.querySelectorAll<HTMLAnchorElement>('.dots a'));

  /* ---------- modals: native <dialog>, with a fallback for browsers without showModal ---------- */
  interface ModalState { modal: string }
  const supportsDialog = typeof HTMLDialogElement === 'function' && typeof HTMLDialogElement.prototype.showModal === 'function';
  let openDialog: HTMLDialogElement | null = null;
  let legacyBackdrop: HTMLDivElement | null = null;
  let legacyReturnFocus: HTMLElement | null = null;
  const menuButtons = $$('[data-open="menu"]');
  const setMenuExpanded = (open: boolean): void => menuButtons.forEach((b) => b.setAttribute('aria-expanded', String(open)));

  function showDialog(dialog: HTMLDialogElement): void {
    root.classList.add('modal-open');
    if (supportsDialog) {
      dialog.showModal();
      return;
    }
    legacyReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!legacyBackdrop) {
      legacyBackdrop = document.createElement('div');
      legacyBackdrop.className = 'legacy-backdrop';
      legacyBackdrop.addEventListener('click', () => openDialog && hideDialog(openDialog));
      document.body.appendChild(legacyBackdrop);
    }
    legacyBackdrop.hidden = false;
    dialog.classList.add('legacy');
    dialog.setAttribute('open', '');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    $('[data-close]', dialog)?.focus();
  }

  function hideDialog(dialog: HTMLDialogElement): void {
    if (supportsDialog) {
      dialog.close();
      return;
    }
    dialog.removeAttribute('open');
    dialog.classList.remove('legacy');
    if (legacyBackdrop) legacyBackdrop.hidden = true;
    legacyReturnFocus?.focus();
    dialog.dispatchEvent(new Event('close'));
  }

  function openModal(id: string): void {
    const dialog = getDialog(id);
    if (!dialog) return;
    let replace = false;
    if (openDialog && openDialog !== dialog) {
      const previous = openDialog;
      openDialog = null;
      hideDialog(previous);
      replace = true;
    }
    showDialog(dialog);
    dialog.scrollTop = 0;
    openDialog = dialog;
    if (id === 'menu') {
      const current = dots.find((link) => link.getAttribute('aria-current') === 'true');
      if (current) activateSection(current.hash.slice(1));
      setMenuExpanded(true);
    }
    const state: ModalState = { modal: id };
    if (replace) history.replaceState(state, '');
    else history.pushState(state, '');
  }

  function closeSilently(dialog: HTMLDialogElement): void {
    if (openDialog === dialog) openDialog = null;
    root.classList.remove('modal-open');
    hideDialog(dialog);
  }

  run('modals', () => {
    $$('[data-open]').forEach((button) =>
      button.addEventListener('click', () => {
        const id = button.dataset.open;
        if (id) openModal(id);
      }),
    );
    $$<HTMLDialogElement>('dialog').forEach((dialog) => {
      $$('[data-close]', dialog).forEach((button) => button.addEventListener('click', () => hideDialog(dialog)));
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) hideDialog(dialog);
      });
      dialog.addEventListener('close', () => {
        if (dialog.id === 'menu') setMenuExpanded(false);
        root.classList.toggle('modal-open', openDialog !== null && openDialog !== dialog);
        if (openDialog !== dialog) return;
        openDialog = null;
        const state = history.state as Partial<ModalState> | null;
        if (state?.modal) history.back();
      });
    });
    addEventListener('popstate', () => {
      if (!openDialog) return;
      const dialog = openDialog;
      openDialog = null;
      hideDialog(dialog);
    });
    if (!supportsDialog) {
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && openDialog) hideDialog(openDialog);
      });
    }

    // menu links: close the menu, scroll to the section, move focus there
    const menuDialog = getDialog('menu');
    $$<HTMLAnchorElement>('[data-nav]').forEach((link) =>
      link.addEventListener('click', (event) => {
        const hash = link.getAttribute('href');
        const target = hash ? $(hash) : null;
        if (!hash || !target) return;
        event.preventDefault();
        if (menuDialog) closeSilently(menuDialog);
        history.replaceState(null, '', hash);
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
          target.focus({ preventScroll: true });
        });
      }),
    );
  });
}
