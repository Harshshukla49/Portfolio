import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaBars, FaXmark, FaRocket, FaFileArrowDown, FaWandMagicSparkles } from 'react-icons/fa6';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  onOpenAI: () => void;
  onDownloadResume?: () => void;
}

export default function Navbar({ onOpenAI }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Milestones', href: '#milestones' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scrollspy
      const sections = ['hero', 'about', 'skills', 'projects', 'milestones', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
                ? 'border border-white/15 bg-black/75 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl'
                : 'border border-white/10 bg-black/40 backdrop-blur-xl'
            }`}
          >
            {/* Brand / Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-3 text-left group"
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

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 shadow-inner backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase transition-all duration-300 ${
                      isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/40 to-cyan-600/40 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Ask Harsh AI Trigger */}
              <button
                onClick={onOpenAI}
                className="relative inline-flex items-center gap-2 rounded-full border border-purple-500/50 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 px-3.5 py-1.5 text-xs font-semibold text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:border-purple-400 hover:from-purple-800/60 hover:to-cyan-800/60 transition-all duration-300 hover:scale-105"
              >
                <FaWandMagicSparkles className="text-cyan-300 text-xs animate-pulse" />
                <span>Ask AI</span>
              </button>

              {/* Download Official PDF Resume Direct Link */}
              <a
                href="/Harsh_Shukla_Resume.pdf"
                download="Harsh_Shukla_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-white transition-all duration-300 hover:scale-105"
              >
                <FaFileArrowDown className="text-cyan-400 text-xs" />
                <span>Resume (PDF)</span>
              </a>

              {/* Contact Button */}
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1.5 text-xs font-bold text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all duration-300 hover:scale-105"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-white/15 bg-black/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-left text-sm font-medium text-slate-200 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white transition-all"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-slate-500 font-mono">↗</span>
                </button>
              ))}

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

                <a
                  href="/Harsh_Shukla_Resume.pdf"
                  download="Harsh_Shukla_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-slate-300 hover:text-white"
                >
                  <FaFileArrowDown className="text-cyan-400" />
                  <span>Download Resume (PDF)</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
