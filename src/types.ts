export type ExperienceStage = 'sealed' | 'opening' | 'celebration';

export interface PhotoItem {
  id: number;
  url: string;
  title?: string;
  description?: string;
}

export interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  mode: 'youtube' | 'custom_mp3';
  customUrl?: string;
  error?: string | null;
}
