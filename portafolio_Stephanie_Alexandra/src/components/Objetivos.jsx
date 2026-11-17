import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  Crosshair,
  FolderOpen,
  ListTree,
  SearchCheck,
  NotebookPen,
  Lightbulb,
  Users,
  Wifi,
  Flame,
  HeartHandshake,
  School,
  MonitorSmartphone,
  Wrench,
  ClipboardList,
  Eye,
  MessagesSquare,
  ArrowRight,
  ChartPie,
  Layers,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { PageShell, GlassCard, SectionHeader, Badge, PlumBand, Button, DataTable, Divider } from './ui/Primitives';
import { cx, tone, fadeUp, stagger } from './ui/tokens';

/* =====================================================================
   OBJETIVOS · Portafolio, diagnóstico y 7 dimensiones analizadas
   ===================================================================== */

const PORTFOLIO_VERBS = [
  { id: 'documentar', verb: 'Documentar', icon: FolderOpen, text: 'Registro fotográfico y hojas de control de las 7 jornadas.', tab: 'practica', sub: 'evidencias', target: 'Evidencias' },
  { id: 'organizar', verb: 'Organizar', icon: ListTree, text: 'Cronograma de 18 actividades y plan de acción semanal.', tab: 'planificacion', sub: 'planeacion', target: 'Planeación' },
  { id: 'analizar', verb: 'Analizar', icon: SearchCheck, text: 'Resultados de los instrumentos y matriz FODA.', tab: 'planificacion', sub: 'diagnostico', target: 'Diagnóstico' },
  { id: 'reflexionar', verb: 'Reflexionar', icon: NotebookPen, text: 'Diario reflexivo: retos, aprendizajes y reflexión personal.', tab: 'evaluacion', sub: 'diario', target: 'Diario reflexivo' },
  { id: 'proponer', verb: 'Proponer mejoras', icon: Lightbulb, text: 'Propuesta de Micro aprendizaje Inclusivo y su recurso digital.', tab: 'cierre', sub: 'propuesta', target: 'Propuesta de mejora' },
];

const GENERAL_KEYS = [
  { label: 'Condiciones institucionales', icon: School },
  { label: 'Condiciones tecnológicas', icon: MonitorSmartphone },
  { label: 'Condiciones pedagógicas', icon: HeartHandshake },
  { label: 'Características de los estudiantes', icon: Users },
];

const INSTRUMENTS = {
  cuestionario: { label: 'Cuestionario a estudiantes', icon: ClipboardList, toneName: 'violet' },
  observacion: { label: 'Guía de observación', icon: Eye, toneName: 'amber' },
  tutor: { label: 'Entrevista al docente tutor', icon: MessagesSquare, toneName: 'emerald' },
  coordinador: { label: 'Entrevista al coordinador', icon: MessagesSquare, toneName: 'indigo' },
};

const SPECIFIC = [
  {
    id: 'oe1',
    n: 1,
    verb: 'Identificar',
    toneName: 'violet',
    text: 'Identificar características, fortalezas, intereses, dificultades, necesidades y formas de participación de los estudiantes.',
    dims: ['estudiantes', 'motivacion', 'necesidades'],
  },
  {
    id: 'oe2',
    n: 2,
    verb: 'Conocer',
    toneName: 'amber',
    text: 'Conocer condiciones de acceso a dispositivos, Internet y herramientas digitales, y su utilización en el aprendizaje.',
    dims: ['internet', 'herramientas'],
  },
  {
    id: 'oe3',
    n: 3,
    verb: 'Describir',
    toneName: 'emerald',
    text: 'Describir condiciones del acompañamiento docente y las necesidades de apoyo.',
    dims: ['apoyo', 'institucional'],
  },
];

const DIMENSIONS = [
  {
    id: 'estudiantes',
    n: 1,
    label: 'Características de estudiantes',
    icon: Users,
    toneName: 'violet',
    focus: 'Edad, sexo, situación laboral y familiar, autonomía y formas de participación del grupo.',
    data: [
      { value: '81.8%', label: 'tiene 19 años o más' },
      { value: '54.5 / 45.5', label: 'masculino / femenino (%)' },
      { value: 'Mayoría', label: 'trabaja durante la semana' },
    ],
    instruments: ['cuestionario', 'observacion', 'coordinador'],
  },
  {
    id: 'internet',
    n: 2,
    label: 'Accesibilidad a Internet',
    icon: Wifi,
    toneName: 'indigo',
    focus: 'Conectividad en el hogar y calidad del acceso al estudiar o subir tareas.',
    data: [
      { value: '72.7%', label: 'cuenta con Internet en casa' },
      { value: '18.2%', label: 'tiene señal inestable' },
      { value: '9.1%', label: 'no tiene acceso' },
    ],
    instruments: ['cuestionario'],
  },
  {
    id: 'motivacion',
    n: 3,
    label: 'Motivación',
    icon: Flame,
    toneName: 'amber',
    focus: 'Disposición para continuar los estudios en la modalidad y razones que la sostienen.',
    data: [
      { value: '90.9%', label: 'se siente motivado o bastante motivado' },
      { value: 'Superación', label: 'personal como motor principal' },
    ],
    instruments: ['cuestionario', 'coordinador'],
  },
  {
    id: 'apoyo',
    n: 4,
    label: 'Apoyo docente',
    icon: HeartHandshake,
    toneName: 'emerald',
    focus: 'Claridad de las instrucciones, disponibilidad del docente y estrategias de retroalimentación.',
    data: [
      { value: '90.9%', label: 'percibe instrucciones claras' },
      { value: '90.9%', label: 'siente disponibilidad del docente' },
    ],
    instruments: ['cuestionario', 'tutor', 'observacion'],
  },
  {
    id: 'institucional',
    n: 5,
    label: 'Entorno institucional',
    icon: School,
    toneName: 'slate',
    focus: 'Organización de la modalidad, horarios, infraestructura y apoyos institucionales.',
    data: [
      { value: 'Sábados', label: '7:00 a.m. – 5:00 p.m.' },
      { value: 'WhatsApp', label: 'para consultas entre semana' },
      { value: '6', label: 'tipos de espacios y apoyos institucionales' },
    ],
    instruments: ['coordinador', 'observacion'],
  },
  {
    id: 'herramientas',
    n: 6,
    label: 'Herramientas tecnológicas',
    icon: MonitorSmartphone,
    toneName: 'rose',
    focus: 'Dispositivos, plataformas y equipamiento disponibles para aprender y enseñar.',
    data: [
      { value: '90.9%', label: 'recurre a Classroom o Moodle' },
      { value: '30', label: 'computadoras en el laboratorio' },
      { value: '27.3%', label: 'depende del smartphone' },
    ],
    instruments: ['cuestionario', 'tutor', 'coordinador'],
  },
  {
    id: 'necesidades',
    n: 7,
    label: 'Necesidades / mejoras',
    icon: Wrench,
    toneName: 'violet',
    focus: 'Aspectos que el estudiantado, el docente tutor y el coordinador señalan como prioritarios.',
    data: [
      { value: 'Lectoescritura', label: 'refuerzo necesario' },
      { value: 'Uso de PC', label: 'formación en informática' },
    ],
    instruments: ['cuestionario', 'tutor', 'coordinador'],
  },
];

const objectiveOf = (dimId) => SPECIFIC.find((o) => o.dims.includes(dimId));

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function PortfolioObjective({ onNavigate }) {
  const [hovered, setHovered] = useState(null);
  return (
    <GlassCard hover={false} padded={false} className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 bg-silk border-b lg:border-b-0 lg:border-r border-line">
          <Badge toneName="amber" icon={Target}>
            Objetivo pedagógico del portafolio
          </Badge>
          <p className="mt-5 font-serif text-2xl sm:text-3xl leading-snug text-ink">
            <span className="text-plum font-semibold">Documentar</span>, <span className="text-plum font-semibold">organizar</span> y{' '}
            <span className="text-plum font-semibold">analizar</span> las experiencias de la práctica docente,{' '}
            <span className="italic">reflexionar</span> sobre ellas y <span className="italic">proponer mejoras</span>.
          </p>
          <p className="mt-5 text-sm text-muted leading-relaxed">
            Cada acción del objetivo se materializa en una sección de este portafolio. Selecciono una para recorrerla.
          </p>
        </div>
        <div className="lg:col-span-7 p-4 sm:p-6 md:p-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PORTFOLIO_VERBS.map((v, i) => {
              const VIcon = v.icon;
              const isHover = hovered === v.id;
              return (
                <li key={v.id} className={cx(i === PORTFOLIO_VERBS.length - 1 && 'sm:col-span-2')}>
                  <button
                    type="button"
                    onMouseEnter={() => setHovered(v.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(v.id)}
                    onBlur={() => setHovered(null)}
                    onClick={() => onNavigate?.(v.tab, v.sub)}
                    className={cx(
                      'group w-full h-full text-left rounded-2xl border p-4 transition-all duration-300',
                      isHover ? 'border-plum bg-lilac shadow-paper-lg' : 'border-line bg-white shadow-paper'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={cx(
                          'shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors',
                          isHover ? 'bg-plum border-plum text-white' : 'bg-lilac border-lilac-line text-plum'
                        )}
                      >
                        <VIcon size={18} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-ink">{v.verb}</span>
                        <span className="block text-xs sm:text-sm text-muted leading-snug mt-0.5">{v.text}</span>
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-plum">
                          {v.target} <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </GlassCard>
  );
}

function SpecificObjectives({ selected, onSelect }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={stagger}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {SPECIFIC.map((o) => {
        const t = tone(o.toneName);
        const isActive = selected === o.id;
        return (
          <motion.button
            key={o.id}
            type="button"
            variants={fadeUp}
            onClick={() => onSelect(isActive ? null : o.id)}
            aria-pressed={isActive}
            className={cx(
              'relative text-left rounded-3xl border bg-white p-5 sm:p-6 transition-all duration-300 overflow-hidden',
              isActive ? 'border-plum shadow-paper-lg' : 'border-line shadow-paper hover:border-line-strong hover:shadow-paper-lg'
            )}
          >
            <span className={cx('absolute inset-x-0 top-0 h-1', t.fill)} />
            <div className="flex items-center justify-between gap-3">
              <span className="font-serif text-4xl font-semibold text-bronze leading-none">0{o.n}</span>
              <Badge toneName={o.toneName}>{o.verb}</Badge>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-body">{o.text}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {o.dims.map((d) => {
                const dim = DIMENSIONS.find((x) => x.id === d);
                return (
                  <span key={d} className="rounded-full border border-line bg-ivory px-2.5 py-1 text-[11px] font-medium text-body">
                    {dim.n}. {dim.label}
                  </span>
                );
              })}
            </div>
            <span className={cx('mt-4 inline-flex items-center gap-1.5 text-xs font-semibold', isActive ? 'text-plum' : 'text-muted')}>
              <CheckCircle2 size={14} /> {isActive ? 'Dimensiones resaltadas abajo' : 'Resaltar sus dimensiones'}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

function DimensionsPanel({ highlightObjective }) {
  const [active, setActive] = useState(DIMENSIONS[0].id);
  const current = DIMENSIONS.find((d) => d.id === active) || DIMENSIONS[0];
  const t = tone(current.toneName);
  const CIcon = current.icon;
  const objective = objectiveOf(current.id);
  const highlighted = highlightObjective ? SPECIFIC.find((o) => o.id === highlightObjective)?.dims || [] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Lista de dimensiones */}
      <div className="lg:col-span-5">
        <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 lg:pb-0" role="tablist" aria-label="Dimensiones analizadas">
          {DIMENSIONS.map((d) => {
            const DIcon = d.icon;
            const isActive = d.id === active;
            const isHighlighted = highlighted.includes(d.id);
            return (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(d.id)}
                className={cx(
                  'snap-start shrink-0 lg:shrink min-h-[52px] flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all duration-300',
                  isActive
                    ? 'border-plum bg-plum text-white shadow-paper-lg'
                    : isHighlighted
                      ? 'border-bronze bg-sand text-ink'
                      : 'border-line bg-white text-body hover:border-line-strong shadow-paper'
                )}
              >
                <span className={cx('font-serif text-xl font-semibold w-6 text-center', isActive ? 'text-[#E5D5B5]' : 'text-bronze')}>{d.n}</span>
                <DIcon size={17} className={cx('shrink-0', isActive ? 'text-white' : 'text-plum')} />
                <span className="text-sm font-semibold whitespace-nowrap lg:whitespace-normal">{d.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detalle */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.div key={current.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.3 }}>
            <GlassCard hover={false} className="h-full">
              <div className="flex items-start gap-4">
                <span className={cx('shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl border', t.bg, t.border, t.text)}>
                  <CIcon size={24} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">Dimensión {current.n} de 7</p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight mt-1">{current.label}</h3>
                </div>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-body">{current.focus}</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {current.data.map((d) => (
                  <div key={d.label} className="rounded-2xl border border-line bg-ivory p-4">
                    <span className={cx('block font-serif text-2xl font-semibold leading-none', t.strong)}>{d.value}</span>
                    <span className="block mt-1.5 text-xs text-muted leading-snug">{d.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted font-semibold mb-2.5">Instrumentos que la abordan</p>
                <div className="flex flex-wrap gap-2">
                  {current.instruments.map((key) => {
                    const ins = INSTRUMENTS[key];
                    return (
                      <Badge key={key} toneName={ins.toneName} icon={ins.icon}>
                        {ins.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {objective && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-sand-line bg-sand p-4">
                  <Crosshair size={17} className="shrink-0 mt-0.5 text-bronze" />
                  <p className="text-sm text-body leading-relaxed">
                    <span className="font-semibold text-bronze-dark">Objetivo específico {objective.n}: </span>
                    {objective.text}
                  </p>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const MATRIX_COLUMNS = [
  {
    key: 'dimension',
    label: 'Dimensión',
    className: 'w-[22%]',
    render: (r) => (
      <span className="font-semibold text-ink">
        {r.n}. {r.label}
      </span>
    ),
  },
  { key: 'objetivo', label: 'Objetivo específico', className: 'w-[14%]', render: (r) => <Badge toneName={objectiveOf(r.id).toneName}>OE {objectiveOf(r.id).n}</Badge> },
  {
    key: 'instrumentos',
    label: 'Instrumentos',
    className: 'w-[32%]',
    render: (r) => (
      <div className="flex flex-wrap gap-1.5">
        {r.instruments.map((k) => (
          <span key={k} className="rounded-full border border-line bg-ivory px-2 py-0.5 text-[11px] text-body">
            {INSTRUMENTS[k].label}
          </span>
        ))}
      </div>
    ),
  },
  {
    key: 'dato',
    label: 'Dato clave',
    render: (r) => (
      <span>
        <span className="font-semibold text-plum">{r.data[0].value}</span> {r.data[0].label}
      </span>
    ),
  },
];

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Objetivos({ onNavigate }) {
  const [selectedObjective, setSelectedObjective] = useState(null);

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Propósitos"
        icon={Target}
        title="Objetivos del portafolio y del"
        highlight="diagnóstico"
        description="Los propósitos que orientaron mi práctica: desde la documentación del proceso hasta el análisis del ambiente educativo del grupo de Primer Año de Bachillerato."
      />

      <PortfolioObjective onNavigate={onNavigate} />

      {/* Objetivo general */}
      <PlumBand>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div variants={fadeUp} className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5D5B5]/50 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[#E5D5B5] font-semibold">
              <Crosshair size={14} /> Objetivo general del diagnóstico
            </span>
            <p className="font-serif text-xl sm:text-2xl md:text-[1.75rem] leading-snug text-on-plum">
              Analizar el ambiente educativo de los estudiantes de primer año de Bachillerato del Instituto Nacional Dr. Francisco Martínez Suárez, en modalidad
              a distancia, considerando condiciones institucionales, tecnológicas, pedagógicas y características de los estudiantes para identificar{' '}
              <span className="italic text-[#E5D5B5]">fortalezas, necesidades y barreras</span>.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="lg:col-span-5 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-on-plum-muted font-semibold">Condiciones consideradas</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {GENERAL_KEYS.map((k) => {
                const KIcon = k.icon;
                return (
                  <li key={k.label} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                    <KIcon size={17} className="shrink-0 text-[#E5D5B5]" />
                    <span className="text-sm text-on-plum">{k.label}</span>
                  </li>
                );
              })}
            </ul>
            <div className="grid grid-cols-3 gap-2 pt-2">
              {['Fortalezas', 'Necesidades', 'Barreras'].map((w) => (
                <span key={w} className="rounded-xl border border-[#E5D5B5]/40 bg-[#E5D5B5]/10 px-2 py-2 text-center text-xs font-semibold text-[#F7F1E5]">
                  {w}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </PlumBand>

      {/* Objetivos específicos */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Layers size={20} className="text-bronze" />
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">Objetivos específicos</h3>
        </div>
        <SpecificObjectives selected={selectedObjective} onSelect={setSelectedObjective} />
      </section>

      <Divider />

      {/* Panel de 7 dimensiones */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Panel interactivo"
          icon={Compass}
          title="7 dimensiones"
          highlight="analizadas"
          description="Selecciono cada dimensión para ver qué se estudió, el dato clave que arrojó el diagnóstico, los instrumentos que la abordaron y el objetivo específico al que responde."
        />
        {selectedObjective && (
          <div className="flex flex-wrap items-center gap-2 text-sm text-body">
            <span className="h-3 w-3 rounded-[4px] bg-bronze" />
            Dimensiones del objetivo específico {SPECIFIC.find((o) => o.id === selectedObjective)?.n} resaltadas.
            <button type="button" onClick={() => setSelectedObjective(null)} className="font-semibold text-plum underline-offset-4 hover:underline">
              Quitar resaltado
            </button>
          </div>
        )}
        <DimensionsPanel highlightObjective={selectedObjective} />
      </section>

      {/* Matriz de alineación */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <ListTree size={20} className="text-bronze" />
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">Matriz de alineación</h3>
        </div>
        <DataTable
          columns={MATRIX_COLUMNS}
          rows={DIMENSIONS}
          rowKey="id"
          minWidth={760}
          renderCard={(r) => {
            const DIcon = r.icon;
            const o = objectiveOf(r.id);
            return (
              <div className="rounded-2xl border border-line bg-white shadow-paper p-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 font-semibold text-ink text-sm">
                    <DIcon size={16} className="text-plum" /> {r.n}. {r.label}
                  </span>
                  <Badge toneName={o.toneName}>OE {o.n}</Badge>
                </div>
                <p className="text-sm text-body">
                  <span className="font-semibold text-plum">{r.data[0].value}</span> {r.data[0].label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {r.instruments.map((k) => (
                    <span key={k} className="rounded-full border border-line bg-ivory px-2 py-0.5 text-[11px] text-body">
                      {INSTRUMENTS[k].label}
                    </span>
                  ))}
                </div>
              </div>
            );
          }}
        />
      </section>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-3xl border border-line bg-white shadow-paper p-5 sm:p-6">
        <p className="text-sm sm:text-base text-body">
          Los resultados completos de cada instrumento, la matriz FODA y la triangulación se encuentran en el diagnóstico educativo.
        </p>
        <Button icon={ChartPie} iconRight={ArrowRight} onClick={() => onNavigate?.('planificacion', 'diagnostico')} className="shrink-0">
          Ver diagnóstico
        </Button>
      </div>
    </PageShell>
  );
}
