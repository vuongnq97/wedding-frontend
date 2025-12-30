import { Camera, Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function InvitationFooter() {
    const t = useTranslations('invitation-template.footer');

    return (
        <footer className="bg-muted col-span-full w-full py-12 pb-32 text-center">
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold text-foreground">
                    {t('title')}
                </h2>
                <div className="flex gap-4">
                    <a
                        className="text-muted-foreground transition-colors hover:text-primary"
                        href="#"
                    >
                        <Camera className="h-6 w-6" />
                    </a>
                    <a
                        className="text-muted-foreground transition-colors hover:text-primary"
                        href="#"
                    >
                        <Share2 className="h-6 w-6" />
                    </a>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">{t('credit')}</p>
            </div>
        </footer>
    );
}
