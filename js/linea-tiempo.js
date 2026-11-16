// =====================================================================
// linea-tiempo.js — Línea de tiempo interactiva (1516–1924)
// Nivel 4/5: la sección queda fija y, al bajar, la línea avanza de 1516 a 1924.
// Los botones ← → y las flechas del teclado siguen funcionando: llevan a la
// fecha anterior o siguiente. En «Modo lectura» la línea se mueve sola con los botones.
// =====================================================================
const lt = {
  ventana: null,
  pista: null,
  anchoContenido: 2700,   // largo de la línea en píxeles
  seleccionado: null,
  filtroCapitulo: null,
  filtroTipos: new Set(tiposEvento.map(t => t.id)),
  anioCentro: 1516,
  activa: false           // true mientras el escenario está fijo en pantalla
};

// Escala del tiempo de la línea: [año, posición en píxeles]. El tramo 1522–1775 va comprimido.
const TRAMOS_LT = [[1510, 80], [1522, 200], [1775, 300], [1830, 620], [1875, 900], [1900, 1140], [1906, 1460], [1913, 1640], [1916, 1760], [1918.6, 2400], [1925, 2620]];
const FILAS_LT = [-1, 1, -2, 2];   // filas de etiquetas: arriba 1, abajo 1, arriba 2, abajo 2

// Busca un evento por su id
function eventoPorId(id) {
  return eventos.find(e => e.id === id);
}

// Eventos que pasan los filtros, en orden de tiempo
function eventosVisibles() {
  return eventos
    .filter(e => (lt.filtroCapitulo === null || e.capitulo === lt.filtroCapitulo) && lt.filtroTipos.has(e.tipo))
    .sort((a, b) => a.posicion - b.posicion);
}

// Fecha que se muestra en la etiqueta (en 1905 y 1917, con los dos calendarios)
function fechaCorta(e) {
  if (e.fechaGregoriana && e.fechaJuliana !== e.fechaGregoriana) return e.fechaJuliana + " (" + e.fechaGregoriana + ")";
  return e.fecha;
}

// ---------- Dibujo ----------

// Dibuja la línea: eje, corte comprimido, marcas de décadas y un botón por cada fecha
function dibujarLineaTiempo() {
  lt.ventana = document.getElementById("lt-ventana");
  lt.pista = document.getElementById("lt-pista");
  let html = '<div class="lt-eje"></div>';

  // Corte visible del tramo 1522–1775
  const xCorte = escalaDeTiempo(1650, TRAMOS_LT);
  html += '<div class="lt-corte" style="left:' + xCorte + 'px"><span>1522–1775</span></div>';

  // Marcas de años
  [1516, 1780, 1800, 1820, 1840, 1860, 1880, 1900, 1905, 1910, 1915, 1920].forEach(a => {
    html += '<span class="lt-marca" style="left:' + escalaDeTiempo(a, TRAMOS_LT) + 'px">' + a + '</span>';
  });

  // Fechas: se reparten en 4 filas para que las etiquetas no se tapen
  const ultimos = [-999, -999, -999, -999];
  eventos.slice().sort((a, b) => a.posicion - b.posicion).forEach(e => {
    const x = escalaDeTiempo(e.posicion, TRAMOS_LT);
    let fila = [0, 1, 2, 3].find(f => x - ultimos[f] >= 150);
    if (fila === undefined) fila = ultimos.indexOf(Math.min(...ultimos));
    ultimos[fila] = x;
    html += '<button type="button" class="lt-evento" data-id="' + e.id + '" data-fila="' + FILAS_LT[fila] + '" data-capitulo="' + e.capitulo + '" ' +
      'style="left:' + x + 'px; --color: var(--c' + e.capitulo + '); --tinta-cap: var(--t' + e.capitulo + ')" ' +
      'aria-label="' + fechaCorta(e) + ': ' + e.titulo + '">' +
      '<span class="lt-punto" aria-hidden="true"></span>' +
      '<span class="lt-etiqueta"><span class="lt-fecha">' + fechaCorta(e) + '</span><span class="lt-titulo">' + e.titulo + '</span></span></button>';
  });
  lt.pista.innerHTML = html;
  lt.pista.style.setProperty("--ancho", lt.anchoContenido + "px");

  // Eventos: clic en una fecha, botones ← → y flechas del teclado
  lt.pista.querySelectorAll(".lt-evento").forEach(b => b.addEventListener("click", () => {
    mostrarFichaEvento(b.dataset.id);
    centrarEvento(b.dataset.id);
  }));
  document.getElementById("lt-anterior").addEventListener("click", () => moverSeleccion(-1));
  document.getElementById("lt-siguiente").addEventListener("click", () => moverSeleccion(1));
  lt.ventana.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") { e.preventDefault(); moverSeleccion(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); moverSeleccion(1); }
  });

  construirFiltrosLinea();
  mostrarFichaEvento(eventos[0].id);
  registrarSecuencia(document.getElementById("lt-secuencia"), dibujarAvanceLinea);
}

// Secuencia: al bajar, la línea se desplaza de 1516 a 1924
function dibujarAvanceLinea(avance) {
  if (motor.modoLectura) {
    lt.pista.style.transform = "";
    return;
  }
  const x = avance * lt.anchoContenido;
  lt.pista.style.transform = "translateX(" + (-x).toFixed(1) + "px)";
  lt.anioCentro = Math.floor(anioDesdePosicion(x, TRAMOS_LT));
  document.getElementById("lt-anio-centro").textContent = lt.anioCentro > 1525 && lt.anioCentro < 1775 ? "…" : lt.anioCentro;
  // La fecha que pasa por el centro se marca y abre su ficha
  let cercano = null, distancia = 70;
  eventosVisibles().forEach(e => {
    const d = Math.abs(escalaDeTiempo(e.posicion, TRAMOS_LT) - x);
    if (d < distancia) { distancia = d; cercano = e; }
  });
  lt.pista.querySelectorAll(".lt-evento").forEach(b => b.classList.toggle("en-centro", cercano !== null && b.dataset.id === cercano.id));
  if (cercano && cercano.id !== lt.seleccionado) mostrarFichaEvento(cercano.id);
}

// ---------- Interacción ----------

// Muestra la ficha de una fecha: qué pasó, por qué importa, fuente y botones
function mostrarFichaEvento(id) {
  const e = eventoPorId(id);
  if (!e) return;
  lt.seleccionado = id;
  lt.pista.querySelectorAll(".lt-evento").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.id === id)));
  const cap = capitulos[e.capitulo - 1];
  const igual = e.fechaGregoriana && e.fechaJuliana === e.fechaGregoriana;
  const fechas = igual
    ? '<p class="ficha-fechas"><span><b>' + e.fechaJuliana + '</b> (el mismo mes en los dos calendarios)</span></p>'
    : e.fechaGregoriana
    ? '<p class="ficha-fechas"><span>Calendario juliano (Rusia): <b>' + e.fechaJuliana + '</b></span><span>Calendario gregoriano (el nuestro): <b>' + e.fechaGregoriana + '</b></span></p>'
    : '<p class="ficha-fechas"><b>' + e.fecha + '</b></p>';
  const ficha = document.getElementById("lt-ficha");
  ficha.style.setProperty("--color", "var(--c" + e.capitulo + ")");
  ficha.style.setProperty("--tinta-cap", "var(--t" + e.capitulo + ")");
  ficha.innerHTML =
    '<p class="ficha-capitulo">Capítulo ' + e.capitulo + ': ' + cap.titulo + '</p>' +
    '<h3 class="ficha-titulo">' + e.titulo + '</h3>' + fechas +
    '<p><b>Qué pasó.</b> ' + e.que + '</p>' +
    '<p><b>Por qué importa para la pregunta central.</b> ' + e.porQue + '</p>' +
    '<p class="ficha-fuente">Fuente: ' + e.fuente + '</p>' +
    '<p class="ficha-botones"><button type="button" class="boton-pequeno" data-nodo="' + e.nodo + '">Ver en la red</button>' +
    '<a class="boton-pequeno boton-borde" href="#capitulo-' + e.capitulo + '">Ir al capítulo ' + e.capitulo + '</a></p>';
  ficha.querySelector("[data-nodo]").addEventListener("click", () => irANodoRed(e.nodo));
}

// Lleva la fecha al centro de la línea: en la secuencia, mueve la página; en modo lectura, la línea
function centrarEvento(id) {
  const e = eventoPorId(id);
  const x = escalaDeTiempo(e.posicion, TRAMOS_LT);
  const seccion = document.getElementById("lt-secuencia");
  if (motor.modoLectura) {
    lt.ventana.scrollTo({ left: x, behavior: "smooth" });   // con el margen de media ventana, x queda al centro
    return;
  }
  seccion.dataset.saltada = "false";
  const avance = x / lt.anchoContenido;
  const arriba = seccion.getBoundingClientRect().top + window.scrollY;
  const recorridoSeccion = seccion.offsetHeight - (window.innerHeight - motor.altoBarra);
  window.scrollTo({ top: arriba - motor.altoBarra + avance * recorridoSeccion + 1, behavior: "auto" });
}

// Pasa a la fecha anterior (-1) o siguiente (+1) entre las visibles
function moverSeleccion(direccion) {
  const lista = eventosVisibles();
  if (lista.length === 0) return;
  let indice = lista.findIndex(e => e.id === lt.seleccionado);
  indice = indice === -1 ? 0 : limitar(indice + direccion, 0, lista.length - 1);
  mostrarFichaEvento(lista[indice].id);
  centrarEvento(lista[indice].id);
}

// Filtra las fechas por capítulo (null = todos) y por los tipos marcados
function filtrarEventos(capitulo) {
  lt.filtroCapitulo = capitulo;
  document.querySelectorAll(".lt-capitulo").forEach(b => {
    const valor = b.dataset.capitulo === "todos" ? null : Number(b.dataset.capitulo);
    b.setAttribute("aria-pressed", String(valor === capitulo));
  });
  const visibles = new Set(eventosVisibles().map(e => e.id));
  lt.pista.querySelectorAll(".lt-evento").forEach(b => b.classList.toggle("oculto", !visibles.has(b.dataset.id)));
  const aviso = document.getElementById("lt-aviso");
  aviso.textContent = visibles.size === 0 ? "Ninguna fecha cumple los filtros. Marca otro tipo o elige «Todos»." : visibles.size + " fechas visibles.";
}

// Arma los filtros de la línea: botones por capítulo y casillas por tipo de hecho
function construirFiltrosLinea() {
  const caja = document.getElementById("lt-filtros");
  caja.innerHTML = '<summary>Filtros</summary><div class="lt-filtros-fila">' +
    '<fieldset><legend>Capítulo</legend><button type="button" class="lt-capitulo" data-capitulo="todos" aria-pressed="true">Todos</button>' +
    capitulos.map(c => '<button type="button" class="lt-capitulo" data-capitulo="' + c.numero + '" aria-pressed="false" style="--color: var(--c' + c.numero + ')" title="' + c.titulo + '">' + c.numero + '</button>').join("") +
    '</fieldset><fieldset class="lt-tipos"><legend>Tipo de hecho</legend>' +
    tiposEvento.map(t => '<label><input type="checkbox" value="' + t.id + '" checked> ' + t.nombre + '</label>').join("") +
    '</fieldset><span id="lt-aviso" class="lt-aviso" aria-live="polite"></span></div>';
  if (window.matchMedia("(min-width: 768px)").matches) caja.open = true;
  caja.querySelectorAll(".lt-capitulo").forEach(b => b.addEventListener("click", () => {
    filtrarEventos(b.dataset.capitulo === "todos" ? null : Number(b.dataset.capitulo));
  }));
  caja.querySelectorAll(".lt-tipos input").forEach(c => c.addEventListener("change", () => {
    lt.filtroTipos = new Set(Array.from(caja.querySelectorAll(".lt-tipos input:checked")).map(x => x.value));
    filtrarEventos(lt.filtroCapitulo);
  }));
}

// Desde un capítulo: abre la línea en la primera fecha de ese capítulo
function irALineaDelCapitulo(capitulo) {
  filtrarEventos(null);
  const primero = eventos.filter(e => e.capitulo === capitulo).sort((a, b) => a.posicion - b.posicion)[0];
  mostrarFichaEvento(primero.id);
  if (motor.modoLectura) {
    document.getElementById("linea-tiempo").scrollIntoView();
  }
  centrarEvento(primero.id);
  lt.ventana.focus({ preventScroll: true });
}

// Desde la línea de tiempo: abre la red ya armada con el nodo seleccionado
function irANodoRed(id) {
  cerrarPanelRed();
  filtrarRedPorCapitulo(null);
  saltarAnimacion(document.getElementById("red-secuencia"));
  mostrarDetalleNodo(id);
}
