import React, { useEffect, useRef } from 'react';
import './StarField.css';

const StarField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width, height;
    let stars = [];
    let particles = [];
    let scanlineY = 0;

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

    const createParticle = () => {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        life: 1,
        maxLife: Math.random() * 200 + 100,
        currentLife: 0,
        radius: Math.random() * 1.5 + 0.5,
      });
    };

    const drawGrid = (time) => {
      const gridSize = 60;
      const gridOpacity = 0.04;

      ctx.strokeStyle = `rgba(0, 255, 65, ${gridOpacity})`;
      ctx.lineWidth = 0.5;

      const offsetX = (time * 0.02) % gridSize;
      const offsetY = (time * 0.01) % gridSize;

      ctx.beginPath();
      for (let x = -gridSize + offsetX; x < width + gridSize; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = -gridSize + offsetY; y < height + gridSize; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const drawHorizonGlow = () => {
      const gradient = ctx.createRadialGradient(
        width / 2, height, 0,
        width / 2, height, width * 0.8
      );
      gradient.addColorStop(0, 'rgba(0, 255, 65, 0.04)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#020202';
      ctx.fillRect(0, 0, width, height);

      drawGrid(frame);
      drawHorizonGlow();

      const time = frame * 0.01;

      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset);
        const opacity = star.opacity * (0.6 + 0.4 * twinkle);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        if (star.color === '#00ff41') {
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#00ff41';
          ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(232, 255, 232, ${opacity})`;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (frame % 3 === 0 && particles.length < 60) {
        createParticle();
      }

      particles.forEach((p, i) => {
        p.currentLife++;
        p.x += p.vx;
        p.y += p.vy;

        const lifeRatio = p.currentLife / p.maxLife;
        const opacity = lifeRatio < 0.2
          ? lifeRatio / 0.2
          : lifeRatio > 0.8
          ? 1 - (lifeRatio - 0.8) / 0.2
          : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 65, ${opacity * 0.3})`;
        ctx.fill();

        if (p.currentLife >= p.maxLife) {
          particles.splice(i, 1);
        }
      });

      scanlineY += 2;
      if (scanlineY > height) scanlineY = 0;
      const scanGrad = ctx.createLinearGradient(0, scanlineY - 40, 0, scanlineY + 40);
      scanGrad.addColorStop(0, 'transparent');
      scanGrad.addColorStop(0.5, 'rgba(0, 255, 65, 0.015)');
      scanGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanlineY - 40, width, 80);

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createStars();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createStars();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-canvas" />;
};

export default StarField;
