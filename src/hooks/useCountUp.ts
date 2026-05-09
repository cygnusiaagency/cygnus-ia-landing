import { useEffect, useState, useRef } from 'react';

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

export function useCountUp(
  target: number,
  durationMs = 1800,
  trigger: boolean
): string {
  const [current, setCurrent] = useState(0);
  const animatedRef = useRef(false);
  const formatter = new Intl.NumberFormat('es-AR');

  useEffect(() => {
    if (!trigger || animatedRef.current) return;
    animatedRef.current = true;

    if (prefersReducedMotion) {
      setCurrent(target);
      return;
    }

    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(target * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [trigger, target, durationMs]);

  return formatter.format(current);
}
