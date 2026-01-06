'use client';

import React, { useRef, ChangeEvent } from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { BaseButton } from '@/components/ui/base-button';
import { Image as ImageIcon, Upload, Trash2 } from 'lucide-react';
import { WeddingData } from '@/types/invitation';
import Image from 'next/image';

interface GallerySectionProps {
  data: WeddingData | null;
  updateField: (path: string[], value: unknown) => void;
  uploadImage: (file: File) => Promise<string | null>;
}

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function GallerySection({
  data,
  updateField,
  uploadImage,
}: GallerySectionProps) {
  const t = useTranslations('manage-invitation.sections.gallery');

  // if (!data) return null; // Removed
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const albumPhotos = data?.albumPhotos || [];

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit.');
      return;
    }

    setIsUploading(true);
    const url = await uploadImage(file);
    setIsUploading(false);

    if (url) {
      updateField(['albumPhotos'], [...albumPhotos, { url }]);
    }

    event.target.value = '';
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = albumPhotos.filter((_, i) => i !== index);
    updateField(['albumPhotos'], updatedPhotos);
  };

  return (
    <SectionWrapper
      title={t('title')}
      icon={<ImageIcon className="h-5 w-5" />}
      iconBgColor="bg-muted"
      iconTextColor="text-primary"
    >
      <div className="grid grid-cols-2 items-center justify-center gap-4 md:grid-cols-4">
        {albumPhotos.map((photo, index) => (
          <div
            key={index}
            className="group bg-muted relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={photo.url}
              alt={`Album photo ${index + 1}`}
              fill
              className="object-cover"
            />
            <BaseButton
              onClick={() => removePhoto(index)}
              className="absolute top-2 right-2 h-7 w-7 p-1.5 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:scale-110"
              variant="danger"
              size="icon"
            >
              <Trash2 className="h-4 w-4" />
            </BaseButton>
          </div>
        ))}
        <BaseButton
          onClick={handleUploadClick}
          className="flex aspect-square size-30 h-auto flex-col items-center justify-center gap-2"
          variant="dashed"
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
              <span className="text-xs font-medium">{t('uploading')}</span>
            </>
          ) : (
            <>
              <Upload className="h-6 w-6" />
              <span className="text-xs font-medium">{t('upload')}</span>
            </>
          )}
        </BaseButton>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </SectionWrapper>
  );
}
