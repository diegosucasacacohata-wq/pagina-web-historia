const red = {
  svg: null,
  ancho: 1400,
  alto: 770,
  posiciones: {},
  filtroTipos: new Set(tiposNodo.map(t => t.id)),
  filtroCapitulo: null,
  textoBusqueda: "",
  seleccionado: null,
  pasoRecorrido: -1
};

const TRAMOS_RED = [[1510, 130], [1525, 180], [1775, 236], [1830, 400], [1875, 530], [1900, 640], [1906, 790], [1913, 880], [1916, 930], [1917.5, 1100], [1919, 1215], [1925, 1385]];
const CARRIL_ALTO = 140;
const CARRIL_INICIO = 40;
const SUBFILAS = [0, -46, 46];

function nodoPorId(id) {
  return nodos.find(n => n.id === id);
}

function fraseConexion(c) {
  if (c.frase) return c.frase;
  return nodoPorId(c.desde).nombre + " " + c.relacion + " " + nodoPorId(c.hacia).nombre;
}

function nombreTipo(tipo) {
  return tiposNodo.find(t => t.id === tipo).singular;
}

function calcularPosicionesRed() {
  red.posiciones = {};
  tiposNodo.forEach((tipo, carril) => {
    const centro = CARRIL_INICIO + carril * CARRIL_ALTO + CARRIL_ALTO / 2;
    const ultimos = [-999, -999, -999];
    nodos.filter(n => n.tipo === tipo.id)
      .map(n => ({ n, x: escalaDeTiempo(n.anio, TRAMOS_RED) }))
      .sort((a, b) => a.x - b.x)
      .forEach(({ n, x }) => {
        let fila = [0, 1, 2].find(f => x - ultimos[f] >= 84);
        if (fila === undefined) fila = ultimos.indexOf(Math.min(...ultimos));
        ultimos[fila] = x;
        red.posiciones[n.id] = { x, y: centro + SUBFILAS[fila] };
      });
  });
}

function formaNodo(n) {
  if (n.tipo === "causa") return '<polygon class="forma" points="0,-16 16,0 0,16 -16,0"/>';
  if (n.tipo === "idea") {
    const puntos = [0, 1, 2, 3, 4, 5].map(i => {
      const a = Math.PI / 3 * i;
      return (15 * Math.cos(a)).toFixed(1) + "," + (15 * Math.sin(a)).toFixed(1);
    }).join(" ");
    return '<polygon class="forma" points="' + puntos + '"/>';
  }
  if (n.tipo === "actor") return '<circle class="forma" r="16"/><text class="iniciales" dy="0.35em">' + n.iniciales + '</text>';
  if (n.tipo === "acontecimiento") return '<circle class="forma" r="12"/>';
  return '<rect class="forma" x="-12" y="-12" width="24" height="24" rx="5"/>';
}

function dibujarRed() {
  red.svg = document.getElementById("red-svg");
  calcularPosicionesRed();
  let html = '<defs>' +
    '<marker id="flecha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="punta"/></marker>' +
    '<marker id="flecha-activa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="punta-activa"/></marker>' +
    '</defs>';

  tiposNodo.forEach((tipo, i) => {
    const y = CARRIL_INICIO + i * CARRIL_ALTO;
    html += '<g class="carril-fondo" data-tipo="' + tipo.id + '">' +
      '<rect x="0" y="' + y + '" width="' + red.ancho + '" height="' + CARRIL_ALTO + '" class="' + (i % 2 ? "carril-par" : "carril-impar") + '"/>' +
      '<text class="carril-nombre" x="12" y="' + (y + 22) + '">' + tipo.nombre + '</text></g>';
  });

  const yEje = CARRIL_INICIO + 5 * CARRIL_ALTO + 18;
  html += '<g class="eje">';
  [1516, 1780, 1800, 1825, 1850, 1875, 1900, 1905, 1910, 1914, 1917, 1920, 1924].forEach(a => {
    const x = escalaDeTiempo(a, TRAMOS_RED);
    html += '<line x1="' + x + '" x2="' + x + '" y1="' + CARRIL_INICIO + '" y2="' + (yEje - 10) + '" class="eje-guia"/>' +
      '<text x="' + x + '" y="' + yEje + '" class="eje-anio">' + a + '</text>';
  });
  const xCorte = (escalaDeTiempo(1525, TRAMOS_RED) + escalaDeTiempo(1775, TRAMOS_RED)) / 2;
  html += '<rect x="' + (xCorte - 10) + '" y="' + CARRIL_INICIO + '" width="20" height="' + (5 * CARRIL_ALTO) + '" class="corte"/>' +
    '<text x="' + xCorte + '" y="' + (yEje + 2) + '" class="corte-texto">// 1525–1775</text></g>';

  html += '<g class="aristas">';
  conexiones.forEach((c, i) => {
    const a = red.posiciones[c.desde], b = red.posiciones[c.hacia];
    const dx = b.x - a.x, dy = b.y - a.y;
    const largo = Math.hypot(dx, dy) || 1;
    const fin = { x: b.x - dx / largo * 19, y: b.y - dy / largo * 19 };
    const inicio = { x: a.x + dx / largo * 17, y: a.y + dy / largo * 17 };
    const curva = Math.min(60, largo * 0.18) * (i % 2 ? 1 : -1);
    const control = { x: (inicio.x + fin.x) / 2 - dy / largo * curva, y: (inicio.y + fin.y) / 2 + dx / largo * curva };
    html += '<path class="arista" data-desde="' + c.desde + '" data-hacia="' + c.hacia + '" pathLength="1" ' +
      'd="M' + inicio.x.toFixed(1) + ',' + inicio.y.toFixed(1) + ' Q' + control.x.toFixed(1) + ',' + control.y.toFixed(1) + ' ' + fin.x.toFixed(1) + ',' + fin.y.toFixed(1) + '"/>';
  });
  html += '</g>';

  tiposNodo.forEach(tipo => {
    html += '<g class="carril-nodos" data-tipo="' + tipo.id + '">';
    nodos.filter(n => n.tipo === tipo.id).forEach(n => {
      const p = red.posiciones[n.id];
      html += '<g class="nodo" data-id="' + n.id + '" data-capitulo="' + n.capitulo + '" transform="translate(' + p.x.toFixed(1) + ',' + p.y.toFixed(1) + ')" ' +
        'tabindex="0" role="button" aria-label="' + n.nombre + ', ' + nombreTipo(n.tipo) + ', capítulo ' + n.capitulo + ', ' + n.fechaTexto + '" style="--color: var(--c' + n.capitulo + ')">' +
        '<g class="nodo-cuerpo">' + formaNodo(n) + '</g>' +
        '<text class="etiqueta-corta" y="30">' + (n.corto || n.nombre) + '</text>' +
        '<text class="etiqueta-larga" y="30">' + n.nombre + '</text></g>';
    });
    html += '</g>';
  });
  red.svg.innerHTML = html;

  red.svg.querySelectorAll(".nodo").forEach(g => {
    g.addEventListener("click", () => mostrarDetalleNodo(g.dataset.id));
    g.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); mostrarDetalleNodo(g.dataset.id); }
    });
  });

  construirHerramientasRed();
  construirLeyendaRed();
  construirListaRed();
  registrarSecuencia(document.getElementById("red-secuencia"), dibujarMontajeRed);
}

function dibujarMontajeRed(avance) {
  red.svg.querySelectorAll(".carril-nodos").forEach((g, i) => {
    const e = suavizar(tramo(avance, 0.03 + i * 0.12, 0.17 + i * 0.12));
    g.style.opacity = e.toFixed(3);
    red.svg.querySelectorAll('.carril-fondo[data-tipo="' + g.dataset.tipo + '"] text')[0].style.opacity = (0.35 + 0.65 * e).toFixed(3);
  });
  const aristas = red.svg.querySelector(".aristas");
  aristas.style.opacity = tramo(avance, 0.62, 0.7).toFixed(3);
  aristas.style.setProperty("--dibujado", (1 - tramo(avance, 0.64, 0.92)).toFixed(3));
  const lista = avance >= 0.95;
  const escenario = document.getElementById("red-escenario");
  escenario.classList.toggle("montada", lista);
  document.getElementById("red-herramientas").inert = !lista;
  const textos = ["Primero, las causas", "Luego, las ideas y las obras", "Los actores", "Los acontecimientos", "Y sus consecuencias",
    "Las flechas dicen qué provocó qué", "Lista: toca un nodo para ver sus conexiones"];
  const indice = avance < 0.15 ? 0 : avance < 0.27 ? 1 : avance < 0.39 ? 2 : avance < 0.51 ? 3 : avance < 0.63 ? 4 : avance < 0.95 ? 5 : 6;
  document.getElementById("red-subtitulo").textContent = textos[indice];
}

function mostrarDetalleNodo(id) {
  const n = nodoPorId(id);
  if (!n) return;
  red.seleccionado = id;
  red.pasoRecorrido = -1;
  resaltarConexiones(id);
  const entrantes = conexiones.filter(c => c.hacia === id);
  const salientes = conexiones.filter(c => c.desde === id);
  const panel = document.getElementById("red-panel");
  panel.hidden = false;
  panel.style.setProperty("--color", "var(--c" + n.capitulo + ")");
  panel.style.setProperty("--tinta-cap", "var(--t" + n.capitulo + ")");
  panel.innerHTML =
    '<button type="button" class="panel-cerrar" aria-label="Cerrar">×</button>' +
    '<p class="panel-tipo">' + nombreTipo(n.tipo) + ', capítulo ' + n.capitulo + ', ' + n.fechaTexto + '</p>' +
    '<h3 class="panel-titulo">' + n.nombre + '</h3>' +
    '<p>' + n.descripcion + '</p>' +
    (salientes.length + entrantes.length ? '<h4>Conexiones</h4><ul class="panel-conexiones">' +
      salientes.concat(entrantes).map(c => '<li>' + fraseConexion(c) + '</li>').join("") + '</ul>' : '') +
    '<p class="panel-fuente">Fuente: ' + n.fuente + '</p>' +
    '<a class="boton-pequeno" href="#capitulo-' + n.capitulo + '">Ir al capítulo ' + n.capitulo + '</a>';
  panel.querySelector(".panel-cerrar").addEventListener("click", cerrarPanelRed);
  ubicarPanelRed(id);
}

function ubicarPanelRed(id) {
  const panel = document.getElementById("red-panel");
  panel.classList.toggle("a-la-izquierda", red.posiciones[id].x > red.ancho / 2);
}

function resaltarConexiones(id) {
  const vecinos = new Set([id]);
  conexiones.forEach(c => {
    if (c.desde === id) vecinos.add(c.hacia);
    if (c.hacia === id) vecinos.add(c.desde);
  });
  red.svg.classList.add("hay-seleccion");
  red.svg.querySelectorAll(".nodo").forEach(g => {
    g.classList.toggle("resaltado", vecinos.has(g.dataset.id));
    g.classList.toggle("elegido", g.dataset.id === id);
  });
  red.svg.querySelectorAll(".arista").forEach(a => {
    a.classList.toggle("resaltada", a.dataset.desde === id || a.dataset.hacia === id);
  });
}

function cerrarPanelRed() {
  red.seleccionado = null;
  red.pasoRecorrido = -1;
  document.getElementById("red-panel").hidden = true;
  red.svg.classList.remove("hay-seleccion");
  red.svg.querySelectorAll(".resaltado, .elegido, .resaltada").forEach(e => e.classList.remove("resaltado", "elegido", "resaltada"));
}

function aplicarFiltrosRed() {
  const texto = red.textoBusqueda.trim().toLowerCase();
  const visibles = new Set();
  red.svg.querySelectorAll(".nodo").forEach(g => {
    const n = nodoPorId(g.dataset.id);
    const pasaTipo = red.filtroTipos.has(n.tipo);
    const pasaCapitulo = red.filtroCapitulo === null || n.capitulo === red.filtroCapitulo;
    const pasaTexto = texto === "" || n.nombre.toLowerCase().includes(texto);
    const visible = pasaTipo && pasaCapitulo;
    g.classList.toggle("filtrado", !visible);
    g.classList.toggle("no-coincide", visible && !pasaTexto);
    g.classList.toggle("coincide", visible && texto !== "" && pasaTexto);
    if (visible) visibles.add(n.id);
  });
  red.svg.querySelectorAll(".arista").forEach(a => {
    a.classList.toggle("filtrada", !(visibles.has(a.dataset.desde) && visibles.has(a.dataset.hacia)));
  });
}

function filtrarRedPorTipo(tipos) {
  red.filtroTipos = new Set(tipos);
  aplicarFiltrosRed();
}

function filtrarRedPorCapitulo(n) {
  red.filtroCapitulo = n;
  document.querySelectorAll(".red-capitulo").forEach(b => {
    const valor = b.dataset.capitulo === "todos" ? null : Number(b.dataset.capitulo);
    b.setAttribute("aria-pressed", String(valor === n));
  });
  aplicarFiltrosRed();
}

function buscarNodo(texto) {
  red.textoBusqueda = texto;
  aplicarFiltrosRed();
  const t = texto.trim().toLowerCase();
  const encontrados = t.length >= 3 ? nodos.filter(n => n.nombre.toLowerCase().includes(t)) : [];
  const aviso = document.getElementById("red-aviso-busqueda");
  aviso.textContent = t === "" ? "" : encontrados.length === 0 ? "Ningún nodo coincide con «" + texto + "»." : encontrados.length + " nodo(s) coinciden.";
  if (encontrados.length === 1) mostrarDetalleNodo(encontrados[0].id);
}

function avanzarRecorrido(paso) {
  red.pasoRecorrido = limitar(paso, 0, recorrido.length - 1);
  const actual = recorrido[red.pasoRecorrido];
  const vistos = new Set();
  recorrido.slice(0, red.pasoRecorrido + 1).forEach(p => p.nodos.forEach(id => vistos.add(id)));
  red.svg.classList.add("hay-seleccion");
  red.svg.querySelectorAll(".nodo").forEach(g => {
    g.classList.toggle("resaltado", vistos.has(g.dataset.id));
    g.classList.toggle("elegido", actual.nodos.includes(g.dataset.id));
  });
  red.svg.querySelectorAll(".arista").forEach(a => {
    a.classList.toggle("resaltada", vistos.has(a.dataset.desde) && vistos.has(a.dataset.hacia));
  });
  const panel = document.getElementById("red-panel");
  const primero = nodoPorId(actual.nodos[0]);
  panel.hidden = false;
  panel.style.setProperty("--color", "var(--c" + primero.capitulo + ")");
  panel.style.setProperty("--tinta-cap", "var(--t" + primero.capitulo + ")");
  panel.innerHTML =
    '<button type="button" class="panel-cerrar" aria-label="Salir del recorrido">×</button>' +
    '<p class="panel-tipo">Recorrido guiado: paso ' + (red.pasoRecorrido + 1) + ' de ' + recorrido.length + '</p>' +
    '<h3 class="panel-titulo">' + actual.nodos.map(id => nodoPorId(id).nombre).join(" y ") + '</h3>' +
    '<p>' + actual.frase + '</p>' +
    '<div class="panel-botones">' +
      '<button type="button" class="boton-pequeno" data-recorrido="-1"' + (red.pasoRecorrido === 0 ? " disabled" : "") + '>Anterior</button>' +
      '<button type="button" class="boton-pequeno" data-recorrido="1"' + (red.pasoRecorrido === recorrido.length - 1 ? " disabled" : "") + '>Siguiente</button>' +
    '</div>';
  panel.querySelector(".panel-cerrar").addEventListener("click", cerrarPanelRed);
  ubicarPanelRed(actual.nodos[0]);
  panel.querySelectorAll("[data-recorrido]").forEach(b => b.addEventListener("click", () => {
    avanzarRecorrido(red.pasoRecorrido + Number(b.dataset.recorrido));
    const siguiente = panel.querySelector('[data-recorrido="' + b.dataset.recorrido + '"]');
    if (siguiente && !siguiente.disabled) siguiente.focus();
  }));
}

function construirHerramientasRed() {
  const caja = document.getElementById("red-herramientas");
  caja.innerHTML =
    '<div class="red-fila">' +
      '<label class="red-buscar"><span>Buscar</span><input type="search" id="red-buscador" placeholder="Nombre de un nodo" autocomplete="off"></label>' +
      '<button type="button" class="boton-pequeno" id="red-boton-recorrido">Recorrido guiado: De la utopía al Estado</button>' +
      '<button type="button" class="boton-pequeno boton-borde" id="red-boton-lista" aria-expanded="false" aria-controls="red-lista">Vista de lista</button>' +
      '<span class="red-aviso" id="red-aviso-busqueda" aria-live="polite"></span>' +
    '</div>' +
    '<details class="red-filtros" id="red-filtros"><summary>Filtros</summary><div class="red-fila">' +
      '<fieldset class="red-tipos"><legend>Tipo</legend>' + tiposNodo.map(t =>
        '<label><input type="checkbox" value="' + t.id + '" checked> ' + t.nombre + '</label>').join("") + '</fieldset>' +
      '<fieldset class="red-capitulos"><legend>Capítulo</legend>' +
        '<button type="button" class="red-capitulo" data-capitulo="todos" aria-pressed="true">Todos</button>' +
        capitulos.map(c => '<button type="button" class="red-capitulo" data-capitulo="' + c.numero + '" aria-pressed="false" style="--color: var(--c' + c.numero + ')" title="' + c.titulo + '">' + c.numero + '</button>').join("") +
      '</fieldset></div></details>';

  if (window.matchMedia("(min-width: 768px)").matches) caja.querySelector("#red-filtros").open = true;

  caja.querySelectorAll(".red-tipos input").forEach(casilla => casilla.addEventListener("change", () => {
    filtrarRedPorTipo(Array.from(caja.querySelectorAll(".red-tipos input:checked")).map(c => c.value));
  }));
  caja.querySelectorAll(".red-capitulo").forEach(b => b.addEventListener("click", () => {
    filtrarRedPorCapitulo(b.dataset.capitulo === "todos" ? null : Number(b.dataset.capitulo));
  }));
  caja.querySelector("#red-buscador").addEventListener("input", e => buscarNodo(e.target.value));
  caja.querySelector("#red-boton-recorrido").addEventListener("click", () => avanzarRecorrido(0));
  caja.querySelector("#red-boton-lista").addEventListener("click", e => {
    const lista = document.getElementById("red-lista");
    lista.hidden = !lista.hidden;
    e.currentTarget.setAttribute("aria-expanded", String(!lista.hidden));
    if (!lista.hidden) lista.scrollIntoView({ block: "start" });
  });
}

function construirLeyendaRed() {
  const formas = { causa: "◆", idea: "⬢", actor: "Ⓐ", acontecimiento: "●", consecuencia: "■" };
  document.getElementById("red-leyenda").innerHTML =
    '<span class="leyenda-grupo">' + tiposNodo.map(t => '<span><b aria-hidden="true">' + formas[t.id] + '</b> ' + t.singular + '</span>').join("") + '</span>' +
    '<span class="leyenda-grupo">' + capitulos.map(c => '<span><i style="background: var(--c' + c.numero + ')"></i>Cap. ' + c.numero + '</span>').join("") + '</span>';
}

function construirListaRed() {
  const lista = document.getElementById("red-lista");
  lista.innerHTML = '<h3>Red en forma de lista</h3>' + tiposNodo.map(t =>
    '<h4>' + t.nombre + '</h4><ul class="lista-nodos">' + nodos.filter(n => n.tipo === t.id).map(n => {
      const frases = conexiones.filter(c => c.desde === n.id || c.hacia === n.id).map(fraseConexion);
      return '<li style="--tinta-cap: var(--t' + n.capitulo + ')"><strong>' + n.nombre + '</strong> <span class="lista-meta">(capítulo ' + n.capitulo + ', ' + n.fechaTexto + ')</span>. ' +
        n.descripcion + (frases.length ? '<ul>' + frases.map(f => '<li>' + f + '</li>').join("") + '</ul>' : '') + '</li>';
    }).join("") + '</ul>').join("");
}

function irARedFiltrada(capitulo) {
  cerrarPanelRed();
  filtrarRedPorCapitulo(capitulo);
  saltarAnimacion(document.getElementById("red-secuencia"));
}
