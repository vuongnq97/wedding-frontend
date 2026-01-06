'use client';

import {
  Header,
  HeroSection,
  CountdownSection,
  CoupleSection,
  FamilySection,
  StorySection,
  DetailsSection,
  GallerySection,
  RsvpSection,
  GiftSection,
  GuestbookSection,
  Footer,
  MusicPlayer,
} from '@/components/invitation';
import { WeddingData, InvitationMode } from '@/types/invitation';

interface InvitationContentProps {
  data: WeddingData | null;
  mode?: InvitationMode;
  onPublish?: () => void;
}

export function InvitationContent({
  data,
  mode = 'public',
  onPublish,
}: InvitationContentProps) {
  console.log({ mode });

  if (!data) {
    return (
      <div className="bg-background flex min-h-screen w-full items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground flex w-full flex-col font-sans">
      <Header data={data} onPublish={onPublish} mode={mode} />
      <HeroSection data={data} />
      <CountdownSection data={data} />
      <CoupleSection data={data} />
      <FamilySection data={data} />
      <StorySection data={data} />
      <DetailsSection data={data} />
      <GallerySection data={data} />
      <RsvpSection data={data} />
      <GiftSection data={data} />
      {mode === 'public' && <GuestbookSection data={data} />}
      <Footer data={data} />
      <MusicPlayer data={data} />
    </div>
  );
}
