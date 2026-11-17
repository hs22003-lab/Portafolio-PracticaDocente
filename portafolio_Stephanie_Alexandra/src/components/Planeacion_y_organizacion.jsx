import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarRange,
  Table2,
  GanttChart,
  ListChecks,
  Hourglass,
  Flag,
  CalendarDays,
  PencilRuler,
  Presentation,
  NotebookPen,
  CircleCheck,
  Clock,
  Layers,
  ArrowRight,
  CalendarCheck,
  Milestone,
} from 'lucide-react';
import {
  PageShell,
  GlassCard,
  SectionHeader,
  CardTitle,
  Badge,
  SearchInput,
  FilterChips,
  SegmentedControl,
  StatCard,
  EmptyState,
  DataTable,
  Tooltip,
  ProgressBar,
} from './ui/Primitives';
import { cx, normalize, fadeUp, stagger } from './ui/tokens';
import { CRONOGRAMA, CRONOGRAMA_STAGES, formatDate } from '../data/diagnostico';
import { JORNADAS, PRACTICE_SUMMARY } from '../data/practica';

/* =====================================================================
   PLANEACIÓN Y ORGANIZACIÓN · Cronograma (tabla / Gantt) y plan semanal
   ===================================================================== */

const STAGE_STYLE = {
  antes: { toneName: 'violet', bar: 'bg-plum', soft: 'bg-lilac', text: 'text-plum' },
  durante: { toneName: 'amber', bar: 'bg-bronze', soft: 'bg-sand', text: 'text-bronze-dark' },
  despues: { toneName: 'emerald', bar: 'bg-sage', soft: 'bg-sage-soft', text: 'text-sage' },
};

const DAY_MS = 86400000;
const toUTC = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
};
const RANGE_START = toUTC(CRONOGRAMA[0].start);
const RANGE_END = Math.max(...CRONOGRAMA.map((a) => toUTC(a.end)));
const TOTAL_DAYS = Math.round((RANGE_END - RANGE_START) / DAY_MS) + 1;
const DAYS = Array.from({ length: TOTAL_DAYS }, (_, i) => {
  const date = new Date(RANGE_START + i * DAY_MS);
  return { i, day: date.getUTCDate(), month: date.getUTCMonth(), weekday: date.getUTCDay() };
});
const WEEKDAY_INITIAL = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const MONTH_SPANS = DAYS.reduce((acc, d) => {
  const last = acc[acc.length - 1];
  if (last && last.month === d.month) last.count += 1;
  else acc.push({ month: d.month, count: 1 });
  return acc;
}, []);
const DAY_W = 30;

const MILESTONES = [
  { id: 7, label: 'Visita y observación' },
  { id: 8, label: 'Aplicación de instrumentos' },
  { id: 18, label: 'Entrega del informe' },
];

const STAGE_DAYS = Object.keys(CRONOGRAMA_STAGES).map((k) => ({
  id: k,
  ...CRONOGRAMA_STAGES[k],
  count: CRONOGRAMA.filter((a) => a.stage === k).length,
  days: CRONOGRAMA.filter((a) => a.stage === k).reduce((acc, a) => acc + a.days, 0),
}));

const WEEK_PLAN = [
  {
    id: 'lv',
    days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    short: ['L', 'M', 'M', 'J', 'V'],
    title: 'Diseño de materiales',
    icon: PencilRuler,
    toneName: 'violet',
    time: 'Trabajo autónomo',
    tasks: [
      'Diseño de los materiales didácticos para la siguiente tutoría.',
      'Elaboración de los planes de sesión con indicadores de logro, momentos y criterios de evaluación.',
      'Preparación de presentaciones, guías y recursos visuales.',
    ],
  },
  {
    id: 'sab',
    days: ['Sábado'],
    short: ['S'],
    title: 'Tutoría presencial',
    icon: Presentation,
    toneName: 'amber',
    time: '7:00 a.m. – 12:00 m.d.',
    tasks: [
      'Preparación del equipo, materiales y recursos antes de iniciar.',
      'Apoyo al docente tutor o conducción de la clase.',
      'Acompañamiento a los estudiantes en las actividades.',
      'Firma del consolidado de asistencia con el coordinador y el docente.',
    ],
  },
  {
    id: 'dom',
    days: ['Domingo'],
    short: ['D'],
    title: 'Reflexión',
    icon: NotebookPen,
    toneName: 'emerald',
    time: 'Cierre semanal',
    tasks: ['Registro de la jornada en el diario reflexivo.', 'Análisis de retos, soluciones y aprendizajes.', 'Ajustes para la planificación de la semana siguiente.'],
  },
];

const TABLE_COLUMNS = [
  { key: 'id', label: 'N.°', className: 'w-14', render: (r) => <span className="font-serif text-lg font-semibold text-bronze">{String(r.id).padStart(2, '0')}</span> },
  { key: 'name', label: 'Actividad', render: (r) => <span className="font-medium text-ink">{r.name}</span> },
  {
    key: 'stage',
    label: 'Etapa',
    className: 'w-28',
    render: (r) => <Badge toneName={STAGE_STYLE[r.stage].toneName}>{CRONOGRAMA_STAGES[r.stage].label}</Badge>,
  },
  { key: 'start', label: 'Inicio', className: 'w-28 tabular-nums', render: (r) => formatDate(r.start) },
  { key: 'end', label: 'Fin', className: 'w-28 tabular-nums', render: (r) => formatDate(r.end) },
  {
    key: 'days',
    label: 'Duración',
    className: 'w-24',
    render: (r) => (
      <span className="tabular-nums font-semibold text-ink">
        {r.days} {r.days === 1 ? 'día' : 'días'}
      </span>
    ),
  },
  {
    key: 'deps',
    label: 'Precedida por',
    className: 'w-32',
    render: (r) => (r.deps.length ? <span className="text-muted tabular-nums">{r.deps.map((d) => `#${d}`).join(', ')}</span> : <span className="text-muted">Inicio</span>),
  },
];

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function ActivityCard({ a }) {
  const s = STAGE_STYLE[a.stage];
  return (
    <div className="relative rounded-2xl border border-line bg-white shadow-paper p-4 pl-5 overflow-hidden">
      <span className={cx('absolute left-0 inset-y-0 w-1.5', s.bar)} />
      <div className="flex items-start justify-between gap-3">
        <span className="font-serif text-2xl font-semibold text-bronze leading-none">{String(a.id).padStart(2, '0')}</span>
        <Badge toneName={s.toneName}>{CRONOGRAMA_STAGES[a.stage].label}</Badge>
      </div>
      <p className="mt-2 text-sm font-semibold text-ink leading-snug">{a.name}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted tabular-nums">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={13} /> {a.start === a.end ? formatDate(a.start) : `${formatDate(a.start)} – ${formatDate(a.end)}`}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Hourglass size={13} /> {a.days} {a.days === 1 ? 'día' : 'días'}
        </span>
      </div>
    </div>
  );
}

function GanttView({ rows }) {
  const width = TOTAL_DAYS * DAY_W;
  return (
    <div className="rounded-3xl border border-line bg-white shadow-paper overflow-hidden">
      <div className="overflow-x-auto">
        <div className="grid" style={{ gridTemplateColumns: `minmax(190px, 240px) ${width}px` }}>
          {/* Cabecera: meses */}
          <div className="sticky left-0 z-20 bg-silk border-b border-r border-line px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-muted font-semibold flex items-end">
            Actividad
          </div>
          <div className="bg-silk border-b border-line">
            <div className="flex">
              {MONTH_SPANS.map((m) => (
                <div
                  key={m.month}
                  className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-plum border-r border-line last:border-r-0"
                  style={{ width: m.count * DAY_W }}
                >
                  {MONTH_NAMES[m.month]} 2026
                </div>
              ))}
            </div>
            <div className="flex border-t border-line">
              {DAYS.map((d) => (
                <div
                  key={d.i}
                  className={cx('flex flex-col items-center justify-center py-1 text-[10px] leading-tight tabular-nums', d.weekday === 6 ? 'bg-sand text-bronze-dark font-bold' : 'text-muted')}
                  style={{ width: DAY_W }}
                >
                  <span>{WEEKDAY_INITIAL[d.weekday]}</span>
                  <span className="text-[11px]">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filas */}
          {rows.map((a) => {
            const s = STAGE_STYLE[a.stage];
            const offset = Math.round((toUTC(a.start) - RANGE_START) / DAY_MS);
            const span = Math.round((toUTC(a.end) - toUTC(a.start)) / DAY_MS) + 1;
            const milestone = MILESTONES.find((m) => m.id === a.id);
            return (
              <div key={a.id} className="contents group">
                <div className="sticky left-0 z-10 bg-white group-hover:bg-ivory border-b border-r border-line px-4 py-2.5 flex items-center gap-2.5 min-h-[48px] transition-colors">
                  <span className={cx('shrink-0 h-2.5 w-2.5 rounded-full', s.bar)} />
                  <span className="text-[11px] font-bold text-bronze tabular-nums">{String(a.id).padStart(2, '0')}</span>
                  <span className="text-xs text-ink leading-snug line-clamp-2">{a.name}</span>
                </div>
                <div className="relative border-b border-line group-hover:bg-ivory transition-colors">
                  <div className="absolute inset-0 flex pointer-events-none" aria-hidden="true">
                    {DAYS.map((d) => (
                      <span key={d.i} className={cx('h-full border-r border-line/60', d.weekday === 6 && 'bg-sand/50')} style={{ width: DAY_W }} />
                    ))}
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2" style={{ left: offset * DAY_W + 3, width: span * DAY_W - 6 }}>
                    <Tooltip
                      content={`${a.name} · ${a.start === a.end ? formatDate(a.start) : `${formatDate(a.start)} – ${formatDate(a.end)}`} · ${a.days} ${a.days === 1 ? 'día' : 'días'}`}
                      className="w-full"
                    >
                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: a.id * 0.03, ease: [0.22, 1, 0.36, 1] }}
                        tabIndex={0}
                        className={cx('flex w-full h-7 origin-left items-center justify-center rounded-lg text-[10px] font-bold text-white shadow-sm outline-none', s.bar)}
                      >
                        {span > 1 ? `${a.days}d` : ''}
                      </motion.span>
                    </Tooltip>
                  </div>
                  {milestone && (
                    <span
                      className="absolute top-1/2 -translate-y-1/2 inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-sand-line bg-white px-2 py-0.5 text-[10px] font-semibold text-bronze-dark shadow-sm"
                      style={offset + span > TOTAL_DAYS - 6 ? { right: (TOTAL_DAYS - offset) * DAY_W + 6 } : { left: (offset + span) * DAY_W + 6 }}
                    >
                      <Flag size={10} /> {milestone.label}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line bg-ivory px-4 sm:px-5 py-3 text-xs text-muted">
        {Object.keys(CRONOGRAMA_STAGES).map((k) => (
          <span key={k} className="inline-flex items-center gap-2">
            <span className={cx('h-2.5 w-5 rounded-full', STAGE_STYLE[k].bar)} /> {CRONOGRAMA_STAGES[k].label}: {CRONOGRAMA_STAGES[k].description}
          </span>
        ))}
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-[3px] bg-sand border border-sand-line" /> Sábado (jornada presencial)
        </span>
        <span className="sm:ml-auto inline-flex items-center gap-1.5 md:hidden">
          <ArrowRight size={13} /> Desliza para ver todo el periodo
        </span>
      </div>
    </div>
  );
}

function WeeklyPlan() {
  const [active, setActive] = useState('sab');
  const current = WEEK_PLAN.find((w) => w.id === active);
  const CIcon = current.icon;
  const dayButtons = WEEK_PLAN.flatMap((w) => w.days.map((d, i) => ({ day: d, short: w.short[i], group: w })));

  return (
    <GlassCard hover={false} className="space-y-6">
      <CardTitle icon={CalendarCheck} title="Plan de acción semanal" subtitle="Organización de mi semana durante la práctica" toneName="amber" />
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2" role="tablist" aria-label="Días de la semana">
        {dayButtons.map((b) => {
          const isActive = b.group.id === active;
          return (
            <button
              key={b.day}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(b.group.id)}
              className={cx(
                'min-h-[64px] rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all duration-300',
                isActive ? 'border-plum bg-plum text-white shadow-paper-lg' : 'border-line bg-white text-body hover:border-line-strong'
              )}
            >
              <span className="font-serif text-xl font-semibold leading-none">{b.short}</span>
              <span className={cx('hidden sm:block text-[10px] uppercase tracking-[0.12em]', isActive ? 'text-on-plum-muted' : 'text-muted')}>{b.day.slice(0, 3)}</span>
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 rounded-3xl border border-line bg-ivory p-5 sm:p-6"
        >
          <div className="md:col-span-5 space-y-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-plum text-white">
              <CIcon size={22} />
            </span>
            <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">{current.days.length > 1 ? 'Lunes a viernes' : current.days[0]}</p>
            <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight">{current.title}</h4>
            <Badge toneName={current.toneName} icon={Clock}>
              {current.time}
            </Badge>
          </div>
          <ul className="md:col-span-7 space-y-2.5">
            {current.tasks.map((t) => (
              <li key={t} className="flex gap-2.5 rounded-2xl border border-line bg-white px-4 py-3 text-sm text-body leading-relaxed">
                <CircleCheck size={17} className="shrink-0 mt-0.5 text-sage" /> {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </GlassCard>
  );
}

function ExecutedJourneys() {
  return (
    <GlassCard hover={false} className="space-y-6">
      <CardTitle
        icon={Milestone}
        title="Jornadas ejecutadas"
        subtitle="Registro de la firma de asistencia del practicante"
        toneName="emerald"
        right={<Badge toneName="emerald">{PRACTICE_SUMMARY.horas} h</Badge>}
      />
      <ProgressBar label={`${PRACTICE_SUMMARY.jornadas} de ${PRACTICE_SUMMARY.jornadas} jornadas completadas`} value={100} toneName="emerald" />
      <motion.ol
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5"
      >
        {JORNADAS.map((j) => (
          <motion.li key={j.n} variants={fadeUp} className="rounded-2xl border border-line bg-white p-3 text-center shadow-paper">
            <span className="block font-serif text-2xl font-semibold text-bronze leading-none">J{j.n}</span>
            <span className="block mt-1.5 text-xs font-semibold text-ink tabular-nums">{j.date}</span>
            <span className="block mt-0.5 text-[11px] text-muted">5 h · 7:00 – 12:00</span>
          </motion.li>
        ))}
      </motion.ol>
    </GlassCard>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Planeacion_y_organizacion() {
  const [stage, setStage] = useState('todas');
  const [query, setQuery] = useState('');
  const [view, setView] = useState('gantt');

  const rows = useMemo(() => {
    const q = normalize(query.trim());
    return CRONOGRAMA.filter((a) => (stage === 'todas' || a.stage === stage) && (!q || normalize(`${a.id} ${a.name} ${CRONOGRAMA_STAGES[a.stage].label}`).includes(q)));
  }, [stage, query]);

  const chipOptions = [
    { id: 'todas', label: 'Todas', icon: Layers, count: CRONOGRAMA.length },
    ...Object.keys(CRONOGRAMA_STAGES).map((k) => ({ id: k, label: CRONOGRAMA_STAGES[k].label, count: CRONOGRAMA.filter((a) => a.stage === k).length })),
  ];

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Planeación"
        icon={CalendarRange}
        title="Planeación y"
        highlight="organización"
        description="Cronograma de las 18 actividades del diagnóstico, organizado en tres etapas, y la forma en que distribuí mi semana durante la práctica."
      />

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <motion.div variants={fadeUp}>
          <StatCard icon={ListChecks} label="Actividades" value={String(CRONOGRAMA.length)} hint="Cronograma del diagnóstico" className="h-full" />
        </motion.div>
        {STAGE_DAYS.map((s) => (
          <motion.div key={s.id} variants={fadeUp}>
            <StatCard
              icon={s.id === 'antes' ? PencilRuler : s.id === 'durante' ? Presentation : NotebookPen}
              label={`Etapa ${s.label}`}
              value={`${s.count}`}
              hint={`${s.description} · ${s.days} días`}
              toneName={STAGE_STYLE[s.id].toneName}
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>

      <section className="space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:justify-between">
          <FilterChips options={chipOptions} value={stage} onChange={setStage} />
          <SegmentedControl
            ariaLabel="Tipo de vista"
            value={view}
            onChange={setView}
            options={[
              { id: 'gantt', label: 'Gantt', icon: GanttChart },
              { id: 'tabla', label: 'Tabla', icon: Table2 },
            ]}
            className="self-start"
          />
        </div>
        <SearchInput value={query} onChange={setQuery} placeholder="Buscar actividad (p. ej. cuestionario, FODA, entrevista)…" />

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
          <span>
            Mostrando <strong className="text-ink">{rows.length}</strong> de {CRONOGRAMA.length} actividades · {formatDate(CRONOGRAMA[0].start)} –{' '}
            {formatDate(CRONOGRAMA[CRONOGRAMA.length - 1].end)}
          </span>
          <Badge toneName="emerald" icon={CircleCheck}>
            Cronograma completado
          </Badge>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={`${view}-${stage}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {rows.length === 0 ? (
              <EmptyState title="Sin actividades" description="No hay actividades que coincidan con la búsqueda o el filtro." />
            ) : view === 'gantt' ? (
              <GanttView rows={rows} />
            ) : (
              <DataTable columns={TABLE_COLUMNS} rows={rows} rowKey="id" minWidth={820} renderCard={(a) => <ActivityCard a={a} />} />
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <WeeklyPlan />

      <ExecutedJourneys />
    </PageShell>
  );
}
