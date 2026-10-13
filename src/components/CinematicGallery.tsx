import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export const GALLERY_PHOTOS = [
  'https://i.postimg.cc/kgHjGGmk/IMG-7583.webp',
  'https://i.postimg.cc/wBswmzqW/IMG-7586.jpg',
  'https://i.postimg.cc/tgVBxbqc/IMG-7588.jpg',
  'https://i.postimg.cc/zfRxgNz9/IMG-7590.jpg',
  'https://i.postimg.cc/nLQ3DxVx/IMG-7592.jpg',
  'https://i.postimg.cc/W4J5kVpj/IMG-7593.jpg',
  'https://i.postimg.cc/zfRxgNDZ/IMG-7591.webp',
  'https://i.postimg.cc/TPWtDxdz/IMG-7589.jpg',
  'https://i.postimg.cc/s2ZThzjN/IMG-7587.jpg',
  'https://i.postimg.cc/6QGMvKWj/IMG-7585.jpg',
];

export const CinematicGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchMoveX, setTouchMoveX] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const total = GALLERY_PHOTOS.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = (idx: number) => {
    setCurrentIndex(idx);
  };

  // 4s Autoplay strictly confined to the carousel, zero page scroll interference
  useEffect(() => {
    if (isPaused || lightboxOpen) return;
    timerRef.current = setInterval(() => {
      goToNext();
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goToNext, isPaused, lightboxOpen]);

  // Preload adjacent images
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % total;
    const prevIdx = (currentIndex - 1 + total) % total;
    const imgNext = new Image();
    imgNext.src = GALLERY_PHOTOS[nextIdx];
    const imgPrev = new Image();
    imgPrev.src = GALLERY_PHOTOS[prevIdx];
  }, [currentIndex, total]);

  // Keep thumbnail scroll strictly isolated to thumbnailContainer only, NEVER touching window scroll
  useEffect(() => {
    const container = thumbnailContainerRef.current;
    if (!container) return;
    const activeEl = container.children[currentIndex] as HTMLElement;
    if (activeEl) {
      const targetLeft =
        activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
      container.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
    setTouchMoveX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    setTouchMoveX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchMoveX !== null) {
      const diff = touchStartX - touchMoveX;
      if (diff > 45) {
        goToNext();
      } else if (diff < -45) {
        goToPrev();
      }
    }
    setTouchStartX(null);
    setTouchMoveX(null);
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'Escape' && lightboxOpen) setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, lightboxOpen]);

  return (
    <section id="galeria-de-momentos" className="relative w-full py-16 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto select-none">
      {/* Seção 3 — Antes do Carrossel */}
      <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
        <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#D4AF37] block mb-2">
          Galeria de Recordações
        </span>
        <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide mb-3">
          Momentos especiais
        </h2>
        <p className="font-editorial italic text-base sm:text-lg text-[#DFD0B8] leading-relaxed max-w-xl mx-auto">
          “Cada foto guarda uma lembrança, um detalhe e um pedaço dessa trajetória que merece ser celebrada com carinho.”
        </p>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-5" />
      </div>

      {/* Main Showcase Viewport */}
      <div
        className="relative mx-auto w-full max-w-4xl aspect-[4/5] sm:aspect-[16/11] md:aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] border border-[#D4AF37]/25 bg-[#120204]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Glow ambient layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(142,12,22,0.3)_0%,transparent_70%)] pointer-events-none z-10 opacity-40" />

        {/* Current Image with Gentle Zoom */}
        {GALLERY_PHOTOS.map((photoUrl, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={photoUrl}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={photoUrl}
                alt={`Memória ${idx + 1}`}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transform transition-transform duration-[6000ms] ease-out will-change-transform ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                loading={Math.abs(idx - currentIndex) <= 1 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071018]/65 via-transparent to-[#071018]/25 pointer-events-none" />
            </div>
          );
        })}

        {/* Lightbox Expand Button */}
        <button
          onClick={() => setLightboxOpen(true)}
          aria-label="Ampliar fotografia em tela cheia"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#071018]/70 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/30 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300"
          title="Ver em tela cheia"
        >
          <Maximize2 className="w-4 h-4 text-[#F5E8C7]" />
        </button>

        {/* Discreet Navigation Arrows */}
        <button
          onClick={goToPrev}
          aria-label="Fotografia anterior"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-[#071018]/60 hover:bg-[#071018]/90 border border-[#D4AF37]/25 text-[#F5E8C7] flex items-center justify-center backdrop-blur-md transition-all duration-300 active:scale-95"
        >
          <ChevronLeft className="w-5 md:w-6 h-5 md:h-6 text-[#D4AF37]" />
        </button>

        <button
          onClick={goToNext}
          aria-label="Próxima fotografia"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-[#071018]/60 hover:bg-[#071018]/90 border border-[#D4AF37]/25 text-[#F5E8C7] flex items-center justify-center backdrop-blur-md transition-all duration-300 active:scale-95"
        >
          <ChevronRight className="w-5 md:w-6 h-5 md:h-6 text-[#D4AF37]" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 left-6 z-20 flex items-center gap-2">
          <span className="font-cinzel text-xs text-white/90 font-medium tracking-widest drop-shadow-md">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-white/40 text-xs">/</span>
          <span className="font-cinzel text-xs text-white/50 tracking-widest">
            {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Progress Bar in Champagne Gold */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/50 z-20 overflow-hidden">
          <div
            key={currentIndex}
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F5E8C7] to-[#D4AF37] origin-left animate-[carouselProgress_4s_linear]"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          />
        </div>
      </div>

      {/* Thumbnail Filmstrip */}
      <div className="mt-6 max-w-4xl mx-auto">
        <div
          ref={thumbnailContainerRef}
          className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 scrollbar-none no-scrollbar snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {GALLERY_PHOTOS.map((url, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={url + idx}
                onClick={() => goToIndex(idx)}
                aria-label={`Ir para a foto ${idx + 1}`}
                className={`relative shrink-0 w-14 sm:w-16 md:w-20 aspect-square rounded-xl overflow-hidden transition-all duration-300 snap-center ${
                  isSelected
                    ? 'ring-2 ring-[#D4AF37] scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'opacity-40 hover:opacity-85 border border-[#D4AF37]/20'
                }`}
              >
                <img
                  src={url}
                  alt={`Miniatura ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Seção 4 — Após o Carrossel */}
      <div className="mt-12 text-center max-w-xl mx-auto px-4">
        <p className="font-editorial italic text-base sm:text-lg md:text-xl text-[#F1F5F9] leading-relaxed">
          “Que nunca faltem motivos para sorrir, sonhar e seguir em frente com força, fé e felicidade.”
        </p>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-[#071018]/95 backdrop-blur-2xl flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Fechar visualização em tela cheia"
            className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-[#F5E8C7]" />
          </button>

          <button
            onClick={goToPrev}
            aria-label="Foto anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:border-[#D4AF37] transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-[#D4AF37]" />
          </button>

          <button
            onClick={goToNext}
            aria-label="Próxima foto"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:border-[#D4AF37] transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-[#D4AF37]" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center">
            <img
              src={GALLERY_PHOTOS[currentIndex]}
              alt={`Fotografia ampliada ${currentIndex + 1}`}
              referrerPolicy="no-referrer"
              className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
