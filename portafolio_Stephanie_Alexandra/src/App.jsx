import { Suspense, lazy, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Compass,
  CalendarRange,
  Presentation,
  BookOpen,
  Sparkles,
  Target,
  MapPin,
  ChartPie,
  Image as ImageIcon,
  FileText,
  NotebookPen,
  MessageSquareQuote,
  Lightbulb,
  Laptop,
  Star,
} from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { TabBar, Skeleton } from './components/ui/Primitives';

// Vistas (carga diferida para un arranque rápido)
const Portada = lazy(() => import('./components/Portada'));
const Objetivos = lazy(() => import('./components/Objetivos'));
const Contexto_educativo = lazy(() => import('./components/Contexto_educativo'));
const Planeacion_y_organizacion = lazy(() => import('./components/Planeacion_y_organizacion'));
const Diagnostico_educativo = lazy(() => import('./components/Diagnostico_educativo'));
const Evidencias_practica_docente = lazy(() => import('./components/Evidencias_practica_docente'));
const Planificaciones_de_clases = lazy(() => import('./components/Planificaciones_de_clases'));
const Diario_reflexivo_semanal = lazy(() => import('./components/Diario_reflexivo_semanal'));
const Evaluacion_y_retroalimentacion = lazy(() => import('./components/Evaluacion_y_retroalimentacion'));
const Propuesta_de_mejora = lazy(() => import('./components/Propuesta_de_mejora'));
const Recursos_tecnologicos_aplicados = lazy(() => import('./components/Recursos_tecnologicos_aplicados'));
const Experiencias_significativas = lazy(() => import('./components/Experiencias_significativas'));

/** Mapa de navegación: grupos principales y sus sub-vistas. */
const SECTIONS = [
  {
    id: 'inicio',
    label: 'Inicio',
    icon: Home,
    description: 'Portada, presentación e introducción',
    subs: [{ id: 'portada', label: 'Portada', icon: Home, component: Portada }],
  },
  {
    id: 'contexto',
    label: 'Contexto',
    icon: Compass,
    description: 'Objetivos y contexto educativo',
    subs: [
      { id: 'objetivos', label: 'Objetivos', icon: Target, component: Objetivos },
      { id: 'contexto', label: 'Contexto Educativo', shortLabel: 'Contexto', icon: MapPin, component: Contexto_educativo },
    ],
  },
  {
    id: 'planificacion',
    label: 'Planificación',
    icon: CalendarRange,
    description: 'Cronograma, Gantt y diagnóstico',
    subs: [
      { id: 'planeacion', label: 'Planeación y Organización', shortLabel: 'Planeación', icon: CalendarRange, component: Planeacion_y_organizacion },
      { id: 'diagnostico', label: 'Diagnóstico Educativo', shortLabel: 'Diagnóstico', icon: ChartPie, component: Diagnostico_educativo },
    ],
  },
  {
    id: 'practica',
    label: 'Práctica',
    icon: Presentation,
    description: 'Evidencias y planes de clase',
    subs: [
      { id: 'evidencias', label: 'Evidencias', icon: ImageIcon, component: Evidencias_practica_docente },
      { id: 'planificaciones', label: 'Planificaciones de Clase', shortLabel: 'Planes', icon: FileText, component: Planificaciones_de_clases },
    ],
  },
  {
    id: 'evaluacion',
    label: 'Reflexión',
    icon: BookOpen,
    description: 'Diario reflexivo y evaluación',
    subs: [
      { id: 'diario', label: 'Diario Reflexivo', shortLabel: 'Diario', icon: NotebookPen, component: Diario_reflexivo_semanal },
      { id: 'retroalimentacion', label: 'Evaluación y Retroalimentación', shortLabel: 'Evaluación', icon: MessageSquareQuote, component: Evaluacion_y_retroalimentacion },
    ],
  },
  {
    id: 'cierre',
    label: 'Mejora y Cierre',
    icon: Sparkles,
    description: 'Propuesta, recursos, experiencias y anexos',
    subs: [
      { id: 'propuesta', label: 'Propuesta de Mejora', shortLabel: 'Propuesta', icon: Lightbulb, component: Propuesta_de_mejora },
      { id: 'recursos', label: 'Recursos Tecnológicos', shortLabel: 'Recursos', icon: Laptop, component: Recursos_tecnologicos_aplicados },
      { id: 'experiencias', label: 'Experiencias y Anexos', shortLabel: 'Experiencias', icon: Star, component: Experiencias_significativas },
    ],
  },
];

const DEFAULT_SUBS = SECTIONS.reduce((acc, s) => ({ ...acc, [s.id]: s.subs[0].id }), {});

/** Fallback elegante mientras se carga cada vista. */
function ViewFallback() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 py-6">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-12 sm:h-16 w-full max-w-2xl" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-44 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [subTabs, setSubTabs] = useState(DEFAULT_SUBS);

  const navigate = useCallback((tabId, subId) => {
    setActiveTab(tabId);
    if (subId) setSubTabs((prev) => ({ ...prev, [tabId]: subId }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const changeSub = useCallback(
    (subId) => {
      setSubTabs((prev) => ({ ...prev, [activeTab]: subId }));
    },
    [activeTab]
  );

  const section = SECTIONS.find((s) => s.id === activeTab) || SECTIONS[0];
  const currentSubId = subTabs[section.id];
  const currentSub = section.subs.find((s) => s.id === currentSubId) || section.subs[0];
  const View = currentSub.component;
  const sectionIndex = SECTIONS.findIndex((s) => s.id === section.id);

  return (
    <div className="relative min-h-screen bg-ivory text-body font-sans overflow-x-hidden">
      {/* Filete superior editorial (sin iluminación ambiental) */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[340px] bg-silk/60 border-b border-line/60" aria-hidden="true" />

      <Navbar sections={SECTIONS} activeTab={activeTab} activeSub={currentSub.id} onNavigate={navigate} />

      <main className="relative z-10 min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24">
        {/* Encabezado de sección + sub-pestañas (no aplica en la portada) */}
        {section.id !== 'inicio' && (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4 sm:gap-5"
            >
              <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.24em] text-muted">
                <span className="text-bronze font-semibold">{String(sectionIndex + 1).padStart(2, '0')}</span>
                <span className="h-px w-8 bg-sand-line" />
                <span>{section.label}</span>
                <span className="text-line-strong">/</span>
                <span className="text-plum font-semibold">{currentSub.label}</span>
              </div>
              {section.subs.length > 1 && (
                <TabBar
                  tabs={section.subs.map((s) => ({ id: s.id, label: s.label, shortLabel: s.shortLabel, icon: s.icon }))}
                  active={currentSub.id}
                  onChange={changeSub}
                  layoutId={`main-sub-${section.id}`}
                />
              )}
            </motion.div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${section.id}-${currentSub.id}`}
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Suspense fallback={<ViewFallback />}>
              <View onNavigate={navigate} />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer sections={SECTIONS} onNavigate={navigate} />
    </div>
  );
}

export default App;