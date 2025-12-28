import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function StorySection() {
    const t = useTranslations('invitation.story');

    return (
        <section className="bg-background w-full px-6 py-20">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row">
                {/* Story Text */}
                <div className="order-2 w-full text-center md:order-1 md:w-1/2 md:text-left">
                    <span className="text-primary mb-2 block text-sm font-bold tracking-wider uppercase">
                        {t('identifier')}
                    </span>
                    <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
                        {t('title')}
                    </h2>
                    <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                        {t('paragraph1')}
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        {t('paragraph2')}
                    </p>
                    <div className="text-foreground mt-8 font-serif text-2xl italic">
                        {t('quote')}
                    </div>
                </div>
                {/* Story Image */}
                <div className="order-1 w-full md:order-2 md:w-1/2">
                    <div className="relative">
                        <div className="border-primary absolute -left-4 -top-4 h-full w-full rounded-2xl border-2"></div>
                        <Image
                            src="https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Couple holding hands"
                            width={1000}
                            height={667}
                            className="relative z-10 rounded-2xl shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
