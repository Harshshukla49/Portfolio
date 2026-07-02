import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../lib/cn';

type GlassCardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default function GlassCard({ className, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-neon',
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_30%)] opacity-70 transition duration-500 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </div>
  );
}
