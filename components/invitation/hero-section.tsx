import Image from 'next/image';
import { ChevronDown, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function HeroSection() {
    const t = useTranslations('invitation.hero');

    return (
        <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt="Couple walking in a field"
                    fill
                    className="h-full w-full object-cover"
                    priority
                />
                <div className="bg-black/40 absolute inset-0"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                <p className="mb-4 text-lg font-medium tracking-[0.2em] uppercase">
                    {t('subtitle')}
                </p>
                <h1 className="mb-6 font-serif text-6xl font-bold md:text-8xl">
                    {t('title')}
                </h1>
                <div className="flex items-center gap-4 text-xl md:text-2xl">
                    <span className="font-light">{t('date')}</span>
                    <Heart className="h-4 w-4 fill-current text-white" />
                    <span className="font-light">{t('location')}</span>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 animate-bounce">
                    <ChevronDown className="h-10 w-10 text-white" />
                </div>
            </div>
        </section>
    );
}
