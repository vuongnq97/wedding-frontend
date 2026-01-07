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
} from '@/components/create-invitation';
import { Header } from '@/components/invitation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useInvitation } from '@/hooks/use-invitation';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';

import { Suspense } from 'react';

function ManageInvitationContent() {
  const t = useTranslations('manage-invitation');
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';
  const isCreateFromTemplate = searchParams.get('create') === 'true';
  const { user } = useAuth();

  const {
    data,
    updateField,
    saveInvitation,
    publishInvitation,
    isPublishing,
    isSaving,
    isValid,
    uploadImage,
    uploadMusic,
    reset,
  } = useInvitation({
    isEdit,
    userId: user?.userId,
    enableFetch: isEdit && !!user?.userId,
  });

  useEffect(() => {
    if (isCreateFromTemplate) {
      reset();
    }
  }, [isCreateFromTemplate, reset]);

  const handleSave = async () => {
    if (isValid) {
      const success = await saveInvitation();
      if (success && data?.slug) {
        router.push(`/invitation/${data.slug}?edit=true`);
      } else if (success) {
        router.push('/invitation?edit=true');
      }
    }
  };

  const handleSaveAndPreview = () => {
    if (isValid) {
      router.push('/invitation?edit=true');
    }
  };

  return (
    <div className="bg-background flex min-h-screen w-full flex-col overflow-x-hidden pt-[60px]">
      <Header
        mode={isEdit ? 'edit' : 'create'}
        onSave={isEdit ? handleSave : handleSaveAndPreview}
        onPublish={publishInvitation}
        isPublishing={isPublishing}
        isSaving={isSaving}
        isValid={isValid}
      />

      <main className="mx-auto w-full max-w-5xl flex-1 p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            {isEdit ? t('editTitle') : t('title')}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? t('editSubtitle') : t('subtitle')}
          </p>
        </div>

        <div className="space-y-8 pb-12">
          <HeroSection
            data={data}
            updateField={updateField}
            uploadImage={uploadImage}
          />
          <CoupleSection
            data={data}
            updateField={updateField}
            uploadImage={uploadImage}
          />
          <FamilySection data={data} updateField={updateField} />
          <NotificationSection data={data} updateField={updateField} />
          <LoveStorySection
            data={data}
            updateField={updateField}
            uploadImage={uploadImage}
          />
          <EventDetailsSection data={data} updateField={updateField} />
          <MapConfigSection data={data} updateField={updateField} />
          <GallerySection
            data={data}
            updateField={updateField}
            uploadImage={uploadImage}
          />
          <ThankYouSection data={data} updateField={updateField} />
          <GuestbookSection data={data} updateField={updateField} />
          <GiftSection data={data} updateField={updateField} />
          <MusicSection
            data={data}
            updateField={updateField}
            uploadMusic={uploadMusic}
          />
          <AdsSection data={data} updateField={updateField} />
        </div>
      </main>
    </div>
  );
}

export default function ManageInvitationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          Loading...
        </div>
      }
    >
      <ManageInvitationContent />
    </Suspense>
  );
}
