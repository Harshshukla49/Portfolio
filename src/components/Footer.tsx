import React, { useState, useEffect } from 'react';
import {
  FaBrain,
  FaArrowUp,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCircleCheck,
} from 'react-icons/fa6';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const [timeIST, setTimeIST] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeIST(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-black/80 backdrop-blur-2xl py-12 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-8 border-b border-white/10">
          {/* Brand & Persona */}
          <div className="md:col-span-6 flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-black">
                <FaBrain className="text-cyan-300 text-lg" />
              </div>
            </div>
            <div>
              <p className="text-base font-bold text-white uppercase tracking-wider">
                {portfolioData.personal.name}
              </p>
              <p className="text-xs font-mono text-purple-300 uppercase">
                AI & Machine Learning Engineer • UIT
              </p>
            </div>
          </div>

          {/* Live System Telemetry & IST Clock */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-4 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1.5 text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ALL SYSTEMS OPERATIONAL</span>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-slate-300">
              <span>IST: </span>
              <span className="text-cyan-400 font-bold">{timeIST || '08:00:00 PM'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Links & Back to Top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="font-mono text-center sm:text-left">
            © {new Date().getFullYear()} Harsh Shukla. Built with React, TypeScript, Tailwind CSS & Framer Motion.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href={portfolioData.personal.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-300 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="hover:text-pink-300 transition-colors"
            >
              Email
            </a>

            <button
              onClick={scrollToTop}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 hover:border-cyan-400 hover:text-white transition-all ml-2"
              title="Back to Top"
              aria-label="Scroll back to top"
            >
              <FaArrowUp className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
