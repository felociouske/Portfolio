import React, { useEffect, useRef, useState } from 'react';
import './GalaxyLoader.css';

const GalaxyLoader = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let angle = 0;
    let startTime = null;
    const DURATION = 5000;

    const stars = Array.from({ length: 320 }, () => ({
      x: (Math.random() - 0.5) * width * 2.5,
      y: (Math.random() - 0.5) * height * 2.5,
      z: Math.random() * width,
      size: Math.random() * 1.8 + 0.2,
    }));

    const arms = 3;
    const armStars = Array.from({ length: 700 }, (_, i) => {
      const arm = i % arms;
      const t = (i / 700) * Math.PI * 6;
      const r = t * 55 + Math.random() * 30;
      const spread = (Math.random() - 0.5) * 60;
      const baseAngle = t + (arm * Math.PI * 2) / arms;
      return {
        x: Math.cos(baseAngle) * r + spread,
        y: Math.sin(baseAngle) * r * 0.38 + spread * 0.5,
        size: Math.random() * 1.4 + 0.4,
        brightness: Math.random() * 0.6 + 0.4,
        color: arm === 0 ? '#a0f0c0' : arm === 1 ? '#c8ffe8' : '#7de8b0',
      };
    });

    const nebulae = Array.from({ length: 6 }, (_, i) => ({
      x: Math.cos((i / 6) * Math.PI * 2) * 160,
      y: Math.sin((i / 6) * Math.PI * 2) * 70,
      r: 60 + Math.random() * 80,
      color: i % 2 === 0 ? 'rgba(0,200,80,0.04)' : 'rgba(40,255,120,0.03)',
    }));

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const draw = (ts) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const prog = Math.min(elapsed / DURATION, 1);
      setProgress(Math.floor(prog * 100));

      ctx.clearRect(0, 0, width, height);

      // deep space bg
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.7);
      bgGrad.addColorStop(0, 'rgba(0,20,8,1)');
      bgGrad.addColorStop(0.6, 'rgba(0,8,3,1)');
      bgGrad.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // background starfield parallax
      stars.forEach((s) => {
        const sx = ((s.x / (s.z * 0.001 + 1)) % width + width) % width;
        const sy = ((s.y / (s.z * 0.001 + 1)) % height + height) % height;
        const twinkle = 0.5 + 0.5 * Math.sin(ts * 0.002 + s.z);
        ctx.beginPath();
        ctx.arc(sx, sy, s.size * twinkle, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,255,220,${0.4 * twinkle})`;
        ctx.fill();
      });

      // galaxy at center
      const cx = width / 2;
      const cy = height / 2;
      angle += 0.004;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // nebula clouds
      nebulae.forEach((n) => {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // galaxy core glow
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 80);
      coreGrad.addColorStop(0, 'rgba(180,255,200,0.95)');
      coreGrad.addColorStop(0.15, 'rgba(80,255,140,0.6)');
      coreGrad.addColorStop(0.4, 'rgba(30,180,80,0.2)');
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.fill();

      // arm stars
      armStars.forEach((s) => {
        const twinkle = 0.6 + 0.4 * Math.sin(ts * 0.003 + s.x + s.y);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color.replace(')', `,${s.brightness * twinkle})`).replace('rgb', 'rgba');
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.brightness * twinkle;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      ctx.restore();

      // scan line effect
      const scanY = ((ts * 0.08) % (height + 20)) - 10;
      const scanGrad = ctx.createLinearGradient(0, scanY - 8, 0, scanY + 8);
      scanGrad.addColorStop(0, 'transparent');
      scanGrad.addColorStop(0.5, 'rgba(0,255,80,0.06)');
      scanGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 8, width, 16);

      if (prog < 1) {
        animFrameRef.current = requestAnimationFrame(draw);
      } else {
        setFadeOut(true);
        setTimeout(() => onComplete && onComplete(), 700);
      }
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  return (
    <div className={`galaxy-loader ${fadeOut ? 'fade-out' : ''}`}>
      <canvas ref={canvasRef} className="galaxy-canvas" />
      <div className="galaxy-overlay">
        <div className="galaxy-hud">
          <div className="galaxy-hud-ring outer" />
          <div className="galaxy-hud-ring middle" />
          <div className="galaxy-hud-ring inner" />
          <div className="galaxy-hud-cross h" />
          <div className="galaxy-hud-cross v" />
        </div>
        <div className="galaxy-text-block">
          <div className="galaxy-label">INITIALIZING PORTFOLIO</div>
          <div className="galaxy-progress-bar">
            <div className="galaxy-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="galaxy-progress-num">{String(progress).padStart(3, '0')}%</div>
          <div className="galaxy-sublabel">LOADING SYSTEMS...</div>
        </div>
      </div>
    </div>
  );
};

export default GalaxyLoader;
