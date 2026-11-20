function prepararComprueba() {
  document.querySelectorAll(".comprueba").forEach(caja => {
    const capitulo = Number(caja.dataset.capitulo);
    const p = preguntas.find(q => q.capitulo === capitulo);
    if (!p) return;
    const letras = ["a", "b", "c", "d"];
    caja.innerHTML =
      '<h3>Comprueba</h3>' +
      '<p class="comprueba-enunciado" id="enunciado-' + capitulo + '">' + p.enunciado + '</p>' +
      '<div class="comprueba-opciones" role="group" aria-labelledby="enunciado-' + capitulo + '">' +
        p.opciones.map((o, i) =>
          '<button type="button" class="opcion" data-opcion="' + i + '"><span class="opcion-letra" aria-hidden="true">' + letras[i] + ')</span> ' + o + '</button>' +
          '<p class="opcion-explicacion" id="explicacion-' + capitulo + '-' + i + '" hidden></p>').join("") +
      '</div>' +
      '<p class="comprueba-resultado" aria-live="polite"></p>';
    caja.querySelectorAll(".opcion").forEach(b => {
      b.addEventListener("click", () => comprobarRespuesta(capitulo, Number(b.dataset.opcion)));
    });
  });
}

function comprobarRespuesta(capitulo, opcion) {
  const p = preguntas.find(q => q.capitulo === capitulo);
  const caja = document.querySelector('.comprueba[data-capitulo="' + capitulo + '"]');
  const acerto = opcion === p.correcta;
  caja.querySelectorAll(".opcion").forEach((b, i) => {
    b.classList.toggle("correcta", i === p.correcta);
    b.classList.toggle("incorrecta", i === opcion && !acerto);
    b.classList.toggle("elegida", i === opcion);
    b.setAttribute("aria-describedby", "explicacion-" + capitulo + "-" + i);
    const explicacion = caja.querySelector("#explicacion-" + capitulo + "-" + i);
    explicacion.textContent = p.explicaciones[i];
    explicacion.hidden = false;
    explicacion.classList.toggle("es-correcta", i === p.correcta);
  });
  caja.querySelector(".comprueba-resultado").textContent = acerto
    ? "¡Bien! " + p.explicaciones[opcion]
    : "Todavía no. " + p.explicaciones[opcion] + " Revisa la opción marcada como correcta.";
}
