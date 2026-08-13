// ElectronArt — enlaces externos del sitio, todos en un solo lugar.
//
// Cada `<a data-link="foro">` de cualquier página toma su URL de acá. Poné la
// URL cuando exista y listo: no hay que buscar el `href` en cada archivo ni
// acordarse de que el mismo link está repetido en el nav, en el cuerpo y en el
// pie. Los que sigan vacíos avisan al hacer clic en vez de llevar a ningún lado.
(function () {
  "use strict";

  var ENLACES = {
    // Foro y cuentas — publicado en PythonAnywhere el 3/8/2026
    // (ver docs/plan/deploy-pythonanywhere.md).
    // 🔴 Con la raíz pelada, «Entrar al foro» llevaba a la **portada** del
    // backend, no al foro: el visitante hacía clic y aterrizaba en otra landing
    // parecida a la que acababa de dejar. Va la ruta completa.
    foro: "https://electronart.pythonanywhere.com/forum",
    // La tienda: un solo lugar con el checkout real. Los planes (Gumroad para
    // internacional, MercadoPago para Argentina) se configuran en el backend
    // (EA_PAGO_URLS, ver docs/plan/F14-seguridad-idiomas.md). Los botones de
    // precios llevan acá, no a links de pasarela que no existen.
    tienda: "https://electronart.pythonanywhere.com/store",
    // La prueba de 14 días: emite una licencia Pro que vence sola, sin pedir
    // tarjeta. Va acá y no como URL suelta en el HTML por lo mismo que el
    // resto — el día que cambie el dominio, se cambia en un solo lugar.
    prueba: "https://electronart.pythonanywhere.com/prueba",
    // Manual en PDF (docs/Manual-ElectronArt.pdf, subido al hosting).
    // 🔴 EL INSTALADOR. Sin esto no hay producto: el que paga recibe la
    // licencia y no tiene qué instalar. Estuvo en `#` hasta el 10/8/2026, así
    // que la página de descargas mostraba un aviso de «enlace pendiente» en
    // vez de bajar nada.
    //
    // Vive en GitHub Releases y no en el hosting propio porque son 129 MB: la
    // cuenta gratuita de PythonAnywhere admite 100 MB por archivo, y el
    // tráfico de un binario pesado se comería su cuota. GitHub no cobra el
    // tráfico de los releases y sirve por CDN.
    // El instalador va primero en la tabla y es la descarga recomendada desde
    // F22: deja accesos, desinstalador y asociación de archivos, y no pide
    // permisos de administrador. La clave la escribe `gen_downloads.py` como
    // `instalador-<versión>`; sin esta entrada, la fila que él genera queda
    // apuntando a un enlace que no existe.
    "instalador-9.0": "https://github.com/francoolmedo/electronart-releases/releases/download/v9.0/ElectronArt-v9.0-win64-setup.exe",
    "descarga-9.0": "https://github.com/francoolmedo/electronart-releases/releases/download/v9.0/ElectronArt-v9.0-win64.zip",
    // El manual viaja con el sitio: es el mismo PDF que se genera con
    // `python docs/build_manual_pdf.py`, copiado a la raíz al publicar.
    manual: "Manual-ElectronArt.pdf",
    // Con `mailto:` y no pelado: sin el esquema, el navegador lo toma como
    // una ruta relativa y el link no abre el correo.
    contacto: "mailto:soporte@electroniklosungen.com.ar",
    // Vacías a propósito: las cuentas de la marca todavía no existen y el pie
    // del sitio ya no las ofrece. Cuando se creen, se completan acá y se
    // vuelve a poner la columna «Seguinos» en `index.html`.
    instagram: "",
    youtube: "",
    github: ""
    // Las descargas de versiones anteriores las escribe
    // scripts/gen_downloads.py: con `--base-url https://…` quedan enlazadas de
    // verdad y no pasan por acá.
  };

  document.querySelectorAll("a[data-link]").forEach(function (a) {
    var clave = a.getAttribute("data-link");
    var url = ENLACES[clave];
    if (url) {
      a.setAttribute("href", url);
      if (/^https?:/i.test(url)) {
        a.setAttribute("rel", "noopener");
      }
    }
  });

  // Lo que quedó sin configurar no puede navegar a "#" en silencio: avisa.
  document.querySelectorAll('a[href="#"][data-pay], a[href="#"][data-link]')
    .forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var que = a.getAttribute("data-pay") || a.getAttribute("data-link");
        alert("Enlace pendiente de configurar: " + que +
              "\n(Cargalo en website/enlaces.js.)");
      });
    });
})();
