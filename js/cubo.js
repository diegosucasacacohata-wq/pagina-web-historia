const cubo = {
  capa: null,
  posicion: null,
  contenedor: null,
  caras: [],
  ranuras: [],
  correcciones: [],
  orientaciones: [],
  giros: [],
  LADO: 200
};

const RECORRIDO_CARAS = ["frente", "derecha", "arriba", "izquierda", "abajo", "atras"];

const DIRECCIONES_VUELO = [[-1, -0.3, 0], [1, -0.4, 0], [0, -1, 0.3], [-1, 0.5, 0], [0, 1, 0.2], [1, 0.6, -0.5]];

function identidad() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

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

function radianes(grados) {
  return grados * Math.PI / 180;
}

function rotarX(grados) {
  const c = Math.cos(radianes(grados)), s = Math.sin(radianes(grados));
  return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
}

function rotarY(grados) {
  const c = Math.cos(radianes(grados)), s = Math.sin(radianes(grados));
  return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
}

function rotarZ(grados) {
  const c = Math.cos(radianes(grados)), s = Math.sin(radianes(grados));
  return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

function trasladar(x, y, z) {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
}

function escalar(s) {
  return [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 1];
}

function aplicarGiro(m, v) {
  return [
    m[0] * v[0] + m[4] * v[1] + m[8] * v[2],
    m[1] * v[0] + m[5] * v[1] + m[9] * v[2],
    m[2] * v[0] + m[6] * v[1] + m[10] * v[2]
  ];
}

function matrizACSS(m) {
  return "matrix3d(" + m.map(n => (Math.abs(n) < 1e-9 ? 0 : n).toFixed(6)).join(",") + ")";
}

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

function cuaternionAMatriz(q) {
  const [x, y, z, w] = q;
  return [
    1 - 2 * (y * y + z * z), 2 * (x * y + z * w), 2 * (x * z - y * w), 0,
    2 * (x * y - z * w), 1 - 2 * (x * x + z * z), 2 * (y * z + x * w), 0,
    2 * (x * z + y * w), 2 * (y * z - x * w), 1 - 2 * (x * x + y * y), 0,
    0, 0, 0, 1
  ];
}

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

function descomponer(m) {
  const tam = Math.hypot(m[0], m[1], m[2]);
  const giro = m.slice();
  for (let i = 0; i < 12; i++) if (i % 4 !== 3) giro[i] = m[i] / tam;
  return { tam, giro: matrizACuaternion(giro), pos: [m[12], m[13], m[14]] };
}

function interpolarMatrices(a, b, t) {
  const da = descomponer(a), db = descomponer(b);
  const giro = cuaternionAMatriz(interpolarCuaterniones(da.giro, db.giro, t));
  const tam = mezclar(da.tam, db.tam, t);
  const pos = da.pos.map((v, i) => mezclar(v, db.pos[i], t));
  return multiplicar(trasladar(pos[0], pos[1], pos[2]), multiplicar(escalar(tam), giro));
}

function interpolarGiro(a, b, t) {
  if (t <= 0) return a;
  if (t >= 1) return b;
  return cuaternionAMatriz(interpolarCuaterniones(matrizACuaternion(a), matrizACuaternion(b), t));
}

function colocacionDeRanura(nombre) {
  if (nombre === "derecha") return rotarY(90);
  if (nombre === "atras") return rotarY(180);
  if (nombre === "izquierda") return rotarY(-90);
  if (nombre === "arriba") return rotarX(90);
  if (nombre === "abajo") return rotarX(-90);
  return identidad();
}

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
      if (mira[2] > 0.99) {
        cubo.giros.push({ eje, angulo });
        cubo.orientaciones.push(multiplicar(giro, actual));
        break;
      }
    }
  }
  cubo.correcciones = cubo.ranuras.map((ranura, c) => {
    const vista = multiplicar(cubo.orientaciones[c], ranura);
    const arriba = aplicarGiro(vista, [0, -1, 0]);
    const angulo = Math.atan2(arriba[0], -arriba[1]) * 180 / Math.PI;
    return -Math.round(angulo / 90) * 90;
  });
}

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
    cara.tabIndex = -1;
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

function orientacionEn(posicion) {
  const p = limitar(posicion, 1, 6);
  const k = Math.min(Math.floor(p), 5);
  const t = p - k;
  if (t <= 0) return cubo.orientaciones[k - 1];
  const g = cubo.giros[k - 1];
  const giro = g.eje === "x" ? rotarX(g.angulo * t) : rotarY(g.angulo * t);
  return multiplicar(giro, cubo.orientaciones[k - 1]);
}

function centroContenido() {
  const izquierda = motor.anchoIndice;
  const derecha = window.innerWidth - motor.margenCubo;
  return { x: (izquierda + derecha) / 2, ancho: derecha - izquierda };
}

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

function poseCentro(posicion, tamano) {
  const centro = centroContenido();
  const escenario = window.innerHeight - motor.altoBarra;
  return {
    cx: centro.x, cy: motor.altoBarra + escenario * 0.44,
    escala: Math.min(tamano, centro.ancho / 520) * 200 / cubo.LADO, inclX: -10, inclY: 16,
    orient: orientacionEn(posicion), separacion: 0, morph: 0, opacidad: 1, leyendas: 0
  };
}

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

function matrizCara(c, base, separacion) {
  const local = multiplicar(cubo.ranuras[c],
    multiplicar(trasladar(0, 0, cubo.LADO / 2 + separacion), rotarZ(cubo.correcciones[c])));
  return multiplicar(base, local);
}

function matrizFila(c, pose) {
  const x = (c - 2.5) * (pose.tamFila + pose.hueco);
  return multiplicar(trasladar(x, 0, 0), escalar(pose.tamFila / cubo.LADO));
}

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

function actualizarCubo() {
  const visible = !motor.modoLectura && !motor.sin3D;
  cubo.capa.hidden = !visible;
  if (!visible) return;
  const alto = window.innerHeight;
  const posicion = posicionDelRelato();
  let pose = poseEsquina(posicion);

  const inicio = document.getElementById("inicio-secuencia");
  const cajaInicio = inicio.getBoundingClientRect();
  const salida = limitar((alto - cajaInicio.bottom) / (alto * 0.7), 0, 1);
  if (salida < 1) {
    const pi = poseInicio(progresoDeSeccion(inicio));
    pi.desplazY = -Math.max(0, alto - cajaInicio.bottom);
    pose = mezclarPoses(pi, pose, suavizar(salida));
  }

  document.querySelectorAll(".transicion").forEach(t => {
    const avance = progresoDeSeccion(t);
    if (avance <= 0 || avance >= 1) return;
    const crecer = suavizar(Math.min(tramo(avance, 0.12, 0.36), 1 - tramo(avance, 0.64, 0.88)));
    if (crecer > 0) pose = mezclarPoses(pose, poseCentro(posicion, 1), crecer);
  });

  const explosion = document.getElementById("explosion");
  let opacidadCapa = 1;
  if (explosion && explosion.offsetParent !== null) {
    const caja = explosion.getBoundingClientRect();
    const avance = progresoDeSeccion(explosion);
    if (avance > 0) {
      const pe = poseExplosion(avance);
      if (caja.bottom < alto) pe.desplazY = -(alto - caja.bottom);
      pose = mezclarPoses(pose, pe, suavizar(tramo(avance, 0, 0.18)));
      if (caja.bottom < motor.altoBarra) opacidadCapa = 0;
    }
  }
  cubo.capa.style.opacity = opacidadCapa;
  dibujarCubo(pose);
}
