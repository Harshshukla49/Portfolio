import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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
import CinematicTransitionTunnel from './components/CinematicTransitionTunnel';
import { useCinematicNavigation } from './hooks/useCinematicNavigation';
import { portfolioData } from './data/portfolioData';

export default function App() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const { activeSection, isTransitioning, targetSection, transitionToSection } =
    useCinematicNavigation();

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
    <div className="relative min-h-screen bg-[#030305] text-slate-100 font-sans selection:bg-purple-500/40 selection:text-white overflow-x-hidden">
      {/* Desktop Magnetic Cyber Cursor */}
      <CustomCursor />

      {/* Cinematic 3D Warp Flight Tunnel Overlay */}
      <CinematicTransitionTunnel
        isTransitioning={isTransitioning}
        targetSection={targetSection}
      />

      {/* Futuristic Background Universe & Grid System */}
      <BackgroundEffects />

      {/* Floating Glassmorphic Navbar with 3D Scene Controls */}
      <Navbar
        activeSection={activeSection}
        onNavigate={transitionToSection}
        onOpenAI={() => setIsAIOpen(true)}
        onDownloadResume={handleDownloadResume}
      />

      {/* Main Content Sections with 3D perspective scene container */}
      <motion.main
        animate={
          isTransitioning
            ? {
                scale: 0.94,
                opacity: 0.25,
                filter: 'blur(6px)',
                rotateX: 4,
              }
            : {
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
                rotateX: 0,
              }
        }
        transition={{
          duration: isTransitioning ? 0.35 : 0.45,
          ease: 'easeInOut',
        }}
        style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
        className="relative z-10 will-change-transform"
      >
        <Hero
          onOpenAI={() => setIsAIOpen(true)}
          onNavigate={transitionToSection}
          onDownloadResume={handleDownloadResume}
        />

        <div className="w-full max-w-6xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 via-cyan-500/20 to-transparent" />

        <AboutSection />

        <div className="w-full max-w-6xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 via-blue-500/20 to-transparent" />

        <TechStackSection />

        <div className="w-full max-w-6xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 via-pink-500/20 to-transparent" />

        <ProjectsSection />

        <div className="w-full max-w-6xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 via-emerald-500/20 to-transparent" />

        <TimelineSection />

        <div className="w-full max-w-6xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 via-cyan-500/20 to-transparent" />

        <ContactSection onDownloadResume={handleDownloadResume} />
      </motion.main>

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
