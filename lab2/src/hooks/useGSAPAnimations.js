import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
     
      gsap.fromTo('.dashboard-header', 
        { 
          y: -50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power2.out' 
        }
      );

   
      gsap.fromTo('.kanban-column', 
        { 
          y: 100, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: 'power2.out',
          delay: 0.3
        }
      );

    
      gsap.fromTo('.task-card', 
        { 
          scale: 0.8, 
          opacity: 0,
          y: 30
        },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0,
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.kanban-board',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};

export const useTaskCardAnimations = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
   
      const handleMouseEnter = () => {
        gsap.to(element, {
          scale: 1.05,
          y: -5,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return cardRef;
};

export const useModalAnimations = (isOpen) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        // Modal entrance animation
        gsap.set(modalRef.current, { scale: 0.7, opacity: 0 });
        gsap.set(overlayRef.current, { opacity: 0 });
        
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        gsap.to(modalRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
          delay: 0.1
        });
      }
    }, modalRef);

    return () => ctx.revert();
  }, [isOpen]);

  return { modalRef, overlayRef };
};

export const useButtonAnimations = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const element = buttonRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const handleMouseEnter = () => {
        gsap.to(element, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      };

      const handleClick = () => {
        gsap.to(element, {
          scale: 0.95,
          duration: 0.1,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        });
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('click', handleClick);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('click', handleClick);
      };
    }, buttonRef);

    return () => ctx.revert();
  }, []);

  return buttonRef;
};

export const useNotificationAnimations = (show) => {
  const notificationRef = useRef(null);

  useEffect(() => {
    if (!notificationRef.current) return;

    const ctx = gsap.context(() => {
      if (show) {
        gsap.fromTo(notificationRef.current, 
          { 
            x: 300, 
            opacity: 0 
          },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.5, 
            ease: 'back.out(1.7)' 
          }
        );
      }
    }, notificationRef);

    return () => ctx.revert();
  }, [show]);

  return notificationRef;
};
