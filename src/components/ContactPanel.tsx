import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa6';
import { owner } from '../data/portfolio';
import GlassCard from './GlassCard';

export default function ContactPanel() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const updateField = (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'a visitor'}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${owner.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <GlassCard className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.45em] text-cyan-300/80">Connect</p>
        <h3 className="mt-4 text-2xl font-semibold text-white">Let&apos;s build something intelligent.</h3>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Open to internships, freelance collaborations, and AI + full-stack product work.
        </p>

        <div className="mt-8 space-y-4 text-sm text-slate-200">
          <a className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-400/30 hover:bg-cyan-500/10" href={`mailto:${owner.email}`}>
            <FaEnvelope className="text-cyan-300" /> {owner.email}
          </a>
          <a className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10" href={`tel:${owner.phone.replace(/\s+/g, '')}`}>
            <FaPhone className="text-fuchsia-300" /> {owner.phone}
          </a>
          <a className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-400/30 hover:bg-cyan-500/10" href={owner.github} target="_blank" rel="noreferrer">
            <FaGithub className="text-cyan-300" /> GitHub Profile
          </a>
          <a className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10" href={owner.linkedIn} target="_blank" rel="noreferrer">
            <FaLinkedin className="text-fuchsia-300" /> LinkedIn Profile
          </a>
        </div>
      </GlassCard>

      <GlassCard className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.45em] text-cyan-300/80">Contact Form</p>
        <h3 className="mt-4 text-2xl font-semibold text-white">Send a message</h3>

        <form className="mt-6 space-y-4" onSubmit={submitMessage}>
          <input
            type="text"
            value={form.name}
            onChange={updateField('name')}
            placeholder="Name"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-black/60"
          />
          <input
            type="email"
            value={form.email}
            onChange={updateField('email')}
            placeholder="Email"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-black/60"
          />
          <textarea
            rows={6}
            value={form.message}
            onChange={updateField('message')}
            placeholder="Message"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-black/60"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-500 bg-[length:200%_100%] px-6 py-3 text-sm font-semibold text-white shadow-neon transition duration-500 hover:scale-[1.02] hover:animate-shimmer"
          >
            Animated Submit
          </motion.button>
        </form>
      </GlassCard>
    </div>
  );
}
