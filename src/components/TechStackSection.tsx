import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FaBrain,
  FaCode,
  FaTerminal,
  FaDatabase,
  FaServer,
  FaNetworkWired,
  FaCubes,
  FaChevronLeft,
  FaChevronRight,
  FaAtom,
} from 'react-icons/fa6';
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
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
  SiGithub,
  SiPostman,
  SiOpencv,
  SiScikitlearn,
  SiPandas,
  SiPytorch,
} from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';
import { portfolioData, SkillItem } from '../data/portfolioData';

// Technology metadata & signature brand glow colors
interface TechMeta {
  icon: React.ReactNode;
  brandColor: string;
  glowColor: string;
  tag: string;
}

const TECH_CONFIG: Record<string, TechMeta> = {
  python: {
    icon: <SiPython className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    tag: 'Core AI & Scripting',
  },
  cpp: {
    icon: <SiCplusplus className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#60A5FA',
    glowColor: 'rgba(96, 165, 250, 0.45)',
    tag: 'DSA & High Perf',
  },
  javascript: {
    icon: <SiJavascript className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#FACC15',
    glowColor: 'rgba(250, 204, 21, 0.45)',
    tag: 'ES6+ & Async Engine',
  },
  sql: {
    icon: <FaDatabase className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#34D399',
    glowColor: 'rgba(52, 211, 153, 0.45)',
    tag: 'Relational Querying',
  },
  ml: {
    icon: <FaBrain className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#C084FC',
    glowColor: 'rgba(192, 132, 252, 0.5)',
    tag: 'Supervised & Unsupervised',
  },
  dl: {
    icon: <SiPytorch className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#FB923C',
    glowColor: 'rgba(251, 146, 60, 0.5)',
    tag: 'CNNs, RNNs & LSTMs',
  },
  nlp: {
    icon: <FaCode className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#F472B6',
    glowColor: 'rgba(244, 114, 182, 0.45)',
    tag: 'NLTK & Text Mining',
  },
  opencv: {
    icon: <SiOpencv className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#818CF8',
    glowColor: 'rgba(129, 140, 248, 0.5)',
    tag: 'Vision & Haar Cascades',
  },
  scikit: {
    icon: <SiScikitlearn className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#FB923C',
    glowColor: 'rgba(251, 146, 60, 0.45)',
    tag: 'Pipelines & Modeling',
  },
  datascience: {
    icon: <SiPandas className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#22D3EE',
    glowColor: 'rgba(34, 211, 238, 0.45)',
    tag: 'Pandas & EDA Analytics',
  },
  react: {
    icon: <SiReact className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#67E8F9',
    glowColor: 'rgba(103, 232, 249, 0.55)',
    tag: 'Component Architecture',
  },
  tailwind: {
    icon: <SiTailwindcss className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    tag: 'Modern UI & Glass',
  },
  html: {
    icon: <SiHtml5 className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#FB923C',
    glowColor: 'rgba(251, 146, 60, 0.45)',
    tag: 'Semantic Layouts',
  },
  node: {
    icon: <SiNodedotjs className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#4ADE80',
    glowColor: 'rgba(74, 222, 128, 0.45)',
    tag: 'Async Runtimes',
  },
  express: {
    icon: <SiExpress className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#E2E8F0',
    glowColor: 'rgba(226, 232, 240, 0.4)',
    tag: 'RESTful Middleware',
  },
  flask: {
    icon: <SiFlask className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#94A3B8',
    glowColor: 'rgba(148, 163, 184, 0.4)',
    tag: 'Python Microservices',
  },
  api: {
    icon: <FaServer className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#A78BFA',
    glowColor: 'rgba(167, 139, 250, 0.45)',
    tag: 'Endpoints & JSON Contracts',
  },
  mongodb: {
    icon: <SiMongodb className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#4ADE80',
    glowColor: 'rgba(74, 222, 128, 0.45)',
    tag: 'Document Modeling',
  },
  mysql: {
    icon: <SiMysql className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#60A5FA',
    glowColor: 'rgba(96, 165, 250, 0.45)',
    tag: 'Relational Schemas',
  },
  firebase: {
    icon: <SiFirebase className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#FBBF24',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    tag: 'Firestore & Auth',
  },
  supabase: {
    icon: <SiSupabase className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#34D399',
    glowColor: 'rgba(52, 211, 153, 0.45)',
    tag: 'Postgres Cloud BaaS',
  },
  sqlite: {
    icon: <SiSqlite className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    tag: 'Embedded Persistence',
  },
  git: {
    icon: <SiGithub className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#F1F5F9',
    glowColor: 'rgba(241, 245, 249, 0.45)',
    tag: 'Version Control & CI',
  },
  postman: {
    icon: <SiPostman className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#FB923C',
    glowColor: 'rgba(251, 146, 60, 0.5)',
    tag: 'API Automated Testing',
  },
  vscode: {
    icon: <TbBrandVscode className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    tag: 'Full-Stack Workflows',
  },
};

// Core Concepts configuration with professional icons
interface ConceptMeta {
  title: string;
  icon: React.ReactNode;
  brandColor: string;
  glowColor: string;
  tag: string;
}

const CORE_CONCEPTS_DATA: ConceptMeta[] = [
  {
    title: 'Data Structures & Algorithms',
    icon: <FaNetworkWired className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    tag: 'Trees, Graphs & Complexity',
  },
  {
    title: 'Object-Oriented Programming (OOP)',
    icon: <FaCubes className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#C084FC',
    glowColor: 'rgba(192, 132, 252, 0.5)',
    tag: 'Inheritance & Modularity',
  },
  {
    title: 'Database Management Systems (DBMS)',
    icon: <FaDatabase className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#34D399',
    glowColor: 'rgba(52, 211, 153, 0.5)',
    tag: 'ACID, Normalization & Indexing',
  },
  {
    title: 'Operating Systems',
    icon: <FaTerminal className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#F472B6',
    glowColor: 'rgba(244, 114, 182, 0.5)',
    tag: 'Processes, Threads & Memory',
  },
];

// Single Floating Skill Item (Zero cards, open space, brand glow)
interface FloatingSkillProps {
  name: string;
  iconName: string;
  description: string;
  level: number;
  popular?: boolean;
  index: number;
}

function FloatingSkill({
  name,
  iconName,
  description,
  level,
  popular,
  index,
}: FloatingSkillProps) {
  const [isHovered, setIsHovered] = useState(false);
  const meta = TECH_CONFIG[iconName] || {
    icon: <FaCode className="w-10 h-10 sm:w-12 sm:h-12" />,
    brandColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    tag: 'Engineering Stack',
  };

  // Staggered vertical float delay for natural organic floating in space
  const floatDelay = (index % 5) * 0.7;

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`${name}: ${description}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="group relative flex flex-col items-center justify-center shrink-0 px-6 sm:px-10 py-6 select-none cursor-pointer outline-none focus-visible:scale-110 transition-transform"
      style={{
        perspective: 1000,
      }}
    >
      {/* Ambient Floating Motion Container */}
      <motion.div
        animate={{
          y: isHovered ? -6 : [0, -5, 0],
        }}
        transition={{
          y: isHovered
            ? { duration: 0.2, ease: 'easeOut' }
            : {
                duration: 4.5 + (index % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelay,
              },
        }}
        className="relative flex flex-col items-center justify-center"
      >
        {/* Technology Radial Ambient Glow (Fades in on hover / subtle base pulse) */}
        <div
          className="absolute -inset-4 rounded-full pointer-events-none transition-opacity duration-500 blur-xl"
          style={{
            backgroundColor: meta.glowColor,
            opacity: isHovered ? 0.85 : popular ? 0.2 : 0.08,
            transform: isHovered ? 'scale(1.3)' : 'scale(1)',
          }}
        />

        {/* Floating Icon */}
        <div
          className="relative transition-all duration-300 ease-out"
          style={{
            color: isHovered ? meta.brandColor : 'rgba(226, 232, 240, 0.75)',
            filter: isHovered
              ? `drop-shadow(0 0 16px ${meta.glowColor})`
              : popular
              ? `drop-shadow(0 0 6px ${meta.glowColor})`
              : 'drop-shadow(0 0 2px rgba(255,255,255,0.1))',
            transform: isHovered ? 'scale(1.15)' : 'scale(1)',
          }}
        >
          {meta.icon}
        </div>

        {/* Floating Metadata (Clean minimal typography, zero card outline) */}
        <div className="mt-3 flex flex-col items-center text-center transition-all duration-300">
          <span
            className="text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-300"
            style={{
              color: isHovered ? '#FFFFFF' : 'rgba(203, 213, 225, 0.85)',
              textShadow: isHovered ? `0 0 12px ${meta.glowColor}` : 'none',
            }}
          >
            {name}
          </span>

          {/* Floating Category Hint (Whisper text appearing gracefully) */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isHovered
                ? 'opacity-100 max-h-8 translate-y-0 mt-1'
                : 'opacity-0 max-h-0 -translate-y-1'
            }`}
          >
            <span
              className="text-[0.65rem] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full"
              style={{
                color: meta.brandColor,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              {meta.tag}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Single Floating Core Concept Item
function FloatingCoreConcept({
  concept,
  index,
}: {
  concept: ConceptMeta;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const floatDelay = (index % 4) * 0.8;

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={concept.title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="group relative flex flex-col items-center justify-center shrink-0 px-6 sm:px-10 py-6 select-none cursor-pointer outline-none focus-visible:scale-110 transition-transform"
    >
      <motion.div
        animate={{
          y: isHovered ? -6 : [0, -5, 0],
        }}
        transition={{
          y: isHovered
            ? { duration: 0.2, ease: 'easeOut' }
            : {
                duration: 4.8 + index,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelay,
              },
        }}
        className="relative flex flex-col items-center justify-center"
      >
        <div
          className="absolute -inset-4 rounded-full pointer-events-none transition-opacity duration-500 blur-xl"
          style={{
            backgroundColor: concept.glowColor,
            opacity: isHovered ? 0.85 : 0.15,
            transform: isHovered ? 'scale(1.3)' : 'scale(1)',
          }}
        />

        <div
          className="relative transition-all duration-300 ease-out"
          style={{
            color: isHovered ? concept.brandColor : 'rgba(226, 232, 240, 0.75)',
            filter: isHovered
              ? `drop-shadow(0 0 16px ${concept.glowColor})`
              : `drop-shadow(0 0 4px ${concept.glowColor})`,
            transform: isHovered ? 'scale(1.15)' : 'scale(1)',
          }}
        >
          {concept.icon}
        </div>

        <div className="mt-3 flex flex-col items-center text-center transition-all duration-300">
          <span
            className="text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-300 max-w-[180px] sm:max-w-[220px]"
            style={{
              color: isHovered ? '#FFFFFF' : 'rgba(203, 213, 225, 0.85)',
              textShadow: isHovered ? `0 0 12px ${concept.glowColor}` : 'none',
            }}
          >
            {concept.title}
          </span>

          <div
            className={`transition-all duration-300 overflow-hidden ${
              isHovered
                ? 'opacity-100 max-h-8 translate-y-0 mt-1'
                : 'opacity-0 max-h-0 -translate-y-1'
            }`}
          >
            <span
              className="text-[0.65rem] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full"
              style={{
                color: concept.brandColor,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              {concept.tag}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Independent Horizontal Technology Stream Row
interface StreamRowProps {
  indexNumber: string;
  categoryLabel: string;
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
}

function StreamRow({
  indexNumber,
  categoryLabel,
  children,
  direction = 'left',
  speed = 0.45,
}: StreamRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mouse Drag state
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);

  // Auto-scroll tick loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    let lastTimestamp = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTimestamp;
      lastTimestamp = now;

      if (!isInteractingRef.current && scrollContainer) {
        const moveStep = speed * (delta / 16.67);
        if (direction === 'left') {
          scrollContainer.scrollLeft += moveStep;
          // Loop reset when half the doubled content is reached
          if (
            scrollContainer.scrollLeft >=
            scrollContainer.scrollWidth / 2 - 1
          ) {
            scrollContainer.scrollLeft = 0;
          }
        } else {
          scrollContainer.scrollLeft -= moveStep;
          if (scrollContainer.scrollLeft <= 0) {
            scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [direction, speed, prefersReducedMotion]);

  // Drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isInteractingRef.current = true;
    isDraggingRef.current = true;
    if (containerRef.current) {
      startXRef.current = e.pageX - containerRef.current.offsetLeft;
      scrollLeftRef.current = containerRef.current.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    isInteractingRef.current = false;
  };

  // Subtle nudge controls
  const handleNudge = (nudgeDirection: 'prev' | 'next') => {
    if (containerRef.current) {
      const offset = nudgeDirection === 'prev' ? -220 : 220;
      containerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-full py-4 my-2"
    >
      {/* Minimal Category Header */}
      <div className="flex items-center justify-between px-4 sm:px-8 mb-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-[0.68rem] font-mono font-bold tracking-widest text-cyan-400/80">
            {indexNumber}
          </span>
          <div className="h-3 w-[1px] bg-white/20" />
          <h3 className="text-xs sm:text-sm font-mono tracking-widest uppercase font-semibold text-slate-300">
            {categoryLabel}
          </h3>
        </div>

        {/* Minimal Subtle Navigation Arrows */}
        <div className="flex items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleNudge('prev')}
            aria-label={`Scroll ${categoryLabel} left`}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-all text-xs"
          >
            <FaChevronLeft className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={() => handleNudge('next')}
            aria-label={`Scroll ${categoryLabel} right`}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-all text-xs"
          >
            <FaChevronRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Floating Technology Stream Container */}
      <div className="relative w-full overflow-hidden">
        {/* Horizon Fade Edges (Infinite Space Horizon effect) */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#030305] via-[#030305]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#030305] via-[#030305]/80 to-transparent z-10" />

        <div
          ref={containerRef}
          onMouseEnter={() => {
            isInteractingRef.current = true;
          }}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onTouchStart={() => {
            isInteractingRef.current = true;
          }}
          onTouchEnd={() => {
            isInteractingRef.current = false;
          }}
          className="flex overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Loop duplicated twice for continuous seamless floating stream */}
          <div ref={scrollTrackRef} className="flex shrink-0 items-center">
            {children}
          </div>
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>

      {/* Ultra-subtle stream divider line */}
      <div className="w-full max-w-6xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent mt-2" />
    </motion.div>
  );
}

// Main Futuristic Floating Technology Constellation Section
export default function TechStackSection() {
  const { skillCategories, skills } = portfolioData;

  return (
    <section
      id="skills"
      className="relative scroll-mt-20 py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Ambient Cosmic Background Lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-purple-600/10 via-cyan-500/10 to-transparent blur-[120px] rounded-full -z-10" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/3 w-[500px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full -z-10" />

      <div className="w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-cyan-300 uppercase">
            <FaAtom className="text-xs animate-spin-slow" />
            <span>TECHNOLOGY CONSTELLATION // ECOSYSTEM</span>
          </div>

          <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            SKILLS &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              TECHNOLOGIES
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-400 font-mono">
            Interactive technology streams floating across AI, full-stack, and intelligent systems.
          </p>
        </div>

        {/* 01: Languages Stream */}
        <StreamRow
          indexNumber="01"
          categoryLabel="LANGUAGES"
          direction="left"
          speed={0.4}
        >
          {skills
            .filter((s) => s.category === 'languages')
            .map((skill, idx) => (
              <FloatingSkill
                key={`lang-${skill.name}`}
                name={skill.name}
                iconName={skill.iconName}
                description={skill.description}
                level={skill.level}
                popular={skill.popular}
                index={idx}
              />
            ))}
        </StreamRow>

        {/* 02: AI & Machine Learning Stream */}
        <StreamRow
          indexNumber="02"
          categoryLabel="AI & MACHINE LEARNING"
          direction="right"
          speed={0.35}
        >
          {skills
            .filter((s) => s.category === 'aiml')
            .map((skill, idx) => (
              <FloatingSkill
                key={`aiml-${skill.name}`}
                name={skill.name}
                iconName={skill.iconName}
                description={skill.description}
                level={skill.level}
                popular={skill.popular}
                index={idx}
              />
            ))}
        </StreamRow>

        {/* 03: Frontend Stream */}
        <StreamRow
          indexNumber="03"
          categoryLabel="FRONTEND"
          direction="left"
          speed={0.45}
        >
          {skills
            .filter((s) => s.category === 'frontend')
            .map((skill, idx) => (
              <FloatingSkill
                key={`front-${skill.name}`}
                name={skill.name}
                iconName={skill.iconName}
                description={skill.description}
                level={skill.level}
                popular={skill.popular}
                index={idx}
              />
            ))}
        </StreamRow>

        {/* 04: Backend & APIs Stream */}
        <StreamRow
          indexNumber="04"
          categoryLabel="BACKEND & APIs"
          direction="right"
          speed={0.4}
        >
          {skills
            .filter((s) => s.category === 'backend')
            .map((skill, idx) => (
              <FloatingSkill
                key={`back-${skill.name}`}
                name={skill.name}
                iconName={skill.iconName}
                description={skill.description}
                level={skill.level}
                popular={skill.popular}
                index={idx}
              />
            ))}
        </StreamRow>

        {/* 05: Databases & Cloud Stream */}
        <StreamRow
          indexNumber="05"
          categoryLabel="DATABASES & CLOUD"
          direction="left"
          speed={0.38}
        >
          {skills
            .filter((s) => s.category === 'database')
            .map((skill, idx) => (
              <FloatingSkill
                key={`db-${skill.name}`}
                name={skill.name}
                iconName={skill.iconName}
                description={skill.description}
                level={skill.level}
                popular={skill.popular}
                index={idx}
              />
            ))}
        </StreamRow>

        {/* 06: Tools & DevOps Stream */}
        <StreamRow
          indexNumber="06"
          categoryLabel="TOOLS & DEVOPS"
          direction="right"
          speed={0.42}
        >
          {skills
            .filter((s) => s.category === 'tools')
            .map((skill, idx) => (
              <FloatingSkill
                key={`tool-${skill.name}`}
                name={skill.name}
                iconName={skill.iconName}
                description={skill.description}
                level={skill.level}
                popular={skill.popular}
                index={idx}
              />
            ))}
        </StreamRow>

        {/* 07: Core Computer Science Concepts Stream */}
        <StreamRow
          indexNumber="07"
          categoryLabel="CORE CONCEPTS"
          direction="left"
          speed={0.35}
        >
          {CORE_CONCEPTS_DATA.map((concept, idx) => (
            <FloatingCoreConcept
              key={`concept-${concept.title}`}
              concept={concept}
              index={idx}
            />
          ))}
        </StreamRow>
      </div>
    </section>
  );
}

