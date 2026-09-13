import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaGraduationCap,
  FaCertificate,
  FaAward,
  FaBuildingColumns,
  FaArrowRight,
  FaCalendarDays,
  FaCircleCheck,
  FaBrain,
  FaCode,
  FaVolleyball,
} from 'react-icons/fa6';
import { TimelineItemData } from './CredentialModal';

interface TimelineNodeCardProps {
  item: TimelineItemData;
  index: number;
  isLeft: boolean;
  onSelect: (item: TimelineItemData) => void;
}

export default function TimelineNodeCard({
  item,
  index,
  isLeft,
  onSelect,
}: TimelineNodeCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setTilt({ x, y, glareX, glareY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'education':
        return <FaGraduationCap className="text-cyan-300" />;
      case 'certification':
        return <FaCertificate className="text-purple-300" />;
      case 'training':
        return <FaAward className="text-amber-300" />;
      default:
        return <FaBuildingColumns className="text-cyan-300" />;
    }
  };

  return (
    <div
      className={`relative flex flex-col lg:flex-row items-center w-full my-4 sm:my-6 ${
        isLeft ? 'lg:justify-start' : 'lg:justify-end'
      }`}
    >
      {/* Center Spine Node Anchor on Desktop */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-20 pointer-events-none">
        <div
          className="relative flex h-6 w-6 items-center justify-center rounded-full bg-black border-2 transition-transform duration-300 group-hover:scale-125"
          style={{
            borderColor: item.accentColor,
            boxShadow: `0 0 15px ${item.accentColor}`,
          }}
        >
          {item.isCurrent ? (
            <span
              className="h-2.5 w-2.5 rounded-full animate-ping"
              style={{ backgroundColor: item.accentColor }}
            />
          ) : (
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.accentColor }}
            />
          )}
        </div>
      </div>

      {/* Timestamp HUD Label anchored near spine */}
      <div
        className={`hidden lg:block absolute top-6 font-mono text-[0.7rem] text-slate-400 font-semibold tracking-wider ${
          isLeft
            ? 'left-[calc(50%+1.5rem)] text-left'
            : 'right-[calc(50%+1.5rem)] text-right'
        }`}
      >
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border bg-black/40 backdrop-blur-md"
          style={{
            borderColor: `${item.accentColor}40`,
            color: item.accentColor,
          }}
        >
          <FaCalendarDays className="text-[0.6rem]" />
          <span>{item.year}</span>
        </span>
      </div>

      {/* Card Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
        className={`w-full lg:w-[calc(50%-2.5rem)] ${
          isLeft ? 'lg:mr-auto' : 'lg:ml-auto'
        }`}
      >
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => onSelect(item)}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="group relative cursor-pointer rounded-3xl border border-white/10 bg-gradient-to-b from-[#0c0c14]/90 via-[#07070d]/90 to-black/95 p-5 sm:p-6 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.75)] hover:border-white/25 transition-all duration-300 hover:shadow-[0_15px_45px_rgba(0,0,0,0.9)] overflow-hidden text-left"
        >
          {/* Dynamic Glare Reflection Overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 240px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.07), transparent 80%)`,
            }}
          />

          {/* Accent Ambient Corner Glow */}
          <div
            className="absolute -top-12 -right-12 h-32 w-32 rounded-full blur-[60px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
            style={{ backgroundColor: item.accentColor }}
          />

          {/* Top Metadata Row */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg border text-xs"
                style={{
                  borderColor: `${item.accentColor}40`,
                  backgroundColor: `${item.accentColor}15`,
                }}
              >
                {getCategoryIcon(item.category)}
              </div>
              <span
                className="text-[0.65rem] font-mono font-bold uppercase tracking-wider"
                style={{ color: item.accentColor }}
              >
                {item.badgeLabel}
              </span>
            </div>

            <span className="font-mono text-[0.65rem] text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
              {item.date}
            </span>
          </div>

          {/* Organization / Institution */}
          <div className="mt-3">
            <p className="text-[0.7rem] sm:text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold truncate">
              {item.subLocation ? `${item.organization} // ${item.subLocation}` : item.organization}
            </p>

            {/* Credential / Degree Title */}
            <h3 className="mt-1 text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
              {item.title}
            </h3>
          </div>

          {/* Active Status Badge if current */}
          {item.isCurrent && (
            <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-0.5 text-[0.65rem] font-mono text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
              <span>ACTIVE PROGRAM • 2023–2027</span>
            </div>
          )}

          {/* Short Narrative Summary */}
          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
            {item.description}
          </p>

          {/* Skill Tag Chips */}
          <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
            {item.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-white/5 bg-white/[0.03] px-2 py-0.5 text-[0.65rem] font-mono text-slate-300 group-hover:border-white/15 transition-colors"
              >
                {skill}
              </span>
            ))}
            {item.skills.length > 4 && (
              <span className="rounded-lg border border-white/5 bg-white/[0.03] px-1.5 py-0.5 text-[0.65rem] font-mono text-slate-500">
                +{item.skills.length - 4}
              </span>
            )}
          </div>

          {/* Bottom Interactive Trigger Action */}
          <div className="mt-4 flex items-center justify-between text-xs font-mono font-semibold text-slate-400 group-hover:text-cyan-300 transition-colors">
            <span className="text-[0.65rem] uppercase tracking-wider">
              {item.category === 'education' ? 'VIEW ACADEMIC DOSSIER' : 'VIEW CREDENTIAL DETAILS'}
            </span>
            <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>EXPLORE</span>
              <FaArrowRight className="text-[0.6rem]" />
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
