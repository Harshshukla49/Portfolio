import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa6';

interface FloatingAITriggerProps {
  onClick: () => void;
}

export default function FloatingAITrigger({ onClick }: FloatingAITriggerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-3 rounded-full border border-purple-400/50 bg-gradient-to-r from-purple-900/90 via-black to-cyan-900/90 p-1.5 pr-5 text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] backdrop-blur-2xl hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] hover:border-cyan-400/80 transition-all duration-300"
      >
        {/* Pulsing AI Brain Orb */}
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
            <FaBrain className="text-cyan-300 text-sm group-hover:scale-110 transition-transform animate-pulse" />
          </div>
          {/* Ping Beacon */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500" />
          </span>
        </div>

        {/* Text Label */}
        <div className="text-left font-mono">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cyan-200">
              ✦ ASK HARSH AI
            </span>
          </div>
          <p className="text-[0.6rem] text-slate-400 tracking-wider uppercase">PORTFOLIO INTELLIGENCE</p>
        </div>
      </motion.button>
    </div>
  );
}
