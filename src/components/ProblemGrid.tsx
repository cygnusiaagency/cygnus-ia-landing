import { motion } from 'framer-motion';
import Eyebrow from './Eyebrow';
import { problems } from '../data/problems';
import { fadeUp, staggerContainer, viewportConfig } from '../lib/motion';

export default function ProblemGrid() {
  return (
    <>
      {/* Divider */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <hr className="border-0 h-px bg-line-soft" />
      </div>

      <section
        id="problema"
        className="py-20 sm:py-[120px] px-5 sm:px-10 max-w-[1280px] mx-auto"
      >
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
            className="font-display text-[clamp(36px,5.5vw,80px)] leading-[1] font-normal tracking-[-0.025em] text-ink max-w-[22ch] mb-16 sm:mb-20 font-fraunces-soft"
            variants={fadeUp}
          >
            Reconoces alguno <em className="italic font-light text-warm">de estos</em>?
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-line">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.code}
              className="p-8 sm:p-12 border-r border-b border-line hover:bg-ink/[0.02] transition-colors duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{
                duration: 0.9,
                ease: [0.2, 0.8, 0.2, 1],
                delay: i * 0.1,
              }}
            >
              <div className="font-mono text-[12px] tracking-[0.08em] text-warm mb-6">
                {problem.code}
              </div>
              <h3 className="font-display text-[28px] leading-[1.15] font-medium tracking-[-0.02em] text-ink mb-4 font-fraunces-soft-mid">
                {problem.title}
              </h3>
              <p className="text-[16px] leading-[1.55] text-ink-soft max-w-[38ch]">
                {problem.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
