import { motion } from 'framer-motion';
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6';
import type { Project } from '../data/portfolio';
import GlassCard from './GlassCard';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 240, damping: 20 }} className="h-full">
      <GlassCard className="flex h-full flex-col justify-between p-6 md:p-7">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-purple-300/70">Featured Project</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>
        </div>

        <div className="mt-6 space-y-5">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded-full border border-neonBlue/20 bg-neonBlue/10 px-3 py-1 text-xs tracking-wide text-blue-100">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.live ? (
              <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white transition hover:border-neonPurple/40 hover:bg-white/12 hover:shadow-[0_0_24px_rgba(168,85,247,0.18)]">
                Live Demo
                <FaArrowUpRightFromSquare className="text-xs" />
              </a>
            ) : null}
            {project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-neonBlue/40 hover:bg-white/12 hover:text-white">
                GitHub
                <FaGithub className="text-xs" />
              </a>
            ) : null}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
