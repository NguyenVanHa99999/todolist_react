import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import gsap from 'gsap';

export const useResponsiveAnimations = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  const [animationSettings, setAnimationSettings] = useState({});

  useEffect(() => {
    
    const settings = {
      duration: isMobile ? 0.4 : 0.6,
      stagger: isMobile ? 0.1 : 0.2,
      ease: isMobile ? 'power2.out' : 'back.out(1.7)',
      scale: isMobile ? { from: 0.9, to: 1 } : { from: 0.8, to: 1 },
      y: isMobile ? { from: 20, to: 0 } : { from: 30, to: 0 }
    };

    setAnimationSettings(settings);

    
    if (isMobile) {
      gsap.defaults({
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      gsap.defaults({
        duration: 0.6,
        ease: 'back.out(1.7)'
      });
    }
  }, [isMobile, isTablet]);

  return {
    isMobile,
    isTablet,
    animationSettings,
   
    getResponsiveDuration: (baseDuration = 0.6) => isMobile ? baseDuration * 0.7 : baseDuration,
    getResponsiveStagger: (baseStagger = 0.2) => isMobile ? baseStagger * 0.5 : baseStagger,
    getResponsiveScale: () => isMobile ? 0.95 : 1.05,
    shouldReduceMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };
};

export const useIntersectionAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [elementRef, setElementRef] = useState(null);

  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(elementRef);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px'
      }
    );

    observer.observe(elementRef);

    return () => {
      if (elementRef) observer.unobserve(elementRef);
    };
  }, [elementRef, options.threshold, options.rootMargin]);

  return [setElementRef, isVisible];
};
