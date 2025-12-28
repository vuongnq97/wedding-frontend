'use client';

import {
    EventsSection,
    HeroSection,
    InvitationFooter,
    MapSection,
    RegistrySection,
    RSVPSection,
    StorySection,
} from '@/components/invitation';

export default function InvitationPage() {
    return (
        <div className="flex w-full flex-col">
            <HeroSection />
            <StorySection />
            <EventsSection />
            <MapSection />
            <RegistrySection />
            <RSVPSection />
            <InvitationFooter />
        </div>
    );
}
