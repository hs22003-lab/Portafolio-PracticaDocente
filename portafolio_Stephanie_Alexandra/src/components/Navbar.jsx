import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Printer, GraduationCap, ChevronRight } from 'lucide-react';
import { cx } from './ui/tokens';

/**
 * Barra de navegación principal.
 * - Escritorio (lg+): píldora flotante con grupos y botón de impresión/PDF.
 * - Móvil/Tablet: menú desplegable a pantalla completa con acceso directo a cada sub-sección.
 */
const Navbar = ({ sections, activeTab, activeSub, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMobileMenuOpen]);

  const go = (tabId, subId) => {
    onNavigate(tabId, subId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Barra de progreso de lectura */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[70] bg-plum"
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cx(
          'fixed top-0 inset-x-0 z-[60] flex justify-center transition-all duration-500',
          scrolled ? 'pt-2 sm:pt-3 px-2 sm:px-4' : 'pt-3 sm:pt-5 px-3 sm:px-6'
        )}
        aria-label="Navegación principal"
      >
        <div
          className={cx(
            'relative w-full flex items-center justify-between gap-3 transition-all duration-500',
            scrolled
              ? 'max-w-6xl rounded-full bg-white/95 backdrop-blur-md border border-line shadow-paper-lg pl-3 pr-2 sm:pl-5 sm:pr-3 py-2'
              : 'max-w-7xl rounded-full bg-white/90 backdrop-blur-md border border-line shadow-paper pl-3 pr-2 sm:pl-5 sm:pr-3 py-2.5'
          )}
        >
          {/* Logotipo / Monograma */}
          <button
            type="button"
            onClick={() => go('inicio')}
            className="group flex items-center gap-2.5 sm:gap-3 min-h-[44px] min-w-0"
            aria-label="Ir al inicio"
          >
            <span className="relative inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-plum-deep border border-plum">
              <span className="font-serif text-base sm:text-lg font-semibold text-on-plum tracking-tight">SH</span>
            </span>
            <span className="hidden sm:flex flex-col items-start leading-none min-w-0">
              <span className="font-serif text-lg font-semibold text-ink tracking-wide">
                Portafolio <span className="italic text-plum">Docente</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-muted mt-1 truncate">
                Práctica Docente · DDP1109
              </span>
            </span>
          </button>

          {/* Enlaces de escritorio */}
          <ul className="hidden lg:flex items-center gap-1 rounded-full bg-silk border border-line p-1">
            {sections.map((section) => {
              const isActive = activeTab === section.id;
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => go(section.id)}
                    className={cx(
                      'relative flex items-center gap-2 px-3.5 xl:px-4 min-h-[40px] rounded-full text-[13px] xl:text-sm font-medium transition-colors duration-300',
                      isActive ? 'text-white' : 'text-body hover:text-plum'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-plum shadow-sm"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon size={15} />
                      {section.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="hidden lg:inline-flex items-center gap-2 min-h-[40px] px-4 xl:px-5 rounded-full text-sm font-semibold text-on-plum bg-plum-deep hover:bg-abyss shadow-sm transition-colors"
            >
              <Printer size={15} />
              Imprimir / PDF
            </button>

            {/* Botón hamburguesa */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-lilac-line bg-lilac text-plum hover:bg-silk-deep transition-colors"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Menú móvil a pantalla completa */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[55] lg:hidden"
          >
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-abyss/50 cursor-default"
            />
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-2 sm:mx-4 mt-[76px] sm:mt-[88px] max-h-[calc(100dvh-96px)] overflow-y-auto rounded-3xl border border-line bg-ivory shadow-paper-lg p-3 sm:p-5"
            >
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {sections.map((section, i) => {
                  const isActive = activeTab === section.id;
                  const Icon = section.icon;
                  return (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i + 0.05 }}
                      className={cx(
                        'rounded-2xl border p-2',
                        isActive ? 'border-line-strong bg-lilac' : 'border-line bg-white'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => go(section.id)}
                        className="w-full flex items-center gap-3 min-h-[48px] px-3 rounded-xl text-left"
                      >
                        <span
                          className={cx(
                            'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border',
                            isActive ? 'bg-plum border-plum text-white' : 'bg-lilac border-lilac-line text-plum'
                          )}
                        >
                          <Icon size={17} />
                        </span>
                        <span className="flex-1">
                          <span className={cx('block text-[15px] font-semibold', isActive ? 'text-plum' : 'text-ink')}>{section.label}</span>
                          <span className="block text-[11px] text-muted">{section.description}</span>
                        </span>
                        <ChevronRight size={16} className="text-muted" />
                      </button>
                      {section.subs && section.subs.length > 1 && (
                        <div className="flex flex-wrap gap-1.5 px-2 pb-1.5 pt-1">
                          {section.subs.map((sub) => {
                            const subActive = isActive && activeSub === sub.id;
                            return (
                              <button
                                key={sub.id}
                                type="button"
                                onClick={() => go(section.id, sub.id)}
                                className={cx(
                                  'min-h-[36px] px-3 rounded-full text-xs font-medium border transition-colors',
                                  subActive
                                    ? 'bg-plum border-plum text-white'
                                    : 'bg-white border-lilac-line text-body hover:text-plum hover:border-line-strong'
                                )}
                              >
                                {sub.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="relative mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.print();
                  }}
                  className="flex-1 inline-flex justify-center items-center gap-2 min-h-[50px] rounded-2xl text-sm font-bold text-on-plum bg-plum-deep hover:bg-abyss transition-colors"
                >
                  <Printer size={17} />
                  Imprimir / Guardar PDF
                </button>
                <div className="flex-1 flex items-center gap-3 min-h-[50px] px-4 rounded-2xl border border-line bg-white">
                  <GraduationCap size={18} className="text-bronze shrink-0" />
                  <span className="text-[11px] leading-tight text-body">
                    Stephanie A. Hernández Sibrián · UES · Ciclo II-2026
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;