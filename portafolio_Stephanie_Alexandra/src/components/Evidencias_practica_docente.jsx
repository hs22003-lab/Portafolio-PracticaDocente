import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon,
  Camera,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  CalendarDays,
  Clock,
  Eye,
  MessagesSquare,
  ClipboardList,
  GanttChart,
  BookOpenText,
  Footprints,
  MonitorSmartphone,
  Palette,
  LayoutGrid,
  ArrowRight,
  Expand,
  Images,
  FileText,
} from 'lucide-react';
import { PageShell, SectionHeader, Badge, FilterChips, PlumBand, Modal, Button } from './ui/Primitives';
import { cx } from './ui/tokens';
import DocLink, { ExternalButton } from './shared/DocLink';
import { CRONOGRAMA } from '../data/diagnostico';
import { CANVA_URL, DOCS, JORNADAS, PHOTOS, PRACTICE_SUMMARY, jornadaDoc } from '../data/practica';
import { assetUrl } from './shared/assets';

/* =====================================================================
   EVIDENCIAS DE LA PRÁCTICA DOCENTE · Expedientes, galería y visor
   ===================================================================== */

const CATEGORIES = {
  campo: { label: 'Trabajo de campo', icon: Footprints, toneName: 'violet' },
  digitales: { label: 'Instrumentos digitales', icon: MonitorSmartphone, toneName: 'amber' },
  materiales: { label: 'Materiales didácticos', icon: Palette, toneName: 'emerald' },
};

const photo = (file) => PHOTOS.find((p) => p.src === `/img/${file}`);

const EVIDENCES = [
  {
    id: 'e1',
    n: 1,
    category: 'campo',
    icon: Eye,
    title: 'Visita y observación',
    date: '22/08/2026',
    text: 'Visité el Instituto Nacional Dr. Francisco Martínez Suárez y observé la clase de Ciencias Naturales y Tecnología con la guía de observación sistemática: 20 indicadores en cuatro dimensiones (estudiantado, entorno físico y tecnológico, pedagógica e interacción).',
    photos: ['Jornada_2_2.jpg', 'Jornada_2_3.jpg', 'Jornada_2_1.jpg', 'Jornada_1_4.jpg'].map(photo).filter(Boolean),
    cover: 'observacion',
    docs: [
      { src: DOCS.guiaObservacion, label: 'Guía de observación' },
      { src: jornadaDoc(2), label: 'Hoja de control · Jornada 2' },
    ],
  },
  {
    id: 'e2',
    n: 2,
    category: 'campo',
    icon: MessagesSquare,
    title: 'Entrevistas al coordinador y al docente tutor',
    date: '12/09/2026',
    text: 'Entrevisté al coordinador de la Modalidad Flexible y al docente tutor con guías de 10 preguntas cada una, para conocer las condiciones institucionales, tecnológicas y pedagógicas del grupo.',
    photos: ['Jornada_3_2.jpg', 'Jornada_3_1.jpg'].map(photo).filter(Boolean),
    cover: 'entrevista',
    docs: [
      { src: DOCS.entrevistaCoordinador, label: 'Entrevista al coordinador' },
      { src: DOCS.entrevistaDocente, label: 'Entrevista al docente' },
    ],
  },
  {
    id: 'e3',
    n: 3,
    category: 'digitales',
    icon: ClipboardList,
    title: 'Cuestionario en Google Forms',
    date: '12/09/2026',
    text: 'Diseñé y apliqué un cuestionario digital a 11 estudiantes, organizado en 8 secciones con 12 preguntas cerradas y una pregunta abierta sobre necesidades y sugerencias.',
    photos: [],
    cover: 'cuestionario',
    nav: { tab: 'planificacion', sub: 'diagnostico', label: 'Ver resultados del cuestionario' },
  },
  {
    id: 'e4',
    n: 4,
    category: 'digitales',
    icon: GanttChart,
    title: 'Planificación y seguimiento en diagrama de Gantt',
    date: 'Agosto – Septiembre 2026',
    text: 'Planifiqué y di seguimiento a las 18 actividades del diagnóstico en un diagrama de Gantt organizado en tres etapas: antes, durante y después del trabajo de campo.',
    photos: [],
    cover: 'gantt',
    nav: { tab: 'planificacion', sub: 'planeacion', label: 'Abrir el diagrama de Gantt' },
  },
  {
    id: 'e5',
    n: 5,
    category: 'materiales',
    icon: BookOpenText,
    title: 'Recurso "Guía de Micro aprendizajes"',
    date: 'Octubre 2026',
    text: 'Elaboré el recurso digital de la propuesta de mejora: una guía de micro aprendizajes exportable a PDF, con cuatro secciones pensadas para estudiar desde el celular y sin conexión.',
    photos: [],
    cover: 'guia',
    external: { href: CANVA_URL, label: 'Ver recurso en Canva' },
    docs: [{ src: DOCS.propuesta, label: 'Documento de la propuesta' }],
  },
];

const SECTION_LABELS = ['Datos generales', 'Hábitos de estudio', 'Participación', 'Motivación', 'Acceso a la tecnología', 'Apoyo docente', 'Herramientas digitales', 'Necesidades'];
const STAGE_COLOR = { antes: 'bg-plum', durante: 'bg-bronze', despues: 'bg-sage' };

const jornadaOf = (n) => JORNADAS.find((j) => j.n === n);

/* ---------------------------------------------------------------------
   Portadas generadas (cuando la evidencia no tiene fotografía)
   --------------------------------------------------------------------- */

function GeneratedCover({ type, icon: Icon }) {
  if (type === 'cuestionario') {
    return (
      <div className="absolute inset-0 bg-silk p-5 sm:p-8 flex items-center justify-center">
        <div className="w-full max-w-sm rounded-2xl border border-line bg-white shadow-paper-lg overflow-hidden">
          <div className="h-2 bg-plum" />
          <div className="p-4 sm:p-5">
            <p className="font-serif text-xl font-semibold text-ink">Cuestionario diagnóstico</p>
            <p className="text-xs text-muted mt-0.5">Google Forms · N = 11 · 13 preguntas</p>
            <ul className="mt-4 grid grid-cols-2 gap-1.5">
              {SECTION_LABELS.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center gap-1.5 rounded-lg border border-line bg-ivory px-2 py-1.5 text-[10px] sm:text-[11px] text-body"
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-plum" /> {s}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  if (type === 'gantt') {
    const start = Date.parse(CRONOGRAMA[0].start);
    const end = Date.parse(CRONOGRAMA[CRONOGRAMA.length - 1].end);
    const total = end - start + 86400000;
    return (
      <div className="absolute inset-0 bg-silk p-5 sm:p-8 flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-line bg-white shadow-paper-lg p-4 space-y-[5px]">
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted font-semibold mb-2">12/08 – 20/09/2026 · 18 actividades</p>
          {CRONOGRAMA.map((a, i) => {
            const left = ((Date.parse(a.start) - start) / total) * 100;
            const width = ((Date.parse(a.end) - Date.parse(a.start) + 86400000) / total) * 100;
            return (
              <div key={a.id} className="relative h-[7px] rounded-full bg-silk">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.03 * i, duration: 0.4 }}
                  className={cx('absolute inset-y-0 rounded-full origin-left', STAGE_COLOR[a.stage])}
                  style={{ left: `${left}%`, width: `${Math.max(width, 2.5)}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  if (type === 'guia') {
    return (
      <div className="absolute inset-0 bg-silk p-5 flex items-center justify-center">
        <div className="w-[170px] sm:w-[190px] rounded-[1.8rem] border-[6px] border-ink bg-white p-2.5 shadow-paper-lg">
          <div className="rounded-xl bg-plum px-3 py-3">
            <p className="text-[9px] uppercase tracking-[0.16em] text-on-plum-muted font-bold">Guía de</p>
            <p className="font-serif text-lg font-semibold text-white leading-tight">Micro aprendizajes</p>
          </div>
          <ul className="mt-2 space-y-1.5">
            {['Guía de uso', 'Cápsulas visuales', 'Alfabetización digital', 'Orientaciones al tutor'].map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                className="flex items-center gap-1.5 rounded-lg bg-ivory border border-line px-2 py-1.5 text-[10px] text-body"
              >
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-lilac text-[9px] font-bold text-plum">{i + 1}</span> {s}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 bg-silk flex items-center justify-center">
      <span className="inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-lilac-line bg-white text-plum">
        <Icon size={34} />
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Carrusel de expedientes
   --------------------------------------------------------------------- */

function EvidenceMedia({ evidence, available, onBroken, onOpenPhoto }) {
  const photos = evidence.photos.filter((p) => available(p.src));
  const [index, setIndex] = useState(0);
  const safeIndex = photos.length ? index % photos.length : 0;
  const current = photos[safeIndex];
  const j = current ? jornadaOf(current.jornada) : null;

  if (!photos.length) {
    return (
      <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px]">
        <GeneratedCover type={evidence.cover} icon={evidence.icon} />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px] bg-abyss overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.button
          key={current.src}
          type="button"
          onClick={() => onOpenPhoto(current.src)}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 cursor-zoom-in"
          aria-label="Ampliar fotografía"
        >
          <img src={assetUrl(current.src)} alt={current.caption} decoding="async" onError={() => onBroken(current.src)} className="h-full w-full object-cover" />
        </motion.button>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss/85 to-transparent p-4 pt-12">
        <p className="text-xs sm:text-sm text-white leading-snug">{current.caption}</p>
        <p className="mt-1 text-[11px] text-on-plum-muted">
          Jornada {current.jornada} · {j?.date}
        </p>
      </div>
      {photos.length > 1 && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + photos.length) % photos.length)}
            aria-label="Fotografía anterior"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-plum hover:bg-white"
          >
            <ChevronLeft size={17} />
          </button>
          <span className="rounded-lg bg-white/90 px-2 py-1 text-[11px] font-bold text-plum tabular-nums">
            {safeIndex + 1}/{photos.length}
          </span>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % photos.length)}
            aria-label="Fotografía siguiente"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-plum hover:bg-white"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      )}
    </div>
  );
}

function EvidenceCarousel({ items, available, onBroken, onOpenPhoto, onNavigate }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const safeIndex = items.length ? Math.min(index, items.length - 1) : 0;
  const current = items[safeIndex];

  const go = useCallback(
    (delta) => {
      if (!items.length) return;
      setDirection(delta);
      setIndex((i) => (Math.min(i, items.length - 1) + delta + items.length) % items.length);
    },
    [items.length]
  );

  if (!current) return null;
  const cat = CATEGORIES[current.category];
  const CIcon = current.icon;

  return (
    <div className="space-y-4">
      <div className="relative rounded-[2rem] border border-line bg-white shadow-paper-lg overflow-hidden">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(1);
              else if (info.offset.x > 70) go(-1);
            }}
            className="grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <EvidenceMedia key={current.id} evidence={current} available={available} onBroken={onBroken} onOpenPhoto={onOpenPhoto} />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge toneName={cat.toneName} icon={cat.icon}>
                  {cat.label}
                </Badge>
                <Badge toneName="slate" icon={CalendarDays}>
                  {current.date}
                </Badge>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
                  <CIcon size={22} />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">Evidencia {current.n}</p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight">{current.title}</h3>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed text-body">{current.text}</p>
              <div className="mt-auto flex flex-col gap-2.5">
                {current.external && <ExternalButton href={current.external.href} label={current.external.label} icon={Palette} block />}
                {current.docs?.map((d) => (
                  <DocLink key={d.label} src={d.src} label={d.label} variant="secondary" block />
                ))}
                {current.nav && (
                  <Button variant="primary" iconRight={ArrowRight} onClick={() => onNavigate?.(current.nav.tab, current.nav.sub)} className="w-full">
                    {current.nav.label}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Evidencia anterior"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-lilac-line bg-white text-plum hover:bg-lilac transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Evidencia siguiente"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-lilac-line bg-white text-plum hover:bg-lilac transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {items.map((e, i) => (
            <button
              key={e.id}
              type="button"
              onClick={() => {
                setDirection(i > safeIndex ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Ir a la evidencia ${e.n}`}
              className={cx(
                'min-h-[36px] shrink-0 rounded-full border px-3 text-xs font-semibold transition-all',
                i === safeIndex ? 'border-plum bg-plum text-white' : 'border-line bg-white text-body hover:border-line-strong'
              )}
            >
              {e.n}
              <span className="hidden sm:inline"> · {e.title.split(' ').slice(0, 2).join(' ')}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Visor (lightbox)
   --------------------------------------------------------------------- */

function Lightbox({ open, photos, index, onIndex, onClose }) {
  const current = photos[index];
  const j = current ? jornadaOf(current.jornada) : null;

  useEffect(() => {
    if (!open || photos.length < 2) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onIndex((index + 1) % photos.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, photos.length, onIndex]);

  return (
    <Modal
      open={open && Boolean(current)}
      onClose={onClose}
      title={current ? `Jornada ${current.jornada} · ${j?.date}` : ''}
      subtitle={current ? `Fotografía ${index + 1} de ${photos.length}` : ''}
      icon={Camera}
      size="xl"
    >
      {current && (
        <div className="space-y-4">
          <div className="relative rounded-2xl bg-abyss overflow-hidden flex items-center justify-center min-h-[240px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={current.src}
                src={assetUrl(current.src)}
                alt={current.caption}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="max-h-[58vh] w-auto max-w-full object-contain"
              />
            </AnimatePresence>
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => onIndex((index - 1 + photos.length) % photos.length)}
                  aria-label="Anterior"
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-plum hover:bg-white shadow-paper"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => onIndex((index + 1) % photos.length)}
                  aria-label="Siguiente"
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-plum hover:bg-white shadow-paper"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          <p className="text-sm sm:text-base text-ink leading-relaxed">{current.caption}</p>
          {j && (
            <div className="rounded-2xl border border-line bg-ivory p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold mb-2">Actividades declaradas en la hoja de control</p>
              <ul className="space-y-1.5">
                {j.activities.map((a) => (
                  <li key={a.text} className="flex gap-2 text-xs sm:text-sm text-body">
                    <Clock size={14} className="shrink-0 mt-0.5 text-plum" />
                    <span>
                      <span className="font-semibold text-ink tabular-nums">{a.time}</span> · {a.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => onIndex(i)}
                aria-label={`Ver fotografía ${i + 1}`}
                className={cx('relative shrink-0 h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden border-2 transition-all', i === index ? 'border-plum' : 'border-transparent opacity-60 hover:opacity-100')}
              >
                <img src={assetUrl(p.src)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Evidencias_practica_docente({ onNavigate }) {
  const [broken, setBroken] = useState(() => new Set());
  const [category, setCategory] = useState('todas');
  const [jornada, setJornada] = useState('todas');
  const [lightbox, setLightbox] = useState({ open: false, list: [], index: 0 });

  const markBroken = useCallback((src) => setBroken((prev) => (prev.has(src) ? prev : new Set(prev).add(src))), []);
  const available = useCallback((src) => !broken.has(src), [broken]);
  const visiblePhotos = useMemo(() => PHOTOS.filter((p) => !broken.has(p.src)), [broken]);
  const galleryPhotos = useMemo(() => visiblePhotos.filter((p) => jornada === 'todas' || p.jornada === Number(jornada)), [visiblePhotos, jornada]);
  const evidences = EVIDENCES.filter((e) => category === 'todas' || e.category === category);

  const openPhoto = (list, src) => {
    const idx = list.findIndex((p) => p.src === src);
    setLightbox({ open: true, list, index: Math.max(idx, 0) });
  };

  const jornadaOptions = [
    { id: 'todas', label: 'Todas', icon: LayoutGrid, count: visiblePhotos.length },
    ...JORNADAS.map((j) => ({ id: String(j.n), label: `J${j.n}`, count: visiblePhotos.filter((p) => p.jornada === j.n).length })).filter((o) => o.count > 0),
  ];

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Evidencias"
        icon={ImageIcon}
        title="Evidencias de la"
        highlight="práctica docente"
        description="Expedientes de trabajo de campo, instrumentos digitales y materiales didácticos, junto con el registro fotográfico de cada jornada."
      />

      {/* Estado del proyecto */}
      <PlumBand>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-sage px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white font-bold">
              <BadgeCheck size={14} /> Prácticas finalizadas
            </span>
            <p className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-on-plum">
              {PRACTICE_SUMMARY.jornadas} de {PRACTICE_SUMMARY.jornadas} jornadas <span className="italic text-[#E5D5B5]">completadas</span>
            </p>
            <p className="text-sm text-on-plum-muted">
              Del {PRACTICE_SUMMARY.inicio} al {PRACTICE_SUMMARY.fin} · {PRACTICE_SUMMARY.horario}
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-3 gap-3">
            {[
              { v: `${PRACTICE_SUMMARY.horas} h`, l: 'Horas acreditadas', i: Clock },
              { v: String(visiblePhotos.length), l: 'Fotografías', i: Images },
              { v: String(EVIDENCES.length), l: 'Expedientes', i: FileText },
            ].map((s) => {
              const SIcon = s.i;
              return (
                <div key={s.l} className="rounded-2xl border border-white/15 bg-white/5 p-3 sm:p-4">
                  <SIcon size={17} className="text-[#E5D5B5]" />
                  <p className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-on-plum leading-none">{s.v}</p>
                  <p className="mt-1 text-[11px] sm:text-xs text-on-plum-muted">{s.l}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-7 gap-1.5">
          {JORNADAS.map((j, i) => (
            <motion.div
              key={j.n}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="origin-left"
            >
              <span className="block h-1.5 rounded-full bg-[#E5D5B5]" />
              <span className="mt-1.5 block text-center text-[10px] sm:text-[11px] text-on-plum-muted tabular-nums">{j.date.slice(0, 5)}</span>
            </motion.div>
          ))}
        </div>
      </PlumBand>

      {/* Expedientes */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">Expedientes de evidencia</p>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">Carrusel de evidencias</h3>
          </div>
          <FilterChips
            value={category}
            onChange={setCategory}
            options={[
              { id: 'todas', label: 'Todas', count: EVIDENCES.length },
              ...Object.entries(CATEGORIES).map(([id, c]) => ({ id, label: c.label, icon: c.icon, count: EVIDENCES.filter((e) => e.category === id).length })),
            ]}
          />
        </div>
        <EvidenceCarousel
          key={category}
          items={evidences}
          available={available}
          onBroken={markBroken}
          onOpenPhoto={(src) => openPhoto(visiblePhotos, src)}
          onNavigate={onNavigate}
        />
      </section>

      {/* Galería */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">Registro fotográfico</p>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">Galería por jornada</h3>
          </div>
          <FilterChips options={jornadaOptions} value={jornada} onChange={setJornada} />
        </div>

        {jornada !== 'todas' && (
          <div className="rounded-2xl border border-line bg-white shadow-paper p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
            <p className="text-sm text-body">
              <span className="font-semibold text-ink">Jornada {jornada}</span> · {jornadaOf(Number(jornada))?.date} · {jornadaOf(Number(jornada))?.activities.length} actividades
              declaradas
            </p>
            <DocLink src={jornadaDoc(Number(jornada))} label="Hoja de control" variant="light" size="sm" />
          </div>
        )}

        <div className="columns-2 md:columns-3 xl:columns-4 gap-3 sm:gap-4">
          <AnimatePresence initial={false}>
            {galleryPhotos.map((p) => (
              <motion.button
                key={p.src}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onClick={() => openPhoto(galleryPhotos, p.src)}
                className="group relative mb-3 sm:mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line bg-silk shadow-paper hover:shadow-paper-lg transition-shadow"
                style={{ aspectRatio: p.ratio }}
              >
                <img
                  src={assetUrl(p.src)}
                  alt={p.caption}
                  loading="lazy"
                  decoding="async"
                  onError={() => markBroken(p.src)}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-plum">J{p.jornada}</span>
                <span className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-abyss/90 to-abyss/0 p-3 pt-8 text-left">
                  <span className="flex items-start gap-1.5 text-[11px] sm:text-xs text-white leading-snug">
                    <Expand size={13} className="shrink-0 mt-0.5" /> {p.caption}
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

      </section>

      <Lightbox
        open={lightbox.open}
        photos={lightbox.list}
        index={Math.min(lightbox.index, Math.max(lightbox.list.length - 1, 0))}
        onIndex={(i) => setLightbox((s) => ({ ...s, index: i }))}
        onClose={() => setLightbox((s) => ({ ...s, open: false }))}
      />
    </PageShell>
  );
}
