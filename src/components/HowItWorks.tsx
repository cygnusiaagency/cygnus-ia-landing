import { motion } from 'framer-motion';
import Eyebrow from './Eyebrow';
import { steps } from '../data/steps';
import { fadeUp, staggerContainer, viewportConfig } from '../lib/motion';

export default function HowItWorks() {
  return (
    <section
      id="proceso"
      className="bg-cream-deep py-16 sm:py-[120px] px-5 sm:px-10 border-t border-line-soft"
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow number="04" label="Cómo trabajamos" />
          </motion.div>
          <motion.h2
            className="text-[clamp(30px,4.4vw,56px)] leading-[1.05] font-bold tracking-tightest text-ink max-w-[20ch] mb-14 sm:mb-20 text-balance"
            variants={fadeUp}
          >
            De diagnóstico a asistente funcionando, en cinco días.
          </motion.h2>
        </motion.div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">
          <div
            className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-line z-0"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative z-[1] pr-0 lg:pr-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.1 }}
            >
              <div className="w-14 h-14 rounded-full bg-cream-deep border border-line flex items-center justify-center text-[20px] font-bold text-ink mb-7">
                {step.num}
              </div>
              <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-accent mb-3">
                {step.duration}
              </div>
              <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink mb-3">
                {step.title}
              </h3>
              <p className="text-[14px] leading-[1.6] text-warm max-w-[26ch]">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
