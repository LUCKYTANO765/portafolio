'use strict';

(() => {
  function markup() {
    return `<section class="terrain-section" aria-hidden="true"><canvas class="terrain" aria-hidden="true"></canvas><p class="terrain-caption">CÓDIGO · CONEXIONES · POSIBILIDADES</p></section>`;
  }

  function mount(root) {
    const canvas = root.querySelector('.terrain-section .terrain');
    const context = canvas?.getContext('2d', { alpha: true });
    if (!context) return () => {};
    const section = canvas.closest('.terrain-section');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const pointerEnabled = matchMedia('(hover: hover) and (pointer: fine)');
    const columns = 64;
    const rows = 26;
    const frameInterval = 1000 / 30;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let phase = .7;
    let visible = false;
    let disposed = false;
    let frame = 0;
    let lastDraw = 0;
    let targetX = 0;
    let targetY = 0;
    let pointerX = 0;
    let pointerY = 0;

    const stopped = () => reduced.matches || document.documentElement.classList.contains('motion-paused');
    const canAnimate = () => !disposed && visible && !document.hidden && !stopped() && canvas.isConnected;

    function point(x, depth) {
      const perspective = .28 + depth * .86;
      const ridge = Math.sin(x * 10 + depth * 4 + phase)
        * Math.sin(x * 4 - depth * 3 + phase * .35);
      const edge = Math.sin((x + 1) * Math.PI / 2);
      return [
        width * .5 + x * width * .55 * perspective + pointerX * 11 * depth,
        height * (.16 + depth * .76)
          - ridge * height * .115 * (.3 + depth * .7) * edge * edge
          + pointerY * 6 * depth,
      ];
    }

    function draw() {
      if (!width || !height || disposed) return;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      const glow = context.createRadialGradient(width * .5, height * .64, 0, width * .5, height * .64, width * .47);
      glow.addColorStop(0, 'rgba(168,98,43,.055)');
      glow.addColorStop(1, 'rgba(168,98,43,0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      context.lineWidth = .7;

      // Cross-lines are quiet enough to preserve the warm horizontal ridges.
      for (let column = 0; column < columns; column++) {
        const x = column / (columns - 1) * 2 - 1;
        context.beginPath();
        for (let row = 0; row < rows; row++) {
          const [px, py] = point(x, row / (rows - 1));
          if (row === 0) context.moveTo(px, py); else context.lineTo(px, py);
        }
        context.strokeStyle = 'rgba(105,159,150,.09)';
        context.stroke();
      }
      for (let row = 0; row < rows; row++) {
        const depth = row / (rows - 1);
        context.beginPath();
        for (let column = 0; column < columns; column++) {
          const [px, py] = point(column / (columns - 1) * 2 - 1, depth);
          if (column === 0) context.moveTo(px, py); else context.lineTo(px, py);
        }
        context.strokeStyle = `rgba(245,162,103,${.07 + depth * .23})`;
        context.stroke();
      }

      // Each trace travels along the existing mesh; geometry remains continuous.
      for (let beam = 0; beam < 3; beam++) {
        const depth = .26 + .24 * beam;
        const head = ((phase * .115 + beam * .31) % 1) * 2 - 1;
        const [headX, headY] = point(head, depth);
        const presence = Math.sin((head + 1) * Math.PI / 2) ** 2;
        const halo = context.createRadialGradient(headX, headY, 0, headX, headY, 17);
        halo.addColorStop(0, `rgba(245,162,103,${.2 * presence})`);
        halo.addColorStop(1, 'rgba(245,162,103,0)');
        context.fillStyle = halo;
        context.fillRect(headX - 17, headY - 17, 34, 34);
        for (let segment = 1; segment <= 11; segment++) {
          const x1 = head - (12 - segment) * .015;
          const x2 = x1 + .015;
          if (x1 < -1 || x2 > 1) continue;
          const start = point(x1, depth);
          const end = point(x2, depth);
          context.beginPath();
          context.moveTo(...start);
          context.lineTo(...end);
          context.lineWidth = 1.25;
          context.strokeStyle = `rgba(255,192,139,${segment / 11 * .72 * presence})`;
          context.stroke();
        }
        context.beginPath();
        context.arc(headX, headY, 1.6, 0, Math.PI * 2);
        context.fillStyle = `rgba(255,211,168,${.86 * presence})`;
        context.fill();
      }
    }

    function tick(now) {
      frame = 0;
      if (!canAnimate()) { lastDraw = 0; return; }
      const elapsed = lastDraw ? now - lastDraw : frameInterval;
      if (elapsed >= frameInterval - .5) {
        const seconds = Math.min(elapsed, 100) / 1000;
        phase += seconds * .22;
        const easing = 1 - Math.exp(-seconds * 3.5);
        pointerX += (targetX - pointerX) * easing;
        pointerY += (targetY - pointerY) * easing;
        draw();
        lastDraw = now;
      }
      frame = requestAnimationFrame(tick);
    }

    function sync() {
      if (disposed) return;
      if (!canAnimate()) {
        cancelAnimationFrame(frame);
        frame = 0;
        lastDraw = 0;
        targetX = targetY = 0;
        return;
      }
      if (!frame) {
        lastDraw = 0;
        frame = requestAnimationFrame(tick);
      }
    }

    function resize() {
      if (disposed) return;
      const bounds = canvas.getBoundingClientRect();
      const nextRatio = Math.min(devicePixelRatio || 1, 1.5);
      if (width === bounds.width && height === bounds.height && pixelRatio === nextRatio) return;
      width = bounds.width;
      height = bounds.height;
      pixelRatio = nextRatio;
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      draw();
    }

    function trackPointer(event) {
      if (!canAnimate() || !pointerEnabled.matches) return;
      const bounds = section.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      targetY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    }
    function resetPointer() { targetX = targetY = 0; }

    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      sync();
    }, { threshold: 0 });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(section);
    resizeObserver.observe(section);
    section.addEventListener('pointermove', trackPointer, { passive: true });
    section.addEventListener('pointerleave', resetPointer);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('portfolio-motion', sync);
    window.addEventListener('resize', resize, { passive: true });
    reduced.addEventListener('change', sync);
    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      section.removeEventListener('pointermove', trackPointer);
      section.removeEventListener('pointerleave', resetPointer);
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('portfolio-motion', sync);
      window.removeEventListener('resize', resize);
      reduced.removeEventListener('change', sync);
    };
  }

  window.PortfolioTerrain = Object.freeze({ markup, mount });
})();
