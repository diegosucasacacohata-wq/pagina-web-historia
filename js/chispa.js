// =====================================================================
// chispa.js — El guía del webdoc: Karl Marx como muñeco de papel
// Es la foto de Marx de 1875 recortada en 4 piezas (img/marx/) que se
// animan con CSS. Cuenta datos curiosos de la sección donde está el lector.
// (Antes era «Chispa», la vela del panel 2: se mantienen los nombres
// de las funciones para no romper el resto del código.)
// Los datos están en el arreglo «curiosidades» de datos.js.
// - Al llegar a una sección nueva, habla solo una vez (si no está silenciado).
// - Al tocarlo, cuenta otro dato de esa sección.
// =====================================================================

// Estado del guía: sus elementos en la página y sus temporizadores
const chispa = {
  raiz: null,            // contenedor del muñeco y su globo
  boton: null,           // el muñeco (es un botón)
  globo: null,           // globo de diálogo
  texto: null,           // texto que se ve, letra por letra
  anuncio: null,         // el mismo texto completo, para lectores de pantalla
  botonSilencio: null,
  seccion: "inicio",     // sección donde está el lector
  siguiente: {},         // sección → número del próximo dato
  saludadas: new Set(),  // secciones donde ya habló solo
  espera: null,          // temporizador antes de hablar solo
  cierre: null,          // temporizador para cerrar el globo
  escritura: null,       // temporizador del efecto de escribir
  gesto: null,           // temporizador de los gestos cuando está quieto
  cuenta: null,          // texto «Dato 2 de 5»
  silenciada: false      // true = solo habla si lo tocan
};

// Arma el muñeco de Marx con sus 4 piezas recortadas, apiladas en el mismo lienzo:
// el cuerpo y la cabeza en 3 capas (fondo con la boca abierta pintada, mandíbula y parte de arriba).
// La cabeza va un poco más grande que en la foto, como un muñeco «cabezón» (lo hace el CSS).
function dibujarChispa() {
  // Una pieza es una imagen .webp con fondo transparente (img/marx/marx-<nombre>.webp)
  const pieza = nombre => '<img class="marx-' + nombre + '" src="' + rutaImagen("marx/marx-" + nombre + ".webp") + '" alt="" draggable="false">';
  return '<span class="marx" aria-hidden="true">' +
    '<span class="marx-sombra"></span>' +
    '<span class="marx-torso">' + pieza("cuerpo") + '</span>' +
    '<span class="marx-cabeza"><span class="marx-cabeza-giro">' + pieza("cabeza-fondo") + pieza("mandibula") + pieza("cabeza") + '</span></span>' +
  '</span>';
}

// Crea el muñeco de Marx y su globo de diálogo en la esquina inferior derecha
function crearChispa() {
  try {
    chispa.silenciada = localStorage.getItem("webdoc-g2-chispa-silenciada") === "1";
  } catch (error) {
    chispa.silenciada = false;   // si el navegador no deja guardar, empieza hablando
  }
  const raiz = document.createElement("div");
  raiz.className = "chispa";
  raiz.id = "chispa";
  raiz.innerHTML =
    '<div class="chispa-globo" id="chispa-globo" hidden>' +
      '<button type="button" class="chispa-cerrar" aria-label="Cerrar el globo de Karl Marx">×</button>' +
      '<p class="chispa-nombre">Karl Marx <span>· datos curiosos</span></p>' +
      '<p class="chispa-texto" aria-hidden="true"></p>' +
      '<p class="solo-lector" role="status" aria-live="polite"></p>' +
      '<p class="chispa-acciones">' +
        '<button type="button" class="chispa-otro">Otro dato</button>' +
        '<button type="button" class="chispa-silencio"></button>' +
        '<span class="chispa-cuenta" aria-hidden="true"></span>' +
      '</p>' +
    '</div>' +
    '<button type="button" class="chispa-muneco" aria-controls="chispa-globo" ' +
      'aria-label="Karl Marx, el guía. Toca para escuchar un dato curioso.">' + dibujarChispa() + '</button>';
  document.body.appendChild(raiz);

  chispa.raiz = raiz;
  chispa.boton = raiz.querySelector(".chispa-muneco");
  chispa.globo = raiz.querySelector(".chispa-globo");
  chispa.texto = raiz.querySelector(".chispa-texto");
  chispa.anuncio = raiz.querySelector('[role="status"]');
  chispa.botonSilencio = raiz.querySelector(".chispa-silencio");
  chispa.cuenta = raiz.querySelector(".chispa-cuenta");
  actualizarBotonSilencio();
  programarGesto();

  // Tocar a Marx: da un respingo (clase «tocado») y cuenta el siguiente dato de la sección
  chispa.boton.addEventListener("click", () => {
    chispa.raiz.classList.remove("tocado");
    void chispa.raiz.offsetWidth;            // reinicia la animación del respingo
    chispa.raiz.classList.add("tocado");
    setTimeout(() => chispa.raiz.classList.remove("tocado"), 700);
    decirDato(proximoDato(chispa.seccion), false);
  });
  // «Otro dato» cuenta el siguiente; la × cierra el globo; «Silenciar» lo calla
  raiz.querySelector(".chispa-otro").addEventListener("click", () => decirDato(proximoDato(chispa.seccion), false));
  raiz.querySelector(".chispa-cerrar").addEventListener("click", () => { cerrarGlobo(); chispa.boton.focus(); });
  chispa.botonSilencio.addEventListener("click", alternarSilencioChispa);

  // Mientras el lector tiene el cursor o el foco en el globo, no se cierra solo
  chispa.globo.addEventListener("mouseenter", () => clearTimeout(chispa.cierre));
  chispa.globo.addEventListener("focusin", () => clearTimeout(chispa.cierre));
  chispa.globo.addEventListener("mouseleave", () => programarCierre(chispa.texto.textContent));

  // Escape cierra el globo
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !chispa.globo.hidden) cerrarGlobo();
  });
}

// Devuelve el próximo dato curioso de una sección (al terminar, vuelve a empezar)
// y actualiza el contador «Dato N de M»
function proximoDato(seccion) {
  const lista = curiosidades[seccion] || curiosidades.inicio;
  const n = chispa.siguiente[seccion] || 0;
  chispa.siguiente[seccion] = (n + 1) % lista.length;
  if (chispa.cuenta) chispa.cuenta.textContent = lista.length > 1 ? "Dato " + (n + 1) + " de " + lista.length : "";
  return lista[n];
}

// Marx dice un texto: abre el globo, mueve la mandíbula y escribe letra por letra
function decirDato(texto, automatico) {
  clearTimeout(chispa.escritura);
  clearTimeout(chispa.cierre);
  chispa.globo.hidden = false;
  chispa.globo.classList.toggle("automatico", automatico);
  chispa.anuncio.textContent = texto;
  chispa.boton.setAttribute("aria-expanded", "true");

  const sinMovimiento = motor.modoLectura || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (sinMovimiento) {
    chispa.texto.textContent = texto;
    programarCierre(texto);
    return;
  }
  // Efecto de escribir: una letra cada 22 milisegundos, con la mandíbula moviéndose (clase «hablando»)
  chispa.raiz.classList.add("hablando");
  let letras = 0;
  const escribir = () => {
    letras += 1;
    chispa.texto.textContent = texto.slice(0, letras);
    if (letras < texto.length) {
      chispa.escritura = setTimeout(escribir, 22);
    } else {
      chispa.raiz.classList.remove("hablando");
      programarCierre(texto);
    }
  };
  escribir();
}

// Programa el cierre automático del globo (más tiempo si el texto es largo)
function programarCierre(texto) {
  clearTimeout(chispa.cierre);
  const tiempo = Math.min(14000, 4500 + texto.length * 55);
  chispa.cierre = setTimeout(cerrarGlobo, tiempo);
}

// Cierra el globo de diálogo
function cerrarGlobo() {
  clearTimeout(chispa.escritura);
  clearTimeout(chispa.cierre);
  chispa.raiz.classList.remove("hablando");
  chispa.globo.hidden = true;
  chispa.boton.setAttribute("aria-expanded", "false");
}

// Se llama al cambiar de sección (desde actualizarIndice): si el lector se queda
// un momento en la sección nueva, Marx habla solo una vez
function chispaCambioDeSeccion(id) {
  if (!chispa.raiz) return;
  chispa.seccion = id;
  clearTimeout(chispa.espera);
  if (chispa.silenciada || motor.modoLectura || chispa.saludadas.has(id) || !curiosidades[id]) return;
  chispa.espera = setTimeout(() => {
    if (chispa.seccion !== id) return;
    chispa.saludadas.add(id);
    decirDato(proximoDato(id), true);
  }, id === "inicio" ? 1600 : 1300);
}

// Silencia o reactiva a Marx (silenciado, solo habla si lo tocan)
function alternarSilencioChispa() {
  chispa.silenciada = !chispa.silenciada;
  try {
    localStorage.setItem("webdoc-g2-chispa-silenciada", chispa.silenciada ? "1" : "0");
  } catch (error) {
    // si el navegador no deja guardar, solo dura mientras la página esté abierta
  }
  actualizarBotonSilencio();
  if (chispa.silenciada) cerrarGlobo();
}

// Cambia el texto del botón según si Marx está silenciado o no
function actualizarBotonSilencio() {
  chispa.botonSilencio.textContent = chispa.silenciada ? "Que hable solo" : "Silenciar";
  chispa.raiz.classList.toggle("silenciada", chispa.silenciada);
}

// Cada 6 a 13 segundos, si está quieto, hace un gesto al azar: mira a un lado, asiente o da un saltito.
// Cada gesto es una clase de CSS que dura 1,4 segundos.
function programarGesto() {
  clearTimeout(chispa.gesto);
  chispa.gesto = setTimeout(() => {
    const quieto = !chispa.raiz.classList.contains("hablando") && !motor.modoLectura;
    if (quieto) {
      const gestos = ["gesto-mirar", "gesto-asentir", "gesto-saltito"];
      const gesto = gestos[Math.floor(Math.random() * gestos.length)];
      chispa.raiz.classList.add(gesto);
      setTimeout(() => chispa.raiz.classList.remove(gesto), 1400);
    }
    programarGesto();
  }, 6000 + Math.random() * 7000);
}
