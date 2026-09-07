import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FaBrain,
  FaBolt,
  FaMicrochip,
  FaTerminal,
  FaNetworkWired,
  FaShieldHalved,
  FaCircleCheck,
  FaWandMagicSparkles,
} from 'react-icons/fa6';
import {
  SiPython,
  SiPytorch,
  SiReact,
  SiOpencv,
  SiNodedotjs,
} from 'react-icons/si';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isActivated: boolean;
  activationTimer: number;
  pulsePhase: number;
  baseX: number;
  baseY: number;
}

interface DataPacket {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export default function AIVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Active module focus state
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [statusCycleIndex, setStatusCycleIndex] = useState(0);
  const shockwavesRef = useRef<Shockwave[]>([]);

  // Subsystem Telemetry Modes
  const statusCycle = useMemo(
    () => [
      { status: 'ONLINE', mode: 'INFERENCE ACTIVE', latency: '0.8ms', precision: '99.4%', load: '42%' },
      { status: 'PROCESSING', mode: 'NEURAL STREAM', latency: '1.1ms', precision: 'OPTIMAL', load: '68%' },
      { status: 'ACTIVE', mode: 'COMPUTER VISION', latency: '1.4ms', precision: '90.0%', load: '55%' },
      { status: 'SYNCHRONIZED', mode: 'NLP / TRANSFORMER', latency: '0.9ms', precision: '99.1%', load: '61%' },
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusCycleIndex((prev) => (prev + 1) % statusCycle.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [statusCycle.length]);

  // Trigger Neural Shockwave
  const triggerShockwave = useCallback((x?: number, y?: number, color = '#06b6d4') => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = x !== undefined ? x : rect.width / 2;
    const cy = y !== undefined ? y : rect.height / 2;

    shockwavesRef.current.push({
      x: cx,
      y: cy,
      radius: 10,
      maxRadius: Math.max(rect.width, rect.height) * 0.9,
      alpha: 0.9,
      color,
    });
  }, []);

  // Mouse Parallax Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    setMousePos({ x, y, targetX: x, targetY: y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, targetX: 0, targetY: 0 });
    setActiveModule(null);
  };

  // High-Performance Neural Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 580);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize 36 Synaptic Nodes
    const nodeCount = 36;
    const nodeColors = ['#06b6d4', '#a855f7', '#ec4899', '#3b82f6', '#10b981'];
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = 1.8 + Math.random() * 2.2;
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
        isActivated: Math.random() > 0.8,
        activationTimer: Math.random() * 80,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Initialize Data Packets
    const packetCount = 14;
    const packets: DataPacket[] = [];
    for (let i = 0; i < packetCount; i++) {
      packets.push({
        fromIndex: Math.floor(Math.random() * nodeCount),
        toIndex: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012,
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
      });
    }

    // Canvas Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw Shockwaves
      for (let s = shockwavesRef.current.length - 1; s >= 0; s--) {
        const sw = shockwavesRef.current[s];
        sw.radius += 6;
        sw.alpha *= 0.95;

        if (sw.alpha < 0.01 || sw.radius > sw.maxRadius) {
          shockwavesRef.current.splice(s, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${sw.alpha * 0.7})`;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = sw.color;
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Update and Draw Synaptic Nodes
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        // Soft bounce boundaries
        if (node.x < 20 || node.x > width - 20) node.vx *= -1;
        if (node.y < 20 || node.y > height - 20) node.vy *= -1;

        node.pulsePhase += 0.035;

        // Periodic Node Activation
        node.activationTimer += 0.5;
        if (node.activationTimer > 100) {
          node.isActivated = Math.random() > 0.65;
          node.activationTimer = 0;
        }

        // Draw Synaptic Connective Filaments
        for (let j = i + 1; j < nodeCount; j++) {
          const target = nodes[j];
          const dx = node.x - target.x;
          const dy = node.y - target.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.35;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Core Attraction Beams
        const distToCenter = Math.hypot(node.x - centerX, node.y - centerY);
        if (distToCenter < 190 && distToCenter > 90) {
          const alpha = (1 - distToCenter / 190) * 0.25;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(centerX, centerY);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        // Draw Node Core with Glow
        ctx.beginPath();
        const dynamicRadius = node.radius + Math.sin(node.pulsePhase) * 0.6;
        ctx.arc(node.x, node.y, Math.max(1, dynamicRadius), 0, Math.PI * 2);
        ctx.fillStyle = node.isActivated ? '#ffffff' : node.color;
        if (node.isActivated) {
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 12;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Moving Synaptic Data Packets
      for (let p = 0; p < packets.length; p++) {
        const pkt = packets[p];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          pkt.progress = 0;
          pkt.fromIndex = Math.floor(Math.random() * nodeCount);
          pkt.toIndex = Math.floor(Math.random() * nodeCount);
        }

        const startNode = nodes[pkt.fromIndex];
        const endNode = nodes[pkt.toIndex];

        if (startNode && endNode) {
          const dist = Math.hypot(startNode.x - endNode.x, startNode.y - endNode.y);
          if (dist < 150) {
            const px = startNode.x + (endNode.x - startNode.x) * pkt.progress;
            const py = startNode.y + (endNode.y - startNode.y) * pkt.progress;

            ctx.beginPath();
            ctx.arc(px, py, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = pkt.color;
            ctx.shadowColor = pkt.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 4 Compact HUD Satellite Modules (Guaranteed zero horizontal collisions)
  const hudModules = [
    {
      id: 'pytorch',
      title: 'PYTORCH',
      subtitle: 'CUDA • DL',
      badge: 'TRAINED',
      icon: SiPytorch,
      iconColor: 'text-orange-400',
      badgeColor: 'border-orange-500/40 text-orange-300 bg-orange-500/10',
      pos: 'top-12 left-3 sm:left-4',
      accentGlow: 'hover:shadow-[0_0_25px_rgba(249,115,22,0.45)] hover:border-orange-400/70',
      activeBorder: 'border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.5)]',
    },
    {
      id: 'cv',
      title: 'VISION AI',
      subtitle: 'OPENCV • 90%',
      badge: 'FACE BIO',
      icon: SiOpencv,
      iconColor: 'text-cyan-400',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
      pos: 'top-12 right-3 sm:right-4',
      accentGlow: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:border-cyan-400/70',
      activeBorder: 'border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)]',
    },
    {
      id: 'nlp',
      title: 'NLP & LLM',
      subtitle: 'NLTK • VECTOR',
      badge: 'ACC +12%',
      icon: FaBrain,
      iconColor: 'text-purple-400',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
      pos: 'bottom-16 left-3 sm:left-4',
      accentGlow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:border-purple-400/70',
      activeBorder: 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]',
    },
    {
      id: 'fullstack',
      title: 'FULL STACK',
      subtitle: 'REACT • NODE',
      badge: 'MERN',
      icon: SiReact,
      iconColor: 'text-emerald-400',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
      pos: 'bottom-16 right-3 sm:right-4',
      accentGlow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.45)] hover:border-emerald-400/70',
      activeBorder: 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]',
    },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) triggerShockwave(e.clientX - rect.left, e.clientY - rect.top);
      }}
      className="relative flex h-[480px] sm:h-[540px] lg:h-[580px] w-full items-center justify-center overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#0a0a18] via-[#05050f] to-[#080814] p-4 shadow-[0_25px_90px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all duration-300 select-none cursor-crosshair group"
      style={{ perspective: 1200 }}
    >
      {/* Sci-Fi Corner Bracket Accents */}
      <div className="pointer-events-none absolute top-3 left-3 text-[0.65rem] font-mono text-cyan-400/70">┌ HS-CORE</div>
      <div className="pointer-events-none absolute top-3 right-3 text-[0.65rem] font-mono text-cyan-400/70">v2.4 ┐</div>
      <div className="pointer-events-none absolute bottom-3 left-3 text-[0.65rem] font-mono text-purple-400/70">└ SYNC_OK</div>
      <div className="pointer-events-none absolute bottom-3 right-3 text-[0.65rem] font-mono text-purple-400/70">IN-NORTH ┘</div>

      {/* Cybernetic Coordinate Dot Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Cosmic Central Ambient Nebula Glow */}
      <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.22),rgba(6,182,212,0.18),transparent_70%)] blur-[90px] animate-pulse" />

      {/* Laser Scanning Beam Sweep */}
      <motion.div
        animate={{ y: ['-100%', '350%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-cyan-400/[0.07] to-transparent opacity-70"
      />

      {/* Background Interactive Neural Network Canvas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full z-0" />

      {/* Top Cybernetic Command Header HUD */}
      <div className="pointer-events-none absolute inset-x-4 sm:inset-x-5 top-3.5 z-20 flex items-center justify-between border-b border-white/10 pb-2 font-mono text-[0.68rem] text-slate-300 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
          </span>
          <span className="font-bold tracking-wider text-cyan-300 uppercase text-[0.65rem] sm:text-[0.7rem]">
            HARSH.AI <span className="text-slate-400 font-normal">// COMMAND CENTER</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[0.6rem] sm:text-[0.65rem] text-cyan-300">
            <span>LAT:</span>
            <span className="font-bold text-white">{statusCycle[statusCycleIndex].latency}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[0.6rem] sm:text-[0.65rem] text-purple-300">
            <span>PREC:</span>
            <span className="font-bold text-white">{statusCycle[statusCycleIndex].precision}</span>
          </div>
        </div>
      </div>

      {/* 3D Depth Layer */}
      <motion.div
        animate={{
          x: mousePos.targetX,
          y: mousePos.targetY,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="relative z-10 flex items-center justify-center w-full h-full"
      >
        {/* Outer Orbit (380px) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="pointer-events-none absolute h-[320px] w-[320px] sm:h-[380px] sm:w-[380px] rounded-full border border-cyan-500/20 border-dashed"
        >
          {/* Satellite Beacon */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-cyan-400 shadow-[0_0_12px_#06b6d4]">
            <div className="h-1 w-1 rounded-full bg-white" />
          </div>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex h-3 w-3 items-center justify-center rounded-full bg-pink-400 shadow-[0_0_10px_#ec4899]" />
        </motion.div>

        {/* Middle Counter-Rotating Orbit with Ticks (260px) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          className="pointer-events-none absolute h-[220px] w-[220px] sm:h-[260px] sm:w-[260px] rounded-full border border-purple-500/30"
        >
          {/* Degree Ticks */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-[1px] bg-purple-400" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2 w-[1px] bg-purple-400" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-[1px] bg-purple-400" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-[1px] bg-purple-400" />

          <div className="absolute top-1/4 right-0 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
        </motion.div>

        {/* Inner Wave Frequency Aura Ring */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute h-[170px] w-[170px] sm:h-[190px] sm:w-[190px] rounded-full border-2 border-cyan-400/40 bg-cyan-500/5 blur-[1px]"
        />

        {/* CENTRAL AI CORE SPHERE */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={(e) => {
            e.stopPropagation();
            triggerShockwave(undefined, undefined, '#ec4899');
          }}
          className="relative z-30 flex h-36 w-36 sm:h-44 sm:w-44 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-cyan-400/60 bg-gradient-to-tr from-[#0b0c1e] via-[#070814] to-[#120e28] p-2 sm:p-3 text-center shadow-[0_0_45px_rgba(6,182,212,0.45),inset_0_0_30px_rgba(168,85,247,0.35)] backdrop-blur-2xl transition-all duration-300"
        >
          {/* Animated Core Perimeter Light Arc */}
          <div className="pointer-events-none absolute inset-0 rounded-full border border-purple-400/40 animate-spin-slow" />

          {/* Glowing Neural Brain Icon Crest */}
          <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.6)]">
            <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-[#070714]">
              <FaBrain className="text-lg sm:text-xl text-cyan-300 animate-pulse" />
            </div>
            {/* Pulsing energy ping */}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500 shadow-[0_0_6px_#ec4899]" />
            </span>
          </div>

          {/* Core Typography */}
          <div className="mt-1.5 text-center">
            <p className="text-xs sm:text-sm font-black tracking-widest text-white uppercase font-mono drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
              HARSH<span className="text-cyan-400">.AI</span>
            </p>
            <p className="text-[0.5rem] sm:text-[0.55rem] font-mono tracking-widest text-purple-300 uppercase mt-0.5">
              NEURAL INTELLIGENCE
            </p>
          </div>

          {/* Pulsing Status Pill */}
          <div className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-emerald-400/50 bg-emerald-500/15 px-2 py-0.5 text-[0.55rem] font-mono text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYSTEM ONLINE</span>
          </div>
        </motion.div>

        {/* 4 COMPACT HOLOGRAPHIC SATELLITE CHIPS */}
        {hudModules.map((mod) => {
          const Icon = mod.icon;
          const isSelected = activeModule === mod.id;

          return (
            <motion.div
              key={mod.id}
              onMouseEnter={() => {
                setActiveModule(mod.id);
                triggerShockwave(undefined, undefined, mod.id === 'pytorch' ? '#f97316' : mod.id === 'cv' ? '#06b6d4' : mod.id === 'nlp' ? '#a855f7' : '#10b981');
              }}
              onMouseLeave={() => setActiveModule(null)}
              whileHover={{ scale: 1.06, y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`absolute ${mod.pos} z-20 flex w-[132px] sm:w-[155px] cursor-pointer items-center gap-2 rounded-xl border bg-black/85 p-2 sm:p-2.5 backdrop-blur-xl transition-all duration-300 ${
                isSelected ? mod.activeBorder : 'border-white/15'
              } ${mod.accentGlow}`}
            >
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 shadow-inner shrink-0">
                <Icon className={`text-sm sm:text-base ${mod.iconColor}`} />
              </div>

              <div className="text-left font-mono overflow-hidden min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-[0.62rem] sm:text-[0.7rem] font-bold text-white tracking-wide uppercase truncate">
                    {mod.title}
                  </p>
                  <span className={`hidden sm:inline-block rounded px-1 py-0 text-[0.5rem] font-bold shrink-0 border ${mod.badgeColor}`}>
                    {mod.badge}
                  </span>
                </div>
                <p className="text-[0.52rem] sm:text-[0.58rem] text-slate-400 uppercase tracking-tight truncate mt-0.5">
                  {mod.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* BOTTOM DIAGNOSTIC COMMAND CONSOLE */}
      <div className="pointer-events-none absolute inset-x-3 sm:inset-x-5 bottom-3 z-20 flex flex-wrap items-center justify-between rounded-xl sm:rounded-2xl border border-white/15 bg-black/90 px-3 sm:px-4 py-2 sm:py-2.5 backdrop-blur-xl font-mono text-[0.6rem] sm:text-xs text-slate-300 shadow-2xl">
        {/* Left: Dynamic Status Mode */}
        <div className="flex items-center gap-2">
          <FaBolt className="text-amber-400 text-[0.65rem] sm:text-xs animate-bounce" />
          <div className="flex items-center gap-1">
            <span className="text-slate-400 uppercase text-[0.55rem] sm:text-[0.65rem]">STATUS:</span>
            <span className="font-bold text-cyan-300 text-[0.58rem] sm:text-[0.7rem]">
              {statusCycle[statusCycleIndex].mode}
            </span>
          </div>
        </div>

        {/* Center: Interactive Subsystem Filters */}
        <div className="pointer-events-auto flex items-center gap-1 text-[0.55rem] sm:text-[0.6rem]">
          {['ALL', 'PYTORCH', 'VISION', 'NLP', 'MERN'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                const map: Record<string, string | null> = {
                  ALL: null,
                  PYTORCH: 'pytorch',
                  VISION: 'cv',
                  NLP: 'nlp',
                  MERN: 'fullstack',
                };
                setActiveModule(map[tag]);
                triggerShockwave();
              }}
              className={`rounded px-1.5 sm:px-2 py-0.5 uppercase transition-all duration-200 ${
                (tag === 'ALL' && !activeModule) ||
                (tag === 'PYTORCH' && activeModule === 'pytorch') ||
                (tag === 'VISION' && activeModule === 'cv') ||
                (tag === 'NLP' && activeModule === 'nlp') ||
                (tag === 'MERN' && activeModule === 'fullstack')
                  ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-200 font-bold shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                  : 'border border-white/10 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Right: Soundwave Equalizer Animation */}
        <div className="hidden sm:flex items-center gap-2 text-slate-400 text-[0.6rem]">
          <span>LOAD: {statusCycle[statusCycleIndex].load}</span>
          <div className="flex items-end gap-0.5 h-3">
            {[40, 80, 50, 100, 65, 30].map((h, i) => (
              <div
                key={i}
                className="w-0.5 sm:w-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full animate-pulse"
                style={{
                  height: `${(h * (statusCycleIndex + 1)) % 100 || 50}%`,
                  animationDuration: `${0.4 + i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
