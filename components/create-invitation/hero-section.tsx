'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Image, Upload } from 'lucide-react';
import { BaseButton } from '@/components/ui/base-button';
import { WeddingData } from '@/types/invitation';
import { useTranslations } from 'next-intl';

interface HeroSectionProps {
    data: WeddingData;
    updateField: (path: any[], value: any) => void;
}

export function HeroSection({ data, updateField }: HeroSectionProps) {
    const t = useTranslations('create-invitation.sections.hero');
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File size exceeds 5MB limit.");
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
            icon={<Image className="w-5 h-5" />}
            iconBgColor="bg-blue-50 dark:bg-blue-900/20"
            iconTextColor="text-blue-600"
        >
            <div
                onClick={handleUploadClick}
                className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {data.heroBannerUrl ? t('change') : t('upload')}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Recommended size: 1920x1080px (Max 5MB)
                </p>
                {data.heroBannerUrl && (
                    <div className="mt-4 w-full h-32 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <img
                            src={data.heroBannerUrl}
                            alt="Hero Banner Preview"
                            className="w-full h-full object-cover"
                        />
                        <p className="text-xs text-green-600 mt-2 font-medium absolute bottom-0 left-0 bg-white/90 w-full py-1">
                            Image uploaded successfully
                        </p>
                    </div>
                )}
            </div>
        </SectionWrapper>
    );
}
