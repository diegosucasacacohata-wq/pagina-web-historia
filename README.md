# Del «no-lugar» al Estado: el socialismo de 1516 a 1924

Webdoc del **Grupo 2** del proyecto *Historia Conectada* (Historia de Occidente + Ciencias de la Computación, UCSP).
Pregunta central: **¿Cómo pasó el socialismo de ser una utopía a convertirse en el primer Estado comunista del mundo?**

*Una isla imaginaria, cuatro siglos y una revolución.*

- **Finalidad:** educativa y divulgativa. Explicar, con fuentes académicas y documentos de época, cómo el socialismo pasó de ser una idea a convertirse en un Estado (1516–1924).
- **Público:** estudiantes de los primeros ciclos de universidad y de los últimos años de secundaria, sin conocimientos previos.
- **Ver en línea:** https://diegosucasacacohata-wq.github.io/pagina-web-historia/
- **Código fuente:** https://github.com/diegosucasacacohata-wq/pagina-web-historia

Versión: **Nivel 5 (máximo)** de efectos de scroll: secuencias fijadas estilo Apple, parallax de 4 capas y el «cubo de los seis pasos».

## Cómo abrirlo

Doble clic en `index.html`. No necesita instalar nada ni un servidor. Las fuentes tipográficas vienen de Google Fonts; sin internet, la página usa las del sistema.

## Cómo subirlo a GitHub y verlo en línea

Ya está publicado (enlaces arriba). Para actualizarlo después de un cambio, desde esta carpeta: `git add -A`, `git commit -m "qué cambió"` y `git push`. Si alguien del grupo quiere publicar su propia copia:

1. En github.com: **New repository**, nombre por ejemplo `pagina-web-historia`, **Public** (GitHub Pages gratis necesita un repositorio público) y sin README (este ya lo trae).
2. En el repositorio vacío: **uploading an existing file**. Arrastra el **contenido** de esta carpeta (`index.html`, `README.md`, `FUENTES.md`, `GUIA-SUSTENTACION.md`, `.gitignore` y las carpetas `css`, `js`, `img`, `video`), no la carpeta entera. Cada archivo pesa menos de 25 MB, el límite de la subida por la web. Escribe un mensaje y pulsa **Commit changes**.
3. Para tener un enlace público: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`, **Save**. En uno o dos minutos la página queda en `https://TU-USUARIO.github.io/pagina-web-historia/`.
4. Pega ese enlace en `config.repositorio` (`js/datos.js`) y arriba en «Ver en línea», y sube de nuevo `js/datos.js` y `README.md`.

Antes de publicar: completen la declaración de uso de IA (ver «Qué editar antes de entregar»).

## Archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Estructura de los 7 bloques en el orden de la rúbrica (los videos van dentro del Inicio, de cada capítulo y de Conclusiones) |
| `css/estilos.css` | Diseño: colores por capítulo, tipografía, secuencias, modo lectura y modo oscuro |
| `js/datos.js` | **Todas las estructuras de datos** (arreglos de objetos): capítulos, pasos, nodos, conexiones, eventos, preguntas, fuentes |
| `js/motor-scroll.js` | Motor de scroll sin librerías: avance de secuencias, parallax, «Saltar animación», «Modo lectura» |
| `js/cubo.js` | El cubo 3D hecho con CSS (`matrix3d`) y su giro según el scroll |
| `js/capitulos.js` | Contexto histórico, los 6 capítulos, scrollytelling y secuencias que explican conceptos |
| `js/red.js` | Red interactiva en SVG |
| `js/linea-tiempo.js` | Línea de tiempo horizontal |
| `js/comprueba.js` | Preguntas «Comprueba» con retroalimentación |
| `js/chispa.js` | El guía: Karl Marx como muñeco de papel que cuenta datos curiosos (el archivo conserva su nombre anterior) |
| `js/main.js` | Arranque, índice, reloj de años, videos, conclusiones y fuentes |
| `img/` | Los 6 paneles (`panel-1.jpg` … `panel-6.jpg`) y la imagen completa |
| `img/hd/` | Copia de los 6 paneles al doble de tamaño, sin retoques, para que el zoom de los pasos no se vea borroso |
| `img/marx/` | Las 4 piezas del muñeco de Marx, la foto original de 1875 y los dos programas con que se recortó |
| `video/` | Los videos editados del documental: `introduccion.mp4`, `capitulo-1.mp4` … `capitulo-6.mp4` (falta el 3) y `conclusion.mp4` |
| `GUIA-SUSTENTACION.md` | Guía para la sustentación: qué decir de cada capítulo, de las fuentes y del código |
| `FUENTES.md` | La bibliografía en APA 7 (la misma de la sección Fuentes) |

Se agregaron `motor-scroll.js`, `cubo.js` y `chispa.js` a la lista original de archivos porque el nivel 5 necesita un motor de scroll y un objeto 3D; así cada archivo tiene una sola responsabilidad.

## Los videos (ya están puestos)

Son los videos **editados** del documental (con cortes, tarjetas con fechas, retratos, globo 3D y música), exportados el 9 de noviembre desde el proyecto de edición en Remotion (`~/motion-graphics-ia/videos-universidad/out/`) y convertidos a MP4 (H.264, 1080p) para que se vean en cualquier navegador:

| Parte | Archivo en la página | Video editado | Grabación original | Duración |
|---|---|---|---|---|
| Introducción | `introduccion.mp4` | `Inicio.mp4` | IMG_0154.MOV | 0:29 |
| Capítulo 1 | `capitulo-1.mp4` | `Cap1.mp4` | IMG_0175.MOV | 1:35 |
| Capítulo 2 | `capitulo-2.mp4` | `Cap2.mp4` | IMG_0150.MOV | 1:45 |
| Capítulo 3 | — | **falta** (la grabación IMG_1227.MOV, del 13/11, todavía no se editó) | — | — |
| Capítulo 4 | `capitulo-4.mp4` | `Cap4.mp4` | IMG_0161.MOV | 1:40 |
| Capítulo 5 | `capitulo-5.mp4` | `Cap5.mp4` | IMG_0169.MOV | 1:29 |
| Capítulo 6 | `capitulo-6.mp4` | `gabriel-preview.mp4` (3/11) | Gabriel_videos.MOV | 1:34 |
| Conclusión | `conclusion.mp4` | `Conclusiones.mp4` | IMG_0147.MOV | 1:04 |

**Ojo con la duración:** las 7 partes suman **9:34**. La rúbrica pide un video de **12 a 15 minutos**; con el capítulo 3 (unos 1:30) llegarían a unos 11 minutos, así que todavía falta material. Además, el capítulo 6 es la versión del 3 de noviembre: no se volvió a exportar después de los cambios del 9 (no tiene música ni gráficos 3D, como los otros).

Cuando esté el capítulo 3, basta copiarlo a `video/` con el nombre `capitulo-3.mp4`: la página lo encuentra sola (mientras tanto muestra «próximamente»). La introducción se ve en el Inicio, cada capítulo dentro de su sección y la conclusión en Conclusiones (ya no hay una sección «Videos del equipo» al final). Para usar un enlace en vez de un archivo, se pega el link de YouTube o Drive en `enlace` (arreglo `videos` de `js/datos.js`).

Subtítulos (opcional): si los hacen, guarden `capitulo-1.vtt`, etc. en `video/` y escriban la ruta en `subtitulos`; mientras esté vacío, no se buscan.

Las transcripciones salen del guion (la de la conclusión, de lo que se grabó). Revisen que coincidan con lo que dice cada uno: en los videos de los capítulos 2, 5 y 6 hay diferencias con la página (por ejemplo, el capítulo 6 dice 280 000 km² y 1923).

## Qué editar antes de entregar (todo en `js/datos.js`)

1. **Integrantes**: `config.integrantes`, una lista de nombres (salen en el Inicio y en el pie). Los videos no dicen quién narra.
2. **Transcripción** de cada video: campo `transcripcion` del arreglo `videos`.
3. **Fuentes**: quedan solo las que sustentan los textos (la lectura base, 4 obras de la época y 6 artículos académicos), en el arreglo `fuentes`; cada una tiene una `nota` con lo que sustenta. Para agregar una, se copia una línea con este formato: `{ apa: "Apellido, N. (Año). <em>Título</em>. Editorial.", enlace: "https://..." }` (y `nota` si se quiere aclarar algo). Donde dice `[Completar…]` falta un dato.
4. **Cifras del Domingo Sangriento**: completar la fuente de cada cifra en `concepto.cifras` del capítulo 4.
5. **Crédito de los paneles**: decir de dónde salieron; si se generaron con IA, nombrar la herramienta.
6. **Respuesta del grupo** e **ideas clave**: `conclusiones.respuesta` y `conclusiones.ideasClave` (el texto actual es un borrador hecho con el texto base).
7. **Datos del guía (Marx)**: arreglo `curiosidades`. Casi todos salen del texto base; en la guía de sustentación figuran los que se agregaron sobre la vida de Marx.
8. **Código fuente**: pegar el enlace al repositorio en `config.repositorio`.
9. **Uso de IA**: revisar `config.usoIA` y completarlo con el formato de la docente.
10. **González Quesada (2021) y Pro (s. f.)**: completar la inicial del nombre y el año desde el PDF.

Para cambiar el enfoque de un paso del scrollytelling, editar `x`, `y` (en %) y `zoom` en el arreglo `pasos` (sigue la tabla 5.1 del documento de los 5 niveles).

Cada función tiene arriba un comentario en español que dice qué hace; la tabla de abajo lo resume.

## El guía: Karl Marx como muñeco de papel

Reemplaza a la vela «Chispa». Es la foto de Marx de 1875 (J. J. E. Mayall, dominio público), recortada como muñeco de papel con borde blanco y cabeza un poco más grande («cabezón»). Son 4 imágenes apiladas en `img/marx/`: el cuerpo, y la cabeza en 3 capas (fondo con la boca abierta pintada, mandíbula y la parte de arriba). Al hablar, la mandíbula baja y deja ver la boca; la cabeza asiente. Quieto, respira y cada tanto mira a un lado, asiente o da un saltito.

Habla solo una vez al llegar a una sección, cuenta otro dato si lo tocas, muestra «Dato 2 de 5», tiene «Silenciar» (se recuerda en ese navegador), se cierra con Escape y en «Modo lectura» se queda quieto. El recorte se hizo con el reconocimiento de sujetos de macOS (Vision, `recortar-fondo.swift`) y las piezas con Python (`armar-munieco.py`).

## El scrollytelling de los capítulos (tabla 5.1)

Como pide el documento de los 5 niveles (página 5), en cada paso la imagen **solo hace zoom y desplazamiento** hacia el detalle que explica el párrafo, y los paneles no se editan. Para que se vea mejor, sin agregar imágenes:

- el panel se muestra desde una copia al doble de tamaño (`img/hd/`, sin retoques), así el zoom no se ve borroso;
- en vez de franjas negras arriba y abajo, el fondo es el mismo panel difuminado;
- un sello arriba a la izquierda muestra el año y el título del paso, y 4 rayitas marcan el avance («Paso 2 de 4»);
- mientras se baja por los pasos, el panel se acerca y sube apenas (`derivarScrollytelling()`).

## Cómo funcionan los efectos (para explicarlo en la sustentación)

- **Secuencias fijadas (scrolljacking sin bloquear el scroll).** Cada secuencia es una sección alta (2 o 3 pantallas) con un escenario `position: sticky`. Mientras la sección pasa por debajo, el escenario queda quieto y `progresoDeSeccion()` devuelve de 0 a 1 cuánto se avanzó. `tramo()` convierte ese avance en el avance de cada fase. La rueda, el teclado, la barra de desplazamiento y el índice funcionan siempre.
- **Parallax.** Cada capa tiene `data-velocidad` (0,5 = panel, 0,7 = partículas, 0,85 = papel; el texto va a 1 y nunca se mueve). `aplicarParallax()` las desplaza con `transform`.
- **El cubo.** Cada cara se coloca con una matriz 4×4 (`matrix3d`). El orden de las caras (frente, derecha, arriba, izquierda, abajo, atrás) hace que pasar de un capítulo al siguiente sea siempre un giro de 90°. Para la vista explotada, cada cara se interpola entre su lugar en el cubo y su lugar en la fila con cuaterniones (así no se deforma).
- **Todo se actualiza con `requestAnimationFrame`** y solo se animan `transform`, `opacity` y `clip-path`.
- **Modo lectura.** Se activa con el interruptor o solo si el sistema pide «reducir movimiento». Quita secuencias, parallax, cubo y partículas, y deja la página como texto normal.
- **Celular.** Las secuencias miden la mitad; con menos de 600 px no hay 3D ni parallax y el cubo se reemplaza por los 6 puntos de color de la barra superior.

## Lo que dice la investigación (por qué se usó así)

- Nielsen Norman Group, *Scrolljacking 101*: el scrolljacking desorienta, pero funciona mejor cuando tiene valor funcional. Por eso cada secuencia explica algo y el texto de lectura queda fuera. https://www.nngroup.com/articles/scrolljacking-101/
- Frederick, D., Mohler, J., Vorvoreanu, M. y Glotzbach, R. (2015). The effects of parallax scrolling on user experience in web design. *Journal of Usability Studies, 10*(2), 87–95. Por eso velocidades moderadas y «Modo lectura» siempre visible.
- Keystone Design System (Gobierno de Pensilvania), *Table of Contents*, y Nielsen Norman Group, *In-Page Links*: índice fijo, desplegable en celular y con los mismos títulos que las secciones.
- *A Comparative Study of Static, Scrollytelling, and Chatbot Visualization Onboarding Techniques* (2026), arXiv:2607.03023: el scrollytelling aumentó el enganche con la misma comprensión.

## Funciones: qué hace cada una y dónde se ve

| Función | Qué hace | Dónde se ve en la página | Archivo |
|---|---|---|---|
| `limitar(valor, minimo, maximo)` | Limita un número entre un mínimo y un máximo | Todas las secuencias fijadas y capas de parallax | `js/motor-scroll.js` |
| `mezclar(a, b, t)` | Mezcla dos números: t = 0 devuelve a, t = 1 devuelve b | Todas las secuencias fijadas y capas de parallax | `js/motor-scroll.js` |
| `suavizar(t)` | Curva suave: arranca y termina despacio para que nada se mueva de golpe | Todas las secuencias fijadas y capas de parallax | `js/motor-scroll.js` |
| `tramo(avance, inicio, fin)` | Ejemplo: tramo(0.5, 0.4, 0.6) = 0.5 → la fase va por la mitad. | Todas las secuencias fijadas y capas de parallax | `js/motor-scroll.js` |
| `progresoDeSeccion(seccion)` | «pasaje»: sección normal de 1 pantalla; el avance va de que asoma abajo a que sale arriba. | Todas las secuencias fijadas y capas de parallax | `js/motor-scroll.js` |
| `registrarSecuencia(elemento, dibujar)` | Guarda una secuencia y la función que la dibuja según su avance | Todas las secuencias fijadas y capas de parallax | `js/motor-scroll.js` |
| `actualizarControl(secuencia, avance)` | Actualiza el indicador «Fase 2 de 4» y la barra de avance de una secuencia | Todas las secuencias fijadas y capas de parallax | `js/motor-scroll.js` |
| `dibujarSecuencias()` | Dibuja cada secuencia que está cerca de la pantalla | Todas las secuencias fijadas y capas de parallax | `js/motor-scroll.js` |
| `redibujarTodo()` | Obliga a redibujar todas las secuencias en el próximo cuadro | Todas las secuencias fijadas y capas de parallax | `js/motor-scroll.js` |
| `saltarAnimacion(seccion)` | En las secuencias interactivas (red, línea de tiempo) se queda donde el escenario sigue visible. | Botón «Saltar animación» | `js/motor-scroll.js` |
| `buscarSiguienteTitulo(elemento)` | Busca el primer título que viene después de un elemento (para mover el foco) | Todas las secuencias fijadas y capas de parallax | `js/motor-scroll.js` |
| `aplicarParallax()` | Solo se mueven imágenes y capas de fondo; el texto nunca. | Todas las secuencias fijadas y capas de parallax | `js/motor-scroll.js` |
| `alternarModoLectura(forzar)` | Activa o desactiva el «Modo lectura»: sin secuencias ni parallax, la página queda como texto normal | Interruptor «Modo lectura» | `js/motor-scroll.js` |
| `medirPantalla()` | Lee el tamaño de la pantalla y de la barra; decide si hay 3D y si las secuencias van a la mitad | Todas las secuencias fijadas y capas de parallax | `js/motor-scroll.js` |
| `actualizarTodo()` | Corre una vez por cuadro: secuencias, parallax y el resto de módulos | Todas las secuencias fijadas y capas de parallax | `js/motor-scroll.js` |
| `pedirActualizacion()` | Pide un cuadro de animación (requestAnimationFrame) si no hay uno pendiente | Todas las secuencias fijadas y capas de parallax | `js/motor-scroll.js` |
| `identidad()` | Matriz que no cambia nada | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `multiplicar(a, b)` | Multiplica dos matrices: primero se aplica b y luego a | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `radianes(grados)` | Convierte grados a radianes | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `rotarX(grados)` | Giro alrededor del eje X (como rotateX de CSS) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `rotarY(grados)` | Giro alrededor del eje Y (como rotateY de CSS) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `rotarZ(grados)` | Giro en el plano de la pantalla (como rotateZ de CSS) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `trasladar(x, y, z)` | Desplazamiento en x, y, z (en píxeles) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `escalar(s)` | Cambio de tamaño igual en los tres ejes | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `aplicarGiro(m, v)` | Aplica solo la parte de giro de una matriz a un vector (sirve para saber hacia dónde mira una cara) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `matrizACSS(m)` | Escribe la matriz como texto para CSS: matrix3d(...) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `matrizACuaternion(m)` | Convierte la parte de giro de una matriz en un cuaternión (sirve para interpolar giros sin deformar) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `cuaternionAMatriz(q)` | Convierte un cuaternión de vuelta en matriz de giro | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `interpolarCuaterniones(a, b, t)` | Interpola dos giros por el camino más corto (slerp) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `descomponer(m)` | Separa una matriz en tamaño, giro y posición | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `interpolarMatrices(a, b, t)` | Mezcla dos matrices sin deformar la cara (posición, giro y tamaño por separado) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `interpolarGiro(a, b, t)` | Mezcla solo los giros de dos matrices | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `colocacionDeRanura(nombre)` | Matriz que lleva una cara a su ranura del cubo | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `calcularOrientaciones()` | Calcula la orientación del cubo en cada capítulo y el giro de 90° entre capítulos | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `prepararCubo()` | Crea las 6 caras del cubo dentro de la capa fija | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `orientacionEn(posicion)` | Orientación del cubo en una posición del relato (1 = capítulo 1 … 6 = capítulo 6; 2,5 = a mitad del giro) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `centroContenido()` | Centro del área de contenido (sin contar el índice lateral ni el margen del cubo) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `poseEsquina(posicion)` | Pose pequeña, fija en un costado | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `poseCentro(posicion, tamano)` | Pose grande en el centro (transiciones entre capítulos) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `poseInicio(avance)` | Pose del Inicio: las caras llegan volando (0–55 %), el cubo gira (50–92 %) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `poseExplosion(avance)` | Pose de la vista explotada: se separan (20–45 %), forman la fila (45–82 %), aparecen las palabras (82–95 %) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `mezclarPoses(a, b, t)` | Mezcla dos poses (t = 0 → a, t = 1 → b) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `matrizCara(c, base, separacion)` | Matriz final de la cara c: su ranura, separada del centro y corregida para verse derecha | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `matrizFila(c, pose)` | Matriz de la cara c cuando está en la fila de la vista explotada | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `dibujarCubo(pose)` | Coloca las 6 caras según una pose | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `posicionDelRelato()` | Posición del relato: 1 a 6 según el capítulo; entre capítulos, el giro avanza con la transición | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `actualizarCubo()` | Decide la pose del cubo según dónde está el usuario y lo dibuja (corre en cada cuadro) | El cubo (Inicio, esquina, transiciones, Conclusiones) | `js/cubo.js` |
| `marcarPalabrasClave(texto)` | Convierte [[texto|clave]] en una palabra clave con su definición (cursor, toque o teclado) | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `htmlControl(fases)` | Controles de una secuencia: «Fase 1 de 4», barra de avance y «Saltar animación» | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `htmlCapasDecorativas(particula)` | Capas de parallax que van encima de un panel: partículas (70 %) y papel (85 %) | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `construirContexto()` | Arma el bloque de contexto: oraciones con el mosaico fijo y las 6 tarjetas | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `resaltarPanelesContexto(oracion)` | Resalta los paneles de una oración del contexto y atenúa los demás | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `construirCapitulos()` | Arma los 6 capítulos y las transiciones que van entre ellos | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `htmlCapitulo(cap)` | HTML completo de un capítulo (plantilla igual para los 6) | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `htmlApertura(cap)` | a + b: secuencia de apertura de 3 pantallas en 4 fases; termina mostrando el título | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `htmlScrolly(cap)` | c: bloque de scrollytelling (panel fijo + 4 pasos de texto) | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `htmlDatosClave(cap)` | d: recuadro «Datos clave» con la cifra principal en grande | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `htmlCita(cita)` | Cita destacada en grande con autor y año | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `htmlClip(video, titulo)` | f: un video del documental con su transcripción (sirve para cada capítulo, la introducción y la conclusión) | Inicio, los 6 capítulos y Conclusiones | `js/capitulos.js` |
| `htmlPuente(cap)` | i: frase puente y botón para seguir | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `htmlTransicion(siguiente)` | Transición entre capítulos: una cortina del color del capítulo siguiente cruza la pantalla | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `calcularEnfoque(anchoMarco, altoMarco, x, y, zoom)` | Calcula zoom y desplazamiento para que el punto (x, y) del panel quede al centro del marco | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `dibujarApertura(cap, avance, el)` | Dibuja la apertura según el avance: 1) panel completo, 2) y 3) dos detalles, 4) franjas y título | Entrada de cada capítulo | `js/capitulos.js` |
| `prepararScrollytelling()` | Observa los pasos de cada capítulo: cuando un paso llega al centro, se enfoca su detalle | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `activarPaso(capitulo, paso)` | Cambia el zoom y la posición del panel según el paso (tabla 5.1) y actualiza el sello con el año y las rayitas de avance | Scrollytelling: zoom del panel en cada paso | `js/capitulos.js` |
| `derivarScrollytelling()` | En cada cuadro: mientras se baja por los 4 pasos, el panel se acerca y sube apenas (solo zoom y desplazamiento) | Scrollytelling de cada capítulo | `js/capitulos.js` |
| `reenfocarScrollytelling()` | Recalcula los enfoques (al cambiar el tamaño de la ventana o el modo lectura) | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `htmlConcepto(cap)` | Envoltorio común: título, dibujo, subtítulos de una línea y controles | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `mostrarSubtitulo(el, indice)` | Muestra solo el subtítulo que corresponde (en modo lectura se ven todos) | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `htmlSemana()` | Cap. 2 · «La semana del obrero» | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `dibujarSemana(avance, el)` | Dibuja la semana: la barra se llena; desde el jueves, en rojo (plusvalía) | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `htmlMapa()` | Cap. 3 · «De Londres a París»: mapa esquemático | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `dibujarMapa(avance, el)` | Dibuja el mapa: se enciende Londres, luego París (que se apaga), 1889 y al final solo Rusia | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `htmlChoque(cap)` | Cap. 4 · «El choque»: el panel 4 dividido en dos mitades que se juntan | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `dibujarChoque(avance, el)` | Dibuja el choque: las mitades parten de los bordes y se juntan; luego aparecen las tres cifras | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `htmlCalendarios(cap)` | Cap. 5 · «Dos calendarios»: dos hojas lado a lado | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `dibujarCalendarios(avance, el)` | Dibuja los calendarios: primero febrero = marzo; la hoja pasa y muestra octubre = noviembre | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `dibujarBrest(avance, el)` | Dibuja la silueta: pierde territorio (con contadores) y luego se completa con las repúblicas | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `dibujarTransicion(avance, el)` | Transición: la cortina cruza la pantalla y aparece el nombre del capítulo siguiente | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `formatearCifra(valor, formato)` | Escribe una cifra con espacio de miles cuando hace falta (780 000) | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `prepararContadores()` | Cuando un contador entra en pantalla, sube desde 0 (o desde el año anterior) hasta su cifra, una sola vez | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `animarContador(elemento)` | Anima un contador durante 1,2 segundos (solo cambia el número escrito) | Contexto histórico y los 6 capítulos | `js/capitulos.js` |
| `nodoPorId(id)` | Busca un nodo por su id | ④ Red de relaciones históricas | `js/red.js` |
| `fraseConexion(c)` | Frase de una conexión: «Revolución Industrial provoca Miseria obrera y cuestión social» | ④ Red de relaciones históricas | `js/red.js` |
| `nombreTipo(tipo)` | Nombre del tipo en singular («Causa», «Actor»…) | ④ Red de relaciones históricas | `js/red.js` |
| `calcularPosicionesRed()` | Calcula dónde va cada nodo: x por su año, y por su carril (y una subfila si hay otro muy cerca) | ④ Red de relaciones históricas | `js/red.js` |
| `formaNodo(n)` | Dibuja la forma de un nodo según su tipo | ④ Red de relaciones históricas | `js/red.js` |
| `dibujarRed()` | Dibuja toda la red: carriles, eje del tiempo con su corte, flechas y nodos | ④ Red de relaciones históricas | `js/red.js` |
| `dibujarMontajeRed(avance)` | Hace aparecer los carriles uno por uno y luego dibuja las flechas; al final la red se vuelve interactiva | ④ Red de relaciones históricas | `js/red.js` |
| `mostrarDetalleNodo(id)` | Muestra el panel con los datos de un nodo y resalta sus conexiones | ④ Red de relaciones históricas | `js/red.js` |
| `ubicarPanelRed(id)` | Pone el panel al lado contrario del nodo para no taparlo | ④ Red de relaciones históricas | `js/red.js` |
| `resaltarConexiones(id)` | Resalta el nodo y sus conexiones; el resto se atenúa | ④ Red de relaciones históricas | `js/red.js` |
| `cerrarPanelRed()` | Quita la selección y cierra el panel | ④ Red de relaciones históricas | `js/red.js` |
| `aplicarFiltrosRed()` | Aplica juntos los tres filtros: tipo, capítulo y búsqueda | ④ Red de relaciones históricas | `js/red.js` |
| `filtrarRedPorTipo(tipos)` | Filtra la red por tipo (recibe la lista de tipos marcados) | ④ Red de relaciones históricas | `js/red.js` |
| `filtrarRedPorCapitulo(n)` | Filtra la red por capítulo (null = todos) | ④ Red de relaciones históricas | `js/red.js` |
| `buscarNodo(texto)` | Busca nodos por nombre; si hay uno solo, lo abre | ④ Red de relaciones históricas | `js/red.js` |
| `avanzarRecorrido(paso)` | Recorrido guiado «De la utopía al Estado»: muestra el paso indicado (0 a 9) | ④ Red de relaciones históricas | `js/red.js` |
| `construirHerramientasRed()` | Arma los filtros (casillas y botones de color), el buscador y los botones | ④ Red de relaciones históricas | `js/red.js` |
| `construirLeyendaRed()` | Leyenda siempre visible: formas por tipo y colores por capítulo | ④ Red de relaciones históricas | `js/red.js` |
| `construirListaRed()` | Vista de lista: la misma información, accesible para lectores de pantalla y celulares pequeños | ④ Red de relaciones históricas | `js/red.js` |
| `irARedFiltrada(capitulo)` | Lleva a la red ya armada y filtrada por un capítulo (desde los enlaces de cada capítulo) | ④ Red de relaciones históricas | `js/red.js` |
| `eventoPorId(id)` | Busca un evento por su id | ⑤ Línea de tiempo interactiva | `js/linea-tiempo.js` |
| `eventosVisibles()` | Eventos que pasan los filtros, en orden de tiempo | ⑤ Línea de tiempo interactiva | `js/linea-tiempo.js` |
| `fechaCorta(e)` | Fecha que se muestra en la etiqueta (en 1905 y 1917, con los dos calendarios) | ⑤ Línea de tiempo interactiva | `js/linea-tiempo.js` |
| `dibujarLineaTiempo()` | Dibuja la línea: eje, corte comprimido, marcas de décadas y un botón por cada fecha | ⑤ Línea de tiempo interactiva | `js/linea-tiempo.js` |
| `dibujarAvanceLinea(avance)` | Secuencia: al bajar, la línea se desplaza de 1516 a 1924 | ⑤ Línea de tiempo interactiva | `js/linea-tiempo.js` |
| `mostrarFichaEvento(id)` | Muestra la ficha de una fecha: qué pasó, por qué importa, fuente y botones | ⑤ Línea de tiempo interactiva | `js/linea-tiempo.js` |
| `centrarEvento(id)` | Lleva la fecha al centro de la línea: en la secuencia, mueve la página; en modo lectura, la línea | ⑤ Línea de tiempo interactiva | `js/linea-tiempo.js` |
| `moverSeleccion(direccion)` | Pasa a la fecha anterior (-1) o siguiente (+1) entre las visibles | ⑤ Línea de tiempo interactiva | `js/linea-tiempo.js` |
| `filtrarEventos(capitulo)` | Filtra las fechas por capítulo (null = todos) y por los tipos marcados | ⑤ Línea de tiempo interactiva | `js/linea-tiempo.js` |
| `construirFiltrosLinea()` | Arma los filtros de la línea: botones por capítulo y casillas por tipo de hecho | ⑤ Línea de tiempo interactiva | `js/linea-tiempo.js` |
| `irALineaDelCapitulo(capitulo)` | Desde un capítulo: abre la línea en la primera fecha de ese capítulo | ⑤ Línea de tiempo interactiva | `js/linea-tiempo.js` |
| `irANodoRed(id)` | Desde la línea de tiempo: abre la red ya armada con el nodo seleccionado | ⑤ Línea de tiempo interactiva | `js/linea-tiempo.js` |
| `prepararComprueba()` | Arma la pregunta de cada capítulo dentro de su recuadro .comprueba | Recuadro «Comprueba» de cada capítulo | `js/comprueba.js` |
| `comprobarRespuesta(capitulo, opcion)` | Revisa la opción elegida y explica cada opción con el texto base | Recuadro «Comprueba» de cada capítulo | `js/comprueba.js` |
| `dibujarChispa()` | Arma el muñeco de Marx con sus 4 piezas recortadas (cuerpo, fondo de la boca, mandíbula y cabeza) | Guía Marx, abajo a la derecha | `js/chispa.js` |
| `programarGesto()` | Cada 6 a 13 segundos, si está quieto, el muñeco mira a un lado, asiente o da un saltito | Guía Marx, abajo a la derecha | `js/chispa.js` |
| `crearChispa()` | Crea el muñeco de Marx y su globo de diálogo en la esquina inferior derecha | Guía Marx, abajo a la derecha | `js/chispa.js` |
| `proximoDato(seccion)` | Devuelve el próximo dato curioso de una sección (al terminar, vuelve a empezar) | Guía Marx, abajo a la derecha | `js/chispa.js` |
| `decirDato(texto, automatico)` | Marx dice un texto: abre el globo, mueve la mandíbula y escribe letra por letra | Guía Marx, abajo a la derecha | `js/chispa.js` |
| `programarCierre(texto)` | Programa el cierre automático del globo (más tiempo si el texto es largo) | Guía Marx, abajo a la derecha | `js/chispa.js` |
| `cerrarGlobo()` | Cierra el globo de diálogo | Guía Marx, abajo a la derecha | `js/chispa.js` |
| `chispaCambioDeSeccion(id)` | un momento en la sección nueva, Marx habla solo una vez | Guía Marx, abajo a la derecha | `js/chispa.js` |
| `alternarSilencioChispa()` | Silencia o reactiva a Marx (silenciado, solo habla si lo tocas) | Guía Marx, abajo a la derecha | `js/chispa.js` |
| `actualizarBotonSilencio()` | Cambia el texto del botón según si Marx está silenciado o no | Guía Marx, abajo a la derecha | `js/chispa.js` |
| `rutaImagen(archivo)` | Ruta de una imagen. En la versión de un solo archivo, las imágenes vienen incrustadas. | Varias partes (ver la función) | `js/main.js` |
| `escalaDeTiempo(anio, tramos)` | (así un tramo largo y vacío, como 1525–1775, ocupa poco espacio) | Varias partes (ver la función) | `js/main.js` |
| `anioDesdePosicion(x, tramos)` | Hace lo contrario: de una posición x devuelve el año | Varias partes (ver la función) | `js/main.js` |
| `textoPlano(html)` | Quita las etiquetas HTML de un texto (para ordenar las fuentes alfabéticamente) | Varias partes (ver la función) | `js/main.js` |
| `irACapitulo(numero)` | Lleva al inicio de un capítulo (lo usan el cubo y el mini-mapa) | Varias partes (ver la función) | `js/main.js` |
| `construirInicio()` | Llena los textos del Inicio y registra su secuencia (el cubo se arma en cubo.js) | Varias partes (ver la función) | `js/main.js` |
| `dibujarInicio(avance, el)` | Dibuja el Inicio: llegan los paneles (en 2D) y al final aparece la pregunta central sobre un degradado | Varias partes (ver la función) | `js/main.js` |
| `construirIndice()` | Arma el índice lateral y el mini-mapa a partir de los títulos reales de la página | Varias partes (ver la función) | `js/main.js` |
| `actualizarIndice()` | Marca en el índice la sección donde está el lector y actualiza migas y mini-mapa | Índice, migas y mini-mapa | `js/main.js` |
| `actualizarBarraProgreso()` | Barra fina de progreso de lectura y botón «Volver arriba» | Varias partes (ver la función) | `js/main.js` |
| `actualizarReloj()` | «Reloj del recorrido»: muestra el año del relato según lo que se está leyendo | «Año del relato» | `js/main.js` |
| `crearParticulas(capa)` | Crea las partículas de una capa (máximo 40). Solo se animan con transform y opacity. | Varias partes (ver la función) | `js/main.js` |
| `crearTodasLasParticulas()` | Crea todas las capas de partículas y solo las anima cuando están en pantalla | Varias partes (ver la función) | `js/main.js` |
| `prepararDefiniciones()` | Corre la definición si se sale de la pantalla y permite abrirla con un toque | Varias partes (ver la función) | `js/main.js` |
| `videoPorId(id)` | Busca un video por su id ("capitulo-3", "conclusion") | Varias partes (ver la función) | `js/main.js` |
| `tituloDeVideo(video)` | Título del video: «Capítulo 3: El movimiento obrero se organiza» | Varias partes (ver la función) | `js/main.js` |
| `portadaDe(video)` | Portada mientras no se reproduce: el panel del capítulo (o la imagen completa en la introducción y la conclusión) | Varias partes (ver la función) | `js/main.js` |
| `enlaceIncrustado(enlace)` | Convierte un enlace de YouTube o de Google Drive en la dirección para incrustarlo (null si no es ninguno) | Varias partes (ver la función) | `js/main.js` |
| `htmlVideoPendiente(video)` | Marcador «próximamente» mientras todavía no hay video (dice qué nombre debe tener el archivo) | Varias partes (ver la función) | `js/main.js` |
| `crearReproductor(contenedor, video)` | Crea el reproductor de un video: enlace (YouTube o Drive), archivo .mp4 o «próximamente» si falta | Los videos del Inicio, de cada capítulo y de Conclusiones | `js/main.js` |
| `construirVideos()` | Pone cada video en su lugar: la introducción en el Inicio, cada capítulo en su sección y la conclusión en Conclusiones | Inicio, los 6 capítulos y Conclusiones | `js/main.js` |
| `construirConclusiones()` | Arma las conclusiones: respuesta, los 6 pasos, ideas clave, comparador y trabajo con fuentes | ⑥ Conclusiones | `js/main.js` |
| `dibujarExplosion(avance, el)` | La vista explotada la mueve cubo.js; aquí solo aparecen los textos del escenario | Varias partes (ver la función) | `js/main.js` |
| `construirComparador()` | Comparador con deslizador: «Lo que proponía Marx» frente a «Lo que ocurrió» | ⑥ Comparador con deslizador | `js/main.js` |
| `construirFuentes()` | Lista de fuentes en APA 7, por categoría y en orden alfabético | ⑦ Fuentes | `js/main.js` |
| `construirRecursos()` | Código fuente, recursos usados y declaración de uso de IA | ⑦ Fuentes | `js/main.js` |
| `construirPie()` | Pie de página: integrantes, curso, universidad, año y nota sobre las imágenes | Varias partes (ver la función) | `js/main.js` |
| `prepararEventosGenerales()` | Interruptor de modo lectura, índice en celular, enlaces de los capítulos, «Volver arriba» y tamaño de ventana | Varias partes (ver la función) | `js/main.js` |
| `iniciar()` | Pone todo en marcha, en orden: textos, capítulos, red, video, línea de tiempo, cubo y eventos | Arranque de toda la página | `js/main.js` |
