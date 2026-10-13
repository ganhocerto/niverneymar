import React from 'react';

export const HeartfeltLetterSection: React.FC = () => {
  return (
    <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 max-w-4xl mx-auto select-none">
      {/* Background radial warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#8E0C16]/20 via-[#D4AF37]/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* Outer frame styling */}
      <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-b from-[#140205]/95 via-[#0b0103]/95 to-[#070102]/98 border border-[#D4AF37]/25 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
        {/* Decorative Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="font-cinzel text-xs uppercase tracking-[0.35em] text-[#D4AF37] mb-2">
            De Coração
          </span>
          <h2 className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-white font-normal">
            Uma Mensagem Para Guardar
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-4" />
        </div>

        {/* The Letter Prose */}
        <div className="space-y-6 text-[#E2E8F0] font-sans text-base sm:text-lg leading-relaxed text-balance">
          <p className="first-letter:text-4xl first-letter:font-cinzel first-letter:text-[#FFD54F] first-letter:mr-2 first-letter:float-left">
            Existem pessoas que simplesmente passam pelo mundo, e existem pessoas como você: que deixam marcas luminosas, inspiram com atitudes e tornam a caminhada de todos ao redor muito mais especial.
          </p>

          <p>
            Celebrar o seu aniversário não é apenas marcar mais um ano no calendário. É celebrar a sua trajetória, cada vitória conquistada com suor e dignidade, cada gesto de amizade sincera e cada momento em que você esteve presente com um conselho sábio ou um abraço amigo.
          </p>

          <p>
            Que a vida continue sendo generosa com você. Que ela te presenteie com saúde de ferro, paz que acalma a alma, sabedoria para todas as decisões e pessoas verdadeiras ao seu lado em cada amanhecer.
          </p>

          <p className="font-editorial italic text-lg sm:text-xl text-[#F5E8C7] pt-2">
            “Que você nunca perca essa essência nobre e essa luz própria que faz com que todos tenham orgulho e gratidão de ter você por perto.”
          </p>
        </div>

        {/* Decorative corner trims */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl pointer-events-none" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#8E0C16]/60 rounded-bl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#8E0C16]/60 rounded-br pointer-events-none" />
      </div>
    </section>
  );
};
