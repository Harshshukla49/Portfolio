import React, { useState, useEffect, useCallback } from 'react';
import CustomCursor from './components/CustomCursor';
import BackgroundEffects from './components/BackgroundEffects';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import TechStackSection from './components/TechStackSection';
import ProjectsSection from './components/ProjectsSection';
import TimelineSection from './components/TimelineSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import FloatingAITrigger from './components/FloatingAITrigger';
import { portfolioData } from './data/portfolioData';

export default function App() {
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Verified Resume Downloader
  const handleDownloadResume = useCallback(() => {
    const resumeText = [
      '=====================================================================',
      `               ${portfolioData.personal.name.toUpperCase()}`,
      `       ${portfolioData.personal.role.toUpperCase()}`,
      '=====================================================================',
      `Email:    ${portfolioData.personal.email}`,
      `Phone:    ${portfolioData.personal.phone}`,
      `Location: ${portfolioData.personal.location}`,
      `GitHub:   ${portfolioData.personal.github}`,
      `LinkedIn: ${portfolioData.personal.linkedIn}`,
      '',
      '---------------------------------------------------------------------',
      'PROFESSIONAL SUMMARY',
      '---------------------------------------------------------------------',
      portfolioData.personal.bio,
      '',
      '---------------------------------------------------------------------',
      'EDUCATION',
      '---------------------------------------------------------------------',
      `${portfolioData.education.degree} (${portfolioData.education.specialization})`,
      `${portfolioData.education.institution} - ${portfolioData.education.location}`,
      `Timeline: ${portfolioData.education.duration} | CGPA: ${portfolioData.education.cgpa}`,
      '',
      '---------------------------------------------------------------------',
      'CORE TECHNICAL SKILLS',
      '---------------------------------------------------------------------',
      'Languages:       Python, C++, JavaScript (ES6+), TypeScript, SQL',
      'AI & ML:         Machine Learning, Deep Learning, NLP, OpenCV, Scikit-Learn, CNN, LSTM',
      'Frontend:        React.js, Tailwind CSS, HTML5, CSS3, Framer Motion',
      'Backend:         Node.js, Express.js, Flask, REST APIs',
      'Databases:       MongoDB, MySQL, Firebase, Supabase, SQLite',
      'Developer Tools: Git, GitHub, Postman, VS Code, Vite',
      '',
      '---------------------------------------------------------------------',
      'FEATURED PROJECTS',
      '---------------------------------------------------------------------',
      ...portfolioData.projects.map(
        (p, idx) =>
          `[${idx + 1}] ${p.title} (${p.category})\n` +
          `    Tech: ${p.tech.join(', ')}\n` +
          `    Summary: ${p.description}\n` +
          (p.liveUrl ? `    Live URL: ${p.liveUrl}\n` : '') +
          `    GitHub: ${p.githubUrl}\n`
      ),
      '',
      '---------------------------------------------------------------------',
      'CERTIFICATIONS & ACHIEVEMENTS',
      '---------------------------------------------------------------------',
      ...portfolioData.milestones.map(
        (m, idx) => `[${idx + 1}] ${m.title} - ${m.organization} (${m.year})\n    ${m.details}\n`
      ),
      '=====================================================================',
      'Generated from verified portfolio records.',
    ].join('\n');

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Harsh_Shukla_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  useEffect(() => {
    document.title = `${portfolioData.personal.name} | ${portfolioData.personal.role}`;
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030305] text-slate-100 font-sans selection:bg-purple-500/40 selection:text-white">
      {/* Desktop Magnetic Cyber Cursor */}
      <CustomCursor />

      {/* Futuristic Background System */}
      <BackgroundEffects />

      {/* Floating Glassmorphic Navbar */}
      <Navbar
        onOpenAI={() => setIsAIOpen(true)}
        onDownloadResume={handleDownloadResume}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          onOpenAI={() => setIsAIOpen(true)}
          onDownloadResume={handleDownloadResume}
        />

        <AboutSection />

        <TechStackSection />

        <ProjectsSection />

        <TimelineSection />

        <ContactSection onDownloadResume={handleDownloadResume} />
      </main>

      {/* Futuristic Cyber Footer */}
      <Footer />

      {/* Floating Bottom-Right AI Assistant Launcher */}
      <FloatingAITrigger onClick={() => setIsAIOpen(true)} />

      {/* Conversational AI Portfolio Assistant Modal */}
      <AIAssistant
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />
    </div>
  );
}
