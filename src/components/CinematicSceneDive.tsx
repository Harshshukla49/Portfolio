import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicSceneDiveProps {
  isTransitioning: boolean;
  targetSection: string | null;
}

interface SectionTheme {
  accent: string;
  glow: string;
  secondary: string;
}

const SECTION_THEMES: Record<string, SectionTheme> = {
  about: {
    accent: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.4)',
    secondary: '#3b82f6',
  },
  skills: {
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.4)',
    secondary: '#818cf8',
  },
  projects: {
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.5)',
    secondary: '#06b6d4',
  },
  milestones: {
    accent: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.4)',
    secondary: '#ec4899',
  },
  contact: {
    accent: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.4)',
    secondary: '#8b5cf6',
  },
};

export default function CinematicSceneDive({
  isTransitioning,
  targetSection,
}: CinematicSceneDiveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cleanTarget = (targetSection || 'projects').toLowerCase();
  const theme = SECTION_THEMES[cleanTarget] || SECTION_THEMES.about;

  // Never render transition dive overlay on projects section to keep the 3D orbit showcase crystal clear
  if (cleanTarget === 'projects') {
    return null;
  }

  // GPU Canvas: 3D Camera Travel Particle Streaks
  useEffect(() => {
    if (!isTransitioning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    const cx = w / 2;
    const cy = h / 2;

    // Fast 3D camera travel particles
    const particles = Array.from({ length: 45 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 80 + 10;
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        z: Math.random() * 400 + 50,
        pz: Math.random() * 400 + 50,
        speed: Math.random() * 16 + 18,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? theme.accent : theme.secondary,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.pz = p.z;
        p.z -= p.speed;

        if (p.z <= 5) {
          p.z = 500;
          p.pz = 500;
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * 80 + 10;
          p.x = Math.cos(angle) * dist;
          p.y = Math.sin(angle) * dist;
        }

        const k = 280 / p.z;
        const pk = 280 / p.pz;

        const sx = p.x * k + cx;
        const sy = p.y * k + cy;
        const px = p.x * pk + cx;
        const py = p.y * pk + cy;

        if (sx >= 0 && sx <= w && sy >= 0 && sy <= h) {
          const alpha = Math.min(1, (500 - p.z) / 250);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = Math.max(1, p.size * k * 0.7);
          ctx.globalAlpha = alpha * 0.6;
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isTransitioning, theme]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[9990] pointer-events-none select-none flex items-center justify-center overflow-hidden">
          {/* Particle Velocity Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Elegant Circular Glowing Portal / Energy Ring (3-Second Experience) */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{
              scale: [0.3, 0.85, 1.05, 1.55],
              opacity: [0, 0.85, 0.7, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3.0,
              times: [0, 0.2, 0.75, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex items-center justify-center pointer-events-none"
          >
            {/* Outer Soft Atmosphere Ring */}
            <div
              className="h-80 w-80 sm:h-[440px] sm:w-[440px] rounded-full border border-white/20 blur-[1px]"
              style={{
                boxShadow: `0 0 70px ${theme.glow}, inset 0 0 50px ${theme.glow}`,
                borderColor: theme.accent,
              }}
            />

            {/* Inner Concentric Crisp Ring */}
            <div
              className="absolute h-56 w-56 sm:h-72 sm:w-72 rounded-full border border-white/40"
              style={{
                boxShadow: `0 0 35px ${theme.glow}`,
              }}
            />

            {/* Center Volumetric Iris Light */}
            <div
              className="absolute h-36 w-36 rounded-full blur-2xl"
              style={{
                backgroundColor: theme.accent,
                opacity: 0.3,
              }}
            />
          </motion.div>

          {/* Anamorphic Horizontal Horizon Flare Sweep */}
          <motion.div
            initial={{ scaleX: 0.1, opacity: 0 }}
            animate={{
              scaleX: [0.1, 1.0, 1.3, 1.8],
              opacity: [0, 0.5, 0.35, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3.0,
              times: [0, 0.2, 0.75, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-x-0 h-[1px] blur-sm pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${theme.accent} 50%, transparent 100%)`,
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
