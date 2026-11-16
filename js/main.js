// =====================================================================
// main.js — Arranque de la página y piezas generales
// Índice, barra superior, reloj de años, partículas, video, conclusiones,
// fuentes y eventos generales. Al final, iniciar() lo pone todo en marcha.
// =====================================================================
document.addEventListener("DOMContentLoaded", iniciar);

// ---------- Utilidades compartidas ----------

// Ruta de una imagen. En la versión de un solo archivo, las imágenes vienen incrustadas.
function rutaImagen(archivo) {
  if (typeof IMAGENES_EMBEBIDAS !== "undefined" && IMAGENES_EMBEBIDAS[archivo]) return IMAGENES_EMBEBIDAS[archivo];
  return "img/" + archivo;
}

// Convierte un año en una posición x usando una escala por tramos [[año, x], …]
// (así un tramo largo y vacío, como 1525–1775, ocupa poco espacio)
function escalaDeTiempo(anio, tramos) {
  if (anio <= tramos[0][0]) return tramos[0][1];
  for (let i = 1; i < tramos.length; i++) {
    const [a0, x0] = tramos[i - 1];
    const [a1, x1] = tramos[i];
    if (anio <= a1) return x0 + (anio - a0) / (a1 - a0) * (x1 - x0);
  }
  return tramos[tramos.length - 1][1];
}

// Hace lo contrario: de una posición x devuelve el año
function anioDesdePosicion(x, tramos) {
  if (x <= tramos[0][1]) return tramos[0][0];
  for (let i = 1; i < tramos.length; i++) {
    const [a0, x0] = tramos[i - 1];
    const [a1, x1] = tramos[i];
    if (x <= x1) return a0 + (x - x0) / (x1 - x0) * (a1 - a0);
  }
  return tramos[tramos.length - 1][0];
}

// Quita las etiquetas HTML de un texto (para ordenar las fuentes alfabéticamente)
function textoPlano(html) {
  return html.replace(/<[^>]+>/g, "");
}

// Lleva al inicio de un capítulo (lo usan el cubo y el mini-mapa)
function irACapitulo(numero) {
  const destino = document.getElementById("capitulo-" + numero);
  if (destino) destino.scrollIntoView({ block: "start" });
}

// ---------- Inicio ----------

// Llena los textos del Inicio y registra su secuencia (el cubo se arma en cubo.js)
function construirInicio() {
  document.getElementById("barra-pregunta").textContent = config.pregunta;
  document.getElementById("pregunta-inicio").textContent = config.pregunta;
  document.getElementById("gancho").textContent = config.gancho;
  document.getElementById("eslogan").textContent = config.eslogan;
  document.getElementById("dato-finalidad").textContent = config.finalidad;
  document.getElementById("dato-publico").textContent = config.publico;
  document.getElementById("dato-curso").textContent = config.curso + ". " + config.universidad + ", " + config.anio + ".";
  document.getElementById("dato-proyecto").textContent = config.proyecto + ". " + config.grupo + ".";
  document.getElementById("lista-integrantes").innerHTML = config.integrantes
    .map(i => "<li>" + i.nombre + " <span>(capítulo " + i.capitulo + ")</span></li>").join("");
  document.getElementById("credito-portada").textContent = config.creditoImagenes + ": los 6 paneles, uno por capítulo.";

  // Mosaico en 2D para pantallas sin 3D: los 6 paneles llegan uno por uno
  document.getElementById("mosaico-inicio").innerHTML = capitulos.map(cap =>
    '<div class="tesela" style="--color: var(--c' + cap.numero + ')"><img src="' + rutaImagen("panel-" + cap.panel + ".jpg") + '" alt="">' +
    '<span class="tesela-numero">' + cap.numero + '</span></div>').join("");

  registrarSecuencia(document.getElementById("inicio-secuencia"), dibujarInicio);
}

// Dibuja el Inicio: llegan los paneles (en 2D) y al final aparece la pregunta central sobre un degradado
function dibujarInicio(avance, el) {
  const comienzoPregunta = motor.sin3D ? 0.6 : 0.78;
  const e = suavizar(tramo(avance, comienzoPregunta, comienzoPregunta + 0.14));
  const pregunta = el.querySelector(".inicio-pregunta");
  pregunta.style.opacity = e.toFixed(3);
  pregunta.style.transform = "translateY(" + (24 * (1 - e)).toFixed(1) + "px)";
  el.querySelector(".indicacion-bajar").style.opacity = (1 - tramo(avance, 0.02, 0.08)).toFixed(3);
  const desde = [[-1, 0], [1, 0], [-1, 0.4], [1, -0.4], [0, 1], [0, 1]];
  el.querySelectorAll(".tesela").forEach((t, i) => {
    const llegada = suavizar(tramo(avance, i * 0.08, i * 0.08 + 0.18));
    t.style.opacity = llegada.toFixed(3);
    t.style.transform = "translate(" + (desde[i][0] * 110 * (1 - llegada)).toFixed(1) + "vw," + (desde[i][1] * 60 * (1 - llegada)).toFixed(1) + "vh)";
  });
}

// ---------- Índice, migas, mini-mapa, barra de progreso y reloj ----------
let indiceActual = "";    // id de la sección marcada ahora en el índice
let migasActuales = "";   // texto de las migas (para no reescribirlo en cada cuadro)

// Arma el índice lateral y el mini-mapa a partir de los títulos reales de la página
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

  // Lista de secciones que se vigilan para marcar el índice
  motor.secciones = Array.from(document.querySelectorAll("main > section[data-indice], .capitulo"));
  motor.marcasMigas = Array.from(document.querySelectorAll("[data-migas]"));
  motor.marcasAnio = Array.from(document.querySelectorAll("[data-anio]"));
}

// Marca en el índice la sección donde está el lector y actualiza migas y mini-mapa
function actualizarIndice() {
  const alto = window.innerHeight;
  let actual = motor.secciones[0];
  for (const sec of motor.secciones) {
    if (sec.getBoundingClientRect().top <= alto * 0.35) actual = sec;
  }
  // Detalle de las migas: el último paso o subtítulo que pasó por la mitad de la pantalla
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
  chispaCambioDeSeccion(actual.id);   // el guía Marx cuenta un dato de la sección nueva
  document.querySelectorAll("#indice-lista a").forEach(a => {
    if (a.dataset.destino === actual.id) a.setAttribute("aria-current", "location");
    else a.removeAttribute("aria-current");
  });
  document.documentElement.style.setProperty("--color-actual", numero ? "var(--c" + numero + ")" : "var(--tinta)");
  document.documentElement.style.setProperty("--tinta-actual", numero ? "var(--t" + numero + ")" : "var(--tinta)");
  // Mini-mapa: se llenan los capítulos ya recorridos
  const despues = ["red", "video", "linea-tiempo", "conclusiones", "fuentes"].includes(actual.id);
  document.querySelectorAll("#minimapa a").forEach(a => {
    const n = Number(a.dataset.capitulo);
    a.classList.toggle("visto", despues || (numero > 0 && n <= numero));
    a.classList.toggle("actual", n === numero);
  });
}

// Barra fina de progreso de lectura y botón «Volver arriba»
function actualizarBarraProgreso() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const avance = total > 0 ? window.scrollY / total : 0;
  document.getElementById("barra-progreso").style.transform = "scaleX(" + avance.toFixed(4) + ")";
  document.getElementById("volver-arriba").classList.toggle("visible", window.scrollY > window.innerHeight * 1.2);
}

let anioReloj = "";   // año que muestra el reloj ahora

// «Reloj del recorrido»: muestra el año del relato según lo que se está leyendo
function actualizarReloj() {
  const alto = window.innerHeight;
  let anio = "1516";
  for (const m of motor.marcasAnio) {
    if (m.getBoundingClientRect().top <= alto * 0.5) anio = m.dataset.anio;
  }
  // Mientras la línea de tiempo está fija, el reloj sigue al año del centro
  const linea = document.getElementById("lt-secuencia").getBoundingClientRect();
  lt.activa = !motor.modoLectura && linea.top <= motor.altoBarra + 1 && linea.bottom >= alto - 1;
  if (lt.activa) anio = String(lt.anioCentro);
  if (anio === anioReloj) return;
  anioReloj = anio;
  const caja = document.getElementById("reloj-anio");
  caja.textContent = anio;
  caja.classList.toggle("reloj-largo", anio.length > 5);
  caja.classList.remove("cambia");
  void caja.offsetWidth;   // reinicia la animación corta del número
  caja.classList.add("cambia");
}

// ---------- Partículas temáticas (parallax, capa del 70 %) ----------
const CANTIDAD_PARTICULAS = { dorada: 26, humo: 16, brasas: 34, nieve: 40, volantes: 22, polvo: 30 };

// Crea las partículas de una capa (máximo 40). Solo se animan con transform y opacity.
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

// Crea todas las capas de partículas y solo las anima cuando están en pantalla
function crearTodasLasParticulas() {
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(e => e.target.classList.toggle("activas", e.isIntersecting));
  });
  document.querySelectorAll(".capa-particulas").forEach(capa => {
    crearParticulas(capa);
    observador.observe(capa);
  });
}

// ---------- Palabras clave ----------

// Corre la definición si se sale de la pantalla y permite abrirla con un toque
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

// ---------- Videos del equipo (uno por capítulo) ----------
const estadoVideos = {};   // id del video → { estado: "listo" | "falta" | "enlace", duracion }
let videoActual = null;    // id del video que está en el reproductor grande

// Busca un video por su id ("capitulo-3", "cierre")
function videoPorId(id) {
  return videos.find(v => v.id === id);
}

// Videos que se muestran (la conclusión se puede apagar con activo: false)
function videosActivos() {
  return videos.filter(v => v.activo !== false);
}

// Nombre de quien narra el video: el integrante de ese capítulo
// (la introducción y la conclusión lo indican con «narraCapitulo»)
function narradorDe(video) {
  const capitulo = video.capitulo || video.narraCapitulo;
  if (!capitulo) return "todo el grupo";
  const integrante = config.integrantes.find(i => i.capitulo === capitulo);
  return integrante ? integrante.nombre : "";
}

// Título del video: «Capítulo 3: El movimiento obrero se organiza»
function tituloDeVideo(video) {
  return video.capitulo ? "Capítulo " + video.capitulo + ": " + capitulos[video.capitulo - 1].titulo : video.titulo;
}

// Portada mientras no se reproduce: el panel del capítulo (o la imagen completa en el cierre)
function portadaDe(video) {
  return rutaImagen(video.capitulo ? "panel-" + capitulos[video.capitulo - 1].panel + ".jpg" : "paneles-completos.jpg");
}

// Convierte un enlace de YouTube o de Google Drive en la dirección para incrustarlo (null si no es ninguno)
function enlaceIncrustado(enlace) {
  const youtube = enlace.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  if (youtube) return "https://www.youtube-nocookie.com/embed/" + youtube[1] + "?rel=0&cc_load_policy=1";
  const drive = enlace.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
  if (drive) return "https://drive.google.com/file/d/" + drive[1] + "/preview";
  return null;
}

// Escribe una duración en minutos y segundos (192 → «3:12»)
function formatearDuracion(segundos) {
  const s = Math.round(segundos);
  return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
}

// Marcador «próximamente» mientras todavía no hay video (dice qué nombre debe tener el archivo)
function htmlVideoPendiente(video) {
  return '<div class="video-pendiente"><img src="' + portadaDe(video) + '" alt="">' +
    '<p><strong>Video ' + (video.capitulo ? "del capítulo " + video.capitulo : "«" + (video.etiqueta || "Cierre") + "»") + ': próximamente</strong>' +
    '<span>Archivo esperado: <code>' + video.archivo + '</code></span></p></div>';
}

// Crea el reproductor de un video: enlace (YouTube o Drive), archivo .mp4 o «próximamente» si falta
function crearReproductor(contenedor, video, opciones) {
  const enlace = (video.enlace || "").trim();
  const incrustado = enlace ? enlaceIncrustado(enlace) : null;
  if (incrustado) {
    const auto = opciones.autoplay ? (incrustado.includes("?") ? "&" : "?") + "autoplay=1" : "";
    contenedor.innerHTML = '<iframe loading="lazy" title="' + tituloDeVideo(video) + '" ' +
      'allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen src="' + incrustado + auto + '"></iframe>';
    return;
  }
  // Un archivo de la carpeta video/ (o un enlace directo a un .mp4)
  contenedor.innerHTML = '<video controls playsinline preload="metadata" poster="' + portadaDe(video) + '" src="' + (enlace || video.archivo) + '">' +
    (video.subtitulos ? '<track kind="subtitles" srclang="es" label="Español" src="' + video.subtitulos + '" default>' : '') + '</video>';
  const reproductor = contenedor.querySelector("video");
  reproductor.addEventListener("error", () => { contenedor.innerHTML = htmlVideoPendiente(video); });
  if (opciones.alTerminar) reproductor.addEventListener("ended", opciones.alTerminar);
  if (opciones.autoplay) reproductor.play().catch(() => {});
}

// Revisa si cada video existe (sin reproducirlo) para marcar su tarjeta: duración o «próximamente»
function revisarVideos() {
  videosActivos().forEach(video => {
    const enlace = (video.enlace || "").trim();
    if (enlace && enlaceIncrustado(enlace)) { marcarEstadoVideo(video.id, "enlace"); return; }
    const prueba = document.createElement("video");
    prueba.preload = "metadata";
    prueba.addEventListener("loadedmetadata", () => marcarEstadoVideo(video.id, "listo", prueba.duration));
    prueba.addEventListener("error", () => marcarEstadoVideo(video.id, "falta"));
    prueba.src = enlace || video.archivo;
  });
}

// Guarda el estado de un video y lo muestra en su tarjeta
function marcarEstadoVideo(id, estado, duracion) {
  estadoVideos[id] = { estado, duracion };
  const etiqueta = document.querySelector('.video-tarjeta[data-video="' + id + '"] .video-estado-tarjeta');
  if (!etiqueta) return;
  etiqueta.className = "video-estado-tarjeta " + estado;
  etiqueta.textContent = estado === "listo" ? "▶ " + formatearDuracion(duracion)
    : estado === "enlace" ? "▶ Video en línea" : "Próximamente";
  actualizarDuracionTotal();
}

// Suma la duración de las partes del documental que ya están y dice cuántas faltan
function actualizarDuracionTotal() {
  const caja = document.getElementById("video-total");
  const partes = videosActivos().filter(v => !v.marcas);
  if (!caja || !partes.every(v => estadoVideos[v.id])) return;
  const listas = partes.filter(v => estadoVideos[v.id].estado === "listo");
  const total = listas.reduce((suma, v) => suma + estadoVideos[v.id].duracion, 0);
  const faltan = partes.length - listas.length;
  caja.textContent = "Duración de las " + listas.length + " partes: " + formatearDuracion(total) + " min" +
    (faltan ? " · falta" + (faltan > 1 ? "n " : " ") + faltan + " parte" + (faltan > 1 ? "s" : "") : "") + ".";
}

// Arma la sección «Videos del equipo»: reproductor grande, tarjetas de los videos y créditos
function construirVideos() {
  document.getElementById("video-lista").innerHTML = videosActivos().map(v => {
    const color = v.capitulo ? "var(--c" + v.capitulo + ")" : "var(--tinta)";
    const tinta = v.capitulo ? "var(--t" + v.capitulo + ")" : "var(--tinta)";
    return '<li><button type="button" class="video-tarjeta" data-video="' + v.id + '" aria-pressed="false" style="--color: ' + color + '; --tinta-cap: ' + tinta + '">' +
      '<img src="' + portadaDe(v) + '" alt="">' +
      '<span class="video-tarjeta-texto"><span class="video-num">' + (v.capitulo ? "Capítulo " + v.capitulo : (v.etiqueta || "Cierre")) + '</span>' +
      '<b>' + (v.capitulo ? capitulos[v.capitulo - 1].titulo : v.titulo.replace(/^[^:]+: /, "")) + '</b>' +
      '<span class="video-narra">Narra: ' + narradorDe(v) + '</span>' +
      '<span class="video-estado-tarjeta">Revisando…</span></span></button></li>';
  }).join("");
  document.querySelectorAll(".video-tarjeta").forEach(b => b.addEventListener("click", () => elegirVideo(b.dataset.video, true)));

  document.getElementById("creditos-video").innerHTML = videosActivos().map(v =>
    '<li style="--tinta-cap: ' + (v.capitulo ? "var(--t" + v.capitulo + ")" : "var(--tinta)") + '"><b>' +
    narradorDe(v).replace(/^todo/, "Todo") + '</b>: ' + tituloDeVideo(v) + '</li>').join("");

  // El video de cada capítulo, dentro de su capítulo
  document.querySelectorAll(".clip").forEach(clip => {
    crearReproductor(clip.querySelector(".clip-reproductor"), videoPorId(clip.dataset.video), {});
  });

  elegirVideo(videosActivos()[0].id, false);
  revisarVideos();
}

// Pone un video en el reproductor grande (y lo reproduce si se pidió)
function elegirVideo(id, reproducir) {
  const video = videoPorId(id);
  videoActual = id;
  crearReproductor(document.getElementById("video-marco"), video, { autoplay: reproducir, alTerminar: pasarAlSiguienteVideo });
  document.getElementById("video-ahora").textContent = "Ahora: " + tituloDeVideo(video) + ". Narra " + narradorDe(video) + ".";
  document.getElementById("video-transcripcion").textContent = video.transcripcion;
  mostrarMarcas(video);
  document.querySelectorAll(".video-tarjeta").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.video === id)));
  if (reproducir) {
    const marco = document.getElementById("video-marco");
    if (marco.getBoundingClientRect().top < motor.altoBarra) marco.scrollIntoView({ block: "start" });
  }
}

// Botones para saltar a un minuto dentro de un video que tenga «marcas» (por ejemplo, un documental completo)
function mostrarMarcas(video) {
  const caja = document.getElementById("video-marcas");
  if (!caja) return;
  caja.hidden = !video.marcas;
  if (!video.marcas) { caja.innerHTML = ""; return; }
  caja.innerHTML = '<span>Ir a:</span>' + video.marcas.map(m =>
    '<button type="button" class="boton-pequeno boton-borde" data-inicio="' + m.inicio + '">' + m.titulo + ' <small>' + formatearDuracion(m.inicio) + '</small></button>').join("");
  caja.querySelectorAll("button").forEach(b => b.addEventListener("click", () => irAlMinutoDelVideo(Number(b.dataset.inicio))));
}

// Salta a un momento del video del reproductor grande (en segundos) y lo reproduce
function irAlMinutoDelVideo(segundos) {
  const reproductor = document.querySelector("#video-marco video");
  if (!reproductor) return;
  reproductor.currentTime = segundos;
  reproductor.play().catch(() => {});
}

// Al terminar un video, pasa al siguiente que exista (si la casilla está marcada)
function pasarAlSiguienteVideo() {
  if (!document.getElementById("video-seguir").checked) return;
  if (videoPorId(videoActual).marcas) return;
  const lista = videosActivos();
  const desde = lista.findIndex(v => v.id === videoActual);
  const siguiente = lista.slice(desde + 1).find(v => !estadoVideos[v.id] || estadoVideos[v.id].estado !== "falta");
  if (siguiente) elegirVideo(siguiente.id, true);
}

// ---------- Conclusiones ----------

// Arma las conclusiones: respuesta, los 6 pasos, ideas clave, comparador y trabajo con fuentes
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

// La vista explotada la mueve cubo.js; aquí solo aparecen los textos del escenario
function dibujarExplosion(avance, el) {
  el.querySelector(".explosion-titulo").style.opacity = (0.4 + 0.6 * tramo(avance, 0.05, 0.2)).toFixed(3);
  el.querySelector(".explosion-cierre").style.opacity = tramo(avance, 0.88, 0.97).toFixed(3);
}

// Comparador con deslizador: «Lo que proponía Marx» frente a «Lo que ocurrió»
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

// ---------- Fuentes y pie ----------

// Lista de fuentes en APA 7, por categoría y en orden alfabético
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

// Código fuente, recursos usados y declaración de uso de IA (al final de Fuentes)
function construirRecursos() {
  const enlace = (config.repositorio || "").trim();
  document.getElementById("recursos").innerHTML =
    '<p><b>Código fuente:</b> ' + (enlace ? '<a href="' + enlace + '" target="_blank" rel="noopener">' + enlace + '</a>' : 'la carpeta de esta página (index.html, css/, js/, img/ y video/), con su README.') + '</p>' +
    '<ul class="lista-recursos">' + config.recursos.map(r => '<li>' + r + '</li>').join("") + '</ul>' +
    '<p class="uso-ia"><b>Uso de inteligencia artificial:</b> ' + config.usoIA + '</p>';
}

// Pie de página: integrantes, curso, universidad, año y crédito de las imágenes
function construirPie() {
  document.getElementById("pie").innerHTML =
    '<p class="pie-titulo">' + config.titulo + '</p>' +
    '<p>' + config.proyecto + '. ' + config.grupo + '.</p>' +
    '<p><b>Integrantes:</b> ' + config.integrantes.map(i => i.nombre).join(", ") + '.</p>' +
    '<p>' + config.curso + '. ' + config.universidad + ', ' + config.anio + '.</p>' +
    '<p><b>Imágenes:</b> ' + config.creditoImagenes + '. Son ilustraciones, no documentos históricos; su origen figura en Fuentes.</p>';
}

// ---------- Eventos generales ----------

// Interruptor de modo lectura, índice en celular, enlaces de los capítulos, «Volver arriba» y tamaño de ventana
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

  // Enlaces «Ver este capítulo en la red» y «Ver en la línea de tiempo»
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

  // Si cambia la preferencia «reducir movimiento» y el usuario no eligió otra cosa, se respeta
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

// ---------- Arranque ----------

// Pone todo en marcha, en orden: textos, capítulos, red, video, línea de tiempo, cubo y eventos
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
  construirRecursos();
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
  // Las imágenes cambian de tamaño al cargar: se recalculan los enfoques
  window.addEventListener("load", () => { reenfocarScrollytelling(); redibujarTodo(); });
  pedirActualizacion();
}
