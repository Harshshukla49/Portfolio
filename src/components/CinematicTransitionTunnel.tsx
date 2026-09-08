import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicTransitionTunnelProps {
  isTransitioning: boolean;
  targetSection: string | null;
}

export default function CinematicTransitionTunnel({
  isTransitioning,
  targetSection,
}: CinematicTransitionTunnelProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    const numStars = 120;
    const stars = Array.from({ length: numStars }, () => ({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 1000 + 100,
      prevZ: 1000,
      color: Math.random() > 0.5 ? '#06b6d4' : '#a855f7',
      speed: Math.random() * 35 + 45,
    }));

    const render = () => {
      ctx.fillStyle = 'rgba(2, 2, 5, 0.35)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.prevZ = star.z;
        star.z -= star.speed;

        if (star.z <= 10) {
          star.z = 1000;
          star.prevZ = 1000;
          star.x = (Math.random() - 0.5) * width * 1.5;
          star.y = (Math.random() - 0.5) * height * 1.5;
        }

        const k = 400 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const prevK = 400 / star.prevZ;
        const prevPx = star.x * prevK + cx;
        const prevPy = star.y * prevK + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = Math.min(3.5, (1 - star.z / 1000) * 4);
          ctx.shadowBlur = 8;
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
  }, [isTransitioning]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9990] pointer-events-none flex items-center justify-center overflow-hidden select-none bg-black/60 backdrop-blur-md"
        >
          {/* Warp Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          {/* Perspective Accelerating Grid Floor */}
          <div
            className="absolute -bottom-32 inset-x-0 h-96 opacity-40 animate-pulse"
            style={{
              perspective: '600px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(6, 182, 212, 0.4) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(168, 85, 247, 0.4) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                transform: 'rotateX(75deg) translateZ(0)',
                transformOrigin: 'bottom center',
                maskImage: 'linear-gradient(to top, black 30%, transparent 95%)',
                WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 95%)',
              }}
            />
          </div>

          {/* Perspective Accelerating Grid Ceiling */}
          <div
            className="absolute -top-32 inset-x-0 h-96 opacity-40 animate-pulse"
            style={{
              perspective: '600px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(168, 85, 247, 0.4) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(6, 182, 212, 0.4) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                transform: 'rotateX(-75deg) translateZ(0)',
                transformOrigin: 'top center',
                maskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)',
              }}
            />
          </div>

          {/* Center Volumetric Lens Flare */}
          <div className="absolute h-96 w-96 rounded-full bg-gradient-to-tr from-purple-600/30 via-cyan-500/30 to-blue-500/20 blur-3xl animate-ping" style={{ animationDuration: '0.8s' }} />

          {/* Sci-Fi Cinematic Scene Arrival HUD */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.15, opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-4 rounded-3xl border border-cyan-400/40 bg-black/80 shadow-[0_0_50px_rgba(6,182,212,0.5)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 text-[0.65rem] font-mono tracking-widest text-cyan-300 uppercase">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>CINEMATIC CAMERA FLIGHT // ACTIVE</span>
            </div>

            <h3 className="mt-2 text-xl sm:text-2xl font-black uppercase tracking-widest text-white">
              WARPING TO{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {targetSection ? targetSection.toUpperCase() : 'SCENE'}
              </span>
            </h3>

            <div className="mt-2 flex items-center gap-3 text-[0.65rem] font-mono text-slate-400">
              <span>FOV: 90°</span>
              <span>•</span>
              <span className="text-emerald-300">GPU ACCELERATED 60 FPS</span>
              <span>•</span>
              <span>DEPTH: 3D SPACE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
