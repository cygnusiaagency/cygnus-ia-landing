import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only show on desktop devices with fine pointer
    const hasFineCursor = window.matchMedia('(pointer: fine)').matches;
    if (!hasFineCursor) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('a, button, input, textarea, select, [role="button"], label') !== null;
      setIsHovering(isInteractive);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    // Animation loop — smooth follow
    let rafId: number;
    const tick = () => {
      // Dot follows immediately
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.6;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.6;

      // Glow trails behind slightly
      glowPos.current.x += (mouse.current.x - glowPos.current.x) * 0.15;
      glowPos.current.y += (mouse.current.y - glowPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x}px, ${glowPos.current.y}px) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer glow — soft, trails behind */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="rounded-full transition-all duration-300 ease-out"
          style={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            background: isHovering
              ? 'radial-gradient(circle, rgba(211, 75, 50, 0.25) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(211, 75, 50, 0.12) 0%, transparent 70%)',
            filter: 'blur(2px)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Inner dot — crisp, follows fast */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.15s ease',
        }}
      >
        <div
          className="rounded-full transition-all duration-200 ease-out"
          style={{
            width: isHovering ? 8 : 5,
            height: isHovering ? 8 : 5,
            backgroundColor: isHovering ? '#D34B32' : '#FAFAFA',
            boxShadow: isHovering
              ? '0 0 12px rgba(211, 75, 50, 0.6), 0 0 4px rgba(211, 75, 50, 0.8)'
              : '0 0 8px rgba(250, 250, 250, 0.3), 0 0 2px rgba(250, 250, 250, 0.5)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </>
  );
}
