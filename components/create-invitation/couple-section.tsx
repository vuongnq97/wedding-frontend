'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Heart, Upload } from 'lucide-react';
import { WeddingData } from '@/types/invitation';
import { useTranslations } from 'next-intl';

interface CoupleSectionProps {
    data: WeddingData;
    updateField: (path: string[], value: any) => void;
}

interface PersonInputProps {
    type: 'groom' | 'bride';
    title: string;
    label: string;
    placeholder: string;
    birthOrderPlaceholder: string;
    data: WeddingData;
    updateField: (path: string[], value: any) => void;
    t: any;
}

function PersonInput({ type, title, label, placeholder, birthOrderPlaceholder, data, updateField, t }: PersonInputProps) {
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
                updateField([type, 'photoUrl'], base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    {title}
                </h4>
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="flex gap-4">
                <div
                    onClick={handleUploadClick}
                    className="size-24 rounded-full bg-gray-100 dark:bg-white/5 flex-shrink-0 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-primary hover:text-primary transition-colors overflow-hidden relative group"
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {data[type].photoUrl ? (
                        <img
                            src={data[type].photoUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                    )}
                </div>
                <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col">
                            <span className="text-xs font-medium text-gray-500 mb-1.5">
                                {t('fullName')}
                            </span>
                            <input
                                className="w-full bg-gray-50 dark:bg-white/5 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-black focus:ring-0 rounded-lg text-sm px-3 py-2.5 transition-all"
                                placeholder={placeholder}
                                value={data[type].fullName}
                                onChange={(e) =>
                                    updateField([type, 'fullName'], e.target.value)
                                }
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="text-xs font-medium text-gray-500 mb-1.5">
                                {t('birthOrder')}
                            </span>
                            <input
                                className="w-full bg-gray-50 dark:bg-white/5 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-black focus:ring-0 rounded-lg text-sm px-3 py-2.5 transition-all"
                                placeholder={birthOrderPlaceholder}
                                value={data[type].birthOrder}
                                onChange={(e) =>
                                    updateField([type, 'birthOrder'], e.target.value)
                                }
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CoupleSection({ data, updateField }: CoupleSectionProps) {
    const t = useTranslations('create-invitation.sections.couple');

    return (
        <SectionWrapper
            title={t('title')}
            icon={<Heart className="w-5 h-5" />}
            iconBgColor="bg-rose-50 dark:bg-rose-900/20"
            iconTextColor="text-rose-600"
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
                    t={t}
                />
            </div>
        </SectionWrapper>
    );
}
