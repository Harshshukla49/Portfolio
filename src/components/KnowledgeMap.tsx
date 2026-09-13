import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBrain,
  FaCode,
  FaDatabase,
  FaNetworkWired,
  FaArrowDown,
  FaArrowRight,
  FaLayerGroup,
  FaCircleCheck,
  FaMicrochip,
  FaServer,
  FaEye,
  FaComments,
  FaCloud,
} from 'react-icons/fa6';

interface KnowledgeNode {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tags: string[];
  sourceMilestone: string;
  description: string;
  color: string;
}

interface KnowledgeTrack {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  accentColor: string;
  icon: React.ReactNode;
  nodes: KnowledgeNode[];
}

const KNOWLEDGE_TRACKS: KnowledgeTrack[] = [
  {
    id: 'aiml',
    title: 'AI & Machine Learning Core',
    subtitle: 'From mathematical foundations to deep neural vision & NLP pipelines',
    badge: 'INTELLIGENCE TRACK',
    accentColor: '#06b6d4',
    icon: <FaBrain className="text-cyan-400" />,
    nodes: [
      {
        id: 'aiml-1',
        step: 'STAGE 01',
        title: 'Python for Data Science & EDA',
        subtitle: 'Vectorized data cleaning & statistics',
        icon: <FaBrain className="text-cyan-300" />,
        tags: ['Python', 'NumPy', 'Pandas', 'EDA', 'Matplotlib'],
        sourceMilestone: 'UIT Data Science Certification',
        description:
          'Data wrangling, matrix manipulation, outlier detection, and statistical distribution modeling on real-world datasets.',
        color: '#06b6d4',
      },
      {
        id: 'aiml-2',
        step: 'STAGE 02',
        title: 'Supervised & Unsupervised ML',
        subtitle: 'Algorithmic regression & classification',
        icon: <FaNetworkWired className="text-purple-300" />,
        tags: ['Scikit-Learn', 'Regression', 'Decision Trees', 'Clustering', 'TF-IDF'],
        sourceMilestone: 'CodeWithHarry Data Science & Twitter Project',
        description:
          'Feature engineering pipelines, model validation, hyperparameter grid search, and accuracy metric optimization.',
        color: '#a855f7',
      },
      {
        id: 'aiml-3',
        step: 'STAGE 03',
        title: 'Deep Neural Networks & Architectures',
        subtitle: 'Backpropagation, CNNs & LSTMs',
        icon: <FaMicrochip className="text-pink-300" />,
        tags: ['Neural Networks', 'CNN', 'RNN/LSTM', 'MFCC Audio', 'TensorFlow/PyTorch'],
        sourceMilestone: 'IIIT Allahabad ML & Speech Emotion Project',
        description:
          'Multi-layer perceptron training, spatial convolutional filters for image spectrograms, and temporal recurrence for voice sequences.',
        color: '#ec4899',
      },
      {
        id: 'aiml-4',
        step: 'STAGE 04',
        title: 'Perception AI: Vision & Speech Systems',
        subtitle: 'Production Biometrics & Affective AI',
        icon: <FaEye className="text-emerald-300" />,
        tags: ['OpenCV', 'Haar Cascades', 'Face Recognition', 'Real-Time Telemetry'],
        sourceMilestone: 'Biometric Attendance (90% Acc) & Smart Health',
        description:
          'Real-time webcam frame processing, face bounding box detection, and continuous vital anomaly scoring in deployed environments.',
        color: '#10b981',
      },
    ],
  },
  {
    id: 'systems',
    title: 'Computer Science & Systems',
    subtitle: 'Algorithmic efficiency, memory models & data structures',
    badge: 'FOUNDATIONAL TRACK',
    accentColor: '#3b82f6',
    icon: <FaCode className="text-blue-400" />,
    nodes: [
      {
        id: 'sys-1',
        step: 'STAGE 01',
        title: 'C++ & Procedural Foundations',
        subtitle: 'Low-level syntax & memory efficiency',
        icon: <FaCode className="text-blue-300" />,
        tags: ['C++', 'Pointers', 'Memory Allocation', 'Standard Template Library'],
        sourceMilestone: 'B.Tech Core CSE Curriculum (UIT)',
        description:
          'Pointers, memory management, compile-time optimization, and standard library algorithmic routines.',
        color: '#3b82f6',
      },
      {
        id: 'sys-2',
        step: 'STAGE 02',
        title: 'Data Structures & Algorithms (DSA)',
        subtitle: 'Time/space complexity & optimization',
        icon: <FaNetworkWired className="text-cyan-300" />,
        tags: ['Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Search Algorithms'],
        sourceMilestone: 'UIT Academic Curriculum & Competitive Coding',
        description:
          'Asymptotic Big-O analysis, graph traversals (BFS/DFS), balanced binary trees, and optimized problem solving.',
        color: '#06b6d4',
      },
      {
        id: 'sys-3',
        step: 'STAGE 03',
        title: 'Object-Oriented Programming (OOP)',
        subtitle: 'Modular architecture & design patterns',
        icon: <FaLayerGroup className="text-purple-300" />,
        tags: ['Encapsulation', 'Polymorphism', 'Inheritance', 'Abstraction'],
        sourceMilestone: 'B.Tech CSE Core Foundations',
        description:
          'Class hierarchy modeling, interface contracts, polymorphism, and maintainable software architecture paradigms.',
        color: '#a855f7',
      },
      {
        id: 'sys-4',
        step: 'STAGE 04',
        title: 'DBMS & Operating Systems',
        subtitle: 'ACID transactions, indexing & process concurrency',
        icon: <FaDatabase className="text-amber-300" />,
        tags: ['SQL', 'Normalization', 'Indexing', 'Process Scheduling', 'Concurrency'],
        sourceMilestone: 'B.Tech Technical Foundation',
        description:
          'Relational query planning, ACID transaction integrity, multithreading synchronization, and disk scheduling.',
        color: '#f59e0b',
      },
    ],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack & Cloud Architecture',
    subtitle: 'From modern user interfaces to distributed backend microservices',
    badge: 'DEPLOYMENT TRACK',
    accentColor: '#a855f7',
    icon: <FaServer className="text-purple-400" />,
    nodes: [
      {
        id: 'fs-1',
        step: 'STAGE 01',
        title: 'Modern Frontend & Reactive UI',
        subtitle: 'Component state & responsive glassmorphism',
        icon: <FaCode className="text-cyan-300" />,
        tags: ['React.js', 'Tailwind CSS', 'JavaScript ES6+', 'HTML5/CSS3'],
        sourceMilestone: 'GDG Web Dev Tournament (Top 5)',
        description:
          'Component lifecycle hooks, reactive state trees, high-performance UI rendering, and utility-first styling.',
        color: '#06b6d4',
      },
      {
        id: 'fs-2',
        step: 'STAGE 02',
        title: 'Backend Microservices & REST APIs',
        subtitle: 'Scalable routing & authentication',
        icon: <FaServer className="text-purple-300" />,
        tags: ['Node.js', 'Express.js', 'Flask', 'REST APIs', 'Auth Pipelines'],
        sourceMilestone: 'Murder Mystery & Smart Healthcare Architecture',
        description:
          'Stateless REST contracts, middleware authentication, request validation, error boundaries, and rate limiting.',
        color: '#a855f7',
      },
      {
        id: 'fs-3',
        step: 'STAGE 03',
        title: 'Multi-Model Data Persistence',
        subtitle: 'NoSQL, Relational & Real-Time Sync',
        icon: <FaDatabase className="text-pink-300" />,
        tags: ['MongoDB', 'MySQL', 'Firebase Firestore', 'SQLite', 'Supabase'],
        sourceMilestone: 'Project Multi-Database Implementations',
        description:
          'Document schema aggregation, SQLite parameterized querying, and Firebase real-time document listeners.',
        color: '#ec4899',
      },
      {
        id: 'fs-4',
        step: 'STAGE 04',
        title: 'Cloud Deployment & System Telemetry',
        subtitle: 'Continuous delivery & live monitoring',
        icon: <FaCloud className="text-emerald-300" />,
        tags: ['Render Cloud', 'Git/GitHub CI', 'Streamlit Cloud', 'Postman'],
        sourceMilestone: 'Live Production Healthcare & NLP Deployments',
        description:
          'Automated deployment pipelines on Render, cloud environment config management, and live endpoint verification.',
        color: '#10b981',
      },
    ],
  },
];

export default function KnowledgeMap() {
  const [activeTrackId, setActiveTrackId] = useState<string>('aiml');
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);

  const activeTrack =
    KNOWLEDGE_TRACKS.find((t) => t.id === activeTrackId) || KNOWLEDGE_TRACKS[0];

  return (
    <div className="mt-16 sm:mt-20 pt-12 border-t border-white/10 text-left">
      {/* Knowledge Map Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono tracking-widest text-cyan-300 uppercase">
            <FaNetworkWired className="text-xs" />
            <span>KNOWLEDGE GRAPH & SKILL VECTORS</span>
          </div>

          <h3 className="mt-2.5 text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            TECHNICAL KNOWLEDGE MAP
          </h3>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-2xl">
            How academic coursework and verified certifications connect directly to production-level engineering capabilities.
          </p>
        </div>

        {/* Track Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.02] p-1.5 backdrop-blur-md">
          {KNOWLEDGE_TRACKS.map((track) => {
            const isActive = activeTrackId === track.id;
            return (
              <button
                key={track.id}
                onClick={() => {
                  setActiveTrackId(track.id);
                  setSelectedNode(null);
                }}
                className={`relative flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-mono font-semibold transition-all select-none ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeKnowledgeTrackIndicator"
                    className="absolute inset-0 rounded-xl border bg-gradient-to-r -z-10 shadow-sm"
                    style={{
                      borderColor: `${track.accentColor}80`,
                      background: `linear-gradient(90deg, ${track.accentColor}25, rgba(255,255,255,0.04))`,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span>{track.icon}</span>
                <span className="hidden sm:inline">{track.title}</span>
                <span className="sm:hidden">{track.badge.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Track Description Banner */}
      <div
        className="mb-8 rounded-2xl border p-4 sm:p-5 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        style={{
          borderColor: `${activeTrack.accentColor}30`,
          backgroundColor: `${activeTrack.accentColor}08`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-base"
            style={{
              borderColor: `${activeTrack.accentColor}50`,
              backgroundColor: `${activeTrack.accentColor}20`,
            }}
          >
            {activeTrack.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-[0.65rem] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                style={{
                  borderColor: `${activeTrack.accentColor}50`,
                  color: activeTrack.accentColor,
                  backgroundColor: `${activeTrack.accentColor}15`,
                }}
              >
                {activeTrack.badge}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">{activeTrack.title}</h4>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">{activeTrack.subtitle}</p>
          </div>
        </div>

        <span className="font-mono text-[0.65rem] text-slate-400 bg-black/40 px-3 py-1 rounded-full border border-white/10 shrink-0">
          4 Sequential Learning Nodes
        </span>
      </div>

      {/* 4-Stage Knowledge Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {activeTrack.nodes.map((node, index) => {
          const isLast = index === activeTrack.nodes.length - 1;
          const isSelected = selectedNode?.id === node.id;

          return (
            <div key={node.id} className="relative flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setSelectedNode(isSelected ? null : node)}
                className={`group h-full cursor-pointer rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between select-none ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_25px_rgba(6,182,212,0.3)]'
                    : 'border-white/10 bg-gradient-to-b from-[#0e0e17]/80 to-black/90 hover:border-white/25 hover:bg-[#12121e]'
                }`}
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <span
                      className="text-[0.65rem] font-mono font-bold tracking-widest uppercase"
                      style={{ color: node.color }}
                    >
                      {node.step}
                    </span>
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-lg border text-xs"
                      style={{
                        borderColor: `${node.color}40`,
                        backgroundColor: `${node.color}15`,
                      }}
                    >
                      {node.icon}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h5 className="mt-3 text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {node.title}
                  </h5>
                  <p className="mt-1 text-[0.7rem] font-mono text-slate-400">
                    {node.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                    {node.description}
                  </p>
                </div>

                {/* Skill Chips & Source */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {node.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/5 bg-white/[0.04] px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-[0.65rem] font-mono text-slate-400">
                    <FaCircleCheck className="text-cyan-400 text-[0.6rem]" />
                    <span className="truncate">{node.sourceMilestone}</span>
                  </div>
                </div>
              </motion.div>

              {/* Connecting Conduit Arrow on Desktop (between columns) */}
              {!isLast && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 h-6 w-6 items-center justify-center rounded-full bg-[#030305] border border-white/20 text-slate-400 text-[0.65rem] shadow-md">
                  <FaArrowRight />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
