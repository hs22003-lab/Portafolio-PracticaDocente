import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Users,
  Lightbulb,
  Flag,
  Heart,
  Trophy,
  Wrench,
  Telescope,
  Quote,
  CalendarCheck,
  Clock,
  ArrowUpRight,
  FolderArchive,
  CalendarRange,
  GanttChart,
  Eye,
  ClipboardList,
  FileText,
  Presentation,
  Grid3x3,
  MessagesSquare,
  FileCheck2,
  LayoutGrid,
  Table2,
  ArrowRight,
  CircleCheck,
  Camera,
} from 'lucide-react';
import { PageShell, SectionHeader, Badge, Modal, SearchInput, FilterChips, SegmentedControl, DataTable, EmptyState } from './ui/Primitives';
import { cx, tone, normalize } from './ui/tokens';
import DocLink from './shared/DocLink';
import { assetUrl } from './shared/assets';
import { DOCS, JORNADAS, PRACTICE_SUMMARY, jornadaDoc } from '../data/practica';

/* =====================================================================
   EXPERIENCIAS SIGNIFICATIVAS Y CENTRO DE ANEXOS
   ===================================================================== */

const FEATURE_PHOTO = { src: '/img/Jornada_6_1.jpeg', caption: 'Clase sobre Áreas Naturales Protegidas · 24/10/2026' };

const TILES = [
  {
    id: 'situaciones',
    icon: Users,
    toneName: 'violet',
    kicker: 'Situaciones relevantes',
    title: 'Enseñar a personas adultas que estudian los sábados',
    summary: 'Trabajé con adultos trabajadores y padres de familia los sábados de 7:00 a.m. a 12:00 m.d.',
    span: 'md:col-span-2 lg:row-span-2',
    featured: true,
    body: [
      'Trabajé con adultos trabajadores y madres y padres de familia que dedican sus sábados, de 7:00 a.m. a 12:00 m.d., a continuar su bachillerato en la modalidad flexible.',
      'El trabajo, el cuidado de los hijos y el transporte desde otros municipios influyen en su asistencia; por eso cada tutoría debía ser clara, breve y aprovechable.',
    ],
    list: [
      'Acompañé al docente durante la evaluación parcial del grupo (08/08/2026).',
      'Observé las exposiciones del módulo 4 (26/09/2026 y 10/10/2026).',
      'Conduje la clase sobre Áreas Naturales Protegidas de El Salvador (24/10/2026).',
      'Apoyé a los estudiantes con computadora portátil y teléfono celular (07/11/2026).',
    ],
  },
  {
    id: 'aprendizajes',
    icon: Lightbulb,
    toneName: 'amber',
    kicker: 'Aprendizajes',
    title: 'Tecnología sin saturar',
    summary: 'Integrar la tecnología mediante alfabetización exprés, sin saturar al estudiante.',
    span: 'md:col-span-2',
    body: [
      'Aprendí a integrar la tecnología en espacios breves de alfabetización digital exprés, sin saturar al estudiante ni restar tiempo al contenido de Ciencias Naturales.',
    ],
    list: [
      'Elegir cada herramienta por su propósito didáctico (modelo TPACK).',
      'Dosificar las actividades en momentos cortos y con instrucciones claras.',
      'Preferir recursos ligeros, descargables y visibles desde el celular.',
    ],
  },
  {
    id: 'conclusiones',
    icon: Flag,
    toneName: 'emerald',
    kicker: 'Conclusiones',
    title: 'El diagnóstico orienta la práctica',
    summary: 'Conocer al grupo antes de planificar hizo pertinentes mis decisiones.',
    span: '',
    body: ['Las conclusiones de mi práctica se sostienen en lo que documenté a lo largo de las siete jornadas.'],
    list: [
      'El diagnóstico con cuatro instrumentos permitió planificar desde la realidad del grupo.',
      'La alta motivación del estudiantado (90.9%) es la principal fortaleza de la modalidad.',
      'La brecha digital se concentra en el hogar y en las competencias de uso de la computadora.',
      'Unir Ciencias Naturales con habilidades informáticas da a la tecnología un propósito educativo claro.',
    ],
  },
  {
    id: 'valoracion',
    icon: Heart,
    toneName: 'rose',
    kicker: 'Valoración',
    title: 'Una experiencia formativa',
    summary: 'Valoro la práctica como el puente entre mi formación y el aula real.',
    span: '',
    body: [
      'Valoro esta práctica como el puente entre mi formación en Informática Educativa y el aula real. Recorrí el ciclo completo de la labor docente: observar, investigar, evaluar, planificar y enseñar.',
      'El acompañamiento del docente tutor, del coordinador de la modalidad y de la tutoría UES fue determinante para cumplir las 7 jornadas.',
    ],
  },
  {
    id: 'logros',
    icon: Trophy,
    toneName: 'amber',
    kicker: 'Logros',
    title: 'Metas cumplidas',
    summary: 'Diagnóstico, planificaciones, clase impartida y propuesta con recurso digital.',
    span: 'md:col-span-2',
    list: [
      `${PRACTICE_SUMMARY.jornadas} jornadas y ${PRACTICE_SUMMARY.horas} horas registradas en hojas de control firmadas.`,
      'Cronograma de 18 actividades del diagnóstico completado.',
      'Diagnóstico con observación, cuestionario (N = 11) y dos entrevistas.',
      'Cuatro planificaciones de clase y una clase conducida.',
      'Examen parcial del módulo 4 y cuestionario de la Unidad 5.',
      'Propuesta de mejora con la Guía de Micro aprendizajes.',
    ],
  },
  {
    id: 'mejora',
    icon: Wrench,
    toneName: 'slate',
    kicker: 'Áreas de mejora',
    title: 'Lo que sigue',
    summary: 'Aplicar y medir la propuesta, y fortalecer el refuerzo fuera del sábado.',
    span: 'md:col-span-2',
    list: [
      'Aplicar la propuesta y valorar su alcance con fichas de seguimiento y lista de cotejo.',
      'Incorporar sesiones de refuerzo por Google Meet, como recomendó el docente tutor.',
      'Adaptar cada actividad al contenido que el docente esté desarrollando.',
      'Ajustar las actividades al tiempo disponible en las tutorías.',
    ],
  },
  {
    id: 'proyeccion',
    icon: Telescope,
    toneName: 'indigo',
    kicker: 'Proyección profesional',
    title: 'Como Licenciada en Informática Educativa',
    summary: 'Diseñar recursos accesibles que reduzcan la brecha digital.',
    span: 'md:col-span-2 lg:col-span-4',
    body: [
      'Como Licenciada en Informática Educativa me proyecto diseñando recursos educativos digitales accesibles, Mobile-First y con opción sin conexión, que reduzcan la brecha digital en las modalidades flexibles.',
      'Aspiro a acompañar a docentes en la integración pedagógica de las TIC bajo el modelo TPACK y a promover la alfabetización digital de estudiantes adultos.',
    ],
  },
];

const ANNEX_TYPES = {
  planificacion: { label: 'Planificación', icon: CalendarRange, toneName: 'violet' },
  instrumento: { label: 'Instrumento diagnóstico', icon: ClipboardList, toneName: 'amber' },
  evaluacion: { label: 'Evaluación', icon: Grid3x3, toneName: 'rose' },
  material: { label: 'Material didáctico', icon: Presentation, toneName: 'emerald' },
  seguimiento: { label: 'Seguimiento', icon: FileCheck2, toneName: 'indigo' },
};

const ANNEXES = [
  { id: 'cronograma', type: 'planificacion', icon: CalendarRange, title: 'Cronograma de actividades', detail: '18 actividades · 12/08 – 20/09/2026', nav: { tab: 'planificacion', sub: 'planeacion' } },
  { id: 'gantt', type: 'planificacion', icon: GanttChart, title: 'Diagrama de Gantt', detail: 'Vista interactiva por etapas', nav: { tab: 'planificacion', sub: 'planeacion' } },
  { id: 'observacion', type: 'instrumento', icon: Eye, title: 'Guía de Observación', detail: '20 indicadores · 22/08/2026', src: DOCS.guiaObservacion },
  { id: 'ent-docente', type: 'instrumento', icon: MessagesSquare, title: 'Entrevista Docente', detail: '10 preguntas · 12/09/2026', src: DOCS.entrevistaDocente },
  { id: 'ent-coord', type: 'instrumento', icon: MessagesSquare, title: 'Entrevista Coordinador', detail: '10 preguntas · 12/09/2026', src: DOCS.entrevistaCoordinador },
  { id: 'cuestionario', type: 'evaluacion', icon: ClipboardList, title: 'Cuestionario Ciencias Naturales', detail: 'Unidad 5 · Octubre 2026', src: DOCS.cuestionarioCCNN },
  { id: 'examen', type: 'evaluacion', icon: FileText, title: 'Examen Parcial Módulo 4', detail: 'Cuatro partes · 100%', src: DOCS.examenM4 },
  { id: 'rubrica', type: 'evaluacion', icon: Grid3x3, title: 'Rúbrica Exposiciones', detail: 'Cinco criterios · Módulo 4', src: DOCS.rubrica },
  { id: 'anp', type: 'material', icon: Presentation, title: 'Lección 3 ANP', detail: 'Presentación de la clase · 24/10/2026', src: DOCS.leccionANP },
  { id: 'propuesta', type: 'material', icon: Lightbulb, title: 'Propuesta de mejora', detail: 'Documento completo · 20/10/2026', src: DOCS.propuesta },
  { id: 'asistencia', type: 'seguimiento', icon: CalendarCheck, title: 'Informe de asistencia', detail: `${PRACTICE_SUMMARY.jornadas} jornadas · ${PRACTICE_SUMMARY.horas} horas`, src: DOCS.asistencia },
  ...JORNADAS.map((j) => ({
    id: `jornada-${j.n}`,
    type: 'seguimiento',
    icon: FileCheck2,
    title: `Hoja de control · Jornada ${j.n}`,
    detail: j.date,
    src: jornadaDoc(j.n),
  })),
];

/* ---------------------------------------------------------------------
   Sub-componentes
   --------------------------------------------------------------------- */

function BentoTile({ tile, onOpen }) {
  const TIcon = tile.icon;
  const t = tone(tile.toneName);
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(tile.id)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      className={cx(
        'group relative text-left rounded-3xl border p-5 sm:p-6 transition-all duration-300 overflow-hidden flex flex-col gap-4',
        tile.featured ? 'bg-abyss border-plum-deep text-on-plum hover:shadow-paper-lg' : 'bg-white border-line shadow-paper hover:shadow-paper-lg hover:border-line-strong',
        tile.span
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cx(
            'inline-flex h-11 w-11 items-center justify-center rounded-2xl border',
            tile.featured ? 'bg-plum-deep border-white/20 text-[#E5D5B5]' : cx(t.bg, t.border, t.text)
          )}
        >
          <TIcon size={20} />
        </span>
        <ArrowUpRight
          size={18}
          className={cx('transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5', tile.featured ? 'text-[#E5D5B5]' : 'text-plum')}
        />
      </div>
      <div>
        <p className={cx('text-[11px] uppercase tracking-[0.2em] font-semibold', tile.featured ? 'text-[#E5D5B5]' : 'text-bronze')}>{tile.kicker}</p>
        <p className={cx('mt-1.5 font-serif font-semibold leading-tight', tile.featured ? 'text-3xl sm:text-4xl text-on-plum' : 'text-xl sm:text-2xl text-ink')}>{tile.title}</p>
      </div>
      <p className={cx('text-sm leading-relaxed', tile.featured ? 'text-on-plum-muted' : 'text-body')}>{tile.summary}</p>
      {tile.featured && tile.list && (
        <ul className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
          {tile.list.map((l) => (
            <li key={l} className="flex gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs text-on-plum leading-snug">
              <CircleCheck size={14} className="shrink-0 mt-0.5 text-[#E5D5B5]" /> {l}
            </li>
          ))}
        </ul>
      )}
    </motion.button>
  );
}

function PhotoTile() {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="relative md:col-span-2 min-h-[220px] rounded-3xl overflow-hidden border border-line shadow-paper bg-silk"
    >
      <img
        src={assetUrl(FEATURE_PHOTO.src)}
        alt={FEATURE_PHOTO.caption}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss/85 to-transparent p-4 pt-10 flex items-center gap-2 text-xs sm:text-sm text-white">
        <Camera size={15} className="shrink-0" /> {FEATURE_PHOTO.caption}
      </figcaption>
    </motion.figure>
  );
}

function StatsTile() {
  const stats = [
    { v: String(PRACTICE_SUMMARY.jornadas), l: 'Jornadas', i: CalendarCheck },
    { v: `${PRACTICE_SUMMARY.horas} h`, l: 'Horas', i: Clock },
    { v: '4', l: 'Planificaciones', i: FileText },
    { v: '11', l: 'Encuestados', i: Users },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-sand-line bg-sand p-5 sm:p-6 grid grid-cols-2 gap-3"
    >
      {stats.map((s) => {
        const SIcon = s.i;
        return (
          <div key={s.l} className="rounded-2xl bg-white/70 border border-sand-line p-3">
            <SIcon size={16} className="text-bronze" />
            <p className="mt-1.5 font-serif text-2xl font-semibold text-ink leading-none">{s.v}</p>
            <p className="mt-1 text-[11px] text-muted">{s.l}</p>
          </div>
        );
      })}
    </motion.div>
  );
}

function QuoteTile() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="relative rounded-3xl border border-line bg-white shadow-paper p-5 sm:p-6 overflow-hidden"
    >
      <Quote size={56} className="absolute -right-1 -top-2 text-silk-deep" aria-hidden="true" />
      <blockquote className="relative font-serif italic text-lg sm:text-xl leading-snug text-ink">
        “La educación transforma vidas cuando la tecnología se adapta, con empatía, a la realidad de cada estudiante.”
      </blockquote>
      <figcaption className="relative mt-3 text-[11px] uppercase tracking-[0.18em] text-bronze">Lema docente</figcaption>
    </motion.figure>
  );
}

function AnnexAction({ annex, onNavigate, block = false }) {
  if (annex.nav) {
    return (
      <button
        type="button"
        onClick={() => onNavigate?.(annex.nav.tab, annex.nav.sub)}
        className={cx(
          'inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl border border-lilac-line bg-lilac px-3.5 text-xs font-semibold text-plum hover:bg-silk-deep transition-colors',
          block && 'w-full'
        )}
      >
        Ver en el portafolio <ArrowRight size={13} />
      </button>
    );
  }
  return <DocLink src={annex.src} label="Abrir PDF" size="sm" variant="secondary" block={block} />;
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Experiencias_significativas({ onNavigate }) {
  const [openTile, setOpenTile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState('todos');
  const [query, setQuery] = useState('');
  const [view, setView] = useState('tarjetas');

  const tile = TILES.find((t) => t.id === openTile);
  const openModal = (id) => {
    setOpenTile(id);
    setModalOpen(true);
  };

  const annexes = useMemo(() => {
    const q = normalize(query.trim());
    return ANNEXES.filter((a) => (type === 'todos' || a.type === type) && (!q || normalize(`${a.title} ${a.detail} ${ANNEX_TYPES[a.type].label}`).includes(q)));
  }, [type, query]);

  const typeOptions = [
    { id: 'todos', label: 'Todos', icon: LayoutGrid, count: ANNEXES.length },
    ...Object.entries(ANNEX_TYPES).map(([id, t]) => ({ id, label: t.label, icon: t.icon, count: ANNEXES.filter((a) => a.type === id).length })),
  ];

  const columns = [
    {
      key: 'title',
      label: 'Documento',
      className: 'w-[34%]',
      render: (a) => {
        const AIcon = a.icon;
        return (
          <span className="flex items-center gap-2.5 font-semibold text-ink">
            <AIcon size={17} className="shrink-0 text-plum" /> {a.title}
          </span>
        );
      },
    },
    { key: 'type', label: 'Tipo', className: 'w-[20%]', render: (a) => <Badge toneName={ANNEX_TYPES[a.type].toneName}>{ANNEX_TYPES[a.type].label}</Badge> },
    { key: 'detail', label: 'Detalle', className: 'w-[26%] text-muted' },
    { key: 'action', label: 'Acceso', render: (a) => <AnnexAction annex={a} onNavigate={onNavigate} /> },
  ];

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Cierre"
        icon={Star}
        title="Experiencias"
        highlight="significativas"
        description="Situaciones, aprendizajes, conclusiones y proyección profesional que dejó en mí la práctica docente. Selecciono cada bloque para leerlo completo."
      />

      {/* Bento grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BentoTile tile={TILES[0]} onOpen={openModal} />
        <PhotoTile />
        <BentoTile tile={TILES[1]} onOpen={openModal} />
        <BentoTile tile={TILES[2]} onOpen={openModal} />
        <StatsTile />
        <BentoTile tile={TILES[3]} onOpen={openModal} />
        <QuoteTile />
        <BentoTile tile={TILES[4]} onOpen={openModal} />
        <BentoTile tile={TILES[5]} onOpen={openModal} />
        <BentoTile tile={TILES[6]} onOpen={openModal} />
      </section>

      {/* Centro de anexos */}
      <section className="space-y-5">
        <SectionHeader
          eyebrow="Centro de anexos"
          icon={FolderArchive}
          title="Documentos de"
          highlight="respaldo"
          description="Instrumentos, materiales y registros oficiales de la práctica. Cada enlace verifica que el archivo esté publicado antes de abrirlo."
        />
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:justify-between">
          <FilterChips options={typeOptions} value={type} onChange={setType} />
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
        <SearchInput value={query} onChange={setQuery} placeholder="Buscar documento (p. ej. entrevista, rúbrica, jornada 6)…" />

        {annexes.length === 0 ? (
          <EmptyState title="Sin documentos" description="No hay anexos que coincidan con la búsqueda o el filtro." />
        ) : view === 'tarjetas' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {annexes.map((a) => {
              const AIcon = a.icon;
              const t = tone(ANNEX_TYPES[a.type].toneName);
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-line bg-white shadow-paper p-4 flex flex-col gap-3 hover:border-line-strong hover:shadow-paper-lg transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className={cx('shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl border', t.bg, t.border, t.text)}>
                      <AIcon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink leading-snug">{a.title}</p>
                      <p className="text-xs text-muted mt-0.5">{a.detail}</p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <Badge toneName={ANNEX_TYPES[a.type].toneName}>{ANNEX_TYPES[a.type].label}</Badge>
                    <AnnexAction annex={a} onNavigate={onNavigate} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <DataTable
            columns={columns}
            rows={annexes}
            rowKey="id"
            minWidth={760}
            renderCard={(a) => {
              const AIcon = a.icon;
              return (
                <div className="rounded-2xl border border-line bg-white shadow-paper p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <AIcon size={18} className="shrink-0 mt-0.5 text-plum" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{a.title}</p>
                      <p className="text-xs text-muted">{a.detail}</p>
                    </div>
                  </div>
                  <AnnexAction annex={a} onNavigate={onNavigate} block />
                </div>
              );
            }}
          />
        )}
      </section>

      {/* Lectura completa de cada bloque */}
      {tile && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={tile.title} subtitle={tile.kicker} icon={tile.icon} size="md">
          <div className="space-y-5">
            {tile.body?.map((p) => (
              <p key={p} className="text-[15px] sm:text-base leading-relaxed text-body">
                {p}
              </p>
            ))}
            {tile.list && (
              <ul className="space-y-2.5">
                {tile.list.map((l) => (
                  <li key={l} className="flex gap-2.5 rounded-2xl border border-line bg-ivory px-4 py-3 text-sm text-body leading-relaxed">
                    <CircleCheck size={16} className="shrink-0 mt-0.5 text-sage" /> {l}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Modal>
      )}
    </PageShell>
  );
}
