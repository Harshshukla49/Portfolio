import React, { useEffect, useState, useMemo } from 'react';

export default function BackgroundEffects() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, visible: false });

  // Floating ambient 3D stardust particles
  const particles = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.4 + 0.15,
      color: i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#a855f7' : '#38bdf8',
      duration: Math.random() * 15 + 12,
      delay: Math.random() * 5,
    }));
  }, []);

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
      {/* Base Deep Obsidian Universe Black */}
      <div className="absolute inset-0 bg-[#020205]" />

      {/* Atmospheric Cosmic Auroras */}
      <div
        className="absolute top-[-10%] left-[-5%] h-[600px] w-[600px] rounded-full bg-purple-700/10 blur-[160px] animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div
        className="absolute top-[30%] right-[-10%] h-[650px] w-[650px] rounded-full bg-cyan-600/10 blur-[170px] animate-pulse"
        style={{ animationDuration: '10s' }}
      />
      <div
        className="absolute bottom-[10%] left-[10%] h-[550px] w-[550px] rounded-full bg-indigo-700/10 blur-[150px] animate-pulse"
        style={{ animationDuration: '9s' }}
      />

      {/* Futuristic 3D Perspective Digital Horizon Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
        }}
      />

      {/* Floating 3D Stardust Ambient Particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.opacity,
              boxShadow: `0 0 8px ${p.color}`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Dynamic Cursor-Following Volumetric Plasma Spotlight */}
      <div
        className="fixed -top-48 -left-48 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.12),rgba(168,85,247,0.06),transparent_70%)] blur-3xl transition-opacity duration-300 will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          opacity: mousePos.visible ? 1 : 0,
        }}
      />
    </div>
  );
}

