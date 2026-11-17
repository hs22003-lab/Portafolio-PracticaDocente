import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flag,
  GitMerge,
  ClipboardList,
  GraduationCap,
  UserCog,
  Eye,
  CircleCheck,
  CircleDot,
  CircleAlert,
  Minus,
  ShieldCheck,
  TriangleAlert,
  Layers,
  Sparkles,
  ChevronDown,
  Users,
  Wifi,
  HeartHandshake,
  Shapes,
  Smartphone,
  BookOpen,
  CalendarClock,
  Lightbulb,
  ArrowRight,
  CalendarRange,
  Grid2x2,
  Target,
} from 'lucide-react';
import { GlassCard, SectionHeader, Badge, ProgressBar, Divider } from '../ui/Primitives';
import { cx, fadeUp, stagger } from '../ui/tokens';

/* =====================================================================
   CONCLUSIONES Y RECOMENDACIONES DEL DIAGNÓSTICO
   ===================================================================== */

const INSTRUMENTS = [
  { id: 'enc', label: 'Encuesta a estudiantes', shortLabel: 'Encuesta', icon: ClipboardList, meta: 'N = 11 · 13 preguntas' },
  { id: 'tut', label: 'Entrevista al tutor', shortLabel: 'Tutor', icon: GraduationCap, meta: '10 preguntas' },
  { id: 'coo', label: 'Entrevista al coordinador', shortLabel: 'Coordinador', icon: UserCog, meta: '10 preguntas' },
  { id: 'obs', label: 'Guía de observación', shortLabel: 'Observación', icon: Eye, meta: '20 indicadores' },
];

const STATUS = {
  converge: { label: 'Converge', icon: CircleCheck, color: '#2F6B50' },
  partial: { label: 'Parcial', icon: CircleDot, color: '#8C6D3F' },
  contrast: { label: 'Contrasta', icon: CircleAlert, color: '#8A3557' },
  none: { label: 'Sin evidencia', icon: Minus, color: '#6E5A85' },
};

const FINDINGS = [
  {
    id: 'motivacion',
    kind: 'fortaleza',
    title: 'Alta motivación y compromiso',
    evidence: {
      enc: { status: 'converge', text: '90.9% motivado o bastante motivado (P7)' },
      tut: { status: 'converge', text: 'Madurez y responsabilidad del grupo (P1)' },
      coo: { status: 'converge', text: 'Motivados por superación personal y laboral (P3)' },
      obs: { status: 'partial', text: 'Participan siempre; iniciativa solo algunas veces' },
    },
  },
  {
    id: 'autonomia',
    kind: 'fortaleza',
    title: 'Autonomía en el estudio',
    evidence: {
      enc: { status: 'converge', text: '81.9% estudia por su cuenta (P4)' },
      tut: { status: 'converge', text: 'Tareas entre semana presentadas el sábado (P4)' },
      coo: { status: 'partial', text: 'Trabajo independiente con consultas por WhatsApp (P2)' },
      obs: { status: 'partial', text: 'Iniciativa propia: algunas veces (indicador 5)' },
    },
  },
  {
    id: 'eva',
    kind: 'fortaleza',
    title: 'Dominio de plataformas EVA',
    evidence: {
      enc: { status: 'converge', text: '90.9% usa Classroom o Moodle (P12)' },
      tut: { status: 'converge', text: 'Actividades en plataformas para la clase (P7)' },
      coo: { status: 'partial', text: 'Tutores dispuestos a incorporar lo digital (P9)' },
      obs: { status: 'converge', text: 'Plataformas integradas siempre (indicador 15)' },
    },
  },
  {
    id: 'apoyo',
    kind: 'fortaleza',
    title: 'Acompañamiento docente cercano',
    evidence: {
      enc: { status: 'converge', text: '90.9% instrucciones claras y apoyo disponible (P10, P11)' },
      tut: { status: 'converge', text: 'Autoevaluación y preguntas dirigidas (P6)' },
      coo: { status: 'partial', text: 'Tutorías docentes como apoyo (P5)' },
      obs: { status: 'converge', text: 'Interacción docente-estudiante: siempre (dimensión 4)' },
    },
  },
  {
    id: 'conectividad',
    kind: 'brecha',
    title: 'Brecha de conectividad en el hogar',
    evidence: {
      enc: { status: 'converge', text: '27.3% inestable o sin acceso; 45.5% red limitada (P3, P9)' },
      tut: { status: 'none', text: 'No se menciona de forma directa' },
      coo: { status: 'contrast', text: 'Red institucional del MINED funcional (P7)' },
      obs: { status: 'contrast', text: 'Internet disponible en el aula (indicador 10)' },
    },
  },
  {
    id: 'competencias',
    kind: 'brecha',
    title: 'Manejo básico de computadoras',
    evidence: {
      enc: { status: 'partial', text: '27.3% depende solo del smartphone (P8)' },
      tut: { status: 'converge', text: 'Poco manejo; uso de tecnología solo en clase (P2, P8, P9)' },
      coo: { status: 'converge', text: 'A muchos se les dificulta usar una computadora (P10)' },
      obs: { status: 'none', text: 'No se registró en los indicadores' },
    },
  },
  {
    id: 'tiempo',
    kind: 'brecha',
    title: 'Tiempo limitado por trabajo y familia',
    evidence: {
      enc: { status: 'converge', text: 'Piden dosificar tareas y ajustar entregas (P13)' },
      tut: { status: 'converge', text: 'La mayoría del grupo trabaja (P1)' },
      coo: { status: 'converge', text: 'Trabajo, cuidado de hijos y transporte (P3, P4)' },
      obs: { status: 'none', text: 'No observable durante la sesión' },
    },
  },
  {
    id: 'participacion',
    kind: 'brecha',
    title: 'Participación desigual en el grupo',
    evidence: {
      enc: { status: 'converge', text: '36.4% participa solo a veces (P5)' },
      tut: { status: 'partial', text: 'Preguntas a quienes no ponen atención (P6)' },
      coo: { status: 'none', text: 'No se menciona de forma directa' },
      obs: { status: 'partial', text: 'Respeto entre pares: algunas veces (indicador 20)' },
    },
  },
];

const STRENGTHS = [
  { label: 'Motivación para continuar sus estudios', value: 90.9 },
  { label: 'Uso de Classroom o Moodle', value: 90.9 },
  { label: 'Disponibilidad del docente', value: 90.9 },
  { label: 'Autonomía en el estudio', value: 81.9 },
];

const GAPS = [
  { label: 'Red limitada o insuficiente al subir tareas', value: 45.5 },
  { label: 'Participa solo algunas veces', value: 36.4 },
  { label: 'Internet inestable o sin acceso en casa', value: 27.3 },
  { label: 'Depende exclusivamente del smartphone', value: 27.3 },
];

const SYNTHESIS = [
  'Al cruzar el cuestionario a estudiantes, las entrevistas al tutor y al coordinador y la guía de observación, emerge un perfil coherente: un grupo adulto, con alta motivación (90.9%) y autonomía (81.9%), que ya utiliza las plataformas educativas (90.9% Classroom/Moodle) y que percibe un acompañamiento docente cercano. Los cuatro instrumentos convergen en estas fortalezas.',
  'Frente a ellas aparecen tensiones que también se confirman desde varias fuentes: la conectividad del hogar es desigual (27.3% sin conexión estable y 45.5% con red limitada al subir tareas), el manejo básico de computadoras es una dificultad señalada por el tutor y el coordinador, y la jornada laboral y familiar reduce el tiempo disponible, como lo expresan los propios estudiantes al pedir dosificar tareas.',
  'Destaca un contraste relevante: la institución cuenta con Internet y equipos funcionales, por lo que la brecha no es de acceso en el centro, sino de conectividad en el hogar y de competencias de uso. Esta lectura orienta las recomendaciones hacia recursos móviles y ligeros, alfabetización digital gradual y una planificación realista del tiempo.',
];

const CONCLUSIONS = [
  {
    n: 1,
    icon: Users,
    title: 'Características, motivación y autonomía',
    text: 'Los estudiantes de 1.° Año de Bachillerato presentan particularidades por su edad adulta y sus responsabilidades laborales y familiares, pero muestran alta motivación (90.9%) y autonomía (81.9%), fortalezas clave para la práctica docente.',
    metrics: [
      { v: '90.9%', l: 'Motivación' },
      { v: '81.9%', l: 'Autonomía' },
      { v: '81.8%', l: '19 años o más' },
    ],
  },
  {
    n: 2,
    icon: Wifi,
    title: 'Acceso tecnológico frente a la brecha de conectividad y habilidades',
    text: 'La mayoría cuenta con computadora (72.7%), Internet (72.7%) y experiencia en plataformas educativas (90.9%), pero existen diferencias en la calidad de la conexión y dificultades en el manejo de herramientas tecnológicas, lo que exige planificar recursos digitales adaptativos.',
    metrics: [
      { v: '72.7%', l: 'Usa computadora' },
      { v: '72.7%', l: 'Internet en casa' },
      { v: '90.9%', l: 'Usa EVA' },
    ],
  },
  {
    n: 3,
    icon: HeartHandshake,
    title: 'Acompañamiento docente y necesidades pedagógicas',
    text: 'El acompañamiento docente es una de las mayores fortalezas (90.9% percibe instrucciones claras y disponibilidad de apoyo), pero persisten necesidades en participación constante, lectura, escritura y uso de tecnología que requieren estrategias variadas e inclusivas.',
    metrics: [
      { v: '90.9%', l: 'Instrucciones claras' },
      { v: '90.9%', l: 'Docente disponible' },
      { v: '36.4%', l: 'Participa a veces' },
    ],
  },
];

const RECOMMENDATIONS = [
  {
    n: 1,
    icon: Shapes,
    title: 'Actividades variadas y participativas',
    text: 'Implementar trabajos en equipo, dinámicas, videos explicativos y ejercicios prácticos para elevar la participación del 36.4% que interviene menos y atender distintos estilos de aprendizaje.',
    target: '36.4% participa solo a veces',
    actions: [
      'Alternar videos breves, dinámicas gamificadas y trabajo colaborativo en cada tutoría.',
      'Asignar roles rotativos en los equipos para que todos intervengan.',
      'Cerrar cada sesión con una actividad práctica vinculada al contenido.',
    ],
  },
  {
    n: 2,
    icon: Smartphone,
    title: 'Materiales digitales accesibles (Mobile-First)',
    text: 'Diseñar actividades y materiales digitales accesibles tanto desde computadora como desde teléfono celular, procurando que puedan trabajarse con poca conexión o en modo offline.',
    target: '27.3% depende del smartphone',
    actions: [
      'Preparar PDF ligeros y guías legibles en pantallas pequeñas.',
      'Ofrecer versiones descargables de los recursos publicados en Classroom.',
      'Evitar actividades que dependan de conexión continua o de software de escritorio.',
    ],
  },
  {
    n: 3,
    icon: BookOpen,
    title: 'Lectura, escritura y competencias tecnológicas',
    text: 'Incorporar gradualmente actividades que fortalezcan la lectura, la escritura y el manejo de herramientas tecnológicas, con instrucciones paso a paso y acompañamiento cercano.',
    target: 'Brecha de competencias digitales',
    actions: [
      'Integrar lecturas breves con preguntas guía y producción escrita corta.',
      'Usar el laboratorio de informática para prácticas guiadas de documentos y presentaciones.',
      'Elaborar tutoriales visuales paso a paso para cada herramienta nueva.',
    ],
  },
  {
    n: 4,
    icon: CalendarClock,
    title: 'Planificación realista del tiempo',
    text: 'Organizar las actividades académicas considerando las responsabilidades laborales y familiares del grupo, estableciendo tareas realistas, tiempos adecuados de entrega y priorizando actividades de alto valor formativo.',
    target: 'Jornada laboral y familiar',
    actions: [
      'Dosificar las tareas semanales y comunicar con anticipación las fechas de entrega.',
      'Priorizar actividades integradoras en lugar de muchas tareas pequeñas.',
      'Ofrecer márgenes de entrega flexibles ante situaciones laborales o familiares.',
    ],
  },
];

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function StatusPill({ status, text, dim }) {
  const S = STATUS[status];
  const Icon = S.icon;
  return (
    <div className={cx('flex items-start gap-2 transition-opacity duration-300', dim && 'opacity-30')}>
      <Icon size={16} className="shrink-0 mt-0.5" style={{ color: S.color }} />
      <span className={cx('text-xs sm:text-[13px] leading-snug', status === 'none' ? 'text-muted italic' : 'text-body')}>{text}</span>
    </div>
  );
}

function TriangulationMatrix() {
  const [instrument, setInstrument] = useState('all');
  const [kind, setKind] = useState('all');

  const rows = useMemo(() => FINDINGS.filter((f) => kind === 'all' || f.kind === kind), [kind]);

  const convergenceOf = (f) => INSTRUMENTS.filter((i) => f.evidence[i.id].status === 'converge').length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Todos los hallazgos', icon: Layers },
            { id: 'fortaleza', label: 'Fortalezas', icon: ShieldCheck },
            { id: 'brecha', label: 'Brechas', icon: TriangleAlert },
          ].map((k) => {
            const Icon = k.icon;
            return (
              <button
                key={k.id}
                type="button"
                onClick={() => setKind(k.id)}
                aria-pressed={kind === k.id}
                className={cx(
                  'min-h-[40px] inline-flex items-center gap-2 rounded-full border px-4 text-xs sm:text-sm font-medium transition-all',
                  kind === k.id
                    ? 'border-plum bg-plum text-white shadow-sm'
                    : 'border-lilac-line bg-white text-body hover:border-line-strong hover:text-plum'
                )}
              >
                <Icon size={14} /> {k.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {Object.entries(STATUS).map(([key, s]) => {
            const Icon = s.icon;
            return (
              <span key={key} className="inline-flex items-center gap-1.5 text-xs text-muted">
                <Icon size={13} style={{ color: s.color }} /> {s.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Selector de instrumento para resaltar columna */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {INSTRUMENTS.map((ins) => {
          const Icon = ins.icon;
          const active = instrument === ins.id;
          return (
            <button
              key={ins.id}
              type="button"
              onClick={() => setInstrument(active ? 'all' : ins.id)}
              aria-pressed={active}
              className={cx(
                'flex items-center gap-3 rounded-2xl border p-3 sm:p-4 text-left transition-all',
                active ? 'border-plum bg-lilac' : 'border-line bg-ivory hover:border-line-strong'
              )}
            >
              <span
                className={cx(
                  'shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl border',
                  active ? 'bg-plum border-plum text-white' : 'bg-lilac border-line text-plum'
                )}
              >
                <Icon size={16} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink leading-tight">{ins.shortLabel}</span>
                <span className="block text-[11px] text-muted">{ins.meta}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Móvil: tarjetas */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {rows.map((f) => (
          <div key={f.id} className="rounded-3xl border border-line bg-ivory p-4 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-semibold text-ink leading-snug">{f.title}</h4>
              <Badge toneName={f.kind === 'fortaleza' ? 'emerald' : 'rose'}>{f.kind === 'fortaleza' ? 'Fortaleza' : 'Brecha'}</Badge>
            </div>
            <div className="space-y-3">
              {INSTRUMENTS.map((ins) => (
                <div key={ins.id} className="rounded-xl bg-white border border-line p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold mb-1.5">{ins.shortLabel}</p>
                  <StatusPill {...f.evidence[ins.id]} dim={instrument !== 'all' && instrument !== ins.id} />
                </div>
              ))}
            </div>
            <p className="text-xs text-bronze">
              Convergencia: <span className="font-semibold tabular-nums">{convergenceOf(f)}</span> de 4 instrumentos
            </p>
          </div>
        ))}
      </div>

      {/* Escritorio: tabla editorial */}
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-line bg-ivory">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="bg-silk text-left text-[11px] uppercase tracking-[0.16em] text-muted">
              <th className="px-4 py-4 font-semibold w-52">Hallazgo</th>
              {INSTRUMENTS.map((ins) => (
                <th
                  key={ins.id}
                  className={cx('px-4 py-4 font-semibold transition-colors', instrument === ins.id && 'text-plum bg-sand')}
                >
                  {ins.shortLabel}
                </th>
              ))}
              <th className="px-4 py-4 font-semibold text-center w-28">Convergencia</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => {
              const conv = convergenceOf(f);
              return (
                <tr key={f.id} className="align-top border-t border-line hover:bg-ivory transition-colors">
                  <td className="px-4 py-4">
                    <span className="block font-semibold text-ink leading-snug">{f.title}</span>
                    <span className="mt-2 inline-block">
                      <Badge toneName={f.kind === 'fortaleza' ? 'emerald' : 'rose'}>{f.kind === 'fortaleza' ? 'Fortaleza' : 'Brecha'}</Badge>
                    </span>
                  </td>
                  {INSTRUMENTS.map((ins) => (
                    <td key={ins.id} className={cx('px-4 py-4 transition-colors', instrument === ins.id && 'bg-sand')}>
                      <StatusPill {...f.evidence[ins.id]} dim={instrument !== 'all' && instrument !== ins.id} />
                    </td>
                  ))}
                  <td className="px-4 py-4">
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-serif text-2xl font-semibold text-plum tabular-nums leading-none">{conv}/4</span>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3].map((i) => (
                          <span key={i} className={cx('h-1.5 w-4 rounded-full', i < conv ? 'bg-sage' : 'bg-silk-deep')} />
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ConclusionCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.article variants={fadeUp} className="h-full">
      <GlassCard className="h-full flex flex-col" padded={false}>
        <div className="p-5 sm:p-7 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <span className="font-serif text-6xl sm:text-7xl font-semibold leading-none text-bronze">{String(item.n).padStart(2, '0')}</span>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-lilac border border-line text-plum">
              <Icon size={20} />
            </span>
          </div>
          <h4 className="mt-5 font-serif text-2xl font-semibold text-ink leading-snug">{item.title}</h4>
          <p className="mt-3 text-sm sm:text-[15px] text-body leading-relaxed flex-1">{item.text}</p>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {item.metrics.map((m, i) => (
              <motion.div
                key={m.l}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + i * 0.08 }}
                className="rounded-2xl border border-line bg-ivory p-2.5 sm:p-3 text-center"
              >
                <span className="block font-serif text-lg sm:text-2xl font-semibold text-plum tabular-nums leading-none">{m.v}</span>
                <span className="block mt-1.5 text-[10px] sm:text-[11px] text-muted leading-tight">{m.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
}

function RecommendationCard({ item, open, onToggle }) {
  const Icon = item.icon;
  return (
    <motion.div variants={fadeUp} layout>
      <div
        className={cx(
          'rounded-3xl border transition-colors duration-300 overflow-hidden',
          open ? 'border-sand-line bg-white' : 'border-line bg-white hover:border-line-strong'
        )}
      >
        <button type="button" onClick={onToggle} aria-expanded={open} className="w-full flex items-start gap-4 p-5 sm:p-6 text-left">
          <span className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sand border border-sand-line text-bronze">
            <Icon size={22} />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">Recomendación {item.n}</span>
            <span className="block font-serif text-xl sm:text-2xl font-semibold text-ink leading-snug mt-0.5">{item.title}</span>
            <span className="block mt-2 text-sm text-body leading-relaxed">{item.text}</span>
          </span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 mt-1 text-bronze">
            <ChevronDown size={20} />
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
              <div className="px-5 sm:px-6 pb-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8 rounded-2xl border border-line bg-ivory p-4 sm:p-5">
                  <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold mb-3">
                    <Lightbulb size={14} /> Acciones sugeridas
                  </p>
                  <ul className="space-y-2.5">
                    {item.actions.map((a) => (
                      <li key={a} className="flex gap-2.5 text-sm text-body leading-relaxed">
                        <CircleCheck size={16} className="shrink-0 mt-0.5 text-sage" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-4 rounded-2xl border border-line bg-lilac p-4 sm:p-5">
                  <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-plum font-semibold mb-2">
                    <Target size={14} /> Responde a
                  </p>
                  <p className="font-serif text-xl font-semibold text-ink leading-snug">{item.target}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Conclusiones({ onNavigate, onSelectSection }) {
  const [openRec, setOpenRec] = useState(1);

  return (
    <div className="space-y-12 sm:space-y-16">
      <SectionHeader
        eyebrow="Sección 6 · Cierre del diagnóstico"
        icon={Flag}
        title="Conclusiones y"
        highlight="recomendaciones"
        description="La triangulación de los cuatro instrumentos permite pasar de los datos a decisiones pedagógicas: qué fortalezas aprovechar, qué brechas atender y cómo orientar la propuesta de mejora."
      />

      {/* 6.3 Triangulación */}
      <section className="space-y-8">
        <div className="flex items-start gap-3">
          <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sand border border-sand-line text-bronze">
            <GitMerge size={19} />
          </span>
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">6.3</span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-ink leading-tight">
              Interpretación general y <span className="italic text-plum">triangulación</span>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <GlassCard hover={false} className="lg:col-span-7 space-y-4">
            {SYNTHESIS.map((p, i) => (
              <p
                key={p.slice(0, 24)}
                className={cx(
                  'leading-relaxed',
                  i === 0 ? 'font-serif text-lg sm:text-xl text-body' : 'text-sm sm:text-[15px] text-body'
                )}
              >
                {p}
              </p>
            ))}
          </GlassCard>
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            <GlassCard hover={false} padded={false}>
              <div className="p-5 sm:p-6 space-y-4">
                <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-sage font-semibold">
                  <ShieldCheck size={14} /> Fortalezas que convergen
                </p>
                {STRENGTHS.map((s, i) => (
                  <ProgressBar key={s.label} label={s.label} value={s.value} toneName="emerald" delay={i * 0.08} />
                ))}
              </div>
            </GlassCard>
            <GlassCard hover={false} padded={false}>
              <div className="p-5 sm:p-6 space-y-4">
                <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-wine font-semibold">
                  <TriangleAlert size={14} /> Brechas que tensionan
                </p>
                {GAPS.map((g, i) => (
                  <ProgressBar key={g.label} label={g.label} value={g.value} toneName="rose" delay={i * 0.08} />
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        <TriangulationMatrix />
      </section>

      <Divider />

      {/* Conclusiones */}
      <section className="space-y-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">Conclusiones del informe</span>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-ink leading-tight">
            Lo que revela el <span className="italic text-bronze">diagnóstico</span>
          </h3>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {CONCLUSIONS.map((c, i) => (
            <ConclusionCard key={c.n} item={c} index={i} />
          ))}
        </motion.div>
      </section>

      {/* Recomendaciones */}
      <section className="space-y-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">Recomendaciones estratégicas</span>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-ink leading-tight">
            Del hallazgo a la <span className="italic text-bronze">acción</span>
          </h3>
          <p className="text-sm text-muted mt-2">Despliega cada recomendación para ver las acciones sugeridas y la necesidad que atiende.</p>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger} className="space-y-4">
          {RECOMMENDATIONS.map((r) => (
            <RecommendationCard key={r.n} item={r} open={openRec === r.n} onToggle={() => setOpenRec((cur) => (cur === r.n ? null : r.n))} />
          ))}
        </motion.div>
      </section>

      {/* Llamada a la acción */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <div className="relative overflow-hidden rounded-[2rem] bg-abyss p-6 sm:p-10 md:p-12">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#E5D5B5] font-semibold">
                <Sparkles size={14} /> Siguiente paso
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.05] text-on-plum">
                Del diagnóstico a la <span className="italic text-[#E5D5B5]">propuesta de mejora</span>
              </h3>
              <p className="text-sm sm:text-base text-on-plum-muted leading-relaxed max-w-xl">
                Las conclusiones y recomendaciones de este diagnóstico se convierten en acciones concretas dentro de la Propuesta de Mejora.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => onNavigate?.('cierre', 'propuesta')}
                className="group min-h-[54px] w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 text-sm sm:text-base font-semibold text-plum-deep hover:bg-lilac transition-colors"
              >
                Ver la Propuesta de Mejora
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('planificacion', 'planeacion')}
                className="min-h-[50px] w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 px-6 text-sm font-medium text-on-plum hover:bg-white/10 transition-colors"
              >
                <CalendarRange size={16} /> Revisar la planeación y organización
              </button>
              {onSelectSection && (
                <button
                  type="button"
                  onClick={() => onSelectSection('foda')}
                  className="min-h-[50px] w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 px-6 text-sm font-medium text-on-plum hover:bg-white/10 transition-colors"
                >
                  <Grid2x2 size={16} /> Volver a la Matriz FODA
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
