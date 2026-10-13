/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import { ThreeGiftBox } from './components/ThreeGiftBox';
import { HeroSection } from './components/HeroSection';
import { TributeCardsSection } from './components/TributeCardsSection';
import { HeartfeltLetterSection } from './components/HeartfeltLetterSection';
import { CinematicGallery } from './components/CinematicGallery';
import { ClosingSection } from './components/ClosingSection';
import { AudioController, AudioControllerHandle } from './components/AudioController';
import { BackgroundAmbience } from './components/BackgroundAmbience';
import { MusicalNotes } from './components/MusicalNotes';
import { ExperienceStage } from './types';

export default function App() {
  const [stage, setStage] = useState<ExperienceStage>('sealed');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioControllerRef = useRef<AudioControllerHandle>(null);

  // Triggered the instant the user taps the gift box or button
  const handleOpenStart = useCallback(() => {
    if (audioControllerRef.current) {
      audioControllerRef.current.startAudio();
      setIsPlayingAudio(true);
    }
  }, []);

  // Triggered when the opening animation completes
  const handleOpened = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStage('celebration');
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 450);
  }, []);

  const scrollToGallery = () => {
    const el = document.getElementById('galeria-de-momentos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070102] text-[#F1F5F9] overflow-x-hidden selection:bg-[#D32F2F]/30 selection:text-[#FFD54F]">
      {/* Background ambient lighting & floating particles */}
      {stage === 'celebration' && <BackgroundAmbience />}

      {/* Floating elegant musical notes rising when audio is playing */}
      <MusicalNotes isPlaying={isPlayingAudio} />

      {/* Cross-fade screen veil during stage transition */}
      <div
        className={`fixed inset-0 z-50 bg-[#070102] pointer-events-none transition-opacity duration-500 ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 1. INITIAL SCREEN: COMPACT REALISTIC 3D RED GIFT MATCHING SCREENSHOT */}
      {stage === 'sealed' && (
        <main className="relative w-full h-screen">
          <ThreeGiftBox
            onOpenStart={handleOpenStart}
            onOpened={handleOpened}
          />
        </main>
      )}

      {/* 2. MAIN BIOSITE STAGE: COMPLETE, RICH EMOTIONAL TRIBUTE WITHOUT TOP NAV BAR */}
      {stage === 'celebration' && (
        <div className="relative z-10 w-full animate-fadeIn">
          <main>
            {/* Seções 1 & 2: Hero Honoree Portrait com Título e Mensagens */}
            <div id="homenagem">
              <HeroSection onScrollToGallery={scrollToGallery} />
            </div>

            {/* Subtle Metallic Divider */}
            <div className="max-w-4xl mx-auto px-6">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
            </div>

            {/* Seção: Virtudes e Razões Para Celebrar (4 Cartões Ricos) */}
            <TributeCardsSection />

            {/* Subtle Metallic Divider */}
            <div className="max-w-4xl mx-auto px-6">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
            </div>

            {/* Seção: Carta Aberta de Carinho e Gratidão */}
            <HeartfeltLetterSection />

            {/* Subtle Metallic Divider */}
            <div className="max-w-4xl mx-auto px-6">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
            </div>

            {/* Seções 3 & 4: Galeria de Recordações com Textos Antes e Depois */}
            <CinematicGallery />

            {/* Subtle Metallic Divider */}
            <div className="max-w-4xl mx-auto px-6">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
            </div>

            {/* Seção 5: Mensagem Final Emocionante */}
            <ClosingSection />
          </main>
        </div>
      )}

      {/* Background Audio Controller (Hidden player, plays automatically) */}
      <AudioController
        ref={audioControllerRef}
        onStateChange={setIsPlayingAudio}
      />
    </div>
  );
}
