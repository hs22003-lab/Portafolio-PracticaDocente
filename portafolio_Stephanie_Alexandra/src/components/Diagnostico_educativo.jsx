import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChartPie,
  BookOpenText,
  ClipboardList,
  Eye,
  MessagesSquare,
  Grid2x2,
  Flag,
  Users,
  Flame,
  NotebookPen,
  MonitorSmartphone,
  ListChecks,
  GitMerge,
  School,
  GraduationCap,
  FlaskConical,
  CalendarDays,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { StatCard, TabBar, Badge } from './ui/Primitives';
import { cx, fadeUp, stagger } from './ui/tokens';
import MarcoTeorico from './diagnostico/MarcoTeorico';
import Encuesta from './diagnostico/Encuesta';
import Observacion from './diagnostico/Observacion';
import Entrevistas from './diagnostico/Entrevistas';
import MatrizFoda from './diagnostico/MatrizFoda';
import Conclusiones from './diagnostico/Conclusiones';

/* =====================================================================
   DIAGNÓSTICO EDUCATIVO · Contenedor maestro de las seis sub-vistas
   ===================================================================== */

const SECTIONS = [
  { id: 'marco', label: 'Marco Teórico', shortLabel: 'Marco', icon: BookOpenText, component: MarcoTeorico, hint: 'Fundamentos, metodología y referencias' },
  { id: 'encuesta', label: 'Encuesta', icon: ClipboardList, component: Encuesta, hint: '13 preguntas · N = 11 estudiantes' },
  { id: 'observacion', label: 'Observación', icon: Eye, component: Observacion, hint: '20 indicadores en 4 dimensiones' },
  { id: 'entrevistas', label: 'Entrevistas', icon: MessagesSquare, component: Entrevistas, hint: 'Docente tutor y coordinador' },
  { id: 'foda', label: 'Matriz FODA', shortLabel: 'FODA', icon: Grid2x2, component: MatrizFoda, hint: 'Síntesis estratégica (Tabla 15)' },
  { id: 'conclusiones', label: 'Conclusiones', icon: Flag, component: Conclusiones, hint: 'Triangulación y recomendaciones' },
];

const METRICS = [
  { label: 'Encuestados', value: 'N = 11', hint: 'Estudiantes de 1.° Año de Bachillerato', icon: Users, toneName: 'violet' },
  { label: 'Motivación', value: '90.9%', hint: 'Motivado o bastante motivado', icon: Flame, toneName: 'amber' },
  { label: 'Autonomía', value: '81.9%', hint: 'Estudia siempre o casi siempre por su cuenta', icon: NotebookPen, toneName: 'indigo' },
  { label: 'Uso de EVA', value: '90.9%', hint: 'Recurre a Classroom o Moodle', icon: MonitorSmartphone, toneName: 'emerald' },
  { label: 'Indicadores', value: '20', hint: 'Observados en la guía sistemática', icon: ListChecks, toneName: 'violet' },
  { label: 'Instrumentos', value: '4', hint: 'Triangulados en el análisis', icon: GitMerge, toneName: 'amber' },
];

const CONTEXT = [
  { icon: School, text: 'Instituto Nacional Dr. Francisco Martínez Suárez' },
  { icon: GraduationCap, text: '1.° Año de Bachillerato · Modalidad flexible' },
  { icon: FlaskConical, text: 'Ciencias Naturales y Tecnología' },
  { icon: CalendarDays, text: 'Agosto – septiembre 2026' },
];

export default function Diagnostico_educativo({ onNavigate }) {
  const [active, setActive] = useState('marco');
  const anchorRef = useRef(null);

  const index = SECTIONS.findIndex((s) => s.id === active);
  const current = SECTIONS[index];
  const prev = index > 0 ? SECTIONS[index - 1] : null;
  const next = index < SECTIONS.length - 1 ? SECTIONS[index + 1] : null;
  const View = current.component;

  const selectSection = useCallback((id, scroll = true) => {
    setActive(id);
    if (scroll) {
      window.requestAnimationFrame(() => anchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
      {/* Hero ejecutivo */}
      <motion.section initial="hidden" animate="show" variants={stagger} className="relative">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <motion.div variants={fadeUp} className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge toneName="amber" icon={ChartPie}>
                Fase diagnóstica
              </Badge>
              <Badge toneName="violet">Enfoque mixto · Alcance descriptivo</Badge>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] text-ink">
              Diagnóstico <span className="italic text-plum">Educativo</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-body leading-relaxed max-w-2xl">
              Un recorrido por el marco teórico, los cuatro instrumentos aplicados y su triangulación para comprender el proceso de enseñanza-aprendizaje
              del grupo y orientar la propuesta de mejora.
            </p>
          </motion.div>
          <motion.ul variants={fadeUp} className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {CONTEXT.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.text} className="flex items-center gap-3 rounded-2xl border border-line bg-ivory px-4 py-3">
                  <Icon size={16} className="shrink-0 text-bronze" />
                  <span className="text-sm text-body leading-snug">{c.text}</span>
                </li>
              );
            })}
          </motion.ul>
        </div>

        <motion.div variants={stagger} className="relative mt-8 sm:mt-10 grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {METRICS.map((m) => (
            <motion.div key={m.label} variants={fadeUp}>
              <StatCard {...m} className="h-full" />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Navegación interna */}
      <div ref={anchorRef} className="scroll-mt-28 sm:scroll-mt-32 space-y-3">
        <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-muted">
          <span>
            <span className="text-bronze font-semibold">{String(index + 1).padStart(2, '0')}</span> / {String(SECTIONS.length).padStart(2, '0')} ·{' '}
            {current.hint}
          </span>
          <span className="hidden sm:flex gap-1.5" aria-hidden="true">
            {SECTIONS.map((s, i) => (
              <span key={s.id} className={cx('h-1 rounded-full transition-all duration-500', i === index ? 'w-8 bg-plum' : 'w-3 bg-line-strong')} />
            ))}
          </span>
        </div>
        <TabBar
          tabs={SECTIONS.map(({ id, label, shortLabel, icon }) => ({ id, label, shortLabel, icon }))}
          active={active}
          onChange={(id) => selectSection(id, false)}
          layoutId="diagnostico-subtabs"
        />
      </div>

      {/* Sub-vista activa */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <View onNavigate={onNavigate} onSelectSection={selectSection} />
        </motion.div>
      </AnimatePresence>

      {/* Navegación anterior / siguiente */}
      <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-line" aria-label="Secciones del diagnóstico">
        {prev ? (
          <button
            type="button"
            onClick={() => selectSection(prev.id)}
            className="group flex items-center gap-4 rounded-3xl border border-line bg-white p-4 sm:p-5 text-left hover:border-line-strong hover:bg-ivory transition-all"
          >
            <ArrowLeft size={20} className="shrink-0 text-bronze transition-transform group-hover:-translate-x-1" />
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-[0.2em] text-muted">Anterior</span>
              <span className="block font-serif text-xl font-semibold text-ink truncate">{prev.label}</span>
            </span>
          </button>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <button
            type="button"
            onClick={() => selectSection(next.id)}
            className="group flex items-center justify-end gap-4 rounded-3xl border border-line bg-white p-4 sm:p-5 text-right hover:border-line-strong hover:bg-ivory transition-all"
          >
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-[0.2em] text-muted">Siguiente</span>
              <span className="block font-serif text-xl font-semibold text-ink truncate">{next.label}</span>
            </span>
            <ArrowRight size={20} className="shrink-0 text-bronze transition-transform group-hover:translate-x-1" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onNavigate?.('cierre', 'propuesta')}
            className="group flex items-center justify-end gap-4 rounded-3xl border border-sand-line bg-sand p-4 sm:p-5 text-right hover:bg-[#F0E6D2] transition-all"
          >
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-[0.2em] text-bronze">Continuar</span>
              <span className="block font-serif text-xl font-semibold text-plum truncate">Propuesta de Mejora</span>
            </span>
            <ArrowRight size={20} className="shrink-0 text-bronze transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </nav>
    </div>
  );
}
