// ElectronArt — el fondo del sitio es cobre que conduce.
//
// Trazas ortogonales y a 45° con vías en los quiebres, dibujadas en un canvas,
// y UN pulso de luz recorriendo una traza cada tanto. Nada de partículas
// flotando: esto es una placa, la corriente va por el cobre.
//
// Se inserta solo, así que alcanza con incluir este archivo en la página.
(function () {
  "use strict";

  var quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var lienzo = document.createElement("canvas");
  lienzo.id = "cobre-fondo";
  lienzo.setAttribute("aria-hidden", "true");
  (document.body || document.documentElement).insertBefore(
    lienzo, (document.body || document.documentElement).firstChild);

  var ctx = lienzo.getContext("2d");
  if (!ctx) return;

  var trazas = [], W = 0, H = 0;

  function generar() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = lienzo.clientWidth; H = lienzo.clientHeight;
    if (!W || !H) return false;
    lienzo.width = W * dpr; lienzo.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    trazas = [];
    var carriles = Math.max(4, Math.round(H / 140));
    for (var i = 0; i < carriles; i++) {
      var y = (i + .5) * (H / carriles) + (Math.random() - .5) * 30;
      var x = -40, pts = [[x, y]];
      while (x < W + 40) {
        x += 70 + Math.random() * 160;
        pts.push([x, y]);
        if (Math.random() < .55 && x < W) {          // quiebre a 45°
          var d = (Math.random() < .5 ? -1 : 1) * (30 + Math.random() * 45);
          if (y + d > 20 && y + d < H - 20) { x += Math.abs(d); y += d; pts.push([x, y]); }
        }
      }
      trazas.push(pts);
    }
    return true;
  }

  function estatico() {
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(184,115,51,.09)";        // cobre, muy tenue
    trazas.forEach(function (pts) {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
      for (var j = 1; j < pts.length - 1; j++) {      // vía en cada quiebre
        if (pts[j][1] !== pts[j + 1][1]) {
          ctx.beginPath();
          ctx.arc(pts[j][0], pts[j][1], 3.2, 0, 6.2832);
          ctx.fillStyle = "rgba(201,162,39,.12)";
          ctx.fill();
        }
      }
    });
  }

  function largoDe(pts) {
    var L = 0;
    for (var i = 1; i < pts.length; i++)
      L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    return L;
  }

  function puntoEn(pts, d) {
    for (var i = 1; i < pts.length; i++) {
      var seg = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      if (d <= seg) {
        var t = seg ? d / seg : 0;
        return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t,
                pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t];
      }
      d -= seg;
    }
    return pts[pts.length - 1];
  }

  var pulso = null;
  function nuevoPulso() {
    if (!trazas.length) return;
    var pts = trazas[(Math.random() * trazas.length) | 0];
    pulso = { pts: pts, largo: largoDe(pts), d: 0, vel: 3.4 };
  }

  function cuadro() {
    estatico();
    if (pulso) {
      pulso.d += pulso.vel;
      if (pulso.d > pulso.largo + 120) {
        pulso = null;
        setTimeout(nuevoPulso, 900 + Math.random() * 2400);
      } else {
        for (var k = 0; k < 26; k++) {               // cola que se apaga
          var d = pulso.d - k * 4.2;
          if (d < 0 || d > pulso.largo) continue;
          var p = puntoEn(pulso.pts, d);
          ctx.beginPath();
          ctx.arc(p[0], p[1], 2.1, 0, 6.2832);
          ctx.fillStyle = "rgba(233,198,75," + (0.5 * (1 - k / 26)) + ")";
          ctx.fill();
        }
      }
    }
    requestAnimationFrame(cuadro);
  }

  function arrancar() {
    if (!generar()) return;
    estatico();
    if (!quieto) { nuevoPulso(); requestAnimationFrame(cuadro); }
  }

  var t;
  window.addEventListener("resize", function () {
    clearTimeout(t);
    t = setTimeout(arrancar, 200);
  });
  arrancar();
})();
