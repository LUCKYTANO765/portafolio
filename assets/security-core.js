/* Security Core — self-contained, progressively enhanced canvas artwork. */
(() => {
  'use strict';

  const boot = () => {
    const canvas = document.getElementById('security-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    window.SecurityCore?.destroy();

    const TAU = Math.PI * 2;
    const CYAN = '102, 226, 244';
    const LIME = '197, 251, 90';
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    let width = 0;
    let height = 0;
    let radius = 0;
    let frame = 0;
    let lastTime = 0;
    let time = 13.2;
    let visible = true;
    let destroyed = false;
    let userPaused = Boolean(window.portfolioMotionPaused);
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const normalize = (v) => {
      const length = Math.hypot(...v);
      return v.map((value) => value / length);
    };

    // A subdivided icosahedron creates an evenly distributed network topology.
    const golden = (1 + Math.sqrt(5)) / 2;
    const vertices = [
      [-1, golden, 0], [1, golden, 0], [-1, -golden, 0], [1, -golden, 0],
      [0, -1, golden], [0, 1, golden], [0, -1, -golden], [0, 1, -golden],
      [golden, 0, -1], [golden, 0, 1], [-golden, 0, -1], [-golden, 0, 1],
    ].map(normalize);
    let faces = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
    ];
    for (let level = 0; level < 2; level += 1) {
      const cache = new Map();
      const midpoint = (a, b) => {
        const key = a < b ? `${a}:${b}` : `${b}:${a}`;
        if (cache.has(key)) return cache.get(key);
        const index = vertices.length;
        vertices.push(normalize(vertices[a].map((value, axis) => value + vertices[b][axis])));
        cache.set(key, index);
        return index;
      };
      faces = faces.flatMap(([a, b, c]) => {
        const ab = midpoint(a, b);
        const bc = midpoint(b, c);
        const ca = midpoint(c, a);
        return [[a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]];
      });
    }
    const edgeMap = new Map();
    faces.forEach(([a, b, c]) => {
      [[a, b], [b, c], [c, a]].forEach(([start, end]) => {
        const key = start < end ? `${start}:${end}` : `${end}:${start}`;
        edgeMap.set(key, [start, end]);
      });
    });
    const edges = [...edgeMap.values()];
    const packets = Array.from({ length: 12 }, (_, index) => ({
      edge: (index * 43 + 17) % edges.length,
      offset: index * 0.083,
      speed: 0.15 + (index % 4) * 0.035,
      lime: index % 4 === 0,
    }));
    const stars = Array.from({ length: 38 }, (_, index) => ({
      x: ((index * 37.73 + 13) % 100) / 100,
      y: ((index * 61.19 + 29) % 100) / 100,
      size: index % 7 === 0 ? 1.4 : 0.65,
      phase: index * 0.7,
    }));

    const canAnimate = () => !destroyed && !document.hidden && visible && !userPaused && !motionQuery.matches;

    const transform = ([x, y, z], yaw, pitch) => {
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);
      const nextX = x * cosY + z * sinY;
      const nextZ = -x * sinY + z * cosY;
      return [nextX, y * cosX - nextZ * sinX, y * sinX + nextZ * cosX];
    };

    const project = ([x, y, z]) => {
      const scale = 1 / (1 - z * 0.085);
      return {
        x: width * 0.5 + x * radius * scale,
        y: height * 0.49 + y * radius * scale,
        z,
        scale,
      };
    };

    const line = (a, b, color, alpha, strokeWidth = 0.7) => {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = `rgba(${color}, ${alpha})`;
      ctx.stroke();
    };

    const glowDot = (point, size, color, alpha) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, size * 3.8, 0, TAU);
      ctx.fillStyle = `rgba(${color}, ${alpha * 0.055})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(point.x, point.y, size * 1.9, 0, TAU);
      ctx.fillStyle = `rgba(${color}, ${alpha * 0.15})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(point.x, point.y, size, 0, TAU);
      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.fill();
    };

    const orbitPoint = (angle, index) => {
      const orbitRadius = index === 0 ? 1.3 : 1.21;
      const point = [Math.cos(angle) * orbitRadius, Math.sin(angle) * orbitRadius, 0];
      const tilt = index === 0 ? 1.08 : -0.77;
      const [x, y, z] = transform(point, 0, tilt);
      const rotation = index === 0 ? -0.48 : 0.77;
      return project([
        x * Math.cos(rotation) - y * Math.sin(rotation),
        x * Math.sin(rotation) + y * Math.cos(rotation),
        z,
      ]);
    };

    const drawOrbits = (front) => {
      for (let index = 0; index < 2; index += 1) {
        const color = index === 0 ? LIME : CYAN;
        const total = 160;
        let previous = orbitPoint(0, index);
        for (let step = 1; step <= total; step += 1) {
          const current = orbitPoint((step / total) * TAU, index);
          if ((current.z >= 0) === front) {
            line(previous, current, color, front ? 0.37 : 0.095, 0.7);
          }
          previous = current;
        }
        // A soft comet follows each orbital route; its tail is geometry, not blur.
        const angle = time * (index === 0 ? 0.24 : -0.17) + index * 2;
        for (let tail = 18; tail >= 0; tail -= 1) {
          const direction = index === 0 ? 1 : -1;
          const currentAngle = angle - direction * tail * 0.011;
          const current = orbitPoint(currentAngle, index);
          if ((current.z >= 0) !== front) continue;
          const next = orbitPoint(currentAngle + direction * 0.013, index);
          line(current, next, color, (1 - tail / 19) * 0.65, 1.6);
        }
        const head = orbitPoint(angle + (index === 0 ? 0.012 : -0.012), index);
        if ((head.z >= 0) === front) glowDot(head, 2.5, color, 0.95);
      }
    };

    const draw = () => {
      if (!width || !height || destroyed) return;
      ctx.clearRect(0, 0, width, height);
      const centerX = width * 0.5;
      const centerY = height * 0.49;

      // Keep the atmosphere restrained so the actual network remains crisp.
      const atmosphere = ctx.createRadialGradient(centerX, centerY, radius * 0.35, centerX, centerY, radius * 1.5);
      atmosphere.addColorStop(0, 'rgba(29, 145, 150, 0.025)');
      atmosphere.addColorStop(0.5, 'rgba(34, 177, 179, 0.045)');
      atmosphere.addColorStop(1, 'rgba(34, 177, 179, 0)');
      ctx.fillStyle = atmosphere;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        const x = star.x * width;
        const y = star.y * height;
        const distance = Math.hypot((x - centerX) / radius, (y - centerY) / radius);
        if (distance < 1.1 || distance > 1.7) return;
        ctx.fillStyle = `rgba(${CYAN}, ${0.15 + Math.sin(time * 0.4 + star.phase) * 0.08})`;
        ctx.fillRect(x, y, star.size, star.size);
      });

      // Tiny instrumentation marks frame the globe without competing with the HUD.
      ctx.strokeStyle = 'rgba(137, 188, 191, 0.18)';
      ctx.lineWidth = 0.6;
      for (let index = 0; index < 60; index += 1) {
        const angle = (index / 60) * TAU;
        if (index % 15 < 4 || index % 15 > 11) continue;
        const major = index % 5 === 0;
        const inner = radius * 1.43;
        const outer = inner + (major ? 7 : 3);
        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(angle) * inner, centerY + Math.sin(angle) * inner);
        ctx.lineTo(centerX + Math.cos(angle) * outer, centerY + Math.sin(angle) * outer);
        ctx.stroke();
      }

      drawOrbits(false);

      const yaw = time * 0.083 + pointer.x * 0.17;
      const pitch = -0.22 + Math.sin(time * 0.08) * 0.09 + pointer.y * 0.1;
      const points = vertices.map((vertex) => project(transform(vertex, yaw, pitch)));
      const edgeDepth = edges.map(([start, end]) => ({
        start: points[start],
        end: points[end],
        depth: (points[start].z + points[end].z) * 0.5,
      })).sort((a, b) => a.depth - b.depth);

      // Rear hemisphere is intentionally faint: the globe reads as volume.
      edgeDepth.filter((edge) => edge.depth < 0).forEach(({ start, end, depth }) => {
        line(start, end, CYAN, 0.025 + (depth + 1) * 0.045, 0.6);
      });

      // Sparse translucent triangular facets suggest encrypted network sectors.
      faces.forEach((face, index) => {
        if (index % 13 !== 0) return;
        const [a, b, c] = face.map((vertex) => points[vertex]);
        const depth = (a.z + b.z + c.z) / 3;
        if (depth < 0.18) return;
        const shimmer = 0.6 + Math.sin(time * 0.5 + index) * 0.4;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(c.x, c.y);
        ctx.closePath();
        ctx.fillStyle = `rgba(${index % 3 === 0 ? LIME : CYAN}, ${0.018 + shimmer * depth * 0.048})`;
        ctx.fill();
      });

      edgeDepth.filter((edge) => edge.depth >= 0).forEach(({ start, end, depth }) => {
        line(start, end, CYAN, 0.11 + Math.pow(depth, 1.7) * 0.27, 0.65 + depth * 0.25);
      });

      points.forEach((point, index) => {
        if (point.z < -0.15) return;
        const accent = index % 19 === 0;
        const alpha = 0.23 + Math.max(0, point.z) * 0.65;
        if (accent) {
          const pulse = 1 + Math.sin(time * 1.2 + index) * 0.15;
          glowDot(point, (1.7 + point.z * 0.55) * pulse, LIME, alpha);
        } else {
          ctx.beginPath();
          ctx.arc(point.x, point.y, (0.7 + Math.max(0, point.z) * 0.6) * point.scale, 0, TAU);
          ctx.fillStyle = `rgba(${CYAN}, ${alpha})`;
          ctx.fill();
        }
      });

      packets.forEach((packet) => {
        const progress = (time * packet.speed + packet.offset) % 1;
        const [startIndex, endIndex] = edges[packet.edge];
        const start = points[startIndex];
        const end = points[endIndex];
        const depth = start.z + (end.z - start.z) * progress;
        if (depth < 0) return;
        const point = {
          x: start.x + (end.x - start.x) * progress,
          y: start.y + (end.y - start.y) * progress,
        };
        const tail = Math.max(0, progress - 0.32);
        const tailPoint = {
          x: start.x + (end.x - start.x) * tail,
          y: start.y + (end.y - start.y) * tail,
        };
        const color = packet.lime ? LIME : CYAN;
        const envelope = Math.sin(progress * Math.PI);
        line(tailPoint, point, color, envelope * (0.35 + depth * 0.5), 1.25);
        glowDot(point, 1.6, color, envelope * (0.5 + depth * 0.5));
      });

      drawOrbits(true);
    };

    const tick = (timestamp) => {
      frame = 0;
      if (!canAnimate()) return;
      const delta = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0;
      lastTime = timestamp;
      time += delta;
      const ease = 1 - Math.exp(-delta * 3.5);
      pointer.x += (pointer.targetX - pointer.x) * ease;
      pointer.y += (pointer.targetY - pointer.y) * ease;
      draw();
      frame = window.requestAnimationFrame(tick);
    };

    const syncPlayback = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      if (canAnimate()) frame = window.requestAnimationFrame(tick);
      else if (visible && !document.hidden) draw();
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (!width || !height) return;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      radius = Math.min(width * 0.315, height * 0.315);
      if (visible && !document.hidden) draw();
    };

    const onPointerMove = (event) => {
      if (!finePointer.matches || !canAnimate()) return;
      const bounds = canvas.getBoundingClientRect();
      pointer.targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };
    const onMotion = (event) => {
      if (typeof event.detail?.paused !== 'boolean') return;
      userPaused = event.detail.paused;
      syncPlayback();
    };

    const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(canvas);
    const intersectionObserver = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      }, { threshold: 0.01 })
      : null;
    intersectionObserver?.observe(canvas);
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('portfolio:motion', onMotion);
    document.addEventListener('visibilitychange', syncPlayback);
    motionQuery.addEventListener('change', syncPlayback);

    window.SecurityCore = {
      destroy() {
        destroyed = true;
        if (frame) window.cancelAnimationFrame(frame);
        resizeObserver?.disconnect();
        intersectionObserver?.disconnect();
        canvas.removeEventListener('pointermove', onPointerMove);
        canvas.removeEventListener('pointerleave', onPointerLeave);
        window.removeEventListener('resize', resize);
        window.removeEventListener('portfolio:motion', onMotion);
        document.removeEventListener('visibilitychange', syncPlayback);
        motionQuery.removeEventListener('change', syncPlayback);
      },
    };

    resize();
    syncPlayback();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
