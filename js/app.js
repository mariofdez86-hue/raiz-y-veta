/* =========================================================
   Raíz y Veta — el funcionamiento de la página
   Catálogo, carrito, pedido por WhatsApp y visor de fotos.
   No hace falta servidor: todo pasa en el móvil del cliente.
   ========================================================= */

(function () {
  'use strict';

  const C = window.CONFIG || {};
  const ARTICULOS = window.ARTICULOS || [];
  const GALERIA = window.GALERIA || [];
  const LLAVE = 'raizyveta.carrito';

  const $ = (s, d = document) => d.querySelector(s);
  const $$ = (s, d = document) => Array.from(d.querySelectorAll(s));

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const euros = (n) => n.toLocaleString('es-ES', { maximumFractionDigits: 0 }) + ' €';

  const enlaceWa = (texto) =>
    'https://wa.me/' + String(C.whatsapp || '').replace(/\D/g, '') +
    '?text=' + encodeURIComponent(texto);

  const pieza = (id) => ARTICULOS.find((a) => a.id === id);

  /* ---------------- Textos que vienen de config.js ---------------- */

  function rellenarDatos() {
    $$('[data-c]').forEach((el) => {
      const v = C[el.dataset.c];
      if (v) { el.textContent = v; return; }
      // lo que esté vacío en config.js no se enseña a medias
      const fila = el.closest('.datos-taller > div');
      if (fila) fila.remove();
    });
    $$('[data-wa-texto]').forEach((el) => {
      el.href = enlaceWa(el.dataset.waTexto || C.saludoSuelto || 'Hola');
    });
    const fb = $('#enlace-facebook');
    if (fb) { if (C.facebook) fb.href = C.facebook; else fb.remove(); }
    const ig = $('#enlace-instagram');
    if (ig) { if (C.instagram) ig.href = C.instagram; else ig.remove(); }
    document.title = (C.nombre || 'Taller') + ' — Mesas de un solo tablón, con canto vivo';
  }

  /* ---------------- Catálogo ---------------- */

  function fichaPieza(a) {
    const varias = a.medidas.length > 1;
    const barato = Math.min.apply(null, a.medidas.map((m) => m.precio));
    const fichas = [
      ['Madera', a.madera],
      ['Grosor', a.grosor],
      ['Acabado', a.acabado]
    ].filter((f) => f[1]);

    return '<article class="pieza" data-id="' + esc(a.id) + '">' +
      '<div class="foto"><img src="' + esc(a.foto) + '" alt="' + esc(a.nombre) +
        '" loading="lazy" width="1200" height="900"></div>' +
      '<div class="cuerpo">' +
        '<h3>' + esc(a.nombre) + '</h3>' +
        '<p class="descripcion">' + esc(a.texto) + '</p>' +
        '<ul class="fichas">' +
          fichas.map((f) => '<li><b>' + esc(f[0]) + '</b><span>' + esc(f[1]) + '</span></li>').join('') +
        '</ul>' +
        '<div class="pie">' +
          (varias
            ? '<label class="oculto-visual" for="med-' + esc(a.id) + '">Medidas de ' + esc(a.nombre) + '</label>' +
              '<select class="medidas" id="med-' + esc(a.id) + '">' +
                a.medidas.map((m, i) => '<option value="' + i + '">' + esc(m.etiqueta) +
                  ' · ' + euros(m.precio) + '</option>').join('') +
              '</select>'
            : '<p class="descripcion" style="margin:0">' + esc(a.medidas[0].etiqueta) + '</p>') +
          '<p class="precio"><span class="cifra-precio">' + euros(barato) + '</span>' +
            (varias ? '<small>según la medida</small>' : '') + '</p>' +
          '<div class="acciones-pieza">' +
            '<button class="btn btn-verde" data-anadir="' + esc(a.id) + '">Añadir al pedido</button>' +
            '<a class="btn btn-hueco" data-preguntar="' + esc(a.id) + '" href="#">Preguntar</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function pintarCatalogo() {
    const sitio = $('#catalogo-secciones');
    if (!sitio) return;

    const cats = (window.CATEGORIAS && window.CATEGORIAS.length)
      ? window.CATEGORIAS
      : [{ id: 'mesas', titulo: 'Catálogo', nota: '' }];

    // una sección por categoría; la que se quede sin piezas no sale
    sitio.innerHTML = cats.map((c) => {
      const suyas = ARTICULOS.filter((a) => (a.categoria || a.tipo) === c.id);
      if (!suyas.length) return '';
      return '<div class="bloque-catalogo" id="cat-' + esc(c.id) + '">' +
        '<div class="rejilla-titulo">' +
          '<h2>' + esc(c.titulo) + '</h2>' +
          (c.nota ? '<p class="aviso-precio">' + esc(c.nota) + '</p>' : '<p></p>') +
        '</div>' +
        '<div class="piezas">' + suyas.map(fichaPieza).join('') + '</div>' +
      '</div>';
    }).join('');

    // el precio sigue a la medida elegida
    $$('select.medidas').forEach((sel) => {
      sel.addEventListener('change', () => {
        const art = pieza(sel.closest('.pieza').dataset.id);
        const m = art.medidas[Number(sel.value)];
        const hueco = sel.closest('.pieza').querySelector('.cifra-precio');
        if (hueco && m) hueco.textContent = euros(m.precio);
      });
    });

    $$('[data-anadir]').forEach((b) => {
      b.addEventListener('click', () => {
        const art = pieza(b.dataset.anadir);
        const sel = b.closest('.pieza').querySelector('select.medidas');
        anadir(art.id, sel ? Number(sel.value) : 0);
      });
    });

    $$('[data-preguntar]').forEach((a) => {
      const art = pieza(a.dataset.preguntar);
      const sel = () => {
        const s = a.closest('.pieza').querySelector('select.medidas');
        return art.medidas[s ? Number(s.value) : 0];
      };
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        const m = sel();
        const texto = (C.saludoSuelto || 'Hola') + ' Me interesa la ' + art.nombre.toLowerCase() +
          ' (' + m.etiqueta + '). ¿Me cuentas plazos y precio final?';
        window.open(enlaceWa(texto), '_blank', 'noopener');
      });
    });
  }

  /* ---------------- Galería ---------------- */

  function pintarGaleria() {
    const h = $('#rejilla-galeria');
    if (!h) return;
    h.innerHTML = GALERIA.map((g, i) =>
      '<figure><button type="button" data-foto="' + i + '" aria-label="Ver más grande: ' + esc(g.pie) + '">' +
      '<img src="' + esc(g.foto) + '" alt="' + esc(g.pie) + '" loading="lazy" width="1000" height="1000">' +
      '</button><figcaption>' + esc(g.pie) + '</figcaption></figure>'
    ).join('');

    const visor = $('#visor');
    $$('[data-foto]', h).forEach((b) => {
      b.addEventListener('click', () => {
        const g = GALERIA[Number(b.dataset.foto)];
        $('#visor-img').src = g.foto;
        $('#visor-img').alt = g.pie;
        $('#visor-pie').textContent = g.pie;
        visor.showModal();
      });
    });
    visor.addEventListener('click', (e) => { if (e.target === visor) visor.close(); });
  }

  /* ---------------- Carrito ---------------- */

  let carrito = [];

  function leerCarrito() {
    try {
      const guardado = JSON.parse(localStorage.getItem(LLAVE) || '[]');
      carrito = guardado.filter((l) => pieza(l.id) && pieza(l.id).medidas[l.medida]);
    } catch (e) { carrito = []; }
  }

  function guardarCarrito() {
    try { localStorage.setItem(LLAVE, JSON.stringify(carrito)); } catch (e) { /* modo privado */ }
  }

  function anadir(id, medida) {
    const linea = carrito.find((l) => l.id === id && l.medida === medida);
    if (linea) linea.cantidad++;
    else carrito.push({ id: id, medida: medida, cantidad: 1 });
    guardarCarrito();
    pintarCarrito();
    const art = pieza(id);
    avisar(art.nombre + ' · añadida al pedido');
  }

  function total() {
    return carrito.reduce((suma, l) => {
      const art = pieza(l.id);
      return suma + art.medidas[l.medida].precio * l.cantidad;
    }, 0);
  }

  function unidades() {
    return carrito.reduce((n, l) => n + l.cantidad, 0);
  }

  function pintarCarrito() {
    const lista = $('#lista-carrito');
    const boton = $('#boton-carrito');
    const n = unidades();

    boton.dataset.vacio = n ? 'no' : 'si';
    $('#cuenta-carrito').textContent = n;
    boton.setAttribute('aria-label', n ? 'Ver el pedido, ' + n + ' artículos' : 'Ver el pedido, vacío');

    if (!carrito.length) {
      lista.innerHTML = '<p class="carrito-vacio">Todavía no has puesto nada. ' +
        'Ve al catálogo y pulsa «Añadir al pedido»; aquí se junta todo y se manda de una vez por WhatsApp.</p>';
    } else {
      lista.innerHTML = carrito.map((l, i) => {
        const art = pieza(l.id);
        const m = art.medidas[l.medida];
        return '<div class="linea-carrito">' +
          '<img src="' + esc(art.foto) + '" alt="">' +
          '<div>' +
            '<h3>' + esc(art.nombre) + '</h3>' +
            '<p class="medida">' + esc(m.etiqueta) + ' · ' + euros(m.precio) + ' la unidad</p>' +
            '<div class="fila">' +
              '<span class="contador">' +
                '<button type="button" data-menos="' + i + '" aria-label="Quitar una">−</button>' +
                '<span>' + l.cantidad + '</span>' +
                '<button type="button" data-mas="' + i + '" aria-label="Añadir una">+</button>' +
              '</span>' +
              '<span class="importe">' + euros(m.precio * l.cantidad) + '</span>' +
            '</div>' +
            '<button type="button" class="quitar" data-fuera="' + i + '">Quitar</button>' +
          '</div>' +
        '</div>';
      }).join('');

      $$('[data-mas]', lista).forEach((b) => b.addEventListener('click', () => {
        carrito[Number(b.dataset.mas)].cantidad++;
        guardarCarrito(); pintarCarrito();
      }));
      $$('[data-menos]', lista).forEach((b) => b.addEventListener('click', () => {
        const l = carrito[Number(b.dataset.menos)];
        l.cantidad--;
        if (l.cantidad < 1) carrito.splice(Number(b.dataset.menos), 1);
        guardarCarrito(); pintarCarrito();
      }));
      $$('[data-fuera]', lista).forEach((b) => b.addEventListener('click', () => {
        carrito.splice(Number(b.dataset.fuera), 1);
        guardarCarrito(); pintarCarrito();
      }));
    }

    $('#total-carrito').textContent = euros(total());
    $('#enviar-pedido').disabled = !carrito.length;
  }

  function textoPedido() {
    const lineas = carrito.map((l) => {
      const art = pieza(l.id);
      const m = art.medidas[l.medida];
      return '• ' + art.nombre + ' (' + m.etiqueta + ') × ' + l.cantidad +
        ' — ' + euros(m.precio * l.cantidad);
    });
    const notas = ($('#notas-pedido').value || '').trim();
    return [
      C.saludoPedido || 'Hola, quiero encargar esto:',
      '',
      lineas.join('\n'),
      '',
      'Total orientativo: ' + euros(total()),
      notas ? '\nNotas: ' + notas : '',
      '\n(Pedido hecho desde la web)'
    ].join('\n');
  }

  /* ---------------- Encargo a medida ---------------- */

  function prepararFormulario() {
    const f = $('#form-medida');
    if (!f) return;
    f.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const d = new FormData(f);
      const texto = [
        (C.saludoSuelto || 'Hola') + ' Quiero pedir un presupuesto:',
        '',
        'Qué quiero: ' + (d.get('que') || '—'),
        'Medidas: ' + (d.get('medidas') || '—'),
        'Base: ' + (d.get('base') || 'me da igual, aconsejadme'),
        'Para cuándo: ' + (d.get('cuando') || '—'),
        'Pueblo: ' + (d.get('pueblo') || '—'),
        (d.get('mas') ? '\nMás cosas: ' + d.get('mas') : '')
      ].join('\n');
      window.open(enlaceWa(texto), '_blank', 'noopener');
    });
  }

  /* ---------------- Avisos ---------------- */

  let relojAviso;
  function avisar(texto) {
    const a = $('#aviso');
    a.textContent = texto;
    a.classList.add('puesto');
    clearTimeout(relojAviso);
    relojAviso = setTimeout(() => a.classList.remove('puesto'), 2600);
  }

  /* ---------------- Scroll: cabecera y textos de la escena ---------------- */

  function prepararScroll() {
    const cabecera = $('.cabecera');
    const escena = $('#escena');
    const pistas = $$('.pista');
    const ventanas = [[0.10, 0.37], [0.41, 0.67], [0.71, 0.99]];
    let pedido = false;

    function mirar() {
      pedido = false;
      cabecera.classList.toggle('pegado', scrollY > 40);
      if (!escena) return;
      const caja = escena.getBoundingClientRect();
      const recorrido = escena.offsetHeight - innerHeight;
      const p = recorrido > 0 ? Math.min(1, Math.max(0, -caja.top / recorrido)) : 0;
      document.body.classList.toggle('escena-rodando', p > 0.06);
      pistas.forEach((el, i) => {
        const v = ventanas[i];
        el.classList.toggle('puesta', v && p >= v[0] && p <= v[1]);
      });
    }

    addEventListener('scroll', () => {
      if (!pedido) { pedido = true; requestAnimationFrame(mirar); }
    }, { passive: true });
    addEventListener('resize', mirar);
    mirar();
  }

  /* ---------------- Arranque ---------------- */

  rellenarDatos();
  pintarCatalogo();
  pintarGaleria();
  leerCarrito();
  pintarCarrito();
  prepararFormulario();
  prepararScroll();

  const cajon = $('#carrito');
  $('#boton-carrito').addEventListener('click', () => cajon.showModal());
  $('#cerrar-carrito').addEventListener('click', () => cajon.close());
  cajon.addEventListener('click', (e) => { if (e.target === cajon) cajon.close(); });
  $('#enviar-pedido').addEventListener('click', () => {
    if (!carrito.length) return;
    window.open(enlaceWa(textoPedido()), '_blank', 'noopener');
  });
  $('#vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    guardarCarrito();
    pintarCarrito();
    avisar('Pedido vaciado');
  });

  // si el 3D no arranca (móvil viejo, WebGL apagado), no se queda colgado nada
  setTimeout(() => {
    if (!document.documentElement.classList.contains('tiene-3d')) {
      document.body.classList.add('sin-webgl');
    }
  }, 2500);
})();
