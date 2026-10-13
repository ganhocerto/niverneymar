import React from 'react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#070102]/85 backdrop-blur-xl border-b border-[#D4AF37]/15 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-cinzel text-base md:text-lg font-bold tracking-widest text-[#F5E8C7] whitespace-nowrap shrink-0 hover:text-white transition-colors"
        >
          CELEBRAÇÃO
        </a>

        {/* Navigation links */}
        <nav className="flex items-center gap-6 sm:gap-8 text-xs uppercase tracking-[0.2em] font-cinzel text-[#DFD0B8]">
          <button
            onClick={() => onNavigate('homenagem')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Homenagem
          </button>
          <button
            onClick={() => onNavigate('galeria-de-momentos')}
            className="hover:text-[#F5E8C7] transition-colors whitespace-nowrap shrink-0"
          >
            Recordações
          </button>
          <button
            onClick={() => onNavigate('mensagem')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Desejos
          </button>
        </nav>
      </div>
    </header>
  );
};
