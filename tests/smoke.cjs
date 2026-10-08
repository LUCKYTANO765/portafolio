const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

let playwright;
for (const candidate of [process.env.PLAYWRIGHT_MODULE, 'playwright', path.join(process.env.USERPROFILE || '', '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')].filter(Boolean)) {
  try { playwright = require(candidate); break; } catch { /* Try the next runtime. */ }
}
if (!playwright) throw new Error('Playwright is required. Set PLAYWRIGHT_MODULE to its installation.');
const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.mp4': 'video/mp4', '.webp': 'image/webp' };
const server = http.createServer((request, response) => {
  const file = path.resolve(root, '.' + new URL(request.url, 'http://localhost').pathname.replace(/^\/$/, '/index.html'));
  if (!file.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
  fs.readFile(file, (error, data) => {
    if (error) { response.writeHead(404).end(); return; }
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }); response.end(data);
  });
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const executablePath = [process.env.BROWSER_EXECUTABLE, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(Boolean).find(fs.existsSync);
  const browser = await playwright.chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.url().startsWith(origin) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto(origin, { waitUntil: 'networkidle' });
    const pages = { inicio: 'Vista general', ciberseguridad: 'Ciberseguridad', inteligencia: 'Inteligencia digital', proteccion: 'Protección personal', forense: 'Informática forense', radiofrecuencia: 'Radiofrecuencia', drones: 'Drones', web: 'Desarrollo web', movil: 'Desarrollo móvil', qa: 'QA & Testing', automatizacion: 'Automatización', bots: 'Granjas de bots', ia: 'IA local', comunicacion: 'Comunicación digital', proyectos: 'Archivo de proyectos', perfil: 'Sobre mí', contacto: 'Contacto' };
    for (const [route, label] of Object.entries(pages)) {
      await page.evaluate(route => { location.hash = route; }, route);
      await page.waitForFunction(label => document.querySelector('#breadcrumb').textContent === label, label);
      assert.equal(await page.locator('h1').count(), 1, `One heading for ${route}`);
      assert.equal(await page.locator('[aria-current="page"]').getAttribute('data-page'), route);
      for (const width of [1440, 1024, 768, 390, 360, 320]) {
        await page.setViewportSize({ width, height: 900 });
        const overflow = await page.evaluate(() => ({ width: innerWidth, document: document.documentElement.scrollWidth }));
        assert.ok(overflow.document <= width + 1, `${route}: horizontal overflow at ${width}px: ${JSON.stringify(overflow)}`);
      }
    }
    console.log('PASS all 17 pages at 6 screen widths (320–1440px)');

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${origin}/#ciberseguridad`);
    await page.getByRole('tab', { name: 'OSINT', exact: true }).click();
    assert.match(await page.getByRole('tabpanel').textContent(), /Conectar información dispersa/);
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.getByRole('tab', { name: 'Seguridad móvil' }).getAttribute('aria-selected'), 'true');
    assert.match(await page.getByRole('tabpanel').textContent(), /GrapheneOS/);
    await page.keyboard.press('Home');
    assert.equal(await page.getByRole('tab', { name: 'Pentesting' }).getAttribute('aria-selected'), 'true');
    for (const route of ['web', 'movil', 'qa', 'automatizacion', 'bots', 'ia', 'drones', 'radiofrecuencia', 'inteligencia', 'comunicacion']) {
      await page.locator(`[data-page="${route}"]`).click();
      await page.waitForFunction(route => document.querySelector(`[data-page="${route}"]`).getAttribute('aria-current') === 'page', route);
      assert.equal(await page.getByRole('tab').count(), route === 'bots' ? 2 : 3);
      await page.getByRole('tab').last().click();
      const activeId = await page.getByRole('tab').last().getAttribute('id');
      assert.equal(await page.getByRole('tabpanel').getAttribute('aria-labelledby'), activeId);
      assert.ok((await page.getByRole('tabpanel').textContent()).length > 100);
    }
    console.log('PASS independent disciplines and keyboard-operated method tabs');

    await page.goto(`${origin}/#forense`);
    assert.equal(await page.getByRole('tab').count(), 5);
    for (const tab of ['Forense móvil', 'WhatsApp', 'Computadoras', 'Recuperación', 'Comunicaciones']) {
      await page.getByRole('tab', { name: tab, exact: true }).click();
      assert.equal(await page.getByRole('tab', { name: tab, exact: true }).getAttribute('aria-selected'), 'true');
      assert.ok((await page.getByRole('tabpanel').textContent()).length > 100);
    }
    await page.setViewportSize({ width: 320, height: 740 });
    await page.getByRole('tab', { name: 'Forense móvil', exact: true }).click();
    await page.keyboard.press('End');
    assert.equal(await page.getByRole('tab', { name: 'Comunicaciones', exact: true }).getAttribute('aria-selected'), 'true');
    const lastTab = await page.getByRole('tab', { name: 'Comunicaciones', exact: true }).boundingBox();
    assert.ok(lastTab.x >= 0 && lastTab.x + lastTab.width <= 321, `Last forensic tab is reachable on mobile: ${JSON.stringify(lastTab)}`);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.locator('.area-crosslink').filter({ hasText: 'GrapheneOS' }).click();
    await page.waitForFunction(() => document.querySelector('#breadcrumb').textContent === 'Ciberseguridad');
    assert.equal(await page.getByRole('tab', { name: 'Seguridad móvil' }).getAttribute('aria-selected'), 'true');
    assert.equal(await page.getByRole('link', { name: 'Conocer GrapheneOS' }).getAttribute('href'), 'https://grapheneos.org/');
    await page.reload();
    assert.equal(await page.getByRole('tab', { name: 'Seguridad móvil' }).getAttribute('aria-selected'), 'true');
    await page.goto(`${origin}/#proyectos?area=drones`);
    assert.equal(await page.locator('.project-row').count(), 0);
    assert.ok(await page.locator('.empty-state').isVisible());
    await page.goto(`${origin}/#inicio`);
    assert.equal(await page.locator('.discipline-row').count(), 12);
    assert.equal(await page.locator('.discipline-group').count(), 5);
    assert.equal(await page.locator('.nav-label').count(), 5);
    assert.equal(await page.locator('.discipline-row[href="#bots"]').count(), 1);
    assert.equal(await page.locator('.orbit-node[data-area="bots"]').count(), 1);
    for (const focus of ['granjas-de-bots', 'proxies']) {
      await page.goto(origin + '/#automatizacion?enfoque=' + focus);
      await page.waitForFunction(() => document.querySelector('#breadcrumb').textContent === 'Granjas de bots');
      assert.ok(page.url().endsWith('#bots?enfoque=' + focus));
      assert.equal(await page.getByRole('tab').count(), 2);
      assert.match(await page.locator('[role="tab"][aria-selected="true"]').innerText(), focus === 'proxies' ? /Proxies/ : /Granjas de bots/);
    }
    await page.goto(origin + '/#perfil');
    assert.equal(await page.locator('[data-profile-area="bots"]').count(), 1);
    assert.equal(await page.locator('[data-profile-area="bots"] a[href="#bots?enfoque=proxies"]').count(), 1);
    console.log('PASS separate bots section, home links, profile and legacy redirects');
    console.log('PASS forensic capabilities, GrapheneOS, drones and mobile tab navigation');
    await page.goto(`${origin}/#forense?enfoque=antenas`);
    await page.waitForFunction(() => document.querySelector('#breadcrumb').textContent === 'Radiofrecuencia');
    assert.equal(await page.getByRole('tab', { name: 'Antenas', exact: true }).getAttribute('aria-selected'), 'true');
    assert.match(page.url(), /#radiofrecuencia\?enfoque=antenas$/);
    await page.getByRole('tab', { name: 'Jammers', exact: true }).click();
    assert.match(await page.getByRole('tabpanel').textContent(), /Pruebas controladas de bloqueo/);
    await page.getByRole('tab', { name: 'Detección RF', exact: true }).click();
    assert.match(await page.getByRole('tabpanel').textContent(), /transmisores/);
    assert.match(await page.getByRole('tabpanel').textContent(), /no identifica quién graba/);
    assert.equal(await page.locator('.method-diagram svg').count(), 1);
    await page.reload();
    assert.equal(await page.getByRole('tab', { name: 'Detección RF', exact: true }).getAttribute('aria-selected'), 'true');
    console.log('PASS RF capabilities, animations, direct links and antenna redirect');
    await page.goto(`${origin}/#forense?enfoque=whatsapp`);
    assert.equal(await page.getByRole('tab', { name: 'WhatsApp', exact: true }).getAttribute('aria-selected'), 'true');
    assert.match(await page.getByRole('tabpanel').textContent(), /copias de seguridad accesibles con autorización/);
    await page.getByRole('tab', { name: 'Computadoras', exact: true }).click();
    assert.match(await page.getByRole('tabpanel').textContent(), /archivos, registros y datos de aplicaciones/);
    await page.locator('.area-crosslink').filter({ hasText: 'Desbloqueo autorizado' }).click();
    await page.waitForFunction(() => document.querySelector('#breadcrumb').textContent === 'Ciberseguridad');
    assert.equal(await page.getByRole('tab', { name: 'Recuperar acceso', exact: true }).getAttribute('aria-selected'), 'true');
    assert.match(await page.getByRole('tabpanel').textContent(), /teléfonos y computadoras propios o con autorización/);
    await page.goto(`${origin}/#inteligencia?enfoque=contraespionaje`);
    assert.equal(await page.getByRole('tab', { name: 'Contraespionaje', exact: true }).getAttribute('aria-selected'), 'true');
    assert.match(await page.getByRole('tabpanel').textContent(), /software espía/);
    assert.equal(await page.locator('.method-diagram svg').count(), 1);
    await page.reload();
    assert.equal(await page.getByRole('tab', { name: 'Contraespionaje', exact: true }).getAttribute('aria-selected'), 'true');
    console.log('PASS messaging, computer forensics, access recovery and counterintelligence pages');

    await page.locator('.protection-entry').click();
    await page.waitForFunction(() => document.querySelector('#breadcrumb').textContent === 'Protección personal');
    const serviceNames = ['equipos', 'conversaciones', 'ubicacion', 'reuniones', 'filtraciones', 'incidentes'];
    assert.equal(await page.getByRole('tab').count(), 6);
    for (const [index, service] of serviceNames.entries()) {
      await page.getByRole('tab').nth(index).click();
      assert.match(page.url(), new RegExp(`#proteccion\\?servicio=${service}$`));
      const panel = page.getByRole('tabpanel');
      assert.equal(await panel.getByRole('heading', { name: 'Cómo te ayudo', exact: true }).count(), 1);
      assert.equal(await panel.getByRole('heading', { name: 'Qué recibes', exact: true }).count(), 1);
      assert.equal(await panel.getByRole('img').count(), 1);
      const semantics = await panel.locator('svg').evaluate(svg => ({
        title: svg.querySelector('title')?.textContent,
        description: svg.querySelector('desc')?.textContent,
        labelledBy: (svg.getAttribute('aria-labelledby') || '').split(' ').every(id => document.getElementById(id)),
        parseError: !!new DOMParser().parseFromString(svg.outerHTML, 'image/svg+xml').querySelector('parsererror'),
      }));
      assert.ok(semantics.title && semantics.description && semantics.labelledBy && !semantics.parseError, `Accessible valid scene ${service}`);
      assert.ok((await panel.locator('figcaption').textContent()).length > 70);
      assert.equal(await panel.locator('[data-guide-step]').count(), 4);
      for (let stage = 0; stage < 4; stage++) {
        await panel.locator(`[data-guide-step="${stage}"]`).click();
        assert.equal(await panel.locator(`[data-guide-step="${stage}"]`).getAttribute('aria-pressed'), 'true');
        assert.equal(await panel.locator('[data-visual-step]').textContent(), `PASO ${stage + 1} / 4`);
        assert.match(await panel.locator('svg title').textContent(), new RegExp(`paso ${stage + 1}$`));
        assert.ok((await panel.locator('.walkthrough-detail').textContent()).length > 150);
      }
      assert.equal(await panel.locator('[data-guide-next]').isDisabled(), true);
      await panel.locator('[data-guide-prev]').click();
      assert.equal(await panel.locator('[data-guide-step="2"]').getAttribute('aria-pressed'), 'true');
      await panel.locator('.walkthrough-all summary').click();
      assert.equal(await panel.locator('.walkthrough-all li').count(), 4);
      await panel.locator('.walkthrough-all summary').click();
      for (const width of [320, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Protection ${service} fits ${width}px`);
        const tooSmall = await page.locator('.protection-tabs button').evaluateAll(buttons => buttons.some(button => button.getBoundingClientRect().height < 44));
        assert.equal(tooSmall, false, 'Situation selectors remain touch-friendly');
      }
      await page.reload();
      assert.equal(await page.locator(`#protection-tab-${service}`).getAttribute('aria-selected'), 'true');
      assert.equal(await page.locator('.protection-scene').evaluate(el => el.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length), 0, 'Reduced motion leaves complete static drawings');
    }
    await page.locator('#protection-tab-incidentes').focus();
    await page.keyboard.press('Home');
    assert.equal(await page.locator('#protection-tab-equipos').getAttribute('aria-selected'), 'true');
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('#protection-tab-conversaciones').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('ArrowDown');
    assert.equal(await page.locator('#protection-tab-filtraciones').getAttribute('aria-selected'), 'true');
    await page.keyboard.press('ArrowUp');
    assert.equal(await page.locator('#protection-tab-conversaciones').getAttribute('aria-selected'), 'true');
    await page.keyboard.press('End');
    await page.locator('.protection-next').click();
    assert.equal(await page.locator('#protection-tab-equipos').getAttribute('aria-selected'), 'true');
    assert.equal(await page.getByRole('tabpanel').evaluate(el => el === document.activeElement), true, 'Next situation returns focus to panel');
    assert.match(await page.locator('.protection-contact a').getAttribute('href'), /^mailto:dorianjfb01@gmail.com\?subject=/);
    await page.goto(`${origin}/#proteccion?servicio=unknown`);
    assert.equal(await page.locator('#protection-tab-equipos').getAttribute('aria-selected'), 'true');
    await page.goto(`${origin}/#inicio`);
    await page.locator('.protection-entry').click();
    await page.waitForFunction(() => document.querySelector('#breadcrumb').textContent === 'Protección personal');
    console.log('PASS six illustrated services, readable copy, mobile sizing, keyboard, direct links and reduced motion');

    const guideRoutes = await page.evaluate(() => Object.entries(disciplines).map(([key, value]) => ({ key, count: value.methods.length })));
    for (const { key, count } of guideRoutes) {
      await page.goto(`${origin}/#${key}`);
      for (let method = 0; method < count; method++) {
        await page.locator(`[data-method="${method}"]`).click();
        assert.equal(await page.locator('[data-guide-step]').count(), 3);
        const start = await page.locator('.walkthrough-detail').textContent();
        await page.locator('[data-guide-next]').click();
        assert.notEqual(await page.locator('.walkthrough-detail').textContent(), start);
        assert.match(await page.locator('.diagram-phase').textContent(), /^PASO 2/);
        await page.locator('[data-guide-next]').click();
        assert.equal(await page.locator('[data-guide-next]').isDisabled(), true);
        assert.equal(await page.locator('.diagram-legend [aria-current="step"]').count(), 1);
      }
    }
    console.log('PASS all 38 discipline walkthroughs and 114 action/outcome stages');

    await page.locator('[data-page="proyectos"]').click();
    await page.waitForSelector('#project-search');
    assert.equal(await page.locator('.project-row').count(), 12);
    await page.locator('#project-search').fill('playwright');
    assert.equal(await page.locator('.project-row').count(), 2);
    await page.locator('#project-area').selectOption('qa');
    assert.equal(await page.locator('.project-row').count(), 2);
    await page.locator('#project-search').fill('');
    assert.equal(await page.locator('.project-row').count(), 3);
    await page.reload();
    assert.equal(await page.locator('#project-area').inputValue(), 'qa');
    assert.equal(await page.locator('.project-row').count(), 3);
    await page.locator('#project-area').selectOption('movil');
    assert.equal(await page.locator('.project-row').count(), 0);
    assert.ok(await page.locator('.empty-state').isVisible());
    await page.locator('#project-area').selectOption('all');
    await page.locator('#project-search').fill('<script>alert(1)</script>');
    assert.equal(await page.locator('.project-row').count(), 0);
    await page.locator('#project-search').fill('');
    console.log('PASS search, combined filters, empty state and reload preservation');

    const firstProject = page.locator('[data-project="ecommerce"]');
    await firstProject.click();
    assert.equal(await page.locator('#project-dossier').evaluate(element => element.open), true);
    assert.equal(await page.locator('#dossier-link').getAttribute('href'), 'https://github.com/LUCKYTANO765/ecommerce');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#project-dossier').evaluate(element => element.open), false);
    assert.equal(await firstProject.evaluate(element => element === document.activeElement), true);
    await page.locator('[data-project="local-llm"]').click();
    assert.match(await page.locator('#dossier-link').getAttribute('href'), /^mailto:/);
    assert.equal(await page.locator('#dossier-link').getAttribute('target'), null);
    await page.locator('#close-dossier').click();
    console.log('PASS lateral dossier, public/private links, Escape and return focus');

    await page.locator('[data-page="web"]').click();
    await page.waitForFunction(() => document.querySelector('#breadcrumb').textContent === 'Desarrollo web');
    await page.locator('[data-page="perfil"]').click();
    await page.waitForFunction(() => document.querySelector('#breadcrumb').textContent === 'Sobre mí');
    await page.goBack();
    await page.waitForFunction(() => document.querySelector('#breadcrumb').textContent === 'Desarrollo web');
    await page.goForward();
    await page.waitForFunction(() => document.querySelector('#breadcrumb').textContent === 'Sobre mí');
    assert.match(await page.locator('h1').innerText(), /Dorian Joaquin\nFlores Burgoa/);
    assert.equal((await context.request.get(`${origin}/resume.pdf`)).status(), 200);
    console.log('PASS browser history, full identity and CV link');

    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#menu-toggle').click();
    assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'), 'true');
    assert.equal(await page.locator('.main-shell').evaluate(element => element.inert), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'), 'false');
    assert.equal(await page.locator('#menu-toggle').evaluate(element => element === document.activeElement), true);
    await page.locator('#menu-toggle').click();
    await page.locator('[data-page="contacto"]').click();
    await page.waitForSelector('#copy-email');
    assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'), 'false');
    assert.equal(await page.locator('.main-shell').evaluate(element => element.inert), false);
    assert.equal(await page.locator('.contact-address > a').getAttribute('href'), 'mailto:dorianjfb01@gmail.com');
    assert.equal(await page.locator('#motion-toggle').isDisabled(), true);
    console.log('PASS mobile navigation and system reduced-motion preference');

    const animated = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
    const motionPage = await animated.newPage();
    motionPage.on('pageerror', error => errors.push(error.message));
    await motionPage.goto(origin);
    await motionPage.waitForSelector('.skills-orbit svg');
    const initial = await motionPage.locator('.orbit-ring').first().evaluate(el => getComputedStyle(el).strokeDashoffset);
    await motionPage.waitForTimeout(200);
    assert.notEqual(await motionPage.locator('.orbit-ring').first().evaluate(el => getComputedStyle(el).strokeDashoffset), initial);
    await motionPage.locator('#motion-toggle').click();
    const paused = await motionPage.locator('.orbit-ring').first().evaluate(el => getComputedStyle(el).strokeDashoffset);
    await motionPage.waitForTimeout(200);
    assert.equal(await motionPage.locator('.orbit-ring').first().evaluate(el => getComputedStyle(el).strokeDashoffset), paused);
    await motionPage.reload();
    assert.equal(await motionPage.locator('#motion-toggle').getAttribute('aria-pressed'), 'true');
    await motionPage.locator('[data-page="qa"]').click();
    await motionPage.waitForFunction(() => document.querySelector('#breadcrumb').textContent === 'QA & Testing');
    await motionPage.locator('[data-page="inicio"]').click();
    await motionPage.waitForSelector('.skills-orbit svg');
    assert.equal(await motionPage.locator('#motion-toggle').getAttribute('aria-pressed'), 'true');
    console.log('PASS animated skills orbit, actual pause and persistent motion preference');
    await motionPage.locator('#motion-toggle').click();
    await motionPage.locator('[data-page="drones"]').click();
    const illustration = motionPage.locator('.method-diagram');
    await illustration.scrollIntoViewIfNeeded();
    await motionPage.waitForFunction(() => document.querySelector('.method-diagram').classList.contains('in-view'));
    const animatedCount = await illustration.evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.playState === 'running').length);
    assert.ok(animatedCount > 0, 'Discipline illustrations actually animate');
    const rect = await illustration.boundingBox();
    await motionPage.mouse.move(rect.x + rect.width * .8, rect.y + rect.height * .3);
    await motionPage.waitForFunction(() => document.querySelector('.method-diagram').classList.contains('pointer-active'));
    const tilt = await illustration.evaluate(el => parseFloat(el.style.getPropertyValue('--tilt-y')));
    assert.ok(tilt > 0 && tilt <= 3, 'Pointer tilt stays bounded to 3 degrees');
    await motionPage.locator('#motion-toggle').click();
    assert.equal(await illustration.evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.playState === 'running').length), 0);
    await motionPage.locator('#motion-toggle').click();
    await motionPage.setViewportSize({ width: 1440, height: 320 });
    await motionPage.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await motionPage.waitForFunction(() => !document.querySelector('.method-diagram').classList.contains('in-view'));
    assert.equal(await illustration.evaluate(el => el.querySelector('.diagram-holo').getAnimations({ subtree: true }).filter(a => a.playState === 'running').length), 0);
    console.log('PASS active SVG animations, bounded cursor interaction, global pause and offscreen pause');
    await motionPage.setViewportSize({ width: 1440, height: 1000 });
    await motionPage.goto(`${origin}/#proteccion`);
    for (const service of serviceNames) {
      await motionPage.locator(`#protection-tab-${service}`).click();
      await motionPage.locator('.protection-illustration').scrollIntoViewIfNeeded();
      await motionPage.waitForFunction(() => document.querySelector('.protection-illustration').classList.contains('in-view'));
      const count = await motionPage.locator('.protection-scene').evaluate(el => el.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length);
      assert.ok(count > 0, `Scene ${service} has actual running animations`);
    }
    await motionPage.locator('#motion-toggle').click();
    assert.equal(await motionPage.locator('.protection-scene').evaluate(el => el.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length), 0);
    await motionPage.locator('#motion-toggle').click();
    await motionPage.setViewportSize({ width: 1440, height: 320 });
    await motionPage.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await motionPage.waitForFunction(() => !document.querySelector('.protection-illustration').classList.contains('in-view'));
    assert.equal(await motionPage.locator('.protection-scene').evaluate(el => el.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length), 0);
    console.log('PASS six animated story drawings and global/offscreen pause');
    await animated.close();
    assert.deepEqual(errors, [], 'No script errors or missing local assets.');
    console.log('PASS no runtime errors or missing assets');
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
