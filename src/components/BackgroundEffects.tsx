import React, { useEffect, useState } from 'react';

export default function BackgroundEffects() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY, visible: true });
    };

    const handleLeave = () => {
      setMousePos((prev) => ({ ...prev, visible: false }));
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden select-none">
      {/* Base Deep Obsidian Black Gradient */}
      <div className="absolute inset-0 bg-[#030305]" />

      {/* Cybernetic Accent Glows */}
      <div className="absolute top-[-10%] left-[-5%] h-[550px] w-[550px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[25%] right-[-8%] h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[160px] animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute bottom-[10%] left-[15%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px] animate-pulse" style={{ animationDuration: '9s' }} />

      {/* Futuristic Precision Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
        }}
      />

      {/* Dynamic Cursor-Following Plasma Spotlight */}
      <div
        className="fixed -top-48 -left-48 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.14),rgba(168,85,247,0.08),transparent_70%)] blur-3xl transition-opacity duration-300 will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          opacity: mousePos.visible ? 1 : 0,
        }}
      />
    </div>
  );
}
