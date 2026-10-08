'use strict';

// Reading is user-paced. No timers, autoplay or simulated investigation results.
(() => {
  let serial = 0;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  function markup(steps, illustration = '') {
    const id = `service-walkthrough-${++serial}`;
    return `<section class="walkthrough" aria-labelledby="${id}-title">
      <header class="walkthrough-heading"><div><p>EL PROCESO, PASO A PASO</p><h3 id="${id}-title">Qué se hace y para qué sirve.</h3></div><span data-step-count></span></header>
      <div class="walkthrough-steps" role="group" aria-label="Elegir paso de la explicación">${steps.map((step, index) => `<button type="button" data-guide-step="${index}" aria-pressed="${index === 0}" aria-controls="${id}-detail"><span aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>${escape(step.title)}</button>`).join('')}</div>
      <div class="walkthrough-body ${illustration ? 'has-visual' : ''}">${illustration}<div class="walkthrough-detail" id="${id}-detail" aria-live="polite" aria-atomic="true"></div></div>
      <div class="walkthrough-controls"><p>Selecciona un paso para ver su explicación y su diagrama.</p><div><button type="button" data-guide-prev aria-label="Paso anterior">← Anterior</button><button type="button" data-guide-next aria-label="Paso siguiente">Siguiente →</button></div></div>
      <details class="walkthrough-all"><summary>Leer el proceso completo</summary><ol>${steps.map(step => `<li><h4>${escape(step.title)}</h4><p>${escape(step.action)}</p><p><strong>Resultado de esta etapa:</strong> ${escape(step.outcome)}</p></li>`).join('')}</ol></details>
    </section>`;
  }
  function mount(scope, steps, onSelect) {
    const root = scope.querySelector('.walkthrough');
    if (!root) return;
    const buttons = [...root.querySelectorAll('[data-guide-step]')];
    const previous = root.querySelector('[data-guide-prev]');
    const next = root.querySelector('[data-guide-next]');
    let active = 0;
    function select(index) {
      active = Math.max(0, Math.min(steps.length - 1, index));
      const step = steps[active];
      buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === active)));
      root.querySelector('[data-step-count]').textContent = `PASO ${active + 1} DE ${steps.length}`;
      root.querySelector('.walkthrough-detail').innerHTML = `<section><h4>Qué hago</h4><p>${escape(step.action)}</p></section><section><h4>Qué obtienes en esta etapa</h4><p>${escape(step.outcome)}</p></section>`;
      previous.disabled = active === 0;
      next.disabled = active === steps.length - 1;
      onSelect?.(active, step);
    }
    buttons.forEach((button, i) => button.addEventListener('click', () => select(i)));
    previous.addEventListener('click', () => select(active - 1));
    next.addEventListener('click', () => select(active + 1));
    select(0);
  }
  window.ServiceWalkthrough = Object.freeze({ markup, mount });
})();
