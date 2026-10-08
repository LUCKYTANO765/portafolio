'use strict';

// Decorative video stays independent of the service diagrams and readable content.
(() => {
  const keys = new Set([
    'ciberseguridad', 'inteligencia', 'forense', 'radiofrecuencia', 'web',
    'movil', 'qa', 'automatizacion', 'ia', 'drones', 'comunicacion', 'proteccion',
  ]);
  const base = 'assets/media/area-backgrounds/';

  function markup(key) {
    if (!keys.has(key)) return '';
    return `<div class="area-background" data-area-background="${key}" aria-hidden="true">
      <img class="area-background-poster" src="${base}${key}-poster.webp" width="1920" height="1080" alt="" decoding="async" fetchpriority="low">
      <video class="area-background-video" data-src="${base}${key}.mp4" poster="${base}${key}-poster.webp" width="1920" height="1080" autoplay muted loop playsinline preload="none" tabindex="-1" disablepictureinpicture disableremoteplayback></video>
    </div>`;
  }

  function mount(root) {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    const scenes = [...root.querySelectorAll('[data-area-background]')].map(element => ({
      element, video: element.querySelector('video'), near: false, visible: false,
      loaded: false, pending: false, failed: false, listeners: [],
    })).filter(scene => scene.video && keys.has(scene.element.dataset.areaBackground));
    let disposed = false;

    const stopped = () => reducedMotion.matches || Boolean(connection?.saveData)
      || document.documentElement.classList.contains('motion-paused')
      || document.body.classList.contains('motion-paused');
    const allowed = scene => !disposed && !stopped() && !document.hidden
      && scene.visible && scene.element.isConnected && !scene.failed;

    function syncScene(scene) {
      if (disposed) return;
      const { element, video } = scene;
      element.classList.toggle('is-still', stopped());
      if (scene.near && !scene.loaded && !scene.failed && !stopped() && !document.hidden) {
        scene.loaded = true;
        // Both the key and the path are constructed locally; data-src is descriptive only.
        video.src = `${base}${element.dataset.areaBackground}.mp4`;
        video.load();
      }
      if (!allowed(scene) || !scene.loaded) {
        video.pause();
        return;
      }
      if (!video.paused || scene.pending) return;
      scene.pending = true;
      const request = video.play();
      Promise.resolve(request).then(() => {
        scene.pending = false;
        if (!allowed(scene)) video.pause();
      }, () => {
        scene.pending = false;
        // A browser autoplay restriction leaves the poster visible and the content usable.
        if (video.currentTime === 0) element.classList.remove('has-frame');
      });
    }
    const sync = () => scenes.forEach(syncScene);
    const byElement = new Map(scenes.map(scene => [scene.element, scene]));
    const nearObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const scene = byElement.get(entry.target);
        scene.near = entry.isIntersecting;
        syncScene(scene);
      });
    }, { rootMargin: '300px 0px', threshold: 0 }) : null;
    const visibleObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const scene = byElement.get(entry.target);
        scene.visible = entry.isIntersecting && entry.intersectionRatio > 0;
        syncScene(scene);
      });
    }, { threshold: [0, .05] }) : null;

    scenes.forEach(scene => {
      const { element, video } = scene;
      element.closest('.page-intro')?.classList.add('has-area-background');
      video.muted = true;
      video.defaultMuted = true;
      const events = {
        loadeddata() { element.classList.add('has-frame'); syncScene(scene); },
        playing() {
          if (!allowed(scene)) video.pause();
          else element.classList.add('has-frame');
        },
        error() { scene.failed = true; element.classList.remove('has-frame'); video.pause(); },
      };
      Object.entries(events).forEach(([name, listener]) => {
        video.addEventListener(name, listener);
        scene.listeners.push([name, listener]);
      });
      if (nearObserver) {
        nearObserver.observe(element);
        visibleObserver.observe(element);
      } else {
        scene.near = true;
        scene.visible = true;
      }
    });

    document.addEventListener('visibilitychange', sync);
    window.addEventListener('portfolio-motion', sync);
    reducedMotion.addEventListener('change', sync);
    connection?.addEventListener?.('change', sync);
    sync();

    return () => {
      disposed = true;
      nearObserver?.disconnect();
      visibleObserver?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('portfolio-motion', sync);
      reducedMotion.removeEventListener('change', sync);
      connection?.removeEventListener?.('change', sync);
      scenes.forEach(({ element, video, listeners }) => {
        listeners.forEach(([name, listener]) => video.removeEventListener(name, listener));
        video.pause();
        video.removeAttribute('src');
        video.load();
        element.closest('.page-intro')?.classList.remove('has-area-background');
      });
      byElement.clear();
    };
  }

  window.AreaBackgrounds = Object.freeze({ markup, mount });
})();
