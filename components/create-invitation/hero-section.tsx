'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { WeddingData } from '@/types/invitation';
import { useTranslations } from 'next-intl';

interface HeroSectionProps {
  data: WeddingData;
  updateField: (path: (string | number)[], value: unknown) => void;
}

export function HeroSection({ data, updateField }: HeroSectionProps) {
  const t = useTranslations('create-invitation.sections.hero');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateField(['heroBannerUrl'], base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <SectionWrapper
      title={t('title')}
      icon={<ImageIcon className="h-5 w-5" />}
      iconBgColor="bg-muted"
      iconTextColor="text-primary"
    >
      <div
        onClick={handleUploadClick}
        className="border-border hover:bg-muted group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors"
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="bg-muted text-primary mb-3 flex size-12 items-center justify-center rounded-full transition-transform group-hover:scale-110">
          <Upload className="h-6 w-6" />
        </div>
        <p className="text-foreground text-sm font-medium">
          {data.heroBannerUrl ? t('change') : t('upload')}
        </p>
        <p className="text-muted-foreground mt-1 text-xs">
          {t('recommendedSize')}
        </p>
        {data.heroBannerUrl && (
          <div className="border-border relative mt-4 h-32 w-full overflow-hidden rounded-lg border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.heroBannerUrl}
              alt="Hero Banner Preview"
              className="h-full w-full object-cover"
            />
            <p className="text-primary bg-background/90 absolute bottom-0 left-0 mt-2 w-full py-1 text-xs font-medium">
              {t('uploadSuccess')}
            </p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
