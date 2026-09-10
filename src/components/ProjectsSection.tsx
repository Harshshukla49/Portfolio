import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowUpRightFromSquare,
  FaGithub,
  FaLayerGroup,
  FaCirclePlay,
  FaCirclePause,
  FaRotateRight,
  FaRotateLeft,
  FaGlobe,
  FaMicrochip,
  FaBrain,
  FaBolt,
  FaEye,
  FaSliders,
  FaCompass,
} from 'react-icons/fa6';
import { portfolioData, ProjectItem } from '../data/portfolioData';
import CaseStudyModal from './CaseStudyModal';

interface OrbitNodeConfig {
  orbitIndex: number;
  radiusX: number;
  radiusY: number;
  angleOffset: number;
}

const ORBIT_CONFIGS: OrbitNodeConfig[] = [
  // Orbit 1 (Inner): Smart Healthcare (0) & Twitter Sentiment (π)
  { orbitIndex: 0, radiusX: 250, radiusY: 130, angleOffset: 0 },
  { orbitIndex: 0, radiusX: 250, radiusY: 130, angleOffset: Math.PI },
  // Orbit 2 (Middle): Face Recognition (π/2) & Speech Emotion (3π/2)
  { orbitIndex: 1, radiusX: 380, radiusY: 200, angleOffset: Math.PI / 2 },
  { orbitIndex: 1, radiusX: 380, radiusY: 200, angleOffset: (3 * Math.PI) / 2 },
  // Orbit 3 (Outer): Murder Mystery (π/4)
  { orbitIndex: 2, radiusX: 510, radiusY: 270, angleOffset: Math.PI / 4 },
];

export default function ProjectsSection() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectItem | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [orbitSpeed, setOrbitSpeed] = useState<number>(1);
  const [globalAngle, setGlobalAngle] = useState<number>(0);
  const [tilt, setTilt] = useState<{ [key: string]: { x: number; y: number; glareX: number; glareY: number } }>({});

  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // 60 FPS GPU-friendly Orbital Motion Engine
  useEffect(() => {
    const updateOrbit = (time: number) => {
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      if (!isPaused && !hoveredProjectId) {
        // Base rotational speed ~ 0.12 rad/sec
        const deltaAngle = 0.12 * orbitSpeed * delta;
        setGlobalAngle((prev) => (prev + deltaAngle) % (2 * Math.PI));
      }

      animFrameRef.current = requestAnimationFrame(updateOrbit);
    };

    animFrameRef.current = requestAnimationFrame(updateOrbit);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused, hoveredProjectId, orbitSpeed]);

  // Card cursor 3D magnetic tilt calculation
  const handleCardMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (y - 0.5) * -14;
    const rotY = (x - 0.5) * 14;
    setTilt((prev) => ({
      ...prev,
      [id]: { x: rotX, y: rotY, glareX: x * 100, glareY: y * 100 },
    }));
  };

  const handleCardMouseLeave = (id: string) => {
    setTilt((prev) => ({
      ...prev,
      [id]: { x: 0, y: 0, glareX: 50, glareY: 50 },
    }));
    setHoveredProjectId(null);
  };

  const rotateToProject = (index: number) => {
    setFocusedIndex(index);
    const targetOffset = ORBIT_CONFIGS[index]?.angleOffset || 0;
    // Rotate so that the project lands in front center (angle = π/2)
    const newGlobal = (Math.PI / 2 - targetOffset + 2 * Math.PI) % (2 * Math.PI);
    setGlobalAngle(newGlobal);
  };

  const cycleProjects = (direction: 'next' | 'prev') => {
    const total = portfolioData.projects.length;
    const nextIdx = direction === 'next' ? (focusedIndex + 1) % total : (focusedIndex - 1 + total) % total;
    rotateToProject(nextIdx);
  };

  return (
    <section id="projects" className="relative scroll-mt-20 py-16 sm:py-20 lg:py-24 overflow-hidden select-none">
      {/* Background Cosmic Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.08),rgba(6,182,212,0.05),transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-purple-300 uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <FaCompass className="text-xs text-cyan-400 animate-spin-slow" />
            <span>PROJECT UNIVERSE // 3D ORBITAL SHOWCASE</span>
          </div>

          <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            FEATURED{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]">
              PROJECTS
            </span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Explore the intelligent systems I've architected, trained, and deployed in real-time 3D orbit.
          </p>

          {/* Interactive Desktop Orbit Controls */}
          <div className="hidden lg:flex items-center justify-center gap-3 mt-6 font-mono text-xs">
            <button
              onClick={() => cycleProjects('prev')}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-all active:scale-95"
              title="Rotate Counter-Clockwise"
            >
              <FaRotateLeft className="text-[0.7rem]" />
              <span>Rotate Left</span>
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-bold transition-all active:scale-95 ${
                isPaused
                  ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'border-cyan-400/50 bg-cyan-500/10 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              }`}
            >
              {isPaused ? <FaCirclePlay /> : <FaCirclePause />}
              <span>{isPaused ? 'RESUME ORBIT' : 'PAUSE ORBIT'}</span>
            </button>

            <button
              onClick={() => cycleProjects('next')}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-all active:scale-95"
              title="Rotate Clockwise"
            >
              <span>Rotate Right</span>
              <FaRotateRight className="text-[0.7rem]" />
            </button>

            <div className="h-4 w-[1px] bg-white/10 mx-1" />

            {/* Orbit Speed Toggle */}
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1">
              {[0.5, 1, 1.8].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setOrbitSpeed(spd)}
                  className={`rounded-full px-2.5 py-0.5 text-[0.65rem] transition-all ${
                    orbitSpeed === spd
                      ? 'bg-purple-600 text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP & TABLET: 3D INTERACTIVE ORBITAL SOLAR SYSTEM ( >= 768px )        */}
        {/* ========================================================================= */}
        <div className="hidden md:block relative w-full h-[680px] lg:h-[760px] mx-auto overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* SVG 3D Orbital Rings Ground Plane */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ overflow: 'visible' }}
              viewBox="-600 -400 1200 800"
            >
              <defs>
                <radialGradient id="coreAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#a855f7" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="ringGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.25" />
                </linearGradient>
              </defs>

              {/* Core Ambient Glow Disc */}
              <circle cx="0" cy="0" r="140" fill="url(#coreAura)" />

              {/* Orbit 1 Ellipse (Inner) */}
              <ellipse
                cx="0"
                cy="0"
                rx={ORBIT_CONFIGS[0].radiusX}
                ry={ORBIT_CONFIGS[0].radiusY}
                fill="none"
                stroke="url(#ringGlow)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="opacity-70 animate-pulse"
                style={{ animationDuration: '6s' }}
              />

              {/* Orbit 2 Ellipse (Middle) */}
              <ellipse
                cx="0"
                cy="0"
                rx={ORBIT_CONFIGS[2].radiusX}
                ry={ORBIT_CONFIGS[2].radiusY}
                fill="none"
                stroke="url(#ringGlow)"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                className="opacity-50"
              />

              {/* Orbit 3 Ellipse (Outer) */}
              <ellipse
                cx="0"
                cy="0"
                rx={ORBIT_CONFIGS[4].radiusX}
                ry={ORBIT_CONFIGS[4].radiusY}
                fill="none"
                stroke="url(#ringGlow)"
                strokeWidth="1.2"
                strokeDasharray="8 12"
                className="opacity-35"
              />

              {/* Laser Beam connector to hovered project */}
              {hoveredProjectId && (
                (() => {
                  const idx = portfolioData.projects.findIndex((p) => p.id === hoveredProjectId);
                  if (idx === -1) return null;
                  const cfg = ORBIT_CONFIGS[idx];
                  const angle = globalAngle + cfg.angleOffset;
                  const px = cfg.radiusX * Math.cos(angle);
                  const py = cfg.radiusY * Math.sin(angle);
                  return (
                    <line
                      x1="0"
                      y1="0"
                      x2={px}
                      y2={py}
                      stroke="#06b6d4"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="opacity-80"
                    />
                  );
                })()
              )}
            </svg>

            {/* Central Holographic Stellar Core Node */}
            <motion.div
              className="absolute z-20 flex flex-col items-center justify-center text-center p-6 rounded-full border border-cyan-400/40 bg-gradient-to-b from-[#0a0f24]/90 via-[#060814]/90 to-[#02030a]/90 backdrop-blur-2xl shadow-[0_0_60px_rgba(6,182,212,0.35)] cursor-pointer group"
              style={{ width: '220px', height: '220px' }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsPaused(!isPaused)}
            >
              {/* Outer Pulsing Rings */}
              <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-ping pointer-events-none" style={{ animationDuration: '4s' }} />
              <div className="absolute -inset-3 rounded-full border border-cyan-400/20 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.6)] mb-2">
                  <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-black">
                    <FaBrain className="text-cyan-300 text-lg group-hover:text-purple-300 transition-colors" />
                  </div>
                </div>

                <span className="text-[0.65rem] font-mono tracking-[0.3em] uppercase text-cyan-300 font-bold">
                  PROJECTS
                </span>
                <h3 className="text-xs font-black tracking-wider text-white uppercase mt-0.5">
                  AI • SOFTWARE • FULL STACK
                </h3>
                <p className="text-[0.6rem] font-mono text-slate-400 uppercase mt-1">
                  {portfolioData.projects.length} ACTIVE ORBITALS
                </p>

                <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[0.6rem] font-mono text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isPaused ? 'ORBIT PAUSED' : 'ORBIT ACTIVE'}</span>
                </div>
              </div>
            </motion.div>

            {/* Revolving Planetary Project Node Cards */}
            {portfolioData.projects.map((project, index) => {
              const cfg = ORBIT_CONFIGS[index];
              const angle = globalAngle + cfg.angleOffset;
              const x = cfg.radiusX * Math.cos(angle);
              const y = cfg.radiusY * Math.sin(angle);
              const sinVal = Math.sin(angle); // -1 (top/back) to +1 (bottom/front)

              const isHovered = hoveredProjectId === project.id;
              const cardTilt = tilt[project.id] || { x: 0, y: 0, glareX: 50, glareY: 50 };

              // Depth styling hierarchy
              const depthScale = isHovered ? 1.15 : sinVal >= 0 ? 0.95 + 0.12 * sinVal : 0.82 + 0.1 * (1 + sinVal);
              const depthOpacity = isHovered ? 1.0 : sinVal >= 0 ? 0.92 + 0.08 * sinVal : 0.68 + 0.2 * (1 + sinVal);
              const depthBlur = isHovered ? 0 : sinVal < -0.2 ? (Math.abs(sinVal) - 0.2) * 1.5 : 0;
              const zIndex = isHovered ? 60 : Math.round(25 + sinVal * 15);

              return (
                <div
                  key={project.id}
                  className="absolute transition-transform duration-75 will-change-transform cursor-pointer"
                  style={{
                    transform: `translate3d(${x}px, ${y}px, 0px)`,
                    zIndex,
                  }}
                  onMouseEnter={() => {
                    setHoveredProjectId(project.id);
                    setFocusedIndex(index);
                  }}
                  onMouseLeave={() => handleCardMouseLeave(project.id)}
                  onMouseMove={(e) => handleCardMouseMove(project.id, e)}
                  onClick={() => setActiveCaseStudy(project)}
                >
                  <motion.div
                    animate={{
                      scale: depthScale,
                      opacity: depthOpacity,
                      filter: `blur(${depthBlur}px)`,
                      rotateX: cardTilt.x,
                      rotateY: cardTilt.y,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                    style={{ perspective: 1000 }}
                    className="relative w-[300px] lg:w-[330px] rounded-3xl border border-white/15 bg-gradient-to-b from-[#0c0d1a]/95 via-[#080914]/95 to-[#04040a]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl group transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(6,182,212,0.35)]"
                  >
                    {/* Holographic Cursor Sheen Glare */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at ${cardTilt.glareX}% ${cardTilt.glareY}%, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.08), transparent 70%)`,
                      }}
                    />

                    {/* Top 16:9 Image Preview */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-inner">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover object-center filter brightness-105 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between font-mono text-[0.65rem]">
                        <span className="rounded-lg bg-black/70 border border-cyan-400/40 px-2.5 py-0.5 font-bold text-cyan-300 backdrop-blur-md">
                          PROJECT {project.number}
                        </span>
                        {project.status && (
                          <span className="rounded-lg bg-black/70 border border-emerald-400/40 px-2 py-0.5 font-bold text-emerald-300 backdrop-blur-md">
                            {project.status}
                          </span>
                        )}
                      </div>

                      {/* Bottom Image Domain Tag */}
                      <div className="absolute bottom-2 left-2.5 text-[0.65rem] font-mono text-purple-300 uppercase tracking-wider font-semibold">
                        {project.domain || project.category}
                      </div>
                    </div>

                    {/* Project Information */}
                    <div className="mt-3 text-left">
                      <h3 className="text-sm lg:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {project.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Primary Tech Stack Chips */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[0.65rem] font-mono text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="rounded-lg border border-white/5 bg-white/[0.02] px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-400">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Action Links Bar */}
                      <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCaseStudy(project);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 px-3 py-1.5 text-[0.7rem] font-bold text-white shadow-md hover:brightness-110 transition-all hover:scale-105 active:scale-95"
                        >
                          <FaLayerGroup className="text-[0.65rem]" />
                          <span>Case Study ↗</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-2.5 py-1 text-[0.65rem] font-mono text-cyan-300 hover:bg-cyan-500/20 transition-all"
                              title="Open Live App"
                            >
                              <span>Demo</span>
                              <FaArrowUpRightFromSquare className="text-[0.6rem]" />
                            </a>
                          )}

                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center justify-center h-7 w-7 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white transition-all"
                              title="View GitHub Repository"
                            >
                              <FaGithub className="text-xs" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE: VERTICAL CONNECTED CYBERNETIC ORBIT TIMELINE ( < 768px )          */}
        {/* ========================================================================= */}
        <div className="block md:hidden space-y-8">
          {/* Mobile Orbital Track Navigation Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {portfolioData.projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  const el = document.getElementById(`mobile-proj-${p.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-slate-300 active:border-cyan-400 active:text-cyan-300"
              >
                <span>{p.number} / {p.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Connected Vertical Planetary Stack */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-purple-500 before:via-cyan-400 before:to-pink-500">
            {portfolioData.projects.map((project) => (
              <div
                key={project.id}
                id={`mobile-proj-${project.id}`}
                className="relative scroll-mt-28"
              >
                {/* Glowing Checkpoint Orbital Node */}
                <div className="absolute -left-[31px] top-6 flex h-4 w-4 items-center justify-center rounded-full bg-black border-2 border-cyan-400 shadow-[0_0_10px_#06b6d4]">
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>

                <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0c0d1a]/95 via-[#080914]/95 to-[#04040a]/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-left backdrop-blur-2xl">
                  {/* 16:9 Image Preview */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-inner">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between font-mono text-[0.65rem]">
                      <span className="rounded-lg bg-black/70 border border-cyan-400/40 px-2.5 py-0.5 font-bold text-cyan-300">
                        PROJECT {project.number}
                      </span>
                      {project.status && (
                        <span className="rounded-lg bg-black/70 border border-emerald-400/40 px-2 py-0.5 font-bold text-emerald-300">
                          {project.status}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2 left-2.5 text-[0.65rem] font-mono text-purple-300 uppercase tracking-wider font-semibold">
                      {project.domain || project.category}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-white">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[0.65rem] font-mono text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => setActiveCaseStudy(project)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-md"
                      >
                        <FaLayerGroup className="text-xs" />
                        <span>View Deep Case Study ↗</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-mono text-cyan-300"
                          >
                            <span>Live</span>
                            <FaArrowUpRightFromSquare className="text-[0.6rem]" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center h-8 w-8 rounded-xl border border-white/10 bg-white/5 text-slate-300"
                          >
                            <FaGithub />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </section>
  );
}
