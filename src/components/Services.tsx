import { motion } from 'framer-motion';
import Eyebrow from './Eyebrow';
import { services } from '../data/services';
import { fadeUp, staggerContainer, viewportConfig } from '../lib/motion';

export default function Services() {
  return (
    <section
      id="servicios"
      className="py-20 sm:py-[120px] px-5 sm:px-10 max-w-[1280px] mx-auto"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <motion.div variants={fadeUp}>
          <Eyebrow number="03" label="Lo que hacemos" />
        </motion.div>
        <motion.h2
          className="font-display text-[clamp(36px,5.5vw,80px)] leading-[1] font-normal tracking-[-0.025em] max-w-[20ch] mb-4 font-fraunces-soft"
          variants={fadeUp}
        >
          Cuatro formas de recuperar el tiempo de tu equipo.
        </motion.h2>
        <motion.p
          className="text-[18px] text-warm max-w-[52ch] mb-16 sm:mb-20 leading-[1.55]"
          variants={fadeUp}
        >
          Cada implementación se mide en horas ahorradas, no en complejidad
          técnica. Llegas con un proceso doloroso, te vas con un sistema que lo
          hace por ti.
        </motion.p>
      </motion.div>

      <div>
        {services.map((service, i) => (
          <motion.div
            key={service.code}
            className={`grid grid-cols-1 md:grid-cols-[1fr_60px_2fr] gap-4 md:gap-0 py-10 sm:py-14 border-t border-line items-start transition-[padding] duration-300 hover:pl-4 hover:pr-4 ${
              i === services.length - 1 ? 'border-b border-line' : ''
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
            {/* Service ID */}
            <div className="font-mono text-[13px] font-medium tracking-[0.06em] text-warm pt-0 md:pt-2">
              <span className="text-accent">{service.code}</span>
            </div>

            {/* Service Name */}
            <div className="md:col-start-2 md:col-end-3 hidden md:block" />
            <div className="md:col-start-2 md:col-span-2">
              <div className="font-display text-[clamp(28px,3.4vw,44px)] font-normal tracking-[-0.025em] leading-[1.05] text-ink mb-4 font-fraunces-soft">
                {service.titleParts.before}
                <em className="italic font-light">{service.titleParts.emphasis}</em>
                {service.titleParts.after}
              </div>

              {/* Service Detail */}
              <div className="pt-0 md:pt-2">
                <p className="text-[17px] leading-[1.6] text-ink-soft mb-6 max-w-[52ch]">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] tracking-[0.04em] py-1.5 px-3 border border-line rounded-full text-warm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
