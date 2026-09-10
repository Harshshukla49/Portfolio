import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaXmark,
  FaArrowUpRightFromSquare,
  FaGithub,
  FaBolt,
  FaCheck,
  FaLayerGroup,
  FaShieldHalved,
  FaChartLine,
} from 'react-icons/fa6';
import { ProjectItem } from '../data/portfolioData';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl -z-10"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-gradient-to-b from-[#0e0e16] via-[#09090f] to-[#040407] p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] text-left"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                <span>PROJECT {project.number}</span>
                <span>•</span>
                <span className="uppercase text-purple-300">{project.category}</span>
                {project.domain && (
                  <>
                    <span>•</span>
                    <span className="text-slate-400 uppercase">{project.domain}</span>
                  </>
                )}
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                {project.title}
              </h2>
              <p className="mt-1 text-sm text-slate-400">{project.tagline}</p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all"
              aria-label="Close Case Study"
            >
              <FaXmark className="text-lg" />
            </button>
          </div>

          {/* Project Preview Image Banner */}
          {project.imageUrl && (
            <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-2xl">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              {project.status && (
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-black/70 px-3 py-1 text-xs font-mono font-bold text-cyan-300 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{project.status}</span>
                </div>
              )}
            </div>
          )}

          {/* Key Links & Quick Stats */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 font-mono text-xs">
            <div className="flex flex-wrap gap-4">
              {project.stats?.map((s) => (
                <div key={s.label}>
                  <span className="text-slate-500 uppercase">{s.label}: </span>
                  <span className="text-cyan-300 font-bold">{s.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 font-bold text-black shadow-md hover:brightness-110 transition-all"
                >
                  <span>Live Demo</span>
                  <FaArrowUpRightFromSquare className="text-xs" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-slate-200 hover:border-cyan-400 hover:text-white transition-all"
                >
                  <FaGithub className="text-sm" />
                  <span>Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Deep Dive Case Study Content */}
          <div className="mt-8 space-y-8">
            {/* Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-red-500/20 bg-red-950/10 p-5">
                <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase font-bold tracking-wider">
                  <FaBolt />
                  <span>THE PROBLEM</span>
                </div>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {project.caseStudy.problem}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold tracking-wider">
                  <FaCheck />
                  <span>THE SOLUTION</span>
                </div>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {project.caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Architecture Breakdown */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase font-bold tracking-wider">
                <FaLayerGroup />
                <span>SYSTEM ARCHITECTURE & WORKFLOW</span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {project.caseStudy.architecture.map((arch, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-[0.65rem] font-mono text-purple-300 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{arch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges & Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider">
                  <FaShieldHalved />
                  <span>TECHNICAL CHALLENGES OVERCOME</span>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {project.caseStudy.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/10 p-5">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase font-bold tracking-wider">
                  <FaChartLine />
                  <span>MEASURABLE RESULTS & IMPACT</span>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {project.caseStudy.results.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technology Stack Pills */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                DEPLOYED TECHNOLOGIES & TOOLS:
              </p>
              <div className="flex flex-wrap gap-2">
                {project.caseStudy.techStack.map((t) => (
                  <span
                    key={t}
                    className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-mono text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
