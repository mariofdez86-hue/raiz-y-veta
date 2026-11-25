/* ============================================================
   EL CATÁLOGO
   ============================================================
   Hay dos listas: las CATEGORÍAS (los apartados del catálogo,
   en el orden en que salen) y los ARTÍCULOS (las piezas).

   Cada pieza lleva "categoria:" con el id de su apartado. Si
   una categoría se queda sin piezas, no sale en la web.

   Para añadir una pieza: copia un bloque entero entre { },
   pégalo debajo y cámbiale los datos. Ojo con dejar la coma
   al final de cada bloque.

   >>> LOS PRECIOS SON DE EJEMPLO. PON LOS TUYOS. <<<
   ============================================================ */

window.CATEGORIAS = [
  {
    id: 'mesas',
    titulo: 'Mesas',
    nota: 'Los precios son orientativos y llevan el acabado puesto. El final depende del tablón que haya y de las medidas; se habla por WhatsApp antes de empezar nada.'
  },
  {
    id: 'asientos',
    titulo: 'Sofás y mecedoras',
    nota: 'La madera la hacemos nosotros; la tapicería se elige con el cliente, tela y color. Los cojines salen y se lavan.'
  },
  {
    id: 'dormitorio',
    titulo: 'Dormitorio',
    nota: 'Cabeceros de pared entera y mesitas a juego, hechos a la medida del hueco y del colchón que tengas.'
  },
  {
    id: 'objetos',
    titulo: 'Objetos de madera',
    nota: 'Lo pequeño sale del recorte de las mesas: tablas, fuentes, cuencos. Se puede llevar en mano el mismo día.'
  }
];

window.ARTICULOS = [

  /* ---------------------------- MESAS ---------------------------- */

  {
    id: 'mesa-pieza-unica',
    categoria: 'mesas',
    nombre: 'Mesa de comedor de una sola pieza',
    madera: 'Tablón macizo',
    grosor: '60 mm',
    acabado: 'Aceite natural',
    texto: 'El tablero no está pegado de listones: es un solo tablón, con su canto vivo. Base de madera maciza en cruz, que deja los extremos libres para sentar a más gente.',
    foto: 'img/mesa-comedor-pieza-unica.jpg',
    medidas: [
      { etiqueta: '240 × 110 cm', precio: 2400 },
      { etiqueta: '280 × 115 cm', precio: 2900 },
      { etiqueta: '300 × 120 cm', precio: 3300 }
    ]
  },

  {
    id: 'mesa-base-hierro',
    categoria: 'mesas',
    nombre: 'Mesa de comedor con base de hierro',
    madera: 'Tablón macizo y hierro',
    grosor: '55 mm',
    acabado: 'Aceite natural, hierro en negro mate',
    texto: 'El mismo tablón de canto vivo, esta vez sobre una estructura de hierro negro hecha a medida. Pesa menos a la vista y deja todo el hueco para las sillas.',
    foto: 'img/mesa-comedor-hierro.jpg',
    medidas: [
      { etiqueta: '200 × 100 cm', precio: 1950 },
      { etiqueta: '240 × 110 cm', precio: 2300 }
    ]
  },

  {
    id: 'mesa-centro-canto-vivo',
    categoria: 'mesas',
    nombre: 'Mesa de centro de canto vivo',
    madera: 'Tablón macizo y hierro',
    grosor: '50 mm',
    acabado: 'Aceite natural, hierro en negro mate',
    texto: 'Una rodaja ancha del tronco, con el corazón y los anillos a la vista, sobre un pie de hierro en U que la deja como flotando. Baja, para delante del sofá.',
    foto: 'img/mesa-centro-canto-vivo.jpg',
    medidas: [
      { etiqueta: '120 × 85 cm', precio: 760 },
      { etiqueta: '140 × 90 cm', precio: 880 }
    ]
  },

  {
    id: 'mesa-centro-tronco',
    categoria: 'mesas',
    nombre: 'Mesa de centro de tronco',
    madera: 'Cepa entera',
    grosor: 'Pieza maciza',
    acabado: 'Resina transparente y aceite',
    texto: 'De una cepa entera, vaciada y pulida por dentro y por fuera. El hueco va relleno de resina transparente, que lo deja sano y se puede limpiar.',
    foto: 'img/mesa-centro-tronco.jpg',
    medidas: [
      { etiqueta: 'Pieza única, 110 × 80 cm', precio: 980 }
    ]
  },

  {
    id: 'taburete-rodaja',
    categoria: 'mesas',
    nombre: 'Taburete de rodaja',
    madera: 'Rodaja de tronco y hierro',
    grosor: '70 mm',
    acabado: 'Aceite natural',
    texto: 'Una rodaja entera sobre patas de hierro negro. Sirve de taburete, de mesa auxiliar junto al sofá o para dejar la planta.',
    foto: 'img/taburete-rodaja.jpg',
    medidas: [
      { etiqueta: 'Ø 40 × 50 cm', precio: 180 },
      { etiqueta: 'Ø 50 × 50 cm', precio: 230 }
    ]
  },

  /* -------------------------- ASIENTOS --------------------------- */

  {
    id: 'sofa-plataforma',
    categoria: 'asientos',
    nombre: 'Sofá de plataforma',
    madera: 'Madera maciza',
    grosor: 'Tarima de listones',
    acabado: 'Aceite natural',
    texto: 'La tarima vuela por los lados y hace de mesilla: ahí se deja el café sin necesidad de otro mueble. Los cojines son sueltos, con funda que sale para lavar.',
    foto: 'img/sofa-plataforma.jpg',
    medidas: [
      { etiqueta: '240 × 90 cm, tres plazas', precio: 1450 },
      { etiqueta: '300 × 90 cm, cuatro plazas', precio: 1790 }
    ]
  },

  {
    id: 'mecedora',
    categoria: 'asientos',
    nombre: 'Mecedora de patines',
    madera: 'Madera maciza',
    grosor: 'Patines de 70 mm',
    acabado: 'Aceite natural',
    texto: 'Patines anchos y macizos, respaldo de barrotes torneados y cojines sueltos. Se mece sin saltos y no muerde el suelo.',
    foto: 'img/mecedora.jpg',
    medidas: [
      { etiqueta: '75 × 95 × 90 cm', precio: 520 }
    ]
  },

  /* ------------------------- DORMITORIO -------------------------- */

  {
    id: 'cabecero-mesitas',
    categoria: 'dormitorio',
    nombre: 'Cabecero de pared con mesitas',
    madera: 'Tablas macizas',
    grosor: '30 mm',
    acabado: 'Aceite natural',
    texto: 'El cabecero coge la pared de lado a lado y las mesitas van colgadas de él, sin patas, así que debajo se barre de una pasada. Se hace a la medida de tu hueco.',
    foto: 'img/cabecero.jpg',
    medidas: [
      { etiqueta: 'Hasta 220 cm de pared', precio: 890 },
      { etiqueta: 'Hasta 300 cm de pared', precio: 1180 }
    ]
  },

  /* ---------------------------------------------------------------
     DE AQUÍ PARA ABAJO SON DE EJEMPLO, CON DIBUJO PROVISIONAL.
     Cámbialas por lo pequeño que hagáis de verdad, o borra el
     bloque entero si no hacéis nada de esto.
     --------------------------------------------------------------- */

  {
    id: 'tabla-cortar',
    categoria: 'objetos',
    nombre: 'Tabla de cortar',
    madera: 'Recorte del mismo tablón',
    grosor: '30 mm',
    acabado: 'Aceite de uso alimentario',
    texto: 'Sale del recorte de las mesas, así que lleva la misma veta. Con un rebaje para colgarla.',
    foto: 'img/tabla-olivo.svg',
    medidas: [
      { etiqueta: '40 × 24 cm', precio: 38 }
    ]
  },

  {
    id: 'cuenco-torneado',
    categoria: 'objetos',
    nombre: 'Cuenco torneado',
    madera: 'Maciza',
    grosor: '',
    acabado: 'Cera de abeja',
    texto: 'Al torno, de una sola pieza y de pared fina. Para fruta o para dejar las llaves.',
    foto: 'img/cuenco.svg',
    medidas: [
      { etiqueta: 'Ø 22 cm', precio: 46 },
      { etiqueta: 'Ø 28 cm', precio: 62 }
    ]
  },

  {
    id: 'banco-recibidor',
    categoria: 'objetos',
    nombre: 'Banco de recibidor',
    madera: 'Tablón macizo y hierro',
    grosor: '40 mm',
    acabado: 'Aceite natural',
    texto: 'Mismo canto vivo que las mesas, en pequeño, para calzarse en la entrada.',
    foto: 'img/banco.svg',
    medidas: [
      { etiqueta: '100 × 35 × 45 cm', precio: 310 },
      { etiqueta: '140 × 35 × 45 cm', precio: 390 }
    ]
  },

  {
    id: 'estante-pared',
    categoria: 'objetos',
    nombre: 'Estante de pared',
    madera: 'Tablón macizo',
    grosor: '30 mm',
    acabado: 'Aceite mate',
    texto: 'Con escuadras de hierro a la vista. Va con los tacos y los tornillos puestos.',
    foto: 'img/estante.svg',
    medidas: [
      { etiqueta: '80 × 22 cm', precio: 72 },
      { etiqueta: '120 × 22 cm', precio: 95 }
    ]
  }

];

/* ---- Las fotos de los trabajos que salen en la galería ---- */
window.GALERIA = [
  { foto: 'img/mesa-comedor-pieza-unica.jpg', pie: 'Tablón de una pieza para diez, con base de madera en cruz' },
  { foto: 'img/salon-conjunto.jpg', pie: 'Salón entero: sofá de plataforma, mecedora y mesa de centro' },
  { foto: 'img/mesa-comedor-hierro.jpg', pie: 'Canto vivo sobre estructura de hierro negro' },
  { foto: 'img/cabecero.jpg', pie: 'Cabecero de pared con las mesitas colgadas' },
  { foto: 'img/mesa-centro-tronco.jpg', pie: 'Cepa entera con el hueco relleno de resina' },
  { foto: 'img/taburete-rodaja.jpg', pie: 'Rodaja de tronco con patas de hierro' }
];
