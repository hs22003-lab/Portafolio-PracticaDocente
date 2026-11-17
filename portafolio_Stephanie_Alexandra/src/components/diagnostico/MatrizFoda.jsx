import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Grid2x2,
  ShieldCheck,
  TrendingUp,
  CircleAlert,
  TriangleAlert,
  Users,
  School,
  Layers,
  LayoutGrid,
  Table2,
  Scale,
  Crosshair,
  Rocket,
  Compass,
  Shield,
  LifeBuoy,
  FileText,
} from 'lucide-react';
import { GlassCard, SectionHeader, Badge, SearchInput, TabBar, EmptyState, Divider } from '../ui/Primitives';
import { cx, normalize, fadeUp, stagger } from '../ui/tokens';

/* =====================================================================
   MATRIZ FODA (Tabla 15 del informe de diagnóstico)
   ===================================================================== */

const ACTORS = {
  est: { label: 'Estudiantes', icon: Users },
  inst: { label: 'Docente / Institución', icon: School },
};

const QUADRANTS = [
  {
    id: 'F',
    label: 'Fortalezas',
    origin: 'Interno',
    nature: 'Positivo',
    toneName: 'emerald',
    color: '#2F6B50',
    icon: ShieldCheck,
    items: [
      { actor: 'est', metric: '90.9%', source: 'Encuesta · P7', text: 'La mayoría de los estudiantes presenta una motivación favorable (90.9%) para continuar sus estudios.' },
      {
        actor: 'est',
        metric: '81.9%',
        source: 'Encuesta · P4',
        text: 'El 81.9% de los estudiantes indicó que siempre o casi siempre realizan sus actividades de forma autónoma.',
      },
      {
        actor: 'est',
        metric: '90.9%',
        source: 'Encuesta · P11',
        text: 'El 90.9% de los estudiantes percibe que el docente está disponible siempre o casi siempre para brindarles apoyo.',
      },
      { actor: 'est', source: 'Entrevista al coordinador · P5', text: 'Uso de aulas con buenas condiciones físicas para el aprendizaje interactivo.' },
      {
        actor: 'est',
        source: 'Entrevista al tutor · P1',
        text: 'La gran parte de los estudiantes son adultos y su nivel de madurez es más favorable para decisiones académicas.',
      },
      {
        actor: 'inst',
        metric: '30 PC',
        source: 'Entrevista al coordinador · P6',
        text: 'La institución cuenta con la disponibilidad de computadoras (30), Internet y proyectores (6+1) para el desarrollo de las actividades académicas.',
      },
      {
        actor: 'inst',
        source: 'Entrevista al coordinador · P5',
        text: 'La institución cuenta con aulas asignadas, biblioteca, módulos impresos y digitales, y apoyo psicológico.',
      },
    ],
  },
  {
    id: 'D',
    label: 'Debilidades',
    origin: 'Interno',
    nature: 'Negativo',
    toneName: 'amber',
    color: '#8C6D3F',
    icon: CircleAlert,
    items: [
      { actor: 'est', source: 'Entrevista al tutor · P2', text: 'Algunos estudiantes presentan dificultades relacionadas con la lectura y la escritura.' },
      {
        actor: 'est',
        metric: '36.4%',
        source: 'Encuesta · P5',
        text: 'La participación de los estudiantes no es constante en todo el grupo; el 36.4% indicó que participa solamente algunas veces.',
      },
      {
        actor: 'est',
        source: 'Encuesta · P13',
        text: 'Algunos estudiantes manifestaron la necesidad de disminuir o regular la cantidad de tareas debido a su disponibilidad de tiempo.',
      },
      { actor: 'inst', source: 'Entrevista al tutor · P2', text: 'El docente identifica poco manejo de la tecnología por parte de los estudiantes.' },
      {
        actor: 'inst',
        source: 'Entrevista al coordinador · P4',
        text: 'El coordinador señaló que algunos estudiantes presentan dificultades en cuanto al transporte, ya que son de otros municipios de Chalatenango.',
      },
      {
        actor: 'inst',
        source: 'Entrevista al tutor · P8',
        text: 'El uso de la tecnología no se realiza diariamente, sino únicamente en clases presenciales según lo expresado por el docente tutor.',
      },
    ],
  },
  {
    id: 'O',
    label: 'Oportunidades',
    origin: 'Externo',
    nature: 'Positivo',
    toneName: 'violet',
    color: '#4A2574',
    icon: TrendingUp,
    items: [
      { actor: 'est', source: 'Entrevista al tutor · P3', text: 'Implementación del aula invertida durante las sesiones de la asignatura.' },
      { actor: 'est', source: 'Encuesta · P12', text: 'Potenciar el aprendizaje tecnológico mediante diferentes plataformas educativas.' },
      { actor: 'est', source: 'Entrevista al tutor · P10', text: 'Posible refuerzo de contenidos mediante sesiones en Google Meet.' },
      {
        actor: 'inst',
        source: 'Entrevista al coordinador · P6',
        text: 'La institución cuenta con recursos tecnológicos que pueden ser aprovechados durante el proceso educativo, como computadoras, proyectores y laboratorios de computación.',
      },
      {
        actor: 'inst',
        source: 'Entrevista al coordinador · P9',
        text: 'Los tutores muestran disposición para incorporar herramientas digitales en el proceso educativo.',
      },
      {
        actor: 'inst',
        source: 'Entrevista al coordinador · P7',
        text: 'La institución cuenta con una red de Internet funcional (MINED) para actividades académicas y administrativas.',
      },
      {
        actor: 'inst',
        source: 'Entrevista al coordinador · P5',
        text: 'La disponibilidad de módulos impresos y digitales permite contar con diferentes medios para acceder a los contenidos.',
      },
    ],
  },
  {
    id: 'A',
    label: 'Amenazas',
    origin: 'Externo',
    nature: 'Negativo',
    toneName: 'rose',
    color: '#8A3557',
    icon: TriangleAlert,
    items: [
      {
        actor: 'est',
        source: 'Encuesta · P13',
        text: 'Las responsabilidades laborales de algunos estudiantes limitan el tiempo disponible para realizar actividades académicas.',
      },
      {
        actor: 'est',
        metric: '27.3%',
        source: 'Encuesta · P3',
        text: 'El 18.2% de los estudiantes indicó que la señal de Internet en su hogar es inestable y el 9.1% manifestó no tener acceso.',
      },
      {
        actor: 'est',
        metric: '27.3%',
        source: 'Encuesta · P8',
        text: 'Algunos estudiantes (27.3%) dependen principalmente del teléfono inteligente (smartphone) para estudiar, lo que puede limitar determinadas actividades digitales.',
      },
      {
        actor: 'inst',
        source: 'Entrevista al coordinador · P3, P4',
        text: 'Parte de la población estudiantil son padres/madres de familia, lo que dificulta la asistencia por responsabilidades del hogar o cuidado de hijos.',
      },
      {
        actor: 'inst',
        source: 'Encuesta · P3, P9',
        text: 'Las diferencias en las condiciones de conectividad entre los estudiantes pueden afectar el desarrollo de actividades virtuales.',
      },
      {
        actor: 'inst',
        source: 'Entrevista al coordinador · P4',
        text: 'El trabajo y otras responsabilidades personales de los estudiantes pueden generar un bajo rendimiento académico o inasistencias.',
      },
    ],
  },
];

/** Orden de lectura de la tabla (F, O, D, A). */
const TABLE_ORDER = ['F', 'O', 'D', 'A'];

const STRATEGIES = [
  {
    id: 'FO',
    label: 'Estrategia ofensiva',
    icon: Rocket,
    combo: 'Fortalezas × Oportunidades',
    text: 'Aprovechar la alta motivación (90.9%) y el dominio de Classroom/Moodle (90.9%) para consolidar el aula invertida con recursos digitales y sesiones de refuerzo en Google Meet.',
  },
  {
    id: 'DO',
    label: 'Estrategia de reorientación',
    icon: Compass,
    combo: 'Debilidades × Oportunidades',
    text: 'Usar el laboratorio de informática y la disposición de los tutores para fortalecer el manejo de la computadora, la lectura y la escritura mediante actividades guiadas paso a paso.',
  },
  {
    id: 'FA',
    label: 'Estrategia defensiva',
    icon: Shield,
    combo: 'Fortalezas × Amenazas',
    text: 'Apoyarse en la autonomía (81.9%) y en el acompañamiento docente (90.9%) para diseñar materiales mobile-first y con opción offline que compensen la conectividad inestable.',
  },
  {
    id: 'DA',
    label: 'Estrategia de supervivencia',
    icon: LifeBuoy,
    combo: 'Debilidades × Amenazas',
    text: 'Dosificar tareas y flexibilizar fechas de entrega considerando trabajo, transporte y cuidado de hijos, priorizando actividades de alto valor formativo.',
  },
];

const quadrantOf = (id) => QUADRANTS.find((q) => q.id === id);

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function FodaItem({ item, color }) {
  const ActorIcon = ACTORS[item.actor].icon;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="group rounded-2xl border border-line bg-ivory p-4 hover:border-line-strong transition-colors"
    >
      <div className="flex items-start gap-3">
        <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45" style={{ background: color }} />
        <p className="flex-1 text-sm text-body leading-relaxed">{item.text}</p>
        {item.metric && (
          <span className="shrink-0 font-serif text-xl font-semibold leading-none tabular-nums" style={{ color }}>
            {item.metric}
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 pl-5">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-muted">
          <ActorIcon size={12} /> {ACTORS[item.actor].label}
        </span>
        <span className="text-line-strong">·</span>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-bronze">
          <FileText size={12} /> {item.source}
        </span>
      </div>
    </motion.li>
  );
}

function QuadrantCard({ quadrant, items }) {
  const Icon = quadrant.icon;
  const byActor = ['est', 'inst'].map((a) => ({ actor: a, items: items.filter((it) => it.actor === a) })).filter((g) => g.items.length);

  return (
    <motion.div variants={fadeUp} layout className="h-full">
      <GlassCard padded={false} hover={false} className="h-full overflow-hidden">
        <div className="relative p-5 sm:p-6 border-b border-line overflow-hidden">
          <span
            className="pointer-events-none absolute -right-3 -top-8 font-serif text-[9rem] font-bold leading-none opacity-[0.07]"
            style={{ color: quadrant.color }}
            aria-hidden="true"
          >
            {quadrant.id}
          </span>
          <div className="relative flex items-start gap-4">
            <span
              className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line"
              style={{ background: `${quadrant.color}1F`, color: quadrant.color }}
            >
              <Icon size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight">{quadrant.label}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge toneName={quadrant.toneName}>Origen {quadrant.origin.toLowerCase()}</Badge>
                <Badge toneName="slate">{quadrant.nature}</Badge>
              </div>
            </div>
            <span className="shrink-0 font-serif text-4xl font-semibold leading-none tabular-nums" style={{ color: quadrant.color }}>
              {items.length}
            </span>
          </div>
        </div>
        <div className="p-4 sm:p-5 space-y-5">
          {byActor.length === 0 ? (
            <p className="text-sm text-muted italic px-1 py-4">Sin elementos para los filtros actuales.</p>
          ) : (
            byActor.map((g) => {
              const ActorIcon = ACTORS[g.actor].icon;
              return (
                <div key={g.actor} className="space-y-3">
                  <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted font-semibold px-1">
                    <ActorIcon size={13} className="text-plum" /> {ACTORS[g.actor].label}
                  </p>
                  <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                      {g.items.map((it) => (
                        <FodaItem key={it.text} item={it} color={quadrant.color} />
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}

function FodaTable({ filteredMap, actor }) {
  const columns = actor === 'all' ? ['est', 'inst'] : [actor];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted font-semibold">
        <Table2 size={14} className="text-bronze" /> Tabla 15. Matriz FODA del diagnóstico
      </div>

      {/* Móvil: tarjetas */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {TABLE_ORDER.map((qid) => {
          const quad = quadrantOf(qid);
          const items = filteredMap[qid] || [];
          if (!items.length) return null;
          const Icon = quad.icon;
          return (
            <div key={qid} className="rounded-3xl border border-line bg-ivory overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-line" style={{ background: `${quad.color}12` }}>
                <Icon size={18} style={{ color: quad.color }} />
                <span className="font-serif text-xl font-semibold text-ink">{quad.label}</span>
                <span className="ml-auto text-xs tabular-nums text-muted">{items.length}</span>
              </div>
              <div className="p-4 space-y-4">
                {columns.map((a) => {
                  const list = items.filter((it) => it.actor === a);
                  if (!list.length) return null;
                  return (
                    <div key={a}>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-semibold mb-2">{ACTORS[a].label}</p>
                      <ul className="space-y-2">
                        {list.map((it) => (
                          <li key={it.text} className="flex gap-2.5 text-sm text-body leading-relaxed">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: quad.color }} />
                            {it.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Escritorio: tabla editorial */}
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-line bg-ivory">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="bg-silk text-left text-[11px] uppercase tracking-[0.16em] text-muted">
              <th className="px-5 py-4 font-semibold w-48">Componente</th>
              {columns.map((a) => (
                <th key={a} className="px-5 py-4 font-semibold">
                  {ACTORS[a].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ORDER.map((qid) => {
              const quad = quadrantOf(qid);
              const items = filteredMap[qid] || [];
              if (!items.length) return null;
              const Icon = quad.icon;
              return (
                <tr key={qid} className="align-top border-t border-line">
                  <td className="px-5 py-5" style={{ background: `${quad.color}0D` }}>
                    <span className="inline-flex items-center gap-2.5">
                      <Icon size={18} style={{ color: quad.color }} />
                      <span className="font-serif text-xl font-semibold text-ink">{quad.label}</span>
                    </span>
                    <span className="block mt-1 text-xs text-muted">
                      {quad.origin} · {quad.nature}
                    </span>
                  </td>
                  {columns.map((a) => {
                    const list = items.filter((it) => it.actor === a);
                    return (
                      <td key={a} className="px-5 py-5">
                        {list.length ? (
                          <ul className="space-y-2.5">
                            {list.map((it) => (
                              <li key={it.text} className="flex gap-2.5 text-body leading-relaxed">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: quad.color }} />
                                {it.text}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BalanceChart() {
  const rows = [
    { label: 'Factores internos', pos: quadrantOf('F'), neg: quadrantOf('D') },
    { label: 'Factores externos', pos: quadrantOf('O'), neg: quadrantOf('A') },
  ];
  const max = Math.max(...QUADRANTS.map((q) => q.items.length));
  const positives = quadrantOf('F').items.length + quadrantOf('O').items.length;
  const negatives = quadrantOf('D').items.length + quadrantOf('A').items.length;

  return (
    <GlassCard hover={false}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <Scale size={20} className="shrink-0 mt-1 text-bronze" />
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">Balance estratégico</h3>
            <p className="text-sm text-muted mt-1">Elementos positivos frente a negativos por origen.</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div>
            <span className="block font-serif text-3xl font-semibold text-sage tabular-nums">{positives}</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted">Positivos</span>
          </div>
          <div>
            <span className="block font-serif text-3xl font-semibold text-wine tabular-nums">{negatives}</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted">Negativos</span>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {rows.map((r, i) => (
          <div key={r.label}>
            <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold mb-2 text-center">{r.label}</p>
            <div className="grid grid-cols-2 gap-1 items-center">
              <div className="flex items-center justify-end gap-2">
                <span className="text-xs text-body hidden sm:inline">{r.pos.label}</span>
                <span className="text-sm font-semibold tabular-nums" style={{ color: r.pos.color }}>
                  {r.pos.items.length}
                </span>
                <div className="h-4 flex-1 flex justify-end rounded-l-full bg-white overflow-hidden max-w-[70%]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(r.pos.items.length / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-l-full"
                    style={{ background: r.pos.color }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 flex-1 rounded-r-full bg-white overflow-hidden max-w-[70%]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(r.neg.items.length / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.15 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-r-full"
                    style={{ background: r.neg.color }}
                  />
                </div>
                <span className="text-sm font-semibold tabular-nums" style={{ color: r.neg.color }}>
                  {r.neg.items.length}
                </span>
                <span className="text-xs text-body hidden sm:inline">{r.neg.label}</span>
              </div>
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-muted sm:hidden">
              <span>{r.pos.label}</span>
              <span>{r.neg.label}</span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function MatrizFoda() {
  const [quadrant, setQuadrant] = useState('all');
  const [actor, setActor] = useState('all');
  const [view, setView] = useState('matriz');
  const [query, setQuery] = useState('');
  const q = normalize(query.trim());

  const filteredMap = useMemo(() => {
    const map = {};
    QUADRANTS.forEach((quad) => {
      map[quad.id] = quad.items.filter((it) => {
        if (actor !== 'all' && it.actor !== actor) return false;
        if (q && !normalize(`${it.text} ${it.source} ${quad.label}`).includes(q)) return false;
        return true;
      });
    });
    return map;
  }, [actor, q]);

  const visibleQuadrants = QUADRANTS.filter((quad) => quadrant === 'all' || quad.id === quadrant);
  const visibleMap = Object.fromEntries(visibleQuadrants.map((quad) => [quad.id, filteredMap[quad.id]]));
  const total = visibleQuadrants.reduce((acc, quad) => acc + filteredMap[quad.id].length, 0);

  const tabs = [
    { id: 'all', label: 'Todos los cuadrantes', shortLabel: 'Todos', icon: Layers, count: QUADRANTS.reduce((a, quad) => a + filteredMap[quad.id].length, 0) },
    ...TABLE_ORDER.map((id) => {
      const quad = quadrantOf(id);
      return { id, label: quad.label, icon: quad.icon, count: filteredMap[id].length };
    }),
  ];

  const actorOptions = [
    { id: 'all', label: 'Todos los actores', icon: Layers },
    { id: 'est', label: 'Estudiantes', icon: Users },
    { id: 'inst', label: 'Docente / Institución', icon: School },
  ];

  return (
    <div className="space-y-10 sm:space-y-14">
      <SectionHeader
        eyebrow="Tabla 15 · Síntesis estratégica"
        icon={Grid2x2}
        title="Matriz"
        highlight="FODA"
        description="Fortalezas, oportunidades, debilidades y amenazas identificadas al cruzar la encuesta, la guía de observación y las entrevistas. Filtra por cuadrante y por actor para explorar cada hallazgo y su fuente."
      />

      {/* Resumen por cuadrante */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {TABLE_ORDER.map((id) => {
          const quad = quadrantOf(id);
          const Icon = quad.icon;
          const active = quadrant === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setQuadrant(active ? 'all' : id)}
              aria-pressed={active}
              className={cx(
                'relative text-left rounded-3xl border p-4 sm:p-5 transition-all duration-300 overflow-hidden',
                active ? 'bg-white -translate-y-0.5' : 'border-line bg-white hover:border-line-strong'
              )}
              style={active ? { borderColor: `${quad.color}66` } : undefined}
            >
              <span className="absolute inset-x-0 bottom-0 h-[3px]" style={{ background: quad.color, opacity: active ? 0.9 : 0.35 }} />
              <div className="flex items-center justify-between gap-2">
                <Icon size={18} style={{ color: quad.color }} />
                <span className="font-serif text-4xl sm:text-5xl font-semibold leading-none tabular-nums" style={{ color: quad.color }}>
                  {quad.items.length}
                </span>
              </div>
              <p className="mt-3 font-semibold text-ink text-sm sm:text-base">{quad.label}</p>
              <p className="text-[11px] sm:text-xs text-muted">
                {quad.origin} · {quad.nature}
              </p>
            </button>
          );
        })}
      </div>

      <Divider />

      {/* Filtros */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">Explorar la matriz</h3>
            <p className="text-sm text-muted mt-1">
              <span className="text-bronze font-semibold tabular-nums">{total}</span> elementos visibles
            </p>
          </div>
          <SearchInput value={query} onChange={setQuery} placeholder="Buscar en la matriz FODA..." className="lg:max-w-sm" />
        </div>
        <TabBar tabs={tabs} active={quadrant} onChange={setQuadrant} layoutId="foda-cuadrantes" size="sm" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {actorOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActor(opt.id)}
                  aria-pressed={actor === opt.id}
                  className={cx(
                    'min-h-[40px] inline-flex items-center gap-2 rounded-full border px-4 text-xs sm:text-sm font-medium transition-all',
                    actor === opt.id
                      ? 'border-plum bg-plum text-white shadow-sm'
                      : 'border-lilac-line bg-white text-body hover:border-line-strong hover:text-plum'
                  )}
                >
                  <Icon size={14} /> {opt.label}
                </button>
              );
            })}
          </div>
          <div className="inline-flex self-start rounded-2xl border border-line bg-ivory p-1">
            {[
              { id: 'matriz', label: 'Matriz visual', icon: LayoutGrid },
              { id: 'tabla', label: 'Tabla 15', icon: Table2 },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setView(v.id)}
                  aria-pressed={view === v.id}
                  className={cx(
                    'min-h-[38px] inline-flex items-center gap-1.5 rounded-xl px-3.5 text-xs sm:text-sm font-medium transition-colors',
                    view === v.id ? 'bg-white text-plum shadow-sm border border-line' : 'text-muted hover:text-plum border border-transparent'
                  )}
                >
                  <Icon size={15} /> {v.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {total === 0 ? (
        <EmptyState title="Sin elementos" description="No hay elementos FODA que coincidan con los filtros seleccionados." />
      ) : (
        <AnimatePresence mode="wait">
          {view === 'matriz' ? (
            <motion.div key="matriz" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              {quadrant === 'all' && (
                <div className="hidden md:grid grid-cols-2 gap-4 mb-3 text-center text-[11px] uppercase tracking-[0.24em] text-muted font-semibold">
                  <span>Positivo · ayuda al logro</span>
                  <span>Negativo · dificulta el logro</span>
                </div>
              )}
              <motion.div initial="hidden" animate="show" variants={stagger} className={cx('grid grid-cols-1 gap-4 sm:gap-5', quadrant === 'all' && 'md:grid-cols-2')}>
                {['F', 'D', 'O', 'A']
                  .filter((id) => quadrant === 'all' || id === quadrant)
                  .map((id) => (
                    <QuadrantCard key={id} quadrant={quadrantOf(id)} items={filteredMap[id]} />
                  ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="tabla" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <FodaTable filteredMap={visibleMap} actor={actor} />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6">
        <div className="xl:col-span-5">
          <BalanceChart />
        </div>
        <GlassCard hover={false} className="xl:col-span-7">
          <div className="flex items-start gap-3 mb-6">
            <Crosshair size={20} className="shrink-0 mt-1 text-bronze" />
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">Cruces estratégicos</h3>
              <p className="text-sm text-muted mt-1">Lectura combinada de los cuadrantes que orienta las recomendaciones.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STRATEGIES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.id} className="rounded-2xl border border-line bg-ivory p-4 sm:p-5 hover:border-line-strong transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-2xl font-semibold text-bronze leading-none">{s.id}</span>
                    <Icon size={16} className="text-plum" />
                    <span className="text-sm font-semibold text-ink">{s.label}</span>
                  </div>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">{s.combo}</p>
                  <p className="mt-3 text-sm text-body leading-relaxed">{s.text}</p>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
