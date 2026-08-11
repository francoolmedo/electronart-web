// ElectronArt — el scroll es una cámara que viaja por la placa.
//
// La idea es la de los sitios «cinematográficos»: el scroll no mueve una
// página, mueve una cámara dentro del mundo del producto. Acá ese mundo es
// una placa de circuito impreso, y no es un video pregrabado: se dibuja de
// verdad, así que se ve nítida a cualquier zoom, pesa unos KB y se puede
// recorrer a cualquier velocidad sin buffering.
//
// El recorrido tiene cuatro tiempos: se entra al ras del cobre siguiendo una
// pista, se sube al pasar por las vías, aparece el integrado, y al final la
// cámara se aleja y revela que todo eso era una esquina de la placa entera.
(function () {
  "use strict";

  var lienzo = document.getElementById("viaje");
  if (!lienzo) return;
  var ctx = lienzo.getContext("2d");
  if (!ctx) return;

  var quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Colores del sistema «Máscara» ───────────────────────────────────────
  var C = {
    mascara: "#0c0e12",
    fr4:     "#12151b",
    cobre:   "#b87333",
    cobreAlto: "#d89a5a",
    oro:     "#c9a227",
    oroAlto: "#e9c64b",
    estano:  "#9aa3b0",
    silk:    "#e7e4dc",
    silkTenue: "rgba(231,228,220,.35)"
  };

  // ── La placa ────────────────────────────────────────────────────────────
  // Coordenadas en "mm" imaginarios; la cámara decide cuánto se ve.
  var ANCHO = 260, ALTO = 170;

  var pistas = [], vias = [], pads = [], chips = [], puntos = [];

  function construir() {
    pistas = []; vias = []; pads = []; chips = []; puntos = [];

    // El camino principal: la pista por la que viaja la cámara. Va de
    // izquierda a derecha con quiebres a 45°, como se rutea de verdad.
    var x = -20, y = ALTO * 0.62;
    puntos.push([x, y]);
    var tramos = 9;
    for (var i = 0; i < tramos; i++) {
      x += 22 + Math.random() * 16;
      puntos.push([x, y]);
      if (i < tramos - 1) {
        var d = (i % 2 ? 1 : -1) * (14 + Math.random() * 12);
        if (y + d > 24 && y + d < ALTO - 24) {
          x += Math.abs(d); y += d;
          puntos.push([x, y]);
          vias.push([x, y]);
        }
      }
    }
    puntos.push([ANCHO + 20, y]);
    pistas.push({ pts: puntos, ancho: 1.6, principal: true });

    // Pistas de acompañamiento: dan densidad y contexto.
    for (var k = 0; k < 14; k++) {
      var yy = 14 + Math.random() * (ALTO - 28);
      var xx = -10, pts = [[xx, yy]];
      while (xx < ANCHO + 10) {
        xx += 18 + Math.random() * 40;
        pts.push([xx, yy]);
        if (Math.random() < 0.45) {
          var dd = (Math.random() < 0.5 ? -1 : 1) * (10 + Math.random() * 18);
          if (yy + dd > 10 && yy + dd < ALTO - 10) {
            xx += Math.abs(dd); yy += dd;
            pts.push([xx, yy]);
            if (Math.random() < 0.5) vias.push([xx, yy]);
          }
        }
      }
      pistas.push({ pts: pts, ancho: 0.7 + Math.random() * 0.5, principal: false });
    }

    // Integrados. Van ANCLADOS AL CAMINO, no en posiciones fijas de la placa:
    // puestos al azar, la cámara atravesaba tramos enteros sin nada alrededor y
    // el capítulo que habla de componentes se leía sobre una pista sola en el
    // vacío. Cada uno se cuelga a una altura del recorrido y a un costado, así
    // el texto y lo que se ve caen juntos.
    var Lc = 0;
    for (var t = 1; t < puntos.length; t++)
      Lc += Math.hypot(puntos[t][0] - puntos[t-1][0], puntos[t][1] - puntos[t-1][1]);

    function junto(frac, lado, dist) {
      var d = Lc * frac, acum = 0;
      for (var i = 1; i < puntos.length; i++) {
        var s = Math.hypot(puntos[i][0] - puntos[i-1][0], puntos[i][1] - puntos[i-1][1]);
        if (acum + s >= d) {
          var u = s ? (d - acum) / s : 0;
          var px = puntos[i-1][0] + (puntos[i][0] - puntos[i-1][0]) * u;
          var py = puntos[i-1][1] + (puntos[i][1] - puntos[i-1][1]) * u;
          return [px, Math.max(22, Math.min(ALTO - 22, py + lado * dist))];
        }
        acum += s;
      }
      return [ANCHO / 2, ALTO / 2];
    }

    var u1 = junto(0.30, -1, 30), u2 = junto(0.58, 1, 26), u3 = junto(0.82, -1, 28);
    [[u1[0], u1[1], 26, 17, "U1"],
     [u2[0], u2[1], 18, 13, "U2"],
     [u3[0], u3[1], 22, 15, "U3"]].forEach(function (c) {
      chips.push({ x: c[0], y: c[1], w: c[2], h: c[3], ref: c[4] });
      var pines = Math.max(4, Math.round(c[2] / 3.2));
      for (var p = 0; p < pines; p++) {
        var px = c[0] - c[2] / 2 + (p + 0.5) * (c[2] / pines);
        pads.push([px, c[1] - c[3] / 2 - 1.6, 1.5, 3.0]);
        pads.push([px, c[1] + c[3] / 2 + 1.6, 1.5, 3.0]);
      }
    });

    // Pads sueltos de componentes pasivos.
    for (var q = 0; q < 26; q++) {
      var ax = 12 + Math.random() * (ANCHO - 24);
      var ay = 12 + Math.random() * (ALTO - 24);
      pads.push([ax, ay, 2.4, 1.6]);
      pads.push([ax + 5, ay, 2.4, 1.6]);
    }
  }

  // ── Cámara: dónde mira según el avance (0 → 1) ──────────────────────────
  function largoCamino() {
    var L = 0;
    for (var i = 1; i < puntos.length; i++)
      L += Math.hypot(puntos[i][0] - puntos[i-1][0], puntos[i][1] - puntos[i-1][1]);
    return L;
  }

  function puntoEnCamino(d) {
    for (var i = 1; i < puntos.length; i++) {
      var s = Math.hypot(puntos[i][0] - puntos[i-1][0], puntos[i][1] - puntos[i-1][1]);
      if (d <= s) {
        var t = s ? d / s : 0;
        return [puntos[i-1][0] + (puntos[i][0] - puntos[i-1][0]) * t,
                puntos[i-1][1] + (puntos[i][1] - puntos[i-1][1]) * t];
      }
      d -= s;
    }
    return puntos[puntos.length - 1];
  }

  function suave(t) { return t * t * (3 - 2 * t); }

  function camara(p) {
    // Tres cuartos de recorrido al ras siguiendo la pista, y el último cuarto
    // alejándose hasta ver la placa entera. El zoom sale de una potencia para
    // que el alejamiento se sienta acelerado, como una caída.
    var L = largoCamino();
    var avance = Math.min(p / 0.75, 1);
    var pos = puntoEnCamino(avance * L * 0.98);
    var salida = Math.max(0, (p - 0.72) / 0.28);
    // Arranca a 2,2× y no a 9,9×: desde tan cerca sólo se veía un tramo de
    // cobre sin contexto, y el ojo no tenía con qué entender que eso era una
    // placa. A 2,2× entra el vecindario —pistas que cruzan, vías, pads— y el
    // alejamiento final sigue leyéndose como una salida.
    var escala = 1.35 * Math.pow(1 - suave(Math.min(salida, 1)), 2.2) + 0.85;
    var centro = [ANCHO / 2, ALTO / 2];
    var mezcla = suave(Math.min(salida, 1));
    return {
      x: pos[0] * (1 - mezcla) + centro[0] * mezcla,
      y: pos[1] * (1 - mezcla) + centro[1] * mezcla,
      escala: escala
    };
  }


  // Un cartel dentro de la escena, para que un problema se VEA en vez de dejar
  // una franja negra. Sin consola a mano (un teléfono, por ejemplo) es la única
  // forma de enterarse.
  var cartelPuesto = false;
  function avisar(texto) {
    if (cartelPuesto) return;
    cartelPuesto = true;
    var d = document.createElement("div");
    d.style.cssText = "position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);" +
      "z-index:5;padding:10px 14px;background:rgba(12,14,18,.94);color:#c9a227;" +
      "border:1px solid #3a404f;font:12px/1.6 Consolas,monospace;text-align:center;" +
      "max-width:80%";
    d.textContent = texto;
    (lienzo.parentElement || document.body).appendChild(d);
  }

  // ── Dibujado ────────────────────────────────────────────────────────────
  var W = 0, H = 0, dpr = 1;

  // Diagnóstico en pantalla: activar con `?diag` en la dirección. Sirve para
  // ver qué pasa donde no hay consola a mano — un teléfono, por ejemplo.
  var verDiag = /[?&]diag\b/.test(location.search);
  function diagnostico(modo) {
    if (!verDiag) return;
    var caja = document.getElementById("viaje-diag");
    if (!caja) {
      caja = document.createElement("pre");
      caja.id = "viaje-diag";
      caja.style.cssText = "position:fixed;left:8px;top:8px;z-index:999;margin:0;" +
        "padding:6px 8px;background:rgba(12,14,18,.92);color:#c9a227;" +
        "font:11px/1.5 Consolas,monospace;border:1px solid #3a404f;white-space:pre";
      document.body.appendChild(caja);
    }
    caja.textContent =
      "modo      " + modo + "\n" +
      "canvas    " + W + "x" + H + "\n" +
      "ventana   " + window.innerWidth + "x" + window.innerHeight + "\n" +
      "documento " + document.documentElement.scrollHeight + " de alto\n" +
      "sección   " + Math.round(seccion.getBoundingClientRect().height) + "\n" +
      "scroll    " + (huboScroll ? "sí" : "no") + "\n" +
      "avance    " + (actual * 100).toFixed(0) + "%";
  }

  // Techo del buffer, en píxeles. Safari en iOS DESCARTA un canvas que se pasa
  // de área y lo deja en negro sin decir nada — no lanza error, no avisa: sólo
  // no dibuja. Y es fácil pasarse sin querer: adentro de un marco que crece con
  // el contenido, `100vh` no es la pantalla sino el alto del marco entero, así
  // que el canvas terminaba midiendo miles de píxeles de alto.
  var AREA_MAX = 4.0e6;

  function medir() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = lienzo.clientWidth;
    H = lienzo.clientHeight;
    // Si el contenedor vino disparatado, se dibuja sobre un alto razonable.
    if (H > 1400) H = 1400;
    var area = W * H * dpr * dpr;
    if (area > AREA_MAX) dpr = Math.max(1, dpr * Math.sqrt(AREA_MAX / area));
    lienzo.width = Math.max(1, Math.round(W * dpr));
    lienzo.height = Math.max(1, Math.round(H * dpr));
  }

  function dibujar(p) {
    if (!W || !H) {
      // Sin tamaño no hay nada que dibujar, pero quedarse mudo esconde el
      // problema: se avisa en el canvas mismo, que es donde se está mirando.
      avisar("El lienzo todavía no tiene tamaño (" + W + "×" + H + ")");
      return;
    }
    var cam = camara(p);
    var esc = (W / ANCHO) * cam.escala;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = C.mascara;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.scale(esc, esc);
    ctx.translate(-cam.x, -cam.y);

    // Sustrato
    ctx.fillStyle = C.fr4;
    ctx.fillRect(0, 0, ANCHO, ALTO);

    // Grilla de taladro, sólo cuando estamos cerca (si no, es ruido).
    if (esc > 3) {
      ctx.fillStyle = "rgba(255,255,255,.045)";
      for (var gx = 5; gx < ANCHO; gx += 5)
        for (var gy = 5; gy < ALTO; gy += 5)
          ctx.fillRect(gx - 0.15, gy - 0.15, 0.3, 0.3);
    }

    // Pistas
    pistas.forEach(function (t) {
      ctx.beginPath();
      ctx.moveTo(t.pts[0][0], t.pts[0][1]);
      for (var i = 1; i < t.pts.length; i++) ctx.lineTo(t.pts[i][0], t.pts[i][1]);
      ctx.lineWidth = t.ancho;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = t.principal ? C.cobreAlto : C.cobre;
      ctx.globalAlpha = t.principal ? 0.95 : 0.5;
      ctx.stroke();
      ctx.globalAlpha = 1;
    });

    // Pulso de corriente recorriendo la pista principal, delante de la cámara.
    //
    // Eran treinta circulitos en fila, y se veían como treinta circulitos en
    // fila: planos, todos iguales, sin dirección. La corriente no se ve como
    // cuentas de un collar. Ahora cada carga es un trazo ESTIRADO en el sentido
    // de la marcha, con halo alrededor y un núcleo claro adentro — el ojo lee
    // volumen y velocidad, no puntos. El estirado sale del propio camino: se
    // toma el punto anterior y el siguiente, así el destello dobla en las
    // curvas en vez de quedar clavado en horizontal.
    var L = largoCamino();
    var frente = Math.min(p / 0.75, 1) * L * 0.98;
    var CARGAS = 26;
    ctx.lineCap = "round";
    for (var k = 0; k < CARGAS; k++) {
      var d = frente + k * 5.2;
      if (d > L) break;
      var desvanece = 1 - k / CARGAS;
      var q = puntoEnCamino(d);
      // Estela: del punto de atrás al de adelante, más larga cuanto más viva.
      var largo = 2.6 + 4.2 * desvanece;
      var atras = puntoEnCamino(Math.max(0, d - largo));
      var brillo = 0.85 * desvanece * desvanece;

      // Halo: da el cuerpo, y es lo que saca la sensación de recorte plano.
      var halo = ctx.createRadialGradient(q[0], q[1], 0, q[0], q[1], 3.2);
      halo.addColorStop(0, "rgba(255,226,140," + (0.55 * brillo) + ")");
      halo.addColorStop(0.45, "rgba(233,198,75," + (0.22 * brillo) + ")");
      halo.addColorStop(1, "rgba(233,198,75,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(q[0], q[1], 3.2, 0, 6.2832);
      ctx.fill();

      // Estela estirada hacia atrás, con la cola apagándose.
      var cola = ctx.createLinearGradient(atras[0], atras[1], q[0], q[1]);
      cola.addColorStop(0, "rgba(233,198,75,0)");
      cola.addColorStop(1, "rgba(255,214,102," + (0.7 * brillo) + ")");
      ctx.strokeStyle = cola;
      ctx.lineWidth = 0.85 + 0.5 * desvanece;
      ctx.beginPath();
      ctx.moveTo(atras[0], atras[1]);
      ctx.lineTo(q[0], q[1]);
      ctx.stroke();

      // Núcleo: el punto caliente. Chico y casi blanco, contra el halo tibio.
      ctx.fillStyle = "rgba(255,246,214," + (0.9 * brillo) + ")";
      ctx.beginPath();
      ctx.arc(q[0], q[1], 0.55 + 0.25 * desvanece, 0, 6.2832);
      ctx.fill();
    }

    // Pads
    ctx.fillStyle = C.oro;
    pads.forEach(function (a) {
      ctx.fillRect(a[0] - a[2] / 2, a[1] - a[3] / 2, a[2], a[3]);
    });

    // Vías: anillo de cobre con su perforación
    vias.forEach(function (v) {
      ctx.beginPath(); ctx.arc(v[0], v[1], 1.5, 0, 6.2832);
      ctx.fillStyle = C.cobre; ctx.fill();
      ctx.beginPath(); ctx.arc(v[0], v[1], 0.6, 0, 6.2832);
      ctx.fillStyle = C.mascara; ctx.fill();
    });

    // Integrados con su serigrafía y la marca del pin 1
    chips.forEach(function (c) {
      ctx.fillStyle = "#1b1e25";
      ctx.strokeStyle = "#2c313d";
      ctx.lineWidth = 0.4;
      ctx.beginPath();
      ctx.rect(c.x - c.w / 2, c.y - c.h / 2, c.w, c.h);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.arc(c.x - c.w / 2 + 2.6, c.y - c.h / 2 + 2.6, 0.9, 0, 6.2832);
      ctx.fillStyle = C.silkTenue; ctx.fill();
      if (esc > 2.2) {
        ctx.fillStyle = C.silk;
        ctx.font = "600 " + (c.h * 0.34) + "px Consolas, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(c.ref, c.x, c.y);
      }
    });

    // Contorno fresado de la placa, visible recién al alejarse
    if (esc < 3.2) {
      ctx.strokeStyle = "rgba(154,157,166,.5)";
      ctx.lineWidth = 0.6;
      ctx.strokeRect(0, 0, ANCHO, ALTO);
    }
    ctx.restore();
  }

  // ── Sincronía con el scroll ─────────────────────────────────────────────
  var seccion = lienzo.closest(".viaje-seccion") || lienzo.parentElement;
  var indicador = document.getElementById("viaje-avance");
  var capitulos = Array.prototype.slice.call(
    document.querySelectorAll("[data-viaje-cap]"));
  var objetivo = 0, actual = 0, animando = false;

  function progreso() {
    var r = seccion.getBoundingClientRect();
    var total = r.height - window.innerHeight;
    if (total <= 0) return 0;
    return Math.max(0, Math.min(1, -r.top / total));
  }

  // ── Modo automático (sin scroll de ventana) ─────────────────────────────
  var DURACION = 15000;      // ms de recorrido completo
  var autoDesde = 0, autoAndando = false;

  function autoCuadro(t) {
    if (!autoDesde) autoDesde = t;
    var p = Math.min((t - autoDesde) / DURACION, 1);
    marcarCapitulo(p);
    dibujar(p);
    if (p < 1) requestAnimationFrame(autoCuadro);
    else { autoAndando = false; }
  }

  function arrancarAuto() {
    if (autoAndando) return;
    autoAndando = true;
    autoDesde = 0;
    requestAnimationFrame(autoCuadro);
  }

  function prepararAuto() {
    seccion.classList.add("viaje-auto");
    diagnostico("auto");
    if (quieto) { marcarCapitulo(0); dibujar(0); return; }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) arrancarAuto(); });
      }, { threshold: 0.35 }).observe(seccion);
    } else {
      arrancarAuto();
    }
    // Volver a mirarlo de nuevo: un toque o un clic lo reinicia.
    seccion.addEventListener("click", function () {
      if (!autoAndando) arrancarAuto();
    });
  }

  function marcarCapitulo(p) {
    var cual = Math.min(capitulos.length - 1,
                        Math.floor(p * capitulos.length + 0.0001));
    capitulos.forEach(function (c, i) {
      c.classList.toggle("activo", i === cual);
    });
    if (indicador) {
      indicador.textContent = (p * 100).toFixed(0).padStart(2, "0");
    }
  }

  function cuadro() {
    // Suavizado: el scroll de rueda llega a saltos y sin esto la cámara
    // tironea. Persigue al objetivo con un décimo de la diferencia.
    actual += (objetivo - actual) * 0.12;
    if (Math.abs(objetivo - actual) < 0.0004) {
      actual = objetivo;
      animando = false;
    }
    dibujar(actual);
    if (animando) requestAnimationFrame(cuadro);
  }

  function alScroll() {
    var p = progreso();
    // Sólo cuenta como scroll de verdad si MUEVE el recorrido: en un marco sin
    // scroll propio el evento puede llegar igual con el progreso clavado en 0.
    if (p > 0.001) {
      huboScroll = true;
      clearTimeout(esperaAuto);
      autoAndando = false;            // si estaba corriendo solo, manda el dedo
      seccion.classList.remove("viaje-auto");
    }
    objetivo = p;
    marcarCapitulo(objetivo);
    if (quieto) { actual = objetivo; dibujar(actual); return; }
    if (!animando) { animando = true; requestAnimationFrame(cuadro); }
  }

  // ── Arranque ────────────────────────────────────────────────────────────
  // Nada de detectar «¿esta página scrollea?»: adivinarlo salió mal dos veces.
  // Dentro de un visor que estira el marco hasta la altura del contenido (los
  // artifacts de Claude), `scrollHeight` SÍ es mayor que la ventana aunque el
  // marco no scrollee, así que la detección daba un falso positivo y el
  // recorrido quedaba esperando un scroll que nunca llegaba.
  //
  // Ahora se dibuja siempre el primer cuadro y se deja que los hechos decidan:
  // si en un segundo y medio no llegó ningún scroll que mueva el recorrido, se
  // reproduce solo. Si llega, manda el scroll y el automático se cancela.
  var huboScroll = false, esperaAuto = null, intentos = 0;

  function arrancar() {
    medir();
    // El canvas puede medir 0 si todavía no hubo maquetado. Se reintenta, pero
    // con tope: un bucle infinito de rAF dejaría la pantalla en negro y el
    // teléfono caliente.
    if ((!W || !H) && intentos++ < 60) { requestAnimationFrame(arrancar); return; }
    construir();
    marcarCapitulo(0);
    dibujar(0);                       // que se vea algo YA, pase lo que pase
    diagnostico("inicio");

    // El automático es un PARACAÍDAS, no el modo normal: sólo entra cuando la
    // sección no tiene recorrido de scroll propio (un visor que estira el marco
    // hasta la altura del contenido). Antes bastaba con que no llegara scroll en
    // 1,5 s, y la animación arrancaba sola en la cara de quien todavía no había
    // llegado a moverla — el recorrido tiene que mandarlo el dedo.
    clearTimeout(esperaAuto);
    esperaAuto = setTimeout(function () {
      var r = seccion.getBoundingClientRect();
      var hayRecorrido = (r.height - window.innerHeight) > 8;
      if (!huboScroll && !hayRecorrido) {
        seccion.classList.add("viaje-auto");
        medir();                      // la sección cambió de alto
        prepararAuto();
      }
    }, 2500);
  }

  var t;
  window.addEventListener("resize", function () {
    clearTimeout(t);
    t = setTimeout(arrancar, 180);
  });
  window.addEventListener("scroll", alScroll, { passive: true });

  // El canvas puede medir 0 al arrancar y recién tener tamaño más tarde: dentro
  // de un marco embebido el alto se acomoda después, y adivinar «cuándo está
  // listo» con reintentos contados falla — se rinde antes de tiempo y queda en
  // negro para siempre. Un ResizeObserver avisa cuando pasa de verdad.
  if ("ResizeObserver" in window) {
    var ro = new ResizeObserver(function (entradas) {
      var e = entradas[0];
      if (!e) return;
      var caja = e.contentRect;
      if (caja.width < 2 || caja.height < 2) return;
      if (Math.abs(caja.width - W) < 2 && Math.abs(caja.height - H) < 2) return;
      medir();
      if (!pistas.length) construir();
      dibujar(autoAndando ? actual : (huboScroll ? progreso() : 0));
      diagnostico("resize");
    });
    ro.observe(lienzo);
  }

  try {
    arrancar();
  } catch (e) {
    avisar("El recorrido no pudo arrancar: " + (e && e.message ? e.message : e));
  }
})();
