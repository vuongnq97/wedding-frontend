'use client';

import { useTranslations, useLocale } from 'next-intl';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { WeddingData } from '@/types/invitation';
import { useRsvp } from '@/hooks/use-rsvp';
import { AttendingStatus } from '@/types/rsvp';
import { BaseButton } from '@/components/ui/base-button';
import { BaseInput } from '@/components/ui/base-input';

interface RsvpSectionProps {
  data: WeddingData;
}

export function RsvpSection({ data }: RsvpSectionProps) {
  const t = useTranslations('invitation.rsvp');
  const locale = useLocale();
  const { form, isSubmitting, isSuccess, onSubmit } = useRsvp();

  const deadline = data.ceremony.date
    ? new Date(data.ceremony.date)
    : new Date();
  deadline.setMonth(deadline.getMonth() - 1);
  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
  }).format(deadline);

  if (isSuccess) {
    return (
      <section className="bg-background py-10 md:py-24" id="rsvp">
        <div className="layout-container flex justify-center">
          <div className="bg-surface border-border mx-4 w-full max-w-2xl rounded-2xl border p-8 text-center shadow-xl md:p-12">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-foreground mb-4 text-2xl font-bold">
              {t('success.title')}
            </h3>
            <p className="text-muted-foreground">{t('success.message')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-10 md:py-24" id="rsvp">
      <div className="layout-container flex justify-center">
        <div className="bg-surface border-border mx-4 w-full max-w-2xl rounded-2xl border p-8 shadow-xl md:p-12">
          <div className="mb-10 text-center">
            <p className="text-primary mb-2 text-xs font-bold tracking-widest uppercase">
              {t('title')}
            </p>
            <h2 className="text-foreground mb-2 text-2xl font-bold">
              {t('subtitle', { date: formattedDate })}
            </h2>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (errors) =>
                console.log('Form Validation Errors:', errors)
              )}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fullName.label')}</FormLabel>
                    <FormControl>
                      <BaseInput
                        placeholder={t('fullName.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attending"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{t('attendance.label')}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="gap-4 md:flex"
                      >
                        <FormItem className="flex-1">
                          <FormControl>
                            <label className="border-border has-[:checked]:border-primary has-[:checked]:bg-primary/5 hover:bg-muted flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition-all">
                              <RadioGroupItem value={AttendingStatus.YES} />
                              <span className="text-foreground text-sm font-medium">
                                {t('attendance.accept')}
                              </span>
                            </label>
                          </FormControl>
                        </FormItem>
                        <FormItem className="flex-1">
                          <FormControl>
                            <label className="border-border has-[:checked]:border-primary has-[:checked]:bg-primary/5 hover:bg-muted flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition-all">
                              <RadioGroupItem value={AttendingStatus.NO} />
                              <span className="text-foreground text-sm font-medium">
                                {t('attendance.decline')}
                              </span>
                            </label>
                          </FormControl>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('guests')}</FormLabel>
                    <FormControl>
                      <BaseInput
                        type="number"
                        min="1"
                        max="10"
                        className="bg-muted"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('message.label')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('message.placeholder')}
                        className="bg-muted border-border resize-none focus:outline-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <BaseButton
                type="submit"
                disabled={isSubmitting || !form.formState.isValid}
                className="bg-primary hover:bg-primary/90 shadow-primary/20 h-auto w-full rounded-xl py-4 text-lg font-bold text-white shadow-lg transition-all active:scale-[0.99]"
              >
                {isSubmitting ? t('submitting') : t('submit')}
              </BaseButton>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
