let contadorDefiniciones = 0;
const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const PROPORCION_PANEL = 834 / 311;

function marcarPalabrasClave(texto) {
  return texto.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (todo, visible, clave) => {
    const nombre = clave || visible;
    const definicion = glosario[nombre];
    if (!definicion) return visible;
    const id = "definicion-" + (contadorDefiniciones++);
    return '<span class="palabra-clave" tabindex="0" aria-describedby="' + id + '">' + visible +
      '<span class="definicion" role="tooltip" id="' + id + '"><b>' + nombre + ':</b> ' + definicion + '</span></span>';
  });
}

function htmlControl(fases) {
  return '<div class="control-secuencia' + (fases === 1 ? ' sin-fases' : '') + '">' +
    '<span class="control-fase">Fase 1 de ' + fases + '</span>' +
    '<span class="control-barra" aria-hidden="true"><i></i></span>' +
    '<button type="button" class="boton-saltar">Saltar animación</button></div>';
}

function htmlCapasDecorativas(particula) {
  return '<div class="capa-parallax capa-particulas solo-animacion" data-velocidad="0.7" data-particula="' + particula + '" aria-hidden="true"></div>' +
    '<div class="capa-parallax capa-papel solo-animacion" data-velocidad="0.85" aria-hidden="true"></div>';
}

function construirContexto() {
  const mosaico = document.getElementById("contexto-mosaico");
  mosaico.innerHTML = capitulos.map(cap =>
    '<div class="mosaico-celda" data-panel="' + cap.panel + '" style="--color: var(--c' + cap.numero + ')">' +
    '<img src="' + rutaImagen("panel-" + cap.panel + ".jpg") + '" alt="Panel ' + cap.panel + ' (capítulo ' + cap.numero + ')">' +
    '<span class="mosaico-numero">' + cap.numero + '</span></div>').join("");

  const oraciones = document.getElementById("contexto-oraciones");
  oraciones.innerHTML = contexto.map((o, i) =>
    '<p class="oracion" data-paneles="' + o.paneles.join(",") + '" data-anio="' + o.anio + '" data-migas="Contexto histórico">' + o.texto + '</p>').join("");

  const tarjetas = document.getElementById("contexto-tarjetas");
  tarjetas.innerHTML = capitulos.map(cap =>
    '<li class="tarjeta" style="--color: var(--c' + cap.numero + '); --tinta-cap: var(--t' + cap.numero + ')">' +
    '<span class="tarjeta-numero">' + cap.numero + '</span>' +
    '<h3 class="tarjeta-titulo">' + cap.titulo + '</h3>' +
    '<p class="tarjeta-pregunta">' + cap.subpregunta + '</p>' +
    '<a class="tarjeta-enlace" href="#capitulo-' + cap.numero + '">Ir al capítulo ' + cap.numero + '</a></li>').join("");

  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(e => { if (e.isIntersecting) resaltarPanelesContexto(e.target); });
  }, { rootMargin: "-45% 0px -45% 0px" });
  oraciones.querySelectorAll(".oracion").forEach(o => observador.observe(o));
  resaltarPanelesContexto(oraciones.querySelector(".oracion"));
}

function resaltarPanelesContexto(oracion) {
  const activos = oracion.dataset.paneles.split(",");
  document.querySelectorAll("#contexto-oraciones .oracion").forEach(o => o.classList.toggle("activa", o === oracion));
  document.querySelectorAll("#contexto-mosaico .mosaico-celda").forEach(celda => {
    celda.classList.toggle("atenuada", !activos.includes(celda.dataset.panel));
  });
}

function construirCapitulos() {
  const contenedor = document.getElementById("capitulos");
  let html = "";
  capitulos.forEach((cap, i) => {
    html += htmlCapitulo(cap);
    if (i < capitulos.length - 1) html += htmlTransicion(capitulos[i + 1]);
  });
  contenedor.innerHTML = html;

  capitulos.forEach(cap => {
    registrarSecuencia(document.getElementById("apertura-" + cap.numero), (avance, el) => dibujarApertura(cap, avance, el));
    if (cap.concepto) {
      const dibujos = { semana: dibujarSemana, mapa: dibujarMapa, choque: dibujarChoque, calendarios: dibujarCalendarios, brest: dibujarBrest };
      registrarSecuencia(document.getElementById("concepto-" + cap.numero), dibujos[cap.concepto.tipo]);
    }
  });
  document.querySelectorAll(".transicion").forEach(t => registrarSecuencia(t, dibujarTransicion));

  prepararScrollytelling();
  prepararContadores();
}

function htmlCapitulo(cap) {
  const n = cap.numero;
  return '<section class="capitulo" id="capitulo-' + n + '" data-capitulo="' + n + '" data-indice="capitulo" ' +
    'style="--color: var(--c' + n + '); --tinta-cap: var(--t' + n + ')" aria-labelledby="titulo-cap-' + n + '">' +
    htmlApertura(cap) +
    htmlScrolly(cap) +
    (cap.concepto ? htmlConcepto(cap) : "") +
    '<div class="lectura cuerpo-capitulo">' +
      htmlDatosClave(cap) +
      (cap.cita ? htmlCita(cap.cita) : "") +
      htmlClip(videos.find(v => v.capitulo === n), "El video del capítulo " + n) +
      '<div class="comprueba" data-capitulo="' + n + '"></div>' +
      '<div class="para-recordar"><h3>Para recordar</h3><ul>' + cap.paraRecordar.map(t => '<li>' + t + '</li>').join("") + '</ul></div>' +
      '<p class="enlaces-capitulo">' +
        '<a href="#red" data-red-capitulo="' + n + '">Ver este capítulo en la red</a>' +
        '<a href="#linea-tiempo" data-linea-capitulo="' + n + '">Ver en la línea de tiempo</a></p>' +
      htmlPuente(cap) +
    '</div></section>';
}

function htmlApertura(cap) {
  const n = cap.numero;
  const img = 'src="' + rutaImagen("panel-" + cap.panel + ".jpg") + '" alt=""';
  const d = cap.apertura.detalles;
  return '<div class="secuencia apertura" id="apertura-' + n + '" data-tipo="fijada" data-pantallas="3" data-fases="4" ' +
    'data-parallax data-anio="' + cap.anio + '" data-migas="' + cap.titulo + '">' +
    '<div class="escenario">' +
      (cap.apertura.foco ? '<div class="oscuridad solo-animacion" aria-hidden="true"></div>' : '') +
      '<div class="apertura-marco solo-animacion" aria-hidden="true">' +
        '<div class="capa-parallax capa-panel" data-velocidad="0.5">' +
          '<div class="lienzo">' +
            '<img class="franja" style="--franja:0" ' + img + '>' +
            '<img class="franja" style="--franja:1" ' + img + '>' +
            '<img class="franja" style="--franja:2" ' + img + '>' +
          '</div></div>' +
        htmlCapasDecorativas(cap.particula) +
        '<p class="subtitulo-secuencia">' + d[0].subtitulo + '</p>' +
        '<p class="subtitulo-secuencia">' + d[1].subtitulo + '</p>' +
      '</div>' +
      '<header class="cabecera-capitulo">' +
        '<p class="capitulo-n"><span class="capitulo-cifra" aria-hidden="true">' + n + '</span>Capítulo ' + n + ' de 6</p>' +
        '<p class="parte-respuesta"><span>Parte de la respuesta:</span> ' + cap.subpregunta + '</p>' +
        '<h2 class="titulo-capitulo" id="titulo-cap-' + n + '">' + cap.titulo + '</h2>' +
      '</header>' +
      htmlControl(4) +
    '</div></div>';
}

function htmlScrolly(cap) {
  const panel = rutaImagen("hd/panel-" + cap.panel + ".jpg");
  return '<div class="scrolly" data-capitulo="' + cap.numero + '">' +
    '<figure class="scrolly-figura">' +
      '<div class="scrolly-marco">' +
        '<img class="scrolly-ambiente" src="' + panel + '" alt="" aria-hidden="true">' +
        '<div class="scrolly-deriva">' +
          '<img class="scrolly-img activa" data-panel="' + cap.panel + '" src="' + panel + '" alt="' + cap.alt + '">' +
          '<img class="scrolly-img" data-panel="' + cap.panel + '" src="' + panel + '" alt="">' +
        '</div>' +
        '<p class="scrolly-sello" aria-hidden="true"><span class="sello-anio"></span><span class="sello-titulo"></span></p>' +
      '</div>' +
      '<p class="indicador-paso" aria-live="polite"><span class="indicador-texto">Paso 1 de 4</span>' +
        '<span class="indicador-puntos" aria-hidden="true">' + cap.pasos.map(() => '<i></i>').join("") + '</span></p>' +
    '</figure>' +
    '<div class="scrolly-pasos">' +
      cap.pasos.map((p, i) =>
        '<article class="paso" data-paso="' + (i + 1) + '" data-anio="' + p.anio + '" data-migas="' + p.titulo + '">' +
        '<h3>' + p.titulo + '</h3><p>' + marcarPalabrasClave(p.texto) + '</p></article>').join("") +
    '</div></div>' +
    '<p class="pie-imagen lectura">' + config.creditoImagenes + ' (panel ' + cap.panel + '). ' + cap.alt.replace("Ilustración: ", "") + '</p>';
}

function htmlDatosClave(cap) {
  const dc = cap.datosClave;
  let contadores = "";
  if (cap.contadores) {
    contadores = '<div class="contadores">' + cap.contadores.map(c =>
      '<p class="contador"><span class="contador-valor" data-valor="' + c.valor + '" data-formato="' + c.formato + '" data-sufijo="' + (c.sufijo || "") + '">' +
      formatearCifra(c.valor, c.formato) + (c.sufijo || "") + '</span><span class="contador-texto">' + c.texto + '</span></p>').join("") + '</div>';
  }
  return '<section class="datos-clave" aria-label="Datos clave del capítulo ' + cap.numero + '">' +
    '<h3>Datos clave</h3>' +
    '<p class="dato-destacado"><span class="dato-cifra">' + dc.destacado + '</span><span class="dato-leyenda">' + dc.leyenda + '</span></p>' +
    contadores +
    '<dl class="lista-fechas">' + dc.fechas.map(f => '<div><dt>' + f.fecha + '</dt><dd>' + f.hecho + '</dd></div>').join("") + '</dl>' +
    '</section>';
}

function htmlCita(cita) {
  return '<figure class="cita-destacada"><blockquote><p>«' + cita.texto + '»</p></blockquote>' +
    '<figcaption>' + cita.autor + ', <cite>' + cita.obra + '</cite> (' + cita.anio + ')</figcaption></figure>';
}

function htmlClip(video, titulo) {
  return '<section class="clip" data-video="' + video.id + '" aria-label="' + titulo + '">' +
    '<h3>' + titulo + '</h3>' +
    '<div class="clip-reproductor"></div>' +
    '<details class="transcripcion"><summary>Ver transcripción del video</summary><p>' + video.transcripcion + '</p></details>' +
    '</section>';
}

function htmlPuente(cap) {
  const siguiente = capitulos[cap.numero];
  const destino = siguiente ? "#capitulo-" + siguiente.numero : "#red";
  const texto = siguiente ? "Continuar con el capítulo " + siguiente.numero + ": " + siguiente.titulo : "Continuar con la red de relaciones";
  return '<div class="puente"><p>' + cap.puente + '</p><a class="boton-continuar" href="' + destino + '">' + texto + '</a></div>';
}

function htmlTransicion(siguiente) {
  return '<div class="transicion" data-tipo="pasaje" data-fases="1" id="transicion-' + siguiente.numero + '" ' +
    'style="--color-siguiente: var(--c' + siguiente.numero + ')" aria-label="Paso al capítulo ' + siguiente.numero + '">' +
    '<div class="cortina solo-animacion" aria-hidden="true"></div>' +
    '<p class="transicion-texto">Capítulo ' + siguiente.numero + ' de 6: ' + siguiente.titulo + '</p>' +
    htmlControl(1) + '</div>';
}

function calcularEnfoque(anchoMarco, altoMarco, x, y, zoom) {
  let ancho = anchoMarco;
  let alto = anchoMarco / PROPORCION_PANEL;
  if (alto > altoMarco) { alto = altoMarco; ancho = alto * PROPORCION_PANEL; }
  const anchoZ = ancho * zoom, altoZ = alto * zoom;
  const maxX = Math.max(0, (anchoZ - anchoMarco) / 2);
  const maxY = Math.max(0, (altoZ - altoMarco) / 2);
  return {
    ancho, alto, zoom,
    dx: limitar((0.5 - x / 100) * anchoZ, -maxX, maxX),
    dy: limitar((0.5 - y / 100) * altoZ, -maxY, maxY)
  };
}

function dibujarApertura(cap, avance, el) {
  const marco = el.querySelector(".apertura-marco");
  const lienzo = el.querySelector(".lienzo");
  const franjas = el.querySelectorAll(".franja");
  const subtitulos = el.querySelectorAll(".subtitulo-secuencia");
  const titular = el.querySelector(".titulo-capitulo");
  const d = cap.apertura.detalles;

  const completo = { x: 50, y: 50, zoom: 1 };
  let desde = completo, hacia = completo, t = 0;
  if (avance < 0.25) { desde = completo; hacia = completo; }
  else if (avance < 0.5) { desde = completo; hacia = d[0]; t = suavizar(tramo(avance, 0.25, 0.4)); }
  else if (avance < 0.75) { desde = d[0]; hacia = d[1]; t = suavizar(tramo(avance, 0.5, 0.64)); }
  else { desde = d[1]; hacia = completo; t = suavizar(tramo(avance, 0.75, 0.84)); }
  const x = mezclar(desde.x, hacia.x, t), y = mezclar(desde.y, hacia.y, t), zoom = mezclar(desde.zoom, hacia.zoom, t);

  const separar = suavizar(tramo(avance, 0.8, 0.95));
  const enfoque = calcularEnfoque(marco.clientWidth, marco.clientHeight, x, y, zoom * (1 - 0.1 * separar));
  lienzo.style.width = enfoque.ancho + "px";
  lienzo.style.height = enfoque.alto + "px";
  lienzo.style.transform = "translate(-50%, -50%) translate(" + enfoque.dx.toFixed(1) + "px," + enfoque.dy.toFixed(1) + "px) scale(" + enfoque.zoom.toFixed(3) + ")";

  const aparecer = suavizar(tramo(avance, 0, 0.18));
  if (cap.apertura.foco) {
    const radio = mezclar(5, 120, aparecer);
    lienzo.style.clipPath = "circle(" + radio.toFixed(1) + "% at " + cap.apertura.foco.x + "% " + cap.apertura.foco.y + "%)";
    lienzo.style.opacity = 1;
    el.querySelector(".oscuridad").style.opacity = (1 - tramo(avance, 0.16, 0.26)).toFixed(3);
  } else {
    lienzo.style.opacity = (0.25 + 0.75 * aparecer).toFixed(3);
  }

  const profundidad = motor.sin3D ? 0 : 1;
  const desplazY = [-0.16, -0.02, 0.13], desplazZ = [70, 0, -60];
  franjas.forEach((f, i) => {
    f.style.transform = "translate3d(0," + (desplazY[i] * enfoque.alto * separar).toFixed(1) + "px," + (desplazZ[i] * separar * profundidad).toFixed(1) + "px)";
  });

  subtitulos[0].style.opacity = (tramo(avance, 0.32, 0.38) * (1 - tramo(avance, 0.47, 0.5))).toFixed(3);
  subtitulos[1].style.opacity = (tramo(avance, 0.58, 0.64) * (1 - tramo(avance, 0.72, 0.75))).toFixed(3);

  const titulo = suavizar(tramo(avance, 0.82, 0.97));
  titular.style.opacity = titulo.toFixed(3);
  titular.style.transform = motor.sin3D
    ? "scale(" + (0.86 + 0.14 * titulo).toFixed(3) + ")"
    : "perspective(900px) translateZ(" + (-420 * (1 - titulo)).toFixed(1) + "px)";
}

function prepararScrollytelling() {
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      const capitulo = Number(e.target.closest(".scrolly").dataset.capitulo);
      activarPaso(capitulo, Number(e.target.dataset.paso));
    });
  }, { rootMargin: motor.celular ? "-64% 0px -26% 0px" : "-45% 0px -45% 0px" });
  document.querySelectorAll(".scrolly .paso").forEach(p => observador.observe(p));
  capitulos.forEach(cap => activarPaso(cap.numero, 1));
  motor.alActualizar.push(derivarScrollytelling);
}

function derivarScrollytelling() {
  const alto = window.innerHeight;
  document.querySelectorAll(".scrolly").forEach(bloque => {
    const deriva = bloque.querySelector(".scrolly-deriva");
    if (motor.modoLectura || motor.sin3D) { deriva.style.transform = ""; return; }
    const caja = bloque.getBoundingClientRect();
    if (caja.bottom < -alto || caja.top > alto * 2) return;
    const avance = limitar((alto * 0.5 - caja.top) / Math.max(1, caja.height), 0, 1);
    deriva.style.transform = "translate3d(0," + ((0.5 - avance) * 14).toFixed(1) + "px,0) scale(" + (1.02 + 0.05 * avance).toFixed(4) + ")";
  });
}

function activarPaso(capitulo, paso) {
  const bloque = document.querySelector('.scrolly[data-capitulo="' + capitulo + '"]');
  if (!bloque) return;
  let enfoque = pasos.find(p => p.capitulo === capitulo && p.paso === paso);
  if (!enfoque) return;
  if (motor.modoLectura) enfoque = { panel: capitulos[capitulo - 1].panel, x: 50, y: 50, zoom: 1 };
  bloque.dataset.paso = paso;
  bloque.querySelectorAll(".paso").forEach(p => p.classList.toggle("activo", Number(p.dataset.paso) === paso));
  bloque.querySelector(".indicador-texto").textContent = "Paso " + paso + " de 4";
  bloque.querySelectorAll(".indicador-puntos i").forEach((punto, i) => punto.classList.toggle("lleno", i < paso));

  const datosPaso = capitulos[capitulo - 1].pasos[paso - 1];
  const sello = bloque.querySelector(".scrolly-sello");
  sello.querySelector(".sello-anio").textContent = datosPaso.anio;
  sello.querySelector(".sello-titulo").textContent = datosPaso.titulo;
  sello.classList.remove("cambia");
  void sello.offsetWidth;
  sello.classList.add("cambia");

  const imagenes = bloque.querySelectorAll(".scrolly-img");
  let activa = bloque.querySelector(".scrolly-img.activa");
  if (activa.dataset.panel !== String(enfoque.panel)) {
    const otra = activa === imagenes[0] ? imagenes[1] : imagenes[0];
    otra.setAttribute("src", rutaImagen("hd/panel-" + enfoque.panel + ".jpg"));
    bloque.querySelector(".scrolly-ambiente").setAttribute("src", rutaImagen("hd/panel-" + enfoque.panel + ".jpg"));
    otra.dataset.panel = enfoque.panel;
    otra.setAttribute("alt", capitulos[enfoque.panel - 1].alt);
    activa.setAttribute("alt", "");
    activa.classList.remove("activa");
    otra.classList.add("activa");
    activa = otra;
  }
  const marco = bloque.querySelector(".scrolly-marco");
  const e = calcularEnfoque(marco.clientWidth, marco.clientHeight, enfoque.x, enfoque.y, enfoque.zoom);
  imagenes.forEach(img => {
    img.style.width = e.ancho + "px";
    img.style.height = e.alto + "px";
    img.style.transform = "translate(-50%, -50%) translate(" + e.dx.toFixed(1) + "px," + e.dy.toFixed(1) + "px) scale(" + e.zoom + ")";
  });
}

function reenfocarScrollytelling() {
  document.querySelectorAll(".scrolly").forEach(b => activarPaso(Number(b.dataset.capitulo), Number(b.dataset.paso || 1)));
}

function htmlConcepto(cap) {
  const c = cap.concepto;
  const visuales = { semana: htmlSemana, mapa: htmlMapa, choque: htmlChoque, calendarios: htmlCalendarios, brest: htmlBrest };
  return '<div class="secuencia concepto concepto-' + c.tipo + '" id="concepto-' + cap.numero + '" data-tipo="fijada" data-pantallas="2" ' +
    'data-fases="' + c.subtitulos.length + '" data-anio="' + c.anio + '" data-migas="' + c.titulo + '">' +
    '<div class="escenario"><div class="concepto-contenido">' +
      '<h3 class="concepto-titulo">' + c.titulo + '</h3>' +
      '<div class="concepto-visual">' + visuales[c.tipo](cap) + '</div>' +
      '<div class="subtitulos">' + c.subtitulos.map(s => '<p class="subtitulo">' + s + '</p>').join("") + '</div>' +
      '<p class="concepto-pie">' + c.pie + '</p>' +
    '</div>' + htmlControl(c.subtitulos.length) + '</div></div>';
}

function mostrarSubtitulo(el, indice) {
  el.querySelectorAll(".subtitulos .subtitulo").forEach((s, i) => s.classList.toggle("visible", i === indice));
}

function htmlSemana() {
  return '<div class="semana" role="img" aria-label="Semana de lunes a sábado: de lunes a miércoles el obrero produce el valor de su salario; de jueves a sábado produce plusvalía.">' +
    '<div class="semana-llaves"><span class="llave llave-salario">salario cubierto</span><span class="llave llave-plusvalia">plusvalía</span></div>' +
    '<div class="semana-dias">' + DIAS.map((d, i) =>
      '<div class="dia' + (i > 2 ? ' dia-plusvalia' : '') + '"><span class="dia-relleno"></span><span class="dia-nombre">' + d + '</span></div>').join("") +
    '</div><p class="semana-cierre">Lo que el obrero produce y no se le paga</p></div>';
}

function dibujarSemana(avance, el) {
  const lleno = tramo(avance, 0.06, 0.82) * 6;
  el.querySelectorAll(".dia-relleno").forEach((r, i) => {
    r.style.transform = "scaleX(" + limitar(lleno - i, 0, 1).toFixed(3) + ")";
  });
  el.querySelector(".llave-salario").style.opacity = tramo(lleno, 2.7, 3).toFixed(3);
  el.querySelector(".llave-plusvalia").style.opacity = tramo(lleno, 5.6, 6).toFixed(3);
  el.querySelector(".semana-cierre").style.opacity = tramo(avance, 0.84, 0.92).toFixed(3);
  mostrarSubtitulo(el, avance < 0.3 ? 0 : avance < 0.5 ? 1 : avance < 0.84 ? 2 : 3);
}

function htmlMapa() {
  return '<svg class="mapa" viewBox="0 0 600 340" role="img" aria-label="Mapa esquemático de Europa: Londres (1864), París (1871), los países industrializados (1889) y Rusia.">' +
    '<path class="tierra" d="M118 70 L142 78 L148 118 L158 160 L134 178 L112 170 L120 140 L106 116 Z"/>' +
    '<path class="tierra" d="M168 150 L236 118 L300 108 L330 136 L330 252 L292 300 L232 312 L184 292 L156 250 Z"/>' +
    '<path class="tierra rusia" d="M330 64 L556 40 L590 120 L580 300 L480 322 L360 302 L330 252 L330 136 Z"/>' +
    '<ellipse class="brillo-occidente" cx="210" cy="190" rx="120" ry="120"/>' +
    '<path class="brillo-rusia" d="M330 64 L556 40 L590 120 L580 300 L480 322 L360 302 L330 252 L330 136 Z"/>' +
    '<g class="punto punto-londres"><circle class="halo" cx="136" cy="150" r="22"/><circle cx="136" cy="150" r="7"/><text x="100" y="104">Londres (1864)</text></g>' +
    '<g class="punto punto-paris"><circle class="halo" cx="200" cy="210" r="22"/><circle cx="200" cy="210" r="7"/><text x="150" y="252">París (1871)</text>' +
      '<text class="derrota" x="214" y="186">aplastada</text></g>' +
    '<text class="etiqueta-occidente" x="96" y="326">1889: II Internacional y reformas</text>' +
    '<text class="etiqueta-rusia" x="420" y="190">Rusia</text>' +
    '</svg>';
}

function dibujarMapa(avance, el) {
  const apagarOccidente = tramo(avance, 0.78, 0.88);
  const londres = tramo(avance, 0.04, 0.14) * (1 - 0.8 * apagarOccidente);
  const paris = tramo(avance, 0.24, 0.34) * (1 - 0.7 * tramo(avance, 0.42, 0.52)) * (1 - 0.6 * apagarOccidente);
  el.querySelector(".punto-londres").style.opacity = (0.15 + 0.85 * londres).toFixed(3);
  el.querySelector(".punto-paris").style.opacity = (0.15 + 0.85 * paris).toFixed(3);
  el.querySelector(".derrota").style.opacity = (tramo(avance, 0.42, 0.5) * (1 - apagarOccidente)).toFixed(3);
  const occidente = tramo(avance, 0.55, 0.65) * (1 - apagarOccidente);
  el.querySelector(".brillo-occidente").style.opacity = (occidente * 0.55).toFixed(3);
  el.querySelector(".etiqueta-occidente").style.opacity = occidente.toFixed(3);
  const rusia = tramo(avance, 0.8, 0.92);
  el.querySelector(".brillo-rusia").style.opacity = (rusia * 0.75).toFixed(3);
  el.querySelector(".etiqueta-rusia").style.opacity = (0.35 + 0.65 * rusia).toFixed(3);
  mostrarSubtitulo(el, avance < 0.22 ? 0 : avance < 0.42 ? 1 : avance < 0.55 ? 2 : avance < 0.78 ? 3 : 4);
}

function htmlChoque(cap) {
  return '<div class="choque">' +
    '<div class="choque-mitades" role="img" aria-label="Panel 4 dividido: a la izquierda la procesión, a la derecha los soldados; se juntan en el centro.">' +
      '<div class="mitad mitad-izq"><img src="' + rutaImagen("panel-4.jpg") + '" alt=""></div>' +
      '<div class="mitad mitad-der"><img src="' + rutaImagen("panel-4.jpg") + '" alt=""></div>' +
    '</div>' +
    '<div class="cifras">' + cap.concepto.cifras.map(c =>
      '<p class="cifra"><span class="cifra-valor">' + c.valor + '</span><span class="cifra-fuente">' + c.fuente + '</span></p>').join("") +
    '</div></div>';
}

function dibujarChoque(avance, el) {
  const lejos = 1 - suavizar(tramo(avance, 0.04, 0.5));
  el.querySelector(".mitad-izq").style.transform = "translateX(" + (-62 * lejos).toFixed(2) + "%)";
  el.querySelector(".mitad-der").style.transform = "translateX(" + (62 * lejos).toFixed(2) + "%)";
  el.querySelectorAll(".cifra").forEach((c, i) => {
    const e = suavizar(tramo(avance, 0.56 + i * 0.1, 0.64 + i * 0.1));
    c.style.opacity = e.toFixed(3);
    c.style.transform = "translateY(" + (14 * (1 - e)).toFixed(1) + "px)";
  });
  mostrarSubtitulo(el, avance < 0.28 ? 0 : avance < 0.55 ? 1 : 2);
}

function htmlCalendarios(cap) {
  const hojas = cap.concepto.hojas;
  const hoja = (tipo, nombre, lugar) =>
    '<div class="hoja-calendario" data-calendario="' + tipo + '"><p class="calendario-nombre">' + nombre + '<small>' + lugar + '</small></p>' +
    '<div class="calendario-paginas">' + hojas.map((h, i) =>
      '<div class="calendario-pagina" data-i="' + i + '"><span class="calendario-mes">' + h[tipo].mes + '</span>' +
      '<span class="calendario-dia">' + h[tipo].dia + '</span><span class="calendario-anio">1917</span></div>').join("") +
    '</div></div>';
  return '<div class="calendarios">' +
    hoja("juliano", "Calendario juliano", "el de Rusia") +
    '<p class="calendario-diferencia"><span>+13 días</span></p>' +
    hoja("gregoriano", "Calendario gregoriano", "el nuestro") +
    '<p class="calendario-hecho">' + hojas.map((h, i) => '<span data-i="' + i + '">' + h.hecho + '</span>').join("") + '</p>' +
    '</div>';
}

function dibujarCalendarios(avance, el) {
  const pasar = suavizar(tramo(avance, 0.52, 0.66));
  el.querySelectorAll('.calendario-pagina[data-i="0"]').forEach(p => {
    p.style.transform = motor.sin3D ? "translateY(" + (-30 * pasar).toFixed(1) + "%)" : "perspective(700px) rotateX(" + (-105 * pasar).toFixed(1) + "deg)";
    p.style.opacity = (1 - tramo(pasar, 0.5, 1)).toFixed(3);
  });
  el.querySelectorAll('.calendario-pagina[data-i="1"]').forEach(p => { p.style.opacity = tramo(pasar, 0.2, 0.7).toFixed(3); });
  el.querySelector(".calendario-diferencia").style.opacity = tramo(avance, 0.12, 0.2).toFixed(3);
  el.querySelectorAll(".calendario-hecho span").forEach((s, i) => {
    s.style.opacity = (i === 0 ? tramo(avance, 0.22, 0.3) * (1 - tramo(avance, 0.5, 0.55)) : tramo(avance, 0.66, 0.74)).toFixed(3);
  });
  mostrarSubtitulo(el, avance < 0.2 ? 0 : avance < 0.55 ? 1 : 2);
}

const SILUETA_RUSIA = [
  "......rrrrrrrrrr..",
  "..pprrrrrrrrrrrrr.",
  ".ppqrrrrrrrrrrrrrr",
  ".pqqrrrrrrrrrrrrrr",
  "..qqrrrrrrrrrrrrr.",
  "...qqrrrrrrrrrrr..",
  "....uu..rrrrr.....",
  ".....uu..........."
];

function htmlBrest(cap) {
  let celdas = "";
  SILUETA_RUSIA.forEach((fila, f) => {
    fila.split("").forEach((letra, c) => {
      if (letra !== ".") celdas += '<rect class="celda celda-' + letra + '" x="' + (c * 26 + 2) + '" y="' + (f * 26 + 2) + '" width="23" height="23" rx="3"/>';
    });
  });
  return '<div class="brest">' +
    '<svg class="silueta" viewBox="0 0 472 212" role="img" aria-label="Mapa esquemático: Rusia pierde territorio en Brest-Litovsk y luego se completa con las repúblicas que forman la URSS en 1922.">' + celdas + '</svg>' +
    '<div class="brest-cifras">' +
      '<p class="brest-cifra"><span class="brest-valor" data-final="780000" data-sufijo=" km²">0 km²</span><span>de territorio perdido</span></p>' +
      '<p class="brest-cifra"><span class="brest-valor" data-final="56" data-sufijo=" millones">0 millones</span><span>de habitantes perdidos</span></p>' +
      '<p class="brest-urss">URSS, 1922</p>' +
    '</div></div>';
}

function dibujarBrest(avance, el) {
  const perder = suavizar(tramo(avance, 0.18, 0.45));
  const formar = suavizar(tramo(avance, 0.6, 0.88));
  el.querySelectorAll(".celda-p").forEach(c => {
    c.style.opacity = (1 - 0.82 * perder).toFixed(3);
    c.style.transform = "translateX(" + (-10 * perder).toFixed(1) + "px)";
  });
  el.querySelectorAll(".celda-q").forEach(c => {
    c.style.opacity = (1 - 0.82 * perder + 0.82 * formar).toFixed(3);
    c.style.transform = "translateX(" + (-10 * perder * (1 - formar)).toFixed(1) + "px)";
    c.classList.toggle("republica", formar > 0.5);
  });
  el.querySelectorAll(".celda-u").forEach(c => {
    c.style.opacity = formar.toFixed(3);
    c.classList.toggle("republica", formar > 0.5);
  });
  el.querySelectorAll(".celda-r").forEach(c => c.classList.toggle("republica", formar > 0.5));
  el.querySelectorAll(".brest-valor").forEach(v => {
    const final = Number(v.dataset.final);
    v.textContent = formatearCifra(Math.round(final * tramo(avance, 0.2, 0.48)), final > 1000 ? "miles" : "simple") + v.dataset.sufijo;
  });
  el.querySelector(".brest-urss").style.opacity = tramo(avance, 0.8, 0.9).toFixed(3);
  mostrarSubtitulo(el, avance < 0.2 ? 0 : avance < 0.58 ? 1 : 2);
}

function dibujarTransicion(avance, el) {
  el.querySelector(".cortina").style.transform = "translateX(" + mezclar(-105, 105, suavizar(tramo(avance, 0.18, 0.82))).toFixed(2) + "%)";
  const texto = Math.min(tramo(avance, 0.34, 0.44), 1 - tramo(avance, 0.62, 0.72));
  el.querySelector(".transicion-texto").style.opacity = texto.toFixed(3);
}

function formatearCifra(valor, formato) {
  if (formato === "miles") return String(valor).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return String(valor);
}

function prepararContadores() {
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      observador.unobserve(e.target);
      animarContador(e.target);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".contador-valor").forEach(c => observador.observe(c));
}

function animarContador(elemento) {
  const final = Number(elemento.dataset.valor);
  const formato = elemento.dataset.formato;
  const sufijo = elemento.dataset.sufijo || "";
  const inicio = formato === "anio" ? final - 60 : 0;
  if (motor.modoLectura) return;
  const t0 = performance.now();
  function paso(ahora) {
    const t = suavizar(limitar((ahora - t0) / 1200, 0, 1));
    elemento.textContent = formatearCifra(Math.round(mezclar(inicio, final, t)), formato) + sufijo;
    if (t < 1) requestAnimationFrame(paso);
  }
  requestAnimationFrame(paso);
}
