import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessagesSquare,
  GraduationCap,
  UserCog,
  CalendarDays,
  PenLine,
  School,
  ChevronDown,
  Maximize2,
  Minimize2,
  Table2,
  MessageSquareQuote,
  Sparkles,
  GitMerge,
  Users,
  Laptop,
  Wifi,
  Route,
  Quote,
} from 'lucide-react';
import { GlassCard, SectionHeader, SearchInput, TabBar, EmptyState, EditorialQuote, Divider } from '../ui/Primitives';
import { cx, normalize, fadeUp, stagger } from '../ui/tokens';
import { TUTOR_QA, COORDINATOR_QA } from '../../data/diagnostico';

/* =====================================================================
   ENTREVISTAS (Instrumentos 5.6.3 y 5.6.4)
   Aplicadas el 12/09/2026 por Stephanie Alexandra Hernández Sibrián
   ===================================================================== */

const INTERVIEWER = 'Stephanie Alexandra Hernández Sibrián';

const ACTORS = [
  {
    id: 'tutor',
    instrument: '5.6.3',
    name: 'Lcdo. Amilcar Heriberto Sánchez',
    role: 'Docente tutor de Ciencias Naturales y Tecnología',
    shortRole: 'Docente tutor',
    date: '12/09/2026',
    icon: GraduationCap,
    accent: '#4A2574',
    quote: 'Trabajar el aula invertida en esta modalidad ha funcionado bastante bien.',
    tableTitle: 'Tabla 1. Análisis e interpretación de la entrevista con el tutor',
    tableColumn: 'Indicador',
    qa: TUTOR_QA,
    analysis: [
      {
        label: 'Caracterización del grupo',
        refs: [1, 2],
        evidence:
          'Grupo mayor de edad, en su mayoría con empleo y con un alto grado de madurez; presenta resistencia a la lectura y la escritura y poco manejo de la tecnología.',
        interpretation:
          'La madurez y la experiencia laboral favorecen la autorregulación (coherente con el 81.8% de 19 años o más y el 81.9% de autonomía de la encuesta), pero conviven con brechas en competencias básicas de lectoescritura y digitales que corresponden a la segunda brecha descrita por Van Dijk (2005).',
      },
      {
        label: 'Estrategias pedagógicas',
        refs: [3, 4, 7],
        evidence:
          'Aula invertida y proyectos con tecnología; tareas entre semana al cierre de cada lección y presentación del trabajo el sábado; uso de libro, computadora, proyector, pizarra y plataformas.',
        interpretation:
          'El tutor transita del modelo transmisivo a la mediación activa (Díaz-Barriga y Hernández, 2010), articulando la tutoría presencial con el trabajo asíncrono. La combinación de contenido, pedagogía y tecnología se alinea con el modelo TPACK (Mishra y Koehler, 2006).',
      },
      {
        label: 'Evaluación y retroalimentación',
        refs: [5, 6],
        evidence:
          'Evaluación diversificada: actividades exaula, portafolio del módulo, exámenes escritos, experimentos y laboratorio; autoevaluación al cierre de cada clase y preguntas dirigidas.',
        interpretation:
          'Se combinan instrumentos formativos y sumativos con evidencias prácticas. La autoevaluación y las preguntas dirigidas funcionan como retroalimentación inmediata que permite detectar a tiempo a quienes requieren acompañamiento.',
      },
      {
        label: 'Atención a la diversidad y clima del aula',
        refs: [6, 8],
        evidence:
          'Preguntas y respuestas orientadas a quienes no ponen atención o presentan más dificultades; el uso de la tecnología se limita a la clase presencial.',
        interpretation:
          'El acompañamiento diferenciado actúa como andamiaje dentro de la Zona de Desarrollo Próximo (Vygotsky, 1978). La guía de observación lo confirma: el diálogo y el respeto docente-estudiante se registraron "siempre", aunque la práctica tecnológica fuera del aula sigue siendo escasa.',
      },
      {
        label: 'Fortalezas y necesidades prioritarias',
        refs: [9, 10],
        evidence:
          'Reforzar el funcionamiento de la computadora, el manejo de plataformas para tareas y la resolución de problemas básicos; usar Meet para reforzar fuera del horario de clase.',
        interpretation:
          'La prioridad es la alfabetización digital funcional y el refuerzo síncrono. La propuesta de Meet responde directamente al 0% de uso de videollamadas reportado por los estudiantes y amplía el acompañamiento más allá de la jornada sabatina.',
      },
    ],
  },
  {
    id: 'coordinador',
    instrument: '5.6.4',
    name: 'Gerardo',
    role: 'Coordinador de Modalidades Flexibles',
    shortRole: 'Coordinador',
    date: '12/09/2026',
    icon: UserCog,
    accent: '#8C6D3F',
    quote: 'A muchos se les dificulta utilizar una computadora.',
    tableTitle: 'Tabla 2. Análisis e interpretación de la entrevista con el coordinador',
    tableColumn: 'Dimensión',
    qa: COORDINATOR_QA,
    analysis: [
      {
        label: 'Características generales de la institución',
        refs: [1, 3],
        evidence:
          'Dirección única para las modalidades presencial y flexible; docentes que en su mayoría laboran en la misma institución; población mayoritariamente adulta (≈75% mayores de 22 años), trabajadora y con madres de familia.',
        interpretation:
          'La modalidad flexible está integrada a la estructura del instituto. El perfil adulto coincide con la encuesta (81.8% de 19 años o más) y exige una pedagogía flexible que reconozca la experiencia y las responsabilidades del estudiantado.',
      },
      {
        label: 'Organización y funcionamiento',
        refs: [1, 2, 4],
        evidence:
          'Gestión centrada en matrícula y registro; jornada sabatina de 7:00 a.m. a 5:00 p.m.; consultas entre semana por WhatsApp; inasistencias por trabajo, cuidado de hijos y transporte desde otros municipios.',
        interpretation:
          'El modelo semipresencial descansa en el trabajo autónomo entre semana, con WhatsApp como canal de acompañamiento asíncrono. Los factores laborales, familiares y de traslado coinciden con las sugerencias abiertas de los estudiantes sobre horario y carga de tareas.',
      },
      {
        label: 'Recursos tecnológicos',
        refs: [6, 7],
        evidence:
          '30 computadoras funcionales que requieren actualizar software, 6 proyectores compartidos + 1 en el salón de usos múltiples, bocinas, 1 laboratorio de informática e Internet del MINED con restricciones a sitios no educativos.',
        interpretation:
          'A nivel institucional la primera brecha digital (acceso) está en gran medida cubierta (Van Dijk, 2005). El uso compartido de proyectores y equipos explica la valoración "parcialmente" registrada en la guía de observación.',
      },
      {
        label: 'Condiciones institucionales',
        refs: [5, 8],
        evidence:
          'Aulas asignadas, biblioteca, área administrativa, apoyo psicológico, módulos impresos y digitales y tutorías; sin personal técnico permanente: el MINED da soporte de red y los docentes de informática mantienen los equipos.',
        interpretation:
          'Existe un sistema de apoyo integral favorable al aprendizaje. La falta de soporte técnico permanente es un riesgo para la operatividad tecnológica que Cabero-Almenara (2015) considera condición estructural en la educación a distancia.',
      },
      {
        label: 'Fortalezas, necesidades y posibilidades de mejora',
        refs: [9, 10],
        evidence:
          'Fortalezas: equipo disponible y disposición de los tutores hacia lo digital. Necesidades: formación continua docente en metodologías tecnológicas y pedagógicas, y un espacio de formación informática para estudiantes.',
        interpretation:
          'Converge con el tutor: la prioridad es la segunda brecha digital (competencias). La disposición docente es una oportunidad para consolidar prácticas TPACK y para diseñar acciones de alfabetización digital dentro de la jornada.',
      },
    ],
  },
];

const CONVERGENCES = [
  {
    icon: Users,
    title: 'Perfil adulto y maduro',
    text: 'Ambos actores destacan la mayoría de edad, el empleo y la madurez como rasgos que favorecen la responsabilidad académica.',
    refs: 'Tutor P1 · Coordinador P3',
  },
  {
    icon: Laptop,
    title: 'Brecha de competencias digitales',
    text: 'Coinciden en que a los estudiantes se les dificulta el manejo de la computadora y de las plataformas, y proponen formación específica.',
    refs: 'Tutor P2, P8, P9 · Coordinador P10',
  },
  {
    icon: Wifi,
    title: 'Acompañamiento fuera del aula',
    text: 'El coordinador reporta consultas por WhatsApp entre semana y el tutor propone sesiones de refuerzo por Meet.',
    refs: 'Tutor P10 · Coordinador P2',
  },
  {
    icon: Route,
    title: 'Recursos con potencial pedagógico',
    text: 'Computadoras, proyectores y plataformas están disponibles y los tutores muestran disposición para integrarlos en clase.',
    refs: 'Tutor P3, P7 · Coordinador P6, P9',
  },
];

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function QaItem({ item, open, onToggle, accent }) {
  return (
    <div
      id={`qa-${item.n}`}
      className={cx(
        'rounded-2xl border transition-colors duration-300 overflow-hidden scroll-mt-32',
        open ? 'border-line-strong bg-white' : 'border-line bg-white hover:border-line-strong'
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full min-h-[64px] flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 text-left"
      >
        <span className="shrink-0 font-serif text-2xl sm:text-3xl font-semibold leading-none tabular-nums" style={{ color: accent }}>
          {String(item.n).padStart(2, '0')}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">{item.topic}</span>
          <span className="block text-sm sm:text-base font-medium text-ink leading-snug mt-0.5">{item.question}</span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 text-bronze">
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
          >
            <div className="px-4 sm:px-5 pb-5">
              <div className="relative rounded-2xl border border-line bg-ivory p-4 sm:p-5 pl-11 sm:pl-14">
                <Quote size={18} className="absolute left-4 sm:left-5 top-4 sm:top-5 text-bronze" />
                <p className="font-serif italic text-lg sm:text-xl leading-snug text-body">{item.answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RefChips({ refs, onJump }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {refs.map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => onJump(r)}
          className="min-h-[30px] rounded-full border border-sand-line bg-sand px-2.5 text-[11px] font-semibold text-plum hover:bg-[#F0E6D2] transition-colors"
          aria-label={`Ver respuesta a la pregunta ${r}`}
        >
          P{r}
        </button>
      ))}
    </div>
  );
}

function AnalysisTable({ actor, onJump }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted font-semibold">
        <Table2 size={14} className="text-bronze" /> {actor.tableTitle}
      </div>

      {/* Móvil: tarjetas */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {actor.analysis.map((row, i) => (
          <div key={row.label} className="rounded-3xl border border-line bg-ivory p-5 space-y-4">
            <div className="flex items-start gap-3">
              <span className="font-serif text-2xl font-semibold text-bronze leading-none">{i + 1}</span>
              <h4 className="font-semibold text-ink leading-snug">{row.label}</h4>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-muted font-semibold mb-1.5">Evidencia</span>
              <p className="text-sm text-body leading-relaxed">{row.evidence}</p>
            </div>
            <div className="rounded-2xl bg-silk border border-line p-4">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-bronze font-semibold mb-1.5">Interpretación</span>
              <p className="text-sm text-body leading-relaxed">{row.interpretation}</p>
            </div>
            <RefChips refs={row.refs} onJump={onJump} />
          </div>
        ))}
      </div>

      {/* Escritorio: tabla editorial */}
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-line bg-ivory">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="bg-silk text-left text-[11px] uppercase tracking-[0.16em] text-muted">
              <th className="px-5 py-4 font-semibold w-[22%]">{actor.tableColumn}</th>
              <th className="px-5 py-4 font-semibold w-[33%]">Evidencia (respuestas)</th>
              <th className="px-5 py-4 font-semibold">Interpretación</th>
            </tr>
          </thead>
          <tbody>
            {actor.analysis.map((row, i) => (
              <tr key={row.label} className="align-top border-t border-line hover:bg-ivory transition-colors">
                <td className="px-5 py-5">
                  <div className="flex items-start gap-3">
                    <span className="font-serif text-2xl font-semibold text-bronze leading-none">{i + 1}</span>
                    <div className="space-y-3">
                      <span className="block font-semibold text-ink leading-snug">{row.label}</span>
                      <RefChips refs={row.refs} onJump={onJump} />
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 text-body leading-relaxed">{row.evidence}</td>
                <td className="px-5 py-5 text-body leading-relaxed">{row.interpretation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InterviewPanel({ actor }) {
  const [view, setView] = useState('qa');
  const [query, setQuery] = useState('');
  const [openSet, setOpenSet] = useState(() => new Set([1]));
  const q = normalize(query.trim());

  const filtered = useMemo(
    () => actor.qa.filter((it) => !q || normalize(`${it.topic} ${it.question} ${it.answer}`).includes(q)),
    [actor, q]
  );

  const allOpen = filtered.length > 0 && filtered.every((it) => openSet.has(it.n));

  const toggle = (n) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });

  const toggleAll = () => setOpenSet(allOpen ? new Set() : new Set(filtered.map((it) => it.n)));

  const jumpTo = (n) => {
    setQuery('');
    setOpenSet((prev) => new Set(prev).add(n));
    setView('qa');
    window.setTimeout(() => {
      document.getElementById(`qa-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 380);
  };

  const Icon = actor.icon;

  return (
    <div className="space-y-8">
      {/* Perfil del entrevistado */}
      <GlassCard hover={false} padded={false} className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-line bg-ivory">
            <div className="flex items-start gap-4">
              <span
                className="shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-line"
                style={{ background: `${actor.accent}1F`, color: actor.accent }}
              >
                <Icon size={26} />
              </span>
              <div className="min-w-0">
                <span className="text-[11px] uppercase tracking-[0.22em] text-bronze font-semibold">Instrumento {actor.instrument}</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight">{actor.name}</h3>
                <p className="text-sm text-muted mt-1">{actor.role}</p>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 text-sm">
              {[
                { icon: CalendarDays, label: 'Fecha', value: actor.date },
                { icon: PenLine, label: 'Entrevistadora', value: INTERVIEWER },
                { icon: School, label: 'Institución', value: 'Instituto Nacional Dr. Francisco Martínez Suárez' },
                { icon: MessagesSquare, label: 'Estructura', value: '10 preguntas abiertas' },
              ].map((m) => {
                const MIcon = m.icon;
                return (
                  <div key={m.label} className="flex items-start gap-2.5">
                    <MIcon size={15} className="shrink-0 mt-0.5 text-plum" />
                    <div className="min-w-0">
                      <dt className="text-[10px] uppercase tracking-[0.18em] text-muted">{m.label}</dt>
                      <dd className="text-body leading-snug">{m.value}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>
          <div className="lg:col-span-7 p-5 sm:p-7 flex items-center">
            <EditorialQuote author={`${actor.shortRole} · Respuesta literal`}>“{actor.quote}”</EditorialQuote>
          </div>
        </div>
      </GlassCard>

      <TabBar
        tabs={[
          { id: 'qa', label: 'Cuestionario y respuestas', shortLabel: 'Respuestas', icon: MessageSquareQuote, count: actor.qa.length },
          { id: 'analisis', label: actor.tableTitle.split('.')[0] + ' · Análisis', shortLabel: 'Análisis', icon: Table2, count: actor.analysis.length },
        ]}
        active={view}
        onChange={setView}
        layoutId={`entrevista-vista-${actor.id}`}
        size="sm"
      />

      <AnimatePresence mode="wait">
        {view === 'qa' ? (
          <motion.div key="qa" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="space-y-5">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <SearchInput value={query} onChange={setQuery} placeholder="Buscar en preguntas y respuestas..." className="sm:flex-1" />
              <button
                type="button"
                onClick={toggleAll}
                disabled={filtered.length === 0}
                className="shrink-0 min-h-[46px] inline-flex items-center justify-center gap-2 rounded-2xl border border-line bg-white px-4 text-sm font-medium text-body hover:text-plum hover:border-line-strong disabled:opacity-40 transition-colors"
              >
                {allOpen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                {allOpen ? 'Contraer todo' : 'Expandir todo'}
              </button>
            </div>
            {filtered.length === 0 ? (
              <EmptyState title="Sin coincidencias" description="Ninguna pregunta o respuesta contiene ese término." />
            ) : (
              <div className="space-y-3">
                {filtered.map((it) => (
                  <QaItem key={it.n} item={it} open={openSet.has(it.n)} onToggle={() => toggle(it.n)} accent={actor.accent} />
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div key="analisis" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <AnalysisTable actor={actor} onJump={jumpTo} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Entrevistas() {
  const [actorId, setActorId] = useState('tutor');
  const actor = ACTORS.find((a) => a.id === actorId);

  return (
    <div className="space-y-10 sm:space-y-14">
      <SectionHeader
        eyebrow="Instrumentos 5.6.3 y 5.6.4 · 12/09/2026"
        icon={MessagesSquare}
        title="Entrevistas a"
        highlight="actores clave"
        description={`Voces del docente tutor y del coordinador de la modalidad flexible, recogidas por ${INTERVIEWER}. Consulta las respuestas literales y su análisis e interpretación por dimensión.`}
      />

      {/* Selector de actor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="tablist" aria-label="Seleccionar entrevista">
        {ACTORS.map((a) => {
          const Icon = a.icon;
          const active = a.id === actorId;
          return (
            <button
              key={a.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActorId(a.id)}
              className={cx(
                'relative text-left rounded-3xl border p-5 sm:p-6 transition-all duration-300 overflow-hidden',
                active ? 'border-plum bg-white shadow-paper-lg' : 'border-line bg-white shadow-paper hover:border-line-strong'
              )}
            >
              {active && (
                <motion.span
                  layoutId="entrevista-actor-activo"
                  className="absolute inset-0 bg-lilac/50"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative flex items-center gap-4">
                <span
                  className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line"
                  style={{ background: `${a.accent}1F`, color: a.accent }}
                >
                  <Icon size={22} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-[0.2em] text-muted font-semibold">{a.shortRole}</span>
                  <span className="block font-serif text-xl sm:text-2xl font-semibold text-ink leading-tight">{a.name}</span>
                  <span className="block text-xs text-muted mt-1">{a.role}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={actor.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <InterviewPanel actor={actor} />
        </motion.div>
      </AnimatePresence>

      <Divider />

      {/* Convergencias */}
      <section className="space-y-6">
        <div className="flex items-start gap-3">
          <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sand border border-sand-line text-bronze">
            <GitMerge size={19} />
          </span>
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">Convergencias entre actores</h3>
            <p className="text-sm text-muted mt-1">Puntos en los que el tutor y el coordinador coinciden y que alimentan la triangulación.</p>
          </div>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {CONVERGENCES.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div key={c.title} variants={fadeUp}>
                <GlassCard className="h-full" padded={false}>
                  <div className="p-5 h-full flex flex-col">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lilac border border-line text-plum">
                      <Icon size={18} />
                    </span>
                    <h4 className="mt-4 font-semibold text-ink">{c.title}</h4>
                    <p className="mt-2 text-sm text-body leading-relaxed flex-1">{c.text}</p>
                    <p className="mt-4 inline-flex items-start gap-1.5 rounded-2xl border border-sand-line bg-sand px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-plum leading-snug">
                      <Sparkles size={12} className="shrink-0 mt-0.5" />
                      {c.refs}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
