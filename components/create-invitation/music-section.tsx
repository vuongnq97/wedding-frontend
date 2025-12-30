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

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleMusicUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Check if file is audio
        if (!file.type.startsWith('audio/')) {
            alert(t('invalidFileType')); // Or use a toast if available, but staying simple for now
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            updateField(['music'], {
                ...data.music,
                enabled: true,
                url: base64String,
                name: file.name
            });
        };
        reader.readAsDataURL(file);

        // Reset input
        event.target.value = '';
    };

    const handleRemoveMusic = () => {
        updateField(['music'], {
            ...data.music,
            enabled: false,
            url: '',
            name: ''
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <SectionWrapper
            title={t('title')}
            icon={<Music className="w-5 h-5" />}
            iconBgColor="bg-muted"
            iconTextColor="text-primary"
        >
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4 w-full max-w-md p-3 bg-muted rounded-lg border border-transparent">
                    <div className="size-10 rounded-full bg-surface flex items-center justify-center">
                        {data.music.enabled ? (
                            <Music2 className="w-5 h-5 text-primary" />
                        ) : (
                            <Music className="w-5 h-5 text-gray-400" />
                        )}
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground truncate">
                            {data.music.enabled ? data.music.name : t('noMusic')}
                        </p>
                    </div>
                    {data.music.enabled ? (
                        <button
                            onClick={handleRemoveMusic}
                            className="px-4 py-1.5 bg-destructive/10 text-destructive text-xs font-bold rounded shadow-sm hover:bg-destructive/20 transition-all"
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
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="audio/*"
                    onChange={handleFileChange}
                />
            </div>
        </SectionWrapper>
    );
}
