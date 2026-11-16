// =====================================================================
// cubo.js — «El cubo de los seis pasos» (nivel 5)
// Un cubo 3D hecho con CSS: cada cara es un panel del equipo.
// - Inicio: las 6 caras llegan volando, se ensamblan y el cubo gira.
// - Toda la página: queda pequeño en un costado y gira al capítulo en curso.
// - Entre capítulos: crece al centro y gira 90° hasta la cara siguiente.
// - Conclusiones: vista explotada, las caras se separan y forman una fila.
// Cada cara se coloca con una matriz 4×4 (transform: matrix3d) calculada aquí.
// =====================================================================
const cubo = {
  capa: null,          // capa fija que contiene el cubo
  posicion: null,      // elemento que se ubica en la pantalla
  contenedor: null,    // elemento con perspectiva
  caras: [],           // los 6 botones-cara
  ranuras: [],         // dónde va cada cara (frente, derecha, arriba…)
  correcciones: [],    // giro en su plano para que cada panel se vea derecho
  orientaciones: [],   // orientación del cubo en cada capítulo
  giros: [],           // giro de 90° entre un capítulo y el siguiente
  LADO: 200            // tamaño base de una cara en píxeles
};

// Orden de las caras: capítulo 1 al frente, 2 a la derecha, 3 arriba, 4 a la izquierda, 5 abajo, 6 atrás.
// Así cada cambio de capítulo es un giro de 90° hacia una cara vecina.
const RECORRIDO_CARAS = ["frente", "derecha", "arriba", "izquierda", "abajo", "atras"];

// Desde dónde llega volando cada cara en el Inicio (x, y, z)
const DIRECCIONES_VUELO = [[-1, -0.3, 0], [1, -0.4, 0], [0, -1, 0.3], [-1, 0.5, 0], [0, 1, 0.2], [1, 0.6, -0.5]];

// ---------- Matemática 3D (matrices 4×4 guardadas por columnas, como las lee CSS) ----------

// Matriz que no cambia nada
function identidad() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

// Multiplica dos matrices: primero se aplica b y luego a
function multiplicar(a, b) {
  const r = new Array(16);
  for (let c = 0; c < 4; c++) {
    for (let f = 0; f < 4; f++) {
      let suma = 0;
      for (let k = 0; k < 4; k++) suma += a[k * 4 + f] * b[c * 4 + k];
      r[c * 4 + f] = suma;
    }
  }
  return r;
}

// Convierte grados a radianes
function radianes(grados) {
  return grados * Math.PI / 180;
}

// Giro alrededor del eje X (como rotateX de CSS)
function rotarX(grados) {
  const c = Math.cos(radianes(grados)), s = Math.sin(radianes(grados));
  return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
}

// Giro alrededor del eje Y (como rotateY de CSS)
function rotarY(grados) {
  const c = Math.cos(radianes(grados)), s = Math.sin(radianes(grados));
  return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
}

// Giro en el plano de la pantalla (como rotateZ de CSS)
function rotarZ(grados) {
  const c = Math.cos(radianes(grados)), s = Math.sin(radianes(grados));
  return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

// Desplazamiento en x, y, z (en píxeles)
function trasladar(x, y, z) {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
}

// Cambio de tamaño igual en los tres ejes
function escalar(s) {
  return [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 1];
}

// Aplica solo la parte de giro de una matriz a un vector (sirve para saber hacia dónde mira una cara)
function aplicarGiro(m, v) {
  return [
    m[0] * v[0] + m[4] * v[1] + m[8] * v[2],
    m[1] * v[0] + m[5] * v[1] + m[9] * v[2],
    m[2] * v[0] + m[6] * v[1] + m[10] * v[2]
  ];
}

// Escribe la matriz como texto para CSS: matrix3d(...)
function matrizACSS(m) {
  return "matrix3d(" + m.map(n => (Math.abs(n) < 1e-9 ? 0 : n).toFixed(6)).join(",") + ")";
}

// Convierte la parte de giro de una matriz en un cuaternión (sirve para interpolar giros sin deformar)
function matrizACuaternion(m) {
  const m00 = m[0], m01 = m[4], m02 = m[8];
  const m10 = m[1], m11 = m[5], m12 = m[9];
  const m20 = m[2], m21 = m[6], m22 = m[10];
  const traza = m00 + m11 + m22;
  let x, y, z, w, s;
  if (traza > 0) {
    s = Math.sqrt(traza + 1) * 2;
    w = 0.25 * s; x = (m21 - m12) / s; y = (m02 - m20) / s; z = (m10 - m01) / s;
  } else if (m00 > m11 && m00 > m22) {
    s = Math.sqrt(1 + m00 - m11 - m22) * 2;
    w = (m21 - m12) / s; x = 0.25 * s; y = (m01 + m10) / s; z = (m02 + m20) / s;
  } else if (m11 > m22) {
    s = Math.sqrt(1 + m11 - m00 - m22) * 2;
    w = (m02 - m20) / s; x = (m01 + m10) / s; y = 0.25 * s; z = (m12 + m21) / s;
  } else {
    s = Math.sqrt(1 + m22 - m00 - m11) * 2;
    w = (m10 - m01) / s; x = (m02 + m20) / s; y = (m12 + m21) / s; z = 0.25 * s;
  }
  return [x, y, z, w];
}

// Convierte un cuaternión de vuelta en matriz de giro
function cuaternionAMatriz(q) {
  const [x, y, z, w] = q;
  return [
    1 - 2 * (y * y + z * z), 2 * (x * y + z * w), 2 * (x * z - y * w), 0,
    2 * (x * y - z * w), 1 - 2 * (x * x + z * z), 2 * (y * z + x * w), 0,
    2 * (x * z + y * w), 2 * (y * z - x * w), 1 - 2 * (x * x + y * y), 0,
    0, 0, 0, 1
  ];
}

// Interpola dos giros por el camino más corto (slerp)
function interpolarCuaterniones(a, b, t) {
  let producto = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  let destino = b;
  if (producto < 0) { producto = -producto; destino = b.map(v => -v); }
  if (producto > 0.9995) {
    const r = a.map((v, i) => v + (destino[i] - v) * t);
    const largo = Math.hypot(r[0], r[1], r[2], r[3]);
    return r.map(v => v / largo);
  }
  const angulo = Math.acos(producto);
  const seno = Math.sin(angulo);
  const pa = Math.sin((1 - t) * angulo) / seno;
  const pb = Math.sin(t * angulo) / seno;
  return a.map((v, i) => pa * v + pb * destino[i]);
}

// Separa una matriz en tamaño, giro y posición
function descomponer(m) {
  const tam = Math.hypot(m[0], m[1], m[2]);
  const giro = m.slice();
  for (let i = 0; i < 12; i++) if (i % 4 !== 3) giro[i] = m[i] / tam;
  return { tam, giro: matrizACuaternion(giro), pos: [m[12], m[13], m[14]] };
}

// Mezcla dos matrices sin deformar la cara (posición, giro y tamaño por separado)
function interpolarMatrices(a, b, t) {
  const da = descomponer(a), db = descomponer(b);
  const giro = cuaternionAMatriz(interpolarCuaterniones(da.giro, db.giro, t));
  const tam = mezclar(da.tam, db.tam, t);
  const pos = da.pos.map((v, i) => mezclar(v, db.pos[i], t));
  return multiplicar(trasladar(pos[0], pos[1], pos[2]), multiplicar(escalar(tam), giro));
}

// Mezcla solo los giros de dos matrices
function interpolarGiro(a, b, t) {
  if (t <= 0) return a;
  if (t >= 1) return b;
  return cuaternionAMatriz(interpolarCuaterniones(matrizACuaternion(a), matrizACuaternion(b), t));
}

// ---------- Preparación ----------

// Matriz que lleva una cara a su ranura del cubo
function colocacionDeRanura(nombre) {
  if (nombre === "derecha") return rotarY(90);
  if (nombre === "atras") return rotarY(180);
  if (nombre === "izquierda") return rotarY(-90);
  if (nombre === "arriba") return rotarX(90);
  if (nombre === "abajo") return rotarX(-90);
  return identidad();
}

// Calcula la orientación del cubo en cada capítulo y el giro de 90° entre capítulos
function calcularOrientaciones() {
  cubo.ranuras = RECORRIDO_CARAS.map(colocacionDeRanura);
  cubo.orientaciones = [identidad()];
  cubo.giros = [];
  const candidatos = [["x", 90], ["x", -90], ["y", 90], ["y", -90]];
  for (let k = 0; k < 5; k++) {
    const actual = cubo.orientaciones[k];
    const normalSiguiente = aplicarGiro(cubo.ranuras[k + 1], [0, 0, 1]);
    for (const [eje, angulo] of candidatos) {
      const giro = eje === "x" ? rotarX(angulo) : rotarY(angulo);
      const mira = aplicarGiro(multiplicar(giro, actual), normalSiguiente);
      if (mira[2] > 0.99) {   // la cara siguiente queda mirando al usuario
        cubo.giros.push({ eje, angulo });
        cubo.orientaciones.push(multiplicar(giro, actual));
        break;
      }
    }
  }
  // Giro en su plano para que cada panel aparezca derecho cuando le toca
  cubo.correcciones = cubo.ranuras.map((ranura, c) => {
    const vista = multiplicar(cubo.orientaciones[c], ranura);
    const arriba = aplicarGiro(vista, [0, -1, 0]);
    const angulo = Math.atan2(arriba[0], -arriba[1]) * 180 / Math.PI;
    return -Math.round(angulo / 90) * 90;
  });
}

// Crea las 6 caras del cubo dentro de la capa fija
function prepararCubo() {
  cubo.capa = document.getElementById("capa-cubo");
  if (!cubo.capa) return;
  cubo.posicion = cubo.capa.querySelector(".cubo-posicion");
  cubo.contenedor = cubo.capa.querySelector(".cubo");
  calcularOrientaciones();
  cubo.caras = capitulos.map((cap, c) => {
    const cara = document.createElement("button");
    cara.type = "button";
    cara.className = "cara";
    cara.tabIndex = -1;   // el índice ya permite llegar con teclado; el cubo es un atajo visual
    cara.style.setProperty("--color", "var(--c" + cap.numero + ")");
    cara.style.setProperty("--tinta-cap", "var(--t" + cap.numero + ")");
    cara.title = "Ir al capítulo " + cap.numero + ": " + cap.titulo;
    cara.innerHTML =
      '<img src="' + rutaImagen("panel-" + cap.panel + ".jpg") + '" alt="" style="object-position:' + cap.focoCara + '">' +
      '<span class="cara-numero">' + cap.numero + '</span>' +
      '<span class="cara-leyenda"><b>' + cap.numero + '</b>' + conclusiones.palabrasCubo[c] + '</span>';
    cara.addEventListener("click", () => irACapitulo(cap.numero));
    cubo.contenedor.appendChild(cara);
    return cara;
  });
  motor.alActualizar.push(actualizarCubo);
}

// ---------- Poses del cubo ----------

// Orientación del cubo en una posición del relato (1 = capítulo 1 … 6 = capítulo 6; 2,5 = a mitad del giro)
function orientacionEn(posicion) {
  const p = limitar(posicion, 1, 6);
  const k = Math.min(Math.floor(p), 5);
  const t = p - k;
  if (t <= 0) return cubo.orientaciones[k - 1];
  const g = cubo.giros[k - 1];
  const giro = g.eje === "x" ? rotarX(g.angulo * t) : rotarY(g.angulo * t);
  return multiplicar(giro, cubo.orientaciones[k - 1]);
}

// Centro del área de contenido (sin contar el índice lateral ni el margen del cubo)
function centroContenido() {
  const izquierda = motor.anchoIndice;
  const derecha = window.innerWidth - motor.margenCubo;
  return { x: (izquierda + derecha) / 2, ancho: derecha - izquierda };
}

// Pose pequeña, fija en un costado
function poseEsquina(posicion) {
  const angosto = window.innerWidth < 1100;
  const lado = angosto ? 52 : 80;
  return {
    cx: window.innerWidth - (angosto ? 44 : 64),
    cy: motor.altoBarra + (angosto ? 46 : 70),
    escala: lado / cubo.LADO, inclX: -16, inclY: 24,
    orient: orientacionEn(posicion), separacion: 0, morph: 0, opacidad: 1, leyendas: 0
  };
}

// Pose grande en el centro (transiciones entre capítulos)
function poseCentro(posicion, tamano) {
  const centro = centroContenido();
  const escenario = window.innerHeight - motor.altoBarra;
  return {
    cx: centro.x, cy: motor.altoBarra + escenario * 0.44,
    escala: Math.min(tamano, centro.ancho / 520) * 200 / cubo.LADO, inclX: -10, inclY: 16,
    orient: orientacionEn(posicion), separacion: 0, morph: 0, opacidad: 1, leyendas: 0
  };
}

// Pose del Inicio: las caras llegan volando (0–55 %), el cubo gira (50–92 %)
function poseInicio(avance) {
  const centro = centroContenido();
  const escenario = window.innerHeight - motor.altoBarra;
  const ancho = centro.ancho > 860;
  const vuelo = [0, 1, 2, 3, 4, 5].map(c => suavizar(tramo(avance, 0.06 + c * 0.055, 0.28 + c * 0.055)));
  const giro = suavizar(tramo(avance, 0.5, 0.92));
  return {
    cx: ancho ? motor.anchoIndice + centro.ancho * 0.72 : centro.x,
    cy: motor.altoBarra + escenario * (ancho ? 0.47 : 0.56),
    escala: Math.min(1.25, centro.ancho / (ancho ? 760 : 520)),
    inclX: -18, inclY: 26,
    orient: rotarY(-360 * giro),
    separacion: 46 * (1 - suavizar(tramo(avance, 0.42, 0.6))),
    vuelo, morph: 0, opacidad: 1, leyendas: 0
  };
}

// Pose de la vista explotada: se separan (20–45 %), forman la fila (45–82 %), aparecen las palabras (82–95 %)
function poseExplosion(avance) {
  const centro = centroContenido();
  const escenario = window.innerHeight - motor.altoBarra;
  const hueco = 14;
  const tamFila = Math.min(150, (centro.ancho - 48 - hueco * 5) / 6);
  const separar = suavizar(tramo(avance, 0.18, 0.42));
  const morph = suavizar(tramo(avance, 0.45, 0.82));
  return {
    cx: centro.x, cy: motor.altoBarra + escenario * 0.46,
    escala: Math.min(1.1, centro.ancho / 620), inclX: -14, inclY: 22,
    orient: multiplicar(rotarY(-50 * separar), orientacionEn(6)),
    separacion: 130 * separar * (1 - morph),
    morph, tamFila, hueco,
    opacidad: 1, leyendas: tramo(avance, 0.82, 0.95)
  };
}

// Mezcla dos poses (t = 0 → a, t = 1 → b)
function mezclarPoses(a, b, t) {
  if (t <= 0) return a;
  if (t >= 1) return b;
  const r = {};
  const valores = { cx: 0, cy: 0, escala: 1, inclX: 0, inclY: 0, separacion: 0, morph: 0, opacidad: 1, leyendas: 0, desplazY: 0, tamFila: 120, hueco: 14 };
  for (const clave in valores) {
    const va = a[clave] !== undefined ? a[clave] : valores[clave];
    const vb = b[clave] !== undefined ? b[clave] : valores[clave];
    r[clave] = mezclar(va, vb, t);
  }
  r.orient = interpolarGiro(a.orient, b.orient, t);
  if (a.vuelo || b.vuelo) {
    r.vuelo = [0, 1, 2, 3, 4, 5].map(c => mezclar(a.vuelo ? a.vuelo[c] : 1, b.vuelo ? b.vuelo[c] : 1, t));
  }
  return r;
}

// ---------- Dibujo ----------

// Matriz final de la cara c: su ranura, separada del centro y corregida para verse derecha
function matrizCara(c, base, separacion) {
  const local = multiplicar(cubo.ranuras[c],
    multiplicar(trasladar(0, 0, cubo.LADO / 2 + separacion), rotarZ(cubo.correcciones[c])));
  return multiplicar(base, local);
}

// Matriz de la cara c cuando está en la fila de la vista explotada
function matrizFila(c, pose) {
  const x = (c - 2.5) * (pose.tamFila + pose.hueco);
  return multiplicar(trasladar(x, 0, 0), escalar(pose.tamFila / cubo.LADO));
}

// Coloca las 6 caras según una pose
function dibujarCubo(pose) {
  const base = multiplicar(escalar(pose.escala),
    multiplicar(rotarX(pose.inclX), multiplicar(rotarY(pose.inclY), pose.orient)));
  cubo.posicion.style.transform = "translate3d(" + pose.cx.toFixed(1) + "px," + (pose.cy + (pose.desplazY || 0)).toFixed(1) + "px,0)";
  cubo.capa.classList.toggle("explotando", (pose.morph || 0) > 0.02);
  cubo.capa.classList.toggle("en-esquina", (pose.escala * cubo.LADO) < 100);
  cubo.capa.style.setProperty("--leyendas", (pose.leyendas || 0).toFixed(3));
  cubo.caras.forEach((cara, c) => {
    let m = matrizCara(c, base, pose.separacion || 0);
    if (pose.morph > 0) m = interpolarMatrices(m, matrizFila(c, pose), pose.morph);
    let opacidad = pose.opacidad !== undefined ? pose.opacidad : 1;
    if (pose.vuelo) {
      const e = pose.vuelo[c];
      const d = DIRECCIONES_VUELO[c];
      m = multiplicar(trasladar(d[0] * (1 - e) * 1300, d[1] * (1 - e) * 900, d[2] * (1 - e) * 900), m);
      opacidad *= e;
    }
    cara.style.opacity = opacidad.toFixed(3);
    cara.style.transform = matrizACSS(multiplicar(m, trasladar(-cubo.LADO / 2, -cubo.LADO / 2, 0)));
  });
}

// Posición del relato: 1 a 6 según el capítulo; entre capítulos, el giro avanza con la transición
function posicionDelRelato() {
  let posicion = 1;
  const transiciones = document.querySelectorAll(".transicion");
  for (let k = 0; k < transiciones.length; k++) {
    const avance = progresoDeSeccion(transiciones[k]);
    if (avance >= 1) { posicion = k + 2; continue; }
    if (avance > 0) posicion = k + 1 + suavizar(tramo(avance, 0.38, 0.62));
    break;
  }
  return posicion;
}

// Decide la pose del cubo según dónde está el usuario y lo dibuja (corre en cada cuadro)
function actualizarCubo() {
  const visible = !motor.modoLectura && !motor.sin3D;
  cubo.capa.hidden = !visible;
  if (!visible) return;
  const alto = window.innerHeight;
  const posicion = posicionDelRelato();
  let pose = poseEsquina(posicion);

  // 1. Inicio: mientras el escenario está fijo, el cubo se arma en el centro
  const inicio = document.getElementById("inicio-secuencia");
  const cajaInicio = inicio.getBoundingClientRect();
  const salida = limitar((alto - cajaInicio.bottom) / (alto * 0.7), 0, 1);
  if (salida < 1) {
    const pi = poseInicio(progresoDeSeccion(inicio));
    pi.desplazY = -Math.max(0, alto - cajaInicio.bottom);  // acompaña al escenario cuando se suelta
    pose = mezclarPoses(pi, pose, suavizar(salida));
  }

  // 2. Entre capítulos: el cubo crece al centro mientras gira 90°
  document.querySelectorAll(".transicion").forEach(t => {
    const avance = progresoDeSeccion(t);
    if (avance <= 0 || avance >= 1) return;
    const crecer = suavizar(Math.min(tramo(avance, 0.12, 0.36), 1 - tramo(avance, 0.64, 0.88)));
    if (crecer > 0) pose = mezclarPoses(pose, poseCentro(posicion, 1), crecer);
  });

  // 3. Conclusiones: vista explotada
  const explosion = document.getElementById("explosion");
  let opacidadCapa = 1;
  if (explosion && explosion.offsetParent !== null) {
    const caja = explosion.getBoundingClientRect();
    const avance = progresoDeSeccion(explosion);
    if (avance > 0) {
      const pe = poseExplosion(avance);
      if (caja.bottom < alto) pe.desplazY = -(alto - caja.bottom);   // se va con el escenario
      pose = mezclarPoses(pose, pe, suavizar(tramo(avance, 0, 0.18)));
      if (caja.bottom < motor.altoBarra) opacidadCapa = 0;
    }
  }
  cubo.capa.style.opacity = opacidadCapa;
  dibujarCubo(pose);
}
