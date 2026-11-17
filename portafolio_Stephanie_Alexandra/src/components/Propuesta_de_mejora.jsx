import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  Smartphone,
  Laptop,
  Download,
  Users,
  Wifi,
  WifiOff,
  BookOpenText,
  Target,
  Crosshair,
  Sparkles,
  Clock,
  Palette,
  FileDown,
  TrendingUp,
  School,
  GraduationCap,
  TriangleAlert,
  ChevronLeft,
  ChevronRight,
  Timer,
  Leaf,
  Keyboard,
  Send,
  MonitorCog,
  FileText,
  CircleCheck,
  Grid3x3,
  Briefcase,
  Hand,
} from 'lucide-react';
import {
  PageShell,
  GlassCard,
  SectionHeader,
  CardTitle,
  Badge,
  PlumBand,
  DonutChart,
  ChartLegend,
  HorizontalBars,
  DataTable,
  TabBar,
  EditorialQuote,
  Divider,
} from './ui/Primitives';
import { cx, tone, fadeUp, stagger } from './ui/tokens';
import DocLink, { ExternalButton } from './shared/DocLink';
import { CANVA_URL, DOCS } from '../data/practica';

/* =====================================================================
   PROPUESTA DE MEJORA · Micro aprendizaje Inclusivo
   ===================================================================== */

const PARTICIPATION = [
  { label: 'Participa casi siempre o siempre', value: 63.7, color: '#4A2574' },
  { label: 'Participa a veces', value: 36.4, color: '#B08A4F' },
];

const CONNECTIVITY = [
  { label: 'Acceso limitado a Internet', value: 3, percent: 27.3, color: '#B08A4F' },
  { label: 'Acceso insuficiente', value: 2, percent: 18.2, color: '#B5657F' },
  { label: 'Sin Internet en casa', value: 1, percent: 9.1, color: '#4A2574' },
];

const JUSTIFICATION = [
  { icon: Briefcase, title: 'Población adulta que trabaja', value: '75%', text: 'mayor de 22 años según el coordinador; la mayoría trabaja y tiene responsabilidades familiares.' },
  { icon: BookOpenText, title: 'Lectoescritura y manejo de PC', value: null, text: 'Dificultades señaladas por el docente tutor: lectura y escritura, y poco manejo de la tecnología.' },
  { icon: WifiOff, title: 'Recursos offline', value: 'PDF', text: 'materiales descargables que no requieren conexión permanente.' },
  { icon: Smartphone, title: 'Diseño para celulares', value: '27.3%', text: 'estudia exclusivamente desde su smartphone.' },
];

const OBJECTIVES = [
  { icon: Leaf, text: 'Diseñar actividades cortas y prácticas que se relacionen con las temáticas de Ciencias Naturales y con situaciones de la vida diaria.' },
  { icon: Palette, text: 'Fomentar el desarrollo de habilidades informáticas mediante la creación de recursos educativos simples, como afiches, resúmenes y presentaciones.' },
  { icon: FileDown, text: 'Preparar materiales que se puedan descargar para hacer las actividades sin necesidad de estar conectados a Internet.' },
];

const PILLARS = [
  {
    id: 'capsulas',
    n: 1,
    icon: Smartphone,
    toneName: 'violet',
    title: 'Cápsulas de Micro aprendizaje',
    tag: 'Mobile-First',
    text: 'Crear materiales de Ciencias Naturales visuales, con textos cortos y ejemplos de la vida diaria, optimizados para verse en teléfonos celulares.',
    points: ['Textos cortos y visuales', 'Ejemplos de la vida diaria', 'Optimizado para pantallas de celular'],
    answers: 'Dificultades de lectoescritura y tiempo limitado por trabajo o familia.',
  },
  {
    id: 'jornadas',
    n: 2,
    icon: Laptop,
    toneName: 'amber',
    title: 'Jornadas de Alfabetización Digital Exprés',
    tag: 'Tutorías sabatinas',
    text: 'Aprovechar breves espacios durante las tutorías presenciales de los sábados para enseñar el uso básico de la computadora y de las plataformas educativas.',
    points: ['Espacios breves en la tutoría', 'Uso básico de la computadora', 'Manejo de plataformas educativas'],
    answers: 'Poco manejo de herramientas tecnológicas y uso de la computadora.',
  },
  {
    id: 'kits',
    n: 3,
    icon: Download,
    toneName: 'emerald',
    title: 'Kits Descargables',
    tag: 'Modo Offline',
    text: 'Proveer las guías y presentaciones en formatos ligeros (PDF) que los estudiantes puedan descargar cuando tengan buen Internet y estudiar durante la semana sin consumir datos.',
    points: ['Formato PDF ligero', 'Descarga con buena conexión', 'Estudio entre semana sin datos'],
    answers: 'Conectividad inestable y dependencia del teléfono móvil.',
  },
];

const MATRIX = [
  {
    id: 'm1',
    hallazgo: 'Dificultades en el manejo de herramientas tecnológicas y uso de la computadora.',
    evidencia: 'En la entrevista, el docente señala el poco manejo de tecnología en el grupo.',
    interpretacion: 'Limita la autonomía del estudiante para elaborar tareas en plataformas digitales, generando frustración.',
    accion: 'Alfabetización digital: en lugar de hacer el portafolio de clases en hojas de papel bond, que los estudiantes lo elaboren mediante Word o Canva.',
    aporte: 'Durante diferentes sesiones se pueden incluir mini tutoriales visuales del paso a paso para la entrega de actividades y otros elementos básicos.',
  },
  {
    id: 'm2',
    hallazgo: 'Poca disposición y dificultades en la lectura y escritura; tiempo limitado por trabajo o familia.',
    evidencia:
      'El docente (pregunta 8) identifica dificultades en lectura y escritura; el coordinador (pregunta 3) destaca que el 75% es mayor de 22 años; en las preguntas 6 y 13 del cuestionario, el 45.5% prefiere videos, dinámicas o lecturas en PDF.',
    interpretacion: 'Los textos extensos y muy teóricos desmotivan al estudiante, sobre todo si dispone de poco tiempo tras el trabajo, y afectan la comprensión.',
    accion: 'Diseñar materiales breves, visuales y vinculados con aplicaciones útiles en la vida diaria o en el hogar.',
    aporte: 'Reduce conceptos complejos de la materia en infografías, esquemas visuales o prácticas.',
  },
  {
    id: 'm3',
    hallazgo: 'Conectividad inestable y dependencia del teléfono móvil para las actividades académicas.',
    evidencia: 'En las preguntas 3, 8 y 9 del cuestionario: el 27.3% estudia exclusivamente desde su smartphone y el 45.5% califica su conexión como limitada.',
    interpretacion: 'Las actividades que requieren conexión constante excluyen a más de la mitad del grupo y dificultan la aplicación del aula invertida.',
    accion: 'Proporcionar materiales en formatos más ligeros y adaptables a smartphone al momento de su descarga.',
    aporte: 'El recurso es exportable a PDF, para consultarlo sin conexión a Internet.',
  },
];

const MATRIX_COLUMNS = [
  { key: 'hallazgo', label: 'Hallazgo priorizado', className: 'w-[19%] font-semibold text-ink' },
  { key: 'evidencia', label: 'Evidencia e instrumento', className: 'w-[23%]' },
  { key: 'interpretacion', label: 'Interpretación', className: 'w-[20%]' },
  { key: 'accion', label: 'Acción propuesta', className: 'w-[19%]' },
  { key: 'aporte', label: 'Aporte del recurso', className: 'w-[19%]' },
];

const VIEWER = [
  {
    id: 's1',
    n: 1,
    label: 'Guía de uso',
    icon: Timer,
    title: 'Guía de uso y ruta de estudio',
    summary: 'Ruta de estudio independiente para docentes y estudiantes, con consejos para manejar el tiempo en bloques cortos de 15 minutos por semana y prepararse antes de la tutoría del sábado.',
  },
  {
    id: 's2',
    n: 2,
    label: 'Cápsulas visuales',
    icon: Leaf,
    title: 'Cápsulas visuales de Ciencias',
    summary: 'Imágenes y textos con definiciones de tres líneas, ejemplos comunes y pequeñas actividades experimentales para hacer en casa, sin saturar con textos largos.',
  },
  {
    id: 's3',
    n: 3,
    label: 'Alfabetización digital',
    icon: Keyboard,
    title: 'Rincón de alfabetización digital',
    summary: 'Dos fichas: la primera orienta el uso de procesadores de texto, atajos de teclado y el guardado en PDF; la segunda, el envío de tareas desde el teléfono móvil.',
  },
  {
    id: 's4',
    n: 4,
    label: 'Orientaciones al tutor',
    icon: MonitorCog,
    title: 'Orientaciones para el tutor',
    summary: 'Cómo integrar sesiones prácticas en el centro de cómputo durante las jornadas del sábado y enviar con anticipación el material descargable por plataformas virtuales para fortalecer el aula invertida.',
  },
];

const IMPACT = [
  { icon: Users, title: 'Estudiantado', text: 'Entender los contenidos con ejemplos de la vida diaria e instrucciones paso a paso, y practicar habilidades informáticas básicas en tareas de sus estudios.' },
  { icon: GraduationCap, title: 'Docente', text: 'Contar con apoyo para planificar actividades extra, ofrecer opciones según los recursos disponibles y recoger información sobre las dificultades de cada estudiante.' },
  { icon: School, title: 'Institución', text: 'Disponer de un material de consulta que puede ajustarse a otros contenidos educativos si su uso resulta adecuado.' },
];

const EXPECTED = [
  { label: 'Aumentar la participación', icon: Hand },
  { label: 'Mejorar la comprensión', icon: BookOpenText },
  { label: 'Desarrollar habilidades digitales prácticas', icon: Laptop },
  { label: 'Facilitar la planificación docente', icon: Clock },
];

const LIMITS = ['Tiempo disponible para las tutorías', 'Disponibilidad de dispositivos', 'Diferencias de conectividad', 'Adaptación de cada actividad al contenido que el docente desarrolle'];

/* ---------------------------------------------------------------------
   Visor del recurso digital
   --------------------------------------------------------------------- */

function SectionPreview({ id }) {
  if (id === 's1') {
    return (
      <div className="space-y-4">
        <p className="text-xs text-muted">Ejemplo de organización semanal en bloques de 15 minutos antes de la tutoría:</p>
        <div className="grid grid-cols-6 gap-1.5">
          {['L', 'M', 'M', 'J', 'V'].map((d, i) => (
            <div key={`${d}-${i}`} className="space-y-1.5">
              <span className="block text-center text-[11px] font-semibold text-muted">{d}</span>
              <motion.span
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.08 }}
                className="flex h-12 origin-bottom items-center justify-center rounded-xl bg-lilac border border-lilac-line text-[10px] font-bold text-plum"
              >
                15′
              </motion.span>
            </div>
          ))}
          <div className="space-y-1.5">
            <span className="block text-center text-[11px] font-semibold text-bronze">S</span>
            <span className="flex h-12 items-center justify-center rounded-xl bg-plum text-[10px] font-bold text-white">Tutoría</span>
          </div>
        </div>
      </div>
    );
  }
  if (id === 's2') {
    return (
      <div className="mx-auto w-full max-w-[260px] rounded-[2rem] border-[6px] border-ink bg-white p-3 shadow-paper-lg">
        <div className="rounded-2xl bg-sage-soft border border-sage-line p-3">
          <p className="text-[10px] uppercase tracking-[0.16em] text-sage font-bold">Cápsula · Definición en 3 líneas</p>
          <p className="mt-2 font-serif text-lg font-semibold text-ink leading-tight">Área Natural Protegida</p>
          <p className="mt-1.5 text-xs text-body leading-snug">
            Zona del territorio nacional delimitada y protegida legalmente para garantizar la conservación y restauración de la diversidad biológica.
          </p>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <span className="rounded-xl bg-silk px-2 py-2 text-[10px] text-body text-center">Ejemplo común</span>
          <span className="rounded-xl bg-sand px-2 py-2 text-[10px] text-bronze-dark text-center">Actividad en casa</span>
        </div>
      </div>
    );
  }
  if (id === 's3') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-line bg-white p-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-lilac text-plum">
            <FileText size={17} />
          </span>
          <p className="mt-2 text-sm font-semibold text-ink">Ficha 1</p>
          <ul className="mt-1.5 space-y-1 text-xs text-body">
            <li>· Procesadores de texto</li>
            <li>· Atajos de teclado</li>
            <li>· Guardar en PDF</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sand text-bronze">
            <Send size={17} />
          </span>
          <p className="mt-2 text-sm font-semibold text-ink">Ficha 2</p>
          <ul className="mt-1.5 space-y-1 text-xs text-body">
            <li>· Envío de tareas</li>
            <li>· Desde el teléfono móvil</li>
          </ul>
        </div>
      </div>
    );
  }
  return (
    <ol className="space-y-2.5">
      {['Enviar con anticipación el material descargable por plataformas virtuales.', 'Integrar sesiones prácticas en el centro de cómputo el sábado.', 'Fortalecer el aula invertida con lo trabajado en la semana.'].map((s, i) => (
        <li key={s} className="flex items-start gap-3 rounded-2xl border border-line bg-white px-4 py-3">
          <span className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-plum text-xs font-bold text-white">{i + 1}</span>
          <span className="text-sm text-body leading-snug">{s}</span>
        </li>
      ))}
    </ol>
  );
}

function ResourceViewer() {
  const [index, setIndex] = useState(0);
  const current = VIEWER[index];
  const CIcon = current.icon;
  const go = (delta) => setIndex((i) => (i + delta + VIEWER.length) % VIEWER.length);

  return (
    <GlassCard hover={false} padded={false} className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <aside className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-line bg-silk p-4 sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold mb-3">Guía de Micro aprendizajes · PDF</p>
          <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1 lg:pb-0" role="tablist">
            {VIEWER.map((s, i) => {
              const SIcon = s.icon;
              const active = i === index;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setIndex(i)}
                  className={cx(
                    'snap-start shrink-0 lg:shrink min-h-[52px] flex items-center gap-3 rounded-2xl border px-3.5 py-2.5 text-left transition-all',
                    active ? 'border-plum bg-white shadow-paper-lg' : 'border-transparent hover:border-line hover:bg-white/70'
                  )}
                >
                  <span
                    className={cx('shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl border', active ? 'bg-plum border-plum text-white' : 'bg-white border-lilac-line text-plum')}
                  >
                    <SIcon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.16em] text-muted font-semibold">Sección {s.n}</span>
                    <span className="block text-sm font-semibold text-ink whitespace-nowrap lg:whitespace-normal">{s.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="lg:col-span-8 p-5 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
                  <CIcon size={22} />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">
                    Sección {current.n} de {VIEWER.length}
                  </p>
                  <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight">{current.title}</h4>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed text-body">{current.summary}</p>
              <div className="rounded-3xl border border-line bg-ivory p-4 sm:p-6">
                <SectionPreview id={current.id} />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Sección anterior"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-lilac-line bg-white text-plum hover:bg-lilac transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Sección siguiente"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-lilac-line bg-white text-plum hover:bg-lilac transition-colors"
              >
                <ChevronRight size={18} />
              </button>
              <div className="flex items-center gap-1.5 pl-2">
                {VIEWER.map((s, i) => (
                  <span key={s.id} className={cx('h-1.5 rounded-full transition-all', i === index ? 'w-6 bg-plum' : 'w-1.5 bg-line-strong')} />
                ))}
              </div>
            </div>
            <ExternalButton href={CANVA_URL} label="Abrir el recurso en Canva" icon={Palette} />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

/* ---------------------------------------------------------------------
   Pilares
   --------------------------------------------------------------------- */

function Pillars() {
  const [active, setActive] = useState(PILLARS[0].id);
  const current = PILLARS.find((p) => p.id === active);
  const t = tone(current.toneName);
  const CIcon = current.icon;
  return (
    <div className="space-y-5">
      <TabBar tabs={PILLARS.map((p) => ({ id: p.id, label: p.title, shortLabel: `Pilar ${p.n}`, icon: p.icon }))} active={active} onChange={setActive} layoutId="propuesta-pilares" />
      <AnimatePresence mode="wait">
        <motion.div key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
          <GlassCard hover={false} padded={false} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className={cx('md:col-span-4 p-6 sm:p-8 flex flex-col justify-between gap-6', t.bg)}>
                <div>
                  <span className="font-serif text-6xl font-semibold text-bronze leading-none">0{current.n}</span>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted font-semibold">Pilar de acción</p>
                </div>
                <span className={cx('inline-flex h-16 w-16 items-center justify-center rounded-3xl border bg-white', t.border, t.text)}>
                  <CIcon size={30} />
                </span>
              </div>
              <div className="md:col-span-8 p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge toneName={current.toneName}>{current.tag}</Badge>
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight">{current.title}</h4>
                <p className="text-[15px] leading-relaxed text-body">{current.text}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {current.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 rounded-2xl border border-line bg-ivory px-3.5 py-3 text-sm text-body">
                      <CircleCheck size={16} className="shrink-0 mt-0.5 text-sage" /> {p}
                    </li>
                  ))}
                </ul>
                <div className="flex items-start gap-3 rounded-2xl border border-sand-line bg-sand p-4">
                  <Crosshair size={17} className="shrink-0 mt-0.5 text-bronze" />
                  <p className="text-sm text-body">
                    <span className="font-semibold text-bronze-dark">Responde a: </span>
                    {current.answers}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Propuesta_de_mejora() {
  return (
    <PageShell>
      {/* Encabezado editorial */}
      <motion.section initial="hidden" animate="show" variants={stagger} className="space-y-6">
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
          <Badge toneName="amber" icon={Lightbulb}>
            Propuesta de mejora
          </Badge>
          <Badge toneName="violet">Dimensión pedagógica</Badge>
          <Badge toneName="emerald">1.° Año de Bachillerato · Modalidad Flexible</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.04] text-ink max-w-5xl">
          Micro aprendizaje Inclusivo: <span className="italic text-plum">Alfabetización Digital y Ciencias Naturales</span> en Modalidad Flexible
        </motion.h2>
        <motion.p variants={fadeUp} className="text-base sm:text-lg leading-relaxed text-body max-w-3xl">
          Diseñé esta propuesta a partir del diagnóstico: una guía práctica de actividades breves y accesibles que une los contenidos de Ciencias Naturales con
          el desarrollo de habilidades informáticas básicas.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
          <ExternalButton href={CANVA_URL} label="Ver recurso digital" icon={Palette} />
          <DocLink src={DOCS.propuesta} label="Documento de la propuesta" variant="secondary" icon={FileText} />
        </motion.div>
      </motion.section>

      {/* Necesidad priorizada */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <GlassCard hover={false} className="lg:col-span-7 space-y-5">
          <CardTitle icon={Target} title="Necesidad priorizada" subtitle="Dimensión pedagógica del diagnóstico" toneName="amber" />
          <p className="font-serif text-xl sm:text-2xl leading-snug text-ink">
            Variar las actividades para aumentar la participación, apoyar la comprensión de los materiales y promover el uso de herramientas digitales.
          </p>
          <p className="text-[15px] leading-relaxed text-body">
            De los 11 estudiantes encuestados, 4 participan solo <strong className="text-ink">a veces</strong> en los ejercicios o dinámicas de clase (36.4%). No
            lo interpreto como falta de participación, sino como una oportunidad para ofrecer más formas de intervenir.
          </p>
        </GlassCard>
        <GlassCard hover={false} className="lg:col-span-5">
          <CardTitle icon={Hand} title="Participación en clase" subtitle="N = 11" />
          <div className="mt-6 space-y-5">
            <DonutChart data={PARTICIPATION} centerValue="36.4%" centerLabel="participa a veces" size={190} thickness={26} />
            <ChartLegend data={PARTICIPATION.map((d) => ({ ...d, percent: d.value, value: d.value > 50 ? 7 : 4 }))} />
          </div>
        </GlassCard>
      </section>

      {/* Justificación */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Justificación"
          icon={Sparkles}
          title="Por qué esta"
          highlight="propuesta"
          description="La propuesta responde a las condiciones reales del grupo: personas adultas que trabajan, con distintas condiciones de conexión y con necesidades de apoyo en lectoescritura y manejo de la computadora."
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {JUSTIFICATION.map((j) => {
              const JIcon = j.icon;
              return (
                <motion.div key={j.title} variants={fadeUp} className="rounded-3xl border border-line bg-white shadow-paper p-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lilac border border-lilac-line text-plum">
                      <JIcon size={18} />
                    </span>
                    {j.value && <span className="font-serif text-3xl font-semibold text-plum leading-none">{j.value}</span>}
                  </div>
                  <p className="mt-4 font-semibold text-ink">{j.title}</p>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{j.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
          <GlassCard hover={false} className="lg:col-span-5 space-y-5">
            <CardTitle icon={Wifi} title="Conectividad en el hogar" subtitle="Calidad del acceso a Internet" toneName="indigo" />
            <HorizontalBars data={CONNECTIVITY} max={100} />
            <p className="text-sm text-muted leading-relaxed">
              Por ello, las actividades no dependen principalmente de videos en línea, videollamadas u otras herramientas que exijan conexión permanente.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Objetivos */}
      <PlumBand>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5D5B5]/50 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[#E5D5B5] font-semibold">
              <Target size={14} /> Objetivo de mejora
            </span>
            <p className="font-serif text-xl sm:text-2xl leading-snug text-on-plum">
              Fortalecer las oportunidades de participación y comprensión de los contenidos de Ciencias Naturales con una guía de micro aprendizajes, que incluye
              actividades prácticas, herramientas informáticas básicas y materiales accesibles.
            </p>
          </div>
          <motion.ol initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="lg:col-span-7 space-y-3">
            {OBJECTIVES.map((o, i) => {
              const OIcon = o.icon;
              return (
                <motion.li key={o.text} variants={fadeUp} className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5">
                  <span className="shrink-0 font-serif text-3xl font-semibold text-[#E5D5B5] leading-none w-8">{i + 1}</span>
                  <OIcon size={20} className="shrink-0 mt-1 text-on-plum-muted" />
                  <p className="text-sm sm:text-[15px] text-on-plum leading-relaxed">{o.text}</p>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </PlumBand>

      {/* Acciones y estrategias */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Acciones y estrategias"
          icon={Grid3x3}
          title="Tres pilares de"
          highlight="acción"
          description="Cada pilar atiende un hallazgo concreto del diagnóstico."
        />
        <Pillars />
      </section>

      {/* Matriz de vinculación */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Crosshair size={20} className="text-bronze" />
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">Matriz de vinculación</h3>
        </div>
        <DataTable
          columns={MATRIX_COLUMNS}
          rows={MATRIX}
          rowKey="id"
          minWidth={1040}
          renderCard={(r) => (
            <div className="rounded-2xl border border-line bg-white shadow-paper overflow-hidden">
              <div className="bg-silk border-b border-line px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-bronze font-bold">Hallazgo priorizado</p>
                <p className="mt-1 text-sm font-semibold text-ink leading-snug">{r.hallazgo}</p>
              </div>
              <dl className="p-4 space-y-3">
                {[
                  ['Evidencia', r.evidencia],
                  ['Interpretación', r.interpretacion],
                  ['Acción', r.accion],
                  ['Aporte del recurso', r.aporte],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">{k}</dt>
                    <dd className="text-sm text-body leading-relaxed mt-0.5">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        />
      </section>

      <Divider />

      {/* Recurso digital */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Recurso pedagógico digital"
          icon={BookOpenText}
          title="Guía de Micro"
          highlight="aprendizajes"
          description="Portafolio digital exportable a PDF para usarse sin conexión. Recorro sus cuatro secciones en el visor."
        />
        <ResourceViewer />
      </section>

      {/* Impacto esperado */}
      <section className="space-y-6">
        <SectionHeader eyebrow="Impacto esperado" icon={TrendingUp} title="Impacto" highlight="esperado" />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {EXPECTED.map((e) => {
            const EIcon = e.icon;
            return (
              <motion.div key={e.label} variants={fadeUp} className="rounded-2xl border border-sage-line bg-sage-soft p-4">
                <EIcon size={18} className="text-sage" />
                <p className="mt-2 text-sm font-semibold text-ink leading-snug">{e.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {IMPACT.map((i) => {
            const IIcon = i.icon;
            return (
              <GlassCard key={i.title} className="space-y-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
                  <IIcon size={20} />
                </span>
                <p className="font-semibold text-ink">{i.title}</p>
                <p className="text-sm text-body leading-relaxed">{i.text}</p>
              </GlassCard>
            );
          })}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 rounded-3xl border border-wine-line bg-wine-soft p-5 sm:p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-wine">
              <TriangleAlert size={17} /> Limitaciones
            </p>
            <ul className="mt-3 space-y-2">
              {LIMITS.map((l) => (
                <li key={l} className="flex items-start gap-2 text-sm text-body">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-wine" /> {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <EditorialQuote author="Alcance de la propuesta">
              Estos beneficios son una expectativa y no resultados comprobados: para conocer su alcance es necesario aplicar las actividades y dar seguimiento a los
              productos elaborados.
            </EditorialQuote>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
