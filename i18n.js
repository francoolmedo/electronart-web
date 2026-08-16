/* ElectronArt — la web en los tres idiomas del programa (F14.2)
 *
 * El software está en Español, English y Português desde la v8.30 —el propio
 * changelog lo anuncia— y la web estaba **sólo en español**, con `lang="es"`
 * clavado en el HTML. O sea que alguien que abre el programa en inglés y va a
 * la página a comprar, no la entiende. Ese es un agujero de venta, no de estilo.
 *
 * ── Por qué el diccionario va indexado por el texto en español ──────────────
 *
 * La alternativa habitual es marcar cada elemento con `data-i18n="clave"`. Acá
 * significaría tocar unos 130 elementos de una página que ya funciona y que
 * lleva encima el sistema visual entero: mucho riesgo de romper algo por un
 * beneficio que, en UNA página, no se nota.
 *
 * Indexando por el texto original la página no se toca: el español vive en el
 * HTML (que sigue siendo la fuente y lo que ve un buscador), y acá están sus
 * traducciones. El costo conocido es que **si alguien edita una frase en el
 * HTML, su traducción deja de encontrarse**. Por eso existe
 * `scripts/check_i18n_web.py`, que lista exactamente qué quedó sin traducir y
 * corre dentro de `release_check`: el modo de fallar es visible y barato, no
 * silencioso.
 */
(function () {
  "use strict";

  var IDIOMAS = { es: "Español", en: "English", pt: "Português" };
  var CLAVE = "ea_idioma";

  /* Traducciones. La clave es el texto en español EXACTO como está en el HTML
     (sin espacios de sobra). Los textos largos van completos a propósito: una
     traducción cortada a la mitad se lee peor que no traducir. */
  var T = {
    en: {
      /* ── head / meta ── */
      "ElectronArt — EDA profesional: Esquemático, PCB, Simulación y PLC":
        "ElectronArt — Professional EDA: Schematic, PCB, Simulation and PLC",
      "ElectronArt es una suite EDA de escritorio: diseño de esquemáticos, ruteo de PCB con DRC y Gerber, simulación SPICE, editor Ladder/PLC y exportación de fabricación. Por Electronik Lösungen.":
        "ElectronArt is a desktop EDA suite: schematic capture, PCB routing with DRC and Gerber, SPICE simulation, Ladder/PLC editor and fabrication output. By Electronik Lösungen.",
      "ElectronArt — Suite EDA profesional": "ElectronArt — Professional EDA suite",
      "Esquemático · PCB · Simulación SPICE · Ladder/PLC · Fabricación. Sin internet, sin suscripción obligatoria.":
        "Schematic · PCB · SPICE simulation · Ladder/PLC · Fabrication. No internet, no forced subscription.",

      /* ── nav ── */
      "Características": "Features",
      "Flujo": "Workflow",
      "Comparación": "Comparison",
      "Precios": "Pricing",
      "Descargas": "Downloads",
      "FAQ": "FAQ",
      "Comunidad": "Community",
      "Descargar": "Download",
      "Principal": "Main",
      "Menú": "Menu",
      "Idioma": "Language",

      /* ── hero ── */
      "Diseñe, simule y fabrique": "Design, simulate and manufacture",
      "en una sola herramienta": "in a single tool",
      "ElectronArt integra captura de esquemáticos, simulación SPICE, ruteo de PCB multicapa con autorouter configurable y salida de fabricación completa — Gerber con arcos reales, Excellon, IPC-2581, ODB++ — en una aplicación de escritorio rápida y sin dependencias de la nube.":
        "ElectronArt brings together schematic capture, SPICE simulation, multilayer PCB routing with a configurable autorouter, and a complete fabrication output — Gerber with true arcs, Excellon, IPC-2581, ODB++ — in a fast desktop application with no cloud dependencies.",
      "Empezar gratis": "Start for free",
      "Ver el flujo ▸": "See the workflow ▸",
      "✓ Funciona sin internet": "✓ Works offline",
      "✓ Sin suscripción obligatoria": "✓ No forced subscription",
      "✓ Windows 10/11": "✓ Windows 10/11",
      "ElectronArt — editor de PCB con la placa ruteada, capas y propiedades":
        "ElectronArt — PCB editor showing the routed board, layers and properties",

      /* ── viaje ── */
      "Recorrido por una placa": "A trip across a board",
      "Cobre": "Copper",
      "Cada pista es una decisión": "Every trace is a decision",
      "Ancho, capa, separación, impedancia. ElectronArt las respeta mientras ruteás, no cuando ya es tarde.":
        "Width, layer, clearance, impedance. ElectronArt honours them while you route, not once it is too late.",
      "Vías": "Vias",
      "Bajás de capa sin perder la red": "Change layer without losing the net",
      "El autoruteo pone la vía donde hace falta y no donde no: un pad pasante ya cruza la placa, y ahí no va ninguna.":
        "The autorouter puts a via where one is needed and nowhere else: a through-hole pad already crosses the board, so none belongs there.",
      "Componentes": "Components",
      "Modelos de verdad, no cajitas": "Real models, not little boxes",
      "Más de cien encapsulados con las medidas del fabricante, y el modo caricatura para cuando lo que importa es entender.":
        "Over a hundred packages with the manufacturer's dimensions, plus cartoon mode for when what matters is understanding.",
      "Fabricación": "Fabrication",
      "Y termina en un archivo que la fábrica acepta": "And it ends in a file the fab accepts",
      "Gerber con arcos reales, taladros, Pick & Place, BOM, IPC-2581 y ODB++. Sin sorpresas.":
        "Gerber with true arcs, drills, Pick & Place, BOM, IPC-2581 and ODB++. No surprises.",
      "Avance": "Progress",

      /* ── features ── */
      "Un flujo de trabajo completo, sin cambiar de programa":
        "A complete workflow, without switching programs",
      "Esquemático, placa, simulación y documentación comparten un mismo proyecto y se mantienen sincronizados.":
        "Schematic, board, simulation and documentation share one project and stay in sync.",
      "Captura de esquemáticos": "Schematic capture",
      "137 símbolos en estilos ANSI, IEC y educativo, buses, hojas jerárquicas, numeración de conductores IEC, cross-probing con la placa y anotación automática de referencias.":
        "137 symbols in ANSI, IEC and educational styles, buses, hierarchical sheets, IEC wire numbering, cross-probing with the board and automatic reference annotation.",
      "Ruteo de PCB profesional": "Professional PCB routing",
      "Ruteo interactivo a 45°/90°/arcos, pares diferenciales, serpentinas de igualación, planos de cobre y teardrops. Autorouter con estrategia, grilla y costos ajustables, dos caras y vías puestas por conectividad.":
        "Interactive routing at 45°/90°/arcs, differential pairs, length-matching meanders, copper pours and teardrops. Autorouter with adjustable strategy, grid and costs, two sides and vias placed by connectivity.",
      "Simulación SPICE integrada": "Built-in SPICE simulation",
      "DC, transitorio y AC con modelos no lineales reales (diodo exponencial, BJT Ebers-Moll, MOSFET nivel 1, SCR/Triac con enganche), barridos, Monte Carlo, Fourier/THD y banco con osciloscopio.":
        "DC, transient and AC with real non-linear models (exponential diode, Ebers-Moll BJT, level-1 MOSFET, latching SCR/Triac), sweeps, Monte Carlo, Fourier/THD and a bench with an oscilloscope.",
      "Salida de fabricación": "Fabrication output",
      "Paquete completo en un clic: Gerber RS-274X con arcos G02/G03 reales, Excellon, Pick & Place, BOM con stock en vivo, PDF, IPC-2581 y ODB++, listo para JLCPCB o PCBWay.":
        "The complete package in one click: Gerber RS-274X with true G02/G03 arcs, Excellon, Pick & Place, BOM with live stock, PDF, IPC-2581 and ODB++, ready for JLCPCB or PCBWay.",
      "Interoperabilidad": "Interoperability",
      "Importa KiCad, EAGLE, Gerber multicapa, IPC-2581 y ODB++; exporta STEP 3D con color, DXF y bibliotecas KiCad. Sus proyectos nunca quedan encerrados en un formato.":
        "Imports KiCad, EAGLE, multilayer Gerber, IPC-2581 and ODB++; exports coloured 3D STEP, DXF and KiCad libraries. Your projects are never locked into a format.",
      "Verificación DRC y ERC": "DRC and ERC checking",
      "Reglas por clase de red (clearance, ancho, anillo anular, borde, taladros, pares diferenciales) con panel de violaciones navegable, y verificación eléctrica del esquemático.":
        "Rules per net class (clearance, width, annular ring, board edge, drills, differential pairs) with a navigable violations panel, plus electrical checking of the schematic.",
      "Biblioteca de componentes real": "A real component library",
      "Catálogo curado de más de 150 partes verificadas, stock LCSC en vivo, importación del CAD real de EasyEDA y un motor que interpreta datasheets en PDF para crear el símbolo exacto.":
        "A curated catalogue of over 150 verified parts, live LCSC stock, import of real EasyEDA CAD, and an engine that reads PDF datasheets to build the exact symbol.",
      "Control industrial y PLC": "Industrial control and PLC",
      "Símbolos IEC de potencia y maniobra, contactores con referencias cruzadas, editor Ladder con simulación en vivo y co-simulación de microcontroladores AVR en el esquemático.":
        "IEC power and switchgear symbols, contactors with cross-references, a Ladder editor with live simulation, and AVR microcontroller co-simulation right in the schematic.",
      "Vista 3D de la placa": "3D board view",
      "Visor OpenGL integrado, no una exportación: cuerpos por encapsulado, cobre y máscara reales, sombreado ambiental horneado, LED translúcidos y render 4K para presentar el proyecto. También exporta STEP con color.":
        "A built-in OpenGL viewer, not an export: bodies per package, real copper and soldermask, baked ambient shading, translucent LEDs and 4K rendering to present the project. It also exports coloured STEP.",
      "Modo caricatura": "Cartoon mode",
      "El mismo circuito, dibujado como en un libro de electrónica: cada componente de la biblioteca tiene su ilustración reconocible. Para enseñar, documentar o entender de un vistazo qué hace la placa.":
        "The same circuit, drawn as in an electronics textbook: every component in the library has its own recognisable illustration. To teach, to document, or to grasp at a glance what the board does.",
      "Tablero en vivo": "Live dashboard",
      "Abrí el esquemático y el PCB en el browser —o en una tablet del mismo wifi, protegida con token— y vas viendo cómo se actualizan mientras editás, con botones para refrescar, repour y DRC.":
        "Open the schematic and the PCB in a browser —or on a tablet on the same wifi, protected by a token— and watch them update as you edit, with buttons to refresh, re-pour and run DRC.",
      "Rápido con placas grandes": "Fast on big boards",
      "Niveles de detalle al alejar, ancho mínimo de pista en pantalla (las pistas nunca desaparecen), antialias que se aparta durante el paneo e índice espacial que hace el DRC cientos de veces más rápido en placas de miles de pistas.":
        "Levels of detail as you zoom out, a minimum on-screen trace width (traces never vanish), antialiasing that steps aside while panning, and a spatial index that makes DRC hundreds of times faster on boards with thousands of traces.",

      /* ── flujo ── */
      "Del esquema a la fábrica": "From schematic to fab",
      "Dibujá": "Draw",
      "Colocá componentes y cableá tu circuito.": "Place components and wire your circuit.",
      "Simulá": "Simulate",
      "Verificá el comportamiento con SPICE y ERC.": "Check the behaviour with SPICE and ERC.",
      "Ruteá": "Route",
      "Sincronizá a PCB, ruteá el cobre y corré el DRC.":
        "Sync to the PCB, route the copper and run DRC.",
      "Fabricá": "Manufacture",
      "Exportá Gerber, taladros, Pick&Place y BOM.":
        "Export Gerber, drills, Pick & Place and BOM.",

      /* ── comparación ── */
      "Cómo se compara": "How it compares",
      "Lo esencial de las grandes suites, sin la complejidad ni el precio.":
        "What matters from the big suites, without the complexity or the price.",
      "Función": "Feature",
      "Esquemático + PCB": "Schematic + PCB",
      /* «Simulación SPICE integrada» y «Editor Ladder / PLC» ya están arriba,
         en las tarjetas de características: repetirlos acá los pisaría. */
      "Editor Ladder / PLC": "Ladder / PLC editor",
      "Esquemas eléctricos IEC + simulación de mando":
        "IEC control schematics + control-circuit simulation",
      "Funciona 100% offline": "Works 100% offline",
      "Sin suscripción obligatoria": "No forced subscription",
      "Exportación Gerber / BOM": "Gerber / BOM export",
      "Precio de entrada": "Entry price",
      "Gratis": "Free",
      "Gratis*": "Free*",
      "Comparativa orientativa. Marcas de terceros pertenecen a sus respectivos dueños. “~” = parcial / con limitaciones.":
        "Indicative comparison. Third-party trademarks belong to their respective owners. “~” = partial / with limitations.",

      /* ── precios ── */
      "Precios simples, en USD": "Simple pricing, in USD",
      "Licencia anual. Sin nube y sin cuenta obligatoria.":
        "Yearly licence. No cloud, no mandatory account.",
      "/ año": "/ year",
      "Gratuita": "Free",
      "Sin registro, sin límite de tiempo": "No sign-up, no time limit",
      "✓ Esquemático, PCB y 3D completos": "✓ Full schematic, PCB and 3D",
      "✓ Autorouter, DRC y ERC": "✓ Autorouter, DRC and ERC",
      "✓ Simulación SPICE": "✓ SPICE simulation",
      "✓ Gerber, Excellon y BOM": "✓ Gerber, Excellon and BOM",
      "— Hasta 2 capas de cobre": "— Up to 2 copper layers",
      "— Con marca de agua, uso no comercial": "— Watermarked, non-commercial use",
      "Estudiante": "Student",
      "Verificando que estudiás": "By verifying you are a student",
      "✓ Todo lo de Gratuita, sin marca de agua": "✓ Everything in Free, without the watermark",
      "✓ Hasta 6 capas de cobre": "✓ Up to 6 copper layers",
      "✓ Pares diferenciales y serpentinas": "✓ Differential pairs and meanders",
      "✓ Monte Carlo y FFT en SPICE": "✓ Monte Carlo and FFT in SPICE",
      "✓ Lectura de datasheets con IA": "✓ AI-assisted datasheet reading",
      "✓ Módulo eléctrico y PLC completo": "✓ Full electrical and PLC module",
      "— Uso no comercial": "— Non-commercial use",
      "Pedir licencia": "Request a licence",
      "Más elegido": "Most popular",
      "Pro": "Pro",
      /* El ZIP y su hash no se traducen: son el nombre de un archivo y una
         huella. Van igual en los tres idiomas para que el chequeo no los
         reporte como texto olvidado en cada build. */
      "sha256sum ElectronArt-*-win64.zip":
        "sha256sum ElectronArt-*-win64.zip",
      "shasum -a 256 ElectronArt-*-win64.zip":
        "shasum -a 256 ElectronArt-*-win64.zip",
      "sha256sum -c ElectronArt-*-win64.zip.sha256":
        "sha256sum -c ElectronArt-*-win64.zip.sha256",
      "Para makers y profesionales": "For makers and professionals",
      "✓ Uso comercial": "✓ Commercial use",
      "✓ Hasta 16 capas de cobre": "✓ Up to 16 copper layers",
      "✓ IPC-2581, ODB++ y STEP 3D": "✓ IPC-2581, ODB++ and 3D STEP",
      "✓ Actualizaciones 1 año": "✓ 1 year of updates",
      "Comprar Pro": "Buy Pro",
      "Industrial": "Industrial",
      "Para control y automatización": "For control and automation",
      "✓ Todo lo de Pro": "✓ Everything in Pro",
      "✓ Librería IEC 60617 de control": "✓ IEC 60617 control symbol library",
      "✓ Simulación del esquema de mando": "✓ Control-circuit simulation",
      "✓ Montaje en riel DIN y tablero": "✓ DIN rail and enclosure layout",
      "✓ Editor Ladder / PLC": "✓ Ladder / PLC editor",
      "✓ Soporte prioritario y licencia de equipo":
        "✓ Priority support and team licence",
      "Comprar Industrial": "Buy Industrial",

      /* ── FAQ ── */
      "Preguntas frecuentes": "Frequently asked questions",
      "¿Necesito conexión a internet?": "Do I need an internet connection?",
      "¿En qué sistemas corre?": "What systems does it run on?",
      "El programa corre en": "The program runs on",
      "Windows, Linux y macOS": "Windows, Linux and macOS",
      ": está hecho con Python y PySide6 (Qt6), y no depende de nada propio de un sistema. Hoy publicamos el":
        ": it is built with Python and PySide6 (Qt6) and relies on nothing specific to one operating system. Today we publish the",
      "instalador de Windows 10 y 11": "Windows 10 and 11 installer",
      "; en Linux y macOS se ejecuta desde el código, y el paquete compilado para esos dos está en camino.":
        "; on Linux and macOS you run it from source, and the compiled package for those two is on its way.",
      "¿La licencia es por suscripción?": "Is the licence a subscription?",
      "Pro e Industrial son anuales: se renuevan cada 12 meses y podés cancelarlas cuando quieras. Lo que":
        "Pro and Industrial are yearly: they renew every 12 months and you can cancel whenever you want. What is",
      "no": "not",
      "es por suscripción es el programa: funciona sin conexión y tus archivos son tuyos, en tu disco, en un formato abierto. Gratuita y Estudiante no vencen.":
        "a subscription is the program itself: it runs offline and your files are yours, on your disk, in an open format. Free and Student never expire.",
      "¿Puedo usar la versión gratuita comercialmente?":
        "Can I use the free version commercially?",
      "No. La Gratuita y la de Estudiante son para uso personal y educativo. Para trabajo comercial necesitás Pro o Industrial.":
        "No. Free and Student are for personal and educational use. Commercial work requires Pro or Industrial.",
      "¿Qué puedo hacer realmente con la versión Gratuita?":
        "What can I actually do with the Free version?",
      "¿Qué es el módulo eléctrico / Industrial?":
        "What is the electrical / Industrial module?",
      "¿Exporta archivos para fabricar en JLCPCB/PCBWay?":
        "Does it export files for JLCPCB/PCBWay?",
      "Sí. Exporta Gerber RS-274X, taladros Excellon, Pick&Place y BOM, compatibles con las fábricas más comunes.":
        "Yes. It exports Gerber RS-274X, Excellon drills, Pick & Place and BOM, compatible with the most common fabs.",
      "¿Qué métodos de pago aceptan?": "What payment methods do you accept?",
      "Tarjeta internacional vía Gumroad/Stripe y MercadoPago para Argentina y Latinoamérica.":
        "International cards via Gumroad/Stripe, and MercadoPago for Argentina and Latin America.",
      "¿De quién son los diseños que hago con ElectronArt?":
        "Who owns the designs I make with ElectronArt?",
      "¿Puedo usarlo para dictar cursos o en una escuela?":
        "Can I use it to teach courses or in a school?",

      /* ── comunidad / CTA / footer ── */
      "Comunidad y soporte": "Community and support",
      "Quién lo hace": "Who makes it",
      "EL": "EL",
      "Franco Olmedo": "Franco Olmedo",
      "Ingeniero electrónico · Diseño de PCB, firmware embebido y automatización industrial":
        "Electronics engineer · PCB design, embedded firmware and industrial automation",
      "ElectronArt lo desarrolla": "ElectronArt is built by",
      ", un estudio independiente argentino. No hay un comité de producto atrás: hay alguien que diseña placas y que hizo la herramienta que le faltaba, con el módulo eléctrico IEC que sale de trabajar en tableros de verdad.":
        ", an independent studio in Argentina. There is no product committee behind it: there is someone who designs boards and built the tool he was missing, with an IEC electrical module that comes from working on real control panels.",
      "Cada versión se publica con sus novedades y su checksum, y los errores se responden en el foro. Si necesitás algo puntual para tu flujo de trabajo, se puede hablar.":
        "Every release ships with its changelog and its checksum, and bugs get answered on the forum. If you need something specific for your workflow, get in touch.",
      "Portfolio ▸": "Portfolio ▸",
      "LinkedIn ▸": "LinkedIn ▸",
      "ElectronArt está en beta y se desarrolla a la vista. Preguntas, ayuda entre usuarios y errores van al mismo lugar, y se responden ahí.":
        "ElectronArt is in beta and is developed in the open. Questions, peer help and bug reports all go to the same place, and get answered there.",
      "Entrar al foro": "Go to the forum",
      "Descargas y checksums ▸": "Downloads and checksums ▸",
      "Diseñá tu próxima placa hoy": "Design your next board today",
      "Descargá la versión gratuita y llegá hasta el Gerber sin pagar nada.":
        "Download the free version and get all the way to Gerber without paying a thing.",
      "Producto": "Product",
      "Recursos": "Resources",
      "Manual": "Manual",
      "Foro": "Forum",
      "Novedades": "What's new",
      "Un asistente que te muestra el cambio antes de hacerlo": "An assistant that shows you the change before making it",
      "Le pedís lo que necesitás en castellano. Te contesta, dibuja lo que va a hacer sobre tu placa, y sólo lo aplica si vos aceptás.": "Ask for what you need in plain language. It answers, draws what it is about to do on your board, and only applies it if you accept.",
      "Lo ves antes de que pase": "You see it before it happens",
      "Lo que agrega se dibuja en oro sobre el diseño, lo que saca aparece tachado y lo que mueve muestra su recorrido. Nada toca tu proyecto hasta que apretás Aplicar.": "What it adds is drawn in gold over your design, what it removes appears crossed out, and what it moves shows its path. Nothing touches your project until you hit Apply.",
      "Aceptás lo que querés": "You accept what you want",
      "Cada cambio va en una lista con su tilde. Destildás uno y desaparece del dibujo al instante. Se aplica sólo lo que dejaste marcado, y entra como un solo Ctrl+Z.": "Every change is a ticked line in a list. Untick one and it disappears from the drawing straight away. Only what you left ticked is applied, and it lands as a single Ctrl+Z.",
      "O corre en tu máquina": "Or it runs on your machine",
      "Podés usarlo con tu propia clave, o contra un modelo local: ahí el diseño no sale de tu computadora. Para trabajo bajo acuerdo de confidencialidad, esa diferencia lo es todo.": "Use it with your own API key, or against a local model — then your design never leaves your computer. For work under an NDA, that difference is everything.",
      "Hoy sabe trabajar sobre la placa: planos de cobre, ruteo, mover componentes, agujeros de montaje y verificación de reglas. No diseña el circuito por vos.": "Today it works on the board: copper pours, routing, moving parts, mounting holes and rule checking. It does not design the circuit for you.",
      "Asistente": "Assistant",
      "Flux": "Flux",
      "Asistente de IA que": "AI assistant that",
      "dibuja el cambio sobre el diseño": "draws the change on your design",
      "antes de aplicarlo": "before applying it",
      "El asistente puede correr": "The assistant can run",
      "en tu máquina": "on your machine",
      ", sin subir el diseño": ", without uploading your design",
      "Términos y licencia": "Terms and licence",
      "Privacidad": "Privacy",
      "Contacto": "Contact",
      "Suite EDA de escritorio.": "Desktop EDA suite.",
      "by": "by",
      "Electronik Lösungen · ElectronArt. Todos los derechos reservados.":
        "Electronik Lösungen · ElectronArt. All rights reserved.",
      "· Software propietario — sus diseños le pertenecen":
        "· Proprietary software — your designs belong to you",

      /* ── letra chica de precios (partida por los enlaces de pago) ── */
      "¿En Argentina? También aceptamos": "In Argentina? We also take",
      "· Pagos con tarjeta internacional vía": "· International card payments via",
      ". Al comprar o descargar aceptás los":
        ". By buying or downloading you accept the",
      "Términos y licencia (EULA)": "Terms and licence (EULA)",
      ". Tus diseños son 100 % tuyos.": ". Your designs are 100% yours.",

      /* ── descargas.html ── */
      "Descargas — ElectronArt": "Downloads — ElectronArt",
      "Descargá ElectronArt: enlaces de descarga, verificación SHA-256, requisitos del sistema y resolución de problemas.":
        "Download ElectronArt: download links, SHA-256 verification, system requirements and troubleshooting.",
      "← Volver al sitio": "← Back to the site",
      "Enlaces oficiales, requisitos y cómo verificar que la descarga esté completa.":
        "Official links, requirements and how to verify the download is complete.",
      "Archivo": "File",
      "Plataforma": "Platform",
      "Tamaño": "Size",
      "Windows 10/11 (64 bits)": "Windows 10/11 (64-bit)",
      /* Las dos variantes que escribe `scripts/gen_downloads.py` desde F22:
         el instalador y el ZIP portable. Quedan cargadas de antemano para que
         el primer build con instalador no deje el release en rojo. */
      "Windows 10/11 (64 bits) — instalador": "Windows 10/11 (64-bit) — installer",
      "Windows 10/11 (64 bits) — ZIP portable": "Windows 10/11 (64-bit) — portable ZIP",
      "Verificá la descarga": "Verify your download",
      "Después de bajar el archivo, compará su hash SHA-256 con el que figura arriba. Si no coinciden, el archivo se bajó incompleto o alguien lo modificó — no lo ejecutes.":
        "After downloading the file, compare its SHA-256 hash with the one above. If they do not match, the file was downloaded incomplete or someone modified it — do not run it.",
      "Windows (PowerShell):": "Windows (PowerShell):",
      "Linux:": "Linux:",
      "macOS:": "macOS:",
      "Al lado de cada ZIP publicamos también su archivo": "Next to each ZIP we also publish its",
      ", si preferís que la verificación la haga la herramienta:":
        ", if you prefer the tool to do the verification:",
      "Requisitos": "Requirements",
      "Windows 10 u 11, 64 bits": "Windows 10 or 11, 64-bit",
      "4 GB de RAM (8 GB recomendado para placas grandes)":
        "4 GB of RAM (8 GB recommended for large boards)",
      "~350 MB de espacio libre (el ZIP descomprimido ocupa unos 275 MB)":
        "~350 MB of free space (the extracted ZIP takes about 275 MB)",
      "Tarjeta gráfica con OpenGL 2.1 o superior para la vista 3D — cualquier placa o gráfica integrada de la última década alcanza":
        "A graphics card with OpenGL 2.1 or later for the 3D view — any board or integrated GPU from the last decade is enough",
      "Instalación": "Installation",
      "Bajá el instalador (el archivo que termina en":
        "Download the installer (the file ending in",
      "), hacé doble clic y seguí el asistente. Deja el acceso en el menú Inicio, un desinstalador en «Aplicaciones instaladas» y la asociación de los archivos del programa. No pide permisos de administrador.":
        "), double-click it and follow the wizard. It leaves a Start menu shortcut, an uninstaller in “Installed apps” and the file association for the program's documents. It does not ask for administrator rights.",
      "Para actualizar no hace falta desinstalar nada: el instalador nuevo reemplaza a la copia anterior y tus preferencias, tu biblioteca y tu licencia quedan como están. El programa además te avisa solo cuando sale una versión, y podés buscarla a mano desde Ayuda ▸ Buscar actualizaciones…":
        "To update you do not have to uninstall anything: the new installer replaces the previous copy and your preferences, your library and your licence stay as they are. The program also tells you on its own when a version is released, and you can look for one by hand from Help ▸ Check for updates…",
      "Si preferís no instalar nada, el ZIP sigue publicado: descomprimilo donde quieras y ejecutá":
        "If you would rather not install anything, the ZIP is still published: unzip it anywhere you like and run",
      ". Así no hay accesos directos ni desinstalador: para sacarlo, borrás la carpeta.":
        ". That way there are no shortcuts and no uninstaller: to remove it, delete the folder.",
      "Tus preferencias, tu biblioteca y tu licencia viven fuera de la carpeta del programa —en":
        "Your preferences, your library and your licence live outside the program folder — in",
      "y en el registro de Windows—, así que desinstalar no las borra y reinstalar no te hace volver a activar nada.":
        "and in the Windows registry — so uninstalling does not delete them and reinstalling does not make you activate anything again.",
      "Windows va a mostrarte una advertencia. Es esperable.":
        "Windows will show you a warning. That's expected.",
      "La primera vez que abras": "The first time you open",
      ", Windows muestra una pantalla azul que dice":
        ", Windows shows a blue screen that says",
      "«Windows protegió su PC»": "“Windows protected your PC”",
      ". No es un virus ni un error: es SmartScreen avisando que todavía no reconoce este programa.":
        ". It is not a virus and not an error: it is SmartScreen letting you know it does not recognise this program yet.",
      "Para continuar:": "To continue:",
      "Más información": "More info",
      "Ejecutar de todas formas": "Run anyway",
      "Por qué pasa, sin vueltas: SmartScreen construye su confianza con la cantidad de descargas que acumula un programa. ElectronArt es nuevo, así que todavía no tiene esa historia. A medida que más gente lo instale, el aviso desaparece solo.":
        "Why it happens, plainly: SmartScreen builds its trust from how many downloads a program accumulates. ElectronArt is new, so it does not have that history yet. As more people install it, the warning goes away on its own.",
      "Mientras tanto, la forma seria de comprobar que el archivo es el nuestro y llegó entero es el":
        "In the meantime, the serious way to check that the file is ours and arrived intact is the",
      "SHA-256 de más arriba": "SHA-256 above",
      ": si el número coincide, nadie lo tocó en el camino. Esa verificación es más fuerte que cualquier aviso del sistema operativo.":
        ": if the number matches, nobody touched it along the way. That check is stronger than any operating-system warning.",
      "¿Problemas?": "Problems?",
      "Si la descarga no arranca, el antivirus la bloquea o la instalación falla, visitá el":
        "If the download does not start, the antivirus blocks it or the installation fails, visit the",
      "foro de la comunidad": "community forum",
      "o escribinos por correo.": "or write to us by email.",
      "Si el programa ya está instalado y algo no funciona, abrí Ayuda ▸ Diagnóstico…: arma un informe con tu versión, tu sistema, tu placa de video y el estado de la licencia, y lo podés copiar o mandarlo al foro con un botón. No incluye tu licencia ni tu correo.":
        "If the program is already installed and something does not work, open Help ▸ Diagnostics…: it builds a report with your version, your system, your graphics card and the state of your licence, and you can copy it or send it to the forum with one button. It does not include your licence or your email.",

      /* ── terminos.html ── */
      "Términos y licencia — ElectronArt": "Terms and licence — ElectronArt",
      "Términos de compra, descarga y licencia de ElectronArt.":
        "Purchase, download and licence terms for ElectronArt.",
      "Términos de compra y licencia": "Purchase and licence terms",
      "Última actualización: julio 2026 · Se aplican al descargar, comprar, instalar o usar ElectronArt.":
        "Last updated: July 2026 · They apply to downloading, buying, installing or using ElectronArt.",
      "1. Qué está comprando": "1. What you are buying",
      "ElectronArt es software propietario de":
        "ElectronArt is proprietary software from",
      ". Al comprar una licencia usted adquiere el":
        ". By buying a licence you acquire the",
      "derecho de uso": "right to use",
      "descrito en el": "described in the",
      "Acuerdo de Licencia de Usuario Final (EULA)":
        "End User Licence Agreement (EULA)",
      "incluido con el producto — no la propiedad del software. Las ediciones":
        "included with the product — not ownership of the software. The",
      "son": "and",
      "licencias anuales": "editions are yearly licences",
      ": se renuevan cada 12 meses e incluyen las actualizaciones publicadas durante ese período. Puede cancelarlas cuando quiera; si vence o se cancela, ElectronArt":
        ": they renew every 12 months and include the updates released during that period. You may cancel at any time; if the licence expires or is cancelled, ElectronArt",
      "sigue abriendo y editando sus proyectos": "still opens and edits your projects",
      "con las funciones de la edición Gratuita, y sus archivos permanecen accesibles en su disco y en un formato abierto. Las ediciones":
        "with the features of the Free edition, and your files stay accessible on your disk in an open format. The",
      "no vencen.": "editions never expire.",
      "USD 79 / año": "USD 79 / year",
      "USD 299 / año": "USD 299 / year",
      "2. Ediciones y alcance de uso": "2. Editions and scope of use",
      "Edición": "Edition",
      "Precio": "Price",
      "Uso permitido": "Permitted use",
      "Puestos": "Seats",
      "Evaluación y proyectos personales,": "Evaluation and personal projects,",
      "sin fines comerciales": "non-commercial",
      ". Placas de hasta 2 capas de cobre; las salidas llevan marca de agua.":
        ". Boards of up to 2 copper layers; the outputs carry a watermark.",
      "Aprendizaje y proyectos personales,": "Learning and personal projects,",
      ", con el módulo eléctrico/PLC incluido. Aulas y laboratorios educativos sin cargo.":
        ", with the electrical/PLC module included. Educational classrooms and labs free of charge.",
      "Todo uso,": "Any use,",
      "incluido comercial": "including commercial",
      "(productos para la venta, servicios de diseño, uso en empresas) y educativo institucional.":
        "(products for sale, design services, corporate use) and institutional education.",
      "1 persona / 2 equipos": "1 person / 2 computers",
      "Todo lo de Pro + el módulo eléctrico/PLC para uso comercial y uso en equipo dentro de una organización, con soporte prioritario.":
        "Everything in Pro + the electrical/PLC module for commercial use and team use within an organisation, with priority support.",
      "Hasta 5 personas": "Up to 5 people",
      "¿Su caso no encaja (más puestos, OEM, revendedores, currícula educativa paga)? Escríbanos y armamos una licencia a medida.":
        "Do your needs not fit (more seats, OEM, resellers, paid educational curricula)? Write to us and we will put together a custom licence.",
      "3. Sus diseños son 100 % suyos": "3. Your designs are 100% yours",
      "Los esquemáticos, PCBs, Gerbers, BOMs, bibliotecas propias y productos que usted cree con ElectronArt le pertenecen por completo. Puede fabricarlos y venderlos":
        "The schematics, PCBs, Gerbers, BOMs, custom libraries and products you create with ElectronArt belong entirely to you. You may manufacture and sell them",
      "sin regalías, sin atribución y sin restricciones":
        "with no royalties, no attribution and no restrictions",
      ", con cualquier edición — la diferencia entre ediciones está en quién usa el software, no en qué puede hacer con sus resultados. (Única salvedad: las ediciones Gratuita y Student no pueden usarse":
        ", on any edition — the difference between editions is who uses the software, not what you may do with its results. (Only caveat: the Free and Student editions cannot be used",
      "como herramienta de trabajo": "as a commercial working tool",
      "comercial.)": "comercially.)",
      "4. Descarga, activación y reembolsos": "4. Download, activation and refunds",
      "La descarga se entrega por enlace tras la compra (o gratis para Student).":
        "The download is delivered by link after purchase (or free for Student).",
      "El software funciona": "The software works",
      "offline": "offline",
      "; no exige cuenta ni conexión para diseñar.":
        "; it requires no account and no connection to design.",
      "Reembolso completo dentro de los 14 días":
        "Full refund within 14 days",
      "si el software no funciona en su equipo y el soporte no pudo resolverlo. Las compras vía plataformas de pago se rigen además por las políticas de la plataforma.":
        "if the software does not work on your machine and support could not resolve it. Purchases through payment platforms are also governed by the platform's policies.",
      "Probarlo 14 días gratis": "Try it free for 14 days",
      "Sin tarjeta y sin renovación automática.":
        "No card, no automatic renewal.",
      "5. Datos personales": "5. Personal data",
      "Se guarda lo": "We keep the",
      "mínimo para que la licencia funcione": "minimum needed for the licence to work",
      ": el correo con el que compró —al que queda ligada la licencia y por el que llega el código— y, si los completa, los datos de facturación. Nada más. El programa":
        ": the email address you purchased with —the licence is tied to it and the code is sent there— and, if you fill them in, your billing details. Nothing else. The program",
      "no manda telemetría": "sends no telemetry",
      ": no se registra qué diseña, qué componentes usa ni cuánto lo usa, y no hace falta cuenta ni conexión para trabajar.":
        ": it does not record what you design, which components you use or how much you use it, and no account or connection is needed to work.",
      "El pago lo procesa la pasarela (Gumroad o MercadoPago) y los datos de la tarjeta":
        "Payment is processed by the gateway (Gumroad or MercadoPago) and your card details",
      "nunca pasan por nuestros servidores": "never pass through our servers",
      "El correo se comparte únicamente con el proveedor de envío de mails, para hacerle llegar su licencia.":
        "Your email address is shared only with the mail delivery provider, to send you your licence.",
      "Si reporta un problema desde el programa, se envía lo que muestra el propio diálogo antes de mandarlo —descripción, versión, sistema y, si usted lo marca, el log— y nada más.":
        "If you report a problem from within the program, what gets sent is what the dialog itself shows you beforehand —description, version, system and, if you tick it, the log— and nothing else.",
      "Puede pedir el borrado de su cuenta y sus datos escribiendo al contacto de abajo; se responde dentro de los 30 días.":
        "You can request deletion of your account and data by writing to the contact below; we answer within 30 days.",
      "6. Limitación de responsabilidad (resumen)":
        "6. Limitation of liability (summary)",
      "Las simulaciones, verificaciones DRC/ERC y datos de componentes son herramientas de asistencia:":
        "Simulations, DRC/ERC checks and component data are assistance tools:",
      "no sustituyen la verificación de ingeniería":
        "they do not replace engineering verification",
      ". Usted es responsable de validar sus diseños antes de fabricarlos o conectarlos a instalaciones reales. La responsabilidad total se limita al importe pagado. El detalle completo está en el EULA.":
        ". You are responsible for validating your designs before manufacturing them or connecting them to real installations. Total liability is limited to the amount paid. The full detail is in the EULA.",
      "7. Código de terceros y marcas": "7. Third-party code and trademarks",
      "ElectronArt incluye componentes open source bajo sus propias licencias (Qt/PySide6 LGPL-3.0, NumPy/SciPy/Matplotlib/pdfplumber BSD/MIT); la lista completa acompaña al producto. KiCad, EAGLE, Gerber, PSpice, LCSC y EasyEDA se mencionan solo para describir interoperabilidad; sus marcas pertenecen a sus titulares.":
        "ElectronArt includes open source components under their own licences (Qt/PySide6 LGPL-3.0, NumPy/SciPy/Matplotlib/pdfplumber BSD/MIT); the complete list ships with the product. KiCad, EAGLE, Gerber, PSpice, LCSC and EasyEDA are mentioned only to describe interoperability; their trademarks belong to their owners.",
      "8. Contacto": "8. Contact",
      "Soporte técnico y licencias:": "Technical support and licences:",
      "Compras, facturación y consultas comerciales:": "Sales, billing and commercial enquiries:",
      "Este resumen no reemplaza al EULA, que es el acuerdo vinculante y se muestra durante la instalación y en":
        "This summary does not replace the EULA, which is the binding agreement and is shown during installation and under",
      "Ayuda → Acerca de": "Help → About",
      ". Recomendamos revisión legal profesional para operaciones de volumen o acuerdos corporativos.":
        ". We recommend professional legal review for high-volume operations or corporate agreements.",

      /* ── privacidad.html ── */
      "Privacidad — ElectronArt": "Privacy — ElectronArt",
      "Última actualización: agosto 2026 · Qué datos toca ElectronArt, cuáles no, y qué puede pedirnos que hagamos con ellos.":
        "Last updated: August 2026 · What data ElectronArt touches, what it does not, and what you may ask us to do with it.",
      "Lo más importante, primero": "The most important thing, first",
      "Sus diseños nunca salen de su computadora.": "Your designs never leave your computer.",
      "Los esquemáticos, las placas, las simulaciones y los archivos de fabricación se guardan en su disco, en un formato abierto y documentado. No se suben a ningún servidor, ni nuestro ni de terceros, y no los miramos.":
        "The schematics, boards, simulations and fabrication files are kept on your disk, in an open, documented format. They are not uploaded to any server, neither ours nor a third party's, and we do not look at them.",
      "El programa funciona": "The program works",
      "sin conexión": "offline",
      ". La licencia se verifica con una firma criptográfica en su propia máquina: no hace falta que el programa «llame a casa» para dejarlo trabajar.":
        ". The licence is verified with a cryptographic signature on your own machine: the program does not need to “phone home” to keep working.",
      "1. Qué guardamos, y por qué": "1. What we store, and why",
      "Dato": "Data",
      "Cuándo": "When",
      "Para qué": "Purpose",
      "Correo electrónico": "Email address",
      "Al crear la cuenta o comprar": "When you create the account or buy",
      "Enviarle la licencia, permitirle entrar y recuperar la contraseña":
        "To send you the licence, let you log in and recover your password",
      "Nombre": "Name",
      "Al crear la cuenta": "When you create the account",
      "Emitir la licencia a su nombre": "Issue the licence in your name",
      "Contraseña": "Password",
      "Se guarda": "It is stored",
      "cifrada de ida": "one-way encrypted",
      "(hash). No la conocemos ni podemos recuperarla":
        "(hash). We do not know it and cannot recover it",
      "País, teléfono, empresa, CUIT/VAT": "Country, phone, company, CUIT/VAT",
      "Opcionales": "Optional",
      ", si los carga usted": ", if you fill them in",
      "Facturación. Puede dejarlos vacíos": "Billing. You can leave them blank",
      "Compras": "Purchases",
      "Al pagar": "When you pay",
      "Sostener su licencia y renovarla": "To keep your licence active and renew it",
      "Lo que publica en el foro": "What you post on the forum",
      "Si escribe en el foro": "If you write in the forum",
      "Es público, lo elige usted": "It is public, and you choose it",
      "2. Qué NO guardamos": "2. What we do NOT store",
      "Sus proyectos, esquemáticos, placas ni archivos de fabricación.":
        "Your projects, schematics, boards or fabrication files.",
      "Los datos de su tarjeta. El pago lo procesan":
        "Your card details. The payment is processed by",
      "en sus propias páginas; nosotros recibimos únicamente el aviso de que el pago se hizo.":
        "on their own pages; we only receive the notice that the payment went through.",
      "Su ubicación, su agenda, sus contactos ni el contenido de su disco.":
        "Your location, calendar, contacts or the contents of your disk.",
      "Un perfil suyo para publicidad. No vendemos ni cedemos datos a nadie, y no hay rastreadores de terceros en el sitio.":
        "A profile of you for advertising. We do not sell or hand over data to anyone, and there are no third-party trackers on the site.",
      "3. Cuándo el programa se conecta a internet":
        "3. When the program connects to the internet",
      "Son cuatro momentos, y ninguno manda su diseño:":
        "There are four moments, and none of them sends your design:",
      "Activar la licencia": "Activate the licence",
      ": se envía su correo y el código de compra para recibir la licencia firmada.":
        ": your email and your purchase code are sent to receive the signed licence.",
      "Avisar de una versión nueva": "Notify about a new version",
      ": se consulta cuál es la última publicada. Si no hay internet, no pasa nada y el programa no avisa.":
        ": it checks which is the latest published one. If there is no internet, nothing happens and the program does not warn you.",
      "Bajar una hoja de datos": "Download a datasheet",
      ", cuando usted se lo pide: se envía el código del componente que escribió.":
        ", when you ask for it: the code of the component you typed is sent.",
      "Reportar un problema": "Report a problem",
      ", cuando usted se lo pide: se le muestra": ", when you ask for it: it shows you",
      "exactamente lo que se va a enviar antes de enviarlo":
        "exactly what is about to be sent before sending it",
      ", y puede cancelar.": ", and you can cancel.",
      "4. El sitio web": "4. The website",
      "Contamos visitas con una herramienta": "We count visits with a tool",
      "propia": "of our own",
      ": no usamos Google Analytics ni ningún servicio externo, y":
        ": we do not use Google Analytics or any external service, and",
      "no ponemos cookies de seguimiento": "we do not set tracking cookies",
      "—por eso tampoco le mostramos un cartel de cookies—. De cada visita guardamos la fecha, la página, y el dominio desde el que llegó.":
        "—which is why we do not show you a cookie banner either—. For each visit we store the date, the page, and the domain it came from.",
      "No guardamos su dirección IP.": "We do not store your IP address.",
      "Para no contar diez veces a la misma persona que recarga usamos un identificador anónimo que se calcula con una clave que":
        "To avoid counting ten times the same person who reloads, we use an anonymous identifier computed with a key that",
      "cambia todos los días": "changes every day",
      ": no se puede volver a la persona, ni seguirla de un día para otro.":
        ": it cannot be traced back to the person, nor can they be followed from one day to the next.",
      "5. Con quién compartimos": "5. Who we share with",
      "Sólo con quienes hacen falta para que el producto funcione, y cada uno con sus propios términos:":
        "Only with those needed to make the product work, and each under their own terms:",
      "— cobrar.": "— to charge you.",
      "El proveedor de correo — mandarle la licencia y el reset de contraseña.":
        "The email provider — to send you the licence and the password reset.",
      "PythonAnywhere": "PythonAnywhere",
      "— donde corre el servidor.": "— where the server runs.",
      "— desde donde se descargan los instaladores.": "— from where the installers are downloaded.",
      "Nadie más. No vendemos datos.": "No one else. We do not sell data.",
      "6. Sus derechos": "6. Your rights",
      "Puede pedirnos, escribiendo a": "You can ask us, by writing to",
      "electroniklosungen@gmail.com": "electroniklosungen@gmail.com",
      "Ver": "View",
      "todos los datos que tenemos suyos.": "all the data we hold about you.",
      "Corregir": "Correct",
      "lo que esté mal (también desde": "what is wrong (also from",
      "Mi cuenta": "My account",
      ").": ").",
      "Borrar": "Delete",
      "su cuenta y sus datos. ⚠️ Al hacerlo pierde el acceso a renovar o volver a descargar su licencia desde su cuenta; el programa ya instalado sigue funcionando.":
        "your account and your data. ⚠️ By doing so you lose access to renewing or re-downloading your licence from your account; the already installed program keeps working.",
      "Llevarse": "Take",
      "sus datos en un archivo.": "your data in a file.",
      "Contestamos dentro de los 30 días.": "We reply within 30 days.",
      "7. Cuánto tiempo los guardamos": "7. How long we keep them",
      "Mientras tenga la cuenta abierta. Si la borra, eliminamos sus datos personales; conservamos el registro de las compras el tiempo que exige la ley contable, porque no podemos borrarlo.":
        "While your account stays open. If you delete it, we erase your personal data; we keep the record of purchases for as long as accounting law requires, because we cannot erase that.",
      "8. Menores": "8. Minors",
      "El producto no está dirigido a menores de 16 años y no pedimos su edad. Si es responsable de un menor y cree que cargó datos, escríbanos y los borramos.":
        "The product is not aimed at anyone under 16, and we do not ask for age. If you are responsible for a minor and believe their data was entered, write to us and we will delete it.",
      "9. Cambios": "9. Changes",
      "Si esta política cambia de manera relevante, lo avisamos en el sitio y por correo a quienes tengan cuenta. La fecha de arriba dice cuándo se actualizó.":
        "If this policy changes significantly, we announce it on the site and by email to those who have an account. The date at the top says when it was last updated.",
      "Responsable:": "Data controller:",
      "Electronik Lösungen, Argentina ·": "Electronik Lösungen, Argentina ·",
      "Ver también los": "See also the",

      /* ── changelog.html ── */
      "Novedades — ElectronArt": "What's new — ElectronArt",
      "Historial de novedades de ElectronArt, la suite EDA de Electronik Lösungen.":
        "Release history of ElectronArt, the EDA suite from Electronik Lösungen.",
      "⚡ Novedades": "⚡ What's new",
      "Todo lo que fue ganando ElectronArt, versión a versión.":
        "Everything ElectronArt has been gaining, release after release.",
      /* ── sección de video ── */
      "El programa, en movimiento": "The program, in motion",
      "Esquemático, simulación SPICE y placa, con paneos y zooms reales.":
        "Schematic, SPICE simulation and board, with real pans and zooms.",
      "Tu navegador no puede reproducir este video.":
        "Your browser cannot play this video.",

      /* ── v9.1 ── */
      "v9.1 — acabado de placa y marca nueva":
        "v9.1 — board finish and a new mark",
      "Lágrimas que se funden con la pista":
        "Teardrops that blend into the track",
      ": los flancos salen tangentes al pad y llegan paralelos a la pista, así que el quiebre en la unión pasó de casi cincuenta grados a tres.":
        ": the flanks leave the pad tangentially and reach the track parallel to it, so the kink at the junction went from nearly fifty degrees down to three.",
      "Codos a 45°":
        "45° corners",
      ": se cortan de una vez sobre toda la placa, después de rutear y sin tocar el motor que hoy cierra el cien por ciento.":
        ": mitred across the whole board in one go, after routing and without touching the router that today closes one hundred per cent.",
      "Identificación en la serigrafía":
        "Board identification on the silkscreen",
      ": qué placa es y de qué revisión, colocada sola en un borde libre. Si no entra sin pisar un componente, no se imprime.":
        ": which board this is and which revision, placed on its own along a free edge. If it does not fit without covering a component, it is not printed.",
      "Propiedades del pad":
        "Pad properties",
      ": doble clic sobre el pad abre las suyas y no las del componente entero — forma, tamaño en cada eje y red.":
        ": double-clicking a pad opens its own properties rather than the whole component's — shape, size on each axis and net.",
      "Agujeros de montaje y puntos de prueba":
        "Mounting holes and test points",
      "como objetos de la placa, que se guardan con el proyecto. Las reglas avisan si les queda cobre ajeno bajo la arandela o si el barreno está tan al borde que el tornillo parte la fibra.":
        " as board objects, saved with the project. The rules warn you if foreign copper sits under the washer, or if the hole is so close to the edge that the screw will crack the fibreglass.",
      "Identidad nueva":
        "A new identity",
      ": la ligadura EA en el programa, el sitio y el foro, y los archivos .ea con su propio ícono para distinguirlos del programa en el explorador.":
        ": the EA ligature across the program, the site and the forum, and .ea files with an icon of their own so they read apart from the program in the file explorer.",

      /* ── v9.0 ── */
      "v9.0 — Máscara, materia y módulo eléctrico":
        "v9.0 — Mask, matter and the electrical module",
      "Agosto 2026": "August 2026",
      "Identidad «Máscara»": "«Mask» identity",
      ": chaflanes a 45° en vez de esquinas redondeadas, relieve de máscara de soldadura y pads perforados como viñetas. La misma piel en la app, la web y el foro.":
        ": 45° chamfers instead of rounded corners, solder-mask relief and drilled pads instead of bullets. The same skin across the app, the site and the forum.",
      "120 modelos 3D reales": "120 real 3D models",
      "de la biblioteca de KiCad, centrados sobre sus pads, con cobre, estaño y oro que reflejan de verdad.":
        "from the KiCad library, centred on their pads, with copper, tin and gold that actually reflect.",
      "Impresión por capas y modo plancha": "Layer-by-layer printing and toner-transfer mode",
      ": espejado, negro pleno y escala 1:1. Antes el PDF salía con todas las capas encimadas.":
        ": mirrored, solid black and 1:1 scale. The PDF used to come out with every layer stacked on top of each other.",
      "Multicapa que llega igual al Gerber": "Multilayer that reaches the Gerber unchanged",
      ", con impedancia controlada: la placa que se fabrica es la que se diseñó.":
        ", with controlled impedance: the board that gets manufactured is the one you designed.",
      "Editor de placa": "Board editor",
      ": contorno arrastrable con cotas vivas, portapapeles, vínculo esquemático↔PCB, buscador que entiende español y":
        ": draggable outline with live dimensions, clipboard, schematic↔PCB link, a search box that understands Spanish and",
      "teclas de una mano": "one-handed shortcuts",
      "(S/T/V/M, Q para mm⇄mil, E propiedades, R/F rotar y voltear).":
        "(S/T/V/M, Q for mm⇄mil, E properties, R/F rotate and flip).",
      "Módulo eléctrico industrial": "Industrial electrical module",
      ": 25 símbolos IEC 60617, riel DIN y gabinetes ajustables, y":
        ": 25 IEC 60617 symbols, DIN rail and adjustable enclosures, and",
      "simulación del esquema de mando": "control-circuit simulation",
      "(Shift+F9) con enclavamiento, temporizadores, cortocircuito y disparo del térmico.":
        "(Shift+F9) with interlocking, timers, short circuits and overload tripping.",
      "Activación con el correo de tu compra": "Activation with your purchase email",
      ": sin pegar códigos largos. La licencia se verifica igual sin conexión.":
        ": no long codes to paste. The licence is still verified offline.",
      "v8.74 — Jarvis en la tablet (LAN + token)":
        "v8.74 — Jarvis on the tablet (LAN + token)",
      "actual": "current",
      "Julio 2026": "July 2026",
      "Plugins → 📶 Tablet en red local": "Plugins → 📶 Tablet on local network",
      ": el Jarvis dashboard ahora se puede abrir desde una tablet o teléfono en el mismo wifi — el lienzo en vivo y los botones de control, en táctil.":
        ": the Jarvis dashboard can now be opened from a tablet or phone on the same wifi — the live canvas and the control buttons, touch-enabled.",
      "Protegido por token": "Token protected",
      ": la app te da el enlace con la llave (": ": the app gives you the link with the key (",
      "); sin ella, ningún render ni comando sale de tu PC (verificación en cada pedido, comparación de tiempo constante).":
        "); without it, no render and no command leaves your PC (checked on every request, constant-time comparison).",
      "El acceso local sigue sin fricción y la opción queda guardada entre sesiones.":
        "Local access stays frictionless and the option is remembered between sessions.",
      "v8.73 — Jarvis dashboard (co-diseño en vivo)":
        "v8.73 — Jarvis dashboard (live co-design)",
      "Plugins → 🤖 Jarvis dashboard": "Plugins → 🤖 Jarvis dashboard",
      ": un tablero en tu browser (solo 127.0.0.1) con el esquemático y el PCB":
        ": a dashboard in your browser (127.0.0.1 only) with the schematic and the PCB",
      "recargándose solos mientras editás": "reloading by themselves as you edit",
      ", y control remoto con lista blanca: refrescar render, ajustar vista, repour de planos y DRC con su resultado en pantalla.":
        ", plus remote control with a whitelist: refresh the render, adjust the view, re-pour copper and run DRC with the result on screen.",
      "Arquitectura segura: los comandos se encolan en el server local y se ejecutan en el hilo de la interfaz — el browser jamás puede colgar el editor.":
        "Secure architecture: commands are queued on the local server and run on the UI thread — the browser can never hang the editor.",
      "Ideal para un segundo monitor, una tablet o co-diseñar con un asistente que ve tu lienzo.":
        "Ideal for a second monitor, a tablet, or co-designing with an assistant who sees your canvas.",
      "v8.72 — Propiedades completas en todos los objetos":
        "v8.72 — Full properties on every object",
      "Los cables tienen formulario completo": "Wires have a complete form",
      "al seleccionarlos: red, conductor IEC, grosor, estilo, esquinas y color. Las etiquetas de red/buses/puertos también.":
        "when selected: net, IEC conductor, thickness, style, corners and colour. Net/bus/port labels too.",
      "Componentes con colocación editable": "Components with editable placement",
      "desde el panel: posición, rotación, espejado y bloqueo.":
        "from the panel: position, rotation, mirroring and lock.",
      "Inspector PCB ampliado": "Expanded PCB inspector",
      ": referencia, posición X/Y y rotación libre del footprint; red editable en pistas y vías; alto de texto de serigrafía por ítem.":
        ": reference, X/Y position and free footprint rotation; editable net on tracks and vias; silkscreen text height per item.",
      "v8.71 — Planos de cobre nivel pro": "v8.71 — Pro-level copper pours",
      "Prioridad de pour": "Pour priority",
      "entre planos solapados: el prioritario gana el solape y el resto le deja clearance (semántica Altium).":
        "between overlapping pours: the priority one wins the overlap and the rest keep clear of it (Altium semantics).",
      "Islas huérfanas": "Orphan islands",
      ": el cobre desconectado de su red se elimina solo al recalcular (apagable por plano).":
        ": copper disconnected from its net removes itself on recalc (toggleable per pour).",
      "Repour selectivo": "Selective re-pour",
      "por plano desde el clic derecho, con reporte de islas eliminadas. Los Gerbers salen del mismo motor de pour.":
        "per pour from the right click, with a report of removed islands. Gerbers come out of the same pour engine.",
      "v8.70 — Cobre siempre sincronizado + 3D arreglado":
        "v8.70 — Copper always in sync + 3D fixed",
      "Las pistas siguen al footprint siempre": "Tracks always follow the footprint",
      "(drag, flechas, sincronizar, undo) y": "(drag, arrows, sync, undo) and",
      "los planos y teardrops se re-fluyen solos": "pours and teardrops re-flow by themselves",
      "tras cada cambio — el cobre nunca queda desactualizado.":
        "after every change — the copper is never out of date.",
      "Visor 3D con profundidad correcta": "3D viewer with correct depth",
      "(fin del efecto translúcido) y modelos más reales: bandas de resistencia, electrolíticos con franja de polaridad, patas DIP.":
        "(the translucent effect is gone) and more realistic models: resistor bands, electrolytics with a polarity stripe, DIP legs.",
      "Dibujá un rectángulo → convertilo en plano de cobre o borde de placa":
        "Draw a rectangle → turn it into a copper pour or board edge",
      "(clic derecho, estilo Altium); plano editable completo: térmico, puente, gap.":
        "(right click, Altium style); fully editable pour: thermal, bridge, gap.",
      "Traducción completa de menús (EN/PT) y miniaturas de los temas en Ver → Tema. Foro beta con categoría de feedback.":
        "Full menu translation (EN/PT) and theme thumbnails under View → Theme. Beta forum with a feedback category.",
      "v8.69 — Caricaturas universales + licencias limpias":
        "v8.69 — Universal cartoons + clean licences",
      "Modo caricatura para TODOS los componentes":
        "Cartoon mode for ALL components",
      ": un generador automático crea el arte educativo de cualquier pieza a partir de su encapsulado, categoría y pines — incluidas las que importás de LCSC/EasyEDA, datasheets o tu biblioteca.":
        ": an automatic generator creates the educational artwork of any part from its package, category and pins — including the ones you import from LCSC/EasyEDA, datasheets or your library.",
      "Lectura de PDFs con backend MIT": "PDF reading with an MIT backend",
      "(pdfplumber): el motor de datasheets ya no depende de bibliotecas AGPL — producto comercial con licencias limpias.":
        "(pdfplumber): the datasheet engine no longer depends on AGPL libraries — a commercial product with clean licences.",
      "EULA y términos de compra": "EULA and purchase terms",
      ": licencia clara por edición, tus diseños son 100 % tuyos, lista de licencias de terceros incluida.":
        ": a clear licence per edition, your designs are 100% yours, third-party licence list included.",
      "v8.68 — Arcos Gerber reales + conductores IEC":
        "v8.68 — True Gerber arcs + IEC conductors",
      "Las pistas redondeadas salen al Gerber como arcos G02/G03 verdaderos":
        "Rounded tracks come out as true G02/G03 arcs in the Gerber",
      "(modo G75, tangentes exactos): la curva fabricada es idéntica a la de pantalla, sin aplanar a polilíneas.":
        "(G75 mode, exact tangents): the manufactured curve is identical to the one on screen, not flattened into polylines.",
      "El import Gerber lee arcos G02/G03": "The Gerber import reads G02/G03 arcs",
      "— propios o de otros EDA.": "— your own or from other EDAs.",
      "Numerar conductores (IEC)": "Number conductors (IEC)",
      ": numera cada conductor del esquemático en orden de lectura, estilo planos industriales; los rotulados conservan su nombre. Se dibuja sobre cada cable y se guarda con el documento.":
        ": numbers each schematic conductor in reading order, industrial-plan style; labelled ones keep their name. It is drawn on every wire and saved with the document.",
      "v8.67 — Búsqueda federada de piezas": "v8.67 — Federated part search",
      "«Piezas de fabricante» encadena tres niveles solo":
        "“Manufacturer parts” chains exactly three levels",
      ": catálogo local → LCSC → datasheet. Cualquier componente del mundo sin salir del panel.":
        ": local catalogue → LCSC → datasheet. Any component in the world without leaving the panel.",
      "MPN fuera del catálogo → un clic lo trae de LCSC con el CAD real de EasyEDA":
        "MPN not in the catalogue → one click brings it from LCSC with EasyEDA's real CAD",
      ": símbolo con pines verdaderos y footprint con pads exactos, guardado en tu biblioteca.":
        ": a symbol with true pins and a footprint with exact pads, saved to your library.",
      "Si tampoco está en LCSC, pasa directo al motor de datasheets":
        "If it is not in LCSC either, it goes straight to the datasheet engine",
      "con la búsqueda ya corriendo y el preview editable.":
        "with the search already running and an editable preview.",
      "Honesto por diseño: solo acepta part numbers que corresponden de verdad (exacto o prefijo, nunca fuzzy).":
        "Honest by design: it only accepts part numbers that truly match (exact or prefix, never fuzzy).",
      "v8.66 — Imports de fabricación exactos": "v8.66 — Exact fabrication imports",
      "Import Gerber multi-capa en una pasada": "Multi-layer Gerber import in one pass",
      ": varios archivos (top, bottom e internas In1/In2) con origen común — capas perfectamente alineadas.":
        ": several files (top, bottom and inner In1/In2) with a common origin — perfectly aligned layers.",
      "Los planos del Gerber (regiones G36/G37) se importan como zonas de cobre":
        "Gerber pours (G36/G37 regions) are imported as copper zones",
      "Import EAGLE exacto en rotación y espejo":
        "Exact EAGLE import for rotation and mirror",
      ": R90/180/270 y MR* aterrizan con cada pad en su posición absoluta exacta y los SMD en la capa correcta.":
        ": R90/180/270 and MR* land with every pad in its exact absolute position and SMDs on the right layer.",
      "v8.65 — Pulido de uso real": "v8.65 — Real-use polish",
      "Esc siempre vuelve al cursor normal": "Esc always returns to the normal cursor",
      "desde cualquier herramienta (esquemático y PCB).":
        "from any tool (schematic and PCB).",
      "Clic derecho sobre cualquier ítem del PCB":
        "Right click on any PCB item",
      ": Propiedades / Editar / Borrar — incluido el texto de serigrafía.":
        ": Properties / Edit / Delete — including silkscreen text.",
      "Doble clic abre Propiedades/Inspector": "Double click opens Properties/Inspector",
      "aunque el panel estuviera cerrado.": "even if the panel was closed.",
      "Las pistas conectadas siguen al footprint": "Connected tracks follow the footprint",
      "al arrastrarlo, moverlo o rotarlo — nunca más cobre flotando.":
        "when you drag, move or rotate it — no more floating copper.",
      "Vías con propiedades completas": "Vias with full properties",
      ": taladro, anillo anular, par de capas, tented y mask expansion con apertura real en el Gerber.":
        ": drill, annular ring, layer pair, tented and mask expansion with real aperture in the Gerber.",
      "Menú PCB reorganizado": "Reorganised PCB menu",
      "en submenús (Ruteo · Planos y cobre · Dibujar · Edición · Vista · Reglas y análisis).":
        "into submenus (Routing · Pours and copper · Draw · Edit · View · Rules and analysis).",
      "Motor de datasheets con etapa LOCAL layout-aware":
        "Datasheet engine with a LOCAL layout-aware stage",
      ": reconstruye la tabla de pines por geometría del PDF — offline y gratis; la IA con clave queda como último recurso opcional.":
        ": rebuilds the pin table from the PDF geometry — offline and free; the keyed AI stays as an optional last resort.",
      "Manual de usuario rediseñado (portada, índice clickeable, capítulos numerados).":
        "Redesigned user manual (cover, clickable index, numbered chapters).",
      "v8.62 – v8.64 — Motor de datasheets + 3D OpenGL":
        "v8.62 – v8.64 — Datasheet engine + OpenGL 3D",
      "Importar desde datasheet": "Import from datasheet",
      ": escribí cualquier MPN del mundo — encuentra el PDF, interpreta pines y package, con preview 100 % editable.":
        ": type any MPN in the world — it finds the PDF, interprets pins and package, with a 100% editable preview.",
      "IA de respaldo opcional": "Optional backup AI",
      "(Preferencias → IA) con validación anti-alucinación estricta.":
        "(Preferences → AI) with strict anti-hallucination validation.",
      "Vista 3D OpenGL real": "Real OpenGL 3D view",
      ": órbita suave, zoom, iluminación con brillos, MSAA 8×.":
        ": smooth orbit, zoom, specular lighting, 8× MSAA.",
      "+51 partes curadas": "+51 curated parts",
      "(155 en total) con pinout de datasheet: op-amps, fuentes, potencia, optoacopladores, interfaces, lógica, RTC, sensores y MCUs (STM32 «Blue Pill», ESP32).":
        "(155 in total) with datasheet pinout: op-amps, supplies, power, optocouplers, interfaces, logic, RTC, sensors and MCUs (STM32 “Blue Pill”, ESP32).",
      "Docks flexibles: todos los paneles flotan y anidan donde quieras.":
        "Flexible docks: every panel floats and nests wherever you want.",
      "v8.55 – v8.61 — Plugins, panel de piezas y simulación no lineal":
        "v8.55 – v8.61 — Plugins, parts panel and non-linear simulation",
      "Sistema de plugins": "Plugin system",
      ": instalá extensiones .zip con menús, exportadores y eventos propios.":
        ": install .zip extensions with your own menus, exporters and events.",
      "Panel «Piezas de fabricante» acoplable": "Dockable “Manufacturer parts” panel",
      "(Ctrl+Shift+M) con stock y precios LCSC en vivo.":
        "(Ctrl+Shift+M) with live LCSC stock and prices.",
      "Simulación no lineal": "Non-linear simulation",
      ": diodo exponencial, MOSFET nivel 1, ayudas de convergencia, generadores PWL/expresión y banco XY.":
        ": exponential diode, level-1 MOSFET, convergence aids, PWL/expression generators and an XY bench.",
      "Pantalla de inicio": "Start screen",
      "con miniaturas de proyectos y": "with project thumbnails and a",
      "paleta de comandos Ctrl+K": "Ctrl+K command palette",
      "Cables exactos al pin (fix de pines off-grid) y render sin recortes.":
        "Wires exactly at pins (off-grid pin fix) and clipping-free rendering.",
      "v8.42 – v8.54 — PCB de lujo y rendimiento GPU":
        "v8.42 – v8.54 — Luxury PCB and GPU performance",
      "Modo foto": "Photo mode",
      "(render realista con cobre metalizado),": "(realistic rendering with metalised copper),",
      "modo capa única": "single-layer mode",
      ", colores y opacidad por capa en vivo.": ", live per-layer colours and opacity.",
      "Origen de usuario": "User origin",
      ", rejillas configurables y diálogo de reglas de diseño por categorías con preview.":
        ", configurable grids and a design-rules dialog by category with preview.",
      "Viewport OpenGL + niveles de detalle": "OpenGL viewport + levels of detail",
      ": placas densas y esquemas gigantes, fluidos.":
        ": dense boards and huge schematics, fluid.",
      "Editor visual de footprints con arrastre de pads, serigrafía y courtyard editables.":
        "Visual footprint editor with draggable pads, editable silkscreen and courtyard.",
      "v8.30 – v8.41 — Biblioteca universal e idiomas":
        "v8.30 – v8.41 — Universal library and languages",
      "Importador EasyEDA/LCSC real": "Real EasyEDA/LCSC importer",
      ": símbolo y footprint reales desde la nube, con un clic.":
        ": real symbol and footprint from the cloud, in one click.",
      "Serie CMOS 4000 y TTL 74xx con pinouts curados; borneras y conectores.":
        "CMOS 4000 and TTL 74xx series with curated pinouts; terminal blocks and connectors.",
      "i18n completo": "Full i18n",
      "(ES/EN/PT), buscador Ctrl+F, autosave, panel de violaciones DRC/ERC, net-classes, export STEP 3D con color, import/export KiCad, panel de historial visual.":
        "(ES/EN/PT), Ctrl+F search, autosave, DRC/ERC violations panel, net-classes, coloured 3D STEP export, KiCad import/export, visual history panel.",
      "Antes de v8.30": "Before v8.30",
      "Ruteo interactivo profesional (posturas 45°/90°, push & shove, pares diferenciales, serpentinas, teardrops, fanout, router negociado PathFinder multicapa).":
        "Professional interactive routing (45°/90° postures, push & shove, differential pairs, meanders, teardrops, fanout, negotiated PathFinder multilayer router).",
      "Simulación SPICE con BJT/diodo no lineal, barridos, Monte Carlo, Fourier/THD y Playground interactivo en vivo.":
        "SPICE simulation with non-linear BJT/diode, sweeps, Monte Carlo, Fourier/THD and an interactive live Playground.",
      "Fabricación completa: Gerber, Excellon, Pick & Place, BOM, IPC-2581, ODB++, PDF y Output Job en ZIP.":
        "Full fabrication: Gerber, Excellon, Pick & Place, BOM, IPC-2581, ODB++, PDF and Output Job in a ZIP.",
      "Ladder/PLC, hojas jerárquicas, buses, 7 temas y más de 130 componentes.":
        "Ladder/PLC, hierarchical sheets, buses, 7 themes and over 130 components."
    },

    pt: {
      "ElectronArt — EDA profesional: Esquemático, PCB, Simulación y PLC":
        "ElectronArt — EDA profissional: Esquemático, PCB, Simulação e CLP",
      "ElectronArt es una suite EDA de escritorio: diseño de esquemáticos, ruteo de PCB con DRC y Gerber, simulación SPICE, editor Ladder/PLC y exportación de fabricación. Por Electronik Lösungen.":
        "O ElectronArt é uma suíte EDA de desktop: captura de esquemáticos, roteamento de PCB com DRC e Gerber, simulação SPICE, editor Ladder/CLP e exportação de fabricação. Por Electronik Lösungen.",
      "ElectronArt — Suite EDA profesional": "ElectronArt — Suíte EDA profissional",
      "Esquemático · PCB · Simulación SPICE · Ladder/PLC · Fabricación. Sin internet, sin suscripción obligatoria.":
        "Esquemático · PCB · Simulação SPICE · Ladder/CLP · Fabricação. Sem internet, sem assinatura obrigatória.",

      "Características": "Recursos",
      "Flujo": "Fluxo",
      "Comparación": "Comparação",
      "Precios": "Preços",
      "Descargas": "Downloads",
      "FAQ": "FAQ",
      "Comunidad": "Comunidade",
      "Descargar": "Baixar",
      "Principal": "Principal",
      "Menú": "Menu",
      "Idioma": "Idioma",

      "Diseñe, simule y fabrique": "Projete, simule e fabrique",
      "en una sola herramienta": "em uma única ferramenta",
      "ElectronArt integra captura de esquemáticos, simulación SPICE, ruteo de PCB multicapa con autorouter configurable y salida de fabricación completa — Gerber con arcos reales, Excellon, IPC-2581, ODB++ — en una aplicación de escritorio rápida y sin dependencias de la nube.":
        "O ElectronArt reúne captura de esquemáticos, simulação SPICE, roteamento de PCB multicamada com autorroteador configurável e saída de fabricação completa — Gerber com arcos reais, Excellon, IPC-2581, ODB++ — em um aplicativo de desktop rápido e sem dependências de nuvem.",
      "Empezar gratis": "Começar de graça",
      "Ver el flujo ▸": "Ver o fluxo ▸",
      "✓ Funciona sin internet": "✓ Funciona sem internet",
      "✓ Sin suscripción obligatoria": "✓ Sem assinatura obrigatória",
      "✓ Windows 10/11": "✓ Windows 10/11",
      "ElectronArt — editor de PCB con la placa ruteada, capas y propiedades":
        "ElectronArt — editor de PCB com a placa roteada, camadas e propriedades",

      "Recorrido por una placa": "Um passeio pela placa",
      "Cobre": "Cobre",
      "Cada pista es una decisión": "Cada trilha é uma decisão",
      "Ancho, capa, separación, impedancia. ElectronArt las respeta mientras ruteás, no cuando ya es tarde.":
        "Largura, camada, isolamento, impedância. O ElectronArt respeita tudo isso enquanto você roteia, não quando já é tarde.",
      "Vías": "Vias",
      "Bajás de capa sin perder la red": "Você troca de camada sem perder a rede",
      "El autoruteo pone la vía donde hace falta y no donde no: un pad pasante ya cruza la placa, y ahí no va ninguna.":
        "O autorroteamento coloca a via onde é preciso e não onde não é: um pad passante já atravessa a placa, e ali não vai nenhuma.",
      "Componentes": "Componentes",
      "Modelos de verdad, no cajitas": "Modelos de verdade, não caixinhas",
      "Más de cien encapsulados con las medidas del fabricante, y el modo caricatura para cuando lo que importa es entender.":
        "Mais de cem encapsulamentos com as medidas do fabricante, e o modo caricatura para quando o que importa é entender.",
      "Fabricación": "Fabricação",
      "Y termina en un archivo que la fábrica acepta":
        "E termina em um arquivo que a fábrica aceita",
      "Gerber con arcos reales, taladros, Pick & Place, BOM, IPC-2581 y ODB++. Sin sorpresas.":
        "Gerber com arcos reais, furos, Pick & Place, BOM, IPC-2581 e ODB++. Sem surpresas.",
      "Avance": "Progresso",

      "Un flujo de trabajo completo, sin cambiar de programa":
        "Um fluxo de trabalho completo, sem trocar de programa",
      "Esquemático, placa, simulación y documentación comparten un mismo proyecto y se mantienen sincronizados.":
        "Esquemático, placa, simulação e documentação compartilham o mesmo projeto e ficam sincronizados.",
      "Captura de esquemáticos": "Captura de esquemáticos",
      "137 símbolos en estilos ANSI, IEC y educativo, buses, hojas jerárquicas, numeración de conductores IEC, cross-probing con la placa y anotación automática de referencias.":
        "137 símbolos nos estilos ANSI, IEC e educativo, barramentos, folhas hierárquicas, numeração de condutores IEC, cross-probing com a placa e anotação automática de referências.",
      "Ruteo de PCB profesional": "Roteamento de PCB profissional",
      "Ruteo interactivo a 45°/90°/arcos, pares diferenciales, serpentinas de igualación, planos de cobre y teardrops. Autorouter con estrategia, grilla y costos ajustables, dos caras y vías puestas por conectividad.":
        "Roteamento interativo a 45°/90°/arcos, pares diferenciais, serpentinas de igualação, planos de cobre e teardrops. Autorroteador com estratégia, grade e custos ajustáveis, duas faces e vias colocadas por conectividade.",
      "Simulación SPICE integrada": "Simulação SPICE integrada",
      "DC, transitorio y AC con modelos no lineales reales (diodo exponencial, BJT Ebers-Moll, MOSFET nivel 1, SCR/Triac con enganche), barridos, Monte Carlo, Fourier/THD y banco con osciloscopio.":
        "DC, transitório e AC com modelos não lineares reais (diodo exponencial, BJT Ebers-Moll, MOSFET nível 1, SCR/Triac com engate), varreduras, Monte Carlo, Fourier/THD e bancada com osciloscópio.",
      "Salida de fabricación": "Saída de fabricação",
      "Paquete completo en un clic: Gerber RS-274X con arcos G02/G03 reales, Excellon, Pick & Place, BOM con stock en vivo, PDF, IPC-2581 y ODB++, listo para JLCPCB o PCBWay.":
        "Pacote completo em um clique: Gerber RS-274X com arcos G02/G03 reais, Excellon, Pick & Place, BOM com estoque ao vivo, PDF, IPC-2581 e ODB++, pronto para JLCPCB ou PCBWay.",
      "Interoperabilidad": "Interoperabilidade",
      "Importa KiCad, EAGLE, Gerber multicapa, IPC-2581 y ODB++; exporta STEP 3D con color, DXF y bibliotecas KiCad. Sus proyectos nunca quedan encerrados en un formato.":
        "Importa KiCad, EAGLE, Gerber multicamada, IPC-2581 e ODB++; exporta STEP 3D colorido, DXF e bibliotecas KiCad. Seus projetos nunca ficam presos a um formato.",
      "Verificación DRC y ERC": "Verificação DRC e ERC",
      "Reglas por clase de red (clearance, ancho, anillo anular, borde, taladros, pares diferenciales) con panel de violaciones navegable, y verificación eléctrica del esquemático.":
        "Regras por classe de rede (isolamento, largura, anel anular, borda, furos, pares diferenciais) com painel de violações navegável, e verificação elétrica do esquemático.",
      "Biblioteca de componentes real": "Biblioteca de componentes real",
      "Catálogo curado de más de 150 partes verificadas, stock LCSC en vivo, importación del CAD real de EasyEDA y un motor que interpreta datasheets en PDF para crear el símbolo exacto.":
        "Catálogo curado de mais de 150 peças verificadas, estoque LCSC ao vivo, importação do CAD real do EasyEDA e um motor que interpreta datasheets em PDF para criar o símbolo exato.",
      "Control industrial y PLC": "Controle industrial e CLP",
      "Símbolos IEC de potencia y maniobra, contactores con referencias cruzadas, editor Ladder con simulación en vivo y co-simulación de microcontroladores AVR en el esquemático.":
        "Símbolos IEC de potência e manobra, contatores com referências cruzadas, editor Ladder com simulação ao vivo e cossimulação de microcontroladores AVR no esquemático.",
      "Vista 3D de la placa": "Vista 3D da placa",
      "Visor OpenGL integrado, no una exportación: cuerpos por encapsulado, cobre y máscara reales, sombreado ambiental horneado, LED translúcidos y render 4K para presentar el proyecto. También exporta STEP con color.":
        "Visualizador OpenGL integrado, não uma exportação: corpos por encapsulamento, cobre e máscara reais, sombreamento ambiental pré-calculado, LEDs translúcidos e render 4K para apresentar o projeto. Também exporta STEP colorido.",
      "Modo caricatura": "Modo caricatura",
      "El mismo circuito, dibujado como en un libro de electrónica: cada componente de la biblioteca tiene su ilustración reconocible. Para enseñar, documentar o entender de un vistazo qué hace la placa.":
        "O mesmo circuito, desenhado como num livro de eletrônica: cada componente da biblioteca tem sua ilustração reconhecível. Para ensinar, documentar ou entender num relance o que a placa faz.",
      "Tablero en vivo": "Painel ao vivo",
      "Abrí el esquemático y el PCB en el browser —o en una tablet del mismo wifi, protegida con token— y vas viendo cómo se actualizan mientras editás, con botones para refrescar, repour y DRC.":
        "Abra o esquemático e o PCB no navegador —ou num tablet do mesmo wi-fi, protegido por token— e acompanhe a atualização enquanto edita, com botões para atualizar, refazer o plano de cobre e rodar o DRC.",
      "Rápido con placas grandes": "Rápido com placas grandes",
      "Niveles de detalle al alejar, ancho mínimo de pista en pantalla (las pistas nunca desaparecen), antialias que se aparta durante el paneo e índice espacial que hace el DRC cientos de veces más rápido en placas de miles de pistas.":
        "Níveis de detalhe ao afastar, largura mínima de trilha na tela (as trilhas nunca somem), antialias que sai do caminho durante o pan e índice espacial que deixa o DRC centenas de vezes mais rápido em placas com milhares de trilhas.",

      "Del esquema a la fábrica": "Do esquema à fábrica",
      "Dibujá": "Desenhe",
      "Colocá componentes y cableá tu circuito.": "Coloque componentes e ligue seu circuito.",
      "Simulá": "Simule",
      "Verificá el comportamiento con SPICE y ERC.":
        "Verifique o comportamento com SPICE e ERC.",
      "Ruteá": "Roteie",
      "Sincronizá a PCB, ruteá el cobre y corré el DRC.":
        "Sincronize com o PCB, roteie o cobre e rode o DRC.",
      "Fabricá": "Fabrique",
      "Exportá Gerber, taladros, Pick&Place y BOM.":
        "Exporte Gerber, furos, Pick & Place e BOM.",

      "Cómo se compara": "Como se compara",
      "Lo esencial de las grandes suites, sin la complejidad ni el precio.":
        "O essencial das grandes suítes, sem a complexidade nem o preço.",
      "Función": "Recurso",
      "Esquemático + PCB": "Esquemático + PCB",
      "Editor Ladder / PLC": "Editor Ladder / CLP",
      "Esquemas eléctricos IEC + simulación de mando":
        "Esquemas elétricos IEC + simulação de comando",
      "Funciona 100% offline": "Funciona 100% offline",
      "Sin suscripción obligatoria": "Sem assinatura obrigatória",
      "Exportación Gerber / BOM": "Exportação Gerber / BOM",
      "Precio de entrada": "Preço de entrada",
      "Gratis": "Grátis",
      "Gratis*": "Grátis*",
      "Comparativa orientativa. Marcas de terceros pertenecen a sus respectivos dueños. “~” = parcial / con limitaciones.":
        "Comparação orientativa. Marcas de terceiros pertencem a seus respectivos donos. “~” = parcial / com limitações.",

      "Precios simples, en USD": "Preços simples, em USD",
      "Licencia anual. Sin nube y sin cuenta obligatoria.":
        "Licença anual. Sem nuvem e sem conta obrigatória.",
      "/ año": "/ ano",
      "Gratuita": "Gratuita",
      "Sin registro, sin límite de tiempo": "Sem cadastro, sem prazo",
      "✓ Esquemático, PCB y 3D completos": "✓ Esquemático, PCB e 3D completos",
      "✓ Autorouter, DRC y ERC": "✓ Autorroteador, DRC e ERC",
      "✓ Simulación SPICE": "✓ Simulação SPICE",
      "✓ Gerber, Excellon y BOM": "✓ Gerber, Excellon e BOM",
      "— Hasta 2 capas de cobre": "— Até 2 camadas de cobre",
      "— Con marca de agua, uso no comercial": "— Com marca-d'água, uso não comercial",
      "Estudiante": "Estudante",
      "Verificando que estudiás": "Comprovando que você estuda",
      "✓ Todo lo de Gratuita, sin marca de agua": "✓ Tudo da Gratuita, sem marca-d'água",
      "✓ Hasta 6 capas de cobre": "✓ Até 6 camadas de cobre",
      "✓ Pares diferenciales y serpentinas": "✓ Pares diferenciais e serpentinas",
      "✓ Monte Carlo y FFT en SPICE": "✓ Monte Carlo e FFT no SPICE",
      "✓ Lectura de datasheets con IA": "✓ Leitura de datasheets com IA",
      "✓ Módulo eléctrico y PLC completo": "✓ Módulo elétrico e CLP completo",
      "— Uso no comercial": "— Uso não comercial",
      "Pedir licencia": "Pedir licença",
      "Más elegido": "Mais escolhido",
      "sha256sum ElectronArt-*-win64.zip":
        "sha256sum ElectronArt-*-win64.zip",
      "shasum -a 256 ElectronArt-*-win64.zip":
        "shasum -a 256 ElectronArt-*-win64.zip",
      "sha256sum -c ElectronArt-*-win64.zip.sha256":
        "sha256sum -c ElectronArt-*-win64.zip.sha256",
      "Para makers y profesionales": "Para makers e profissionais",
      "✓ Uso comercial": "✓ Uso comercial",
      "✓ Hasta 16 capas de cobre": "✓ Até 16 camadas de cobre",
      "✓ IPC-2581, ODB++ y STEP 3D": "✓ IPC-2581, ODB++ e STEP 3D",
      "✓ Actualizaciones 1 año": "✓ Atualizações por 1 ano",
      "Comprar Pro": "Comprar Pro",
      "Para control y automatización": "Para controle e automação",
      "✓ Todo lo de Pro": "✓ Tudo do Pro",
      "✓ Librería IEC 60617 de control": "✓ Biblioteca IEC 60617 de comando",
      "✓ Simulación del esquema de mando": "✓ Simulação do esquema de comando",
      "✓ Montaje en riel DIN y tablero": "✓ Montagem em trilho DIN e painel",
      "✓ Editor Ladder / PLC": "✓ Editor Ladder / CLP",
      "✓ Soporte prioritario y licencia de equipo":
        "✓ Suporte prioritário e licença de equipe",
      "Comprar Industrial": "Comprar Industrial",

      "Preguntas frecuentes": "Perguntas frequentes",
      "¿Necesito conexión a internet?": "Preciso de conexão com a internet?",
      "¿En qué sistemas corre?": "Em quais sistemas roda?",
      "El programa corre en": "O programa roda em",
      "Windows, Linux y macOS": "Windows, Linux e macOS",
      ": está hecho con Python y PySide6 (Qt6), y no depende de nada propio de un sistema. Hoy publicamos el":
        ": é feito com Python e PySide6 (Qt6) e não depende de nada específico de um sistema. Hoje publicamos o",
      "instalador de Windows 10 y 11": "instalador para Windows 10 e 11",
      "; en Linux y macOS se ejecuta desde el código, y el paquete compilado para esos dos está en camino.":
        "; no Linux e no macOS você executa a partir do código, e o pacote compilado para esses dois está a caminho.",
      "¿La licencia es por suscripción?": "A licença é por assinatura?",
      "Pro e Industrial son anuales: se renuevan cada 12 meses y podés cancelarlas cuando quieras. Lo que":
        "Pro e Industrial são anuais: renovam a cada 12 meses e você pode cancelar quando quiser. O que",
      "no": "não",
      "es por suscripción es el programa: funciona sin conexión y tus archivos son tuyos, en tu disco, en un formato abierto. Gratuita y Estudiante no vencen.":
        "é por assinatura é o programa: funciona sem conexão e seus arquivos são seus, no seu disco, em formato aberto. Gratuita e Estudante não expiram.",
      "¿Puedo usar la versión gratuita comercialmente?":
        "Posso usar a versão gratuita comercialmente?",
      "No. La Gratuita y la de Estudiante son para uso personal y educativo. Para trabajo comercial necesitás Pro o Industrial.":
        "Não. A Gratuita e a de Estudante são para uso pessoal e educacional. Para trabalho comercial é preciso Pro ou Industrial.",
      "¿Qué puedo hacer realmente con la versión Gratuita?":
        "O que dá para fazer de verdade com a versão Gratuita?",
      "¿Qué es el módulo eléctrico / Industrial?":
        "O que é o módulo elétrico / Industrial?",
      "¿Exporta archivos para fabricar en JLCPCB/PCBWay?":
        "Exporta arquivos para fabricar na JLCPCB/PCBWay?",
      "Sí. Exporta Gerber RS-274X, taladros Excellon, Pick&Place y BOM, compatibles con las fábricas más comunes.":
        "Sim. Exporta Gerber RS-274X, furos Excellon, Pick & Place e BOM, compatíveis com as fábricas mais comuns.",
      "¿Qué métodos de pago aceptan?": "Quais formas de pagamento vocês aceitam?",
      "Tarjeta internacional vía Gumroad/Stripe y MercadoPago para Argentina y Latinoamérica.":
        "Cartão internacional via Gumroad/Stripe e MercadoPago para a Argentina e a América Latina.",
      "¿De quién son los diseños que hago con ElectronArt?":
        "De quem são os projetos que eu faço com o ElectronArt?",
      "¿Puedo usarlo para dictar cursos o en una escuela?":
        "Posso usá-lo para dar cursos ou numa escola?",

      "Comunidad y soporte": "Comunidade e suporte",
      "Quién lo hace": "Quem faz",
      "EL": "EL",
      "Franco Olmedo": "Franco Olmedo",
      "Ingeniero electrónico · Diseño de PCB, firmware embebido y automatización industrial":
        "Engenheiro eletrônico · Projeto de PCB, firmware embarcado e automação industrial",
      "ElectronArt lo desarrolla": "O ElectronArt é desenvolvido pela",
      ", un estudio independiente argentino. No hay un comité de producto atrás: hay alguien que diseña placas y que hizo la herramienta que le faltaba, con el módulo eléctrico IEC que sale de trabajar en tableros de verdad.":
        ", um estúdio independente argentino. Não há um comitê de produto atrás: há alguém que projeta placas e que fez a ferramenta que lhe faltava, com o módulo elétrico IEC que vem de trabalhar em painéis de verdade.",
      "Cada versión se publica con sus novedades y su checksum, y los errores se responden en el foro. Si necesitás algo puntual para tu flujo de trabajo, se puede hablar.":
        "Cada versão é publicada com suas novidades e seu checksum, e os erros são respondidos no fórum. Se precisar de algo pontual para o seu fluxo de trabalho, dá para conversar.",
      "Portfolio ▸": "Portfólio ▸",
      "LinkedIn ▸": "LinkedIn ▸",
      "ElectronArt está en beta y se desarrolla a la vista. Preguntas, ayuda entre usuarios y errores van al mismo lugar, y se responden ahí.":
        "O ElectronArt está em beta e é desenvolvido à vista. Dúvidas, ajuda entre usuários e erros vão para o mesmo lugar, e são respondidos ali.",
      "Entrar al foro": "Entrar no fórum",
      "Descargas y checksums ▸": "Downloads e checksums ▸",
      "Diseñá tu próxima placa hoy": "Projete sua próxima placa hoje",
      "Descargá la versión gratuita y llegá hasta el Gerber sin pagar nada.":
        "Baixe a versão gratuita e chegue até o Gerber sem pagar nada.",
      "Producto": "Produto",
      "Recursos": "Recursos",
      "Manual": "Manual",
      "Foro": "Fórum",
      "Novedades": "Novidades",
      "Un asistente que te muestra el cambio antes de hacerlo": "Um assistente que mostra a mudança antes de fazê-la",
      "Le pedís lo que necesitás en castellano. Te contesta, dibuja lo que va a hacer sobre tu placa, y sólo lo aplica si vos aceptás.": "Peça o que precisa em linguagem comum. Ele responde, desenha o que vai fazer na sua placa, e só aplica se você aceitar.",
      "Lo ves antes de que pase": "Você vê antes que aconteça",
      "Lo que agrega se dibuja en oro sobre el diseño, lo que saca aparece tachado y lo que mueve muestra su recorrido. Nada toca tu proyecto hasta que apretás Aplicar.": "O que adiciona é desenhado em dourado sobre o projeto, o que remove aparece riscado, e o que move mostra o seu percurso. Nada toca o seu projeto até você clicar em Aplicar.",
      "Aceptás lo que querés": "Você aceita o que quiser",
      "Cada cambio va en una lista con su tilde. Destildás uno y desaparece del dibujo al instante. Se aplica sólo lo que dejaste marcado, y entra como un solo Ctrl+Z.": "Cada mudança é uma linha marcada numa lista. Desmarque uma e ela some do desenho na hora. Aplica-se apenas o que ficou marcado, e entra como um único Ctrl+Z.",
      "O corre en tu máquina": "Ou roda na sua máquina",
      "Podés usarlo con tu propia clave, o contra un modelo local: ahí el diseño no sale de tu computadora. Para trabajo bajo acuerdo de confidencialidad, esa diferencia lo es todo.": "Use com a sua própria chave, ou com um modelo local — aí o projeto nunca sai do seu computador. Para trabalho sob acordo de confidencialidade, essa diferença é tudo.",
      "Hoy sabe trabajar sobre la placa: planos de cobre, ruteo, mover componentes, agujeros de montaje y verificación de reglas. No diseña el circuito por vos.": "Hoje trabalha na placa: planos de cobre, roteamento, mover componentes, furos de montagem e verificação de regras. Não projeta o circuito por você.",
      "Asistente": "Assistente",
      "Flux": "Flux",
      "Asistente de IA que": "Assistente de IA que",
      "dibuja el cambio sobre el diseño": "desenha a mudança sobre o projeto",
      "antes de aplicarlo": "antes de aplicá-la",
      "El asistente puede correr": "O assistente pode rodar",
      "en tu máquina": "na sua máquina",
      ", sin subir el diseño": ", sem enviar o seu projeto",
      "Términos y licencia": "Termos e licença",
      "Privacidad": "Privacidade",
      "Contacto": "Contato",
      "Suite EDA de escritorio.": "Suíte EDA de desktop.",
      "by": "por",
      "Electronik Lösungen · ElectronArt. Todos los derechos reservados.":
        "Electronik Lösungen · ElectronArt. Todos os direitos reservados.",
      "· Software propietario — sus diseños le pertenecen":
        "· Software proprietário — seus projetos pertencem a você",

      "¿En Argentina? También aceptamos": "Na Argentina? Também aceitamos",
      "· Pagos con tarjeta internacional vía": "· Pagamentos com cartão internacional via",
      ". Al comprar o descargar aceptás los":
        ". Ao comprar ou baixar você aceita os",
      "Términos y licencia (EULA)": "Termos e licença (EULA)",
      ". Tus diseños son 100 % tuyos.": ". Seus projetos são 100% seus.",

      /* ── descargas.html ── */
      "Descargas — ElectronArt": "Downloads — ElectronArt",
      "Descargá ElectronArt: enlaces de descarga, verificación SHA-256, requisitos del sistema y resolución de problemas.":
        "Baixe o ElectronArt: links de download, verificação SHA-256, requisitos do sistema e resolução de problemas.",
      "← Volver al sitio": "← Voltar ao site",
      "Enlaces oficiales, requisitos y cómo verificar que la descarga esté completa.":
        "Links oficiais, requisitos e como verificar se o download está completo.",
      "Archivo": "Arquivo",
      "Plataforma": "Plataforma",
      "Tamaño": "Tamanho",
      "Windows 10/11 (64 bits)": "Windows 10/11 (64 bits)",
      "Windows 10/11 (64 bits) — instalador": "Windows 10/11 (64 bits) — instalador",
      "Windows 10/11 (64 bits) — ZIP portable": "Windows 10/11 (64 bits) — ZIP portátil",
      "Verificá la descarga": "Verifique o download",
      "Después de bajar el archivo, compará su hash SHA-256 con el que figura arriba. Si no coinciden, el archivo se bajó incompleto o alguien lo modificó — no lo ejecutes.":
        "Depois de baixar o arquivo, compare o hash SHA-256 com o que está acima. Se não coincidirem, o arquivo foi baixado incompleto ou alguém o modificou — não o execute.",
      "Windows (PowerShell):": "Windows (PowerShell):",
      "Linux:": "Linux:",
      "macOS:": "macOS:",
      "Al lado de cada ZIP publicamos también su archivo": "Junto de cada ZIP também publicamos o arquivo",
      ", si preferís que la verificación la haga la herramienta:":
        ", se você preferir que a verificação seja feita pela ferramenta:",
      "Requisitos": "Requisitos",
      "Windows 10 u 11, 64 bits": "Windows 10 ou 11, 64 bits",
      "4 GB de RAM (8 GB recomendado para placas grandes)":
        "4 GB de RAM (8 GB recomendado para placas grandes)",
      "~350 MB de espacio libre (el ZIP descomprimido ocupa unos 275 MB)":
        "~350 MB de espaço livre (o ZIP descompactado ocupa cerca de 275 MB)",
      "Tarjeta gráfica con OpenGL 2.1 o superior para la vista 3D — cualquier placa o gráfica integrada de la última década alcanza":
        "Placa de vídeo com OpenGL 2.1 ou superior para a vista 3D — qualquer placa ou gráfica integrada da última década dá conta",
      "Instalación": "Instalação",
      "Bajá el instalador (el archivo que termina en":
        "Baixe o instalador (o arquivo que termina em",
      "), hacé doble clic y seguí el asistente. Deja el acceso en el menú Inicio, un desinstalador en «Aplicaciones instaladas» y la asociación de los archivos del programa. No pide permisos de administrador.":
        "), dê dois cliques e siga o assistente. Ele deixa o atalho no menu Iniciar, um desinstalador em “Aplicativos instalados” e a associação dos arquivos do programa. Não pede permissões de administrador.",
      "Para actualizar no hace falta desinstalar nada: el instalador nuevo reemplaza a la copia anterior y tus preferencias, tu biblioteca y tu licencia quedan como están. El programa además te avisa solo cuando sale una versión, y podés buscarla a mano desde Ayuda ▸ Buscar actualizaciones…":
        "Para atualizar não é preciso desinstalar nada: o novo instalador substitui a cópia anterior e suas preferências, sua biblioteca e sua licença continuam como estão. O programa também avisa sozinho quando sai uma versão, e você pode procurar por ela em Ajuda ▸ Procurar atualizações…",
      "Si preferís no instalar nada, el ZIP sigue publicado: descomprimilo donde quieras y ejecutá":
        "Se preferir não instalar nada, o ZIP continua publicado: descompacte-o onde quiser e execute",
      ". Así no hay accesos directos ni desinstalador: para sacarlo, borrás la carpeta.":
        ". Assim não há atalhos nem desinstalador: para removê-lo, apague a pasta.",
      "Tus preferencias, tu biblioteca y tu licencia viven fuera de la carpeta del programa —en":
        "Suas preferências, sua biblioteca e sua licença ficam fora da pasta do programa — em",
      "y en el registro de Windows—, así que desinstalar no las borra y reinstalar no te hace volver a activar nada.":
        "e no registro do Windows — então desinstalar não as apaga e reinstalar não faz você ativar nada de novo.",
      "Windows va a mostrarte una advertencia. Es esperable.":
        "O Windows vai mostrar um aviso. É esperado.",
      "La primera vez que abras": "Na primeira vez que você abrir",
      ", Windows muestra una pantalla azul que dice":
        ", o Windows mostra uma tela azul que diz",
      "«Windows protegió su PC»": "“O Windows protegeu o seu PC”",
      ". No es un virus ni un error: es SmartScreen avisando que todavía no reconoce este programa.":
        ". Não é um vírus nem um erro: é o SmartScreen avisando que ainda não reconhece este programa.",
      "Para continuar:": "Para continuar:",
      "Más información": "Mais informações",
      "Ejecutar de todas formas": "Executar mesmo assim",
      "Por qué pasa, sin vueltas: SmartScreen construye su confianza con la cantidad de descargas que acumula un programa. ElectronArt es nuevo, así que todavía no tiene esa historia. A medida que más gente lo instale, el aviso desaparece solo.":
        "Por que acontece, sem rodeios: o SmartScreen constrói sua confiança com a quantidade de downloads que um programa acumula. O ElectronArt é novo, então ainda não tem esse histórico. À medida que mais gente instalar, o aviso desaparece sozinho.",
      "Mientras tanto, la forma seria de comprobar que el archivo es el nuestro y llegó entero es el":
        "Enquanto isso, a forma séria de comprovar que o arquivo é o nosso e chegou inteiro é o",
      "SHA-256 de más arriba": "SHA-256 acima",
      ": si el número coincide, nadie lo tocó en el camino. Esa verificación es más fuerte que cualquier aviso del sistema operativo.":
        ": se o número coincidir, ninguém o tocou no caminho. Essa verificação é mais forte do que qualquer aviso do sistema operacional.",
      "¿Problemas?": "Problemas?",
      "Si la descarga no arranca, el antivirus la bloquea o la instalación falla, visitá el":
        "Se o download não começa, o antivírus o bloqueia ou a instalação falha, visite o",
      "foro de la comunidad": "fórum da comunidade",
      "o escribinos por correo.": "ou nos escreva por e-mail.",
      "Si el programa ya está instalado y algo no funciona, abrí Ayuda ▸ Diagnóstico…: arma un informe con tu versión, tu sistema, tu placa de video y el estado de la licencia, y lo podés copiar o mandarlo al foro con un botón. No incluye tu licencia ni tu correo.":
        "Se o programa já está instalado e algo não funciona, abra Ajuda ▸ Diagnóstico…: ele monta um relatório com a sua versão, o seu sistema, a sua placa de vídeo e o estado da licença, e você pode copiá-lo ou enviá-lo ao fórum com um botão. Não inclui a sua licença nem o seu e-mail.",

      /* ── terminos.html ── */
      "Términos y licencia — ElectronArt": "Termos e licença — ElectronArt",
      "Términos de compra, descarga y licencia de ElectronArt.":
        "Termos de compra, download e licença do ElectronArt.",
      "Términos de compra y licencia": "Termos de compra e licença",
      "Última actualización: julio 2026 · Se aplican al descargar, comprar, instalar o usar ElectronArt.":
        "Última atualização: julho de 2026 · Aplicam-se ao baixar, comprar, instalar ou usar o ElectronArt.",
      "1. Qué está comprando": "1. O que você está comprando",
      "ElectronArt es software propietario de":
        "O ElectronArt é um software proprietário da",
      ". Al comprar una licencia usted adquiere el":
        ". Ao comprar uma licença, você adquire o",
      "derecho de uso": "direito de uso",
      "descrito en el": "descrito no",
      "Acuerdo de Licencia de Usuario Final (EULA)":
        "Contrato de Licença de Usuário Final (EULA)",
      "incluido con el producto — no la propiedad del software. Las ediciones":
        "incluído com o produto — não a propriedade do software. As edições",
      "son": "são",
      "licencias anuales": "licenças anuais",
      ": se renuevan cada 12 meses e incluyen las actualizaciones publicadas durante ese período. Puede cancelarlas cuando quiera; si vence o se cancela, ElectronArt":
        ": renovam a cada 12 meses e incluem as atualizações publicadas nesse período. Você pode cancelar quando quiser; se vencer ou for cancelada, o ElectronArt",
      "sigue abriendo y editando sus proyectos": "continua abrindo e editando seus projetos",
      "con las funciones de la edición Gratuita, y sus archivos permanecen accesibles en su disco y en un formato abierto. Las ediciones":
        "com os recursos da edição Gratuita, e seus arquivos continuam acessíveis no seu disco e em formato aberto. As edições",
      "no vencen.": "não expiram.",
      "USD 79 / año": "USD 79 / ano",
      "USD 299 / año": "USD 299 / ano",
      "2. Ediciones y alcance de uso": "2. Edições e alcance de uso",
      "Edición": "Edição",
      "Precio": "Preço",
      "Uso permitido": "Uso permitido",
      "Puestos": "Assentos",
      "Evaluación y proyectos personales,": "Avaliação e projetos pessoais,",
      "sin fines comerciales": "sem fins comerciais",
      ". Placas de hasta 2 capas de cobre; las salidas llevan marca de agua.":
        ". Placas de até 2 camadas de cobre; as saídas levam marca-d'água.",
      "Aprendizaje y proyectos personales,": "Aprendizado e projetos pessoais,",
      ", con el módulo eléctrico/PLC incluido. Aulas y laboratorios educativos sin cargo.":
        ", com o módulo elétrico/CLP incluído. Salas de aula e laboratórios educacionais sem custo.",
      "Todo uso,": "Qualquer uso,",
      "incluido comercial": "inclusive comercial",
      "(productos para la venta, servicios de diseño, uso en empresas) y educativo institucional.":
        "(produtos para venda, serviços de design, uso em empresas) e educacional institucional.",
      "1 persona / 2 equipos": "1 pessoa / 2 computadores",
      "Todo lo de Pro + el módulo eléctrico/PLC para uso comercial y uso en equipo dentro de una organización, con soporte prioritario.":
        "Tudo do Pro + o módulo elétrico/CLP para uso comercial e uso em equipe dentro de uma organização, com suporte prioritário.",
      "Hasta 5 personas": "Até 5 pessoas",
      "¿Su caso no encaja (más puestos, OEM, revendedores, currícula educativa paga)? Escríbanos y armamos una licencia a medida.":
        "O seu caso não se encaixa (mais assentos, OEM, revendedores, currículos educacionais pagos)? Escreva para a gente e montamos uma licença sob medida.",
      "3. Sus diseños son 100 % suyos": "3. Seus projetos são 100% seus",
      "Los esquemáticos, PCBs, Gerbers, BOMs, bibliotecas propias y productos que usted cree con ElectronArt le pertenecen por completo. Puede fabricarlos y venderlos":
        "Os esquemáticos, PCBs, Gerbers, BOMs, bibliotecas próprias e produtos que você criar com o ElectronArt pertencem inteiramente a você. Pode fabricá-los e vendê-los",
      "sin regalías, sin atribución y sin restricciones":
        "sem royalties, sem atribuição e sem restrições",
      ", con cualquier edición — la diferencia entre ediciones está en quién usa el software, no en qué puede hacer con sus resultados. (Única salvedad: las ediciones Gratuita y Student no pueden usarse":
        ", em qualquer edição — a diferença entre as edições está em quem usa o software, não no que você pode fazer com os resultados. (Única ressalva: as edições Gratuita e Estudante não podem ser usadas",
      "como herramienta de trabajo": "como ferramenta de trabalho",
      "comercial.)": "comercialmente.)",
      "4. Descarga, activación y reembolsos": "4. Download, ativação e reembolsos",
      "La descarga se entrega por enlace tras la compra (o gratis para Student).":
        "O download é entregue por link após a compra (ou grátis para o Estudante).",
      "El software funciona": "O software funciona",
      "offline": "offline",
      "; no exige cuenta ni conexión para diseñar.":
        "; não exige conta nem conexão para projetar.",
      "Reembolso completo dentro de los 14 días":
        "Reembolso integral dentro de 14 dias",
      "si el software no funciona en su equipo y el soporte no pudo resolverlo. Las compras vía plataformas de pago se rigen además por las políticas de la plataforma.":
        "se o software não funcionar no seu computador e o suporte não conseguir resolver. As compras por plataformas de pagamento também são regidas pelas políticas da plataforma.",
      "Probarlo 14 días gratis": "Teste grátis por 14 dias",
      "Sin tarjeta y sin renovación automática.":
        "Sem cartão e sem renovação automática.",
      "5. Datos personales": "5. Dados pessoais",
      "Se guarda lo": "Guardamos o",
      "mínimo para que la licencia funcione": "mínimo para que a licença funcione",
      ": el correo con el que compró —al que queda ligada la licencia y por el que llega el código— y, si los completa, los datos de facturación. Nada más. El programa":
        ": o e-mail com que você comprou —ao qual a licença fica vinculada e por onde chega o código— e, se você preencher, os dados de faturamento. Nada mais. O programa",
      "no manda telemetría": "não envia telemetria",
      ": no se registra qué diseña, qué componentes usa ni cuánto lo usa, y no hace falta cuenta ni conexión para trabajar.":
        ": não registra o que você projeta, quais componentes usa nem quanto usa, e não é preciso conta nem conexão para trabalhar.",
      "El pago lo procesa la pasarela (Gumroad o MercadoPago) y los datos de la tarjeta":
        "O pagamento é processado pelo gateway (Gumroad ou MercadoPago) e os dados do cartão",
      "nunca pasan por nuestros servidores": "nunca passam pelos nossos servidores",
      "El correo se comparte únicamente con el proveedor de envío de mails, para hacerle llegar su licencia.":
        "O e-mail é compartilhado apenas com o provedor de envio de e-mails, para lhe entregar a licença.",
      "Si reporta un problema desde el programa, se envía lo que muestra el propio diálogo antes de mandarlo —descripción, versión, sistema y, si usted lo marca, el log— y nada más.":
        "Se você reportar um problema pelo programa, é enviado o que a própria janela mostra antes de mandar —descrição, versão, sistema e, se você marcar, o log— e nada mais.",
      "Puede pedir el borrado de su cuenta y sus datos escribiendo al contacto de abajo; se responde dentro de los 30 días.":
        "Você pode pedir a exclusão da sua conta e dos seus dados escrevendo para o contato abaixo; respondemos em até 30 dias.",
      "6. Limitación de responsabilidad (resumen)":
        "6. Limitação de responsabilidade (resumo)",
      "Las simulaciones, verificaciones DRC/ERC y datos de componentes son herramientas de asistencia:":
        "As simulações, verificações DRC/ERC e dados de componentes são ferramentas de apoio:",
      "no sustituyen la verificación de ingeniería":
        "não substituem a verificação de engenharia",
      ". Usted es responsable de validar sus diseños antes de fabricarlos o conectarlos a instalaciones reales. La responsabilidad total se limita al importe pagado. El detalle completo está en el EULA.":
        ". Você é responsável por validar seus projetos antes de fabricá-los ou conectá-los a instalações reais. A responsabilidade total é limitada ao valor pago. O detalhe completo está no EULA.",
      "7. Código de terceros y marcas": "7. Código de terceiros e marcas",
      "ElectronArt incluye componentes open source bajo sus propias licencias (Qt/PySide6 LGPL-3.0, NumPy/SciPy/Matplotlib/pdfplumber BSD/MIT); la lista completa acompaña al producto. KiCad, EAGLE, Gerber, PSpice, LCSC y EasyEDA se mencionan solo para describir interoperabilidad; sus marcas pertenecen a sus titulares.":
        "O ElectronArt inclui componentes open source sob suas próprias licenças (Qt/PySide6 LGPL-3.0, NumPy/SciPy/Matplotlib/pdfplumber BSD/MIT); a lista completa acompanha o produto. KiCad, EAGLE, Gerber, PSpice, LCSC e EasyEDA são mencionados apenas para descrever interoperabilidade; suas marcas pertencem aos seus titulares.",
      "8. Contacto": "8. Contato",
      "Soporte técnico y licencias:": "Suporte técnico e licenças:",
      "Compras, facturación y consultas comerciales:": "Vendas, faturamento e consultas comerciais:",
      "Este resumen no reemplaza al EULA, que es el acuerdo vinculante y se muestra durante la instalación y en":
        "Este resumo não substitui o EULA, que é o acordo vinculante e é exibido durante a instalação e em",
      "Ayuda → Acerca de": "Ajuda → Sobre",
      ". Recomendamos revisión legal profesional para operaciones de volumen o acuerdos corporativos.":
        ". Recomendamos revisión jurídica profesional para operaciones de volumen o acuerdos corporativos.",

      /* ── privacidad.html ── */
      "Privacidad — ElectronArt": "Privacidade — ElectronArt",
      "Última actualización: agosto 2026 · Qué datos toca ElectronArt, cuáles no, y qué puede pedirnos que hagamos con ellos.":
        "Última atualização: agosto de 2026 · Quais dados o ElectronArt toca, quais não, e o que você pode nos pedir que façamos com eles.",
      "Lo más importante, primero": "O mais importante, primeiro",
      "Sus diseños nunca salen de su computadora.": "Seus projetos nunca saem do seu computador.",
      "Los esquemáticos, las placas, las simulaciones y los archivos de fabricación se guardan en su disco, en un formato abierto y documentado. No se suben a ningún servidor, ni nuestro ni de terceros, y no los miramos.":
        "Os esquemáticos, as placas, as simulações e os arquivos de fabricação são guardados no seu disco, em um formato aberto e documentado. Não são enviados a nenhum servidor, nem nosso nem de terceiros, e não os observamos.",
      "El programa funciona": "O programa funciona",
      "sin conexión": "sem conexão",
      ". La licencia se verifica con una firma criptográfica en su propia máquina: no hace falta que el programa «llame a casa» para dejarlo trabajar.":
        ". A licença é verificada com uma assinatura criptográfica na sua própria máquina: não é preciso que o programa “ligue para casa” para deixá-lo trabalhar.",
      "1. Qué guardamos, y por qué": "1. O que guardamos, e por quê",
      "Dato": "Dado",
      "Cuándo": "Quando",
      "Para qué": "Para quê",
      "Correo electrónico": "E-mail",
      "Al crear la cuenta o comprar": "Ao criar a conta ou comprar",
      "Enviarle la licencia, permitirle entrar y recuperar la contraseña":
        "Enviar a licença, permitir que você entre e recuperar a senha",
      "Nombre": "Nome",
      "Al crear la cuenta": "Ao criar a conta",
      "Emitir la licencia a su nombre": "Emitir a licença em seu nome",
      "Contraseña": "Senha",
      "Se guarda": "É guardada",
      "cifrada de ida": "com criptografia unidirecional",
      "(hash). No la conocemos ni podemos recuperarla":
        "(hash). Não a conhecemos nem podemos recuperá-la",
      "País, teléfono, empresa, CUIT/VAT": "País, telefone, empresa, CUIT/VAT",
      "Opcionales": "Opcionais",
      ", si los carga usted": ", se você as preencher",
      "Facturación. Puede dejarlos vacíos": "Faturamento. Você pode deixá-los vazios",
      "Compras": "Compras",
      "Al pagar": "Ao pagar",
      "Sostener su licencia y renovarla": "Manter a sua licença e renová-la",
      "Lo que publica en el foro": "O que você publica no fórum",
      "Si escribe en el foro": "Se você escreve no fórum",
      "Es público, lo elige usted": "É público, você escolhe",
      "2. Qué NO guardamos": "2. O que NÃO guardamos",
      "Sus proyectos, esquemáticos, placas ni archivos de fabricación.":
        "Seus projetos, esquemáticos, placas nem arquivos de fabricação.",
      "Los datos de su tarjeta. El pago lo procesan":
        "Os dados do seu cartão. O pagamento é processado pela",
      "en sus propias páginas; nosotros recibimos únicamente el aviso de que el pago se hizo.":
        "em suas próprias páginas; recebemos apenas o aviso de que o pagamento foi feito.",
      "Su ubicación, su agenda, sus contactos ni el contenido de su disco.":
        "Sua localização, sua agenda, seus contatos nem o conteúdo do seu disco.",
      "Un perfil suyo para publicidad. No vendemos ni cedemos datos a nadie, y no hay rastreadores de terceros en el sitio.":
        "Um perfil seu para publicidade. Não vendemos nem cedemos dados a ninguém, e não há rastreadores de terceiros no site.",
      "3. Cuándo el programa se conecta a internet":
        "3. Quando o programa se conecta à internet",
      "Son cuatro momentos, y ninguno manda su diseño:":
        "São quatro momentos, e nenhum envia o seu projeto:",
      "Activar la licencia": "Ativar a licença",
      ": se envía su correo y el código de compra para recibir la licencia firmada.":
        ": são enviados o seu e-mail e o código de compra para receber a licença assinada.",
      "Avisar de una versión nueva": "Avisar sobre uma nova versão",
      ": se consulta cuál es la última publicada. Si no hay internet, no pasa nada y el programa no avisa.":
        ": é consultado qual é a última versão publicada. Sem internet, não acontece nada e o programa não avisa.",
      "Bajar una hoja de datos": "Baixar uma folha de dados",
      ", cuando usted se lo pide: se envía el código del componente que escribió.":
        ", quando você pedir: é enviado o código do componente que você digitou.",
      "Reportar un problema": "Reportar um problema",
      ", cuando usted se lo pide: se le muestra": ", quando você pedir: é mostrado a você",
      "exactamente lo que se va a enviar antes de enviarlo":
        "exatamente o que será enviado antes de enviá-lo",
      ", y puede cancelar.": ", e você pode cancelar.",
      "4. El sitio web": "4. O site",
      "Contamos visitas con una herramienta": "Contamos as visitas com uma ferramenta",
      "propia": "própria",
      ": no usamos Google Analytics ni ningún servicio externo, y":
        ": não usamos o Google Analytics nem nenhum serviço externo, e",
      "no ponemos cookies de seguimiento": "não colocamos cookies de rastreamento",
      "—por eso tampoco le mostramos un cartel de cookies—. De cada visita guardamos la fecha, la página, y el dominio desde el que llegó.":
        "—por isso também não mostramos um aviso de cookies—. De cada visita guardamos a data, a página e o domínio de onde veio.",
      "No guardamos su dirección IP.": "Não guardamos o seu endereço de IP.",
      "Para no contar diez veces a la misma persona que recarga usamos un identificador anónimo que se calcula con una clave que":
        "Para não contar dez vezes a mesma pessoa que recarrega, usamos um identificador anônimo calculado com uma chave que",
      "cambia todos los días": "muda todos os dias",
      ": no se puede volver a la persona, ni seguirla de un día para otro.":
        ": não é possível rastrear até a pessoa, nem acompanhá-la de um dia para o outro.",
      "5. Con quién compartimos": "5. Com quem compartilhamos",
      "Sólo con quienes hacen falta para que el producto funcione, y cada uno con sus propios términos:":
        "Apenas com quem é necessário para o produto funcionar, e cada um com os seus próprios termos:",
      "— cobrar.": "— cobrar.",
      "El proveedor de correo — mandarle la licencia y el reset de contraseña.":
        "O provedor de e-mail — para enviar a licença e a redefinição de senha.",
      "PythonAnywhere": "PythonAnywhere",
      "— donde corre el servidor.": "— onde roda o servidor.",
      "— desde donde se descargan los instaladores.": "— de onde os instaladores são baixados.",
      "Nadie más. No vendemos datos.": "Mais ninguém. Não vendemos dados.",
      "6. Sus derechos": "6. Seus direitos",
      "Puede pedirnos, escribiendo a": "Você pode nos pedir, escrevendo para",
      "electroniklosungen@gmail.com": "electroniklosungen@gmail.com",
      "Ver": "Ver",
      "todos los datos que tenemos suyos.": "todos os dados que temos seus.",
      "Corregir": "Corrigir",
      "lo que esté mal (también desde": "o que estiver errado (também pela",
      "Mi cuenta": "Minha conta",
      ").": ").",
      "Borrar": "Apagar",
      "su cuenta y sus datos. ⚠️ Al hacerlo pierde el acceso a renovar o volver a descargar su licencia desde su cuenta; el programa ya instalado sigue funcionando.":
        "sua conta e seus dados. ⚠️ Ao fazê-lo, você perde o acesso a renovar ou baixar novamente a licença pela sua conta; o programa já instalado continua funcionando.",
      "Llevarse": "Levar",
      "sus datos en un archivo.": "seus dados em um arquivo.",
      "Contestamos dentro de los 30 días.": "Respondemos em até 30 dias.",
      "7. Cuánto tiempo los guardamos": "7. Por quanto tempo os guardamos",
      "Mientras tenga la cuenta abierta. Si la borra, eliminamos sus datos personales; conservamos el registro de las compras el tiempo que exige la ley contable, porque no podemos borrarlo.":
        "Enquanto a conta estiver aberta. Se você a apagar, eliminamos seus dados pessoais; conservamos o registro das compras pelo tempo que a lei contábil exige, porque não podemos apagá-lo.",
      "8. Menores": "8. Menores",
      "El producto no está dirigido a menores de 16 años y no pedimos su edad. Si es responsable de un menor y cree que cargó datos, escríbanos y los borramos.":
        "O produto não é destinado a menores de 16 anos e não pedimos a idade. Se você é responsável por um menor e acredita que os dados dele foram carregados, escreva para nós e nós os apagamos.",
      "9. Cambios": "9. Mudanças",
      "Si esta política cambia de manera relevante, lo avisamos en el sitio y por correo a quienes tengan cuenta. La fecha de arriba dice cuándo se actualizó.":
        "Se esta política mudar de forma relevante, avisamos no site e por e-mail a quem tem conta. A data acima indica quando foi atualizada.",
      "Responsable:": "Responsável:",
      "Electronik Lösungen, Argentina ·": "Electronik Lösungen, Argentina ·",
      "Ver también los": "Veja também os",

      /* ── changelog.html ── */
      "Novedades — ElectronArt": "Novidades — ElectronArt",
      "Historial de novedades de ElectronArt, la suite EDA de Electronik Lösungen.":
        "Histórico de novidades do ElectronArt, a suíte EDA da Electronik Lösungen.",
      "⚡ Novedades": "⚡ Novidades",
      "Todo lo que fue ganando ElectronArt, versión a versión.":
        "Tudo o que o ElectronArt vem ganhando, versão a versão.",
      /* ── sección de video ── */
      "El programa, en movimiento": "O programa, em movimento",
      "Esquemático, simulación SPICE y placa, con paneos y zooms reales.":
        "Esquemático, simulação SPICE e placa, com paneios e zooms reais.",
      "Tu navegador no puede reproducir este video.":
        "Seu navegador não consegue reproduzir este vídeo.",

      /* ── v9.1 ── */
      "v9.1 — acabado de placa y marca nueva":
        "v9.1 — acabamento da placa e marca nova",
      "Lágrimas que se funden con la pista":
        "Lágrimas que se fundem com a trilha",
      ": los flancos salen tangentes al pad y llegan paralelos a la pista, así que el quiebre en la unión pasó de casi cincuenta grados a tres.":
        ": os flancos saem tangentes ao pad e chegam paralelos à trilha, então a quebra na junção passou de quase cinquenta graus para três.",
      "Codos a 45°":
        "Cantos a 45°",
      ": se cortan de una vez sobre toda la placa, después de rutear y sin tocar el motor que hoy cierra el cien por ciento.":
        ": cortados de uma vez em toda a placa, depois de rotear e sem mexer no motor que hoje fecha cem por cento.",
      "Identificación en la serigrafía":
        "Identificação na serigrafia",
      ": qué placa es y de qué revisión, colocada sola en un borde libre. Si no entra sin pisar un componente, no se imprime.":
        ": qual placa é e de qual revisão, posicionada sozinha em uma borda livre. Se não couber sem cobrir um componente, não é impressa.",
      "Propiedades del pad":
        "Propriedades do pad",
      ": doble clic sobre el pad abre las suyas y no las del componente entero — forma, tamaño en cada eje y red.":
        ": clicar duas vezes no pad abre as dele e não as do componente inteiro — formato, tamanho em cada eixo e rede.",
      "Agujeros de montaje y puntos de prueba":
        "Furos de fixação e pontos de teste",
      "como objetos de la placa, que se guardan con el proyecto. Las reglas avisan si les queda cobre ajeno bajo la arandela o si el barreno está tan al borde que el tornillo parte la fibra.":
        " como objetos da placa, salvos junto com o projeto. As regras avisam se sobra cobre de outra rede sob a arruela ou se o furo está tão na borda que o parafuso racha a fibra.",
      "Identidad nueva":
        "Identidade nova",
      ": la ligadura EA en el programa, el sitio y el foro, y los archivos .ea con su propio ícono para distinguirlos del programa en el explorador.":
        ": a ligadura EA no programa, no site e no fórum, e os arquivos .ea com ícone próprio para distingui-los do programa no explorador.",

      /* ── v9.0 ── */
      "v9.0 — Máscara, materia y módulo eléctrico":
        "v9.0 — Máscara, matéria e módulo elétrico",
      "Agosto 2026": "Agosto de 2026",
      "Identidad «Máscara»": "Identidade «Máscara»",
      ": chaflanes a 45° en vez de esquinas redondeadas, relieve de máscara de soldadura y pads perforados como viñetas. La misma piel en la app, la web y el foro.":
        ": chanfros a 45° em vez de cantos arredondados, relevo de máscara de solda e pads perfurados no lugar de marcadores. A mesma pele no app, no site e no fórum.",
      "120 modelos 3D reales": "120 modelos 3D reais",
      "de la biblioteca de KiCad, centrados sobre sus pads, con cobre, estaño y oro que reflejan de verdad.":
        "da biblioteca do KiCad, centrados sobre os seus pads, com cobre, estanho e ouro que refletem de verdade.",
      "Impresión por capas y modo plancha": "Impressão por camadas e modo transferência térmica",
      ": espejado, negro pleno y escala 1:1. Antes el PDF salía con todas las capas encimadas.":
        ": espelhado, preto pleno e escala 1:1. Antes o PDF saía com todas as camadas sobrepostas.",
      "Multicapa que llega igual al Gerber": "Multicamada que chega igual ao Gerber",
      ", con impedancia controlada: la placa que se fabrica es la que se diseñó.":
        ", com impedância controlada: a placa que se fabrica é a que foi projetada.",
      "Editor de placa": "Editor de placa",
      ": contorno arrastrable con cotas vivas, portapapeles, vínculo esquemático↔PCB, buscador que entiende español y":
        ": contorno arrastável com cotas ao vivo, área de transferência, vínculo esquemático↔PCB, busca que entende português e",
      "teclas de una mano": "teclas de uma mão",
      "(S/T/V/M, Q para mm⇄mil, E propiedades, R/F rotar y voltear).":
        "(S/T/V/M, Q para mm⇄mil, E propriedades, R/F girar e espelhar).",
      "Módulo eléctrico industrial": "Módulo elétrico industrial",
      ": 25 símbolos IEC 60617, riel DIN y gabinetes ajustables, y":
        ": 25 símbolos IEC 60617, trilho DIN e gabinetes ajustáveis, e",
      "simulación del esquema de mando": "simulação do esquema de comando",
      "(Shift+F9) con enclavamiento, temporizadores, cortocircuito y disparo del térmico.":
        "(Shift+F9) com intertravamento, temporizadores, curto-circuito e disparo do térmico.",
      "Activación con el correo de tu compra": "Ativação com o e-mail da sua compra",
      ": sin pegar códigos largos. La licencia se verifica igual sin conexión.":
        ": sem colar códigos longos. A licença continua sendo verificada sem conexão.",
      "v8.74 — Jarvis en la tablet (LAN + token)":
        "v8.74 — Jarvis no tablet (LAN + token)",
      "actual": "atual",
      "Julio 2026": "Julho de 2026",
      "Plugins → 📶 Tablet en red local": "Plugins → 📶 Tablet na rede local",
      ": el Jarvis dashboard ahora se puede abrir desde una tablet o teléfono en el mismo wifi — el lienzo en vivo y los botones de control, en táctil.":
        ": o painel Jarvis agora pode ser aberto de um tablet ou celular no mesmo wi-fi — o desenho ao vivo e os botões de controle, em tela de toque.",
      "Protegido por token": "Protegido por token",
      ": la app te da el enlace con la llave (": ": o app te dá o link com a chave (",
      "); sin ella, ningún render ni comando sale de tu PC (verificación en cada pedido, comparación de tiempo constante).":
        "); sem ela, nenhum render e nenhum comando sai do seu PC (verificação a cada pedido, comparação em tempo constante).",
      "El acceso local sigue sin fricción y la opción queda guardada entre sesiones.":
        "O acesso local continua sem atrito e a opção fica salva entre sessões.",
      "v8.73 — Jarvis dashboard (co-diseño en vivo)":
        "v8.73 — Painel Jarvis (coprojeto ao vivo)",
      "Plugins → 🤖 Jarvis dashboard": "Plugins → 🤖 Painel Jarvis",
      ": un tablero en tu browser (solo 127.0.0.1) con el esquemático y el PCB":
        ": um painel no seu navegador (somente 127.0.0.1) com o esquemático e o PCB",
      "recargándose solos mientras editás": "recarregando sozinhos enquanto você edita",
      ", y control remoto con lista blanca: refrescar render, ajustar vista, repour de planos y DRC con su resultado en pantalla.":
        ", e controle remoto com lista branca: atualizar o render, ajustar a vista, refazer o plano de cobre e rodar o DRC com o resultado na tela.",
      "Arquitectura segura: los comandos se encolan en el server local y se ejecutan en el hilo de la interfaz — el browser jamás puede colgar el editor.":
        "Arquitetura segura: os comandos ficam na fila do servidor local e são executados na thread da interface — o navegador nunca pode travar o editor.",
      "Ideal para un segundo monitor, una tablet o co-diseñar con un asistente que ve tu lienzo.":
        "Ideal para um segundo monitor, um tablet ou coprojetar com um assistente que vê o seu desenho.",
      "v8.72 — Propiedades completas en todos los objetos":
        "v8.72 — Propriedades completas em todos os objetos",
      "Los cables tienen formulario completo": "Os fios têm formulário completo",
      "al seleccionarlos: red, conductor IEC, grosor, estilo, esquinas y color. Las etiquetas de red/buses/puertos también.":
        "ao selecioná-los: rede, condutor IEC, espessura, estilo, cantos e cor. As etiquetas de rede/barramentos/portas também.",
      "Componentes con colocación editable": "Componentes com posicionamento editável",
      "desde el panel: posición, rotación, espejado y bloqueo.":
        "pelo painel: posição, rotação, espelhamento e bloqueio.",
      "Inspector PCB ampliado": "Inspetor de PCB ampliado",
      ": referencia, posición X/Y y rotación libre del footprint; red editable en pistas y vías; alto de texto de serigrafía por ítem.":
        ": referência, posição X/Y e rotação livre do footprint; rede editável em trilhas e vias; altura do texto de serigrafia por item.",
      "v8.71 — Planos de cobre nivel pro": "v8.71 — Planos de cobre nível pro",
      "Prioridad de pour": "Prioridade de pour",
      "entre planos solapados: el prioritario gana el solape y el resto le deja clearance (semántica Altium).":
        "entre planos sobrepostos: o prioritário ganha a sobreposição e o resto mantém distância (semântica Altium).",
      "Islas huérfanas": "Ilhas órfãs",
      ": el cobre desconectado de su red se elimina solo al recalcular (apagable por plano).":
        ": o cobre desconectado da sua rede se elimina sozinho ao recalcular (desativável por plano).",
      "Repour selectivo": "Repour seletivo",
      "por plano desde el clic derecho, con reporte de islas eliminadas. Los Gerbers salen del mismo motor de pour.":
        "por plano pelo clique direito, com relatório das ilhas eliminadas. Os Gerbers saem do mesmo motor de pour.",
      "v8.70 — Cobre siempre sincronizado + 3D arreglado":
        "v8.70 — Cobre sempre sincronizado + 3D corrigido",
      "Las pistas siguen al footprint siempre": "As trilhas sempre acompanham o footprint",
      "(drag, flechas, sincronizar, undo) y": "(drag, setas, sincronizar, undo) e",
      "los planos y teardrops se re-fluyen solos": "os planos e teardrops se recalculam sozinhos",
      "tras cada cambio — el cobre nunca queda desactualizado.":
        "após cada mudança — o cobre nunca fica desatualizado.",
      "Visor 3D con profundidad correcta": "Visualizador 3D com profundidade correta",
      "(fin del efecto translúcido) y modelos más reales: bandas de resistencia, electrolíticos con franja de polaridad, patas DIP.":
        "(fim do efeito translúcido) e modelos mais realistas: faixas de resistor, eletrolíticos com faixa de polaridade, pernas DIP.",
      "Dibujá un rectángulo → convertilo en plano de cobre o borde de placa":
        "Desenhe um retângulo → transforme-o em plano de cobre ou borda de placa",
      "(clic derecho, estilo Altium); plano editable completo: térmico, puente, gap.":
        "(clique direito, estilo Altium); plano editável completo: térmico, ponte, gap.",
      "Traducción completa de menús (EN/PT) y miniaturas de los temas en Ver → Tema. Foro beta con categoría de feedback.":
        "Tradução completa dos menus (EN/PT) e miniaturas dos temas em Ver → Tema. Fórum beta com categoria de feedback.",
      "v8.69 — Caricaturas universales + licencias limpias":
        "v8.69 — Caricaturas universais + licenças limpas",
      "Modo caricatura para TODOS los componentes":
        "Modo caricatura para TODOS os componentes",
      ": un generador automático crea el arte educativo de cualquier pieza a partir de su encapsulado, categoría y pines — incluidas las que importás de LCSC/EasyEDA, datasheets o tu biblioteca.":
        ": um gerador automático cria a arte educativa de qualquer peça a partir do seu encapsulamento, categoria e pinos — inclusive as que você importa do LCSC/EasyEDA, datasheets ou da sua biblioteca.",
      "Lectura de PDFs con backend MIT": "Leitura de PDFs com backend MIT",
      "(pdfplumber): el motor de datasheets ya no depende de bibliotecas AGPL — producto comercial con licencias limpias.":
        "(pdfplumber): o motor de datasheets não depende mais de bibliotecas AGPL — produto comercial com licenças limpas.",
      "EULA y términos de compra": "EULA e termos de compra",
      ": licencia clara por edición, tus diseños son 100 % tuyos, lista de licencias de terceros incluida.":
        ": licença clara por edição, seus projetos são 100% seus, lista de licenças de terceiros incluída.",
      "v8.68 — Arcos Gerber reales + conductores IEC":
        "v8.68 — Arcos Gerber reais + condutores IEC",
      "Las pistas redondeadas salen al Gerber como arcos G02/G03 verdaderos":
        "As trilhas arredondadas saem no Gerber como arcos G02/G03 verdadeiros",
      "(modo G75, tangentes exactos): la curva fabricada es idéntica a la de pantalla, sin aplanar a polilíneas.":
        "(modo G75, tangentes exatas): a curva fabricada é idêntica à da tela, sem achatar em polilinhas.",
      "El import Gerber lee arcos G02/G03": "O import de Gerber lê arcos G02/G03",
      "— propios o de otros EDA.": "— próprios ou de outros EDAs.",
      "Numerar conductores (IEC)": "Numerar condutores (IEC)",
      ": numera cada conductor del esquemático en orden de lectura, estilo planos industriales; los rotulados conservan su nombre. Se dibuja sobre cada cable y se guarda con el documento.":
        ": numera cada condutor do esquemático em ordem de leitura, estilo planos industriais; os rotulados mantêm o nome. É desenhado sobre cada fio e salvo com o documento.",
      "v8.67 — Búsqueda federada de piezas": "v8.67 — Busca federada de peças",
      "«Piezas de fabricante» encadena tres niveles solo":
        "“Peças de fabricante” encadeia apenas três níveis",
      ": catálogo local → LCSC → datasheet. Cualquier componente del mundo sin salir del panel.":
        ": catálogo local → LCSC → datasheet. Qualquer componente do mundo sem sair do painel.",
      "MPN fuera del catálogo → un clic lo trae de LCSC con el CAD real de EasyEDA":
        "MPN fora do catálogo → um clique o traz do LCSC com o CAD real do EasyEDA",
      ": símbolo con pines verdaderos y footprint con pads exactos, guardado en tu biblioteca.":
        ": símbolo com pinos verdadeiros e footprint com pads exatos, salvo na sua biblioteca.",
      "Si tampoco está en LCSC, pasa directo al motor de datasheets":
        "Se também não está no LCSC, vai direto ao motor de datasheets",
      "con la búsqueda ya corriendo y el preview editable.":
        "com a busca já rodando e o preview editável.",
      "Honesto por diseño: solo acepta part numbers que corresponden de verdad (exacto o prefijo, nunca fuzzy).":
        "Honesto por design: só aceita part numbers que correspondem de verdade (exato ou prefixo, nunca fuzzy).",
      "v8.66 — Imports de fabricación exactos": "v8.66 — Imports de fabricação exatos",
      "Import Gerber multi-capa en una pasada": "Import de Gerber multicamada de uma vez",
      ": varios archivos (top, bottom e internas In1/In2) con origen común — capas perfectamente alineadas.":
        ": vários arquivos (top, bottom e internas In1/In2) com origem comum — camadas perfeitamente alinhadas.",
      "Los planos del Gerber (regiones G36/G37) se importan como zonas de cobre":
        "Os planos do Gerber (regiões G36/G37) são importados como zonas de cobre",
      "Import EAGLE exacto en rotación y espejo":
        "Import do EAGLE exato em rotação e espelhamento",
      ": R90/180/270 y MR* aterrizan con cada pad en su posición absoluta exacta y los SMD en la capa correcta.":
        ": R90/180/270 e MR* aterrissam com cada pad na sua posição absoluta exata e os SMD na camada correta.",
      "v8.65 — Pulido de uso real": "v8.65 — Polimento de uso real",
      "Esc siempre vuelve al cursor normal": "Esc sempre volta ao cursor normal",
      "desde cualquier herramienta (esquemático y PCB).":
        "de qualquer ferramenta (esquemático e PCB).",
      "Clic derecho sobre cualquier ítem del PCB":
        "Clique direito em qualquer item do PCB",
      ": Propiedades / Editar / Borrar — incluido el texto de serigrafía.":
        ": Propriedades / Editar / Apagar — inclusive o texto de serigrafia.",
      "Doble clic abre Propiedades/Inspector": "Clique duplo abre Propriedades/Inspetor",
      "aunque el panel estuviera cerrado.": "mesmo que o painel estivesse fechado.",
      "Las pistas conectadas siguen al footprint": "As trilhas conectadas acompanham o footprint",
      "al arrastrarlo, moverlo o rotarlo — nunca más cobre flotando.":
        "ao arrastrá-lo, movê-lo ou rotacioná-lo — nunca mais cobre flutuando.",
      "Vías con propiedades completas": "Vias com propriedades completas",
      ": taladro, anillo anular, par de capas, tented y mask expansion con apertura real en el Gerber.":
        ": furo, anel anular, par de camadas, tented e expansão de máscara com abertura real no Gerber.",
      "Menú PCB reorganizado": "Menu de PCB reorganizado",
      "en submenús (Ruteo · Planos y cobre · Dibujar · Edición · Vista · Reglas y análisis).":
        "em submenus (Roteamento · Planos e cobre · Desenhar · Edição · Vista · Regras e análise).",
      "Motor de datasheets con etapa LOCAL layout-aware":
        "Motor de datasheets com etapa LOCAL sensível ao layout",
      ": reconstruye la tabla de pines por geometría del PDF — offline y gratis; la IA con clave queda como último recurso opcional.":
        ": reconstrói a tabela de pinos pela geometria do PDF — offline e grátis; a IA com chave fica como último recurso opcional.",
      "Manual de usuario rediseñado (portada, índice clickeable, capítulos numerados).":
        "Manual do usuário redesenhado (capa, índice clicável, capítulos numerados).",
      "v8.62 – v8.64 — Motor de datasheets + 3D OpenGL":
        "v8.62 – v8.64 — Motor de datasheets + 3D OpenGL",
      "Importar desde datasheet": "Importar de datasheet",
      ": escribí cualquier MPN del mundo — encuentra el PDF, interpreta pines y package, con preview 100 % editable.":
        ": digite qualquer MPN do mundo — ele encontra o PDF, interpreta pinos e package, com preview 100% editável.",
      "IA de respaldo opcional": "IA de respaldo opcional",
      "(Preferencias → IA) con validación anti-alucinación estricta.":
        "(Preferências → IA) com validação estrita contra alucinação.",
      "Vista 3D OpenGL real": "Vista 3D OpenGL real",
      ": órbita suave, zoom, iluminación con brillos, MSAA 8×.":
        ": órbita suave, zoom, iluminação com brilhos, MSAA 8×.",
      "+51 partes curadas": "+51 peças curadas",
      "(155 en total) con pinout de datasheet: op-amps, fuentes, potencia, optoacopladores, interfaces, lógica, RTC, sensores y MCUs (STM32 «Blue Pill», ESP32).":
        "(155 no total) com pinout de datasheet: op-amps, fontes, potência, optoacopladores, interfaces, lógica, RTC, sensores e MCUs (STM32 “Blue Pill”, ESP32).",
      "Docks flexibles: todos los paneles flotan y anidan donde quieras.":
        "Docks flexíveis: todos os painéis flutuam e se aninham onde você quiser.",
      "v8.55 – v8.61 — Plugins, panel de piezas y simulación no lineal":
        "v8.55 – v8.61 — Plugins, painel de peças e simulação não linear",
      "Sistema de plugins": "Sistema de plugins",
      ": instalá extensiones .zip con menús, exportadores y eventos propios.":
        ": instale extensões .zip com menus, exportadores e eventos próprios.",
      "Panel «Piezas de fabricante» acoplable": "Painel “Peças de fabricante” acoplável",
      "(Ctrl+Shift+M) con stock y precios LCSC en vivo.":
        "(Ctrl+Shift+M) com estoque e preços LCSC ao vivo.",
      "Simulación no lineal": "Simulação não linear",
      ": diodo exponencial, MOSFET nivel 1, ayudas de convergencia, generadores PWL/expresión y banco XY.":
        ": diodo exponencial, MOSFET nível 1, ajudas de convergência, geradores PWL/expressão e bancada XY.",
      "Pantalla de inicio": "Tela inicial",
      "con miniaturas de proyectos y": "com miniaturas de projetos e a",
      "paleta de comandos Ctrl+K": "paleta de comandos Ctrl+K",
      "Cables exactos al pin (fix de pines off-grid) y render sin recortes.":
        "Fios exatos no pino (fix de pinos off-grid) e render sem cortes.",
      "v8.42 – v8.54 — PCB de lujo y rendimiento GPU":
        "v8.42 – v8.54 — PCB de luxo e desempenho de GPU",
      "Modo foto": "Modo foto",
      "(render realista con cobre metalizado),": "(render realista com cobre metalizado),",
      "modo capa única": "modo de camada única",
      ", colores y opacidad por capa en vivo.": ", cores e opacidade por camada ao vivo.",
      "Origen de usuario": "Origem do usuário",
      ", rejillas configurables y diálogo de reglas de diseño por categorías con preview.":
        ", grades configuráveis e diálogo de regras de design por categorias com preview.",
      "Viewport OpenGL + niveles de detalle": "Viewport OpenGL + níveis de detalhe",
      ": placas densas y esquemas gigantes, fluidos.":
        ": placas densas e esquemas gigantes, fluidos.",
      "Editor visual de footprints con arrastre de pads, serigrafía y courtyard editables.":
        "Editor visual de footprints com arrastrar pads, serigrafia e courtyard editáveis.",
      "v8.30 – v8.41 — Biblioteca universal e idiomas":
        "v8.30 – v8.41 — Biblioteca universal e idiomas",
      "Importador EasyEDA/LCSC real": "Importador real do EasyEDA/LCSC",
      ": símbolo y footprint reales desde la nube, con un clic.":
        ": símbolo e footprint reais da nuvem, com um clique.",
      "Serie CMOS 4000 y TTL 74xx con pinouts curados; borneras y conectores.":
        "Série CMOS 4000 e TTL 74xx com pinouts curados; bornes e conectores.",
      "i18n completo": "i18n completo",
      "(ES/EN/PT), buscador Ctrl+F, autosave, panel de violaciones DRC/ERC, net-classes, export STEP 3D con color, import/export KiCad, panel de historial visual.":
        "(ES/EN/PT), busca Ctrl+F, autosave, painel de violações DRC/ERC, net-classes, export STEP 3D colorido, import/export KiCad, painel de histórico visual.",
      "Antes de v8.30": "Antes da v8.30",
      "Ruteo interactivo profesional (posturas 45°/90°, push & shove, pares diferenciales, serpentinas, teardrops, fanout, router negociado PathFinder multicapa).":
        "Roteamento interativo profissional (posturas 45°/90°, push & shove, pares diferenciais, serpentinas, teardrops, fanout, roteador negociado PathFinder multicamada).",
      "Simulación SPICE con BJT/diodo no lineal, barridos, Monte Carlo, Fourier/THD y Playground interactivo en vivo.":
        "Simulação SPICE com BJT/diodo não linear, varreduras, Monte Carlo, Fourier/THD e Playground interativo ao vivo.",
      "Fabricación completa: Gerber, Excellon, Pick & Place, BOM, IPC-2581, ODB++, PDF y Output Job en ZIP.":
        "Fabricação completa: Gerber, Excellon, Pick & Place, BOM, IPC-2581, ODB++, PDF e Output Job em ZIP.",
      "Ladder/PLC, hojas jerárquicas, buses, 7 temas y más de 130 componentes.":
        "Ladder/CLP, folhas hierárquicas, barramentos, 7 temas e mais de 130 componentes."
    }
  };

  /* Textos largos de las FAQ y del pie: van aparte porque llevan HTML adentro
     (enlaces, <strong>) y se reemplazan por innerHTML, no por texto. */
  var T_HTML = {
    en: {
      "faq-offline":
        "No. Everything that touches the design —schematic, simulation, routing, DRC, 3D view and fabrication output— runs entirely on your machine, with no account and no cloud. PDF datasheet reading is local too: it rebuilds the pin table from the document's geometry. You only need internet for what is online by nature: live LCSC stock, importing EasyEDA CAD, or plugging in your own AI key as a last resort for a difficult datasheet.",
      "faq-gratuita":
        "A complete two-layer design, end to end: draw the schematic, simulate it in SPICE, route the board by hand or with the autorouter, check it with DRC and ERC, look at it in 3D, and export the Gerber, the Excellon and the BOM to send it out for manufacturing. It comes out watermarked and is for non-commercial use. What is left for the paid plans is what more demanding work needs: more than two layers, differential pairs and length-matching meanders, Monte Carlo and FFT, the IPC-2581/ODB++/STEP outputs a large fab asks for, and the industrial electrical module.",
      "faq-industrial":
        "It is the part an electronics EDA does not do: control and power schematics with standard IEC 60617 symbols —coils, contactors, motor-protective switches, thermal overload relays, residual-current devices, timers, control transformers and terminal blocks—, enclosure layout on DIN rail, and <strong>simulation of the schematic</strong>: you press the start button on screen, the coil energises, the contactor latches in, the motor starts, and the overload relay trips if you overload it. It includes the Ladder editor for the PLC logic. It is in Industrial, and also in Student for non-commercial use: someone learning electrical engineering needs all of it.",
      "faq-disenos":
        "Yours, 100&nbsp;%. The schematics, PCBs, Gerbers and products you design belong entirely to you and you may sell them with no royalties and no attribution, on any edition. The details are in the <a href=\"terminos.html\">Terms and licence</a>.",
      "faq-escuela":
        "Educational institutions may use the Student edition in classrooms and labs free of charge. Paid courses that rely on the software require one licence per instructor: Pro if the course is about electronics and PCB design, and Industrial if it relies on the electrical/PLC module, which Pro does not include.",
      "pie-bug":
        "Found a bug? In the app, <b>Help → “Report a problem…”</b> builds the report with the version, your system and the log — without you having to look for anything."
    },
    pt: {
      "faq-offline":
        "Não. Tudo o que faz parte do projeto —esquemático, simulação, roteamento, DRC, vista 3D e saída de fabricação— roda inteiro na sua máquina, sem conta e sem nuvem. A leitura de datasheets em PDF também é local: reconstrói a tabela de pinos pela geometria do documento. A internet só é necessária para o que é online por natureza: estoque LCSC ao vivo, importar o CAD do EasyEDA ou conectar sua própria chave de IA como último recurso para um datasheet difícil.",
      "faq-gratuita":
        "Um projeto completo de duas faces, de ponta a ponta: desenhar o esquemático, simulá-lo em SPICE, rotear a placa à mão ou com o autorroteador, verificar com DRC e ERC, olhá-la em 3D e exportar o Gerber, o Excellon e o BOM para mandar fabricar. Sai com marca-d'água e é para uso não comercial. O que fica para os planos pagos é o que um trabalho mais exigente precisa: mais de duas camadas, pares diferenciais e serpentinas de igualação, Monte Carlo e FFT, as saídas IPC-2581/ODB++/STEP que uma fábrica grande pede, e o módulo elétrico industrial.",
      "faq-industrial":
        "É a parte que um EDA de eletrônica não faz: esquemas elétricos de comando e potência com a simbologia normalizada IEC 60617 —bobinas, contatores, disjuntores-motor, relés térmicos, disjuntores diferenciais, temporizadores, transformadores de comando e bornes—, a montagem do painel sobre trilho DIN, e a <strong>simulação do esquema</strong>: você aperta o botão de partida na tela, a bobina energiza, o contator sela, o motor parte e o relé térmico atua se você o sobrecarregar. Inclui o editor Ladder para a lógica do CLP. Está no Industrial, e também no Estudante para uso não comercial: quem está aprendendo eletrotécnica precisa dele inteiro.",
      "faq-disenos":
        "Seus, 100&nbsp;%. Os esquemáticos, PCBs, Gerbers e produtos que você projetar pertencem inteiramente a você e podem ser comercializados sem royalties nem atribuição, em qualquer edição. O detalhe está nos <a href=\"terminos.html\">Termos e licença</a>.",
      "faq-escuela":
        "Instituições de ensino podem usar a edição Student em salas de aula e laboratórios sem custo. Para cursos pagos que se apoiam no software, corresponde uma licença por professor: Pro se o curso for de projeto eletrônico e de PCB, e Industrial se se apoiar no módulo elétrico/CLP, que o Pro não inclui.",
      "pie-bug":
        "Encontrou um erro? No aplicativo, <b>Ajuda → “Relatar um problema…”</b> monta o relatório com a versão, o seu sistema e o log — sem que você precise procurar nada."
    }
  };

  /* Los bloques con HTML se identifican por su primer trozo de texto, que es
     estable y no se repite. */
  var ANCLAS_HTML = [
    ["faq-offline", "No. Todo lo que hace al diseño"],
    ["faq-gratuita", "Un diseño completo de dos caras"],
    ["faq-industrial", "Es la parte que no hace un EDA"],
    ["faq-disenos", "Suyos, al 100"],
    ["faq-escuela", "Las instituciones educativas pueden"],
    ["pie-bug", "¿Encontraste un error?"]
  ];

  var original = null;   // se llena la primera vez: el español tal cual vino

  function norm(s) { return (s || "").replace(/\s+/g, " ").trim(); }

  function capturarOriginal() {
    original = { texto: [], html: [], attrs: [], title: document.title };
    var it = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = it.nextNode())) {
      if (!norm(n.nodeValue)) continue;
      var p = n.parentNode;
      if (p && (p.tagName === "SCRIPT" || p.tagName === "STYLE")) continue;
      original.texto.push([n, n.nodeValue]);
    }
    ANCLAS_HTML.forEach(function (par) {
      var clave = par[0], inicio = par[1];
      var nodos = document.querySelectorAll("p, summary");
      for (var i = 0; i < nodos.length; i++) {
        if (norm(nodos[i].textContent).indexOf(inicio) === 0) {
          original.html.push([nodos[i], clave, nodos[i].innerHTML]);
          break;
        }
      }
    });
    var conAttr = document.querySelectorAll("[alt], [aria-label], meta[content]");
    for (var j = 0; j < conAttr.length; j++) {
      ["alt", "aria-label", "content"].forEach(function (a) {
        var v = conAttr[j].getAttribute(a);
        if (v && norm(v)) original.attrs.push([conAttr[j], a, v]);
      });
    }
  }

  function aplicar(lang) {
    if (!original) capturarOriginal();
    var d = T[lang] || null, dh = T_HTML[lang] || null;

    original.texto.forEach(function (par) {
      var nodo = par[0], es = par[1];
      if (!d) { nodo.nodeValue = es; return; }
      var t = d[norm(es)];
      if (t === undefined) { nodo.nodeValue = es; return; }
      // conserva los espacios de alrededor para no pegar palabras al traducir
      var pre = es.match(/^\s*/)[0], post = es.match(/\s*$/)[0];
      nodo.nodeValue = pre + t + post;
    });

    original.html.forEach(function (par) {
      var el = par[0], clave = par[1], es = par[2];
      el.innerHTML = (dh && dh[clave]) ? dh[clave] : es;
    });

    original.attrs.forEach(function (par) {
      var el = par[0], a = par[1], es = par[2];
      var t = d ? d[norm(es)] : null;
      el.setAttribute(a, t !== undefined && t !== null ? t : es);
    });

    var t = d ? d[norm(original.title)] : null;
    document.title = (t !== undefined && t !== null) ? t : original.title;
    document.documentElement.lang = lang;
    try { localStorage.setItem(CLAVE, lang); } catch (e) {}
    var sel = document.getElementById("selIdioma");
    if (sel && sel.value !== lang) sel.value = lang;
  }

  function elegido() {
    var g;
    try { g = localStorage.getItem(CLAVE); } catch (e) {}
    if (g && IDIOMAS[g]) return g;
    // El idioma del navegador es la mejor primera impresión disponible: quien
    // llega desde un buscador en inglés no debería aterrizar en español.
    var nav = (navigator.language || "es").slice(0, 2).toLowerCase();
    return IDIOMAS[nav] ? nav : "es";
  }

  function iniciar() {
    var sel = document.getElementById("selIdioma");
    if (sel) {
      sel.addEventListener("change", function () { aplicar(sel.value); });
    }
    aplicar(elegido());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }

  window.EA_I18N = { T: T, T_HTML: T_HTML, IDIOMAS: IDIOMAS, aplicar: aplicar };
})();
