import { motion } from 'framer-motion';
import { FaBrain, FaCode, FaDatabase, FaMicrochip } from 'react-icons/fa6';
import { SiReact, SiPython, SiTailwindcss, SiTensorflow } from 'react-icons/si';

const floatingIcons = [
  { icon: FaBrain, top: '14%', left: '10%' },
  { icon: SiPython, top: '20%', right: '12%' },
  { icon: SiReact, bottom: '16%', left: '12%' },
  { icon: SiTensorflow, bottom: '18%', right: '12%' },
  { icon: FaCode, top: '48%', left: '4%' },
  { icon: FaDatabase, top: '50%', right: '4%' },
  { icon: FaMicrochip, bottom: '42%', left: '24%' },
  { icon: SiTailwindcss, bottom: '42%', right: '24%' },
];

export default function HeroScene() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px] lg:max-w-[600px]">
      <motion.div
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.36)_0%,_rgba(59,130,246,0.12)_38%,_transparent_72%)] blur-2xl"
        animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-4 rounded-full border border-cyan-400/20" />
      <motion.div
        className="absolute inset-10 rounded-full border border-fuchsia-400/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-16 rounded-full border border-blue-400/30 border-dashed"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      <div className="absolute inset-0 rounded-full bg-grid-fine bg-[size:42px_42px] opacity-[0.08]" />

      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        {floatingIcons.map(({ icon: Icon, ...style }, index) => (
          <motion.div
            key={index}
            className="absolute flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-lg text-white shadow-[0_0_30px_rgba(59,130,246,0.22)] backdrop-blur-md"
            style={style}
            animate={{ y: [0, -12, 0], x: [0, 5, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 5 + index * 0.3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
          >
            <Icon />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-[16%] rounded-full border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03))] shadow-[0_0_100px_rgba(59,130,246,0.18)] backdrop-blur-2xl"
        animate={{ boxShadow: ['0 0 40px rgba(168,85,247,0.15)', '0 0 100px rgba(59,130,246,0.28)', '0 0 40px rgba(168,85,247,0.15)'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.18),_transparent_42%)]" />
        <div className="absolute inset-[10%] rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(5,5,5,0.55),rgba(15,23,42,0.15))]" />

        <div className="absolute inset-[18%] flex flex-col items-center justify-center rounded-full border border-cyan-300/15 bg-black/30 text-center">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(160deg,rgba(168,85,247,0.28),rgba(59,130,246,0.12))] shadow-[0_0_60px_rgba(168,85,247,0.25)]">
            <div className="absolute inset-4 rounded-full border border-white/10" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_60%)]" />
            <span className="relative text-5xl font-bold tracking-[0.35em] text-white">HS</span>
          </div>

          <div className="mt-6 max-w-xs">
            <p className="text-xs uppercase tracking-[0.55em] text-cyan-300/70">AI Neural Interface</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Designing intelligent systems with machine learning, data-driven logic, and polished UX.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
