import { useState, useEffect, useCallback, useRef } from 'react';

export type CinematicSection = 'hero' | 'about' | 'skills' | 'projects' | 'milestones' | 'contact';

export function useCinematicNavigation() {
  const [activeSection, setActiveSection] = useState<CinematicSection>('hero');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetSection, setTargetSection] = useState<CinematicSection | null>(null);
  const isTransitioningRef = useRef(false);

  // Transition to a specific section with cinematic 3D camera flight
  const transitionToSection = useCallback((sectionId: string) => {
    const cleanId = sectionId.replace('#', '') as CinematicSection;
    if (isTransitioningRef.current || cleanId === activeSection) {
      const el = document.getElementById(cleanId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setTargetSection(cleanId);

    // Phase 1: Current scene recoils into 3D depth (0 - 300ms)
    // Phase 2: Warp tunnel activates & camera travels to destination (300ms - 550ms)
    setTimeout(() => {
      const el = document.getElementById(cleanId);
      if (el) {
        el.scrollIntoView({ behavior: 'auto' });
      }
      setActiveSection(cleanId);
    }, 380);

    // Phase 3: Destination scene emerges from depth and lands (550ms - 800ms)
    setTimeout(() => {
      setIsTransitioning(false);
      setTargetSection(null);
      isTransitioningRef.current = false;
    }, 850);
  }, [activeSection]);

  // Scrollspy for manual user scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isTransitioningRef.current) return;

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    activeSection,
    isTransitioning,
    targetSection,
    transitionToSection,
  };
}
