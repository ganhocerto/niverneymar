import React, { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export interface AudioControllerHandle {
  startAudio: () => void;
  pauseAudio: () => void;
  toggleAudio: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  isPlaying: boolean;
  isMuted: boolean;
}

interface AudioControllerProps {
  onStateChange?: (isPlaying: boolean) => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const AudioController = forwardRef<AudioControllerHandle, AudioControllerProps>(
  ({ onStateChange }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolumeState] = useState(90);

    const ytPlayerRef = useRef<any>(null);
    const ytContainerId = 'yt-telemessage-embed';

    useEffect(() => {
      let isMounted = true;

      const initPlayer = () => {
        if (!window.YT || !window.YT.Player) return;

        try {
          ytPlayerRef.current = new window.YT.Player(ytContainerId, {
            videoId: 'zVleEDixOFA',
            playerVars: {
              autoplay: 0,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              playsinline: 1,
              enablejsapi: 1,
              origin: window.location.origin,
            },
            events: {
              onReady: (event: any) => {
                if (!isMounted) return;
                event.target.setVolume(volume);
              },
              onStateChange: (event: any) => {
                if (!isMounted) return;
                if (event.data === 1) {
                  setIsPlaying(true);
                  onStateChange?.(true);
                } else if (event.data === 2 || event.data === 0) {
                  setIsPlaying(false);
                  onStateChange?.(false);
                }
              },
              onError: (err: any) => {
                console.warn('YouTube Player Event Notice:', err);
              },
            },
          });
        } catch (e) {
          console.warn('YT Player init notice:', e);
        }
      };

      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
          initPlayer();
        };
      } else if (window.YT.Player) {
        initPlayer();
      }

      return () => {
        isMounted = false;
        try {
          if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === 'function') {
            ytPlayerRef.current.destroy();
          }
        } catch (e) {
          // ignore
        }
      };
    }, []);

    const startAudio = useCallback(() => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
        try {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(volume);
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
          onStateChange?.(true);
        } catch (e) {
          console.warn('Play error:', e);
        }
      } else {
        setTimeout(() => {
          if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
            ytPlayerRef.current.unMute();
            ytPlayerRef.current.setVolume(volume);
            ytPlayerRef.current.playVideo();
            setIsPlaying(true);
            onStateChange?.(true);
          }
        }, 600);
      }
    }, [onStateChange, volume]);

    const pauseAudio = useCallback(() => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        ytPlayerRef.current.pauseVideo();
      }
      setIsPlaying(false);
      onStateChange?.(false);
    }, [onStateChange]);

    const toggleAudio = useCallback(() => {
      if (isPlaying) {
        pauseAudio();
      } else {
        startAudio();
      }
    }, [isPlaying, pauseAudio, startAudio]);

    const handleVolumeChange = (newVal: number) => {
      setVolumeState(newVal);
      setIsMuted(newVal === 0);
      if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === 'function') {
        ytPlayerRef.current.setVolume(newVal);
      }
    };

    const toggleMute = () => {
      if (isMuted) {
        setIsMuted(false);
        const restoreVol = volume || 80;
        handleVolumeChange(restoreVol);
        if (ytPlayerRef.current?.unMute) ytPlayerRef.current.unMute();
      } else {
        setIsMuted(true);
        if (ytPlayerRef.current?.mute) ytPlayerRef.current.mute();
      }
    };

    useImperativeHandle(ref, () => ({
      startAudio,
      pauseAudio,
      toggleAudio,
      setVolume: handleVolumeChange,
      toggleMute,
      isPlaying,
      isMuted,
    }));

    return (
      <>
        {/* Hidden discrete YouTube player container running purely in background */}
        <div className="fixed w-1 h-1 opacity-0 -bottom-96 -right-96 pointer-events-none z-0">
          <div id={ytContainerId} className="w-full h-full" />
        </div>

        {/* Tiny, ultra-discrete mute icon in bottom-right corner - NO ugly fixed banner or player card */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
            className="fixed bottom-4 right-4 z-40 w-9 h-9 rounded-full bg-black/40 hover:bg-black/75 border border-white/15 hover:border-[#D4AF37]/50 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-60 hover:opacity-100 shadow-md"
            title={isMuted ? 'Ativar som' : 'Silenciar'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#FFD54F]" />
            )}
          </button>
        )}
      </>
    );
  }
);

AudioController.displayName = 'AudioController';
