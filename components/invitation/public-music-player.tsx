'use client';

import { WeddingData } from '@/types/invitation';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface PublicMusicPlayerProps {
    data: WeddingData;
}

export const PublicMusicPlayer = ({ data }: PublicMusicPlayerProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
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
            document.addEventListener('touchstart', handleInteraction, { once: true });

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

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    if (!music.enabled || !music.url) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
            <audio
                ref={audioRef}
                src={music.url}
                loop
                preload="auto"
            />

            <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center text-primary hover:bg-background transition-all animate-in fade-in zoom-in duration-300"
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                {isPlaying ? (
                    <div className="relative">
                        <span className="absolute -inset-1 rounded-full animate-ping opacity-20 bg-primary"></span>
                        <Pause className="w-5 h-5 relative z-10" />
                    </div>
                ) : (
                    <Play className="w-5 h-5 pl-0.5" />
                )}
            </button>

            {isPlaying && (
                <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border shadow-lg text-xs font-medium text-foreground animate-in slide-in-from-left-5 duration-300 hidden sm:block">
                    {music.name || 'Background Music'}
                </div>
            )}
        </div>
    );
};
