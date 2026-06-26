import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Eyebrow from './Eyebrow';
import { faq } from '../data/faq';
import { fadeUp, staggerContainer, viewportConfig } from '../lib/motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="bg-cream-deep py-16 sm:py-[120px] px-5 sm:px-10 border-t border-line-soft"
    >
      <div className="max-w-[860px] mx-auto">
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
            className="text-[clamp(30px,4.4vw,52px)] leading-[1.05] font-bold tracking-tightest text-ink mb-12 sm:mb-16 text-balance"
            variants={fadeUp}
          >
            Lo que suelen preguntar antes de empezar.
          </motion.h2>
        </motion.div>

        <div className="border-t border-line">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                className="border-b border-line"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.04 }}
              >
                <button
                  className="w-full bg-transparent border-none cursor-pointer py-7 text-[clamp(17px,2vw,21px)] font-semibold tracking-[-0.01em] text-ink text-left flex justify-between items-center gap-6 hover:text-accent transition-colors duration-200"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <motion.span
                    className="flex-shrink-0"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus className={`w-5 h-5 ${isOpen ? 'text-accent' : 'text-warm'}`} />
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
                      <p className="text-[16px] leading-[1.65] text-warm max-w-[64ch] pb-7">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
