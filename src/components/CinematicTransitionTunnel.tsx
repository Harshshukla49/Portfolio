import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicCameraTransitionProps {
  isTransitioning: boolean;
  targetSection: string | null;
}

interface SceneInfo {
  index: string;
  label: string;
  phrase: string;
  accent: string;
}

const SCENE_INFO: Record<string, SceneInfo> = {
  about: {
    index: '01',
    label: 'ABOUT',
    phrase: 'THE PERSON BEHIND THE CODE',
    accent: '#06b6d4',
  },
  skills: {
    index: '02',
    label: 'SKILLS',
    phrase: 'THE TECHNOLOGY I BUILD WITH',
    accent: '#38bdf8',
  },
  projects: {
    index: '03',
    label: 'PROJECTS',
    phrase: 'WHERE IDEAS BECOME PRODUCTS',
    accent: '#a855f7',
  },
  milestones: {
    index: '04',
    label: 'MILESTONES',
    phrase: 'THE JOURNEY SO FAR',
    accent: '#f59e0b',
  },
  contact: {
    index: '05',
    label: 'CONTACT',
    phrase: "LET'S BUILD SOMETHING",
    accent: '#ec4899',
  },
};

export default function CinematicTransitionTunnel({
  isTransitioning,
  targetSection,
}: CinematicCameraTransitionProps) {
  const cleanTarget = (targetSection || 'projects').toLowerCase();
  const scene = SCENE_INFO[cleanTarget] || SCENE_INFO.projects;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[9990] pointer-events-none select-none flex items-center justify-center overflow-hidden">
          {/* Subtle Cinematic Horizontal Light Sweep (Fast 400ms) */}
          <motion.div
            initial={{ x: '-120%', opacity: 0 }}
            animate={{ x: '120%', opacity: [0, 0.45, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400/20 via-purple-500/20 to-transparent blur-3xl"
          />

          {/* Minimalist Scene Indicator Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-24 z-50 flex flex-col items-center justify-center text-center px-5 py-2 rounded-full border border-white/15 bg-[#08080f]/80 shadow-[0_15px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
          >
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest font-bold uppercase text-white">
              <span
                className="h-2 w-2 rounded-full shadow-sm"
                style={{ backgroundColor: scene.accent, boxShadow: `0 0 8px ${scene.accent}` }}
              />
              <span>{scene.index} / {scene.label}</span>
            </div>
            <span className="text-[0.65rem] font-mono tracking-wider text-slate-300 uppercase mt-0.5">
              {scene.phrase}
            </span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


