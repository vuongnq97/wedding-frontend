'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CreateInvitationHeaderProps {
    onSave: () => void;
    onPublish: () => void;
    isSaving: boolean;
    isValid: boolean;
}

import { BaseButton } from '@/components/ui/base-button';

export function CreateInvitationHeader({
    onSave,
    onPublish,
    isSaving,
    isValid,
}: CreateInvitationHeaderProps) {
    const t = useTranslations('create-invitation.actions');

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-[60px] flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary fill-primary" />
                </div>
                <span className="font-bold text-lg tracking-tight">
                    WeddingBuilder
                </span>
            </div>

            <div className="flex items-center gap-3">
                <BaseButton
                    onClick={onSave}
                    disabled={isSaving || !isValid}
                    variant="outline"
                    size="sm"
                >
                    {isSaving ? t('saving') : t('save')}
                </BaseButton>
                <BaseButton
                    onClick={onPublish}
                    disabled={isSaving || !isValid}
                    variant="default"
                    size="sm"
                >
                    {t('publish')}
                </BaseButton>
            </div>
        </header>
    );
}
