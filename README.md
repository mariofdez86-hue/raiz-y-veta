# La web del taller

Una sola página, sin servidor y sin base de datos: son archivos sueltos que se
abren en cualquier móvil. El carrito no cobra nada; junta lo que elige el cliente
y lo manda por WhatsApp con el pedido ya escrito.

---

## 1. Lo primero de todo: tu número de WhatsApp

Abre `js/config.js` y cambia esta línea:

```js
whatsapp: '34600000000',
```

El número va con el 34 delante, **sin** el `+`, sin espacios y sin guiones.
Si tu móvil es el 611 22 33 44, queda `'34611223344'`.

En ese mismo archivo están el nombre del negocio, la dirección del taller,
el horario y los enlaces a Facebook o Instagram. Cambia lo de la derecha del
`=` y guarda; no hace falta tocar nada más.

---

## 2. Poner tus fotos

Las cuatro fotos que mandaste ya están puestas, tanto en la galería de trabajos
como en las fichas de las mesas. Las piezas pequeñas (tabla, cuenco, banco,
estante) siguen con dibujos provisionales. Para poner más fotos:

1. Mete tus fotos en la carpeta `img/`. Que sean **.jpg**, apaisadas y de
   1200 píxeles de ancho más o menos. Menos de 300 KB cada una, que si no la
   web tarda en abrir en el móvil.
2. Abre `js/datos.js` y en cada pieza cambia la línea de la foto:

   ```js
   foto: 'img/mesa-comedor.svg',     →     foto: 'img/mi-mesa.jpg',
   ```

Lo mismo con la galería de trabajos, al final del archivo `datos.js`.

**Un consejo:** fotos con luz de día, el mueble completo y el fondo despejado.
Una foto buena vende más que cualquier cosa que haga la web.

### Las fotos de Facebook

De tu página de Facebook no se pueden descargar automáticamente. Ábrela en el
móvil, guarda las fotos en el carrete y mándamelas, o ponlas tú en `img/` como
arriba. Cuantas más mesas distintas, mejor: es lo que más vende.

---

## 3. Cambiar precios, medidas o piezas

Todo está en `js/datos.js`. Cada pieza es un bloque entre llaves `{ }`.

- **Cambiar un precio:** busca `precio: 890` y pon el tuyo.
- **Añadir una medida:** copia una línea de `medidas` y cámbiale la etiqueta
  y el precio. El precio de la ficha cambia solo según lo que elija el cliente.
- **Añadir una pieza:** copia un bloque entero, pégalo debajo y cámbiale los
  datos. Ojo con dejar la coma entre bloque y bloque.
- **Quitar una pieza:** borra su bloque entero, de `{` a `},`.

Los precios de ahora son **de ejemplo**. Pon los tuyos antes de publicar.

---

## 4. Publicar la web

Esta carpeta es la web entera. Para que la vea la gente, GitHub Pages es gratis
pero **solo en repositorios públicos**, así que va en uno aparte (como hiciste
con `agendabus-avisos`):

1. En GitHub: **New repository** → nombre `raiz-y-veta` → **Public** → crear.
2. **Add file → Upload files** y arrastra todo lo que hay dentro de esta carpeta
   (`index.html`, y las carpetas `css`, `js`, `img`, `qr`). Commit.
3. **Settings → Pages** → Source: *Deploy from a branch*, rama `main`,
   carpeta `/ (root)`. Guardar.
4. A los dos o tres minutos la web responde en:

   **https://mariofdez86-hue.github.io/raiz-y-veta/**

Esa es la dirección a la que apuntan los QR de la carpeta `qr/`. Si le pones
otro nombre al repositorio, hay que volver a generar los QR.

### Si algún día quieres dominio propio

Compra el dominio (unos 12 € al año) y, en vez de reimprimir las pegatinas,
deja en el repositorio `raiz-y-veta` un `index.html` que reenvíe al dominio
nuevo. Los QR ya pegados en las mesas seguirán funcionando.

---

## 5. Los QR para las mesas de muestra

En la carpeta `qr/`:

| Archivo | Para qué |
|---|---|
| `etiquetas-para-imprimir.html` | **Lo que buscas.** Ábrelo en el navegador y dale a imprimir: salen 8 etiquetas en un A4 para recortar y pegar en las mesas. |
| `qr-grande.png` | El QR suelto en grande, por si lo mandas a una imprenta o lo pones en un cartel. |
| `qr.svg` | El que sale en la propia web. |

Imprime al **100 %**, sin «ajustar a la página», o el QR puede salir pequeño.
Antes de pegar nada, escanea una etiqueta con tu propio móvil y comprueba que
abre la web.

---

## 6. Qué archivo es cada cosa

```
index.html              la página
css/estilos.css         colores, tipografías y colocación
js/config.js            TUS DATOS (whatsapp, nombre, horario)
js/datos.js             EL CATÁLOGO (piezas, precios, fotos)
js/app.js               carrito y pedido por WhatsApp
js/mesa3d.js            la mesa que gira (archivo empaquetado, no se toca)
js/mesa3d.fuente.js     el código legible de la mesa, por si hay que cambiarla
img/                    las fotos
qr/                     los QR y las etiquetas para imprimir
```

Si alguna vez hay que cambiar la mesa 3D, se edita `js/mesa3d.fuente.js` y se
vuelve a empaquetar con:

```bash
npx esbuild js/mesa3d.fuente.js --bundle --minify --format=esm --outfile=js/mesa3d.js
```

---

## 7. Cosas que conviene saber

- **No se cobra por la web.** El cliente manda el pedido por WhatsApp y el
  precio final, el plazo y el pago se cierran hablando. Si algún día quieres
  cobrar con tarjeta, hay que añadir una pasarela (Stripe) y eso ya necesita
  cuenta de comercio y comisiones.
- **El pedido se guarda en el móvil del cliente**, así que si cierra la web y
  vuelve, sigue teniendo lo que había elegido.
- **La mesa 3D** se dibuja sola con código, no es un vídeo. En móviles muy
  viejos sale un dibujo de la mesa en su lugar y la web funciona igual.
- **Quien tenga las animaciones desactivadas** en su móvil ve la página entera
  sin que nada se mueva, con todos los textos a la vista.

---

## 8. La skill Hallmark

En `.claude/skills/hallmark/` está [Hallmark](https://github.com/Nutlope/hallmark), una
skill de diseño para agentes de código: 50 temas, reglas de maquetación y un linter
(`sloplint`) que revisa la página en un navegador de verdad antes de darla por buena.

Está puesta ahí a propósito, no es basura del proyecto: cualquier sesión de Claude que
abra este repositorio la carga sola, sin instalar nada. Para usarla se le pide por su
nombre, por ejemplo `/hallmark redesign index.html`. Por su cuenta no toca nada: la
propia skill dice que no se mete en un diseño que ya existe salvo que la llames.

No afecta a la web publicada. GitHub Pages no sirve las carpetas que empiezan por punto,
así que esos archivos no se descargan cuando alguien entra en la página.

Versión 2.0.0, licencia MIT.
