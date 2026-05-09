import ConstellationMark from './ConstellationMark';

export default function Footer() {
  return (
    <footer className="bg-ink text-warm-soft pt-16 pb-10 px-5 sm:px-10 border-t border-cream/[0.08]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <a href="#" className="flex items-center gap-2.5 mb-4">
            <ConstellationMark size={28} variant="cream" />
            <span className="font-display text-cream text-[22px] tracking-[-0.02em] font-semibold font-fraunces-soft-mid">
              Cygnus IA
            </span>
          </a>
          <p className="max-w-[32ch] text-[14px] leading-[1.55]">
            Agencia de automatización con inteligencia artificial. Implementamos
            sistemas que recuperan tiempo medible para empresas que valoran su
            mejor recurso.
          </p>
        </div>

        {/* Servicios */}
        <div>
          <h4 className="font-mono text-[11px] tracking-[0.08em] uppercase text-cream mb-5">
            Servicios
          </h4>
          <ul className="space-y-3 text-[14px]">
            <li>
              <a href="#servicios" className="text-warm-soft hover:text-cream transition-colors duration-200">
                Asistente con docs
              </a>
            </li>
            <li>
              <a href="#servicios" className="text-warm-soft hover:text-cream transition-colors duration-200">
                Cualificación de leads
              </a>
            </li>
            <li>
              <a href="#servicios" className="text-warm-soft hover:text-cream transition-colors duration-200">
                Back-office
              </a>
            </li>
            <li>
              <a href="#servicios" className="text-warm-soft hover:text-cream transition-colors duration-200">
                Páginas web
              </a>
            </li>
          </ul>
        </div>

        {/* Empresa */}
        <div>
          <h4 className="font-mono text-[11px] tracking-[0.08em] uppercase text-cream mb-5">
            Empresa
          </h4>
          <ul className="space-y-3 text-[14px]">
            <li>
              <a href="#proceso" className="text-warm-soft hover:text-cream transition-colors duration-200">
                Proceso
              </a>
            </li>
            <li>
              <a href="#faq" className="text-warm-soft hover:text-cream transition-colors duration-200">
                FAQ
              </a>
            </li>
            <li>
              <a href="mailto:hola@cygnus.ia" className="text-warm-soft hover:text-cream transition-colors duration-200">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-mono text-[11px] tracking-[0.08em] uppercase text-cream mb-5">
            Legal
          </h4>
          <ul className="space-y-3 text-[14px]">
            <li>
              <a href="#" className="text-warm-soft hover:text-cream transition-colors duration-200">
                Privacidad
              </a>
            </li>
            <li>
              <a href="#" className="text-warm-soft hover:text-cream transition-colors duration-200">
                Términos
              </a>
            </li>
            <li>
              <a href="#" className="text-warm-soft hover:text-cream transition-colors duration-200">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="max-w-[1280px] mx-auto pt-6 border-t border-cream/[0.08] flex flex-wrap justify-between gap-4 font-mono text-[11px] tracking-[0.06em] text-warm-soft">
        <span>© 2026 Cygnus IA · Buenos Aires</span>
        <span>Constelación del cisne · Hecho con criterio</span>
      </div>
    </footer>
  );
}
