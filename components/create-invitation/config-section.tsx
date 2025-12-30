'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import Toggle from '@/components/ui/toggle';
import { BookOpen, Megaphone, ArrowRight, Lightbulb, MessageCircle } from 'lucide-react';
import { WeddingData } from '@/types/invitation';

interface SectionProps {
    data: WeddingData;
    updateField: (path: string[], value: unknown) => void;
}

import { useTranslations } from 'next-intl';

export function ThankYouSection({ data, updateField }: SectionProps) {
    const t = useTranslations('create-invitation.sections.thankYou');
    return (
        <SectionWrapper
            title={t('title')}
            icon={<MessageCircle className="w-5 h-5" />}
            iconBgColor="bg-muted"
            iconTextColor="text-primary"
        >
            <textarea
                className="w-full bg-muted border border-transparent focus:border-primary focus:bg-background focus:ring-0 rounded-lg text-sm px-3 py-2.5 resize-none transition-all"
                rows={3}
                value={data.thankYouMessage}
                onChange={(e) => updateField(['thankYouMessage'], e.target.value)}
            />
        </SectionWrapper>
    );
}

export function GuestbookSection({ data, updateField }: SectionProps) {
    const t = useTranslations('create-invitation.sections.guestbook');
    return (
        <SectionWrapper
            title={t('title')}
            icon={<BookOpen className="w-5 h-5" />}
            iconBgColor="bg-muted"
            iconTextColor="text-primary"
            rightAction={
                <Toggle
                    checked={data.guestbookEnabled}
                    onChange={(val) => updateField(['guestbookEnabled'], val)}
                    label={t('showSection')}
                />
            }
        >
            <div className="bg-primary/5 p-4 rounded-lg flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-primary" />
                <p className="text-sm text-primary/80">
                    {t('description')}
                </p>
            </div>
        </SectionWrapper>
    );
}

export function AdsSection({ data, updateField }: SectionProps) {
    const t = useTranslations('create-invitation.sections.ads');
    return (
        <SectionWrapper
            title={t('title')}
            icon={<Megaphone className="w-5 h-5" />}
            iconBgColor="bg-muted"
            iconTextColor="text-muted-foreground"
            rightAction={
                <span
                    className={`px-2 py-1 rounded ${data.showAds
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        } text-[10px] font-bold uppercase tracking-wide`}
                >
                    {data.showAds ? t('active') : t('disabled')}
                </span>
            }
        >
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {t('description')}
                </p>
                <button
                    onClick={() => updateField(['showAds'], !data.showAds)}
                    className="text-sm font-bold text-primary hover:text-primary/80 flex items-center gap-1 hover:underline"
                >
                    {data.showAds ? t('removeAds') : t('enableAds')}{' '}
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </SectionWrapper>
    );
}
