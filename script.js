/* ============================================================
   PORTAFOLIO — Premium Edition · interactions
   ============================================================ */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- PROJECT DATA ---------- */
  const projects = [
    { cat: 'fullstack', tag: 'web', tagEs: 'Full-Stack', tagEn: 'Full-Stack', title: 'SuperApuesta365 Platform',
      es: 'Plataforma virtual de apuestas deportivas (pnpm monorepo, React, Express, Prisma y Go) con ingesta de datos en tiempo real.',
      en: 'Virtual sports betting platform (pnpm monorepo, React, Express, Prisma, Go) with real-time data ingestion.',
      techs: ['React', 'Go', 'Express', 'Prisma', 'TypeScript'] },
    { cat: 'backend', tag: 'cyber', tagEs: 'Backend Go', tagEn: 'Go Backend', title: 'Go Sports Ingestion Worker',
      es: 'Servicio autónomo en Go para procesar y consumir datos deportivos externos a través de cronjobs y base de datos PostgreSQL.',
      en: 'Autonomous Go service to process and consume external sports data using cronjobs and PostgreSQL database.',
      techs: ['Go', 'sqlc', 'PostgreSQL', 'Docker'] },
    { cat: 'frontend', tag: 'ai', tagEs: 'Frontend React', tagEn: 'React Frontend', title: 'Interactive Casino Games',
      es: 'Suite interactiva de minijuegos y Blackjack con lógica de probabilidad y animaciones fluidas en React.',
      en: 'Interactive suite of mini-games and Blackjack featuring probability logic and smooth React animations.',
      techs: ['React', 'Zustand', 'TypeScript', 'CSS3'] },
    { cat: 'devops', tag: 'qa', tagEs: 'Pruebas E2E', tagEn: 'E2E Testing', title: 'E2E & Unit Test Pipeline',
      es: 'Suite de pruebas automatizadas unitarias (Vitest) y E2E (Playwright) integradas en flujos de CI/CD para validar transacciones.',
      en: 'Automated unit (Vitest) and E2E (Playwright) test suite integrated into CI/CD workflows to validate transactions.',
      techs: ['Playwright', 'Vitest', 'GitHub Actions', 'TDD'] },
    { cat: 'backend', tag: 'cyber', tagEs: 'Tiempo Real', tagEn: 'Real-Time', title: 'Real-time Live Odds Engine',
      es: 'Motor de eventos en tiempo real usando Server-Sent Events (SSE) para empujar cuotas y estados en vivo a miles de clientes.',
      en: 'Real-time event engine using Server-Sent Events (SSE) to push live odds and statuses to thousands of clients.',
      techs: ['Node.js', 'Express', 'SSE', 'React'] },
    { cat: 'devops', tag: 'ai', tagEs: 'DevOps / IA', tagEn: 'DevOps / AI', title: 'AI Log & Audit Assistant',
      es: 'Integración local de LLMs privados para automatizar el análisis de registros, auditorías de consultas SQL y depuración.',
      en: 'Local integration of private LLMs to automate log analysis, SQL query auditing, and debugging.',
      techs: ['Python', 'Local LLMs', 'SQL Audits', 'n8n'] },
  ];

  const ghIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>';

  let lang = 'es';

  function renderProjects() {
    const grid = $('#projectGrid');
    grid.innerHTML = projects.map((p) => `
      <article class="glass spot project reveal in" data-cat="${p.cat}">
        <div class="meta">
          <span class="tag tag-${p.tag}">${lang === 'es' ? p.tagEs : p.tagEn}</span>
          <a class="gh" href="https://github.com/LUCKYTANO765" target="_blank" rel="noopener">${ghIcon}</a>
        </div>
        <h3>${p.title}</h3>
        <p>${lang === 'es' ? p.es : p.en}</p>
        <div class="techs">${p.techs.map((t) => `<span class="tech">${t}</span>`).join('')}</div>
      </article>`).join('');
    bindSpotlight();
    applyFilter(currentFilter);
  }

  /* ---------- FILTERS ---------- */
  let currentFilter = 'all';
  function applyFilter(f) {
    currentFilter = f;
    $$('.project').forEach((el) => {
      el.classList.toggle('hide', !(f === 'all' || el.dataset.cat === f));
    });
  }
  $$('.filter').forEach((b) => b.addEventListener('click', () => {
    $$('.filter').forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
    applyFilter(b.dataset.filter);
  }));

  /* ---------- LANGUAGE ---------- */
  function setLang(l) {
    lang = l;
    document.documentElement.lang = l;
    $$('[data-en]').forEach((el) => {
      if (!el.dataset.es) el.dataset.es = el.innerHTML;
      el.innerHTML = l === 'en' ? el.dataset.en : el.dataset.es;
    });
    $$('[data-en-ph]').forEach((el) => {
      if (!el.dataset.esPh) el.dataset.esPh = el.placeholder;
      el.placeholder = l === 'en' ? el.dataset.enPh : el.dataset.esPh;
    });
    $('#langBtn').textContent = l === 'es' ? 'EN' : 'ES';
    renderProjects();
  }
  $('#langBtn').addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es'));

  /* ---------- THEME ---------- */
  const themeBtn = $('#themeBtn');
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeBtn.textContent = document.body.classList.contains('light') ? '☾' : '☼';
  });

  /* ---------- HEADER + SCROLL PROGRESS + ACTIVE NAV ---------- */
  const header = $('#header'), bar = $('#scrollBar');
  const sections = $$('section[id]');
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    let cur = 'inicio';
    sections.forEach((s) => { if (y >= s.offsetTop - 140) cur = s.id; });
    $$('.nav-link').forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- MOBILE MENU ---------- */
  const nav = $('#navLinks');
  $('#burger').addEventListener('click', () => nav.classList.toggle('open'));
  $$('.nav-link').forEach((l) => l.addEventListener('click', () => nav.classList.remove('open')));

  /* ---------- REVEAL · SKILL FILL · COUNT-UP (scroll-driven) ---------- */
  // Scroll-position based so it works reliably everywhere (no IntersectionObserver dependency).
  function inView(el, frac) {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.height === 0 && r.width === 0) return false;
    const need = (frac || 0.15) * Math.min(r.height, vh);
    return r.top < vh - need && r.bottom > need;
  }

  function fillSkill(el) {
    if (el._filled) return; el._filled = true;
    el.style.width = el.dataset.p + '%';
  }

  function countUp(el) {
    if (el._counted) return; el._counted = true;
    const target = +el.dataset.count, suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = target + suf; el._done = true; return; }
    const dur = 1400, t0 = performance.now();
    const step = (t) => {
      const k = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round((1 - Math.pow(1 - k, 3)) * target) + suf;
      if (k < 1) requestAnimationFrame(step); else el._done = true;
    };
    requestAnimationFrame(step);
  }
  // Hard fallback: guarantee final numbers even if rAF is throttled/paused.
  function settleCounts() {
    $$('[data-count]').forEach((el) => { if (!el._done) { el.textContent = el.dataset.count + (el.dataset.suffix || ''); el._done = true; } });
  }

  function checkReveals() {
    $$('.reveal').forEach((el) => {
      if (!el.classList.contains('in') && inView(el, 0.12)) {
        el.classList.add('in');
        $$('.skill-fill', el).forEach(fillSkill);
      }
    });
    $$('.skill-fill').forEach((f) => { if (inView(f, 0.2)) fillSkill(f); });
    $$('[data-count]').forEach((el) => { if (inView(el, 0.4)) countUp(el); });
  }
  window.addEventListener('scroll', checkReveals, { passive: true });
  window.addEventListener('resize', checkReveals);
  document.addEventListener('scroll', checkReveals, { passive: true, capture: true });
  // Guarantee visibility: reveal everything shortly after load even if no scroll
  // event ever fires (e.g. embedded/full-height iframe contexts).
  function revealAll() {
    $$('.reveal:not(.in)').forEach((el) => el.classList.add('in'));
    $$('.skill-fill').forEach(fillSkill);
    $$('[data-count]').forEach(countUp);
  }
  window.addEventListener('load', () => { checkReveals(); setTimeout(revealAll, 1400); });
  setTimeout(revealAll, 2200);
  setTimeout(settleCounts, 3000);

  /* ---------- CURSOR GLOW ---------- */
  const glow = $('#cursorGlow');
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    let gx = innerWidth / 2, gy = innerHeight / 2, cx = gx, cy = gy;
    window.addEventListener('mousemove', (e) => { gx = e.clientX; gy = e.clientY; });
    (function loop() {
      cx += (gx - cx) * 0.12; cy += (gy - cy) * 0.12;
      glow.style.left = cx + 'px'; glow.style.top = cy + 'px';
      requestAnimationFrame(loop);
    })();
  } else { glow.style.display = 'none'; }

  /* ---------- CARD SPOTLIGHT ---------- */
  function bindSpotlight() {
    $$('.spot').forEach((card) => {
      if (card._spot) return; card._spot = true;
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }
  bindSpotlight();

  /* ---------- MAGNETIC BUTTONS ---------- */
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    $$('[data-magnetic]').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2, my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- CONTACT FORM ---------- */
  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    $('#formStatus').classList.add('show');
    e.target.reset();
    setTimeout(() => $('#formStatus').classList.remove('show'), 4500);
  });

  /* ---------- INIT ---------- */
  renderProjects();
  checkReveals();
  requestAnimationFrame(checkReveals);
})();
