document.addEventListener("DOMContentLoaded", iniciar);

function rutaImagen(archivo) {
  if (typeof IMAGENES_EMBEBIDAS !== "undefined" && IMAGENES_EMBEBIDAS[archivo]) return IMAGENES_EMBEBIDAS[archivo];
  return "img/" + archivo;
}

function escalaDeTiempo(anio, tramos) {
  if (anio <= tramos[0][0]) return tramos[0][1];
  for (let i = 1; i < tramos.length; i++) {
    const [a0, x0] = tramos[i - 1];
    const [a1, x1] = tramos[i];
    if (anio <= a1) return x0 + (anio - a0) / (a1 - a0) * (x1 - x0);
  }
  return tramos[tramos.length - 1][1];
}

function anioDesdePosicion(x, tramos) {
  if (x <= tramos[0][1]) return tramos[0][0];
  for (let i = 1; i < tramos.length; i++) {
    const [a0, x0] = tramos[i - 1];
    const [a1, x1] = tramos[i];
    if (x <= x1) return a0 + (x - x0) / (x1 - x0) * (a1 - a0);
  }
  return tramos[tramos.length - 1][0];
}

function textoPlano(html) {
  return html.replace(/<[^>]+>/g, "");
}

function irACapitulo(numero) {
  const destino = document.getElementById("capitulo-" + numero);
  if (destino) destino.scrollIntoView({ block: "start" });
}

function construirInicio() {
  document.getElementById("barra-pregunta").textContent = config.pregunta;
  document.getElementById("pregunta-inicio").textContent = config.pregunta;
  document.getElementById("gancho").textContent = config.gancho;
  document.getElementById("eslogan").textContent = config.eslogan;
  document.getElementById("lista-integrantes").innerHTML = config.integrantes.map(nombre => "<li>" + nombre + "</li>").join("");
  document.getElementById("integrantes-inicio").innerHTML = config.integrantes.map(nombre => "<li>" + nombre + "</li>").join("");
  document.getElementById("credito-portada").textContent = config.creditoImagenes + ": los 6 paneles, uno por capítulo.";

  document.getElementById("mosaico-inicio").innerHTML = capitulos.map(cap =>
    '<div class="tesela" style="--color: var(--c' + cap.numero + ')"><img src="' + rutaImagen("panel-" + cap.panel + ".jpg") + '" alt="">' +
    '<span class="tesela-numero">' + cap.numero + '</span></div>').join("");

  registrarSecuencia(document.getElementById("inicio-secuencia"), dibujarInicio);
}

function dibujarInicio(avance, el) {
  el.querySelector(".indicacion-bajar").style.opacity = (1 - tramo(avance, 0.02, 0.08)).toFixed(3);
  const desde = [[-1, 0], [1, 0], [-1, 0.4], [1, -0.4], [0, 1], [0, 1]];
  el.querySelectorAll(".tesela").forEach((t, i) => {
    const llegada = suavizar(tramo(avance, i * 0.08, i * 0.08 + 0.18));
    t.style.opacity = llegada.toFixed(3);
    t.style.transform = "translate(" + (desde[i][0] * 110 * (1 - llegada)).toFixed(1) + "vw," + (desde[i][1] * 60 * (1 - llegada)).toFixed(1) + "vh)";
  });
}

let indiceActual = "";
let migasActuales = "";

function construirIndice() {
  const lista = document.getElementById("indice-lista");
  let html = "";
  document.querySelectorAll("main > section[data-indice]").forEach(sec => {
    const titulo = sec.dataset.tituloIndice || sec.querySelector("h2").textContent;
    html += '<li><a href="#' + sec.id + '" data-destino="' + sec.id + '">' + titulo + '</a>';
    if (sec.id === "proceso") {
      html += '<ol class="indice-capitulos">' + capitulos.map(cap =>
        '<li><a href="#capitulo-' + cap.numero + '" data-destino="capitulo-' + cap.numero + '" style="--color: var(--c' + cap.numero + '); --tinta-cap: var(--t' + cap.numero + ')">' +
        '<span class="indice-numero">' + cap.numero + '</span>' + document.getElementById("titulo-cap-" + cap.numero).textContent + '</a></li>').join("") + '</ol>';
    }
    html += '</li>';
  });
  lista.innerHTML = html;

  document.getElementById("minimapa").innerHTML = capitulos.map(cap =>
    '<a href="#capitulo-' + cap.numero + '" data-capitulo="' + cap.numero + '" style="--color: var(--c' + cap.numero + ')" ' +
    'aria-label="Capítulo ' + cap.numero + ': ' + cap.titulo + '" title="Capítulo ' + cap.numero + ': ' + cap.titulo + '"><span></span></a>').join("");

  motor.secciones = Array.from(document.querySelectorAll("main > section[data-indice], .capitulo"));
  motor.marcasMigas = Array.from(document.querySelectorAll("[data-migas]"));
  motor.marcasAnio = Array.from(document.querySelectorAll("[data-anio]"));
}

function actualizarIndice() {
  const alto = window.innerHeight;
  let actual = motor.secciones[0];
  for (const sec of motor.secciones) {
    if (sec.getBoundingClientRect().top <= alto * 0.35) actual = sec;
  }
  let detalle = "";
  for (const m of motor.marcasMigas) {
    if (!actual.contains(m)) continue;
    if (m.getBoundingClientRect().top <= alto * 0.5) detalle = m.dataset.migas;
  }
  const numero = actual.classList.contains("capitulo") ? Number(actual.dataset.capitulo) : 0;
  const bloque = numero ? "Capítulo " + numero + " de 6" : (actual.dataset.tituloIndice || actual.querySelector("h2").textContent);
  if (detalle === bloque) detalle = "";
  const texto = bloque + "|" + detalle;
  if (texto !== migasActuales) {
    migasActuales = texto;
    document.querySelector("#migas .migas-bloque").textContent = bloque;
    document.querySelector("#migas .migas-detalle").textContent = detalle;
  }
  if (actual.id === indiceActual) return;
  indiceActual = actual.id;
  chispaCambioDeSeccion(actual.id);
  document.querySelectorAll("#indice-lista a").forEach(a => {
    if (a.dataset.destino === actual.id) a.setAttribute("aria-current", "location");
    else a.removeAttribute("aria-current");
  });
  document.documentElement.style.setProperty("--color-actual", numero ? "var(--c" + numero + ")" : "var(--tinta)");
  document.documentElement.style.setProperty("--tinta-actual", numero ? "var(--t" + numero + ")" : "var(--tinta)");
  const despues = ["red", "linea-tiempo", "conclusiones", "fuentes"].includes(actual.id);
  document.querySelectorAll("#minimapa a").forEach(a => {
    const n = Number(a.dataset.capitulo);
    a.classList.toggle("visto", despues || (numero > 0 && n <= numero));
    a.classList.toggle("actual", n === numero);
  });
}

function actualizarBarraProgreso() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const avance = total > 0 ? window.scrollY / total : 0;
  document.getElementById("barra-progreso").style.transform = "scaleX(" + avance.toFixed(4) + ")";
  document.getElementById("volver-arriba").classList.toggle("visible", window.scrollY > window.innerHeight * 1.2);
}

let anioReloj = "";

function actualizarReloj() {
  const alto = window.innerHeight;
  let anio = "1516";
  for (const m of motor.marcasAnio) {
    if (m.getBoundingClientRect().top <= alto * 0.5) anio = m.dataset.anio;
  }
  const linea = document.getElementById("lt-secuencia").getBoundingClientRect();
  lt.activa = !motor.modoLectura && linea.top <= motor.altoBarra + 1 && linea.bottom >= alto - 1;
  if (lt.activa) anio = String(lt.anioCentro);
  if (anio === anioReloj) return;
  anioReloj = anio;
  const caja = document.getElementById("reloj-anio");
  caja.textContent = anio;
  caja.classList.toggle("reloj-largo", anio.length > 5);
  caja.classList.remove("cambia");
  void caja.offsetWidth;
  caja.classList.add("cambia");
}

const CANTIDAD_PARTICULAS = { dorada: 26, humo: 16, brasas: 34, nieve: 40, volantes: 22, polvo: 30 };

function crearParticulas(capa) {
  const tipo = capa.dataset.particula;
  const cantidad = Math.min(40, CANTIDAD_PARTICULAS[tipo] || 20);
  let html = "";
  for (let i = 0; i < cantidad; i++) {
    const azar = (min, max) => (min + Math.random() * (max - min)).toFixed(2);
    const tamanos = { dorada: [4, 10], humo: [60, 150], brasas: [2, 5], nieve: [2, 6], volantes: [8, 14], polvo: [1.5, 3.5] };
    const tiempos = { dorada: [7, 13], humo: [10, 18], brasas: [3, 7], nieve: [6, 12], volantes: [7, 13], polvo: [8, 16] };
    const t = azar(tiempos[tipo][0], tiempos[tipo][1]);
    html += '<span class="particula" style="--x:' + azar(0, 100) + '%;--y:' + azar(0, 100) + '%;--t:' + t + 's;--r:-' + azar(0, t) +
      's;--s:' + azar(tamanos[tipo][0], tamanos[tipo][1]) + 'px;--d:' + azar(-60, 60) + 'px;--g:' + azar(-200, 200) + 'deg"></span>';
  }
  capa.innerHTML = html;
}

function crearTodasLasParticulas() {
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(e => e.target.classList.toggle("activas", e.isIntersecting));
  });
  document.querySelectorAll(".capa-particulas").forEach(capa => {
    crearParticulas(capa);
    observador.observe(capa);
  });
}

function prepararDefiniciones() {
  const ajustar = palabra => {
    const definicion = palabra.querySelector(".definicion");
    definicion.style.setProperty("--corrimiento", "0px");
    palabra.classList.remove("definicion-abajo");
    const caja = definicion.getBoundingClientRect();
    let mover = 0;
    if (caja.left < 8) mover = 8 - caja.left;
    else if (caja.right > window.innerWidth - 8) mover = window.innerWidth - 8 - caja.right;
    definicion.style.setProperty("--corrimiento", mover.toFixed(0) + "px");
    if (caja.top < motor.altoBarra + 8) palabra.classList.add("definicion-abajo");
  };
  document.querySelectorAll(".palabra-clave").forEach(p => {
    p.addEventListener("mouseenter", () => ajustar(p));
    p.addEventListener("focus", () => ajustar(p));
    p.addEventListener("click", () => {
      const abierta = p.classList.contains("abierta");
      document.querySelectorAll(".palabra-clave.abierta").forEach(x => x.classList.remove("abierta"));
      if (!abierta) { ajustar(p); p.classList.add("abierta"); }
    });
    p.addEventListener("keydown", e => {
      if (e.key === "Escape") { p.classList.remove("abierta"); p.blur(); }
    });
  });
}

function videoPorId(id) {
  return videos.find(v => v.id === id);
}

function tituloDeVideo(video) {
  return video.capitulo ? "Capítulo " + video.capitulo + ": " + capitulos[video.capitulo - 1].titulo : video.titulo;
}

function portadaDe(video) {
  return rutaImagen(video.capitulo ? "panel-" + capitulos[video.capitulo - 1].panel + ".jpg" : "paneles-completos.jpg");
}

function enlaceIncrustado(enlace) {
  const youtube = enlace.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  if (youtube) return "https://www.youtube-nocookie.com/embed/" + youtube[1] + "?rel=0&cc_load_policy=1";
  const drive = enlace.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
  if (drive) return "https://drive.google.com/file/d/" + drive[1] + "/preview";
  return null;
}

function htmlVideoPendiente(video) {
  return '<div class="video-pendiente"><img src="' + portadaDe(video) + '" alt="">' +
    '<p><strong>Video ' + (video.capitulo ? "del capítulo " + video.capitulo : "«" + (video.etiqueta || "Cierre") + "»") + ': próximamente</strong>' +
    '<span>Archivo esperado: <code>' + video.archivo + '</code></span></p></div>';
}

function crearReproductor(contenedor, video) {
  const enlace = (video.enlace || "").trim();
  const incrustado = enlace ? enlaceIncrustado(enlace) : null;
  if (incrustado) {
    contenedor.innerHTML = '<iframe loading="lazy" title="' + tituloDeVideo(video) + '" ' +
      'allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen src="' + incrustado + '"></iframe>';
    return;
  }
  contenedor.innerHTML = '<video controls playsinline preload="metadata" poster="' + portadaDe(video) + '" src="' + (enlace || video.archivo) + '">' +
    (video.subtitulos ? '<track kind="subtitles" srclang="es" label="Español" src="' + video.subtitulos + '" default>' : '') + '</video>';
  contenedor.querySelector("video").addEventListener("error", () => { contenedor.innerHTML = htmlVideoPendiente(video); });
}

function construirVideos() {
  [["introduccion", "clip-introduccion", "El video de la introducción"],
   ["conclusion", "clip-conclusion", "El video de la conclusión"],
   ["conclusion-2", "clip-conclusion-2", "El video de la conclusión extendida"]].forEach(([id, caja, titulo]) => {
    const video = videoPorId(id);
    const contenedor = document.getElementById(caja);
    if (video && video.activo !== false && contenedor) contenedor.innerHTML = htmlClip(video, titulo);
  });
  document.querySelectorAll(".clip").forEach(clip => {
    crearReproductor(clip.querySelector(".clip-reproductor"), videoPorId(clip.dataset.video));
  });
}

function construirConclusiones() {
  document.getElementById("pregunta-conclusiones").textContent = config.pregunta;
  document.getElementById("respuesta-grupo").textContent = conclusiones.respuesta;

  const paso = (p, numero) => {
    const cap = capitulos[p.capitulo - 1];
    return '<li style="--color: var(--c' + p.capitulo + '); --tinta-cap: var(--t' + p.capitulo + ')">' +
      '<span class="paso-numero">' + numero + '</span><div><b>' + p.palabra + '.</b> ' + p.texto +
      ' <a href="#capitulo-' + p.capitulo + '">Capítulo ' + p.capitulo + ': ' + cap.titulo + '</a></div></li>';
  };
  document.getElementById("seis-pasos").innerHTML =
    conclusiones.pasos.map((p, i) => paso(p, i + 1)).join("") +
    paso(conclusiones.resultado, "=").replace("<li ", '<li class="resultado" ');

  document.getElementById("ideas-clave").innerHTML = conclusiones.ideasClave.map(i => '<li>' + i + '</li>').join("");
  construirComparador();
  document.getElementById("fuentes-trabajo").innerHTML = conclusiones.fuentesQueNoCoinciden.map(f =>
    '<h4>' + f.tema + '</h4><p><b>El problema:</b> ' + f.problema + '</p><p><b>Cómo lo resolvimos:</b> ' + f.solucion + '</p>').join("");

  registrarSecuencia(document.getElementById("explosion"), dibujarExplosion);
}

function dibujarExplosion(avance, el) {
  el.querySelector(".explosion-titulo").style.opacity = (0.4 + 0.6 * tramo(avance, 0.05, 0.2)).toFixed(3);
  el.querySelector(".explosion-cierre").style.opacity = tramo(avance, 0.88, 0.97).toFixed(3);
}

function construirComparador() {
  const c = conclusiones.comparador;
  const lado = (datos, clase) => '<div class="comparador-lado ' + clase + '"><h4>' + datos.titulo + '</h4><ul>' +
    datos.puntos.map(p => '<li>' + p + '</li>').join("") + '</ul></div>';
  const caja = document.getElementById("comparador");
  caja.innerHTML =
    '<div class="comparador" style="--corte: 50%">' + lado(c.izquierda, "comparador-izq") + lado(c.derecha, "comparador-der") +
    '<div class="comparador-linea" aria-hidden="true"></div></div>' +
    '<label class="comparador-control"><span>Desliza para comparar</span>' +
    '<input type="range" min="0" max="100" value="50" aria-label="Mover la línea entre lo que proponía Marx y lo que ocurrió"></label>' +
    '<p class="comparador-botones"><button type="button" class="boton-pequeno boton-borde" data-corte="100">Ver solo lo que proponía Marx</button>' +
    '<button type="button" class="boton-pequeno boton-borde" data-corte="0">Ver solo lo que ocurrió</button></p>';
  const marco = caja.querySelector(".comparador");
  const deslizador = caja.querySelector("input");
  const mover = valor => { marco.style.setProperty("--corte", valor + "%"); deslizador.value = valor; };
  deslizador.addEventListener("input", () => mover(deslizador.value));
  caja.querySelectorAll("[data-corte]").forEach(b => b.addEventListener("click", () => mover(b.dataset.corte)));
}

function construirFuentes() {
  document.getElementById("lista-fuentes").innerHTML = fuentes.map(grupo => {
    const ordenadas = grupo.lista.slice().sort((a, b) => textoPlano(a.apa).localeCompare(textoPlano(b.apa), "es"));
    const items = ordenadas.length
      ? ordenadas.map(f => '<li>' + f.apa + (f.enlace ? ' <a href="' + f.enlace + '" target="_blank" rel="noopener">' + f.enlace + '</a>' : '') +
          (f.nota ? '<span class="fuente-nota">' + f.nota + '</span>' : '') + '</li>').join("")
      : '<li class="vacia">Todavía no hay fuentes en esta categoría (agregarlas con la plantilla de js/datos.js).</li>';
    return '<h3>' + grupo.categoria + '</h3><ul class="lista-fuentes">' + items + '</ul>';
  }).join("");
}

function construirPie() {
  document.getElementById("pie").innerHTML =
    '<p class="pie-titulo">' + config.titulo + '</p>' +
    '<p>' + config.proyecto + '. ' + config.grupo + '.</p>' +
    '<p><b>Integrantes:</b> ' + config.integrantes.join("; ") + '.</p>' +
    '<p>' + config.curso + '. ' + config.universidad + ', ' + config.anio + '.</p>' +
    '<p><b>Imágenes:</b> ' + config.creditoImagenes + '. Son ilustraciones, no documentos históricos.</p>';
}

function prepararEventosGenerales() {
  document.getElementById("interruptor-lectura").addEventListener("change", e => {
    alternarModoLectura(e.target.checked);
    reenfocarScrollytelling();
  });

  const boton = document.getElementById("boton-indice");
  const indice = document.getElementById("indice");
  const cerrarIndice = () => { indice.classList.remove("abierto"); boton.setAttribute("aria-expanded", "false"); };
  boton.addEventListener("click", () => {
    const abrir = !indice.classList.contains("abierto");
    indice.classList.toggle("abierto", abrir);
    boton.setAttribute("aria-expanded", String(abrir));
    if (abrir) indice.querySelector("a").focus();
  });
  indice.addEventListener("click", e => { if (e.target.closest("a")) cerrarIndice(); });

  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (indice.classList.contains("abierto")) { cerrarIndice(); boton.focus(); }
    document.querySelectorAll(".palabra-clave.abierta").forEach(x => x.classList.remove("abierta"));
  });

  document.addEventListener("click", e => {
    const enlaceRed = e.target.closest("[data-red-capitulo]");
    if (enlaceRed) { e.preventDefault(); irARedFiltrada(Number(enlaceRed.dataset.redCapitulo)); return; }
    const enlaceLinea = e.target.closest("[data-linea-capitulo]");
    if (enlaceLinea) { e.preventDefault(); irALineaDelCapitulo(Number(enlaceLinea.dataset.lineaCapitulo)); return; }
    if (!e.target.closest(".palabra-clave")) document.querySelectorAll(".palabra-clave.abierta").forEach(x => x.classList.remove("abierta"));
  });

  document.getElementById("volver-arriba").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.getElementById("titulo-principal").setAttribute("tabindex", "-1");
    document.getElementById("titulo-principal").focus({ preventScroll: true });
  });

  const reducir = window.matchMedia("(prefers-reduced-motion: reduce)");
  reducir.addEventListener("change", () => {
    let guardado = null;
    try { guardado = localStorage.getItem("webdoc-g2-modo-lectura"); } catch (error) { guardado = null; }
    if (guardado === null) alternarModoLectura(reducir.matches);
  });

  let espera = null;
  window.addEventListener("resize", () => {
    clearTimeout(espera);
    espera = setTimeout(() => { medirPantalla(); reenfocarScrollytelling(); redibujarTodo(); }, 120);
  });
  window.addEventListener("scroll", pedirActualizacion, { passive: true });
}

function iniciar() {
  motor.modoLectura = document.documentElement.classList.contains("modo-lectura");
  document.getElementById("interruptor-lectura").checked = motor.modoLectura;
  medirPantalla();
  construirInicio();
  construirContexto();
  construirCapitulos();
  dibujarRed();
  construirVideos();
  dibujarLineaTiempo();
  construirConclusiones();
  construirFuentes();
  construirPie();
  prepararComprueba();
  prepararCubo();
  construirIndice();
  crearChispa();
  crearTodasLasParticulas();
  prepararDefiniciones();
  prepararEventosGenerales();
  motor.capas = Array.from(document.querySelectorAll(".capa-parallax"));
  motor.alActualizar.push(actualizarIndice, actualizarBarraProgreso, actualizarReloj);
  window.addEventListener("load", () => { reenfocarScrollytelling(); redibujarTodo(); });
  pedirActualizacion();
}
