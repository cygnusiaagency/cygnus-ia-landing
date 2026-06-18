import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ConstellationMark from './ConstellationMark';
import { fadeUp, staggerContainer } from '../lib/motion';

const HERO_VIDEO_URL = import.meta.env.VITE_HERO_VIDEO_URL ?? '';

/* ─── Canvas Fallback ─── */
function CanvasFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    // Cygnus constellation anchor points (5 slightly larger particles)
    const cygnusPositions = [
      { x: W * 0.5, y: H * 0.1 },   // Deneb (top)
      { x: W * 0.5, y: H * 0.45 },  // Sadr (center)
      { x: W * 0.3, y: H * 0.45 },  // left wing
      { x: W * 0.7, y: H * 0.45 },  // right wing
      { x: W * 0.42, y: H * 0.85 }, // Albireo (bottom)
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      isCygnus: boolean;
      targetX?: number;
      targetY?: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      const isCygnus = i < 5;
      particles.push({
        x: isCygnus ? cygnusPositions[i].x : Math.random() * W,
        y: isCygnus ? cygnusPositions[i].y : Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: isCygnus ? 3 : 1 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.4,
        isCygnus,
        targetX: isCygnus ? cygnusPositions[i].x : undefined,
        targetY: isCygnus ? cygnusPositions[i].y : undefined,
      });
    }

    const draw = () => {
      if (document.visibilityState === 'hidden') {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      // Update positions
      for (const p of particles) {
        if (p.isCygnus && p.targetX !== undefined && p.targetY !== undefined) {
          const angle = Date.now() * 0.0003;
          p.x = p.targetX + Math.sin(angle + (p.targetX * 0.01)) * 8;
          p.y = p.targetY + Math.cos(angle + (p.targetY * 0.01)) * 8;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        }
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(211, 75, 50, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 250, 250, ${p.opacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  }, []);

  useEffect(() => {
    animate();
    const handleResize = () => animate();
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

/* ─── Hero ─── */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-ink"
    >
      {/* Video or Canvas Fallback */}
      {HERO_VIDEO_URL ? (
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      ) : (
        <CanvasFallback />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/80"
        aria-hidden="true"
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Content layer — use flex-col with proper flow instead of absolute positioning */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-start justify-between px-5 sm:px-10 lg:px-16 pt-6 sm:pt-8 flex-shrink-0">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <ConstellationMark size={32} variant="cream" />
            <span className="font-display text-cream text-[20px] tracking-tight font-fraunces-soft-mid font-semibold">
              Cygnus IA
            </span>
          </a>

          {/* Nav pill */}
          <nav className="hidden md:inline-flex items-center gap-6 rounded-full bg-cream/[0.08] backdrop-blur-md border border-cream/[0.12] px-5 py-2.5">
            <a href="#servicios" className="text-[13px] text-cream/80 hover:text-cream transition-colors duration-200">
              Servicios
            </a>
            <a href="#proceso" className="text-[13px] text-cream/80 hover:text-cream transition-colors duration-200">
              Proceso
            </a>
            <a href="#faq" className="text-[13px] text-cream/80 hover:text-cream transition-colors duration-200">
              FAQ
            </a>
            <a href="#cta-final" className="bg-accent text-cream rounded-full px-3.5 py-1.5 text-[12px] font-semibold hover:bg-cream hover:text-ink transition-colors duration-200">
              Probar 14 días
            </a>
          </nav>

          {/* Mobile CTA only */}
          <a href="#cta-final" className="md:hidden bg-accent text-cream rounded-full px-3.5 py-1.5 text-[12px] font-semibold">
            Probar 14 días
          </a>
        </div>

        {/* Hero meta strip */}
        <div className="px-5 sm:px-10 lg:px-16 mt-6 sm:mt-12 lg:mt-20 flex-shrink-0">
          <div className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-cream/60">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
            Agencia de automatización con IA · Buenos Aires · LATAM
          </div>
        </div>

        {/* Hero copy block — flexible growth area */}
        <motion.div
          className="px-5 sm:px-10 lg:px-16 pt-6 pb-8 sm:pt-8 sm:pb-12 lg:pb-16 sm:flex-1 sm:flex sm:items-end"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-[920px]">
            {/* Eyebrow link */}
            <motion.a
              href="#cta-final"
              className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-medium text-accent hover:text-cream transition-colors mb-4 sm:mb-6 group font-mono uppercase tracking-[0.08em]"
              variants={fadeUp}
            >
              Recuperá hasta 80 horas al mes
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </motion.a>

            {/* Headline */}
            <motion.h1
              className="font-display text-cream text-[clamp(2rem,7vw,6.5rem)] leading-[0.94] tracking-[-0.035em] font-normal mb-5 sm:mb-8 max-w-[18ch] font-fraunces-soft"
              variants={fadeUp}
            >
              Automatización con IA para{' '}
              <em className="italic font-light text-accent font-fraunces-soft-high">
                Clínicas Estéticas y Medspas
              </em>
              .
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="text-[15px] sm:text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.5] text-cream/70 max-w-[58ch] font-normal mb-6 sm:mb-10"
              variants={fadeUp}
            >
              Recuperá hasta 80 horas al mes en recepción. Un asistente de IA
              que responde, cualifica y agenda a tus pacientes en Google
              Calendar en menos de 60 segundos. Si no te ahorra horas medibles
              en 14 días, no pagas el setup.
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              variants={fadeUp}
            >
              <a
                href="#cta-final"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-cream text-ink font-semibold text-[14px] hover:bg-accent hover:text-cream transition-all duration-300 group"
              >
                Probar 14 días gratis
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#proceso"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full border border-cream/30 text-cream font-medium text-[14px] hover:border-cream hover:bg-cream/5 transition-all duration-300"
              >
                Ver cómo funciona
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom indicator strip — NOT absolute, flows naturally */}
        <div className="px-5 sm:px-10 lg:px-16 pb-6 sm:pb-8 border-t border-cream/10 flex-shrink-0">
          <div className="grid grid-cols-3 gap-3 sm:gap-8 pt-5 max-w-[1280px] mx-auto">
            {[
              { label: 'Activos atendiendo', value: '11 procesos' },
              { label: 'Implementación en', value: '5 días' },
              { label: 'Garantía', value: '14 días sin tarjeta' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.08em] uppercase text-cream/40">
                  {stat.label}
                </div>
                <div className="font-display text-[14px] sm:text-[20px] lg:text-[24px] text-cream tracking-tight font-fraunces-soft-mid font-medium mt-1">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
