import { motion } from 'framer-motion';
import Eyebrow from './Eyebrow';
import { problems } from '../data/problems';
import { fadeUp, staggerContainer, viewportConfig } from '../lib/motion';

export default function ProblemGrid() {
  return (
    <section
      id="problema"
      className="bg-cream py-16 sm:py-[120px] px-5 sm:px-10 border-t border-line-soft"
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow number="01" label="El problema" />
          </motion.div>
          <motion.h2
            className="text-[clamp(30px,4.4vw,56px)] leading-[1.05] font-bold tracking-tightest text-ink max-w-[20ch] mb-14 sm:mb-20 text-balance"
            variants={fadeUp}
          >
            Tu clínica no pierde pacientes por precio. Los pierde por tiempo.
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.code}
              className="rounded-3xl border border-line bg-cream-deep p-8 sm:p-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.1 }}
            >
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-[clamp(44px,6vw,68px)] font-extrabold tracking-tightest text-accent nums leading-none">
                  {problem.stat}
                </span>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-warm-soft">
                  {problem.code}
                </span>
              </div>
              <h3 className="text-[22px] sm:text-[26px] font-semibold tracking-[-0.02em] text-ink mb-4">
                {problem.title}
              </h3>
              <p className="text-[15.5px] leading-[1.6] text-warm max-w-[42ch]">
                {problem.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
