import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  School,
  Users,
  Laptop,
  Flame,
  Wifi,
  Clock,
  MessageCircle,
  Library,
  Building2,
  Presentation,
  HeartPulse,
  BookCopy,
  DoorOpen,
  UserRound,
  GraduationCap,
  Crown,
  Briefcase,
  Baby,
  Bus,
  PlayCircle,
  UsersRound,
  Gamepad2,
  Repeat,
  PenLine,
  MonitorCog,
  Projector,
  Speaker,
  Network,
  Wrench,
  Smartphone,
  Monitor,
  Lightbulb,
  ChevronRight,
} from 'lucide-react';
import {
  PageShell,
  GlassCard,
  SectionHeader,
  CardTitle,
  Badge,
  TabBar,
  StatCard,
  ProgressBar,
  DonutChart,
  ChartLegend,
  HorizontalBars,
  DataTable,
  EditorialQuote,
} from './ui/Primitives';
import { cx, fadeUp, stagger } from './ui/tokens';

/* =====================================================================
   CONTEXTO EDUCATIVO · Dashboard de institución, grupo y recursos TIC
   ===================================================================== */

const KPIS = [
  { label: 'Encuestados', value: '11', hint: 'Estudiantes de 1.° Año de Bachillerato', icon: Users, toneName: 'violet' },
  { label: 'Motivación', value: '90.9%', hint: 'Motivado o bastante motivado', icon: Flame, toneName: 'amber' },
  { label: 'Laboratorio', value: '30', hint: 'Computadoras institucionales', icon: Laptop, toneName: 'emerald' },
  { label: 'Internet en casa', value: '72.7%', hint: 'Cuenta con conexión en el hogar', icon: Wifi, toneName: 'indigo' },
];

const TABS = [
  { id: 'institucion', label: 'Institución', icon: School },
  { id: 'grupo', label: 'Grupo de práctica', shortLabel: 'Grupo', icon: Users },
  { id: 'tic', label: 'Recursos TIC', icon: Laptop },
];

const FACILITIES = [
  { icon: DoorOpen, label: 'Aulas exclusivas', text: 'Asignadas específicamente a la modalidad flexible.' },
  { icon: Library, label: 'Biblioteca', text: 'Espacio de consulta y estudio.' },
  { icon: Building2, label: 'Área administrativa', text: 'Matrículas, registros y gestión.' },
  { icon: Presentation, label: 'Salón de usos múltiples', text: 'Cuenta con un proyector fijo.' },
  { icon: HeartPulse, label: 'Apoyo psicológico', text: 'Acompañamiento institucional.' },
  { icon: BookCopy, label: 'Entrega de módulos', text: 'Módulos impresos y digitales por materia.' },
];

const ORG_CHART = [
  { icon: Crown, role: 'Director General', name: 'Conduce ambas modalidades: presencial y flexible' },
  { icon: UserRound, role: 'Coordinador de Modalidad Flexible', name: 'Lcdo. Gerardo Escobar Mejía' },
  { icon: GraduationCap, role: 'Docente tutor institucional', name: 'Lcdo. Amilcar Heriberto Sánchez' },
  { icon: PenLine, role: 'Practicante', name: 'Stephanie Alexandra Hernández Sibrián' },
];

const BARRIERS = [
  { icon: Briefcase, title: 'Horarios laborales', text: 'Varios estudiantes trabajan y, en algunos casos, el trabajo les impide asistir a las jornadas.' },
  { icon: Baby, title: 'Cuidado de hijos o enfermedad', text: 'Quienes son madres o padres de familia faltan cuando no tienen quién cuide a sus hijos o cuando estos enferman.' },
  { icon: Bus, title: 'Transporte inestable', text: 'La sede atiende a estudiantes de otros municipios de Chalatenango, con transporte inestable.' },
];

const AGE = [
  { label: '19 años o más', value: 81.8, color: '#4A2574' },
  { label: '17-18 años', value: 18.2, color: '#B08A4F' },
];

const SEX = [
  { label: 'Masculino', value: 54.5, color: '#4A2574' },
  { label: 'Femenino', value: 45.5, color: '#B5657F' },
];

const PREFERENCES = [
  { label: 'Videos explicativos', value: 5, percent: 45.5, color: '#4A2574' },
  { label: 'Trabajo en equipo', value: 5, percent: 45.5, color: '#B08A4F' },
  { label: 'Dinámicas o juegos interactivos', value: 5, percent: 45.5, color: '#5E8C76' },
];

const DEVICE = [
  { label: 'Computadora', value: 72.7, color: '#4A2574' },
  { label: 'Smartphone', value: 27.3, color: '#B08A4F' },
];

const CONNECTIVITY = [
  { label: 'Cuenta con Internet', value: 72.7, color: '#5E8C76' },
  { label: 'Señal inestable', value: 18.2, color: '#B08A4F' },
  { label: 'Sin acceso', value: 9.1, color: '#B5657F' },
];

const INVENTORY = [
  { id: 'lab', icon: MonitorCog, resource: 'Laboratorio de informática', amount: '1 laboratorio · 30 computadoras', status: 'Funcional', toneName: 'emerald', note: 'Requieren actualización de software.' },
  { id: 'proj', icon: Projector, resource: 'Proyectores', amount: '6 compartidos + 1 fijo', status: 'Disponible', toneName: 'emerald', note: 'El proyector fijo está en el salón de usos múltiples.' },
  { id: 'audio', icon: Speaker, resource: 'Bocinas', amount: 'Para diferentes actividades', status: 'Buen estado', toneName: 'emerald', note: 'De uso institucional.' },
  { id: 'net', icon: Network, resource: 'Red de Internet', amount: 'Cobertura de red del MINED', status: 'Funcional con restricciones', toneName: 'amber', note: 'Restringe plataformas que no son educativas.' },
  { id: 'support', icon: Wrench, resource: 'Soporte técnico', amount: 'Sin técnico permanente', status: 'Externo / interno', toneName: 'rose', note: 'Red: MINED. Equipos: docentes de informática.' },
];

const INVENTORY_COLUMNS = [
  {
    key: 'resource',
    label: 'Recurso',
    className: 'w-[24%]',
    render: (r) => {
      const RIcon = r.icon;
      return (
        <span className="flex items-center gap-2.5 font-semibold text-ink">
          <RIcon size={17} className="shrink-0 text-plum" /> {r.resource}
        </span>
      );
    },
  },
  { key: 'amount', label: 'Disponibilidad', className: 'w-[24%]' },
  { key: 'status', label: 'Estado', className: 'w-[20%]', render: (r) => <Badge toneName={r.toneName}>{r.status}</Badge> },
  { key: 'note', label: 'Observación' },
];

/* ---------------------------------------------------------------------
   Paneles
   --------------------------------------------------------------------- */

function DayScheduleBar() {
  // Jornada institucional 7:00–17:00 (10 h) · tutoría de práctica 7:00–12:00
  const hours = Array.from({ length: 11 }, (_, i) => 7 + i);
  return (
    <div>
      <div className="relative h-12 rounded-2xl border border-line bg-silk overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 bg-lilac"
        />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '50%' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-1.5 left-1.5 rounded-xl bg-plum flex items-center px-3"
        >
          <span className="text-[11px] sm:text-xs font-semibold text-white whitespace-nowrap">Tutoría de práctica · 7:00 – 12:00</span>
        </motion.div>
      </div>
      <div className="mt-2 flex justify-between text-[10px] sm:text-[11px] text-muted tabular-nums">
        {hours.map((h) => (
          <span key={h} className={cx(h % 2 === 0 && 'hidden sm:inline')}>
            {h > 12 ? h - 12 : h}
            {h < 12 ? 'a' : 'p'}
          </span>
        ))}
      </div>
    </div>
  );
}

function InstitutionPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <GlassCard hover={false} className="lg:col-span-7 space-y-6">
          <CardTitle icon={School} title="Instituto Nacional Dr. Francisco Martínez Suárez" subtitle="Chalatenango · Modalidades Flexibles de Educación" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-line bg-ivory p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">Gestión</p>
              <p className="mt-1.5 text-sm text-body leading-relaxed">
                Gestión administrativa centrada en <strong className="text-ink">matrículas y registros</strong>, bajo la conducción del Director General.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-ivory p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">Coordinación de la modalidad</p>
              <p className="mt-1.5 text-sm text-body leading-relaxed">
                Coordinador de Modalidad Flexible: <strong className="text-ink">Gerardo</strong> (Lcdo. Gerardo Escobar Mejía).
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Clock size={16} className="text-plum" /> Sábados de 7:00 a.m. a 5:00 p.m.
              </p>
              <Badge toneName="amber">Jornada semipresencial</Badge>
            </div>
            <DayScheduleBar />
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-sage-line bg-sage-soft p-4">
            <MessageCircle size={18} className="shrink-0 mt-0.5 text-sage" />
            <p className="text-sm text-body leading-relaxed">
              <strong className="text-ink">Apoyo entre semana por WhatsApp:</strong> ante cualquier consulta, los estudiantes se comunican con el docente mediante los
              grupos de WhatsApp.
            </p>
          </div>
        </GlassCard>

        <GlassCard hover={false} className="lg:col-span-5">
          <CardTitle icon={Users} title="Estructura de acompañamiento" subtitle="Roles que intervienen en la práctica" toneName="amber" />
          <motion.ol initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mt-6 relative space-y-3">
            <span className="absolute left-5 top-5 bottom-5 w-px bg-line-strong" aria-hidden="true" />
            {ORG_CHART.map((o, i) => {
              const OIcon = o.icon;
              const isMe = i === ORG_CHART.length - 1;
              return (
                <motion.li key={o.role} variants={fadeUp} className="relative flex items-start gap-3">
                  <span
                    className={cx(
                      'relative z-10 shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl border',
                      isMe ? 'bg-plum border-plum text-white' : 'bg-white border-lilac-line text-plum'
                    )}
                  >
                    <OIcon size={17} />
                  </span>
                  <div className={cx('flex-1 rounded-2xl border px-4 py-3', isMe ? 'border-plum bg-lilac' : 'border-line bg-white')}>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-muted font-semibold">{o.role}</p>
                    <p className="text-sm font-semibold text-ink leading-snug mt-0.5">{o.name}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </GlassCard>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold mb-4">Instalaciones y apoyos institucionales</p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {FACILITIES.map((f) => {
            const FIcon = f.icon;
            return (
              <motion.div key={f.label} variants={fadeUp} className="rounded-2xl border border-line bg-white shadow-paper p-4 hover:border-line-strong hover:shadow-paper-lg transition-all">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lilac border border-lilac-line text-plum">
                  <FIcon size={18} />
                </span>
                <p className="mt-3 text-sm font-semibold text-ink leading-snug">{f.label}</p>
                <p className="mt-1 text-xs text-muted leading-snug">{f.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

function GroupPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard hover={false}>
          <CardTitle icon={Users} title="Edad" subtitle="N = 11 estudiantes encuestados" />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <DonutChart data={AGE} centerValue="81.8%" centerLabel="19 años o más" size={180} thickness={24} />
            <ChartLegend data={AGE.map((d) => ({ ...d, percent: d.value, value: Math.round((d.value / 100) * 11) }))} />
          </div>
        </GlassCard>
        <GlassCard hover={false}>
          <CardTitle icon={UsersRound} title="Sexo" subtitle="Distribución del grupo" toneName="rose" />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <DonutChart data={SEX} centerValue="11" centerLabel="estudiantes" size={180} thickness={24} />
            <ChartLegend data={SEX.map((d) => ({ ...d, percent: d.value, value: Math.round((d.value / 100) * 11) }))} />
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <GlassCard hover={false} className="lg:col-span-5 space-y-5">
          <CardTitle icon={Flame} title="Motivación" subtitle="Superación personal como motor" toneName="amber" />
          <div className="flex items-end gap-3">
            <span className="font-serif text-6xl font-semibold text-bronze-dark leading-none">90.9%</span>
            <span className="text-sm text-muted pb-1.5">del grupo se siente motivado</span>
          </div>
          <ProgressBar value={90.9} toneName="amber" label="Motivado o bastante motivado" />
          <div className="rounded-2xl border border-line bg-ivory p-4 space-y-2.5">
            <p className="flex items-start gap-2.5 text-sm text-body leading-relaxed">
              <Briefcase size={16} className="shrink-0 mt-0.5 text-plum" /> La mayoría trabaja durante la semana.
            </p>
            <p className="flex items-start gap-2.5 text-sm text-body leading-relaxed">
              <Baby size={16} className="shrink-0 mt-0.5 text-plum" /> Algunas estudiantes son madres de familia.
            </p>
          </div>
        </GlassCard>

        <GlassCard hover={false} className="lg:col-span-7 space-y-5">
          <CardTitle icon={PlayCircle} title="Preferencias de aprendizaje" subtitle="Actividades que les ayudan a entender mejor (selección múltiple)" />
          <HorizontalBars data={PREFERENCES} max={100} />
          <div className="flex items-start gap-3 rounded-2xl border border-sand-line bg-sand p-4">
            <Repeat size={18} className="shrink-0 mt-0.5 text-bronze" />
            <p className="text-sm text-body leading-relaxed">
              <strong className="text-ink">Aula invertida:</strong> estrategia que el docente tutor identifica como efectiva en esta modalidad, junto con proyectos que
              involucran la tecnología.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge toneName="violet" icon={PlayCircle}>
              Videos
            </Badge>
            <Badge toneName="amber" icon={UsersRound}>
              Trabajo en equipo
            </Badge>
            <Badge toneName="emerald" icon={Gamepad2}>
              Juegos
            </Badge>
            <Badge toneName="slate" icon={Repeat}>
              Aula invertida
            </Badge>
          </div>
        </GlassCard>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold mb-4">Barreras para la asistencia y la permanencia</p>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BARRIERS.map((b) => {
            const BIcon = b.icon;
            return (
              <motion.div key={b.title} variants={fadeUp} className="rounded-3xl border border-wine-line bg-wine-soft p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-wine-line text-wine">
                  <BIcon size={18} />
                </span>
                <p className="mt-3 font-semibold text-ink">{b.title}</p>
                <p className="mt-1 text-sm text-body leading-relaxed">{b.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <GlassCard hover={false} className="bg-ivory">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <span className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-plum text-white">
            <Lightbulb size={22} />
          </span>
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">Necesidad identificada</p>
            <p className="mt-1 font-serif text-xl sm:text-2xl text-ink leading-snug">Refuerzo en lectoescritura y en el uso de la computadora.</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function TicPanel() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-bronze font-semibold">Inventario institucional</p>
          <Badge toneName="slate">Fuente: entrevista al coordinador</Badge>
        </div>
        <DataTable
          columns={INVENTORY_COLUMNS}
          rows={INVENTORY}
          rowKey="id"
          minWidth={760}
          renderCard={(r) => {
            const RIcon = r.icon;
            return (
              <div className="rounded-2xl border border-line bg-white shadow-paper p-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex items-center gap-2.5 font-semibold text-ink text-sm">
                    <RIcon size={17} className="shrink-0 text-plum" /> {r.resource}
                  </span>
                  <Badge toneName={r.toneName}>{r.status}</Badge>
                </div>
                <p className="mt-2 text-sm font-medium text-ink">{r.amount}</p>
                <p className="mt-1 text-sm text-muted leading-relaxed">{r.note}</p>
              </div>
            );
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false}>
          <CardTitle icon={Monitor} title="Dispositivo en casa" subtitle="El que más utilizan para sus trabajos en la semana" />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <DonutChart data={DEVICE} centerValue="27.3%" centerLabel="depende del smartphone" size={180} thickness={24} />
            <ChartLegend data={DEVICE.map((d) => ({ ...d, percent: d.value, value: Math.round((d.value / 100) * 11) }))} />
          </div>
        </GlassCard>

        <GlassCard hover={false} className="space-y-6">
          <CardTitle icon={Wifi} title="Conexión a Internet en casa" subtitle="Acceso desde el hogar" toneName="indigo" />
          <div>
            <div className="flex h-10 w-full rounded-2xl overflow-hidden border border-line">
              {CONNECTIVITY.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full flex items-center justify-center text-[11px] font-bold text-white"
                  style={{ background: c.color }}
                  title={`${c.label}: ${c.value}%`}
                >
                  {c.value >= 15 ? `${c.value}%` : ''}
                </motion.div>
              ))}
            </div>
            <ul className="mt-4 space-y-2">
              {CONNECTIVITY.map((c) => (
                <li key={c.label} className="flex items-center gap-3 text-sm">
                  <span className="h-3 w-3 shrink-0 rounded-[4px]" style={{ background: c.color }} />
                  <span className="flex-1 text-body">{c.label}</span>
                  <span className="tabular-nums font-semibold text-ink">{c.value}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-line bg-ivory p-4">
              <Smartphone size={18} className="text-bronze" />
              <p className="mt-2 font-serif text-3xl font-semibold text-ink leading-none">27.3%</p>
              <p className="mt-1 text-xs text-muted">usa principalmente el smartphone</p>
            </div>
            <div className="rounded-2xl border border-line bg-ivory p-4">
              <Wifi size={18} className="text-wine" />
              <p className="mt-2 font-serif text-3xl font-semibold text-ink leading-none">27.3%</p>
              <p className="mt-1 text-xs text-muted">señal inestable o sin acceso</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <EditorialQuote author="Lectura del contexto tecnológico">
        La institución cuenta con equipo y red; la brecha se concentra en el hogar y en las competencias de uso de la computadora.
      </EditorialQuote>
    </div>
  );
}

const PANELS = { institucion: InstitutionPanel, grupo: GroupPanel, tic: TicPanel };

/* ---------------------------------------------------------------------
   Vista principal
   --------------------------------------------------------------------- */

export default function Contexto_educativo() {
  const [active, setActive] = useState('institucion');
  const Panel = PANELS[active];
  const activeIndex = TABS.findIndex((t) => t.id === active);
  const next = TABS[(activeIndex + 1) % TABS.length];

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Contexto"
        icon={MapPin}
        title="Contexto"
        highlight="educativo"
        description="Panorama de la institución, del grupo de Primer Año de Bachillerato de Ciencias Naturales y de los recursos tecnológicos disponibles, según el diagnóstico que realicé."
      />

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {KPIS.map((k) => (
          <motion.div key={k.label} variants={fadeUp}>
            <StatCard {...k} className="h-full" />
          </motion.div>
        ))}
      </motion.div>

      <section className="space-y-6">
        <TabBar tabs={TABS} active={active} onChange={setActive} layoutId="contexto-tabs" />
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <Panel />
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setActive(next.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group min-h-[44px] inline-flex items-center gap-2 rounded-2xl border border-lilac-line bg-white px-4 text-sm font-semibold text-plum hover:bg-lilac transition-colors"
          >
            Siguiente: {next.label} <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>
    </PageShell>
  );
}
