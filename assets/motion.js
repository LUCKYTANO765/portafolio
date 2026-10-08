'use strict';

// One controller per visible page. All listeners and observers are disposed on navigation.
(() => {
  let current = null;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const stopped = () => document.documentElement.classList.contains('motion-paused') || reduced.matches;

  function mount(root) {
    unmount();
    const observed = new Set();
    const transitions = new Set();
    let pointerFrame = 0;
    let latestPointer = null;
    let hovered = null;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const element = entry.target;
        if (element.matches('.method-diagram, .protection-illustration')) {
          element.classList.toggle('in-view', entry.isIntersecting);
          if (!entry.isIntersecting && hovered === element) resetPointer();
        } else if (entry.isIntersecting || stopped()) {
          element.classList.add('is-revealed');
          observer.unobserve(element);
          observed.delete(element);
        }
      }
    }, { threshold: .08 });

    function refresh(scope = root) {
      for (const element of observed) {
        if (!element.isConnected) { observer.unobserve(element); observed.delete(element); }
      }
      const selectors = '.group-heading, .discipline-row, .project-row, .stack-line, .area-crosslink, .privacy-note, .profile-facts > div, .contact-links a, .protection-entry, .protection-contact';
      scope.querySelectorAll(selectors).forEach((element, index) => {
        if (element.classList.contains('scroll-reveal')) return;
        element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 4) * 55}ms`);
        element.classList.add('scroll-reveal');
        if (stopped()) element.classList.add('is-revealed');
        else { observer.observe(element); observed.add(element); }
      });
      scope.querySelectorAll('.method-diagram, .protection-illustration').forEach(element => {
        if (!observed.has(element)) { observer.observe(element); observed.add(element); }
      });
    }

    function resetPointer() {
      cancelAnimationFrame(pointerFrame); pointerFrame = 0; latestPointer = null;
      if (hovered) {
        hovered.style.setProperty('--tilt-x', '0deg');
        hovered.style.setProperty('--tilt-y', '0deg');
        hovered.style.setProperty('--light-x', '50%');
        hovered.style.setProperty('--light-y', '50%');
        hovered.classList.remove('pointer-active');
        hovered = null;
      }
    }
    function trackPointer(event) {
      if (stopped() || !finePointer.matches || document.hidden) return;
      const target = event.target.closest('.method-diagram');
      if (!target || !root.contains(target)) { resetPointer(); return; }
      if (hovered !== target) { resetPointer(); hovered = target; }
      latestPointer = { x: event.clientX, y: event.clientY };
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!hovered || !latestPointer) return;
        const rect = hovered.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (latestPointer.x - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (latestPointer.y - rect.top) / rect.height));
        hovered.style.setProperty('--tilt-x', `${(y - .5) * -6}deg`);
        hovered.style.setProperty('--tilt-y', `${(x - .5) * 6}deg`);
        hovered.style.setProperty('--light-x', `${x * 100}%`);
        hovered.style.setProperty('--light-y', `${y * 100}%`);
        hovered.classList.add('pointer-active');
      });
    }
    function sync() {
      document.documentElement.classList.toggle('page-hidden', document.hidden);
      if (stopped() || document.hidden) {
        resetPointer();
        for (const animation of transitions) animation.finish();
        if (stopped()) root.querySelectorAll('.scroll-reveal').forEach(element => element.classList.add('is-revealed'));
      }
    }
    function swap(element) {
      if (stopped() || !element.animate) return;
      for (const animation of transitions) animation.cancel();
      transitions.clear();
      const animation = element.animate([{ opacity: .25, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'cubic-bezier(.2,.7,.3,1)' });
      transitions.add(animation);
      animation.finished.then(() => transitions.delete(animation), () => transitions.delete(animation));
    }
    root.addEventListener('pointermove', trackPointer, { passive: true });
    root.addEventListener('pointerleave', resetPointer);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('portfolio-motion', sync);
    current = {
      refresh, swap,
      destroy() {
        resetPointer(); observer.disconnect(); observed.clear();
        for (const animation of transitions) animation.cancel();
        root.removeEventListener('pointermove', trackPointer);
        root.removeEventListener('pointerleave', resetPointer);
        document.removeEventListener('visibilitychange', sync);
        window.removeEventListener('portfolio-motion', sync);
      },
    };
    refresh(); sync();
  }
  function unmount() { current?.destroy(); current = null; }
  window.PortfolioMotion = {
    mount, unmount,
    refresh(scope) { current?.refresh(scope); },
    swap(element) { current?.swap(element); },
  };
})();
