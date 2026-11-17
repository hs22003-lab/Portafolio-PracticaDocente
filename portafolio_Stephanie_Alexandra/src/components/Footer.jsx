import { motion } from 'framer-motion';
import { GraduationCap, MapPin, BookOpen, ArrowUp, Landmark, School, CalendarDays } from 'lucide-react';

/** Pie de página institucional (bloque ciruela mate de alto contraste). */
const Footer = ({ sections, onNavigate }) => {
  return (
    <footer className="relative z-10 bg-abyss text-on-plum">
      <div className="h-1 w-full bg-bronze" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Identidad */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E5D5B5]/60 bg-plum-deep">
                <span className="font-serif text-xl font-semibold text-on-plum">SH</span>
              </span>
              <div className="min-w-0">
                <p className="font-serif text-xl sm:text-2xl font-semibold text-on-plum leading-tight">Stephanie Alexandra Hernández Sibrián</p>
                <p className="text-xs uppercase tracking-[0.22em] text-[#E5D5B5] mt-1">Carné HS22003 · Informática Educativa</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-on-plum-muted max-w-md">
              Portafolio Digital de Práctica Docente: documentación, análisis y reflexión de las experiencias pedagógicas y tecnológicas desarrolladas en la
              modalidad flexible de bachillerato.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5D5B5]/50 px-3 py-1.5 text-xs text-[#F7F1E5]">
                <CalendarDays size={13} /> Ciclo II - 2026
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-on-plum-muted/40 px-3 py-1.5 text-xs text-on-plum">
                <BookOpen size={13} /> DDP1109 · GT-01
              </span>
            </div>
          </div>

          {/* Navegación rápida */}
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#E5D5B5] font-semibold mb-4">Navegación</p>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(s.id)}
                    className="min-h-[40px] inline-flex items-center gap-2 text-sm text-on-plum-muted hover:text-white transition-colors"
                  >
                    <s.icon size={14} className="text-[#E5D5B5]" />
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#E5D5B5] font-semibold">Créditos institucionales</p>
            {[
              {
                icon: Landmark,
                text: 'Universidad de El Salvador · Facultad de Ciencias Naturales y Matemática · Escuela de Matemática · Licenciatura en Informática Educativa',
              },
              { icon: GraduationCap, text: 'Coordinador y docente tutor UES: Ing. Misael Enrique Juárez Blanco' },
              { icon: School, text: 'Instituto Nacional Dr. Francisco Martínez Suárez · Tutor: Lcdo. Amilcar Heriberto Sánchez' },
              { icon: MapPin, text: 'Chalatenango, El Salvador' },
            ].map((item) => (
              <div key={item.text} className="flex gap-3">
                <item.icon size={18} className="text-[#E5D5B5] shrink-0 mt-0.5" />
                <p className="text-sm text-on-plum-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-on-plum-muted text-center sm:text-left">
            © 2026 Stephanie Alexandra Hernández Sibrián · Universidad de El Salvador · Ciclo II-2026
          </p>
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full border border-white/25 text-xs font-semibold text-on-plum hover:bg-white hover:text-plum-deep transition-colors"
          >
            <ArrowUp size={14} /> Volver arriba
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
