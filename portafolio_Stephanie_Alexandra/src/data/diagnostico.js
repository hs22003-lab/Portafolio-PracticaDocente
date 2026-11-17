/* =====================================================================
   DATOS COMPARTIDOS DEL DIAGNÓSTICO Y LA PLANEACIÓN
   (módulo sin componentes: lo consumen las vistas del diagnóstico,
   la planeación y el centro de anexos)
   ===================================================================== */

/** Preguntas cerradas del cuestionario (Google Forms, N = 11, 12/09/2026). */
export const SURVEY_QUESTIONS = [
  {
    id: 1,
    section: 1,
    table: 'Tabla 3',
    dimension: 'Características generales',
    type: 'single',
    chart: 'donut',
    title: '¿En cuál rango de edad se encuentra?',
    options: [
      { label: '15-16 años', f: 0, p: 0 },
      { label: '17-18 años', f: 2, p: 18.2 },
      { label: '19 años o más', f: 9, p: 81.8 },
    ],
    highlight: { value: '81.8%', label: 'tiene 19 años o más' },
    interpretation:
      'Un porcentaje bajo (18.2%) se encuentra en la edad ideal de educación media (17-18 años); predomina el rango de 19 años o más (81.8%), lo que refleja desfase escolar por estudios interrumpidos o repeticiones, y una alta diversidad de ritmos de aprendizaje y madurez adulta en el grupo.',
  },
  {
    id: 2,
    section: 1,
    table: 'Tabla 4',
    dimension: 'Características generales',
    type: 'single',
    chart: 'donut',
    title: 'Sexo:',
    options: [
      { label: 'Masculino', f: 6, p: 54.5 },
      { label: 'Femenino', f: 5, p: 45.5 },
      { label: 'Prefiero no decirlo', f: 0, p: 0 },
    ],
    highlight: { value: '54.5 / 45.5', label: 'equilibrio entre hombres y mujeres' },
    interpretation:
      'Existe equilibrio entre hombres (54.5%) y mujeres (45.5%), lo que favorece la convivencia, la diversidad de intereses y una participación equitativa; que nadie eligiera "Prefiero no decirlo" refleja un clima de confianza grupal.',
  },
  {
    id: 3,
    section: 1,
    table: 'Tabla 5',
    dimension: 'Accesibilidad a Internet',
    type: 'single',
    chart: 'donut',
    title: '¿Tiene acceso a Internet en su casa?',
    options: [
      { label: 'Sí, cuento con Internet', f: 8, p: 72.7 },
      { label: 'A veces, la señal es inestable', f: 2, p: 18.2 },
      { label: 'No, tengo ningún acceso', f: 1, p: 9.1 },
    ],
    highlight: { value: '27.3%', label: 'acumula dificultades de conexión' },
    interpretation:
      'Aunque el 72.7% cuenta con una conexión favorable para actividades virtuales, un 27.3% acumulado (18.2% con señal inestable + 9.1% sin acceso) enfrenta dificultades de conexión constante que deben considerarse al programar tareas en línea.',
  },
  {
    id: 4,
    section: 2,
    table: 'Tabla 6',
    dimension: 'Características generales',
    type: 'single',
    chart: 'vbar',
    title: 'En su rutina diaria, ¿Qué tan seguido estudia o hace sus tareas por su propia cuenta, sin avisos previos?',
    options: [
      { label: 'Siempre', f: 4, p: 36.4 },
      { label: 'Casi siempre', f: 5, p: 45.5 },
      { label: 'A veces', f: 2, p: 18.2 },
      { label: 'Casi nunca', f: 0, p: 0 },
      { label: 'Nunca', f: 0, p: 0 },
    ],
    highlight: { value: '81.9%', label: 'estudia de forma autónoma' },
    interpretation:
      'El 81.9% se ubica entre "casi siempre" y "siempre", evidenciando una alta autonomía: una fortaleza clave para la modalidad flexible, donde el estudio se organiza fuera de las jornadas sabatinas. El 18.2% restante requiere seguimiento y apoyo.',
  },
  {
    id: 5,
    section: 3,
    table: 'Tabla 7',
    dimension: 'Motivación',
    type: 'single',
    chart: 'vbar',
    title: 'Cuando los docentes realizan ejercicios o dinámicas en clase, ¿Con qué frecuencia se anima a participar?',
    options: [
      { label: 'Siempre', f: 4, p: 36.4 },
      { label: 'Casi siempre', f: 3, p: 27.3 },
      { label: 'A veces', f: 4, p: 36.4 },
      { label: 'Casi nunca', f: 0, p: 0 },
      { label: 'Nunca', f: 0, p: 0 },
    ],
    highlight: { value: '63.7%', label: 'participa siempre o casi siempre' },
    interpretation:
      'El 63.7% participa siempre o casi siempre, mientras que el 36.4% solo lo hace a veces; por ello es necesario integrar dinámicas variadas y grupales que motiven a quienes intervienen menos.',
  },
  {
    id: 6,
    section: 3,
    table: 'Tabla 8 · Figura 6',
    dimension: 'Motivación',
    type: 'multiple',
    chart: 'hbar',
    title:
      'Al momento de estar estudiando las temáticas, ¿Cuáles de estas actividades siente que le ayudan a entender mejor los temas? (Selección múltiple)',
    options: [
      { label: 'Videos explicativos', f: 5, p: 45.5 },
      { label: 'Trabajar en equipo con tus compañeros', f: 5, p: 45.5 },
      { label: 'Realizar dinámicas o juegos interactivos', f: 5, p: 45.5 },
      { label: 'Leer documentos o textos', f: 4, p: 36.4 },
      { label: 'Escuchar las clases del docente', f: 3, p: 27.3 },
      { label: 'Hacer ejercicios prácticos', f: 2, p: 18.2 },
      { label: 'Otro', f: 2, p: 18.2 },
    ],
    highlight: { value: '45.5%', label: 'prefiere videos, equipo y juegos' },
    interpretation:
      'El grupo aprende de forma multimodal: destacan con 45.5% los videos explicativos, el trabajo en equipo y los juegos interactivos, seguidos de la lectura de documentos PDF, lo que respalda combinar recursos audiovisuales, colaborativos y gamificados.',
  },
  {
    id: 7,
    section: 4,
    table: 'Tabla 9',
    dimension: 'Motivación',
    type: 'single',
    chart: 'donut',
    title: '¿Qué tan motivado/a se siente para continuar con sus estudios en esta modalidad a distancia?',
    options: [
      { label: 'Bastante motivado/a', f: 7, p: 63.6 },
      { label: 'Motivado/a', f: 3, p: 27.3 },
      { label: 'Poco motivado/a', f: 1, p: 9.1 },
      { label: 'Nada motivado/a', f: 0, p: 0 },
    ],
    highlight: { value: '90.9%', label: 'se siente motivado o bastante motivado' },
    interpretation:
      'El 90.9% manifiesta estar motivado o bastante motivado: una gran fortaleza, dado que la modalidad flexible les permite trabajar o atender a sus familias entre semana sin abandonar su superación académica.',
  },
  {
    id: 8,
    section: 5,
    table: 'Tabla 10',
    dimension: 'Herramientas tecnológicas',
    type: 'single',
    chart: 'donut',
    title: '¿Cuál es el dispositivo que más utiliza para realizar sus trabajos en la semana?',
    options: [
      { label: 'Computadora', f: 8, p: 72.7 },
      { label: 'Smartphone', f: 3, p: 27.3 },
      { label: 'Tablet', f: 0, p: 0 },
      { label: 'Otro', f: 0, p: 0 },
    ],
    note: 'En la figura original del informe, la categoría "Computadora" se representa en dos segmentos (63.6% + 9.1%), que suman el 72.7% total.',
    highlight: { value: '27.3%', label: 'depende solo del smartphone' },
    interpretation:
      'Aunque el 72.7% usa computadora, un 27.3% depende exclusivamente del teléfono inteligente, por lo que se recomienda emplear plataformas web, multiplataforma y con soporte offline.',
  },
  {
    id: 9,
    section: 5,
    table: 'Tabla 11',
    dimension: 'Accesibilidad a Internet',
    type: 'single',
    chart: 'vbar',
    title: '¿Cómo siente que es el acceso a Internet cuando le toca estudiar o subir tareas?',
    options: [
      { label: 'Excelente', f: 2, p: 18.2 },
      { label: 'Muy bueno', f: 4, p: 36.4 },
      { label: 'Limitado', f: 3, p: 27.3 },
      { label: 'Insuficiente', f: 2, p: 18.2 },
    ],
    highlight: { value: '45.5%', label: 'enfrenta barreras de calidad de red' },
    interpretation:
      'El 54.6% tiene una conexión muy buena o excelente, pero un 45.5% (27.3% limitado + 18.2% insuficiente) enfrenta barreras de calidad de red al subir tareas, lo que exige flexibilidad y recursos ligeros.',
  },
  {
    id: 10,
    section: 6,
    table: 'Tabla 12',
    dimension: 'Apoyo docente',
    type: 'single',
    chart: 'donut',
    title: 'Cuando el docente explica las tareas, ¿Qué tan claras son las instrucciones?',
    options: [
      { label: 'Muy claras', f: 5, p: 45.5 },
      { label: 'Claras', f: 5, p: 45.5 },
      { label: 'Poco claras', f: 1, p: 9.1 },
      { label: 'Nada claras', f: 0, p: 0 },
    ],
    highlight: { value: '90.9%', label: 'percibe instrucciones claras' },
    interpretation:
      'El 90.9% percibe instrucciones claras o muy claras, lo cual facilita el aprendizaje autónomo y reduce la incertidumbre al trabajar en casa.',
  },
  {
    id: 11,
    section: 6,
    table: 'Tabla 13',
    dimension: 'Apoyo docente',
    type: 'single',
    chart: 'donut',
    title: 'Si se confunde con algún tema o tarea, ¿Siente que el profesor está disponible para ayudarle?',
    options: [
      { label: 'Siempre', f: 9, p: 81.8 },
      { label: 'Casi siempre', f: 1, p: 9.1 },
      { label: 'Algunas veces', f: 1, p: 9.1 },
      { label: 'Nunca', f: 0, p: 0 },
    ],
    highlight: { value: '90.9%', label: 'siente acompañamiento constante' },
    interpretation:
      'El 90.9% siente acompañamiento docente constante (81.8% siempre + 9.1% casi siempre), un pilar vital en la educación a distancia.',
  },
  {
    id: 12,
    section: 7,
    table: 'Tabla 14',
    dimension: 'Herramientas tecnológicas',
    type: 'multiple',
    chart: 'hbar',
    title: '¿Cuáles son las herramientas digitales a las que más recurre para revisar sus materias? (Selección múltiple)',
    options: [
      { label: 'Plataformas de aprendizaje (Classroom o Moodle)', f: 10, p: 90.9 },
      { label: 'Lecturas o archivos PDF', f: 5, p: 45.5 },
      { label: 'Videos en línea', f: 2, p: 18.2 },
      { label: 'Apps o programas educativos', f: 2, p: 18.2 },
      { label: 'Clases o reuniones por videollamada', f: 0, p: 0 },
    ],
    highlight: { value: '90.9%', label: 'usa Classroom o Moodle' },
    interpretation:
      'El 90.9% ya domina plataformas EVA (Classroom/Moodle) y el 45.5% usa PDF, pero el uso de videollamadas es nulo (0%), lo que abre la oportunidad de incorporar sesiones síncronas de refuerzo y más recursos interactivos.',
  },
];

/** Indicadores de la guía de observación sistemática (22/08/2026). */
export const OBSERVATION_ITEMS = [
  { n: 1, dim: 'estudiantado', text: 'Los estudiantes hacen preguntas en base a los contenidos tanto teóricos como prácticos', value: 'Siempre' },
  { n: 2, dim: 'estudiantado', text: 'Los estudiantes participan en las actividades propuestas por el docente', value: 'Siempre' },
  { n: 3, dim: 'estudiantado', text: 'Los estudiantes trabajan en equipos para realizar actividades o prácticas de laboratorio', value: 'Siempre' },
  { n: 4, dim: 'estudiantado', text: 'Los estudiantes solicitan apoyo al docente cuando presentan dificultades', value: 'Siempre' },
  { n: 5, dim: 'estudiantado', text: 'Los estudiantes muestran iniciativa para realizar las actividades asignadas', value: 'Algunas veces' },
  { n: 6, dim: 'entorno', text: 'El espacio cuenta con iluminación', value: 'Parcialmente' },
  { n: 7, dim: 'entorno', text: 'El espacio donde se desarrollan las actividades cuenta con ventilación', value: 'Parcialmente' },
  { n: 8, dim: 'entorno', text: 'Las aulas cuentan con mobiliario disponible para el desarrollo de las actividades', value: 'Parcialmente' },
  { n: 9, dim: 'entorno', text: 'Se observan computadoras disponibles para el desarrollo de las actividades', value: 'Parcialmente' },
  { n: 10, dim: 'entorno', text: 'Se observa disponibilidad de conexión a internet para las actividades educativas', value: 'Sí' },
  { n: 11, dim: 'entorno', text: 'Se observa disponibilidad de proyector u otro recurso para apoyar las actividades', value: 'Sí' },
  { n: 12, dim: 'pedagogica', text: 'Los estudiantes hacen preguntas en base a los contenidos tanto teóricos como prácticos', value: 'Siempre' },
  { n: 13, dim: 'pedagogica', text: 'Los materiales utilizados permiten apoyar la explicación de los contenidos', value: 'Siempre' },
  {
    n: 14,
    dim: 'pedagogica',
    text: 'Se utilizan recursos prácticos, modelos, experimentos o actividades relacionadas con los contenidos cuando es necesario',
    value: 'Siempre',
  },
  { n: 15, dim: 'pedagogica', text: 'Se integran herramientas o plataformas digitales como apoyo a la explicación de los temas', value: 'Siempre' },
  {
    n: 16,
    dim: 'interaccion',
    text: 'El docente explica las instrucciones y orientaciones de las actividades a realizar en cada sesión',
    value: 'Siempre',
  },
  {
    n: 17,
    dim: 'interaccion',
    text: 'Se promueve el diálogo y se resuelven dudas entre docente y estudiantes sobre las temáticas abordadas',
    value: 'Siempre',
  },
  { n: 18, dim: 'interaccion', text: 'El docente brinda el espacio para que los estudiantes expresen sus dudas', value: 'Siempre' },
  { n: 19, dim: 'interaccion', text: 'Se observa una interacción respetuosa entre docente y estudiantes', value: 'Siempre' },
  { n: 20, dim: 'interaccion', text: 'Se observa una interacción respetuosa entre los estudiantes', value: 'Algunas veces' },
];

/** Entrevista al docente tutor (12/09/2026). */
export const TUTOR_QA = [
  {
    n: 1,
    topic: 'Fortalezas del grupo',
    question: '¿Cuáles considera que son las principales fortalezas del grupo de estudiantes?',
    answer: 'La mayoría de edad, la mayoría tiene trabajo y el grado de madurez.',
  },
  {
    n: 2,
    topic: 'Retos de aprendizaje',
    question: '¿Cuáles son los retos o dificultades de aprendizaje más frecuentes en el grupo?',
    answer: 'La pereza a la lectura, la escritura y el poco manejo de la tecnología.',
  },
  {
    n: 3,
    topic: 'Metodologías efectivas',
    question: '¿Qué metodologías o estrategias le han resultado más efectivas con este grupo?',
    answer: 'Trabajar el aula invertida en esta modalidad ha funcionado bastante bien e incluir proyectos que involucren a la tecnología.',
  },
  {
    n: 4,
    topic: 'Organización del trabajo',
    question: '¿Cómo organiza el trabajo entre las clases presenciales y el trabajo independiente?',
    answer:
      'Se asignan tareas entre semana (normalmente las actividades al final de cada lección del módulo) y el fin de semana presentan lo trabajado en la semana.',
  },
  {
    n: 5,
    topic: 'Evaluación',
    question: '¿Qué estrategias o instrumentos de evaluación utiliza?',
    answer: 'Actividades exaula, portafolio del módulo, exámenes escritos, experimentos y prácticas de laboratorio.',
  },
  {
    n: 6,
    topic: 'Retroalimentación',
    question: '¿Cómo brinda retroalimentación e identifica a quienes necesitan más apoyo?',
    answer:
      'Al finalizar la clase se realiza una autoevaluación de lo aprendido en clase, y preguntas y respuestas con los que no ponen atención o presentan más dificultades.',
  },
  {
    n: 7,
    topic: 'Recursos tecnológicos',
    question: '¿Qué recursos y herramientas tecnológicas utiliza en sus clases?',
    answer:
      'Libro de texto, computadora, proyector, pizarra y actividades en plataformas relacionadas al contenido para desarrollar la clase de manera más interactiva.',
  },
  {
    n: 8,
    topic: 'Barreras tecnológicas',
    question: '¿Qué dificultades o barreras tecnológicas ha identificado en los estudiantes?',
    answer: 'No utilizan a diario la tecnología, solo cuando están en clase, lo que dificulta el manejo en computadoras o plataformas.',
  },
  {
    n: 9,
    topic: 'Competencias a reforzar',
    question: '¿Qué competencias o contenidos tecnológicos considera que se deberían reforzar?',
    answer:
      'El funcionamiento de una computadora, el manejo de plataformas para tareas (infografías, documentos, presentaciones, etc.) y resolver problemas básicos que suelen presentar las computadoras.',
  },
  {
    n: 10,
    topic: 'Recomendaciones',
    question: '¿Qué sugerencias o recomendaciones daría para mejorar la enseñanza?',
    answer: 'Que se utilice Meet para reforzar en horarios en que no están en clase, mejorando el aprendizaje del fin de semana.',
  },
];

/** Entrevista al coordinador de modalidades flexibles (12/09/2026). */
export const COORDINATOR_QA = [
  {
    n: 1,
    topic: 'Organización institucional',
    question: '¿Cómo se organiza administrativa y académicamente la modalidad flexible?',
    answer:
      'Centrada en matrículas, registros y otros; el director está al mando en ambas modalidades (presencial y flexible). Gran parte de los docentes trabajan en la misma institución durante la semana y el resto en otras instituciones.',
  },
  {
    n: 2,
    topic: 'Horarios y jornadas',
    question: '¿Cuáles son los horarios y jornadas de atención a los estudiantes?',
    answer:
      'Jornadas semipresenciales los fines de semana, específicamente los sábados de 7:00 a.m. a 5:00 p.m. Entre semana realizan consultas vía grupos de WhatsApp con el docente.',
  },
  {
    n: 3,
    topic: 'Perfil estudiantil',
    question: '¿Cómo describiría el perfil general de los estudiantes de la modalidad?',
    answer:
      'En su mayoría adultos (aproximadamente 75% mayores de 22 años y 25% menores de 22 años). Gran parte trabaja durante la semana y varias señoritas son madres de familia. Motivados por superación personal, obtener mejores trabajos o continuar estudios superiores, reflejando madurez y responsabilidad.',
  },
  {
    n: 4,
    topic: 'Asistencia y permanencia',
    question: '¿Qué factores dificultan la asistencia y permanencia de los estudiantes?',
    answer:
      'El trabajo impide asistir en varios casos; padres y madres faltan porque no tienen quién cuide a su hijo o porque se enfermó; dificultad de traslado e inestabilidad del transporte desde otros municipios de Chalatenango.',
  },
  {
    n: 5,
    topic: 'Infraestructura y apoyos',
    question: '¿Con qué infraestructura física, espacios y apoyos cuenta la modalidad?',
    answer:
      'Aulas asignadas específicamente a la modalidad, biblioteca, área administrativa y apoyo psicológico. Se entregan módulos impresos y digitales de cada materia y acompañamiento de tutorías docentes.',
  },
  {
    n: 6,
    topic: 'Equipo informático',
    question: '¿Cuál es la disponibilidad y el estado del equipo informático?',
    answer:
      '30 computadoras funcionales (con necesidad de actualización de software), 6 proyectores de uso compartido y 1 en el salón de usos múltiples, bocinas en buen estado y 1 laboratorio de informática.',
  },
  {
    n: 7,
    topic: 'Servicio de Internet',
    question: '¿Cómo funciona el servicio de Internet en la institución?',
    answer:
      'Bastante funcional para tareas administrativas y académicas mediante la cobertura de red del MINED, con restricciones a plataformas no educativas.',
  },
  {
    n: 8,
    topic: 'Soporte técnico',
    question: '¿La institución cuenta con personal especializado o soporte técnico?',
    answer:
      'No cuenta con personal técnico especializado permanente. El soporte de red lo brinda el MINED y el mantenimiento de equipos lo realizan los docentes especializados en informática.',
  },
  {
    n: 9,
    topic: 'Fortalezas TIC',
    question: '¿Cuáles son las principales fortalezas institucionales en materia de TIC?',
    answer: 'Disponibilidad de equipo (computadoras y proyectores) y disposición de los tutores por incorporar herramientas digitales en sus clases.',
  },
  {
    n: 10,
    topic: 'Necesidades prioritarias',
    question: '¿Qué necesidades prioritarias considera que deben abordarse?',
    answer:
      'Formación continua a los tutores en metodologías tecnológicas y pedagógicas, e incluir un espacio donde se brinde formación en el área de informática a los estudiantes porque a muchos se les dificulta utilizar una computadora.',
  },
];

/** Enunciado de la pregunta abierta (sección 8 del cuestionario). */
export const SURVEY_OPEN_QUESTION = 'Necesidades o sugerencias del estudiantado para mejorar su proceso de aprendizaje';

/** Secciones del cuestionario aplicado en Google Forms. */
export const SURVEY_SECTION_LABELS = [
  'Datos generales',
  'Hábitos de estudio',
  'Participación y aprendizaje',
  'Motivación',
  'Acceso a la tecnología',
  'Apoyo docente',
  'Uso de herramientas digitales',
  'Necesidades o sugerencias',
];

/** Dimensiones de la guía de observación y su escala de valoración. */
export const OBSERVATION_DIMENSION_LABELS = {
  estudiantado: { num: 1, label: 'Del estudiantado', scale: 'Siempre / Algunas veces / Nunca' },
  entorno: { num: 2, label: 'Entorno físico y tecnológico', scale: 'Sí / Parcialmente / No / No observado' },
  pedagogica: { num: 3, label: 'Pedagógica', scale: 'Siempre / Algunas veces / Nunca' },
  interaccion: { num: 4, label: 'Interacción', scale: 'Siempre / Algunas veces / Nunca' },
};

/** Las 7 dimensiones de estudio del diagnóstico (sección 5.5). */
export const STUDY_DIMENSIONS = [
  'Características generales de los estudiantes',
  'Accesibilidad a Internet',
  'Motivación',
  'Apoyo docente',
  'Entorno institucional',
  'Herramientas tecnológicas',
  'Necesidades o mejoras',
];

/**
 * Cronograma oficial del diagnóstico (18 actividades).
 * Responsable de todas las actividades: Stephanie Hernández.
 * start / end en formato ISO (AAAA-MM-DD); days según el cronograma del informe.
 */
export const CRONOGRAMA = [
  { id: 1, stage: 'antes', name: 'Definición de objetivos del diagnóstico', start: '2026-08-12', end: '2026-08-12', days: 1, deps: [] },
  { id: 2, stage: 'antes', name: 'Selección de dimensiones e indicadores', start: '2026-08-12', end: '2026-08-12', days: 1, deps: [1] },
  { id: 3, stage: 'antes', name: 'Elaboración de guía de observación', start: '2026-08-13', end: '2026-08-14', days: 2, deps: [2] },
  { id: 4, stage: 'antes', name: 'Elaboración de cuestionario', start: '2026-08-15', end: '2026-08-16', days: 2, deps: [2] },
  { id: 5, stage: 'antes', name: 'Elaboración de guía de entrevista', start: '2026-08-16', end: '2026-08-17', days: 2, deps: [2] },
  { id: 6, stage: 'antes', name: 'Revisión y corrección de instrumentos', start: '2026-08-18', end: '2026-08-21', days: 3, deps: [3, 4, 5] },
  { id: 7, stage: 'durante', name: 'Visita y observación en el centro educativo', start: '2026-08-22', end: '2026-08-22', days: 1, deps: [6] },
  { id: 8, stage: 'durante', name: 'Aplicación del cuestionario a estudiantes', start: '2026-09-12', end: '2026-09-12', days: 1, deps: [7] },
  { id: 9, stage: 'durante', name: 'Entrevista al docente tutor', start: '2026-09-12', end: '2026-09-12', days: 1, deps: [8] },
  { id: 10, stage: 'durante', name: 'Entrevista al encargado de modalidades flexibles', start: '2026-09-12', end: '2026-09-12', days: 1, deps: [9] },
  { id: 11, stage: 'despues', name: 'Integración de la información', start: '2026-09-13', end: '2026-09-14', days: 2, deps: [10] },
  { id: 12, stage: 'despues', name: 'Organización de la información recopilada', start: '2026-09-15', end: '2026-09-15', days: 1, deps: [11] },
  { id: 13, stage: 'despues', name: 'Análisis e interpretación de resultados', start: '2026-09-15', end: '2026-09-16', days: 3, deps: [12] },
  { id: 14, stage: 'despues', name: 'Elaboración de matriz FODA', start: '2026-09-17', end: '2026-09-17', days: 1, deps: [13] },
  { id: 15, stage: 'despues', name: 'Elaboración de conclusiones', start: '2026-09-18', end: '2026-09-18', days: 1, deps: [14] },
  { id: 16, stage: 'despues', name: 'Elaboración de recomendaciones', start: '2026-09-18', end: '2026-09-18', days: 1, deps: [15] },
  { id: 17, stage: 'despues', name: 'Redacción y revisión del Informe Diagnóstico', start: '2026-09-19', end: '2026-09-19', days: 1, deps: [16] },
  { id: 18, stage: 'despues', name: 'Preparación y entrega del informe final', start: '2026-09-20', end: '2026-09-20', days: 1, deps: [17] },
];

export const CRONOGRAMA_STAGES = {
  antes: { label: 'Antes', description: 'Diseño y validación de instrumentos' },
  durante: { label: 'Durante', description: 'Trabajo de campo en el centro educativo' },
  despues: { label: 'Después', description: 'Análisis, síntesis e informe' },
};

/** Convierte una fecha ISO (AAAA-MM-DD) a DD/MM/AAAA. */
export const formatDate = (iso) => iso.split('-').reverse().join('/');
