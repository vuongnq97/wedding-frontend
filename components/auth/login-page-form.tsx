'use client';

import { BaseButton } from '@/components/ui/base-button';
import { BaseInput } from '@/components/ui/base-input';
import { Lock, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function LoginPageForm() {
    const t = useTranslations('login');

    return (
        <form className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
                <label
                    className="text-foreground text-sm font-semibold"
                    htmlFor="email"
                >
                    {t('email_label')}
                </label>
                <div className="relative">
                    <Mail className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2 text-[20px]" />
                    <BaseInput
                        id="email"
                        type="email"
                        placeholder={t('email_placeholder')}
                        className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-12 pr-4 pl-11 focus:ring-1"
                    />
                </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <label
                        className="text-foreground text-sm font-semibold"
                        htmlFor="password"
                    >
                        {t('password_label')}
                    </label>
                    <Link
                        href="#"
                        className="text-primary hover:text-primary/80 text-xs font-semibold"
                    >
                        {t('forgot_password')}
                    </Link>
                </div>
                <div className="relative">
                    <Lock className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2 text-[20px]" />
                    <BaseInput
                        id="password"
                        type="password"
                        placeholder={t('password_placeholder')}
                        className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-12 pr-4 pl-11 focus:ring-1"
                    />
                </div>
            </div>

            {/* Login Button */}
            <BaseButton
                type="submit"
                className="bg-primary shadow-primary/20 hover:bg-primary/90 mt-2 flex h-12 w-full cursor-pointer items-center justify-center rounded-lg text-sm font-bold tracking-wide text-white shadow-lg transition-colors"
            >
                {t('submit')}
            </BaseButton>
        </form>
    );
}
