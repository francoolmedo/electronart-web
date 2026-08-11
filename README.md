# ElectronArt — Sitio web (estático)

Landing de ventas estática para **ElectronArt** (by *Electronik Lösungen*).
Sin build, sin dependencias: HTML + CSS + un JS mínimo.

## Sistema visual «Máscara»

El sitio, el foro (`backend/static/style.css`) y la app (tema **Máscara** en
`src/theme/themes.py`) comparten una sola identidad. **Las reglas completas
están en `.claude/skills/electronart-design`** — leerlas antes de tocar nada
visual. En dos líneas: la interfaz no parece una placa, se fabrica como una.

- **Chaflán a 45°**, no `border-radius`: así sale de la fresadora.
- **Rótulos impresos sobre el borde** (serigrafía), no etiquetas adentro de una caja.
- **Pads perforados** como viñetas, **líneas de cota** como separadores.
- **El oro (`--gold`) se usa poco** — si aparece en todos lados, deja de significar algo.
- **Prohibido** porque delata plantilla: barra de acento a la izquierda de una
  tarjeta, rombos como marcador, degradados de dos colores en el texto, emoji
  como viñeta de sección.

Los colores viven **sólo** en el `:root` de `styles.css`. Ninguna página define
colores propios: si hace falta un tono nuevo, va como variable ahí.
`fondo.js` dibuja el tejido de cobre y lo inserta solo; alcanza con incluirlo.

## Archivos
```
website/
├── index.html        ← página principal (hero, features, comparación, precios, comunidad, FAQ)
├── descargas.html    ← descargas con SHA-256, verificación, requisitos e instalación
├── changelog.html    ← novedades versión por versión
├── terminos.html     ← términos y licencia (EULA)
├── styles.css        ← tema oscuro (#1e1e2e / #4ecca3 / #4d8eff), responsive
├── script.js         ← nav móvil y año del pie
├── enlaces.js        ← ⭐ URLs externas (foro, manual, redes) en UN solo lugar
├── fondo.js          ← tejido de cobre del fondo (se inserta solo)
├── netlify.toml      ← deploy Netlify (base = website, sin build)
├── vercel.json       ← deploy Vercel (clean URLs + cache de assets)
├── .nojekyll         ← GitHub Pages sirve la carpeta tal cual
└── assets/
    ├── logo.svg
    ├── favicon.svg
    ├── app-schematic.png   ← captura real (hero)
    └── app-3d.png          ← captura real (vista 3D)
```

## Probar localmente
```bash
cd website
python -m http.server 8000
# abrir http://localhost:8000
```

## Publicar
Subí la carpeta `website/` tal cual a cualquier hosting estático. Ya vienen configs zero-config:
- **GitHub Pages** (automático): el workflow `.github/workflows/deploy-pages.yml` publica `website/` en cada push a `main`. Una sola vez: *Settings ▸ Pages ▸ Source = "GitHub Actions"*. (Asume raíz del repo = `Circuitron/`; si tu raíz es un nivel más arriba, cambiá `website` → `Circuitron/website` en el workflow). El `.nojekyll` evita el procesado Jekyll.
- **Netlify**: conectá el repo; `netlify.toml` fija *base = website*, sin build command.
- **Vercel**: importá el repo con *Root Directory = website*; `vercel.json` aplica clean URLs + cache de assets.
- **Cloudflare Pages / a mano**: arrastrá la carpeta `website/` (sin build; publish dir = la carpeta misma).

## Mantenimiento por script (no editar a mano)

| Qué | Script | Cuándo |
|---|---|---|
| Tabla de descargas + SHA-256 | `python scripts/gen_downloads.py --write` | después de cada build |
| Novedades vs. el «Acerca de» de la app | `python scripts/gen_changelog.py --check` | antes de publicar una versión |
| Links, anclas, assets, higiene de páginas | `python scripts/check_links.py [--online]` | siempre |

- **`gen_downloads.py`** lee los ZIP de `dist/`, calcula el hash y reescribe sólo
  lo que está entre `<!-- AUTO:descargas -->` y `<!-- /AUTO:descargas -->`. Con
  `--base-url https://…` los nombres quedan enlazados de verdad. Deja también un
  `.sha256` al lado de cada ZIP. `--check` falla si la página quedó atrás del build.
- **`gen_changelog.py`** compara `changelog.html` contra el «Acerca de» de la app
  (la fuente de verdad) y avisa qué versiones faltan; con `--write` las inserta
  como borrador para curar a mano — **no pisa** las entradas ya publicadas.

## ⚠️ Antes de publicar: configurar los links y los pagos

**Los links externos (foro, manual, contacto, redes) se cargan en un solo lugar:
`enlaces.js`.** Poné la URL en ese objeto y todas las páginas la toman. El foro
sale del deploy del backend (`backend/fly.toml`).

Los botones de precio siguen aparte, en `index.html`
(buscá `data-pay=` y `data-link=`). Desde el rediseño comprar→activar
(F14.5), **todos** llevan `data-link="tienda"` → la página `/store` del
backend, que es el único lugar con el checkout real configurado
(`EA_PAGO_URLS`: Gumroad internacional / MercadoPago Argentina):

| Botón | Atributos | Va a |
|---|---|---|
| Descargar gratis (Gratuita) | `href="descargas.html"` | landing de descargas |
| Pedir licencia (Student) | `data-pay="student" data-link="tienda"` | `/store` |
| Comprar Pro ($79) | `data-pay="pro" data-link="tienda"` | `/store` |
| Comprar Industrial ($299) | `data-pay="industrial" data-link="tienda"` | `/store` |
| MercadoPago / Gumroad | `data-pay="…" data-link="tienda"` | `/store` |
| Manual / Foro / Contacto / Redes | `data-link="..."` | **cargar en `enlaces.js`** |

Mientras un `href` siga siendo `#`, `enlaces.js` muestra un aviso de "link pendiente"
al hacer clic, en vez de dejar que no pase nada.

## Precios (decididos)
- **Student** — Gratis (uso personal/educativo)
- **Pro** — USD 79 (uso comercial, autorouter/DRC/ERC, fabricación + 3D)
- **Industrial** — USD 299 (industrial/VFD, Ladder/PLC, soporte)

## Notas
- Las marcas de terceros (Altium, Eagle, Proteus, EasyEDA) se mencionan solo con
  fines comparativos.
- El hero ya usa una **captura real** (`assets/app-schematic.png`). Para refrescarla,
  reemplazá el PNG por una captura nueva del mismo tamaño.
