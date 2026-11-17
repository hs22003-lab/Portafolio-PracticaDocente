import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, X } from 'lucide-react';
import { cx, tone, fadeUp, CHART_COLORS } from './tokens';

/* =====================================================================
   SISTEMA DE DISEÑO "ACADEMIC EDITORIAL IVORY, SILK LAVENDER & MATTE PLUM"
   Primitivas compartidas por todas las vistas del portafolio.
   (Los tokens y helpers no-componente viven en ./tokens.js)
   ===================================================================== */

/* ---------------------------------------------------------------------
   Contenedores y superficies
   --------------------------------------------------------------------- */

/** Tarjeta editorial blanca con sombra de papelería fina. */
export function GlassCard({ children, className = '', hover = true, padded = true, as = 'div', ...rest }) {
  const Comp = as;
  return (
    <Comp
      className={cx(
        'relative rounded-3xl bg-white border border-line shadow-paper',
        hover && 'hover:shadow-paper-lg hover:border-line-strong transition-all duration-300',
        padded && 'p-5 sm:p-6 md:p-8',
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Alias semántico de la tarjeta editorial. */
export const PaperCard = GlassCard;

/** Contenedor de página con espaciado fluido. */
export function PageShell({ children, className = '' }) {
  return (
    <div className={cx('w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 md:space-y-20', className)}>
      {children}
    </div>
  );
}

/** Encabezado editorial de sección. */
export function SectionHeader({ eyebrow, title, highlight, description, icon: Icon, align = 'left', className = '' }) {
  const centered = align === 'center';
  return (
    <motion.header
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      className={cx('space-y-4', centered && 'text-center mx-auto max-w-3xl', className)}
    >
      {eyebrow && (
        <div className={cx('flex items-center gap-3', centered && 'justify-center')}>
          {Icon && (
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sand border border-sand-line text-bronze">
              <Icon size={18} />
            </span>
          )}
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.26em] text-bronze">{eyebrow}</span>
          <span className="hidden sm:block h-px w-16 bg-sand-line" />
        </div>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-ink">
        {title} {highlight && <span className="italic text-plum">{highlight}</span>}
      </h2>
      {description && (
        <p className={cx('text-sm sm:text-base md:text-lg leading-relaxed text-body max-w-3xl', centered && 'mx-auto')}>{description}</p>
      )}
    </motion.header>
  );
}

/** Título pequeño dentro de tarjetas. */
export function CardTitle({ icon: Icon, title, subtitle, toneName = 'violet', right = null }) {
  const t = tone(toneName);
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3 min-w-0">
        {Icon && (
          <span className={cx('shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl border', t.bg, t.border, t.text)}>
            <Icon size={19} />
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-ink leading-snug">{title}</h3>
          {subtitle && <p className="text-xs sm:text-sm text-muted mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}

/** Insignia semántica. */
export function Badge({ children, toneName = 'violet', icon: Icon, className = '' }) {
  const t = tone(toneName);
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] sm:text-xs font-semibold tracking-wide whitespace-nowrap',
        t.bg,
        t.border,
        t.text,
        className
      )}
    >
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}

/** Separador editorial con ornamento bronce. */
export function Divider({ className = '' }) {
  return (
    <div className={cx('flex items-center gap-4', className)} aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      <span className="h-1.5 w-1.5 rotate-45 bg-bronze" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

/** Banda de alto contraste en ciruela mate. */
export function PlumBand({ children, className = '' }) {
  return <div className={cx('relative rounded-[2rem] bg-abyss text-on-plum p-6 sm:p-10 md:p-12 overflow-hidden', className)}>{children}</div>;
}

/* ---------------------------------------------------------------------
   Navegación interna
   --------------------------------------------------------------------- */

/**
 * Barra de pestañas táctil: scroll horizontal con snap en móvil.
 * tabs: [{ id, label, shortLabel?, icon?, count? }]
 */
export function TabBar({ tabs, active, onChange, layoutId, className = '', size = 'md' }) {
  const autoId = useId();
  const pillId = layoutId || `tab-pill-${autoId}`;
  const pad = size === 'sm' ? 'px-3.5 py-2 text-xs sm:text-sm' : 'px-4 sm:px-5 py-2.5 text-sm';
  return (
    <div className={cx('relative', className)}>
      <div role="tablist" className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-2 pb-2 rounded-2xl">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={cx(
                'relative snap-start shrink-0 min-h-[44px] inline-flex items-center gap-2 rounded-2xl font-medium transition-colors duration-300 border',
                pad,
                isActive ? 'text-white border-plum' : 'text-body border-lilac-line bg-white hover:border-line-strong hover:text-plum'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={pillId}
                  className="absolute inset-0 rounded-2xl bg-plum shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
                {Icon && <Icon size={16} />}
                <span className={tab.shortLabel ? 'hidden sm:inline' : ''}>{tab.label}</span>
                {tab.shortLabel && <span className="sm:hidden">{tab.shortLabel}</span>}
                {typeof tab.count === 'number' && (
                  <span
                    className={cx(
                      'ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums',
                      isActive ? 'bg-white/20 text-white' : 'bg-lilac text-plum'
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Campo de búsqueda estilizado. */
export function SearchInput({ value, onChange, placeholder = 'Buscar...', className = '' }) {
  return (
    <label className={cx('relative flex items-center w-full', className)}>
      <Search size={17} className="absolute left-4 text-muted pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[46px] rounded-2xl bg-white border border-lilac-line pl-11 pr-10 text-sm text-ink placeholder:text-muted/80 outline-none focus:border-plum focus:ring-2 focus:ring-lilac transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
          className="absolute right-2 inline-flex h-8 w-8 items-center justify-center rounded-xl text-muted hover:text-plum hover:bg-lilac"
        >
          <X size={15} />
        </button>
      )}
    </label>
  );
}

/** Grupo de chips de filtro. options: [{ id, label, icon?, count? }] */
export function FilterChips({ options, value, onChange, className = '' }) {
  return (
    <div className={cx('flex flex-wrap gap-2', className)}>
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            aria-pressed={active}
            className={cx(
              'min-h-[40px] inline-flex items-center gap-2 rounded-full border px-4 text-xs sm:text-sm font-medium transition-colors',
              active ? 'border-plum bg-plum text-white shadow-sm' : 'border-lilac-line bg-white text-body hover:border-line-strong hover:text-plum'
            )}
          >
            {Icon && <Icon size={14} />}
            {opt.label}
            {typeof opt.count === 'number' && (
              <span className={cx('rounded-full px-1.5 text-[10px] font-bold tabular-nums', active ? 'bg-white/20 text-white' : 'bg-lilac text-plum')}>
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Conmutador segmentado compacto. options: [{ id, label, icon? }] */
export function SegmentedControl({ options, value, onChange, className = '', ariaLabel }) {
  return (
    <div className={cx('inline-flex rounded-2xl border border-lilac-line bg-silk p-1', className)} role="radiogroup" aria-label={ariaLabel}>
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.id)}
            className={cx(
              'min-h-[38px] inline-flex items-center gap-1.5 rounded-xl px-3.5 text-xs sm:text-sm font-medium transition-colors',
              active ? 'bg-white text-plum shadow-sm border border-line' : 'text-muted hover:text-plum border border-transparent'
            )}
          >
            {Icon && <Icon size={15} />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/** Botón primario / secundario mate. */
export function Button({ children, variant = 'primary', icon: Icon, iconRight: IconRight, className = '', ...rest }) {
  const styles = {
    primary: 'bg-plum hover:bg-plum-dark text-white shadow-sm border border-plum',
    deep: 'bg-plum-deep hover:bg-abyss text-on-plum border border-plum-deep',
    secondary: 'bg-lilac hover:bg-silk-deep text-plum border border-lilac-line',
    bronze: 'bg-sand hover:bg-[#F0E6D2] text-bronze-dark border border-sand-line',
    ghost: 'bg-transparent hover:bg-lilac text-plum border border-transparent',
    light: 'bg-white hover:bg-lilac text-plum-deep border border-white',
  };
  return (
    <button
      type="button"
      className={cx(
        'group min-h-[46px] inline-flex items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition-colors',
        styles[variant] || styles.primary,
        className
      )}
      {...rest}
    >
      {Icon && <Icon size={17} />}
      {children}
      {IconRight && <IconRight size={17} className="transition-transform group-hover:translate-x-0.5" />}
    </button>
  );
}

/* ---------------------------------------------------------------------
   Acordeón
   --------------------------------------------------------------------- */
export function AccordionItem({ title, subtitle, icon: Icon, toneName = 'violet', defaultOpen = false, right = null, children, className = '' }) {
  const [open, setOpen] = useState(defaultOpen);
  const t = tone(toneName);
  return (
    <div
      className={cx(
        'rounded-2xl border bg-white transition-all duration-300 overflow-hidden',
        open ? 'border-line-strong shadow-paper-lg' : 'border-line shadow-paper hover:border-line-strong',
        className
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full min-h-[56px] flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 text-left"
      >
        {Icon && (
          <span className={cx('shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl border', t.bg, t.border, t.text)}>
            <Icon size={17} />
          </span>
        )}
        <span className="flex-1 min-w-0">
          <span className="block text-sm sm:text-base font-semibold text-ink leading-snug">{title}</span>
          {subtitle && <span className="block text-xs sm:text-sm text-muted mt-0.5">{subtitle}</span>}
        </span>
        {right}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 text-plum">
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
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-1 text-sm sm:text-[15px] leading-relaxed text-body">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Modal (portal)
   --------------------------------------------------------------------- */
export function Modal({ open, onClose, title, subtitle, icon: Icon, children, size = 'lg' }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const widths = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl', full: 'max-w-[96vw]' };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button type="button" aria-label="Cerrar" onClick={onClose} className="absolute inset-0 bg-abyss/55 cursor-default" />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cx(
              'relative w-full max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-white border border-line shadow-paper-lg overflow-hidden',
              widths[size] || widths.lg
            )}
          >
            <div className="flex items-start gap-3 px-5 sm:px-7 py-4 sm:py-5 border-b border-line bg-ivory">
              {Icon && (
                <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum">
                  <Icon size={19} />
                </span>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink leading-tight">{title}</h3>
                {subtitle && <p className="text-xs sm:text-sm text-muted mt-1">{subtitle}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar ventana"
                className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-white text-body hover:text-plum hover:border-line-strong transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5 sm:py-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ---------------------------------------------------------------------
   Métricas, progreso y skeletons
   --------------------------------------------------------------------- */
export function StatCard({ icon: Icon, label, value, hint, toneName = 'violet', className = '' }) {
  const t = tone(toneName);
  return (
    <GlassCard className={cx('overflow-hidden', className)} padded={false}>
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="min-w-0 text-[11px] sm:text-xs uppercase tracking-[0.16em] text-muted font-semibold">{label}</span>
          {Icon && (
            <span className={cx('shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl border', t.bg, t.border, t.text)}>
              <Icon size={17} />
            </span>
          )}
        </div>
        <div className={cx('mt-3 font-serif text-3xl sm:text-4xl font-semibold leading-none', t.strong)}>{value}</div>
        {hint && <p className="mt-2 text-xs sm:text-sm text-muted leading-snug">{hint}</p>}
      </div>
      <div className={cx('h-[3px] w-full', t.fill)} />
    </GlassCard>
  );
}

export function ProgressBar({ value, max = 100, toneName = 'violet', label, showValue = true, suffix = '%', height = 'h-2.5', delay = 0 }) {
  const t = tone(toneName);
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-baseline justify-between gap-3 mb-1.5">
          {label && <span className="text-xs sm:text-sm text-body leading-snug">{label}</span>}
          {showValue && (
            <span className={cx('text-xs sm:text-sm font-semibold tabular-nums', t.text)}>
              {value}
              {suffix}
            </span>
          )}
        </div>
      )}
      <div className={cx('w-full rounded-full bg-silk overflow-hidden', height)}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          className={cx('h-full rounded-full', t.fill)}
        />
      </div>
    </div>
  );
}

export function Skeleton({ className = '' }) {
  return <div className={cx('rounded-xl skeleton-shimmer', className)} />;
}

/** Tarjeta de reserva editorial para contenido pendiente (sin efecto skeleton). */
export function SkeletonCard({ title = 'Próximamente', subtitle = 'Espacio reservado para documentar', icon: Icon, className = '' }) {
  return (
    <div className={cx('relative rounded-3xl border border-dashed border-line-strong bg-ivory p-5 sm:p-6', className)}>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-lilac-line bg-lilac text-plum">
          {Icon ? <Icon size={18} /> : <span className="h-2 w-2 rounded-full bg-bronze" />}
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">{title}</p>
          <p className="text-xs text-muted">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

/** Tooltip accesible (hover/focus). */
export function Tooltip({ content, children, side = 'top', className = '' }) {
  const [show, setShow] = useState(false);
  const pos = side === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2';
  return (
    <span
      className={cx('relative inline-flex', className)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, y: side === 'bottom' ? -4 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={cx(
              'pointer-events-none absolute left-1/2 -translate-x-1/2 z-50 w-max max-w-[240px] rounded-xl bg-abyss px-3 py-2 text-xs leading-snug text-on-plum shadow-paper-lg',
              pos
            )}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/** Estado vacío para búsquedas sin resultados. */
export function EmptyState({ icon: Icon = Search, title = 'Sin resultados', description = 'Intenta con otro término o filtro.' }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 rounded-3xl border border-dashed border-line-strong bg-ivory">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lilac border border-lilac-line text-plum mb-4">
        <Icon size={22} />
      </span>
      <p className="text-ink font-semibold">{title}</p>
      <p className="text-sm text-muted mt-1">{description}</p>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Gráficos SVG a medida (colores sólidos, sin resplandor)
   --------------------------------------------------------------------- */

/**
 * Gráfico de dona responsivo.
 * data: [{ label, value, color? }]
 */
export function DonutChart({ data, centerValue, centerLabel, size = 200, thickness = 26, className = '' }) {
  const [hovered, setHovered] = useState(null);
  const total = data.reduce((acc, d) => acc + d.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const segments = data.reduce((acc, d, i) => {
    const prevEnd = acc.length ? acc[acc.length - 1].end : 0;
    const len = (d.value / total) * c;
    acc.push({ ...d, color: d.color || CHART_COLORS[i % CHART_COLORS.length], start: prevEnd, len, end: prevEnd + len, index: i });
    return acc;
  }, []);
  const active = hovered !== null ? segments[hovered] : null;

  return (
    <div className={cx('relative w-full max-w-[240px] mx-auto aspect-square', className)}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F2ECF9" strokeWidth={thickness} />
        {segments.map((s) =>
          s.value > 0 ? (
            <motion.circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={hovered === s.index ? thickness + 6 : thickness}
              strokeDasharray={`${Math.max(s.len - 2, 0)} ${c}`}
              strokeDashoffset={-s.start}
              strokeLinecap="butt"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: hovered === null || hovered === s.index ? 1 : 0.35 }}
              animate={{ opacity: hovered === null || hovered === s.index ? 1 : 0.35 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: s.index * 0.08 }}
              onMouseEnter={() => setHovered(s.index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setHovered((h) => (h === s.index ? null : s.index))}
              style={{ cursor: 'pointer', transition: 'stroke-width 0.25s ease' }}
            />
          ) : null
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6">
        <span className="font-serif text-3xl sm:text-4xl font-semibold text-ink leading-none">
          {active ? `${((active.value / total) * 100).toFixed(1)}%` : centerValue}
        </span>
        <span className="mt-1.5 text-[11px] sm:text-xs text-muted leading-tight line-clamp-2">{active ? active.label : centerLabel}</span>
      </div>
    </div>
  );
}

/** Leyenda de gráficos. */
export function ChartLegend({ data, total, className = '' }) {
  const sum = total ?? data.reduce((a, d) => a + d.value, 0);
  return (
    <ul className={cx('space-y-2', className)}>
      {data.map((d, i) => (
        <li key={d.label} className="flex items-center gap-3 text-xs sm:text-sm">
          <span className="h-3 w-3 shrink-0 rounded-[4px]" style={{ background: d.color || CHART_COLORS[i % CHART_COLORS.length] }} />
          <span className="flex-1 text-body leading-snug">{d.label}</span>
          <span className="tabular-nums text-ink font-semibold">{d.value}</span>
          <span className="tabular-nums text-bronze font-medium w-14 text-right">
            {d.percent !== undefined ? `${d.percent}%` : sum ? `${((d.value / sum) * 100).toFixed(1)}%` : '0%'}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Barras horizontales animadas.
 * data: [{ label, value, percent, color? }]
 */
export function HorizontalBars({ data, max, className = '' }) {
  const top = max ?? Math.max(...data.map((d) => d.percent ?? d.value), 1);
  return (
    <ul className={cx('space-y-3.5', className)}>
      {data.map((d, i) => {
        const val = d.percent ?? d.value;
        const color = d.color || CHART_COLORS[i % CHART_COLORS.length];
        return (
          <li key={d.label}>
            <div className="flex items-baseline justify-between gap-3 mb-1.5">
              <span className="text-xs sm:text-sm text-body leading-snug">{d.label}</span>
              <span className="shrink-0 text-xs sm:text-sm tabular-nums">
                <span className="text-ink font-semibold">{d.value}</span>
                {d.percent !== undefined && <span className="text-bronze ml-2">{d.percent}%</span>}
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-silk overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(val / top) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ background: color }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Barras verticales responsivas.
 * data: [{ label, value, percent, color? }]
 */
export function VerticalBars({ data, height = 220, className = '' }) {
  const [hovered, setHovered] = useState(null);
  const maxVal = Math.max(...data.map((d) => d.percent ?? d.value), 1);
  const w = 100 / data.length;
  return (
    <div className={cx('w-full', className)}>
      <div className="relative w-full" style={{ height }}>
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3].map((g) => (
            <span key={g} className="block h-px w-full bg-line" />
          ))}
        </div>
        <div className="absolute inset-0 flex items-end gap-2 sm:gap-4 px-1">
          {data.map((d, i) => {
            const val = d.percent ?? d.value;
            const color = d.color || CHART_COLORS[i % CHART_COLORS.length];
            return (
              <div
                key={d.label}
                className="relative flex-1 h-full flex flex-col justify-end items-center"
                style={{ maxWidth: `${w}%` }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className={cx('mb-1.5 text-[10px] sm:text-xs font-semibold tabular-nums transition-colors', hovered === i ? 'text-plum' : 'text-body')}>
                  {d.percent !== undefined ? `${d.percent}%` : d.value}
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${Math.max((val / maxVal) * 82, val > 0 ? 3 : 0.8)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-[64px] rounded-t-xl transition-opacity"
                  style={{ background: color, opacity: hovered === null || hovered === i ? 1 : 0.55 }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2 sm:gap-4 px-1 mt-2">
        {data.map((d) => (
          <span key={d.label} className="flex-1 text-center text-[10px] sm:text-xs text-muted leading-tight">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Cita editorial. */
export function EditorialQuote({ children, author, className = '' }) {
  return (
    <figure className={cx('relative pl-6 sm:pl-8 border-l-2 border-bronze', className)}>
      <span className="absolute -left-[9px] top-0 h-4 w-4 rotate-45 border border-bronze bg-white" />
      <blockquote className="font-serif italic text-xl sm:text-2xl md:text-3xl leading-snug text-ink">{children}</blockquote>
      {author && <figcaption className="mt-3 text-xs sm:text-sm uppercase tracking-[0.2em] text-bronze">{author}</figcaption>}
    </figure>
  );
}

/** Tabla de datos híbrida: tarjetas en móvil, tabla editorial en escritorio.
 * columns: [{ key, label, className?, render?(row) }]
 * renderCard?(row): render alternativo de la tarjeta móvil.
 */
export function DataTable({ columns, rows, rowKey = 'id', renderCard, minWidth = 720, className = '' }) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {rows.map((row) =>
          renderCard ? (
            <div key={row[rowKey]}>{renderCard(row)}</div>
          ) : (
            <div key={row[rowKey]} className="rounded-2xl border border-line bg-white shadow-paper p-4 space-y-3">
              {columns.map((col) => (
                <div key={col.key}>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">{col.label}</span>
                  <div className="text-sm text-body leading-relaxed mt-0.5">{col.render ? col.render(row) : row[col.key]}</div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-line bg-white shadow-paper">
        <table className="w-full text-sm" style={{ minWidth }}>
          <thead>
            <tr className="bg-silk text-left text-[11px] uppercase tracking-[0.16em] text-muted">
              {columns.map((col) => (
                <th key={col.key} className={cx('px-4 py-3.5 font-semibold', col.className)}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[rowKey]} className="align-top border-t border-line hover:bg-ivory transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className={cx('px-4 py-4 text-body leading-relaxed', col.className)}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
