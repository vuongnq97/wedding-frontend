'use client';

import { useTranslations, useLocale } from 'next-intl';
import { BaseButton } from '@/components/ui/base-button';
import { BaseInput } from '@/components/ui/base-input';
import { WeddingData } from '@/types/invitation';

interface RsvpSectionProps {
  data: WeddingData;
}

export function RsvpSection({ data }: RsvpSectionProps) {
  const t = useTranslations('invitation.rsvp');
  const locale = useLocale();

  const deadline = data.ceremony.date
    ? new Date(data.ceremony.date)
    : new Date();
  deadline.setMonth(deadline.getMonth() - 1);
  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
  }).format(deadline);

  return (
    <section className="bg-background py-16 md:py-24" id="rsvp">
      <div className="layout-container flex justify-center">
        <div className="bg-surface border-border mx-4 w-full max-w-2xl rounded-2xl border p-8 shadow-xl md:p-12">
          <div className="mb-10 text-center">
            <p className="text-primary mb-2 text-xs font-bold tracking-widest uppercase">
              {t('title')}
            </p>
            <h2 className="text-foreground mb-2 text-3xl font-bold">
              {t('subtitle', { date: formattedDate })}
            </h2>
          </div>

          <form className="space-y-6">
            {/* Name */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <BaseInput
                  label={t('firstName.label')}
                  type="text"
                  id="firstName"
                  className="bg-muted border-border"
                  placeholder={t('firstName.placeholder')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <BaseInput
                  label={t('lastName.label')}
                  type="text"
                  id="lastName"
                  className="bg-muted border-border"
                  placeholder={t('lastName.placeholder')}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <BaseInput
                label={t('email.label')}
                type="email"
                id="email"
                className="bg-muted border-border"
                placeholder={t('email.placeholder')}
              />
            </div>

            {/* Attendance w/ Custom Radio UI */}
            <div className="flex flex-col gap-3">
              <label className="text-foreground text-sm font-semibold">
                {t('attendance.label')}
              </label>
              <div className="flex gap-4">
                <label className="border-border has-[:checked]:border-primary has-[:checked]:bg-primary/5 hover:bg-muted flex flex-1 cursor-pointer items-center gap-2 rounded-lg border p-3 transition-all">
                  <input
                    type="radio"
                    name="attendance"
                    className="text-primary focus:ring-primary border-border bg-muted"
                    defaultChecked
                  />
                  <span className="text-foreground text-sm font-medium">
                    {t('attendance.accept')}
                  </span>
                </label>
                <label className="border-border has-[:checked]:border-primary has-[:checked]:bg-primary/5 hover:bg-muted flex flex-1 cursor-pointer items-center gap-2 rounded-lg border p-3 transition-all">
                  <input
                    type="radio"
                    name="attendance"
                    className="text-primary focus:ring-primary border-border bg-muted"
                  />
                  <span className="text-foreground text-sm font-medium">
                    {t('attendance.decline')}
                  </span>
                </label>
              </div>
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-2">
              <BaseInput
                label={t('guests')}
                type="number"
                id="guests"
                min="1"
                defaultValue="1"
                className="bg-muted border-border"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-foreground text-sm font-semibold"
              >
                {t('message.label')}
              </label>
              <textarea
                id="message"
                rows={3}
                className="border-border bg-muted text-foreground focus:ring-primary focus:border-primary resize-none rounded-lg px-4 py-3 transition-all outline-none"
                placeholder={t('message.placeholder')}
              />
            </div>

            <BaseButton
              type="submit"
              className="bg-primary hover:bg-primary/90 shadow-primary/20 h-auto w-full rounded-xl py-4 text-lg font-bold text-white shadow-lg transition-all active:scale-[0.99]"
            >
              {t('submit')}
            </BaseButton>
          </form>
        </div>
      </div>
    </section>
  );
}
