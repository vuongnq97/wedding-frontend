'use client';

import { useTranslations } from 'next-intl';

export function SignUpIllustration() {
    const t = useTranslations('signUp');

    return (
        <div className="bg-primary-soft relative hidden w-5/12 overflow-hidden md:flex">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAR0t84ySvlR2M4xV524WGgrIZk7QmJIhWd2Z7O9yzyiftOWLx3i9OBtB3PHNcRMf2EsoOPTlWNJRVQs5RT35rfNZo_-5CGVLEwgT92B2ZnSRloWA6UPxZWkGE8U_g6yLz5Ox1enCCbjdYedvEDchJOwOBibVmtDw3YslZ4yel5PKIgDqHV6n1qhKqSKmFLYNx9VaPI4CvrvLFRgZS35B7N4b5io9VR2rjdR0EJIwyEki3mb3dgOmEwi87asYpYIouTegePdrUtQKw')",
                }}
            />
            {/* Overlay for better text contrast if needed, plus decorative tint */}
            <div className="bg-primary/10 absolute inset-0 mix-blend-multiply" />
            <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-10 text-white">
                <h3 className="mb-2 text-2xl font-bold">{t('illustration.title')}</h3>
                <p className="leading-relaxed font-medium text-white/90">
                    {t('illustration.subtitle')}
                </p>
            </div>
        </div>
    );
}
