'use client';

import { SignUpForm, SignUpIllustration, SocialLogin } from '@/components/auth';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function SignUpPage() {
  const t = useTranslations('signUp');

  return (
    <div className="bg-background text-foreground relative flex min-h-screen flex-col font-sans transition-colors duration-300">
      {/* Navbar (Minimal) */}
      <header className="absolute top-0 left-0 z-10 flex w-full items-center justify-between bg-transparent px-6 py-4 md:px-10 lg:px-40">
        <div className="flex items-center gap-3">
          <div className="text-primary size-8">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-foreground text-lg leading-tight font-bold tracking-[-0.015em]">
            {t('title')}
          </h2>
        </div>
        <div className="hidden sm:block">
          <p className="text-muted-foreground text-sm font-medium">
            {t('header.already_member')}{' '}
            <Link
              className="text-primary font-bold hover:underline"
              href="/login"
            >
              {t('header.sign_in')}
            </Link>
          </p>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 items-center justify-center p-4 pt-24 md:pt-4">
        <div className="bg-surface flex min-h-[640px] w-full max-w-[1024px] flex-col overflow-hidden rounded-2xl shadow-xl md:flex-row">
          {/* Left Side: Illustration */}
          <SignUpIllustration />

          {/* Right Side: Form */}
          <div className="bg-surface flex w-full flex-col justify-center p-8 md:w-7/12 md:p-12 lg:p-16">
            <div className="mx-auto w-full max-w-[480px]">
              <div className="mb-8 text-center md:text-left">
                <h1 className="text-foreground mb-3 text-3xl leading-tight font-bold tracking-tight">
                  {t('form_title')}
                </h1>
                <p className="text-muted-foreground text-base font-normal">
                  {t('form_subtitle')}
                </p>
              </div>

              {/* Social Auth */}
              <div className="mb-6">
                {/* Reusing SocialLogin from auth components */}
                <SocialLogin />
              </div>

              {/* Divider */}
              <div className="relative mb-6 flex items-center py-2">
                <div className="border-border flex-grow border-t" />
                <span className="text-muted-foreground mx-4 flex-shrink-0 text-xs font-semibold tracking-wider uppercase">
                  {t('or_register')}
                </span>
                <div className="border-border flex-grow border-t" />
              </div>

              {/* Input Fields */}
              <SignUpForm />

              {/* Mobile Footer Link */}
              <div className="mt-8 text-center sm:hidden">
                <p className="text-muted-foreground text-sm font-medium">
                  {t('header.already_member')}{' '}
                  <Link
                    className="text-primary font-bold hover:underline"
                    href="/login"
                  >
                    {t('header.sign_in')}
                  </Link>
                </p>
              </div>

              {/* Terms Links */}
              <div className="text-muted-foreground mt-8 flex justify-center gap-6 text-xs">
                <Link className="hover:text-primary transition-colors" href="#">
                  {t('footer.privacy')}
                </Link>
                <Link className="hover:text-primary transition-colors" href="#">
                  {t('footer.terms')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
