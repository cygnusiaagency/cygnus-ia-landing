import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Eyebrow from './Eyebrow';
import { faq } from '../data/faq';
import { fadeUp, staggerContainer, viewportConfig } from '../lib/motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-[120px] px-5 sm:px-10 max-w-[1280px] mx-auto"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <motion.div variants={fadeUp}>
          <Eyebrow number="06" label="Preguntas" />
        </motion.div>
        <motion.h2
          className="font-display text-[clamp(36px,5.5vw,72px)] leading-[1] font-normal tracking-[-0.025em] mb-12 sm:mb-16 font-fraunces-soft"
          variants={fadeUp}
        >
          Lo que suele preguntar la gente.
        </motion.h2>
      </motion.div>

      <div className="border-t border-line">
        {faq.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              className="border-b border-line"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{
                duration: 0.9,
                ease: [0.2, 0.8, 0.2, 1],
                delay: i * 0.05,
              }}
            >
              <button
                className="w-full bg-transparent border-none cursor-pointer py-8 font-display text-[clamp(20px,2.2vw,28px)] font-medium tracking-[-0.02em] text-ink text-left flex justify-between items-center gap-6 font-fraunces-soft-mid hover:text-accent transition-colors duration-200"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <motion.span
                  className="text-warm flex-shrink-0"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Plus
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isOpen ? 'text-accent' : 'text-warm'
                    }`}
                  />
                </motion.span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[64ch] pb-8">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
