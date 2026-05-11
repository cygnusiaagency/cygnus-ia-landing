import ConstellationMark from '../components/ConstellationMark';
import ChatBot from '../components/ChatBot';
import CustomCursor from '../components/CustomCursor';

export default function DemoInmobiliaria() {
  return (
    <div className="min-h-screen w-full bg-ink text-cream flex flex-col">
      <CustomCursor />
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-cream/10 flex-shrink-0">
        <a href="/" className="flex items-center gap-2.5">
          <ConstellationMark size={26} variant="cream" />
          <span className="font-display text-cream text-[17px] tracking-tight font-fraunces-soft-mid font-semibold">
            Cygnus IA
          </span>
        </a>
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-cream/60">
          <span className="hidden sm:inline">Demo SV.02 · </span>Cualificación 24/7
        </div>
      </header>

      {/* Demo header strip */}
      <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-cream/10 flex-shrink-0">
        <div className="max-w-[920px] mx-auto">
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-accent mb-1.5">
            Demo en vivo
          </p>
          <h1 className="font-display text-[20px] sm:text-[26px] leading-[1.15] tracking-[-0.02em] font-normal text-cream font-fraunces-soft-mid">
            Inmobiliaria del Sol — atención automática 24/7
          </h1>
          <p className="text-[13px] sm:text-[14px] text-cream/60 mt-1.5 max-w-[60ch]">
            Hacé preguntas como si fueras un cliente real. La asistente responde con el listado de la inmobiliaria,
            cualifica el lead y deriva a un asesor humano cuando hay interés serio.
          </p>
        </div>
      </div>

      {/* Chat container — bounded so it lives on a max-width column on desktop */}
      <main className="flex-1 flex flex-col items-stretch overflow-hidden">
        <div className="w-full max-w-[920px] mx-auto flex-1 flex flex-col min-h-0 sm:my-6 sm:rounded-3xl sm:overflow-hidden sm:shadow-2xl sm:border sm:border-cream/10">
          <ChatBot />
        </div>
      </main>

      {/* Bottom strip */}
      <footer className="flex-shrink-0 border-t border-cream/10 px-5 sm:px-8 py-4 text-center">
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-cream/50">
          Esta demo es de Cygnus IA. ¿Querés una así para tu inmobiliaria? →{' '}
          <a href="/inmobiliarias" className="text-accent hover:text-cream transition-colors">
            cygnusia.com/inmobiliarias
          </a>
        </p>
      </footer>
    </div>
  );
}
