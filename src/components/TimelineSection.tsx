import React from 'react';
import { motion } from 'framer-motion';
import {
  FaAward,
  FaGraduationCap,
  FaCertificate,
  FaCheck,
  FaBuildingColumns,
  FaCalendarDays,
  FaSchool,
  FaVolleyball,
  FaStar,
} from 'react-icons/fa6';
import { portfolioData } from '../data/portfolioData';

export default function TimelineSection() {
  return (
    <section id="milestones" className="relative scroll-mt-20 py-14 sm:py-16 lg:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-purple-300 uppercase">
            <FaAward className="text-xs" />
            <span>CREDENTIALS & JOURNEY</span>
          </div>

          <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            TRAINING, CERTIFICATIONS &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              EDUCATION
            </span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Verified academic background, professional certifications, and institutional recognitions from resume.
          </p>
        </div>

        {/* Dual Grid: Certifications & Education */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Certifications & Recognition Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-2.5 pb-2 border-b border-white/10 font-mono text-sm text-cyan-400">
              <FaCertificate />
              <span className="font-bold uppercase tracking-wider">TRAINING & CERTIFICATIONS</span>
            </div>

            <div className="relative pl-6 space-y-4 sm:space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-purple-500 before:via-cyan-500 before:to-transparent">
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
                      {milestone.date}
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

          {/* Right Column: Complete Education & Extra-Curricular Spotlight */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-2.5 pb-2 border-b border-white/10 font-mono text-sm text-purple-400">
              <FaBuildingColumns />
              <span className="font-bold uppercase tracking-wider">ACADEMIC FOUNDATION</span>
            </div>

            <div className="space-y-4">
              {portfolioData.educationHistory.map((edu, idx) => (
                <motion.div
                  key={edu.qualification}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-black/60 p-6 backdrop-blur-xl shadow-lg hover:border-purple-500/40 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-cyan-300 border border-purple-500/40 shrink-0">
                      {idx === 0 ? <FaGraduationCap /> : <FaSchool />}
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.65rem] font-mono text-slate-400">
                      {edu.year}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-white leading-snug">
                    {edu.qualification}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-cyan-300">
                    {edu.institution}
                  </p>

                  <p className="text-[0.7rem] font-mono text-slate-400">
                    Board / University: <span className="text-slate-200">{edu.board}</span>
                  </p>

                  {edu.highlights && (
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                      {edu.highlights}
                    </p>
                  )}
                </motion.div>
              ))}

              {/* Extra-Curricular Volleyball Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 via-black to-blue-950/20 p-6 backdrop-blur-xl shadow-lg"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase font-bold tracking-wider">
                  <FaVolleyball className="text-amber-400 animate-spin-slow" />
                  <span>EXTRA-CURRICULAR LEADERSHIP</span>
                </div>

                <h4 className="mt-2 text-sm font-bold text-white">
                  {portfolioData.extraCurricular.activity}
                </h4>

                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  {portfolioData.extraCurricular.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
