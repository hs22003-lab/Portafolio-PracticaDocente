import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Landmark,
  BookOpen,
  GraduationCap,
  School,
  UserRound,
  FlaskConical,
  ArrowRight,
  ChartPie,
  Lightbulb,
  Target,
  Laptop,
  PenLine,
  Layers,
  HeartHandshake,
  Atom,
  Wifi,
  Sparkles,
  Users,
  CalendarCheck,
  Clock,
  BadgeCheck,
  CalendarRange,
  NotebookPen,
  Presentation,
  Quote,
  IdCard,
  Compass,
} from 'lucide-react';
import { PageShell, GlassCard, SectionHeader, Badge, TabBar, Button, Divider, PlumBand } from './ui/Primitives';
import { cx, fadeUp, stagger } from './ui/tokens';
import { PRACTICE_SUMMARY } from '../data/practica';

/* =====================================================================
   PORTADA · Hero editorial y presentación personal y profesional
   ===================================================================== */

const PHOTO_URL = '/img/foto_principal_portada.jpg';

const SEAL = [
  'Universidad de El Salvador',
  'Facultad de Ciencias Naturales y Matemática',
  'Escuela de Matemática',
  'Licenciatura en Informática Educativa',
];

const META = [
  { icon: BookOpen, label: 'Asignatura', value: 'Práctica Docente (DDP1109) · Grupo GT-01 · Ciclo II-2026' },
  { icon: GraduationCap, label: 'Docente tutor / Coordinador UES', value: 'Ing. Misael Enrique Juárez Blanco' },
  { icon: School, label: 'Institución de práctica', value: 'Instituto Nacional Dr. Francisco Martínez Suárez (Chalatenango)' },
  { icon: UserRound, label: 'Docente tutor institucional', value: 'Lcdo. Amilcar Heriberto Sánchez' },
  {
    icon: FlaskConical,
    label: 'Nivel atendido',
    value: 'Ciencias Naturales y Tecnología · 1.° Año de Bachillerato (Modalidad Flexible)',
    wide: true,
  },
];

const PROFILE = [
  { label: 'Carné', value: 'HS22003' },
  { label: 'Código', value: 'DDP1109' },
  { label: 'Grupo', value: 'GT-01' },
  { label: 'Ciclo', value: 'II-2026' },
];

const PRESENTATION = [
  {
    id: 'biografia',
    label: 'Biografía académica',
    shortLabel: 'Biografía',
    icon: GraduationCap,
    kicker: 'Formación',
    title: 'Formación en Informática Educativa',
    paragraphs: [
      'Soy estudiante de la Licenciatura en Informática Educativa en la Universidad de El Salvador, en la Facultad de Ciencias Naturales y Matemática.',
      'Mi formación integra el diseño instruccional, la creación de recursos educativos digitales y la mediación pedagógica, competencias que he puesto en práctica en un contexto real de educación media en modalidad flexible.',
    ],
    highlights: [
      { icon: PenLine, label: 'Diseño instruccional' },
      { icon: Layers, label: 'Creación de recursos educativos digitales' },
      { icon: HeartHandshake, label: 'Mediación pedagógica' },
    ],
  },
  {
    id: 'intereses',
    label: 'Intereses en Informática Educativa',
    shortLabel: 'Intereses',
    icon: Atom,
    kicker: 'Intereses',
    title: 'Tecnología con propósito didáctico',
    paragraphs: [
      'Me interesa la integración de las TIC bajo el modelo TPACK, de modo que la tecnología se elija a partir de lo que el contenido exige y de la estrategia pedagógica que mejor lo media.',
      'Mi enfoque se orienta a la reducción de la brecha digital y al aprendizaje activo en entornos flexibles, donde el estudiantado organiza buena parte de su aprendizaje de forma autónoma.',
    ],
    highlights: [
      { icon: Atom, label: 'Integración de las TIC (modelo TPACK)' },
      { icon: Wifi, label: 'Reducción de la brecha digital' },
      { icon: Sparkles, label: 'Aprendizaje activo en entornos flexibles' },
    ],
  },
  {
    id: 'expectativas',
    label: 'Expectativas de la práctica',
    shortLabel: 'Expectativas',
    icon: Target,
    kicker: 'Expectativas',
    title: 'Soluciones didácticas reales',
    paragraphs: [
      'Mi expectativa es aportar soluciones didácticas reales para los estudiantes adultos de la modalidad flexible.',
      'Busco fortalecer sus competencias científicas en Ciencias Naturales y su alfabetización digital, para que la tecnología sea un apoyo a su aprendizaje y no una barrera adicional.',
    ],
    highlights: [
      { icon: Users, label: 'Estudiantes adultos de modalidad flexible' },
      { icon: FlaskConical, label: 'Competencias científicas' },
      { icon: Laptop, label: 'Alfabetización digital' },
    ],
  },
];

const PRACTICE_STATS = [
  { icon: CalendarCheck, value: String(PRACTICE_SUMMARY.jornadas), label: 'Jornadas sabatinas', hint: `${PRACTICE_SUMMARY.inicio} – ${PRACTICE_SUMMARY.fin}` },
  { icon: Clock, value: `${PRACTICE_SUMMARY.horas} h`, label: 'Horas acreditadas', hint: 'Firma de asistencia del practicante' },
  { icon: Users, value: '11', label: 'Estudiantes encuestados', hint: 'Diagnóstico educativo' },
  { icon: NotebookPen, value: '4', label: 'Planificaciones', hint: 'Planes de sesión y secuencia didáctica' },
];

const PORTFOLIO_MAP = [
  { tab: 'contexto', sub: 'objetivos', icon: Target, title: 'Objetivos y contexto', text: 'Propósitos del portafolio, dimensiones analizadas e institución.' },
  { tab: 'planificacion', sub: 'planeacion', icon: CalendarRange, title: 'Planeación', text: 'Cronograma de 18 actividades y diagrama de Gantt.' },
  { tab: 'planificacion', sub: 'diagnostico', icon: ChartPie, title: 'Diagnóstico', text: 'Instrumentos, resultados y matriz FODA.' },
  { tab: 'practica', sub: 'evidencias', icon: Presentation, title: 'Práctica', text: 'Evidencias fotográficas y planificaciones de clase.' },
  { tab: 'evaluacion', sub: 'diario', icon: BookOpen, title: 'Reflexión', text: 'Diario de las 7 jornadas y evaluación.' },
  { tab: 'cierre', sub: 'propuesta', icon: Lightbulb, title: 'Mejora y cierre', text: 'Propuesta, recursos, experiencias y anexos.' },
];

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function PortraitFrame() {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.figure variants={fadeUp} className="w-full max-w-sm mx-auto lg:max-w-none">
      <div className="relative rounded-[2rem] border border-line bg-white/80 backdrop-blur-sm p-2.5 shadow-paper-lg">
        <div className="relative rounded-[1.6rem] frame-double overflow-hidden">
          <div className="relative aspect-[4/5] bg-silk">
            {!failed && (
              <img
                src={PHOTO_URL}
                alt="Fotografía de Stephanie Alexandra Hernández Sibrián"
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                decoding="async"
                className={cx('absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700', loaded ? 'opacity-100' : 'opacity-0')}
              />
            )}
            {(!loaded || failed) && (
              <div className={cx('absolute inset-0 flex items-center justify-center', !failed && 'skeleton-shimmer')}>
                {failed && (
                  <span className="inline-flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full border border-plum bg-white">
                    <span className="font-serif text-5xl sm:text-6xl font-semibold text-plum">SH</span>
                  </span>
                )}
              </div>
            )}
            <span className="absolute left-4 top-4 rounded-full bg-white/90 border border-line px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-plum font-semibold">
              Practicante
            </span>
            {/* Monograma editorial */}
            <span className="absolute bottom-5 right-5 inline-flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-plum-deep shadow-paper-lg">
              <span className="font-serif text-2xl font-semibold text-on-plum tracking-tight">SH</span>
            </span>
          </div>
        </div>
        <figcaption className="px-3 sm:px-4 pt-5 pb-3">
          <p className="font-serif text-2xl font-semibold text-ink leading-tight">Stephanie Alexandra Hernández Sibrián</p>
          <p className="text-sm text-muted mt-1">Licenciatura en Informática Educativa · UES</p>
          <dl className="mt-4 grid grid-cols-2 gap-2">
            {PROFILE.map((p) => (
              <div key={p.label} className="rounded-xl border border-line bg-ivory px-3 py-2">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">{p.label}</dt>
                <dd className="text-sm font-semibold text-ink leading-snug">{p.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-sage-line bg-sage-soft px-3 py-2.5">
            <BadgeCheck size={16} className="shrink-0 text-sage" />
            <span className="text-xs font-semibold text-sage">Prácticas finalizadas · {PRACTICE_SUMMARY.jornadas} jornadas</span>
          </div>
        </figcaption>
      </div>
    </motion.figure>
  );
}

function PresentationPanel() {
  const [active, setActive] = useState(PRESENTATION[0].id);
  const current = PRESENTATION.find((p) => p.id === active) || PRESENTATION[0];
  const Icon = current.icon;

  return (
    <div className="space-y-6">
      {/* Selector en tarjetas (escritorio) */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {PRESENTATION.map((p, i) => {
          const PIcon = p.icon;
          const isActive = p.id === active;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              aria-pressed={isActive}
              className={cx(
                'group relative text-left rounded-3xl border p-5 transition-all duration-300',
                isActive ? 'border-plum bg-plum text-white shadow-paper-lg' : 'border-line bg-white shadow-paper hover:border-line-strong hover:shadow-paper-lg'
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cx('font-serif text-3xl font-semibold leading-none', isActive ? 'text-[#E5D5B5]' : 'text-bronze')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={cx(
                    'inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors',
                    isActive ? 'border-white/25 bg-white/10 text-white' : 'border-lilac-line bg-lilac text-plum'
                  )}
                >
                  <PIcon size={18} />
                </span>
              </div>
              <p className={cx('mt-4 font-semibold leading-snug', isActive ? 'text-white' : 'text-ink')}>{p.label}</p>
              <p className={cx('mt-1 text-sm', isActive ? 'text-on-plum-muted' : 'text-muted')}>{p.title}</p>
            </button>
          );
        })}
      </div>

      {/* Selector en pestañas (móvil) */}
      <div className="md:hidden">
        <TabBar
          tabs={PRESENTATION.map(({ id, label, shortLabel, icon }) => ({ id, label, shortLabel, icon }))}
          active={active}
          onChange={setActive}
          layoutId="portada-presentacion"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <GlassCard hover={false} padded={false} className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 p-6 sm:p-8 md:p-10 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
                    <Icon size={20} />
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">{current.kicker}</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink leading-tight">{current.title}</h3>
                {current.paragraphs.map((p, i) => (
                  <p
                    key={p}
                    className={cx(
                      'text-[15px] sm:text-base leading-relaxed text-body',
                      i === 0 && 'first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-plum'
                    )}
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="lg:col-span-4 bg-silk border-t lg:border-t-0 lg:border-l border-line p-6 sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-4">Ejes principales</p>
                <motion.ul initial="hidden" animate="show" variants={stagger} className="space-y-3">
                  {current.highlights.map((h) => {
                    const HIcon = h.icon;
                    return (
                      <motion.li key={h.label} variants={fadeUp} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3">
                        <HIcon size={17} className="shrink-0 text-plum" />
                        <span className="text-sm font-medium text-ink leading-snug">{h.label}</span>
                      </motion.li>
                    );
                  })}
                </motion.ul>
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

export default function Portada({ onNavigate }) {
  return (
    <PageShell>
      {/* Hero editorial */}
      <motion.section initial="hidden" animate="show" variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-7 space-y-7 order-2 lg:order-1">
          <motion.div variants={fadeUp} className="flex items-start gap-3">
            <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sand border border-sand-line text-bronze">
              <Landmark size={19} />
            </span>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] leading-relaxed text-bronze font-semibold">
              {SEAL.map((s, i) => (
                <span key={s}>
                  {s}
                  {i < SEAL.length - 1 && <span className="mx-2 text-sand-line">·</span>}
                </span>
              ))}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <h1 className="font-serif text-[2.5rem] leading-[1.02] sm:text-6xl md:text-7xl font-semibold text-ink">
              Portafolio Digital de <span className="italic text-plum">Práctica Docente</span>
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-lg sm:text-xl font-semibold text-body">Stephanie Alexandra Hernández Sibrián</p>
              <Badge toneName="amber" icon={IdCard}>
                Carné HS22003
              </Badge>
            </div>
          </motion.div>

          <motion.dl variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {META.map((m) => {
              const MIcon = m.icon;
              return (
                <div
                  key={m.label}
                  className={cx('flex items-start gap-3 rounded-2xl border border-line bg-white/90 px-4 py-3.5 shadow-paper', m.wide && 'sm:col-span-2')}
                >
                  <MIcon size={17} className="shrink-0 mt-0.5 text-plum" />
                  <div className="min-w-0">
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">{m.label}</dt>
                    <dd className="text-sm text-ink leading-snug mt-0.5">{m.value}</dd>
                  </div>
                </div>
              );
            })}
          </motion.dl>

          <motion.figure variants={fadeUp} className="relative rounded-3xl border border-sand-line bg-sand px-5 sm:px-7 py-6 overflow-hidden">
            <Quote size={72} className="absolute -right-2 -top-3 text-sand-line" aria-hidden="true" />
            <p className="relative text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold mb-3">Lema docente</p>
            <blockquote className="relative font-serif italic text-xl sm:text-2xl md:text-[1.7rem] leading-snug text-ink">
              “La educación transforma vidas cuando la tecnología se adapta, con empatía, a la realidad de cada estudiante.”
            </blockquote>
          </motion.figure>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <Button icon={ChartPie} iconRight={ArrowRight} onClick={() => onNavigate?.('planificacion', 'diagnostico')} className="sm:flex-1">
              Explorar Diagnóstico Educativo
            </Button>
            <Button variant="secondary" icon={Lightbulb} iconRight={ArrowRight} onClick={() => onNavigate?.('cierre', 'propuesta')} className="sm:flex-1">
              Ver Propuesta de Mejora
            </Button>
          </motion.div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28 order-1 lg:order-2">
          <PortraitFrame />
        </div>
      </motion.section>

      {/* Banda de datos de la práctica */}
      <PlumBand>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5D5B5]/50 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[#E5D5B5] font-semibold">
              <BadgeCheck size={14} /> Prácticas finalizadas
            </span>
            <p className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-on-plum">
              Un proceso documentado de <span className="italic text-[#E5D5B5]">principio a fin</span>
            </p>
            <p className="text-sm text-on-plum-muted leading-relaxed">
              Jornadas sabatinas de {PRACTICE_SUMMARY.horario} en el Instituto Nacional Dr. Francisco Martínez Suárez.
            </p>
          </div>
          <motion.dl
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger}
            className="lg:col-span-8 grid grid-cols-2 gap-3 sm:gap-4"
          >
            {PRACTICE_STATS.map((s) => {
              const SIcon = s.icon;
              return (
                <motion.div key={s.label} variants={fadeUp} className="rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5">
                  <SIcon size={18} className="text-[#E5D5B5]" />
                  <dd className="mt-3 font-serif text-3xl sm:text-4xl font-semibold leading-none text-on-plum">{s.value}</dd>
                  <dt className="mt-2 text-sm font-semibold text-on-plum">{s.label}</dt>
                  <p className="text-xs text-on-plum-muted mt-0.5">{s.hint}</p>
                </motion.div>
              );
            })}
          </motion.dl>
        </div>
      </PlumBand>

      <Divider />

      {/* Presentación personal y profesional */}
      <section className="space-y-8">
        <SectionHeader
          eyebrow="Presentación"
          icon={UserRound}
          title="Presentación personal y"
          highlight="profesional"
          description="Mi formación académica, mis intereses en Informática Educativa y las expectativas con las que asumí la práctica docente."
        />
        <PresentationPanel />
      </section>

      {/* Recorrido del portafolio */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Compass size={20} className="text-bronze" />
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">Recorrido del portafolio</h3>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {PORTFOLIO_MAP.map((m, i) => {
            const MIcon = m.icon;
            return (
              <motion.button
                key={m.title}
                type="button"
                variants={fadeUp}
                onClick={() => onNavigate?.(m.tab, m.sub)}
                className="group text-left rounded-3xl border border-line bg-white p-5 shadow-paper hover:shadow-paper-lg hover:border-line-strong transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-semibold text-bronze leading-none">{String(i + 1).padStart(2, '0')}</span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lilac border border-lilac-line text-plum group-hover:bg-plum group-hover:text-white transition-colors">
                    <MIcon size={18} />
                  </span>
                </div>
                <p className="mt-4 font-semibold text-ink">{m.title}</p>
                <p className="mt-1 text-sm text-muted">{m.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
                  Abrir sección <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </section>
    </PageShell>
  );
}
