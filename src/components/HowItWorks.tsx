import { motion } from 'framer-motion';
import Eyebrow from './Eyebrow';
import { steps } from '../data/steps';
import { fadeUp, staggerContainer, viewportConfig } from '../lib/motion';

export default function HowItWorks() {
  return (
    <section
      id="proceso"
      className="py-20 sm:py-[120px] px-5 sm:px-10 max-w-[1280px] mx-auto"
    >
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
          className="font-display text-[clamp(36px,5.5vw,80px)] leading-[1] font-normal tracking-[-0.025em] max-w-[22ch] mb-16 sm:mb-20 font-fraunces-soft"
          variants={fadeUp}
        >
          De diagnóstico a sistema funcionando, en una semana.
        </motion.h2>
      </motion.div>

      {/* Steps timeline */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
        {/* Connecting line (desktop only) */}
        <div
          className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-line z-0"
          aria-hidden="true"
        />

        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            className="relative z-[1] pr-0 lg:pr-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{
              duration: 0.9,
              ease: [0.2, 0.8, 0.2, 1],
              delay: i * 0.1,
            }}
          >
            {/* Circle number */}
            <div className="w-16 h-16 rounded-full bg-cream border border-line flex items-center justify-center font-display text-[24px] font-medium text-ink mb-8 transition-colors duration-300 hover:border-accent hover:text-accent" style={{ fontVariationSettings: "'opsz' 144" }}>
              {step.num}
            </div>

            {/* Duration tag */}
            <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-accent mb-3">
              {step.duration}
            </div>

            {/* Title */}
            <h3 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.15] text-ink mb-3 font-fraunces-soft-mid">
              {step.title}
            </h3>

            {/* Body */}
            <p className="text-[14px] leading-[1.55] text-warm max-w-[22ch]">
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
