const chispa = {
  raiz: null,
  boton: null,
  globo: null,
  texto: null,
  anuncio: null,
  botonSilencio: null,
  seccion: "inicio",
  siguiente: {},
  saludadas: new Set(),
  espera: null,
  cierre: null,
  escritura: null,
  gesto: null,
  cuenta: null,
  silenciada: false
};

function dibujarChispa() {
  const pieza = nombre => '<img class="marx-' + nombre + '" src="' + rutaImagen("marx/marx-" + nombre + ".webp") + '" alt="" draggable="false">';
  return '<span class="marx" aria-hidden="true">' +
    '<span class="marx-sombra"></span>' +
    '<span class="marx-torso">' + pieza("cuerpo") + '</span>' +
    '<span class="marx-cabeza"><span class="marx-cabeza-giro">' + pieza("cabeza-fondo") + pieza("mandibula") + pieza("cabeza") + '</span></span>' +
  '</span>';
}

function crearChispa() {
  try {
    chispa.silenciada = localStorage.getItem("webdoc-g2-chispa-silenciada") === "1";
  } catch (error) {
    chispa.silenciada = false;
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

  chispa.boton.addEventListener("click", () => {
    chispa.raiz.classList.remove("tocado");
    void chispa.raiz.offsetWidth;
    chispa.raiz.classList.add("tocado");
    setTimeout(() => chispa.raiz.classList.remove("tocado"), 700);
    decirDato(proximoDato(chispa.seccion), false);
  });
  raiz.querySelector(".chispa-otro").addEventListener("click", () => decirDato(proximoDato(chispa.seccion), false));
  raiz.querySelector(".chispa-cerrar").addEventListener("click", () => { cerrarGlobo(); chispa.boton.focus(); });
  chispa.botonSilencio.addEventListener("click", alternarSilencioChispa);

  chispa.globo.addEventListener("mouseenter", () => clearTimeout(chispa.cierre));
  chispa.globo.addEventListener("focusin", () => clearTimeout(chispa.cierre));
  chispa.globo.addEventListener("mouseleave", () => programarCierre(chispa.texto.textContent));

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !chispa.globo.hidden) cerrarGlobo();
  });
}

function proximoDato(seccion) {
  const lista = curiosidades[seccion] || curiosidades.inicio;
  const n = chispa.siguiente[seccion] || 0;
  chispa.siguiente[seccion] = (n + 1) % lista.length;
  if (chispa.cuenta) chispa.cuenta.textContent = lista.length > 1 ? "Dato " + (n + 1) + " de " + lista.length : "";
  return lista[n];
}

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

function programarCierre(texto) {
  clearTimeout(chispa.cierre);
  const tiempo = Math.min(14000, 4500 + texto.length * 55);
  chispa.cierre = setTimeout(cerrarGlobo, tiempo);
}

function cerrarGlobo() {
  clearTimeout(chispa.escritura);
  clearTimeout(chispa.cierre);
  chispa.raiz.classList.remove("hablando");
  chispa.globo.hidden = true;
  chispa.boton.setAttribute("aria-expanded", "false");
}

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

function alternarSilencioChispa() {
  chispa.silenciada = !chispa.silenciada;
  try {
    localStorage.setItem("webdoc-g2-chispa-silenciada", chispa.silenciada ? "1" : "0");
  } catch (error) {
  }
  actualizarBotonSilencio();
  if (chispa.silenciada) cerrarGlobo();
}

function actualizarBotonSilencio() {
  chispa.botonSilencio.textContent = chispa.silenciada ? "Que hable solo" : "Silenciar";
  chispa.raiz.classList.toggle("silenciada", chispa.silenciada);
}

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
