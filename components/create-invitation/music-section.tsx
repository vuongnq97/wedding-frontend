'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { BaseButton } from '@/components/ui/base-button';
import { Music, Music2, Check, Upload } from 'lucide-react';
import { WeddingData } from '@/types/invitation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Toggle from '@/components/ui/toggle';

interface MusicSectionProps {
  data: WeddingData | null;
  updateField: (path: string[], value: unknown) => void;
  uploadMusic: (file: File) => Promise<string | null>;
}

const DEFAULT_SONGS = [
  {
    name: 'Beautiful in White',
    url: 'https://weddingstg.blob.core.windows.net/wedding-assets/Default/Beautiful%20In%20White.mp3',
  },
  {
    name: 'Marry You',
    url: 'https://weddingstg.blob.core.windows.net/wedding-assets/Default/You%20Mary%20You.mp3',
  },
  {
    name: 'A Thousand Years',
    url: 'https://weddingstg.blob.core.windows.net/wedding-assets/Default/A%20Thousand%20Years.mp3',
  },
  {
    name: 'Perfect',
    url: 'https://weddingstg.blob.core.windows.net/wedding-assets/Default/Perfect.mp3',
  },
  {
    name: 'Sugar',
    url: 'https://weddingstg.blob.core.windows.net/wedding-assets/Default/Sugar.mp3',
  },
];

export function MusicSection({
  data,
  updateField,
  uploadMusic,
}: MusicSectionProps) {
  const t = useTranslations('manage-invitation.sections.music');

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
      alert(t('invalidFileType'));
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
      enabled: true, // Keep enabled, just remove selection
      url: '',
      name: '',
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectDefault = (song: { name: string; url: string }) => {
    updateField(['music'], {
      ...musicData,
      enabled: true,
      name: song.name,
      url: song.url,
    });
  };

  const handleToggle = (checked: boolean) => {
    updateField(['music', 'enabled'], checked);
  };

  return (
    <SectionWrapper
      title={t('title')}
      icon={<Music className="h-5 w-5" />}
      iconBgColor="bg-muted"
      iconTextColor="text-primary"
      rightAction={
        <Toggle
          label={t('showSection')}
          checked={musicData.enabled}
          onChange={handleToggle}
        />
      }
    >
      {musicData.enabled && (
        <div className="flex flex-col gap-4">
          {/* Default Songs Selection */}
          <div className="grid grid-cols-1 gap-2">
            {DEFAULT_SONGS.map((song) => {
              const isSelected = musicData.url === song.url;
              return (
                <div
                  key={song.name}
                  onClick={() => handleSelectDefault(song)}
                  className={cn(
                    'cursor-pointer rounded-lg border p-3 transition-all',
                    isSelected
                      ? 'border-primary bg-primary/5 ring-primary ring-1'
                      : 'border-border hover:bg-muted bg-surface'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full',
                        isSelected
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {isSelected ? (
                        <Music2 className="h-4 w-4" />
                      ) : (
                        <Music className="h-4 w-4" />
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-sm font-medium',
                        isSelected ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {song.name}
                    </span>
                    {isSelected && (
                      <Check className="text-primary ml-auto h-4 w-4" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="border-border w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                {t('or')}
              </span>
            </div>
          </div>

          {/* Custom Upload */}
          <div className="bg-muted flex w-full items-center gap-4 rounded-lg border border-transparent p-3">
            <div className="bg-surface flex size-10 items-center justify-center rounded-full">
              <Upload className="text-muted-foreground h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium">
                {musicData.enabled &&
                !DEFAULT_SONGS.some((s) => s.url === musicData.url) &&
                musicData.name
                  ? musicData.name
                  : t('uploadFromDevice')}
              </p>
            </div>
            {!DEFAULT_SONGS.some((s) => s.url === musicData.url) &&
            musicData.name ? (
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
      )}
    </SectionWrapper>
  );
}
