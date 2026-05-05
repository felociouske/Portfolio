import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import './ForestBackground.css';

// ─── Forest theme canvas ─────────────────────────────────────────────────────
const drawForest = (ctx, width, height, ts) => {
  ctx.clearRect(0, 0, width, height);

  // Deep forest floor gradient
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, '#020a02');
  bg.addColorStop(0.4, '#040f04');
  bg.addColorStop(0.75, '#061406');
  bg.addColorStop(1, '#0a1e08');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // God rays / light shafts from canopy
  const rayCount = 6;
  for (let i = 0; i < rayCount; i++) {
    const x = (width / (rayCount + 1)) * (i + 1) + Math.sin(ts * 0.0003 + i) * 30;
    const grad = ctx.createLinearGradient(x - 80, 0, x + 80, height * 0.7);
    grad.addColorStop(0, 'rgba(60,200,60,0.055)');
    grad.addColorStop(0.5, 'rgba(40,160,40,0.025)');
    grad.addColorStop(1, 'transparent');
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x - 60, 0);
    ctx.lineTo(x + 60, 0);
    ctx.lineTo(x + 120 + i * 10, height * 0.75);
    ctx.lineTo(x - 120 - i * 10, height * 0.75);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.6 + 0.4 * Math.sin(ts * 0.0005 + i * 1.2);
    ctx.fill();
    ctx.restore();
  }

  // Floating leaves
  const seed = Math.floor(ts / 50);
  const rng = (n) => ((Math.sin(n * 127.1 + seed * 0.01) * 43758.5453) % 1 + 1) % 1;

  for (let i = 0; i < 40; i++) {
    const phase = (ts * 0.00018 + i * 0.37) % 1;
    const x = (rng(i) * width + Math.sin(ts * 0.0004 + i) * 60) % width;
    const y = phase * (height + 60) - 30;
    const size = 3 + rng(i + 10) * 5;
    const rot = ts * 0.001 * (rng(i + 20) - 0.5) * 3 + i;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.globalAlpha = 0.15 + rng(i + 30) * 0.35;

    const hue = 100 + rng(i + 5) * 40;
    ctx.fillStyle = `hsl(${hue}, 65%, 28%)`;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.5, size * 1.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // leaf vein
    ctx.strokeStyle = `hsl(${hue}, 40%, 20%)`;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha *= 0.5;
    ctx.beginPath();
    ctx.moveTo(0, -size * 1.2);
    ctx.lineTo(0, size * 1.2);
    ctx.stroke();

    ctx.restore();
  }

  // Ground mist layers
  for (let layer = 0; layer < 3; layer++) {
    const mistY = height * (0.7 + layer * 0.1);
    const mistH = height * 0.18;
    const drift = Math.sin(ts * 0.0002 + layer * 2) * 40;
    const mg = ctx.createRadialGradient(
      width / 2 + drift, mistY + mistH / 2, 0,
      width / 2 + drift, mistY + mistH / 2, width * 0.8
    );
    mg.addColorStop(0, `rgba(20, 80, 20, ${0.12 - layer * 0.03})`);
    mg.addColorStop(0.6, `rgba(10, 50, 10, ${0.06 - layer * 0.01})`);
    mg.addColorStop(1, 'transparent');
    ctx.fillStyle = mg;
    ctx.fillRect(0, mistY, width, mistH);
  }

  // Vignette
  const vig = ctx.createRadialGradient(width / 2, height / 2, width * 0.25, width / 2, height / 2, width * 0.85);
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(1, 'rgba(0, 8, 0, 0.72)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, width, height);
};

// ─── Vegetation theme canvas ──────────────────────────────────────────────────
const drawVegetation = (ctx, width, height, ts) => {
  ctx.clearRect(0, 0, width, height);

  // Lush jungle background
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, '#011a05');
  bg.addColorStop(0.5, '#032208');
  bg.addColorStop(1, '#052e0c');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Pulsing bioluminescent glow patches
  const glowSpots = [
    { x: 0.15, y: 0.6 }, { x: 0.75, y: 0.4 }, { x: 0.45, y: 0.8 },
    { x: 0.88, y: 0.7 }, { x: 0.3, y: 0.3 },
  ];
  glowSpots.forEach((s, i) => {
    const pulse = 0.5 + 0.5 * Math.sin(ts * 0.0008 + i * 1.5);
    const r = 80 + pulse * 60;
    const glow = ctx.createRadialGradient(s.x * width, s.y * height, 0, s.x * width, s.y * height, r);
    glow.addColorStop(0, `rgba(80, 255, 120, ${0.06 * pulse})`);
    glow.addColorStop(0.5, `rgba(40, 200, 80, ${0.03 * pulse})`);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(s.x * width, s.y * height, r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Spores / pollen floating up
  for (let i = 0; i < 60; i++) {
    const phase = (ts * 0.00025 + i * 0.29) % 1;
    const baseX = ((i * 137.5) % width);
    const x = baseX + Math.sin(ts * 0.0005 + i * 0.8) * 45;
    const y = height - phase * (height + 40);
    const size = 1.5 + ((i * 31.7) % 1) * 3;
    const pulse = 0.4 + 0.6 * Math.sin(ts * 0.002 + i);

    ctx.save();
    ctx.globalAlpha = (0.2 + ((i * 17.3) % 1) * 0.4) * pulse;

    const sporeGrad = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
    sporeGrad.addColorStop(0, 'rgba(150, 255, 150, 1)');
    sporeGrad.addColorStop(0.4, 'rgba(80, 220, 100, 0.6)');
    sporeGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = sporeGrad;
    ctx.beginPath();
    ctx.arc(x, y, size * 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Vine-like tendrils on edges
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = '#3a8a3a';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 5; i++) {
    const startX = i % 2 === 0 ? 0 : width;
    ctx.beginPath();
    ctx.moveTo(startX, i * (height / 4));
    for (let t = 0; t < 1; t += 0.05) {
      const cx = startX + (i % 2 === 0 ? 1 : -1) * (80 + Math.sin(t * 6 + ts * 0.0003) * 40);
      const cy = i * (height / 4) + t * (height / 3);
      ctx.lineTo(cx, cy);
    }
    ctx.stroke();
  }
  ctx.restore();

  // Mist at base
  const mistGrad = ctx.createLinearGradient(0, height * 0.75, 0, height);
  mistGrad.addColorStop(0, 'transparent');
  mistGrad.addColorStop(1, 'rgba(10, 60, 15, 0.4)');
  ctx.fillStyle = mistGrad;
  ctx.fillRect(0, height * 0.75, width, height * 0.25);

  // Vignette — slightly lighter than forest
  const vig = ctx.createRadialGradient(width / 2, height / 2, width * 0.3, width / 2, height / 2, width * 0.85);
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(1, 'rgba(0, 12, 2, 0.65)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, width, height);
};

// ─── Component ────────────────────────────────────────────────────────────────
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

    const draw = (ts) => {
      if (theme === 'forest') drawForest(ctx, width, height, ts);
      else drawVegetation(ctx, width, height, ts);
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  if (theme === 'space') return null;

  return <canvas ref={canvasRef} className="forest-canvas-bg" />;
};

export default ForestBackground;
