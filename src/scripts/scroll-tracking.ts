type SectionLink = HTMLAnchorElement;
type SectionElement = HTMLElement;

function applyActiveSection(
  id: string,
  dots: SectionLink[],
  menuLinks: SectionLink[],
  sections: SectionElement[],
): void {
  const href = `#${id}`;
  for (const link of [...dots, ...menuLinks]) {
    if (link.getAttribute('href') === href) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
  for (const section of sections) section.classList.toggle('is-active', section.id === id);
}

/** Update active navigation links and the matching section. */
export function activateSection(id: string): void {
  applyActiveSection(
    id,
    Array.from(document.querySelectorAll<SectionLink>('.dots a')),
    Array.from(document.querySelectorAll<SectionLink>('.menu-nav a')),
    Array.from(document.querySelectorAll<SectionElement>('[data-section]')),
  );
}

/** Initialize scroll progress, active-section tracking, and process-step progress. */
export function initScrollTracking(): void {
  const root = document.documentElement;
  const bar = document.querySelector<HTMLElement>('.bar');
  const progress = document.querySelector<HTMLElement>('.progress');
  const dots = Array.from(document.querySelectorAll<SectionLink>('.dots a'));
  const menuLinks = Array.from(document.querySelectorAll<SectionLink>('.menu-nav a'));
  const sections = Array.from(document.querySelectorAll<SectionElement>('[data-section]'));
  const steps = document.querySelector<HTMLElement>('[data-steps]');
  const stepItems = steps ? Array.from(steps.querySelectorAll<HTMLElement>('li')) : [];
  const hasObserver = 'IntersectionObserver' in window;

  const activate = (id: string): void => applyActiveSection(id, dots, menuLinks, sections);

  let stepsNear = !hasObserver;
  function updateStepProgress(): void {
    if (!steps || !stepsNear) return; // skip layout reads while the steps are far off-screen
    const rect = steps.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.82 - rect.top) / (rect.height + vh * 0.3)));
    steps.style.setProperty('--p', p.toFixed(3));
    stepItems.forEach((item, i) => item.classList.toggle('done', p > 0.02 && p * 4 >= i - 0.001));
  }

  /** Fallback for browsers without IntersectionObserver. */
  function activateFromScroll(): void {
    const middle = window.innerHeight / 2;
    const hit = sections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= middle && rect.bottom > middle;
    });
    if (hit) activate(hit.id);
  }

  let scrollQueued = false;
  function onScroll(): void {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      progress?.style.setProperty('--p', String(max > 0 ? Math.min(y / max, 1) : 0));
      bar?.classList.toggle('scrolled', y > 8);
      if (!hasObserver) activateFromScroll();
      const last = sections[sections.length - 1];
      if (last && max > 0 && max - y < 4) activate(last.id);
      updateStepProgress();
      scrollQueued = false;
    });
  }

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  if (!hasObserver) return;
  const sectionObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && activate(entry.target.id)),
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((section) => sectionObserver.observe(section));
  if (steps) {
    new IntersectionObserver(
      (entries) => {
        stepsNear = entries.some((entry) => entry.isIntersecting);
        if (stepsNear) onScroll();
      },
      { rootMargin: '25% 0px' },
    ).observe(steps);
  }
}
