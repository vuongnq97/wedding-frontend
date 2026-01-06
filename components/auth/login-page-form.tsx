'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Lock, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { BaseButton } from '@/components/ui/base-button';
import { BaseInput } from '@/components/ui/base-input';
import { useAuth } from '@/hooks/use-auth';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/auth-store';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { getLocalizedErrorMessage } from '@/utils/error-helper';
import { useInvitation } from '@/hooks/use-invitation';

export function LoginPageForm() {
  const t = useTranslations('login');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const { requestOtp, verifyOtp, isLoading } = useAuth();
  const { checkUserHasWedding } = useInvitation();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');

  const emailSchema = z.object({
    email: z
      .string()
      .min(1, tCommon('validation.email_required'))
      .email(tCommon('validation.email_invalid')),
  });

  const otpSchema = z.object({
    code: z.string().min(6, tCommon('validation.otp_length')),
  });

  type EmailFormValues = z.infer<typeof emailSchema>;
  type OtpFormValues = z.infer<typeof otpSchema>;

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: '' },
  });

  const handleEmailSubmit = async (values: z.infer<typeof emailSchema>) => {
    try {
      await requestOtp(values.email);
      setEmail(values.email);
      setStep('otp');
    } catch (err) {
      const message = getLocalizedErrorMessage(err, tCommon);
      toast.error(message);
    }
  };

  const handleOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
    try {
      const authResponse = await verifyOtp(email, values.code);

      // Check if user has wedding data
      if (authResponse && authResponse.userId) {
        const hasWedding = await checkUserHasWedding(authResponse.userId);
        useAuthStore.getState().setHasWedding(hasWedding);
      }

      toast.success(t('login_success'));
      router.push(ROUTES.HOME);
    } catch (err) {
      const message = getLocalizedErrorMessage(err, tCommon);
      toast.error(message);
    }
  };

  const handleResendOtp = async () => {
    try {
      await requestOtp(email);
      toast.success(
        t.rich('otp_sent_to', {
          email,
          bold: (chunks) => (
            <span className="text-foreground font-semibold">{chunks}</span>
          ),
        })
      );
    } catch (err) {
      const message = getLocalizedErrorMessage(err, tCommon);
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {step === 'email' ? (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={emailForm.control}
              name="email"
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
                        type="email"
                        placeholder={t('email_placeholder')}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <BaseButton
              type="submit"
              disabled={isLoading || !emailForm.formState.isValid}
              className="bg-primary shadow-primary/20 hover:bg-primary/90 mt-2 flex h-12 w-full cursor-pointer items-center justify-center rounded-lg text-sm font-bold tracking-wide text-white shadow-lg transition-colors"
            >
              {isLoading ? t('loading') : t('submit')}
            </BaseButton>
            <div className="space-y-2 pt-4">
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <Check className="h-4 w-4 text-green-500" />
                {t('no_password')}
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <Check className="h-4 w-4 text-green-500" />
                {t('safe_login')}
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <Check className="h-4 w-4 text-green-500" />
                {t('free_login')}
              </div>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...otpForm}>
          <form
            onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="text-muted-foreground text-sm">
              {t.rich('otp_sent_to', {
                email,
                bold: (chunks) => (
                  <span className="text-foreground font-semibold">
                    {chunks}
                  </span>
                ),
              })}
            </div>
            <FormField
              control={otpForm.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-foreground text-sm font-semibold">
                    OTP
                  </FormLabel>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2 text-[20px]" />
                    <FormControl>
                      <BaseInput
                        id="code"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <BaseButton
              type="submit"
              disabled={isLoading || !otpForm.formState.isValid}
              className="bg-primary shadow-primary/20 hover:bg-primary/90 mt-2 flex h-12 w-full cursor-pointer items-center justify-center rounded-lg text-sm font-bold tracking-wide text-white shadow-lg transition-colors"
            >
              {isLoading ? t('verifying') : t('verify_otp')}
            </BaseButton>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isLoading}
              className="text-primary hover:text-primary/80 mx-auto text-sm font-medium underline-offset-4 hover:cursor-pointer hover:underline"
            >
              {t('resend_otp')}
            </button>
            <button
              type="button"
              onClick={() => setStep('email')}
              className="text-muted-foreground hover:text-foreground mx-auto text-sm underline-offset-4 hover:cursor-pointer hover:underline"
            >
              {t('back_to_email')}
            </button>
          </form>
        </Form>
      )}
    </div>
  );
}
