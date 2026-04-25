import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useInView — triggers reveal animations when element enters viewport.
 * Also exposes scrollProgress (0→1) for 3D parallax transforms.
 */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    const progress = 1 - (rect.top + rect.height) / (windowH + rect.height);
    setScrollProgress(Math.min(1, Math.max(0, progress)));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.once !== false) observer.disconnect();
        } else if (options.once === false) {
          setInView(false);
        }
      },
      { threshold: options.threshold || 0.12 }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    if (options.trackScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    return () => {
      if (el) observer.unobserve(el);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [options.threshold, options.once, options.trackScroll, handleScroll]);

  return { ref, inView, scrollProgress };
};

export default useInView;