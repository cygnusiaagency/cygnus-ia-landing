import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Eyebrow from './Eyebrow';
import { fadeUp, staggerContainer, viewportConfig } from '../lib/motion';

const columns = [
  {
    tag: 'Pago único',
    price: '1.200',
    unit: '',
    title: 'Setup',
    caption: 'Pago único, y solo cuando decidís continuar después de la prueba.',
    features: [
      'Asistente entrenado con tus tratamientos y precios',
      'Conexión a WhatsApp, Instagram y Google Calendar',
      'Cualificación y agendado configurados a medida',
      'Implementación completa en 5 días',
    ],
  },
  {
    tag: 'Mensual',
    price: '200',
    unit: '/mes',
    title: 'Mantenimiento',
    caption: 'Monitoreo, ajustes y mejoras. Cancelable cuando quieras, sin permanencia.',
    features: [
      'Monitoreo y optimización continua del asistente',
      'Ajustes de tratamientos, precios y respuestas',
      'Soporte directo con tu clínica',
      'Reportes de turnos agendados y horas ahorradas',
    ],
  },
];

export default function Offer() {
  return (
    <section
      id="oferta"
      className="bg-cream w-full py-16 sm:py-[120px] px-5 sm:px-10 border-t border-line-soft"
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <Eyebrow number="05" label="La oferta" />
          </motion.div>
          <motion.h2
            className="text-[clamp(30px,4.6vw,60px)] leading-[1.04] font-bold tracking-tightest text-ink max-w-[18ch] mx-auto mb-5 text-balance"
            variants={fadeUp}
          >
            Catorce días gratis. Sin tarjeta. Sin letra pequeña.
          </motion.h2>
          <motion.p
            className="text-[17px] leading-[1.6] text-warm max-w-[52ch] mx-auto mb-14 sm:mb-16"
            variants={fadeUp}
          >
            Empezás sin poner un peso. Si el asistente no te ahorra horas medibles
            en 14 días, no pagás el setup. Recién facturamos cuando hay resultado.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {columns.map((col, i) => (
            <motion.div
              key={col.title}
              className="rounded-3xl border border-line bg-cream-deep p-8 sm:p-10 flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.1 }}
            >
              <span className="inline-flex self-start font-mono text-[10px] tracking-[0.08em] uppercase text-warm border border-line rounded-full px-3 py-1 mb-7">
                {col.tag}
              </span>

              <div className="flex items-baseline gap-1 mb-1.5">
                <span className="text-[20px] font-semibold text-warm">USD</span>
                <span className="text-[clamp(44px,6vw,64px)] font-extrabold tracking-tightest text-ink nums leading-none">
                  {col.price}
                </span>
                {col.unit && (
                  <span className="text-[18px] font-semibold text-warm">{col.unit}</span>
                )}
              </div>
              <div className="text-[15px] font-semibold text-ink mb-2">{col.title}</div>
              <p className="text-[14px] leading-[1.55] text-warm mb-7">{col.caption}</p>

              <ul className="space-y-3.5 mb-2">
                {col.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14.5px] leading-[1.45] text-ink-soft">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          <a
            href="#cta-final"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-4 min-h-[52px] rounded-full bg-accent text-cream-deep font-semibold text-[15px] hover:bg-accent-deep transition-colors duration-200 group"
          >
            Probar 14 días gratis
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
