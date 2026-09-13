import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGraduationCap,
  FaCertificate,
  FaAward,
  FaBuildingColumns,
  FaCalendarDays,
  FaBrain,
  FaCode,
  FaLayerGroup,
  FaFilter,
  FaShieldHalved,
  FaVolleyball,
  FaCircleCheck,
} from 'react-icons/fa6';
import { portfolioData } from '../data/portfolioData';
import TimelineNodeCard from './TimelineNodeCard';
import CredentialModal, { TimelineItemData } from './CredentialModal';
import KnowledgeMap from './KnowledgeMap';

type FilterType = 'all' | 'education' | 'certification' | 'training';

const TIMELINE_DATA: TimelineItemData[] = [
  {
    id: 'btech-uit',
    category: 'education',
    title: 'B.Tech in Computer Science & Engineering (AI & ML)',
    organization: 'United Institute Of Technology',
    subLocation: 'Dr. APJ Abdul Kalam Technical University',
    year: '2023 - 2027',
    date: 'August 2023 - Present (Graduation: 2027)',
    description:
      'Specialized engineering program in Artificial Intelligence and Machine Learning. Rigorous hands-on curriculum covering Deep Learning, Computer Vision, NLP, Data Structures & Algorithms, Operating Systems, Database Management Systems, and Full-Stack Web Engineering.',
    syllabus: [
      'Artificial Intelligence & Applied Machine Learning Algorithms',
      'Deep Neural Network Architectures & Computer Vision',
      'Data Structures, Algorithms (C++) & Object-Oriented Systems',
      'Database Management Systems (SQL & NoSQL) & Web Architecture',
    ],
    skills: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Data Science', 'Python', 'Full Stack', 'C++'],
    isCurrent: true,
    accentColor: '#06b6d4',
    badgeLabel: 'UNDERGRADUATE DEGREE',
  },
  {
    id: 'iiit-allahabad-ml',
    category: 'certification',
    title: 'Machine Learning and Neural Networks Certification',
    organization: 'IIIT Allahabad',
    subLocation: 'Center for AI Research',
    year: 'July 2025',
    date: 'July 2025',
    description:
      'Completed specialized institutional certification focusing on applied machine learning algorithms, deep neural network architectures, backpropagation mathematics, loss function optimization, and hands-on predictive model training.',
    syllabus: [
      'Supervised & Unsupervised Learning Architectures',
      'Multi-Layer Perceptrons & Backpropagation Math',
      'Convolutional Neural Networks (CNNs) & Feature Extraction',
      'Model Evaluation, Overfitting Prevention & Hyperparameter Tuning',
    ],
    skills: ['Neural Networks', 'Machine Learning', 'Deep Learning', 'Python', 'Model Training'],
    accentColor: '#a855f7',
    badgeLabel: 'INSTITUTIONAL CERTIFICATE',
  },
  {
    id: 'uit-python-ds',
    category: 'certification',
    title: 'Python for Data Science Certification',
    organization: 'United Institute of Technology (UIT)',
    year: 'August 2024',
    date: 'August 2024',
    description:
      'Comprehensive training in Python data processing pipelines, NumPy vectorized array manipulation, Pandas exploratory data analysis (EDA), Matplotlib visualization, and automated data wrangling methodologies.',
    syllabus: [
      'Data Cleaning, Missing Value Imputation & Outlier Handling',
      'NumPy Vectorized Array Operations & Matrix Computations',
      'Pandas DataFrames, GroupBy, Filtering & Reshaping',
      'Exploratory Data Analysis & Statistical Plotting',
    ],
    skills: ['Python', 'Data Science', 'Pandas', 'NumPy', 'EDA', 'Matplotlib'],
    accentColor: '#06b6d4',
    badgeLabel: 'ACADEMIC CERTIFICATE',
  },
  {
    id: 'cwh-data-science',
    category: 'certification',
    title: 'Data Science Professional Course',
    organization: 'Code With Harry',
    year: 'March 2026',
    date: 'March 2026',
    description:
      'Rigorous end-to-end data science course covering exploratory data analysis (EDA), feature engineering, classification, regression pipelines, model evaluation metrics, and deployment workflows.',
    syllabus: [
      'End-to-End Machine Learning Model Workflows',
      'Scikit-Learn Classifiers, Regressors & Ensembles',
      'Feature Scaling, One-Hot Encoding & Pipeline Construction',
      'Model Deployment Concepts & Web Integration',
    ],
    skills: ['Data Science', 'Scikit-Learn', 'EDA', 'Model Deployment', 'Python'],
    accentColor: '#3b82f6',
    badgeLabel: 'TECHNICAL COURSE',
  },
  {
    id: 'gdg-web-quiz',
    category: 'training',
    title: 'Web Development Competitive Quiz — Top 5 Finalist',
    organization: 'GDG On Campus UIT',
    year: 'July 2025',
    date: 'July 2025',
    description:
      'Recognized among the Top 5 top-performing competitors in a web development tournament evaluating full-stack concepts, JavaScript runtime execution, asynchronous DOM handling, and modern UI engineering.',
    syllabus: [
      'JavaScript Execution Context, Event Loop & Async/Await',
      'Modern Responsive UI/UX Principles & DOM Optimization',
      'Full-Stack Web Architectures & REST API Contracts',
    ],
    skills: ['Web Development', 'JavaScript', 'Problem Solving', 'UI/UX Engineering'],
    accentColor: '#10b981',
    badgeLabel: 'COMPETITIVE RECOGNITION',
  },
  {
    id: 'ecell-ideathon',
    category: 'training',
    title: 'Ideathon Innovation & Startup Sprint',
    organization: 'E-Cell UIT, United Incubation Hub',
    year: 'Innovation Sprint',
    date: 'Innovation Sprint',
    description:
      'Collaborated in a multidisciplinary team to conceptualize, architect, and prototype tech-enabled business solutions addressing real-world operational bottlenecks during an intense innovation sprint.',
    syllabus: [
      'Problem Discovery & User Journey Validation',
      'Rapid System Prototyping & Architectural Feasibility',
      'Business Model Viability & Pitch Deck Presentation',
    ],
    skills: ['Product Thinking', 'System Architecture', 'Rapid Prototyping', 'Teamwork'],
    accentColor: '#f59e0b',
    badgeLabel: 'INNOVATION SPRINT',
  },
  {
    id: 'volleyball-team',
    category: 'training',
    title: 'College Volleyball Team Representative',
    organization: 'United Institute of Technology Athletics',
    year: '2023 - Present',
    date: '2023 - Present',
    description:
      'Represented the college in competitive volleyball tournaments, building on-court tactical strategy, high-pressure resilience, disciplined team communication, and leadership under pressure.',
    syllabus: [
      'Strategic On-Court Defensive & Offensive Systems',
      'High-Pressure Decision Making & Mental Resilience',
      'Team Leadership, Discipline & Coordinated Action',
    ],
    skills: ['Team Leadership', 'High-Pressure Execution', 'Discipline', 'Tactical Communication'],
    accentColor: '#ec4899',
    badgeLabel: 'ATHLETIC LEADERSHIP',
  },
  {
    id: 'intermediate-12th',
    category: 'education',
    title: 'Intermediate (12th Grade) — Science & Mathematics',
    organization: 'Green View Public School',
    subLocation: 'CBSE Board',
    year: '2021',
    date: '2021',
    description:
      'Completed Senior Secondary education in the Science and Mathematics stream with strong foundational physics, chemistry, calculus, and computing principles.',
    syllabus: [
      'Calculus, Linear Algebra & Probability',
      'Classical Mechanics & Electromagnetism',
      'Analytical Problem Solving & Logic',
    ],
    skills: ['Mathematics', 'Physics', 'Analytical Logic', 'Problem Solving'],
    accentColor: '#8b5cf6',
    badgeLabel: 'CBSE SENIOR SECONDARY',
  },
  {
    id: 'high-school-10th',
    category: 'education',
    title: 'High School (10th Grade)',
    organization: 'G.D Memorial Children’s Academy',
    subLocation: 'CBSE Board',
    year: '2019',
    date: '2019',
    description:
      'Completed Secondary school education under the CBSE curriculum with distinctions in Science and Mathematics, establishing strong quantitative and logical foundations.',
    syllabus: [
      'Core Mathematics, Geometry & Algebra',
      'General Sciences (Physics, Chemistry, Biology)',
      'Foundations of Computing & Logic',
    ],
    skills: ['Mathematics', 'General Science', 'Logical Reasoning'],
    accentColor: '#64748b',
    badgeLabel: 'CBSE SECONDARY SCHOOL',
  },
];

export default function TimelineSection() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedItem, setSelectedItem] = useState<TimelineItemData | null>(null);

  // Filtered items
  const filteredItems = useMemo(() => {
    if (filter === 'all') return TIMELINE_DATA;
    return TIMELINE_DATA.filter((item) => item.category === filter);
  }, [filter]);

  const filterButtons: { id: FilterType; label: string; count: number }[] = [
    { id: 'all', label: 'ALL MILESTONES', count: TIMELINE_DATA.length },
    {
      id: 'education',
      label: 'EDUCATION',
      count: TIMELINE_DATA.filter((i) => i.category === 'education').length,
    },
    {
      id: 'certification',
      label: 'CERTIFICATIONS',
      count: TIMELINE_DATA.filter((i) => i.category === 'certification').length,
    },
    {
      id: 'training',
      label: 'TRAINING & AWARDS',
      count: TIMELINE_DATA.filter((i) => i.category === 'training').length,
    },
  ];

  return (
    <section
      id="milestones"
      className="relative scroll-mt-20 py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#020206] text-slate-100 select-none"
    >
      {/* Background Cosmic Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.06),rgba(168,85,247,0.04),transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-purple-300 uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <FaAward className="text-cyan-400 text-xs" />
            <span>CAREER & CREDENTIAL COMMAND CENTER</span>
          </div>

          <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            MY{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]">
              JOURNEY
            </span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm font-mono tracking-[0.25em] text-cyan-300 uppercase font-semibold">
            EDUCATION • TRAINING • CERTIFICATIONS
          </p>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Verified academic background at United Institute of Technology, institutional AI certifications from IIIT Allahabad, and specialized engineering training.
          </p>
        </div>

        {/* Career Stats Telemetry HUD */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/20 to-black/60 p-4 sm:p-5 backdrop-blur-xl text-left shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
              <span className="font-bold uppercase tracking-wider">PRIMARY DEGREE</span>
              <FaGraduationCap className="text-cyan-300 text-sm" />
            </div>
            <p className="mt-2 text-lg sm:text-xl font-extrabold text-white">B.Tech CSE (AI & ML)</p>
            <p className="text-[0.65rem] sm:text-xs font-mono text-slate-400 mt-0.5">
              UIT • AKTU (2023 - 2027)
            </p>
          </div>

          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-950/20 to-black/60 p-4 sm:p-5 backdrop-blur-xl text-left shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-purple-400">
              <span className="font-bold uppercase tracking-wider">CERTIFICATIONS</span>
              <FaCertificate className="text-purple-300 text-sm" />
            </div>
            <p className="mt-2 text-lg sm:text-xl font-extrabold text-white">5+ Credentials</p>
            <p className="text-[0.65rem] sm:text-xs font-mono text-slate-400 mt-0.5">
              IIIT Allahabad & UIT Verified
            </p>
          </div>

          <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-950/20 to-black/60 p-4 sm:p-5 backdrop-blur-xl text-left shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-blue-400">
              <span className="font-bold uppercase tracking-wider">TIMELINE SPAN</span>
              <FaCalendarDays className="text-blue-300 text-sm" />
            </div>
            <p className="mt-2 text-lg sm:text-xl font-extrabold text-white">2019 — Present</p>
            <p className="text-[0.65rem] sm:text-xs font-mono text-slate-400 mt-0.5">
              4+ Years of Technical Mastery
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-black/60 p-4 sm:p-5 backdrop-blur-xl text-left shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
              <span className="font-bold uppercase tracking-wider">STATUS</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            </div>
            <p className="mt-2 text-lg sm:text-xl font-extrabold text-white">Active Undergraduate</p>
            <p className="text-[0.65rem] sm:text-xs font-mono text-slate-400 mt-0.5">
              Open for Internships & AI Roles
            </p>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-xl shadow-inner">
            {filterButtons.map((btn) => {
              const isActive = filter === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => setFilter(btn.id)}
                  className={`relative rounded-full px-4 sm:px-5 py-2 text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-200 select-none active:scale-95 flex items-center gap-2 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTimelineFilterIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/60 via-indigo-600/60 to-cyan-500/60 border border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.35)] -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span>{btn.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[0.65rem] ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-slate-500'
                    }`}
                  >
                    {btn.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Vertical Career Timeline */}
        <div className="mt-12 sm:mt-16 relative">
          {/* Central Glowing Cyber Spine (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-500/80 via-purple-500/80 to-emerald-500/40 pointer-events-none">
            {/* Animated Traveling Photon Pulse */}
            <motion.div
              animate={{ y: ['0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="h-16 w-full bg-gradient-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_#06b6d4]"
            />
          </div>

          {/* Left Vertical Spine (Mobile) */}
          <div className="lg:hidden absolute left-4 sm:left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/80 via-purple-500/80 to-emerald-500/40 pointer-events-none" />

          {/* Timeline Nodes Grid */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-0 pl-10 sm:pl-14 lg:pl-0">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <TimelineNodeCard
                    key={item.id}
                    item={item}
                    index={index}
                    isLeft={isLeft}
                    onSelect={(selected) => setSelectedItem(selected)}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Interactive Knowledge Map & Domain Graph */}
        <KnowledgeMap />
      </div>

      {/* Credential & Academic Dossier Modal */}
      <CredentialModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
