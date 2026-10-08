'use strict';

// Original Canvas illustrations. Every animation is periodic in twelve seconds;
// the objects remain still while light traces explain the relationships.
const TAU = Math.PI * 2;
const C = {
  line: '#68b9ad', bright: '#86ecdf', muted: '#3b645f', copper: '#d39a67',
  dark: '#111f22', deep: '#0a1317', face: '#182d30', side: '#102024',
  dim: '#35514f', paper: '#223b3d'
};

function line(c, x1, y1, x2, y2, color = C.line, width = 1.5, alpha = 1) {
  c.save(); c.globalAlpha *= alpha; c.strokeStyle = color; c.lineWidth = width;
  c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); c.restore();
}
function poly(c, pts, fill = C.dark, stroke = C.line, width = 1.5) {
  c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.closePath();
  if (fill) { c.fillStyle = fill; c.fill(); }
  if (stroke) { c.strokeStyle = stroke; c.lineWidth = width; c.stroke(); }
}
function roundedPath(c, x, y, w, h, r = 8) {
  r = Math.min(r, w / 2, h / 2);
  c.beginPath(); c.moveTo(x + r, y); c.lineTo(x + w - r, y);
  c.quadraticCurveTo(x + w, y, x + w, y + r); c.lineTo(x + w, y + h - r);
  c.quadraticCurveTo(x + w, y + h, x + w - r, y + h); c.lineTo(x + r, y + h);
  c.quadraticCurveTo(x, y + h, x, y + h - r); c.lineTo(x, y + r);
  c.quadraticCurveTo(x, y, x + r, y); c.closePath();
}
function rect(c, x, y, w, h, r = 8, fill = C.dark, stroke = C.line, width = 1.5) {
  roundedPath(c, x, y, w, h, r);
  if (fill) { c.fillStyle = fill; c.fill(); }
  if (stroke) { c.strokeStyle = stroke; c.lineWidth = width; c.stroke(); }
}
function circle(c, x, y, r, fill = C.dark, stroke = C.line, width = 1.5) {
  c.beginPath(); c.arc(x, y, r, 0, TAU);
  if (fill) { c.fillStyle = fill; c.fill(); }
  if (stroke) { c.strokeStyle = stroke; c.lineWidth = width; c.stroke(); }
}
function ellipse(c, x, y, rx, ry, fill, stroke = C.line, width = 1.5) {
  c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, TAU);
  if (fill) { c.fillStyle = fill; c.fill(); }
  if (stroke) { c.strokeStyle = stroke; c.lineWidth = width; c.stroke(); }
}
function pulse(t, phase = 0) { return .5 + .5 * Math.sin(TAU * t / 12 + phase); }
function light(c, x, y, r, t, phase = 0, color = C.bright) {
  c.save(); c.globalAlpha *= .48 + .45 * pulse(t, phase); c.shadowColor = color;
  c.shadowBlur = 10; circle(c, x, y, r, color, null); c.restore();
}
function halo(c, x, y, r, t, color = '104,210,190') {
  c.save(); c.globalAlpha *= .45 + .12 * pulse(t);
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(${color},.19)`); g.addColorStop(.56, `rgba(${color},.075)`); g.addColorStop(1, `rgba(${color},0)`);
  c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2); c.restore();
}
function route(c, pts, t, phase = 0, color = C.line) {
  c.save(); c.strokeStyle = color; c.lineWidth = 1.2; c.globalAlpha *= .42;
  c.setLineDash([4, 6]); c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.stroke(); c.restore();
  const lengths = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  const total = lengths.reduce((a, b) => a + b, 0);
  const u = ((t / 12 + phase) % 1 + 1) % 1;
  let distance = total * u;
  for (let i = 0; i < lengths.length; i++) {
    if (distance <= lengths[i] || i === lengths.length - 1) {
      const q = lengths[i] ? distance / lengths[i] : 0;
      c.save(); c.globalAlpha *= Math.pow(Math.sin(Math.PI * u), 2);
      light(c, pts[i][0] + (pts[i + 1][0] - pts[i][0]) * q, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * q, 3, t, 0, color);
      c.restore(); break;
    }
    distance -= lengths[i];
  }
}
function depthPanel(c, x, y, w, h, r = 10) {
  rect(c, x + 11, y - 10, w, h, r, C.deep, C.dim);
  poly(c, [[x, y + h - r], [x + 11, y + h - r - 10], [x + w + 11, y + h - 10], [x + w, y + h]], C.side, C.dim);
  rect(c, x, y, w, h, r, C.dark, C.line);
}
function platform(c, x, y, w, h, t) {
  halo(c, x, y - 80, Math.max(w, h) * .55, t);
  poly(c, [[x - w / 2, y], [x + w * .2, y - h / 2], [x + w / 2, y], [x - w * .2, y + h / 2]], 'rgba(23,47,47,.30)', C.dim);
  line(c, x - w * .36, y + 20, x + w * .19, y + h * .31, C.muted, 1, .6);
}
function check(c, x, y, s = 1, color = C.bright) {
  c.save(); c.strokeStyle = color; c.lineWidth = 2 * s; c.lineCap = 'round';
  c.beginPath(); c.moveTo(x - 8 * s, y); c.lineTo(x - 2 * s, y + 6 * s); c.lineTo(x + 10 * s, y - 8 * s); c.stroke(); c.restore();
}
function lock(c, x, y, s = 1, color = C.bright) {
  c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = color; c.lineWidth = 2;
  c.beginPath(); c.moveTo(-16, 0); c.lineTo(-16, -17); c.bezierCurveTo(-16, -40, 16, -40, 16, -17); c.lineTo(16, 0); c.stroke();
  rect(c, -27, 0, 54, 43, 6, C.face, color, 2); circle(c, 0, 17, 4, null, color, 1.6); line(c, 0, 21, 0, 29, color, 1.6); c.restore();
}
function shield(c, x, y, w, h, color = C.line, fill = C.dark) {
  c.beginPath(); c.moveTo(x, y - h / 2); c.lineTo(x + w / 2, y - h * .3);
  c.lineTo(x + w * .44, y + h * .12); c.bezierCurveTo(x + w * .4, y + h * .32, x + w * .12, y + h * .48, x, y + h / 2);
  c.bezierCurveTo(x - w * .12, y + h * .48, x - w * .4, y + h * .32, x - w * .44, y + h * .12);
  c.lineTo(x - w / 2, y - h * .3); c.closePath(); c.fillStyle = fill; c.fill(); c.strokeStyle = color; c.lineWidth = 2; c.stroke();
}
function browser(c, x, y, w, h) {
  depthPanel(c, x, y, w, h, 10); line(c, x, y + 28, x + w, y + 28, C.dim);
  [0, 1, 2].forEach(i => circle(c, x + 14 + i * 10, y + 14, 2, i === 0 ? C.copper : C.muted, null));
  rect(c, x + 56, y + 9, w - 76, 9, 4, C.side, C.dim, 1);
}
function phone(c, x, y, w = 108, h = 204) {
  depthPanel(c, x, y, w, h, 16); rect(c, x + 8, y + 12, w - 16, h - 25, 10, C.deep, C.dim, 1);
  line(c, x + w * .38, y + 7, x + w * .62, y + 7, C.line, 2);
  line(c, x + w * .36, y + h - 6, x + w * .64, y + h - 6, C.muted, 2);
}
function drive(c, x, y, w = 110, h = 150) {
  depthPanel(c, x, y, w, h, 8); circle(c, x + w / 2, y + h * .46, w * .34, C.side, C.muted);
  circle(c, x + w / 2, y + h * .46, w * .12, C.dark, C.line);
  line(c, x + w * .85, y + h * .69, x + w * .55, y + h * .4, C.copper, 3);
  [0, 1, 2, 3, 4].forEach(i => line(c, x + 17 + i * 10, y + h - 18, x + 17 + i * 10, y + h - 8, C.muted, 2));
}
function rack(c, x, y, w = 110, h = 180, t = 0) {
  depthPanel(c, x, y, w, h, 7);
  for (let i = 0; i < 4; i++) {
    rect(c, x + 10, y + 14 + i * (h - 28) / 4, w - 20, (h - 36) / 4 - 7, 3, C.side, C.muted, 1);
    line(c, x + 21, y + 26 + i * (h - 28) / 4, x + w - 37, y + 26 + i * (h - 28) / 4, C.dim, 2);
    light(c, x + w - 22, y + 27 + i * (h - 28) / 4, 2.5, t, i * .8);
  }
}
function cube(c, x, y, s = 40, h = 30, color = C.line) {
  poly(c, [[x, y], [x + s, y - s * .45], [x + s * 2, y], [x + s, y + s * .45]], C.face, color);
  poly(c, [[x, y], [x + s, y + s * .45], [x + s, y + s * .45 + h], [x, y + h]], C.side, color);
  poly(c, [[x + s, y + s * .45], [x + s * 2, y], [x + s * 2, y + h], [x + s, y + s * .45 + h]], C.deep, color);
}
function database(c, x, y, w = 115, h = 118) {
  rect(c, x, y, w, h, 0, C.side, null); ellipse(c, x + w / 2, y + h, w / 2, 16, C.side, C.line);
  line(c, x, y, x, y + h, C.line); line(c, x + w, y, x + w, y + h, C.line);
  [0, 1, 2].forEach(i => ellipse(c, x + w / 2, y + i * h / 3, w / 2, 16, i === 0 ? C.face : null, C.line));
}
function lens(c, x, y, r, t) {
  line(c, x + r * .72 + 7, y + r * .72 + 7, x + r * 1.55 + 7, y + r * 1.55 + 7, C.deep, 20);
  line(c, x + r * .72, y + r * .72, x + r * 1.55, y + r * 1.55, C.copper, 13);
  circle(c, x + 4, y + 5, r, 'rgba(21,43,45,.2)', C.dim, 7);
  circle(c, x, y, r, 'rgba(77,159,149,.055)', C.line, 5);
  c.save(); c.globalAlpha = .3 + pulse(t) * .22; c.strokeStyle = C.bright; c.lineWidth = 1.4;
  c.beginPath(); c.arc(x, y, r - 8, Math.PI * 1.12, Math.PI * 1.77); c.stroke(); c.restore();
}
function waveform(c, x, y, w, h, t, copper = false) {
  c.save(); c.strokeStyle = copper ? C.copper : C.bright; c.lineWidth = 1.7; c.globalAlpha *= .7 + .2 * pulse(t);
  c.beginPath(); for (let i = 0; i <= 100; i++) {
    const q = i / 100; const a = Math.exp(-Math.pow((q - .3) * 10, 2)) * .85 + Math.exp(-Math.pow((q - .72) * 15, 2));
    const yy = y - Math.abs(Math.sin(q * 37)) * h * a;
    i ? c.lineTo(x + q * w, yy) : c.moveTo(x + q * w, yy);
  } c.stroke(); c.restore();
}

function cyber(c, t) {
  platform(c, 480, 390, 630, 170, t);
  const satellites = [[236, 205], [719, 196], [247, 375], [716, 371]];
  satellites.forEach(([x, y], i) => {
    route(c, [[x, y], [x, 293], [480, 293]], t, i / 4);
    depthPanel(c, x - 39, y - 42, 78, 72, 7);
    if (i % 2 === 0) { for (let k = 0; k < 3; k++) rect(c, x - 25, y - 28 + k * 16, 48, 8, 2, C.face, C.dim); }
    else { circle(c, x, y - 5, 23, C.side, C.muted); check(c, x, y - 5, 1); }
    light(c, x + 26, y + 19, 2.5, t, i);
  });
  shield(c, 493, 268, 217, 257, C.dim, C.deep); shield(c, 480, 281, 217, 257, C.line, C.dark);
  shield(c, 480, 280, 177, 211, C.muted, C.side); lock(c, 480, 260, 1.42);
  c.save(); c.globalAlpha *= .3 + .3 * pulse(t); shield(c, 480, 281, 226, 268, C.bright, 'rgba(0,0,0,0)'); c.restore();
}
function intelligence(c, t) {
  halo(c, 476, 271, 340, t);
  const points = [[200, 190], [343, 133], [530, 167], [727, 112], [767, 313], [600, 405], [355, 401], [177, 343], [459, 275]];
  const edges = [[0, 1], [0, 7], [1, 2], [2, 3], [2, 8], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [0, 8], [5, 8], [4, 8]];
  edges.forEach(([a, b], i) => route(c, [points[a], points[b]], t, i / edges.length));
  points.forEach(([x, y], i) => {
    circle(c, x, y, i === 8 ? 52 : 24, C.dark, i === 8 ? C.copper : C.muted, 1.6);
    if (i === 8) { circle(c, x, y, 32, C.side, C.line); [0, 1, 2].forEach(k => line(c, x - 17, y - 11 + k * 11, x + 17 - k * 4, y - 11 + k * 11, C.line)); }
    else light(c, x, y, 4, t, i);
  });
  [[218, 116, 65, 35], [673, 367, 80, 52], [272, 280, 65, 48]].forEach(([x, y, w, h]) => {
    depthPanel(c, x, y, w, h, 4); line(c, x + 12, y + 13, x + w - 10, y + 13, C.muted);
    line(c, x + 12, y + 23, x + w * .62, y + 23, C.muted);
  });
  lens(c, 584, 270, 74, t);
}
function forensics(c, t) {
  platform(c, 485, 407, 730, 133, t);
  rect(c, 178, 117, 183, 297, 11, 'rgba(18,38,40,.55)', C.dim);
  line(c, 192, 137, 346, 137, C.copper, 1.5); line(c, 192, 392, 346, 392, C.copper, 1.5);
  phone(c, 214, 163, 105, 191); lock(c, 267, 245, .67);
  drive(c, 411, 269, 112, 133);
  route(c, [[319, 263], [380, 263], [380, 210], [586, 210]], t, 0);
  route(c, [[523, 331], [559, 331], [559, 280], [586, 280]], t, .38);
  depthPanel(c, 586, 152, 205, 212, 9);
  for (let i = 0; i < 3; i++) {
    rect(c, 605, 176 + i * 54, 160, 39, 4, C.side, C.muted);
    const x = 619, y = 184 + i * 54;
    poly(c, [[x, y], [x + 16, y], [x + 24, y + 8], [x + 24, y + 23], [x, y + 23]], C.paper, C.line, 1);
    line(c, x + 40, y + 8, x + 113, y + 8, C.dim, 2);
    line(c, x + 40, y + 17, x + 94, y + 17, C.muted, 2); light(c, 750, y + 11, 2.5, t, i * 1.6);
  }
  circle(c, 750, 384, 25, C.dark, C.copper); check(c, 750, 384, 1.1, C.copper);
}
function radiofrequency(c, t) {
  platform(c, 483, 410, 730, 130, t);
  poly(c, [[222, 398], [285, 176], [348, 398]], C.deep, C.line, 2);
  [0, 1, 2, 3].forEach(i => {
    const y = 253 + i * 39; const d = (y - 176) * .283;
    line(c, 285 - d, y, 285 + d, y + 30, C.muted); line(c, 285 + d, y, 285 - d, y + 30, C.muted);
  });
  line(c, 285, 99, 285, 204, C.bright, 3); circle(c, 285, 99, 5, C.copper, null);
  for (let i = 0; i < 3; i++) {
    c.save(); c.globalAlpha *= .22 + .3 * pulse(t, -i * .6); c.lineWidth = 1.5; c.strokeStyle = C.bright;
    for (const side of [-1, 1]) { c.beginPath(); c.arc(285, 124, 47 + i * 28, side < 0 ? Math.PI * .65 : -Math.PI * .35, side < 0 ? Math.PI * 1.35 : Math.PI * .35); c.stroke(); } c.restore();
  }
  depthPanel(c, 467, 180, 297, 219, 12); rect(c, 486, 201, 259, 143, 5, C.deep, C.muted);
  [0, 1, 2, 3].forEach(i => line(c, 494, 226 + i * 30, 737, 226 + i * 30, C.dim, .8, .6));
  [0, 1, 2, 3, 4, 5].forEach(i => line(c, 511 + i * 41, 210, 511 + i * 41, 333, C.dim, .8, .6));
  waveform(c, 496, 327, 235, 103, t); waveform(c, 496, 327, 235, 56, t, true);
  [0, 1, 2].forEach(i => circle(c, 516 + i * 66, 368, 11, C.side, i === 1 ? C.copper : C.line));
  route(c, [[334, 248], [400, 248], [400, 288], [467, 288]], t, .1);
  line(c, 764, 345, 803, 345, C.line, 2); line(c, 803, 345, 817, 220, C.line, 2);
  circle(c, 817, 220, 5, C.copper, null);
}
function web(c, t) {
  platform(c, 480, 410, 757, 120, t);
  route(c, [[450, 258], [518, 258], [518, 187], [596, 187]], t);
  route(c, [[650, 305], [650, 374], [747, 374], [747, 329]], t, .38);
  browser(c, 166, 163, 284, 212);
  rect(c, 184, 207, 98, 136, 4, C.face, C.dim);
  poly(c, [[195, 300], [219, 265], [236, 285], [267, 241], [267, 330], [195, 330]], C.side, C.muted);
  circle(c, 252, 229, 9, C.copper, null);
  line(c, 300, 211, 423, 211, C.line, 4); line(c, 300, 227, 399, 227, C.muted, 3);
  for (let i = 0; i < 3; i++) rect(c, 300 + i * 42, 253, 32, 42, 3, C.face, C.muted);
  rect(c, 300, 315, 80, 18, 5, C.side, C.copper);
  rack(c, 588, 121, 124, 190, t); database(c, 735, 253, 93, 100);
  line(c, 308, 375, 308, 403, C.muted, 5); line(c, 270, 406, 346, 406, C.line, 3);
}
function mobile(c, t) {
  platform(c, 481, 417, 560, 115, t);
  // Separated interface layers retain a fixed spatial relationship to the phone.
  rect(c, 473, 122, 154, 282, 16, C.deep, C.dim);
  rect(c, 435, 144, 154, 282, 16, C.side, C.muted);
  phone(c, 393, 166, 154, 282);
  rect(c, 409, 194, 122, 94, 5, C.face, C.muted);
  circle(c, 440, 226, 16, C.side, C.copper); line(c, 467, 216, 513, 216, C.line, 3);
  line(c, 467, 230, 502, 230, C.muted, 3);
  [0, 1, 2].forEach(i => rect(c, 410 + i * 42, 306, 32, 37, 4, C.side, C.line));
  rect(c, 409, 363, 122, 44, 5, C.side, C.muted); check(c, 428, 385, .7); line(c, 448, 384, 515, 384, C.line, 2);
  circle(c, 230, 219, 37, C.dark, C.line); lock(c, 230, 214, .63);
  circle(c, 721, 298, 41, C.dark, C.copper); check(c, 721, 298, 1.7, C.copper);
  route(c, [[267, 219], [331, 219], [331, 272], [393, 272]], t);
  route(c, [[627, 259], [650, 259], [650, 298], [680, 298]], t, .5);
  light(c, 586, 137, 3, t, 2); light(c, 550, 159, 3, t, 3);
}
function qa(c, t) {
  halo(c, 485, 266, 330, t);
  browser(c, 223, 115, 401, 250);
  rect(c, 244, 159, 111, 178, 4, C.side, C.dim);
  [0, 1, 2].forEach(i => rect(c, 263, 179 + i * 44, 72, 26, 4, C.dark, i === 1 ? C.copper : C.muted));
  rect(c, 377, 158, 224, 74, 4, C.face, C.muted);
  line(c, 395, 178, 572, 178, C.line, 3); line(c, 395, 193, 531, 193, C.muted, 2);
  rect(c, 377, 250, 130, 34, 4, C.deep, C.line); rect(c, 522, 250, 79, 34, 4, C.side, C.copper);
  rect(c, 377, 303, 223, 34, 4, C.deep, C.muted);
  route(c, [[299, 192], [365, 192], [365, 267], [562, 267], [562, 320]], t);
  poly(c, [[564, 258], [564, 284], [571, 277], [578, 291], [584, 287], [577, 274], [588, 274]], C.bright, C.dark, 1);
  const y = 426; line(c, 220, y, 738, y, C.muted, 1);
  [220, 386, 552, 718].forEach((x, i) => { circle(c, x, y, 23, C.dark, i === 2 ? C.copper : C.line); check(c, x, y, .9, i === 2 ? C.copper : C.bright); light(c, x, y + 34, 2, t, i); });
  depthPanel(c, 671, 184, 103, 161, 7); [0, 1, 2].forEach(i => { circle(c, 694, 215 + i * 44, 9, C.side, C.line); check(c, 694, 215 + i * 44, .48); line(c, 715, 215 + i * 44, 757, 215 + i * 44, C.muted, 2); });
  route(c, [[624, 308], [648, 308], [648, 217], [671, 217]], t, .55);
}
function automation(c, t) {
  platform(c, 482, 403, 751, 130, t);
  [0, 1, 2].forEach(i => {
    depthPanel(c, 150 + i * 16, 153 + i * 62, 109, 43, 5);
    circle(c, 170 + i * 16, 174 + i * 62, 7, C.side, C.copper);
    line(c, 188 + i * 16, 168 + i * 62, 241 + i * 16, 168 + i * 62, C.muted, 2);
    line(c, 188 + i * 16, 179 + i * 62, 228 + i * 16, 179 + i * 62, C.dim, 2);
  });
  route(c, [[290, 260], [365, 260]], t, 0);
  circle(c, 417, 260, 50, C.dark, C.line, 2); circle(c, 417, 260, 32, C.face, C.muted);
  [0, 1, 2].forEach(i => { const a = TAU * i / 3; const x = 417 + Math.cos(a) * 20, y = 260 + Math.sin(a) * 20; line(c, 417, 260, x, y, C.line, 2); light(c, x, y, 4, t, i); });
  [[562, 139], [590, 261], [562, 385]].forEach(([x, y], i) => {
    route(c, [[467, 260], [507, 260], [507, y], [x, y]], t, i * .23);
    cube(c, x, y - 21, 34, 39, i === 1 ? C.copper : C.line);
    route(c, [[x + 68, y + 16], [729, y + 16], [729, 276]], t, .35 + i * .2);
  });
  circle(c, 760, 276, 32, C.dark, C.bright); check(c, 760, 276, 1.25);
}
function ai(c, t) {
  platform(c, 480, 421, 692, 101, t);
  depthPanel(c, 241, 119, 470, 297, 16);
  rect(c, 260, 139, 432, 237, 8, C.deep, C.dim);
  const rows = [[313, [198, 249, 300]], [401, [172, 223, 274, 325]], [489, [198, 249, 300]], [574, [222, 276]]];
  for (let r = 0; r < rows.length - 1; r++) for (const y of rows[r][1]) for (const yy of rows[r + 1][1]) {
    line(c, rows[r][0], y, rows[r + 1][0], yy, C.muted, .7, .4);
  }
  rows.forEach(([x, ys], r) => ys.forEach((y, i) => { circle(c, x, y, 7, C.face, C.line); light(c, x, y, 2.4, t, r * .7 + i * .5); }));
  route(c, [[313, 249], [401, 223], [489, 249], [574, 276]], t, 0, C.bright);
  rect(c, 620, 225, 51, 58, 5, C.face, C.copper, 2);
  for (let i = 0; i < 5; i++) {
    line(c, 627 + i * 9, 214, 627 + i * 9, 225, C.copper); line(c, 627 + i * 9, 283, 627 + i * 9, 294, C.copper);
  }
  route(c, [[581, 249], [610, 249], [610, 254], [620, 254]], t, .4);
  lock(c, 207, 279, .75); route(c, [[227, 301], [241, 301]], t, .6);
  [0, 1, 2].forEach(i => light(c, 284 + i * 13, 395, 2, t, i));
  for (let i = 0; i < 7; i++) line(c, 589 + i * 12, 392, 594 + i * 12, 400, C.muted, 1.5);
}
function drones(c, t) {
  platform(c, 486, 379, 690, 168, t);
  // A fixed quadcopter in plan/isometric view; only inspection lights move.
  const arms = [[346, 181], [607, 177], [318, 319], [637, 325]];
  arms.forEach(([x, y]) => { line(c, 478, 259, x, y + 8, C.deep, 24); line(c, 478, 252, x, y, C.muted, 16); line(c, 478, 250, x, y - 1, C.line, 2); });
  arms.forEach(([x, y], i) => {
    ellipse(c, x + 5, y + 10, 75, 24, 'rgba(10,20,24,.7)', C.dim, 1.5);
    ellipse(c, x, y, 75, 24, 'rgba(41,72,73,.17)', C.line, 1.7);
    ellipse(c, x, y, 54, 10, C.side, C.muted);
    circle(c, x, y, 8, C.face, C.copper); light(c, x, y, 3, t, i * .7);
  });
  poly(c, [[445, 210], [498, 211], [522, 253], [493, 292], [446, 292], [423, 252]], C.deep, C.line, 2);
  poly(c, [[453, 220], [491, 221], [509, 252], [487, 279], [454, 278], [438, 252]], C.face, C.muted);
  line(c, 458, 293, 452, 324, C.muted, 4); line(c, 492, 293, 498, 324, C.muted, 4);
  rect(c, 458, 293, 31, 26, 6, C.dark, C.copper); circle(c, 473, 306, 7, C.side, C.line);
  depthPanel(c, 668, 395, 157, 69, 20); circle(c, 697, 426, 15, C.side, C.muted); circle(c, 797, 426, 15, C.side, C.muted);
  rect(c, 722, 407, 47, 30, 5, C.deep, C.line); line(c, 693, 395, 683, 369, C.line, 3); line(c, 799, 395, 809, 369, C.line, 3);
  route(c, [[504, 310], [570, 357], [625, 357], [727, 395]], t);
}
function communication(c, t) {
  halo(c, 478, 280, 340, t);
  depthPanel(c, 189, 136, 221, 218, 11); line(c, 189, 181, 410, 181, C.muted);
  [227, 371].forEach(x => { line(c, x, 119, x, 151, C.copper, 5); circle(c, x, 152, 4, C.copper, null); });
  for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) {
    rect(c, 207 + col * 47, 197 + row * 45, 32, 29, 3, (row + col) % 3 === 0 ? C.face : C.deep, (row + col) % 3 === 0 ? C.line : C.dim, 1);
    if ((row + col) % 3 === 0) light(c, 223 + col * 47, 212 + row * 45, 2, t, row + col);
  }
  route(c, [[410, 248], [480, 248], [480, 153], [547, 153]], t);
  route(c, [[410, 288], [480, 288], [480, 375], [606, 375]], t, .4);
  depthPanel(c, 547, 106, 186, 155, 9); circle(c, 568, 124, 6, C.face, C.copper); line(c, 585, 124, 656, 124, C.muted, 2);
  rect(c, 562, 142, 155, 74, 4, C.side, C.muted);
  poly(c, [[573, 204], [610, 165], [638, 190], [664, 176], [707, 204]], C.face, C.line, 1);
  circle(c, 690, 157, 7, C.copper, null); line(c, 562, 237, 655, 237, C.line, 2);
  depthPanel(c, 606, 298, 146, 123, 8); rect(c, 620, 314, 117, 37, 4, C.face, C.line);
  [0, 1, 2].forEach(i => line(c, 620, 367 + i * 12, 728 - i * 19, 367 + i * 12, C.muted, 2));
  const nodes = [[788, 165], [795, 256], [824, 361]];
  nodes.forEach(([x, y], i) => { route(c, [[733, 218], [755, 218], [x, y]], t, i * .2); circle(c, x, y, 14, C.dark, C.line); light(c, x, y, 3, t, i); });
  route(c, [[331, 354], [331, 427], [544, 427], [544, 375], [606, 375]], t, .65, C.copper);
}
function protection(c, t) {
  platform(c, 480, 411, 664, 127, t);
  // The boundary encloses communication without relocating the devices.
  c.save(); c.setLineDash([5, 8]); ellipse(c, 480, 296, 295, 141, null, C.muted, 1); c.restore();
  phone(c, 240, 162, 118, 232); lock(c, 298, 252, .85);
  phone(c, 604, 182, 104, 204); rect(c, 620, 228, 72, 32, 7, C.side, C.muted);
  rect(c, 620, 272, 72, 44, 7, C.face, C.line); line(c, 630, 286, 678, 286, C.muted, 2); line(c, 630, 299, 670, 299, C.muted, 2);
  route(c, [[358, 278], [428, 278]], t);
  route(c, [[532, 278], [604, 278]], t, .45);
  shield(c, 480, 272, 127, 166, C.line, C.deep); lock(c, 480, 257, .84, C.copper);
  [[455, 142], [516, 400], [777, 273]].forEach(([x, y], i) => { circle(c, x, y, 20, C.dark, C.muted); check(c, x, y, .7, C.line); light(c, x, y + 29, 2, t, i); });
  c.save(); c.globalAlpha *= .3 + .15 * pulse(t); ellipse(c, 480, 296, 302, 147, null, C.bright, 1); c.restore();
}

const SCENES = Object.freeze({
  ciberseguridad: cyber, inteligencia: intelligence, forense: forensics,
  radiofrecuencia: radiofrequency, web, movil: mobile, qa, automatizacion: automation,
  ia: ai, drones, comunicacion: communication, proteccion: protection
});

function drawScene(ctx, key, t = 0, helpers = {}) {
  if (!ctx) throw new TypeError('A Canvas2D context is required');
  const seconds = Number.isFinite(Number(t)) ? ((Number(t) % 12) + 12) % 12 : 0;
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  (SCENES[key] || SCENES.ciberseguridad)(ctx, seconds, helpers);
  ctx.restore();
}

module.exports = { drawScene, keys: Object.keys(SCENES), duration: 12, width: 960, height: 540 };
