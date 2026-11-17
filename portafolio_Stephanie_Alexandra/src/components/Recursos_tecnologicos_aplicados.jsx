import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Laptop,
  GraduationCap,
  FileText,
  PlayCircle,
  Video,
  MessageCircle,
  Palette,
  Gamepad2,
  MonitorCog,
  Wifi,
  WifiOff,
  School,
  LayoutGrid,
  Table2,
  Cpu,
  Presentation,
  BookOpenText,
  Layers,
  ArrowUpRight,
  CircleCheck,
  Lightbulb,
  Info,
} from 'lucide-react';
import {
  PageShell,
  GlassCard,
  SectionHeader,
  Badge,
  SearchInput,
  FilterChips,
  SegmentedControl,
  EmptyState,
  DataTable,
  Modal,
  StatCard,
} from './ui/Primitives';
import { cx, tone, normalize, fadeUp, stagger } from './ui/tokens';

/* =====================================================================
   RECURSOS TECNOLÓGICOS APLICADOS · Catálogo interactivo TPACK
   ===================================================================== */

const CATEGORIES = {
  plataforma: { label: 'Plataformas', icon: Laptop, toneName: 'violet' },
  contenido: { label: 'Contenidos', icon: BookOpenText, toneName: 'amber' },
  comunicacion: { label: 'Comunicación', icon: MessageCircle, toneName: 'emerald' },
  creacion: { label: 'Creación', icon: Palette, toneName: 'rose' },
  gamificacion: { label: 'Gamificación', icon: Gamepad2, toneName: 'indigo' },
  infraestructura: { label: 'Infraestructura', icon: School, toneName: 'slate' },
};

const ACCESS = {
  online: { label: 'Requiere conexión', icon: Wifi, toneName: 'indigo' },
  offline: { label: 'Funciona sin conexión', icon: WifiOff, toneName: 'emerald' },
  mixto: { label: 'En línea y sin conexión', icon: Layers, toneName: 'amber' },
  sede: { label: 'En la institución', icon: School, toneName: 'slate' },
};

const RESOURCES = [
  {
    id: 'classroom',
    name: 'Google Classroom / Moodle',
    icon: GraduationCap,
    category: 'plataforma',
    access: 'online',
    metric: '90.9%',
    metricLabel: 'de los estudiantes recurre a estas plataformas para revisar sus materias',
    status: 'En uso',
    tpack: {
      T: 'Entorno virtual para publicar materiales, recibir tareas y dar seguimiento.',
      P: 'Sostiene el aula invertida: el material se revisa en la semana y se trabaja en la tutoría del sábado.',
      C: 'Entrega del afiche informativo sobre un Área Natural Protegida de El Salvador.',
    },
    practice: 'Expliqué las indicaciones y criterios de la actividad ex-aula (afiche informativo) para su entrega en Google Classroom.',
  },
  {
    id: 'pdf',
    name: 'Módulos PDF',
    icon: FileText,
    category: 'contenido',
    access: 'offline',
    metric: '45.5%',
    metricLabel: 'recurre a lecturas o archivos PDF',
    status: 'En uso',
    tpack: {
      T: 'Archivo ligero y descargable que se consulta sin conexión.',
      P: 'Lectura previa y actividades no presenciales para el trabajo autónomo en casa.',
      C: 'Lecturas del módulo de Ciencias Naturales asignadas en cada plan de sesión.',
    },
    practice: 'Incluí en los planes de sesión actividades no presenciales basadas en la lectura del módulo.',
  },
  {
    id: 'videos',
    name: 'Videos y simulaciones',
    icon: PlayCircle,
    category: 'contenido',
    access: 'online',
    metric: '45.5%',
    metricLabel: 'considera que los videos explicativos le ayudan a entender mejor',
    status: 'Preferencia del grupo',
    tpack: {
      T: 'Recurso audiovisual para observar procesos y fenómenos.',
      P: 'Aprendizaje multimodal que reduce la dependencia de textos extensos.',
      C: 'Procesos de la Unidad 4, como la fotosíntesis o la división celular.',
    },
    practice: 'Lo considero un apoyo visual que debe combinarse con materiales descargables por la conectividad del grupo.',
  },
  {
    id: 'meet',
    name: 'Google Meet',
    icon: Video,
    category: 'comunicacion',
    access: 'online',
    metric: '0%',
    metricLabel: 'usa actualmente clases o reuniones por videollamada',
    status: 'Refuerzo propuesto',
    tpack: {
      T: 'Videollamadas para sesiones sincrónicas fuera del sábado.',
      P: 'Refuerzo en horarios que no son de clase, sugerido por el docente tutor.',
      C: 'Aclaración de dudas sobre los contenidos de la semana.',
    },
    practice: 'Recojo la recomendación del docente tutor de utilizar Meet para reforzar el aprendizaje del fin de semana.',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageCircle,
    category: 'comunicacion',
    access: 'online',
    metric: 'Semanal',
    metricLabel: 'canal de consultas entre semana con el docente',
    status: 'En uso',
    tpack: {
      T: 'Mensajería móvil de bajo consumo de datos.',
      P: 'Acompañamiento asincrónico durante la semana.',
      C: 'Consultas sobre tareas y orientaciones de la tutoría.',
    },
    practice: 'Es el canal institucional de comunicación semanal de la modalidad flexible.',
  },
  {
    id: 'creacion',
    name: 'Canva / Genially / Word / PowerPoint',
    icon: Palette,
    category: 'creacion',
    access: 'mixto',
    metric: 'Alfabetización',
    metricLabel: 'digital mediante la creación de productos',
    status: 'En uso',
    tpack: {
      T: 'Herramientas de diseño y ofimática para producir recursos propios.',
      P: 'Aprender haciendo: afiches, resúmenes y presentaciones.',
      C: 'Afiche informativo de un Área Natural Protegida; la Guía de Micro aprendizajes fue elaborada en Canva.',
    },
    practice: 'Diseñé el recurso digital de la propuesta en Canva y propuse elaborar el portafolio de clases en Word o Canva.',
  },
  {
    id: 'juegos',
    name: 'Kahoot / Quizizz',
    icon: Gamepad2,
    category: 'gamificacion',
    access: 'online',
    metric: '45.5%',
    metricLabel: 'prefiere dinámicas o juegos interactivos',
    status: 'Preferencia del grupo',
    tpack: {
      T: 'Cuestionarios interactivos en tiempo real.',
      P: 'Evaluación formativa lúdica que abre otras formas de participar.',
      C: 'Repaso de conceptos como selección natural, célula, mitosis y meiosis.',
    },
    practice: 'Su uso se plantea dentro de la institución, donde la conexión está disponible.',
  },
  {
    id: 'computo',
    name: 'Centro de Cómputo',
    icon: MonitorCog,
    category: 'infraestructura',
    access: 'sede',
    metric: '30 PCs',
    metricLabel: 'con 6 proyectores compartidos, 1 fijo y red MINED',
    status: 'Disponible',
    tpack: {
      T: 'Laboratorio de informática, proyectores y red del MINED.',
      P: 'Sesiones prácticas de alfabetización digital durante la tutoría del sábado.',
      C: 'Práctica de procesadores de texto y envío de tareas.',
    },
    practice: 'Utilicé presentación digital y proyector en la clase sobre Áreas Naturales Protegidas.',
  },
];

const TPACK_ZONES = [
  { id: 'T', label: 'Conocimiento tecnológico', short: 'T', cx: 100, cy: 92, color: '#4A2574', text: 'Qué hace la herramienta y qué condiciones de acceso exige.' },
  { id: 'P', label: 'Conocimiento pedagógico', short: 'P', cx: 66, cy: 150, color: '#B08A4F', text: 'Qué estrategia de enseñanza favorece la herramienta.' },
  { id: 'C', label: 'Conocimiento del contenido', short: 'C', cx: 134, cy: 150, color: '#5E8C76', text: 'Qué contenido de Ciencias Naturales se trabaja con ella.' },
];

const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'Recurso',
    className: 'w-[24%]',
    render: (r) => {
      const RIcon = r.icon;
      return (
        <span className="flex items-center gap-2.5 font-semibold text-ink">
          <RIcon size={17} className="shrink-0 text-plum" /> {r.name}
        </span>
      );
    },
  },
  { key: 'category', label: 'Categoría', className: 'w-[14%]', render: (r) => <Badge toneName={CATEGORIES[r.category].toneName}>{CATEGORIES[r.category].label}</Badge> },
  {
    key: 'metric',
    label: 'Dato del diagnóstico',
    className: 'w-[24%]',
    render: (r) => (
      <span>
        <span className="font-semibold text-plum">{r.metric}</span> <span className="text-muted">{r.metricLabel}</span>
      </span>
    ),
  },
  { key: 'access', label: 'Conectividad', className: 'w-[16%]', render: (r) => <Badge toneName={ACCESS[r.access].toneName} icon={ACCESS[r.access].icon}>{ACCESS[r.access].label}</Badge> },
  { key: 'practice', label: 'Uso en la práctica' },
];

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function TpackDiagram({ focus, onFocus }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      <div className="md:col-span-5">
        <svg viewBox="0 0 200 220" className="w-full max-w-[300px] mx-auto" role="img" aria-label="Diagrama del modelo TPACK">
          {TPACK_ZONES.map((z) => (
            <motion.circle
              key={z.id}
              cx={z.cx}
              cy={z.cy}
              r={58}
              fill={z.color}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: focus && focus !== z.id ? 0.08 : 0.2, scale: 1 }}
              animate={{ opacity: focus && focus !== z.id ? 0.08 : 0.2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              stroke={z.color}
              strokeWidth={focus === z.id ? 2.5 : 1}
              style={{ cursor: 'pointer', transformOrigin: `${z.cx}px ${z.cy}px` }}
              onClick={() => onFocus(focus === z.id ? null : z.id)}
            />
          ))}
          {TPACK_ZONES.map((z) => (
            <text
              key={`t-${z.id}`}
              x={z.id === 'T' ? z.cx : z.id === 'P' ? z.cx - 22 : z.cx + 22}
              y={z.id === 'T' ? z.cy - 22 : z.cy + 22}
              textAnchor="middle"
              className="font-serif"
              fontSize="20"
              fontWeight="600"
              fill={z.color}
              style={{ pointerEvents: 'none' }}
            >
              {z.short}
            </text>
          ))}
          <circle
            cx={100}
            cy={131}
            r={15}
            fill="#2E1A47"
            style={{ cursor: 'pointer' }}
            onClick={() => onFocus(focus === 'TPACK' ? null : 'TPACK')}
            stroke={focus === 'TPACK' ? '#B08A4F' : 'none'}
            strokeWidth={2.5}
          />
          <text x={100} y={134.5} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#F9F6FC" style={{ pointerEvents: 'none' }}>
            TPACK
          </text>
        </svg>
      </div>
      <div className="md:col-span-7 space-y-3">
        {TPACK_ZONES.map((z) => (
          <button
            key={z.id}
            type="button"
            onClick={() => onFocus(focus === z.id ? null : z.id)}
            aria-pressed={focus === z.id}
            className={cx(
              'w-full flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-all',
              focus === z.id ? 'border-plum bg-lilac shadow-paper' : 'border-line bg-white hover:border-line-strong'
            )}
          >
            <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg font-serif text-lg font-semibold text-white" style={{ background: z.color }}>
              {z.short}
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{z.label}</span>
              <span className="block text-xs text-muted leading-snug mt-0.5">{z.text}</span>
            </span>
          </button>
        ))}
        <div className={cx('rounded-2xl border px-4 py-3 transition-all', focus === 'TPACK' ? 'border-bronze bg-sand' : 'border-sand-line bg-sand/60')}>
          <p className="text-sm text-body leading-relaxed">
            <span className="font-semibold text-bronze-dark">Integración TPACK: </span>
            selecciono cada tecnología a partir de lo que el contenido exige y de la estrategia pedagógica que mejor lo media.
          </p>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ r, focus, onOpen }) {
  const RIcon = r.icon;
  const cat = CATEGORIES[r.category];
  const t = tone(cat.toneName);
  const access = ACCESS[r.access];
  return (
    <motion.button
      layout
      type="button"
      onClick={() => onOpen(r.id)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="group h-full text-left rounded-3xl border border-line bg-white shadow-paper hover:shadow-paper-lg hover:border-line-strong transition-all overflow-hidden flex flex-col"
    >
      <div className={cx('h-1 w-full', t.fill)} />
      <div className="p-5 flex-1 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <span className={cx('inline-flex h-12 w-12 items-center justify-center rounded-2xl border', t.bg, t.border, t.text)}>
            <RIcon size={22} />
          </span>
          <Badge toneName={r.status === 'Refuerzo propuesto' ? 'amber' : r.status === 'Preferencia del grupo' ? 'violet' : 'emerald'}>{r.status}</Badge>
        </div>
        <div>
          <p className="font-semibold text-ink leading-snug">{r.name}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted font-semibold">{cat.label}</p>
        </div>
        <div className="rounded-2xl border border-line bg-ivory p-3.5">
          <span className="font-serif text-2xl font-semibold text-plum leading-none">{r.metric}</span>
          <p className="mt-1 text-xs text-muted leading-snug">{r.metricLabel}</p>
        </div>
        {focus && focus !== 'TPACK' ? (
          <p className="text-sm text-body leading-relaxed">
            <span className="font-semibold text-ink">{focus}: </span>
            {r.tpack[focus]}
          </p>
        ) : (
          <p className="text-sm text-body leading-relaxed line-clamp-3">{r.practice}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <Badge toneName={access.toneName} icon={access.icon}>
            {access.label}
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-plum">
            Ver TPACK <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function ResourceModal({ resource, open, onClose }) {
  if (!resource) return null;
  const cat = CATEGORIES[resource.category];
  const access = ACCESS[resource.access];
  return (
    <Modal open={open} onClose={onClose} title={resource.name} subtitle={`${cat.label} · ${resource.status}`} icon={resource.icon} size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-2xl border border-line bg-ivory p-4">
            <span className="font-serif text-3xl font-semibold text-plum leading-none">{resource.metric}</span>
            <p className="mt-1.5 text-sm text-muted">{resource.metricLabel}</p>
          </div>
          <div className="rounded-2xl border border-line bg-ivory p-4 flex flex-col justify-center gap-2">
            <Badge toneName={access.toneName} icon={access.icon} className="self-start">
              {access.label}
            </Badge>
            <Badge toneName={cat.toneName} icon={cat.icon} className="self-start">
              {cat.label}
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TPACK_ZONES.map((z) => (
            <div key={z.id} className="rounded-2xl border border-line bg-white p-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg font-serif text-lg font-semibold text-white" style={{ background: z.color }}>
                {z.short}
              </span>
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-muted font-semibold">{z.label}</p>
              <p className="mt-1 text-sm text-body leading-relaxed">{resource.tpack[z.id]}</p>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-sage-line bg-sage-soft p-4">
          <CircleCheck size={18} className="shrink-0 mt-0.5 text-sage" />
          <p className="text-sm text-body leading-relaxed">
            <span className="font-semibold text-ink">Uso en la práctica: </span>
            {resource.practice}
          </p>
        </div>
      </div>
    </Modal>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Recursos_tecnologicos_aplicados() {
  const [category, setCategory] = useState('todos');
  const [query, setQuery] = useState('');
  const [view, setView] = useState('tarjetas');
  const [focus, setFocus] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const openResource = (id) => {
    setOpenId(id);
    setModalOpen(true);
  };

  const rows = useMemo(() => {
    const q = normalize(query.trim());
    return RESOURCES.filter(
      (r) =>
        (category === 'todos' || r.category === category) &&
        (!q || normalize(`${r.name} ${CATEGORIES[r.category].label} ${r.practice} ${Object.values(r.tpack).join(' ')}`).includes(q))
    );
  }, [category, query]);

  const options = [
    { id: 'todos', label: 'Todos', icon: LayoutGrid, count: RESOURCES.length },
    ...Object.entries(CATEGORIES).map(([id, c]) => ({ id, label: c.label, icon: c.icon, count: RESOURCES.filter((r) => r.category === id).length })),
  ];
  const opened = RESOURCES.find((r) => r.id === openId) || null;
  const offlineCount = RESOURCES.filter((r) => r.access === 'offline' || r.access === 'mixto').length;

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Recursos tecnológicos"
        icon={Cpu}
        title="Recursos tecnológicos"
        highlight="aplicados"
        description="Catálogo de las herramientas que integré o recomendé durante la práctica, analizadas con el modelo TPACK y vinculadas a los datos del diagnóstico."
      />

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <motion.div variants={fadeUp}>
          <StatCard icon={Layers} label="Recursos" value={String(RESOURCES.length)} hint="En el catálogo TPACK" className="h-full" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <StatCard icon={GraduationCap} label="Uso de EVA" value="90.9%" hint="Classroom o Moodle" toneName="emerald" className="h-full" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <StatCard icon={WifiOff} label="Sin conexión" value={String(offlineCount)} hint="Recursos utilizables offline" toneName="amber" className="h-full" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <StatCard icon={Presentation} label="Centro de cómputo" value="30" hint="Computadoras institucionales" toneName="indigo" className="h-full" />
        </motion.div>
      </motion.div>

      <GlassCard hover={false}>
        <div className="flex items-center gap-2 mb-5">
          <Lightbulb size={18} className="text-bronze" />
          <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">Lente de análisis · selecciono un conocimiento</p>
        </div>
        <TpackDiagram focus={focus} onFocus={setFocus} />
      </GlassCard>

      <section className="space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:justify-between">
          <FilterChips options={options} value={category} onChange={setCategory} />
          <SegmentedControl
            ariaLabel="Tipo de vista"
            value={view}
            onChange={setView}
            options={[
              { id: 'tarjetas', label: 'Tarjetas', icon: LayoutGrid },
              { id: 'tabla', label: 'Tabla', icon: Table2 },
            ]}
            className="self-start"
          />
        </div>
        <SearchInput value={query} onChange={setQuery} placeholder="Buscar recurso, estrategia o contenido…" />
        {focus && focus !== 'TPACK' && (
          <div className="flex flex-wrap items-center gap-2 text-sm text-body">
            <Info size={15} className="text-plum" /> Las tarjetas muestran el componente <strong>{TPACK_ZONES.find((z) => z.id === focus).label}</strong>.
            <button type="button" onClick={() => setFocus(null)} className="font-semibold text-plum hover:underline underline-offset-4">
              Quitar lente
            </button>
          </div>
        )}

        {rows.length === 0 ? (
          <EmptyState title="Sin recursos" description="No hay recursos que coincidan con la búsqueda o la categoría." />
        ) : view === 'tarjetas' ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {rows.map((r) => (
                <ResourceCard key={r.id} r={r} focus={focus} onOpen={openResource} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <DataTable
            columns={TABLE_COLUMNS}
            rows={rows}
            rowKey="id"
            minWidth={980}
            renderCard={(r) => (
              <button type="button" onClick={() => openResource(r.id)} className="w-full text-left">
                <ResourceRowCard r={r} />
              </button>
            )}
          />
        )}
      </section>

      <ResourceModal resource={opened} open={modalOpen} onClose={() => setModalOpen(false)} />
    </PageShell>
  );
}

function ResourceRowCard({ r }) {
  const RIcon = r.icon;
  const access = ACCESS[r.access];
  return (
    <div className="rounded-2xl border border-line bg-white shadow-paper p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <span className="flex items-center gap-2.5 font-semibold text-ink text-sm">
          <RIcon size={17} className="shrink-0 text-plum" /> {r.name}
        </span>
        <Badge toneName={CATEGORIES[r.category].toneName}>{CATEGORIES[r.category].label}</Badge>
      </div>
      <p className="text-sm">
        <span className="font-semibold text-plum">{r.metric}</span> <span className="text-muted">{r.metricLabel}</span>
      </p>
      <p className="text-sm text-body leading-relaxed">{r.practice}</p>
      <Badge toneName={access.toneName} icon={access.icon}>
        {access.label}
      </Badge>
    </div>
  );
}
