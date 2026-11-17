import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  School,
  FlaskConical,
  GraduationCap,
  UserRound,
  PenLine,
  Hash,
  Target,
  ListOrdered,
  Home,
  Package,
  CircleCheck,
  Clock,
  Smartphone,
  Eye,
  Timer,
  MapPinned,
  Leaf,
  Dna,
  Sprout,
  Presentation,
  CalendarDays,
  Layers,
  ClipboardCheck,
} from 'lucide-react';
import { PageShell, GlassCard, SectionHeader, Badge, SegmentedControl, DataTable, CardTitle } from './ui/Primitives';
import { cx, tone, fadeUp, stagger } from './ui/tokens';
import DocLink from './shared/DocLink';
import { DOCS } from '../data/practica';

/* =====================================================================
   PLANIFICACIONES DE CLASES · Ficha, selector de planes y adaptaciones
   ===================================================================== */

const FICHA = [
  { icon: School, label: 'Institución', value: 'Instituto Nacional Dr. Francisco Martínez Suárez' },
  { icon: Hash, label: 'Código de sede', value: 'ET-088' },
  { icon: FlaskConical, label: 'Asignatura', value: 'Ciencias Naturales y Tecnología' },
  { icon: GraduationCap, label: 'Grado', value: '1.° Año de Bachillerato · Sección "A"' },
  { icon: UserRound, label: 'Docente', value: 'Lcdo. Amilcar Heriberto Sánchez' },
  { icon: PenLine, label: 'Practicante', value: 'Stephanie Alexandra Hernández Sibrián' },
];

const PLANS = [
  {
    id: 'u4l1',
    n: 1,
    icon: Dna,
    toneName: 'violet',
    type: 'Plan de sesión',
    title: 'Plan de Sesión · Unidad 4, Lección 1',
    unit: 'Unidad 4: La evolución de la vida',
    lesson: 'Origen de la diversidad de los seres vivos',
    when: 'Módulo 4',
    time: '90 minutos presenciales',
    axes: 'Educación Ambiental y Salud',
    doc: DOCS.planU4L1,
    indicators: [
      'Describirás con interés los principales mecanismos de la evolución de los seres vivos y señalarás los aspectos evolutivos.',
      'Indagarás, argumentarás y describirás con seguridad las pruebas de la evolución: registro fósil, pruebas embriológicas, taxonómicas y morfológicas, entre otras.',
      'Indagarás, experimentarás y describirás los procesos de organización, irritabilidad, adaptación, metabolismo, reproducción y homeostasis en los seres vivos.',
      'Identificarás la célula como unidad estructural y funcional y compararás las células animales y vegetales.',
    ],
    moments: [
      {
        name: 'Inicio / Motivación',
        minutes: 15,
        actions: [
          'Saludo, lectura de agenda y verificación de asistencia.',
          'Imágenes de organismos que viven en ambientes distintos (desierto, bosque y agua).',
          'Pregunta detonante: ¿Qué características les permiten sobrevivir en esos ambientes?',
        ],
        resources: 'Libro de texto, imágenes impresas o digitales, pizarra.',
        evaluation: 'Participación en la conversación inicial.',
      },
      {
        name: 'Desarrollo',
        minutes: 25,
        actions: [
          'Ideas principales de Darwin y Wallace: variación, selección natural y adaptación.',
          'En equipos, tarjetas con fósiles, embriones y estructuras anatómicas: identificar qué tipo de evidencia representan.',
        ],
        resources: 'Libro de texto, tarjetas con imágenes, papel bond, pizarra.',
        evaluation: 'Identificación correcta de las evidencias evolutivas.',
      },
      {
        name: 'Desarrollo',
        minutes: 20,
        actions: [
          'Características de los seres vivos con ejemplos cercanos.',
          'En parejas, cuadro con la característica, su significado y un ejemplo; revisión en plenaria.',
        ],
        resources: 'Libro de texto, cuaderno, guía de trabajo.',
        evaluation: 'Reconocimiento de las características de los seres vivos.',
      },
      {
        name: 'Aplicación',
        minutes: 20,
        actions: [
          'Esquemas de célula animal y vegetal: membrana, citoplasma, núcleo, pared celular, cloroplastos y vacuola.',
          'Cuadro comparativo con dos semejanzas y tres diferencias.',
        ],
        resources: 'Esquemas o láminas de células, colores, cuaderno.',
        evaluation: 'Identificación de estructuras y comparación correcta.',
      },
      {
        name: 'Cierre y evaluación',
        minutes: 10,
        actions: ['Recapitulación breve.', 'Ejercicio de salida con tres preguntas: selección natural, pruebas evolutivas y diferencias entre células.'],
        resources: 'Folder de clases, cuaderno, ejercicio de salida.',
        evaluation: 'Respuestas correctas y capacidad para expresar lo aprendido.',
      },
    ],
    home: [
      'Leer las páginas de la lección 1 (aprox. págs. 103–109) y anotar las ideas de Darwin y Wallace con dos ejemplos de adaptaciones.',
      'Elaborar una lista breve de las pruebas de la evolución con un ejemplo de cada una.',
      'Seleccionar tres características de los seres vivos y escribir un ejemplo cotidiano de cada una.',
      'Responder: ¿Por qué la adaptación y la organización celular son importantes para los seres vivos?',
    ],
  },
  {
    id: 'u4l3',
    n: 2,
    icon: Sprout,
    toneName: 'emerald',
    type: 'Plan de sesión',
    title: 'Plan de Sesión · Unidad 4, Lección 3',
    unit: 'Unidad 4: La evolución de la vida',
    lesson: 'Fotosíntesis y respiración celular',
    when: 'Módulo 4',
    time: '90 minutos presenciales',
    axes: 'Educación Ambiental y Salud',
    doc: DOCS.planU4L3,
    indicators: [
      'Indagarás, representarás e interpretarás el proceso de la fotosíntesis y explicarás su importancia para los seres vivos.',
      'Representarás y explicarás la relación entre fotosíntesis y respiración celular.',
      'Explicarás las etapas generales de la reproducción celular y distinguirás mitosis y meiosis.',
    ],
    moments: [
      {
        name: 'Inicio / Motivación',
        minutes: 15,
        actions: [
          'Saludo, lectura de agenda y verificación de asistencia.',
          'Mostrar una planta y una fruta, o imágenes de ambas.',
          'Preguntas: ¿De dónde obtiene la planta los materiales para producir su alimento? ¿Por qué es importante la luz solar?',
        ],
        resources: 'Libro de texto, planta o imágenes, pizarra.',
        evaluation: 'Participación y explicación inicial sobre la importancia de las plantas y la luz solar.',
      },
      {
        name: 'Desarrollo',
        minutes: 25,
        actions: [
          'La fotosíntesis transforma la energía luminosa en energía química; función de cloroplastos y clorofila.',
          'La respiración celular permite obtener energía a partir de los nutrientes.',
          'En parejas, cuadro comparativo: dónde ocurre, qué necesita y qué produce cada proceso.',
        ],
        resources: 'Libro de texto, esquema de fotosíntesis, guía comparativa, cuaderno.',
        evaluation: 'Diferenciación entre fotosíntesis y respiración celular.',
      },
      {
        name: 'Desarrollo',
        minutes: 20,
        actions: [
          'Secuencia ilustrada de la división celular y fases de la mitosis: profase, metafase, anafase y telofase.',
          'Comparación entre mitosis y meiosis; ordenar tarjetas con las fases.',
        ],
        resources: 'Libro de texto, láminas o tarjetas de fases celulares, cuaderno.',
        evaluation: 'Orden correcto de las fases y diferenciación entre mitosis y meiosis.',
      },
      {
        name: 'Cierre y evaluación',
        minutes: 10,
        actions: ['Recapitulación de fotosíntesis, respiración celular, división celular y herencia.', 'Actividad corta de relación de conceptos o autocomprobación.'],
        resources: 'Folder de clases, cuaderno, actividad de evaluación.',
        evaluation: 'Precisión en las respuestas y participación.',
      },
    ],
    home: [
      'Leer la lección 3 e identificar qué necesitan las plantas para la fotosíntesis y qué productos se obtienen.',
      'Elaborar un esquema sencillo con los elementos que intervienen en la fotosíntesis.',
      'Escribir la función principal de la mitosis y de la meiosis.',
      'Repasar los contenidos y preparar dudas para la siguiente clase.',
    ],
  },
  {
    id: 'u5l3',
    n: 3,
    icon: Leaf,
    toneName: 'amber',
    type: 'Planificación de clase',
    title: 'Planificación de clase · Unidad 5, Lección 3',
    unit: 'Unidad 5',
    lesson: 'Áreas Naturales Protegidas (ANP) de El Salvador',
    when: '24/10/2026',
    time: '90 minutos presenciales',
    axes: 'Educación Ambiental y Salud',
    doc: DOCS.planU5L3,
    indicators: [
      'Investigarás, ubicarás y describirás los criterios y características geográficas, bióticas, sociales, culturales y económicas de algunas áreas naturales protegidas (ANP) en El Salvador.',
      'Investigarás con interés la función del Servicio de Parques Nacionales y Vida Silvestre.',
    ],
    moments: [
      {
        name: 'Inicio / Motivación',
        minutes: 15,
        actions: [
          'Saludo, verificación de asistencia y lectura de la agenda.',
          'Dinámica socioemocional con la escala visual "¿Qué tan Mike te sientes hoy? (1 al 9)".',
          'Lluvia de ideas: ¿Qué lugares naturales protegidos de El Salvador conocen o han visitado?',
        ],
        resources: 'Presentación digital y proyector, pizarra y plumones, cuaderno.',
        evaluation: 'Participación en la dinámica y pertinencia de los conocimientos previos.',
      },
      {
        name: 'Desarrollo · Conceptualización y análisis',
        minutes: 30,
        actions: [
          'Concepto legal de ANP y rol del Estado (Servicio de Parques Nacionales y Vida Silvestre).',
          'Cuatro pilares de importancia: producción de oxígeno, conservación hídrica, protección del suelo y refugio de vida silvestre.',
          'Recorrido guiado por 6 ANP: Los Volcanes, El Imposible, Montecristo, Laguna El Jocotal, Conchagua y Barra de Santiago.',
        ],
        resources: 'Presentación digital, cuaderno, pizarra.',
        evaluation: 'Comprensión del concepto y diferenciación de características geográficas y bióticas.',
      },
      {
        name: 'Aplicación · "El Mapa de las ANP"',
        minutes: 25,
        actions: [
          'Mapa político departamental de El Salvador proyectado o en la pizarra.',
          'Cada estudiante toma una tarjeta de una ANP y la coloca en su departamento (Ahuachapán, Santa Ana, Sonsonate, San Miguel o La Unión).',
          'Validación en plenaria mencionando una especie o característica clave del lugar.',
        ],
        resources: 'Mapa de El Salvador, tarjetas con imágenes y nombres de las ANP, cinta adhesiva.',
        evaluation: 'Precisión al ubicar cada ANP y trabajo colaborativo.',
      },
      {
        name: 'Cierre y evaluación',
        minutes: 20,
        actions: [
          'Síntesis con preguntas dirigidas: ¿Qué ANP es sitio RAMSAR? ¿Cuál fue la primera área protegida oficial del país?',
          'Indicaciones de la actividad ex-aula: afiche informativo con entrega en Google Classroom.',
        ],
        resources: 'Presentación digital, Google Classroom, guía de indicaciones.',
        evaluation: 'Respuestas acertadas y claridad de las instrucciones del afiche (3 requisitos).',
      },
    ],
    home: [
      'Leer en el módulo el tema de las Áreas Naturales Protegidas de El Salvador.',
      'Definir en el cuaderno qué es un Área Natural Protegida y anotar dos razones para proteger los ecosistemas del país.',
      'Investigar qué institución del Estado administra y regula las ANP y la vida silvestre.',
      'Afiche informativo de una ANP: nombre y ubicación geográfica, flora y fauna representativa, y reglamento para el visitante.',
    ],
  },
  {
    id: 'secuencia',
    n: 4,
    icon: MapPinned,
    toneName: 'rose',
    type: 'Secuencia didáctica',
    title: 'Secuencia Didáctica · Clase 24-10',
    unit: 'Unidad 5 · Lección 3',
    lesson: 'Áreas Naturales Protegidas de El Salvador',
    when: '24/10/2026',
    time: 'Jornada de 7:00 a.m. a 12:00 p.m.',
    axes: 'Educación Ambiental y Salud',
    doc: DOCS.secuencia,
    support: { src: DOCS.leccionANP, label: 'Presentación de la clase (Lección 3 ANP)' },
    indicators: [
      'Investigarás, ubicarás y describirás los criterios y características geográficas, bióticas, sociales, culturales y económicas de algunas ANP en El Salvador.',
      'Investigarás con interés la función del Servicio de Parques Nacionales y Vida Silvestre.',
    ],
    moments: [
      {
        name: 'Preparación',
        range: '7:00 – 8:30 a.m.',
        minutes: 90,
        actions: ['Preparación del equipo, materiales y recursos para impartir la clase.'],
        resources: 'Computadora, proyector, presentación digital, mapa y tarjetas.',
        evaluation: 'Recursos listos antes del inicio.',
      },
      {
        name: 'Introducción y primera actividad',
        range: '8:30 – 9:30 a.m.',
        minutes: 60,
        actions: ['Introducción al tema y desarrollo de la primera actividad.', 'Presentación: "¿Cómo te sientes el día de hoy?", indicadores de logro, concepto e importancia de las ANP.'],
        resources: 'Presentación "Áreas Naturales Protegidas de El Salvador".',
        evaluation: 'Participación en la dinámica inicial.',
      },
      {
        name: 'Participación y segunda actividad',
        range: '9:30 – 11:00 a.m.',
        minutes: 90,
        actions: ['Participación de estudiantes y desarrollo de la segunda actividad.', 'Ubicación de las ANP en el mapa de El Salvador.'],
        resources: 'Mapa, tarjetas con imágenes de las ANP, cinta adhesiva.',
        evaluation: 'Precisión al ubicar cada ANP.',
      },
      {
        name: 'Revisión',
        range: '11:00 a.m. – 12:00 p.m.',
        minutes: 60,
        actions: ['Revisión de la actividad realizada por los estudiantes.', 'Indicaciones del afiche informativo.'],
        resources: 'Google Classroom, guía de indicaciones.',
        evaluation: 'Revisión de lo realizado en plenaria.',
      },
    ],
    home: ['Crear un afiche informativo de una ANP de El Salvador (puede utilizarse Inteligencia Artificial).', 'Incluir: nombre del lugar y ubicación, flora y fauna representativa, y reglamento para el visitante.'],
  },
];

const ADAPTATIONS = [
  {
    icon: Smartphone,
    toneName: 'violet',
    title: 'Enfoque Mobile-first / Offline',
    data: '27.3%',
    dataLabel: 'depende del smartphone o tiene conexión inestable o nula',
    text: 'Prioricé lecturas del módulo y actividades en el cuaderno que no requieren conexión, y una entrega digital en Google Classroom accesible desde el celular.',
  },
  {
    icon: Eye,
    toneName: 'amber',
    title: 'Apoyo visual para la lectoescritura',
    data: 'Visual',
    dataLabel: 'imágenes, tarjetas, esquemas y mapas',
    text: 'Incorporé imágenes de organismos, tarjetas de fósiles y embriones, esquemas de células, la secuencia ilustrada de la mitosis y el mapa de las ANP para reducir la carga de textos extensos.',
  },
  {
    icon: Timer,
    toneName: 'emerald',
    title: 'Dosificación de actividades',
    data: '10–30 min',
    dataLabel: 'por momento de la clase',
    text: 'Organicé cada sesión en momentos breves y tareas en casa acotadas (dos ejemplos, tres características, una lista breve), pensando en estudiantes que trabajan durante la semana.',
  },
];

const DETAIL_VIEWS = [
  { id: 'momentos', label: 'Momentos', icon: ListOrdered },
  { id: 'indicadores', label: 'Indicadores', icon: Target },
  { id: 'casa', label: 'En casa', icon: Home },
];

const COMPARE_COLUMNS = [
  { key: 'title', label: 'Planificación', className: 'w-[26%]', render: (p) => <span className="font-semibold text-ink">{p.title}</span> },
  { key: 'lesson', label: 'Tema', className: 'w-[26%]' },
  { key: 'when', label: 'Referencia', className: 'w-[14%] tabular-nums' },
  { key: 'moments', label: 'Momentos', className: 'w-[10%]', render: (p) => <span className="tabular-nums">{p.moments.length}</span> },
  { key: 'indicators', label: 'Indicadores', className: 'w-[10%]', render: (p) => <span className="tabular-nums">{p.indicators.length}</span> },
  { key: 'type', label: 'Tipo', render: (p) => <Badge toneName={p.toneName}>{p.type}</Badge> },
];

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function MomentsTimeline({ plan }) {
  const total = plan.moments.reduce((a, m) => a + m.minutes, 0);
  const palette = ['bg-plum', 'bg-bronze', 'bg-sage', 'bg-wine', 'bg-slate-ink'];
  return (
    <div className="space-y-5">
      <div className="flex h-4 w-full overflow-hidden rounded-full bg-silk">
        {plan.moments.map((m, i) => (
          <motion.span
            key={`${m.name}-${i}`}
            initial={{ width: 0 }}
            animate={{ width: `${(m.minutes / total) * 100}%` }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={cx('h-full border-r-2 border-white last:border-r-0', palette[i % palette.length])}
            title={`${m.name} · ${m.range || `${m.minutes} min`}`}
          />
        ))}
      </div>
      <ol className="relative space-y-3">
        {plan.moments.map((m, i) => (
          <li key={`${m.name}-${i}`} className="grid grid-cols-[auto_1fr] gap-3 sm:gap-4">
            <div className="flex flex-col items-center">
              <span className={cx('inline-flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold text-white', palette[i % palette.length])}>{i + 1}</span>
              {i < plan.moments.length - 1 && <span className="mt-1 w-px flex-1 bg-line-strong" />}
            </div>
            <div className="rounded-2xl border border-line bg-white p-4 mb-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-ink">{m.name}</p>
                <Badge toneName="slate" icon={Clock}>
                  {m.range || `${m.minutes} min`}
                </Badge>
              </div>
              <ul className="mt-2.5 space-y-1.5">
                {m.actions.map((a) => (
                  <li key={a} className="flex gap-2 text-sm text-body leading-relaxed">
                    <CircleCheck size={15} className="shrink-0 mt-1 text-sage" /> {a}
                  </li>
                ))}
              </ul>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                <p className="rounded-xl bg-ivory border border-line px-3 py-2 text-xs text-body">
                  <span className="flex items-center gap-1.5 font-semibold text-ink mb-0.5">
                    <Package size={13} className="text-plum" /> Recursos
                  </span>
                  {m.resources}
                </p>
                <p className="rounded-xl bg-sand border border-sand-line px-3 py-2 text-xs text-body">
                  <span className="flex items-center gap-1.5 font-semibold text-bronze-dark mb-0.5">
                    <ClipboardCheck size={13} /> Criterio de evaluación
                  </span>
                  {m.evaluation}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PlanDetail({ plan }) {
  const [view, setView] = useState('momentos');
  const t = tone(plan.toneName);
  const PIcon = plan.icon;
  return (
    <GlassCard hover={false} padded={false} className="overflow-hidden">
      <div className={cx('p-5 sm:p-7 border-b border-line', t.bg)}>
        <div className="flex flex-col md:flex-row md:items-start gap-5 md:justify-between">
          <div className="flex items-start gap-4 min-w-0">
            <span className={cx('shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl border bg-white', t.border, t.text)}>
              <PIcon size={26} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">
                {plan.type} · {plan.unit}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight mt-1">{plan.lesson}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge toneName="slate" icon={CalendarDays}>
                  {plan.when}
                </Badge>
                <Badge toneName="slate" icon={Clock}>
                  {plan.time}
                </Badge>
                <Badge toneName="emerald" icon={Leaf}>
                  {plan.axes}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:w-60 shrink-0">
            <DocLink src={plan.doc} label="Abrir PDF" block />
            {plan.support && <DocLink src={plan.support.src} label={plan.support.label} variant="light" icon={Presentation} block />}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-5">
        <SegmentedControl options={DETAIL_VIEWS} value={view} onChange={setView} ariaLabel="Sección del plan" />
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
            {view === 'momentos' && <MomentsTimeline plan={plan} />}
            {view === 'indicadores' && (
              <ol className="space-y-3">
                {plan.indicators.map((ind, i) => (
                  <li key={ind} className="flex gap-4 rounded-2xl border border-line bg-white p-4">
                    <span className="font-serif text-2xl font-semibold text-bronze leading-none w-6">{i + 1}</span>
                    <p className="text-[15px] text-body leading-relaxed">{ind}</p>
                  </li>
                ))}
              </ol>
            )}
            {view === 'casa' && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {plan.home.map((h) => (
                  <li key={h} className="flex gap-3 rounded-2xl border border-line bg-ivory p-4 text-sm text-body leading-relaxed">
                    <Home size={16} className="shrink-0 mt-0.5 text-plum" /> {h}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Planificaciones_de_clases() {
  const [active, setActive] = useState(PLANS[0].id);
  const plan = PLANS.find((p) => p.id === active) || PLANS[0];

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Planificaciones"
        icon={FileText}
        title="Planificaciones de"
        highlight="clases"
        description="Planes de sesión y secuencia didáctica que elaboré para Ciencias Naturales y Tecnología, con sus momentos, indicadores de logro y actividades en casa."
      />

      {/* Ficha institucional */}
      <GlassCard hover={false} padded={false} className="overflow-hidden">
        <div className="flex items-center gap-2 px-5 sm:px-7 py-3 bg-abyss text-on-plum">
          <Layers size={15} className="text-[#E5D5B5]" />
          <p className="text-[11px] uppercase tracking-[0.22em] font-semibold">Modalidades Flexibles de Educación · Bachillerato a Distancia</p>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
          {FICHA.map((f) => {
            const FIcon = f.icon;
            return (
              <div key={f.label} className="flex items-start gap-3 p-4 sm:p-5 bg-white">
                <FIcon size={17} className="shrink-0 mt-0.5 text-plum" />
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">{f.label}</dt>
                  <dd className="text-sm font-semibold text-ink leading-snug mt-0.5">{f.value}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      </GlassCard>

      {/* Selector de planes */}
      <section className="space-y-5">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-3" role="tablist" aria-label="Planificaciones">
          {PLANS.map((p) => {
            const PIcon = p.icon;
            const isActive = p.id === active;
            return (
              <motion.button
                key={p.id}
                variants={fadeUp}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(p.id)}
                className={cx(
                  'text-left rounded-3xl border p-4 sm:p-5 transition-all duration-300',
                  isActive ? 'border-plum bg-plum text-white shadow-paper-lg' : 'border-line bg-white shadow-paper hover:border-line-strong hover:shadow-paper-lg'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cx('font-serif text-3xl font-semibold leading-none', isActive ? 'text-[#E5D5B5]' : 'text-bronze')}>0{p.n}</span>
                  <PIcon size={20} className={isActive ? 'text-white' : 'text-plum'} />
                </div>
                <p className={cx('mt-3 text-[10px] uppercase tracking-[0.16em] font-semibold', isActive ? 'text-on-plum-muted' : 'text-muted')}>{p.type}</p>
                <p className={cx('mt-1 text-sm font-semibold leading-snug', isActive ? 'text-white' : 'text-ink')}>{p.lesson}</p>
                <p className={cx('mt-2 text-xs', isActive ? 'text-on-plum-muted' : 'text-muted')}>{p.unit}</p>
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={plan.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <PlanDetail plan={plan} />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Adaptaciones curriculares */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Adaptaciones curriculares"
          icon={Target}
          title="Ajustes según el"
          highlight="diagnóstico"
          description="Cada planificación incorpora tres adaptaciones que responden a las condiciones del grupo."
        />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ADAPTATIONS.map((a) => {
            const AIcon = a.icon;
            const t = tone(a.toneName);
            return (
              <motion.div key={a.title} variants={fadeUp} className="rounded-3xl border border-line bg-white shadow-paper overflow-hidden">
                <div className={cx('h-1', t.fill)} />
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className={cx('inline-flex h-12 w-12 items-center justify-center rounded-2xl border', t.bg, t.border, t.text)}>
                      <AIcon size={22} />
                    </span>
                    <div className="text-right">
                      <span className={cx('block font-serif text-2xl font-semibold leading-none', t.strong)}>{a.data}</span>
                      <span className="block text-[11px] text-muted mt-1 max-w-[150px] leading-tight">{a.dataLabel}</span>
                    </div>
                  </div>
                  <p className="font-semibold text-ink">{a.title}</p>
                  <p className="text-sm text-body leading-relaxed">{a.text}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Comparativo */}
      <section className="space-y-5">
        <CardTitle icon={ListOrdered} title="Comparativo de planificaciones" subtitle="Vista general de los cuatro documentos" toneName="amber" />
        <DataTable
          columns={COMPARE_COLUMNS}
          rows={PLANS}
          rowKey="id"
          minWidth={820}
          renderCard={(p) => (
            <button type="button" onClick={() => setActive(p.id)} className="w-full text-left rounded-2xl border border-line bg-white shadow-paper p-4 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-ink leading-snug">{p.title}</p>
                <Badge toneName={p.toneName}>{p.type}</Badge>
              </div>
              <p className="text-sm text-body">{p.lesson}</p>
              <p className="text-xs text-muted">
                {p.when} · {p.moments.length} momentos · {p.indicators.length} indicadores
              </p>
            </button>
          )}
        />
      </section>
    </PageShell>
  );
}
