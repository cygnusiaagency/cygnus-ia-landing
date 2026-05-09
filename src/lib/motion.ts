import type { Variants } from 'framer-motion';

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

const duration = prefersReducedMotion ? 0 : 0.9;
const staggerDelay = prefersReducedMotion ? 0 : 0.15;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.6,
      ease: [0.2, 0.8, 0.2, 1],
    },
  },
};

export const viewportConfig = {
  once: true,
  margin: '-80px' as const,
};
