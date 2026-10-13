import React, { useEffect, useRef } from 'react';

export const BackgroundAmbience: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particleCount = 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      speedY: -Math.random() * 0.25 - 0.06,
      speedX: (Math.random() - 0.5) * 0.12,
      opacity: Math.random() * 0.4 + 0.12,
      color:
        Math.random() > 0.5
          ? 'rgba(255, 213, 79,'
          : Math.random() > 0.25
          ? 'rgba(255, 60, 80,'
          : 'rgba(255, 255, 255,',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.fillStyle = `${p.color} ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Translucent blurred ambient glow orbs matching screenshot luxury palette */}
      <div className="absolute top-[8%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#8E0C16]/25 blur-[140px]" />
      <div className="absolute top-[35%] right-[-10%] w-[650px] h-[650px] rounded-full bg-[#3D0307]/40 blur-[150px]" />
      <div className="absolute top-[65%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#D4AF37]/8 blur-[160px]" />
      <div className="absolute top-[85%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#750A12]/20 blur-[150px]" />

      {/* Subtle floating particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
      />
    </div>
  );
};
