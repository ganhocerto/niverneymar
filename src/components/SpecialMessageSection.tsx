import React from 'react';

export const SpecialMessageSection: React.FC = () => {
  return (
    <section className="relative w-full py-20 md:py-28 px-6 max-w-4xl mx-auto text-center select-none">
      {/* Background sapphire glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-[#00B0FF]/10 via-[#00E5FF]/6 to-transparent rounded-full blur-[90px] pointer-events-none" />

      {/* Decorative Top Line */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#00B0FF]/60" />
        <span className="font-cinzel text-xs uppercase tracking-[0.35em] text-[#38BDF8]">
          Mensagem de Carinho
        </span>
        <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#00B0FF]/60" />
      </div>

      {/* Message Card Container */}
      <div className="relative rounded-3xl p-8 sm:p-12 md:p-14 bg-gradient-to-b from-[#070e17]/90 to-[#050706]/95 border border-[#00B0FF]/25 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        <div className="font-editorial text-5xl md:text-6xl text-[#00E5FF]/25 leading-none select-none mb-4">
          “
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <p className="font-editorial italic text-lg sm:text-xl md:text-2xl text-[#F3F4F6] leading-relaxed tracking-wide font-light">
            “Seu dia merece ser lembrado com carinho, brilho e emoção.”
          </p>

          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent mx-auto" />

          <p className="font-editorial italic text-base sm:text-lg md:text-xl text-[#94A3B8] leading-relaxed tracking-wide font-light">
            A vida fica mais bonita quando celebramos quem é especial.
          </p>

          <p className="font-editorial italic text-base sm:text-lg md:text-xl text-[#CBD5E1] leading-relaxed tracking-wide font-light">
            Que nunca faltem saúde, paz, amor e pessoas queridas ao seu lado.
          </p>

          <div className="pt-2">
            <p className="font-cinzel font-semibold text-xl sm:text-2xl md:text-3xl text-blue-gradient tracking-wide">
              Um novo ciclo começa, trazendo novas bênçãos e novas conquistas.
            </p>
          </div>
        </div>

        {/* Delicate Corner Accents in Blue */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#00E5FF]/60 rounded-tl pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#00E5FF]/60 rounded-tr pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#00B0FF]/60 rounded-bl pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#00B0FF]/60 rounded-br pointer-events-none" />
      </div>
    </section>
  );
};
