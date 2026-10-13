import React, { useState, useRef } from 'react';

interface HeroSectionProps {
  onScrollToGallery: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToGallery }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const mainPhotoUrl = 'https://i.postimg.cc/kgHjGGmk/IMG-7583.webp';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-12 sm:pt-16 pb-16 px-4 md:px-8 overflow-hidden">
      {/* Ambient background champagne & crimson light blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#8E0C16]/25 via-[#D4AF37]/15 to-transparent rounded-full blur-[110px] pointer-events-none" />

      {/* Seção 1 — Título e Mensagem de Abertura */}
      <div className="text-center max-w-2xl mx-auto px-4 mb-8">
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          <span className="text-champagne-gradient inline-block drop-shadow-[0_2px_15px_rgba(212,175,55,0.35)]">
            Feliz Aniversário!
          </span>
        </h1>

        <p className="font-editorial italic text-lg sm:text-xl md:text-2xl text-[#F1F5F9] font-light leading-relaxed tracking-wide text-balance max-w-xl mx-auto">
          “Hoje é um dia especial, dedicado a celebrar a sua vida, a sua história e a alegria que você traz para as pessoas ao seu redor.”
        </p>
      </div>

      {/* Central Portrait Container with Sophisticated Frame & Subtle Depth */}
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group transition-transform duration-300 ease-out will-change-transform max-w-[340px] sm:max-w-[390px] md:max-w-[420px] w-full my-4"
        style={{
          perspective: '1200px',
        }}
      >
        <div
          className="relative rounded-3xl p-2.5 transition-all duration-500 ease-out"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d',
            boxShadow:
              '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 35px -5px rgba(212, 175, 55, 0.25), 0 0 25px -5px rgba(198, 40, 40, 0.25)',
            background:
              'linear-gradient(145deg, rgba(212, 175, 55, 0.4) 0%, rgba(28, 4, 7, 0.95) 45%, rgba(198, 40, 40, 0.35) 100%)',
          }}
        >
          {/* Inner bezel border */}
          <div className="relative rounded-[22px] overflow-hidden bg-[#120204] border border-[#D4AF37]/25">
            {/* The Main Photograph */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#070102]">
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-[#200306] to-[#070102]" />
              )}
              <img
                src={mainPhotoUrl}
                alt="Fotografia de Aniversário em Destaque"
                referrerPolicy="no-referrer"
                loading="eager"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover object-center transition-all duration-1000 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              />

              {/* Gentle filmic vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071018]/70 via-transparent to-black/20 pointer-events-none" />

              {/* Subtle metallic shine sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          </div>

          {/* Decorative corner accents in champagne gold and discrete ruby red */}
          <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/80 rounded-tl pointer-events-none" />
          <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/80 rounded-tr pointer-events-none" />
          <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-[#C62828]/80 rounded-bl pointer-events-none" />
          <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-[#C62828]/80 rounded-br pointer-events-none" />
        </div>
      </div>

      {/* Seção 2 — Mensagem Abaixo da Foto Principal */}
      <div className="mt-8 text-center max-w-xl mx-auto px-4">
        <p className="font-editorial italic text-base sm:text-lg md:text-xl text-[#DFD0B8] leading-relaxed tracking-wide">
          “Que este novo ciclo venha carregado de saúde, paz, conquistas e momentos inesquecíveis.”
        </p>

        {/* Scroll invitation button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onScrollToGallery}
            className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#D4AF37]/25 bg-[#0b1b2a]/80 backdrop-blur-md text-xs tracking-[0.2em] font-cinzel text-[#F5E8C7] hover:text-white hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300 uppercase group"
          >
            <span>Ver Lembranças</span>
            <svg
              className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-y-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
