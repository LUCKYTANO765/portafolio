const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
let playwright;
for (const candidate of [process.env.PLAYWRIGHT_MODULE, 'playwright', path.join(process.env.USERPROFILE || '', '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')].filter(Boolean)) {
  try { playwright = require(candidate); break; } catch { /* Try the configured runtime. */ }
}
if (!playwright) throw new Error('Playwright is required.');
(async () => {
  const executablePath = [process.env.BROWSER_EXECUTABLE, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(Boolean).find(fs.existsSync);
  const browser = await playwright.chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173/?v=18#web');
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(() => {
      const fixture = document.createElement('div');
      fixture.className = 'method-diagram protection-illustration in-view';
      fixture.style.cssText = 'position:absolute;left:0;top:0;width:600px;';
      document.body.append(fixture);
      const result = { count: 0, duplicates: [], clipped: [], collisions: [], invalid: [], still: [] };
      const signatures = new Map();
      function inspect(id, markup) {
        fixture.innerHTML = markup;
        fixture.getBoundingClientRect();
        const svg = fixture.querySelector('svg');
        const view = svg.viewBox.baseVal;
        if (new DOMParser().parseFromString(svg.outerHTML, 'image/svg+xml').querySelector('parsererror')) result.invalid.push(id);
        const boxes = [...svg.querySelectorAll('text')].filter(el => el.textContent.trim()).map(el => {
          const box = el.getBBox();
          const transform = svg.getScreenCTM().inverse().multiply(el.getScreenCTM());
          const corners = [[box.x, box.y], [box.x + box.width, box.y], [box.x, box.y + box.height], [box.x + box.width, box.y + box.height]].map(([x, y]) => new DOMPoint(x, y).matrixTransform(transform));
          return { text: el.textContent, left: Math.min(...corners.map(p => p.x)), right: Math.max(...corners.map(p => p.x)), top: Math.min(...corners.map(p => p.y)), bottom: Math.max(...corners.map(p => p.y)) };
        });
        for (const box of boxes) if (box.left < -.5 || box.top < -.5 || box.right > view.width + .5 || box.bottom > view.height + .5) result.clipped.push({ id, text: box.text });
        boxes.forEach((a, i) => boxes.slice(i + 1).forEach(b => {
          if (a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1) result.collisions.push({ id, text: [a.text, b.text] });
        }));
        const geometry = [...svg.querySelectorAll('path,rect,circle,ellipse,line,polyline,polygon')].filter(el => !el.closest('defs,.dv-frame')).map(el => ({
          tag: el.tagName,
          shape: ['d', 'x', 'y', 'width', 'height', 'cx', 'cy', 'r', 'rx', 'ry', 'x1', 'x2', 'y1', 'y2', 'points', 'transform'].map(attr => el.getAttribute(attr)),
        }));
        const signature = JSON.stringify(geometry);
        if (signatures.has(signature)) result.duplicates.push([signatures.get(signature), id]);
        else signatures.set(signature, id);
        if (!fixture.getAnimations({ subtree: true }).some(animation => animation.effect.getTiming().iterations === Infinity)) result.still.push(id);
        result.count++;
      }
      for (const [area, discipline] of Object.entries(disciplines)) {
        for (const [index, method] of discipline.methods.entries()) {
          for (let phase = 0; phase < 3; phase++) inspect(`${area}/${methodId(method)}/${phase + 1}`, window.PortfolioVisuals.render(area, method, method.visualIndex ?? index, phase));
        }
      }
      for (const service of window.PROTECTION_SERVICES) for (let phase = 0; phase < 4; phase++) inspect(`proteccion/${service.id}/${phase + 1}`, window.ProtectionVisuals.render(service.id, phase));
      fixture.remove();
      return result;
    });
    assert.equal(result.count, 138);
    const problems = { ...result, errors }; delete problems.count;
    console.log(JSON.stringify({ checked: result.count, ...problems }, null, 2));
    assert.ok(Object.values(problems).every(value => value.length === 0), 'Every scene must differ geometrically and render valid, unclipped labels and meaningful motion.');
    console.log('PASS 138 distinct SVG scenes, independent of wording or color; bounds, animation and rendering');
  } finally { await browser.close(); }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
