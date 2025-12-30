'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { BaseButton } from '@/components/ui/base-button';
import { BaseInput } from '@/components/ui/base-input';
import { Link } from '@/i18n/routing';
import { useLogin } from '@/hooks/use-login';
import { ROUTES } from '@/constants/routes';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const loginSchema = z.object({
  username: z.string().min(1, 'Email is required'), // Map email to username for now based on useLogin
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginPageFormValues = z.infer<typeof loginSchema>;

export function LoginPageForm() {
  const t = useTranslations('login');
  const router = useRouter();
  const { login, isLoading, error } = useLogin();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<LoginPageFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (values: LoginPageFormValues) => {
    setFormError(null);
    try {
      await login(values);
      router.push(ROUTES.HOME);
    } catch (err) {
      const message = err instanceof Error ? err.message : t('system_error');
      setFormError(message);
    }
  };

  const displayedError = error?.message ?? formError;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-5"
      >
        {/* Email Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-foreground text-sm font-semibold">
                {t('email_label')}
              </FormLabel>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2 text-[20px]" />
                <FormControl>
                  <BaseInput
                    id="email"
                    type="text" // changed to text for username, or keep email if username IS email
                    placeholder={t('email_placeholder')}
                    className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-12 pr-4 pl-11 focus:ring-1"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <FormLabel className="text-foreground text-sm font-semibold">
                  {t('password_label')}
                </FormLabel>
                <Link
                  href="#"
                  className="text-primary hover:text-primary/80 text-xs font-semibold"
                >
                  {t('forgot_password')}
                </Link>
              </div>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2 text-[20px]" />
                <FormControl>
                  <BaseInput
                    id="password"
                    type="password"
                    placeholder={t('password_placeholder')}
                    className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-12 pr-4 pl-11 focus:ring-1"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {displayedError && (
          <div className="text-destructive text-sm font-medium">
            {displayedError}
          </div>
        )}

        {/* Login Button */}
        <BaseButton
          type="submit"
          disabled={isLoading}
          className="bg-primary shadow-primary/20 hover:bg-primary/90 mt-2 flex h-12 w-full cursor-pointer items-center justify-center rounded-lg text-sm font-bold tracking-wide text-white shadow-lg transition-colors"
        >
          {isLoading ? t('loading') : t('submit')}
        </BaseButton>
      </form>
    </Form>
  );
}
