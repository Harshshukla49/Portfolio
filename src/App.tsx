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

  // Direct Official PDF Resume Downloader
  const handleDownloadResume = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/Harsh_Shukla_Resume.pdf';
    link.setAttribute('download', 'Harsh_Shukla_Resume.pdf');
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
