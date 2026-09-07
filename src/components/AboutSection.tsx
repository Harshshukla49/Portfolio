import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaBrain,
  FaCode,
  FaEye,
  FaDatabase,
  FaCircleCheck,
  FaShieldHalved,
  FaTerminal,
} from 'react-icons/fa6';
import { portfolioData } from '../data/portfolioData';

export default function AboutSection() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const pillarIcons: Record<string, React.ReactNode> = {
    brain: <FaBrain className="text-xl text-purple-400" />,
    code: <FaCode className="text-xl text-cyan-400" />,
    eye: <FaEye className="text-xl text-pink-400" />,
    database: <FaDatabase className="text-xl text-emerald-400" />,
  };

  return (
    <section id="about" className="relative scroll-mt-24 py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-purple-300 uppercase">
            <FaTerminal className="text-xs text-cyan-400" />
            <span>WHO I AM // IDENTITY</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            BUILDING INTELLIGENT SYSTEMS WITH{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              CODE, DATA & AI.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {portfolioData.about.subheading}
          </p>
        </div>

        {/* Profile Card & Narrative Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Cybernetic Photo Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ rotateX: tilt.y, rotateY: tilt.x }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ perspective: 1000 }}
              className="relative w-full max-w-md rounded-3xl p-1 bg-gradient-to-b from-purple-500/40 via-cyan-500/20 to-transparent shadow-[0_20px_60px_rgba(168,85,247,0.3)] backdrop-blur-2xl group"
            >
              <div className="relative overflow-hidden rounded-[22px] border border-white/15 bg-black/80 p-5">
                {/* Top Cybernetic HUD bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-[0.7rem] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-cyan-300 font-bold uppercase tracking-wider">HARSH SHUKLA</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <FaShieldHalved className="text-purple-400" />
                    <span>VERIFIED PROFILE</span>
                  </div>
                </div>

                {/* Profile Photo with Ambient Glow Effect */}
                <div className="relative mt-4 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl">
                  <img
                    src={portfolioData.personal.photoUrl}
                    alt="Harsh Shukla - AI & Machine Learning Engineer"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-105 contrast-105"
                    loading="eager"
                  />
                  {/* Subtle futuristic scanline and gradient lighting */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.25),transparent_60%)]" />

                  {/* Bottom Photo Overlay Badges */}
                  <div className="absolute bottom-4 inset-x-4 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between rounded-xl border border-white/20 bg-black/60 px-3.5 py-2 backdrop-blur-md">
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-wide">HARSH SHUKLA</p>
                        <p className="text-[0.65rem] font-mono text-cyan-300">AI & ML Engineer • Full Stack</p>
                      </div>
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                        <FaBrain className="text-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Narrative & Engineering Focus */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                Architecting Applied AI for Real-World Impact
              </h3>

              <div className="mt-4 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {portfolioData.about.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Core Strengths Checklist */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/10 font-mono text-xs text-slate-200">
                {[
                  'Autonomous Machine Learning Pipelines',
                  'Computer Vision & Face Biometrics (90% Acc)',
                  'End-to-End MERN & Python Microservices',
                  'Natural Language Processing & Sentiment Analysis',
                ].map((strength) => (
                  <div key={strength} className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2.5">
                    <FaCircleCheck className="text-cyan-400 shrink-0" />
                    <span>{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Interactive Core Engineering Pillars */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase">CORE DISCIPLINES</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase mt-1">ENGINEERING PILLARS</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.about.pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/60 p-6 backdrop-blur-xl shadow-lg hover:border-purple-500/50 hover:shadow-[0_12px_40px_rgba(168,85,247,0.2)] transition-all duration-300"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner group-hover:scale-110 transition-transform">
                    {pillarIcons[pillar.icon] || <FaBrain className="text-cyan-400" />}
                  </div>

                  <h4 className="mt-5 text-lg font-bold text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h4>

                  <p className="text-xs font-mono text-purple-400/90 mt-1 uppercase tracking-wider">
                    {pillar.subtitle}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-[0.65rem] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
