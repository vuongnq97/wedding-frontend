'use client';

import {
    LoginPageForm,
    LoginIllustration,
    SocialLogin,
} from '@/components/auth';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function LoginPage() {
    const t = useTranslations('login');

    return (
        <div className="bg-background relative flex min-h-screen w-full flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10 h-full w-full">
                <div className="from-primary-soft/50 via-background to-background-beige/50 absolute inset-0 bg-gradient-to-br opacity-80" />
                <div className="bg-primary/5 absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full blur-[100px]" />
                <div className="bg-primary/10 absolute right-[-10%] bottom-[-10%] h-[600px] w-[600px] rounded-full blur-[120px]" />
            </div>

            <div className="layout-container flex h-full grow flex-col items-center justify-center px-4 py-10 sm:px-10">
                <div className="mb-8 flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                        <Heart className="fill-primary size-6" />
                    </div>
                    <h2 className="text-foreground text-2xl font-bold tracking-tight">
                        {t('title')}
                    </h2>
                </div>

                {/* Login Card */}
                <div className="border-border bg-surface flex w-full max-w-[1000px] flex-col overflow-hidden rounded-xl border shadow-xl md:flex-row">
                    <LoginIllustration />

                    {/* Form Side */}
                    <div className="flex w-full flex-col justify-center p-8 sm:p-12 md:w-1/2">
                        <div className="mb-8 flex flex-col gap-1">
                            <h1 className="text-foreground text-3xl font-bold tracking-tight">
                                {t('welcome_back')}
                            </h1>
                            <p className="text-muted-foreground text-sm font-normal">
                                {t('manage_invitations')}
                            </p>
                        </div>

                        <LoginPageForm />

                        {/* Social Login Divider */}
                        <div className="relative flex items-center py-8">
                            <div className="border-border flex-grow border-t" />
                            <span className="text-muted-foreground mx-4 flex-shrink-0 text-xs font-medium">
                                {t('or_continue')}
                            </span>
                            <div className="border-border flex-grow border-t" />
                        </div>

                        <SocialLogin />

                        {/* Sign Up Link */}
                        <div className="mt-8 text-center">
                            <p className="text-muted-foreground text-sm">
                                {t('no_account')}{' '}
                                <Link
                                    href="#"
                                    className="text-primary hover:text-primary/80 font-bold transition-colors"
                                >
                                    {t('sign_up')}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-muted-foreground mt-8 text-center text-xs">
                    <p>© 2023 Forever & Always. All rights reserved.</p>
                    <div className="mt-2 flex justify-center gap-4">
                        <Link href="#" className="hover:text-primary">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-primary">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
