import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBrain,
  FaCode,
  FaTerminal,
  FaDatabase,
  FaServer,
  FaSliders,
  FaLayerGroup,
  FaWandMagicSparkles,
} from 'react-icons/fa6';
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiSupabase,
  SiSqlite,
  SiGit,
  SiPostman,
  SiVite,
  SiOpencv,
  SiScikitlearn,
  SiPytorch,
  SiPandas,
} from 'react-icons/si';
import { portfolioData, SkillItem } from '../data/portfolioData';

export default function TechStackSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const iconMap: Record<string, React.ReactNode> = {
    python: <SiPython className="text-2xl text-yellow-400" />,
    cpp: <SiCplusplus className="text-2xl text-blue-400" />,
    javascript: <SiJavascript className="text-2xl text-amber-300" />,
    typescript: <SiTypescript className="text-2xl text-blue-500" />,
    sql: <FaDatabase className="text-2xl text-emerald-400" />,
    ml: <FaBrain className="text-2xl text-purple-400" />,
    dl: <SiPytorch className="text-2xl text-orange-400" />,
    nlp: <FaCode className="text-2xl text-pink-400" />,
    opencv: <SiOpencv className="text-2xl text-red-400" />,
    scikit: <SiScikitlearn className="text-2xl text-blue-400" />,
    datascience: <SiPandas className="text-2xl text-cyan-400" />,
    react: <SiReact className="text-2xl text-cyan-400 animate-spin-slow" />,
    tailwind: <SiTailwindcss className="text-2xl text-teal-400" />,
    html: <SiHtml5 className="text-2xl text-orange-500" />,
    motion: <FaWandMagicSparkles className="text-2xl text-fuchsia-400" />,
    node: <SiNodedotjs className="text-2xl text-emerald-500" />,
    express: <SiExpress className="text-2xl text-slate-200" />,
    flask: <SiFlask className="text-2xl text-slate-300" />,
    api: <FaServer className="text-2xl text-indigo-400" />,
    mongodb: <SiMongodb className="text-2xl text-green-500" />,
    mysql: <SiMysql className="text-2xl text-blue-400" />,
    firebase: <SiFirebase className="text-2xl text-amber-500" />,
    supabase: <SiSupabase className="text-2xl text-emerald-400" />,
    sqlite: <SiSqlite className="text-2xl text-sky-400" />,
    git: <SiGit className="text-2xl text-red-500" />,
    postman: <SiPostman className="text-2xl text-orange-400" />,
    vscode: <FaTerminal className="text-2xl text-blue-400" />,
    vite: <SiVite className="text-2xl text-purple-400" />,
  };

  const filteredSkills =
    selectedCategory === 'all'
      ? portfolioData.skills
      : portfolioData.skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="relative scroll-mt-24 py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-cyan-300 uppercase">
            <FaLayerGroup className="text-xs" />
            <span>TECHNICAL ARSENAL // STACK</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            TECH STACK &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              ECOSYSTEM
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Verified technologies, frameworks, and tools used to build end-to-end intelligent systems.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105'
                : 'border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            ALL TECHNOLOGIES ({portfolioData.skills.length})
          </button>

          {portfolioData.skillCategories.map((cat) => {
            const count = portfolioData.skills.filter((s) => s.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105'
                    : 'border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div layout className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/60 p-5 backdrop-blur-xl shadow-md hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(6,182,212,0.2)] transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40 group-hover:scale-110 transition-transform">
                    {iconMap[skill.iconName] || <FaCode className="text-2xl text-cyan-400" />}
                  </div>

                  {skill.popular && (
                    <span className="rounded-full border border-purple-500/40 bg-purple-500/10 px-2.5 py-0.5 text-[0.65rem] font-mono text-purple-300 uppercase">
                      Core Stack
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </h3>

                <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {skill.description}
                </p>

                {/* Proficiency Meter */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-[0.7rem] font-mono text-slate-400">
                    <span>Proficiency</span>
                    <span className="text-cyan-300 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
