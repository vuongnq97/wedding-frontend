'use client';

import { useTranslations } from 'next-intl';
import { BaseButton } from '@/components/ui/base-button';
import { WeddingData } from '@/types/invitation';

interface PublicRsvpSectionProps {
    data: WeddingData;
}

export function PublicRsvpSection({ data }: PublicRsvpSectionProps) {
    const t = useTranslations('invitation.rsvp');

    return (
        <section className="py-16 md:py-24 bg-background-light dark:bg-background-dark" id="rsvp">
            <div className="layout-container flex justify-center">
                <div className="max-w-2xl w-full mx-4 bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="text-center mb-10">
                        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">
                            {t('title')}
                        </p>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {t('subtitle')}
                        </h2>
                    </div>

                    <form className="space-y-6">
                        {/* Name */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="firstName" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="rounded-lg border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary px-4 py-3 outline-none transition-all"
                                    placeholder="Enter your first name"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="lastName" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="rounded-lg border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary px-4 py-3 outline-none transition-all"
                                    placeholder="Enter your last name"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="rounded-lg border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary px-4 py-3 outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>

                        {/* Attendance w/ Custom Radio UI */}
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {t('attendance.label')}
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-gray-200 dark:border-gray-600 has-[:checked]:border-primary has-[:checked]:bg-primary/5 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex-1 transition-all">
                                    <input
                                        type="radio"
                                        name="attendance"
                                        className="text-primary focus:ring-primary border-gray-300 dark:border-gray-500 dark:bg-gray-700"
                                        defaultChecked
                                    />
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {t('attendance.accept')}
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-gray-200 dark:border-gray-600 has-[:checked]:border-primary has-[:checked]:bg-primary/5 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex-1 transition-all">
                                    <input
                                        type="radio"
                                        name="attendance"
                                        className="text-primary focus:ring-primary border-gray-300 dark:border-gray-500 dark:bg-gray-700"
                                    />
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {t('attendance.decline')}
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Guests */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="guests" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {t('guests')}
                            </label>
                            <select
                                id="guests"
                                className="rounded-lg border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary px-4 py-3 outline-none transition-all"
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {t('message.label')}
                            </label>
                            <textarea
                                id="message"
                                rows={3}
                                className="rounded-lg border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary px-4 py-3 outline-none transition-all resize-none"
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
