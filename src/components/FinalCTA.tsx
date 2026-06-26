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

const inputClass =
  'w-full px-5 py-3.5 sm:py-4 bg-cream-deep border border-line rounded-2xl text-ink text-[15px] placeholder:text-warm-soft focus:outline-none focus:border-accent transition-colors duration-200';
const labelClass =
  'block font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-warm mb-2';

export default function FinalCTA({
  niche = 'clinicas-esteticas',
  calLink = DEFAULT_CAL_LINK,
  headline,
  subhead,
  eyebrowNumber = '07',
  eyebrowLabel = 'Empezar',
  ctaLabel = 'Probar 14 días gratis',
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
        Probá tu recepcionista de IA <span className="text-accent">14 días gratis</span>.
      </>
    );

  const subheadText =
    subhead ??
    'Dejanos tus datos y reservá tu diagnóstico de 15 minutos. Sin tarjeta, sin compromiso. Si no te ahorra horas, no pagás el setup.';

  return (
    <section
      id="cta-final"
      className="bg-cream w-full py-16 sm:py-28 lg:py-[140px] px-5 sm:px-10 text-center border-t border-line-soft"
    >
      <div className="max-w-[640px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <Eyebrow number={eyebrowNumber} label={eyebrowLabel} />
          </motion.div>
          <motion.h2
            className="text-[clamp(30px,5vw,60px)] leading-[1.04] font-bold tracking-tightest text-ink mb-6 text-balance"
            variants={fadeUp}
          >
            {headlineNode}
          </motion.h2>
          <motion.p
            className="text-[16px] sm:text-[18px] text-warm max-w-[50ch] mx-auto mb-10 sm:mb-12 leading-[1.6]"
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
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D34B32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-[26px] sm:text-[32px] font-bold tracking-tightest text-ink mb-3">
                  Recibido. Reservá tu hora.
                </h3>
                <p className="text-[16px] text-warm max-w-[44ch] mx-auto leading-[1.6] mb-8">
                  Elegí el horario que mejor te quede para el diagnóstico de 15 minutos. Sin compromiso, sin tarjeta.
                </p>
                <a
                  href={calLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-7 py-4 min-h-[52px] rounded-full bg-accent text-cream-deep font-semibold text-[15px] hover:bg-accent-deep transition-colors duration-200 group"
                >
                  Reservar 15 minutos ahora
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <p className="text-center font-mono text-[11px] tracking-[0.06em] text-warm-soft pt-6">
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
                <div>
                  <label htmlFor="lead-nombre" className={labelClass}>
                    Nombre *
                  </label>
                  <input
                    id="lead-nombre"
                    type="text"
                    value={form.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    placeholder="Tu nombre"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="lead-empresa" className={labelClass}>
                    Clínica / Medspa *
                  </label>
                  <input
                    id="lead-empresa"
                    type="text"
                    value={form.empresa}
                    onChange={(e) => handleChange('empresa', e.target.value)}
                    placeholder="Nombre de tu clínica"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="lead-email" className={labelClass}>
                    Correo electrónico *
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="tu@clinica.com"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="lead-website" className={labelClass}>
                    Instagram o sitio web <span className="text-warm-soft">· opcional</span>
                  </label>
                  <input
                    id="lead-website"
                    type="text"
                    value={form.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    placeholder="@tuclinica o https://tuclinica.com"
                    className={inputClass}
                  />
                </div>

                {step === 'error' && errorMsg && (
                  <p className="text-accent text-[13px] font-medium text-center pt-1">
                    {errorMsg}
                  </p>
                )}

                <div className="pt-2 sm:pt-3">
                  <button
                    type="submit"
                    disabled={step === 'sending'}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 min-h-[52px] rounded-full bg-accent text-cream-deep font-semibold text-[15px] hover:bg-accent-deep transition-colors duration-200 group disabled:opacity-60 disabled:hover:bg-accent"
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

                <p className="text-center font-mono text-[11px] sm:text-[12px] tracking-[0.06em] text-warm-soft pt-2">
                  O escribinos directamente · hola@cygnusia.com
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
