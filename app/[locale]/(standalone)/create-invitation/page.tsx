'use client';

import {
    HeroSection,
    CoupleSection,
    FamilySection,
    NotificationSection,
    LoveStorySection,
    EventDetailsSection,
    MapConfigSection,
    GallerySection,
    GiftSection,
    ThankYouSection,
    GuestbookSection,
    AdsSection,
    MusicSection,
    CreateInvitationHeader
} from '@/components/create-invitation';
import { useInvitation } from '@/hooks/use-invitation';
import { useTranslations } from 'next-intl';

export default function CreateInvitationPage() {
    const t = useTranslations('create-invitation');
    const {
        data,
        updateField,
        saveInvitation,
        publishInvitation,
        isSaving,
        isValid
    } = useInvitation();

    return (
        <div className="flex w-full flex-col bg-background min-h-screen pt-[60px]">
            <CreateInvitationHeader
                onSave={saveInvitation}
                onPublish={publishInvitation}
                isSaving={isSaving}
                isValid={isValid}
            />

            <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {t('title')}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="space-y-8 pb-12">
                    <HeroSection data={data} updateField={updateField} />
                    <CoupleSection data={data} updateField={updateField} />
                    <FamilySection data={data} updateField={updateField} />
                    <NotificationSection data={data} updateField={updateField} />
                    <LoveStorySection data={data} updateField={updateField} />
                    <EventDetailsSection data={data} updateField={updateField} />
                    <MapConfigSection data={data} updateField={updateField} />
                    <GallerySection data={data} updateField={updateField} />
                    <ThankYouSection data={data} updateField={updateField} />
                    <GuestbookSection data={data} updateField={updateField} />
                    <GiftSection data={data} updateField={updateField} />
                    <MusicSection data={data} updateField={updateField} />
                    <AdsSection data={data} updateField={updateField} />
                </div>
            </main>
        </div>
    );
}
