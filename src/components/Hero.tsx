import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowRight,
  FaFileArrowDown,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaWandMagicSparkles,
  FaLocationDot,
  FaCircleCheck,
} from 'react-icons/fa6';
import { portfolioData } from '../data/portfolioData';
import AIVisualization from './AIVisualization';

interface HeroProps {
  onOpenAI: () => void;
  onNavigate?: (sectionId: string) => void;
  onDownloadResume?: () => void;
}

export default function Hero({ onOpenAI, onNavigate, onDownloadResume }: HeroProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    'AI & MACHINE LEARNING ENGINEER',
    'COMPUTER VISION & NLP SPECIALIST',
    'FULL STACK MERN ARCHITECT',
    'INTELLIGENT SYSTEMS BUILDER',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToSection = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Typography & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Availability Pill & Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono tracking-wider text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#06b6d4]" />
                <span>AI / ML / FULL STACK</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono text-emerald-300 backdrop-blur-md">
                <FaCircleCheck className="text-emerald-400 text-xs" />
                <span>AVAILABLE FOR ROLES</span>
              </div>
            </div>

            {/* Giant Futuristic Headline */}
            <div className="mt-6">
              <p className="text-xs sm:text-sm font-mono tracking-[0.4em] uppercase text-purple-400/90">
                PORTFOLIO OF HARSH SHUKLA
              </p>
              <h1 className="mt-2 text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight uppercase text-white leading-[1.05]">
                HARSH <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">SHUKLA</span>
              </h1>
            </div>

            {/* Dynamic Animated Subtitle Banner */}
            <div className="mt-4 flex items-center gap-2.5 h-10 overflow-hidden">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500">FOCUS //</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="inline-flex items-center rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-1 font-mono text-xs sm:text-sm font-bold text-purple-200 shadow-inner"
                >
                  {roles[currentRoleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Professional Summary Description */}
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl">
              B.Tech Computer Science (AI & ML) student at{' '}
              <span className="text-cyan-300 font-semibold">United Institute of Technology</span>. Architecting
              production-grade machine learning models, computer vision systems, and high-performance full-stack web
              applications.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Explore Projects CTA */}
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105"
              >
                <span>Explore Projects</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Direct Download Official PDF Resume */}
              <a
                href="/Harsh_Shukla_Resume.pdf"
                download="Harsh_Shukla_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-white transition-all duration-300 hover:scale-105 backdrop-blur-md"
              >
                <FaFileArrowDown className="text-cyan-400" />
                <span>Resume (PDF)</span>
              </a>

              {/* Ask Harsh AI Trigger */}
              <button
                onClick={onOpenAI}
                className="inline-flex items-center gap-2 rounded-2xl border border-purple-500/40 bg-purple-950/40 px-4 py-3.5 text-sm font-semibold text-purple-200 hover:border-purple-400 hover:bg-purple-900/60 transition-all duration-300 hover:scale-105 backdrop-blur-md shadow-sm"
              >
                <FaWandMagicSparkles className="text-cyan-300 animate-pulse text-xs" />
                <span>Ask Harsh AI</span>
              </button>
            </div>

            {/* Social Links & Meta Info Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 hover:border-cyan-400/60 hover:text-white transition-all"
              >
                <FaGithub className="text-cyan-400" />
                <span>GitHub</span>
              </a>

              <a
                href={portfolioData.personal.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 hover:border-purple-400/60 hover:text-white transition-all"
              >
                <FaLinkedin className="text-purple-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 hover:border-pink-400/60 hover:text-white transition-all"
              >
                <FaEnvelope className="text-pink-400" />
                <span className="truncate max-w-[140px] sm:max-w-none">{portfolioData.personal.email}</span>
              </a>

              <a
                href={`tel:${portfolioData.personal.phone.replace(/\s+/g, '')}`}
                className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 hover:border-emerald-400/60 hover:text-white transition-all"
              >
                <FaPhone className="text-emerald-400" />
                <span>{portfolioData.personal.phone}</span>
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {portfolioData.stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-3.5 text-left backdrop-blur-md hover:border-cyan-500/40 transition-colors"
                >
                  <p className="text-xl sm:text-2xl font-black text-white font-mono">{stat.value}</p>
                  <p className="text-[0.65rem] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive AI Core Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <AIVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
