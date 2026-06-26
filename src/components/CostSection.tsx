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
    label: 'Turnos en riesgo / mes',
    value: 20,
    foot: 'Entre no-shows y leads de DM que nunca recibieron respuesta a tiempo.',
  },
  {
    label: 'Valor medio del turno',
    value: 180,
    prefix: 'USD',
    foot: 'Tratamientos de alto ticket. Un solo turno paga semanas de servicio.',
  },
  {
    label: 'Pérdida mensual',
    value: 3600,
    prefix: 'USD',
    foot: '20 turnos que no entran a tu agenda, mes tras mes.',
  },
  {
    label: 'Al año',
    value: 43200,
    prefix: 'USD',
    isAccent: true,
    foot: 'Lo que cuesta no responder a tiempo. Y eso es solo un canal.',
  },
];

function CounterCell({ cell, trigger }: { cell: CalcCell; trigger: boolean }) {
  const count = useCountUp(cell.value, 1800, trigger);

  return (
    <div>
      <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-warm-soft mb-6">
        {cell.label}
      </div>
      <div
        className={`text-[clamp(40px,5.2vw,72px)] font-extrabold tracking-tightest leading-[0.95] nums ${
          cell.isAccent ? 'text-accent' : 'text-ink'
        }`}
      >
        {cell.prefix && (
          <span className="text-[0.45em] font-semibold text-warm mr-1.5">
            {cell.prefix}
          </span>
        )}
        {count}
        {cell.suffix && (
          <span className="text-[0.45em] font-semibold text-warm ml-1">
            {cell.suffix}
          </span>
        )}
      </div>
      <div className="text-[13px] text-warm mt-4 leading-[1.45] max-w-[26ch]">
        {cell.foot}
      </div>
    </div>
  );
}

export default function CostSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <section className="bg-cream-deep w-full py-16 sm:py-[120px] px-5 sm:px-10 border-t border-line-soft">
      <div className="max-w-[1280px] mx-auto" ref={sectionRef}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow number="02" label="Lo que te cuesta" />
          </motion.div>
          <motion.h2
            className="text-[clamp(30px,4.4vw,56px)] leading-[1.05] font-bold tracking-tightest text-ink max-w-[22ch] mb-14 sm:mb-20 text-balance"
            variants={fadeUp}
          >
            El silencio en tus DMs tiene un número.
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 pt-10 border-t border-line">
          {calcData.map((cell, i) => (
            <motion.div
              key={cell.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.1 }}
            >
              <CounterCell cell={cell} trigger={isInView} />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-14 sm:mt-16 pt-10 border-t border-line text-[clamp(20px,2.2vw,30px)] leading-[1.35] font-medium text-ink max-w-[34ch]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          ¿Cuántos pacientes te escriben hoy y se quedan{' '}
          <span className="text-accent">sin respuesta</span>?
        </motion.p>
      </div>
    </section>
  );
}
