/** Native sticky scrolling: no wheel/touch interception and no body scroll lock. */
export function createPinnedScroll(stage: HTMLElement, count: number, select: (index: number) => void, prefix: 'services' | 'frictions', read?: (index: number, progress: number) => void) {
  const header = document.querySelector<HTMLElement>('.site-header');
  const controls = stage.querySelector<HTMLElement>(`.${prefix}-scroll-controls`)!;
  const position = stage.querySelector<HTMLElement>(`.${prefix}-scroll-position`)!;
  let enabled = false;
  let step = 0;
  let offset = 0;
  let current = 0;
  let scheduled = 0;

  function start() {
    return stage.getBoundingClientRect().top + window.scrollY - offset;
  }

  function showPosition(index: number) {
    position.textContent = `${String(index + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
  }

  function segment(index: number) {
    return { from: index === 0 ? 0 : (index - .5) * step, to: index === count - 1 ? (count - 1) * step : (index + .5) * step };
  }

  function update() {
    scheduled = 0;
    if (!enabled) return;
    const relative = window.scrollY - start();
    // Outside the stage, leave manual selection and keyboard focus untouched.
    if (relative < -1 || relative > step * (count - 1) + 1) {
      read?.(current, relative < 0 ? 0 : 1);
      return;
    }
    const index = Math.max(0, Math.min(count - 1, Math.round(relative / step)));
    if (index !== current) {
      current = index;
      showPosition(index);
      select(index);
    }
    const { from, to } = segment(index);
    read?.(index, Math.max(0, Math.min(1, (relative - from) / (to - from))));
  }

  function schedule() {
    if (!scheduled) scheduled = requestAnimationFrame(update);
  }

  function measure() {
    const previousStart = enabled ? start() : 0;
    const relative = window.scrollY - previousStart;
    const wasPinned = enabled && relative >= 0 && relative <= step * (count - 1);
    const progress = wasPinned ? relative / step : 0;
    offset = (header?.getBoundingClientRect().height ?? 88) + 12;
    const height = window.innerHeight - offset - 12;
    // Very short or zoomed viewports retain normal controls in document flow.
    enabled = height >= 440;
    stage.classList.toggle('is-scroll-guided', enabled);
    controls.hidden = !enabled;
    if (!enabled) {
      stage.style.removeProperty('height');
      read?.(current, 0);
      return;
    }
    step = Math.max(240, Math.round(window.innerHeight * .65));
    stage.style.setProperty(`--${prefix}-sticky-top`, `${offset}px`);
    stage.style.setProperty(`--${prefix}-stage-height`, `${height}px`);
    stage.style.height = `${height + step * (count - 1)}px`;
    if (wasPinned) window.scrollTo({ top: start() + progress * step, behavior: 'instant' });
    schedule();
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  // Changes above this section (accordions, fonts, images) must update its origin.
  new ResizeObserver(schedule).observe(document.body);
  if (header) new ResizeObserver(measure).observe(header);
  document.fonts.ready.then(measure);
  measure();

  return {
    get enabled() { return enabled; },
    refresh: schedule,
    goTo(index: number, progress = 0) {
      current = index;
      showPosition(index);
      if (enabled) {
        const { from, to } = segment(index);
        // Stay clear of rounded CSS-pixel boundaries when fonts or content resize.
        const relative = Math.min(to - 8, from + Math.max(8, progress * (to - from)));
        window.scrollTo({ top: start() + relative, behavior: 'instant' });
        schedule();
      }
    }
  };
}
