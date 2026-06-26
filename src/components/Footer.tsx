import ConstellationMark from './ConstellationMark';

export default function Footer() {
  return (
    <footer className="bg-cream-deep text-warm pt-16 pb-10 px-5 sm:px-10 border-t border-line">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 mb-16">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <a href="#hero" className="flex items-center gap-2.5 mb-4">
            <ConstellationMark size={28} variant="ink" />
            <span className="text-ink text-[22px] tracking-[-0.02em] font-semibold">
              Cygnus IA
            </span>
          </a>
          <p className="max-w-[34ch] text-[14px] leading-[1.6]">
            Asistentes de IA para clínicas estéticas y medspas. Respondemos,
            cualificamos y agendamos a tus pacientes en menos de 60 segundos.
          </p>
        </div>

        {/* Producto */}
        <div>
          <h4 className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink mb-5">
            Producto
          </h4>
          <ul className="space-y-3 text-[14px]">
            <li>
              <a href="#problema" className="hover:text-ink transition-colors duration-200">
                El problema
              </a>
            </li>
            <li>
              <a href="#solucion" className="hover:text-ink transition-colors duration-200">
                La solución
              </a>
            </li>
            <li>
              <a href="#proceso" className="hover:text-ink transition-colors duration-200">
                Proceso
              </a>
            </li>
            <li>
              <a href="#oferta" className="hover:text-ink transition-colors duration-200">
                Precios
              </a>
            </li>
          </ul>
        </div>

        {/* Empresa */}
        <div>
          <h4 className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink mb-5">
            Empresa
          </h4>
          <ul className="space-y-3 text-[14px]">
            <li>
              <a href="#faq" className="hover:text-ink transition-colors duration-200">
                FAQ
              </a>
            </li>
            <li>
              <a href="mailto:hola@cygnusia.com" className="hover:text-ink transition-colors duration-200">
                hola@cygnusia.com
              </a>
            </li>
            <li>
              <a href="#cta-final" className="hover:text-ink transition-colors duration-200">
                Probar 14 días
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="max-w-[1280px] mx-auto pt-6 border-t border-line-soft flex flex-wrap justify-between gap-4 font-mono text-[11px] tracking-[0.06em] text-warm-soft">
        <span>© 2026 Cygnus IA · Automatización con IA</span>
        <span>Constelación del cisne</span>
      </div>
    </footer>
  );
}
