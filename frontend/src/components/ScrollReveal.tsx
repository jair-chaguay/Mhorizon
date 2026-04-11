import { useEffect, useRef, type ElementType, type ReactNode, type HTMLAttributes } from 'react';

interface ScrollRevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  as?: ElementType; 
}

export const ScrollReveal = ({ 
  children, 
  className = "", 
  as: Tag = "div",
  ...rest 
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const revealElements = containerRef.current.querySelectorAll('.reveal-element');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => observer.observe(el));

    const timeoutId = setTimeout(() => {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('active');
        }
      });
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Tag ref={containerRef} className={className} {...rest}>
      {children}
    </Tag>
  );
};