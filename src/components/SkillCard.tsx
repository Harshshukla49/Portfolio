import type { IconType } from 'react-icons';
import GlassCard from './GlassCard';

type SkillCardProps = {
  title: string;
  items: string[];
  icon: IconType;
};

export default function SkillCard({ title, items, icon: Icon }: SkillCardProps) {
  return (
    <GlassCard className="min-h-full p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">{title}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {items.map((item) => (
              <span
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 transition duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 text-xl text-white shadow-neon">
          <Icon />
        </div>
      </div>
    </GlassCard>
  );
}
