import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Eyebrow from './Eyebrow';
import { fadeUp, staggerContainer, viewportConfig } from '../lib/motion';

const offerItems = [
  {
    title: 'Cero riesgo',
    body: 'No pides datos de pago para empezar. Si no ahorra horas medibles en 14 días, no facturamos.',
  },
  {
    title: 'Setup desde USD 1.200',
    body: 'Pago único cuando decides continuar. Depende del proceso y volumen de integración.',
  },
  {
    title: 'Mantenimiento USD 200/mes',
    body: 'Monitoreo, ajustes, mejoras. Cancelable en cualquier momento, sin permanencia.',
  },
];

export default function Offer() {
  return (
    <section className="bg-cream-deep w-full py-24 sm:py-[140px] px-5 sm:px-10 relative overflow-hidden">
      {/* Giant CYGNUS watermark */}
      <div
        className="absolute bottom-[-120px] right-[-40px] font-display text-[40vw] font-extrabold text-ink/[0.025] tracking-[-0.05em] pointer-events-none select-none"
        style={{ fontVariationSettings: "'opsz' 144" }}
        aria-hidden="true"
      >
        CYGNUS
      </div>

      <div className="max-w-[1280px] mx-auto relative z-[2]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow number="05" label="La oferta" />
          </motion.div>
          <motion.h2
            className="font-display text-[clamp(40px,6.5vw,96px)] leading-[0.98] font-normal tracking-[-0.035em] text-ink max-w-[16ch] mb-10 font-fraunces-soft"
            variants={fadeUp}
          >
            Catorce días gratis. Sin tarjeta. Sin{' '}
            <em className="italic font-light text-accent">letra pequeña</em>.
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14 max-w-[920px]">
          {offerItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="pt-6 border-t border-ink"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{
                duration: 0.9,
                ease: [0.2, 0.8, 0.2, 1],
                delay: i * 0.1,
              }}
            >
              <strong className="block font-display text-[24px] font-medium tracking-[-0.02em] text-ink mb-2 font-fraunces-soft-mid">
                {item.title}
              </strong>
              <span className="text-[14px] text-ink-soft leading-[1.5]">
                {item.body}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="#cta-final"
          className="inline-flex items-center gap-2.5 px-7 py-[18px] bg-ink text-cream rounded-full text-[15px] font-semibold tracking-[-0.01em] hover:bg-accent hover:-translate-y-px transition-all duration-250 group"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Empezar la prueba
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.a>
      </div>
    </section>
  );
}
