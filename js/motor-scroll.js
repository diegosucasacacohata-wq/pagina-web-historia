// =====================================================================
// motor-scroll.js — Motor de scroll SIN librerías (sirve para los 5 niveles)
// Idea central: el contenido de una secuencia se queda quieto con CSS
// position: sticky, y el avance del scroll (de 0 a 1) decide qué se ve.
// El scroll del usuario NUNCA se bloquea: solo se lee su posición.
// =====================================================================

// Estado compartido por todos los archivos
const motor = {
  secuencias: [],     // { elemento, dibujar, fases, ultimo }
  capas: [],          // capas de parallax (atributo data-velocidad)
  alActualizar: [],   // funciones que corren en cada cuadro (índice, cubo, reloj…)
  pendiente: false,   // evita pedir dos cuadros a la vez
  modoLectura: false, // true = sin secuencias ni parallax
  sin3D: false,       // pantallas de menos de 600 px: sin cubo, sin 3D, sin parallax
  celular: false,     // pantallas de menos de 768 px: secuencias a la mitad
  altoBarra: 60,      // alto de la barra superior (se mide en cada cuadro)
  anchoIndice: 0,     // ancho del índice lateral fijo (0 si está oculto)
  margenCubo: 0       // margen derecho reservado para el cubo
};

// ---------- Pequeñas utilidades matemáticas ----------

// Limita un número entre un mínimo y un máximo
function limitar(valor, minimo, maximo) {
  return Math.min(maximo, Math.max(minimo, valor));
}

// Mezcla dos números: t = 0 devuelve a, t = 1 devuelve b
function mezclar(a, b, t) {
  return a + (b - a) * t;
}

// Curva suave: arranca y termina despacio para que nada se mueva de golpe
function suavizar(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Convierte el avance general (0 a 1) en el avance de UNA fase.
// Ejemplo: tramo(0.5, 0.4, 0.6) = 0.5 → la fase va por la mitad.
function tramo(avance, inicio, fin) {
  return limitar((avance - inicio) / (fin - inicio), 0, 1);
}

// ---------- Avance de una secuencia ----------

// Devuelve de 0 a 1 cuánto se recorrió una secuencia.
// «fijada»: el escenario está pegado (sticky) mientras la sección pasa por debajo.
// «pasaje»: sección normal de 1 pantalla; el avance va de que asoma abajo a que sale arriba.
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

// ---------- Registro de secuencias ----------

// Guarda una secuencia y la función que la dibuja según su avance
function registrarSecuencia(elemento, dibujar) {
  const fases = Number(elemento.dataset.fases || 1);
  motor.secuencias.push({ elemento, dibujar, fases, ultimo: -1 });
  const boton = elemento.querySelector(".boton-saltar");
  if (boton) boton.addEventListener("click", () => saltarAnimacion(elemento));
}

// Actualiza el indicador «Fase 2 de 4» y la barra de avance de una secuencia
function actualizarControl(secuencia, avance) {
  const control = secuencia.elemento.querySelector(".control-secuencia");
  if (!control) return;
  const fase = Math.min(secuencia.fases, Math.floor(avance * secuencia.fases) + 1);
  const texto = control.querySelector(".control-fase");
  if (texto) texto.textContent = "Fase " + fase + " de " + secuencia.fases;
  const barra = control.querySelector(".control-barra i");
  if (barra) barra.style.transform = "scaleX(" + avance.toFixed(3) + ")";
}

// Dibuja cada secuencia que está cerca de la pantalla
function dibujarSecuencias() {
  const alto = window.innerHeight;
  for (const s of motor.secuencias) {
    const caja = s.elemento.getBoundingClientRect();
    // Si el usuario vuelve por encima de una secuencia saltada, puede verla de nuevo
    if (s.elemento.dataset.saltada === "true" && caja.top > alto) {
      s.elemento.dataset.saltada = "false";
      s.ultimo = -1;
    }
    // Las que están lejos no se calculan (ahorra trabajo)
    if (caja.bottom < -alto * 0.5 || caja.top > alto * 1.5) continue;
    const avance = motor.modoLectura ? 1 : progresoDeSeccion(s.elemento);
    if (Math.abs(avance - s.ultimo) < 0.0005) continue;
    s.ultimo = avance;
    s.dibujar(avance, s.elemento);
    actualizarControl(s, avance);
  }
}

// Obliga a redibujar todas las secuencias en el próximo cuadro
function redibujarTodo() {
  for (const s of motor.secuencias) s.ultimo = -1;
  pedirActualizacion();
}

// ---------- Saltar animación ----------

// Lleva al usuario al final de la secuencia y la deja en su estado final.
// En las secuencias interactivas (red, línea de tiempo) se queda donde el escenario sigue visible.
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
  // Mueve el foco del teclado a algo útil después del salto
  const foco = seccion.querySelector("[data-foco-final]") || buscarSiguienteTitulo(seccion);
  if (foco) {
    if (!foco.hasAttribute("tabindex")) foco.setAttribute("tabindex", "-1");
    foco.focus({ preventScroll: true });
  }
}

// Busca el primer título que viene después de un elemento (para mover el foco)
function buscarSiguienteTitulo(elemento) {
  const todos = Array.from(document.querySelectorAll("main h2, main h3, main .paso"));
  return todos.find(t => elemento.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING && !elemento.contains(t)) || null;
}

// ---------- Parallax ----------

// Mueve cada capa según su atributo data-velocidad (1 = igual que el texto, 0,5 = la mitad).
// Solo se mueven imágenes y capas de fondo; el texto nunca.
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
      // Dentro de una secuencia fijada, la capa se retrasa según el avance
      desplazamiento = (1 - velocidad) * (progresoDeSeccion(raiz) - 0.5) * alto * 0.22;
    } else {
      // En una sección normal, la capa recorre menos distancia que el texto
      desplazamiento = (1 - velocidad) * limitar(-caja.top, 0, caja.height);
    }
    capa.style.transform = "translate3d(0, " + (desplazamiento * factor).toFixed(1) + "px, 0)";
  }
}

// ---------- Modo lectura ----------

// Activa o desactiva el «Modo lectura»: sin secuencias ni parallax, la página queda como texto normal
function alternarModoLectura(forzar) {
  motor.modoLectura = typeof forzar === "boolean" ? forzar : !motor.modoLectura;
  document.documentElement.classList.toggle("modo-lectura", motor.modoLectura);
  const interruptor = document.getElementById("interruptor-lectura");
  if (interruptor) interruptor.checked = motor.modoLectura;
  try {
    localStorage.setItem("webdoc-g2-modo-lectura", motor.modoLectura ? "1" : "0");
  } catch (error) {
    // Si el navegador no deja guardar, no pasa nada: solo no se recuerda
  }
  medirPantalla();
  redibujarTodo();
}

// ---------- Medidas de la pantalla ----------

// Lee el tamaño de la pantalla y de la barra; decide si hay 3D y si las secuencias van a la mitad
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

// ---------- Bucle de actualización ----------

// Corre una vez por cuadro: secuencias, parallax y el resto de módulos
function actualizarTodo() {
  motor.pendiente = false;
  const barra = document.querySelector(".barra-superior");
  if (barra) motor.altoBarra = barra.getBoundingClientRect().bottom;
  dibujarSecuencias();
  aplicarParallax();
  for (const funcion of motor.alActualizar) funcion();
}

// Pide un cuadro de animación (requestAnimationFrame) si no hay uno pendiente
function pedirActualizacion() {
  if (motor.pendiente) return;
  motor.pendiente = true;
  requestAnimationFrame(actualizarTodo);
}
