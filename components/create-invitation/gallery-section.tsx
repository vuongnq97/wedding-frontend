'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Image as ImageIcon, Upload, Trash2 } from 'lucide-react';
import { WeddingData } from '@/types/invitation';
import Image from 'next/image';

interface GallerySectionProps {
    data: WeddingData;
    updateField: (path: string[], value: any) => void;
}

import { useTranslations } from 'next-intl';

export function GallerySection({ data, updateField }: GallerySectionProps) {
    const t = useTranslations('create-invitation.sections.gallery');

    const addPhoto = () => {
        // Mock upload
        const newPhoto =
            'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        updateField(['albumPhotos'], [...data.albumPhotos, newPhoto]);
    };

    const removePhoto = (index: number) => {
        const updatedPhotos = data.albumPhotos.filter((_, i) => i !== index);
        updateField(['albumPhotos'], updatedPhotos);
    };

    return (
        <SectionWrapper
            title={t('title')}
            icon={<ImageIcon className="w-5 h-5" />}
            iconBgColor="bg-yellow-50 dark:bg-yellow-900/20"
            iconTextColor="text-yellow-600"
        >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.albumPhotos.map((photo, index) => (
                    <div
                        key={index}
                        className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-white/5"
                    >
                        <Image
                            src={photo}
                            alt={`Album photo ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                        <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-sm"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                <button
                    onClick={addPhoto}
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all gap-2"
                >
                    <Upload className="w-6 h-6" />
                    <span className="text-xs font-medium">{t('upload')}</span>
                </button>
            </div>
        </SectionWrapper>
    );
}
