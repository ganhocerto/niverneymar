import React, { useEffect, useRef } from 'react';

export const ClosingSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated champagne and silver stars canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const numStars = 65;
    const stars = Array.from({ length: numStars }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? '#D4AF37' : Math.random() > 0.2 ? '#FFD54F' : '#FFFFFF',
    }));

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        const pulse = Math.sin(time * 0.002 * star.speed * 80) * 0.35 + 0.65;
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha * pulse;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (star.size > 1.5) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2, star.y);
          ctx.lineTo(star.x + star.size * 2, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2);
          ctx.lineTo(star.x, star.y + star.size * 2);
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <footer id="mensagem" className="relative w-full py-24 md:py-36 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-t border-[#D4AF37]/15 select-none">
      {/* Animated starry sky canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-65 z-0"
      />

      {/* Ambient ruby & champagne glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-[#8E0C16]/20 via-[#D4AF37]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Content - Seção 5 Mensagem Final Emocionante (SEM BOTÃO REVER SURPRESA) */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <p className="font-editorial italic text-lg sm:text-xl md:text-2xl text-[#F1F5F9] font-light leading-relaxed tracking-wide">
          “Que seu aniversário marque o início de uma fase ainda mais bonita, repleta de bênçãos, realizações e boas surpresas.”
        </p>

        <p className="font-editorial italic text-base sm:text-lg md:text-xl text-[#DFD0B8] font-light leading-relaxed tracking-wide">
          Você merece um dia inesquecível e uma vida repleta de motivos para comemorar.
        </p>

        <div className="pt-4">
          <h3 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-champagne-gradient tracking-tight drop-shadow-[0_4px_25px_rgba(212,175,55,0.35)]">
            Feliz aniversário!
          </h3>
        </div>

        <div className="pt-8">
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4" />
          <p className="text-xs text-[#94A3B8] font-cinzel tracking-[0.25em] uppercase">
            Com todo o carinho, respeito e admiração
          </p>
        </div>
      </div>
    </footer>
  );
};
