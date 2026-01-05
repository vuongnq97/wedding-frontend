'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { BaseButton } from '@/components/ui/base-button';
import { Music, Music2 } from 'lucide-react';
import { WeddingData } from '@/types/invitation';

interface MusicSectionProps {
  data: WeddingData | null;
  updateField: (path: string[], value: unknown) => void;
  uploadMusic: (file: File) => Promise<string | null>;
}

import { useTranslations } from 'next-intl';

export function MusicSection({
  data,
  updateField,
  uploadMusic,
}: MusicSectionProps) {
  const t = useTranslations('manage-invitation.sections.music');

  // if (!data) return null; // Removed
  const [isUploading, setIsUploading] = React.useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const musicData = data?.music || { enabled: false, name: '', url: '' };

  const handleMusicUpload = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is audio
    if (!file.type.startsWith('audio/')) {
      alert(t('invalidFileType')); // Or use a toast if available, but staying simple for now
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit.');
      return;
    }

    setIsUploading(true);
    const url = await uploadMusic(file);
    setIsUploading(false);

    if (url) {
      updateField(['music'], {
        ...musicData,
        enabled: true,
        url: url,
        name: file.name,
      });
    }

    // Reset input
    event.target.value = '';
  };

  const handleRemoveMusic = () => {
    updateField(['music'], {
      ...musicData,
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
            {musicData?.enabled ? (
              <Music2 className="text-primary h-5 w-5" />
            ) : (
              <Music className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-muted-foreground truncate text-sm font-medium">
              {musicData?.enabled ? musicData.name : t('noMusic')}
            </p>
          </div>
          {musicData?.enabled ? (
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
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="border-background h-3 w-3 animate-spin rounded-full border-2 border-t-transparent" />
              ) : (
                t('browse')
              )}
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
