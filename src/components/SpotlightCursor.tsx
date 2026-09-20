import React, { useEffect, useState, useRef } from 'react';

export const SpotlightCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const cursorRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on pointer-fine devices (desktops/laptops)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      setIsEnabled(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      setPosition((prev) => {
        const dx = cursorRef.current.x - prev.x;
        const dy = cursorRef.current.y - prev.y;
        return {
          x: Math.round(prev.x + dx * 0.18),
          y: Math.round(prev.y + dy * 0.18)
        };
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible]);

  if (!isEnabled || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft architectural beam spotlight */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-30 transition-transform duration-75"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: 'radial-gradient(circle, rgba(196, 164, 124, 0.15) 0%, rgba(196, 164, 124, 0.03) 45%, transparent 70%)'
        }}
      />

      {/* Precision micro-crosshair */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 transition-transform duration-75 flex items-center justify-center"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#c4a47c]/60 ring-4 ring-[#c4a47c]/10" />
      </div>

      {/* Floating subtle coordinate HUD */}
      <div
        className="hidden xl:flex items-center gap-2 absolute text-[9px] font-mono tracking-widest text-[#8e877c]/60 select-none transition-transform duration-75"
        style={{
          left: `${position.x + 18}px`,
          top: `${position.y + 14}px`
        }}
      >
        <span>X:{String(position.x).padStart(4, '0')}</span>
        <span>·</span>
        <span>Y:{String(position.y).padStart(4, '0')}</span>
      </div>
    </div>
  );
};
