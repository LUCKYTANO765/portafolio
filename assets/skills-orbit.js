'use strict';
(() => {
  const areas = {
    ciberseguridad: ['Ciberseguridad', 'Revisar sistemas y reforzar la protección de dispositivos y cuentas.'],
    inteligencia: ['Inteligencia digital', 'Investigar fuentes, relacionar información y comprender amenazas.'],
    forense: ['Informática forense', 'Examinar dispositivos y recuperar la información que esté disponible.'],
    radiofrecuencia: ['Radiofrecuencia', 'Estudiar señales, transmisores y registros de antenas.'],
    web: ['Desarrollo web', 'Crear interfaces, servicios y aplicaciones conectadas.'],
    movil: ['Desarrollo móvil', 'Construir aplicaciones para teléfonos con Flutter y Java.'],
    qa: ['QA y pruebas', 'Recorrer aplicaciones y comprobar que sus funciones respondan bien.'],
    automatizacion: ['Automatización', 'Conectar herramientas y procesos con n8n, APIs e IA.'],
    bots: ['Granjas de bots', 'Amplificar campañas políticas, inflar métricas y gestionar proxies.'],
    ia: ['Inteligencia artificial local', 'Configurar modelos y agentes para trabajar en un entorno propio.'],
    drones: ['Drones', 'Ensamblar, configurar y operar equipos de vuelo.'],
    comunicacion: ['Comunicación digital', 'Estrategia política, campañas electorales y aprobación de gobierno.'],
    proteccion: ['Protección personal', 'Cuidar dispositivos, conversaciones e información privada.'],
  };
  function markup() {
    return `<figure class="skills-orbit" aria-labelledby="orbit-caption-title">
      <div class="orbit-stage">${window.SkillsOrbitArt || ''}</div>
      <figcaption class="orbit-caption"><span class="orbit-caption-kicker">INGENIERÍA / CONEXIONES</span><strong id="orbit-caption-title">Explora mis especialidades.</strong><p id="orbit-caption-copy">Selecciona un símbolo para conocer el trabajo de cada área.</p></figcaption>
      <div class="orbit-mobile-links" aria-label="Accesos a las especialidades">${Object.entries(areas).map(([key, [label]]) => `<a href="#${key}">${label} <span aria-hidden="true">↗</span></a>`).join('')}</div>
    </figure>`;
  }
  function mount(root) {
    const orbit = root.querySelector('.skills-orbit');
    if (!orbit) return () => {};
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const title = orbit.querySelector('#orbit-caption-title');
    const copy = orbit.querySelector('#orbit-caption-copy');
    const stage = orbit.querySelector('.orbit-stage');
    const nodes = [...orbit.querySelectorAll('.orbit-node')];
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
    let proximityFrame = 0, cursor = null;
    let visible = false;
    function sync() {
      const stopped = !visible || document.hidden || reduced.matches || document.documentElement.classList.contains('motion-paused');
      orbit.classList.toggle('orbit-still', stopped);
    }
    function select(link) {
      const info = link && areas[link.dataset.area];
      if (!info) return;
      nodes.forEach(node => node.classList.toggle('is-selected', node === link));
      title.textContent = info[0]; copy.textContent = info[1];
    }
    function highlight(event) { select(event.target.closest('.orbit-node')); }
    function reset() {
      nodes.forEach(node => node.classList.remove('is-near'));
      if (orbit.contains(document.activeElement)) return;
      nodes.forEach(node => node.classList.remove('is-selected'));
      title.textContent = 'Explora mis especialidades.';
      copy.textContent = 'Selecciona un símbolo para conocer el trabajo de cada área.';
    }
    function proximity() {
      proximityFrame = 0;
      if (!cursor) return;
      const radius = Math.min(86, Math.max(40, stage.clientWidth * .105));
      let nearest = null, distance = radius;
      nodes.forEach(node => {
        const box = node.querySelector('.orbit-node-hit').getBoundingClientRect();
        const delta = Math.hypot(cursor.x - box.x - box.width / 2, cursor.y - box.y - box.height / 2);
        if (delta < distance) { distance = delta; nearest = node; }
      });
      nodes.forEach(node => node.classList.toggle('is-near', node === nearest));
      if (nearest) select(nearest); else reset();
    }
    function track(event) {
      if (!finePointer.matches || event.pointerType === 'touch') return;
      cursor = { x: event.clientX, y: event.clientY };
      if (!proximityFrame) proximityFrame = requestAnimationFrame(proximity);
    }
    function leave() { cursor = null; cancelAnimationFrame(proximityFrame); proximityFrame = 0; reset(); }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .02 });
    observer.observe(orbit);
    orbit.addEventListener('pointerover', highlight);
    orbit.addEventListener('focusin', highlight);
    orbit.addEventListener('pointerleave', reset);
    orbit.addEventListener('focusout', reset);
    stage.addEventListener('pointermove', track, { passive: true });
    stage.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('portfolio-motion', sync);
    reduced.addEventListener('change', sync);
    sync();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(proximityFrame);
      stage.removeEventListener('pointermove', track);
      stage.removeEventListener('pointerleave', leave);
      orbit.removeEventListener('pointerover', highlight);
      orbit.removeEventListener('focusin', highlight);
      orbit.removeEventListener('pointerleave', reset);
      orbit.removeEventListener('focusout', reset);
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('portfolio-motion', sync);
      reduced.removeEventListener('change', sync);
    };
  }
  window.SkillsOrbit = Object.freeze({ markup, mount });
})();
