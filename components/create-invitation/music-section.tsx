'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { BaseButton } from '@/components/ui/base-button';
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
        name: file.name,
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
      name: '',
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <SectionWrapper
      title={t('title')}
      icon={<Music className="h-5 w-5" />}
      iconBgColor="bg-muted"
      iconTextColor="text-primary"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="bg-muted flex w-full max-w-md items-center gap-4 rounded-lg border border-transparent p-3">
          <div className="bg-surface flex size-10 items-center justify-center rounded-full">
            {data.music.enabled ? (
              <Music2 className="text-primary h-5 w-5" />
            ) : (
              <Music className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-muted-foreground truncate text-sm font-medium">
              {data.music.enabled ? data.music.name : t('noMusic')}
            </p>
          </div>
          {data.music.enabled ? (
            <BaseButton
              onClick={handleRemoveMusic}
              className="h-7 px-4 text-xs font-bold"
              variant="danger"
              size="sm"
            >
              {t('remove')}
            </BaseButton>
          ) : (
            <BaseButton
              onClick={handleMusicUpload}
              className="h-7 px-4 text-xs font-bold"
              variant="default"
              size="sm"
            >
              {t('browse')}
            </BaseButton>
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
