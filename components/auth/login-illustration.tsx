'use client';

import { useTranslations } from 'next-intl';

export function LoginIllustration() {
  const t = useTranslations('login');

  return (
    <div className="bg-primary-soft relative hidden flex-col justify-center overflow-hidden p-8 md:flex md:w-1/2 md:items-center">
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center opacity-90"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8sU4G86R5tdZg8ATHhQML7sxPVHNJGLelkt1oxZcAQLwi4z272o6jwNgpBJr8VzK3BJvnwWeO2gRojshsr5brxgWnSpQfWt6-9XF-InCsDXU8lYFxM5JlhpxqNoqkt_euAJI5_imwmodwphxhu_oGMMTDv1zw-Ne0z9U9u9vxukzbbdiX74zJTQ0Vd6AHru0DDV0d_zcs9ojy_cU9DNNb1kd3p_1B5GjlosA9o64AxlXtwvmGi8DTfKoaV-vrhMwBq3BxeB5w93w')",
        }}
      >
        <div className="from-primary/40 absolute inset-0 bg-gradient-to-t to-transparent mix-blend-multiply" />
      </div>
      <div className="relative z-10 rounded-xl border border-white/20 bg-black/20 p-6 text-center text-white backdrop-blur-sm">
        <h3 className="mb-2 text-xl font-bold">{t('illustration.title')}</h3>
        <p className="text-sm text-white/90">{t('illustration.subtitle')}</p>
      </div>
    </div>
  );
}
