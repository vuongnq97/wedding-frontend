import { BaseButton } from '@/components/ui/base-button';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('home.hero');
  return (
    <section className="relative w-full overflow-hidden py-8 md:py-12">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden rounded-3xl bg-gray-200 shadow-2xl">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAr5M-2N4iQ8P-OjNIASOM51Ed1-KM1UcnI5hp8Rrx5tUL9_Uz1gb6JzOvSVgndkXsa5TH5t3CvKS8K2uhDS4oCk4rHIiJJI2XZLK7xWhX2fhmyJyMNN4tzmXR2Mtgl8XRL6e7KMnSnedgLepSQal2TdU2qW9ViyFqVuUTwoGeWS54M2jzoPS_YnvRPoGemHBsJSOAOQi3rWuirwb7hMJw5MDrbbkH0E4JZjfxsNizeuKD-4sP5RYYGjslpXVSSmmpqMzuV-MVrkUQ')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          <div className="relative z-10 mt-12 flex max-w-4xl flex-col items-center px-4 text-center">
            <p className="mb-2 font-serif text-xl tracking-wide text-white/95 italic drop-shadow-md md:text-2xl">
              {t('names')}
            </p>
            <div className="mb-8 h-px w-16 bg-white/60" />
            <h1
              className="mb-8 font-serif text-5xl leading-tight font-bold tracking-tight text-white drop-shadow-lg md:text-7xl"
              dangerouslySetInnerHTML={{ __html: t.raw('title') }}
            />
            <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed font-light text-white/95 drop-shadow-md md:text-xl">
              {t('subtitle')}
            </p>
            <BaseButton className="shadow-primary/40 h-14 px-10 text-lg transition-all hover:-translate-y-1 hover:scale-[1.02]">
              {t('cta')}
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
  );
}
