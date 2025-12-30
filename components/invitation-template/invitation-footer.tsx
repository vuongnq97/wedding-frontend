import { Camera, Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function InvitationFooter() {
  const t = useTranslations('invitation-template.footer');

  return (
    <footer className="bg-muted col-span-full w-full py-12 pb-32 text-center">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-foreground text-2xl font-bold">{t('title')}</h2>
        <div className="flex gap-4">
          <a
            className="text-muted-foreground hover:text-primary transition-colors"
            href="#"
          >
            <Camera className="h-6 w-6" />
          </a>
          <a
            className="text-muted-foreground hover:text-primary transition-colors"
            href="#"
          >
            <Share2 className="h-6 w-6" />
          </a>
        </div>
        <p className="text-muted-foreground mt-4 text-xs">{t('credit')}</p>
      </div>
    </footer>
  );
}
