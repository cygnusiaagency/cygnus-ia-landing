import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Eyebrow from './Eyebrow';
import { fadeUp, staggerContainer, viewportConfig } from '../lib/motion';

interface FormData {
  nombre: string;
  empresa: string;
  email: string;
  website: string;
}

interface UTMData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

interface FinalCTAProps {
  niche?: string;
  calLink?: string;
  headline?: React.ReactNode;
  subhead?: string;
  eyebrowNumber?: string;
  eyebrowLabel?: string;
  ctaLabel?: string;
}

type FormStep = 'form' | 'sending' | 'success' | 'error';

const DEFAULT_CAL_LINK = 'https://cal.com/cygnusia/diagnostico-15-min';

export default function FinalCTA({
  niche = 'general',
  calLink = DEFAULT_CAL_LINK,
  headline,
  subhead,
  eyebrowNumber = '07',
  eyebrowLabel = 'Empezar',
  ctaLabel = 'Agendar diagnóstico gratis',
}: FinalCTAProps = {}) {
  const [form, setForm] = useState<FormData>({
    nombre: '',
    empresa: '',
    email: '',
    website: '',
  });
  const [step, setStep] = useState<FormStep>('form');
  const [errorMsg, setErrorMsg] = useState('');
  const utmsRef = useRef<UTMData>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  });

  // Capture UTM params on mount (and persist in sessionStorage so they survive in-page nav)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const fromUrl: UTMData = {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
    };
    const hasAny = Object.values(fromUrl).some(Boolean);
    if (hasAny) {
      utmsRef.current = fromUrl;
      try {
        sessionStorage.setItem('cygnus_utms', JSON.stringify(fromUrl));
      } catch {
        /* sessionStorage not available */
      }
      return;
    }
    try {
      const stored = sessionStorage.getItem('cygnus_utms');
      if (stored) utmsRef.current = JSON.parse(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          niche,
          ...utmsRef.current,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Error al enviar. Intentá de nuevo.');
      }

      setStep('success');
      setForm({ nombre: '', empresa: '', email: '', website: '' });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error de conexión.');
      setStep('error');
    }
  };

  const headlineNode =
    headline ?? (
      <>
        Tu primera automatización en{' '}
        <em className="italic font-light text-accent">siete días</em>.
      </>
    );

  const subheadText =
    subhead ??
    'Completá el formulario y reservá tu diagnóstico de 15 minutos en el momento. Sin compromiso.';

  return (
    <section
      id="cta-final"
      className="bg-ink text-cream w-full py-20 sm:py-28 lg:py-[160px] px-5 sm:px-10 text-center"
    >
      <div className="max-w-[640px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <Eyebrow number={eyebrowNumber} label={eyebrowLabel} className="text-warm-soft" />
          </motion.div>
          <motion.h2
            className="font-display text-[clamp(32px,6vw,88px)] leading-[1] font-normal tracking-[-0.035em] text-cream mb-6 sm:mb-8 font-fraunces-soft"
            variants={fadeUp}
          >
            {headlineNode}
          </motion.h2>
          <motion.p
            className="text-[16px] sm:text-[19px] text-warm-soft max-w-[50ch] mx-auto mb-8 sm:mb-12 leading-[1.55]"
            variants={fadeUp}
          >
            {subheadText}
          </motion.p>

          {/* Form / States */}
          <AnimatePresence mode="wait">
            {step === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                className="py-10 sm:py-14"
              >
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D34B32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display text-[28px] sm:text-[36px] font-normal text-cream mb-3 font-fraunces-soft-mid">
                  Recibido. Reservá tu hora.
                </h3>
                <p className="text-[16px] text-warm-soft max-w-[44ch] mx-auto leading-[1.55] mb-8">
                  Elegí el horario que mejor te quede para el diagnóstico de 15 minutos. Sin compromiso, sin tarjeta.
                </p>
                <a
                  href={calLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-accent text-cream font-semibold text-[15px] hover:bg-cream hover:text-ink transition-all duration-300 group"
                >
                  Reservar 15 minutos ahora
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <p className="text-center font-mono text-[11px] tracking-[0.06em] text-warm-soft/60 pt-6">
                  Si preferís, te escribimos a tu email en menos de 24 h.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                className="space-y-3 sm:space-y-4 text-left max-w-[500px] mx-auto"
                onSubmit={handleSubmit}
              >
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="lead-nombre"
                    className="block font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-cream/40 mb-2"
                  >
                    Nombre *
                  </label>
                  <input
                    id="lead-nombre"
                    type="text"
                    value={form.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    placeholder="Tu nombre"
                    required
                    className="w-full px-5 py-3.5 sm:py-4 bg-cream/[0.05] border border-cream/[0.15] rounded-2xl text-cream font-sans text-[15px] placeholder:text-warm-soft/50 focus:outline-none focus:border-accent/60 transition-colors duration-200"
                  />
                </div>

                {/* Empresa */}
                <div>
                  <label
                    htmlFor="lead-empresa"
                    className="block font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-cream/40 mb-2"
                  >
                    Empresa / Negocio *
                  </label>
                  <input
                    id="lead-empresa"
                    type="text"
                    value={form.empresa}
                    onChange={(e) => handleChange('empresa', e.target.value)}
                    placeholder="Nombre de tu empresa"
                    required
                    className="w-full px-5 py-3.5 sm:py-4 bg-cream/[0.05] border border-cream/[0.15] rounded-2xl text-cream font-sans text-[15px] placeholder:text-warm-soft/50 focus:outline-none focus:border-accent/60 transition-colors duration-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="lead-email"
                    className="block font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-cream/40 mb-2"
                  >
                    Correo electrónico *
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="tu@empresa.com"
                    required
                    className="w-full px-5 py-3.5 sm:py-4 bg-cream/[0.05] border border-cream/[0.15] rounded-2xl text-cream font-sans text-[15px] placeholder:text-warm-soft/50 focus:outline-none focus:border-accent/60 transition-colors duration-200"
                  />
                </div>

                {/* Website (optional) */}
                <div>
                  <label
                    htmlFor="lead-website"
                    className="block font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-cream/40 mb-2"
                  >
                    Sitio web <span className="text-cream/20">· opcional</span>
                  </label>
                  <input
                    id="lead-website"
                    type="url"
                    value={form.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    placeholder="https://tuempresa.com"
                    className="w-full px-5 py-3.5 sm:py-4 bg-cream/[0.05] border border-cream/[0.15] rounded-2xl text-cream font-sans text-[15px] placeholder:text-warm-soft/50 focus:outline-none focus:border-accent/60 transition-colors duration-200"
                  />
                </div>

                {/* Error message */}
                {step === 'error' && errorMsg && (
                  <p className="text-accent text-[13px] font-medium text-center pt-1">
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <div className="pt-2 sm:pt-3">
                  <button
                    type="submit"
                    disabled={step === 'sending'}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-accent text-cream font-semibold text-[15px] hover:bg-cream hover:text-ink transition-all duration-300 group disabled:opacity-60 disabled:hover:bg-accent disabled:hover:text-cream"
                  >
                    {step === 'sending' ? (
                      <>
                        <svg className="animate-spin-slow w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        {ctaLabel}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                {/* Footer note */}
                <p className="text-center font-mono text-[11px] sm:text-[12px] tracking-[0.06em] text-warm-soft/60 pt-2">
                  O escríbenos directamente · hola@cygnusia.com
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
