import { useState, useEffect } from 'react';
import ConstellationMark from './ConstellationMark';

export default function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-10 py-3 sm:py-4 bg-cream-deep/85 backdrop-blur-xl border-b border-line-soft">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5">
            <ConstellationMark size={24} variant="ink" />
            <span className="text-ink text-[18px] tracking-[-0.02em] font-semibold">
              Cygnus IA
            </span>
          </a>

          {/* Nav */}
          <nav className="flex items-center gap-4 sm:gap-8">
            <a
              href="#problema"
              className="hidden sm:inline text-[14px] font-medium text-warm hover:text-ink transition-colors tracking-[-0.01em]"
            >
              Problema
            </a>
            <a
              href="#solucion"
              className="hidden sm:inline text-[14px] font-medium text-warm hover:text-ink transition-colors tracking-[-0.01em]"
            >
              Solución
            </a>
            <a
              href="#proceso"
              className="hidden sm:inline text-[14px] font-medium text-warm hover:text-ink transition-colors tracking-[-0.01em]"
            >
              Proceso
            </a>
            <a
              href="#faq"
              className="hidden sm:inline text-[14px] font-medium text-warm hover:text-ink transition-colors tracking-[-0.01em]"
            >
              FAQ
            </a>
            <a
              href="#cta-final"
              className="bg-accent text-cream-deep px-4 sm:px-[18px] py-2.5 rounded-full text-[13px] font-semibold hover:bg-accent-deep transition-colors duration-200"
            >
              Probar 14 días
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
