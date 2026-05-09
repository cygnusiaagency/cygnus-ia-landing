import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Eyebrow from './Eyebrow';
import { useCountUp } from '../hooks/useCountUp';
import { fadeUp, staggerContainer, viewportConfig } from '../lib/motion';

interface CalcCell {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  isAccent?: boolean;
  foot: string;
}

const calcData: CalcCell[] = [
  {
    label: 'Horas por día',
    value: 4,
    suffix: 'h',
    foot: 'Tareas manuales repetitivas en una persona del equipo.',
  },
  {
    label: 'Al mes',
    value: 80,
    suffix: 'h',
    foot: 'Una jornada laboral completa cada semana, perdida.',
  },
  {
    label: 'Coste mensual',
    value: 2000,
    prefix: 'USD',
    foot: 'A USD 25/h. Coste real con cargas sociales arriba.',
  },
  {
    label: 'Anual',
    value: 24000,
    prefix: 'USD',
    isAccent: true,
    foot: 'Lo que estás pagando por no automatizar un solo proceso.',
  },
];

function CounterCell({ cell, trigger }: { cell: CalcCell; trigger: boolean }) {
  const count = useCountUp(cell.value, 1800, trigger);

  return (
    <div>
      <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-warm-soft mb-6">
        {cell.label}
      </div>
      <div className="font-display text-[clamp(48px,6vw,88px)] font-normal tracking-[-0.04em] leading-[0.95] text-cream" style={{ fontVariationSettings: "'opsz' 144" }}>
        {cell.prefix && (
          <span className="text-[0.5em] text-warm-soft italic font-light mr-1">
            {cell.prefix}
          </span>
        )}
        <span className={cell.isAccent ? 'text-accent' : ''}>
          {count}
        </span>
        {cell.suffix && (
          <span className="text-[0.5em] text-warm-soft italic font-light ml-1">
            {cell.suffix}
          </span>
        )}
      </div>
      <div className="font-sans text-[13px] text-warm-soft mt-4 leading-[1.4]">
        {cell.foot}
      </div>
    </div>
  );
}

export default function CostSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <section className="bg-ink text-cream w-full py-24 sm:py-[140px] px-5 sm:px-10">
      <div className="max-w-[1280px] mx-auto" ref={sectionRef}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow number="02" label="Lo que te cuesta" className="text-warm-soft" />
          </motion.div>
          <motion.h2
            className="font-display text-[clamp(36px,5vw,72px)] leading-[1.05] font-normal tracking-[-0.025em] max-w-[24ch] mb-16 sm:mb-20 text-cream font-fraunces-soft"
            variants={fadeUp}
          >
            Un proceso manual común, traducido a dinero real.
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-cream/[0.15]">
          {calcData.map((cell, i) => (
            <motion.div
              key={cell.label}
              className={`py-10 sm:py-14 ${
                i < calcData.length - 1
                  ? 'border-b sm:border-b-0 lg:border-r border-cream/[0.12]'
                  : ''
              } ${i === 0 ? 'pr-0 sm:pr-8' : 'px-0 sm:px-8'} ${
                i === calcData.length - 1 ? 'pl-0 sm:pl-8 pr-0' : ''
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{
                duration: 0.9,
                ease: [0.2, 0.8, 0.2, 1],
                delay: i * 0.1,
              }}
            >
              <CounterCell cell={cell} trigger={isInView} />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-cream/[0.15] font-display text-[clamp(24px,2.4vw,36px)] leading-[1.3] font-light italic text-cream max-w-[36ch] font-fraunces-soft-high"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Y eso es <em className="text-accent italic">solo uno</em>. ¿Cuántos procesos
          manuales tiene tu negocio ahora mismo?
        </motion.p>
      </div>
    </section>
  );
}
