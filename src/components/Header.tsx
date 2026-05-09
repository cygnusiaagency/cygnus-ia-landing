import ConstellationMark from './ConstellationMark';

interface Props {
  scrolled: boolean;
}

export default function Header({ scrolled }: Props) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] px-5 sm:px-10 py-[22px] flex justify-between items-center bg-cream/85 backdrop-blur-xl transition-[border-color] duration-300 ${
        scrolled ? 'border-b border-line-soft' : 'border-b border-transparent'
      }`}
    >
      <a href="#" className="flex items-center gap-2.5 no-underline">
        <ConstellationMark size={28} variant="ink" />
        <span className="font-display text-[22px] font-semibold tracking-[-0.02em] text-ink font-fraunces-soft-mid">
          Cygnus IA
        </span>
      </a>

      <nav className="flex items-center gap-4 sm:gap-9">
        <a
          href="#problema"
          className="hidden sm:inline text-[14px] font-medium text-ink no-underline tracking-[-0.01em] hover:opacity-60 transition-opacity duration-200"
        >
          Problema
        </a>
        <a
          href="#servicios"
          className="hidden sm:inline text-[14px] font-medium text-ink no-underline tracking-[-0.01em] hover:opacity-60 transition-opacity duration-200"
        >
          Servicios
        </a>
        <a
          href="#proceso"
          className="hidden sm:inline text-[14px] font-medium text-ink no-underline tracking-[-0.01em] hover:opacity-60 transition-opacity duration-200"
        >
          Proceso
        </a>
        <a
          href="#faq"
          className="hidden sm:inline text-[14px] font-medium text-ink no-underline tracking-[-0.01em] hover:opacity-60 transition-opacity duration-200"
        >
          FAQ
        </a>
        <a
          href="#cta-final"
          className="bg-ink text-cream px-[18px] py-2.5 rounded-full text-[13px] font-semibold no-underline hover:bg-accent hover:opacity-100 transition-all duration-200"
        >
          Probar 14 días
        </a>
      </nav>
    </header>
  );
}
