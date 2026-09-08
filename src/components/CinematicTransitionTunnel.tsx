import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicTransitionTunnelProps {
  isTransitioning: boolean;
  targetSection: string | null;
}

interface SectionConfig {
  title: string;
  badge: string;
  subtext: string;
  primaryColor: string;
  secondaryColor: string;
  speedMultiplier: number;
}

const SECTION_CONFIGS: Record<string, SectionConfig> = {
  about: {
    title: 'IDENTITY CORE',
    badge: 'ENTERING IDENTITY CHAMBER // ABOUT',
    subtext: 'BIOMETRICS & ENGINEERING ETHOS: ACTIVE',
    primaryColor: '#06b6d4',
    secondaryColor: '#8b5cf6',
    speedMultiplier: 1.0,
  },
  skills: {
    title: 'NEURAL TECH MATRIX',
    badge: 'ACTIVATING TECH MATRIX // SKILLS',
    subtext: '4 CATEGORIES • 20+ FRAMEWORKS: SYNCING',
    primaryColor: '#10b981',
    secondaryColor: '#06b6d4',
    speedMultiplier: 1.2,
  },
  projects: {
    title: 'CREATION LAB',
    badge: 'WARPING TO CREATION LAB // PROJECTS',
    subtext: 'AI SYSTEMS • VISION • NLP • FULL-STACK',
    primaryColor: '#a855f7',
    secondaryColor: '#06b6d4',
    speedMultiplier: 1.8,
  },
  milestones: {
    title: 'MISSION TIMELINE',
    badge: 'ACCESSING CHRONOLOGY // MILESTONES',
    subtext: 'UIT AKTU • IIIT ALLAHABAD • CERTIFICATIONS',
    primaryColor: '#f59e0b',
    secondaryColor: '#a855f7',
    speedMultiplier: 1.1,
  },
  contact: {
    title: 'COMMS TERMINAL',
    badge: 'INITIALIZING COMMS ARRAY // CONTACT',
    subtext: 'DIRECT TRANSMISSION CHANNELS: READY',
    primaryColor: '#ec4899',
    secondaryColor: '#06b6d4',
    speedMultiplier: 1.0,
  },
};

export default function CinematicTransitionTunnel({
  isTransitioning,
  targetSection,
}: CinematicTransitionTunnelProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const cleanTarget = (targetSection || 'projects').toLowerCase();
  const config = SECTION_CONFIGS[cleanTarget] || SECTION_CONFIGS.projects;

  useEffect(() => {
    if (!isTransitioning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Particle streak stars
    const numStars = 100;
    const stars = Array.from({ length: numStars }, () => ({
      x: (Math.random() - 0.5) * width * 1.6,
      y: (Math.random() - 0.5) * height * 1.6,
      z: Math.random() * 900 + 100,
      prevZ: 1000,
      color: Math.random() > 0.4 ? config.primaryColor : config.secondaryColor,
      speed: (Math.random() * 35 + 40) * config.speedMultiplier,
    }));

    const render = () => {
      ctx.fillStyle = 'rgba(2, 2, 6, 0.4)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.prevZ = star.z;
        star.z -= star.speed;

        if (star.z <= 15) {
          star.z = 900;
          star.prevZ = 900;
          star.x = (Math.random() - 0.5) * width * 1.6;
          star.y = (Math.random() - 0.5) * height * 1.6;
        }

        const k = 380 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const prevK = 380 / star.prevZ;
        const prevPx = star.x * prevK + cx;
        const prevPy = star.y * prevK + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = Math.min(3, (1 - star.z / 900) * 3.5);
          ctx.shadowBlur = 6;
          ctx.shadowColor = star.color;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTransitioning, config]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9990] pointer-events-none flex items-center justify-center overflow-hidden select-none bg-black/70 backdrop-blur-md"
        >
          {/* Warp Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          {/* Perspective Accelerating Grid Floor */}
          <div
            className="absolute -bottom-24 inset-x-0 h-80 opacity-35"
            style={{
              perspective: '500px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, ${config.primaryColor}55 1px, transparent 1px),
                  linear-gradient(to bottom, ${config.secondaryColor}55 1px, transparent 1px)
                `,
                backgroundSize: '36px 36px',
                transform: 'rotateX(75deg) translateZ(0)',
                transformOrigin: 'bottom center',
                maskImage: 'linear-gradient(to top, black 25%, transparent 95%)',
                WebkitMaskImage: 'linear-gradient(to top, black 25%, transparent 95%)',
              }}
            />
          </div>

          {/* Perspective Accelerating Grid Ceiling */}
          <div
            className="absolute -top-24 inset-x-0 h-80 opacity-35"
            style={{
              perspective: '500px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, ${config.secondaryColor}55 1px, transparent 1px),
                  linear-gradient(to bottom, ${config.primaryColor}55 1px, transparent 1px)
                `,
                backgroundSize: '36px 36px',
                transform: 'rotateX(-75deg) translateZ(0)',
                transformOrigin: 'top center',
                maskImage: 'linear-gradient(to bottom, black 25%, transparent 95%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 25%, transparent 95%)',
              }}
            />
          </div>

          {/* Center Volumetric Pulse */}
          <div
            className="absolute h-80 w-80 rounded-full blur-3xl animate-ping"
            style={{
              background: `radial-gradient(circle, ${config.primaryColor}40, ${config.secondaryColor}25, transparent)`,
              animationDuration: '0.6s',
            }}
          />

          {/* Sci-Fi Cinematic Scene Arrival HUD */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-3.5 rounded-3xl border border-white/20 bg-black/85 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 text-[0.65rem] font-mono tracking-widest uppercase" style={{ color: config.primaryColor }}>
              <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: config.primaryColor }} />
              <span>{config.badge}</span>
            </div>

            <h3 className="mt-1.5 text-xl sm:text-2xl font-black uppercase tracking-widest text-white">
              WARPING TO{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-300">
                {config.title}
              </span>
            </h3>

            <div className="mt-1 flex items-center gap-2 text-[0.65rem] font-mono text-slate-400">
              <span className="text-slate-300">{config.subtext}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

