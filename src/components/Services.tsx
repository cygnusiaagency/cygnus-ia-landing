import { motion } from 'framer-motion';
import { MessageSquareText, UserCheck, CalendarCheck, ArrowRight } from 'lucide-react';
import Eyebrow from './Eyebrow';
import { services } from '../data/services';
import { fadeUp, staggerContainer, viewportConfig } from '../lib/motion';

const icons = [MessageSquareText, UserCheck, CalendarCheck];

export default function Services() {
  return (
    <section
      id="solucion"
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
            <Eyebrow number="03" label="La solución" />
          </motion.div>
          <motion.h2
            className="text-[clamp(30px,4.4vw,56px)] leading-[1.05] font-bold tracking-tightest text-ink max-w-[18ch] mb-5 text-balance"
            variants={fadeUp}
          >
            Un asistente. Tres trabajos que hoy te roban horas.
          </motion.h2>
          <motion.p
            className="text-[17px] leading-[1.6] text-warm max-w-[54ch] mb-14 sm:mb-20"
            variants={fadeUp}
          >
            No vendemos diez herramientas. Vendemos una sola: un asistente de IA
            que atiende tus DMs de WhatsApp e Instagram de punta a punta, sin que
            tu equipo levante el teléfono.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {services.map((cap, i) => {
            const Icon = icons[i] ?? MessageSquareText;
            return (
              <motion.div
                key={cap.code}
                className="rounded-3xl border border-line bg-cream-deep p-8 flex flex-col h-full"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-7">
                  <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-warm-soft">
                    {cap.code}
                  </span>
                </div>
                <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-ink leading-[1.2] mb-3">
                  {cap.title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-warm mb-7">
                  {cap.description}
                </p>
                <div className="mt-auto pt-5 border-t border-line-soft font-mono text-[11px] tracking-[0.06em] uppercase text-ink">
                  {cap.metric}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.a
          href="#cta-final"
          className="inline-flex items-center gap-2 mt-12 text-[15px] font-semibold text-accent hover:text-accent-deep transition-colors group"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          Quiero verlo atendiendo mis DMs
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.a>
      </div>
    </section>
  );
}
