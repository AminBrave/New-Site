/** Initialize touch-friendly dot labels and reveal animations. */
export function initDotTips(): void {
  const dots = document.querySelectorAll< HTMLAnchorElement >('.dots a');
  const timers = new WeakMap<HTMLElement, number>();
  const showTip = (link: HTMLElement): void => {
    link.classList.add('tip');
    window.clearTimeout(timers.get(link));
    timers.set(link, window.setTimeout(() => link.classList.remove('tip'), 2200));
  };

  dots.forEach((link) => {
    link.addEventListener('pointerdown', (event) => event.pointerType !== 'mouse' && showTip(link));
    link.addEventListener('click', () => showTip(link));
  });
}

export function initRevealAnimations(): void {
  if (!('IntersectionObserver' in window)) return;

  const hero = document.querySelector<HTMLElement>('#top');
  const revealObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.target.classList.toggle('in', entry.isIntersecting)),
    { rootMargin: '0px 0px -8% 0px' },
  );
  document.querySelectorAll('[data-reveal], [data-stagger]').forEach((el) => revealObserver.observe(el));

  if (hero) {
    new IntersectionObserver(
      (entries) => entries.forEach((entry) => hero.classList.toggle('run', entry.isIntersecting)),
      { threshold: 0 },
    ).observe(hero);
  }
}