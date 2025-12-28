'use client';

import { BaseButton } from '@/components/ui/base-button';
import { BaseInput } from '@/components/ui/base-input';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function SignUpForm() {
    const t = useTranslations('signUp');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
                <label
                    className="text-sm font-semibold text-foreground"
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
                        className="border-border bg-background focus:border-primary focus:ring-primary h-12 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:ring-1"
                    />
                </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
                <label
                    className="text-sm font-semibold text-foreground"
                    htmlFor="password"
                >
                    {t('password_label')}
                </label>
                <div className="relative">
                    <Lock className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2 text-[20px]" />
                    <BaseInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('password_placeholder')}
                        className="border-border bg-background focus:border-primary focus:ring-primary h-12 pl-11 pr-12 text-foreground placeholder:text-muted-foreground focus:ring-1"
                    />
                    <BaseButton
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                        variant="ghost"
                        size="icon"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </BaseButton>
                </div>
                <p className="text-xs text-muted-foreground">{t('password_hint')}</p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
                <BaseButton
                    type="submit"
                    className="bg-primary shadow-primary/20 hover:bg-primary/90 flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg text-base font-bold leading-normal tracking-[0.015em] text-white shadow-lg transition-all active:scale-[0.98]"
                >
                    <span className="truncate">{t('submit')}</span>
                </BaseButton>
            </div>
        </form>
    );
}
