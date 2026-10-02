/* ElectronArt — la placa de 6 capas del hero, en 3D y en vivo.
 *
 * Es la misma escena del reel «6 capas» (marketing/motion/piezas/capas-industrial),
 * hecha interactiva: las 13 láminas de la controladora industrial de referencia
 * (examples/triana-industrial-controller, capas rasterizadas con el renderer del
 * programa) se abren desde el medio y se cierran solas; se gira arrastrando, y
 * la leyenda resalta una capa al pasarle el mouse o tocarla. Reemplaza al video
 * viejo de la ESP32 (Franco, 2/10/2026: «siguen los mismos dos videos viejos»).
 *
 * Reglas de la casa (design/sistema-mascara.md): una sola luz arriba-izquierda,
 * el oro escaso, `prefers-reduced-motion` anula el movimiento (queda la placa
 * abierta y quieta, igual se puede girar). Sin WebGL queda el póster. three.js
 * y las texturas (~0,9 MB) se piden recién después de que la página cargó, y la
 * animación se pausa cuando el hero sale de pantalla.
 */
(function () {
  "use strict";

  var raiz = document.getElementById("hero3d");
  if (!raiz) return;
  var leyenda = document.getElementById("hero3dLeyenda");
  var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function hayWebGL() {
    try {
      var c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
    } catch (e) { return false; }
  }
  if (!hayWebGL()) return;

  var BASE = "assets/hero3d/";
  var PW = 190, PH = 190 * 1221 / 2000;          // lámina en mm (encuadre de las texturas)
  // de arriba hacia abajo. Rótulos sin tildes ni Ñ: Bahnschrift las pierde a tamaño de rótulo.
  var CAPAS = [
    { id: "comp", rot: "COMPONENTES", tipo: "comp", col: "#e9c64b" },
    { id: "mask", rot: "MASCARA", tipo: "mask", tex: "top_silk.png", col: "#2fbf71" },
    { id: "top", rot: "F.CU", tipo: "cu", tex: "top_copper.png", col: "#e9c64b" },
    { id: "d1", tipo: "fr4" },
    { id: "in1", rot: "IN1 · PISTAS", tipo: "cu", tex: "in1_copper.png", col: "#4ecca3" },
    { id: "d2", tipo: "fr4" },
    { id: "in2", rot: "IN2 · GND", tipo: "cu", tex: "in2_copper.png", col: "#bb88ff" },
    { id: "d3", tipo: "fr4" },
    { id: "in3", rot: "IN3 · +3V3", tipo: "cu", tex: "in3_copper.png", col: "#ff9944" },
    { id: "d4", tipo: "fr4" },
    { id: "in4", rot: "IN4 · PISTAS", tipo: "cu", tex: "in4_copper.png", col: "#e94560" },
    { id: "d5", tipo: "fr4" },
    { id: "bot", rot: "B.CU", tipo: "cu", tex: "bottom_copper.png", col: "#5aa9ff" },
    { id: "maskb", tipo: "mask" }
  ];
  var MEDIO = 7;
  var ALTO = { U1: 1.6, U2: 1.2, U3: .9, U4: 2.6, U5: 2.4, U6: 1.2, U7: 1.0, U8: 1.2, R1: .7, L1: 3.0, D1: 2.3, D2: .9, J1: 3.3, J2: 11, J3: 16 };

  var cl = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var pr = function (t, a, b) { return cl((t - a) / (b - a), 0, 1); };
  var eo = function (p) { return 1 - Math.pow(1 - cl(p, 0, 1), 4); };
  var io = function (p) { p = cl(p, 0, 1); return p < .5 ? 8 * p * p * p * p : 1 - Math.pow(-2 * p + 2, 4) / 2; };
  var eb = function (p) { p = cl(p, 0, 1); var c = 1.6; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); };
  var lerp = function (a, b, p) { return a + (b - a) * p; };

  function cargarScript(src) {
    return new Promise(function (ok, mal) {
      var s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = mal;
      document.head.appendChild(s);
    });
  }
  function empezar() {
    var pedirJson = fetch(BASE + "componentes.json").then(function (r) { return r.json(); });
    cargarScript("assets/lib/three.min.js").then(function () { return pedirJson; })
      .then(armar).catch(function () { /* queda el póster */ });
  }
  if (document.readyState === "complete") setTimeout(empezar, 250);
  else window.addEventListener("load", function () { setTimeout(empezar, 250); });

  function armar(datos) {
    var T3 = window.THREE;
    var cv = document.createElement("canvas");
    cv.className = "hero3d-canvas";
    cv.setAttribute("aria-hidden", "true");
    raiz.appendChild(cv);
    var ren = new T3.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    ren.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    ren.setClearColor(0x000000, 0);
    var esc = new T3.Scene();
    var cam = new T3.PerspectiveCamera(30, 1, 10, 4000);
    esc.add(new T3.HemisphereLight(0xdfe6ff, 0x1a1408, .75));
    var sol = new T3.DirectionalLight(0xffffff, 1.0); sol.position.set(-160, 420, 260); esc.add(sol);
    var contra = new T3.DirectionalLight(0xe9c64b, .3); contra.position.set(260, 120, -200); esc.add(contra);

    var carga = new T3.TextureLoader(), pendientes = [];
    function tex(ruta) {
      // con los callbacks del cargador: si un PNG falla, la promesa se resuelve igual
      // (antes quedaba un temporizador consultando cada 30 ms para siempre — Codex, PR #5)
      var listo;
      pendientes.push(new Promise(function (ok) { listo = ok; }));
      var tx = carga.load(BASE + ruta, function () { listo(); }, undefined, function () { listo(); });
      tx.anisotropy = Math.min(8, ren.capabilities.getMaxAnisotropy());
      return tx;
    }
    function borde(col, op) {
      var g = new T3.EdgesGeometry(new T3.BoxGeometry(PW, .01, PH));
      return new T3.LineSegments(g, new T3.LineBasicMaterial({ color: col, transparent: true, opacity: op }));
    }

    var capas = CAPAS.map(function (c) {
      var g = new T3.Group(), mats = [];
      if (c.tipo === "cu") {
        var m = new T3.MeshBasicMaterial({ map: tex(c.tex), transparent: true, depthWrite: false, side: T3.DoubleSide });
        var pl = new T3.Mesh(new T3.PlaneGeometry(PW, PH), m); pl.rotation.x = -Math.PI / 2; g.add(pl); mats.push([m, 1]);
        var b = borde(c.col, .9); g.add(b); mats.push([b.material, .9]);
      } else if (c.tipo === "fr4") {
        var mf = new T3.MeshStandardMaterial({ color: 0xb59a52, roughness: .55, metalness: 0, transparent: true, opacity: .12, depthWrite: false });
        g.add(new T3.Mesh(new T3.BoxGeometry(PW, 1.6, PH), mf)); mats.push([mf, .12]);
        var bf = borde(0x8a7a4a, .45); g.add(bf); mats.push([bf.material, .45]);
      } else if (c.tipo === "mask") {
        var mm = new T3.MeshStandardMaterial({ color: 0x0a4426, roughness: .35, metalness: .1, transparent: true, opacity: .78, depthWrite: false, side: T3.DoubleSide });
        var pm = new T3.Mesh(new T3.PlaneGeometry(PW, PH), mm); pm.rotation.x = -Math.PI / 2; g.add(pm); mats.push([mm, .78]);
        if (c.tex) {
          var ms = new T3.MeshBasicMaterial({ map: tex(c.tex), transparent: true, depthWrite: false });
          var s = new T3.Mesh(new T3.PlaneGeometry(PW, PH), ms); s.rotation.x = -Math.PI / 2; s.position.y = .05; g.add(s); mats.push([ms, 1]);
        }
        var bm = borde(0x2fbf71, .7); g.add(bm); mats.push([bm.material, .7]);
      } else {
        // componentes, con sus medidas reales (las mismas del reel)
        (datos.fps || []).forEach(function (f) {
          if (f.ref.charAt(0) === "H") return;
          var w = f.w / 2000 * PW, d = f.h / 1221 * PH, h = ALTO[f.ref] || 1;
          var x = (f.x / 2000 - .5) * PW, z = (f.y / 1221 - .5) * PH;
          var metal = /^J[13]/.test(f.ref), verde = f.ref === "J2";
          var mc = new T3.MeshStandardMaterial({ color: verde ? 0x1f6e45 : metal ? 0x9aa0a8 : 0x16171b,
            roughness: metal ? .3 : .45, metalness: metal ? .8 : .15, transparent: true });
          var geo = f.ref === "J3" ? new T3.CylinderGeometry(w / 2 * .82, w / 2 * .82, h, 40) : new T3.BoxGeometry(w * .9, h, d * .9);
          var me = new T3.Mesh(geo, mc); me.position.set(x, h / 2, z); g.add(me); mats.push([mc, 1]);
          var e = new T3.LineSegments(new T3.EdgesGeometry(geo), new T3.LineBasicMaterial({ color: 0xe9c64b, transparent: true, opacity: .35 }));
          e.position.copy(me.position); g.add(e); mats.push([e.material, .35]);
        });
      }
      esc.add(g);
      return { g: g, mats: mats, c: c, foco: 1 };
    });

    // ── interacción: arrastrar gira; la leyenda resalta una capa ──
    var yaw = 0, pitch = 0, vYaw = 0, arrastra = false, px = 0, py = 0, fijo = 0, resaltada = null;
    var ahora = function () { return performance.now() / 1000; };
    cv.addEventListener("pointerdown", function (e) {
      arrastra = true; px = e.clientX; py = e.clientY; fijo = ahora() + 6;
      try { cv.setPointerCapture(e.pointerId); } catch (x) { /* nada */ }
    });
    cv.addEventListener("pointermove", function (e) {
      if (!arrastra) return;
      var dx = e.clientX - px, dy = e.clientY - py; px = e.clientX; py = e.clientY;
      vYaw = dx * .45; yaw += vYaw; pitch = cl(pitch + dy * .25, -14, 30);
    });
    var suelta = function () { arrastra = false; };
    cv.addEventListener("pointerup", suelta); cv.addEventListener("pointercancel", suelta);
    if (leyenda) {
      CAPAS.forEach(function (c, i) {
        if (!c.rot) return;
        var b = document.createElement("button");
        b.type = "button"; b.className = "capa-chip"; b.textContent = c.rot;
        b.style.setProperty("--c", c.col);
        var on = function () { resaltada = i; fijo = ahora() + 6; leyenda.classList.add("con-foco"); b.classList.add("activa"); };
        var off = function () { if (resaltada === i) resaltada = null; leyenda.classList.remove("con-foco"); b.classList.remove("activa"); };
        b.addEventListener("mouseenter", on); b.addEventListener("focus", on);
        b.addEventListener("mouseleave", off); b.addEventListener("blur", off);
        b.addEventListener("click", function () { if (resaltada === i) off(); else { Array.prototype.forEach.call(leyenda.children, function (x) { x.classList.remove("activa"); }); on(); } });
        leyenda.appendChild(b);
      });
    }

    function medir() {
      var r = raiz.getBoundingClientRect(), w = Math.max(1, r.width), h = Math.max(1, r.height);
      ren.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
    }
    medir();
    if ("ResizeObserver" in window) new ResizeObserver(medir).observe(raiz);
    else window.addEventListener("resize", medir);

    // explosión 0..1: ciclo de 10 s (cerrada → se abre con rebote → abierta → se cierra);
    // si el visitante está jugando (arrastre o leyenda), queda abierta.
    var t0 = ahora(), expl = quieto ? 1 : 0;
    function explosionAuto(t) {
      var c = (t - t0) % 10;
      return eb(pr(c, 1.2, 2.4)) * (1 - io(pr(c, 7.6, 8.4)));
    }

    var visible = true, corriendo = false, estabaFijo = false;
    function cuadro() {
      corriendo = visible;
      if (!visible) return;
      var t = ahora(), fijoAhora = t < fijo;
      // al soltar, el ciclo sigue desde «abierta»: no se cierra de golpe
      if (estabaFijo && !fijoAhora) t0 = t - 2.6;
      estabaFijo = fijoAhora;
      expl = quieto ? 1 : (fijoAhora ? lerp(expl, 1, .12) : explosionAuto(t));
      if (!arrastra) { vYaw *= .92; yaw += vYaw * .2; }
      var gira = quieto ? 0 : 10 * Math.sin((t - t0) * .22);
      var az = (112 + gira + yaw) * Math.PI / 180, el = (24 + pitch + 6 * (1 - expl)) * Math.PI / 180;
      var R = lerp(370, 545, eo(expl)), y = 20 * expl;
      cam.position.set(R * Math.cos(el) * Math.sin(az), y + R * Math.sin(el), R * Math.cos(el) * Math.cos(az));
      cam.lookAt(0, y, 0);
      capas.forEach(function (k, i) {
        var cerr = (MEDIO - i) * .45 + (i === 0 ? .2 : 0), abie = (MEDIO - i) * 16.5 + (i === 0 ? 14 : 0);
        k.g.position.y = lerp(cerr, abie, expl);
        var meta = resaltada === null ? 1 : (resaltada === i ? 1 : .12);
        k.foco = lerp(k.foco, meta, .15);
        k.mats.forEach(function (mo) { mo[0].opacity = mo[1] * k.foco; });
      });
      ren.render(esc, cam);
      requestAnimationFrame(cuadro);
    }

    Promise.all(pendientes).then(function () {
      raiz.classList.add("vivo");               // el CSS funde el póster con el lienzo
      requestAnimationFrame(cuadro);
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (es) {
          visible = es[0].isIntersecting;
          if (visible && !corriendo) requestAnimationFrame(cuadro);
        }, { threshold: .05 }).observe(raiz);
      }
    });
  }
})();
