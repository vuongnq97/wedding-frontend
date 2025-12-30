'use client';

import { useTranslations } from 'next-intl';
import { BaseButton } from '@/components/ui/base-button';
import { WeddingData } from '@/types/invitation';

interface PublicRsvpSectionProps {
    data: WeddingData;
}

export function PublicRsvpSection({ }: PublicRsvpSectionProps) {
    const t = useTranslations('invitation.rsvp');

    return (
        <section className="py-16 md:py-24 bg-background" id="rsvp">
            <div className="layout-container flex justify-center">
                <div className="max-w-2xl w-full mx-4 bg-surface rounded-2xl p-8 md:p-12 shadow-xl border border-border">
                    <div className="text-center mb-10">
                        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">
                            {t('title')}
                        </p>
                        <h2 className="text-3xl font-bold text-foreground mb-2">
                            {t('subtitle')}
                        </h2>
                    </div>

                    <form className="space-y-6">
                        {/* Name */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="firstName" className="text-sm font-semibold text-foreground">
                                    {t('firstName.label')}
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="rounded-lg border-border bg-muted text-foreground focus:ring-primary focus:border-primary px-4 py-3 outline-none transition-all"
                                    placeholder={t('firstName.placeholder')}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="lastName" className="text-sm font-semibold text-foreground">
                                    {t('lastName.label')}
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="rounded-lg border-border bg-muted text-foreground focus:ring-primary focus:border-primary px-4 py-3 outline-none transition-all"
                                    placeholder={t('lastName.placeholder')}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-semibold text-foreground">
                                {t('email.label')}
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="rounded-lg border-border bg-muted text-foreground focus:ring-primary focus:border-primary px-4 py-3 outline-none transition-all"
                                placeholder={t('email.placeholder')}
                            />
                        </div>

                        {/* Attendance w/ Custom Radio UI */}
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-semibold text-foreground">
                                {t('attendance.label')}
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-border has-[:checked]:border-primary has-[:checked]:bg-primary/5 hover:bg-muted flex-1 transition-all">
                                    <input
                                        type="radio"
                                        name="attendance"
                                        className="text-primary focus:ring-primary border-border bg-muted"
                                        defaultChecked
                                    />
                                    <span className="text-sm font-medium text-foreground">
                                        {t('attendance.accept')}
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-border has-[:checked]:border-primary has-[:checked]:bg-primary/5 hover:bg-muted flex-1 transition-all">
                                    <input
                                        type="radio"
                                        name="attendance"
                                        className="text-primary focus:ring-primary border-border bg-muted"
                                    />
                                    <span className="text-sm font-medium text-foreground">
                                        {t('attendance.decline')}
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Guests */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="guests" className="text-sm font-semibold text-foreground">
                                {t('guests')}
                            </label>
                            <input
                                type="number"
                                id="guests"
                                min="1"
                                defaultValue="1"
                                className="rounded-lg border-border bg-muted text-foreground focus:ring-primary focus:border-primary px-4 py-3 outline-none transition-all"
                            />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-semibold text-foreground">
                                {t('message.label')}
                            </label>
                            <textarea
                                id="message"
                                rows={3}
                                className="rounded-lg border-border bg-muted text-foreground focus:ring-primary focus:border-primary px-4 py-3 outline-none transition-all resize-none"
                                placeholder={t('message.placeholder')}
                            />
                        </div>

                        <BaseButton
                            type="submit"
                            className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-[0.99] h-auto"
                        >
                            {t('submit')}
                        </BaseButton>

                    </form>
                </div>
            </div>
        </section>
    );
}
