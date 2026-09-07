import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FaBrain,
  FaBolt,
  FaMicrochip,
  FaTerminal,
  FaNetworkWired,
  FaShieldHalved,
  FaCircleCheck,
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
}

interface DataPacket {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
}

export default function AIVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse Parallax State with smooth dampening
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [statusCycleIndex, setStatusCycleIndex] = useState(0);

  // Status Diagnostic Cycle States
  const statusCycle = useMemo(
    () => [
      { status: 'ONLINE', mode: 'INFERENCE ACTIVE', latency: '1.2ms', precision: '99.4%' },
      { status: 'PROCESSING', mode: 'NEURAL STREAM', latency: '0.8ms', precision: 'OPTIMAL' },
      { status: 'ACTIVE', mode: 'COMPUTER VISION', latency: '1.4ms', precision: '90.0%' },
      { status: 'SYNCHRONIZED', mode: 'NLP / TRANSFORMER', latency: '1.1ms', precision: '99.1%' },
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusCycleIndex((prev) => (prev + 1) % statusCycle.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [statusCycle.length]);

  // Subtle Mouse Parallax Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y, targetX: x, targetY: y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, targetX: 0, targetY: 0 });
  };

  // High-Performance Neural Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize 36 Strategic Neural Network Nodes
    const nodeCount = 34;
    const nodes: Node[] = [];
    const colors = ['#a855f7', '#06b6d4', '#3b82f6', '#ec4899', '#8b5cf6'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        isActivated: false,
        activationTimer: Math.random() * 200,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Active Data Packets Traveling Along Synaptic Bridges
    const packets: DataPacket[] = [];
    for (let i = 0; i < 8; i++) {
      packets.push({
        fromIndex: Math.floor(Math.random() * nodeCount),
        toIndex: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
        color: Math.random() > 0.5 ? '#06b6d4' : '#a855f7',
      });
    }

    let globalTick = 0;

    const render = () => {
      globalTick += 0.015;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle background radial gradient on canvas
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, width * 0.6);
      bgGrad.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
      bgGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.04)');
      bgGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Update & Draw Synaptic Connections & Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!shouldReduceMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 15 || node.x > width - 15) node.vx *= -1;
          if (node.y < 15 || node.y > height - 15) node.vy *= -1;
        }

        // Periodic Node Activation Burst
        node.activationTimer += 1;
        if (node.activationTimer > 280 + i * 15) {
          node.isActivated = true;
          node.activationTimer = 0;
        } else if (node.activationTimer > 50) {
          node.isActivated = false;
        }

        // Connect nodes to neighboring nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.22;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }

        // Connect node to central AI core if within halo distance
        const distCenter = Math.hypot(node.x - centerX, node.y - centerY);
        if (distCenter > 75 && distCenter < 240) {
          const alpha = (1 - distCenter / 240) * 0.28;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(centerX, centerY);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }

        // Draw Node Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.isActivated ? '#ffffff' : node.color;
        if (node.isActivated) {
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 14;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Radiating pulse ring for activated nodes
        if (node.isActivated) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + (node.activationTimer % 20) * 0.8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(6, 182, 212, ${Math.max(0, 1 - (node.activationTimer % 20) / 20)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Update & Draw Synaptic Data Packets
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
          if (dist < 180) {
            const px = startNode.x + (endNode.x - startNode.x) * pkt.progress;
            const py = startNode.y + (endNode.y - startNode.y) * pkt.progress;

            ctx.beginPath();
            ctx.arc(px, py, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = pkt.color;
            ctx.shadowColor = pkt.color;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [shouldReduceMotion]);

  // Floating Status HUD Panels (using only Harsh's real verified stack)
  const hudCards = [
    {
      id: 'pytorch',
      title: 'PYTORCH // AI',
      subtitle: 'DEEP LEARNING',
      badge: 'VERIFIED',
      icon: SiPytorch,
      iconColor: 'text-orange-400',
      badgeColor: 'border-orange-500/40 text-orange-300 bg-orange-500/10',
      pos: 'top-6 left-5 sm:left-8',
      glow: 'hover:shadow-[0_0_25px_rgba(249,115,22,0.35)]',
      lineOffset: { x: 'calc(100% - 20px)', y: '50%' },
    },
    {
      id: 'cv',
      title: 'COMPUTER VISION',
      subtitle: 'OPENCV • 90% ACC',
      badge: 'BIOMETRIC',
      icon: SiOpencv,
      iconColor: 'text-cyan-400',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
      pos: 'top-6 right-5 sm:right-8',
      glow: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]',
      lineOffset: { x: '20px', y: '50%' },
    },
    {
      id: 'nlp',
      title: 'NLP & TRANSFORMERS',
      subtitle: 'NLTK • 1000+ TWEETS',
      badge: 'ACC +12%',
      icon: FaBrain,
      iconColor: 'text-purple-400',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
      pos: 'bottom-28 left-4 sm:left-7',
      glow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]',
      lineOffset: { x: 'calc(100% - 20px)', y: '50%' },
    },
    {
      id: 'fullstack',
      title: 'FULL STACK MERN',
      subtitle: 'REACT • NODE • FIREBASE',
      badge: 'PRODUCTION',
      icon: SiReact,
      iconColor: 'text-emerald-400',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
      pos: 'bottom-28 right-4 sm:right-7',
      glow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]',
      lineOffset: { x: '20px', y: '50%' },
    },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-[460px] sm:h-[520px] lg:h-[580px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#080812] via-[#04040a] to-[#06060f] p-4 shadow-[0_25px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300 select-none"
      style={{ perspective: 1200 }}
    >
      {/* Background Subtle Coordinate Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Atmospheric Central Ambient Glow Orb */}
      <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.18),rgba(6,182,212,0.12),transparent_70%)] blur-[90px]" />

      {/* Subtle Vertical Scanning Line Animation */}
      <motion.div
        animate={{ y: ['-100%', '300%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-400/[0.04] to-transparent opacity-60"
      />

      {/* Background Interactive Neural Network Canvas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full z-0" />

      {/* Top Cybernetic Command Header HUD */}
      <div className="pointer-events-none absolute inset-x-6 top-5 z-20 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[0.7rem] text-slate-400">
        <div className="flex items-center gap-2.5">
          <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-cyan-400/20">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06b6d4]" />
          </div>
          <span className="font-bold tracking-widest text-cyan-300 uppercase">
            HARSH.AI // NEURAL INTELLIGENCE
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">LATENCY:</span>
            <span className="font-bold text-cyan-300">{statusCycle[statusCycleIndex].latency}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">PRECISION:</span>
            <span className="font-bold text-purple-300">{statusCycle[statusCycleIndex].precision}</span>
          </div>
        </div>
      </div>

      {/* Middle & Foreground 3D Concentric AI Core Architecture */}
      <motion.div
        animate={{
          rotateX: -mousePos.y,
          rotateY: mousePos.x,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 22 }}
        className="relative z-10 flex items-center justify-center"
      >
        {/* Layer 1: Outermost Clockwise Orbit with Telemetry Satellites (340px) */}
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          className="absolute h-80 w-80 sm:h-96 sm:w-96 rounded-full border border-dashed border-cyan-400/20"
        >
          {/* Satellite Node 1 */}
          <div className="absolute -top-1.5 left-1/2 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-cyan-400 shadow-[0_0_14px_#06b6d4]">
            <div className="h-1 w-1 rounded-full bg-white" />
          </div>
          {/* Satellite Node 2 */}
          <div className="absolute -bottom-1.5 left-1/2 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-purple-400 shadow-[0_0_14px_#a855f7]">
            <div className="h-1 w-1 rounded-full bg-white" />
          </div>
          {/* Subtle Orbit Ticks */}
          <div className="absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 rounded-full border border-cyan-400/50" />
          <div className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full border border-purple-400/50" />
        </motion.div>

        {/* Layer 2: Counter-Clockwise Segmented Orbit with Cyber Nodes (260px) */}
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="absolute h-64 w-64 sm:h-72 sm:w-72 rounded-full border border-purple-500/35 [border-style:double]"
        >
          <div className="absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rounded-full bg-pink-400 shadow-[0_0_12px_#ec4899]" />
          <div className="absolute top-1/2 -left-1.5 h-3 w-3 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_#06b6d4]" />
        </motion.div>

        {/* Layer 3: High-Frequency Inner Pulsing Ring (190px) */}
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: 360, scale: [1, 1.03, 1] }}
          transition={{
            rotate: { duration: 16, repeat: Infinity, ease: 'linear' },
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute h-48 w-48 sm:h-56 sm:w-56 rounded-full border border-cyan-400/40 border-t-purple-400/80 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
        />

        {/* Layer 4: Central Glowing AI Core Nucleus Sphere */}
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex h-40 w-40 sm:h-48 sm:w-48 flex-col items-center justify-center rounded-full border border-white/25 bg-gradient-to-tr from-[#160b29] via-[#080814] to-[#041a24] p-1 shadow-[0_0_70px_rgba(168,85,247,0.5),inset_0_0_40px_rgba(6,182,212,0.35)] backdrop-blur-2xl"
        >
          {/* Inner Glowing Hex / Brain Icon Frame */}
          <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-600 to-cyan-500 p-[1.5px] shadow-[0_0_35px_rgba(6,182,212,0.8)]">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#070710]/90 backdrop-blur-md">
              <FaBrain className="text-2xl sm:text-3xl text-cyan-300 animate-pulse" />
            </div>
          </div>

          {/* Central AI Brand & Typography */}
          <div className="mt-2 text-center">
            <h4 className="text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-cyan-200">
              HARSH.AI
            </h4>
            <p className="text-[0.55rem] sm:text-[0.6rem] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
              NEURAL INTELLIGENCE
            </p>
          </div>

          {/* Live Status Pill Inside Core */}
          <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[0.55rem] font-mono text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>SYSTEM ONLINE</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Futuristic AI Status Cards / HUD Panels */}
      {hudCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: 1,
              y: shouldReduceMotion ? 0 : [0, -6, 0],
              x: shouldReduceMotion ? 0 : [0, idx % 2 === 0 ? 3 : -3, 0],
            }}
            transition={{
              duration: 4.5 + idx * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: idx * 0.25,
            }}
            className={`absolute ${card.pos} z-20 flex items-center gap-3 rounded-2xl border border-white/15 bg-[#0a0a14]/80 p-3 sm:px-4 sm:py-3 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:border-cyan-400/60 ${card.glow}`}
          >
            {/* Holographic Icon Container */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/50 shadow-inner">
              <Icon className={`text-base sm:text-lg ${card.iconColor}`} />
            </div>

            {/* Content Labels */}
            <div className="text-left font-mono">
              <div className="flex items-center gap-2">
                <p className="text-[0.7rem] sm:text-xs font-bold text-white uppercase tracking-wider">
                  {card.title}
                </p>
              </div>
              <p className="text-[0.6rem] sm:text-[0.65rem] text-slate-400">
                {card.subtitle}
              </p>
            </div>

            {/* Status Pill */}
            <span
              className={`ml-1 rounded-md border px-2 py-0.5 text-[0.55rem] sm:text-[0.6rem] font-mono uppercase tracking-wider font-semibold ${card.badgeColor}`}
            >
              {card.badge}
            </span>
          </motion.div>
        );
      })}

      {/* Bottom Diagnostic AI Command Console */}
      <div className="pointer-events-none absolute inset-x-6 bottom-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-2.5 rounded-2xl border border-white/15 bg-black/80 px-4 py-2.5 backdrop-blur-2xl font-mono text-xs text-slate-300 shadow-lg">
        <div className="flex items-center gap-2.5">
          <FaBolt className="text-amber-400 text-sm animate-bounce" />
          <span className="text-slate-400 text-[0.7rem]">STATUS:</span>
          <span className="text-emerald-400 font-bold text-[0.75rem] tracking-wider">
            ● {statusCycle[statusCycleIndex].status} // {statusCycle[statusCycleIndex].mode}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[0.65rem] sm:text-[0.7rem] text-slate-400">
          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-slate-500">ENGINE:</span>
            <span className="text-purple-300 font-semibold">HARSH.AI V2.4</span>
          </div>
          <span className="hidden md:inline">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">ARCH:</span>
            <span className="text-cyan-300 font-semibold">CNN • LSTM • TRANSFORMER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
