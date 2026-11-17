import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquareQuote,
  ClipboardCheck,
  FolderOpen,
  FileText,
  FlaskConical,
  Microscope,
  Home,
  RefreshCcw,
  ListChecks,
  Grid3x3,
  PencilLine,
  LogOut,
  CircleCheck,
  CircleDashed,
  ChevronDown,
  GraduationCap,
  UserRound,
  Users,
  Quote,
  ArrowRight,
  BadgeCheck,
  Gauge,
  Repeat,
  Stamp,
} from 'lucide-react';
import { PageShell, GlassCard, SectionHeader, CardTitle, Badge, TabBar, ProgressBar, DonutChart, ChartLegend, DataTable, PlumBand } from './ui/Primitives';
import { cx, tone, fadeUp, stagger } from './ui/tokens';
import DocLink from './shared/DocLink';
import { DOCS, PRACTICE_SUMMARY } from '../data/practica';

/* =====================================================================
   EVALUACIÓN Y RETROALIMENTACIÓN
   ===================================================================== */

const CLASSROOM = [
  { icon: Home, title: 'Actividades exaula', text: 'Tareas entre semana, normalmente las actividades al final de cada lección del módulo.' },
  { icon: FolderOpen, title: 'Portafolio del módulo', text: 'Recopilación del trabajo realizado en cada módulo.' },
  { icon: FileText, title: 'Exámenes escritos', text: 'Evaluaciones parciales del módulo.' },
  { icon: FlaskConical, title: 'Experimentos', text: 'Actividades prácticas relacionadas con los contenidos.' },
  { icon: Microscope, title: 'Prácticas de laboratorio', text: 'Trabajo en equipo con apoyo del docente.' },
];

const EXAM_PARTS = [
  { label: 'Selección múltiple', value: 30, color: '#4A2574', detail: 'Darwin y la selección natural, célula procariota y eucariota, cloroplasto, meiosis y ADN.' },
  { label: 'Verdadero o falso', value: 20, color: '#B08A4F', detail: 'Selección natural, células vegetales, fotosíntesis y meiosis.' },
  { label: 'Relación de columnas', value: 20, color: '#5E8C76', detail: 'Mitocondria, gen, cloroplasto y cromosoma.' },
  { label: 'Crucigrama', value: 30, color: '#B5657F', detail: 'Conceptos clave de evolución, célula y herencia.' },
];

const RUBRIC_LEVELS = ['Excelente', 'Muy bueno', 'Bueno', 'Necesita mejorar'];
const RUBRIC = [
  {
    id: 'r1',
    criterion: 'Dominio del tema',
    points: 25,
    levels: [
      'Demuestra amplio conocimiento y explica el contenido con seguridad.',
      'Conoce el tema y explica la mayoría de los contenidos correctamente.',
      'Demuestra conocimientos parciales y algunas dificultades para explicar.',
      'Demuestra poco conocimiento del tema.',
    ],
  },
  {
    id: 'r2',
    criterion: 'Organización y secuencia',
    points: 15,
    levels: [
      'Presenta las ideas de manera ordenada, clara y coherente.',
      'Mantiene un orden adecuado, con pequeñas dificultades de secuencia.',
      'Algunas ideas están desordenadas o poco relacionadas.',
      'La exposición no está organizada y no tiene una secuencia.',
    ],
  },
  {
    id: 'r3',
    criterion: 'Expresión oral y claridad',
    points: 25,
    levels: [
      'Explica con claridad y utiliza un lenguaje apropiado.',
      'Se expresa de manera comprensible, aunque presenta algunas pausas o dificultades.',
      'Tiene dificultades para expresarse.',
      'Su explicación es poco clara y difícil de comprender.',
    ],
  },
  {
    id: 'r4',
    criterion: 'Recursos de apoyo',
    points: 20,
    levels: [
      'Utiliza recursos visuales o materiales pertinentes, creativos y bien elaborados.',
      'Utiliza recursos adecuados que complementan la explicación.',
      'Los recursos son limitados o tienen poca relación con el contenido.',
      'No utiliza recursos o estos no contribuyen a la exposición.',
    ],
  },
  {
    id: 'r5',
    criterion: 'Manejo del tiempo y respuestas',
    points: 15,
    levels: [
      'Respeta el tiempo establecido y responde correctamente las preguntas.',
      'Respeta el tiempo y responde la mayoría de las preguntas.',
      'Presenta dificultades con el tiempo o responde parcialmente.',
      'No administra el tiempo y tiene dificultades para responder preguntas.',
    ],
  },
];

const RUBRIC_COLUMNS = [
  {
    key: 'criterion',
    label: 'Criterio',
    className: 'w-[16%]',
    render: (r) => (
      <span className="font-semibold text-ink">
        {r.criterion}
        <span className="block mt-1 text-xs font-bold text-bronze">{r.points} pts</span>
      </span>
    ),
  },
  ...RUBRIC_LEVELS.map((lvl, i) => ({ key: `l${i}`, label: lvl, className: 'w-[21%] text-xs', render: (r) => r.levels[i] })),
];

const INSTRUMENT_TABS = [
  { id: 'examen', label: 'Examen parcial · Módulo 4', shortLabel: 'Examen', icon: ClipboardCheck },
  { id: 'rubrica', label: 'Rúbrica de exposiciones', shortLabel: 'Rúbrica', icon: Grid3x3 },
  { id: 'cuestionario', label: 'Cuestionario · Unidad 5', shortLabel: 'Cuestionario', icon: PencilLine },
  { id: 'salida', label: 'Ejercicio de salida', shortLabel: 'Salida', icon: LogOut },
];

const COMPETENCIES = [
  {
    id: 'c1',
    title: 'Planificación didáctica',
    toneName: 'violet',
    items: [
      { done: true, text: 'Redacté indicadores de logro para cada sesión.', evidence: 'Planes U4 L1, U4 L3 y U5 L3' },
      { done: true, text: 'Organicé cada clase en momentos con tiempos definidos.', evidence: 'Inicio, desarrollo, aplicación y cierre' },
      { done: true, text: 'Incluí actividades no presenciales para el trabajo en casa.', evidence: 'Planes de sesión' },
      { done: true, text: 'Definí recursos y criterios de evaluación por momento.', evidence: 'Planes de sesión' },
    ],
  },
  {
    id: 'c2',
    title: 'Diagnóstico y conocimiento del grupo',
    toneName: 'amber',
    items: [
      { done: true, text: 'Apliqué la guía de observación sistemática.', evidence: '22/08/2026' },
      { done: true, text: 'Apliqué el cuestionario diagnóstico a 11 estudiantes.', evidence: 'N = 11' },
      { done: true, text: 'Entrevisté al docente tutor y al coordinador de la modalidad.', evidence: '12/09/2026' },
      { done: true, text: 'Elaboré la matriz FODA, las conclusiones y las recomendaciones.', evidence: 'Cronograma, actividades 14 a 16' },
    ],
  },
  {
    id: 'c3',
    title: 'Integración pedagógica de las TIC',
    toneName: 'emerald',
    items: [
      { done: true, text: 'Utilicé presentación digital y proyector para conducir la clase.', evidence: '24/10/2026' },
      { done: true, text: 'Asigné un producto digital con entrega en Google Classroom.', evidence: 'Afiche informativo' },
      { done: true, text: 'Diseñé un recurso digital exportable a PDF.', evidence: 'Guía de Micro aprendizajes' },
      { done: false, text: 'Implementar sesiones de refuerzo por Google Meet.', evidence: 'Recomendación del docente tutor' },
    ],
  },
  {
    id: 'c4',
    title: 'Evaluación del aprendizaje',
    toneName: 'rose',
    items: [
      { done: true, text: 'Preparé el examen parcial del módulo 4.', evidence: '26/09/2026' },
      { done: true, text: 'Utilicé una rúbrica con criterios ponderados para las exposiciones.', evidence: 'Rúbrica del módulo 4' },
      { done: true, text: 'Elaboré un cuestionario de la Unidad 5.', evidence: 'Octubre 2026' },
      { done: true, text: 'Planifiqué cierres con ejercicio de salida y preguntas de recapitulación.', evidence: 'Planes de sesión' },
    ],
  },
  {
    id: 'c5',
    title: 'Seguimiento y mejora continua',
    toneName: 'indigo',
    items: [
      { done: true, text: 'Registré las 7 jornadas en hojas de control firmadas.', evidence: `${PRACTICE_SUMMARY.horas} horas` },
      { done: true, text: 'Formulé una propuesta de mejora fundamentada en el diagnóstico.', evidence: '20/10/2026' },
      { done: false, text: 'Aplicar fichas de seguimiento y lista de cotejo de la propuesta.', evidence: 'Pendiente según la propuesta' },
      { done: false, text: 'Comparar los resultados con los objetivos propuestos.', evidence: 'Pendiente según la propuesta' },
    ],
  },
];

const scoreOf = (c) => Math.round((c.items.filter((i) => i.done).length / c.items.length) * 100);
const GLOBAL_SCORE = Math.round(COMPETENCIES.reduce((a, c) => a + scoreOf(c), 0) / COMPETENCIES.length);

/** Comentario literal del tutor UES (se muestra solo si se registra). */
const UES_COMMENT = '';

const STUDENTS_CLARITY = [
  { label: 'Muy claras', value: 45.5, color: '#4A2574' },
  { label: 'Claras', value: 45.5, color: '#9B7BC4' },
  { label: 'Poco claras', value: 9.1, color: '#C9B48A' },
];
const STUDENTS_AVAILABILITY = [
  { label: 'Siempre', value: 81.8, color: '#2F6B50' },
  { label: 'Casi siempre', value: 9.1, color: '#5E8C76' },
  { label: 'Algunas veces', value: 9.1, color: '#C9B48A' },
];

const FEEDBACK_LOOP = [
  { from: 'Docente tutor', said: 'Poco manejo de la tecnología', action: 'Jornadas de Alfabetización Digital Exprés en la tutoría sabatina' },
  { from: 'Docente tutor', said: 'La pereza a la lectura y la escritura', action: 'Cápsulas visuales con definiciones de tres líneas' },
  { from: 'Docente tutor', said: 'El aula invertida le ha funcionado bastante bien', action: 'Kits descargables enviados con anticipación' },
  { from: 'Docente tutor', said: 'Utilizar Meet para reforzar fuera de clase', action: 'Google Meet incluido como refuerzo propuesto' },
  { from: 'Coordinador', said: 'Formación en informática para los estudiantes', action: 'Rincón de alfabetización digital de la guía' },
];

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function InstrumentPanel({ id }) {
  if (id === 'examen') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5">
          <DonutChart data={EXAM_PARTS} centerValue="4" centerLabel="partes · 100%" size={200} thickness={28} />
        </div>
        <div className="md:col-span-7 space-y-3">
          {EXAM_PARTS.map((p, i) => (
            <div key={p.label} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-3.5">
              <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold text-white" style={{ background: p.color }}>
                {['I', 'II', 'III', 'IV'][i]}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">{p.label}</p>
                  <span className="text-sm font-bold text-bronze tabular-nums">{p.value}%</span>
                </div>
                <p className="text-xs text-muted mt-0.5 leading-snug">{p.detail}</p>
              </div>
            </div>
          ))}
          <DocLink src={DOCS.examenM4} label="Examen parcial (PDF)" variant="secondary" />
        </div>
      </div>
    );
  }
  if (id === 'rubrica') {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-body">
            Exposiciones del módulo 4 · cinco criterios ponderados que suman <strong className="text-ink">100%</strong>.
          </p>
          <DocLink src={DOCS.rubrica} label="Rúbrica (PDF)" variant="secondary" size="sm" />
        </div>
        <div className="flex h-3 w-full rounded-full overflow-hidden">
          {RUBRIC.map((r, i) => (
            <motion.span
              key={r.id}
              initial={{ width: 0 }}
              whileInView={{ width: `${r.points}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="h-full border-r-2 border-white last:border-r-0"
              style={{ background: ['#4A2574', '#B08A4F', '#5E8C76', '#B5657F', '#5A6BA8'][i] }}
              title={`${r.criterion}: ${r.points} pts`}
            />
          ))}
        </div>
        <DataTable
          columns={RUBRIC_COLUMNS}
          rows={RUBRIC}
          rowKey="id"
          minWidth={900}
          renderCard={(r) => (
            <div className="rounded-2xl border border-line bg-white p-4 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-ink text-sm">{r.criterion}</p>
                <Badge toneName="amber">{r.points} pts</Badge>
              </div>
              {r.levels.map((l, i) => (
                <p key={RUBRIC_LEVELS[i]} className="text-xs text-body leading-relaxed">
                  <span className="font-semibold text-plum">{RUBRIC_LEVELS[i]}: </span>
                  {l}
                </p>
              ))}
            </div>
          )}
        />
      </div>
    );
  }
  if (id === 'cuestionario') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 rounded-3xl border border-line bg-ivory p-5 text-center">
          <span className="font-serif text-6xl font-semibold text-plum leading-none">15</span>
          <p className="mt-2 text-sm font-semibold text-ink">ítems de completación</p>
          <p className="text-xs text-muted mt-1">Unidad 5 · Lección 1 · Primero "A"</p>
        </div>
        <div className="md:col-span-8 space-y-4">
          <p className="text-sm text-body leading-relaxed">
            El estudiante lee cada oración y completa el espacio en blanco con el término correspondiente. Los ítems recorren los conceptos básicos de ecología.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Ecología', 'Especie y población', 'Comunidad', 'Hábitat y nicho', 'Ramas de la ecología', 'Estudio de poblaciones', 'Crecimiento poblacional', 'Biomas y biogeografía'].map((t) => (
              <Badge key={t} toneName="emerald">
                {t}
              </Badge>
            ))}
          </div>
          <DocLink src={DOCS.cuestionarioCCNN} label="Cuestionario (PDF)" variant="secondary" />
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <p className="text-sm text-body leading-relaxed">
        En el cierre de la Unidad 4, Lección 1 planifiqué un ejercicio de salida con tres preguntas, revisadas en plenaria para corregir dudas.
      </p>
      <ol className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {['Una pregunta sobre selección natural.', 'Una pregunta sobre pruebas evolutivas.', 'Una pregunta sobre diferencias entre células.'].map((q, i) => (
          <li key={q} className="rounded-2xl border border-line bg-white p-4">
            <span className="font-serif text-3xl font-semibold text-bronze leading-none">{i + 1}</span>
            <p className="mt-2 text-sm text-body">{q}</p>
          </li>
        ))}
      </ol>
      <DocLink src={DOCS.planU4L1} label="Plan de sesión U4 L1 (PDF)" variant="secondary" />
    </div>
  );
}

function CompetencyRow({ c, index }) {
  const [open, setOpen] = useState(false);
  const score = scoreOf(c);
  const t = tone(c.toneName);
  return (
    <div className={cx('rounded-2xl border bg-white transition-all', open ? 'border-line-strong shadow-paper-lg' : 'border-line shadow-paper')}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="w-full p-4 sm:p-5 text-left">
        <div className="flex items-center gap-3">
          <span className={cx('shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl border font-serif text-lg font-semibold', t.bg, t.border, t.text)}>{index + 1}</span>
          <div className="flex-1 min-w-0">
            <ProgressBar label={c.title} value={score} toneName={c.toneName} delay={index * 0.1} />
          </div>
          <motion.span animate={{ rotate: open ? 180 : 0 }} className="shrink-0 text-plum">
            <ChevronDown size={18} />
          </motion.span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden px-4 sm:px-5 pb-4 space-y-2"
          >
            {c.items.map((it) => (
              <li key={it.text} className={cx('flex items-start gap-2.5 rounded-xl border px-3 py-2.5', it.done ? 'border-sage-line bg-sage-soft' : 'border-dashed border-line-strong bg-ivory')}>
                {it.done ? <CircleCheck size={16} className="shrink-0 mt-0.5 text-sage" /> : <CircleDashed size={16} className="shrink-0 mt-0.5 text-muted" />}
                <span className="flex-1 text-sm text-body leading-snug">{it.text}</span>
                <span className="shrink-0 text-[11px] text-muted text-right max-w-[40%]">{it.evidence}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function StackedPerception({ title, value, data }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <span className="font-serif text-2xl font-semibold text-plum leading-none">{value}</span>
      </div>
      <div className="mt-2 flex h-3 w-full rounded-full overflow-hidden bg-silk">
        {data.map((d, i) => (
          <motion.span
            key={d.label}
            initial={{ width: 0 }}
            whileInView={{ width: `${d.value}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.12 }}
            className="h-full border-r-2 border-white last:border-r-0"
            style={{ background: d.color }}
            title={`${d.label}: ${d.value}%`}
          />
        ))}
      </div>
      <ChartLegend className="mt-3" data={data.map((d) => ({ ...d, percent: d.value, value: Math.round((d.value / 100) * 11) }))} />
    </div>
  );
}

function FeedbackCard({ icon: Icon, toneName, name, role, quotes, validation, children }) {
  const t = tone(toneName);
  return (
    <GlassCard className="h-full flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className={cx('shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl border', t.bg, t.border, t.text)}>
          <Icon size={22} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-ink leading-snug">{name}</p>
          <p className="text-xs text-muted mt-0.5">{role}</p>
        </div>
      </div>
      {quotes?.map((q) => (
        <figure key={q.text} className="relative rounded-2xl border border-sand-line bg-sand p-4 pl-10">
          <Quote size={16} className="absolute left-3.5 top-4 text-bronze" />
          <blockquote className="font-serif italic text-[17px] leading-snug text-ink">“{q.text}”</blockquote>
          <figcaption className="mt-2 text-[11px] uppercase tracking-[0.14em] text-bronze">{q.source}</figcaption>
        </figure>
      ))}
      {children}
      {validation && (
        <p className="mt-auto flex items-start gap-2 rounded-xl border border-sage-line bg-sage-soft px-3 py-2.5 text-xs text-sage font-semibold">
          <BadgeCheck size={15} className="shrink-0" /> {validation}
        </p>
      )}
    </GlassCard>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Evaluacion_y_retroalimentacion() {
  const [instrument, setInstrument] = useState('examen');

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Evaluación"
        icon={MessageSquareQuote}
        title="Evaluación y"
        highlight="retroalimentación"
        description="Cómo se evalúa en el aula de la modalidad flexible, los instrumentos que preparé o utilicé, mi autoevaluación basada en evidencias y la retroalimentación recibida."
      />

      {/* Evaluación en el aula */}
      <section className="space-y-6">
        <CardTitle icon={ClipboardCheck} title="Evaluación en el aula" subtitle="Estrategias e instrumentos que utiliza el docente tutor" toneName="amber" />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {CLASSROOM.map((c) => {
            const CIcon = c.icon;
            return (
              <motion.div key={c.title} variants={fadeUp} className="rounded-2xl border border-line bg-white shadow-paper p-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lilac border border-lilac-line text-plum">
                  <CIcon size={18} />
                </span>
                <p className="mt-3 text-sm font-semibold text-ink">{c.title}</p>
                <p className="mt-1 text-xs text-muted leading-snug">{c.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 rounded-3xl border border-sand-line bg-sand p-5 sm:p-6">
          <span className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-sand-line text-bronze">
            <RefreshCcw size={22} />
          </span>
          <div>
            <p className="font-semibold text-ink">Autoevaluación y preguntas al final de cada clase</p>
            <p className="mt-1 text-sm text-body leading-relaxed">
              Según el docente tutor, al finalizar la clase se realiza una autoevaluación de lo aprendido y una ronda de preguntas y respuestas, que le permite identificar a
              quienes necesitan apoyo adicional.
            </p>
          </div>
        </div>
      </section>

      {/* Instrumentos */}
      <section className="space-y-5">
        <CardTitle icon={ListChecks} title="Instrumentos de evaluación de la práctica" subtitle="Preparados o utilizados durante las jornadas" />
        <TabBar tabs={INSTRUMENT_TABS} active={instrument} onChange={setInstrument} layoutId="evaluacion-instrumentos" />
        <AnimatePresence mode="wait">
          <motion.div key={instrument} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <GlassCard hover={false}>
              <InstrumentPanel id={instrument} />
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Autoevaluación */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
          <PlumBand className="!p-6 sm:!p-8">
            <Gauge size={22} className="text-[#E5D5B5]" />
            <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[#E5D5B5] font-semibold">Panel de autoevaluación docente</p>
            <p className="mt-2 font-serif text-6xl font-semibold text-on-plum leading-none">{GLOBAL_SCORE}%</p>
            <p className="mt-3 text-sm text-on-plum-muted leading-relaxed">
              Cada barra indica la proporción de indicadores que puedo respaldar con una evidencia documentada en este portafolio. Los indicadores pendientes señalan mis
              áreas de mejora.
            </p>
          </PlumBand>
          <div className="flex flex-wrap gap-2">
            <Badge toneName="emerald" icon={CircleCheck}>
              Evidenciado
            </Badge>
            <Badge toneName="slate" icon={CircleDashed}>
              Pendiente
            </Badge>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-3">
          {COMPETENCIES.map((c, i) => (
            <CompetencyRow key={c.id} c={c} index={i} />
          ))}
        </div>
      </section>

      {/* Retroalimentación */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Retroalimentación"
          icon={MessageSquareQuote}
          title="Voces que orientaron"
          highlight="mi práctica"
          description="Orientaciones del docente tutor y del coordinador recogidas en las entrevistas del 12/09/2026, acompañamiento de la tutoría UES y percepción del estudiantado."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <FeedbackCard
            icon={UserRound}
            toneName="violet"
            name="Lcdo. Amilcar Heriberto Sánchez"
            role="Docente tutor institucional"
            quotes={[
              { text: 'Trabajar el aula invertida en esta modalidad me ha funcionado bastante bien, el incluir proyectos que involucren a la tecnología.', source: 'Entrevista · 12/09/2026' },
              { text: 'Que se utilice meet, para reforzar en horarios que no están en clase.', source: 'Entrevista · 12/09/2026' },
            ]}
            validation={`Firmó las ${PRACTICE_SUMMARY.jornadas} hojas de control semanal`}
          />
          <FeedbackCard
            icon={GraduationCap}
            toneName="amber"
            name="Ing. Misael Enrique Juárez Blanco"
            role="Docente tutor y coordinador UES · DDP1109 · GT-01"
            quotes={UES_COMMENT ? [{ text: UES_COMMENT, source: 'Tutoría UES' }] : null}
            validation="Tutoría académica de la Práctica Docente"
          >
            {!UES_COMMENT && (
              <div className="rounded-2xl border border-line bg-ivory p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold mb-2">Entregables presentados a la tutoría</p>
                <ul className="space-y-1.5 text-sm text-body">
                  <li className="flex gap-2">
                    <CircleCheck size={15} className="shrink-0 mt-0.5 text-sage" /> Informe diagnóstico (20/09/2026)
                  </li>
                  <li className="flex gap-2">
                    <CircleCheck size={15} className="shrink-0 mt-0.5 text-sage" /> Propuesta de mejora (20/10/2026)
                  </li>
                  <li className="flex gap-2">
                    <CircleCheck size={15} className="shrink-0 mt-0.5 text-sage" /> {PRACTICE_SUMMARY.jornadas} hojas de control semanal
                  </li>
                  <li className="flex gap-2">
                    <CircleCheck size={15} className="shrink-0 mt-0.5 text-sage" /> Firma de asistencia del practicante
                  </li>
                </ul>
              </div>
            )}
          </FeedbackCard>
          <FeedbackCard
            icon={Stamp}
            toneName="emerald"
            name="Lcdo. Gerardo Escobar Mejía"
            role="Coordinador de Modalidad Flexible"
            quotes={[
              {
                text: 'Que se incluya un espacio donde se brinde formación en el área de informática a los estudiantes, ya que a muchos se les dificulta utilizar una computadora.',
                source: 'Entrevista · 12/09/2026',
              },
            ]}
            validation="Firma y sello del consolidado de asistencia"
          />
          <FeedbackCard icon={Users} toneName="indigo" name="Percepción del estudiantado" role="Cuestionario diagnóstico · N = 11">
            <div className="space-y-5">
              <StackedPerception title="Instrucciones claras" value="90.9%" data={STUDENTS_CLARITY} />
              <StackedPerception title="Disponibilidad del docente" value="90.9%" data={STUDENTS_AVAILABILITY} />
            </div>
          </FeedbackCard>
        </div>
      </section>

      {/* Ciclo de retroalimentación */}
      <section className="space-y-5">
        <CardTitle icon={Repeat} title="De la retroalimentación a la acción" subtitle="Cómo incorporé cada orientación en la propuesta de mejora" toneName="emerald" />
        <motion.ul initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="space-y-2.5">
          {FEEDBACK_LOOP.map((f) => (
            <motion.li key={f.said} variants={fadeUp} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 md:gap-4 items-stretch">
              <div className="rounded-2xl border border-line bg-white shadow-paper p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-bronze font-bold">{f.from}</p>
                <p className="mt-1 text-sm text-ink">{f.said}</p>
              </div>
              <div className="flex items-center justify-center text-line-strong" aria-hidden="true">
                <ArrowRight size={18} className="rotate-90 md:rotate-0" />
              </div>
              <div className="rounded-2xl border border-sage-line bg-sage-soft p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-sage font-bold">Acción</p>
                <p className="mt-1 text-sm text-ink">{f.action}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </PageShell>
  );
}
