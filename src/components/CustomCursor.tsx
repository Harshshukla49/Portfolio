import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('button, a, input, textarea, select, [role="button"], [data-cursor="pointer"]');
      const projectCard = target.closest('[data-cursor="project"]');
      const isTextInput = target.closest('input[type="text"], input[type="email"], textarea');

      if (projectCard) {
        setCursorType('project');
      } else if (isTextInput) {
        setCursorType('text');
      } else if (clickable) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Central glow dot */}
      <motion.div
        className="fixed top-0 left-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.9)]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: cursorType === 'pointer' ? 1.5 : cursorType === 'project' ? 0 : 1,
          opacity: cursorType === 'project' ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50, mass: 0.1 }}
      />

      {/* Outer cyber ring */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/60 bg-purple-500/10 backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: cursorType === 'project' ? 140 : cursorType === 'pointer' ? 48 : 32,
          height: cursorType === 'project' ? 36 : cursorType === 'pointer' ? 48 : 32,
          borderRadius: cursorType === 'project' ? '9999px' : '50%',
          borderColor: cursorType === 'project' ? 'rgba(6,182,212,0.9)' : cursorType === 'pointer' ? 'rgba(168,85,247,0.9)' : 'rgba(168,85,247,0.4)',
          backgroundColor: cursorType === 'project' ? 'rgba(6,182,212,0.2)' : cursorType === 'pointer' ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.05)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.2 }}
      >
        {cursorType === 'project' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5 text-[0.7rem] font-bold tracking-wider text-cyan-300 uppercase whitespace-nowrap"
          >
            Case Study ↗
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
