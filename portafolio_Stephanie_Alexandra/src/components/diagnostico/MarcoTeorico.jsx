import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpenText,
  ScanSearch,
  Building2,
  Brain,
  Flame,
  HeartHandshake,
  Atom,
  Wifi,
  Layers,
  Compass,
  Library,
  ChevronDown,
  Quote,
  Lightbulb,
  Link2,
  CalendarRange,
  NotebookPen,
  Focus,
  BookCopy,
  BookOpen,
  House,
  ClipboardCheck,
  Microscope,
  Telescope,
  Target,
  Users,
  GraduationCap,
  UserCog,
  Eye,
  ClipboardList,
  MessagesSquare,
  Copy,
  Check,
  Smartphone,
  Signal,
  Sparkles,
  ArrowDownAZ,
} from 'lucide-react';
import { GlassCard, SectionHeader, Badge, SearchInput, TabBar, EmptyState } from '../ui/Primitives';
import { cx, normalize, fadeUp, stagger } from '../ui/tokens';

/* =====================================================================
   MARCO TEÓRICO Y DISEÑO METODOLÓGICO DEL DIAGNÓSTICO
   ===================================================================== */

const CATEGORIES = [
  { id: 'all', label: 'Todos los ejes' },
  { id: 'contexto', label: 'Diagnóstico y contexto' },
  { id: 'estudiante', label: 'Estudiantado' },
  { id: 'docencia', label: 'Práctica docente' },
  { id: 'tecnologia', label: 'Tecnología educativa' },
];

const HABITS = [
  {
    icon: CalendarRange,
    title: 'Organización y planificación para el estudio',
    text: 'Establecer tiempos diferenciados según la dificultad de cada asignatura, asignar horarios y priorizar actividades.',
  },
  {
    icon: Focus,
    title: 'Atención y esfuerzo en clase',
    text: 'Estar atento a las explicaciones, preguntar dudas, tomar y organizar apuntes diariamente evitando distracciones.',
  },
  {
    icon: Brain,
    title: 'Memorización',
    text: 'Estrategias como elaborar resúmenes, cuadros sinópticos, esquemas y diagramas de flujo.',
  },
  {
    icon: BookOpen,
    title: 'Comprensión de lectura',
    text: 'Subrayar, hacer anotaciones, profundizar en otros textos y relacionar la lectura con conocimientos previos.',
  },
  {
    icon: House,
    title: 'Estudiar en casa',
    text: 'Establecer y cumplir horarios en un lugar bien iluminado y ventilado, con acceso a materiales bibliográficos e Internet.',
  },
  {
    icon: ClipboardCheck,
    title: 'Estudiar para los exámenes',
    text: 'Repasos frecuentes resumiendo lo esencial e iniciando con tiempo un repaso profundo.',
  },
];

const DIVIDE_LEVELS = [
  { level: 'Primera brecha', title: 'Acceso', text: 'Disponibilidad de dispositivos y de conectividad.', icon: Wifi },
  { level: 'Segunda brecha', title: 'Competencias y uso', text: 'Habilidades digitales y frecuencia de uso de la tecnología.', icon: Signal },
  {
    level: 'Tercera brecha',
    title: 'Apropiación',
    text: 'Capacidad de transformar la tecnología en oportunidades reales de aprendizaje y desarrollo.',
    icon: Sparkles,
  },
];

const FUNDAMENTOS = [
  {
    id: 1,
    category: 'contexto',
    icon: ScanSearch,
    title: 'Diagnóstico educativo y conocimiento del contexto',
    authors: ['Rededuca, 2025'],
    quote:
      'Proceso sistemático y científico orientado a identificar, analizar y valorar las necesidades, potencialidades, dificultades y condiciones del proceso de enseñanza-aprendizaje, a nivel individual y colectivo, para tomar decisiones pedagógicas fundamentadas que optimicen la calidad y la equidad educativa.',
    body: [
      'En este diagnóstico, el conocimiento del contexto se construye articulando la guía de observación y el cuestionario estudiantil, complementados con las entrevistas al docente tutor y al coordinador de la modalidad flexible.',
    ],
    implications: [
      'Fundamentar cada decisión pedagógica en evidencias recogidas en el propio grupo.',
      'Atender tanto la dimensión individual como la colectiva del aprendizaje.',
      'Triangular instrumentos para obtener una lectura integral y no fragmentada del contexto.',
    ],
    link: 'Sustenta el uso combinado de los cuatro instrumentos (5.6.1 a 5.6.4).',
  },
  {
    id: 2,
    category: 'contexto',
    icon: Building2,
    title: 'Entorno físico, infraestructura tecnológica, conectividad y soporte técnico',
    authors: ['Cabero-Almenara, 2015'],
    quote:
      'El entorno físico incide en el clima del aula, la atención y el rendimiento. En modalidades semipresenciales y a distancia, la disponibilidad tecnológica deja de ser accesoria y se vuelve una condición estructural.',
    body: [
      'Esa condición estructural implica equipos actualizados, proyectores, bocinas y un ancho de banda suficiente para sostener las actividades de aprendizaje.',
      'El Instituto Nacional Dr. Francisco Martínez Suárez cuenta con centro de cómputo, bocinas y proyectores (aunque no en todas las aulas) y requiere mecanismos de soporte técnico que garanticen su operatividad.',
    ],
    implications: [
      'Planificar el uso de los espacios y equipos compartidos con anticipación.',
      'Prever alternativas cuando un recurso tecnológico no esté disponible en el aula.',
      'Gestionar el mantenimiento y la actualización de software como parte de la planificación.',
    ],
    link: 'Dimensión 2 de la guía de observación y entrevista al coordinador (P5 a P8).',
  },
  {
    id: 3,
    category: 'estudiante',
    icon: NotebookPen,
    title: 'Autonomía estudiantil y hábitos de estudio',
    authors: ['Ruiz, Morán y Massó, 2026', 'Cartagena, 2008', 'Bonilla, 2021'],
    quote:
      'La autonomía es la capacidad de actuar de forma autodeterminada, fijarse metas, supervisar y evaluar el propio aprendizaje.',
    body: [
      'Los hábitos de estudio constituyen el soporte práctico de esa autonomía y abarcan seis pilares fundamentales que orientan el trabajo independiente del estudiantado.',
    ],
    visual: 'habits',
    implications: [
      'Enseñar explícitamente estrategias de organización, lectura y repaso.',
      'Diseñar guías de trabajo en casa con tiempos y prioridades claras.',
      'Acompañar a quienes aún no consolidan el estudio independiente.',
    ],
    link: 'Encuesta P4: el 81.9% estudia por su cuenta siempre o casi siempre.',
  },
  {
    id: 4,
    category: 'estudiante',
    icon: Flame,
    title: 'Participación y motivación académica',
    authors: ['Ortega, 2024', 'Psisemadrid, 2017'],
    quote:
      'La participación va más allá de asistir y entregar tareas: implica un involucramiento activo y positivo. La motivación activa las conductas necesarias para alcanzar los objetivos de aprendizaje y mantener una implicación eficaz.',
    body: [
      'Ambos constructos se retroalimentan: un estudiante motivado tiende a involucrarse, y las experiencias de participación significativa sostienen la motivación a lo largo del proceso.',
    ],
    implications: [
      'Variar las dinámicas para involucrar a quienes intervienen menos.',
      'Conectar los contenidos con las metas personales y laborales del grupo.',
      'Reconocer los avances para sostener la implicación en el tiempo.',
    ],
    link: 'Encuesta P5 y P7: 63.7% participa con frecuencia y 90.9% se siente motivado.',
  },
  {
    id: 5,
    category: 'docencia',
    icon: HeartHandshake,
    title: 'Práctica docente, estrategias de enseñanza e interacción',
    authors: ['Díaz-Barriga y Hernández, 2010', 'Vygotsky, 1978'],
    quote:
      'El diálogo horizontal entre docente y estudiante, y entre pares, genera una Zona de Desarrollo Próximo que favorece el andamiaje y reduce el aislamiento propio de la educación a distancia.',
    body: [
      'La práctica docente transita desde modelos de transmisión unidireccional hacia la mediación activa y la construcción colaborativa del conocimiento.',
      'Esa mediación conecta las tutorías presenciales con el trabajo asíncrono en casa mediante el aprendizaje basado en problemas, las prácticas experimentales y las guías de trabajo, desde el enfoque sociocultural de Vygotsky (1978).',
    ],
    implications: [
      'Planificar la tutoría sabatina como espacio de mediación, no solo de exposición.',
      'Usar problemas y experimentos que den continuidad al trabajo en casa.',
      'Promover la interacción entre pares como fuente de andamiaje.',
    ],
    link: 'Dimensiones 3 y 4 de la guía de observación y entrevista al tutor (P3, P4, P6).',
  },
  {
    id: 6,
    category: 'tecnologia',
    icon: Atom,
    title: 'Integración pedagógica de las TIC y modelo TPACK',
    authors: ['Mishra y Koehler, 2006'],
    quote:
      'La integración de la tecnología surge de la intersección armónica entre el conocimiento disciplinar, el pedagógico y el tecnológico, respondiendo a un propósito didáctico explícito y no solo por tendencia.',
    body: [
      'El modelo TPACK propone que el docente no elija herramientas de forma aislada, sino a partir de lo que el contenido exige y de la metodología que mejor lo media.',
    ],
    visual: 'tpack',
    implications: [
      'Justificar cada herramienta digital con un objetivo de aprendizaje concreto.',
      'Elegir la tecnología después de definir contenido y metodología.',
      'Evaluar si la herramienta mejora realmente la comprensión del tema.',
    ],
    link: 'Indicador 15 de la observación y entrevista al tutor (P7).',
  },
  {
    id: 7,
    category: 'tecnologia',
    icon: Wifi,
    title: 'Brecha digital en tres niveles y Entornos Virtuales de Aprendizaje (EVA)',
    authors: ['Van Dijk, 2005', 'Belloch, 2012'],
    quote:
      'La brecha digital no se agota en el acceso: incluye las competencias y la frecuencia de uso, y la apropiación que permite transformar la tecnología en oportunidades reales.',
    body: [
      'En El Salvador, el uso masivo de smartphones contrasta con la escasez de computadoras personales y la inestabilidad de los datos móviles.',
      'Los EVA (Moodle, Google Classroom) requieren recursos accesibles, portables en dispositivos móviles y relevantes para el estudio autónomo.',
    ],
    visual: 'divide',
    implications: [
      'Diseñar materiales ligeros y legibles desde el teléfono celular.',
      'Ofrecer alternativas offline o descargables para conexiones inestables.',
      'Acompañar el desarrollo de competencias digitales, no solo el acceso.',
    ],
    link: 'Encuesta P3, P8, P9 y P12: 27.3% depende del smartphone y 90.9% usa EVA.',
  },
];

const METHOD_CARDS = [
  {
    code: '5.1',
    title: 'Enfoque metodológico',
    value: 'Mixto con predominio cualitativo',
    text: 'Integra datos cualitativos (experiencias, dinámicas y prácticas pedagógicas) y cuantitativos (cuestionario estudiantil).',
    icon: Compass,
  },
  {
    code: '5.2',
    title: 'Alcance',
    value: 'Descriptivo',
    text: 'Caracteriza las condiciones del contexto, del estudiantado, de la institución, de la pedagogía y de la tecnología.',
    icon: Telescope,
  },
  {
    code: '5.3',
    title: 'Unidad de análisis',
    value: 'Proceso de enseñanza-aprendizaje',
    text: 'En el grupo de Primer Año de Bachillerato, en la asignatura de Ciencias Naturales y Tecnología.',
    icon: Microscope,
  },
];

const PARTICIPANTS = [
  { icon: Users, title: 'Estudiantes de 1.° Año de Bachillerato', detail: 'N = 11 encuestados', role: 'Informantes del cuestionario' },
  { icon: GraduationCap, title: 'Lcdo. Amilcar Heriberto Sánchez', detail: 'Docente tutor de la asignatura', role: 'Entrevista y clase observada' },
  { icon: UserCog, title: 'Gerardo', detail: 'Coordinador de la modalidad flexible', role: 'Entrevista institucional' },
];

const INSTRUMENT_LABELS = {
  obs: { label: 'Observación', icon: Eye },
  enc: { label: 'Encuesta', icon: ClipboardList },
  tut: { label: 'Entrevista al tutor', icon: GraduationCap },
  coo: { label: 'Entrevista al coordinador', icon: UserCog },
};

const DIMENSIONS = [
  { n: 1, label: 'Características generales de los estudiantes', sources: { enc: 'P1, P2, P4', tut: 'P1, P2', coo: 'P3' } },
  { n: 2, label: 'Accesibilidad a Internet', sources: { enc: 'P3, P9', obs: 'Indicador 10', coo: 'P7' } },
  { n: 3, label: 'Motivación', sources: { enc: 'P5, P6, P7', obs: 'Dimensión 1' } },
  { n: 4, label: 'Apoyo docente', sources: { enc: 'P10, P11', obs: 'Dimensión 4', tut: 'P4, P6' } },
  { n: 5, label: 'Entorno institucional', sources: { obs: 'Dimensión 2', coo: 'P1, P2, P5, P8' } },
  { n: 6, label: 'Herramientas tecnológicas', sources: { enc: 'P8, P12', obs: 'Indicador 15', tut: 'P7, P8', coo: 'P6' } },
  { n: 7, label: 'Necesidades o mejoras', sources: { enc: 'P13', tut: 'P9, P10', coo: 'P10' } },
];

const INSTRUMENTS = [
  { code: '5.6.1', title: 'Guía de observación sistemática', icon: Eye, meta: '22/08/2026 · 20 indicadores en 4 dimensiones', text: 'Registro directo de las condiciones del entorno, los recursos y las interacciones durante la clase.' },
  { code: '5.6.2', title: 'Encuesta a estudiantes', icon: ClipboardList, meta: '12/09/2026 · Google Forms · N = 11', text: 'Cuestionario de 13 preguntas en 8 secciones sobre perfil, hábitos, motivación, tecnología y apoyo docente.' },
  { code: '5.6.3', title: 'Entrevista al docente tutor', icon: MessagesSquare, meta: '12/09/2026 · 10 preguntas', text: 'Recoge la mirada pedagógica sobre el grupo, las estrategias, la evaluación y las barreras tecnológicas.' },
  { code: '5.6.4', title: 'Entrevista al coordinador', icon: UserCog, meta: '12/09/2026 · 10 preguntas', text: 'Recoge la mirada institucional sobre organización, perfil estudiantil, infraestructura y soporte técnico.' },
];

/* Los títulos de las entradas con verificar: true deben cotejarse con la lista final del informe. */
const REFERENCES = [
  {
    key: 'belloch',
    type: 'Recurso institucional',
    text: 'Belloch, C. (2012). Entornos virtuales de aprendizaje. Unidad de Tecnología Educativa, Universidad de Valencia.',
    cited: [7],
  },
  {
    key: 'bonilla',
    type: 'Artículo',
    verificar: true,
    text: 'Bonilla, L. M. H. (2021). Hábitos de estudio y su relación con el aprendizaje autónomo en estudiantes de educación media.',
    cited: [3],
  },
  {
    key: 'cabero',
    type: 'Artículo',
    text: 'Cabero Almenara, J., & Llorente Cejudo, M. C. (2015). Tecnologías de la información y la comunicación (TIC): Escenarios formativos y teorías del aprendizaje. Revista Lasallista de Investigación, 12(2), 186-193.',
    cited: [2],
  },
  {
    key: 'diaz',
    type: 'Libro',
    text: 'Díaz Barriga, F., & Hernández Rojas, G. (2010). Estrategias docentes para un aprendizaje significativo: Una interpretación constructivista (3.ª ed.). McGraw-Hill.',
    cited: [5],
  },
  {
    key: 'mishra',
    type: 'Artículo',
    text: 'Mishra, P., & Koehler, M. J. (2006). Technological pedagogical content knowledge: A framework for teacher knowledge. Teachers College Record, 108(6), 1017-1054.',
    cited: [6],
  },
  {
    key: 'ortega',
    type: 'Recurso web',
    verificar: true,
    text: 'Ortega, C. (2024). Participación estudiantil: Qué es y cómo fomentarla. QuestionPro.',
    cited: [4],
  },
  {
    key: 'psisemadrid',
    type: 'Recurso web',
    verificar: true,
    text: 'Psisemadrid. (2017). La motivación académica. Psicólogos en Madrid.',
    cited: [4],
  },
  {
    key: 'rededuca',
    type: 'Recurso web',
    verificar: true,
    text: 'Rededuca. (2025). El diagnóstico educativo: Concepto, finalidad y fases. Red Educativa Digital.',
    cited: [1],
  },
  {
    key: 'ruiz',
    type: 'Artículo',
    verificar: true,
    text: 'Ruiz, F., Morán, P., & Massó, L. (2026). La autonomía del estudiante en el aprendizaje: Autorregulación, metas y evaluación del propio proceso.',
    cited: [3],
  },
  {
    key: 'vandijk',
    type: 'Libro',
    text: 'Van Dijk, J. A. G. M. (2005). The deepening divide: Inequality in the information society. SAGE Publications.',
    cited: [7],
  },
  {
    key: 'vygotsky',
    type: 'Libro',
    text: 'Vygotsky, L. S. (1978). Mind in society: The development of higher psychological processes. Harvard University Press.',
    cited: [5],
  },
];

/* ---------------------------------------------------------------------
   Visuales específicos
   --------------------------------------------------------------------- */

function HabitsGrid() {
  const [active, setActive] = useState(0);
  return (
    <div className="space-y-3">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold">Los 6 pilares de los hábitos de estudio</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {HABITS.map((h, i) => {
          const Icon = h.icon;
          const isActive = active === i;
          return (
            <button
              key={h.title}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={cx(
                'text-left rounded-2xl border p-4 transition-all duration-300',
                isActive ? 'border-plum bg-sand' : 'border-line bg-ivory hover:border-line-strong'
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cx(
                    'shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl border',
                    isActive ? 'bg-plum border-plum text-white' : 'bg-lilac border-line text-plum'
                  )}
                >
                  <Icon size={17} />
                </span>
                <span className="text-sm font-semibold text-ink leading-snug">{h.title}</span>
              </div>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-sm text-body leading-relaxed pt-3"
                  >
                    {h.text}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TpackDiagram() {
  const [hovered, setHovered] = useState(null);
  const circles = [
    { id: 'C', label: 'Contenido', sub: 'Conocimiento disciplinar', cx: 100, cy: 78, color: '#4A2574' },
    { id: 'P', label: 'Pedagogía', sub: 'Metodología', cx: 140, cy: 146, color: '#8C6D3F' },
    { id: 'T', label: 'Tecnología', sub: 'Herramientas', cx: 60, cy: 146, color: '#2F6B50' },
  ];
  const active = circles.find((c) => c.id === hovered);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
      <svg viewBox="0 0 200 210" className="w-full max-w-[260px] mx-auto" role="img" aria-label="Diagrama del modelo TPACK">
        {circles.map((c) => (
          <motion.circle
            key={c.id}
            cx={c.cx}
            cy={c.cy}
            r={56}
            fill={c.color}
            stroke={c.color}
            strokeWidth={1.5}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ fillOpacity: hovered === null || hovered === c.id ? 0.16 : 0.05 }}
            transition={{ duration: 0.6 }}
            style={{ transformOrigin: `${c.cx}px ${c.cy}px`, cursor: 'pointer' }}
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setHovered((h) => (h === c.id ? null : c.id))}
          />
        ))}
        {circles.map((c) => (
          <text
            key={`${c.id}-t`}
            x={c.id === 'C' ? c.cx : c.id === 'P' ? c.cx + 22 : c.cx - 22}
            y={c.id === 'C' ? c.cy - 22 : c.cy + 26}
            textAnchor="middle"
            className="pointer-events-none"
            fill="#1E112A"
            fontSize="11"
            fontWeight="600"
          >
            {c.label}
          </text>
        ))}
        <text x="100" y="128" textAnchor="middle" fill="#4A2574" fontSize="15" fontWeight="700" className="pointer-events-none font-serif">
          TPACK
        </text>
      </svg>
      <div className="space-y-3">
        {circles.map((c) => (
          <button
            key={c.id}
            type="button"
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setHovered((h) => (h === c.id ? null : c.id))}
            className={cx(
              'w-full flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors',
              hovered === c.id ? 'border-plum bg-white' : 'border-line bg-ivory'
            )}
          >
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: c.color }} />
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-semibold text-ink">{c.label}</span>
              <span className="block text-xs text-muted">{c.sub}</span>
            </span>
          </button>
        ))}
        <p className="text-xs text-muted leading-relaxed min-h-[2.5rem]">
          {active
            ? `${active.label}: una de las tres dimensiones que, integradas, dan sentido didáctico a la tecnología.`
            : 'Pasa el cursor o toca cada dimensión para destacarla en el diagrama.'}
        </p>
      </div>
    </div>
  );
}

function DigitalDivide() {
  return (
    <div className="space-y-3">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold">Los tres niveles de la brecha digital</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {DIVIDE_LEVELS.map((lv, i) => {
          const Icon = lv.icon;
          return (
            <motion.div
              key={lv.level}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-2xl border border-line bg-ivory p-4 overflow-hidden"
            >
              <div className="absolute left-0 bottom-0 h-1 bg-plum" style={{ width: `${(i + 1) * 33.3}%` }} />
              <div className="flex items-center gap-2">
                <Icon size={16} className="text-bronze" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted font-semibold">{lv.level}</span>
              </div>
              <p className="mt-2 font-serif text-xl font-semibold text-ink">{lv.title}</p>
              <p className="mt-1 text-sm text-body leading-relaxed">{lv.text}</p>
            </motion.div>
          );
        })}
      </div>
      <div className="flex items-start gap-3 rounded-2xl border border-sand-line bg-sand p-4">
        <Smartphone size={18} className="shrink-0 mt-0.5 text-bronze" />
        <p className="text-sm text-body leading-relaxed">
          Contexto salvadoreño: predominio del smartphone frente a la escasez de computadoras personales y la inestabilidad de los datos móviles.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Bloque A · Fundamentos teórico-conceptuales
   --------------------------------------------------------------------- */

function FundamentoCard({ item, open, onToggle }) {
  const Icon = item.icon;
  return (
    <motion.article variants={fadeUp} layout>
      <div
        className={cx(
          'rounded-3xl border transition-colors duration-300 overflow-hidden',
          open ? 'border-sand-line bg-white' : 'border-line bg-white hover:border-line-strong'
        )}
      >
        <button type="button" onClick={onToggle} aria-expanded={open} className="w-full flex items-start gap-4 p-5 sm:p-6 text-left">
          <span className="hidden sm:block shrink-0 font-serif text-4xl font-semibold leading-none text-bronze tabular-nums">
            {String(item.id).padStart(2, '0')}
          </span>
          <span className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-lilac border border-line text-plum">
            <Icon size={20} />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-serif text-xl sm:text-2xl font-semibold text-ink leading-snug">{item.title}</span>
            <span className="mt-2 flex flex-wrap gap-1.5">
              {item.authors.map((a) => (
                <Badge key={a} toneName="amber">
                  {a}
                </Badge>
              ))}
            </span>
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
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-6 space-y-6">
                <figure className="relative rounded-2xl border border-line bg-silk p-5 sm:p-6 pl-12 sm:pl-14">
                  <Quote size={20} className="absolute left-4 sm:left-5 top-5 text-bronze" />
                  <blockquote className="font-serif italic text-lg sm:text-xl leading-snug text-body">{item.quote}</blockquote>
                  <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-bronze">({item.authors.join('; ')})</figcaption>
                </figure>
                {item.body.map((p) => (
                  <p key={p.slice(0, 32)} className="text-sm sm:text-[15px] leading-relaxed text-body">
                    {p}
                  </p>
                ))}
                {item.visual === 'habits' && <HabitsGrid />}
                {item.visual === 'tpack' && <TpackDiagram />}
                {item.visual === 'divide' && <DigitalDivide />}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-8 rounded-2xl border border-line bg-ivory p-4 sm:p-5">
                    <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold mb-3">
                      <Lightbulb size={14} /> Implicaciones en la práctica
                    </p>
                    <ul className="space-y-2">
                      {item.implications.map((imp) => (
                        <li key={imp} className="flex gap-2.5 text-sm text-body leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-bronze" />
                          {imp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-4 rounded-2xl border border-line bg-lilac p-4 sm:p-5">
                    <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-plum font-semibold mb-2">
                      <Link2 size={14} /> Vínculo con el diagnóstico
                    </p>
                    <p className="text-sm text-body leading-relaxed">{item.link}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

function FundamentosBlock() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(1);
  const q = normalize(query.trim());

  const filtered = useMemo(
    () =>
      FUNDAMENTOS.filter((f) => {
        if (category !== 'all' && f.category !== category) return false;
        if (!q) return true;
        return normalize([f.title, f.quote, ...f.authors, ...f.body, ...f.implications].join(' ')).includes(q);
      }),
    [category, q]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              aria-pressed={category === c.id}
              className={cx(
                'min-h-[40px] rounded-full border px-4 text-xs sm:text-sm font-medium transition-all',
                category === c.id
                  ? 'border-plum bg-plum text-white shadow-sm'
                  : 'border-lilac-line bg-white text-body hover:border-line-strong hover:text-plum'
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <SearchInput value={query} onChange={setQuery} placeholder="Buscar concepto o autor..." className="lg:max-w-xs" />
      </div>
      {filtered.length === 0 ? (
        <EmptyState title="Sin fundamentos para esta búsqueda" description="Prueba con otro concepto, autor o eje temático." />
      ) : (
        <motion.div key={`${category}-${q}`} initial="hidden" animate="show" variants={stagger} className="space-y-4">
          {filtered.map((f) => (
            <FundamentoCard key={f.id} item={f} open={openId === f.id} onToggle={() => setOpenId((cur) => (cur === f.id ? null : f.id))} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------
   Bloque B · Diseño metodológico
   --------------------------------------------------------------------- */

function MetodologiaBlock() {
  const [dimension, setDimension] = useState(1);
  const activeDim = DIMENSIONS.find((d) => d.n === dimension);

  return (
    <div className="space-y-10">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {METHOD_CARDS.map((m) => {
          const Icon = m.icon;
          return (
            <motion.div key={m.code} variants={fadeUp}>
              <GlassCard className="h-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.2em] text-bronze">{m.code}</span>
                  <Icon size={18} className="text-plum" />
                </div>
                <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-muted font-semibold">{m.title}</p>
                <p className="mt-1 font-serif text-2xl font-semibold text-ink leading-tight">{m.value}</p>
                <p className="mt-3 text-sm text-body leading-relaxed">{m.text}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>

      <section className="space-y-4">
        <h4 className="flex items-center gap-3 font-serif text-2xl sm:text-3xl font-semibold text-ink">
          <span className="text-sm font-sans font-semibold tracking-[0.2em] text-bronze">5.4</span> Participantes clave
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PARTICIPANTS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex items-start gap-4 rounded-3xl border border-line bg-ivory p-5">
                <span className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sand border border-sand-line text-bronze">
                  <Icon size={20} />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-ink leading-snug">{p.title}</p>
                  <p className="text-sm text-body mt-0.5">{p.detail}</p>
                  <p className="text-xs text-plum mt-2">{p.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h4 className="flex items-center gap-3 font-serif text-2xl sm:text-3xl font-semibold text-ink">
          <span className="text-sm font-sans font-semibold tracking-[0.2em] text-bronze">5.5</span> Las 7 dimensiones de estudio
        </h4>
        <p className="text-sm text-muted">Selecciona una dimensión para ver qué instrumentos la abordan.</p>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DIMENSIONS.map((d) => (
              <button
                key={d.n}
                type="button"
                onClick={() => setDimension(d.n)}
                aria-pressed={dimension === d.n}
                className={cx(
                  'flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all',
                  dimension === d.n ? 'border-plum bg-lilac' : 'border-line bg-white hover:border-line-strong'
                )}
              >
                <span className={cx('font-serif text-2xl font-semibold leading-none tabular-nums', dimension === d.n ? 'text-plum' : 'text-muted')}>
                  {d.n}
                </span>
                <span className="text-sm text-body leading-snug">{d.label}</span>
              </button>
            ))}
          </div>
          <GlassCard hover={false} className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div key={activeDim.n} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
                <span className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">Dimensión {activeDim.n}</span>
                <p className="mt-1 font-serif text-2xl font-semibold text-ink leading-tight">{activeDim.label}</p>
                <ul className="mt-5 space-y-2.5">
                  {Object.entries(activeDim.sources).map(([k, v]) => {
                    const Icon = INSTRUMENT_LABELS[k].icon;
                    return (
                      <li key={k} className="flex items-center gap-3 rounded-xl border border-line bg-ivory px-3.5 py-2.5">
                        <Icon size={16} className="shrink-0 text-plum" />
                        <span className="flex-1 text-sm text-body">{INSTRUMENT_LABELS[k].label}</span>
                        <span className="text-xs font-semibold text-bronze text-right">{v}</span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </GlassCard>
        </div>
      </section>

      <section className="space-y-4">
        <h4 className="flex items-center gap-3 font-serif text-2xl sm:text-3xl font-semibold text-ink">
          <span className="text-sm font-sans font-semibold tracking-[0.2em] text-bronze">5.6</span> Técnicas e instrumentos
        </h4>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {INSTRUMENTS.map((ins) => {
            const Icon = ins.icon;
            return (
              <motion.div key={ins.code} variants={fadeUp}>
                <GlassCard className="h-full" padded={false}>
                  <div className="p-5 h-full flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl font-semibold text-bronze">{ins.code}</span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lilac border border-line text-plum">
                        <Icon size={18} />
                      </span>
                    </div>
                    <p className="mt-4 font-semibold text-ink leading-snug">{ins.title}</p>
                    <p className="mt-1 text-xs text-bronze">{ins.meta}</p>
                    <p className="mt-3 text-sm text-body leading-relaxed flex-1">{ins.text}</p>
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

/* ---------------------------------------------------------------------
   Bloque C · Referencias bibliográficas
   --------------------------------------------------------------------- */

function ReferenciasBlock() {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(null);
  const q = normalize(query.trim());
  const filtered = REFERENCES.filter((r) => !q || normalize(`${r.text} ${r.type}`).includes(q));

  const copy = async (ref) => {
    try {
      await navigator.clipboard.writeText(ref.text);
      setCopied(ref.key);
      window.setTimeout(() => setCopied((c) => (c === ref.key ? null : c)), 1800);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <p className="inline-flex items-center gap-2 text-sm text-muted">
          <ArrowDownAZ size={16} className="text-bronze" />
          <span>
            <span className="text-bronze font-semibold tabular-nums">{filtered.length}</span> referencias en orden alfabético · Normas APA 7.ª ed.
          </span>
        </p>
        <SearchInput value={query} onChange={setQuery} placeholder="Buscar autor, año o título..." className="sm:max-w-xs" />
      </div>
      {filtered.length === 0 ? (
        <EmptyState title="Sin referencias" description="Ninguna referencia coincide con la búsqueda." />
      ) : (
        <GlassCard hover={false} padded={false} className="overflow-hidden">
          <ol className="divide-y divide-line">
            {filtered.map((r) => (
              <li key={r.key} className="group flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 p-5 sm:p-6 hover:bg-ivory transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="pl-8 -indent-8 text-sm sm:text-[15px] leading-relaxed text-body break-words">{r.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge toneName="slate">{r.type}</Badge>
                    {r.cited.map((c) => (
                      <Badge key={c} toneName="violet">
                        Fundamento {String(c).padStart(2, '0')}
                      </Badge>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copy(r)}
                  className={cx(
                    'shrink-0 self-start min-h-[40px] inline-flex items-center gap-2 rounded-xl border px-3.5 text-xs font-medium transition-colors',
                    copied === r.key
                      ? 'border-sage-line bg-sage-soft text-sage'
                      : 'border-line text-body hover:text-plum hover:border-line-strong'
                  )}
                  aria-label="Copiar referencia"
                >
                  {copied === r.key ? <Check size={14} /> : <Copy size={14} />}
                  {copied === r.key ? 'Copiada' : 'Copiar'}
                </button>
              </li>
            ))}
          </ol>
        </GlassCard>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

const BLOCKS = [
  { id: 'fundamentos', label: 'Fundamentos teórico-conceptuales', shortLabel: 'Fundamentos', icon: BookOpenText, count: FUNDAMENTOS.length },
  { id: 'metodologia', label: 'Diseño metodológico', shortLabel: 'Metodología', icon: Target, count: 6 },
  { id: 'referencias', label: 'Referencias bibliográficas', shortLabel: 'Referencias', icon: Library, count: REFERENCES.length },
];

export default function MarcoTeorico() {
  const [block, setBlock] = useState('fundamentos');

  return (
    <div className="space-y-10 sm:space-y-12">
      <SectionHeader
        eyebrow="Secciones 4 y 5 del informe"
        icon={BookCopy}
        title="Marco teórico y"
        highlight="metodología"
        description="Los fundamentos conceptuales que orientan el diagnóstico, el diseño metodológico con el que se recogieron los datos y las referencias que sustentan el análisis."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          { v: '7', l: 'Fundamentos teóricos', icon: Layers },
          { v: '7', l: 'Dimensiones de estudio', icon: Compass },
          { v: '4', l: 'Técnicas e instrumentos', icon: ClipboardList },
          { v: String(REFERENCES.length), l: 'Referencias APA', icon: Library },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.l} className="rounded-3xl border border-line bg-ivory p-4 sm:p-5">
              <Icon size={18} className="text-bronze" />
              <span className="mt-3 block font-serif text-4xl font-semibold text-bronze leading-none">{s.v}</span>
              <span className="mt-2 block text-xs sm:text-sm text-muted leading-snug">{s.l}</span>
            </div>
          );
        })}
      </div>

      <TabBar tabs={BLOCKS} active={block} onChange={setBlock} layoutId="marco-bloques" size="sm" />

      <AnimatePresence mode="wait">
        <motion.div
          key={block}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {block === 'fundamentos' && <FundamentosBlock />}
          {block === 'metodologia' && <MetodologiaBlock />}
          {block === 'referencias' && <ReferenciasBlock />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
