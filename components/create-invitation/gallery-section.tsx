'use client';

import React, { useRef, ChangeEvent } from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Image as ImageIcon, Upload, Trash2 } from 'lucide-react';
import { WeddingData } from '@/types/invitation';
import Image from 'next/image';

interface GallerySectionProps {
    data: WeddingData;
    updateField: (path: string[], value: unknown) => void;
}

import { useTranslations } from 'next-intl';

export function GallerySection({ data, updateField }: GallerySectionProps) {
    const t = useTranslations('create-invitation.sections.gallery');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            updateField(['albumPhotos'], [...data.albumPhotos, base64String]);
        };
        reader.readAsDataURL(file);

        // Reset input so the same file can be selected again if needed
        event.target.value = '';
    };

    const removePhoto = (index: number) => {
        const updatedPhotos = data.albumPhotos.filter((_, i) => i !== index);
        updateField(['albumPhotos'], updatedPhotos);
    };

    return (
        <SectionWrapper
            title={t('title')}
            icon={<ImageIcon className="w-5 h-5" />}
            iconBgColor="bg-muted"
            iconTextColor="text-primary"
        >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.albumPhotos.map((photo, index) => (
                    <div
                        key={index}
                        className="group relative aspect-square rounded-lg overflow-hidden bg-muted"
                    >
                        <Image
                            src={photo}
                            alt={`Album photo ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                        <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 p-1.5 bg-background/90 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-sm"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                <button
                    onClick={handleUploadClick}
                    className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all gap-2"
                >
                    <Upload className="w-6 h-6" />
                    <span className="text-xs font-medium">{t('upload')}</span>
                </button>
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
