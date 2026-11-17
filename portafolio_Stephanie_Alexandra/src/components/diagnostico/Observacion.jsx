import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  School,
  Laptop,
  GraduationCap,
  FlaskConical,
  UserRound,
  CalendarDays,
  Clock,
  PenLine,
  Target,
  Users,
  Building2,
  BookOpen,
  MessagesSquare,
  Layers,
  CircleCheck,
  CircleDot,
  Circle,
  ChevronDown,
  Sparkles,
  MapPin,
  ArrowUpRight,
  ListChecks,
} from 'lucide-react';
import {
  GlassCard,
  SectionHeader,
  Badge,
  SearchInput,
  TabBar,
  DonutChart,
  ChartLegend,
  EmptyState,
  Divider,
} from '../ui/Primitives';
import { cx, normalize, fadeUp, stagger } from '../ui/tokens';
import { OBSERVATION_ITEMS as ITEMS } from '../../data/diagnostico';

/* =====================================================================
   GUÍA DE OBSERVACIÓN SISTEMÁTICA (Instrumento 5.6.1)
   ===================================================================== */

const META = [
  { label: 'Institución', value: 'Instituto Nacional Dr. Francisco Martínez Suárez', icon: School, wide: true },
  { label: 'Modalidad', value: 'A distancia', icon: Laptop },
  { label: 'Nivel', value: 'Primer año de Bachillerato', icon: GraduationCap },
  { label: 'Asignatura', value: 'Ciencias Naturales y Tecnología', icon: FlaskConical },
  { label: 'Docente', value: 'Amilcar Heriberto Sánchez', icon: UserRound },
  { label: 'Fecha', value: '22/08/2026', icon: CalendarDays },
  { label: 'Hora', value: '10:30 a.m.', icon: Clock },
  { label: 'Observadora', value: 'Stephanie Alexandra Hernández', icon: PenLine },
];

const OBJECTIVE =
  'Registrar directa y objetivamente las condiciones del entorno de aprendizaje, el uso de los recursos didácticos y tecnológicos, y las interacciones pedagógicas desarrolladas durante las clases observadas.';

const FREQUENCY_SCALE = ['Siempre', 'Algunas veces', 'Nunca'];
const PRESENCE_SCALE = ['Sí', 'Parcialmente', 'No', 'No observado'];

const DIMENSIONS = [
  {
    id: 'estudiantado',
    num: 1,
    label: 'Del estudiantado',
    shortLabel: 'Estudiantado',
    icon: Users,
    scale: FREQUENCY_SCALE,
    reading:
      'El estudiantado muestra una participación activa y constante: pregunta sobre los contenidos, participa en las actividades, trabaja en equipo y solicita apoyo de forma sistemática. La iniciativa propia para emprender las actividades asignadas aparece solo algunas veces, por lo que conviene reforzar la autorregulación y la motivación intrínseca durante la sesión.',
  },
  {
    id: 'entorno',
    num: 2,
    label: 'Entorno físico y tecnológico',
    shortLabel: 'Entorno',
    icon: Building2,
    scale: PRESENCE_SCALE,
    reading:
      'Las condiciones físicas (iluminación, ventilación, mobiliario y computadoras) se cumplen de forma parcial, mientras que la conexión a Internet y el proyector sí están disponibles. Esto coincide con lo expresado por el coordinador: existe equipamiento, pero de uso compartido y con necesidad de actualización, y no todas las aulas cuentan con los mismos recursos.',
  },
  {
    id: 'pedagogica',
    num: 3,
    label: 'Pedagógica',
    shortLabel: 'Pedagógica',
    icon: BookOpen,
    scale: FREQUENCY_SCALE,
    reading:
      'La práctica pedagógica observada es consistente: los materiales apoyan la explicación, se recurre a recursos prácticos, modelos y experimentos cuando es necesario y se integran plataformas digitales como apoyo, en coherencia con el modelo TPACK y con la estrategia de aula invertida declarada por el docente tutor.',
  },
  {
    id: 'interaccion',
    num: 4,
    label: 'Interacción',
    shortLabel: 'Interacción',
    icon: MessagesSquare,
    scale: FREQUENCY_SCALE,
    reading:
      'La interacción docente-estudiante es el rasgo más sólido de la clase: instrucciones claras, diálogo, espacio para expresar dudas y respeto mutuo. La interacción respetuosa entre los propios estudiantes se presenta solo algunas veces, lo que invita a fortalecer acuerdos de convivencia y dinámicas colaborativas entre pares.',
  },
];


const LEVELS = {
  optimo: { label: 'Nivel óptimo', hint: 'Siempre / Sí', toneName: 'emerald', color: '#2F6B50', icon: CircleCheck },
  intermedio: { label: 'Nivel intermedio', hint: 'Algunas veces / Parcialmente', toneName: 'amber', color: '#8C6D3F', icon: CircleDot },
  ausente: { label: 'Ausente', hint: 'Nunca / No', toneName: 'rose', color: '#8A3557', icon: Circle },
  na: { label: 'No observado', hint: 'Sin registro', toneName: 'slate', color: '#6E5A85', icon: Circle },
};

const levelOf = (value) => {
  if (value === 'Siempre' || value === 'Sí') return 'optimo';
  if (value === 'Algunas veces' || value === 'Parcialmente') return 'intermedio';
  if (value === 'Nunca' || value === 'No') return 'ausente';
  return 'na';
};

const dimOf = (id) => DIMENSIONS.find((d) => d.id === id);

const countBy = (items) =>
  items.reduce(
    (acc, it) => {
      acc[levelOf(it.value)] += 1;
      return acc;
    },
    { optimo: 0, intermedio: 0, ausente: 0, na: 0 }
  );

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function ScaleCell({ selected, level }) {
  const L = LEVELS[level];
  if (!selected) return <span className="inline-block h-3.5 w-3.5 rounded-full border border-line" aria-hidden="true" />;
  return (
    <motion.span
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full"
      style={{ background: `${L.color}26`, color: L.color }}
    >
      <CircleCheck size={16} />
    </motion.span>
  );
}

function DimensionBlock({ dim, items }) {
  const [open, setOpen] = useState(false);
  const Icon = dim.icon;
  const all = ITEMS.filter((it) => it.dim === dim.id);
  const counts = countBy(all);

  return (
    <motion.section variants={fadeUp} layout className="space-y-4">
      <GlassCard padded={false} hover={false} className="overflow-hidden">
        <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center gap-5 justify-between bg-ivory">
          <div className="flex items-start gap-4 min-w-0">
            <span className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sand border border-sand-line text-bronze">
              <Icon size={22} />
            </span>
            <div className="min-w-0">
              <span className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">Dimensión {dim.num}</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight">{dim.label}</h3>
              <p className="text-xs sm:text-sm text-muted mt-1">Escala: {dim.scale.join(' / ')}</p>
            </div>
          </div>
          <div className="w-full lg:w-72 space-y-2">
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-white">
              {['optimo', 'intermedio', 'ausente'].map((lv) =>
                counts[lv] > 0 ? (
                  <motion.div
                    key={lv}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(counts[lv] / all.length) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    style={{ background: LEVELS[lv].color }}
                    className="h-full"
                  />
                ) : null
              )}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              <span>
                <span className="text-sage font-semibold tabular-nums">{counts.optimo}</span> óptimo
              </span>
              <span>
                <span className="text-bronze font-semibold tabular-nums">{counts.intermedio}</span> intermedio
              </span>
              <span>
                <span className="text-ink font-semibold tabular-nums">{all.length}</span> indicadores
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-line">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="w-full min-h-[52px] flex items-center justify-between gap-3 px-5 sm:px-6 py-3 text-left text-sm font-medium text-body hover:text-plum transition-colors"
          >
            <span className="inline-flex items-center gap-2">
              <Sparkles size={15} className="text-bronze" /> Lectura analítica de la dimensión
            </span>
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-bronze">
              <ChevronDown size={18} />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="px-5 sm:px-6 pb-5 text-sm sm:text-[15px] leading-relaxed text-body">{dim.reading}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>

      {/* Móvil: tarjetas */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {items.map((it) => {
          const level = levelOf(it.value);
          const L = LEVELS[level];
          return (
            <div key={it.n} className="rounded-2xl border border-line bg-ivory p-4">
              <div className="flex items-start gap-3">
                <span className="shrink-0 font-serif text-2xl font-semibold text-bronze leading-none tabular-nums">
                  {String(it.n).padStart(2, '0')}
                </span>
                <p className="text-sm text-body leading-snug">{it.text}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {dim.scale.map((opt) => {
                  const sel = opt === it.value;
                  return (
                    <span
                      key={opt}
                      className={cx(
                        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold',
                        sel ? '' : 'border-line text-muted'
                      )}
                      style={sel ? { borderColor: `${L.color}66`, background: `${L.color}1F`, color: L.color } : undefined}
                    >
                      {sel && <CircleCheck size={12} />}
                      {opt}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Escritorio: tabla editorial */}
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-line bg-ivory">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-silk text-[11px] uppercase tracking-[0.16em] text-muted">
              <th className="px-4 py-3.5 text-left font-semibold w-14">N.°</th>
              <th className="px-4 py-3.5 text-left font-semibold">Indicador observado</th>
              {dim.scale.map((opt) => (
                <th key={opt} className="px-3 py-3.5 text-center font-semibold w-28">
                  {opt}
                </th>
              ))}
              <th className="px-4 py-3.5 text-left font-semibold w-40">Valoración</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => {
              const level = levelOf(it.value);
              return (
                <tr key={it.n} className="border-t border-line hover:bg-ivory transition-colors">
                  <td className="px-4 py-4 font-serif text-xl font-semibold text-bronze tabular-nums">{String(it.n).padStart(2, '0')}</td>
                  <td className="px-4 py-4 text-body leading-snug">{it.text}</td>
                  {dim.scale.map((opt) => (
                    <td key={opt} className="px-3 py-4 text-center">
                      <ScaleCell selected={opt === it.value} level={level} />
                    </td>
                  ))}
                  <td className="px-4 py-4">
                    <Badge toneName={LEVELS[level].toneName}>{LEVELS[level].label}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Observacion({ onNavigate }) {
  const [dimension, setDimension] = useState('all');
  const [level, setLevel] = useState('all');
  const [query, setQuery] = useState('');

  const totals = useMemo(() => countBy(ITEMS), []);
  const q = normalize(query.trim());

  const tabs = useMemo(
    () => [
      { id: 'all', label: 'Todas las dimensiones', shortLabel: 'Todas', icon: Layers, count: ITEMS.length },
      ...DIMENSIONS.map((d) => ({
        id: d.id,
        label: d.label,
        shortLabel: d.shortLabel,
        icon: d.icon,
        count: ITEMS.filter((it) => it.dim === d.id).length,
      })),
    ],
    []
  );

  const filtered = useMemo(
    () =>
      ITEMS.filter((it) => {
        if (dimension !== 'all' && it.dim !== dimension) return false;
        if (level !== 'all' && levelOf(it.value) !== level) return false;
        if (q && !normalize(`${it.text} ${it.value} ${dimOf(it.dim).label}`).includes(q)) return false;
        return true;
      }),
    [dimension, level, q]
  );

  const groups = DIMENSIONS.map((d) => ({ dim: d, items: filtered.filter((it) => it.dim === d.id) })).filter((g) => g.items.length);

  const donutData = [
    { label: 'Nivel óptimo (Siempre / Sí)', value: totals.optimo, color: LEVELS.optimo.color },
    { label: 'Nivel intermedio (Algunas veces / Parcialmente)', value: totals.intermedio, color: LEVELS.intermedio.color },
    { label: 'Ausente (Nunca / No)', value: totals.ausente, color: LEVELS.ausente.color },
  ];

  const levelFilters = [
    { id: 'all', label: 'Todas las valoraciones', count: ITEMS.length },
    { id: 'optimo', label: 'Nivel óptimo', count: totals.optimo },
    { id: 'intermedio', label: 'Nivel intermedio', count: totals.intermedio },
  ];

  return (
    <div className="space-y-10 sm:space-y-14">
      <SectionHeader
        eyebrow="Instrumento 5.6.1 · Observación directa"
        icon={Eye}
        title="Guía de observación"
        highlight="sistemática"
        description="Registro de 20 indicadores organizados en cuatro dimensiones: el estudiantado, el entorno físico y tecnológico, la práctica pedagógica y la interacción en el aula."
      />

      {/* Metadatos oficiales */}
      <GlassCard padded={false} hover={false} className="overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {META.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className={cx(
                  'flex items-start gap-3 p-4 sm:p-5 border-b border-line sm:border-r',
                  m.wide && 'sm:col-span-2 lg:col-span-2'
                )}
              >
                <Icon size={17} className="shrink-0 mt-0.5 text-bronze" />
                <div className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-muted font-semibold">{m.label}</span>
                  <span className="block text-sm text-body leading-snug mt-0.5">{m.value}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-start gap-3 p-5 sm:p-6 bg-silk">
          <Target size={18} className="shrink-0 mt-0.5 text-plum" />
          <div>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-muted font-semibold">Objetivo de la observación</span>
            <p className="text-sm sm:text-[15px] text-body leading-relaxed mt-1">{OBJECTIVE}</p>
          </div>
        </div>
      </GlassCard>

      {/* Resumen estadístico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        <GlassCard className="lg:col-span-5" hover={false}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-5">Distribución global de criterios</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 items-center">
            <DonutChart data={donutData} centerValue={`${Math.round((totals.optimo / ITEMS.length) * 100)}%`} centerLabel="en nivel óptimo" />
            <ChartLegend data={donutData} />
          </div>
        </GlassCard>
        <GlassCard className="lg:col-span-7" hover={false}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-5">Perfil por dimensión</p>
          <div className="space-y-5">
            {DIMENSIONS.map((d, i) => {
              const items = ITEMS.filter((it) => it.dim === d.id);
              const c = countBy(items);
              const pct = Math.round((c.optimo / items.length) * 100);
              const Icon = d.icon;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDimension(d.id)}
                  className="group w-full text-left"
                  aria-label={`Filtrar por la dimensión ${d.label}`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="inline-flex items-center gap-2 text-sm text-body group-hover:text-plum transition-colors">
                      <Icon size={15} className="text-plum" /> {d.num}. {d.label}
                    </span>
                    <span className="text-xs tabular-nums text-muted">
                      <span className="text-sage font-semibold">{pct}%</span> óptimo
                    </span>
                  </div>
                  <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(c.optimo / items.length) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      style={{ background: LEVELS.optimo.color }}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(c.intermedio / items.length) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.08 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                      style={{ background: LEVELS.intermedio.color }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-6 grid grid-cols-1 min-[420px]:grid-cols-3 gap-3">
            {[
              { v: ITEMS.length, l: 'Indicadores' },
              { v: totals.optimo, l: 'Óptimos' },
              { v: totals.intermedio, l: 'Intermedios' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-line bg-ivory p-3 text-center">
                <span className="block font-serif text-3xl font-semibold text-plum tabular-nums">{s.v}</span>
                <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-muted mt-1">{s.l}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <Divider />

      {/* Filtros */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink inline-flex items-center gap-3">
              <ListChecks className="text-bronze" size={26} /> Registro de indicadores
            </h3>
            <p className="text-sm text-muted mt-1">
              Mostrando <span className="text-bronze font-semibold tabular-nums">{filtered.length}</span> de {ITEMS.length} indicadores
            </p>
          </div>
          <SearchInput value={query} onChange={setQuery} placeholder="Buscar indicador..." className="lg:max-w-sm" />
        </div>
        <TabBar tabs={tabs} active={dimension} onChange={setDimension} layoutId="observacion-dimensiones" size="sm" />
        <div className="flex flex-wrap gap-2">
          {levelFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setLevel(f.id)}
              aria-pressed={level === f.id}
              className={cx(
                'min-h-[40px] inline-flex items-center gap-2 rounded-full border px-4 text-xs sm:text-sm font-medium transition-all',
                level === f.id
                  ? 'border-plum bg-plum text-white shadow-sm'
                  : 'border-lilac-line bg-white text-body hover:border-line-strong hover:text-plum'
              )}
            >
              {f.id !== 'all' && <span className="h-2 w-2 rounded-full" style={{ background: LEVELS[f.id].color }} />}
              {f.label}
              <span className="rounded-full bg-lilac px-1.5 text-[10px] font-bold tabular-nums">{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      {groups.length === 0 ? (
        <EmptyState title="Sin indicadores para estos filtros" description="Ajusta la dimensión, la valoración o el término de búsqueda." />
      ) : (
        <motion.div key={`${dimension}-${level}-${q}`} initial="hidden" animate="show" variants={stagger} className="space-y-10">
          {groups.map((g) => (
            <DimensionBlock key={g.dim.id} dim={g.dim} items={g.items} />
          ))}
        </motion.div>
      )}

      {/* Enlace al contexto */}
      {onNavigate && (
        <GlassCard hover={false} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <MapPin size={20} className="shrink-0 mt-0.5 text-bronze" />
            <p className="text-sm sm:text-base text-body leading-relaxed">
              Las condiciones observadas se comprenden mejor a la luz del contexto institucional y comunitario del centro escolar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contexto', 'contexto')}
            className="shrink-0 min-h-[46px] inline-flex items-center justify-center gap-2 rounded-2xl border border-sand-line bg-sand px-5 text-sm font-semibold text-plum hover:bg-[#F0E6D2] transition-colors"
          >
            Ver contexto educativo <ArrowUpRight size={16} />
          </button>
        </GlassCard>
      )}
    </div>
  );
}
