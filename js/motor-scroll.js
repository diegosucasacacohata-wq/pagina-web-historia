const motor = {
  secuencias: [],
  capas: [],
  alActualizar: [],
  pendiente: false,
  modoLectura: false,
  sin3D: false,
  celular: false,
  altoBarra: 60,
  anchoIndice: 0,
  margenCubo: 0
};

function limitar(valor, minimo, maximo) {
  return Math.min(maximo, Math.max(minimo, valor));
}

function mezclar(a, b, t) {
  return a + (b - a) * t;
}

function suavizar(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function tramo(avance, inicio, fin) {
  return limitar((avance - inicio) / (fin - inicio), 0, 1);
}

function progresoDeSeccion(seccion) {
  if (seccion.dataset.saltada === "true") return 1;
  const caja = seccion.getBoundingClientRect();
  const alto = window.innerHeight;
  if (seccion.dataset.tipo === "pasaje") {
    return limitar((alto - caja.top) / (alto + caja.height), 0, 1);
  }
  const recorrido = caja.height - (alto - motor.altoBarra);
  if (recorrido <= 1) return caja.top <= motor.altoBarra ? 1 : 0;
  return limitar((motor.altoBarra - caja.top) / recorrido, 0, 1);
}

function registrarSecuencia(elemento, dibujar) {
  const fases = Number(elemento.dataset.fases || 1);
  motor.secuencias.push({ elemento, dibujar, fases, ultimo: -1 });
  const boton = elemento.querySelector(".boton-saltar");
  if (boton) boton.addEventListener("click", () => saltarAnimacion(elemento));
}

function actualizarControl(secuencia, avance) {
  const control = secuencia.elemento.querySelector(".control-secuencia");
  if (!control) return;
  const fase = Math.min(secuencia.fases, Math.floor(avance * secuencia.fases) + 1);
  const texto = control.querySelector(".control-fase");
  if (texto) texto.textContent = "Fase " + fase + " de " + secuencia.fases;
  const barra = control.querySelector(".control-barra i");
  if (barra) barra.style.transform = "scaleX(" + avance.toFixed(3) + ")";
}

function dibujarSecuencias() {
  const alto = window.innerHeight;
  for (const s of motor.secuencias) {
    const caja = s.elemento.getBoundingClientRect();
    if (s.elemento.dataset.saltada === "true" && caja.top > alto) {
      s.elemento.dataset.saltada = "false";
      s.ultimo = -1;
    }
    if (caja.bottom < -alto * 0.5 || caja.top > alto * 1.5) continue;
    const avance = motor.modoLectura ? 1 : progresoDeSeccion(s.elemento);
    if (Math.abs(avance - s.ultimo) < 0.0005) continue;
    s.ultimo = avance;
    s.dibujar(avance, s.elemento);
    actualizarControl(s, avance);
  }
}

function redibujarTodo() {
  for (const s of motor.secuencias) s.ultimo = -1;
  pedirActualizacion();
}

function saltarAnimacion(seccion) {
  seccion.dataset.saltada = "true";
  const arriba = seccion.getBoundingClientRect().top + window.scrollY;
  let destino;
  if (seccion.dataset.finalInteractivo === "true") {
    destino = arriba + seccion.offsetHeight - window.innerHeight;
  } else {
    destino = arriba + seccion.offsetHeight - motor.altoBarra + 2;
  }
  window.scrollTo({ top: Math.max(0, destino), behavior: "auto" });
  redibujarTodo();
  const foco = seccion.querySelector("[data-foco-final]") || buscarSiguienteTitulo(seccion);
  if (foco) {
    if (!foco.hasAttribute("tabindex")) foco.setAttribute("tabindex", "-1");
    foco.focus({ preventScroll: true });
  }
}

function buscarSiguienteTitulo(elemento) {
  const todos = Array.from(document.querySelectorAll("main h2, main h3, main .paso"));
  return todos.find(t => elemento.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING && !elemento.contains(t)) || null;
}

function aplicarParallax() {
  const alto = window.innerHeight;
  const factor = motor.sin3D ? 0 : (motor.celular ? 0.5 : 1);
  for (const capa of motor.capas) {
    if (motor.modoLectura || factor === 0) {
      capa.style.transform = "";
      continue;
    }
    const raiz = capa.closest("[data-parallax]");
    if (!raiz) continue;
    const caja = raiz.getBoundingClientRect();
    if (caja.bottom < -alto || caja.top > alto * 2) continue;
    const velocidad = Number(capa.dataset.velocidad);
    let desplazamiento;
    if (raiz.dataset.tipo === "fijada") {
      desplazamiento = (1 - velocidad) * (progresoDeSeccion(raiz) - 0.5) * alto * 0.22;
    } else {
      desplazamiento = (1 - velocidad) * limitar(-caja.top, 0, caja.height);
    }
    capa.style.transform = "translate3d(0, " + (desplazamiento * factor).toFixed(1) + "px, 0)";
  }
}

function alternarModoLectura(forzar) {
  motor.modoLectura = typeof forzar === "boolean" ? forzar : !motor.modoLectura;
  document.documentElement.classList.toggle("modo-lectura", motor.modoLectura);
  const interruptor = document.getElementById("interruptor-lectura");
  if (interruptor) interruptor.checked = motor.modoLectura;
  try {
    localStorage.setItem("webdoc-g2-modo-lectura", motor.modoLectura ? "1" : "0");
  } catch (error) {
  }
  medirPantalla();
  redibujarTodo();
}

function medirPantalla() {
  motor.sin3D = window.matchMedia("(max-width: 599px)").matches;
  motor.celular = window.matchMedia("(max-width: 767px)").matches;
  const barra = document.querySelector(".barra-superior");
  if (barra) motor.altoBarra = barra.getBoundingClientRect().bottom;
  const estilos = getComputedStyle(document.documentElement);
  motor.anchoIndice = parseFloat(estilos.getPropertyValue("--ancho-indice")) || 0;
  motor.margenCubo = parseFloat(estilos.getPropertyValue("--margen-cubo")) || 0;
  document.documentElement.classList.toggle("sin-3d", motor.sin3D);
}

function actualizarTodo() {
  motor.pendiente = false;
  const barra = document.querySelector(".barra-superior");
  if (barra) motor.altoBarra = barra.getBoundingClientRect().bottom;
  dibujarSecuencias();
  aplicarParallax();
  for (const funcion of motor.alActualizar) funcion();
}

function pedirActualizacion() {
  if (motor.pendiente) return;
  motor.pendiente = true;
  requestAnimationFrame(actualizarTodo);
}
