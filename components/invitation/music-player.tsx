'use client';

import { WeddingData } from '@/types/invitation';
import { BaseButton } from '@/components/ui/base-button';
import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface MusicPlayerProps {
  data: WeddingData;
}

export const MusicPlayer = ({ data }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const { music } = data;

  useEffect(() => {
    if (music.enabled && music.url && audioRef.current) {
      const playAudio = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay blocked:', error);
          setIsPlaying(false);
        }
      };

      // Attempt autoplay
      playAudio();

      // Add interaction listener to start playing if blocked
      const handleInteraction = () => {
        if (!hasInteracted && audioRef.current?.paused) {
          playAudio();
          setHasInteracted(true);
        }
      };

      document.addEventListener('click', handleInteraction, { once: true });
      document.addEventListener('touchstart', handleInteraction, {
        once: true,
      });

      return () => {
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
      };
    }
  }, [music.enabled, music.url, hasInteracted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!music.enabled || !music.url) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
      <audio ref={audioRef} src={music.url} loop preload="auto" />

      <BaseButton
        onClick={togglePlay}
        className="bg-background/80 border-border text-primary hover:bg-background animate-in fade-in zoom-in h-10 w-10 rounded-full border shadow-lg backdrop-blur-sm transition-all duration-300"
        variant="ghost"
        size="icon"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <div className="relative">
            <span className="bg-primary absolute -inset-1 animate-ping rounded-full opacity-20"></span>
            <Pause className="relative z-10 h-5 w-5" />
          </div>
        ) : (
          <Play className="h-5 w-5 pl-0.5" />
        )}
      </BaseButton>

      {isPlaying && (
        <div className="bg-background/80 border-border text-foreground animate-in slide-in-from-left-5 hidden rounded-full border px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur-sm duration-300 sm:block">
          {music.name || 'Background Music'}
        </div>
      )}
    </div>
  );
};
