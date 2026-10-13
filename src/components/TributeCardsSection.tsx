import React from 'react';
import { Heart, ShieldCheck, Sun, Star } from 'lucide-react';

const TRIBUTES = [
  {
    icon: Heart,
    title: 'Coração Generoso',
    description:
      'Sua capacidade de acolher, cuidar e fazer as pessoas ao seu redor se sentirem especiais é um dom raro que torna o mundo muito melhor.',
  },
  {
    icon: ShieldCheck,
    title: 'Força e Determinação',
    description:
      'A coragem com que você encara cada desafio e a integridade que mantém em cada passo inspiram e motivam todos que caminham com você.',
  },
  {
    icon: Sun,
    title: 'Alegria que Contagia',
    description:
      'Seu sorriso autêntico, sua presença calorosa e seu bom humor têm o poder de transformar os dias comuns em lembranças inesquecíveis.',
  },
  {
    icon: Star,
    title: 'Lealdade Verdadeira',
    description:
      'Ter você por perto é a certeza de contar com uma pessoa leal, de palavra firme e de um coração que nunca mede esforços por quem ama.',
  },
];

export const TributeCardsSection: React.FC = () => {
  return (
    <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 max-w-6xl mx-auto select-none">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#8E0C16]/20 via-[#D4AF37]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
          <span className="font-cinzel text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
            Razões Para Celebrar
          </span>
          <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide mb-4">
          Qualidades que Inspiram
        </h2>
        <p className="font-editorial italic text-base sm:text-lg text-[#DFD0B8] leading-relaxed">
          “Celebrar seu aniversário é também reconhecer as virtudes que fazem de você alguém tão único e admirado.”
        </p>
      </div>

      {/* 4 Tribute Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {TRIBUTES.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="group relative rounded-3xl p-8 bg-gradient-to-b from-[#140205]/90 via-[#0a0103]/90 to-[#070102]/95 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(142,12,22,0.35)] transition-all duration-400 hover:-translate-y-1 backdrop-blur-xl"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8E0C16] to-[#400307] border border-[#D4AF37]/30 flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <Icon className="w-5 h-5 text-[#FFD54F]" />
              </div>

              {/* Title & Description */}
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide mb-3 group-hover:text-[#F5E8C7] transition-colors">
                {item.title}
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-light">
                {item.description}
              </p>

              {/* Subtle metallic corner notch */}
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#D4AF37]/35 rounded-tr pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#8E0C16]/40 rounded-bl pointer-events-none" />
            </div>
          );
        })}
      </div>
    </section>
  );
};
