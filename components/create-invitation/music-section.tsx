'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Music, Music2 } from 'lucide-react';
import { WeddingData } from '@/types/invitation';

interface MusicSectionProps {
    data: WeddingData;
    updateField: (path: string[], value: unknown) => void;
}

import { useTranslations } from 'next-intl';

export function MusicSection({ data, updateField }: MusicSectionProps) {
    const t = useTranslations('create-invitation.sections.music');

    // Mock upload handlers
    const handleMusicUpload = () => {
        // In a real app, this would trigger file picker
        const mockFile = {
            name: "Perfect - Ed Sheeran.mp3",
            url: "https://example.com/music.mp3"
        };
        updateField(['music'], {
            ...data.music,
            enabled: true,
            url: mockFile.url,
            name: mockFile.name
        });
    };

    const handleRemoveMusic = () => {
        updateField(['music'], {
            ...data.music,
            enabled: false,
            url: '',
            name: ''
        });
    };

    return (
        <SectionWrapper
            title={t('title')}
            icon={<Music className="w-5 h-5" />}
            iconBgColor="bg-rose-50 dark:bg-rose-900/20"
            iconTextColor="text-rose-600"
        >
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4 w-full max-w-md p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-transparent">
                    <div className="size-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center">
                        {data.music.enabled ? (
                            <Music2 className="w-5 h-5 text-primary" />
                        ) : (
                            <Music className="w-5 h-5 text-gray-400" />
                        )}
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 truncate">
                            {data.music.enabled ? data.music.name : t('noMusic')}
                        </p>
                    </div>
                    {data.music.enabled ? (
                        <button
                            onClick={handleRemoveMusic}
                            className="px-4 py-1.5 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold rounded shadow-sm hover:bg-red-200 transition-all"
                        >
                            {t('remove')}
                        </button>
                    ) : (
                        <button
                            onClick={handleMusicUpload}
                            className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded shadow-sm hover:bg-primary/90 transition-all"
                        >
                            {t('browse')}
                        </button>
                    )}
                </div>
            </div>
        </SectionWrapper>
    );
}
