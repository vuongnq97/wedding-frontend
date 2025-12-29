'use client';

import {
    EventsSection,
    HeroSection,
    InvitationFooter,
    MapSection,
    RegistrySection,
    RSVPSection,
    StorySection,
    Header,
} from '@/components/invitation-template';

export default function InvitationPage() {
    return (
        <div className="flex w-full flex-col">
            <Header />
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
