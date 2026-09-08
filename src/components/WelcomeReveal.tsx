import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWandMagicSparkles, FaArrowRight } from 'react-icons/fa6';

interface WelcomeRevealProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export default function WelcomeReveal({ onComplete, forceShow = false }: WelcomeRevealProps) {
  const [phase, setPhase] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check session storage
    if (!forceShow) {
      const hasSeen = sessionStorage.getItem('harsh_intro_seen');
      if (hasSeen === 'true') {
        setIsVisible(false);
        onComplete();
        return;
      }
    }

    // Phase timers
    // 0ms: Black screen & singularity
    // 250ms: Singularity ignites
    // 500ms: WELCOME appears in 3D
    // 900ms: TO THE HARSH emerges
    // 1400ms: Subtitle & tags reveal
    // 2000ms: Camera moves through text
    // 2400ms: Complete and reveal portfolio
    const t1 = setTimeout(() => setPhase(1), 250);
    const t2 = setTimeout(() => setPhase(2), 550);
    const t3 = setTimeout(() => setPhase(3), 950);
    const t4 = setTimeout(() => setPhase(4), 1450);
    const t5 = setTimeout(() => setPhase(5), 2050);
    const t6 = setTimeout(() => {
      handleFinish();
    }, 2450);

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
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [forceShow]);

  // Ambient singularity particles
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 60 }, () => ({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * 800 + 100,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#06b6d4' : '#a855f7',
    }));

    const render = () => {
      ctx.fillStyle = 'rgba(2, 2, 6, 0.4)';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      particles.forEach((p) => {
        p.z -= 4;
        if (p.z <= 10) p.z = 900;

        const k = 350 / p.z;
        const px = p.x * k + cx;
        const py = p.y * k + cy;

        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          ctx.beginPath();
          ctx.arc(px, py, p.size * k, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
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
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#020205] text-white select-none overflow-hidden cursor-pointer"
          onClick={handleFinish}
        >
          {/* Ambient Cosmic Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Glowing Radial Core */}
          <div className="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-purple-600/20 via-cyan-500/15 to-transparent blur-[120px] pointer-events-none" />

          {/* 3D Cinematic Scene Container */}
          <div
            className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl"
            style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
          >
            {/* Top HUD Telemetry */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono tracking-[0.25em] text-cyan-300 backdrop-blur-md mb-6"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>INITIALIZING NEURAL PORTFOLIO SYSTEM</span>
            </motion.div>

            {/* Main 3D Title Sequence */}
            <div className="relative overflow-hidden py-2" style={{ transformStyle: 'preserve-3d' }}>
              {/* "WELCOME" */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.5, z: -400, filter: 'blur(12px)' }}
                animate={
                  phase >= 2
                    ? {
                        opacity: 1,
                        scale: phase >= 5 ? 1.35 : 1,
                        z: phase >= 5 ? 150 : 0,
                        filter: 'blur(0px)',
                      }
                    : { opacity: 0, scale: 0.5, z: -400, filter: 'blur(12px)' }
                }
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-[0.2em] text-white font-mono leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                WELCOME
              </motion.h1>

              {/* "TO THE HARSH" */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.6, y: 25, z: -300, filter: 'blur(10px)' }}
                animate={
                  phase >= 3
                    ? {
                        opacity: 1,
                        scale: phase >= 5 ? 1.4 : 1,
                        y: 0,
                        z: phase >= 5 ? 200 : 0,
                        filter: 'blur(0px)',
                      }
                    : { opacity: 0, scale: 0.6, y: 25, z: -300, filter: 'blur(10px)' }
                }
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="mt-2 text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]"
              >
                TO THE HARSH
              </motion.h2>
            </div>

            {/* Subtitle Line */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5 }}
              className="mt-6 text-sm sm:text-lg font-medium text-slate-300 tracking-wider"
            >
              Where code meets creativity & applied intelligence.
            </motion.p>

            {/* Discipline Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={phase >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[0.65rem] sm:text-xs font-mono text-slate-400"
            >
              <span className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-purple-300">
                AI & ML ENGINEER
              </span>
              <span className="text-slate-600">•</span>
              <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-cyan-300">
                FULL STACK ARCHITECT
              </span>
              <span className="text-slate-600">•</span>
              <span className="rounded-lg border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-pink-300">
                CREATIVE BUILDER
              </span>
            </motion.div>
          </div>

          {/* Bottom Interactive Skip Prompt */}
          <div className="absolute bottom-8 inset-x-0 flex items-center justify-between px-8 text-xs font-mono text-slate-500">
            <span className="hidden sm:inline-block">PRESS [ESC] OR CLICK ANYWHERE TO ENTER</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFinish();
              }}
              className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-white transition-all shadow-lg"
            >
              <span>ENTER NOW</span>
              <FaArrowRight className="text-cyan-400 text-[0.7rem]" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
