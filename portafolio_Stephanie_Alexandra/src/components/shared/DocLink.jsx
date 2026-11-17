import { ExternalLink, FileText, FileX, LoaderCircle } from 'lucide-react';
import { cx } from '../ui/tokens';
import { formatBytes, useAsset } from './assets';

/* =====================================================================
   Botón-enlace a documentos de /public/docs con verificación de disponibilidad.
   - Disponible: abre el PDF en una pestaña nueva (muestra el peso si se conoce).
   - Verificando: estado neutro.
   - No disponible: estado deshabilitado (sin enlaces rotos).
   ===================================================================== */

const VARIANTS = {
  primary: 'bg-plum hover:bg-plum-dark text-white border border-plum shadow-sm',
  deep: 'bg-plum-deep hover:bg-abyss text-on-plum border border-plum-deep',
  secondary: 'bg-lilac hover:bg-silk-deep text-plum border border-lilac-line',
  bronze: 'bg-sand hover:bg-[#F0E6D2] text-bronze-dark border border-sand-line',
  light: 'bg-white hover:bg-lilac text-plum border border-lilac-line',
  onDark: 'bg-white/10 hover:bg-white/20 text-on-plum border border-white/25',
};

const SIZES = {
  sm: 'min-h-[38px] px-3.5 text-xs gap-1.5 rounded-xl',
  md: 'min-h-[46px] px-5 text-sm gap-2 rounded-2xl',
};

export default function DocLink({
  src,
  label = 'Abrir PDF',
  variant = 'primary',
  size = 'md',
  icon: Icon = FileText,
  showSize = true,
  block = false,
  missingLabel = 'No disponible',
  className = '',
}) {
  const asset = useAsset(src);
  const base = cx('inline-flex items-center justify-center font-semibold transition-colors', SIZES[size] || SIZES.md, block && 'w-full', className);
  const iconSize = size === 'sm' ? 14 : 16;

  if (asset.state === 'ok') {
    return (
      <a href={asset.url} target="_blank" rel="noopener noreferrer" className={cx(base, VARIANTS[variant] || VARIANTS.primary)}>
        <Icon size={iconSize} className="shrink-0" />
        <span className="truncate">{label}</span>
        {showSize && asset.size ? (
          <span className={cx('shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums', variant === 'primary' || variant === 'deep' || variant === 'onDark' ? 'bg-white/15' : 'bg-white/70')}>
            {formatBytes(asset.size)}
          </span>
        ) : null}
        <ExternalLink size={iconSize - 2} className="shrink-0 opacity-70" />
      </a>
    );
  }

  if (asset.state === 'checking') {
    return (
      <span aria-busy="true" className={cx(base, 'border border-line bg-ivory text-muted cursor-wait')}>
        <LoaderCircle size={iconSize} className="shrink-0 animate-spin" />
        <span className="truncate">Verificando…</span>
      </span>
    );
  }

  return (
    <span
      aria-disabled="true"
      title="El archivo no se encuentra publicado en /docs"
      className={cx(base, 'border border-dashed', variant === 'onDark' ? 'border-white/25 text-on-plum-muted' : 'border-line-strong bg-ivory text-muted', 'cursor-not-allowed')}
    >
      <FileX size={iconSize} className="shrink-0" />
      <span className="truncate">{missingLabel}</span>
    </span>
  );
}

/** Enlace externo con el mismo lenguaje visual (p. ej. Canva). */
export function ExternalButton({ href, label, icon: Icon = ExternalLink, variant = 'primary', size = 'md', block = false, className = '' }) {
  const iconSize = size === 'sm' ? 14 : 16;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        'inline-flex items-center justify-center font-semibold transition-colors',
        SIZES[size] || SIZES.md,
        VARIANTS[variant] || VARIANTS.primary,
        block && 'w-full',
        className
      )}
    >
      <Icon size={iconSize} className="shrink-0" />
      <span className="truncate">{label}</span>
      <ExternalLink size={iconSize - 2} className="shrink-0 opacity-70" />
    </a>
  );
}
