import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown, FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaLocationArrow, FaPhone, FaRocket } from 'react-icons/fa6';
import { aboutPoints, certifications, education, navItems, owner, projects, skillGroups, stats } from './data/portfolio';
import ContactPanel from './components/ContactPanel';
import GlassCard from './components/GlassCard';
import HeroScene from './components/HeroScene';
import ProjectCard from './components/ProjectCard';
import Reveal from './components/Reveal';
import ScrollProgress from './components/ScrollProgress';
import SectionHeading from './components/SectionHeading';
import SkillCard from './components/SkillCard';
import Timeline from './components/Timeline';
import TypingText from './components/TypingText';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function useResumeDownload() {
  return () => {
    const resume = [
      owner.name,
      owner.role,
      owner.tagline,
      '',
      `Email: ${owner.email}`,
      `Phone: ${owner.phone}`,
      `GitHub: ${owner.github}`,
      `LinkedIn: ${owner.linkedIn}`,
      '',
      'Highlights:',
      '- B.Tech CSE (AIML) student focused on AI, Machine Learning, Data Science, and Full Stack Development.',
      '- Built healthcare monitoring, sentiment analysis, attendance, speech emotion, and game systems.',
      '- Strong foundation in Python, React.js, Node.js, MongoDB, and modern product design.',
    ].join('\n');

    const blob = new Blob([resume], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'Harsh_Shukla_Resume.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };
}

function BackgroundEffects() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const onMove = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY, visible: true });
    const onLeave = () => setCursor((current) => ({ ...current, visible: false }));

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_22%),linear-gradient(180deg,#070707_0%,#050505_60%,#030303_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-fine bg-[size:36px_36px] opacity-[0.06] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
        <div className="absolute left-[-10%] top-[8%] h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[120px] animate-drift" />
        <div className="absolute right-[-8%] top-[22%] h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px] animate-drift [animation-delay:2s]" />
        <div className="absolute bottom-[-10%] left-[18%] h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px] animate-drift [animation-delay:4s]" />
      </div>
      <div
        className="pointer-events-none fixed left-0 top-0 z-50 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.24),rgba(59,130,246,0.08),transparent_68%)] blur-3xl transition-[opacity,transform] duration-300"
        style={{ transform: `translate3d(${cursor.x - 144}px, ${cursor.y - 144}px, 0)`, opacity: cursor.visible ? 1 : 0 }}
      />
    </>
  );
}

export default function App() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const typedWords = useMemo(() => ['AI Systems', 'Machine Learning', 'Full Stack Products', 'Future-Ready Experiences'], []);
  const downloadResume = useResumeDownload();

  useEffect(() => {
    document.title = `${owner.name} | ${owner.role}`;
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-ink text-white">
      <BackgroundEffects />
      <ScrollProgress />

      <header className="sticky top-0 z-40 border-b border-white/8 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button onClick={() => scrollTo('hero')} className="text-left">
            <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Portfolio</p>
            <p className="text-lg font-semibold text-white">Harsh Shukla</p>
          </button>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <button key={item.label} onClick={() => scrollTo(item.href.slice(1))} className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">
                {item.label}
              </button>
            ))}
          </nav>

          <button onClick={() => scrollTo('contact')} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-cyan-400/40 hover:bg-cyan-500/10">
            <FaRocket className="text-cyan-300" /> Hire Me
          </button>
        </div>
      </header>

      <main className="relative z-10">
        <section id="hero" className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(59,130,246,0.9)]" />
                  AI / ML / Full Stack
                </div>

                <p className="mt-8 text-sm uppercase tracking-[0.55em] text-cyan-300/80">{owner.name}</p>
                <h1 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
                  AI & Machine <span className="block bg-gradient-to-r from-fuchsia-300 via-white to-cyan-300 bg-clip-text text-transparent">Learning Engineer</span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                  I build intelligent AI systems, machine learning applications, and modern full-stack web solutions that solve real-world problems.
                </p>

                <p className="mt-4 text-base text-slate-200 sm:text-lg">
                  <TypingText words={typedWords} className="font-medium" />
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button onClick={() => scrollTo('projects')} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-neon transition duration-300 hover:scale-[1.02]">
                    View Projects <FaArrowDown />
                  </button>
                  <button onClick={downloadResume} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-cyan-500/10">
                    <FaDownload /> Download Resume
                  </button>
                  <button onClick={() => scrollTo('contact')} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10">
                    <FaEnvelope /> Contact Me
                  </button>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {stats.map((stat) => (
                    <motion.div key={stat.label} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 240, damping: 18 }}>
                      <GlassCard className="p-4 text-center">
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    <FaLocationArrow className="text-cyan-300" /> B.Tech CSE (AI & ML)
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    <FaPhone className="text-fuchsia-300" /> {owner.phone}
                  </span>
                  <a href={owner.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-400/40 hover:text-white">
                    <FaGithub className="text-cyan-300" /> GitHub
                  </a>
                  <a href={owner.linkedIn} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-400/40 hover:text-white">
                    <FaLinkedin className="text-fuchsia-300" /> LinkedIn
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <HeroScene />
            </Reveal>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 py-20 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="About Me"
              title="Built for AI-driven products and polished engineering"
              description="I am a B.Tech Computer Science (AI & ML) student passionate about Artificial Intelligence, Machine Learning, Data Science, and Full Stack Development. I enjoy building intelligent applications that combine powerful algorithms with beautiful user experiences. I continuously learn emerging technologies and transform innovative ideas into impactful software solutions."
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <GlassCard className="overflow-hidden p-8 lg:p-10">
                <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
                  <div className="relative mx-auto flex h-60 w-60 items-center justify-center rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),rgba(59,130,246,0.18),rgba(5,5,5,0.82))]">
                    <div className="absolute inset-4 rounded-[1.6rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.16),rgba(255,255,255,0.02))]" />
                    <div className="absolute inset-8 animate-drift rounded-[1.2rem] border border-neonBlue/20 bg-[linear-gradient(135deg,rgba(168,85,247,0.2),rgba(59,130,246,0.1))] blur-[1px]" />
                    <div className="relative z-10 text-center">
                      <p className="text-xs uppercase tracking-[0.45em] text-slate-300">Harsh Shukla</p>
                      <p className="mt-3 text-5xl font-semibold text-white">AI</p>
                      <p className="mt-2 text-sm uppercase tracking-[0.4em] text-blue-200">Machine Learning</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-purple-300/70">Profile</p>
                    <h3 className="mt-3 text-3xl font-semibold text-white">Engineering intelligent systems with product-level polish.</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      I focus on building solutions that feel fast, modern, and credible. My work spans AI/ML experiments, data-centric workflows, and full-stack interfaces that make complex systems easy to use.
                    </p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {['AI product thinking', 'Model experimentation', 'Responsive UI systems', 'Clean engineering workflow'].map((item) => (
                        <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.12}>
              <GlassCard className="h-full p-8">
                <div className="absolute right-8 top-8 h-32 w-32 rounded-full bg-neonBlue/20 blur-[70px]" />
                <div className="absolute left-8 bottom-8 h-28 w-28 rounded-full bg-neonPurple/20 blur-[70px]" />
                <div className="relative z-10">
                  <p className="text-sm uppercase tracking-[0.35em] text-purple-300/70">Brand Statement</p>
                  <p className="mt-4 text-2xl font-semibold leading-10 text-white">
                    Creating futuristic digital experiences where artificial intelligence feels accessible, useful, and beautifully engineered.
                  </p>
                  <p className="mt-6 text-sm leading-7 text-slate-300">
                    This portfolio is designed as a premium showcase for technical credibility, visual craftsmanship, and a strong developer identity.
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 py-20 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Tech Stack"
              title="Futuristic skill matrix"
              description="Hover-ready skill cards with glow, depth, and animated borders built for a polished premium feel."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.05}>
                <SkillCard title={group.title} items={group.items} icon={group.icon} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 py-20 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Projects"
              title="Premium project showcase"
              description="Selected work across healthcare, NLP, computer vision, deep learning, and interactive app development."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="certifications" className="scroll-mt-24 py-20 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Recognition"
              title="Certifications and timeline"
              description="A compact timeline highlighting training, events, and achievements that support the technical journey."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <Timeline items={certifications} />
            </Reveal>

            <Reveal delay={0.1}>
              <GlassCard className="h-full p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.45em] text-cyan-300/80">Education</p>
                <h3 className="mt-4 text-3xl font-semibold text-white">{education.institution}</h3>
                <p className="mt-3 text-lg text-slate-300">{education.degree}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">CGPA</p>
                    <p className="mt-3 text-2xl font-bold text-white">{education.cgpa}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Graduation</p>
                    <p className="mt-3 text-2xl font-bold text-white">{education.graduation}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Focus</p>
                    <p className="mt-3 text-2xl font-bold text-white">AIML</p>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-5 text-sm leading-7 text-cyan-100/90">
                  United Institute of Technology is where the AI and full-stack foundation is being shaped into practical product engineering skills.
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-20 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="A futuristic contact panel for opportunities and collaborations"
              description="Use the direct links or the contact form to reach Harsh for internships, collaborations, or project discussions."
              align="center"
            />
          </Reveal>

          <div className="mt-12">
            <ContactPanel />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-black/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 Harsh Shukla. Built with React, Tailwind CSS, Framer Motion, and Vite.</p>
          <div className="flex flex-wrap gap-4">
            <a href={owner.github} target="_blank" rel="noreferrer" className="transition hover:text-white">GitHub</a>
            <a href={owner.linkedIn} target="_blank" rel="noreferrer" className="transition hover:text-white">LinkedIn</a>
            <a href={`mailto:${owner.email}`} className="transition hover:text-white">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
