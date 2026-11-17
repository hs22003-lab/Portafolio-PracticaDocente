import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  NotebookPen,
  Hand,
  Flame,
  Laptop,
  HeartHandshake,
  MonitorSmartphone,
  Lightbulb,
  ClipboardList,
  CalendarDays,
  GraduationCap,
  FlaskConical,
  Wifi,
  Signal,
  Clock,
  CalendarClock,
  ChartPie,
  ChartBar,
  ChartColumn,
  Table2,
  Sparkles,
  Info,
  MessageSquareText,
  Layers,
} from 'lucide-react';
import {
  GlassCard,
  SectionHeader,
  Badge,
  SearchInput,
  TabBar,
  StatCard,
  DonutChart,
  ChartLegend,
  HorizontalBars,
  VerticalBars,
  EmptyState,
  Divider,
} from '../ui/Primitives';
import { cx, normalize, fadeUp, stagger, CHART_COLORS } from '../ui/tokens';
import { SURVEY_QUESTIONS as QUESTIONS } from '../../data/diagnostico';

/* =====================================================================
   ENCUESTA A ESTUDIANTES (Instrumento 5.6.2 · Google Forms)
   N = 11 estudiantes de Primer Año de Bachillerato · 12/09/2026
   ===================================================================== */

const N = 11;

const SECTIONS = [
  { id: 1, label: 'Datos generales', shortLabel: 'Datos', icon: Users },
  { id: 2, label: 'Hábitos de estudio', shortLabel: 'Hábitos', icon: NotebookPen },
  { id: 3, label: 'Participación y aprendizaje', shortLabel: 'Participación', icon: Hand },
  { id: 4, label: 'Motivación', shortLabel: 'Motivación', icon: Flame },
  { id: 5, label: 'Acceso a la tecnología', shortLabel: 'Tecnología', icon: Laptop },
  { id: 6, label: 'Apoyo docente', shortLabel: 'Docente', icon: HeartHandshake },
  { id: 7, label: 'Uso de herramientas digitales', shortLabel: 'Herramientas', icon: MonitorSmartphone },
  { id: 8, label: 'Necesidades o sugerencias', shortLabel: 'Sugerencias', icon: Lightbulb },
];


const OPEN_QUESTION = {
  id: 13,
  section: 8,
  dimension: 'Necesidades o mejoras',
  title: 'Necesidades o sugerencias del estudiantado para mejorar su proceso de aprendizaje',
  findings: [
    {
      icon: Clock,
      title: 'Horario de la jornada',
      text: 'Solicitudes relacionadas con el horario de la jornada sabatina, en particular la posibilidad de salir más temprano.',
      color: CHART_COLORS[0],
    },
    {
      icon: ClipboardList,
      title: 'Dosificación de tareas',
      text: 'Dosificar o disminuir la cantidad de tareas, debido a la jornada laboral que cumplen durante la semana.',
      color: CHART_COLORS[1],
    },
    {
      icon: FlaskConical,
      title: 'Materiales comprensibles',
      text: 'Contar con materiales más fáciles de comprender, con demostraciones reales y ejemplos prácticos.',
      color: CHART_COLORS[3],
    },
    {
      icon: CalendarClock,
      title: 'Fechas de entrega realistas',
      text: 'Considerar el tiempo disponible del estudiantado al fijar las fechas de entrega de las actividades.',
      color: CHART_COLORS[2],
    },
  ],
  interpretation:
    'Las respuestas abiertas coinciden en que el tiempo es el recurso más escaso del grupo: la carga laboral y familiar condiciona la entrega de tareas, por lo que las sugerencias apuntan a una planificación realista, materiales prácticos y demostrativos, y fechas de entrega flexibles.',
};

const KPIS = [
  { label: 'Motivación', value: '90.9%', hint: 'Motivado o bastante motivado (P7)', icon: Flame, toneName: 'amber' },
  { label: 'Autonomía', value: '81.9%', hint: 'Estudia siempre o casi siempre por su cuenta (P4)', icon: NotebookPen, toneName: 'violet' },
  { label: 'Uso de EVA', value: '90.9%', hint: 'Recurre a Classroom o Moodle (P12)', icon: MonitorSmartphone, toneName: 'indigo' },
  { label: 'Apoyo docente', value: '90.9%', hint: 'Profesor disponible siempre o casi siempre (P11)', icon: HeartHandshake, toneName: 'emerald' },
  { label: 'Internet en casa', value: '72.7%', hint: 'Cuenta con conexión estable en el hogar (P3)', icon: Wifi, toneName: 'violet' },
  { label: 'Red limitada', value: '45.5%', hint: 'Conexión limitada o insuficiente al subir tareas (P9)', icon: Signal, toneName: 'rose' },
];

const FICHA = [
  { label: 'Instrumento', value: 'Cuestionario en línea (Google Forms)', icon: ClipboardList },
  { label: 'Población', value: 'Estudiantes de 1.° Año de Bachillerato', icon: GraduationCap },
  { label: 'Participantes', value: 'N = 11 estudiantes encuestados', icon: Users },
  { label: 'Fecha de aplicación', value: '12/09/2026', icon: CalendarDays },
  { label: 'Estructura', value: '8 secciones · 13 preguntas (12 cerradas y 1 abierta)', icon: Layers },
  { label: 'Asignatura', value: 'Ciencias Naturales y Tecnología', icon: FlaskConical },
];

const CHART_MODES = {
  donut: { label: 'Dona', icon: ChartPie },
  hbar: { label: 'Barras', icon: ChartBar },
  vbar: { label: 'Columnas', icon: ChartColumn },
};

const sectionOf = (id) => SECTIONS.find((s) => s.id === id);
const withColors = (options) => options.map((o, i) => ({ ...o, color: CHART_COLORS[i % CHART_COLORS.length] }));
const fmt = (n) => (Number.isInteger(n) ? `${n}` : n.toFixed(1));

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function ChartModeToggle({ modes, value, onChange }) {
  return (
    <div className="inline-flex rounded-2xl border border-line bg-ivory p-1" role="radiogroup" aria-label="Tipo de gráfico">
      {modes.map((m) => {
        const Icon = CHART_MODES[m].icon;
        const active = value === m;
        return (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(m)}
            className={cx(
              'relative inline-flex min-h-[36px] items-center gap-1.5 rounded-xl px-3 text-xs font-medium transition-colors',
              active ? 'text-plum' : 'text-muted hover:text-plum'
            )}
          >
            {active && <span className="absolute inset-0 rounded-xl bg-white border border-line shadow-sm" />}
            <Icon size={14} className="relative" />
            <span className="relative">{CHART_MODES[m].label}</span>
          </button>
        );
      })}
    </div>
  );
}

function QuestionChart({ question, mode }) {
  const data = withColors(question.options);
  const barData = data.map((o) => ({ label: o.label, value: o.f, percent: o.p, color: o.color }));

  if (mode === 'donut') {
    return (
      <div className="flex flex-col items-center gap-6">
        <DonutChart
          data={data.map((o) => ({ label: o.label, value: o.f, color: o.color }))}
          centerValue={question.highlight.value.includes('/') ? `N = ${N}` : question.highlight.value}
          centerLabel={question.highlight.value.includes('/') ? 'estudiantes' : question.highlight.label}
          className="max-w-[210px]"
        />
        <ChartLegend data={data.map((o) => ({ label: o.label, value: o.f, percent: o.p, color: o.color }))} className="w-full" />
      </div>
    );
  }
  if (mode === 'vbar') {
    return <VerticalBars data={barData} height={210} />;
  }
  return <HorizontalBars data={barData} max={100} />;
}

function FrequencyTable({ question }) {
  const data = withColors(question.options);
  const totalF = data.reduce((acc, o) => acc + o.f, 0);
  const isMultiple = question.type === 'multiple';

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted font-semibold">
        <Table2 size={14} className="text-bronze" />
        {question.table} · Frecuencia y porcentaje
      </div>

      {/* Móvil: tarjetas */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {data.map((o) => (
          <div key={o.label} className="rounded-2xl border border-line bg-ivory p-4">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-3 w-3 shrink-0 rounded-[4px]" style={{ background: o.color }} />
              <p className="flex-1 text-sm text-body leading-snug">{o.label}</p>
            </div>
            <div className="mt-3 flex items-end justify-between gap-3">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-muted">Frecuencia</span>
                <span className="font-serif text-2xl font-semibold text-ink tabular-nums">{o.f}</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-muted">Porcentaje</span>
                <span className="font-serif text-2xl font-semibold text-bronze tabular-nums">{fmt(o.p)}%</span>
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-white overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${o.p}%`, background: o.color }} />
            </div>
          </div>
        ))}
        <div className="rounded-2xl border border-sand-line bg-sand p-4 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-plum">{isMultiple ? 'Total de selecciones' : 'Total'}</span>
          <span className="text-sm tabular-nums text-plum">
            {totalF} {isMultiple ? `· sobre N = ${N}` : '· 100%'}
          </span>
        </div>
      </div>

      {/* Escritorio: tabla editorial */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-silk text-left text-[11px] uppercase tracking-[0.18em] text-muted">
              <th className="px-4 py-3 font-semibold">Opción de respuesta</th>
              <th className="px-4 py-3 font-semibold text-right w-28">Frecuencia</th>
              <th className="px-4 py-3 font-semibold text-right w-28">Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            {data.map((o) => (
              <tr key={o.label} className="border-t border-line hover:bg-ivory transition-colors">
                <td className="px-4 py-3 text-body">
                  <span className="inline-flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: o.color }} />
                    {o.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-ink font-semibold">{o.f}</td>
                <td className="px-4 py-3 text-right tabular-nums text-bronze">{fmt(o.p)}%</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-sand-line bg-sand">
              <td className="px-4 py-3 font-semibold text-plum">{isMultiple ? 'Total de selecciones' : 'Total'}</td>
              <td className="px-4 py-3 text-right tabular-nums font-semibold text-plum">{totalF}</td>
              <td className="px-4 py-3 text-right tabular-nums text-plum">{isMultiple ? `N = ${N}` : '100%'}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {isMultiple && (
        <p className="text-xs text-muted leading-relaxed">
          Pregunta de selección múltiple: cada porcentaje se calcula sobre el total de estudiantes (N = {N}), por lo que la suma supera el 100%.
        </p>
      )}
    </div>
  );
}

function QuestionCard({ question }) {
  const modes = question.type === 'multiple' ? ['hbar', 'vbar'] : ['donut', 'hbar', 'vbar'];
  const [mode, setMode] = useState(question.chart);
  const section = sectionOf(question.section);
  const SectionIcon = section.icon;

  return (
    <motion.article variants={fadeUp} layout>
      <GlassCard padded={false} hover={false} className="overflow-hidden hover:border-line-strong transition-colors">
        <div className="relative px-5 sm:px-7 pt-6 sm:pt-7 pb-5 border-b border-line bg-ivory">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5">
            <span className="shrink-0 font-serif text-4xl sm:text-5xl font-semibold leading-none text-bronze tabular-nums">
              {String(question.id).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge toneName="amber" icon={SectionIcon}>
                  Sección {section.id} · {section.shortLabel}
                </Badge>
                <Badge toneName="violet">{question.dimension}</Badge>
                <Badge toneName="slate">{question.table}</Badge>
                {question.type === 'multiple' && <Badge toneName="indigo">Selección múltiple</Badge>}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl md:text-[1.7rem] font-semibold leading-snug text-ink">{question.title}</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-5 sm:p-7">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold">Visualización</span>
              <ChartModeToggle modes={modes} value={mode} onChange={setMode} />
            </div>
            <div className="rounded-3xl border border-line bg-ivory p-4 sm:p-5 min-h-[240px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                >
                  <QuestionChart question={question} mode={mode} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-sand-line bg-sand px-4 py-3.5">
              <span className="font-serif text-3xl font-semibold text-plum leading-none tabular-nums">{question.highlight.value}</span>
              <span className="text-sm text-body leading-snug">{question.highlight.label}</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <FrequencyTable question={question} />
            {question.note && (
              <p className="flex gap-2.5 rounded-2xl border border-line bg-white px-4 py-3 text-xs sm:text-sm text-muted leading-relaxed">
                <Info size={16} className="shrink-0 mt-0.5 text-plum" />
                {question.note}
              </p>
            )}
            <div className="relative rounded-3xl border border-line bg-silk p-5 sm:p-6 overflow-hidden">
              <div className="relative flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold mb-3">
                <Sparkles size={14} /> Interpretación pedagógica
              </div>
              <p className="relative text-sm sm:text-[15px] leading-relaxed text-body">{question.interpretation}</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
}

function OpenQuestionCard() {
  const [active, setActive] = useState(null);
  return (
    <motion.article variants={fadeUp} layout>
      <GlassCard padded={false} hover={false} className="overflow-hidden">
        <div className="px-5 sm:px-7 pt-6 sm:pt-7 pb-5 border-b border-line bg-sand/60">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5">
            <span className="shrink-0 font-serif text-4xl sm:text-5xl font-semibold leading-none text-plum">13</span>
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge toneName="amber" icon={Lightbulb}>
                  Sección 8 · Sugerencias
                </Badge>
                <Badge toneName="violet">{OPEN_QUESTION.dimension}</Badge>
                <Badge toneName="emerald" icon={MessageSquareText}>
                  Pregunta abierta
                </Badge>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl md:text-[1.7rem] font-semibold leading-snug text-ink">{OPEN_QUESTION.title}</h3>
            </div>
          </div>
        </div>
        <div className="p-5 sm:p-7 space-y-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold">Hallazgos cualitativos · categorías emergentes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {OPEN_QUESTION.findings.map((f, i) => {
              const Icon = f.icon;
              const isActive = active === i;
              return (
                <button
                  key={f.title}
                  type="button"
                  onClick={() => setActive(isActive ? null : i)}
                  aria-pressed={isActive}
                  className={cx(
                    'group text-left rounded-3xl border p-5 transition-all duration-300',
                    isActive ? 'border-plum bg-lilac -translate-y-1' : 'border-line bg-ivory hover:border-line-strong'
                  )}
                >
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line"
                    style={{ background: `${f.color}1F`, color: f.color }}
                  >
                    <Icon size={20} />
                  </span>
                  <h4 className="mt-4 font-semibold text-ink">{f.title}</h4>
                  <p className={cx('mt-2 text-sm leading-relaxed transition-colors', isActive ? 'text-body' : 'text-body')}>{f.text}</p>
                </button>
              );
            })}
          </div>
          <div className="rounded-3xl border border-line bg-silk p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold mb-3">
              <Sparkles size={14} /> Lectura cualitativa
            </div>
            <p className="text-sm sm:text-[15px] leading-relaxed text-body">{OPEN_QUESTION.interpretation}</p>
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Encuesta() {
  const [section, setSection] = useState('all');
  const [query, setQuery] = useState('');

  const tabs = useMemo(
    () => [
      { id: 'all', label: 'Todas las secciones', shortLabel: 'Todas', icon: Layers, count: QUESTIONS.length + 1 },
      ...SECTIONS.map((s) => ({
        id: s.id,
        label: s.label,
        shortLabel: s.shortLabel,
        icon: s.icon,
        count: s.id === 8 ? 1 : QUESTIONS.filter((q) => q.section === s.id).length,
      })),
    ],
    []
  );

  const q = normalize(query.trim());

  const filtered = useMemo(
    () =>
      QUESTIONS.filter((item) => {
        if (section !== 'all' && item.section !== section) return false;
        if (!q) return true;
        const haystack = normalize(
          [item.title, item.dimension, item.interpretation, sectionOf(item.section).label, ...item.options.map((o) => o.label)].join(' ')
        );
        return haystack.includes(q);
      }),
    [section, q]
  );

  const showOpen =
    (section === 'all' || section === 8) &&
    (!q ||
      normalize([OPEN_QUESTION.title, OPEN_QUESTION.interpretation, ...OPEN_QUESTION.findings.map((f) => `${f.title} ${f.text}`)].join(' ')).includes(q));

  const total = filtered.length + (showOpen ? 1 : 0);

  return (
    <div className="space-y-10 sm:space-y-14">
      <SectionHeader
        eyebrow="Instrumento 5.6.2 · Google Forms"
        icon={ClipboardList}
        title="Encuesta a"
        highlight="estudiantes"
        description="Panel analítico del cuestionario aplicado a los estudiantes de Primer Año de Bachillerato. Cada pregunta incluye su gráfico interactivo, la tabla de frecuencias y la interpretación pedagógica que alimenta la triangulación del diagnóstico."
      />

      {/* Ficha técnica */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {FICHA.map((f) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.label}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl border border-line bg-ivory px-4 py-3.5"
            >
              <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sand border border-sand-line text-bronze">
                <Icon size={16} />
              </span>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted font-semibold">{f.label}</span>
                <span className="block text-sm text-body leading-snug mt-0.5">{f.value}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Indicadores clave */}
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {KPIS.map((k) => (
          <StatCard key={k.label} {...k} />
        ))}
      </div>

      <Divider />

      {/* Filtros */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">Resultados por pregunta</h3>
            <p className="text-sm text-muted mt-1">
              Mostrando <span className="text-bronze font-semibold tabular-nums">{total}</span> de 13 preguntas
            </p>
          </div>
          <SearchInput value={query} onChange={setQuery} placeholder="Buscar pregunta, opción o hallazgo..." className="lg:max-w-sm" />
        </div>
        <TabBar tabs={tabs} active={section} onChange={setSection} layoutId="encuesta-secciones" size="sm" />
      </div>

      {/* Resultados */}
      {total === 0 ? (
        <EmptyState title="No se encontraron preguntas" description="Prueba con otra palabra clave o selecciona otra sección del cuestionario." />
      ) : (
        <motion.div key={`${section}-${q}`} initial="hidden" animate="show" variants={stagger} className="space-y-6 sm:space-y-8">
          {filtered.map((item) => (
            <QuestionCard key={item.id} question={item} />
          ))}
          {showOpen && <OpenQuestionCard />}
        </motion.div>
      )}
    </div>
  );
}
