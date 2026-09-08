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
import CinematicSceneDive from './components/CinematicSceneDive';
import WelcomeReveal from './components/WelcomeReveal';
import { useCinematicNavigation } from './hooks/useCinematicNavigation';
import { portfolioData } from './data/portfolioData';

export default function App() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
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
      {/* 3D Cinematic Opening Sequence ("ENTER HARSH'S WORLD") */}
      {showWelcome && (
        <WelcomeReveal
          onComplete={() => setShowWelcome(false)}
        />
      )}

      {/* Desktop Magnetic Cyber Cursor */}
      <CustomCursor />

      {/* Cinematic 3D Scene Dive & Particle Travel (No Pill Badges) */}
      <CinematicSceneDive
        isTransitioning={isTransitioning}
        targetSection={targetSection}
      />

      {/* Futuristic Background Universe & Grid System */}
      <BackgroundEffects />

      {/* Floating Glassmorphic Navbar with 3D Scene Controls & Replay Option */}
      <Navbar
        activeSection={activeSection}
        onNavigate={transitionToSection}
        onOpenAI={() => setIsAIOpen(true)}
        onDownloadResume={handleDownloadResume}
        onReplayIntro={() => setShowWelcome(true)}
      />

      {/* Main Content Sections with Whole-Page 3D Perspective Scene Dive */}
      <motion.main
        animate={
          isTransitioning
            ? {
                scale: targetSection === 'projects' ? 0.93 : 0.96,
                opacity: 0.8,
                translateZ:
                  targetSection === 'projects'
                    ? -140
                    : targetSection === 'skills'
                    ? -100
                    : -75,
                rotateY:
                  targetSection === 'skills'
                    ? -3.5
                    : targetSection === 'projects'
                    ? 3
                    : targetSection === 'milestones'
                    ? -4
                    : targetSection === 'contact'
                    ? 2
                    : 0,
                rotateX:
                  targetSection === 'skills'
                    ? 2
                    : targetSection === 'contact'
                    ? -2
                    : targetSection === 'about'
                    ? 1.5
                    : 0,
                filter: 'blur(0.8px)',
              }
            : {
                scale: 1,
                opacity: 1,
                translateZ: 0,
                rotateY: 0,
                rotateX: 0,
                filter: 'blur(0px)',
              }
        }
        transition={{
          duration: isTransitioning ? 0.22 : 0.42,
          ease: isTransitioning ? [0.22, 1, 0.36, 1] : [0.16, 1, 0.3, 1],
        }}
        style={{ perspective: 1400, transformStyle: 'preserve-3d' }}
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

