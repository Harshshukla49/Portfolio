import { useState, useEffect, useCallback, useRef } from 'react';

export type CinematicSection = 'hero' | 'about' | 'skills' | 'projects' | 'milestones' | 'contact';

export function useCinematicNavigation() {
  const [activeSection, setActiveSection] = useState<CinematicSection>('hero');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetSection, setTargetSection] = useState<CinematicSection | null>(null);
  const transitionTimerRef = useRef<number | null>(null);

  const settleTransition = useCallback(() => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    setIsTransitioning(false);
    setTargetSection(null);
  }, []);

  // Instant non-blocking transition engine
  const transitionToSection = useCallback((sectionId: string) => {
    const cleanId = sectionId.replace('#', '') as CinematicSection;

    // Clear any active animation timers immediately for rapid-click interruption
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    // Step 1: Immediately set active state and scroll to target so DOM renders destination instantly
    setActiveSection(cleanId);
    setTargetSection(cleanId);
    setIsTransitioning(true);

    const el = document.getElementById(cleanId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    // Step 2: Complete the GPU camera jump and settling effect in 600ms
    transitionTimerRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
      setTargetSection(null);
      transitionTimerRef.current = null;
    }, 600);
  }, []);

  // Keyboard shortcut to instantly settle transition
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        settleTransition();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settleTransition]);

  // Scrollspy for manual user scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isTransitioning) return;

      const sections: CinematicSection[] = ['hero', 'about', 'skills', 'projects', 'milestones', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, [isTransitioning]);

  return {
    activeSection,
    isTransitioning,
    targetSection,
    transitionToSection,
  };
}

