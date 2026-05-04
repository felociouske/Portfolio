import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to a container element.
 * Child elements with [data-reveal] get the class "is-visible"
 * when they scroll into view.
 *
 * Usage:
 *   const containerRef = useScrollReveal();
 *   <div ref={containerRef}>
 *     <div className="reveal-left" data-reveal>card</div>
 *     <div className="reveal-right" data-reveal>card</div>
 *   </div>
 */
const useScrollReveal = (options = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => targets.forEach((el) => observer.unobserve(el));
  }, [options.threshold, options.rootMargin]);

  return containerRef;
};

export default useScrollReveal;
