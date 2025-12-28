import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BaseButton } from '@/components/ui/base-button';

export function RSVPSection() {
    const t = useTranslations('invitation.rsvp');

    return (
        <section className="bg-primary relative flex w-full items-center justify-center px-6 py-24">
            <div className="opacity-10 absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="bg-surface relative z-10 max-w-2xl rounded-2xl p-8 text-center shadow-2xl md:p-12">
                <Mail className="text-primary mx-auto mb-4 h-10 w-10" />
                <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                    {t('title')}
                </h2>
                <p className="text-muted-foreground mb-8 text-lg">
                    {t('description')}
                </p>
                <BaseButton className="bg-primary hover:bg-primary/90 w-full transform rounded-lg px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 md:w-auto">
                    {t('button')}
                </BaseButton>
            </div>
        </section>
    );
}
