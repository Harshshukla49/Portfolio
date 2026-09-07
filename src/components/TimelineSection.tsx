import React from 'react';
import { motion } from 'framer-motion';
import {
  FaAward,
  FaGraduationCap,
  FaCertificate,
  FaCheck,
  FaBuildingColumns,
  FaCalendarDays,
  FaLocationDot,
  FaStar,
} from 'react-icons/fa6';
import { portfolioData } from '../data/portfolioData';

export default function TimelineSection() {
  return (
    <section id="milestones" className="relative scroll-mt-24 py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-purple-300 uppercase">
            <FaAward className="text-xs" />
            <span>CREDENTIALS & JOURNEY</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            MILESTONES &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              EDUCATION
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Verified academic background, technical certifications, and competitive recognitions.
          </p>
        </div>

        {/* Dual Grid: Certifications & Education */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Certifications & Recognition Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-2.5 pb-2 border-b border-white/10 font-mono text-sm text-cyan-400">
              <FaCertificate />
              <span className="font-bold uppercase tracking-wider">CERTIFICATIONS & RECOGNITION</span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-purple-500 before:via-cyan-500 before:to-transparent">
              {portfolioData.milestones.map((milestone, idx) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-black/60 p-5 backdrop-blur-xl hover:border-cyan-400/40 transition-all shadow-md"
                >
                  {/* Glowing Checkpoint Node */}
                  <div className="absolute -left-[31px] top-6 flex h-4 w-4 items-center justify-center rounded-full bg-black border-2 border-cyan-400 shadow-[0_0_10px_#06b6d4]">
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono text-purple-300 uppercase font-semibold">
                      {milestone.organization}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[0.65rem] font-mono text-slate-400">
                      {milestone.year}
                    </span>
                  </div>

                  <h3 className="mt-2 text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {milestone.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {milestone.details}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    {milestone.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-white/5 bg-white/[0.04] px-2 py-0.5 text-[0.65rem] font-mono text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Education Spotlight Card */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-2.5 pb-2 border-b border-white/10 font-mono text-sm text-purple-400">
              <FaBuildingColumns />
              <span className="font-bold uppercase tracking-wider">ACADEMIC FOUNDATION</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/15 bg-gradient-to-b from-purple-950/20 via-black/80 to-cyan-950/20 p-6 sm:p-8 backdrop-blur-2xl shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-black">
                    <FaGraduationCap className="text-xl text-cyan-300" />
                  </div>
                </div>

                <div className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
                  <span>CGPA: </span>
                  <span className="font-bold">{portfolioData.education.cgpa}</span>
                </div>
              </div>

              <h3 className="mt-6 text-2xl font-black text-white uppercase tracking-tight">
                {portfolioData.education.institution}
              </h3>

              <p className="mt-1 text-base font-bold text-cyan-300">
                {portfolioData.education.degree}
              </p>

              <p className="text-xs font-mono text-purple-300 uppercase tracking-wider mt-0.5">
                {portfolioData.education.specialization}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-xs text-slate-300">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <FaCalendarDays className="text-cyan-400" />
                    <span>TIMELINE</span>
                  </div>
                  <p className="mt-1 font-bold text-white">{portfolioData.education.duration}</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <FaStar className="text-purple-400" />
                    <span>STATUS</span>
                  </div>
                  <p className="mt-1 font-bold text-emerald-400">In Progress</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  KEY HIGHLIGHTS:
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {portfolioData.education.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <FaCheck className="text-cyan-400 text-xs shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
