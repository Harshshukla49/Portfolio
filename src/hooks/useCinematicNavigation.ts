import { useState, useEffect, useCallback } from 'react';

export type CinematicSection = 'hero' | 'about' | 'skills' | 'projects' | 'milestones' | 'contact';

export function useCinematicNavigation() {
  const [activeSection, setActiveSection] = useState<CinematicSection>('hero');

  // Instant, smooth scrolling to target section
  const transitionToSection = useCallback((sectionId: string) => {
    const cleanId = sectionId.replace('#', '') as CinematicSection;
    setActiveSection(cleanId);

    if (cleanId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', window.location.pathname);
      }
      return;
    }

    const el = document.getElementById(cleanId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${cleanId}`);
      }
    }
  }, []);

  // Handle initial hash in URL if present on load
  useEffect(() => {
    if (window.location.hash) {
      const initialId = window.location.hash.replace('#', '');
      const validSections: CinematicSection[] = ['hero', 'about', 'skills', 'projects', 'milestones', 'contact'];
      if (validSections.includes(initialId as CinematicSection)) {
        setTimeout(() => {
          transitionToSection(initialId);
        }, 100);
      }
    }
  }, [transitionToSection]);

  // Scrollspy for manual user scrolling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
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
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    activeSection,
    isTransitioning: false,
    targetSection: null,
    transitionToSection,
    scrollToSection: transitionToSection,
  };
}


