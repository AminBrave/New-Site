/** Measure frame pacing and downgrade expensive effects when performance is limited. */
type Tier = 'high' | 'medium' | 'low';

export function initPerformanceController(): void {
  const root = document.documentElement;
  const tierRank: Record<Tier, number> = { high: 0, medium: 1, low: 2 };
  const currentTier = (): Tier =>
    root.dataset.perf === 'low' || root.dataset.perf === 'medium' ? root.dataset.perf : 'high';

  const setTier = (tier: Tier): void => {
    root.dataset.perf = tier;
    try {
      sessionStorage.setItem('perf', tier);
    } catch {
      /* storage unavailable */
    }
  };

  const probeFrameRate = (): void => {
    if (document.hidden || currentTier() === 'low') return;
    const deltas: number[] = [];
    let previous = 0;

    const tick = (now: number): void => {
      if (document.hidden) return;
      if (previous) deltas.push(now - previous);
      previous = now;

      if (deltas.length < 45) {
        requestAnimationFrame(tick);
        return;
      }

      deltas.sort((a, b) => a - b);
      const median = deltas[Math.floor(deltas.length / 2)];
      const measured: Tier = median > 34 ? 'low' : median > 22 ? 'medium' : 'high';
      setTier(tierRank[measured] > tierRank[currentTier()] ? measured : currentTier());
    };

    requestAnimationFrame(tick);
  };

  const start = (): void => void window.setTimeout(probeFrameRate, 1800);
  if (document.readyState === 'complete') start();
  else addEventListener('load', start, { once: true });
}