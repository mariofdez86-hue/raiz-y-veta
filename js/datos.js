/* ============================================================
   EL CATÁLOGO
   ============================================================
   Cada pieza es un bloque entre { }. Para añadir una, copia un
   bloque entero, pégalo debajo y cámbiale los datos. Ojo con
   dejar la coma al final de cada bloque.

   tipo:     'mesa' o 'objeto'  (manda a qué apartado va)
   foto:     nombre del archivo dentro de la carpeta img/
   medidas:  una o varias; cada medida puede tener su precio
   precios:  en euros, sin símbolo.

   >>> LOS PRECIOS DE AHORA SON UN EJEMPLO. PON LOS TUYOS. <<<
   ============================================================ */

window.ARTICULOS = [

  {
    id: 'mesa-pieza-unica',
    tipo: 'mesa',
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
    tipo: 'mesa',
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
    id: 'mesa-centro-tronco',
    tipo: 'mesa',
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
    tipo: 'mesa',
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

  /* ---------------------------------------------------------
     DE AQUÍ PARA ABAJO SON DE EJEMPLO, CON FOTO PROVISIONAL.
     Cámbialas por lo pequeño que hagáis de verdad, o borra
     el bloque entero si no hacéis nada de esto.
     --------------------------------------------------------- */

  {
    id: 'tabla-cortar',
    tipo: 'objeto',
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
    tipo: 'objeto',
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
    tipo: 'objeto',
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
    tipo: 'objeto',
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
  { foto: 'img/mesa-comedor-hierro.jpg', pie: 'Canto vivo sobre estructura de hierro negro' },
  { foto: 'img/mesa-centro-tronco.jpg', pie: 'Cepa entera con el hueco relleno de resina' },
  { foto: 'img/taburete-rodaja.jpg', pie: 'Rodaja de tronco con patas de hierro' }
];
