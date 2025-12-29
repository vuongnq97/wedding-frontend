'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { History, Plus, Trash2, Camera } from 'lucide-react';
import { WeddingData, Milestone } from '@/types/invitation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface LoveStorySectionProps {
    data: WeddingData;
    updateField: (path: string[], value: unknown) => void;
}

interface MilestoneItemProps {
    milestone: Milestone;
    index: number;
    updateMilestone: (index: number, field: keyof Milestone, value: string) => void;
    removeMilestone: (index: number) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t: any;
}

function MilestoneItem({ milestone, index, updateMilestone, removeMilestone, t }: MilestoneItemProps) {
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
                updateMilestone(index, 'photoUrl', base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[35px] top-6 size-7 rounded-full bg-white dark:bg-surface-dark border-4 border-pink-100 dark:border-pink-900/30 flex items-center justify-center">
                <div className="size-2.5 rounded-full bg-pink-500"></div>
            </div>

            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-5 border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6 relative group">
                <button
                    onClick={() => removeMilestone(index)}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-10"
                >
                    <Trash2 className="w-4 h-4" />
                </button>

                {/* Photo Upload */}
                <div className="shrink-0">
                    <div
                        onClick={handleUploadClick}
                        className="size-32 rounded-lg bg-white dark:bg-black/20 border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-pink-500 hover:text-pink-500 transition-colors relative overflow-hidden"
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {milestone.photoUrl ? (
                            <Image
                                src={milestone.photoUrl}
                                alt={milestone.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <>
                                <Camera className="w-6 h-6 mb-1" />
                                <span className="text-[10px] font-medium">{t('addPhoto')}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="space-y-1.5">
                            <span className="text-xs font-semibold text-gray-500">
                                {t('dateYear')}
                            </span>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full bg-white dark:bg-black/20 border-transparent focus:border-primary focus:bg-white dark:focus:bg-black focus:ring-0 rounded-lg text-sm px-3 py-2.5"
                                    value={milestone.date}
                                    onChange={(e) => updateMilestone(index, 'date', e.target.value)}
                                />
                            </div>
                        </label>
                        <label className="space-y-1.5">
                            <span className="text-xs font-semibold text-gray-500">
                                {t('milestoneTitle')}
                            </span>
                            <input
                                type="text"
                                className="w-full bg-white dark:bg-black/20 border-transparent focus:border-primary focus:bg-white dark:focus:bg-black focus:ring-0 rounded-lg text-sm px-3 py-2.5"
                                placeholder={t('milestonePlaceholder')}
                                value={milestone.title}
                                onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                            />
                        </label>
                    </div>
                    <label className="space-y-1.5 block">
                        <span className="text-xs font-semibold text-gray-500">
                            {t('storyDescription')}
                        </span>
                        <textarea
                            className="w-full bg-white dark:bg-black/20 border-transparent focus:border-primary focus:bg-white dark:focus:bg-black focus:ring-0 rounded-lg text-sm px-3 py-2.5 resize-none"
                            rows={2}
                            placeholder={t('descriptionPlaceholder')}
                            value={milestone.description}
                            onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}

export function LoveStorySection({ data, updateField }: LoveStorySectionProps) {
    const t = useTranslations('create-invitation.sections.story');

    const addMilestone = () => {
        const newMilestone: Milestone = {
            id: crypto.randomUUID(),
            date: new Date().toISOString().split('T')[0],
            title: 'New Milestone',
            description: '',
            photoUrl: ''
        };
        updateField(['milestones'], [...data.milestones, newMilestone]);
    };

    const updateMilestone = (
        index: number,
        field: keyof Milestone,
        value: string
    ) => {
        const updatedMilestones = [...data.milestones];
        updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };
        updateField(['milestones'], updatedMilestones);
    };

    const removeMilestone = (index: number) => {
        const updatedMilestones = data.milestones.filter((_, i) => i !== index);
        updateField(['milestones'], updatedMilestones);
    };

    return (
        <SectionWrapper
            title={t('title')}
            icon={<History className="w-5 h-5" />}
            iconBgColor="bg-pink-50 dark:bg-pink-900/20"
            iconTextColor="text-pink-600"
        >
            <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('subtitle')}
                </p>
            </div>

            <div className="relative pl-8 space-y-8 before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-px before:bg-pink-100 dark:before:bg-pink-900/30">
                {data.milestones.map((milestone, index) => (
                    <MilestoneItem
                        key={milestone.id}
                        milestone={milestone}
                        index={index}
                        updateMilestone={updateMilestone}
                        removeMilestone={removeMilestone}
                        t={t}
                    />
                ))}
            </div>

            <button
                onClick={addMilestone}
                className="w-full mt-6 py-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-500 font-medium hover:border-pink-500 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/10 transition-all flex items-center justify-center gap-2"
            >
                <Plus className="w-5 h-5" /> {t('addEvent')}
            </button>
        </SectionWrapper>
    );
}
