import { Flower, Plane, ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function RegistrySection() {
    const t = useTranslations('invitation-template.registry');

    return (
        <section className="bg-surface w-full px-6 py-20">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-foreground mb-4 text-3xl font-bold">
                    {t('title')}
                </h2>
                <p className="text-muted-foreground mx-auto mb-12 max-w-lg">
                    {t('description')}
                </p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {/* Card 1 */}
                    <a
                        className="group hover:border-primary/20 block rounded-xl border border-transparent bg-muted p-8 transition-all hover:shadow-lg"
                        href="#"
                    >
                        <div className="bg-surface mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110">
                            <ShoppingBag className="text-foreground h-6 w-6" />
                        </div>
                        <h3 className="text-foreground mb-2 text-lg font-bold">
                            {t('crateAndBarrel.title')}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            {t('crateAndBarrel.description')}
                        </p>
                    </a>
                    {/* Card 2 */}
                    <a
                        className="group hover:border-primary/20 block rounded-xl border border-transparent bg-muted p-8 transition-all hover:shadow-lg"
                        href="#"
                    >
                        <div className="bg-surface mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110">
                            <Plane className="text-foreground h-6 w-6" />
                        </div>
                        <h3 className="text-foreground mb-2 text-lg font-bold">
                            {t('honeymoon.title')}
                        </h3>
                        <p className="text-muted-foreground text-sm">{t('honeymoon.description')}</p>
                    </a>
                    {/* Card 3 */}
                    <a
                        className="group hover:border-primary/20 block rounded-xl border border-transparent bg-muted p-8 transition-all hover:shadow-lg"
                        href="#"
                    >
                        <div className="bg-surface mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110">
                            <Flower className="text-foreground h-6 w-6" />
                        </div>
                        <h3 className="text-foreground mb-2 text-lg font-bold">
                            {t('theKnot.title')}
                        </h3>
                        <p className="text-muted-foreground text-sm">{t('theKnot.description')}</p>
                    </a>
                </div>
            </div>
        </section>
    );
}
