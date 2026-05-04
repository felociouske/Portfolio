import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import './ForestBackground.css';

const ForestBackground = () => {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (theme === 'space') {
      cancelAnimationFrame(animRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    // Floating particles (leaves / spores)
    const particles = Array.from({ length: theme === 'vegetation' ? 80 : 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.5 + 0.2),
      size: Math.random() * 4 + 1.5,
      opacity: Math.random() * 0.5 + 0.2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
    }));

    const isForest = theme === 'forest';

    const draw = (ts) => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.3;
        p.y += p.vy;

        if (p.y < -10) { p.y = height + 5; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 5;
        if (p.x > width + 10) p.x = -5;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.wobble);

        if (isForest) {
          // leaf shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.6, p.size * 1.4, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${34 + Math.random() * 20}, ${139 + Math.random() * 30}, ${34 + Math.random() * 20}, 1)`;
          ctx.fill();
          // vein
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.4);
          ctx.lineTo(0, p.size * 1.4);
          ctx.strokeStyle = 'rgba(0,100,0,0.4)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else {
          // spore / pollen dot
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${100 + Math.random() * 60}, ${200 + Math.random() * 55}, ${80 + Math.random() * 40}, 1)`;
          ctx.fill();
          // tiny glow
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
          grad.addColorStop(0, 'rgba(120,255,80,0.15)');
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  if (theme === 'space') return null;

  return (
    <div className={`forest-bg forest-bg--${theme}`}>
      <canvas ref={canvasRef} className="forest-canvas" />
      <div className="forest-mist" />
      <div className="forest-vignette" />
    </div>
  );
};

export default ForestBackground;



