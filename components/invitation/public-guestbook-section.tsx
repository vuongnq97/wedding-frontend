'use client';

import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import { WeddingData } from '@/types/invitation';

interface PublicGuestbookSectionProps {
    data: WeddingData;
}

export function PublicGuestbookSection({ data }: PublicGuestbookSectionProps) {
    const t = useTranslations('invitation.guestbook');

    if (!data.guestbookEnabled) {
        return null;
    }

    const wishes = [
        { text: "\"Wishing you a lifetime of love and happiness. I am so honored to be part of your special day!\"", initials: "EM", name: "Emily Miller", rel: "Friend of Bride" },
        { text: "\"Congratulations to the beautiful couple! May your journey be filled with joy.\"", initials: "DJ", name: "David Johnson", rel: "Cousin" },
        { text: "\"So excited to celebrate with you guys! You are perfect for each other.\"", initials: "SK", name: "Sarah Kline", rel: "Colleague" },
    ];

    return (
        <section className="py-16 bg-background" id="wishes">
            <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        {t('title')}
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishes.map((wish, index) => (
                        <div key={index} className="p-6 rounded-xl bg-surface border border-border relative shadow-sm">
                            <Quote className="absolute top-6 right-6 text-primary/20 w-8 h-8 fill-current" />
                            <p className="text-foreground italic leading-relaxed mb-6">
                                {wish.text}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                    {wish.initials}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">
                                        {wish.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {wish.rel}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
