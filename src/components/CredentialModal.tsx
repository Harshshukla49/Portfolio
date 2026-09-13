import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaXmark,
  FaBuildingColumns,
  FaGraduationCap,
  FaCertificate,
  FaAward,
  FaCheck,
  FaFileArrowDown,
  FaShieldHalved,
  FaBrain,
  FaCode,
} from 'react-icons/fa6';

export interface TimelineItemData {
  id: string;
  category: 'education' | 'certification' | 'training';
  title: string;
  organization: string;
  subLocation?: string;
  date: string;
  year: string;
  description: string;
  syllabus?: string[];
  skills: string[];
  isCurrent?: boolean;
  accentColor: string;
  badgeLabel: string;
  credentialUrl?: string;
}

interface CredentialModalProps {
  item: TimelineItemData | null;
  onClose: () => void;
  onResumeDownload?: () => void;
}

export default function CredentialModal({
  item,
  onClose,
  onResumeDownload,
}: CredentialModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  if (!item) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'education':
        return <FaGraduationCap className="text-cyan-400 text-lg" />;
      case 'certification':
        return <FaCertificate className="text-purple-400 text-lg" />;
      case 'training':
        return <FaAward className="text-amber-400 text-lg" />;
      default:
        return <FaBuildingColumns className="text-cyan-400 text-lg" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl -z-10"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-gradient-to-b from-[#0e0e17] via-[#090910] to-[#040407] p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-left custom-scrollbar"
        >
          {/* Ambient Lighting Behind Header */}
          <div
            className="absolute top-0 right-1/4 h-48 w-48 rounded-full blur-[90px] pointer-events-none opacity-25"
            style={{ backgroundColor: item.accentColor }}
          />

          {/* Top Bar with Close Button */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl border p-0.5 shadow-inner"
                style={{
                  borderColor: `${item.accentColor}50`,
                  backgroundColor: `${item.accentColor}15`,
                }}
              >
                {getCategoryIcon(item.category)}
              </div>
              <div>
                <span
                  className="text-[0.65rem] font-mono font-bold tracking-[0.2em] uppercase px-2.5 py-0.5 rounded-full border"
                  style={{
                    borderColor: `${item.accentColor}60`,
                    backgroundColor: `${item.accentColor}15`,
                    color: item.accentColor,
                  }}
                >
                  {item.badgeLabel}
                </span>
                <p className="text-xs font-mono text-slate-400 mt-0.5">{item.date}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all active:scale-95"
              aria-label="Close Dossier"
            >
              <FaXmark className="text-sm" />
            </button>
          </div>

          {/* Main Title & Issuer */}
          <div className="mt-6">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
              {item.subLocation ? `${item.organization} • ${item.subLocation}` : item.organization}
            </p>
            <h3 className="mt-1.5 text-xl sm:text-2xl font-black tracking-tight text-white leading-snug">
              {item.title}
            </h3>

            {item.isCurrent && (
              <div className="mt-2.5 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
                <span>CURRENTLY ACTIVE PROGRAM (2023 - 2027)</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mt-5 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-sm text-slate-300 leading-relaxed">
            <p>{item.description}</p>
          </div>

          {/* Key Topics / Syllabus Breakdown */}
          {item.syllabus && item.syllabus.length > 0 && (
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                <FaBrain className="text-xs" />
                <span>CURRICULUM & KNOWLEDGE AREAS</span>
              </h4>
              <ul className="mt-3 space-y-2">
                {item.syllabus.map((topic, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                  >
                    <span className="mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[0.55rem]">
                      <FaCheck />
                    </span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills Acquired Tags */}
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase tracking-widest text-purple-400 flex items-center gap-2">
              <FaCode className="text-xs" />
              <span>VERIFIED SKILL VECTOR</span>
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-mono font-medium text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <FaShieldHalved className="text-emerald-400" />
              <span>Verified from Harsh Shukla's Academic Record</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/Harsh_Shukla_Resume.pdf"
                download="Harsh_Shukla_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onResumeDownload}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 active:scale-95 transition-all"
              >
                <FaFileArrowDown />
                <span>Resume (PDF)</span>
              </a>

              <button
                onClick={onClose}
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-white/30 transition-all active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
