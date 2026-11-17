/* =====================================================================
   DATOS COMPARTIDOS DE LA PRÁCTICA DOCENTE
   Fuente: Hojas de control semanal (Informe_por_Jornadas-LIE-DDP1109-1..7),
   Firma de asistencia del practicante y documentos de /public/docs.
   (módulo sin componentes)
   ===================================================================== */

/** Enlace al recurso digital "Guía de Micro aprendizajes" (Canva). */
export const CANVA_URL = 'https://canva.link/6ykdt1eaixr4sjm';

/**
 * Registro de documentos publicados en /public/docs.
 * Cada entrada admite varias rutas candidatas: se usa la primera que exista
 * (nombre normalizado sin tildes primero y, como respaldo, el nombre original del archivo).
 */
export const DOCS = {
  planU4L1: ['/docs/Plan_de_Sesion_Unidad_4_Lec_1_PRIMER_ANO_CCNN_2026.pdf', '/docs/Plan_de_Sesión_Unidad_4_Lec_1_PRIMER_AÑO_CCNN_2026.pdf'],
  planU4L3: ['/docs/Plan_de_Sesion_Unidad_4_Lec_3_PRIMER_ANO_CCNN_2026.pdf', '/docs/Plan_de_Sesión_Unidad_4_Lec_3_PRIMER_AÑO_CCNN_2026.pdf'],
  planU5L3: ['/docs/Planificacion_de_clase_Unidad_5_Leccion_3_24-10.pdf', '/docs/Planificacion_de_clase_Unidad_5-Leccion3_24-10.pdf'],
  secuencia: ['/docs/SECUENCIA_DIDACTICA_CLASE_24-10.pdf'],
  leccionANP: ['/docs/Leccion_3_ANP.pdf'],
  guiaObservacion: ['/docs/Guia_de_observacion.pdf'],
  cuestionarioCCNN: [
    '/docs/Cuestionario_de_Ciencias_Naturales_PRIMER_ANO_MODULO_5_OCT_2026.pdf',
    '/docs/Cuestionario_de_Ciencias_Naturales_PRIMER_AÑO_MODULO 5_OCT_2026.pdf',
  ],
  examenM4: ['/docs/Examen_Parcial_Modulo_4.pdf'],
  rubrica: ['/docs/Rubrica_exposiciones.pdf'],
  entrevistaDocente: ['/docs/Entrevista_docente.pdf'],
  entrevistaCoordinador: ['/docs/Entrevista_Coordinador.pdf'],
  asistencia: ['/docs/Informe_de_asistencia.pdf'],
  propuesta: ['/docs/Instituto-Nacional-Dr-Francisco-Martinez-Suarez-Propuesta-Mejora.pdf'],
};

/** Hoja de control semanal oficial de cada jornada. */
export const jornadaDoc = (n) => [`/docs/Informe_por_Jornadas-LIE-DDP1109-${n}.pdf`];

/** Tipos de actividad declarados en las hojas de control (para analizar la evolución del rol). */
export const ACTIVITY_TYPES = {
  diagnostico: { label: 'Observación y diagnóstico', short: 'Diagnóstico', toneName: 'violet', hex: '#4A2574' },
  planificacion: { label: 'Planificación y preparación', short: 'Planificación', toneName: 'amber', hex: '#B08A4F' },
  acompanamiento: { label: 'Apoyo al docente y a estudiantes', short: 'Acompañamiento', toneName: 'emerald', hex: '#5E8C76' },
  docencia: { label: 'Conducción de clase', short: 'Docencia', toneName: 'rose', hex: '#B5657F' },
  gestion: { label: 'Gestión institucional', short: 'Gestión', toneName: 'indigo', hex: '#5A6BA8' },
};

/** Fases de la práctica. */
export const PHASES = {
  diagnostico: { label: 'Fase 1 · Inmersión y diagnóstico', short: 'Diagnóstico', toneName: 'violet' },
  acompanamiento: { label: 'Fase 2 · Acompañamiento y evaluación', short: 'Acompañamiento', toneName: 'amber' },
  intervencion: { label: 'Fase 3 · Intervención docente', short: 'Intervención', toneName: 'emerald' },
};

/**
 * Las 7 jornadas registradas en las hojas de control semanal y en la firma de asistencia.
 * Horario de cada jornada: 7:00 a.m. – 12:00 p.m. (5 horas).
 */
export const JORNADAS = [
  {
    n: 1,
    iso: '2026-08-08',
    date: '08/08/2026',
    phase: 'diagnostico',
    activities: [
      { time: '7:00 a.m. – 8:00 a.m.', hours: 1, type: 'gestion', text: 'Presentación con el docente y coordinador de la Modalidad flexible.' },
      {
        time: '8:00 a.m. – 10:00 a.m.',
        hours: 2,
        type: 'diagnostico',
        text: 'Observación del entorno, del ambiente dentro y fuera de la institución (Desarrollo del informe diagnóstico).',
      },
      { time: '10:00 a.m. – 12:00 p.m.', hours: 2, type: 'acompanamiento', text: 'Apoyo al docente en vigilar a los estudiantes mientras realizaban su parcial.' },
    ],
  },
  {
    n: 2,
    iso: '2026-08-22',
    date: '22/08/2026',
    phase: 'diagnostico',
    activities: [
      { time: '7:00 a.m. – 9:00 a.m.', hours: 2, type: 'planificacion', text: 'Asistencia al docente en la creación de la planificación de las próximas sesiones.' },
      { time: '9:00 a.m. – 10:00 a.m.', hours: 1, type: 'diagnostico', text: 'Observación del comportamiento de los estudiantes en clases (Parte del informe diagnóstico).' },
      { time: '10:00 a.m. – 12:00 p.m.', hours: 2, type: 'diagnostico', text: 'Aplicación del cuestionario para el informe diagnóstico.' },
    ],
  },
  {
    n: 3,
    iso: '2026-09-12',
    date: '12/09/2026',
    phase: 'diagnostico',
    activities: [
      { time: '7:00 a.m. – 9:00 a.m.', hours: 2, type: 'planificacion', text: 'Realización de planificación para clases, preparación de actividades para la clase.' },
      { time: '9:00 a.m. – 10:00 a.m.', hours: 1, type: 'diagnostico', text: 'Entrevista con el coordinador (Diagnóstico).' },
      { time: '10:00 a.m. – 11:00 a.m.', hours: 1, type: 'acompanamiento', text: 'Apoyo al docente en las actividades de clase.' },
      { time: '11:00 a.m. – 12:00 p.m.', hours: 1, type: 'diagnostico', text: 'Entrevista con el docente (Diagnóstico).' },
    ],
  },
  {
    n: 4,
    iso: '2026-09-26',
    date: '26/09/2026',
    phase: 'acompanamiento',
    activities: [
      { time: '7:00 a.m. – 8:00 a.m.', hours: 1, type: 'gestion', text: 'Acercamiento al coordinador y al docente para la firma del consolidado de asistencia.' },
      { time: '8:00 a.m. – 10:00 a.m.', hours: 2, type: 'planificacion', text: 'Preparación del examen parcial del módulo 4.' },
      { time: '10:00 a.m. – 12:00 p.m.', hours: 2, type: 'diagnostico', text: 'Observación de exposiciones por parte de los estudiantes.' },
    ],
  },
  {
    n: 5,
    iso: '2026-10-10',
    date: '10/10/2026',
    phase: 'acompanamiento',
    activities: [
      { time: '7:00 a.m. – 8:00 a.m.', hours: 1, type: 'diagnostico', text: 'Observación de exposiciones por parte de los estudiantes.' },
      { time: '8:00 a.m. – 9:00 a.m.', hours: 1, type: 'gestion', text: 'Acercamiento al coordinador y al docente para la firma del consolidado de asistencia.' },
      { time: '9:00 a.m. – 10:00 a.m.', hours: 1, type: 'acompanamiento', text: 'Apoyo a los estudiantes en actividades.' },
      { time: '10:00 a.m. – 12:00 p.m.', hours: 2, type: 'planificacion', text: 'Planificación para la clase de la próxima jornada.' },
    ],
  },
  {
    n: 6,
    iso: '2026-10-24',
    date: '24/10/2026',
    phase: 'intervencion',
    activities: [
      { time: '7:00 a.m. – 8:30 a.m.', hours: 1.5, type: 'planificacion', text: 'Preparación del equipo, materiales y recursos para impartir la clase.' },
      { time: '8:30 a.m. – 9:30 a.m.', hours: 1, type: 'docencia', text: 'Introducción al tema y desarrollo de la primera actividad.' },
      { time: '9:30 a.m. – 11:00 a.m.', hours: 1.5, type: 'docencia', text: 'Participación de estudiantes y desarrollo de la segunda actividad.' },
      { time: '11:00 a.m. – 12:00 p.m.', hours: 1, type: 'docencia', text: 'Revisión de la actividad realizada por los estudiantes.' },
    ],
  },
  {
    n: 7,
    iso: '2026-11-07',
    date: '07/11/2026',
    phase: 'intervencion',
    activities: [
      { time: '7:00 a.m. – 8:00 a.m.', hours: 1, type: 'planificacion', text: 'Preparación de materiales y recursos para la clase.' },
      { time: '8:00 a.m. – 9:00 a.m.', hours: 1, type: 'gestion', text: 'Acercamiento al coordinador y al docente para la firma del consolidado de asistencia.' },
      { time: '9:00 a.m. – 11:00 a.m.', hours: 2, type: 'acompanamiento', text: 'Apoyo al docente en el desarrollo de la clase.' },
      { time: '11:00 a.m. – 12:00 p.m.', hours: 1, type: 'acompanamiento', text: 'Apoyo a los estudiantes en las actividades de clase.' },
    ],
  },
];

/** Resumen verificable de la práctica (firma de asistencia del practicante). */
export const PRACTICE_SUMMARY = {
  jornadas: JORNADAS.length,
  horas: JORNADAS.reduce((acc, j) => acc + j.activities.reduce((a, x) => a + x.hours, 0), 0),
  inicio: JORNADAS[0].date,
  fin: JORNADAS[JORNADAS.length - 1].date,
  horario: '7:00 a.m. – 12:00 p.m.',
};

/** Formatea horas decimales: 1.5 → "1 h 30 min". */
export const formatHours = (h) => {
  const whole = Math.floor(h);
  const min = Math.round((h - whole) * 60);
  if (!whole) return `${min} min`;
  return min ? `${whole} h ${min} min` : `${whole} h`;
};

/**
 * Registro fotográfico de /public/img.
 * ratio: relación de aspecto aproximada (ancho / alto) para reservar espacio sin huecos.
 */
export const PHOTOS = [
  { src: '/img/Jornada_1_1.jpg', jornada: 1, ratio: 3 / 4, caption: 'Acompañamiento al docente durante la evaluación parcial del grupo.' },
  { src: '/img/Jornada_1_2.jpg', jornada: 1, ratio: 3 / 4, caption: 'Estudiantes resolviendo la evaluación parcial en el aula.' },
  { src: '/img/Jornada_1_3.jpg', jornada: 1, ratio: 3 / 4, caption: 'Supervisión de la evaluación parcial junto al grupo.' },
  { src: '/img/Jornada_1_4.jpg', jornada: 1, ratio: 3 / 4, caption: 'Reconocimiento del entorno exterior de la institución.' },
  { src: '/img/Jornada_2_1.jpg', jornada: 2, ratio: 3 / 4, caption: 'Apoyo al docente en la elaboración de la planificación de las próximas sesiones.' },
  { src: '/img/Jornada_2_2.jpg', jornada: 2, ratio: 3 / 4, caption: 'Registro digital durante la observación de la clase.' },
  { src: '/img/Jornada_2_3.jpg', jornada: 2, ratio: 4 / 3, caption: 'Trabajo en computadora portátil junto al grupo durante la jornada diagnóstica.' },
  { src: '/img/Jornada_3_1.jpg', jornada: 3, ratio: 3 / 4, caption: 'Instalaciones del Instituto Nacional Dr. Francisco Martínez Suárez.' },
  { src: '/img/Jornada_3_2.jpg', jornada: 3, ratio: 3 / 4, caption: 'Entrevista diagnóstica realizada durante la jornada.' },
  { src: '/img/Jornada_4_1.jpg', jornada: 4, ratio: 3 / 4, caption: 'Exposición de un estudiante con apoyo de proyector.' },
  { src: '/img/Jornada_4_2.jpg', jornada: 4, ratio: 3 / 4, caption: 'Desarrollo de las exposiciones en el salón.' },
  { src: '/img/Jornada_4_3.jpg', jornada: 4, ratio: 3 / 4, caption: 'Estudiante presentando su exposición frente al grupo.' },
  { src: '/img/Jornada_5_1.jpg', jornada: 5, ratio: 3 / 4, caption: 'Apoyo individual a una estudiante en las actividades del módulo.' },
  { src: '/img/Jornada_5_2.jpg', jornada: 5, ratio: 3 / 4, caption: 'Acompañamiento a una estudiante durante el trabajo en clase.' },
  { src: '/img/Jornada_5_3.jpg', jornada: 5, ratio: 3 / 4, caption: 'Planificación de la clase de la próxima jornada.' },
  { src: '/img/Jornada_6_1.jpeg', jornada: 6, ratio: 1600 / 739, caption: 'Desarrollo de la clase sobre Áreas Naturales Protegidas con apoyo de presentación digital.' },
  { src: '/img/Jornada_6_2.jpeg', jornada: 6, ratio: 717 / 1251, caption: 'Conducción de la clase frente al grupo de Primer Año de Bachillerato.' },
  { src: '/img/Jornada_7_1.jpg', jornada: 7, ratio: 3 / 4, caption: 'Entorno institucional durante la última jornada de práctica.' },
  { src: '/img/Jornada_7_2.jpg', jornada: 7, ratio: 4 / 3, caption: 'Apoyo al docente en el desarrollo de la clase.' },
  { src: '/img/Jornada_7_3.jpg', jornada: 7, ratio: 4 / 3, caption: 'Apoyo a estudiantes en las actividades con computadora portátil y teléfono celular.' },
  { src: '/img/Jornada_7_4.jpg', jornada: 7, ratio: 4 / 3, caption: 'Desarrollo de la clase en el aula de la modalidad flexible.' },
  { src: '/img/Jornada 7 (5).jpg', jornada: 7, ratio: 4 / 3, caption: 'Revisión de recursos digitales con un estudiante desde el teléfono celular.' },
];

/** Fotografías de una jornada. */
export const photosOf = (n) => PHOTOS.filter((p) => p.jornada === n);
