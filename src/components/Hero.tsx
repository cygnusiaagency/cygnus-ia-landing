import { motion } from 'framer-motion';
import { ArrowRight, Check, CheckCheck, Calendar } from 'lucide-react';
import ConstellationMark from './ConstellationMark';
import { fadeUp, staggerContainer } from '../lib/motion';

const trustItems = [
  { label: 'Activos atendiendo', value: '11 procesos' },
  { label: 'Implementación en', value: '5 días' },
  { label: 'Garantía', value: '14 días sin tarjeta' },
];

/* ─── Product mockup: WhatsApp conversation → cita agendada ─── */
function ChatMockup() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      {/* Soft halo behind card */}
      <div
        className="absolute -inset-6 rounded-[36px] bg-accent/[0.06] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative rounded-[28px] border border-line bg-cream-deep shadow-[0_24px_60px_-28px_rgba(17,17,17,0.22)] overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-line-soft">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-ink flex items-center justify-center">
              <ConstellationMark size={18} variant="cream" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#2BB673] border-2 border-cream-deep" />
          </div>
          <div className="leading-tight">
            <div className="text-[14px] font-semibold text-ink tracking-[-0.01em]">
              Recepción · Asistente IA
            </div>
            <div className="text-[11px] text-warm">en línea · responde al instante</div>
          </div>
        </div>

        {/* Messages */}
        <div className="px-4 py-5 space-y-3 bg-cream">
          {/* Patient */}
          <div className="flex justify-start">
            <div className="max-w-[78%] rounded-2xl rounded-tl-md bg-cream-deep border border-line-soft px-4 py-2.5">
              <p className="text-[13.5px] leading-[1.45] text-ink-soft">
                Hola! Vi sus historias de ácido hialurónico, ¿cuánto sale? 🙂
              </p>
              <span className="block mt-1 text-[10px] text-warm-soft">12:04</span>
            </div>
          </div>

          {/* AI */}
          <div className="flex justify-end">
            <div className="max-w-[82%] rounded-2xl rounded-tr-md bg-ink px-4 py-2.5">
              <p className="text-[13.5px] leading-[1.45] text-cream-deep">
                ¡Hola, Carla! La valoración es sin cargo y el tratamiento arranca
                en USD 180. ¿Te reservo un turno esta semana?
              </p>
              <span className="flex items-center justify-end gap-1 mt-1 text-[10px] text-warm-soft">
                12:04 <CheckCheck className="w-3 h-3 text-accent" />
              </span>
            </div>
          </div>

          {/* Response-time badge */}
          <div className="flex justify-end">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.04em] uppercase text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
              Respondido en 38 s
            </span>
          </div>

          {/* Patient */}
          <div className="flex justify-start">
            <div className="max-w-[78%] rounded-2xl rounded-tl-md bg-cream-deep border border-line-soft px-4 py-2.5">
              <p className="text-[13.5px] leading-[1.45] text-ink-soft">
                Sí! El jueves a la tarde me viene bien
              </p>
              <span className="block mt-1 text-[10px] text-warm-soft">12:05</span>
            </div>
          </div>

          {/* Booking confirmation card */}
          <div className="flex justify-end">
            <div className="max-w-[88%] w-full rounded-2xl rounded-tr-md bg-cream-deep border border-line px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-accent" />
                </div>
                <div className="leading-tight">
                  <div className="text-[13px] font-semibold text-ink">
                    Turno confirmado
                  </div>
                  <div className="text-[11px] text-warm">
                    Jue 14:30 · agendado en Google Calendar
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-ink-soft">
                <Check className="w-3.5 h-3.5 text-accent" />
                Recordatorio automático enviado a Carla
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero ─── */
export default function Hero() {
  return (
    <section id="hero" className="relative w-full bg-cream-deep overflow-hidden">
      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-10 lg:px-16 pt-6 sm:pt-8">
        <a href="#hero" className="flex items-center gap-2.5">
          <ConstellationMark size={30} variant="ink" />
          <span className="text-[19px] font-semibold tracking-[-0.02em] text-ink">
            Cygnus IA
          </span>
        </a>

        <nav className="hidden md:inline-flex items-center gap-7">
          <a href="#problema" className="text-[13.5px] font-medium text-warm hover:text-ink transition-colors duration-200">
            Problema
          </a>
          <a href="#solucion" className="text-[13.5px] font-medium text-warm hover:text-ink transition-colors duration-200">
            Solución
          </a>
          <a href="#proceso" className="text-[13.5px] font-medium text-warm hover:text-ink transition-colors duration-200">
            Proceso
          </a>
          <a href="#faq" className="text-[13.5px] font-medium text-warm hover:text-ink transition-colors duration-200">
            FAQ
          </a>
          <a
            href="#cta-final"
            className="inline-flex items-center bg-accent text-cream-deep rounded-full px-4 py-2 text-[13px] font-semibold hover:bg-accent-deep transition-colors duration-200"
          >
            Probar 14 días
          </a>
        </nav>

        <a
          href="#cta-final"
          className="md:hidden inline-flex items-center bg-accent text-cream-deep rounded-full px-4 py-2.5 text-[13px] font-semibold"
        >
          Probar 14 días
        </a>
      </div>

      {/* Hero body */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-16 pt-12 sm:pt-20 lg:pt-24 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          {/* Copy column */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            {/* Pre-title */}
            <motion.div
              className="inline-flex items-center gap-2.5 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-warm mb-7"
              variants={fadeUp}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
              Agencia de automatización con IA
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="text-[clamp(2.05rem,7vw,4.6rem)] leading-[1.04] sm:leading-[1.02] tracking-tightest font-extrabold text-ink text-balance mb-6"
              variants={fadeUp}
            >
              Automatización con IA para Clínicas Estéticas y Medspas.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-[16px] sm:text-[18px] leading-[1.6] text-warm max-w-[56ch] mb-9"
              variants={fadeUp}
            >
              Recuperá hasta 80 horas al mes en recepción. Un asistente de IA que
              responde, cualifica y agenda a tus pacientes en Google Calendar en
              menos de 60 segundos.{' '}
              <span className="text-ink font-medium">
                Si no te ahorra horas medibles en 14 días, no pagás el setup.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4" variants={fadeUp}>
              <a
                href="#cta-final"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-4 min-h-[52px] rounded-full bg-accent text-cream-deep font-semibold text-[15px] hover:bg-accent-deep transition-colors duration-200 group"
              >
                Probar 14 días gratis
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#solucion"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-4 min-h-[52px] rounded-full border border-line text-ink font-semibold text-[15px] hover:border-ink transition-colors duration-200"
              >
                Ver cómo funciona
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              className="mt-10 pt-7 border-t border-line-soft grid grid-cols-3 gap-4 max-w-[520px]"
              variants={fadeUp}
            >
              {trustItems.map((item) => (
                <div key={item.label}>
                  <div className="font-mono text-[9.5px] sm:text-[10px] tracking-[0.08em] uppercase text-warm-soft">
                    {item.label}
                  </div>
                  <div className="text-[14px] sm:text-[16px] font-semibold text-ink tracking-[-0.01em] mt-1">
                    {item.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Mockup column */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
          >
            <ChatMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
