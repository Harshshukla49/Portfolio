import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaPhone,
  FaPaperPlane,
  FaCheck,
  FaCopy,
  FaFileArrowDown,
  FaLocationDot,
  FaTerminal,
  FaWandMagicSparkles,
} from 'react-icons/fa6';
import { portfolioData } from '../data/portfolioData';

interface ContactSectionProps {
  onDownloadResume?: () => void;
}

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);

    // Prepare mailto fallback or simulated transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
      const body = encodeURIComponent(
        `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
      );
      window.location.href = `mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <section id="contact" className="relative scroll-mt-20 py-14 sm:py-16 lg:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-cyan-300 uppercase">
            <FaTerminal className="text-xs" />
            <span>INITIATE CONTACT // REACH OUT</span>
          </div>

          <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            LET'S BUILD{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              SOMETHING INTELLIGENT.
            </span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Open for software engineering internships, AI/ML research collaborations, and full-time opportunities.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Direct Contact Information */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            {/* Quick Email Card with Copy Feature */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider font-semibold">
                  PRIMARY EMAIL
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-slate-300 hover:border-cyan-400 hover:text-white transition-all"
                >
                  {copiedEmail ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="mt-3 block text-base sm:text-lg font-bold text-white hover:text-cyan-300 transition-colors font-mono"
              >
                {portfolioData.personal.email}
              </a>

              <p className="mt-2 text-xs text-slate-400">
                Responses typically within 24 hours.
              </p>
            </div>

            {/* Direct Phone / Call Card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-lg">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                DIRECT PHONE / WHATSAPP
              </span>

              <a
                href={`tel:${portfolioData.personal.phone.replace(/\s+/g, '')}`}
                className="mt-3 block text-base sm:text-lg font-bold text-white hover:text-cyan-300 transition-colors font-mono"
              >
                {portfolioData.personal.phone}
              </a>

              <p className="mt-2 text-xs text-slate-400">
                Available for phone and video interview calls.
              </p>
            </div>

            {/* Social Channels & Direct PDF Resume Download */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-lg space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                CONNECT & VERIFY
              </span>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={portfolioData.personal.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs font-bold text-slate-200 hover:border-purple-400 hover:bg-purple-600/20 hover:text-white transition-all"
                >
                  <FaLinkedin className="text-purple-400 text-sm" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs font-bold text-slate-200 hover:border-cyan-400 hover:bg-cyan-600/20 hover:text-white transition-all"
                >
                  <FaGithub className="text-cyan-400 text-sm" />
                  <span>GitHub</span>
                </a>
              </div>

              <a
                href="/Harsh_Shukla_Resume.pdf"
                download="Harsh_Shukla_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-3.5 text-xs font-bold font-mono text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/20 transition-all hover:scale-[1.01]"
              >
                <FaFileArrowDown className="text-sm" />
                <span>DOWNLOAD RESUME (OFFICIAL PDF)</span>
              </a>
            </div>
          </div>

          {/* Right: Interactive Message Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0e0e18] via-black to-[#06060c] p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                  TRANSMIT DIRECT MESSAGE
                </span>
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-400 text-2xl">
                    <FaCheck />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase">Message Prepared!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Your email client has been launched with your message. You can also reach Harsh directly at {portfolioData.personal.email}.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ name: '', email: '', message: '' });
                    }}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-mono text-slate-300 hover:text-white"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      YOUR FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      YOUR EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      PROJECT INQUIRY / MESSAGE
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell Harsh about your project, team opportunity, or inquiry..."
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.06] focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 py-4 text-sm font-bold text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:brightness-110 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <FaPaperPlane className="text-xs" />
                    <span>{isSubmitting ? 'Transmitting Message...' : 'TRANSMIT MESSAGE'}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
