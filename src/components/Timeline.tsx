import { motion } from 'framer-motion';
import type { Milestone } from '../data/portfolio';
import GlassCard from './GlassCard';

type TimelineProps = {
  items: Milestone[];
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-neonPurple/60 via-white/10 to-neonBlue/60" />
      <div className="space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="relative pl-14"
          >
            <span className="absolute left-[18px] top-8 h-4 w-4 rounded-full bg-gradient-to-br from-neonPurple to-neonBlue shadow-[0_0_20px_rgba(168,85,247,0.45)]" />
            <GlassCard className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">
                  {item.organization}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.details}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
