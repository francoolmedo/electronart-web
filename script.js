// ElectronArt landing — minimal interactions.
(function () {
  "use strict";

  // Current year in the footer
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    var cerrar = function () {
      if (!links.classList.contains("open")) return;
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };

    // Cerrar al tocar un link…
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") cerrar();
    });
    // …al scrollear, y al tocar fuera. Sin esto el menú se queda abierto
    // encima del contenido mientras la página se mueve abajo — se veía así en
    // el celular, tapando el título del hero.
    window.addEventListener("scroll", cerrar, { passive: true });
    document.addEventListener("click", function (e) {
      if (!links.contains(e.target) && e.target !== toggle) cerrar();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") cerrar();
    });
  }

  // Los links externos (foro, manual, redes) y el aviso de "pendiente de
  // configurar" viven en enlaces.js, que cargan todas las páginas — acá
  // quedaría a mano sólo para index.html.
})();
