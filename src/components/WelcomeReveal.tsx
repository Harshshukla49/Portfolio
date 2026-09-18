import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowRight,
  FaVolumeHigh,
  FaVolumeXmark,
  FaPlay,
  FaBrain,
  FaWandMagicSparkles,
  FaForward,
  FaCircleCheck,
} from 'react-icons/fa6';
import { portfolioData } from '../data/portfolioData';

interface WelcomeRevealProps {
  onComplete: () => void;
  forceShow?: boolean;
}

type VoiceState =
  | 'initializing'
  | 'ready'
  | 'speaking'
  | 'muted'
  | 'completed'
  | 'skipped';

const WELCOME_VOICE_SCRIPT =
  "Welcome to Harsh Shukla's digital world. I'm Harsh's AI portfolio assistant. I'll guide you through his projects, skills, education, and technical journey. Let's explore.";

export default function WelcomeReveal({
  onComplete,
  forceShow = false,
}: WelcomeRevealProps) {
  const [phase, setPhase] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isEntering, setIsEntering] = useState<boolean>(false);
  const [voiceState, setVoiceState] = useState<VoiceState>('initializing');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [waveformBars, setWaveformBars] = useState<number[]>(
    Array(16).fill(15)
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const waveformAnimRef = useRef<number | null>(null);
  const autoEnterTimerRef = useRef<number | null>(null);

  // Stop all active speech cleanly
  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // Fallback catch
      }
    }
  }, []);

  // Initialize and select the best available natural English voice
  const getPreferredVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Preference: Google / Natural English / Samantha / Microsoft Natural
    const preferredOrder = [
      (v: SpeechSynthesisVoice) =>
        v.name.includes('Google') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) =>
        v.name.includes('Samantha') || v.name.includes('Jenny'),
      (v: SpeechSynthesisVoice) =>
        v.name.includes('Natural') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) =>
        v.lang === 'en-US' || v.lang === 'en-GB' || v.lang === 'en-IN',
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en'),
    ];

    for (const test of preferredOrder) {
      const match = voices.find(test);
      if (match) return match;
    }

    return voices[0] || null;
  }, []);

  // Speak AI welcome greeting
  const speakWelcomeVoice = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setVoiceState('completed');
      return;
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(WELCOME_VOICE_SCRIPT);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = isMuted ? 0 : 1.0;

      const voice = getPreferredVoice();
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => {
        if (!isMuted) {
          setVoiceState('speaking');
        }
      };

      utterance.onend = () => {
        setVoiceState('completed');
      };

      utterance.onerror = () => {
        setVoiceState('ready');
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setVoiceState('ready');
    }
  }, [getPreferredVoice, isMuted]);

  // Voice Initialization & 100% Automatic Speech Trigger
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setVoiceState('ready');
      return;
    }

    let hasTriggered = false;

    const autoStartVoice = () => {
      if (hasTriggered) return;
      hasTriggered = true;
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch (e) {}
      speakWelcomeVoice();
    };

    // 1. Immediate speech attempt
    autoStartVoice();

    // 2. Delayed fallback for voice engine loading
    const timer1 = setTimeout(() => {
      autoStartVoice();
    }, 300);

    const timer2 = setTimeout(() => {
      if (!window.speechSynthesis.speaking) {
        autoStartVoice();
      }
    }, 800);

    // 3. When browser voice list finishes loading
    const handleVoicesChanged = () => {
      autoStartVoice();
    };
    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

    // 4. Fallback listener on any first micro-interaction in case browser restricts zero-gesture audio
    const handleFirstGesture = () => {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch (e) {}
      if (!window.speechSynthesis.speaking) {
        speakWelcomeVoice();
      }
      cleanupGestureListeners();
    };

    const cleanupGestureListeners = () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('mousemove', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { passive: true, once: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true, once: true });
    window.addEventListener('mousemove', handleFirstGesture, { passive: true, once: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true, once: true });
    window.addEventListener('scroll', handleFirstGesture, { passive: true, once: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      cleanupGestureListeners();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [speakWelcomeVoice]);

  // Handle Mute / Unmute Toggle
  const handleToggleVoice = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (isMuted || voiceState === 'muted') {
      setIsMuted(false);
      speakWelcomeVoice();
    } else {
      setIsMuted(true);
      setVoiceState('muted');
      stopSpeech();
    }
  };

  // Waveform modulation animation during speech
  useEffect(() => {
    if (voiceState === 'speaking' && !isMuted) {
      let frame = 0;
      const animateWaveform = () => {
        frame++;
        if (frame % 2 === 0) {
          setWaveformBars(
            Array.from({ length: 16 }, (_, i) => {
              const base = Math.sin((frame * 0.15) + i * 0.5) * 35 + 45;
              const noise = (Math.random() - 0.5) * 20;
              return Math.max(12, Math.min(95, base + noise));
            })
          );
        }
        waveformAnimRef.current = requestAnimationFrame(animateWaveform);
      };
      waveformAnimRef.current = requestAnimationFrame(animateWaveform);
    } else {
      setWaveformBars(Array(16).fill(12));
      if (waveformAnimRef.current) {
        cancelAnimationFrame(waveformAnimRef.current);
      }
    }

    return () => {
      if (waveformAnimRef.current) {
        cancelAnimationFrame(waveformAnimRef.current);
      }
    };
  }, [voiceState, isMuted]);

  // Visual Entrance Phases
  useEffect(() => {
    setPhase(0);
    setIsVisible(true);
    setIsEntering(false);

    const t1 = setTimeout(() => setPhase(1), 120);
    const t2 = setTimeout(() => setPhase(2), 300);
    const t3 = setTimeout(() => setPhase(3), 450);
    const t4 = setTimeout(() => setPhase(4), 600);
    const t5 = setTimeout(() => setPhase(5), 750);

    // Auto-enter timer after 10s
    autoEnterTimerRef.current = window.setTimeout(() => {
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
      if (autoEnterTimerRef.current) {
        clearTimeout(autoEnterTimerRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [forceShow]);

  // Ambient Stardust Canvas
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 40 }, () => ({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * 800 + 100,
      size: Math.random() * 1.8 + 0.8,
      color:
        Math.random() > 0.5
          ? 'rgba(6,182,212,0.85)'
          : 'rgba(168,85,247,0.85)',
    }));

    const render = () => {
      ctx.fillStyle = 'rgba(2, 2, 6, 0.35)';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      particles.forEach((p) => {
        p.z -= isEntering ? 12 : 2;
        if (p.z <= 10) p.z = 900;

        const k = 350 / p.z;
        const px = p.x * k + cx;
        const py = p.y * k + cy;

        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          ctx.beginPath();
          ctx.arc(px, py, p.size * k * (isEntering ? 1.5 : 1), 0, Math.PI * 2);
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
  }, [isVisible, isEntering]);

  // Fast 450ms 3D Cinematic Enter Experience
  const handleFinish = () => {
    stopSpeech();
    if (autoEnterTimerRef.current) {
      clearTimeout(autoEnterTimerRef.current);
    }
    setIsEntering(true);

    sessionStorage.setItem('harsh_intro_seen', 'true');

    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 450);
  };

  // Fast Skip Action
  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleFinish();
  };

  if (!isVisible) return null;

  const isSpeaking = voiceState === 'speaking' && !isMuted;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.12,
            filter: 'blur(10px)',
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#020206] text-white select-none overflow-hidden cursor-default px-4"
          onClick={() => {
            if (voiceState === 'ready' || voiceState === 'initializing') {
              speakWelcomeVoice();
            }
          }}
        >
          {/* Ambient Cosmic Particles Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
          />

          {/* Background Ambient Volumetric Light Glows */}
          <div
            className={`absolute top-1/4 h-96 w-96 rounded-full blur-[130px] pointer-events-none transition-all duration-700 ${
              isSpeaking
                ? 'bg-cyan-500/25 scale-125'
                : 'bg-purple-600/15 scale-100'
            }`}
          />
          <div
            className={`absolute bottom-1/4 h-96 w-96 rounded-full blur-[130px] pointer-events-none transition-all duration-700 ${
              isSpeaking
                ? 'bg-purple-600/25 scale-125'
                : 'bg-cyan-500/15 scale-100'
            }`}
          />

          {/* Top Floating Control Bar */}
          <div className="absolute top-5 sm:top-7 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 pointer-events-auto">
            {/* AI Assistant Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3.5 py-1.5 text-[0.65rem] sm:text-xs font-mono backdrop-blur-xl shadow-lg">
              <span
                className={`h-2 w-2 rounded-full transition-all ${
                  isSpeaking
                    ? 'bg-cyan-400 animate-ping shadow-[0_0_10px_#06b6d4]'
                    : isMuted
                    ? 'bg-slate-500'
                    : 'bg-emerald-400 shadow-[0_0_8px_#10b981]'
                }`}
              />
              <span className="text-slate-200 font-semibold tracking-wider uppercase">
                {isSpeaking
                  ? 'AI SPEAKING...'
                  : isMuted
                  ? 'AI VOICE MUTED'
                  : 'AI ONLINE // PORTFOLIO INTELLIGENCE'}
              </span>
            </div>

            {/* Top Right Quick Actions (Voice Toggle & Skip) */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleVoice}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-mono font-semibold transition-all backdrop-blur-md active:scale-95 ${
                  isMuted
                    ? 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                    : 'border-cyan-400/60 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                }`}
                title={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
                aria-label="Toggle AI Voice"
              >
                {isMuted ? (
                  <>
                    <FaVolumeXmark className="text-xs text-slate-400" />
                    <span className="hidden sm:inline">MUTED</span>
                  </>
                ) : (
                  <>
                    <FaVolumeHigh className="text-xs animate-bounce text-cyan-300" />
                    <span className="hidden sm:inline">AI VOICE ON</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSkip}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-slate-400 hover:border-white/20 hover:text-white transition-all active:scale-95"
                title="Skip to Portfolio"
                aria-label="Skip Welcome Intro"
              >
                <span>SKIP INTRO</span>
                <FaForward className="text-[0.65rem]" />
              </button>
            </div>
          </div>

          {/* 3D Cinematic Scene Layout Container */}
          <div
            className={`relative z-10 flex flex-col items-center justify-center text-center max-w-2xl w-full transition-transform duration-500 ${
              isEntering ? 'scale-105 -translate-y-2' : 'scale-100'
            }`}
            style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
          >
            {/* Top Micro-HUD Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={
                phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }
              }
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-1 text-[0.65rem] sm:text-xs font-mono tracking-[0.25em] text-purple-300 backdrop-blur-md mb-2 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            >
              <FaWandMagicSparkles className="text-cyan-300 text-xs animate-pulse" />
              <span>DIGITAL WORLD // HARSH SHUKLA</span>
            </motion.div>

            {/* Typography Section (Title + Subtitle) */}
            <div
              className="flex flex-col items-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Main Title: "ENTER HARSH'S WORLD" */}
              <motion.h1
                initial={{ opacity: 0, y: 15, z: -80, scale: 0.95 }}
                animate={
                  phase >= 2
                    ? { opacity: 1, y: 0, z: 0, scale: 1 }
                    : { opacity: 0, y: 15, z: -80, scale: 0.95 }
                }
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]"
              >
                ENTER HARSH'S WORLD
              </motion.h1>

              {/* Secondary Line: "Where code meets creativity." */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={
                  phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                }
                transition={{ duration: 0.4 }}
                className="mt-1.5 text-xs sm:text-base font-medium text-slate-300 tracking-wider"
              >
                Where code meets creativity.
              </motion.p>
            </div>

            {/* Profile Image with Dynamic AI Voice Visualizer Rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, z: -80 }}
              animate={
                phase >= 3
                  ? { opacity: 1, scale: 1, z: 0 }
                  : { opacity: 0, scale: 0.9, z: -80 }
              }
              transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
              className="relative my-4 sm:my-5 flex items-center justify-center group"
            >
              {/* Outer Reactive Voice Expanding Waves (Active while Speaking) */}
              <AnimatePresence>
                {isSpeaking && (
                  <>
                    <motion.div
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: [1, 1.35, 1.6], opacity: [0.8, 0.4, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                      className="absolute h-40 w-40 sm:h-52 sm:w-52 rounded-full border border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.4)] pointer-events-none -z-10"
                    />
                    <motion.div
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ scale: [1, 1.45, 1.8], opacity: [0.7, 0.3, 0] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: 0.6,
                        ease: 'easeOut',
                      }}
                      className="absolute h-40 w-40 sm:h-52 sm:w-52 rounded-full border border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.4)] pointer-events-none -z-10"
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Segmented Rotating Cyber Reticle Arc */}
              <div
                className={`absolute -inset-3 sm:-inset-4 rounded-full border border-dashed border-cyan-400/30 transition-all duration-700 pointer-events-none ${
                  isSpeaking ? 'animate-spin-slow border-cyan-400/60' : 'opacity-40'
                }`}
              />

              {/* Subtle Glowing Rim Frame */}
              <div
                className={`relative h-32 w-32 sm:h-44 sm:w-44 md:h-48 md:w-48 rounded-full p-[2px] transition-all duration-500 ${
                  isSpeaking
                    ? 'bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_45px_rgba(6,182,212,0.55)] scale-105'
                    : 'bg-gradient-to-tr from-purple-500/50 via-cyan-400/60 to-indigo-500/50 shadow-[0_0_35px_rgba(6,182,212,0.3)]'
                }`}
              >
                {/* Inner Portrait Circle */}
                <div className="relative h-full w-full rounded-full overflow-hidden bg-slate-900 border border-white/20 shadow-2xl">
                  <img
                    src={portfolioData.personal.photoUrl}
                    alt="Harsh Shukla"
                    className={`h-full w-full object-cover object-[center_20%] filter brightness-105 contrast-105 transition-transform duration-500 ${
                      isSpeaking ? 'scale-105' : 'scale-100'
                    }`}
                    loading="eager"
                  />
                  {/* Subtle Inner Glass Horizon Light */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>

            {/* Live Audio Waveform Visualizer HUD */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0 }}
              className="flex items-center justify-center gap-1 my-2 h-6 px-4"
            >
              {waveformBars.map((height, idx) => (
                <span
                  key={idx}
                  style={{
                    height: `${height}%`,
                    backgroundColor:
                      isSpeaking
                        ? idx % 2 === 0
                          ? '#06b6d4'
                          : '#a855f7'
                        : 'rgba(255,255,255,0.2)',
                  }}
                  className={`w-1 sm:w-1.5 rounded-full transition-all duration-100 ${
                    isSpeaking ? 'shadow-[0_0_8px_#06b6d4]' : ''
                  }`}
                />
              ))}
            </motion.div>

            {/* Bottom Developer Identity & Tagline */}
            <div className="flex flex-col items-center mt-1">
              {/* Pillar Badges */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={
                  phase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                }
                transition={{ duration: 0.4 }}
                className="inline-flex flex-wrap items-center justify-center gap-2 font-mono text-[0.65rem] sm:text-xs text-slate-300 font-semibold uppercase tracking-wider"
              >
                <span className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-purple-300">
                  AI • ML
                </span>
                <span className="text-slate-600">•</span>
                <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-cyan-300">
                  FULL STACK
                </span>
                <span className="text-slate-600">•</span>
                <span className="rounded-lg border border-pink-500/30 bg-pink-500/10 px-2.5 py-1 text-pink-300">
                  SYSTEMS
                </span>
              </motion.div>

              {/* Status Line */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={phase >= 5 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-2 text-[0.7rem] sm:text-xs font-mono text-cyan-300/80 tracking-wide"
              >
                Your AI-guided portfolio experience is ready.
              </motion.p>
            </div>
          </div>

          {/* Bottom Fast Enter Action Bar & 10s Timer */}
          <div className="absolute bottom-6 inset-x-0 flex items-center justify-between px-6 sm:px-10 text-[0.7rem] font-mono text-slate-400 z-20">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="hidden sm:inline">
                AUTO-ENTERING IN 10S // CLICK ANYWHERE OR PRESS [ENTER]
              </span>
              <span className="sm:hidden">AUTO-ENTERING IN 10S</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFinish();
              }}
              className="ml-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 px-5 py-2 text-xs font-bold text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all hover:scale-105 active:scale-95"
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
