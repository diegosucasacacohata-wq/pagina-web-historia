// =====================================================================
// datos.js — TODAS las estructuras de datos del webdoc
// Proyecto «Historia Conectada» · Grupo 2 · Nivel 5 (máximo)
// Aquí no hay funciones: solo arreglos y objetos que leen los demás archivos.
// Para cambiar un texto, una fecha o un video, se edita SOLO este archivo.
// =====================================================================


// ---------------------------------------------------------------------
// 1. Configuración general (EDITABLE por el equipo)
// ---------------------------------------------------------------------
const config = {
  titulo: "Del «no-lugar» al Estado: el socialismo de 1516 a 1924",
  proyecto: "Historia Conectada",
  grupo: "Grupo 2: «Utopías sociales: socialismo y comunismo. Revolución Rusa»",
  curso: "Historia de Occidente y Ciencias de la Computación",
  universidad: "Universidad Católica San Pablo (UCSP)",
  anio: 2026,
  pregunta: "¿Cómo pasó el socialismo de ser una utopía a convertirse en el primer Estado comunista del mundo?",
  // Gancho inicial (nivel 1): dato sorprendente para enganchar en los primeros segundos
  gancho: "En 1516 alguien imaginó una isla sin propiedad privada. En 1922 nació un Estado que decía hacerlo realidad.",
  // Eslogan (la rúbrica pide título y eslogan originales)
  eslogan: "Una isla imaginaria, cuatro siglos y una revolución.",
  // Finalidad y público objetivo (también los pide la rúbrica; salen en la ficha del Inicio)
  finalidad: "Educativa y divulgativa: explicar, con fuentes académicas y documentos de época, cómo el socialismo pasó de ser una idea a convertirse en un Estado (1516–1924).",
  publico: "Estudiantes universitarios de los primeros ciclos y de los últimos años de secundaria, y cualquier lector curioso sin conocimientos previos de historia.",

  // Integrantes: escribir el nombre real y el capítulo que narra cada uno (sale en su video)
  integrantes: [
    { nombre: "Integrante 1", capitulo: 1 },
    { nombre: "Integrante 2", capitulo: 2 },
    { nombre: "Integrante 3", capitulo: 3 },
    { nombre: "Integrante 4", capitulo: 4 },
    { nombre: "Integrante 5", capitulo: 5 },
    { nombre: "Integrante 6", capitulo: 6 }
  ],

  // Pie de cada ilustración (crédito editable)
  creditoImagenes: "Ilustración del equipo",

  // Código y recursos (la rúbrica pide que estén disponibles); salen al final de Fuentes
  repositorio: "",   // pegar aquí el enlace al código fuente (GitHub, Drive…)
  recursos: [
    "Código propio en HTML, CSS y JavaScript, sin librerías: motor de scroll, cubo 3D con matrices, red en SVG, línea de tiempo y preguntas.",
    "Tipografías Source Serif 4 y Source Sans 3 (Google Fonts, licencia libre).",
    "Documental grabado por el grupo con celular y editado con Remotion (cortes, tarjetas con fechas, retratos de dominio público y música); convertido a MP4 (H.264) para la web con FFmpeg.",
    "Guía «Karl Marx»: fotografía de J. J. E. Mayall (1875, dominio público), recortada con Vision (macOS) y armada en piezas con Python (Pillow).",
    "Paneles 1 a 6: ilustraciones del equipo, sin retoques; en el scrollytelling se usa una copia al doble de tamaño (img/hd) para que el zoom no se vea borroso."
  ],
  // Declaración de uso de IA (completar con el formato que entrega la docente)
  usoIA: "En esta versión se usó IA (Claude, de Anthropic) para: recortar la foto de Marx y convertirla en muñeco, mejorar la presentación del scrollytelling, integrar y convertir los videos y ordenar las fuentes del guion. La investigación, el guion, la narración y la grabación son del grupo. [Revisar y completar con el formato de la docente.]"
};

// ---------------------------------------------------------------------
// 2. Videos del equipo: introducción, UNO POR CAPÍTULO y conclusión
//    Son los videos editados del documental. Cada capítulo aparece dentro de su
//    sección y todos juntos en «Videos del equipo».
//    Para poner un video hay dos formas (con una basta):
//    a) ARCHIVO: copiar el video a la carpeta video/ con el nombre EXACTO
//       introduccion.mp4, capitulo-1.mp4 … capitulo-6.mp4 y conclusion.mp4.
//       No hay que tocar nada más (el capítulo 3 todavía falta: sale «próximamente»).
//    b) ENLACE: pegar en «enlace» el link de YouTube o de Google Drive
//       (en Drive: Compartir → «Cualquier persona con el enlace»).
//       Si «enlace» tiene algo, se usa el enlace en vez del archivo.
//    Subtítulos (opcional): guardar capitulo-1.vtt… en video/ y escribir la ruta en «subtitulos».
//    Mientras no haya video, se ve «próximamente» y el diseño no se rompe.
//    ¿No habrá conclusión? Cambiar activo: true por activo: false.
//    narraCapitulo: quién narra la introducción y la conclusión (el integrante de ese capítulo).
// ---------------------------------------------------------------------
const videos = [
  { id: "introduccion", capitulo: 0, etiqueta: "Introducción", titulo: "Introducción: la pregunta central", narraCapitulo: 1,
    archivo: "video/introduccion.mp4", subtitulos: "", enlace: "",
    transcripcion: "Año 1516. Un humanista inglés, Tomás Moro, imagina una isla donde nadie es dueño de nada. La llama Utopía, una palabra que inventa a partir del griego. Cuatro siglos después, en 1922, nace un Estado que dice hacer realidad ese sueño: la Unión Soviética. ¿Cómo pasó el socialismo de ser una utopía a convertirse en el primer Estado comunista del mundo? Lo vamos a responder en seis pasos." },
  { id: "capitulo-1", capitulo: 1, archivo: "video/capitulo-1.mp4", subtitulos: "", enlace: "",
    transcripcion: "En Utopía, Moro describe una sociedad en la que ha desaparecido la propiedad privada (los bienes que son de una persona y no de la comunidad), que él consideraba la fuente de todos los males. Desde entonces, «utopía» significa una sociedad perfecta que todavía no existe. Tres siglos después llega la Revolución Industrial. La máquina de vapor llena Inglaterra de fábricas y el trabajo artesanal es reemplazado por obreros que trabajan juntos, al ritmo de las máquinas, en turnos de diez, doce o más horas. Así nace el proletariado. Muchos llegan a ciudades improvisadas y viven hacinados en casuchas. El economista David Ricardo sostenía la «ley de bronce de los salarios»: en el libre mercado, los salarios tienden a bajar. A estos problemas se les llamó la «cuestión social». Frente a esa miseria aparecen los primeros socialistas, a quienes Engels luego llamó «utópicos». El inglés Robert Owen y el conde francés Saint-Simon buscaban la fórmula para solucionar, o al menos aliviar, la cuestión social. Charles Fourier propuso los falansterios. Y en 1825 Owen compró tierras en Indiana, en Estados Unidos, para fundar una comunidad modelo: New Harmony. Pero estas comunidades duraron poco. Tenían buenas intenciones, no un plan para cambiar toda la sociedad." },
  { id: "capitulo-2", capitulo: 2, archivo: "video/capitulo-2.mp4", subtitulos: "", enlace: "",
    transcripcion: "Karl Marx y Friedrich Engels partieron de la filosofía de Hegel, pero la leyeron de forma materialista (explicando la historia desde las condiciones materiales y no desde las ideas) y pusieron la economía en el centro. Para ellos, la historia es una lucha de clases. En su tiempo: la burguesía (dueños de fábricas y capitales) contra el proletariado. En 1848, el año de las revoluciones en Europa, publican el Manifiesto Comunista, escrito como programa de la Liga Comunista. Termina con un llamado que recorrerá el mundo: «¡Proletarios de todos los países, uníos!». En 1867 Marx publica el primer tomo de El capital. Allí explica la plusvalía: el obrero trabaja una parte de la jornada para pagar el valor de su salario, pero sigue trabajando; lo que produce en ese tiempo extra, sin cobrarlo, es la plusvalía, de donde sale la ganancia del dueño. Engels lo explicó con un ejemplo: si con lo trabajado hasta el miércoles ya se cubrió el salario de la semana, lo producido el resto de la semana es plusvalía. ¿Y el futuro? Marx veía una etapa intermedia, la dictadura del proletariado, y una meta final: la sociedad comunista, sin propiedad privada y sin Estado." },
  { id: "capitulo-3", capitulo: 3, archivo: "video/capitulo-3.mp4", subtitulos: "", enlace: "",
    transcripcion: "El 29 de septiembre de 1864, en el Saint Martin's Hall de Londres, nace la Asociación Internacional de Trabajadores: la Primera Internacional. Marx redacta sus estatutos con dos ideas centrales: la liberación de los obreros debe ser obra de los propios obreros, y estos no deben ser indiferentes a la conquista del poder político. Pero no todos pensaban igual. Marx se enfrentó primero con Proudhon y luego con el ruso Mijaíl Bakunin, defensor del anarquismo. Mientras tanto, los obreros se agrupaban en sindicatos por oficio y la huelga se volvía su herramienta más eficaz. En 1871, tras la derrota de Francia ante Prusia, el hambre y el asedio llevan a los parisinos a sublevarse. Toman la capital, eligen una «comuna» de 90 miembros y adoptan la bandera roja. El ejército del gobierno la aplasta. Fue la primera derrota importante de la Internacional obrera. Después, muchos socialistas eligieron otro camino: entrar al sistema democrático y conseguir reformas, como mejores salarios o menos horas de trabajo. En julio de 1889 nace la Segunda Internacional, socialdemócrata. Así, la ola revolucionaria se detuvo en los países industrializados… pero no en Rusia." },
  { id: "capitulo-4", capitulo: 4, archivo: "video/capitulo-4.mp4", subtitulos: "", enlace: "",
    transcripcion: "Rusia era una monarquía autocrática. Su lema: autocracia, ortodoxia y patriotismo. Pero el prestigio del zar, al que llamaban «el padre del pueblo», se fue debilitando con Nicolás II. Los intelectuales rusos, la intelligentsia, mezclaron el marxismo con las ideas populistas rusas. En 1903, en el II Congreso del Partido Obrero Socialdemócrata, realizado entre Bruselas y Londres, el partido se divide: los seguidores de Lenin ganan algunas votaciones y se llaman bolcheviques, «mayoritarios»; a sus rivales los llaman mencheviques, «minoritarios». El 9 de enero de 1905, que en nuestro calendario es el 22, miles de obreros marchan pacíficamente al Palacio de Invierno, guiados por el sacerdote Gueorgui Gapón, para entregar al zar una petición: menos horas de trabajo, mejores salarios, libertades. Los soldados disparan. Las cifras no coinciden: la oficial habló de 96 muertos; otras fuentes, de cientos o de más de mil. Ese año nacen los soviets. La derrota ante Japón y la rebelión del acorazado Potemkin sacuden al régimen. En 1914 Rusia entra en la Primera Guerra Mundial, una carnicería de trincheras, y el papel del zar en el conflicto termina de hundir su prestigio." },
  { id: "capitulo-5", capitulo: 5, archivo: "video/capitulo-5.mp4", subtitulos: "", enlace: "",
    transcripcion: "Un dato antes de seguir: Rusia usaba el calendario juliano, trece días atrasado respecto al nuestro. Por eso la «Revolución de Febrero» ocurrió en marzo y la «de Octubre», en noviembre. En febrero de 1917, Petrogrado se llena de huelgas y protestas por la falta de pan, y los soldados se suman a los manifestantes. Nicolás II abdica. Se forma un Gobierno Provisional, encabezado primero por el príncipe Lvov y, desde julio, por Aleksandr Kérenski, que sigue en la guerra. Al mismo tiempo, obreros y soldados se organizan en soviets. Lenin llega a Petrogrado el 3 de abril y presenta sus Tesis de Abril: la revolución debe pasar a una segunda etapa que ponga el poder en manos del proletariado y de los campesinos pobres; ningún apoyo al Gobierno Provisional; las tierras, nacionalizadas y administradas por los soviets campesinos. Los bolcheviques lo resumen en un lema: «paz, pan y tierra». El 25 de octubre, nuestro 7 de noviembre, los bolcheviques, dirigidos por Lenin y Trotski y apoyados en los soviets, derrocan al Gobierno Provisional y toman el Palacio de Invierno. Proclaman un gobierno de los soviets de obreros, soldados y campesinos. Como señala la lectura, la toma del palacio importó más por lo que simbolizó que por lo que fue." },
  { id: "capitulo-6", capitulo: 6, archivo: "video/capitulo-6.mp4", subtitulos: "", enlace: "",
    transcripcion: "Para cumplir su promesa de paz, los bolcheviques firman el Tratado de Brest-Litovsk el 3 de marzo de 1918. Rusia sale de la guerra, pero a un costo enorme: pierde 780 000 km², 56 millones de habitantes, el 73 % de su producción de hierro y el 89 % de la de carbón. Estalla la guerra civil: el Ejército Rojo contra los blancos, sus opositores. Para ganarla, el gobierno aplica el comunismo de guerra: el Estado toma el control de la economía, y la dictadura se endurece en lo económico y en lo político. En 1921, con el país devastado, Lenin anuncia en el X Congreso del partido la Nueva Política Económica, la NEP: una vuelta parcial al mercado para reconstruir el país. En 1922 nace la Unión de Repúblicas Socialistas Soviéticas, la URSS, con Rusia como eje. En 1924 muere Lenin. Tras luchas internas y purgas, José Stalin se convierte en el amo de la Unión Soviética, que gobernará con mano de hierro hasta 1953." },
  { id: "conclusion", capitulo: 0, etiqueta: "Conclusión", titulo: "Conclusión: la respuesta en seis pasos", narraCapitulo: 6, activo: true,
    archivo: "video/conclusion.mp4", subtitulos: "", enlace: "",
    transcripcion: "¿Cómo pasó el comunismo de ser tan solo una idea utópica a instituir el primer gobierno comunista del mundo, la URSS? Lo podemos resumir en seis pasos. Primero, una idea: la isla de Moro sin propiedad privada. Segundo, una profunda herida: la miseria que dejó la Revolución Industrial en la mayoría de la población. Tercero, una teoría: la lucha de clases planteada por Marx y Engels. Cuarto, una organización: la de cada una de las Internacionales. Quinto, una oportunidad: la Rusia del zar, hundida en la Primera Guerra Mundial. Y sexto, una toma del poder: la que sucedió en 1917. Aquí nos planteamos una nueva pregunta, la paradoja: Marx soñaba con una sociedad sin Estado; sin embargo, sus ideas desembocaron en un Estado gobernado con mano de hierro hasta 1953. Muchas gracias." }
];

// ---------------------------------------------------------------------
// 3. Glosario: definiciones de las palabras clave (subrayado punteado)
//    En los textos, una palabra clave se escribe así: [[texto visible|clave]]
//    o simplemente [[clave]] si el texto y la clave son iguales.
// ---------------------------------------------------------------------
const glosario = {
  "utopía": "Sociedad perfecta imaginada. El nombre viene de la isla que describió Tomás Moro en 1516.",
  "propiedad privada": "Bienes que pertenecen a una persona y no a la comunidad. Para Moro, la fuente de todos los males.",
  "cuestión social": "Los problemas de los obreros industriales: turnos de 10 a 12 horas, hacinamiento y miseria.",
  "falansterio": "Comunidad modelo propuesta por Fourier, donde un grupo vivía y trabajaba en común.",
  "lucha de clases": "Idea de Marx y Engels: la historia avanza por el enfrentamiento entre clases sociales.",
  "burguesía": "Clase dueña de las fábricas y del capital.",
  "proletariado": "Clase de los obreros, que solo tienen su trabajo para vivir. Nace con la Revolución Industrial.",
  "plusvalía": "Lo que el obrero produce después de cubrir su salario y no se le paga.",
  "dictadura del proletariado": "Etapa intermedia propuesta por Marx y Engels antes de llegar a la sociedad comunista.",
  "Internacional": "Organización que reunía a obreros y socialistas de varios países.",
  "anarquistas": "Corriente que rechaza todo Estado. Proudhon y Bakunin se enfrentaron a Marx dentro de la Primera Internacional.",
  "Comuna de París": "Gobierno obrero que tomó la capital francesa en 1871 y fue aplastado.",
  "reformistas": "Socialistas que buscan cambios mediante reformas dentro de la democracia, no con una revolución.",
  "autocracia": "Gobierno en el que una sola persona, el zar, concentra todo el poder.",
  "bolcheviques": "Ala «mayoritaria» del partido socialdemócrata ruso desde 1903, liderada por Lenin.",
  "mencheviques": "Ala «minoritaria» del partido socialdemócrata ruso desde 1903.",
  "Domingo Sangriento": "9 de enero de 1905 (22 en nuestro calendario): los soldados disparan contra una marcha pacífica que llevaba una petición al zar.",
  "soviets": "Consejos de obreros y soldados. Nacen en 1905.",
  "Tesis de Abril": "Programa de Lenin (abril de 1917): ningún apoyo al Gobierno Provisional, poder para el proletariado y los campesinos pobres, tierras nacionalizadas.",
  "Gobierno Provisional": "Gobierno que reemplaza al zar en 1917 (primero Lvov, desde julio Kérenski) y sigue en la guerra.",
  "calendario juliano": "Calendario que usaba Rusia en 1917, 13 días atrasado respecto al nuestro (gregoriano).",
  "Brest-Litovsk": "Tratado de marzo de 1918 que saca a Rusia de la Primera Guerra Mundial.",
  "comunismo de guerra": "Política de la guerra civil (1918–1921): el Estado controla la economía.",
  "NEP": "Nueva Política Económica (1921): una vuelta parcial al mercado.",
  "URSS": "Unión de Repúblicas Socialistas Soviéticas, creada en 1922.",
  "purgas": "Eliminación de rivales dentro del partido."
};

// ---------------------------------------------------------------------
// 4. Contexto histórico (sección 6.0): cada oración resalta los paneles
//    de los capítulos a los que se refiere.
// ---------------------------------------------------------------------
const contexto = [
  { texto: "Entre 1516 y 1924, Europa pasó de imaginar sociedades perfectas a intentar construirlas.", paneles: [1, 2, 3, 4, 5, 6], anio: 1516 },
  { texto: "La Revolución Industrial creó fábricas, ciudades y una nueva clase, el proletariado, y con ella la «cuestión social».", paneles: [1, 2], anio: "s. XVIII–XIX" },
  { texto: "Llegaron respuestas distintas: comunidades modelo, una teoría de la lucha de clases y organizaciones obreras internacionales.", paneles: [1, 2, 3], anio: 1848 },
  { texto: "En Rusia, un imperio autocrático y poco industrializado, la guerra de 1914 abrió la oportunidad…", paneles: [4], anio: 1914 },
  { texto: "…para que un partido marxista tomara el poder en 1917…", paneles: [5], anio: 1917 },
  { texto: "…y fundara la URSS en 1922.", paneles: [6], anio: 1922 },
  { texto: "Esta página estudia cómo ocurrió ese paso de la idea al Estado.", paneles: [1, 2, 3, 4, 5, 6], anio: 1924 }
];

// ---------------------------------------------------------------------
// 5. Los 6 capítulos
//    panel: número de panel (1 a 6) · particula: tipo de partículas del parallax
//    apertura: los dos detalles de la secuencia de entrada (zoom en %)
//    pasos: los 4 pasos del scrollytelling (texto a partir de la sección 6)
// ---------------------------------------------------------------------
const capitulos = [
  {
    numero: 1,
    titulo: "De la utopía al socialismo utópico",
    subpregunta: "¿De dónde nace la idea de una sociedad sin desigualdad?",
    panel: 1,
    alt: "Ilustración: Tomás Moro escribe junto a una ventana; sobre la mesa, el plano de una ciudad circular; al fondo, el mar y una ciudad.",
    focoCara: "30% 40%",
    particula: "dorada",
    anio: 1516,
    apertura: {
      foco: null,
      detalles: [
        { x: 30, y: 38, zoom: 2.0, subtitulo: "Tomás Moro, 1516: imagina una sociedad perfecta." },
        { x: 56, y: 84, zoom: 2.3, subtitulo: "El plano de Utopía: una isla sin propiedad privada." }
      ]
    },
    pasos: [
      { titulo: "Una isla imaginaria", anio: 1516,
        texto: "En 1516 Tomás Moro publica <em>Utopía</em>: una isla imaginaria sin [[propiedad privada]]." },
      { titulo: "Sin propiedad privada", anio: 1516,
        texto: "Para Moro, la propiedad privada era la fuente de todos los males. Por eso su isla, su [[utopía]], no la tiene." },
      { titulo: "La Revolución Industrial", anio: "s. XVIII–XIX",
        texto: "Siglos después, la Revolución Industrial trae fábricas, turnos de 10 a 12 horas y hacinamiento. Nace la [[«cuestión social»|cuestión social]]." },
      { titulo: "Comunidades ideales", anio: 1825,
        texto: "Los primeros socialistas, que Engels llamó «utópicos» (Owen, Saint-Simon, Fourier y sus [[falansterios|falansterio]]), buscan aliviarla. En 1825 Owen funda New Harmony, en Indiana. Esas comunidades duran poco." }
    ],
    datosClave: {
      destacado: "1516",
      leyenda: "Moro publica Utopía",
      fechas: [
        { fecha: "1516", hecho: "Tomás Moro publica Utopía." },
        { fecha: "Siglos XVIII–XIX", hecho: "Revolución Industrial: fábricas, ciudades y proletariado." },
        { fecha: "1825", hecho: "Owen funda New Harmony, en Indiana." }
      ]
    },
    contadores: null,
    cita: null,
    sabiasQue: "La palabra «utopía» la creó Moro. Viene del griego y significa «no-lugar»: por eso el título de esta página.",
    paraRecordar: [
      "Moro imagina en 1516 una isla sin propiedad privada.",
      "La Revolución Industrial crea la «cuestión social».",
      "Los socialistas «utópicos» fundan comunidades modelo que duran poco."
    ],
    puente: "Las comunidades utópicas fracasaron. Marx y Engels buscarán otra cosa: una teoría.",
    concepto: null
  },
  {
    numero: 2,
    titulo: "Marx, Engels y el socialismo científico",
    subpregunta: "¿Cómo se convierte la utopía en una teoría que se presenta como científica?",
    panel: 2,
    alt: "Ilustración: Karl Marx junto a una vela roja y papeles; por la ventana, fábricas con chimeneas y obreros.",
    focoCara: "38% 50%",
    particula: "humo",
    anio: 1848,
    apertura: {
      // Nivel 5: «foco de luz». La pantalla empieza oscura y un círculo de luz centrado en la vela revela el panel.
      foco: { x: 41, y: 58 },
      detalles: [
        { x: 28, y: 36, zoom: 2.0, subtitulo: "Karl Marx: la historia como lucha de clases." },
        { x: 78, y: 66, zoom: 2.0, subtitulo: "Los obreros: el proletariado de las fábricas." }
      ]
    },
    pasos: [
      { titulo: "La historia como lucha de clases", anio: 1848,
        texto: "Marx y Engels explican la historia desde la economía, como una [[lucha de clases]]: [[burguesía]] contra [[proletariado]]." },
      { titulo: "El Manifiesto Comunista", anio: 1848,
        texto: "En 1848 publican el <em>Manifiesto Comunista</em>, con un llamado: «¡Proletarios de todos los países, uníos!»." },
      { titulo: "La plusvalía", anio: 1867,
        texto: "En 1867 sale el primer tomo de <em>El capital</em>. Explica la [[plusvalía]]: lo que el obrero produce después de cubrir su salario y no se le paga." },
      { titulo: "La meta: una sociedad sin Estado", anio: 1867,
        texto: "Proponen una etapa intermedia, la [[dictadura del proletariado]], y una meta: la sociedad comunista, sin propiedad privada ni Estado." }
    ],
    datosClave: {
      destacado: "1848",
      leyenda: "Manifiesto Comunista",
      fechas: [
        { fecha: "1848", hecho: "Marx y Engels publican el Manifiesto Comunista." },
        { fecha: "1867", hecho: "Sale el primer tomo de El capital." }
      ]
    },
    contadores: null,
    cita: { texto: "¡Proletarios de todos los países, uníos!", autor: "Marx y Engels", obra: "Manifiesto Comunista", anio: 1848 },
    sabiasQue: "Entre el Manifiesto Comunista (1848) y el primer tomo de El capital (1867) pasaron 19 años.",
    paraRecordar: [
      "La historia es lucha de clases: burguesía contra proletariado.",
      "Plusvalía: lo que el obrero produce y no se le paga.",
      "La meta es una sociedad sin propiedad privada ni Estado."
    ],
    puente: "Una teoría no basta: para cambiar la sociedad hace falta organizar a los obreros.",
    concepto: {
      tipo: "semana",
      anio: 1867,   // año que muestra el reloj durante esta secuencia
      titulo: "La semana del obrero",
      pie: "Esquema didáctico de la plusvalía (ejemplo de Engels, según el guion del grupo).",
      subtitulos: [
        "El obrero trabaja de lunes a sábado.",
        "Hasta el miércoles produce el valor de su salario.",
        "De jueves a sábado sigue produciendo, pero eso no se le paga.",
        "Plusvalía: lo que el obrero produce y no se le paga."
      ]
    }
  },
  {
    numero: 3,
    titulo: "El movimiento obrero se organiza",
    subpregunta: "¿Cómo pasan esas ideas a organizarse en un movimiento obrero?",
    panel: 3,
    alt: "Ilustración: una barricada con gente armada bajo una bandera roja; a la derecha, tropas que avanzan.",
    focoCara: "36% 55%",
    particula: "brasas",
    anio: 1864,
    apertura: {
      foco: null,
      detalles: [
        { x: 40, y: 14, zoom: 2.2, subtitulo: "La bandera roja: la Internacional, 1864." },
        { x: 33, y: 66, zoom: 1.8, subtitulo: "La barricada: la Comuna de París, 1871." }
      ]
    },
    pasos: [
      { titulo: "La Primera Internacional", anio: 1864,
        texto: "En 1864 nace en Londres la Primera [[Internacional]], con estatutos redactados por Marx." },
      { titulo: "Dos corrientes enfrentadas", anio: 1864,
        texto: "Dentro de la Internacional se enfrentan marxistas y [[anarquistas]], como Proudhon y Bakunin." },
      { titulo: "La Comuna de París", anio: 1871,
        texto: "En 1871 la [[Comuna de París]] toma la capital francesa." },
      { titulo: "La derrota y las reformas", anio: 1889,
        texto: "La Comuna es aplastada: primera gran derrota de la Internacional. Muchos socialistas optan por reformas dentro de la democracia ([[reformistas]]); en 1889 nace la Segunda Internacional." }
    ],
    datosClave: {
      destacado: "1871",
      leyenda: "La Comuna de París",
      fechas: [
        { fecha: "1864", hecho: "Nace en Londres la Primera Internacional." },
        { fecha: "1871", hecho: "La Comuna de París toma la capital y es aplastada." },
        { fecha: "1889", hecho: "Nace la Segunda Internacional." }
      ]
    },
    // Nivel 2: contadores que suben hasta la cifra cuando entran en pantalla
    contadores: [
      { valor: 1864, texto: "I Internacional", formato: "anio" },
      { valor: 1871, texto: "Comuna de París", formato: "anio" },
      { valor: 1889, texto: "II Internacional", formato: "anio" }
    ],
    cita: null,
    sabiasQue: "La Comuna de París fue aplastada en 1871, pero Lenin la tomó como referencia en sus Tesis de Abril, 46 años después.",
    paraRecordar: [
      "1864: la Primera Internacional organiza a los obreros.",
      "1871: la Comuna de París es aplastada.",
      "1889: muchos socialistas eligen reformas dentro de la democracia."
    ],
    puente: "La ola revolucionaria se frena en los países industrializados, pero no en Rusia.",
    concepto: {
      tipo: "mapa",
      anio: 1871,   // año que muestra el reloj durante esta secuencia
      titulo: "De Londres a París",
      pie: "Mapa esquemático (no está a escala).",
      subtitulos: [
        "1864: nace en Londres la Primera Internacional.",
        "1871: la Comuna de París toma la capital…",
        "…y es aplastada: primera gran derrota.",
        "1889: Segunda Internacional; muchos optan por reformas.",
        "La ola se frena en los países industrializados, pero no en Rusia."
      ]
    }
  },
  {
    numero: 4,
    titulo: "Rusia antes de la revolución",
    subpregunta: "¿Por qué Rusia fue el lugar donde estalló la revolución?",
    panel: 4,
    alt: "Ilustración: una procesión con íconos religiosos frente al Palacio de Invierno, en la nieve; a la derecha, soldados disparan.",
    focoCara: "60% 55%",
    particula: "nieve",
    anio: 1903,
    apertura: {
      foco: null,
      detalles: [
        { x: 20, y: 50, zoom: 2.0, subtitulo: "La procesión con íconos: una petición al zar." },
        { x: 86, y: 58, zoom: 2.0, subtitulo: "Los soldados disparan: el Domingo Sangriento." }
      ]
    },
    pasos: [
      { titulo: "Un imperio autocrático", anio: 1903,
        texto: "Rusia es una [[autocracia]]: el zar concentra todo el poder. Nicolás II pierde prestigio. En 1903 el partido socialdemócrata ruso se divide en [[bolcheviques]] («mayoritarios», con Lenin) y [[mencheviques]]." },
      { titulo: "Una petición al zar", anio: 1905,
        texto: "El 9 de enero de 1905 (22 en nuestro calendario), una marcha pacífica encabezada por Gapón lleva una petición al zar." },
      { titulo: "El Domingo Sangriento", anio: 1905,
        texto: "Los soldados disparan contra la marcha: es el [[Domingo Sangriento]]. Las cifras de muertos varían según la fuente." },
      { titulo: "Nacen los soviets", anio: 1914,
        texto: "Ese mismo año nacen los [[soviets]]. En 1914, Rusia entra en la Primera Guerra Mundial." }
    ],
    datosClave: {
      destacado: "1905",
      leyenda: "Domingo Sangriento",
      fechas: [
        { fecha: "1903", hecho: "El partido socialdemócrata ruso se divide: bolcheviques y mencheviques." },
        { fecha: "1904–1905", hecho: "Guerra ruso-japonesa." },
        { fecha: "9 ene 1905 (22 ene)", hecho: "Domingo Sangriento. Ese año nacen los soviets." },
        { fecha: "1914", hecho: "Rusia entra en la Primera Guerra Mundial." }
      ]
    },
    contadores: null,
    cita: null,
    sabiasQue: "El nombre «bolchevique» salió de una votación del congreso del partido en 1903: el grupo de Lenin quedó como «mayoritario».",
    paraRecordar: [
      "Rusia es una autocracia: el zar concentra todo el poder.",
      "1903: el partido se divide en bolcheviques y mencheviques.",
      "1905: Domingo Sangriento y nacimiento de los soviets."
    ],
    puente: "La guerra de 1914 abre la oportunidad: en 1917 Rusia vive dos revoluciones.",
    concepto: {
      tipo: "choque",
      anio: 1905,   // año que muestra el reloj durante esta secuencia
      titulo: "El choque",
      pie: "Las cifras varían según la fuente. Completar cada fuente con el guion del grupo.",
      // Cifras de muertos que no coinciden (nivel 3). Fuentes EDITABLES.
      cifras: [
        { valor: "96", fuente: "Cifra oficial del gobierno zarista (verificar en el guion)" },
        { valor: "+200", fuente: "[Completar con la fuente del guion]" },
        { valor: "+1000", fuente: "[Completar con la fuente del guion]" }
      ],
      subtitulos: [
        "A la izquierda, una marcha pacífica con una petición al zar.",
        "A la derecha, los soldados. Se encuentran: el Domingo Sangriento.",
        "¿Cuántos murieron? Las cifras varían según la fuente."
      ]
    }
  },
  {
    numero: 5,
    titulo: "1917: las dos revoluciones",
    subpregunta: "¿Cómo llegaron los bolcheviques al poder?",
    panel: 5,
    alt: "Ilustración: Lenin habla desde una tribuna ante una multitud con banderas rojas; al fondo, un palacio y un crucero.",
    focoCara: "22% 35%",
    particula: "volantes",
    anio: 1917,
    apertura: {
      foco: null,
      detalles: [
        { x: 22, y: 28, zoom: 2.2, subtitulo: "Lenin habla: las Tesis de Abril." },
        { x: 70, y: 44, zoom: 1.9, subtitulo: "El crucero y el palacio: octubre de 1917." }
      ]
    },
    pasos: [
      { titulo: "Cae el zar; habla Lenin", anio: 1917,
        texto: "En febrero (marzo) de 1917, huelgas y protestas por falta de pan, a las que se suman los soldados, llevan a la abdicación del zar. En abril, Lenin presenta sus [[Tesis de Abril]]." },
      { titulo: "Dos poderes", anio: 1917,
        texto: "Gobierna un [[Gobierno Provisional]] (primero Lvov, desde julio Kérenski) que sigue en la guerra, junto a los [[soviets]] de obreros y soldados. Las Tesis piden: ningún apoyo a ese gobierno, poder para el proletariado y los campesinos pobres, tierras nacionalizadas." },
      { titulo: "Octubre: los bolcheviques toman el poder", anio: 1917,
        texto: "El 25 de octubre (7 de noviembre) los bolcheviques, con Lenin y Trotski, toman el poder." },
      { titulo: "¿Octubre o noviembre?", anio: 1917,
        texto: "Rusia usaba el [[calendario juliano]], 13 días atrasado. Por eso la «Revolución de Octubre» fue en noviembre según nuestro calendario." }
    ],
    datosClave: {
      destacado: "25 oct (7 nov) 1917",
      leyenda: "Revolución de Octubre",
      fechas: [
        { fecha: "23 feb 1917 (8 mar)", hecho: "Revolución de Febrero: abdica el zar." },
        { fecha: "Abril 1917 (en ambos calendarios)", hecho: "Lenin presenta las Tesis de Abril." },
        { fecha: "Julio 1917 (en ambos calendarios)", hecho: "Kérenski encabeza el Gobierno Provisional." },
        { fecha: "25 oct 1917 (7 nov)", hecho: "Revolución de Octubre: los bolcheviques toman el poder." }
      ]
    },
    contadores: null,
    cita: { texto: "Ningún apoyo al Gobierno Provisional.", autor: "Lenin", obra: "Tesis de Abril", anio: 1917 },
    sabiasQue: "La Revolución de Octubre ocurrió el 7 de noviembre según nuestro calendario.",
    paraRecordar: [
      "Febrero (marzo) de 1917: cae el zar.",
      "Abril: Lenin niega todo apoyo al Gobierno Provisional.",
      "25 de octubre (7 de noviembre): los bolcheviques toman el poder."
    ],
    puente: "Tomar el poder era el primer paso; ahora había que construir un Estado.",
    concepto: {
      tipo: "calendarios",
      anio: 1917,   // año que muestra el reloj durante esta secuencia
      titulo: "Dos calendarios",
      pie: "Rusia usaba el calendario juliano, 13 días atrasado respecto al gregoriano.",
      hojas: [
        { juliano: { dia: "23", mes: "feb" }, gregoriano: { dia: "8", mes: "mar" }, hecho: "Revolución de Febrero" },
        { juliano: { dia: "25", mes: "oct" }, gregoriano: { dia: "7", mes: "nov" }, hecho: "Revolución de Octubre" }
      ],
      subtitulos: [
        "Rusia usaba el calendario juliano: 13 días atrasado.",
        "Revolución de Febrero: 23 de febrero en Rusia, 8 de marzo para nosotros.",
        "Revolución de Octubre: 25 de octubre en Rusia, 7 de noviembre para nosotros."
      ]
    }
  },
  {
    numero: 6,
    titulo: "Consecuencias: nace la URSS",
    subpregunta: "¿Cómo se convirtió ese poder en el primer Estado comunista del mundo?",
    panel: 6,
    alt: "Ilustración: un cartel soviético rasgado con trabajadores y el retrato de Lenin; a la derecha, la sombra de un hombre con gorra.",
    focoCara: "76% 40%",
    particula: "polvo",
    anio: 1918,
    apertura: {
      foco: null,
      detalles: [
        { x: 38, y: 22, zoom: 2.4, subtitulo: "El retrato de Lenin en un cartel rasgado." },
        { x: 80, y: 42, zoom: 2.0, subtitulo: "Una sombra crece: Stalin." }
      ]
    },
    pasos: [
      { titulo: "Salir de la guerra", anio: 1918,
        texto: "En marzo de 1918 el Tratado de [[Brest-Litovsk]] saca a Rusia de la guerra, con grandes pérdidas de territorio y población." },
      { titulo: "Guerra civil y nacimiento de la URSS", anio: 1922,
        texto: "Sigue la guerra civil (rojos contra blancos, 1918–1921) y el [[comunismo de guerra]]: el Estado controla la economía. En 1921 la [[NEP]] permite una vuelta parcial al mercado. En 1922 se crea la [[URSS]]." },
      { titulo: "Muere Lenin", anio: 1924,
        texto: "En 1924 muere Lenin, el líder que había llevado a los bolcheviques al poder." },
      { titulo: "La sombra de Stalin", anio: 1924,
        texto: "Tras luchas internas y [[purgas]], Stalin toma el control." }
    ],
    datosClave: {
      destacado: "1922",
      leyenda: "Se crea la URSS",
      fechas: [
        { fecha: "Marzo 1918", hecho: "Tratado de Brest-Litovsk: Rusia sale de la guerra." },
        { fecha: "1918–1921", hecho: "Guerra civil (rojos contra blancos) y comunismo de guerra." },
        { fecha: "1921", hecho: "La NEP: vuelta parcial al mercado." },
        { fecha: "1922", hecho: "Se crea la URSS." },
        { fecha: "1924", hecho: "Muere Lenin; Stalin toma el control." }
      ]
    },
    contadores: [
      { valor: 780000, texto: "km² de territorio perdidos en Brest-Litovsk", formato: "miles", sufijo: " km²" },
      { valor: 56, texto: "millones de habitantes perdidos", formato: "simple", sufijo: " millones" }
    ],
    cita: null,
    sabiasQue: "Entre la toma del poder (1917) y la creación de la URSS (1922) pasaron cinco años de guerra civil, comunismo de guerra y NEP.",
    paraRecordar: [
      "1918: Brest-Litovsk saca a Rusia de la guerra a un alto precio.",
      "1922: se crea la URSS, el primer Estado comunista del mundo.",
      "1924: muere Lenin y Stalin toma el control."
    ],
    puente: "Ya tienes los seis pasos. La red muestra cómo se conectan entre sí.",
    concepto: {
      tipo: "brest",
      anio: 1918,   // año que muestra el reloj durante esta secuencia
      titulo: "El precio de la paz",
      pie: "Mapa esquemático (no está a escala).",
      subtitulos: [
        "Marzo de 1918: el Tratado de Brest-Litovsk saca a Rusia de la guerra.",
        "El precio: grandes pérdidas de territorio y población.",
        "Tras la guerra civil, en 1922 las repúblicas soviéticas forman la URSS."
      ]
    }
  }
];

// ---------------------------------------------------------------------
// 6. Enfoques de la imagen en cada paso del scrollytelling (tabla 5.1)
//    x, y: punto del panel que queda al centro (en %) · zoom: aumento
// ---------------------------------------------------------------------
const pasos = [
  { capitulo: 1, paso: 1, panel: 1, x: 50, y: 50, zoom: 1 },     // Panel 1 completo
  { capitulo: 1, paso: 2, panel: 1, x: 56, y: 84, zoom: 2.2 },   // Plano de Utopía sobre la mesa
  { capitulo: 1, paso: 3, panel: 2, x: 78, y: 55, zoom: 2.0 },   // Panel 2, mitad derecha: fábricas y obreros
  { capitulo: 1, paso: 4, panel: 1, x: 80, y: 45, zoom: 2.0 },   // El mar y la ciudad al fondo
  { capitulo: 2, paso: 1, panel: 2, x: 32, y: 42, zoom: 1.7 },   // Marx junto a la vela
  { capitulo: 2, paso: 2, panel: 2, x: 40, y: 72, zoom: 2.4 },   // La vela roja y los papeles
  { capitulo: 2, paso: 3, panel: 2, x: 78, y: 62, zoom: 2.0 },   // Mitad derecha: los obreros
  { capitulo: 2, paso: 4, panel: 2, x: 50, y: 50, zoom: 1 },     // Panel 2 completo
  { capitulo: 3, paso: 1, panel: 3, x: 50, y: 50, zoom: 1 },     // Panel 3 completo
  { capitulo: 3, paso: 2, panel: 3, x: 40, y: 15, zoom: 2.2 },   // La bandera roja
  { capitulo: 3, paso: 3, panel: 3, x: 33, y: 65, zoom: 1.8 },   // La barricada y la gente
  { capitulo: 3, paso: 4, panel: 3, x: 85, y: 78, zoom: 2.2 },   // Las tropas que avanzan
  { capitulo: 4, paso: 1, panel: 4, x: 68, y: 28, zoom: 1.9 },   // El Palacio de Invierno
  { capitulo: 4, paso: 2, panel: 4, x: 20, y: 50, zoom: 2.0 },   // La procesión con íconos
  { capitulo: 4, paso: 3, panel: 4, x: 86, y: 58, zoom: 2.0 },   // Los soldados disparando
  { capitulo: 4, paso: 4, panel: 4, x: 50, y: 50, zoom: 1 },     // Panel 4 completo
  { capitulo: 5, paso: 1, panel: 5, x: 22, y: 28, zoom: 2.2 },   // Lenin hablando
  { capitulo: 5, paso: 2, panel: 5, x: 48, y: 75, zoom: 1.9 },   // La multitud con banderas
  { capitulo: 5, paso: 3, panel: 5, x: 70, y: 45, zoom: 1.9 },   // El crucero y el palacio
  { capitulo: 5, paso: 4, panel: 5, x: 50, y: 50, zoom: 1 },     // Panel 5 completo
  { capitulo: 6, paso: 1, panel: 6, x: 32, y: 50, zoom: 1.6 },   // El cartel rasgado
  { capitulo: 6, paso: 2, panel: 6, x: 28, y: 62, zoom: 2.2 },   // Los trabajadores del cartel
  { capitulo: 6, paso: 3, panel: 6, x: 38, y: 22, zoom: 2.4 },   // El retrato de Lenin
  { capitulo: 6, paso: 4, panel: 6, x: 80, y: 42, zoom: 2.0 }    // La sombra
];

// ---------------------------------------------------------------------
// 7. Red de relaciones históricas: nodos
//    tipo: causa | idea | actor | acontecimiento | consecuencia
//    anio: posición en el eje del tiempo (si no hay una fecha exacta, solo sirve para ubicarlo)
//    fechaTexto: lo que se muestra al usuario
// ---------------------------------------------------------------------
const tiposNodo = [
  { id: "causa", nombre: "Causas", singular: "Causa", forma: "rombo" },
  { id: "idea", nombre: "Ideas y obras", singular: "Idea u obra", forma: "hexagono" },
  { id: "actor", nombre: "Actores", singular: "Actor", forma: "iniciales" },
  { id: "acontecimiento", nombre: "Acontecimientos", singular: "Acontecimiento", forma: "circulo" },
  { id: "consecuencia", nombre: "Consecuencias", singular: "Consecuencia", forma: "cuadrado" }
];

const nodos = [
  // ----- Causas -----
  { id: "rev-industrial", nombre: "Revolución Industrial", corto: "Rev. Industrial", tipo: "causa", capitulo: 1, anio: 1780, fechaTexto: "siglos XVIII–XIX",
    descripcion: "Crea fábricas, ciudades y una nueva clase: el proletariado.", fuente: "Texto base del grupo, §6.0 y §6.1" },
  { id: "miseria-obrera", nombre: "Miseria obrera y cuestión social", corto: "Miseria obrera", tipo: "causa", capitulo: 1, anio: 1812, fechaTexto: "siglo XIX",
    descripcion: "Turnos de 10 a 12 horas y hacinamiento: la «cuestión social».", fuente: "Texto base del grupo, §6.1" },
  { id: "autocracia", nombre: "Autocracia de Nicolás II", corto: "Autocracia", tipo: "causa", capitulo: 4, anio: 1897, fechaTexto: "hasta 1917",
    descripcion: "El zar concentra todo el poder. Nicolás II pierde prestigio.", fuente: "Texto base del grupo, §6.4" },
  { id: "campesinado", nombre: "Campesinado pobre", corto: "Campesinado", tipo: "causa", capitulo: 4, anio: 1901, fechaTexto: "inicios del siglo XX",
    descripcion: "Los campesinos pobres, a quienes las Tesis de Abril prometen poder y tierras nacionalizadas.", fuente: "Texto base del grupo, §6.5" },
  { id: "guerra-ruso-japonesa", nombre: "Guerra ruso-japonesa", corto: "Guerra ruso-jap.", tipo: "causa", capitulo: 4, anio: 1904.5, fechaTexto: "1904–1905",
    descripcion: "Guerra que debilita a Nicolás II.", fuente: "Red del grupo (sección 7)" },
  { id: "primera-guerra", nombre: "Primera Guerra Mundial", corto: "I Guerra Mundial", tipo: "causa", capitulo: 4, anio: 1914, fechaTexto: "1914",
    descripcion: "Rusia entra en 1914. La guerra abre la oportunidad para la revolución.", fuente: "Texto base del grupo, §6.0 y §6.4" },

  // ----- Ideas y obras -----
  { id: "utopia", nombre: "Utopía", corto: "Utopía", tipo: "idea", capitulo: 1, anio: 1516, fechaTexto: "1516",
    descripcion: "Libro de Tomás Moro: una isla imaginaria sin propiedad privada, que él consideraba la fuente de todos los males.", fuente: "Texto base del grupo, §6.1" },
  { id: "socialismo-utopico", nombre: "Socialismo utópico", corto: "Socialismo utópico", tipo: "idea", capitulo: 1, anio: 1822, fechaTexto: "siglo XIX",
    descripcion: "Owen, Saint-Simon y Fourier buscan aliviar la cuestión social con comunidades modelo, que duran poco.", fuente: "Texto base del grupo, §6.1" },
  { id: "manifiesto", nombre: "Manifiesto Comunista", corto: "Manifiesto", tipo: "idea", capitulo: 2, anio: 1848, fechaTexto: "1848",
    descripcion: "Marx y Engels: «¡Proletarios de todos los países, uníos!».", fuente: "Texto base del grupo, §6.2" },
  { id: "socialismo-cientifico", nombre: "Socialismo científico: lucha de clases y plusvalía", corto: "Soc. científico", tipo: "idea", capitulo: 2, anio: 1857, fechaTexto: "1848–1867",
    descripcion: "La historia explicada desde la economía como lucha de clases. Meta: una sociedad sin propiedad privada ni Estado.", fuente: "Texto base del grupo, §6.2" },
  { id: "el-capital", nombre: "El capital, tomo I", corto: "El capital", tipo: "idea", capitulo: 2, anio: 1867, fechaTexto: "1867",
    descripcion: "Explica la plusvalía: lo que el obrero produce después de cubrir su salario y no se le paga.", fuente: "Texto base del grupo, §6.2" },
  { id: "reformistas", nombre: "Reformistas vs. revolucionarios", corto: "Reforma o revolución", tipo: "idea", capitulo: 3, anio: 1889, fechaTexto: "fines del siglo XIX",
    descripcion: "Muchos socialistas optan por reformas dentro de la democracia; otros siguen buscando la revolución.", fuente: "Texto base del grupo, §6.3" },
  { id: "tesis-abril", nombre: "Tesis de Abril", corto: "Tesis de Abril", tipo: "idea", capitulo: 5, anio: 1917.3, fechaTexto: "abril de 1917",
    descripcion: "Lenin: ningún apoyo al Gobierno Provisional, poder para el proletariado y los campesinos pobres, tierras nacionalizadas.", fuente: "Texto base del grupo, §6.5" },
  { id: "lema", nombre: "Lema «paz, pan y tierra»", corto: "Paz, pan y tierra", tipo: "idea", capitulo: 5, anio: 1917.6, fechaTexto: "1917",
    descripcion: "Lema que difunden los bolcheviques en 1917.", fuente: "Red del grupo (sección 7)" },

  // ----- Actores (círculo con iniciales) -----
  { id: "moro", nombre: "Tomás Moro", iniciales: "TM", tipo: "actor", capitulo: 1, anio: 1516, fechaTexto: "1516",
    descripcion: "Autor de Utopía (1516).", fuente: "Texto base del grupo, §6.1" },
  { id: "saint-simon", nombre: "Saint-Simon", iniciales: "SS", tipo: "actor", capitulo: 1, anio: 1814, fechaTexto: "siglo XIX",
    descripcion: "Uno de los primeros socialistas, que Engels llamó «utópicos».", fuente: "Texto base del grupo, §6.1" },
  { id: "fourier", nombre: "Fourier", iniciales: "Fo", tipo: "actor", capitulo: 1, anio: 1820, fechaTexto: "siglo XIX",
    descripcion: "Socialista «utópico»; propuso los falansterios.", fuente: "Texto base del grupo, §6.1" },
  { id: "owen", nombre: "Robert Owen", iniciales: "RO", tipo: "actor", capitulo: 1, anio: 1826, fechaTexto: "siglo XIX",
    descripcion: "Socialista «utópico»; en 1825 funda New Harmony, en Indiana.", fuente: "Texto base del grupo, §6.1" },
  { id: "marx", nombre: "Marx", iniciales: "KM", tipo: "actor", capitulo: 2, anio: 1847, fechaTexto: "siglo XIX",
    descripcion: "Explica la historia como lucha de clases; escribe El capital y redacta los estatutos de la Primera Internacional.", fuente: "Texto base del grupo, §6.2 y §6.3" },
  { id: "engels", nombre: "Engels", iniciales: "FE", tipo: "actor", capitulo: 2, anio: 1852, fechaTexto: "siglo XIX",
    descripcion: "Escribe con Marx el Manifiesto Comunista (1848); llamó «utópicos» a los primeros socialistas.", fuente: "Texto base del grupo, §6.1 y §6.2" },
  { id: "proudhon", nombre: "Proudhon", iniciales: "Pr", tipo: "actor", capitulo: 3, anio: 1862, fechaTexto: "siglo XIX",
    descripcion: "Anarquista; se enfrenta a Marx dentro de la Primera Internacional.", fuente: "Texto base del grupo, §6.3" },
  { id: "bakunin", nombre: "Bakunin", iniciales: "Ba", tipo: "actor", capitulo: 3, anio: 1868, fechaTexto: "siglo XIX",
    descripcion: "Anarquista; se enfrenta a Marx dentro de la Primera Internacional.", fuente: "Texto base del grupo, §6.3" },
  { id: "nicolas", nombre: "Nicolás II", iniciales: "N2", tipo: "actor", capitulo: 4, anio: 1899, fechaTexto: "zar hasta 1917",
    descripcion: "Zar de Rusia; pierde prestigio y abdica en febrero (marzo) de 1917.", fuente: "Texto base del grupo, §6.4 y §6.5" },
  { id: "lenin", nombre: "Lenin", iniciales: "Le", tipo: "actor", capitulo: 4, anio: 1902.6, fechaTexto: "1903–1924",
    descripcion: "Líder bolchevique; presenta las Tesis de Abril y dirige la toma del poder en octubre de 1917. Muere en 1924.", fuente: "Texto base del grupo, §6.4 a §6.6" },
  { id: "bolcheviques", nombre: "Bolcheviques", iniciales: "Bo", tipo: "actor", capitulo: 4, anio: 1904, fechaTexto: "desde 1903",
    descripcion: "Ala «mayoritaria» del partido socialdemócrata ruso, con Lenin.", fuente: "Texto base del grupo, §6.4" },
  { id: "mencheviques", nombre: "Mencheviques", iniciales: "Me", tipo: "actor", capitulo: 4, anio: 1905.5, fechaTexto: "desde 1903",
    descripcion: "Ala «minoritaria» del partido socialdemócrata ruso.", fuente: "Texto base del grupo, §6.4" },
  { id: "gapon", nombre: "Gapón", iniciales: "Ga", tipo: "actor", capitulo: 4, anio: 1907, fechaTexto: "1905",
    descripcion: "Encabeza la marcha pacífica del Domingo Sangriento (1905).", fuente: "Red del grupo (sección 7)" },
  { id: "lvov", nombre: "Lvov", iniciales: "Lv", tipo: "actor", capitulo: 5, anio: 1916.9, fechaTexto: "1917",
    descripcion: "Encabeza primero el Gobierno Provisional (1917).", fuente: "Texto base del grupo, §6.5" },
  { id: "soviets", nombre: "Soviets", iniciales: "So", tipo: "actor", capitulo: 5, anio: 1917.2, fechaTexto: "desde 1905",
    descripcion: "Consejos de obreros y soldados. Nacen en 1905 y en 1917 gobiernan junto al Gobierno Provisional.", fuente: "Texto base del grupo, §6.4 y §6.5" },
  { id: "kerenski", nombre: "Kérenski", iniciales: "Ké", tipo: "actor", capitulo: 5, anio: 1917.55, fechaTexto: "desde julio de 1917",
    descripcion: "Encabeza el Gobierno Provisional desde julio de 1917.", fuente: "Texto base del grupo, §6.5" },
  { id: "trotski", nombre: "Trotski", iniciales: "Tr", tipo: "actor", capitulo: 5, anio: 1917.9, fechaTexto: "1917",
    descripcion: "Junto a Lenin, dirige la toma del poder en octubre de 1917.", fuente: "Texto base del grupo, §6.5" },
  { id: "stalin", nombre: "Stalin", iniciales: "St", tipo: "actor", capitulo: 6, anio: 1924, fechaTexto: "desde 1924",
    descripcion: "Tras luchas internas y purgas, toma el control después de la muerte de Lenin.", fuente: "Texto base del grupo, §6.6" },

  // ----- Acontecimientos -----
  { id: "new-harmony", nombre: "New Harmony", corto: "New Harmony", tipo: "acontecimiento", capitulo: 1, anio: 1825, fechaTexto: "1825",
    descripcion: "Comunidad fundada por Owen en Indiana. Como las demás comunidades utópicas, dura poco.", fuente: "Texto base del grupo, §6.1" },
  { id: "i-internacional", nombre: "I Internacional", corto: "I Internacional", tipo: "acontecimiento", capitulo: 3, anio: 1864, fechaTexto: "1864",
    descripcion: "Nace en Londres, con estatutos redactados por Marx.", fuente: "Texto base del grupo, §6.3" },
  { id: "comuna", nombre: "Comuna de París", corto: "Comuna de París", tipo: "acontecimiento", capitulo: 3, anio: 1871, fechaTexto: "1871",
    descripcion: "Toma la capital francesa y es aplastada: primera gran derrota de la Internacional.", fuente: "Texto base del grupo, §6.3" },
  { id: "ii-internacional", nombre: "II Internacional", corto: "II Internacional", tipo: "acontecimiento", capitulo: 3, anio: 1889, fechaTexto: "1889",
    descripcion: "Nace cuando muchos socialistas optan por reformas dentro de la democracia.", fuente: "Texto base del grupo, §6.3" },
  { id: "division-1903", nombre: "División bolcheviques/mencheviques", corto: "División de 1903", tipo: "acontecimiento", capitulo: 4, anio: 1903, fechaTexto: "1903",
    descripcion: "El partido socialdemócrata ruso se divide en bolcheviques y mencheviques.", fuente: "Texto base del grupo, §6.4" },
  { id: "domingo-sangriento", nombre: "Domingo Sangriento y revolución de 1905", corto: "Domingo Sangriento", tipo: "acontecimiento", capitulo: 4, anio: 1905, fechaTexto: "9 ene 1905 (22 ene)",
    descripcion: "Los soldados disparan contra una marcha pacífica que llevaba una petición al zar. Ese año nacen los soviets.", fuente: "Texto base del grupo, §6.4" },
  { id: "febrero-1917", nombre: "Revolución de Febrero", corto: "Rev. de Febrero", tipo: "acontecimiento", capitulo: 5, anio: 1917.05, fechaTexto: "23 feb 1917 (8 mar)",
    descripcion: "Huelgas y protestas por falta de pan, a las que se suman los soldados, llevan a la abdicación del zar.", fuente: "Texto base del grupo, §6.5" },
  { id: "octubre-1917", nombre: "Revolución de Octubre", corto: "Rev. de Octubre", tipo: "acontecimiento", capitulo: 5, anio: 1917.85, fechaTexto: "25 oct 1917 (7 nov)",
    descripcion: "Los bolcheviques, con Lenin y Trotski, toman el poder.", fuente: "Texto base del grupo, §6.5" },

  // ----- Consecuencias -----
  { id: "gobierno-provisional", nombre: "Gobierno Provisional", corto: "Gob. Provisional", tipo: "consecuencia", capitulo: 5, anio: 1917.15, fechaTexto: "1917",
    descripcion: "Gobierna tras la caída del zar (primero Lvov, desde julio Kérenski) y sigue en la guerra.", fuente: "Texto base del grupo, §6.5" },
  { id: "brest-litovsk", nombre: "Brest-Litovsk", corto: "Brest-Litovsk", tipo: "consecuencia", capitulo: 6, anio: 1918.2, fechaTexto: "marzo de 1918",
    descripcion: "Saca a Rusia de la guerra con grandes pérdidas de territorio y población.", fuente: "Texto base del grupo, §6.6" },
  { id: "guerra-civil", nombre: "Guerra civil", corto: "Guerra civil", tipo: "consecuencia", capitulo: 6, anio: 1918.9, fechaTexto: "1918–1921",
    descripcion: "Rojos contra blancos.", fuente: "Texto base del grupo, §6.6" },
  { id: "comunismo-guerra", nombre: "Comunismo de guerra", corto: "Com. de guerra", tipo: "consecuencia", capitulo: 6, anio: 1919.8, fechaTexto: "1918–1921",
    descripcion: "El Estado controla la economía.", fuente: "Texto base del grupo, §6.6" },
  { id: "nep", nombre: "NEP", corto: "NEP", tipo: "consecuencia", capitulo: 6, anio: 1921, fechaTexto: "1921",
    descripcion: "Una vuelta parcial al mercado.", fuente: "Texto base del grupo, §6.6" },
  { id: "urss", nombre: "Creación de la URSS", corto: "URSS", tipo: "consecuencia", capitulo: 6, anio: 1922, fechaTexto: "1922",
    descripcion: "Se crea la URSS: el primer Estado comunista del mundo.", fuente: "Texto base del grupo, §6.6" },
  { id: "muerte-lenin", nombre: "Muerte de Lenin y ascenso de Stalin", corto: "Muerte de Lenin", tipo: "consecuencia", capitulo: 6, anio: 1923.6, fechaTexto: "1924",
    descripcion: "Muere Lenin; tras luchas internas y purgas, Stalin toma el control.", fuente: "Texto base del grupo, §6.6" }
];

// ---------------------------------------------------------------------
// 8. Red: conexiones (desde → relación → hacia)
//    frase: opcional, cuando la frase automática «A relación B» no se lee bien
// ---------------------------------------------------------------------
const conexiones = [
  { desde: "rev-industrial", hacia: "miseria-obrera", relacion: "provoca" },
  { desde: "miseria-obrera", hacia: "socialismo-utopico", relacion: "motiva" },
  { desde: "moro", hacia: "utopia", relacion: "escribe" },
  { desde: "utopia", hacia: "socialismo-utopico", relacion: "da nombre a" },
  { desde: "saint-simon", hacia: "socialismo-utopico", relacion: "forma parte de" },
  { desde: "fourier", hacia: "socialismo-utopico", relacion: "forma parte de" },
  { desde: "owen", hacia: "socialismo-utopico", relacion: "forma parte de" },
  { desde: "owen", hacia: "new-harmony", relacion: "funda" },
  { desde: "marx", hacia: "manifiesto", relacion: "escribe" },
  { desde: "engels", hacia: "manifiesto", relacion: "escribe" },
  { desde: "marx", hacia: "el-capital", relacion: "escribe" },
  { desde: "manifiesto", hacia: "socialismo-cientifico", relacion: "expone" },
  { desde: "el-capital", hacia: "socialismo-cientifico", relacion: "expone" },
  { desde: "socialismo-cientifico", hacia: "socialismo-utopico", relacion: "llama «utópico» a" },
  { desde: "miseria-obrera", hacia: "socialismo-cientifico", relacion: "es explicada por" },
  { desde: "marx", hacia: "i-internacional", relacion: "redacta los estatutos de" },
  { desde: "proudhon", hacia: "marx", relacion: "se enfrenta a" },
  { desde: "bakunin", hacia: "marx", relacion: "se enfrenta a" },
  { desde: "i-internacional", hacia: "comuna", relacion: "sufre su primera gran derrota en" },
  { desde: "i-internacional", hacia: "ii-internacional", relacion: "le sigue",
    frase: "A la I Internacional le sigue la II Internacional" },
  { desde: "ii-internacional", hacia: "reformistas", relacion: "reúne el debate entre" },
  { desde: "division-1903", hacia: "bolcheviques", relacion: "crea" },
  { desde: "division-1903", hacia: "mencheviques", relacion: "crea" },
  { desde: "lenin", hacia: "bolcheviques", relacion: "lidera a" },
  { desde: "socialismo-cientifico", hacia: "bolcheviques", relacion: "inspira a" },
  { desde: "nicolas", hacia: "autocracia", relacion: "ejerce",
    frase: "Nicolás II ejerce la autocracia" },
  { desde: "guerra-ruso-japonesa", hacia: "nicolas", relacion: "debilita a" },
  { desde: "autocracia", hacia: "domingo-sangriento", relacion: "alimenta" },
  { desde: "campesinado", hacia: "domingo-sangriento", relacion: "alimenta" },
  { desde: "gapon", hacia: "domingo-sangriento", relacion: "encabeza la marcha del",
    frase: "Gapón encabeza la marcha del Domingo Sangriento" },
  { desde: "domingo-sangriento", hacia: "soviets", relacion: "hace nacer",
    frase: "El Domingo Sangriento y la revolución de 1905 hacen nacer los soviets" },
  { desde: "primera-guerra", hacia: "febrero-1917", relacion: "detona" },
  { desde: "febrero-1917", hacia: "nicolas", relacion: "derriba a" },
  { desde: "febrero-1917", hacia: "gobierno-provisional", relacion: "lleva a" },
  { desde: "lvov", hacia: "gobierno-provisional", relacion: "encabeza primero" },
  { desde: "kerenski", hacia: "gobierno-provisional", relacion: "encabeza desde julio" },
  { desde: "lenin", hacia: "tesis-abril", relacion: "presenta" },
  { desde: "comuna", hacia: "tesis-abril", relacion: "es tomada como referencia en" },
  { desde: "tesis-abril", hacia: "gobierno-provisional", relacion: "niega apoyo a" },
  { desde: "bolcheviques", hacia: "lema", relacion: "difunden" },
  { desde: "lenin", hacia: "octubre-1917", relacion: "protagoniza" },
  { desde: "trotski", hacia: "octubre-1917", relacion: "protagoniza" },
  { desde: "soviets", hacia: "octubre-1917", relacion: "protagonizan" },
  { desde: "octubre-1917", hacia: "gobierno-provisional", relacion: "derroca a" },
  { desde: "octubre-1917", hacia: "brest-litovsk", relacion: "lleva a" },
  { desde: "octubre-1917", hacia: "guerra-civil", relacion: "desata" },
  { desde: "guerra-civil", hacia: "comunismo-guerra", relacion: "impone" },
  { desde: "comunismo-guerra", hacia: "nep", relacion: "es reemplazado por" },
  { desde: "guerra-civil", hacia: "urss", relacion: "permite",
    frase: "La guerra civil (victoria roja) permite la creación de la URSS" },
  { desde: "muerte-lenin", hacia: "stalin", relacion: "abre paso a",
    frase: "La muerte de Lenin abre paso al ascenso de Stalin" }
];

// ---------------------------------------------------------------------
// 9. Recorrido guiado «De la utopía al Estado» (10 pasos)
// ---------------------------------------------------------------------
const recorrido = [
  { nodos: ["utopia"], frase: "1516: Moro imagina una isla sin propiedad privada. La idea existe, pero solo en un libro." },
  { nodos: ["rev-industrial"], frase: "Siglos después, la Revolución Industrial crea fábricas, ciudades y el proletariado." },
  { nodos: ["miseria-obrera"], frase: "Turnos de 10 a 12 horas y hacinamiento: nace la «cuestión social»." },
  { nodos: ["socialismo-utopico"], frase: "Owen, Saint-Simon y Fourier responden con comunidades modelo, como New Harmony (1825). Duran poco." },
  { nodos: ["socialismo-cientifico"], frase: "Marx y Engels convierten la idea en teoría: lucha de clases y plusvalía (1848, 1867)." },
  { nodos: ["i-internacional"], frase: "1864: los obreros se organizan entre países. La Comuna de París (1871) es su primera gran derrota." },
  { nodos: ["autocracia", "primera-guerra"], frase: "En Rusia, un zar con todo el poder y la guerra de 1914 abren la oportunidad." },
  { nodos: ["febrero-1917"], frase: "Febrero (marzo) de 1917: las protestas por pan y los soldados que se suman derriban al zar." },
  { nodos: ["octubre-1917"], frase: "25 de octubre (7 de noviembre) de 1917: los bolcheviques de Lenin y Trotski toman el poder." },
  { nodos: ["urss"], frase: "Tras la guerra civil, en 1922 nace la URSS: el primer Estado comunista del mundo." }
];

// ---------------------------------------------------------------------
// 10. Línea de tiempo: eventos
//     posicion: lugar en la línea (año con decimales para separar meses del mismo año)
//     fechaJuliana / fechaGregoriana: solo en 1905 y 1917
//     nodo: id del nodo de la red con el que se conecta («Ver en la red»)
// ---------------------------------------------------------------------
const tiposEvento = [
  { id: "causa", nombre: "Causa" },
  { id: "idea", nombre: "Idea u obra" },
  { id: "acontecimiento", nombre: "Acontecimiento" },
  { id: "consecuencia", nombre: "Consecuencia" }
];

const eventos = [
  { id: "utopia-1516", anio: 1516, posicion: 1516, fecha: "1516", titulo: "Moro publica Utopía", capitulo: 1, tipo: "idea", nodo: "utopia",
    que: "Tomás Moro describe una isla imaginaria sin propiedad privada.",
    porQue: "Es la idea de partida: una sociedad sin propiedad privada.", fuente: "Texto base del grupo, §6.1" },
  { id: "rev-industrial", anio: 1780, posicion: 1780, fecha: "Siglos XVIII–XIX", titulo: "Revolución Industrial", capitulo: 1, tipo: "causa", nodo: "rev-industrial",
    que: "Fábricas, ciudades, turnos de 10 a 12 horas y una nueva clase: el proletariado.",
    porQue: "Abre la herida: la «cuestión social» a la que responden los socialistas.", fuente: "Texto base del grupo, §6.0 y §6.1" },
  { id: "new-harmony", anio: 1825, posicion: 1825, fecha: "1825", titulo: "Owen funda New Harmony", capitulo: 1, tipo: "acontecimiento", nodo: "new-harmony",
    que: "Robert Owen funda una comunidad modelo en Indiana.",
    porQue: "Es un intento de construir la utopía, y muestra su límite: dura poco.", fuente: "Texto base del grupo, §6.1" },
  { id: "manifiesto-1848", anio: 1848, posicion: 1848, fecha: "1848", titulo: "Manifiesto Comunista", capitulo: 2, tipo: "idea", nodo: "manifiesto",
    que: "Marx y Engels: «¡Proletarios de todos los países, uníos!».",
    porQue: "La utopía se vuelve programa político: llama a los obreros a unirse.", fuente: "Texto base del grupo, §6.2" },
  { id: "i-internacional-1864", anio: 1864, posicion: 1864, fecha: "1864", titulo: "Nace la I Internacional", capitulo: 3, tipo: "acontecimiento", nodo: "i-internacional",
    que: "Nace en Londres, con estatutos redactados por Marx.",
    porQue: "Las ideas pasan a una organización obrera de varios países.", fuente: "Texto base del grupo, §6.3" },
  { id: "capital-1867", anio: 1867, posicion: 1867, fecha: "1867", titulo: "El capital, tomo I", capitulo: 2, tipo: "idea", nodo: "el-capital",
    que: "Marx explica la plusvalía.",
    porQue: "Da a la teoría una explicación económica de la explotación del obrero.", fuente: "Texto base del grupo, §6.2" },
  { id: "comuna-1871", anio: 1871, posicion: 1871, fecha: "1871", titulo: "Comuna de París", capitulo: 3, tipo: "acontecimiento", nodo: "comuna",
    que: "Toma la capital francesa y es aplastada.",
    porQue: "Primera gran derrota de la Internacional; Lenin la tomará como referencia en 1917.", fuente: "Texto base del grupo, §6.3" },
  { id: "ii-internacional-1889", anio: 1889, posicion: 1889, fecha: "1889", titulo: "Nace la II Internacional", capitulo: 3, tipo: "acontecimiento", nodo: "ii-internacional",
    que: "Muchos socialistas optan por reformas dentro de la democracia.",
    porQue: "La ola revolucionaria se frena en los países industrializados, pero no en Rusia.", fuente: "Texto base del grupo, §6.3" },
  { id: "division-1903", anio: 1903, posicion: 1903, fecha: "1903", titulo: "Bolcheviques y mencheviques", capitulo: 4, tipo: "acontecimiento", nodo: "division-1903",
    que: "El partido socialdemócrata ruso se divide.",
    porQue: "Nacen los bolcheviques, el partido que tomará el poder.", fuente: "Texto base del grupo, §6.4" },
  { id: "ruso-japonesa", anio: 1904, posicion: 1904.4, fecha: "1904–1905", titulo: "Guerra ruso-japonesa", capitulo: 4, tipo: "causa", nodo: "guerra-ruso-japonesa",
    que: "Rusia combate contra Japón.",
    porQue: "Debilita a Nicolás II.", fuente: "Red del grupo (sección 7)" },
  { id: "domingo-1905", anio: 1905, posicion: 1905.05, fecha: "9 ene 1905", fechaJuliana: "9 ene 1905", fechaGregoriana: "22 ene 1905", titulo: "Domingo Sangriento", capitulo: 4, tipo: "acontecimiento", nodo: "domingo-sangriento",
    que: "Los soldados disparan contra una marcha pacífica que llevaba una petición al zar. Las cifras de muertos varían según la fuente.",
    porQue: "El zar pierde apoyo y la autocracia muestra su cara más dura.", fuente: "Texto base del grupo, §6.4" },
  { id: "soviets-1905", anio: 1905, posicion: 1905.6, fecha: "1905", titulo: "Nacen los soviets", capitulo: 4, tipo: "acontecimiento", nodo: "soviets",
    que: "Aparecen los consejos de obreros y soldados.",
    porQue: "Los soviets serán protagonistas de la Revolución de Octubre.", fuente: "Texto base del grupo, §6.4" },
  { id: "guerra-1914", anio: 1914, posicion: 1914, fecha: "1914", titulo: "Rusia entra en la Primera Guerra Mundial", capitulo: 4, tipo: "causa", nodo: "primera-guerra",
    que: "Rusia entra en la guerra.",
    porQue: "La guerra abre la oportunidad para la revolución.", fuente: "Texto base del grupo, §6.0 y §6.4" },
  { id: "febrero-1917", anio: 1917, posicion: 1917.05, fecha: "23 feb 1917", fechaJuliana: "23 feb 1917", fechaGregoriana: "8 mar 1917", titulo: "Revolución de Febrero", capitulo: 5, tipo: "acontecimiento", nodo: "febrero-1917",
    que: "Huelgas y protestas por falta de pan, a las que se suman los soldados, llevan a la abdicación del zar.",
    porQue: "Cae el zar: termina la autocracia.", fuente: "Texto base del grupo, §6.5" },
  { id: "gobierno-provisional", anio: 1917, posicion: 1917.18, fecha: "1917", fechaJuliana: "feb 1917", fechaGregoriana: "mar 1917", titulo: "Gobierno Provisional", capitulo: 5, tipo: "consecuencia", nodo: "gobierno-provisional",
    que: "Gobierna tras la caída del zar, primero con Lvov, y sigue en la guerra.",
    porQue: "Comparte el poder con los soviets: un equilibrio que no durará.", fuente: "Texto base del grupo, §6.5" },
  { id: "tesis-abril", anio: 1917, posicion: 1917.32, fecha: "abr 1917", fechaJuliana: "abr 1917", fechaGregoriana: "abr 1917", titulo: "Tesis de Abril", capitulo: 5, tipo: "idea", nodo: "tesis-abril",
    que: "Lenin: ningún apoyo al Gobierno Provisional, poder para el proletariado y los campesinos pobres, tierras nacionalizadas.",
    porQue: "Marca el plan bolchevique para tomar el poder.", fuente: "Texto base del grupo, §6.5" },
  { id: "kerenski", anio: 1917, posicion: 1917.55, fecha: "jul 1917", fechaJuliana: "jul 1917", fechaGregoriana: "jul 1917", titulo: "Kérenski al frente", capitulo: 5, tipo: "acontecimiento", nodo: "kerenski",
    que: "Kérenski encabeza el Gobierno Provisional.",
    porQue: "Cambia el líder, pero el gobierno sigue en la guerra.", fuente: "Texto base del grupo, §6.5" },
  { id: "octubre-1917", anio: 1917, posicion: 1917.85, fecha: "25 oct 1917", fechaJuliana: "25 oct 1917", fechaGregoriana: "7 nov 1917", titulo: "Revolución de Octubre", capitulo: 5, tipo: "acontecimiento", nodo: "octubre-1917",
    que: "Los bolcheviques, con Lenin y Trotski, toman el poder.",
    porQue: "Un partido marxista llega al poder: la idea entra al gobierno.", fuente: "Texto base del grupo, §6.5" },
  { id: "brest-1918", anio: 1918, posicion: 1918.2, fecha: "mar 1918", titulo: "Tratado de Brest-Litovsk", capitulo: 6, tipo: "consecuencia", nodo: "brest-litovsk",
    que: "Rusia sale de la guerra con grandes pérdidas de territorio y población.",
    porQue: "Rusia sale de la guerra, a un precio muy alto.", fuente: "Texto base del grupo, §6.6" },
  { id: "guerra-civil", anio: 1918, posicion: 1919.2, fecha: "1918–1921", titulo: "Guerra civil y comunismo de guerra", capitulo: 6, tipo: "consecuencia", nodo: "guerra-civil",
    que: "Rojos contra blancos; el Estado controla la economía.",
    porQue: "El nuevo poder se impone por la fuerza.", fuente: "Texto base del grupo, §6.6" },
  { id: "nep-1921", anio: 1921, posicion: 1921, fecha: "1921", titulo: "La NEP", capitulo: 6, tipo: "consecuencia", nodo: "nep",
    que: "Una vuelta parcial al mercado.",
    porQue: "Primer cambio de rumbo del nuevo Estado.", fuente: "Texto base del grupo, §6.6" },
  { id: "urss-1922", anio: 1922, posicion: 1922, fecha: "1922", titulo: "Se crea la URSS", capitulo: 6, tipo: "consecuencia", nodo: "urss",
    que: "Nace la Unión de Repúblicas Socialistas Soviéticas.",
    porQue: "Responde la pregunta central: nace el primer Estado comunista del mundo.", fuente: "Texto base del grupo, §6.6" },
  { id: "lenin-1924", anio: 1924, posicion: 1924, fecha: "1924", titulo: "Muere Lenin; asciende Stalin", capitulo: 6, tipo: "consecuencia", nodo: "muerte-lenin",
    que: "Tras luchas internas y purgas, Stalin toma el control.",
    porQue: "El Estado queda en manos de Stalin.", fuente: "Texto base del grupo, §6.6" }
];

// ---------------------------------------------------------------------
// 11. Preguntas «Comprueba» (sección 6.7)
// ---------------------------------------------------------------------
const preguntas = [
  { capitulo: 1, enunciado: "¿Qué consideraba Moro la fuente de los males de su sociedad?",
    opciones: ["La propiedad privada", "La monarquía", "El comercio con América"], correcta: 0,
    explicaciones: [
      "Correcto: para Moro, la propiedad privada era la fuente de todos los males. Por eso su isla no la tiene.",
      "No: el texto no señala a la monarquía. Lo que Moro elimina en su isla es la propiedad privada.",
      "No: según el texto, la fuente de los males para Moro es la propiedad privada, no el comercio."
    ] },
  { capitulo: 2, enunciado: "¿Qué es la plusvalía según Marx?",
    opciones: ["Lo que el obrero produce y no se le paga", "Un impuesto", "El ahorro del obrero"], correcta: 0,
    explicaciones: [
      "Correcto: es lo que el obrero produce después de cubrir su salario y no se le paga.",
      "No: un impuesto lo cobra el Estado. La plusvalía es trabajo del obrero que no se le paga.",
      "No: el ahorro sale del salario que el obrero sí recibe; la plusvalía es justo lo que no recibe."
    ] },
  { capitulo: 3, enunciado: "¿Qué corrientes se enfrentaron dentro de la Primera Internacional?",
    opciones: ["Marxistas y anarquistas", "Liberales y conservadores", "Bolcheviques y mencheviques"], correcta: 0,
    explicaciones: [
      "Correcto: Marx se enfrentó a anarquistas como Proudhon y Bakunin.",
      "No: liberales y conservadores no formaban parte de una organización obrera socialista.",
      "No: bolcheviques y mencheviques aparecen en 1903, en el partido ruso, casi 40 años después de 1864."
    ] },
  { capitulo: 4, enunciado: "¿De dónde viene el nombre «bolchevique»?",
    opciones: ["Del congreso del partido en 1903", "De la Duma", "Del Domingo Sangriento"], correcta: 0,
    explicaciones: [
      "Correcto: en 1903 el partido socialdemócrata ruso se dividió y el grupo de Lenin quedó como «mayoritario» (bolchevique).",
      "No: el nombre no viene de la Duma (el parlamento ruso), sino de la división del partido en 1903.",
      "No: el Domingo Sangriento fue en 1905, cuando los bolcheviques ya existían desde 1903."
    ] },
  { capitulo: 5, enunciado: "¿Por qué la «Revolución de Octubre» ocurrió en noviembre según nuestro calendario?",
    opciones: ["Rusia usaba el calendario juliano", "Por un error de los historiadores", "Porque duró un mes"], correcta: 0,
    explicaciones: [
      "Correcto: el calendario juliano iba 13 días atrasado. El 25 de octubre ruso era nuestro 7 de noviembre.",
      "No: no es un error; es la diferencia de 13 días entre dos calendarios.",
      "No: la toma del poder fue el 25 de octubre (7 de noviembre). El nombre viene del calendario, no de lo que duró."
    ] },
  { capitulo: 6, enunciado: "¿Qué fue la NEP?",
    opciones: ["Una vuelta parcial al mercado", "Un plan militar", "Un tratado de paz"], correcta: 0,
    explicaciones: [
      "Correcto: en 1921 la NEP permitió una vuelta parcial al mercado, después del comunismo de guerra.",
      "No: la NEP fue una política económica, no militar.",
      "No: el tratado de paz fue el de Brest-Litovsk (1918); la NEP es de 1921."
    ] }
];

// ---------------------------------------------------------------------
// 12. Conclusiones (EDITABLES)
// ---------------------------------------------------------------------
const conclusiones = {
  // Borrador hecho con el texto base: reemplazar con el cierre del guion
  respuesta: "El socialismo pasó de utopía a Estado en una cadena de pasos. En 1516 Moro imaginó una sociedad sin propiedad privada. La Revolución Industrial abrió la herida de la «cuestión social». Marx y Engels la explicaron con una teoría que se presentaba como científica, y las Internacionales organizaron a los obreros. En Rusia, la autocracia y la guerra de 1914 dieron la oportunidad: en 1917 los bolcheviques tomaron el poder y en 1922 fundaron la URSS, el primer Estado comunista del mundo. Ese Estado, sin embargo, quedó lejos de la meta de Marx: una sociedad sin propiedad privada ni Estado.",
  // Los 6 pasos de la respuesta, cada uno con el capítulo donde se explica
  pasos: [
    { palabra: "Una idea", capitulo: 1, texto: "Moro imagina una sociedad sin propiedad privada (1516)." },
    { palabra: "Una herida", capitulo: 1, texto: "La Revolución Industrial crea la «cuestión social»." },
    { palabra: "Una teoría", capitulo: 2, texto: "Marx y Engels: lucha de clases y plusvalía (1848, 1867)." },
    { palabra: "Una organización", capitulo: 3, texto: "Las Internacionales organizan a los obreros (1864, 1889)." },
    { palabra: "Una oportunidad", capitulo: 4, texto: "En Rusia, la autocracia y la guerra de 1914 abren la puerta." },
    { palabra: "Una toma del poder", capitulo: 5, texto: "Octubre de 1917: los bolcheviques toman el poder." }
  ],
  resultado: { palabra: "Un Estado", capitulo: 6, texto: "1922: nace la URSS." },
  // Palabra de cada cara del cubo en la vista explotada (una por capítulo)
  palabrasCubo: ["una idea y una herida", "una teoría", "una organización", "una oportunidad", "una toma del poder", "un Estado"],
  ideasClave: [
    "Una idea necesitó una herida, una teoría y una organización para convertirse en un movimiento.",
    "La revolución triunfó en Rusia, un imperio autocrático y poco industrializado, mientras en los países industrializados la ola se frenaba.",
    "El Estado nacido en 1922 se alejó de la meta de Marx: una sociedad sin propiedad privada ni Estado."
  ],
  comparador: {
    izquierda: { titulo: "Lo que proponía Marx", puntos: ["Una etapa intermedia: la dictadura del proletariado.", "Una meta: la sociedad comunista.", "Sin propiedad privada.", "Sin Estado."] },
    derecha: { titulo: "Lo que ocurrió", puntos: ["Guerra civil (1918–1921).", "Comunismo de guerra: el Estado controla la economía.", "NEP: vuelta parcial al mercado (1921).", "Un Estado gobernado con mano de hierro: purgas y ascenso de Stalin."] }
  },
  fuentesQueNoCoinciden: [
    { tema: "Cifras del Domingo Sangriento",
      problema: "Las fuentes dan cifras de muertos distintas: la oficial habló de 96; otras, de más de 200 o de más de mil.",
      solucion: "Mostramos las tres cifras con su fuente y decimos que varían según la fuente, en la página y en el video del capítulo 4." },
    { tema: "La Revolución de Febrero: ¿«golpe de estado» o levantamiento?",
      problema: "Hubeñák (2020, p. 363) la llama «golpe de estado»; otras fuentes la describen como huelgas y protestas por falta de pan a las que se sumaron los soldados.",
      solucion: "Damos el hecho en el que coinciden todas (huelgas, protestas, soldados que se suman y abdicación del zar) y aclaramos que «golpe» es la interpretación de Hubeñák." },
    { tema: "¿De dónde viene «bolchevique»?",
      problema: "La lectura dice que así se llamaban los grupos en la Duma, pero la Duma recién se creó después de 1905.",
      solucion: "Los nombres salen del II Congreso del Partido Obrero Socialdemócrata ruso (1903), cuando los seguidores de Lenin ganaron algunas votaciones." },
    { tema: "¿El Manifiesto se publicó «tardíamente»?",
      problema: "Hubeñák (2020, pp. 299–303) dice que se publicó tarde.",
      solucion: "La edición del Marxists Internet Archive indica que salió de imprenta a fines de febrero de 1848: por eso en la página va con fecha 1848." },
    { tema: "¿Quién escribió el Catecismo revolucionario?",
      problema: "La lectura lo firma como de Bakunin.",
      solucion: "Otras fuentes indican que lo compuso Nechayev en 1869; si se cita, decimos «atribuido a Bakunin / Nechayev»." },
    { tema: "¿Con cuántas repúblicas nació la URSS?",
      problema: "Hubeñák (2020, pp. 363–375) dice que en 1922 «incorporaba a siete repúblicas».",
      solucion: "El tratado de creación del 30 de diciembre de 1922 lo firmaron cuatro: Rusia, Ucrania, Bielorrusia y Transcaucasia; las demás se sumaron después. [Verificar en las fuentes F12 o F13 del guion.]" }
  ]
};

// ---------------------------------------------------------------------
// 13. Fuentes en APA 7 (las del guion y la lectura base; NO inventar)
//     Cada categoría se ordena sola alfabéticamente.
//     «nota» (opcional) se muestra debajo de la referencia, en gris.
//     PLANTILLA para agregar una fuente:
//     { apa: "Apellido, N. (Año). <em>Título</em>. Editorial.", enlace: "https://..." }
// ---------------------------------------------------------------------
const fuentes = [
  { categoria: "Lectura base del curso", lista: [
    { apa: "Hubeñák, F. (2020). <em>Historia integral de Occidente: Desde una perspectiva cristiana</em> (con la colaboración de G. Gómez de Aso y M. E. Santiago de Camusso). Educa.", enlace: "",
      nota: "Capítulos usados: 7 (pp. 156–158), 11 (pp. 279–284, 299–303 y 321–322) y 12 (pp. 363–375)." }
  ] },
  { categoria: "Documentos históricos", lista: [
    { apa: "Engels, F. (1868). <em>Reseña del primer tomo de El Capital de Carlos Marx para el Demokratisches Wochenblatt</em>. Marxists Internet Archive.", enlace: "https://www.marxists.org/espanol/m-e/1860s/resena.htm" },
    { apa: "Lenin, V. I. (1917). <em>Las tareas del proletariado en la presente revolución («Tesis de abril»)</em>. Marxists Internet Archive.", enlace: "https://www.marxists.org/espanol/lenin/obras/1910s/abril.htm" },
    { apa: "Marx, K. y Engels, F. (1848). <em>Manifiesto del Partido Comunista</em>. Marxists Internet Archive.", enlace: "https://www.marxists.org/espanol/m-e/1840s/48-manif.htm" },
    { apa: "Moro, T. (2007). <em>Utopía</em> (P. Voltes, trad.; prólogo de F. Savater). Espasa Calpe. (Obra original publicada en 1516).", enlace: "" }
  ] },
  { categoria: "Libros y artículos académicos", lista: [
    { apa: "Adamovsky, E. (2005). La revolución rusa de 1905: el año en que nacieron los soviets. <em>Encrucijadas</em>. Universidad de Buenos Aires.", enlace: "https://repositoriouba.sisbi.uba.ar/gsdl/collect/encruci/index/assoc/HWA_511.dir/511.PDF" },
    { apa: "Departamento de Historia, IRI-UNLP. (2017). Artículo sobre la Revolución rusa. <em>Revista IRI</em>. [Completar autor desde el PDF].", enlace: "https://www.iri.edu.ar/wp-content/uploads/2018/03/dep-historia-articulo-rev.rusa_.pdf" },
    { apa: "El pensamiento utópico y la práctica comunitaria: Robert Owen. <em>Política y Sociedad</em>. Universidad Complutense de Madrid. [Completar autor y año desde el PDF].", enlace: "https://revistas.ucm.es/index.php/POSO/article/download/POSO9292220123A/30465" },
    { apa: "En el centenario de la Revolución rusa. (2017). <em>Razón y Fe</em>. Universidad Pontificia Comillas.", enlace: "https://revistas.comillas.edu/index.php/razonyfe/article/download/9314/8735/20385" },
    { apa: "González Quesada. (2021). <em>Análisis iconográfico de las medallas de la Revolución rusa de febrero</em>. Universidad de Murcia.", enlace: "https://digitum.um.es/digitum/bitstream/10201/114885/1/Gonzalez-Quesada2021.pdf" },
    { apa: "Ideas políticas y económicas de Carlos Marx en el contexto contemporáneo. <em>Revista IECOS, 25</em>(1). Universidad Nacional de Ingeniería (Perú).", enlace: "https://doi.org/10.21754/iecos.v25i1.2159" },
    { apa: "Instituto de Investigaciones Jurídicas, UNAM. (s. f.). Capítulo 2: El orden soviético.", enlace: "https://archivos.juridicas.unam.mx/www/bjv/libros/6/2792/23.pdf" },
    { apa: "Pro, J. (s. f.). <em>Utopía y socialismo, un horizonte compartido</em>. Instituto de Investigaciones Históricas, UNAM.", enlace: "https://historicas.unam.mx/publicaciones/publicadigital/libros/726/726_04_01_utopia.pdf" }
  ] },
  { categoria: "Recursos audiovisuales", lista: [
    { apa: "Grupo 2, Historia Conectada. (2026). <em>Del «no-lugar» al Estado</em> [Documental]. Universidad Católica San Pablo.", enlace: "" },
    { apa: "Música de fondo del documental: obras de Borodin, Chaikovski y Músorgski, en grabaciones de dominio público (Musopen y European Archive). Wikimedia Commons.", enlace: "" }
  ] },
  { categoria: "Créditos de imágenes", lista: [
    { apa: "Grupo 2, Historia Conectada. (2026). <em>Paneles 1 a 6</em> [Ilustraciones]. [Completar de dónde salieron; si se generaron con IA, nombrar la herramienta].", enlace: "" },
    { apa: "Mayall, J. J. E. (1875). <em>Karl Marx</em> [Fotografía]. Wikimedia Commons. Dominio público.", enlace: "https://commons.wikimedia.org/wiki/File:Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored.png" },
    { apa: "Retratos y mapas del documental (Moro, Ricardo, Saint-Simon, Fourier, Owen, Hegel, Nicolás II, Gapón, Lvov, Kérenski y Trotski; mapas de Natural Earth). Wikimedia Commons. Dominio público.", enlace: "" }
  ] }
];

// ---------------------------------------------------------------------
// 14. El guía (Karl Marx como muñeco de papel): datos curiosos por sección
//     Salen del texto base; los marcados con (+) son datos generales sobre la
//     vida de Marx que se agregaron para el muñeco (están en la guía de sustentación).
//     La clave es el id de la sección. El primer dato de «inicio» es el saludo.
//     Para agregar un dato, se escribe una línea más entre comillas.
// ---------------------------------------------------------------------
const curiosidades = {
  "inicio": [
    "¡Hola! Soy Karl Marx… bueno, un muñeco de papel recortado de mi foto. Te acompaño con datos curiosos: tócame cuando quieras otro.",
    "Esta historia dura 408 años: va de 1516 a 1924.",
    "Nací en Tréveris (Prusia) en 1818 y morí en Londres en 1883. Lo que pasó en Rusia en 1917… ya no lo vi.",   // (+)
    "Me recortaron de una foto de 1875, tomada en Londres por el fotógrafo John Mayall."   // (+)
  ],
  "contexto": [
    "La Revolución Industrial creó una clase nueva: el proletariado, los obreros que solo tienen su trabajo para vivir.",
    "Rusia era un imperio poco industrializado… y aun así fue ahí donde estalló la revolución. Curioso, ¿no?"
  ],
  "proceso": [
    "Cada capítulo responde un pedacito de la pregunta central. ¡Arrancamos en 1516, tres siglos antes de que yo naciera!"
  ],
  "capitulo-1": [
    "«Utopía» es una palabra que inventó Moro: significa «no-lugar». ¡De ahí el título de esta página!",
    "Para Moro, la propiedad privada era la fuente de todos los males. Por eso su isla no la tenía.",
    "En las fábricas de la Revolución Industrial se trabajaba en turnos de 10 a 12 horas.",
    "New Harmony, la comunidad de Owen, no estaba en Europa: estaba en Indiana. ¡Y duró poco!",
    "El nombre «socialistas utópicos» se lo puso Engels a Owen, Saint-Simon y Fourier."
  ],
  "capitulo-2": [
    "¿Me ves en el panel 2, junto a la vela roja? ¡Ese soy yo, escribiendo!",
    "Entre el Manifiesto Comunista (1848) y el primer tomo de El capital (1867) pasaron 19 años.",
    "Plusvalía, en simple: lo que el obrero produce después de cubrir su salario y no se le paga.",
    "Mi meta era una sociedad sin propiedad privada… ¡y sin Estado! Acuérdate de esto en el capítulo 6.",
    "Escribí buena parte de El capital en la sala de lectura del Museo Británico, en Londres.",   // (+)
    "Engels no solo escribió conmigo el Manifiesto: durante años también me ayudó con dinero.",   // (+)
    "Los tomos 2 y 3 de El capital salieron después de mi muerte: los publicó Engels en 1885 y 1894."   // (+)
  ],
  "capitulo-3": [
    "Los estatutos de la Primera Internacional los redacté yo, en Londres, en 1864.",
    "En la Internacional tuve que enfrentarme primero con Proudhon y luego con el ruso Bakunin, defensor del anarquismo.",
    "La Comuna de París fue aplastada en 1871… pero Lenin la tomó como referencia 46 años después.",
    "Sobre la Comuna escribí un folleto ese mismo año: La guerra civil en Francia (1871)."   // (+)
  ],
  "capitulo-4": [
    "«Bolchevique» quiere decir «mayoritario». El nombre salió de una votación del partido en 1903.",
    "El Domingo Sangriento fue el 9 de enero de 1905 en Rusia… ¡y el 22 en nuestro calendario!",
    "¿Cuántos murieron el Domingo Sangriento? Las fuentes no se ponen de acuerdo: las cifras varían.",
    "Los soviets nacieron en 1905: doce años antes de la revolución de 1917.",
    "Yo no llegué a ver nada de esto: morí en 1883, veinte años antes de que el partido se dividiera en 1903."
  ],
  "capitulo-5": [
    "La «Revolución de Octubre» fue el 7 de noviembre para nosotros. ¡Culpa del calendario juliano!",
    "En 1917 Rusia iba 13 días atrasada: usaba el calendario juliano.",
    "La Revolución de Febrero empezó con huelgas y protestas por falta de pan.",
    "Durante 1917 hubo dos poderes a la vez: el Gobierno Provisional y los soviets.",
    "La revolución no triunfó en un país muy industrializado, sino en Rusia, un imperio poco industrializado."
  ],
  "capitulo-6": [
    "Para salir de la guerra en Brest-Litovsk, Rusia perdió 780 000 km² y 56 millones de habitantes.",
    "Entre la toma del poder (1917) y la creación de la URSS (1922) pasaron cinco años.",
    "Yo soñaba con una sociedad sin Estado… y lo que nació fue un Estado muy fuerte.",
    "Lenin murió en 1924 y, tras luchas internas y purgas, Stalin tomó el control."
  ],
  "red": [
    "En la red, las flechas dicen qué provocó qué. ¡Prueba el recorrido guiado de 10 pasos!",
    "La Revolución de Octubre y el Socialismo utópico son los nodos más conectados de la red: seis flechas cada uno."
  ],
  "video": [
    "Cada integrante grabó el video de su capítulo. ¡Dale play y conócelos!"
  ],
  "linea-tiempo": [
    "Usa las flechas ← → del teclado para viajar de fecha en fecha.",
    "Las fechas de 1917 vienen dobles: la rusa (calendario juliano) y la nuestra (gregoriano)."
  ],
  "conclusiones": [
    "De una isla imaginaria (1516) a un Estado real (1922): pasaron 406 años.",
    "Mueve el comparador para ver lo que proponía Marx frente a lo que ocurrió."
  ],
  "fuentes": [
    "Ojo: los 6 paneles son ilustraciones del equipo, no documentos históricos.",
    "Yo sí salí de un documento real: una fotografía de 1875."
  ]
};
