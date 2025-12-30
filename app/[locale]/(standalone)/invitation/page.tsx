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
import { useInvitation } from '@/hooks/use-invitation';

export default function PublicInvitationPage() {
  const { data, publishInvitation } = useInvitation();

  return (
    <div className="text-foreground bg-background flex w-full flex-col font-sans">
      <Header data={data} onPublish={publishInvitation} />
      <HeroSection data={data} />
      <CountdownSection data={data} />
      <CoupleSection data={data} />
      <FamilySection data={data} />
      <StorySection data={data} />
      <DetailsSection data={data} />
      <GallerySection data={data} />
      <RsvpSection data={data} />
      <GiftSection data={data} />
      <GuestbookSection data={data} />
      <Footer data={data} />
      {/* <MusicPlayer data={data} /> */}
    </div>
  );
}
