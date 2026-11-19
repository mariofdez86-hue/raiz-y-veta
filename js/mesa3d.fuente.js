/* =========================================================
   La mesa que gira con el scroll.
   Está hecha por código (no hay archivo 3D que descargar):
   tablero, caballetes, travesaño y un cuenco encima.
   La veta de la madera se dibuja en un lienzo al cargar.
   ========================================================= */

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const seccion = document.getElementById('escena');
const lienzo = document.getElementById('lienzo');
if (!seccion || !lienzo) throw new Error('No hay escena');

const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Veta de madera dibujada a mano alzada ---------- */

function semillaFija(n) {
  let s = n;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

function texturaMadera({ claro, oscuro, semilla, girada = false }) {
  const lado = 1024;
  const c = document.createElement('canvas');
  c.width = c.height = lado;
  const g = c.getContext('2d');
  const r = semillaFija(semilla);

  const fondo = g.createLinearGradient(0, 0, lado, lado);
  fondo.addColorStop(0, claro);
  fondo.addColorStop(0.5, oscuro);
  fondo.addColorStop(1, claro);
  g.fillStyle = fondo;
  g.fillRect(0, 0, lado, lado);

  // vetas: líneas largas con ondulación
  for (let i = 0; i < 165; i++) {
    const y = r() * lado;
    const amp = 8 + r() * 52;
    const grosor = 0.9 + r() * 5.2;
    g.strokeStyle = r() > 0.8 ? 'rgba(255,235,200,0.07)' : 'rgba(26,13,6,0.2)';
    g.lineWidth = grosor;
    g.beginPath();
    g.moveTo(-20, y);
    g.bezierCurveTo(lado * 0.3, y - amp, lado * 0.6, y + amp, lado + 20, y - amp * 0.3);
    g.stroke();
  }

  // un par de nudos
  for (let n = 0; n < 2; n++) {
    const cx = lado * (0.2 + r() * 0.6);
    const cy = lado * (0.2 + r() * 0.6);
    for (let k = 10; k > 0; k--) {
      g.strokeStyle = `rgba(28,15,7,${0.03 + k * 0.016})`;
      g.lineWidth = 1.8;
      g.beginPath();
      g.ellipse(cx, cy, k * 7, k * 3.4, (r() - 0.5) * 0.8, 0, Math.PI * 2);
      g.stroke();
    }
  }

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (girada) { t.center.set(0.5, 0.5); t.rotation = Math.PI / 2; }
  t.anisotropy = 4;
  return t;
}

/* ---------- Escena ---------- */

let render;
try {
  render = new THREE.WebGLRenderer({ canvas: lienzo, antialias: true, alpha: true });
} catch (e) {
  throw new Error('Sin WebGL');
}
render.setPixelRatio(Math.min(devicePixelRatio, 2));
render.shadowMap.enabled = true;
render.shadowMap.type = THREE.PCFSoftShadowMap;
render.toneMapping = THREE.ACESFilmicToneMapping;
render.toneMappingExposure = 0.98;

const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

const pmrem = new THREE.PMREMGenerator(render);
escena.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;

const texRoble = texturaMadera({ claro: '#9b6835', oscuro: '#67401d', semilla: 7 });
const texRoblePata = texturaMadera({ claro: '#8c5d2e', oscuro: '#573517', semilla: 23, girada: true });
const texNogal = texturaMadera({ claro: '#8d5c31', oscuro: '#5a3519', semilla: 41 });

function maderaMat(tex, rug = 0.62) {
  return new THREE.MeshStandardMaterial({
    map: tex,
    roughnessMap: tex,
    roughness: rug,
    metalness: 0,
    envMapIntensity: 0.3
  });
}

const matTablero = maderaMat(texRoble, 0.74);
const matPata = maderaMat(texRoblePata, 0.8);
const matCuenco = maderaMat(texNogal, 0.88);

const mesa = new THREE.Group();

function pieza(mat, ancho, alto, fondo, radio, x, y, z) {
  const m = new THREE.Mesh(new RoundedBoxGeometry(ancho, alto, fondo, 3, radio), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  mesa.add(m);
  return m;
}

// El tablero: un solo tablón con el canto vivo, no un rectángulo de fábrica.
// Los dos bordes largos se dibujan con ondas distintas, como salió del árbol.
function tableroCantoVivo() {
  const largo = 2.72, ancho = 1.2, pasos = 48;
  const onda = (x, fase, amp) =>
    Math.sin(x * 2.0 + fase) * amp +
    Math.sin(x * 5.1 + fase * 2.3) * amp * 0.42 +
    Math.sin(x * 9.7 + fase) * amp * 0.16;

  const perfil = new THREE.Shape();
  perfil.moveTo(-largo / 2, -ancho / 2 + onda(-largo / 2, 0.6, 0.062));
  for (let i = 1; i <= pasos; i++) {
    const x = -largo / 2 + (largo * i) / pasos;
    perfil.lineTo(x, -ancho / 2 + onda(x, 0.6, 0.062));
  }
  perfil.lineTo(largo / 2, ancho / 2 + onda(largo / 2, 3.3, 0.07));
  for (let i = pasos - 1; i >= 0; i--) {
    const x = -largo / 2 + (largo * i) / pasos;
    perfil.lineTo(x, ancho / 2 + onda(x, 3.3, 0.07));
  }
  perfil.closePath();

  const geo = new THREE.ExtrudeGeometry(perfil, {
    depth: 0.062, steps: 1,
    bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 2
  });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, 0.758, 0);
  return geo;
}

texRoble.repeat.set(0.37, 0.85);
texRoble.offset.set(0.5, 0.5);

const tablero = new THREE.Mesh(tableroCantoVivo(), matTablero);
tablero.castShadow = true;
tablero.receiveShadow = true;
mesa.add(tablero);

// La base: dos marcos de hierro negro, como los que hacéis
const matHierro = new THREE.MeshStandardMaterial({
  color: 0x17181a, roughness: 0.42, metalness: 0.85, envMapIntensity: 1
});

for (const lado of [-1, 1]) {
  const x = lado * 0.92;
  for (const z of [-0.37, 0.37]) {
    pieza(matHierro, 0.07, 0.72, 0.07, 0.008, x, 0.39, z);    // montantes
  }
  pieza(matHierro, 0.07, 0.07, 0.81, 0.008, x, 0.72, 0);       // travesaño de arriba
  pieza(matHierro, 0.075, 0.055, 0.86, 0.008, x, 0.028, 0);    // zapata del suelo
}

// un cuenco torneado encima, para que se vea que no solo hay mesas
const perfil = [];
for (let i = 0; i <= 14; i++) {
  const t = i / 14;
  const radio = 0.015 + Math.sin(t * Math.PI * 0.52) * 0.145;
  perfil.push(new THREE.Vector2(radio, t * 0.11));
}
perfil.push(new THREE.Vector2(0.142, 0.113));
for (let i = 14; i >= 0; i--) {
  const t = i / 14;
  const radio = Math.max(0.004, (0.015 + Math.sin(t * Math.PI * 0.52) * 0.145) - 0.016);
  perfil.push(new THREE.Vector2(radio, 0.022 + t * 0.09));
}
const cuenco = new THREE.Mesh(new THREE.LatheGeometry(perfil, 48), matCuenco);
cuenco.position.set(0.58, 0.818, -0.08);
cuenco.castShadow = true;
cuenco.receiveShadow = true;
mesa.add(cuenco);

escena.add(mesa);

// suelo que solo recoge la sombra
const suelo = new THREE.Mesh(
  new THREE.CircleGeometry(7, 48),
  new THREE.ShadowMaterial({ opacity: 0.45 })
);
suelo.rotation.x = -Math.PI / 2;
suelo.receiveShadow = true;
escena.add(suelo);

/* ---------- Luces: el flexo del taller ---------- */

escena.add(new THREE.AmbientLight(0x4a3524, 1.1));

const flexo = new THREE.SpotLight(0xffc98a, 72, 14, 0.62, 0.85, 1.6);
flexo.position.set(0.5, 4.4, 1.1);
flexo.castShadow = true;
flexo.shadow.mapSize.set(1024, 1024);
flexo.shadow.camera.near = 1;
flexo.shadow.camera.far = 12;
flexo.shadow.bias = -0.0012;
escena.add(flexo);

const relleno = new THREE.DirectionalLight(0xbcd2e8, 0.75);
relleno.position.set(-3.4, 2.2, -2.6);
escena.add(relleno);

/* ---------- Encaje en la ventana ---------- */

function medir() {
  const an = seccion.clientWidth;
  const al = Math.max(seccion.querySelector('.escena-fija').clientHeight, 320);
  render.setSize(an, al, false);
  camara.aspect = an / al;
  camara.updateProjectionMatrix();
}

function colocarCamara(p) {
  // en vertical (móvil) hay que echarse atrás para que la mesa entera quepa
  const vertical = camara.aspect < 1;
  const estrecho = vertical ? 2.45 : camara.aspect < 1.4 ? 1.22 : 1;
  const dist = (4.45 - Math.sin(p * Math.PI) * 0.95) * estrecho;
  const alto = (0.92 + p * 1.55) * (vertical ? 1.6 : 1);
  camara.position.set(Math.sin(p * Math.PI * 2) * 0.22, alto, dist);
  camara.lookAt(0, vertical ? 0.1 : 0.6, 0);
  mesa.rotation.y = -0.55 + p * Math.PI * 2.1;
  mesa.rotation.z = Math.sin(p * Math.PI) * 0.012;
}

function cuantoScroll() {
  const caja = seccion.getBoundingClientRect();
  const recorrido = seccion.offsetHeight - innerHeight;
  if (recorrido <= 0) return 0;
  return Math.min(1, Math.max(0, -caja.top / recorrido));
}

let aLaVista = true;
let pintar = true;

function bucle() {
  requestAnimationFrame(bucle);
  if (!aLaVista || !pintar) return;
  colocarCamara(quieto ? 0.22 : cuantoScroll());
  render.render(escena, camara);
  if (quieto) pintar = false;   // una sola pasada y en paz
}

new IntersectionObserver((e) => { aLaVista = e[0].isIntersecting; pintar = true; })
  .observe(seccion);

addEventListener('resize', () => { medir(); pintar = true; });
addEventListener('scroll', () => { pintar = true; }, { passive: true });

medir();
colocarCamara(0);
render.render(escena, camara);
document.documentElement.classList.add('tiene-3d');
bucle();
