'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { BaseInput } from '@/components/ui/base-input';
import { Heart, Upload } from 'lucide-react';
import { WeddingData } from '@/types/invitation';
import { useTranslations } from 'next-intl';

interface CoupleSectionProps {
  data: WeddingData | null;
  updateField: (path: string[], value: unknown) => void;
  uploadImage: (file: File) => Promise<string | null>;
}

interface PersonInputProps {
  type: 'groom' | 'bride';
  title: string;
  label: string;
  placeholder: string;
  birthOrderPlaceholder: string;
  data: WeddingData | null;
  updateField: (path: string[], value: unknown) => void;
  uploadImage: (file: File) => Promise<string | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}

function PersonInput({
  type,
  title,
  placeholder,
  birthOrderPlaceholder,
  data,
  updateField,
  uploadImage,
  t,
}: PersonInputProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const personData = data?.[type];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
      }

      setIsUploading(true);
      const url = await uploadImage(file);
      setIsUploading(false);

      if (url) {
        updateField([type, 'photoUrl'], url);
      }
    }
  };

  const handleUploadClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="mb-2 flex items-center gap-2">
        <h4 className="text-foreground font-semibold">{title}</h4>
        <div className="bg-border h-px flex-1"></div>
      </div>
      <div className="flex gap-4">
        <div
          onClick={handleUploadClick}
          className="bg-muted border-border hover:border-primary hover:text-primary group relative flex size-16 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-colors md:size-24"
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          {isUploading ? (
            <div className="flex h-full w-full items-center justify-center bg-black/20">
              <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
            </div>
          ) : personData?.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={personData.photoUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <Upload className="text-muted-foreground group-hover:text-primary h-6 w-6 transition-colors" />
          )}
        </div>
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <BaseInput
              label={t('fullName')}
              placeholder={placeholder}
              value={personData?.fullName || ''}
              onChange={(e) => updateField([type, 'fullName'], e.target.value)}
            />
            <BaseInput
              label={t('birthOrder')}
              placeholder={birthOrderPlaceholder}
              value={personData?.birthOrder || ''}
              onChange={(e) =>
                updateField([type, 'birthOrder'], e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CoupleSection({
  data,
  updateField,
  uploadImage,
}: CoupleSectionProps) {
  const t = useTranslations('manage-invitation.sections.couple');

  // if (!data) return null; // Removed

  return (
    <SectionWrapper
      title={t('title')}
      icon={<Heart className="h-5 w-5" />}
      iconBgColor="bg-muted"
      iconTextColor="text-primary"
    >
      <div className="space-y-8">
        <PersonInput
          type="groom"
          title={t('groom')}
          label="Groom"
          placeholder={t('groomPlaceholder')}
          birthOrderPlaceholder={t('groomBirthOrderPlaceholder')}
          data={data}
          updateField={updateField}
          uploadImage={uploadImage}
          t={t}
        />
        <PersonInput
          type="bride"
          title={t('bride')}
          label="Bride"
          placeholder={t('bridePlaceholder')}
          birthOrderPlaceholder={t('brideBirthOrderPlaceholder')}
          data={data}
          updateField={updateField}
          uploadImage={uploadImage}
          t={t}
        />
      </div>
    </SectionWrapper>
  );
}
