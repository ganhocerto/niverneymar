import React, { useEffect, useState } from 'react';

interface Note {
  id: number;
  symbol: string;
  left: number; // percentage (0 - 100)
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  opacity: number;
  color: string;
}

const NOTE_SYMBOLS = ['♪', '♫', '♬', '♩', '𝄞', '♪', '♫'];
const COLORS = [
  '#FFD54F', // Warm Gold
  '#FF8A80', // Soft Rose Gold
  '#FFE082', // Champagne
  '#FFFFFF', // Pure White
];

export const MusicalNotes: React.FC<{ isPlaying?: boolean }> = ({ isPlaying = true }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Generate a pool of floating musical notes with organic timing
    const pool: Note[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      symbol: NOTE_SYMBOLS[i % NOTE_SYMBOLS.length],
      left: Math.random() * 92 + 4, // across the screen width
      size: Math.floor(Math.random() * 14) + 16, // 16px to 30px
      duration: Math.random() * 5 + 6, // 6s to 11s to rise
      delay: Math.random() * 7, // staggered delay
      opacity: Math.random() * 0.45 + 0.25,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    setNotes(pool);
  }, []);

  if (!isPlaying) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
      aria-hidden="true"
    >
      {notes.map((note) => (
        <span
          key={note.id}
          className="absolute bottom-[-40px] font-serif select-none will-change-transform animate-floatNote"
          style={{
            left: `${note.left}%`,
            fontSize: `${note.size}px`,
            color: note.color,
            opacity: note.opacity,
            animationDuration: `${note.duration}s`,
            animationDelay: `${note.delay}s`,
            animationIterationCount: 'infinite',
            textShadow: '0 0 12px rgba(255, 213, 79, 0.4), 0 0 25px rgba(229, 57, 53, 0.3)',
          }}
        >
          {note.symbol}
        </span>
      ))}
    </div>
  );
};
