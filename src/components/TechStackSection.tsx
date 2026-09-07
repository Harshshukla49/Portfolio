import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBrain,
  FaNetworkWired,
  FaComments,
  FaChartSimple,
  FaHtml5,
  FaCss3Alt,
  FaCubes,
  FaDatabase,
  FaMicrochip,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa6';
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiReact,
  SiTailwindcss,
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
  SiOpencv,
  SiScikitlearn,
} from 'react-icons/si';
import { TbSql, TbApi, TbBrandVscode, TbBinaryTree } from 'react-icons/tb';

interface TechItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  defaultActive?: boolean;
}

interface CategoryRow {
  id: string;
  title: string;
  subtitle: string;
  pillColor: string;
  items: TechItem[];
}

const CATEGORY_ROWS: CategoryRow[] = [
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'The foundation of everything I build',
    pillColor: 'bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]',
    items: [
      {
        id: 'python',
        name: 'Python',
        icon: (
          <div className="relative flex items-center justify-center">
            <SiPython className="text-4xl text-[#38bdf8] drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] group-hover:scale-110 transition-transform duration-300" />
          </div>
        ),
        defaultActive: true,
      },
      {
        id: 'cpp',
        name: 'C++',
        icon: (
          <div className="relative flex items-center justify-center">
            <SiCplusplus className="text-4xl text-[#00599c] drop-shadow-[0_0_10px_rgba(0,89,156,0.5)] group-hover:scale-110 transition-transform duration-300" />
          </div>
        ),
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        icon: (
          <div className="relative flex items-center justify-center">
            <SiJavascript className="text-4xl text-[#f7df1e] drop-shadow-[0_0_10px_rgba(247,223,30,0.5)] group-hover:scale-110 transition-transform duration-300" />
          </div>
        ),
      },
      {
        id: 'sql',
        name: 'SQL',
        icon: (
          <div className="relative flex items-center justify-center">
            <TbSql className="text-4xl text-[#0284c7] drop-shadow-[0_0_10px_rgba(2,132,199,0.5)] group-hover:scale-110 transition-transform duration-300" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'aiml',
    title: 'AI & Machine Learning',
    subtitle: 'Turning data into intelligence',
    pillColor: 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)]',
    items: [
      {
        id: 'ml',
        name: 'Machine Learning',
        icon: (
          <FaBrain className="text-4xl text-[#f97316] drop-shadow-[0_0_10px_rgba(249,115,22,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'dl',
        name: 'Deep Learning',
        icon: (
          <FaNetworkWired className="text-4xl text-[#a855f7] drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'nlp',
        name: 'NLP & Text Mining',
        icon: (
          <FaComments className="text-4xl text-[#8b5cf6] drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'opencv',
        name: 'OpenCV',
        icon: (
          <SiOpencv className="text-4xl text-[#10b981] drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'scikit',
        name: 'Scikit-Learn',
        icon: (
          <SiScikitlearn className="text-4xl text-[#f59e0b] drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'datascience',
        name: 'Data Science',
        icon: (
          <FaChartSimple className="text-4xl text-[#38bdf8] drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Building modern, responsive experiences',
    pillColor: 'bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]',
    items: [
      {
        id: 'react',
        name: 'React.js',
        icon: (
          <SiReact className="text-4xl text-[#06b6d4] drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        icon: (
          <SiTailwindcss className="text-4xl text-[#38bdf8] drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'html',
        name: 'HTML',
        icon: (
          <FaHtml5 className="text-4xl text-[#f97316] drop-shadow-[0_0_10px_rgba(249,115,22,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'css',
        name: 'CSS',
        icon: (
          <FaCss3Alt className="text-4xl text-[#3b82f6] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    subtitle: 'Powering applications at scale',
    pillColor: 'bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]',
    items: [
      {
        id: 'node',
        name: 'Node.js',
        icon: (
          <SiNodedotjs className="text-4xl text-[#22c55e] drop-shadow-[0_0_10px_rgba(34,197,94,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'express',
        name: 'Express.js',
        icon: (
          <div className="flex items-center justify-center font-bold text-2xl tracking-tighter text-slate-100 group-hover:scale-110 transition-transform duration-300">
            <SiExpress className="text-4xl text-slate-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
          </div>
        ),
      },
      {
        id: 'flask',
        name: 'Flask',
        icon: (
          <SiFlask className="text-4xl text-[#38bdf8] drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'api',
        name: 'REST APIs',
        icon: (
          <TbApi className="text-4xl text-[#38bdf8] drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
    ],
  },
  {
    id: 'database',
    title: 'Databases & Cloud',
    subtitle: 'Storing and scaling ideas',
    pillColor: 'bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]',
    items: [
      {
        id: 'mongodb',
        name: 'MongoDB',
        icon: (
          <SiMongodb className="text-4xl text-[#22c55e] drop-shadow-[0_0_10px_rgba(34,197,94,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'mysql',
        name: 'MySQL',
        icon: (
          <SiMysql className="text-4xl text-[#0284c7] drop-shadow-[0_0_10px_rgba(2,132,199,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'firebase',
        name: 'Firebase',
        icon: (
          <SiFirebase className="text-4xl text-[#f59e0b] drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'supabase',
        name: 'Supabase',
        icon: (
          <SiSupabase className="text-4xl text-[#10b981] drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'sqlite',
        name: 'SQLite',
        icon: (
          <SiSqlite className="text-4xl text-[#0284c7] drop-shadow-[0_0_10px_rgba(2,132,199,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    subtitle: 'Build. Test. Ship. Repeat.',
    pillColor: 'bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.8)]',
    items: [
      {
        id: 'git',
        name: 'Git & GitHub',
        icon: (
          <SiGit className="text-4xl text-[#f97316] drop-shadow-[0_0_10px_rgba(249,115,22,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'postman',
        name: 'Postman',
        icon: (
          <SiPostman className="text-4xl text-[#f97316] drop-shadow-[0_0_10px_rgba(249,115,22,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'vscode',
        name: 'VS Code',
        icon: (
          <TbBrandVscode className="text-4xl text-[#3b82f6] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
    ],
  },
  {
    id: 'concepts',
    title: 'Core Concepts',
    subtitle: 'The fundamentals I rely on',
    pillColor: 'bg-purple-600 shadow-[0_0_12px_rgba(168,85,247,0.8)]',
    items: [
      {
        id: 'dsa',
        name: 'Data Structures & Algorithms',
        icon: (
          <TbBinaryTree className="text-4xl text-[#a855f7] drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'oop',
        name: 'OOP',
        icon: (
          <FaCubes className="text-4xl text-[#38bdf8] drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'dbms',
        name: 'DBMS',
        icon: (
          <FaDatabase className="text-4xl text-[#06b6d4] drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
      {
        id: 'os',
        name: 'Operating Systems',
        icon: (
          <FaMicrochip className="text-4xl text-[#3b82f6] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-300" />
        ),
      },
    ],
  },
];

export default function TechStackSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>('python');
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleScroll = (rowId: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[rowId];
    if (container) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollAll = (direction: 'left' | 'right') => {
    Object.values(scrollRefs.current).forEach((container) => {
      if (container) {
        const scrollAmount = direction === 'left' ? -260 : 260;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });
  };

  return (
    <section id="skills" className="relative scroll-mt-20 py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#020206]">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-10 h-96 w-96 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 sm:mb-16">
          <div className="text-center sm:text-left">
            <span className="text-[0.7rem] font-mono tracking-[0.35em] text-cyan-400 uppercase block mb-1.5 font-semibold">
              SKILLS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Technologies{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
                I Work With
              </span>
            </h2>
          </div>

          {/* Top Right Explore Controls */}
          <div className="flex items-center gap-3">
            <span className="text-[0.65rem] sm:text-xs font-mono tracking-widest text-slate-400 uppercase hidden md:inline-block">
              EXPLORE MY SKILLS
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleScrollAll('left')}
                className="h-8 w-8 rounded-full border border-white/15 bg-white/[0.04] text-slate-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-95"
                aria-label="Scroll Skills Left"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <button
                onClick={() => handleScrollAll('right')}
                className="h-8 w-8 rounded-full border border-white/15 bg-white/[0.04] text-slate-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-95"
                aria-label="Scroll Skills Right"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Shelf Rows */}
        <div className="space-y-6 sm:space-y-8">
          {CATEGORY_ROWS.map((row) => (
            <div
              key={row.id}
              className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/[0.06] pb-6 sm:pb-7 transition-colors hover:border-white/[0.12]"
            >
              {/* Left Category Header Info */}
              <div className="w-full md:w-56 lg:w-64 shrink-0 flex items-center gap-3 mb-4 md:mb-0">
                <span className={`h-1.5 w-6 rounded-full shrink-0 ${row.pillColor}`} />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">{row.title}</h3>
                  <p className="text-[0.7rem] sm:text-xs text-slate-400 leading-tight mt-0.5">{row.subtitle}</p>
                </div>
              </div>

              {/* Right Shelf with Chevrons and Icons */}
              <div className="flex-1 flex items-center min-w-0 relative">
                {/* Left Scroll Chevron Button */}
                <button
                  onClick={() => handleScroll(row.id, 'left')}
                  className="hidden md:flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 hover:text-cyan-300 hover:bg-white/5 transition-all mr-1 sm:mr-2"
                  aria-label={`Scroll ${row.title} Left`}
                >
                  <FaChevronLeft className="text-xs" />
                </button>

                {/* Horizontal Icons Shelf */}
                <div
                  ref={(el) => {
                    scrollRefs.current[row.id] = el;
                  }}
                  className="flex-1 flex items-center gap-6 sm:gap-10 lg:gap-14 overflow-x-auto scrollbar-none py-4 px-2 scroll-smooth"
                >
                  {row.items.map((item) => {
                    const isHovered = hoveredSkill === item.id;

                    return (
                      <div
                        key={item.id}
                        onMouseEnter={() => setHoveredSkill(item.id)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onClick={() => setHoveredSkill(item.id)}
                        className="group relative flex flex-col items-center justify-center min-w-[72px] sm:min-w-[88px] cursor-pointer pt-6 pb-2 select-none"
                      >
                        {/* Floating Tooltip Pill */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.85 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 4, scale: 0.85 }}
                              transition={{ duration: 0.18 }}
                              className="absolute top-0 z-20 whitespace-nowrap rounded-full border border-cyan-400/60 bg-[#081126]/95 px-3 py-0.5 text-[0.68rem] font-mono font-bold text-cyan-200 shadow-[0_0_18px_rgba(6,182,212,0.6)] backdrop-blur-md"
                            >
                              {item.name}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Technology Icon */}
                        <div
                          className={`relative flex items-center justify-center h-12 w-12 transition-transform duration-300 ${
                            isHovered ? '-translate-y-1.5 scale-110' : 'translate-y-0 scale-100'
                          }`}
                        >
                          {item.icon}
                        </div>

                        {/* Holographic Glowing Light Stage / Pedestal */}
                        <div
                          className={`mt-1 flex flex-col items-center justify-center transition-all duration-300 ${
                            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-75 pointer-events-none'
                          }`}
                        >
                          <div className="relative flex items-center justify-center w-16 h-3">
                            <div className="absolute w-20 h-5 rounded-[100%] bg-cyan-400/30 blur-md" />
                            <div className="absolute w-14 h-2 rounded-[100%] border border-cyan-300/80 bg-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.9)]" />
                            <div className="absolute w-7 h-1 rounded-[100%] bg-white blur-[0.5px]" />
                          </div>
                        </div>

                        {/* Subtitle Label */}
                        <span
                          className={`text-[0.72rem] sm:text-xs font-medium text-center mt-1.5 transition-colors whitespace-nowrap ${
                            isHovered ? 'text-cyan-200 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Right Scroll Chevron Button */}
                <button
                  onClick={() => handleScroll(row.id, 'right')}
                  className="hidden md:flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 hover:text-cyan-300 hover:bg-white/5 transition-all ml-1 sm:ml-2"
                  aria-label={`Scroll ${row.title} Right`}
                >
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

