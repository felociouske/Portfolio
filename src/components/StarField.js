import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import './StarField.css';

const StarField = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (theme !== 'space') {
      cancelAnimationFrame(animRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, frame = 0;
    let stars = [], particles = [], scanlineY = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 4000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.2,
          opacity: Math.random() * 0.7 + 0.1,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: Math.random() > 0.92 ? '#00ff41' : '#e8ffe8',
        });
      }
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#020202';
      ctx.fillRect(0, 0, width, height);

      // grid
      const gridSize = 60;
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.04)';
      ctx.lineWidth = 0.5;
      const offsetX = (frame * 0.02) % gridSize;
      const offsetY = (frame * 0.01) % gridSize;
      ctx.beginPath();
      for (let x = -gridSize + offsetX; x < width + gridSize; x += gridSize) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = -gridSize + offsetY; y < height + gridSize; y += gridSize) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      const grad = ctx.createRadialGradient(width / 2, height, 0, width / 2, height, width * 0.8);
      grad.addColorStop(0, 'rgba(0, 255, 65, 0.04)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const time = frame * 0.01;
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset);
        const opacity = star.opacity * (0.6 + 0.4 * twinkle);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        if (star.color === '#00ff41') {
          ctx.shadowBlur = 6; ctx.shadowColor = '#00ff41';
          ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(232, 255, 232, ${opacity})`;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (frame % 3 === 0 && particles.length < 60) {
        particles.push({
          x: Math.random() * width, y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
          maxLife: Math.random() * 200 + 100, currentLife: 0,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
      particles.forEach((p, i) => {
        p.currentLife++; p.x += p.vx; p.y += p.vy;
        const lr = p.currentLife / p.maxLife;
        const op = lr < 0.2 ? lr / 0.2 : lr > 0.8 ? 1 - (lr - 0.8) / 0.2 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 65, ${op * 0.3})`;
        ctx.fill();
        if (p.currentLife >= p.maxLife) particles.splice(i, 1);
      });

      scanlineY += 2;
      if (scanlineY > height) scanlineY = 0;
      const sg = ctx.createLinearGradient(0, scanlineY - 40, 0, scanlineY + 40);
      sg.addColorStop(0, 'transparent');
      sg.addColorStop(0.5, 'rgba(0, 255, 65, 0.015)');
      sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanlineY - 40, width, 80);

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    createStars();
    draw();

    const onResize = () => { resize(); createStars(); };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [theme]);

  if (theme !== 'space') return null;
  return <canvas ref={canvasRef} className="starfield-canvas" />;
};

export default StarField;