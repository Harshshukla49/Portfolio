import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaNetworkWired, FaMicrochip, FaBolt, FaTerminal } from 'react-icons/fa6';
import { SiPython, SiPytorch, SiReact, SiMongodb } from 'react-icons/si';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  connections: number[];
}

export default function AIVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [activeMetric, setActiveMetric] = useState(0);

  // Floating technology badges
  const techChips = [
    { label: 'PyTorch', icon: SiPytorch, pos: 'top-6 left-6', color: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/40', text: 'text-orange-300' },
    { label: 'Computer Vision', icon: FaMicrochip, pos: 'top-10 right-8', color: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/40', text: 'text-cyan-300' },
    { label: 'NLP & Transformers', icon: FaBrain, pos: 'bottom-20 left-4', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/40', text: 'text-purple-300' },
    { label: 'Full Stack MERN', icon: SiReact, pos: 'bottom-8 right-6', color: 'from-emerald-500/20 to-cyan-500/20', border: 'border-emerald-500/40', text: 'text-emerald-300' },
  ];

  // Mouse move handler for 3D parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    setMousePos((prev) => ({ ...prev, targetX: x, targetY: y }));
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, targetX: 0, targetY: 0 }));
  };

  // Canvas Neural Network Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize Neural Network Nodes
    const nodeCount = 28;
    const nodes: Node[] = [];
    const colors = ['#a855f7', '#06b6d4', '#3b82f6', '#ec4899'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
      });
    }

    let pulseProgress = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      pulseProgress += 0.02;

      // Draw Neural connections
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Move nodes
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        // Bounce from walls
        if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
        if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

        // Connect to center core
        const distToCenter = Math.hypot(centerX - nodeA.x, centerY - nodeA.y);
        if (distToCenter < 220) {
          const alpha = (1 - distToCenter / 220) * 0.35;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(centerX, centerY);
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Data pulse particle moving along connection
          const t = (Math.sin(pulseProgress + i) + 1) / 2;
          const px = nodeA.x + (centerX - nodeA.x) * t;
          const py = nodeA.y + (centerY - nodeA.y) * t;
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = '#06b6d4';
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Connect to neighboring nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dist = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Draw node point
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeA.color;
        ctx.shadowColor = nodeA.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Metric ticker interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-[480px] sm:h-[540px] lg:h-[600px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-purple-950/20 via-black/60 to-cyan-950/20 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300"
      style={{ perspective: 1000 }}
    >
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-75" />

      {/* Cyber Grid Lines & Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-6 flex items-center justify-between border-b border-white/10 pb-3 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="tracking-widest uppercase text-cyan-300">NEURAL CORE // ACTIVE</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>LATENCY: 1.2ms</span>
          <span>•</span>
          <span>PRECISION: 99.4%</span>
        </div>
      </div>

      {/* Central 3D Interactive AI Core */}
      <motion.div
        animate={{
          rotateX: -mousePos.targetY,
          rotateY: mousePos.targetX,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        className="relative z-10 flex items-center justify-center"
      >
        {/* Outermost Orbiting Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute h-72 w-72 sm:h-80 sm:w-80 rounded-full border border-dashed border-cyan-400/30"
        >
          <div className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_#06b6d4]" />
          <div className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-purple-400 shadow-[0_0_12px_#a855f7]" />
        </motion.div>

        {/* Middle Counter-Rotating Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute h-56 w-56 sm:h-64 sm:w-64 rounded-full border border-purple-500/40 [border-style:double]"
        >
          <div className="absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rounded-full bg-pink-400 shadow-[0_0_14px_#ec4899]" />
        </motion.div>

        {/* Inner Glowing Hex / Energy Sphere */}
        <div className="relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-full bg-gradient-to-tr from-purple-900/90 via-black to-cyan-900/90 p-1 shadow-[0_0_60px_rgba(168,85,247,0.5),inset_0_0_40px_rgba(6,182,212,0.4)] border border-white/20">
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-600 to-cyan-500 p-0.5 shadow-[0_0_30px_rgba(6,182,212,0.8)]">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-black/80 backdrop-blur-md">
                <FaBrain className="text-2xl sm:text-3xl text-cyan-300 animate-pulse" />
              </div>
            </div>
            <p className="mt-2 text-[0.65rem] tracking-[0.3em] font-bold text-slate-300 uppercase">HARSH.AI</p>
            <p className="text-[0.6rem] font-mono text-cyan-400">ENGINE V2.4</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Holographic Technology Badges */}
      {techChips.map((chip, idx) => {
        const Icon = chip.icon;
        return (
          <motion.div
            key={chip.label}
            animate={{
              y: [0, -8, 0],
              x: [0, (idx % 2 === 0 ? 4 : -4), 0],
            }}
            transition={{
              duration: 4 + idx,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: idx * 0.4,
            }}
            className={`absolute ${chip.pos} z-20 flex items-center gap-2.5 rounded-2xl border ${chip.border} bg-black/60 px-3.5 py-2 shadow-lg backdrop-blur-xl hover:scale-105 transition-transform duration-300`}
          >
            <div className={`flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br ${chip.color}`}>
              <Icon className={`text-sm ${chip.text}`} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-tight">{chip.label}</p>
              <p className="text-[0.65rem] text-slate-400 font-mono">Verified</p>
            </div>
          </motion.div>
        );
      })}

      {/* Bottom Live HUD Console */}
      <div className="pointer-events-none absolute inset-x-6 bottom-5 flex flex-col sm:flex-row items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/70 px-4 py-2.5 backdrop-blur-xl text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2">
          <FaBolt className="text-amber-400 text-sm animate-bounce" />
          <span className="text-slate-400">STATUS:</span>
          <span className="text-emerald-400 font-semibold">MODEL INFERENCE ONLINE</span>
        </div>
        <div className="text-right text-slate-400 text-[0.7rem] hidden sm:block">
          {activeMetric === 0 && 'ARCH: MULTI-LAYER CONVOLUTIONAL + TRANSFORMER'}
          {activeMetric === 1 && 'STACK: PYTORCH • OPENCV • SCIKIT-LEARN • REACT'}
          {activeMetric === 2 && 'SPECIALIZATION: DEEP LEARNING & COMPUTER VISION'}
        </div>
      </div>
    </div>
  );
}
