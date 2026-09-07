import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowUpRightFromSquare,
  FaGithub,
  FaFolderOpen,
  FaBrain,
  FaHeartPulse,
  FaTwitter,
  FaUserCheck,
  FaVolumeHigh,
  FaGamepad,
  FaLayerGroup,
} from 'react-icons/fa6';
import { portfolioData, ProjectItem } from '../data/portfolioData';
import CaseStudyModal from './CaseStudyModal';

export default function ProjectsSection() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectItem | null>(null);

  const getVisualPreview = (project: ProjectItem) => {
    switch (project.id) {
      case 'smart-healthcare':
        return (
          <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-950/40 via-black to-blue-950/40 p-5 flex flex-col justify-between border border-cyan-500/20">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-cyan-300">
              <div className="flex items-center gap-2">
                <FaHeartPulse className="text-red-400 animate-pulse" />
                <span>TELEMETRY STREAM // ACTIVE</span>
              </div>
              <span className="rounded-md bg-cyan-500/20 px-2 py-0.5 text-[0.65rem] text-cyan-200">RENDER LIVE</span>
            </div>

            {/* Mockup Vital Signs Monitor */}
            <div className="grid grid-cols-3 gap-2 my-auto">
              <div className="rounded-xl border border-white/10 bg-black/50 p-3 text-center">
                <p className="text-[0.65rem] font-mono text-slate-400">HEART RATE</p>
                <p className="text-xl font-mono font-bold text-emerald-400 mt-1">72 <span className="text-[0.6rem] text-slate-400">BPM</span></p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/50 p-3 text-center">
                <p className="text-[0.65rem] font-mono text-slate-400">SPO2</p>
                <p className="text-xl font-mono font-bold text-cyan-400 mt-1">98 <span className="text-[0.6rem] text-slate-400">%</span></p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/50 p-3 text-center">
                <p className="text-[0.65rem] font-mono text-slate-400">AI RISK</p>
                <p className="text-xl font-mono font-bold text-purple-400 mt-1">LOW</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[0.7rem] font-mono text-slate-400">
              <span>LATENCY: &lt;100ms</span>
              <span className="text-cyan-400">PATIENT PORTAL: SYNCED</span>
            </div>
          </div>
        );

      case 'twitter-sentiment':
        return (
          <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/40 via-black to-pink-950/40 p-5 flex flex-col justify-between border border-purple-500/20">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-purple-300">
              <div className="flex items-center gap-2">
                <FaTwitter className="text-cyan-400" />
                <span>NLP PIPELINE // 1,000+ TWEETS</span>
              </div>
              <span className="text-slate-400 text-[0.65rem]">NLTK • SCIKIT</span>
            </div>

            <div className="space-y-2 my-auto">
              <div>
                <div className="flex justify-between text-[0.7rem] font-mono text-slate-300 mb-1">
                  <span>Positive Sentiment</span>
                  <span className="text-emerald-400 font-bold">64.8%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[65%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[0.7rem] font-mono text-slate-300 mb-1">
                  <span>Neutral Sentiment</span>
                  <span className="text-cyan-400 font-bold">21.4%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full w-[21%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[0.7rem] font-mono text-slate-300 mb-1">
                  <span>Negative Sentiment</span>
                  <span className="text-pink-400 font-bold">13.8%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full w-[14%]" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[0.7rem] font-mono text-slate-400">
              <span>STREAMLIT DASHBOARD</span>
              <span className="text-purple-400">VECTORIZER: TF-IDF</span>
            </div>
          </div>
        );

      case 'face-recognition-attendance':
        return (
          <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950/40 via-black to-cyan-950/40 p-5 flex flex-col justify-between border border-blue-500/20">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-blue-300">
              <div className="flex items-center gap-2">
                <FaUserCheck className="text-emerald-400" />
                <span>OPENCV VISION RETICLE</span>
              </div>
              <span className="text-emerald-400 font-bold text-xs">90% ACCURACY</span>
            </div>

            {/* Facial Recognition Scanner Box */}
            <div className="relative my-auto flex items-center justify-center">
              <div className="relative h-28 w-28 rounded-xl border-2 border-dashed border-cyan-400 p-2 flex flex-col items-center justify-center">
                <div className="absolute -top-1.5 -left-1.5 h-3 w-3 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute -top-1.5 -right-1.5 h-3 w-3 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-b-2 border-r-2 border-cyan-400" />
                <FaBrain className="text-3xl text-cyan-300/80 animate-pulse" />
                <span className="mt-1 text-[0.6rem] font-mono text-cyan-300 font-bold">MATCH: 94.2%</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[0.7rem] font-mono text-slate-400">
              <span>SQLITE AUTO-LOGGING</span>
              <span className="text-emerald-400">PROXY PREVENTION: ON</span>
            </div>
          </div>
        );

      case 'speech-emotion-recognition':
        return (
          <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-pink-950/40 via-black to-purple-950/40 p-5 flex flex-col justify-between border border-pink-500/20">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-pink-300">
              <div className="flex items-center gap-2">
                <FaVolumeHigh className="text-pink-400 animate-bounce" />
                <span>ACOUSTIC MFCC ANALYSIS</span>
              </div>
              <span className="text-slate-400 text-[0.65rem]">CNN + LSTM</span>
            </div>

            {/* Audio Waveform Spectrum simulation */}
            <div className="flex items-end justify-center gap-1.5 h-20 my-auto px-4">
              {[40, 65, 30, 90, 45, 80, 100, 70, 50, 85, 35, 95, 60, 40, 75, 55, 90, 30].map((h, i) => (
                <div
                  key={i}
                  className="w-2.5 rounded-full bg-gradient-to-t from-purple-600 to-pink-400 transition-all duration-300"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[0.7rem] font-mono text-slate-400">
              <span>LIBROSA SPECTROGRAM</span>
              <span className="text-pink-300 font-bold">EMOTION: CONFIDENT (88%)</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/30 via-black to-indigo-950/30 p-5 flex flex-col justify-between border border-purple-500/20">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-purple-300">
              <div className="flex items-center gap-2">
                <FaGamepad className="text-purple-400" />
                <span>STATE ENGINE // REST API</span>
              </div>
              <span className="text-slate-400 text-[0.65rem]">NODE.JS • SQLITE</span>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/60 p-4 my-auto font-mono text-xs text-slate-300">
              <p className="text-cyan-400">&gt; RESOLVING CLUE GRAPH...</p>
              <p className="mt-1 text-slate-400">&gt; EVIDENCE IDENTIFIED: 12/12</p>
              <p className="mt-1 text-emerald-400">&gt; SUSPECT ALIBI: VERIFIED FALSE</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[0.7rem] font-mono text-slate-400">
              <span>TRANSACTIONAL STATE</span>
              <span className="text-purple-400">DECISION TREE ACTIVE</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="relative scroll-mt-24 py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-purple-300 uppercase">
            <FaFolderOpen className="text-xs" />
            <span>SELECTED WORK // PORTFOLIO</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            FEATURED{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              PROJECTS
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Real-world systems combining applied machine learning, computer vision, and scalable full-stack engineering.
          </p>
        </div>

        {/* Projects Showcase List */}
        <div className="mt-16 space-y-12 lg:space-y-16">
          {portfolioData.projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                data-cursor="project"
                onClick={() => setActiveCaseStudy(project)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/80 p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl hover:border-purple-500/50 hover:shadow-[0_20px_80px_rgba(168,85,247,0.2)] transition-all duration-500"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Visual Preview Container */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative group-hover:scale-[1.02] transition-transform duration-500">
                      {getVisualPreview(project)}
                    </div>
                  </div>

                  {/* Project Info & Actions */}
                  <div className={`lg:col-span-6 text-left flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      {/* Meta Pill */}
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="rounded-lg bg-purple-500/20 px-2.5 py-1 font-bold text-purple-300">
                          PROJECT {project.number}
                        </span>
                        <span className="text-slate-400 uppercase">{project.category}</span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Chips */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCaseStudy(project);
                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:brightness-110 transition-all hover:scale-105"
                      >
                        <FaLayerGroup className="text-xs" />
                        <span>View Deep Case Study ↗</span>
                      </button>

                      <div className="flex items-center gap-2.5">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3.5 py-2 text-xs font-mono text-cyan-300 hover:bg-cyan-500/20 transition-all"
                          >
                            <span>Live App</span>
                            <FaArrowUpRightFromSquare className="text-[0.65rem]" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-mono text-slate-300 hover:border-white/30 hover:text-white transition-all"
                          >
                            <FaGithub />
                            <span>Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
