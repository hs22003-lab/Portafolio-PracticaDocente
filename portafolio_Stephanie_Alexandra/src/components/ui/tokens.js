/* =====================================================================
   TOKENS DEL SISTEMA DE DISEÑO
   "ACADEMIC EDITORIAL IVORY, SILK LAVENDER & MATTE PLUM"
   (archivo sin componentes para cumplir con react-refresh)
   ===================================================================== */

/** Une clases condicionales sin dependencias externas. */
export const cx = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Paleta semántica mate (cadenas completas para que Tailwind las detecte).
 * text: texto/ícono · strong: cifra destacada · bg/border: superficie suave
 * fill: relleno sólido (barras, puntos) · hex: color para SVG y estilos en línea
 */
export const TONES = {
  violet: {
    text: 'text-plum',
    strong: 'text-plum-deep',
    bg: 'bg-lilac',
    border: 'border-lilac-line',
    dot: 'bg-plum',
    fill: 'bg-plum',
    hex: '#4A2574',
  },
  amber: {
    text: 'text-bronze',
    strong: 'text-bronze-dark',
    bg: 'bg-sand',
    border: 'border-sand-line',
    dot: 'bg-bronze',
    fill: 'bg-bronze',
    hex: '#8C6D3F',
  },
  rose: {
    text: 'text-wine',
    strong: 'text-wine',
    bg: 'bg-wine-soft',
    border: 'border-wine-line',
    dot: 'bg-wine',
    fill: 'bg-wine',
    hex: '#8A3557',
  },
  emerald: {
    text: 'text-sage',
    strong: 'text-sage',
    bg: 'bg-sage-soft',
    border: 'border-sage-line',
    dot: 'bg-sage',
    fill: 'bg-sage',
    hex: '#2F6B50',
  },
  indigo: {
    text: 'text-slate-ink',
    strong: 'text-slate-ink',
    bg: 'bg-slate-soft',
    border: 'border-slate-line',
    dot: 'bg-slate-ink',
    fill: 'bg-slate-ink',
    hex: '#3F4C8A',
  },
  slate: {
    text: 'text-muted',
    strong: 'text-body',
    bg: 'bg-silk',
    border: 'border-line',
    dot: 'bg-muted',
    fill: 'bg-muted',
    hex: '#6E5A85',
  },
};

/** Serie mate para gráficos SVG (contraste suficiente sobre blanco). */
export const CHART_COLORS = ['#4A2574', '#B08A4F', '#9B7BC4', '#5E8C76', '#B5657F', '#5A6BA8', '#C9B48A', '#8E8299'];

export const tone = (name) => TONES[name] || TONES.violet;

/* Animaciones reutilizables (variants de Framer Motion) */
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

/** Clases base de tarjeta editorial (para elementos propios). */
export const CARD = 'bg-white border border-line rounded-3xl shadow-paper';
export const CARD_HOVER = 'hover:shadow-paper-lg hover:border-line-strong transition-all duration-300';

/** Panel interno (dentro de una tarjeta blanca). */
export const INSET = 'bg-ivory border border-line';

/** Chip/filtro: activo e inactivo. */
export const CHIP_ACTIVE = 'border-plum bg-plum text-white shadow-sm';
export const CHIP_IDLE = 'border-lilac-line bg-white text-body hover:border-line-strong hover:text-plum';

/** Normaliza texto para buscadores (sin tildes, minúsculas). */
export const normalize = (str = '') =>
  String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
