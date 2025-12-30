'use client';

import {
    PublicHeader,
    PublicHeroSection,
    PublicCountdownSection,
    PublicCoupleSection,
    PublicFamilySection,
    PublicStorySection,
    PublicDetailsSection,
    PublicGallerySection,
    PublicRsvpSection,
    PublicGiftSection,
    PublicGuestbookSection,
    PublicFooter,
    PublicMusicPlayer,
} from '@/components/invitation';
import { useInvitation } from '@/hooks/use-invitation';

export default function PublicInvitationPage() {
    const { data } = useInvitation();

    return (
        <div className="flex w-full flex-col font-sans text-foreground bg-background">
            <PublicHeader data={data} />
            <PublicHeroSection data={data} />
            <PublicCountdownSection data={data} />
            <PublicCoupleSection data={data} />
            <PublicFamilySection data={data} />
            <PublicStorySection data={data} />
            <PublicDetailsSection data={data} />
            <PublicGallerySection data={data} />
            <PublicRsvpSection data={data} />
            <PublicGiftSection data={data} />
            <PublicGuestbookSection data={data} />
            <PublicFooter data={data} />
            <PublicMusicPlayer data={data} />
        </div>
    );
}
