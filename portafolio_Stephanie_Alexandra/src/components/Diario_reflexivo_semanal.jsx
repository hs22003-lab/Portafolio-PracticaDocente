import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NotebookPen,
  CalendarDays,
  ListChecks,
  Puzzle,
  Lightbulb,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  CircleCheck,
  ArrowRight,
  Quote,
  Clock,
  TrendingUp,
  UserRound,
  FileCheck2,
  Camera,
  Route,
} from 'lucide-react';
import { PageShell, GlassCard, SectionHeader, Badge, CardTitle, HorizontalBars, DataTable } from './ui/Primitives';
import { cx, tone, fadeUp, stagger } from './ui/tokens';
import DocLink from './shared/DocLink';
import { assetUrl } from './shared/assets';
import { ACTIVITY_TYPES, DOCS, JORNADAS, PHASES, PRACTICE_SUMMARY, formatHours, jornadaDoc, photosOf } from '../data/practica';

/* =====================================================================
   DIARIO REFLEXIVO SEMANAL · Consolidado de las 7 jornadas
   Actividades: hojas de control semanal oficiales (DDP1109).
   ===================================================================== */

const SECTIONS = [
  { key: 'activities', code: 'a', label: 'Actividades realizadas', icon: ListChecks },
  { key: 'challenges', code: 'b', label: 'Retos y soluciones', icon: Puzzle },
  { key: 'learnings', code: 'c', label: 'Aprendizajes', icon: Lightbulb },
  { key: 'reflection', code: 'd', label: 'Reflexión personal', icon: Heart },
];

const REFLECTIONS = {
  1: {
    title: 'Inmersión institucional y reconocimiento del entorno',
    role: 'Observadora',
    challenges: [
      {
        challenge: 'Comprender en una sola jornada la organización de la modalidad flexible.',
        solution: 'Inicié con la presentación ante el docente tutor y el coordinador de la Modalidad Flexible, lo que me permitió conocer los roles y la dinámica de las jornadas sabatinas.',
      },
      {
        challenge: 'Observar el entorno antes de contar con los instrumentos del diagnóstico.',
        solution: 'Registré observaciones generales del ambiente dentro y fuera de la institución como insumo para definir las dimensiones e indicadores del informe diagnóstico.',
      },
      {
        challenge: 'Acompañar una evaluación parcial sin interferir en la concentración del grupo.',
        solution: 'Apoyé al docente en la vigilancia durante las dos horas del parcial, atendiendo sus indicaciones.',
      },
    ],
    learnings: [
      'La modalidad flexible concentra la atención presencial en los sábados, por lo que cada hora de tutoría debe aprovecharse al máximo.',
      'Conocer el entorno antes de diseñar los instrumentos permite formular indicadores pertinentes a la realidad de la institución.',
      'La evaluación parcial es un momento del módulo que exige orden, acompañamiento y respeto por el ritmo del estudiantado.',
    ],
    reflection:
      'Esta primera jornada marcó mi transición de estudiante a practicante. Presentarme ante el docente tutor y el coordinador, recorrer la institución y acompañar una evaluación me permitió dimensionar la responsabilidad de trabajar con personas adultas que dedican su sábado a estudiar. Comprendí que mi práctica debía empezar por observar y escuchar antes de proponer.',
  },
  2: {
    title: 'Observación sistemática y aplicación del cuestionario',
    role: 'Investigadora',
    challenges: [
      {
        challenge: 'Combinar en una misma jornada el apoyo a la planificación y la recolección de datos.',
        solution: 'Distribuí la mañana en bloques: de 7:00 a 9:00 apoyé la planificación de las próximas sesiones, de 9:00 a 10:00 observé la clase y de 10:00 a 12:00 apliqué el cuestionario.',
      },
      {
        challenge: 'Registrar la observación de manera objetiva.',
        solution: 'Utilicé la guía de observación sistemática, con escalas definidas para el estudiantado, el entorno físico y tecnológico, la dimensión pedagógica y la interacción.',
      },
      {
        challenge: 'Facilitar que el grupo respondiera el cuestionario.',
        solution: 'Utilicé un formulario digital breve, con preguntas mayormente cerradas, que puede responderse desde el teléfono celular.',
      },
    ],
    learnings: [
      'El grupo hace preguntas, participa, trabaja en equipo y solicita apoyo al docente de forma constante; la iniciativa propia aparece solo algunas veces.',
      'La iluminación, la ventilación, el mobiliario y las computadoras se cumplen parcialmente, mientras que Internet y proyector están disponibles.',
      'Apoyar la planificación del docente me permitió conocer la estructura de los planes de sesión: indicadores de logro, actividades presenciales y no presenciales, recursos y criterios de evaluación.',
    ],
    reflection:
      'Observar con un instrumento estructurado me hizo ver lo que a simple vista pasaría desapercibido: un grupo participativo que necesita fortalecer su iniciativa y su autonomía. Aplicar el cuestionario me recordó que detrás de cada respuesta hay una persona con su propia historia, su trabajo y su familia.',
  },
  3: {
    title: 'Entrevistas diagnósticas y apoyo en clase',
    role: 'Investigadora',
    challenges: [
      {
        challenge: 'Coordinar dos entrevistas con el desarrollo de la clase.',
        solution: 'Realicé la entrevista al coordinador de 9:00 a 10:00 y la del docente de 11:00 a 12:00, intercalando el apoyo en las actividades de clase.',
      },
      {
        challenge: 'Registrar respuestas abiertas sin perder su sentido.',
        solution: 'Seguí guías de 10 preguntas y registré las respuestas de forma literal para su análisis posterior.',
      },
      {
        challenge: 'Preparar actividades para la clase en el mismo bloque de la mañana.',
        solution: 'Dediqué las dos primeras horas a la planificación y preparación de actividades antes de las entrevistas.',
      },
    ],
    learnings: [
      'El docente tutor y el coordinador coinciden en que a muchos estudiantes se les dificulta utilizar la computadora.',
      'Según el docente, el aula invertida y los proyectos que involucran tecnología le han funcionado en esta modalidad.',
      'La institución cuenta con equipo y red; la brecha se concentra en el hogar y en las competencias de uso.',
    ],
    reflection:
      'Escuchar al coordinador y al docente tutor me permitió entender el contexto desde dos miradas complementarias: la institucional y la pedagógica. Sus respuestas dieron sentido a lo que observé y a los datos del cuestionario. Con esta jornada cerré el trabajo de campo del diagnóstico.',
  },
  4: {
    title: 'Preparación de la evaluación parcial y observación de exposiciones',
    role: 'Colaboradora en evaluación',
    challenges: [
      {
        challenge: 'Diseñar un examen que evaluara distintos niveles de comprensión del módulo 4.',
        solution: 'Estructuré el examen en cuatro partes: selección múltiple (30%), verdadero o falso (20%), relación de columnas (20%) y crucigrama (30%).',
      },
      {
        challenge: 'Valorar las exposiciones con criterios homogéneos.',
        solution: 'Tomé como referencia la rúbrica de exposiciones del módulo 4, con cinco criterios ponderados: dominio del tema, organización, expresión oral, recursos de apoyo y manejo del tiempo.',
      },
      {
        challenge: 'Formalizar el registro de asistencia de la práctica.',
        solution: 'Me acerqué al coordinador y al docente para la firma del consolidado de asistencia al inicio de la jornada.',
      },
    ],
    learnings: [
      'Variar el tipo de ítems permite evaluar la comprensión y no solo la memorización.',
      'En las exposiciones, los estudiantes utilizan el proyector y presentaciones como recurso de apoyo.',
      'Una rúbrica con criterios explícitos hace más transparente la valoración para el estudiantado.',
    ],
    reflection:
      'Pasar del diagnóstico a la evaluación me exigió pensar como docente: qué quiero que el estudiante demuestre y cómo lo voy a reconocer. Observar las exposiciones me permitió valorar el esfuerzo del grupo al presentar frente a sus compañeros, a pesar de sus responsabilidades fuera del aula.',
  },
  5: {
    title: 'Acompañamiento a estudiantes y planificación de la intervención',
    role: 'Planificadora',
    challenges: [
      {
        challenge: 'Atender dudas individuales durante las actividades.',
        solution: 'Acompañé a los estudiantes en sus puestos, revisando con ellos el trabajo del módulo.',
      },
      {
        challenge: 'Planificar la clase de la siguiente jornada considerando las condiciones del grupo.',
        solution: 'Diseñé una secuencia con momentos breves, apoyo visual (presentación, mapa y tarjetas) y una actividad ex-aula digital con entrega en Google Classroom.',
      },
    ],
    learnings: [
      'El acompañamiento individual permite detectar dificultades que no siempre aparecen en la plenaria.',
      'Planificar desde el diagnóstico implica que cada decisión de tiempo, recurso y producto responda a un hallazgo concreto.',
    ],
    reflection:
      'Esta jornada fue un puente entre acompañar y conducir. Al planificar mi propia clase sentí la responsabilidad de traducir el diagnóstico en actividades concretas, breves y significativas para el grupo.',
  },
  6: {
    title: 'Conducción de la clase: Áreas Naturales Protegidas de El Salvador',
    role: 'Docente a cargo',
    challenges: [
      {
        challenge: 'Explorar el estado de ánimo del grupo al iniciar la clase.',
        solution: 'Utilicé la dinámica socioemocional con la escala visual "¿Qué tan Mike te sientes hoy?" del 1 al 9.',
      },
      {
        challenge: 'Conectar el contenido con la realidad del país.',
        solution: 'Realicé un recorrido guiado por seis Áreas Naturales Protegidas y una actividad de ubicación en el mapa de El Salvador por departamento.',
      },
      {
        challenge: 'Integrar la alfabetización digital sin saturar al estudiantado.',
        solution: 'Asigné un afiche informativo con tres requisitos claros y entrega en Google Classroom, en coherencia con la propuesta de mejora.',
      },
    ],
    learnings: [
      'Las actividades manipulativas, como ubicar tarjetas en el mapa, abren una forma de participación distinta a la intervención oral.',
      'Revisar la actividad al cierre de la clase permite retroalimentar en el momento.',
      'Un producto digital con requisitos concretos orienta el uso de la tecnología hacia un propósito de aprendizaje.',
    ],
    reflection:
      'Conducir la clase fue el momento en que el diagnóstico y la propuesta se convirtieron en práctica. Preparé con anticipación el equipo y los materiales, guié las actividades y revisé lo realizado por el grupo. Esta experiencia me dio seguridad en mi rol docente y me confirmó la importancia de planificar cada momento con claridad.',
  },
  7: {
    title: 'Cierre de la práctica: apoyo en clase y acompañamiento con recursos digitales',
    role: 'Docente de apoyo',
    challenges: [
      {
        challenge: 'Acompañar a estudiantes con distintos niveles de manejo de dispositivos.',
        solution: 'Apoyé a los estudiantes en las actividades de clase utilizando la computadora portátil y el teléfono celular como herramientas de consulta.',
      },
      {
        challenge: 'Cerrar formalmente el proceso de práctica.',
        solution: 'Gestioné la firma del consolidado de asistencia con el coordinador y el docente tutor, completando las 7 jornadas y 35 horas.',
      },
    ],
    learnings: [
      'El teléfono celular es un recurso de aprendizaje válido en la modalidad flexible cuando los materiales están pensados para pantallas pequeñas.',
      'La constancia de las jornadas sabatinas construye una relación de confianza con el grupo y con el docente tutor.',
    ],
    reflection:
      'Cerré la práctica con la satisfacción de haber recorrido todo el ciclo: observar, investigar, evaluar, planificar y enseñar. Me llevo la convicción de que la tecnología transforma cuando se adapta, con empatía, a la realidad de cada estudiante.',
  },
};

const ENTRIES = JORNADAS.map((j) => ({ ...j, ...REFLECTIONS[j.n] }));

const hoursByType = (j) =>
  Object.keys(ACTIVITY_TYPES).reduce((acc, k) => ({ ...acc, [k]: j.activities.filter((a) => a.type === k).reduce((s, a) => s + a.hours, 0) }), {});

const ACTIVITY_COLUMNS = [
  { key: 'time', label: 'Horario', className: 'w-44 tabular-nums font-semibold text-ink' },
  { key: 'text', label: 'Actividad desarrollada' },
  {
    key: 'type',
    label: 'Tipo',
    className: 'w-44',
    render: (a) => <Badge toneName={ACTIVITY_TYPES[a.type].toneName}>{ACTIVITY_TYPES[a.type].short}</Badge>,
  },
  { key: 'hours', label: 'Horas', className: 'w-24 tabular-nums', render: (a) => formatHours(a.hours) },
];

/* ---------------------------------------------------------------------
   Evolución del rol docente
   --------------------------------------------------------------------- */

function EvolutionChart({ active, onSelect }) {
  const [hoverType, setHoverType] = useState(null);
  const totals = useMemo(
    () =>
      Object.entries(ACTIVITY_TYPES).map(([k, t]) => {
        const value = ENTRIES.reduce((acc, j) => acc + hoursByType(j)[k], 0);
        return { key: k, label: t.label, value, percent: Number(((value / PRACTICE_SUMMARY.horas) * 100).toFixed(1)), color: t.hex };
      }),
    []
  );

  return (
    <GlassCard hover={false} className="space-y-6">
      <CardTitle
        icon={TrendingUp}
        title="Evolución de mi rol docente"
        subtitle="Horas por tipo de actividad en cada jornada (hojas de control semanal)"
        right={<Badge toneName="emerald">{PRACTICE_SUMMARY.horas} h</Badge>}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <div className="flex items-end gap-2 sm:gap-3 h-56">
            {ENTRIES.map((j, i) => {
              const h = hoursByType(j);
              const isActive = j.n === active;
              return (
                <button
                  key={j.n}
                  type="button"
                  onClick={() => onSelect(j.n)}
                  aria-label={`Ver jornada ${j.n}`}
                  className="group flex-1 h-full flex flex-col justify-end items-center gap-1.5"
                >
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className={cx(
                      'flex-1 w-full max-w-[56px] origin-bottom flex flex-col-reverse rounded-xl overflow-hidden border-2 transition-colors',
                      isActive ? 'border-plum' : 'border-transparent group-hover:border-line-strong'
                    )}
                  >
                    {Object.keys(ACTIVITY_TYPES).map((k) =>
                      h[k] > 0 ? (
                        <span
                          key={k}
                          className="block w-full transition-opacity duration-300 border-t border-white/60 first:border-t-0"
                          style={{ height: `${(h[k] / 5) * 100}%`, background: ACTIVITY_TYPES[k].hex, opacity: hoverType && hoverType !== k ? 0.2 : 1 }}
                          title={`${ACTIVITY_TYPES[k].label}: ${formatHours(h[k])}`}
                        />
                      ) : null
                    )}
                  </motion.div>
                  <span className={cx('text-xs font-bold', isActive ? 'text-plum' : 'text-muted')}>J{j.n}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 grid grid-cols-7 gap-2 sm:gap-3">
            {[
              { span: 'col-span-3', phase: 'diagnostico' },
              { span: 'col-span-2', phase: 'acompanamiento' },
              { span: 'col-span-2', phase: 'intervencion' },
            ].map((p) => (
              <span key={p.phase} className={cx(p.span, 'rounded-full px-2 py-1 text-center text-[10px] sm:text-[11px] font-semibold border', tone(PHASES[p.phase].toneName).bg, tone(PHASES[p.phase].toneName).border, tone(PHASES[p.phase].toneName).text)}>
                {PHASES[p.phase].short}
              </span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 space-y-4">
          <ul className="flex flex-wrap gap-2">
            {totals.map((t) => (
              <li key={t.key}>
                <button
                  type="button"
                  onMouseEnter={() => setHoverType(t.key)}
                  onMouseLeave={() => setHoverType(null)}
                  onFocus={() => setHoverType(t.key)}
                  onBlur={() => setHoverType(null)}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs text-body hover:border-line-strong"
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} /> {ACTIVITY_TYPES[t.key].short}
                </button>
              </li>
            ))}
          </ul>
          <HorizontalBars data={totals.map((t) => ({ label: t.label, value: formatHours(t.value), percent: t.percent, color: t.color }))} max={100} />
        </div>
      </div>
    </GlassCard>
  );
}

/* ---------------------------------------------------------------------
   Entrada del diario
   --------------------------------------------------------------------- */

function SectionBody({ entry, sectionKey }) {
  if (sectionKey === 'activities') {
    return (
      <DataTable
        columns={ACTIVITY_COLUMNS}
        rows={entry.activities.map((a, i) => ({ ...a, id: `${entry.n}-${i}` }))}
        rowKey="id"
        minWidth={680}
        renderCard={(a) => (
          <div className="rounded-2xl border border-line bg-ivory p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink tabular-nums">
                <Clock size={13} className="text-plum" /> {a.time}
              </span>
              <Badge toneName={ACTIVITY_TYPES[a.type].toneName}>{formatHours(a.hours)}</Badge>
            </div>
            <p className="mt-2 text-sm text-body leading-relaxed">{a.text}</p>
          </div>
        )}
      />
    );
  }
  if (sectionKey === 'challenges') {
    return (
      <div className="space-y-3">
        {entry.challenges.map((c, i) => (
          <div key={c.challenge} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 md:gap-3 items-stretch">
            <div className="rounded-2xl border border-wine-line bg-wine-soft p-4">
              <span className="text-[10px] uppercase tracking-[0.18em] text-wine font-bold">Reto {i + 1}</span>
              <p className="text-sm text-ink leading-relaxed mt-1">{c.challenge}</p>
            </div>
            <div className="flex items-center justify-center text-line-strong" aria-hidden="true">
              <ArrowRight size={18} className="rotate-90 md:rotate-0" />
            </div>
            <div className="rounded-2xl border border-sage-line bg-sage-soft p-4">
              <span className="text-[10px] uppercase tracking-[0.18em] text-sage font-bold">Solución</span>
              <p className="text-sm text-ink leading-relaxed mt-1">{c.solution}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (sectionKey === 'learnings') {
    return (
      <ul className="space-y-2.5">
        {entry.learnings.map((l) => (
          <li key={l} className="flex gap-2.5 text-[15px] text-body leading-relaxed">
            <CircleCheck size={17} className="shrink-0 mt-0.5 text-sage" /> {l}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <figure className="relative rounded-2xl border border-sand-line bg-sand p-5 sm:p-6 pl-12 sm:pl-14">
      <Quote size={20} className="absolute left-4 sm:left-5 top-5 text-bronze" />
      <blockquote className="font-serif italic text-lg sm:text-xl leading-snug text-ink">{entry.reflection}</blockquote>
    </figure>
  );
}

function EntryViewer({ entry, onPrev, onNext }) {
  const [open, setOpen] = useState(() => new Set(['activities', 'reflection']));
  const allOpen = SECTIONS.every((s) => open.has(s.key));
  const phase = PHASES[entry.phase];
  const photos = photosOf(entry.n);
  const total = entry.activities.reduce((a, x) => a + x.hours, 0);
  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] bg-abyss text-on-plum p-6 sm:p-8 md:p-10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:justify-between">
          <div className="flex items-start gap-5">
            <span className="shrink-0 inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl border border-white/20 bg-plum-deep">
              <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#E5D5B5]">{entry.n}</span>
            </span>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#E5D5B5]">
                Jornada {entry.n} · {entry.date}
              </p>
              <h3 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-on-plum">{entry.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1 text-xs text-on-plum">
                  <Route size={13} /> {phase.label}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1 text-xs text-on-plum">
                  <UserRound size={13} /> Rol: {entry.role}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1 text-xs text-on-plum">
                  <Clock size={13} /> {PRACTICE_SUMMARY.horario} · {formatHours(total)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 lg:w-60 shrink-0">
            <DocLink src={jornadaDoc(entry.n)} label="Hoja de control" variant="onDark" icon={FileCheck2} block />
          </div>
        </div>
        {photos.length > 0 && (
          <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar">
            {photos.map((p) => (
              <a
                key={p.src}
                href={assetUrl(p.src)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border border-white/20 hover:border-[#E5D5B5] transition-colors"
                title={p.caption}
              >
                <img src={assetUrl(p.src)} alt={p.caption} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </a>
            ))}
            <span className="shrink-0 inline-flex items-center gap-1.5 px-2 text-xs text-on-plum-muted">
              <Camera size={14} /> {photos.length} fotografías
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={!onPrev}
            className="min-h-[42px] inline-flex items-center gap-1.5 rounded-2xl border border-lilac-line bg-white px-3.5 text-sm font-semibold text-plum hover:bg-lilac transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} /> Anterior
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!onNext}
            className="min-h-[42px] inline-flex items-center gap-1.5 rounded-2xl border border-lilac-line bg-white px-3.5 text-sm font-semibold text-plum hover:bg-lilac transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Siguiente <ChevronRight size={16} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(SECTIONS.map((s) => s.key)))}
          className="min-h-[42px] inline-flex items-center gap-2 rounded-2xl border border-lilac-line bg-white px-4 text-sm font-semibold text-plum hover:bg-lilac transition-colors"
        >
          {allOpen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          {allOpen ? 'Contraer todo' : 'Expandir todo'}
        </button>
      </div>

      <div className="space-y-3">
        {SECTIONS.map((s) => {
          const SIcon = s.icon;
          const isOpen = open.has(s.key);
          return (
            <div key={s.key} className={cx('rounded-3xl border bg-white overflow-hidden transition-all', isOpen ? 'border-line-strong shadow-paper-lg' : 'border-line shadow-paper')}>
              <button type="button" onClick={() => toggle(s.key)} aria-expanded={isOpen} className="w-full min-h-[64px] flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 text-left">
                <span className="font-serif text-2xl font-semibold text-bronze w-6">{s.code})</span>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lilac border border-lilac-line text-plum">
                  <SIcon size={18} />
                </span>
                <span className="flex-1 font-semibold text-ink">{s.label}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-plum">
                  <ChevronDown size={20} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-6">
                      <SectionBody entry={entry} sectionKey={s.key} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Diario_reflexivo_semanal() {
  const [active, setActive] = useState(1);
  const index = ENTRIES.findIndex((e) => e.n === active);
  const entry = ENTRIES[index];

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Bitácora"
        icon={NotebookPen}
        title="Diario reflexivo"
        highlight="semanal"
        description="Consolidado de las 7 jornadas de práctica a partir de las hojas de control semanal: actividades realizadas, retos y soluciones, aprendizajes y reflexión personal. Muestra cómo pasé de la observación diagnóstica a conducir la clase y acompañar el uso de recursos digitales."
      />

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {SECTIONS.map((s) => {
          const SIcon = s.icon;
          return (
            <motion.div key={s.key} variants={fadeUp} className="rounded-2xl border border-line bg-white shadow-paper p-3.5">
              <span className="font-serif text-xl font-semibold text-bronze">{s.code})</span>
              <p className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-ink leading-tight mt-1">
                <SIcon size={14} className="shrink-0 text-plum" /> {s.label}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <EvolutionChart active={active} onSelect={setActive} />

      <section className="space-y-6">
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1 lg:grid lg:grid-cols-7 lg:overflow-visible" role="tablist" aria-label="Jornadas">
          {ENTRIES.map((j) => {
            const isActive = j.n === active;
            const ph = tone(PHASES[j.phase].toneName);
            return (
              <button
                key={j.n}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(j.n)}
                className={cx(
                  'snap-start shrink-0 w-40 lg:w-auto rounded-2xl border p-3.5 text-left transition-all',
                  isActive ? 'border-plum bg-plum text-white shadow-paper-lg' : 'border-line bg-white shadow-paper hover:border-line-strong'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cx('font-serif text-2xl font-semibold leading-none', isActive ? 'text-[#E5D5B5]' : 'text-bronze')}>{j.n}</span>
                  <span className={cx('h-2.5 w-2.5 rounded-full', isActive ? 'bg-white' : ph.dot)} />
                </div>
                <p className={cx('mt-2 text-xs font-semibold leading-snug line-clamp-2', isActive ? 'text-white' : 'text-ink')}>{j.title}</p>
                <p className={cx('mt-1.5 flex items-center gap-1 text-[11px] tabular-nums', isActive ? 'text-on-plum-muted' : 'text-muted')}>
                  <CalendarDays size={11} /> {j.date}
                </p>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={entry.n} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <EntryViewer
              entry={entry}
              onPrev={index > 0 ? () => setActive(ENTRIES[index - 1].n) : null}
              onNext={index < ENTRIES.length - 1 ? () => setActive(ENTRIES[index + 1].n) : null}
            />
          </motion.div>
        </AnimatePresence>
      </section>

      <GlassCard hover={false} className="bg-ivory">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-white">
              <FileCheck2 size={22} />
            </span>
            <div>
              <p className="font-semibold text-ink">Documentos oficiales de seguimiento</p>
              <p className="text-sm text-muted mt-0.5">
                Firma de asistencia del practicante: {PRACTICE_SUMMARY.jornadas} jornadas, {PRACTICE_SUMMARY.horas} horas, del {PRACTICE_SUMMARY.inicio} al {PRACTICE_SUMMARY.fin}.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <DocLink src={DOCS.asistencia} label="Informe de asistencia" variant="primary" />
            <DocLink src={jornadaDoc(active)} label={`Hoja de control J${active}`} variant="secondary" />
          </div>
        </div>
      </GlassCard>
    </PageShell>
  );
}
