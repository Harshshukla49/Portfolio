import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaBrain, FaCode, FaRocket } from 'react-icons/fa6';
import { portfolioData } from '../data/portfolioData';

interface WelcomeRevealProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export default function WelcomeReveal({ onComplete, forceShow = false }: WelcomeRevealProps) {
  const [phase, setPhase] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setPhase(0);
    setIsVisible(true);

    // Crisp reveal within ~1s, then remains visible for 10 seconds total
    const t1 = setTimeout(() => setPhase(1), 150);
    const t2 = setTimeout(() => setPhase(2), 260);
    const t3 = setTimeout(() => setPhase(3), 420);
    const t4 = setTimeout(() => setPhase(4), 560);
    const t5 = setTimeout(() => setPhase(5), 680);
    const t6 = setTimeout(() => setPhase(6), 820);
    const t7 = setTimeout(() => {
      handleFinish();
    }, 10000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [forceShow]);

  // Subtle ambient stardust canvas
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 45 }, () => ({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * 800 + 100,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#06b6d4' : '#a855f7',
    }));

    const render = () => {
      ctx.fillStyle = 'rgba(2, 2, 5, 0.35)';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      particles.forEach((p) => {
        p.z -= 3;
        if (p.z <= 10) p.z = 900;

        const k = 350 / p.z;
        const px = p.x * k + cx;
        const py = p.y * k + cy;

        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          ctx.beginPath();
          ctx.arc(px, py, p.size * k, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [isVisible]);

  const handleFinish = () => {
    sessionStorage.setItem('harsh_intro_seen', 'true');
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#020205] text-white select-none overflow-hidden cursor-pointer px-4"
          onClick={handleFinish}
        >
          {/* Ambient Cosmic Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Ambient Lighting Volumetric Glows */}
          <div className="absolute top-1/3 h-80 w-80 rounded-full bg-purple-600/20 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/3 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px] pointer-events-none" />

          {/* 3D Cinematic Scene Layout Container */}
          <div
            className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl w-full"
            style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
          >
            {/* Top Micro-HUD Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3.5 py-1 text-[0.65rem] sm:text-xs font-mono tracking-[0.25em] text-cyan-300 backdrop-blur-md mb-4"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06b6d4]" />
              <span>DIGITAL REALM // INITIALIZED</span>
            </motion.div>

            {/* Typography Section (Title + Subtitle) */}
            <div className="flex flex-col items-center" style={{ transformStyle: 'preserve-3d' }}>
              {/* "WELCOME" */}
              <motion.h2
                initial={{ opacity: 0, y: 15, z: -80 }}
                animate={
                  phase >= 2
                    ? { opacity: 1, y: 0, z: 0 }
                    : { opacity: 0, y: 15, z: -80 }
                }
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.25em] text-slate-300 font-mono leading-none"
              >
                WELCOME
              </motion.h2>

              {/* "TO THE HARSH" */}
              <motion.h1
                initial={{ opacity: 0, y: 20, z: -100, scale: 0.95 }}
                animate={
                  phase >= 3
                    ? { opacity: 1, y: 0, z: 0, scale: 1 }
                    : { opacity: 0, y: 20, z: -100, scale: 0.95 }
                }
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mt-1.5 text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]"
              >
                TO THE HARSH
              </motion.h1>

              {/* Secondary Line */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="mt-2 text-xs sm:text-base font-medium text-slate-300 tracking-wider"
              >
                Where code meets creativity.
              </motion.p>
            </div>

            {/* Profile Image in Perfect Circular Futuristic Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, z: -120 }}
              animate={
                phase >= 5
                  ? { opacity: 1, scale: 1, z: 0 }
                  : { opacity: 0, scale: 0.82, z: -120 }
              }
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative my-5 sm:my-6 flex items-center justify-center group"
            >
              {/* Outer Rotating Accent Ring */}
              <div className="absolute -inset-2.5 rounded-full border border-dashed border-cyan-400/30 animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-1 rounded-full border border-purple-500/30 animate-[spin_15s_linear_infinite_reverse]" />

              {/* Glowing Outer Atmosphere Ring */}
              <div className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48 rounded-full p-[3px] bg-gradient-to-tr from-purple-600 via-cyan-400 to-indigo-500 shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                {/* Floating Inner Portrait Circle */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative h-full w-full rounded-full overflow-hidden bg-slate-900 border-2 border-black/80 shadow-2xl"
                >
                  <img
                    src={portfolioData.personal.photoUrl}
                    alt="Harsh Shukla"
                    className="h-full w-full object-cover object-[center_20%] filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  {/* Subtle Inner Glass Horizon Light */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              </div>
            </motion.div>

            {/* Bottom Developer Identity & Tagline */}
            <div className="flex flex-col items-center">
              {/* Small Label Badges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={phase >= 6 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="inline-flex flex-wrap items-center justify-center gap-2 font-mono text-[0.65rem] sm:text-xs text-slate-300 font-semibold uppercase tracking-wider"
              >
                <span className="rounded-lg border border-purple-500/40 bg-purple-500/10 px-2.5 py-1 text-purple-300">
                  DEVELOPER
                </span>
                <span className="text-slate-600">•</span>
                <span className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 text-cyan-300">
                  BUILDER
                </span>
                <span className="text-slate-600">•</span>
                <span className="rounded-lg border border-pink-500/40 bg-pink-500/10 px-2.5 py-1 text-pink-300">
                  CREATOR
                </span>
              </motion.div>

              {/* Supporting Line */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={phase >= 6 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-2.5 text-[0.7rem] sm:text-xs font-mono text-slate-400 tracking-wide"
              >
                Explore my world of ideas, technology & innovation.
              </motion.p>
            </div>
          </div>

          {/* Bottom Fast Enter Indicator & 10s Timer */}
          <div className="absolute bottom-6 inset-x-0 flex items-center justify-between px-6 sm:px-10 text-[0.7rem] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>AUTO-ENTERING IN 10S // CLICK ANYWHERE OR PRESS [ESC]</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFinish();
              }}
              className="ml-auto inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:scale-105 active:scale-95"
            >
              <span>ENTER NOW</span>
              <FaArrowRight className="text-[0.65rem]" />
            </button>
          </div>

          {/* 10-Second Visual Progress Line */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 10, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 shadow-[0_0_10px_#06b6d4]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

