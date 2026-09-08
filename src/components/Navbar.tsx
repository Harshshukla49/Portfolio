import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaBars, FaXmark, FaRocket, FaFileArrowDown, FaWandMagicSparkles, FaTv } from 'react-icons/fa6';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
  onOpenAI: () => void;
  onDownloadResume?: () => void;
  onReplayIntro?: () => void;
}

export default function Navbar({
  activeSection = 'hero',
  onNavigate,
  onOpenAI,
  onDownloadResume,
  onReplayIntro,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Milestones', id: 'milestones' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
              scrolled
                ? 'border border-white/15 bg-black/85 shadow-[0_15px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl'
                : 'border border-white/10 bg-black/50 backdrop-blur-xl shadow-lg'
            }`}
          >
            {/* Brand / Logo */}
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-3 text-left group select-none active:scale-95 transition-transform"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform">
                <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-black/90">
                  <FaBrain className="text-cyan-300 text-lg group-hover:text-purple-300 transition-colors" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold tracking-wider text-white uppercase group-hover:text-cyan-300 transition-colors">
                    {portfolioData.personal.name}
                  </span>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
                </div>
                <p className="text-[0.65rem] font-mono tracking-widest text-slate-400 uppercase">
                  AI & ML ENGINEER
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links (Cinematic Scene Selectors) */}
            <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1.5 shadow-inner backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const isHovered = hoveredNav === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => setHoveredNav(item.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className={`relative rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase transition-all duration-200 select-none active:scale-95 ${
                      isActive
                        ? 'text-white font-bold'
                        : isHovered
                        ? 'text-cyan-300 -translate-y-0.5 scale-[1.03]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {/* Active Scene Indicator Capsule */}
                    {isActive && (
                      <motion.div
                        layoutId="cinematicActiveNavIndicator"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/60 via-indigo-600/60 to-cyan-500/60 border border-cyan-400/70 shadow-[0_0_20px_rgba(6,182,212,0.45)] -z-10"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}

                    {/* Subtle Hover Glow Pill */}
                    {isHovered && !isActive && (
                      <motion.div
                        layoutId="cinematicHoverNavIndicator"
                        className="absolute inset-0 rounded-full bg-white/5 border border-white/15 -z-10"
                        transition={{ duration: 0.15 }}
                      />
                    )}

                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Optional Replay Intro Trigger */}
              {onReplayIntro && (
                <button
                  onClick={onReplayIntro}
                  title="Replay 3D Cinematic Intro"
                  className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:border-cyan-400 hover:text-cyan-300 transition-all hover:scale-105"
                  aria-label="Replay Cinematic Intro"
                >
                  <FaTv className="text-xs" />
                </button>
              )}

              {/* Ask Harsh AI Trigger */}
              <button
                onClick={onOpenAI}
                className="relative inline-flex items-center gap-2 rounded-full border border-purple-500/50 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 px-3.5 py-1.5 text-xs font-semibold text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:border-purple-400 hover:from-purple-800/60 hover:to-cyan-800/60 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FaWandMagicSparkles className="text-cyan-300 text-xs animate-pulse" />
                <span>Ask AI</span>
              </button>

              {/* Download Official PDF Resume Direct Link */}
              <button
                onClick={onDownloadResume || (() => window.open('/Harsh_Shukla_Resume.pdf', '_blank'))}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FaFileArrowDown className="text-cyan-400 text-xs" />
                <span>Resume (PDF)</span>
              </button>

              {/* Contact Button */}
              <button
                onClick={() => handleNavClick('contact')}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1.5 text-xs font-bold text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FaRocket className="text-black text-xs" />
                <span>Let's Talk</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={onOpenAI}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-400/40 bg-purple-500/20 text-cyan-300"
                aria-label="Open AI Assistant"
              >
                <FaWandMagicSparkles className="text-xs animate-pulse" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <FaXmark /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-white/15 bg-black/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                      isActive
                        ? 'border-cyan-400/50 bg-gradient-to-r from-purple-600/30 to-cyan-500/30 text-white font-bold'
                        : 'border-white/5 bg-white/[0.03] text-slate-200 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-slate-500 font-mono">↗</span>
                  </button>
                );
              })}

              <div className="mt-3 flex flex-col gap-2.5 pt-3 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAI();
                  }}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-600/30 py-3 text-sm font-bold text-purple-200 shadow-md"
                >
                  <FaWandMagicSparkles className="text-cyan-300" />
                  <span>✦ Launch Harsh AI</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onDownloadResume) onDownloadResume();
                    else window.open('/Harsh_Shukla_Resume.pdf', '_blank');
                  }}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-slate-300 hover:text-white"
                >
                  <FaFileArrowDown className="text-cyan-400" />
                  <span>Download Resume (PDF)</span>
                </button>

                {onReplayIntro && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onReplayIntro();
                    }}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-2.5 text-xs font-mono text-slate-400 hover:text-cyan-300"
                  >
                    <FaTv className="text-xs" />
                    <span>Replay 3D Cinematic Intro</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


